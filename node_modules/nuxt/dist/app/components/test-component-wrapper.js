import { parseURL } from "ufo";
import { defineComponent, h } from "vue";
import { parseQuery } from "vue-router";
import { resolve } from "pathe";
import destr from "destr";
import { devRootDir } from "#build/nuxt.config.mjs";
export default (url) => defineComponent({
  name: "NuxtTestComponentWrapper",
  async setup(props, { attrs }) {
    const query = parseQuery(parseURL(url).search);
    const urlProps = query.props ? destr(query.props) : {};
    const path = resolve(query.path);
    if (!path.startsWith(devRootDir)) {
      throw new Error(`[nuxt] Cannot access path outside of project root directory: \`${path}\`.`);
    }
    const comp = await import(
      /* @vite-ignore */
      query.path
    ).then((r) => r.default);
    return () => [
      h("div", "Component Test Wrapper for " + query.path),
      h("div", { id: "nuxt-component-root" }, [
        h(comp, { ...attrs, ...props, ...urlProps })
      ])
    ];
  }
});
