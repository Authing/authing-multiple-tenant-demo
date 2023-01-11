import { merge } from "lodash";
import { useCallback, useEffect, useRef } from "react";
import { createGlobalState } from "react-use";

import CONFIG_ME_FIRST from "@/CONFIG_ME_FIRST";
import { ApplicationConfig } from "@/interface";

export interface GlobalState {
  /** 应用 ID */
  appId: string;
  /** 应用相关信息 */
  applications?: ApplicationConfig;
}

const useBridgeGlobalState = createGlobalState<GlobalState>({
  appId: CONFIG_ME_FIRST.appId,
} as GlobalState);

/** 全局上下文 */
export const useGlobalState = (): [
  GlobalState,
  (state: Partial<GlobalState>, cover?: boolean) => void
] => {
  const [globalState, setGlobalState] = useBridgeGlobalState();
  const stateRef = useRef<GlobalState>();

  useEffect(() => {
    stateRef.current = globalState;
  }, [globalState]);
  const setMergeState = useCallback(
    (state: Partial<GlobalState>, cover?: boolean) => {
      const newState = merge({}, cover ? null : stateRef.current, state);
      setGlobalState(newState);
    },
    [setGlobalState]
  );

  return [globalState, setMergeState];
};
