import axios from "axios";

import { BASE_URL } from "@/utils/baseUrl";

interface GetTokenByCode {
  (params: { code: string }): Promise<
    AuthingResponse<{
      access_token: string;
      expires_in: number;
      scope: string;
      token_type: string;
    }>
  >;
  controller?: AbortController;
}

const getTokenByCodeController = new AbortController();
const getTokenByCode: GetTokenByCode = (params: { code: string }) => {
  return axios.post(`/auth/token`, params, {
    signal: getTokenByCodeController.signal,
  });
};
getTokenByCode.controller = getTokenByCodeController;

export { getTokenByCode };

/** 登录 url */
export const LOGIN_URL = `${BASE_URL}/auth`;

/** 登出应用 */
export const logoutApp = () => {
  return axios.get(`/auth/logout`);
};
