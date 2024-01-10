import { Unsubscribe } from "@reduxjs/toolkit";
import { Store } from "../store/store.js";

export interface Subscribable {
  /**
   * Adds a callback that's invoked on state change.
   *
   * @param listener A callback that's invoked on state change.
   * @returns A function to remove the listener.
   */
  subscribe(listener: () => void): Unsubscribe;
}

export interface Controller extends Subscribable {
  readonly state: {};
}

export function buildController(store: Store): Controller {
  let prevState: unknown;
  const listeners: Map<Symbol, () => void> = new Map();
  const hasNoListeners = () => listeners.size === 0;

  const hasStateChanged = (currentState: unknown): boolean => {
    const hasChanged = prevState !== currentState;
    prevState = currentState;
    return hasChanged;
  };

  return {
    subscribe(listener: () => void) {
      listener();
      const symbol = Symbol();
      let unsubscribe: () => void;

      if (hasNoListeners()) {
        prevState = this.state;
        unsubscribe = store.subscribe(() => {
          if (hasStateChanged(this.state)) {
            listeners.forEach((listener) => listener());
          }
        });
      }
      listeners.set(symbol, listener);

      return () => {
        listeners.delete(symbol);
        if (hasNoListeners()) {
          unsubscribe?.();
        }
      };
    },

    get state() {
      return {};
    },
  };
}
