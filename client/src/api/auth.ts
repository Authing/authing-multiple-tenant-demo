import axios from "axios";

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
  return axios.post(`/login/token`, params, {
    signal: getTokenByCodeController.signal,
  });
};
getTokenByCode.controller = getTokenByCodeController;

export { getTokenByCode };
