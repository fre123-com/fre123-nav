import { notImplemented } from "../../_internal/utils.mjs";
import {
  Buffer as _Buffer,
  kMaxLength,
  INSPECT_MAX_BYTES,
  SlowBuffer
} from "./_buffer.mjs";
import { File } from "./_file.mjs";
export { kMaxLength, INSPECT_MAX_BYTES, SlowBuffer } from "./_buffer.mjs";
export const Buffer = globalThis.Buffer || _Buffer;
export { File } from "./_file.mjs";
export const Blob = globalThis.Blob;
export const resolveObjectURL = notImplemented("buffer.resolveObjectURL");
export const transcode = notImplemented("buffer.transcode");
export const isUtf8 = notImplemented("buffer.isUtf8");
export const isAscii = notImplemented("buffer.isAscii");
export const btoa = global.btoa;
export const atob = globalThis.atob;
export const kStringMaxLength = 0;
export const constants = {
  MAX_LENGTH: kMaxLength,
  MAX_STRING_LENGTH: kStringMaxLength
};
export default {
  Buffer,
  SlowBuffer,
  kMaxLength,
  INSPECT_MAX_BYTES,
  Blob,
  resolveObjectURL,
  transcode,
  btoa,
  atob,
  kStringMaxLength,
  constants,
  isUtf8,
  isAscii,
  File
};
