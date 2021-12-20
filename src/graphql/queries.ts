import { gql } from '@apollo/client';

export const ALL_POSTS_QUERY = gql`
	query getAllPosts {
		posts {
			id
			updatedAt
			slug
			name
			content {
				html
			}
		}
	}
`;

export const GET_POST_BY_SLUG_QUERY = gql`
	query getPost($slug: String) {
		post(where: { slug: $slug }) {
			id
			updatedAt
			slug
			name
			content {
				html
				text
				markdown
			}
		}
	}
`;

export const LOAD_MORE_POSTS_QUERY = gql`
	query loadMorePosts($first: Int!, $skip: Int!) {
		posts(first: $first, skip: $skip) {
			id
			updatedAt
			slug
			name
			content {
				html
			}
		}
	}
`;
