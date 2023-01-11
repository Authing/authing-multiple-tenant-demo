import env from "@/config/env";

/** 存储 token */
export const storeToken = (token: string) => {
  const key = env("TOKEN_KEY");
  if (!key || !token) return false;
  window.localStorage.setItem(key, token);
  return true;
};

/** 或取 token */
export const getToken = () => {
  const key = env("TOKEN_KEY");
  if (!key) return;
  return window.localStorage.getItem(key);
};
