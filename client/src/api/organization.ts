import axios from "axios";

/** 创建组织 */
export const createOrg = (params: {
  name: string;
  description?: string;
  logo?: string;
  appIds: string[];
}) => {
  return axios.post(`/api/v3/create-tenant`, params);
};

/** 获取邀请用户链接 */
export const getInviteLink = (params: {
  /** 有效期，以天为单位。值为 none 时，为永久 */
  validityTerm: "1" | "3" | "7" | "none";
  appId: string;
  emails?: string[];
  tenantId?: string;
}) => {
  return axios.post(`/api/v3/generate-invite-tenant-user-link`, params);
};

export const sendInviteEmails = (params: { recordIds: string[] }) => {
  return axios.post(`/api/v2/email/inviteTenantUser`, params);
};
