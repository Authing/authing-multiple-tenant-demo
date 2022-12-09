// 引入 Authing Guard css 文件
import '@authing/react-ui-components/lib/index.min.css';
import './App.less';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { GlobalContext } from './context/globalContext';
import routes from './routes';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <GlobalContext.Provider value={{}}>
        <RouterProvider router={createBrowserRouter(routes)}/>
      </GlobalContext.Provider>
    </ConfigProvider>
  )
}

export default App
