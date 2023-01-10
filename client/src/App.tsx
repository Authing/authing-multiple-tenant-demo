import "./App.less";

import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import routes from "./routes";
import { useGlobalState } from "./context/globalContext";
import { useEffect, useMemo } from "react";
import config from "./CONFIG_ME_FIRST";
import { AuthenticationClient } from "@authing/guard-react18";

function App() {
  const [, setGlobalState] = useGlobalState();
  const appId = useMemo(() => config.appId, []);
  useEffect(() => {
    if (!appId) return;
    setGlobalState({ appId });
  }, [appId]);
  return (
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={createBrowserRouter(routes)} />
    </ConfigProvider>
  );
}

export default App;
