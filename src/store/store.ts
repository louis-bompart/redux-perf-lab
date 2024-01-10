import { Store as ReduxStore } from "@reduxjs/toolkit";

export type Store = ReduxStore<GlobalState>;
export interface GlobalState {
  a: string;
  b: string;
  c: string;
  d: {
    e: string;
    f: string;
  };
}

export const getInitialState = (): GlobalState => ({
  a: "",
  b: "",
  c: "",
  d: {
    e: "",
    f: "",
  },
});
