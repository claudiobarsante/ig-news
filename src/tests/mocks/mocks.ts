import { LOAD_MORE_POSTS_QUERY } from '../../graphql/queries';

export const postMock = {
	request: {
		query: LOAD_MORE_POSTS_QUERY,
		variables: {
			first: 3,
			skip: 0,
		},
	},
	result: jest.fn().mockReturnValue({
		data: {
			posts: [
				{
					__typename: 'Post',
					id: 'id2',
					updatedAt: '2021-12-20T17:50:39.983534+00:00',
					slug: 'slug1',
					name: 'test1',
					content: { __typename: 'RichText', html: '<p>eeeeeeeeee</p>' },
				},
			],
		},
	}),
};

export const postFetchMoreMock = {
	request: {
		query: LOAD_MORE_POSTS_QUERY,
		variables: {
			first: 3,
			skip: 1,
		},
	},
	result: jest.fn().mockReturnValue({
		data: {
			posts: [
				{
					__typename: 'Post',
					id: 'id1',
					updatedAt: '2021-12-20T17:50:39.983534+00:00',
					slug: 'slug2',
					name: 'test2',
					content: { __typename: 'RichText', html: '<p>eeeeeeeeee</p>' },
				},
			],
		},
	}),
};