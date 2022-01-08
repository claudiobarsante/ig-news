import { InMemoryCache, ReactiveVar, makeVar } from '@apollo/client';
import { concatPagination } from '@apollo/client/utilities';

export default new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				posts: concatPagination(['where', 'orderBy']), //has to dterminate the arguments to correctly cache
				lastSeen: {
					read() {
						return lastSeenVar();
					},
				},
			},
		},
	},
});

export type PostSeen = {
	slug: string;
	name: string;
};

export type LastSeen = PostSeen[];

const lastSeenInitialValue: LastSeen = [];

export const lastSeenVar: ReactiveVar<LastSeen> = makeVar<LastSeen>(lastSeenInitialValue);
