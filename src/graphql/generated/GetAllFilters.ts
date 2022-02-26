/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllFilters
// ====================================================

export interface GetAllFilters_filters {
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

export interface GetAllFilters {
  /**
   * Retrieve multiple filters
   */
  filters: GetAllFilters_filters[];
}
