import "./App.less";

import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import routes from "./routes";

const routers = createBrowserRouter(routes);

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={routers} />
    </ConfigProvider>
  );
}

export default App;
