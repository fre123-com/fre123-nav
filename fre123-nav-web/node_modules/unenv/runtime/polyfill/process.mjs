import _process from "../node/process/index.mjs";
import _global from "./global-this.mjs";
_global.process = _global.process || _process;
export default _global.process;
