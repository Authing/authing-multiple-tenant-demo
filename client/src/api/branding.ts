import axios from "axios";

export const updateBrandingConfig = (params: { update: any }) => {
  return axios.post(`/tenants/update-config`, params);
};
