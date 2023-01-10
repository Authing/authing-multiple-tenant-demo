import "./index.less";

import TenantDefaultDoor from "@/assets/tenant-default-door.svg";
import { Button } from "antd";
import { useCallback, useEffect } from "react";
import { BASE_URL } from "@/utils/baseUrl";
import { useNavigate } from "react-router-dom";
import { StepConfig, STEPS } from "../StepHome/stepConfig";

export const Login = () => {
  const nav = useNavigate();
  //TODO: 判断是否登录，有登录态则重定向后续页面
  const handleClick = useCallback(() => {
    window.location.href = `${BASE_URL}/login`;
    // nav(`/step/${StepConfig[STEPS.step1].path}`);
  }, []);
  useEffect(() => {}, []);
  return (
    <div className="authing_mtd-please-login">
      <img src={TenantDefaultDoor} alt="" />
      <h3>请先注册 / 登录，开启 Authing 多租户之旅</h3>
      <Button
        className="btn-registry-login"
        type="primary"
        size="large"
        onClick={handleClick}
      >
        注册/登录
      </Button>
    </div>
  );
};
