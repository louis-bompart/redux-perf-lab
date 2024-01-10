import { Controller, buildController } from "./base-controller.js";
import {
  complexRatPropertySelector,
  simpleRatPropertySelector,
} from "../selectors/rat-selector.js";
import { Store } from "../store/store.js";
import { ratReducer } from "../reducers/rat-slice.js";
import { ratAction } from "../actions/rat-actions.js";

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

  const getSimpleProperty = (store: Store) =>
    simpleRatPropertySelector(store.getState());
  const getComplexProperty = (store: Store) =>
    complexRatPropertySelector(store.getState());

  const computeState = (store: Store): RatState => ({
    simpleProperty: getSimpleProperty(store),
    complexProperty: getComplexProperty(store),
  });

  return {
    ...controller,

    get state() {
      return computeState(store);
    },

    isThisSimpleProp(this: RatController, value: string) {
      return this.state.simpleProperty === value;
    },
    
    setProp(key, value) {
      store.dispatch(ratAction(key, value));
    },
  };
}
