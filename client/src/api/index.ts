import { ApplicationConfig } from "@/interface";
import axios from "axios";

/** 获取应用配置 */
export const getApplicationConfig = (appId: string) => {
  return axios.get(`/applications/config/${appId}`) as Promise<
    AuthingResponse<ApplicationConfig>
  >;
};
