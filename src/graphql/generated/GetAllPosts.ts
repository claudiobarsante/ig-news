/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllPosts
// ====================================================

export interface GetAllPosts_posts_content {
  __typename: "RichText";
  /**
   * Returns HTMl representation
   */
  html: string;
}

export interface GetAllPosts_posts {
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
  content: GetAllPosts_posts_content;
}

export interface GetAllPosts {
  /**
   * Retrieve multiple posts
   */
  posts: GetAllPosts_posts[];
}
