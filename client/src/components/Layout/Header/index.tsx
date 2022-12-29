import env from "@/config/env";
import { ToolOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, ButtonProps, Layout } from "antd";
import "./index.less";

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
  return (
    <Layout.Header className="authing_mtd-header">
      <div className="mtd-header-btns">
        {buttons.map((it, key) => (
          <Button key={key} type="link" {...it} />
        ))}
      </div>
      <Avatar className="mtd-avatar" icon={<UserOutlined />} />
    </Layout.Header>
  );
};
