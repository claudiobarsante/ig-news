/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum PostOrderByInput {
  createdAt_ASC = "createdAt_ASC",
  createdAt_DESC = "createdAt_DESC",
  id_ASC = "id_ASC",
  id_DESC = "id_DESC",
  name_ASC = "name_ASC",
  name_DESC = "name_DESC",
  publishedAt_ASC = "publishedAt_ASC",
  publishedAt_DESC = "publishedAt_DESC",
  slug_ASC = "slug_ASC",
  slug_DESC = "slug_DESC",
  updatedAt_ASC = "updatedAt_ASC",
  updatedAt_DESC = "updatedAt_DESC",
}

/**
 * System Scheduled Operation Status
 */
export enum ScheduledOperationStatus {
  CANCELED = "CANCELED",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  IN_PROGRESS = "IN_PROGRESS",
  PENDING = "PENDING",
}

/**
 * System Scheduled Release Status
 */
export enum ScheduledReleaseStatus {
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  IN_PROGRESS = "IN_PROGRESS",
  PENDING = "PENDING",
}

/**
 * System User Kind
 */
export enum UserKind {
  MEMBER = "MEMBER",
  PAT = "PAT",
  PUBLIC = "PUBLIC",
  WEBHOOK = "WEBHOOK",
}

/**
 * Identifies documents
 */
export interface AuthorWhereInput {
  _search?: string | null;
  AND?: AuthorWhereInput[] | null;
  OR?: AuthorWhereInput[] | null;
  NOT?: AuthorWhereInput[] | null;
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  publishedAt?: any | null;
  publishedAt_not?: any | null;
  publishedAt_in?: any[] | null;
  publishedAt_not_in?: any[] | null;
  publishedAt_lt?: any | null;
  publishedAt_lte?: any | null;
  publishedAt_gt?: any | null;
  publishedAt_gte?: any | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  createdBy?: UserWhereInput | null;
  updatedBy?: UserWhereInput | null;
  publishedBy?: UserWhereInput | null;
  post_every?: PostWhereInput | null;
  post_some?: PostWhereInput | null;
  post_none?: PostWhereInput | null;
  scheduledIn_every?: ScheduledOperationWhereInput | null;
  scheduledIn_some?: ScheduledOperationWhereInput | null;
  scheduledIn_none?: ScheduledOperationWhereInput | null;
}

/**
 * Identifies documents
 */
export interface CategoryWhereInput {
  _search?: string | null;
  AND?: CategoryWhereInput[] | null;
  OR?: CategoryWhereInput[] | null;
  NOT?: CategoryWhereInput[] | null;
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  publishedAt?: any | null;
  publishedAt_not?: any | null;
  publishedAt_in?: any[] | null;
  publishedAt_not_in?: any[] | null;
  publishedAt_lt?: any | null;
  publishedAt_lte?: any | null;
  publishedAt_gt?: any | null;
  publishedAt_gte?: any | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  label?: string | null;
  label_not?: string | null;
  label_in?: string[] | null;
  label_not_in?: string[] | null;
  label_contains?: string | null;
  label_not_contains?: string | null;
  label_starts_with?: string | null;
  label_not_starts_with?: string | null;
  label_ends_with?: string | null;
  label_not_ends_with?: string | null;
  formType?: string | null;
  formType_not?: string | null;
  formType_in?: string[] | null;
  formType_not_in?: string[] | null;
  formType_contains?: string | null;
  formType_not_contains?: string | null;
  formType_starts_with?: string | null;
  formType_not_starts_with?: string | null;
  formType_ends_with?: string | null;
  formType_not_ends_with?: string | null;
  createdBy?: UserWhereInput | null;
  updatedBy?: UserWhereInput | null;
  publishedBy?: UserWhereInput | null;
  post_every?: PostWhereInput | null;
  post_some?: PostWhereInput | null;
  post_none?: PostWhereInput | null;
  scheduledIn_every?: ScheduledOperationWhereInput | null;
  scheduledIn_some?: ScheduledOperationWhereInput | null;
  scheduledIn_none?: ScheduledOperationWhereInput | null;
}

/**
 * Identifies documents
 */
export interface PostWhereInput {
  _search?: string | null;
  AND?: PostWhereInput[] | null;
  OR?: PostWhereInput[] | null;
  NOT?: PostWhereInput[] | null;
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  publishedAt?: any | null;
  publishedAt_not?: any | null;
  publishedAt_in?: any[] | null;
  publishedAt_not_in?: any[] | null;
  publishedAt_lt?: any | null;
  publishedAt_lte?: any | null;
  publishedAt_gt?: any | null;
  publishedAt_gte?: any | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  slug?: string | null;
  slug_not?: string | null;
  slug_in?: string[] | null;
  slug_not_in?: string[] | null;
  slug_contains?: string | null;
  slug_not_contains?: string | null;
  slug_starts_with?: string | null;
  slug_not_starts_with?: string | null;
  slug_ends_with?: string | null;
  slug_not_ends_with?: string | null;
  createdBy?: UserWhereInput | null;
  updatedBy?: UserWhereInput | null;
  publishedBy?: UserWhereInput | null;
  category?: CategoryWhereInput | null;
  author?: AuthorWhereInput | null;
  scheduledIn_every?: ScheduledOperationWhereInput | null;
  scheduledIn_some?: ScheduledOperationWhereInput | null;
  scheduledIn_none?: ScheduledOperationWhereInput | null;
}

/**
 * Identifies documents
 */
export interface ScheduledOperationWhereInput {
  _search?: string | null;
  AND?: ScheduledOperationWhereInput[] | null;
  OR?: ScheduledOperationWhereInput[] | null;
  NOT?: ScheduledOperationWhereInput[] | null;
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  publishedAt?: any | null;
  publishedAt_not?: any | null;
  publishedAt_in?: any[] | null;
  publishedAt_not_in?: any[] | null;
  publishedAt_lt?: any | null;
  publishedAt_lte?: any | null;
  publishedAt_gt?: any | null;
  publishedAt_gte?: any | null;
  description?: string | null;
  description_not?: string | null;
  description_in?: string[] | null;
  description_not_in?: string[] | null;
  description_contains?: string | null;
  description_not_contains?: string | null;
  description_starts_with?: string | null;
  description_not_starts_with?: string | null;
  description_ends_with?: string | null;
  description_not_ends_with?: string | null;
  errorMessage?: string | null;
  errorMessage_not?: string | null;
  errorMessage_in?: string[] | null;
  errorMessage_not_in?: string[] | null;
  errorMessage_contains?: string | null;
  errorMessage_not_contains?: string | null;
  errorMessage_starts_with?: string | null;
  errorMessage_not_starts_with?: string | null;
  errorMessage_ends_with?: string | null;
  errorMessage_not_ends_with?: string | null;
  createdBy?: UserWhereInput | null;
  updatedBy?: UserWhereInput | null;
  publishedBy?: UserWhereInput | null;
  release?: ScheduledReleaseWhereInput | null;
  status?: ScheduledOperationStatus | null;
  status_not?: ScheduledOperationStatus | null;
  status_in?: ScheduledOperationStatus[] | null;
  status_not_in?: ScheduledOperationStatus[] | null;
}

/**
 * Identifies documents
 */
export interface ScheduledReleaseWhereInput {
  _search?: string | null;
  AND?: ScheduledReleaseWhereInput[] | null;
  OR?: ScheduledReleaseWhereInput[] | null;
  NOT?: ScheduledReleaseWhereInput[] | null;
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  publishedAt?: any | null;
  publishedAt_not?: any | null;
  publishedAt_in?: any[] | null;
  publishedAt_not_in?: any[] | null;
  publishedAt_lt?: any | null;
  publishedAt_lte?: any | null;
  publishedAt_gt?: any | null;
  publishedAt_gte?: any | null;
  title?: string | null;
  title_not?: string | null;
  title_in?: string[] | null;
  title_not_in?: string[] | null;
  title_contains?: string | null;
  title_not_contains?: string | null;
  title_starts_with?: string | null;
  title_not_starts_with?: string | null;
  title_ends_with?: string | null;
  title_not_ends_with?: string | null;
  description?: string | null;
  description_not?: string | null;
  description_in?: string[] | null;
  description_not_in?: string[] | null;
  description_contains?: string | null;
  description_not_contains?: string | null;
  description_starts_with?: string | null;
  description_not_starts_with?: string | null;
  description_ends_with?: string | null;
  description_not_ends_with?: string | null;
  errorMessage?: string | null;
  errorMessage_not?: string | null;
  errorMessage_in?: string[] | null;
  errorMessage_not_in?: string[] | null;
  errorMessage_contains?: string | null;
  errorMessage_not_contains?: string | null;
  errorMessage_starts_with?: string | null;
  errorMessage_not_starts_with?: string | null;
  errorMessage_ends_with?: string | null;
  errorMessage_not_ends_with?: string | null;
  isActive?: boolean | null;
  isActive_not?: boolean | null;
  isImplicit?: boolean | null;
  isImplicit_not?: boolean | null;
  releaseAt?: any | null;
  releaseAt_not?: any | null;
  releaseAt_in?: any[] | null;
  releaseAt_not_in?: any[] | null;
  releaseAt_lt?: any | null;
  releaseAt_lte?: any | null;
  releaseAt_gt?: any | null;
  releaseAt_gte?: any | null;
  createdBy?: UserWhereInput | null;
  updatedBy?: UserWhereInput | null;
  publishedBy?: UserWhereInput | null;
  operations_every?: ScheduledOperationWhereInput | null;
  operations_some?: ScheduledOperationWhereInput | null;
  operations_none?: ScheduledOperationWhereInput | null;
  status?: ScheduledReleaseStatus | null;
  status_not?: ScheduledReleaseStatus | null;
  status_in?: ScheduledReleaseStatus[] | null;
  status_not_in?: ScheduledReleaseStatus[] | null;
}

/**
 * Identifies documents
 */
export interface UserWhereInput {
  _search?: string | null;
  AND?: UserWhereInput[] | null;
  OR?: UserWhereInput[] | null;
  NOT?: UserWhereInput[] | null;
  id?: string | null;
  id_not?: string | null;
  id_in?: string[] | null;
  id_not_in?: string[] | null;
  id_contains?: string | null;
  id_not_contains?: string | null;
  id_starts_with?: string | null;
  id_not_starts_with?: string | null;
  id_ends_with?: string | null;
  id_not_ends_with?: string | null;
  createdAt?: any | null;
  createdAt_not?: any | null;
  createdAt_in?: any[] | null;
  createdAt_not_in?: any[] | null;
  createdAt_lt?: any | null;
  createdAt_lte?: any | null;
  createdAt_gt?: any | null;
  createdAt_gte?: any | null;
  updatedAt?: any | null;
  updatedAt_not?: any | null;
  updatedAt_in?: any[] | null;
  updatedAt_not_in?: any[] | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  publishedAt?: any | null;
  publishedAt_not?: any | null;
  publishedAt_in?: any[] | null;
  publishedAt_not_in?: any[] | null;
  publishedAt_lt?: any | null;
  publishedAt_lte?: any | null;
  publishedAt_gt?: any | null;
  publishedAt_gte?: any | null;
  name?: string | null;
  name_not?: string | null;
  name_in?: string[] | null;
  name_not_in?: string[] | null;
  name_contains?: string | null;
  name_not_contains?: string | null;
  name_starts_with?: string | null;
  name_not_starts_with?: string | null;
  name_ends_with?: string | null;
  name_not_ends_with?: string | null;
  picture?: string | null;
  picture_not?: string | null;
  picture_in?: string[] | null;
  picture_not_in?: string[] | null;
  picture_contains?: string | null;
  picture_not_contains?: string | null;
  picture_starts_with?: string | null;
  picture_not_starts_with?: string | null;
  picture_ends_with?: string | null;
  picture_not_ends_with?: string | null;
  isActive?: boolean | null;
  isActive_not?: boolean | null;
  kind?: UserKind | null;
  kind_not?: UserKind | null;
  kind_in?: UserKind[] | null;
  kind_not_in?: UserKind[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
