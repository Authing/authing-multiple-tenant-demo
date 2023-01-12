import "./index.less";

import { Button, Col, Modal, Row, Spin } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getApplicationConfig } from "@/api/application";
import { updateBrandingConfig } from "@/api/branding";
import { GuardConfigPannel } from "@/components/GuardConfigPannel";
import { GuardScreen } from "@/components/GuardScreen";
import env from "@/config/env";
import { useGlobalState } from "@/context/globalContext";
import { useGuardGlobalState } from "@/context/guardContext";
import {
  GuardAppendConfig,
  GuardOptions,
  GuardProvider,
} from "@authing/guard-react18";

export const BrandSetting = () => {
  const [{ appId }] = useGlobalState();
  const [searchParams] = useSearchParams();
  const [guardState, setGuardState] = useGuardGlobalState();
  const [retry, setRetry] = useState({});
  const tenantId = searchParams.get("tenant_id")!;

  useEffect(() => {
    if (!appId) return;
    getApplicationConfig(appId).then((res) => {
      const data = res?.data;
      setGuardState({ publicConfig: data ?? {} });
    });
  }, [appId, retry]);

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
    Modal.confirm({
      title: "提示",
      content: "保存后，所有配置立即发布生效，是否确定？",
      onOk: async () => {
        await updateBrandingConfig({
          update: guardState?.changedConfig?.publicConfig,
        });
        setRetry({});
        setGuardState({ changedConfig: null });
      },
    });
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
