'use strict';

var createPlugin = function (plugin, config) {
    return {
        handler: plugin,
        config: config,
    };
};
createPlugin.withOptions = function (pluginFunction, configFunction) {
    if (configFunction === void 0) { configFunction = function () { return ({}); }; }
    var optionsFunction = function (options) {
        if (options === void 0) { options = {}; }
        return {
            __options: options,
            handler: pluginFunction(options),
            config: configFunction(options),
        };
    };
    optionsFunction.__isOptionsFunction = true;
    // Expose plugin dependencies so that `object-hash` returns a different
    // value if anything here changes, to ensure a rebuild is triggered.
    optionsFunction.__pluginFunction = pluginFunction;
    optionsFunction.__configFunction = configFunction;
    return optionsFunction;
};

var index = createPlugin(function (_a) {
    var addUtilities = _a.addUtilities, addDynamic = _a.addDynamic, theme = _a.theme, variants = _a.variants;
    addUtilities({
        '.aspect-none': {
            position: 'static',
            paddingBottom: '0',
            '> *': {
                position: 'static',
                height: 'auto',
                width: 'auto',
                top: 'auto',
                right: 'auto',
                bottom: 'auto',
                left: 'auto',
            },
        },
    }, { layer: 'components' });
    addUtilities({
        '.aspect-auto': {
            'aspect-ratio': 'auto',
        },
    }, { layer: 'components' });
    addUtilities({
        '.aspect-square': {
            'aspect-ratio': '1 / 1',
        },
    }, { layer: 'components' });
    addUtilities({
        '.aspect-video': {
            'aspect-ratio': '16 / 9',
        },
    }, { layer: 'components' });
    addDynamic('aspect-w', function (_a) {
        var Utility = _a.Utility, Style = _a.Style;
        var prop = Utility.handler
            .handleStatic(theme('aspectRatio'))
            .handleNumber(1, undefined, 'float')
            .value;
        if (!prop)
            return;
        return Style.generate(Utility.class, {
            '--tw-aspect-w': prop,
            position: 'relative',
            paddingBottom: 'calc(var(--tw-aspect-h) / var(--tw-aspect-w) * 100%)',
            '> *': {
                position: 'absolute',
                height: '100%',
                width: '100%',
                top: '0',
                right: '0',
                bottom: '0',
                left: '0',
            },
        });
    }, {
        layer: 'components',
        variants: variants('aspectRatio'),
        group: 'aspectRatio',
        completions: [
            'aspect-w-{float}',
        ],
    });
    addDynamic('aspect-h', function (_a) {
        var Utility = _a.Utility;
        return Utility.handler
            .handleStatic(theme('aspectRatio'))
            .handleNumber(1, undefined, 'float')
            .createProperty('--tw-aspect-h');
    }, {
        layer: 'components',
        variants: variants('aspectRatio'),
        group: 'aspectRatio',
        completions: [
            'aspect-h-{float}',
        ],
    });
    addDynamic('aspect', function (_a) {
        var Utility = _a.Utility, Style = _a.Style;
        // aspect-h/w
        var value = Utility.handler.handleFraction().value;
        if (value) {
            return Style.generate(Utility.class, {
                position: 'relative',
                paddingBottom: value,
                '> *': {
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    top: '0',
                    right: '0',
                    bottom: '0',
                    left: '0',
                },
            });
        }
    }, {
        layer: 'components',
        group: 'aspectRatio',
        completions: [
            'aspect-{fraction}',
        ],
    });
}, {
    theme: {
        aspectRatio: {},
    },
    variants: {
        aspectRatio: ['responsive'],
    },
});

module.exports = index;
