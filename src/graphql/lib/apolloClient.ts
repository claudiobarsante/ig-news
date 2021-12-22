import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities';
import apolloCache from './apolloCache';

let apolloClient: ApolloClient<NormalizedCacheObject | null>;

function createApolloClient() {
	return new ApolloClient({
		ssrMode: typeof window === 'undefined', // set to true for SSR
		link: new HttpLink({
			uri: process.env.NEXT_PUBLIC_GRAPHQL_HOST,
			headers: {
				authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHQL_TOKEN}`,
			},
		}),
		cache: apolloCache,
	});
}

export function initializeApollo(initialState = null) {
	const _apolloClient = apolloClient ?? createApolloClient();

	// If your page has Next.js data fetching methods that use Apollo Client,
	// the initial state gets hydrated here
	if (initialState) {
		// Get existing cache, loaded during client side data fetching
		const existingCache = _apolloClient.extract();

		// Restore the cache using the data passed from
		// getStaticProps/getServerSideProps combined with the existing cached data
		_apolloClient.cache.restore({ ...existingCache, ...initialState });
	}

	// For SSG and SSR always create a new Apollo Client
	if (typeof window === 'undefined') return _apolloClient;

	// Create the Apollo Client once in the client
	if (!apolloClient) apolloClient = _apolloClient;
	return _apolloClient;
}

export function useApollo(initialState = {}) {
	const store = useMemo(() => initializeApollo(initialState), [initialState]);
	return store;
}
