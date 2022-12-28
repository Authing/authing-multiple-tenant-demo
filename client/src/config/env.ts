const envs = import.meta.env;

const prefix = `Authing_`;

export type EnvKeys =
  | "PROXY_BASE_URL"
  | "DOC_HOST"
  | "GUARD_HOST"
  | "DOC_API_URL";

/** 获取环境变量, 不需要拼接前缀 */
export default (key: EnvKeys): string | undefined => {
  return envs[`${prefix}${key}`];
};
