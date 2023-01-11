import "./index.less";

import { Button, Spin } from "antd";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Link, Outlet, useMatches, useNavigate } from "react-router-dom";

import { checkAuth } from "@/utils/checkToken";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

import { StepConfig, STEPS } from "./stepConfig";

const optional = <T,>(fn: T, ...args: any): Exclude<T, Function> => {
  return typeof fn === "function" ? fn(...args) : fn;
};

export const StepHome = () => {
  const finalMatch = useMatches()?.at(-1);
  const stepConfig = StepConfig?.[finalMatch?.id as STEPS];
  const back = optional(stepConfig?.backTo);
  const header = optional(stepConfig?.header);
  const footer = optional(stepConfig?.footer);
  const nav = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    checkAuth()
      .then(() => setReady(true))
      .catch(() => nav(`/login`));
  }, []);

  return ready ? (
    <div
      className={classNames("authing_mtd-travel-step", {
        "has-header": !!header,
        "has-footer": !!footer,
      })}
    >
      {back && (
        <Link style={{ color: "#8A92A6" }} to={back!}>
          <ArrowLeftOutlined />
          &nbsp;返回
        </Link>
      )}
      {header && (
        <header className="mtd-header">
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h2 style={{ margin: "auto 0" }}>{header?.title}</h2>
            {header?.skipTo && (
              <Link style={{ margin: "auto 0" }} to={header?.skipTo!}>
                跳过&nbsp;
                <ArrowRightOutlined />
              </Link>
            )}
          </div>
        </header>
      )}
      <main className="mtd-main">
        <Outlet />
      </main>
      {footer && (
        <footer className="mtd-footer">
          <center>
            <Link to={footer?.btnTo!}>
              <Button type="primary">
                {footer?.btnText}
                <ArrowRightOutlined />
              </Button>
            </Link>
          </center>
        </footer>
      )}
    </div>
  ) : (
    <Spin
      size="large"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
};
