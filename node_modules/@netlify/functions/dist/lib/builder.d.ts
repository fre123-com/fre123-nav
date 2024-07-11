import { BuilderHandler, Handler } from '../function/handler.js';
declare const wrapHandler: (handler: BuilderHandler) => Handler;
export { wrapHandler as builder };
