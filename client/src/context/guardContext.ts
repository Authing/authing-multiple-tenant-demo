import { ApplicationConfig, GuardPageConfig } from "@/interface";
import { createGlobalState } from "react-use";

export interface GuardGlobalStateProps {
  publicConfig?: Partial<ApplicationConfig>;
  pageConfig?: Partial<GuardPageConfig>;
}

export const useGuardGlobalState = createGlobalState<GuardGlobalStateProps>({});
