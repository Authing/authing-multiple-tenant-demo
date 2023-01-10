import "./index.less";

import { Avatar, Button, ButtonProps, Dropdown, Layout, MenuProps } from "antd";

import env from "@/config/env";
import { ToolOutlined, UserOutlined } from "@ant-design/icons";

export interface HeaderProps {}

export default (props: HeaderProps) => {
  const buttons: ButtonProps[] = [
    {
      icon: <ToolOutlined />,
      children: "API",
      href: env("DOC_API_URL"),
      target: "_blank",
    },
  ];
  const dropdowns: MenuProps["items"] = [
    {
      label: "退出",
      key: "logout",
      onClick() {
        window.localStorage.removeItem(env("TOKEN_KEY")!);
        window.location.reload();
      },
    },
  ];
  return (
    <Layout.Header className="authing_mtd-header">
      <div className="mtd-header-btns">
        {buttons.map((it, key) => (
          <Button key={key} type="link" {...it} />
        ))}
      </div>
      <Dropdown placement="bottomRight" menu={{ items: dropdowns }}>
        <Avatar className="mtd-avatar" icon={<UserOutlined />} />
      </Dropdown>
    </Layout.Header>
  );
};
