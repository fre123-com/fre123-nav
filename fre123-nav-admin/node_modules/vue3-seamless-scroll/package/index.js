import Vue3SeamlessScroll from "./Vue3SeamlessScroll.tsx"

const install = function (app, options = {}) {
  app.component(options.name || Vue3SeamlessScroll.name, Vue3SeamlessScroll);
}

export default function (app) {
  app.use(install)
}

export {
  Vue3SeamlessScroll
}
