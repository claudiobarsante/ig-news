/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeletePost
// ====================================================

export interface DeletePost_deletePost {
  __typename: "Post";
  /**
   * The unique identifier
   */
  id: string;
}

export interface DeletePost {
  /**
   * Delete one post from _all_ existing stages. Returns deleted document.
   */
  deletePost: DeletePost_deletePost | null;
}

export interface DeletePostVariables {
  postId: string;
}
