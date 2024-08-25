import * as _unocss_core from '@unocss/core';
import { Awaitable } from '@unocss/core';
import { CustomIconLoader, InlineCollection, IconCustomizations, UniversalIconLoader } from '@iconify/utils/lib/loader/types';
import { IconifyJSON } from '@iconify/types';

interface IconsOptions {
    /**
     * Scale related to the current font size (1em).
     *
     * @default 1
     */
    scale?: number;
    /**
     * Mode of generated CSS icons.
     *
     * - `mask` - use background color and the `mask` property for monochrome icons
     * - `background-img` - use background image for the icons, colors are static
     * - `auto` - smartly decide mode between `mask` and `background-img` per icon based on its style
     *
     * @default 'auto'
     * @see https://antfu.me/posts/icons-in-pure-css
     */
    mode?: 'mask' | 'background-img' | 'auto';
    /**
     * Class prefix for matching icon rules.
     *
     * @default `i-`
     */
    prefix?: string | string[];
    /**
     * Extra CSS properties applied to the generated CSS
     *
     * @default {}
     */
    extraProperties?: Record<string, string>;
    /**
     * Emit warning when missing icons are matched
     *
     * @default false
     */
    warn?: boolean;
    /**
     * In Node.js environment, the preset will search for the installed iconify dataset automatically.
     * When using in the browser, this options is provided to provide dataset with custom loading mechanism.
     */
    collections?: Record<string, (() => Awaitable<IconifyJSON>) | undefined | CustomIconLoader | InlineCollection>;
    /**
     * Rule layer
     *
     * @default 'icons'
     */
    layer?: string;
    /**
     * Custom icon customizations.
     */
    customizations?: Omit<IconCustomizations, 'additionalProps' | 'trimCustomSvg'>;
    /**
     * Auto install icon sources package when the usages is detected
     *
     * Only effective in Node.js environment.
     *
     * @default false
     */
    autoInstall?: boolean;
    /**
     * Path to resolve the iconify collections in Node.js environment.
     *
     * @default process.cwd()
     */
    collectionsNodeResolvePath?: string;
    /**
     * Custom icon unit.
     *
     * @default `em`
     */
    unit?: string;
    /**
     * Load icons from CDN. Should starts with `https://` and ends with `/`
     *
     * Recommends:
     * - https://esm.sh/
     * - https://cdn.skypack.dev/
     */
    cdn?: string;
    /**
     * Custom fetch function to provide the icon data.
     */
    customFetch?: (url: string) => Promise<any>;
}

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

var collections$1 = /*@__PURE__*/getDefaultExportFromCjs(collections);

declare function createPresetIcons(lookupIconLoader: (options: IconsOptions) => Promise<UniversalIconLoader>): _unocss_core.PresetFactory<object, IconsOptions>;
declare function combineLoaders(loaders: UniversalIconLoader[]): UniversalIconLoader;
declare function createCDNFetchLoader(fetcher: (url: string) => Promise<any>, cdnBase: string): UniversalIconLoader;
declare function getEnvFlags(): {
    isNode: boolean;
    isVSCode: boolean;
    isESLint: boolean;
};

export { type IconsOptions, combineLoaders, createCDNFetchLoader, createPresetIcons, getEnvFlags, collections$1 as icons };
