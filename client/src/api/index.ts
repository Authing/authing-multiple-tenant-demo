import { ApplicationConfig } from "@/interface";
import axios from "axios";

export const getPublicConfig = (appId: string) => {
  return axios.get(`/applications/config/${appId}`) as Promise<
    AuthingResponse<ApplicationConfig>
  >;
};
