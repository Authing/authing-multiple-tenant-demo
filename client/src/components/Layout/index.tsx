import "./index.less";

import { Layout as AntLayout } from "antd";
import { Outlet, useMatches } from "react-router-dom";

import Footer, { FooterProps } from "./Footer";
import Header, { HeaderProps } from "./Header";

const { Content } = AntLayout;

export interface LayoutDataType {
  header?: boolean | HeaderProps;
  footer?: boolean | FooterProps;
}

export const Layout = () => {
  const finalMatch = useMatches().at(-1);
  const data: LayoutDataType = finalMatch?.data ?? {};

  return (
    <AntLayout className="authing_mtd-layout">
      <Header {...(data?.header as any)} />
      <Content>
        <Outlet />
      </Content>
    </AntLayout>
  );
};
