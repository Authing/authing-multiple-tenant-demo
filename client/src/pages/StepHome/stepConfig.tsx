import { To } from "react-router-dom";

import { ApplicationConfig } from "@/interface";

export enum STEPS {
  step1 = "CREATE_ORGANIZTION",
  step2 = "INVITE_USER",
  step3 = "BRAND_SETTING",
  step4 = "DOC_EXPLAIN",
}

export interface StepHeaderType {
  title?: React.ReactNode;
  skipTo?: To;
}

export interface StepFooterType {
  btnText?: React.ReactNode;
  btnTo?: To;
}

export interface StepConfigValueType {
  path: string;
  backTo?: string | ((...args: any) => To);
  header?: StepHeaderType | ((...args: any) => StepHeaderType);
  footer?: StepFooterType | ((...args: any) => StepFooterType);
}

export const StepConfig: Record<STEPS, StepConfigValueType> = {
  [STEPS.step1]: {
    path: "create-organization",
    header: { title: "1. 创建组织" },
  },
  [STEPS.step2]: {
    path: "invite-user",
    backTo: () => ({ pathname: StepConfig[STEPS.step1].path }),
    header: { title: "2. 邀请成员" },
    footer: () => {
      return {
        btnText: "品牌化设置",
        btnTo: {
          pathname: StepConfig[STEPS.step3].path,
          search: window.location.search,
        },
      };
    },
  },
  [STEPS.step3]: {
    path: "brand-setting",
    backTo: () => ({
      pathname: StepConfig[STEPS.step2].path,
      search: window.location.search,
    }),
    header: () => {
      return {
        title: "3. 品牌化设置",
        skipTo: { pathname: "/get-started", search: window.location.search },
      };
    },
    footer: () => {
      return {
        btnText: "通过 API 管理用户",
        btnTo: {
          pathname: StepConfig[STEPS.step4].path,
          search: window.location.search,
        },
      };
    },
  },
  [STEPS.step4]: {
    path: "doc-explain",
    backTo: () => ({
      pathname: StepConfig[STEPS.step3].path,
      search: window.location.search,
    }),
    header: () => ({
      title: "4. 通过 API 管理组织成员",
      skipTo: { pathname: "/get-started", search: window.location.search },
    }),
    footer: (app: ApplicationConfig) => ({
      btnText: `进入组织，开启「${app?.name}」之旅`,
      btnTo: { pathname: "/get-started", search: window.location.search },
    }),
  },
};
