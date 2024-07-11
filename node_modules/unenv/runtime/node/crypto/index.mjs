import * as web from "./web.mjs";
import * as node from "./node.mjs";
export * from "./web.mjs";
export * from "./node.mjs";
export default {
  ...web,
  ...node
};
