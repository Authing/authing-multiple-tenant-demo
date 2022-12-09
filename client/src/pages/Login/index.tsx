import "./index.less";
import "@authing/react-ui-components/lib/index.min.css";

import { Guard, User } from "@authing/react-ui-components";
import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import env from "@/config/env";

export const Login = () => {
  const [searchParams] = useSearchParams();
  const host = env("BACK_HOST");
  const appId = searchParams.get("app_id") ?? "";
  const tenantId = searchParams.get("tenant_id") ?? "";
  const guardConfig = {
    host,
    // contentCss: "",
    // // isHost 告知 guard 处于托管状态中能取到 query 中携带的认证参数
    // isHost: true,
    // __internalRequest__: true,
    // openEventsMapping: false,
  };

  const handleLogin = useCallback((user: User) => {
    // setUserInfo(user);
    // setLoginSuccess(true);
  }, []);

  const handleLangChange = useCallback(() => {
    // uninstallBeforeunload();
  }, []);

  const handleRegister = useCallback(() => {
    // setRegisterSuccess(true);
  }, []);

  const handleBeforeChangeModule = useCallback((key: any) => {
    if (
      [
        "login",
        "register",
        "error",
        "submitSuccess",
        "forgetPassword",
      ].includes(key)
    ) {
      //   uninstallBeforeunload();
    } else {
      //   mountBeforeunload();
    }

    return true;
  }, []);

  const handleLoad = useCallback(() => {
    // setShowGuard(true);
    // setTimeout(() => {
    //   //   autoInputPhoneNumber();
    // }, 100);
  }, []);

  return (
    <div className="authing-mtd-login-wrapper">
      <Guard
        appId={appId}
        config={guardConfig}
        tenantId={tenantId}
        onLogin={handleLogin}
        onLangChange={handleLangChange}
        onRegister={handleRegister}
        onBeforeChangeModule={handleBeforeChangeModule}
        onLoad={handleLoad}
      />
    </div>
  );
};

export default Login;
