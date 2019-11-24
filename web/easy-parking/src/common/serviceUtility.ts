import { AxiosResponse } from "axios";

export function unwrap<T>(r: AxiosResponse<T>) {
  return r.data;
}
