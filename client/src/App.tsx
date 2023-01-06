import "./App.less";

import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import config from "./config";
import { GlobalState } from "./context/globalContext";
import routes from "./routes";

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <GlobalState.Provider value={{ appId: config.appId }}>
        <RouterProvider router={createBrowserRouter(routes)} />
      </GlobalState.Provider>
    </ConfigProvider>
  );
}

export default App;
