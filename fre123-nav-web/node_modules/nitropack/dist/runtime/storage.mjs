import { prefixStorage } from "unstorage";
import { storage } from "#internal/nitro/virtual/storage";
export function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}
