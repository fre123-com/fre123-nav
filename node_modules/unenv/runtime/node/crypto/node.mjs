import { notImplemented, notImplementedClass } from "../../_internal/utils.mjs";
import { getRandomValues } from "./web.mjs";
const MAX_RANDOM_VALUE_BYTES = 65536;
export const webcrypto = new Proxy(
  globalThis.crypto,
  {
    get(_, key) {
      if (key === "CryptoKey") {
        return globalThis.CryptoKey;
      }
      if (typeof globalThis.crypto[key] === "function") {
        return globalThis.crypto[key].bind(globalThis.crypto);
      }
      return globalThis.crypto[key];
    }
  }
);
export const randomBytes = (size, cb) => {
  const bytes = Buffer.alloc(size, 0, void 0);
  for (let generated = 0; generated < size; generated += MAX_RANDOM_VALUE_BYTES) {
    getRandomValues(
      Uint8Array.prototype.slice.call(
        bytes,
        generated,
        generated + MAX_RANDOM_VALUE_BYTES
      )
    );
  }
  if (typeof cb === "function") {
    cb(null, bytes);
    return void 0;
  }
  return bytes;
};
export const fips = false;
export const constants = {};
export const checkPrime = notImplemented("crypto.checkPrime");
export const checkPrimeSync = notImplemented(
  "crypto.checkPrimeSync"
);
export const createCipher = notImplemented(
  "crypto.createCipher"
);
export const createDecipher = notImplemented(
  "crypto.createDecipher"
);
export const pseudoRandomBytes = notImplemented("crypto.pseudoRandomBytes");
export const createCipheriv = notImplemented(
  "crypto.createCipheriv"
);
export const createDecipheriv = notImplemented("crypto.createDecipheriv");
export const createDiffieHellman = notImplemented("crypto.createDiffieHellman");
export const createDiffieHellmanGroup = notImplemented("crypto.createDiffieHellmanGroup");
export const createECDH = notImplemented("crypto.createECDH");
export const createHash = notImplemented("crypto.createHash");
export const createHmac = notImplemented("crypto.createHmac");
export const createPrivateKey = notImplemented("crypto.createPrivateKey");
export const createPublicKey = notImplemented("crypto.createPublicKey");
export const createSecretKey = notImplemented("crypto.createSecretKey");
export const createSign = notImplemented("crypto.createSign");
export const createVerify = notImplemented(
  "crypto.createVerify"
);
export const diffieHellman = notImplemented(
  "crypto.diffieHellman"
);
export const generatePrime = notImplemented(
  "crypto.generatePrime"
);
export const generatePrimeSync = notImplemented("crypto.generatePrimeSync");
export const getCiphers = notImplemented("crypto.getCiphers");
export const getCipherInfo = notImplemented(
  "crypto.getCipherInfo"
);
export const getCurves = notImplemented("crypto.getCurves");
export const getDiffieHellman = notImplemented("crypto.getDiffieHellman");
export const getHashes = notImplemented("crypto.getHashes");
export const hkdf = notImplemented("crypto.hkdf");
export const hkdfSync = notImplemented("crypto.hkdfSync");
export const pbkdf2 = notImplemented("crypto.pbkdf2");
export const pbkdf2Sync = notImplemented("crypto.pbkdf2Sync");
export const generateKeyPair = notImplemented("crypto.generateKeyPair");
export const generateKeyPairSync = notImplemented("crypto.generateKeyPairSync");
export const generateKey = notImplemented("crypto.generateKey");
export const generateKeySync = notImplemented("crypto.generateKeySync");
export const privateDecrypt = notImplemented(
  "crypto.privateDecrypt"
);
export const privateEncrypt = notImplemented(
  "crypto.privateEncrypt"
);
export const publicDecrypt = notImplemented(
  "crypto.publicDecrypt"
);
export const publicEncrypt = notImplemented(
  "crypto.publicEncrypt"
);
export const randomFill = notImplemented("crypto.randomFill");
export const randomFillSync = notImplemented(
  "crypto.randomFillSync"
);
export const randomInt = notImplemented("crypto.randomInt");
export const scrypt = notImplemented("crypto.scrypt");
export const scryptSync = notImplemented("crypto.scryptSync");
export const sign = notImplemented("crypto.sign");
export const setEngine = notImplemented("crypto.setEngine");
export const timingSafeEqual = notImplemented("crypto.timingSafeEqual");
export const getFips = notImplemented("crypto.getFips");
export const setFips = notImplemented("crypto.setFips");
export const verify = notImplemented("crypto.verify");
export const secureHeapUsed = notImplemented(
  "crypto.secureHeapUsed"
);
export const Certificate = notImplementedClass(
  "crypto.Certificate"
);
export const Cipher = notImplementedClass(
  "crypto.Cipher"
);
export const Cipheriv = notImplementedClass(
  "crypto.Cipheriv"
  // @ts-expect-error not typed yet
);
export const Decipher = notImplementedClass(
  "crypto.Decipher"
);
export const Decipheriv = notImplementedClass(
  "crypto.Decipheriv"
  // @ts-expect-error not typed yet
);
export const DiffieHellman = notImplementedClass(
  "crypto.DiffieHellman"
);
export const DiffieHellmanGroup = notImplementedClass(
  "crypto.DiffieHellmanGroup"
);
export const ECDH = notImplementedClass(
  "crypto.ECDH"
);
export const Hash = notImplementedClass(
  "crypto.Hash"
);
export const Hmac = notImplementedClass(
  "crypto.Hmac"
);
export const KeyObject = notImplementedClass(
  "crypto.KeyObject"
);
export const Sign = notImplementedClass(
  "crypto.Sign"
);
export const Verify = notImplementedClass(
  "crypto.Verify"
);
export const X509Certificate = notImplementedClass(
  "crypto.X509Certificate"
);
