import { toArray, definePreset } from '@unocss/core';

const LAYER_IMPORTS = "imports";

function createBunnyFontsProvider(name, host) {
  return {
    name,
    getImportUrl(fonts) {
      const fontFamilies = fonts.map((font) => {
        const { name: name2, weights, italic } = font;
        const formattedName = name2.toLowerCase().replace(/\s/g, "-");
        if (!weights?.length)
          return `${formattedName}${italic ? ":i" : ""}`;
        let weightsAsString = weights.map((weight) => weight.toString());
        const weightsHaveItalic = weightsAsString.some((weight) => weight.endsWith("i"));
        if (!weightsHaveItalic && italic)
          weightsAsString = weightsAsString.map((weight) => weight += "i");
        return `${formattedName}:${weightsAsString.join(",")}`;
      });
      return `${host}/css?family=${fontFamilies.join("|")}&display=swap`;
    }
  };
}
const BunnyFontsProvider = createBunnyFontsProvider(
  "bunny",
  "https://fonts.bunny.net"
);

function createGoogleCompatibleProvider(name, host) {
  return {
    name,
    getImportUrl(fonts) {
      const sort = (weights) => {
        const firstW = weights.map((w) => w[0]);
        const lastW = weights.map((w) => w[1]);
        return `${firstW.join(";")};${lastW.join(";")}`;
      };
      const strings = fonts.map((i) => {
        let name2 = i.name.replace(/\s+/g, "+");
        if (i.weights?.length) {
          name2 += i.italic ? `:ital,wght@${sort(i.weights.map((w) => [`0,${w}`, `1,${w}`]))}` : `:wght@${i.weights.join(";")}`;
        }
        return `family=${name2}`;
      }).join("&");
      return `${host}/css2?${strings}&display=swap`;
    }
  };
}
const GoogleFontsProvider = createGoogleCompatibleProvider("google", "https://fonts.googleapis.com");

const FontshareProvider = createFontshareProvider("fontshare", "https://api.fontshare.com");
function createFontshareProvider(name, host) {
  return {
    name,
    getImportUrl(fonts) {
      const strings = fonts.map((f) => {
        let name2 = f.name.replace(/\s+/g, "-").toLocaleLowerCase();
        if (f.weights?.length)
          name2 += `@${f.weights.flatMap((w) => f.italic ? Number(w) + 1 : w).sort().join()}`;
        else
          name2 += `@${f.italic ? 2 : 1}`;
        return `f[]=${name2}`;
      }).join("&");
      return `${host}/v2/css?${strings}&display=swap`;
    }
  };
}

const NoneProvider = {
  name: "none",
  getPreflight() {
    return "";
  },
  getFontName(font) {
    return font.name;
  }
};

const builtinProviders = {
  google: GoogleFontsProvider,
  bunny: BunnyFontsProvider,
  fontshare: FontshareProvider,
  none: NoneProvider
};
function resolveProvider(provider) {
  if (typeof provider === "string")
    return builtinProviders[provider];
  return provider;
}
function normalizedFontMeta(meta, defaultProvider) {
  if (typeof meta !== "string") {
    meta.provider = resolveProvider(meta.provider || defaultProvider);
    if (meta.weights)
      meta.weights = [...new Set(meta.weights.sort((a, b) => a.toString().localeCompare(b.toString(), "en", { numeric: true })))];
    return meta;
  }
  const [name, weights = ""] = meta.split(":");
  return {
    name,
    weights: [...new Set(weights.split(/[,;]\s*/).filter(Boolean).sort((a, b) => a.localeCompare(b, "en", { numeric: true })))],
    provider: resolveProvider(defaultProvider)
  };
}
function createWebFontPreset(fetcher) {
  return (options = {}) => {
    const {
      provider: defaultProvider = "google",
      extendTheme = true,
      inlineImports = true,
      themeKey = "fontFamily",
      customFetch = fetcher
    } = options;
    const fontObject = Object.fromEntries(
      Object.entries(options.fonts || {}).map(([name, meta]) => [name, toArray(meta).map((m) => normalizedFontMeta(m, defaultProvider))])
    );
    const fonts = Object.values(fontObject).flatMap((i) => i);
    const importCache = {};
    async function importUrl(url) {
      if (inlineImports) {
        if (!importCache[url]) {
          importCache[url] = customFetch(url).catch((e) => {
            console.error("Failed to fetch web fonts");
            console.error(e);
            if (typeof process !== "undefined" && process.env.CI)
              throw e;
          });
        }
        return await importCache[url];
      } else {
        return `@import url('${url}');`;
      }
    }
    const enabledProviders = new Set(fonts.map((i) => i.provider));
    const preset = {
      name: "@unocss/preset-web-fonts",
      preflights: [
        {
          async getCSS() {
            const preflights = [];
            for (const provider of enabledProviders) {
              const fontsForProvider = fonts.filter((i) => i.provider.name === provider.name);
              if (provider.getImportUrl) {
                const url = provider.getImportUrl(fontsForProvider);
                if (url)
                  preflights.push(await importUrl(url));
              }
              preflights.push(provider.getPreflight?.(fontsForProvider));
            }
            return preflights.filter(Boolean).join("\n");
          },
          layer: inlineImports ? void 0 : LAYER_IMPORTS
        }
      ]
    };
    if (extendTheme) {
      preset.extendTheme = (theme) => {
        if (!theme[themeKey])
          theme[themeKey] = {};
        const obj = Object.fromEntries(
          Object.entries(fontObject).map(([name, fonts2]) => [name, fonts2.map((f) => f.provider.getFontName?.(f) ?? `"${f.name}"`)])
        );
        for (const key of Object.keys(obj)) {
          if (typeof theme[themeKey][key] === "string")
            theme[themeKey][key] = obj[key].map((i) => `${i},`).join("") + theme[themeKey][key];
          else
            theme[themeKey][key] = obj[key].join(",");
        }
      };
    }
    return preset;
  };
}

const userAgentWoff2 = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36";
const defaultFetch = async (url) => (await import('ofetch')).$fetch(url, { headers: { "User-Agent": userAgentWoff2 }, retry: 3 });
const presetWebFonts = definePreset(createWebFontPreset(defaultFetch));

export { createGoogleCompatibleProvider as createGoogleProvider, presetWebFonts as default, normalizedFontMeta };
