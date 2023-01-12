import env from "@/config/env";

const driver = window.sessionStorage;

/** 存储 token */
export const storeToken = (token: string) => {
  const key = env("TOKEN_KEY");
  if (!key || !token) return false;
  driver.setItem(key, token);
  return true;
};

/** 或取 token */
export const getToken = () => {
  const key = env("TOKEN_KEY");
  if (!key) return;
  return driver.getItem(key);
};

export const removeToken = () => {
  const key = env("TOKEN_KEY");
  if (!key) return;
  return driver.removeItem(key);
};
