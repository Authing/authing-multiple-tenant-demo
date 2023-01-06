import axios from "axios";

/** 创建组织 */
export const createOrg = (params: any) => {
  return axios.post(`/api/v3/create-my-tenant`, params);
};

/** 获取邀请用户链接 */
export const getInviteLink = (params: any) => {
  return axios.post(`/api/v3/generate-invite-tenant-user-link`, params);
};
