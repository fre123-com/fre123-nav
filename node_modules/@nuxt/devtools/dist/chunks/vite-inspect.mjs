import { addVitePlugin } from '@nuxt/kit';
import Inspect from 'vite-plugin-inspect';
import { addCustomTab } from '@nuxt/devtools-kit';

function setup({ nuxt, rpc }) {
  const plugin = Inspect();
  addVitePlugin(plugin);
  let api;
  nuxt.hook("vite:serverCreated", () => {
    api = plugin.api;
  });
  addCustomTab(() => ({
    name: "builtin-vite-inspect",
    title: "Inspect",
    icon: "carbon-ibm-watson-discovery",
    category: "advanced",
    view: {
      type: "iframe",
      src: `${nuxt.options.app.baseURL}/_nuxt/__inspect/`.replace(/\/\//g, "/")
    }
  }), nuxt);
  async function getComponentsRelationships() {
    const modules = (await api?.rpc.list())?.modules || [];
    const components = await rpc.functions.getComponents() || [];
    const vueModules = modules.filter((m) => {
      const plainId = m.id.replace(/\?v=[\w\d]+$/, "");
      if (components.some((c) => c.filePath === plainId))
        return true;
      return m.id.match(/\.vue($|\?v=)/);
    });
    const graph = vueModules.map((i) => {
      function searchForVueDeps(id, seen = /* @__PURE__ */ new Set()) {
        if (seen.has(id))
          return [];
        seen.add(id);
        const module = modules.find((m) => m.id === id);
        if (!module)
          return [];
        return module.deps.flatMap((i2) => {
          if (vueModules.find((m) => m.id === i2))
            return [i2];
          return searchForVueDeps(i2, seen);
        });
      }
      return {
        id: i.id,
        deps: searchForVueDeps(i.id)
      };
    });
    return graph;
  }
  rpc.functions.getComponentsRelationships = getComponentsRelationships;
}

export { setup };
