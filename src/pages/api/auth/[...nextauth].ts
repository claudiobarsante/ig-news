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
	// -- still have to figure out how it'll work on production(it uses HS512) jwt: {
	// 	signingKey: process.env.SIGN_IN_KEY, // -- SIGN_IN_KEY look on https://next-auth.js.org/warnings option 1 how to generate it
	// },
	callbacks: {
		// -- to modify the content of the session
		async session(session) {
			try {
				const userActiveSubscription = await fauna.query(
					q.Get(
						q.Intersection([
							//-- need a subscribtion that has yhe e-mail of the user and that it's active
							q.Match(
								q.Index('subscription_by_user_ref'),
								q.Select(
									'ref',
									q.Get(q.Match(q.Index('user_by_email'), q.Casefold(session.user.email)))
								)
							),
							q.Match(q.Index('subscription_by_status'), 'active'),
						])
					)
				);
				console.log('userActiveSubscription', userActiveSubscription);
				return { ...session, activeSubscription: userActiveSubscription };
			} catch {
				return { ...session, activeSubscription: null };
			}
		},
		//--
		async signIn(user, account, profile) {
			const { email } = user;
			// -- if signIn was successful return true otherwise return false
			try {
				// -- q.CaseFold transform to lower case
				// -- if find user email get info otherwise create user email
				// -- don't forget to always search by the index defined in the collection
				await fauna.query(
					q.If(
						q.Not(q.Exists(q.Match(q.Index('user_by_email'), q.Casefold(email)))),
						q.Create(q.Collection('users'), { data: { email } }),
						q.Get(q.Match(q.Index('user_by_email'), q.Casefold(email)))
					)
				);

				return true;
			} catch {
				return false;
			}
		},
	},
});
