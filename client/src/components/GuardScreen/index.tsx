import { Spin } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";

import { GuardPanelFooter } from "@/components/GuardPanelFooter";
import { SandBox, SandBoxContext } from "@/components/SandBox";
import { useGuard } from "@authing/guard-react18";
import { default as guardStyle } from "@authing/guard-react18/dist/esm/guard.min.css";

import { default as iframeDesktopStyle } from "./iframe-desktop-style.css";

export interface GuardScreenProps {
  className?: string;
  style?: React.CSSProperties;
  background?: string;
  /** 自定义 css */
  customCss?: string;
}

export const GuardScreen = (props: GuardScreenProps) => {
  const { style, className, background, customCss } = props;
  const [everythingReady, setEverythingReady] = useState(false);
  const [ctx, setCtx] = useState<SandBoxContext>();
  const guard = useGuard();
  const handleLoaded = useCallback((ctx: any) => {
    setCtx(ctx);
  }, []);
  useEffect(() => {
    if (ctx?.document && ctx?.window) {
      setEverythingReady(true);
    }
  }, [ctx]);

  const iframeHeadDOM = useMemo<React.ReactNode>(() => {
    return (
      <>
        <style>{guardStyle}</style>
        <style>{iframeDesktopStyle}</style>
        <style>{`:root{--authing-guard-bg:${background ?? "#fff"}}`}</style>
        {customCss && <style>{customCss}</style>}
      </>
    );
  }, [iframeDesktopStyle, guardStyle, background, customCss]);

  useEffect(() => {
    if (!everythingReady) return;
    const selector = ctx?.document?.querySelector?.("#authing-guard-container");
    guard.start(selector as any);
  }, [guard, everythingReady]);

  return (
    <>
      <SandBox
        className={className}
        style={style}
        headContent={iframeHeadDOM}
        onLoaded={handleLoaded}
      >
        <div
          id="root"
          style={{
            background: "#f8f9ff",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="ant-layout  authing-guard-layout authing-user-portal-layout">
            {everythingReady ? (
              <>
                <div className="guardContainer">
                  <div id="authing-guard-container"></div>
                  <GuardPanelFooter />
                </div>
              </>
            ) : (
              <div
                style={{
                  top: 0,
                  left: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spin />
              </div>
            )}
          </div>
        </div>
      </SandBox>
    </>
  );
};
