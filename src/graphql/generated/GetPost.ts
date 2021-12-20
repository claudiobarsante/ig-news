/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPost
// ====================================================

export interface GetPost_post_content {
  __typename: "RichText";
  /**
   * Returns HTMl representation
   */
  html: string;
  /**
   * Returns plain-text contents of RichText
   */
  text: string;
  /**
   * Returns Markdown representation
   */
  markdown: string;
}

export interface GetPost_post {
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
  content: GetPost_post_content;
}

export interface GetPost {
  /**
   * Retrieve a single post
   */
  post: GetPost_post | null;
}

export interface GetPostVariables {
  slug?: string | null;
}
