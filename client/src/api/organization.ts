import axios, { AxiosRequestConfig } from "axios";

/** 创建组织 */
export const createOrg = (params: {
  name: string;
  description?: string;
  logo?: string;
  appId: string;
}) => {
  return axios.post(`/tenants/create`, params) as Promise<
    AuthingResponse<{ id: string; [key: string]: any }>
  >;
};

/** 邀请链接接口返回元数组类型 */
export interface GetInviteLinkType {
  recordId: number;
  inviteLink: string;
  createdAt: string;
}

/** 获取邀请用户链接 */
export const getInviteLink = (params: {
  /** 有效期，以天为单位。值为 none 时，为永久 */
  validityTerm: string;
  appId: string;
  emails?: string[];
  tenantId?: string;
}): Promise<
  AuthingResponse<{
    list: GetInviteLinkType[];
    errMsgs: { email: string; message: string }[];
  }>
> => {
  return axios.post(`/tenant-users/generate-invite-link`, params, {
    params: { tenantId: params?.tenantId },
  });
};

export const sendInviteEmails = (
  params: { recordIds: number[] },
  config?: AxiosRequestConfig
) => {
  return axios.post(`/tenant-users/invite`, params, config);
};
