"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalHostAvaliablePort = exports.isLocalHostPortUsing = void 0;
const http = require("http");
function isLocalHostPortUsing(port) {
    return new Promise(resolve => {
        http.get(`http://localhost:${port}/`, {
            headers: {
                accept: "*/*", // if not set, always get 404 from vite server
            },
        }, res => {
            resolve(res.statusCode === 200);
        }).on('error', () => resolve(false)).end();
    });
}
exports.isLocalHostPortUsing = isLocalHostPortUsing;
async function getLocalHostAvaliablePort(port) {
    if (await isLocalHostPortUsing(port)) {
        port++;
    }
    return port;
}
exports.getLocalHostAvaliablePort = getLocalHostAvaliablePort;
//# sourceMappingURL=http.js.map