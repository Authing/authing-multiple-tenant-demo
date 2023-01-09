import { merge } from "lodash";
import { useCallback, useEffect, useRef } from "react";
import { createGlobalState } from "react-use";

export interface StepGlobalState {
  /** 应用 ID */
  appId: string;
  /** 租户 ID */
  tenantId?: string;
}

const useBridgeGlobalState = createGlobalState<StepGlobalState>(
  {} as StepGlobalState
);

/** 全局上下文 */
export const useStepGlobalState = (): [
  StepGlobalState,
  (state: StepGlobalState, cover?: boolean) => void
] => {
  const [globalState, setGlobalState] = useBridgeGlobalState();
  const stateRef = useRef<StepGlobalState>();

  useEffect(() => {
    stateRef.current = globalState;
  }, [globalState]);
  const setMergeState = useCallback(
    (state: StepGlobalState, cover?: boolean) => {
      const newState = merge({}, cover ? null : stateRef.current, state);
      setGlobalState(newState);
    },
    [setGlobalState]
  );

  return [globalState, setMergeState];
};
