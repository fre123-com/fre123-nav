import { EventEmitter as _EventEmitter, once as _once } from "./_events.mjs";
export const EventEmitter = globalThis.EventEmitter || _EventEmitter;
export const once = _once;
export default {
  EventEmitter,
  once
};
