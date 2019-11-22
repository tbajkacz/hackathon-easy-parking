export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  isError: boolean;
  result: T;
}
