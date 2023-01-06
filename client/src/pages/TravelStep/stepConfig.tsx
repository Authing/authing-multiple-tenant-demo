export enum STEPS {
  step1 = "CREATE_ORGANIZTION",
  step2 = "INVITE_USER",
  step3 = "BRAND_SETTING",
  step4 = "DOC_EXPLAIN",
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

export const StepConfig: Record<STEPS, StepConfigValueType> = {
  [STEPS.step1]: {
    path: "create-organization",
    header: { title: "1. 创建组织" },
  },
  [STEPS.step2]: {
    path: "invite-user",
    backTo: () => StepConfig[STEPS.step1].path,
    header: { title: "2. 邀请成员" },
    footer: () => {
      return {
        btnText: "品牌化设置",
        btnTo: StepConfig[STEPS.step3].path,
      };
    },
  },
  [STEPS.step3]: {
    path: "brand-setting",
    backTo: () => StepConfig[STEPS.step2].path,
    header: () => {
      return {
        title: "3. 品牌化设置",
        skipTo: "/get-started",
      };
    },
    footer: () => {
      return {
        btnText: "通过 API 管理用户",
        btnTo: StepConfig[STEPS.step4].path,
      };
    },
  },
  [STEPS.step4]: {
    path: "doc-explain",
    backTo: () => StepConfig[STEPS.step3].path,
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
