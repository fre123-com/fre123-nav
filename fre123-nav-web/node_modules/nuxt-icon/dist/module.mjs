import { defineNuxtModule, createResolver, addComponent, addTemplate } from '@nuxt/kit';
import { addCustomTab } from '@nuxt/devtools-kit';



// -- Unbuild CommonJS Shims --
import __cjs_url__ from 'url';
import __cjs_path__ from 'path';
import __cjs_mod__ from 'module';
const __filename = __cjs_url__.fileURLToPath(import.meta.url);
const __dirname = __cjs_path__.dirname(__filename);
const require = __cjs_mod__.createRequire(import.meta.url);
const iconifyCollections = require("@iconify/collections/collections.json");
const module = defineNuxtModule({
  meta: {
    name: "nuxt-icon",
    configKey: "icon",
    compatibility: {
      nuxt: "^3.0.0"
    }
  },
  defaults: {},
  setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    nuxt.hook("schema:extend", (schemas) => {
      schemas.push({
        appConfig: {
          nuxtIcon: {
            $schema: {
              title: "Nuxt Icon",
              description: "Configure Nuxt Icon module preferences."
            },
            size: {
              $default: "1em",
              $schema: {
                title: "Icon Size",
                description: "Set the default icon size. Set to false to disable the sizing of icon in style.",
                tags: ["@studioIcon material-symbols:format-size-rounded"],
                tsType: "string | false"
              }
            },
            class: {
              $default: "",
              $schema: {
                title: "CSS Class",
                description: "Set the default CSS class.",
                tags: ["@studioIcon material-symbols:css"]
              }
            },
            aliases: {
              $default: {},
              $schema: {
                title: "Icon aliases",
                description: "Define Icon aliases to update them easily without code changes.",
                tags: ["@studioIcon material-symbols:star-rounded"],
                tsType: "{ [alias: string]: string }"
              }
            },
            iconifyApiOptions: {
              $schema: {
                title: "Iconify API Options",
                description: "Define preferences for Iconify API fetch.",
                tags: ["@studioIcon material-symbols:tv-options-input-settings"]
              },
              url: {
                $default: "https://api.iconify.design",
                $schema: {
                  title: "Iconify API URL",
                  description: "Define a custom Iconify API URL. Useful if you want to use a self-hosted Iconify API. Learn more: https://iconify.design/docs/api.",
                  tags: ["@studioIcon material-symbols:api"]
                }
              },
              publicApiFallback: {
                $default: false,
                $schema: {
                  title: "Public Iconify API fallback",
                  description: "Define if the public Iconify API should be used as fallback.",
                  tags: ["@studioIcon material-symbols:public"]
                }
              }
            }
          }
        }
      });
    });
    addComponent({
      name: "Icon",
      global: true,
      filePath: resolve("./runtime/Icon.vue")
    });
    addComponent({
      name: "IconCSS",
      global: true,
      filePath: resolve("./runtime/IconCSS.vue")
    });
    const iconCollections = Object.keys(iconifyCollections).sort((a, b) => b.length - a.length);
    const template = addTemplate({
      filename: "icon-collections.mjs",
      getContents: () => `export default ${JSON.stringify(iconCollections)}`,
      write: true
    });
    nuxt.options.alias["#icon-collections"] = template.dst;
    addCustomTab({
      name: "icones",
      title: "Ic\xF4nes",
      icon: "i-arcticons-iconeration",
      view: {
        type: "iframe",
        src: "https://icones.js.org"
      }
    });
  }
});

export { module as default };
