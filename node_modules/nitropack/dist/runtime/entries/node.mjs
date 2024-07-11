import "#internal/nitro/virtual/polyfill";
import { toNodeListener } from "h3";
import { nitroApp } from "../app.mjs";
import { trapUnhandledNodeErrors } from "../utils.mjs";
export const listener = toNodeListener(nitroApp.h3App);
export const handler = listener;
trapUnhandledNodeErrors();
