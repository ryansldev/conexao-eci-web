import { localStorageKeys } from "@/config/localStorageKeys";
import axios, { AxiosError } from "axios";

export interface IApiException {
  message: string;
  code: number;
}

export interface IApiErrorDTO {
  message: string;
  code: number;
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export const apiException = (error: Error): IApiException => {
  if (!axios.isAxiosError(error)) {
    const message = error?.message ?? "unknown error";

    return {
      message: `Client error: ${message}`,
      code: 0,
    };
  }

  const axiosError = error as AxiosError<IApiErrorDTO>;

  const message = axiosError.response?.data?.message ?? "Unknown error";
  const code = axiosError.response?.status ?? 0;

  return {
    message,
    code,
  };
};
