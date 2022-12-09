const envs = import.meta.env;
const prefix = `VITE_`;

/** 获取环境变量, 不需要拼接`VITE_`前缀 */
export default (key: string) => {
  return envs[`${prefix}${key}`];
};
