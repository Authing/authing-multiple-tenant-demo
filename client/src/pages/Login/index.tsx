import "./index.less";

import { Button, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

import { getTokenByCode } from "@/api/auth";
import TenantDefaultDoor from "@/assets/tenant-default-door.svg";
import { BASE_URL } from "@/utils/baseUrl";
import { checkAuth } from "@/utils/checkToken";

export const Login = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [ready, setReady] = useState(false);
  const [isPass, setIsPass] = useState(false);

  useEffect(() => {
    checkAuth()
      .then(() => setIsPass(true))
      .catch(() => {
        if (!code) {
          setIsPass(false);
          return;
        }
        return getTokenByCode({ code })
          .then(({ data }) => {
            console.log(data);
          })
          .catch(() => {
            setIsPass(false);
          });
      })
      .finally(() => setReady(true));
  }, [code]);
  const handleClick = useCallback(() => {
    window.location.href = `${BASE_URL}/login`;
  }, []);

  if (ready && isPass) return <Navigate to="/step" />;
  return ready ? (
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
  ) : (
    <Spin
      size="large"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
};
