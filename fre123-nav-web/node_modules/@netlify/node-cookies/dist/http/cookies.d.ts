export interface Cookie {
    /** Name of the cookie. */
    name: string;
    /** Value of the cookie. */
    value: string;
    expires?: Date | number;
    /** The cookie's `Max-Age` attribute, in seconds. Must be a non-negative integer. A cookie with a `maxAge` of `0` expires immediately. */
    maxAge?: number;
    /** The cookie's `Domain` attribute. Specifies those hosts to which the cookie will be sent. */
    domain?: string;
    /** The cookie's `Path` attribute. A cookie with a path will only be included in the `Cookie` request header if the requested URL matches that path. */
    path?: string;
    /** The cookie's `Secure` attribute. If `true`, the cookie will only be included in the `Cookie` request header if the connection uses SSL and HTTPS. */
    secure?: boolean;
    /** The cookie's `HTTPOnly` attribute. If `true`, the cookie cannot be accessed via JavaScript. */
    httpOnly?: boolean;
    /**
     * Allows servers to assert that a cookie ought not to
     * be sent along with cross-site requests.
     */
    sameSite?: 'Strict' | 'Lax' | 'None';
    /** Additional key value pairs with the form "key=value" */
    unparsed?: string[];
}
/**
 * Parse cookies of a header
 *
 * @example
 * ```ts
 * import { getCookies } from "https://deno.land/std@$STD_VERSION/http/cookie.ts";
 *
 * const headers = new Headers();
 * headers.set("Cookie", "full=of; tasty=chocolate");
 *
 * const cookies = getCookies(headers);
 * console.log(cookies); // { full: "of", tasty: "chocolate" }
 * ```
 *
 * @param headers The headers instance to get cookies from
 * @return Object with cookie names as keys
 */
export declare function getCookies(headers: Headers): Record<string, string>;
/**
 * Set the cookie header properly in the headers
 *
 * @example
 * ```ts
 * import {
 *   Cookie,
 *   setCookie,
 * } from "https://deno.land/std@$STD_VERSION/http/cookie.ts";
 *
 * const headers = new Headers();
 * const cookie: Cookie = { name: "Space", value: "Cat" };
 * setCookie(headers, cookie);
 *
 * const cookieHeader = headers.get("set-cookie");
 * console.log(cookieHeader); // Space=Cat
 * ```
 *
 * @param headers The headers instance to set the cookie to
 * @param cookie Cookie to set
 */
export declare function setCookie(headers: Headers, cookie: Cookie): void;
/**
 * Set the cookie header with empty value in the headers to delete it
 *
 * > Note: Deleting a `Cookie` will set its expiration date before now. Forcing
 * > the browser to delete it.
 *
 * @example
 * ```ts
 * import { deleteCookie } from "https://deno.land/std@$STD_VERSION/http/cookie.ts";
 *
 * const headers = new Headers();
 * deleteCookie(headers, "deno");
 *
 * const cookieHeader = headers.get("set-cookie");
 * console.log(cookieHeader); // deno=; Expires=Thus, 01 Jan 1970 00:00:00 GMT
 * ```
 *
 * @param headers The headers instance to delete the cookie from
 * @param name Name of cookie
 * @param attributes Additional cookie attributes
 */
export declare function deleteCookie(headers: Headers, name: string, attributes?: {
    path?: string;
    domain?: string;
}): void;
/**
 * Parse set-cookies of a header
 *
 * @example
 * ```ts
 * import { getSetCookies } from "https://deno.land/std@$STD_VERSION/http/cookie.ts";
 *
 * const headers = new Headers([
 *   ["Set-Cookie", "lulu=meow; Secure; Max-Age=3600"],
 *   ["Set-Cookie", "booya=kasha; HttpOnly; Path=/"],
 * ]);
 *
 * const cookies = getSetCookies(headers);
 * console.log(cookies); // [{ name: "lulu", value: "meow", secure: true, maxAge: 3600 }, { name: "booya", value: "kahsa", httpOnly: true, path: "/ }]
 * ```
 *
 * @param headers The headers instance to get set-cookies from
 * @return List of cookies
 */
export declare function getSetCookies(headers: Headers): Cookie[];
