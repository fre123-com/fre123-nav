"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webcrypto = exports.verify = exports.timingSafeEqual = exports.sign = exports.setFips = exports.setEngine = exports.secureHeapUsed = exports.scryptSync = exports.scrypt = exports.randomInt = exports.randomFillSync = exports.randomFill = exports.randomBytes = exports.publicEncrypt = exports.publicDecrypt = exports.pseudoRandomBytes = exports.privateEncrypt = exports.privateDecrypt = exports.pbkdf2Sync = exports.pbkdf2 = exports.hkdfSync = exports.hkdf = exports.getHashes = exports.getFips = exports.getDiffieHellman = exports.getCurves = exports.getCiphers = exports.getCipherInfo = exports.generatePrimeSync = exports.generatePrime = exports.generateKeySync = exports.generateKeyPairSync = exports.generateKeyPair = exports.generateKey = exports.fips = exports.diffieHellman = exports.createVerify = exports.createSign = exports.createSecretKey = exports.createPublicKey = exports.createPrivateKey = exports.createHmac = exports.createHash = exports.createECDH = exports.createDiffieHellmanGroup = exports.createDiffieHellman = exports.createDecipheriv = exports.createDecipher = exports.createCipheriv = exports.createCipher = exports.constants = exports.checkPrimeSync = exports.checkPrime = exports.X509Certificate = exports.Verify = exports.Sign = exports.KeyObject = exports.Hmac = exports.Hash = exports.ECDH = exports.DiffieHellmanGroup = exports.DiffieHellman = exports.Decipheriv = exports.Decipher = exports.Cipheriv = exports.Cipher = exports.Certificate = void 0;
var _utils = require("../../_internal/utils.cjs");
var _web = require("./web.cjs");
const MAX_RANDOM_VALUE_BYTES = 65536;
const webcrypto = exports.webcrypto = new Proxy(globalThis.crypto, {
  get(_, key) {
    if (key === "CryptoKey") {
      return globalThis.CryptoKey;
    }
    if (typeof globalThis.crypto[key] === "function") {
      return globalThis.crypto[key].bind(globalThis.crypto);
    }
    return globalThis.crypto[key];
  }
});
const randomBytes = (size, cb) => {
  const bytes = Buffer.alloc(size, 0, void 0);
  for (let generated = 0; generated < size; generated += MAX_RANDOM_VALUE_BYTES) {
    (0, _web.getRandomValues)(Uint8Array.prototype.slice.call(bytes, generated, generated + MAX_RANDOM_VALUE_BYTES));
  }
  if (typeof cb === "function") {
    cb(null, bytes);
    return void 0;
  }
  return bytes;
};
exports.randomBytes = randomBytes;
const fips = exports.fips = false;
const constants = exports.constants = {};
const checkPrime = exports.checkPrime = (0, _utils.notImplemented)("crypto.checkPrime");
const checkPrimeSync = exports.checkPrimeSync = (0, _utils.notImplemented)("crypto.checkPrimeSync");
const createCipher = exports.createCipher = (0, _utils.notImplemented)("crypto.createCipher");
const createDecipher = exports.createDecipher = (0, _utils.notImplemented)("crypto.createDecipher");
const pseudoRandomBytes = exports.pseudoRandomBytes = (0, _utils.notImplemented)("crypto.pseudoRandomBytes");
const createCipheriv = exports.createCipheriv = (0, _utils.notImplemented)("crypto.createCipheriv");
const createDecipheriv = exports.createDecipheriv = (0, _utils.notImplemented)("crypto.createDecipheriv");
const createDiffieHellman = exports.createDiffieHellman = (0, _utils.notImplemented)("crypto.createDiffieHellman");
const createDiffieHellmanGroup = exports.createDiffieHellmanGroup = (0, _utils.notImplemented)("crypto.createDiffieHellmanGroup");
const createECDH = exports.createECDH = (0, _utils.notImplemented)("crypto.createECDH");
const createHash = exports.createHash = (0, _utils.notImplemented)("crypto.createHash");
const createHmac = exports.createHmac = (0, _utils.notImplemented)("crypto.createHmac");
const createPrivateKey = exports.createPrivateKey = (0, _utils.notImplemented)("crypto.createPrivateKey");
const createPublicKey = exports.createPublicKey = (0, _utils.notImplemented)("crypto.createPublicKey");
const createSecretKey = exports.createSecretKey = (0, _utils.notImplemented)("crypto.createSecretKey");
const createSign = exports.createSign = (0, _utils.notImplemented)("crypto.createSign");
const createVerify = exports.createVerify = (0, _utils.notImplemented)("crypto.createVerify");
const diffieHellman = exports.diffieHellman = (0, _utils.notImplemented)("crypto.diffieHellman");
const generatePrime = exports.generatePrime = (0, _utils.notImplemented)("crypto.generatePrime");
const generatePrimeSync = exports.generatePrimeSync = (0, _utils.notImplemented)("crypto.generatePrimeSync");
const getCiphers = exports.getCiphers = (0, _utils.notImplemented)("crypto.getCiphers");
const getCipherInfo = exports.getCipherInfo = (0, _utils.notImplemented)("crypto.getCipherInfo");
const getCurves = exports.getCurves = (0, _utils.notImplemented)("crypto.getCurves");
const getDiffieHellman = exports.getDiffieHellman = (0, _utils.notImplemented)("crypto.getDiffieHellman");
const getHashes = exports.getHashes = (0, _utils.notImplemented)("crypto.getHashes");
const hkdf = exports.hkdf = (0, _utils.notImplemented)("crypto.hkdf");
const hkdfSync = exports.hkdfSync = (0, _utils.notImplemented)("crypto.hkdfSync");
const pbkdf2 = exports.pbkdf2 = (0, _utils.notImplemented)("crypto.pbkdf2");
const pbkdf2Sync = exports.pbkdf2Sync = (0, _utils.notImplemented)("crypto.pbkdf2Sync");
const generateKeyPair = exports.generateKeyPair = (0, _utils.notImplemented)("crypto.generateKeyPair");
const generateKeyPairSync = exports.generateKeyPairSync = (0, _utils.notImplemented)("crypto.generateKeyPairSync");
const generateKey = exports.generateKey = (0, _utils.notImplemented)("crypto.generateKey");
const generateKeySync = exports.generateKeySync = (0, _utils.notImplemented)("crypto.generateKeySync");
const privateDecrypt = exports.privateDecrypt = (0, _utils.notImplemented)("crypto.privateDecrypt");
const privateEncrypt = exports.privateEncrypt = (0, _utils.notImplemented)("crypto.privateEncrypt");
const publicDecrypt = exports.publicDecrypt = (0, _utils.notImplemented)("crypto.publicDecrypt");
const publicEncrypt = exports.publicEncrypt = (0, _utils.notImplemented)("crypto.publicEncrypt");
const randomFill = exports.randomFill = (0, _utils.notImplemented)("crypto.randomFill");
const randomFillSync = exports.randomFillSync = (0, _utils.notImplemented)("crypto.randomFillSync");
const randomInt = exports.randomInt = (0, _utils.notImplemented)("crypto.randomInt");
const scrypt = exports.scrypt = (0, _utils.notImplemented)("crypto.scrypt");
const scryptSync = exports.scryptSync = (0, _utils.notImplemented)("crypto.scryptSync");
const sign = exports.sign = (0, _utils.notImplemented)("crypto.sign");
const setEngine = exports.setEngine = (0, _utils.notImplemented)("crypto.setEngine");
const timingSafeEqual = exports.timingSafeEqual = (0, _utils.notImplemented)("crypto.timingSafeEqual");
const getFips = exports.getFips = (0, _utils.notImplemented)("crypto.getFips");
const setFips = exports.setFips = (0, _utils.notImplemented)("crypto.setFips");
const verify = exports.verify = (0, _utils.notImplemented)("crypto.verify");
const secureHeapUsed = exports.secureHeapUsed = (0, _utils.notImplemented)("crypto.secureHeapUsed");
const Certificate = exports.Certificate = (0, _utils.notImplementedClass)("crypto.Certificate");
const Cipher = exports.Cipher = (0, _utils.notImplementedClass)("crypto.Cipher");
const Cipheriv = exports.Cipheriv = (0, _utils.notImplementedClass)("crypto.Cipheriv"
// @ts-expect-error not typed yet
);

const Decipher = exports.Decipher = (0, _utils.notImplementedClass)("crypto.Decipher");
const Decipheriv = exports.Decipheriv = (0, _utils.notImplementedClass)("crypto.Decipheriv"
// @ts-expect-error not typed yet
);

const DiffieHellman = exports.DiffieHellman = (0, _utils.notImplementedClass)("crypto.DiffieHellman");
const DiffieHellmanGroup = exports.DiffieHellmanGroup = (0, _utils.notImplementedClass)("crypto.DiffieHellmanGroup");
const ECDH = exports.ECDH = (0, _utils.notImplementedClass)("crypto.ECDH");
const Hash = exports.Hash = (0, _utils.notImplementedClass)("crypto.Hash");
const Hmac = exports.Hmac = (0, _utils.notImplementedClass)("crypto.Hmac");
const KeyObject = exports.KeyObject = (0, _utils.notImplementedClass)("crypto.KeyObject");
const Sign = exports.Sign = (0, _utils.notImplementedClass)("crypto.Sign");
const Verify = exports.Verify = (0, _utils.notImplementedClass)("crypto.Verify");
const X509Certificate = exports.X509Certificate = (0, _utils.notImplementedClass)("crypto.X509Certificate");