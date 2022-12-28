import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

export enum STEP_KEYS {
  CREATE_ORGANIZTION = "CREATE_ORGANIZTION",
  INVITE_USER = "INVITE_USER",
  BRAND_SETTING = "BRAND_SETTING",
  DOC_EXPLAIN = "DOC_EXPLAIN",
}

export interface StepHeaderType {
  title?: React.ReactNode;
  skipTo?: string;
}

export interface StepFooterType {
  btnText?: React.ReactNode;
  btnTo?: string;
}

export interface StepConfigValueType {
  path: string;
  backTo?: string | ((...args: any) => string);
  header?: StepHeaderType | ((...args: any) => StepHeaderType);
  footer?: StepFooterType | ((...args: any) => StepFooterType);
}

export const StepConfig: Record<STEP_KEYS, StepConfigValueType> = {
  [STEP_KEYS.CREATE_ORGANIZTION]: {
    path: "create-organization",
    header: { title: "1. 创建组织" },
  },
  [STEP_KEYS.INVITE_USER]: {
    path: "invite-user",
    backTo: () => StepConfig[STEP_KEYS.CREATE_ORGANIZTION].path,
    header: { title: "2. 邀请成员" },
    footer: () => {
      return {
        btnText: "品牌化设置",
        btnTo: StepConfig[STEP_KEYS.BRAND_SETTING].path,
      };
    },
  },
  [STEP_KEYS.BRAND_SETTING]: {
    path: "brand-setting",
    backTo: () => StepConfig[STEP_KEYS.INVITE_USER].path,
    header: () => {
      return {
        title: "3. 品牌化设置",
        skipTo: "/get-started",
      };
    },
    footer: () => {
      return {
        btnText: "通过 API 管理用户",
        btnTo: StepConfig[STEP_KEYS.DOC_EXPLAIN].path,
      };
    },
  },
  [STEP_KEYS.DOC_EXPLAIN]: {
    path: "doc-explain",
    backTo: () => StepConfig[STEP_KEYS.BRAND_SETTING].path,
    header: () => ({
      title: "4. 通过 API 管理组织成员",
      skipTo: "/get-started",
    }),
    footer: () => ({
      btnText: "进入组织，开启「应用名称」之旅", //TODO: 应用名称代填
      btnTo: "/get-started",
    }),
  },
};
