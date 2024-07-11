import { Duplex } from "./duplex.mjs";
export class _Transform extends Duplex {
  __unenv__ = true;
  _transform(chunk, encoding, callback) {
  }
  _flush(callback) {
  }
}
export const Transform = globalThis.Transform || _Transform;
