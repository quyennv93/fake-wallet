export interface IResponse<T> {
  statusCode: number;
  data: any;
  message: string[] | string | null;
}
