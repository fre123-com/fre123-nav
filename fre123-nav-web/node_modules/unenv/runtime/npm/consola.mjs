import { createConsola as _createConsola } from "consola/core";
const basicReporter = {
  log(logObj) {
    (console[logObj.type] || console.log)(...logObj.args);
  }
};
export function createConsola(options = {}) {
  return _createConsola({
    reporters: [basicReporter],
    ...options
  });
}
export const consola = createConsola();
consola.consola = consola;
export default consola;
