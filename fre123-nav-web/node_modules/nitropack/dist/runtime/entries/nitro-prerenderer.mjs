import "#internal/nitro/virtual/polyfill";
import { nitroApp } from "../app.mjs";
import { trapUnhandledNodeErrors } from "../utils.mjs";
export const localFetch = nitroApp.localFetch;
trapUnhandledNodeErrors();
