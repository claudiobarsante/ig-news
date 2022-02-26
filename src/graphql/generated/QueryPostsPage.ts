/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PostWhereInput, PostOrderByInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: QueryPostsPage
// ====================================================

export interface QueryPostsPage_posts_content {
  __typename: "RichText";
  /**
   * Returns HTMl representation
   */
  html: string;
}

export interface QueryPostsPage_posts {
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
  content: QueryPostsPage_posts_content;
}

export interface QueryPostsPage_postsConnection_aggregate {
  __typename: "Aggregate";
  count: number;
}

export interface QueryPostsPage_postsConnection {
  __typename: "PostConnection";
  aggregate: QueryPostsPage_postsConnection_aggregate;
}

export interface QueryPostsPage_categories {
  __typename: "Category";
  /**
   * The unique identifier
   */
  id: string;
  label: string | null;
  name: string | null;
  formType: string | null;
}

export interface QueryPostsPage_filters {
  __typename: "Filter";
  /**
   * The unique identifier
   */
  id: string;
  label: string;
  name: string;
  value: string;
  formType: string | null;
}

export interface QueryPostsPage {
  /**
   * Retrieve multiple posts
   */
  posts: QueryPostsPage_posts[];
  /**
   * Retrieve multiple posts using the Relay connection interface
   */
  postsConnection: QueryPostsPage_postsConnection;
  /**
   * Retrieve multiple categories
   */
  categories: QueryPostsPage_categories[];
  /**
   * Retrieve multiple filters
   */
  filters: QueryPostsPage_filters[];
}

export interface QueryPostsPageVariables {
  first: number;
  skip: number;
  where?: PostWhereInput | null;
  orderBy?: PostOrderByInput | null;
}
