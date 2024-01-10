import { Controller, buildController } from "./base-controller.js";
import {
  ComplexRatProperty,
  complexRatPropertySelector,
  simpleRatPropertySelector,
} from "../selectors/rat-selector.js";
import { GlobalState, Store } from "../store/store.js";
import { ratReducer } from "../reducers/rat-slice.js";
import { ratAction } from "../actions/rat-actions.js";
import { createSelector } from "@reduxjs/toolkit";

interface RatState {
  simpleProperty: string;
  complexProperty: object;
}

interface RatController extends Controller {
  state: RatState;
  isThisSimpleProp(value: string): boolean;
  setProp(
    key: "a" | "b" | "c" | "d" | "e" | "f",
    value: typeof key extends "d" ? { e: string; f: string } : string
  ): void;
}

export function buildRat(store: Store): RatController {
  const controller = buildController(store);
  // Simplification, in Headless we would use the reducer manager.
  store.replaceReducer(ratReducer);

  const getSimpleProperty = (state: GlobalState) =>
    simpleRatPropertySelector(state);
  const getComplexProperty = (state: GlobalState) =>
    complexRatPropertySelector(state);

  const computeState = createSelector(
    [getSimpleProperty, getComplexProperty],
    (
      simpleProperty: string,
      complexProperty: ComplexRatProperty
    ): RatState => ({
      simpleProperty,
      complexProperty,
    })
  );

  return {
    ...controller,

    get state() {
      return computeState(store.getState());
    },

    isThisSimpleProp(this: RatController, value: string) {
      return this.state.simpleProperty === value;
    },

    setProp(key, value) {
      store.dispatch(ratAction(key, value));
    },
  };
}
