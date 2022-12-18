import "./index.less";

import { Button, Col, Row } from "antd";

import { GuardConfigPannel } from "@/components/GuardConfigPannel";
import { GuardScreen } from "@/components/GuardScreen";

export const BrandSetting = () => {
  const appId = "43344";

  return (
    <div className="authing-mtd-brand-wrapper">
      <Row justify="end">
        <Col>
          <Button type="primary">保存配置</Button>
        </Col>
      </Row>
      <Row className="authing-mtd-brand-setting">
        <Col flex="auto">
          <GuardScreen className="authing-mtd-guard-screen" appId={appId} />
        </Col>
        <Col flex="400px">
          <GuardConfigPannel className="authing-mtd-gaurd-config-pannel" />
        </Col>
      </Row>
    </div>
  );
};
