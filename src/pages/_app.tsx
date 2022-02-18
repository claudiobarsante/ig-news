import { AppProps } from 'next/app';
import React from 'react';
import { Header } from '../components/Header';
import '../styles/global.scss';
//import { Provider as NextAuthProvider } from 'next-auth/client';
import { SessionProvider } from 'next-auth/react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../graphql/lib/apolloClient';
import NextNprogress from 'nextjs-progressbar';

// -- you need to wrap all components with the Provider to have access to all informations about auth
// -- from any component
function MyApp({ Component, pageProps }: AppProps) {
	const apolloClient = useApollo(pageProps.initialApolloState);
	return (
		<ApolloProvider client={apolloClient}>
			<SessionProvider session={pageProps.session}>
				<Header />
				<NextNprogress
					color='#eba417'
					startPosition={0.3}
					stopDelayMs={200}
					height={3}
					showOnShallow={true}
				/>
				<Component {...pageProps} />
			</SessionProvider>
		</ApolloProvider>
	);
}

export default MyApp;
