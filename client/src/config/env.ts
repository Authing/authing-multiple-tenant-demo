const envs = import.meta.env;

const prefix = `Authing_`;

/** 获取环境变量, 不需要拼接前缀 */
export default (key: string) => {
  return envs[`${prefix}${key}`];
};
