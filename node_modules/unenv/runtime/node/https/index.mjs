import { notImplemented, notImplementedClass } from "../../_internal/utils.mjs";
export const Server = notImplementedClass("https.Server");
export const Agent = notImplementedClass("https.Agent");
export const globalAgent = void 0;
export const get = notImplemented("https.get");
export const createServer = notImplemented("https.createServer");
export const request = notImplemented("https.request");
export default {
  Server,
  Agent,
  globalAgent,
  get,
  createServer,
  request
};
