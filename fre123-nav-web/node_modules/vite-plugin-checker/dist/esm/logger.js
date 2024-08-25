var _a;
import chalk from "chalk";
import fs from "fs";
import { createRequire } from "module";
import os from "os";
import strip from "strip-ansi";
import * as _vscodeUri from "vscode-uri";
const URI = ((_a = _vscodeUri == null ? void 0 : _vscodeUri.default) == null ? void 0 : _a.URI) ?? _vscodeUri.URI;
import { parentPort } from "worker_threads";
import { codeFrameColumns } from "@babel/code-frame";
import { WS_CHECKER_ERROR_EVENT } from "./client/index.js";
import {
  ACTION_TYPES,
  DiagnosticLevel
} from "./types.js";
import { isMainThread } from "./utils.js";
const _require = createRequire(import.meta.url);
const defaultLogLevel = [
  DiagnosticLevel.Warning,
  DiagnosticLevel.Error,
  DiagnosticLevel.Suggestion,
  DiagnosticLevel.Message
];
function filterLogLevel(diagnostics, level = defaultLogLevel) {
  if (Array.isArray(diagnostics)) {
    return diagnostics.filter((d) => {
      if (typeof d.level !== "number")
        return false;
      return level.includes(d.level);
    });
  } else {
    if (!diagnostics.level)
      return null;
    return level.includes(diagnostics.level) ? diagnostics : null;
  }
}
function diagnosticToTerminalLog(d, name) {
  const nameInLabel = name ? `(${name})` : "";
  const boldBlack = chalk.bold.rgb(0, 0, 0);
  const labelMap = {
    [DiagnosticLevel.Error]: boldBlack.bgRedBright(` ERROR${nameInLabel} `),
    [DiagnosticLevel.Warning]: boldBlack.bgYellowBright(` WARNING${nameInLabel} `),
    [DiagnosticLevel.Suggestion]: boldBlack.bgBlueBright(` SUGGESTION${nameInLabel} `),
    [DiagnosticLevel.Message]: boldBlack.bgCyanBright(` MESSAGE${nameInLabel} `)
  };
  const levelLabel = labelMap[d.level ?? DiagnosticLevel.Error];
  const fileLabel = boldBlack.bgCyanBright(" FILE ") + " ";
  const position = d.loc ? chalk.yellow(d.loc.start.line) + ":" + chalk.yellow(d.loc.start.column) : "";
  return [
    levelLabel + " " + d.message,
    fileLabel + d.id + ":" + position + os.EOL,
    d.codeFrame + os.EOL,
    d.conclusion
  ].filter(Boolean).join(os.EOL);
}
function diagnosticToRuntimeError(diagnostics) {
  const diagnosticsArray = Array.isArray(diagnostics) ? diagnostics : [diagnostics];
  const results = diagnosticsArray.map((d) => {
    let loc;
    if (d.loc) {
      loc = {
        file: d.id ?? "",
        line: d.loc.start.line,
        column: typeof d.loc.start.column === "number" ? d.loc.start.column : 0
      };
    }
    return {
      message: d.message ?? "",
      stack: typeof d.stack === "string" ? d.stack : Array.isArray(d.stack) ? d.stack.join(os.EOL) : "",
      id: d.id,
      frame: d.stripedCodeFrame,
      checkerId: d.checker,
      level: d.level,
      loc
    };
  });
  return Array.isArray(diagnostics) ? results : results[0];
}
function toClientPayload(id, diagnostics) {
  return {
    event: WS_CHECKER_ERROR_EVENT,
    data: {
      checkerId: id,
      diagnostics
    }
  };
}
function createFrame({
  source,
  location
}) {
  const frame = codeFrameColumns(source, location, {
    // worker tty did not fork parent process stdout, let's make a workaround
    forceColor: true
  }).split("\n").map((line) => "  " + line).join(os.EOL);
  return frame;
}
function tsLocationToBabelLocation(tsLoc) {
  return {
    start: { line: tsLoc.start.line + 1, column: tsLoc.start.character + 1 },
    end: { line: tsLoc.end.line + 1, column: tsLoc.end.character + 1 }
  };
}
function wrapCheckerSummary(checkerName, rawSummary) {
  return `[${checkerName}] ${rawSummary}`;
}
function composeCheckerSummary(checkerName, errorCount, warningCount) {
  const message = `Found ${errorCount} error${errorCount > 1 ? "s" : ""} and ${warningCount} warning${warningCount > 1 ? "s" : ""}`;
  const hasError = errorCount > 0;
  const hasWarning = warningCount > 0;
  const color = hasError ? "red" : hasWarning ? "yellow" : "green";
  return chalk[color](wrapCheckerSummary(checkerName, message));
}
function normalizeTsDiagnostic(d) {
  var _a2, _b, _c, _d, _e;
  const fileName = (_a2 = d.file) == null ? void 0 : _a2.fileName;
  const {
    flattenDiagnosticMessageText
  } = _require("typescript");
  const message = flattenDiagnosticMessageText(d.messageText, os.EOL);
  let loc;
  const pos = d.start === void 0 ? null : (_c = (_b = d.file) == null ? void 0 : _b.getLineAndCharacterOfPosition) == null ? void 0 : _c.call(_b, d.start);
  if (pos && d.file && typeof d.start === "number" && typeof d.length === "number") {
    loc = tsLocationToBabelLocation({
      start: (_d = d.file) == null ? void 0 : _d.getLineAndCharacterOfPosition(d.start),
      end: (_e = d.file) == null ? void 0 : _e.getLineAndCharacterOfPosition(d.start + d.length)
    });
  }
  let codeFrame;
  if (loc) {
    codeFrame = createFrame({
      source: d.file.text,
      location: loc
    });
  }
  return {
    message,
    conclusion: "",
    codeFrame,
    stripedCodeFrame: codeFrame && strip(codeFrame),
    id: fileName,
    checker: "TypeScript",
    loc,
    level: d.category
  };
}
function normalizeLspDiagnostic({
  diagnostic,
  absFilePath,
  fileText
}) {
  let level = DiagnosticLevel.Error;
  const loc = lspRange2Location(diagnostic.range);
  const codeFrame = codeFrameColumns(fileText, loc);
  switch (diagnostic.severity) {
    case 1:
      level = DiagnosticLevel.Error;
      break;
    case 2:
      level = DiagnosticLevel.Warning;
      break;
    case 3:
      level = DiagnosticLevel.Message;
      break;
    case 4:
      level = DiagnosticLevel.Suggestion;
      break;
  }
  return {
    message: diagnostic.message.trim(),
    conclusion: "",
    codeFrame,
    stripedCodeFrame: codeFrame && strip(codeFrame),
    id: absFilePath,
    checker: "VLS",
    loc,
    level
  };
}
async function normalizePublishDiagnosticParams(publishDiagnostics) {
  const diagnostics = publishDiagnostics.diagnostics;
  const absFilePath = uriToAbsPath(publishDiagnostics.uri);
  const { readFile } = fs.promises;
  const fileText = await readFile(absFilePath, "utf-8");
  const res = diagnostics.map((d) => {
    return normalizeLspDiagnostic({
      diagnostic: d,
      absFilePath,
      fileText
    });
  });
  return res;
}
function uriToAbsPath(documentUri) {
  return URI.parse(documentUri).fsPath;
}
function lspRange2Location(range) {
  return {
    start: {
      line: range.start.line + 1,
      column: range.start.character + 1
    },
    end: {
      line: range.end.line + 1,
      column: range.end.character + 1
    }
  };
}
function normalizeVueTscDiagnostic(d) {
  const diagnostic = normalizeTsDiagnostic(d);
  diagnostic.checker = "vue-tsc";
  return diagnostic;
}
const isNormalizedDiagnostic = (d) => {
  return Boolean(d);
};
function normalizeEslintDiagnostic(diagnostic) {
  return diagnostic.messages.map((d) => {
    let level = DiagnosticLevel.Error;
    switch (d.severity) {
      case 0:
        level = DiagnosticLevel.Error;
        return null;
      case 1:
        level = DiagnosticLevel.Warning;
        break;
      case 2:
        level = DiagnosticLevel.Error;
        break;
    }
    const loc = {
      start: {
        line: d.line,
        column: d.column
      },
      end: {
        line: d.endLine || 0,
        column: d.endColumn
      }
    };
    const codeFrame = createFrame({
      source: diagnostic.source ?? "",
      location: loc
    });
    return {
      message: `${d.message} (${d.ruleId})`,
      conclusion: "",
      codeFrame,
      stripedCodeFrame: codeFrame && strip(codeFrame),
      id: diagnostic.filePath,
      checker: "ESLint",
      loc,
      level
    };
  }).filter(isNormalizedDiagnostic);
}
function normalizeStylelintDiagnostic(diagnostic) {
  return diagnostic.warnings.map((d) => {
    let level = DiagnosticLevel.Error;
    switch (d.severity) {
      case "warning":
        level = DiagnosticLevel.Warning;
        break;
      case "error":
        level = DiagnosticLevel.Error;
        break;
      default:
        level = DiagnosticLevel.Error;
        return null;
    }
    const loc = {
      start: {
        line: d.line,
        column: d.column
      },
      end: {
        line: d.endLine || 0,
        column: d.endColumn
      }
    };
    const codeFrame = createFrame({
      // @ts-ignore
      source: diagnostic._postcssResult.css ?? "",
      location: loc
    });
    return {
      message: `${d.text} (${d.rule})`,
      conclusion: "",
      codeFrame,
      stripedCodeFrame: codeFrame && strip(codeFrame),
      id: diagnostic.source,
      checker: "Stylelint",
      loc,
      level
    };
  }).filter(isNormalizedDiagnostic);
}
function ensureCall(callback) {
  setTimeout(() => {
    callback();
  });
}
function consoleLog(value) {
  var _a2;
  if (isMainThread) {
    console.log(value);
  } else {
    (_a2 = parentPort) == null ? void 0 : _a2.postMessage({
      type: ACTION_TYPES.console,
      payload: value
    });
  }
}
export {
  composeCheckerSummary,
  consoleLog,
  createFrame,
  diagnosticToRuntimeError,
  diagnosticToTerminalLog,
  ensureCall,
  filterLogLevel,
  lspRange2Location,
  normalizeEslintDiagnostic,
  normalizeLspDiagnostic,
  normalizePublishDiagnosticParams,
  normalizeStylelintDiagnostic,
  normalizeTsDiagnostic,
  normalizeVueTscDiagnostic,
  toClientPayload,
  tsLocationToBabelLocation,
  uriToAbsPath,
  wrapCheckerSummary
};
//# sourceMappingURL=logger.js.map