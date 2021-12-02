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
