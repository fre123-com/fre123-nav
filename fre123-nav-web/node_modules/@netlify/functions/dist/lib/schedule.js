"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedule = void 0;
/**
 * Declares a function to run on a cron schedule.
 * Not reachable via HTTP.
 *
 * @example
 * ```
 * export const handler = cron("5 4 * * *", async () => {
 *   // ...
 * })
 * ```
 *
 * @param schedule expressed as cron string.
 * @param handler
 * @see https://ntl.fyi/sched-func
 */
const schedule = (cron, handler) => handler;
exports.schedule = schedule;
