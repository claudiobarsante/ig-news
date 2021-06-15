import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
	providers: [
		Providers.GitHub({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			scope: 'read:user', // what info do you want to have access from the user -  more about scope https://docs.github.com/pt/developers/apps/building-oauth-apps/scopes-for-oauth-apps
		}),
	],
});
