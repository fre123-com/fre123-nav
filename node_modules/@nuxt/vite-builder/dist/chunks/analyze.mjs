import { transform } from 'esbuild';
import { visualizer } from 'rollup-plugin-visualizer';
import defu from 'defu';

function analyzePlugin(ctx) {
  const analyzeOptions = defu({}, ctx.nuxt.options.build.analyze);
  if (!analyzeOptions.enabled) {
    return [];
  }
  return [
    {
      name: "nuxt:analyze-minify",
      async generateBundle(_opts, outputBundle) {
        for (const [_bundleId, bundle] of Object.entries(outputBundle)) {
          if (bundle.type !== "chunk") {
            continue;
          }
          const originalEntries = Object.entries(bundle.modules);
          const minifiedEntries = await Promise.all(originalEntries.map(async ([moduleId, module]) => {
            const { code } = await transform(module.code || "", { minify: true });
            return [moduleId, { ...module, code }];
          }));
          bundle.modules = Object.fromEntries(minifiedEntries);
        }
      }
    },
    visualizer({
      ...analyzeOptions,
      filename: "filename" in analyzeOptions ? analyzeOptions.filename.replace("{name}", "client") : void 0,
      title: "Client bundle stats",
      gzipSize: true
    })
  ];
}

export { analyzePlugin };
