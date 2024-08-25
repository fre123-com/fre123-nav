import os from "os";
import { codeFrameColumns } from "@babel/code-frame";
function createFrame({
  source,
  location
}) {
  const frame = codeFrameColumns(source, location, {
    highlightCode: true
  }).split("\n").map((line) => "  " + line).join(os.EOL);
  return frame;
}
function tsLocationToBabelLocation(tsLoc) {
  return {
    start: { line: tsLoc.start.line + 1, column: tsLoc.start.character + 1 },
    end: { line: tsLoc.end.line + 1, column: tsLoc.end.character + 1 }
  };
}
export {
  createFrame,
  tsLocationToBabelLocation
};
//# sourceMappingURL=codeFrame.js.map