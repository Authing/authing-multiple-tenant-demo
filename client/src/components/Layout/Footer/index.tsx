import { Layout } from "antd";
import "./index.less";
import PowerBy from "@/assets/Guard_byAuthing.svg";

export interface FooterProps {}

export default (props: FooterProps) => {
  return (
    <Layout.Footer className="authing_mtd-footer">
      <img src={PowerBy} />
    </Layout.Footer>
  );
};
