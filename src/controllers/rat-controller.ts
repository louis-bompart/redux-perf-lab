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
import { stat } from "fs";

interface RatState {
  simpleProperty: string;
  complexProperty: object;
  /** The facet ID. */
  facetId: string;

  /** The values of the facet. */
  values: object[];

  /** The active sortCriterion of the facet. */
  sortCriterion: string;

  /** `true` if a search is in progress and `false` otherwise. */
  isLoading: boolean;

  /** `true` if there is at least one non-idle value and `false` otherwise. */
  hasActiveValues: boolean;

  /** `true` if there are more values to display and `false` otherwise. */
  canShowMoreValues: boolean;

  /** `true` if fewer values can be displayed and `false` otherwise. */
  canShowLessValues: boolean;

  /** Whether the facet is enabled and its values are used to filter search results. */
  enabled: boolean;
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

  const getFluffProperties = (state: GlobalState) => ({
    canShowLessValues: 42 % 3 ? false : true,
    canShowMoreValues: 42 % 5 ? false : true,
    enabled: 42 % 6 ? false : true,
    facetId: "facetId",
    hasActiveValues: 42 % 8 ? false : true,
    isLoading: 42 % 9 ? false : true,
    sortCriterion: "sortCriterion",
    values: [
      { a: "b", c: "eeeeeee" },
      { a: "b", c: "eeeeeee" },
      { a: "b", c: "eeeeeee" },
      { a: "b", c: "eeeeeee" },
      { a: "b", c: "eeeeeee" },
      { a: "b", c: "eeeeeee" },
      { a: "b", c: "eeeeeee" },
      { a: "b", c: "eeeeeee" },
    ],
  });

  const computeState = createSelector(
    [getSimpleProperty, getComplexProperty, getFluffProperties],
    (
      simpleProperty: string,
      complexProperty: ComplexRatProperty,
      fluffyProperties
    ): RatState => ({
      simpleProperty,
      complexProperty,
      ...fluffyProperties,
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
