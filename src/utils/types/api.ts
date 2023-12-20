export type Response<T = any> = {
  message: string;
  pagination: Pagination;
  data: T;
};

export type Pagination = {
  prev: string | null;
  next: string;
};

export type IResponse<T = any> = {
  message: string;
  data: T;
};
