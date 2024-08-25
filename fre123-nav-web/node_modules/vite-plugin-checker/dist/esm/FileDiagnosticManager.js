class FileDiagnosticManager {
  constructor() {
    this.diagnostics = [];
    this.initialized = false;
  }
  /**
   * Only used when initializing the manager
   */
  initWith(diagnostics) {
    if (this.initialized) {
      throw new Error("FileDiagnosticManager is already initialized");
    }
    diagnostics.forEach((d) => {
      this.diagnostics.push(d);
    });
    this.initialized = true;
  }
  getDiagnostics(fileName) {
    if (fileName) {
      return this.diagnostics.filter((f) => f.id === fileName);
    }
    return this.diagnostics;
  }
  updateByFileId(fileId, next) {
    var _a;
    for (let i = 0; i < this.diagnostics.length; i++) {
      if (((_a = this.diagnostics[i]) == null ? void 0 : _a.id) === fileId) {
        this.diagnostics.splice(i, 1);
        i--;
      }
    }
    if (next == null ? void 0 : next.length) {
      this.diagnostics.push(...next);
    }
  }
}
export {
  FileDiagnosticManager
};
//# sourceMappingURL=FileDiagnosticManager.js.map