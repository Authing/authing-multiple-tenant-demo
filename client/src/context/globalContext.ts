import { merge } from "lodash";
import { useCallback, useEffect, useRef } from "react";
import { createGlobalState } from "react-use";

export interface GlobalState {
  /** 应用 ID */
  appId: string;
  /** 租户 ID */
  tenantId?: string;
}

const useBridgeGlobalState = createGlobalState<GlobalState>({} as GlobalState);

/** 全局上下文 */
export const useGlobalState = (): [
  GlobalState,
  (state: GlobalState, cover?: boolean) => void
] => {
  const [globalState, setGlobalState] = useBridgeGlobalState();
  const stateRef = useRef<GlobalState>();

  useEffect(() => {
    stateRef.current = globalState;
  }, [globalState]);
  const setMergeState = useCallback(
    (state: GlobalState, cover?: boolean) => {
      const newState = merge({}, cover ? null : stateRef.current, state);
      setGlobalState(newState);
    },
    [setGlobalState]
  );

  return [globalState, setMergeState];
};
