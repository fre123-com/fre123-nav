import { definePreset, warnOnce } from '@unocss/core';

const defaultIconDimensions = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
);
const defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
const defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations
});
const defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps,
  body: "",
  hidden: false
});

const defaultIconSizeCustomisations = Object.freeze({
  width: null,
  height: null
});
const defaultIconCustomisations = Object.freeze({
  // Dimensions
  ...defaultIconSizeCustomisations,
  // Transformations
  ...defaultIconTransformations
});

function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) {
    result.hFlip = true;
  }
  if (!obj1.vFlip !== !obj2.vFlip) {
    result.vFlip = true;
  }
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) {
    result.rotate = rotate;
  }
  return result;
}

function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps) {
    if (key in defaultIconTransformations) {
      if (key in parent && !(key in result)) {
        result[key] = defaultIconTransformations[key];
      }
    } else if (key in child) {
      result[key] = child[key];
    } else if (key in parent) {
      result[key] = parent[key];
    }
  }
  return result;
}

function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons[name]) {
      return resolved[name] = [];
    }
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value) {
        resolved[name] = [parent].concat(value);
      }
    }
    return resolved[name];
  }
  (names || Object.keys(icons).concat(Object.keys(aliases))).forEach(resolve);
  return resolved;
}

function internalGetIconData(data, name, tree) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse(name2) {
    currentProps = mergeIconData(
      icons[name2] || aliases[name2],
      currentProps
    );
  }
  parse(name);
  tree.forEach(parse);
  return mergeIconData(data, currentProps);
}
function getIconData(data, name) {
  if (data.icons[name]) {
    return internalGetIconData(data, name, []);
  }
  const tree = getIconsTree(data, [name])[name];
  return tree ? internalGetIconData(data, name, tree) : null;
}

const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision || 100;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}

function splitSVGDefs(content, tag = "defs") {
  let defs = "";
  const index = content.indexOf("<" + tag);
  while (index >= 0) {
    const start = content.indexOf(">", index);
    const end = content.indexOf("</" + tag);
    if (start === -1 || end === -1) {
      break;
    }
    const endEnd = content.indexOf(">", end);
    if (endEnd === -1) {
      break;
    }
    defs += content.slice(start + 1, end).trim();
    content = content.slice(0, index).trim() + content.slice(endEnd + 1);
  }
  return {
    defs,
    content
  };
}
function mergeDefsAndContent(defs, content) {
  return defs ? "<defs>" + defs + "</defs>" + content : content;
}
function wrapSVGContent(body, start, end) {
  const split = splitSVGDefs(body);
  return mergeDefsAndContent(split.defs, start + split.content + end);
}

const isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push(
          "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
        );
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push(
        "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
      );
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift(
          "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
      case 2:
        transformations.unshift(
          "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
        );
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift(
          "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = wrapSVGContent(
        body,
        '<g transform="' + transformations.join(" ") + '">',
        "</g>"
      );
    }
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value)) {
      attributes[prop] = value.toString();
    }
  };
  setAttr("width", width);
  setAttr("height", height);
  const viewBox = [box.left, box.top, boxWidth, boxHeight];
  attributes.viewBox = viewBox.join(" ");
  return {
    attributes,
    viewBox,
    body
  };
}

function encodeSVGforURL(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}

function encodeSvgForCss(svg) {
  let useSvg = svg.startsWith("<svg>") ? svg.replace("<svg>", "<svg >") : svg;
  if (!useSvg.includes(" xmlns:xlink=") && useSvg.includes(" xlink:")) {
    useSvg = useSvg.replace(
      "<svg ",
      '<svg xmlns:xlink="http://www.w3.org/1999/xlink" '
    );
  }
  if (!useSvg.includes(" xmlns=")) {
    useSvg = useSvg.replace(
      "<svg ",
      '<svg xmlns="http://www.w3.org/2000/svg" '
    );
  }
  return encodeSVGforURL(useSvg);
}

function trimSVG(str) {
  return str.replace(/(['"])\s*\n\s*([^>\\/\s])/g, "$1 $2").replace(/(["';{}><])\s*\n\s*/g, "$1").replace(/\s*\n\s*/g, " ").replace(/\s+"/g, '"').replace(/="\s+/g, '="').replace(/(\s)+\/>/g, "/>").trim();
}

const svgWidthRegex = /\swidth\s*=\s*["']([\w.]+)["']/;
const svgHeightRegex = /\sheight\s*=\s*["']([\w.]+)["']/;
const svgTagRegex = /<svg\s+/;
function configureSvgSize(svg, props, scale) {
  const svgNode = svg.slice(0, svg.indexOf(">"));
  const check = (prop, regex) => {
    const result = regex.exec(svgNode);
    const isSet = result != null;
    const propValue = props[prop];
    if (!propValue && !isUnsetKeyword(propValue)) {
      if (typeof scale === "number") {
        if (scale > 0) {
          props[prop] = `${scale}em`;
        }
      } else if (result) {
        props[prop] = result[1];
      }
    }
    return isSet;
  };
  return [check("width", svgWidthRegex), check("height", svgHeightRegex)];
}
async function mergeIconProps(svg, collection, icon, options, propsProvider, afterCustomizations) {
  const { scale, addXmlNs = false } = options ?? {};
  const { additionalProps = {}, iconCustomizer } = options?.customizations ?? {};
  const props = await propsProvider?.() ?? {};
  await iconCustomizer?.(collection, icon, props);
  Object.keys(additionalProps).forEach((p) => {
    const v = additionalProps[p];
    if (v !== void 0 && v !== null)
      props[p] = v;
  });
  afterCustomizations?.(props);
  const [widthOnSvg, heightOnSvg] = configureSvgSize(svg, props, scale);
  if (addXmlNs) {
    if (!svg.includes("xmlns=") && !props["xmlns"]) {
      props["xmlns"] = "http://www.w3.org/2000/svg";
    }
    if (!svg.includes("xmlns:xlink=") && svg.includes("xlink:") && !props["xmlns:xlink"]) {
      props["xmlns:xlink"] = "http://www.w3.org/1999/xlink";
    }
  }
  const propsToAdd = Object.keys(props).map(
    (p) => p === "width" && widthOnSvg || p === "height" && heightOnSvg ? null : `${p}="${props[p]}"`
  ).filter((p) => p != null);
  if (propsToAdd.length) {
    svg = svg.replace(svgTagRegex, `<svg ${propsToAdd.join(" ")} `);
  }
  if (options) {
    const { defaultStyle, defaultClass } = options;
    if (defaultClass && !svg.includes("class=")) {
      svg = svg.replace(svgTagRegex, `<svg class="${defaultClass}" `);
    }
    if (defaultStyle && !svg.includes("style=")) {
      svg = svg.replace(svgTagRegex, `<svg style="${defaultStyle}" `);
    }
  }
  const usedProps = options?.usedProps;
  if (usedProps) {
    Object.keys(additionalProps).forEach((p) => {
      const v = props[p];
      if (v !== void 0 && v !== null)
        usedProps[p] = v;
    });
    if (typeof props.width !== "undefined" && props.width !== null) {
      usedProps.width = props.width;
    }
    if (typeof props.height !== "undefined" && props.height !== null) {
      usedProps.height = props.height;
    }
  }
  return svg;
}

async function getCustomIcon(custom, collection, icon, options) {
  let result;
  try {
    if (typeof custom === "function") {
      result = await custom(icon);
    } else {
      const inline = custom[icon];
      result = typeof inline === "function" ? await inline() : inline;
    }
  } catch (err) {
    console.warn(
      `Failed to load custom icon "${icon}" in "${collection}":`,
      err
    );
    return;
  }
  if (result) {
    const cleanupIdx = result.indexOf("<svg");
    if (cleanupIdx > 0)
      result = result.slice(cleanupIdx);
    const { transform } = options?.customizations ?? {};
    result = typeof transform === "function" ? await transform(result, collection, icon) : result;
    if (!result.startsWith("<svg")) {
      console.warn(
        `Custom icon "${icon}" in "${collection}" is not a valid SVG`
      );
      return result;
    }
    return await mergeIconProps(
      options?.customizations?.trimCustomSvg === true ? trimSVG(result) : result,
      collection,
      icon,
      options,
      void 0
    );
  }
}

async function searchForIcon(iconSet, collection, ids, options) {
  let iconData;
  const { customize } = options?.customizations ?? {};
  for (const id of ids) {
    iconData = getIconData(iconSet, id);
    if (iconData) {
      let defaultCustomizations = { ...defaultIconCustomisations };
      if (typeof customize === "function")
        defaultCustomizations = customize(defaultCustomizations);
      const {
        attributes: { width, height, ...restAttributes },
        body
      } = iconToSVG(iconData, defaultCustomizations);
      const scale = options?.scale;
      return await mergeIconProps(
        // DON'T remove space on <svg >
        `<svg >${body}</svg>`,
        collection,
        id,
        options,
        () => {
          return { ...restAttributes };
        },
        (props) => {
          const check = (prop, defaultValue) => {
            const propValue = props[prop];
            let value;
            if (!isUnsetKeyword(propValue)) {
              if (propValue) {
                return;
              }
              if (typeof scale === "number") {
                if (scale) {
                  value = `${scale}em`;
                }
              } else {
                value = defaultValue;
              }
            }
            if (!value) {
              delete props[prop];
            } else {
              props[prop] = value;
            }
          };
          check("width", width);
          check("height", height);
        }
      );
    }
  }
}

const loadIcon = async (collection, icon, options) => {
  const custom = options?.customCollections?.[collection];
  if (custom) {
    if (typeof custom === "function") {
      let result;
      try {
        result = await custom(icon);
      } catch (err) {
        console.warn(
          `Failed to load custom icon "${icon}" in "${collection}":`,
          err
        );
        return;
      }
      if (result) {
        if (typeof result === "string") {
          return await getCustomIcon(
            () => result,
            collection,
            icon,
            options
          );
        }
        if ("icons" in result) {
          const ids = [
            icon,
            icon.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
            icon.replace(/([a-z])(\d+)/g, "$1-$2")
          ];
          return await searchForIcon(
            result,
            collection,
            ids,
            options
          );
        }
      }
    } else {
      return await getCustomIcon(custom, collection, icon, options);
    }
  }
};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var collections = [
	"academicons",
	"akar-icons",
	"ant-design",
	"arcticons",
	"basil",
	"bi",
	"bitcoin-icons",
	"bpmn",
	"brandico",
	"bx",
	"bxl",
	"bxs",
	"bytesize",
	"carbon",
	"cbi",
	"charm",
	"ci",
	"cib",
	"cif",
	"cil",
	"circle-flags",
	"circum",
	"clarity",
	"codicon",
	"covid",
	"cryptocurrency-color",
	"cryptocurrency",
	"dashicons",
	"devicon-line",
	"devicon-original",
	"devicon-plain",
	"devicon",
	"ei",
	"el",
	"emblemicons",
	"emojione-monotone",
	"emojione-v1",
	"emojione",
	"entypo-social",
	"entypo",
	"eos-icons",
	"ep",
	"et",
	"eva",
	"f7",
	"fa-brands",
	"fa-regular",
	"fa-solid",
	"fa",
	"fa6-brands",
	"fa6-regular",
	"fa6-solid",
	"fad",
	"fe",
	"feather",
	"file-icons",
	"flag",
	"flagpack",
	"flat-color-icons",
	"flat-ui",
	"flowbite",
	"fluent-emoji-flat",
	"fluent-emoji-high-contrast",
	"fluent-emoji",
	"fluent-mdl2",
	"fluent",
	"fontelico",
	"fontisto",
	"formkit",
	"foundation",
	"fxemoji",
	"gala",
	"game-icons",
	"geo",
	"gg",
	"gis",
	"gravity-ui",
	"gridicons",
	"grommet-icons",
	"guidance",
	"healthicons",
	"heroicons-outline",
	"heroicons-solid",
	"heroicons",
	"humbleicons",
	"ic",
	"icomoon-free",
	"icon-park-outline",
	"icon-park-solid",
	"icon-park-twotone",
	"icon-park",
	"iconamoon",
	"iconoir",
	"icons8",
	"il",
	"ion",
	"iwwa",
	"jam",
	"la",
	"lets-icons",
	"line-md",
	"logos",
	"ls",
	"lucide",
	"mage",
	"majesticons",
	"maki",
	"map",
	"material-symbols-light",
	"material-symbols",
	"mdi-light",
	"mdi",
	"medical-icon",
	"memory",
	"meteocons",
	"mi",
	"mingcute",
	"mono-icons",
	"mynaui",
	"nimbus",
	"nonicons",
	"noto-v1",
	"noto",
	"octicon",
	"oi",
	"ooui",
	"openmoji",
	"oui",
	"pajamas",
	"pepicons-pencil",
	"pepicons-pop",
	"pepicons-print",
	"pepicons",
	"ph",
	"pixelarticons",
	"prime",
	"ps",
	"quill",
	"radix-icons",
	"raphael",
	"ri",
	"si-glyph",
	"simple-icons",
	"simple-line-icons",
	"skill-icons",
	"solar",
	"streamline-emojis",
	"streamline",
	"subway",
	"svg-spinners",
	"system-uicons",
	"tabler",
	"tdesign",
	"teenyicons",
	"topcoat",
	"twemoji",
	"typcn",
	"uil",
	"uim",
	"uis",
	"uit",
	"uiw",
	"unjs",
	"vaadin",
	"vs",
	"vscode-icons",
	"websymbol",
	"whh",
	"wi",
	"wpf",
	"zmdi",
	"zondicons"
];

const icons = /*@__PURE__*/getDefaultExportFromCjs(collections);

const COLLECTION_NAME_PARTS_MAX = 3;
function createPresetIcons(lookupIconLoader) {
  return definePreset((options = {}) => {
    const {
      scale = 1,
      mode = "auto",
      prefix = "i-",
      warn = false,
      collections: customCollections,
      extraProperties = {},
      customizations = {},
      autoInstall = false,
      collectionsNodeResolvePath,
      layer = "icons",
      unit
    } = options;
    const flags = getEnvFlags();
    const loaderOptions = {
      addXmlNs: true,
      scale,
      customCollections,
      autoInstall,
      cwd: collectionsNodeResolvePath,
      // avoid warn from @iconify/loader: we'll warn below if not found
      warn: void 0,
      customizations: {
        ...customizations,
        additionalProps: { ...extraProperties },
        trimCustomSvg: true,
        async iconCustomizer(collection, icon, props) {
          await customizations.iconCustomizer?.(collection, icon, props);
          if (unit) {
            if (!props.width)
              props.width = `${scale}${unit}`;
            if (!props.height)
              props.height = `${scale}${unit}`;
          }
        }
      }
    };
    let iconLoader;
    return {
      name: "@unocss/preset-icons",
      enforce: "pre",
      options,
      layers: { icons: -30 },
      rules: [[
        /^([a-z0-9:_-]+)(?:\?(mask|bg|auto))?$/,
        async ([full, body, _mode = mode]) => {
          let collection = "";
          let name = "";
          let svg;
          iconLoader = iconLoader || await lookupIconLoader(options);
          const usedProps = {};
          if (body.includes(":")) {
            [collection, name] = body.split(":");
            svg = await iconLoader(collection, name, { ...loaderOptions, usedProps });
          } else {
            const parts = body.split(/-/g);
            for (let i = COLLECTION_NAME_PARTS_MAX; i >= 1; i--) {
              collection = parts.slice(0, i).join("-");
              name = parts.slice(i).join("-");
              svg = await iconLoader(collection, name, { ...loaderOptions, usedProps });
              if (svg)
                break;
            }
          }
          if (!svg) {
            if (warn && !flags.isESLint)
              warnOnce(`failed to load icon "${full}"`);
            return;
          }
          const url = `url("data:image/svg+xml;utf8,${encodeSvgForCss(svg)}")`;
          if (_mode === "auto")
            _mode = svg.includes("currentColor") ? "mask" : "bg";
          if (_mode === "mask") {
            return {
              "--un-icon": url,
              "-webkit-mask": "var(--un-icon) no-repeat",
              "mask": "var(--un-icon) no-repeat",
              "-webkit-mask-size": "100% 100%",
              "mask-size": "100% 100%",
              "background-color": "currentColor",
              // for Safari https://github.com/elk-zone/elk/pull/264
              "color": "inherit",
              ...usedProps
            };
          } else {
            return {
              "background": `${url} no-repeat`,
              "background-size": "100% 100%",
              "background-color": "transparent",
              ...usedProps
            };
          }
        },
        { layer, prefix }
      ]]
    };
  });
}
function combineLoaders(loaders) {
  return async (...args) => {
    for (const loader of loaders) {
      if (!loader)
        continue;
      const result = await loader(...args);
      if (result)
        return result;
    }
  };
}
function createCDNFetchLoader(fetcher, cdnBase) {
  const cache = /* @__PURE__ */ new Map();
  function fetchCollection(name) {
    if (!icons.includes(name))
      return void 0;
    if (!cache.has(name))
      cache.set(name, fetcher(`${cdnBase}@iconify-json/${name}/icons.json`));
    return cache.get(name);
  }
  return async (collection, icon, options) => {
    let result = await loadIcon(collection, icon, options);
    if (result)
      return result;
    const iconSet = await fetchCollection(collection);
    if (iconSet) {
      const ids = [
        icon,
        icon.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
        icon.replace(/([a-z])(\d+)/g, "$1-$2")
      ];
      result = await searchForIcon(iconSet, collection, ids, options);
    }
    return result;
  };
}
function getEnvFlags() {
  const isNode = typeof process !== "undefined" && process.stdout && !process.versions.deno;
  const isVSCode = isNode && !!process.env.VSCODE_CWD;
  const isESLint = isNode && !!process.env.ESLINT;
  return {
    isNode,
    isVSCode,
    isESLint
  };
}

export { combineLoaders as a, createCDNFetchLoader as b, createPresetIcons as c, getEnvFlags as g, icons as i, loadIcon as l };
