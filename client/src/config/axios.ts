import axios from "axios";

import { getToken, removeToken } from "@/utils/tokenStore";

import env from "./env";

axios.defaults.baseURL = env("PROXY_BASE_URL");
axios.defaults.timeout = 1000 * 60 * 2; // 2分钟超时

axios.interceptors.response.use((response) => {
  const { code, statusCode } = response.data as AuthingResponse;
  if ([code, statusCode].some((it) => it === 200)) {
    return response.data;
  } else if ([code, statusCode].some((it) => it === 403)) {
    removeToken();
  }
  return Promise.reject(response.data);
});

axios.interceptors.request.use((config) => {
  config.headers = { ["authorization"]: getToken(), ...config.headers };
  return config;
});
