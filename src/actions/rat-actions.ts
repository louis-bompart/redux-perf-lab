import { createAction } from "@reduxjs/toolkit";

export const ratAction = createAction(
  "ratAction",
  function prepare(
    key: "a" | "b" | "c" | "d" | "e" | "f",
    value: typeof key extends "d" ? { e: string; f: string } : string
  ) {
    return {
      payload: {
        [key]: value,
      },
    };
  }
);
