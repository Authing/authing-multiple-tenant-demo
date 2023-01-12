import axios, { AxiosRequestConfig } from "axios";

export const updateBrandingConfig = (
  appId: string,
  params: { update: any },
  config?: AxiosRequestConfig
) => {
  return axios.post(`/applications/update/${appId}`, params, config);
};
