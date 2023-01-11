import "./index.less";

import { Button } from "antd";
import classNames from "classnames";
import { useEffect } from "react";
import { Link, Outlet, useMatches, useNavigate } from "react-router-dom";

import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

import { StepConfig, STEPS } from "./stepConfig";
import { checkAuth } from "@/api";
import { useGlobalState } from "@/context/globalContext";

const optional = <T,>(fn: T, ...args: any): Exclude<T, Function> => {
  return typeof fn === "function" ? fn(...args) : fn;
};

export const StepHome = () => {
  const [{ appId }] = useGlobalState();
  const finalMatch = useMatches()?.at(-1);
  const stepConfig = StepConfig?.[finalMatch?.id as STEPS];
  const back = optional(stepConfig?.backTo);
  const header = optional(stepConfig?.header);
  const footer = optional(stepConfig?.footer);
  const nav = useNavigate();

  useEffect(() => {
    //TODO: 拉用户信息，验证是否有权限，有权限放行，无权限调回home
    checkAuth({ code: "122", appId })
      .then(() => {
        return;
      })
      .catch(() => {
        nav(`/login`);
      });
  }, [appId]);

  return (
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
  );
};