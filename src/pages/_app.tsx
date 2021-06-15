import { AppProps } from 'next/app';
import React from 'react';
import { Header } from '../components/Header';
import '../styles/global.scss';
import { Provider as NextAuthProvider } from 'next-auth/client';

// -- you need to wrap all components with the Provider to have access to all informations about auth
// -- from any component
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<NextAuthProvider session={pageProps.session}>
			<Header />
			<Component {...pageProps} />
		</NextAuthProvider>
	);
}

export default MyApp;
