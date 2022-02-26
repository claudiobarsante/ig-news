/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllCategories
// ====================================================

export interface GetAllCategories_categories {
  __typename: "Category";
  /**
   * The unique identifier
   */
  id: string;
  label: string | null;
  name: string | null;
  formType: string | null;
}

export interface GetAllCategories {
  /**
   * Retrieve multiple categories
   */
  categories: GetAllCategories_categories[];
}
