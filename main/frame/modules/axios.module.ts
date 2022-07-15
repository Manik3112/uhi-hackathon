import axios, { AxiosInstance } from 'axios';

export type AxiosRestClientType = AxiosInstance;

export function AxiosRestClient(baseUrl: string): AxiosRestClientType {
  return axios.create({
    baseURL: baseUrl,
  });
}
