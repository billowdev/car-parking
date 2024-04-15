import axios, { AxiosStatic } from "axios";

export const httpClient = axios.create({
  baseURL: process.env.baseURL || process.env.NEXT_PUBLIC_CAR_PARIKING_API_URL,
});