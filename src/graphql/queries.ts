import { gql } from '@apollo/client';

export const ALL_POSTS_QUERY = gql`
	query GetAllPosts {
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
	query GetPost($slug: String) {
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
	query LoadMorePosts(
		$first: Int!
		$skip: Int!
		$where: PostWhereInput
		$orderBy: PostOrderByInput
	) {
		posts(first: $first, skip: $skip, where: $where, orderBy: $orderBy) {
			id
			updatedAt
			slug
			name
			content {
				html
			}
		}
		postsConnection(orderBy: $orderBy, where: $where) {
			aggregate {
				count
			}
		}
	}
`;

export const GET_ALL_FILTERS = gql`
	query GetAllFilters {
		filters {
			id
			label
			name
			value
			formType
		}
	}
`;

export const GET_ALL_CATEGORIES = gql`
	query GetAllCategories {
		categories {
			id
			label
			name
			formType
		}
	}
`;

export const QUERY_POSTS_PAGE = gql`
	query QueryPostsPage(
		$first: Int!
		$skip: Int!
		$where: PostWhereInput
		$orderBy: PostOrderByInput
	) {
		posts(first: $first, skip: $skip, where: $where, orderBy: $orderBy) {
			id
			updatedAt
			slug
			name
			content {
				html
			}
		}
		postsConnection(orderBy: $orderBy, where: $where) {
			aggregate {
				count
			}
		}
		categories {
			id
			label
			name
			formType
		}
		filters {
			id
			label
			name
			value
			formType
		}
	}
`;
