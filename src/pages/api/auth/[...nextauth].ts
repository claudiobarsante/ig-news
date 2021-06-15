import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { fauna } from '../../../services/fauna';
import { query as q } from 'faunadb';

export default NextAuth({
	providers: [
		Providers.GitHub({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			scope: 'read:user', // what info do you want to have access from the user -  more about scope https://docs.github.com/pt/developers/apps/building-oauth-apps/scopes-for-oauth-apps
		}),
	],
	jwt: {
		signingKey: process.env.SIGN_IN_KEY, // -- SIGN_IN_KEY could be any value generate by you
	},
	callbacks: {
		async signIn(user, account, profile) {
			const { email } = user;
			// -- if signIn was successful return true otherwise return false
			try {
				await fauna.query(q.Create(q.Collection('users'), { data: { email } }));
				return true;
			} catch {
				return false;
			}
		},
	},
});
