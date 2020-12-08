export interface Pagination {
  pageOffset?: number;
  totalResults?: number;
  pageSize?: number;
}

export interface PaginationFilter {
  pageOffset: number;
  pageSize: number;
}

export const defaultPagination: Pagination = {};

export const defaultPaginationFilter: PaginationFilter = {
  pageOffset: 0,
  pageSize: 10,
};
