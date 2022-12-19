import "./index.less";

import { Button, Col, Row } from "antd";
import { useCallback, useMemo } from "react";

import { GuardConfigPannel } from "@/components/GuardConfigPannel";
import { GuardScreen } from "@/components/GuardScreen";
import { useGuardGlobalState } from "@/context/guardContext";
import { GuardAppendConfig } from "@authing/react18-ui-components";
import env from "@/config/env";

export const BrandSetting = () => {
  const appId = "43344";
  const [guardState] = useGuardGlobalState();

  const guardConfig = useMemo(() => ({ host: env("GUARD_HOST") }), []);
  const appendConfig = useMemo(
    () => ({
      ...(guardState?.publicConfig && {
        publicConfig: guardState.publicConfig,
      }),
      ...(guardState?.pageConfig && {
        pageConfig: guardState.pageConfig,
      }),
    }),
    [guardState]
  );
  const handleSubmit = useCallback(() => {
    console.log("保存配置：", guardState);
  }, [guardState]);

  return (
    <div className="authing-mtd-brand-wrapper">
      <Row justify="end">
        <Col>
          <Button type="primary" onClick={handleSubmit}>
            保存配置
          </Button>
        </Col>
      </Row>
      <Row className="authing-mtd-brand-setting">
        <Col flex="auto">
          <GuardScreen
            className="authing-mtd-guard-screen"
            background={guardState?.publicConfig?.loadingBackground}
            appId={appId}
            config={guardConfig}
            appendConfig={appendConfig as GuardAppendConfig}
          />
        </Col>
        <Col flex="400px">
          <GuardConfigPannel className="authing-mtd-gaurd-config-pannel" />
        </Col>
      </Row>
    </div>
  );
};
