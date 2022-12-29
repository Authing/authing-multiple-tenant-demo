import "./index.less";

import { Button } from "antd";

import TenantGetStartedIcon from "@/assets/tenant-get-started-icon.svg";
import env from "@/config/env";
import { ArrowRightOutlined } from "@ant-design/icons";

export const GetStart = () => {
  return (
    <div className="authing_mtd-get-started">
      <img className="mtd-icon" src={TenantGetStartedIcon} />
      <h2>🎉 恭喜你已成功登录“天气预报应用”</h2>
      <p className="mtd-desc">
        该登录为体验登录页面，具体页面以真实业务场景为准
      </p>
      <Button type="primary" onClick={() => window.open(env("DOC_API_URL"))}>
        查看更多 API <ArrowRightOutlined />
      </Button>
    </div>
  );
};
