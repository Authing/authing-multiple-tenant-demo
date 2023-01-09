import "./index.less";

import { Button, Col, Row } from "antd";
import { useCallback, useEffect, useMemo } from "react";

import { getPublicConfig } from "@/api";
import { GuardConfigPannel } from "@/components/GuardConfigPannel";
import { GuardScreen } from "@/components/GuardScreen";
import env from "@/config/env";
import { useGuardGlobalState } from "@/context/guardContext";
import { useStepGlobalState } from "@/context/stepContext";
import {
  GuardAppendConfig,
  GuardOptions,
  GuardProvider,
} from "@authing/guard-react18";

export const BrandSetting = () => {
  const [{ appId, tenantId }] = useStepGlobalState();
  const [guardState, setGuardState] = useGuardGlobalState();

  useEffect(() => {
    if (!appId) return;
    getPublicConfig(appId).then((res) => {
      const data = res?.data?.data;
      setGuardState({ publicConfig: data ?? {} });
    });
  }, [appId]);

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

  const guardConfig = useMemo<GuardOptions>(
    () => ({
      appId,
      host: env("GUARD_HOST"),
      tenantId,
      appendConfig: appendConfig as GuardAppendConfig,
    }),
    [appId, tenantId, appendConfig]
  );

  const customCss = useMemo(() => {
    if (!guardState?.publicConfig?.cssEnabled) return "";
    return guardState?.publicConfig?.css;
  }, [guardState]);
  const handleSubmit = useCallback(() => {
    console.log("保存配置：", guardState);
  }, [guardState]);

  return (
    <div className="authing_mtd-brand-wrapper">
      <Row justify="end">
        <Col>
          <Button type="primary" onClick={handleSubmit}>
            保存配置
          </Button>
        </Col>
      </Row>
      <Row className="authing_mtd-brand-setting">
        <Col flex="auto">
          {guardConfig?.appId && (
            <GuardProvider {...guardConfig}>
              <GuardScreen
                stopPropagation
                className="authing_mtd-guard-screen"
                background={guardState?.publicConfig?.loadingBackground}
                customCss={customCss!}
              />
            </GuardProvider>
          )}
        </Col>
        <Col flex="400px">
          <GuardConfigPannel className="authing_mtd-gaurd-config-pannel" />
        </Col>
      </Row>
    </div>
  );
};
