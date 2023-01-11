import { merge } from "lodash";
import { useCallback, useEffect, useRef } from "react";
import { createGlobalState } from "react-use";

import { ApplicationConfig, GuardPageConfig } from "@/interface";

export interface GuardGlobalStateProps {
  publicConfig?: Partial<ApplicationConfig>;
  pageConfig?: Partial<GuardPageConfig>;
  changedConfig?: Partial<Omit<GuardGlobalStateProps, "changedConfig">> | null;
}

const useBridgeGlobalState = createGlobalState<GuardGlobalStateProps>({});

export const useGuardGlobalState = (): [
  GuardGlobalStateProps,
  (state: Partial<GuardGlobalStateProps>, cover?: boolean) => void
] => {
  const [globalState, setGlobalState] = useBridgeGlobalState();
  const stateRef = useRef<GuardGlobalStateProps>();
  useEffect(() => {
    stateRef.current = globalState;
  }, [globalState]);
  const setMergeState = useCallback(
    (state: Partial<GuardGlobalStateProps>, cover?: boolean) => {
      const newState = merge({}, cover ? null : stateRef.current, state);
      setGlobalState(newState);
    },
    [setGlobalState]
  );
  return [globalState, setMergeState];
};
