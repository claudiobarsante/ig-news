/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostWhereInput, PostOrderByInput } from './globalTypes';

// ====================================================
// GraphQL query operation: LoadMorePosts
// ====================================================

export interface LoadMorePosts_posts_content {
	__typename: 'RichText';
	/**
	 * Returns HTMl representation
	 */
	html: string;
}

export interface LoadMorePosts_posts {
	__typename: 'Post';
	/**
	 * The unique identifier
	 */
	id: string;
	/**
	 * The time the document was updated
	 */
	updatedAt: any;
	slug: string | null;
	name: string;
	content: LoadMorePosts_posts_content;
}

export interface LoadMorePosts_postsConnection_aggregate {
	__typename: 'Aggregate';
	count: number;
}

export interface LoadMorePosts_postsConnection {
	__typename: 'PostConnection';
	aggregate: LoadMorePosts_postsConnection_aggregate;
}

export interface LoadMorePosts {
	/**
	 * Retrieve multiple posts
	 */
	posts: LoadMorePosts_posts[];
	notifyOnNetworkStatusChange: boolean;
	/**
	 * Retrieve multiple posts using the Relay connection interface
	 */
	postsConnection: LoadMorePosts_postsConnection;
}

export interface LoadMorePostsVariables {
	first: number;
	skip: number;
	where?: PostWhereInput | null;
	orderBy?: PostOrderByInput | null;
}
