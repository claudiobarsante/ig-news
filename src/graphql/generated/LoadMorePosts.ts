/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LoadMorePosts
// ====================================================

export interface LoadMorePosts_posts_content {
  __typename: "RichText";
  /**
   * Returns HTMl representation
   */
  html: string;
}

export interface LoadMorePosts_posts {
  __typename: "Post";
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

export interface LoadMorePosts {
  /**
   * Retrieve multiple posts
   */
  posts: LoadMorePosts_posts[];
}

export interface LoadMorePostsVariables {
  first: number;
  skip: number;
}
