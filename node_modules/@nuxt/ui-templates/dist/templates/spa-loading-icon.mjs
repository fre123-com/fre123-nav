const _messages = {"appName":"Nuxt","version":""}
const _render = function({ messages }) {
var __t, __p = '';
__p += '<svg class="nuxt-spa-loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 25" fill="none" width="80"><path d="M24.236 22.006h10.742L25.563 5.822l-8.979 14.31a4 4 0 0 1-3.388 1.874H2.978l11.631-20 5.897 10.567"/></svg><style>.nuxt-spa-loading {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n.nuxt-spa-loading>path {\n  fill: none;\n  stroke: #00DC82;\n  stroke-width: 4px;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  stroke-dasharray: 128;\n  stroke-dashoffset: 128;\n  animation: nuxt-spa-loading-move 3s linear infinite;\n}\n@keyframes nuxt-spa-loading-move {\n  100% {\n    stroke-dashoffset: -128;\n  }\n}</style>';
return __p
}
const _template = (messages) => _render({ messages: { ..._messages, ...messages } })
export const template = _template