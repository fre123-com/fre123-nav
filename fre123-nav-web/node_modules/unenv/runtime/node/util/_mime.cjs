"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MIMEType = exports.MIMEParams = void 0;
class MIMEType {
  __unenv__ = true;
  params = new MIMEParams();
  type;
  subtype;
  constructor(input) {
    const [essense = "", ...params] = String(input).split(";");
    const [type = "", subtype = ""] = essense.split("/");
    this.type = type;
    this.subtype = subtype;
    this.params = new MIMEParams();
    for (const param of params) {
      const [name, value] = param.split("=");
      this.params.set(name, value);
    }
  }
  get essence() {
    return this.type + "/" + this.subtype;
  }
  toString() {
    const paramsStr = this.params.toString();
    return this.essence + (paramsStr ? `;${paramsStr}` : "");
  }
}
exports.MIMEType = MIMEType;
class MIMEParams extends Map {
  __unenv__ = true;
  get(name) {
    return super.get(name) || null;
  }
  toString() {
    return [...this.entries()].map(([name, value]) => `${name}=${value}`).join("&");
  }
}
exports.MIMEParams = MIMEParams;