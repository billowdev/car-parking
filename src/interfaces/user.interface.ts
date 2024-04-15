import { IPaginationOptions, IDateFilterOptions } from "./common.interface";

export interface ITokenResponse {
  access_token: string;
  refresh_token: string;
}
export interface IAPIResponse<T> {
  message: string;
  data: T;
}

export interface IGetAllUserResponse {
  id: number;
  username: string;
  email: string;
  phone_number: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUserFilter extends IDateFilterOptions, IPaginationOptions {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  phone_number?: string;
  role?: string;
}
