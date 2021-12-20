import { gql } from '@apollo/client';

export const DELETE_POST = gql`
	mutation DeletePost($postId: ID!) {
		__typename
		deletePost(where: { id: $postId }) {
			id
		}
	}
`;
