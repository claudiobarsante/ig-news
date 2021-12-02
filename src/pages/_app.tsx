import { AppProps } from 'next/app';
import React from 'react';
import { Header } from '../components/Header';
import '../styles/global.scss';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../graphql/lib/apolloClient';

// -- you need to wrap all components with the Provider to have access to all informations about auth
// -- from any component
function MyApp({ Component, pageProps }: AppProps) {
	const apolloClient = useApollo(pageProps.initialApolloState);
	return (
		<ApolloProvider client={apolloClient}>
			<NextAuthProvider session={pageProps.session}>
				<Header />
				<Component {...pageProps} />
			</NextAuthProvider>
		</ApolloProvider>
	);
}

export default MyApp;
