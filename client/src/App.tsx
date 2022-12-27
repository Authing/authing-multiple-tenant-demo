import "./App.less";

import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import routes from "./routes";

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={createBrowserRouter(routes)} />
    </ConfigProvider>
  );
}

export default App;
