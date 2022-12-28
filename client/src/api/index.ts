import axios from "axios";

export const getPublicConfig = (appId: string) => {
  return axios.get(`/api/v2/applications/${appId}/public-config`);
};
