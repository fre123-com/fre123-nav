'use strict';

const h3 = require('h3');
const utils = require('./shared/unstorage.7746300e.cjs');

const MethodToTypeMap = {
  GET: "read",
  HEAD: "read",
  PUT: "write",
  DELETE: "write"
};
function createH3StorageHandler(storage, opts = {}) {
  return h3.eventHandler(async (event) => {
    const _path = opts.resolvePath?.(event) ?? event.path;
    const isBaseKey = _path.endsWith(":") || _path.endsWith("/");
    const key = isBaseKey ? utils.normalizeBaseKey(_path) : utils.normalizeKey(_path);
    if (!(event.method in MethodToTypeMap)) {
      throw h3.createError({
        statusCode: 405,
        statusMessage: `Method Not Allowed: ${event.method}`
      });
    }
    try {
      await opts.authorize?.({
        type: MethodToTypeMap[event.method],
        event,
        key
      });
    } catch (error) {
      const _httpError = h3.isError(error) ? error : h3.createError({
        statusMessage: error?.message,
        statusCode: 401,
        ...error
      });
      throw _httpError;
    }
    if (event.method === "GET") {
      if (isBaseKey) {
        const keys = await storage.getKeys(key);
        return keys.map((key2) => key2.replace(/:/g, "/"));
      }
      const isRaw = h3.getRequestHeader(event, "accept") === "application/octet-stream";
      if (isRaw) {
        const value = await storage.getItemRaw(key);
        return value;
      } else {
        const value = await storage.getItem(key);
        return utils.stringify(value);
      }
    }
    if (event.method === "HEAD") {
      const _hasItem = await storage.hasItem(key);
      event.node.res.statusCode = _hasItem ? 200 : 404;
      if (_hasItem) {
        const meta = await storage.getMeta(key);
        if (meta.mtime) {
          h3.setResponseHeader(
            event,
            "last-modified",
            new Date(meta.mtime).toUTCString()
          );
        }
      }
      return "";
    }
    if (event.method === "PUT") {
      const isRaw = h3.getRequestHeader(event, "content-type") === "application/octet-stream";
      if (isRaw) {
        const value = await h3.readRawBody(event);
        await storage.setItemRaw(key, value);
      } else {
        const value = await h3.readRawBody(event, "utf8");
        if (value !== void 0) {
          await storage.setItem(key, value);
        }
      }
      return "OK";
    }
    if (event.method === "DELETE") {
      await (isBaseKey ? storage.clear(key) : storage.removeItem(key));
      return "OK";
    }
    throw h3.createError({
      statusCode: 405,
      statusMessage: `Method Not Allowed: ${event.method}`
    });
  });
}
function createStorageServer(storage, options = {}) {
  const app = h3.createApp({ debug: true });
  const handler = createH3StorageHandler(storage, options);
  app.use(handler);
  return {
    handle: h3.toNodeListener(app)
  };
}

exports.createH3StorageHandler = createH3StorageHandler;
exports.createStorageServer = createStorageServer;
