export type { Context } from '@netlify/serverless-functions-api';
type Path = `/${string}`;
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';
type CronSchedule = string;
interface BaseConfig {
    /**
     * Configures the function to serve any static files that match the request
     * URL and render the function only if no matching files exist.
     */
    preferStatic?: boolean;
    /**
     * Limits the HTTP methods for which the function will run. If not set, the
     * function will run for all supported methods.
     */
    method?: HTTPMethod | HTTPMethod[];
}
interface ConfigWithPath extends BaseConfig {
    /**
     * One or more URL paths for which the function will run. Paths must begin
     * with a forward slash.
     *
     * {@link} https://ntl.fyi/func-routing
     */
    path?: Path | Path[];
    schedule?: never;
}
interface ConfigWithSchedule extends BaseConfig {
    path?: never;
    /**
     * Cron expression representing the schedule at which the function will be
     * automatically invoked.
     *
     * {@link} https://ntl.fyi/sched-func
     */
    schedule: CronSchedule;
}
export type Config = ConfigWithPath | ConfigWithSchedule;
