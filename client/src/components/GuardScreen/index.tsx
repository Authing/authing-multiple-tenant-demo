import { Spin } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";

import { GuardPanelFooter } from "@/components/GuardPanelFooter";
import { SandBox, SandBoxContext } from "@/components/SandBox";
import { Guard, GuardProps } from "@authing/react18-ui-components";
import { default as guardStyle } from "@authing/react18-ui-components/lib/index.min.css";

import { default as iframeDesktopStyle } from "./iframe-desktop-style.css";

export interface GuardScreenProps extends GuardProps {
  className?: string;
  style?: React.CSSProperties;
}

export const GuardScreen = (props: GuardScreenProps) => {
  const { style, className, ...guardProps } = props;
  const [everythingReady, setEverythingReady] = useState(false);
  const [ctx, setCtx] = useState<SandBoxContext>();
  const handleLoaded = useCallback((ctx: any) => {
    setCtx(ctx);
  }, []);
  useEffect(() => {
    if (ctx?.document && ctx?.window) {
      setEverythingReady(true);
    }
  }, [ctx]);

  const guardPanelState: any = {};
  const iframeHeadDOM = useMemo<React.ReactNode>(() => {
    return (
      <>
        <style>{guardStyle}</style>
        <style>{iframeDesktopStyle}</style>
        <style>{`:root{--authing-guard-bg:${
          guardPanelState?.publicConfig?.loadingBackground ?? "#fff" //TODO:
        }}`}</style>
      </>
    );
  }, [iframeDesktopStyle, guardStyle]);
  return (
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
            <div className="guardContainer">
              <Guard {...guardProps} />
              <GuardPanelFooter />
            </div>
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
  );
};
