"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purgeCache = void 0;
const process_1 = require("process");
const purgeCache = async (options = {}) => {
    if (globalThis.fetch === undefined) {
        throw new Error("`fetch` is not available. Please ensure you're using Node.js version 18.0.0 or above. Refer to https://ntl.fyi/functions-runtime for more information.");
    }
    const payload = {
        cache_tags: options.tags,
        deploy_alias: options.deployAlias,
    };
    const token = process_1.env.NETLIFY_PURGE_API_TOKEN || options.token;
    if ('siteSlug' in options) {
        payload.site_slug = options.siteSlug;
    }
    else if ('domain' in options) {
        payload.domain = options.domain;
    }
    else {
        // The `siteID` from `options` takes precedence over the one from the
        // environment.
        const siteID = options.siteID || process_1.env.SITE_ID;
        if (!siteID) {
            throw new Error('The Netlify site ID was not found in the execution environment. Please supply it manually using the `siteID` property.');
        }
        payload.site_id = siteID;
    }
    if (!token) {
        throw new Error('The cache purge API token was not found in the execution environment. Please supply it manually using the `token` property.');
    }
    const apiURL = options.apiURL || 'https://api.netlify.com';
    const response = await fetch(`${apiURL}/api/v1/purge`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf8',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        throw new Error(`Cache purge API call returned an unexpected status code: ${response.status}`);
    }
};
exports.purgeCache = purgeCache;
