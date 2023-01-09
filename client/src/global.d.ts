declare type AuthingResponse<T = any> = {
  code: number;
  statusCode: number;
  message: string;
  apiCode?: number;
  data: T;
};
