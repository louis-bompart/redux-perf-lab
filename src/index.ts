import { configureStore, createReducer } from "@reduxjs/toolkit";
import { buildRat } from "./controllers/rat-controller.js";
import { GlobalState, getInitialState } from "./store/store.js";

const identiyReducer = createReducer(getInitialState(), (builder) => {
  builder.addDefaultCase((state, action) => {
    return state;
  });
});

const store = configureStore<GlobalState>({ reducer: identiyReducer });

const rat = buildRat(store);
const promiseFunction = (resolve) => {
  let calls = 0;
  const propChangesCycleCount = 1e3;
  const setPropPerCycle = 3;
  const targetCalls = propChangesCycleCount * setPropPerCycle;
  rat.subscribe(() => {
    ++calls === targetCalls && resolve();
  });
  let isPairCall = false;
  while (calls < targetCalls) {
    if (isPairCall) {
      rat.setProp("a", "ohno");
      rat.setProp("b", "ninja");
      rat.setProp("f", "nested value");
    } else {
      rat.setProp("a", "ohye");
      rat.setProp("b", "dwarf");
      rat.setProp("f", "nested tater");
    }
    isPairCall = !isPairCall;
  }
};
debugger; //Start recording here, stops on line 25 (add a breakpoint);
await new Promise<void>(promiseFunction);
console.log("end");
