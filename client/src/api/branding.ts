import axios from "axios";

export const updateBrandingConfig = (params: {update:any}) => {
  return axios.post(`/api/v3/update-userpool-tenant-config`, params);
};
