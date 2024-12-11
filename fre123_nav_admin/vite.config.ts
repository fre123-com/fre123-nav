import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { presetIcons, presetUno } from "unocss";
import unoCss from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { ConfigEnv, UserConfig, defineConfig, loadEnv } from "vite";
import viteCompression from "vite-plugin-compression";
import { createHtmlPlugin } from "vite-plugin-html";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import { wrapperEnv } from "./src/utils/getEnv";

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  const viteEnv = wrapperEnv(env);

  const baseUrl = viteEnv.VITE_API_BASE_URL ?? "/api";
  const target = viteEnv.VITE_PROXY_TARGET;

  return {
    base: viteEnv.VITE_BASE,
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    // global css
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/var.scss";`,
        },
      },
    },
    // server config
    server: {
      host: "0.0.0.0", // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // https: false,
      proxy: {
        [baseUrl]: {
          // 本地前端代码的接口 代理到服务端口
          target,
          changeOrigin: true, // 允许跨域
          rewrite: (path) => {
            return path.replace(baseUrl, "");
          },
        },
      },
    },
    // plugins
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            title: viteEnv.VITE_GLOB_APP_TITLE,
          },
        },
      }),
      unoCss({ presets: [presetUno(), presetIcons()] }),
      AutoImport({
        imports: ["vue", "vue-router", "pinia"],
        resolvers: [
          ElementPlusResolver({
            importStyle: "css",
          }),
        ],
      }),
      Components({
        resolvers: [
          ElementPlusResolver({
            importStyle: "css",
          }),
        ],
      }),
      // * vite 可以使用 jsx/tsx 语法
      vueJsx(),
      // * name 可以写在 script 标签上
      VueSetupExtend(),
      // * 是否生成包预览
      viteEnv.VITE_REPORT && visualizer(),
      // * gzip compress
      viteEnv.VITE_BUILD_GZIP &&
        viteCompression({
          verbose: true,
          disable: false,
          threshold: 10240,
          algorithm: "gzip",
          ext: ".gz",
        }),
    ],
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : [],
    },
    // build configure
    build: {
      outDir: "dist",
      minify: "esbuild",
      terserOptions: {
        compress: {
          drop_console: viteEnv.VITE_DROP_CONSOLE,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        },
      },
    },
  };
});
