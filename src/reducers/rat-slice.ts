import { createReducer } from "@reduxjs/toolkit";
import {
  GlobalState,
  getInitialState as getGlobalInitialState,
} from "../store/store.js";
import { ratAction } from "../actions/rat-actions.js";

const getRatInitialState = (): GlobalState => getGlobalInitialState();

export const ratReducer = createReducer(getRatInitialState(), (builder) => {
  builder.addCase(ratAction, (state, action) => {
    const modifiedProp = Object.keys(action.payload)[0];
    switch (modifiedProp) {
      case "f":
      case "e":
        return { ...state, d: { ...state.d, ...action.payload } };
      default:
        return { ...state, ...action.payload };
    }
  });
});
