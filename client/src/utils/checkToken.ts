import env from "@/config/env";
import { getToken, removeToken } from "./tokenStore";

/** 检查 token 是否失效 */
export const checkAuth = () => {
  const key = env("TOKEN_KEY") ?? "";
  try {
    const token = getToken();
    const payload = JSON.parse(window.atob(token?.split(".")?.[1] ?? ""));
    const expire = payload?.exp;
    if (Date.now() < expire * 1000) {
      return Promise.resolve();
    }
  } catch {}
  removeToken();
  return Promise.reject();
};
