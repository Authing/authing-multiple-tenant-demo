import { getToken } from "@/utils/tokenStore";
import { notification } from "antd";
import axios from "axios";

import env from "./env";

axios.defaults.baseURL = env("PROXY_BASE_URL");
axios.defaults.timeout = 1000 * 60 * 2; // 2分钟超时

axios.interceptors.response.use((response) => {
  const { code, statusCode, message } = response.data as AuthingResponse;
  if (code === 200 || statusCode === 200) {
    return response.data;
  } else {
    notification.error({ message: message });
  }

  return Promise.reject(response.data);
});

axios.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers = { ["authorization"]: getToken(), ...config.headers };
  }
  return config;
});
