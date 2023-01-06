import { createContext } from "react";

export interface GlobalState {
  /** 应用 ID */
  appId: string;
}

export const GlobalState = createContext<GlobalState>({} as GlobalState);
