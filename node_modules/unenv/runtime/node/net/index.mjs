import { notImplemented, notImplementedClass } from "../../_internal/utils.mjs";
import { Socket, SocketAddress } from "./socket.mjs";
export { Socket, SocketAddress } from "./socket.mjs";
export const createServer = notImplemented(
  "net.createServer"
);
export const Server = notImplementedClass("net.Server");
export const BlockList = notImplementedClass(
  "net.BlockList"
);
export const connect = notImplemented("net.connect");
export const createConnection = notImplemented(
  "net.createConnection"
);
export const getDefaultAutoSelectFamily = notImplemented(
  "net.getDefaultAutoSelectFamily"
);
export const setDefaultAutoSelectFamily = notImplemented(
  "net.setDefaultAutoSelectFamily"
);
export const getDefaultAutoSelectFamilyAttemptTimeout = notImplemented(
  "net.getDefaultAutoSelectFamilyAttemptTimeout"
);
export const setDefaultAutoSelectFamilyAttemptTimeout = notImplemented(
  "net.setDefaultAutoSelectFamilyAttemptTimeout"
);
const IPV4Regex = /^(?:\d{1,3}\.){3}\d{1,3}$/;
export const isIPv4 = (host) => IPV4Regex.test(host);
const IPV6Regex = /^([\dA-Fa-f]{1,4}:){7}[\dA-Fa-f]{1,4}$/;
export const isIPv6 = (host) => IPV6Regex.test(host);
export const isIP = (host) => {
  if (isIPv4(host)) {
    return 4;
  }
  if (isIPv6(host)) {
    return 6;
  }
  return 0;
};
export const exports = {
  Socket,
  // TODO
  Server,
  BlockList,
  SocketAddress,
  createServer,
  connect,
  createConnection,
  isIPv4,
  isIPv6,
  isIP,
  getDefaultAutoSelectFamily,
  getDefaultAutoSelectFamilyAttemptTimeout,
  setDefaultAutoSelectFamily,
  setDefaultAutoSelectFamilyAttemptTimeout
};
export default exports;
