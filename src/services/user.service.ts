import { httpClient } from "@/utils/httpClient";
import { ITokenResponse } from "@/interfaces/user.interface";
import { IAPIResponse } from "@/interfaces/common.interface";
import { IPaginationResponse } from "../interfaces/common.interface";
import { IGetAllUserResponse } from "../interfaces/user.interface";

const endpoint = "/users";
export const postLogin = async (body: ICredential) => {
  try {
    const { data: response } = await httpClient.post<
      IAPIResponse<ITokenResponse>
    >(`${endpoint}/login`, body);
    return response;
  } catch (error: unknown) {
    throw error;
  }
};

export const getAllUsers = async (accessToken: string) => {
  try {
    const token = localStorage.getItem("access");

    const { data: response } = await httpClient.get<IAPIResponse<IPaginationResponse<IGetAllUserResponse[]>>>(endpoint, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    });
    return response;
  } catch (error: unknown) {
    throw error;
  }
};
