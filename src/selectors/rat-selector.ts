import { createSelector } from "@reduxjs/toolkit";
import { GlobalState } from "../store/store.js";

export interface ComplexRatProperty {
  ef: string;
  c: string;
}

export const simpleRatPropertySelector = (state: GlobalState): string =>
  state.a;

export const complexRatPropertySelector = createSelector(
  [
    (state: GlobalState) => state.c,
    (state: GlobalState) => state.d.e,
    (state: GlobalState) => state.d.f,
  ],
  (c, e, f): ComplexRatProperty => ({ ef: `${e} ${f}`, c: c })
);
