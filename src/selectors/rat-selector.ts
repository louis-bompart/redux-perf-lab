import { GlobalState } from "../store/store.js";

export interface ComplexRatProperty {
    ef: string;
    c: string;
}

export const simpleRatPropertySelector = (state: GlobalState): string => state.a;
export const complexRatPropertySelector = (state: GlobalState): ComplexRatProperty => ({ef: `${state.d.e} ${state.d.f}`, c: state.c});
