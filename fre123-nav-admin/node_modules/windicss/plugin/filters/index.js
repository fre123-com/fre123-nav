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
    var addDynamic = _a.addDynamic, theme = _a.theme, variants = _a.variants;
    addDynamic('filter', function (_a) {
        var Utility = _a.Utility;
        return Utility.handler
            .handleStatic(theme('filter'))
            .createProperty(['-webkit-filter', 'filter']);
    }, {
        variants: variants('filter'),
        group: 'filter',
        completions: [
            'blur-{static}',
        ],
    });
    addDynamic('backdrop', function (_a) {
        var Utility = _a.Utility;
        return Utility.handler
            .handleStatic(theme('backdropFilter'))
            .createProperty(['-webkit-backdrop-filter', 'backdrop-filter']);
    }, {
        variants: variants('backdropFilter'),
        group: 'backdropFilter',
        completions: [
            'backdrop-{static}',
        ],
    });
    addDynamic('blur', function (_a) {
        var Utility = _a.Utility;
        return Utility.handler
            .handleStatic(theme('blur'))
            .handleSquareBrackets()
            .handleNumber(0, undefined, 'float', function (number) { return "".concat(number, "px"); })
            .handleSize()
            .createProperty(['-webkit-backdrop-filter', 'backdrop-filter'], function (value) {
            if (value === 'none')
                return 'none';
            return "blur(".concat(value, ")");
        });
    }, {
        variants: variants('blur'),
        group: 'blur',
        completions: [
            'blur-{static}',
        ],
    });
}, {
    theme: {
        filter: {
            none: 'none',
            grayscale: 'grayscale(1)',
            invert: 'invert(1)',
            sepia: 'sepia(1)',
        },
        backdropFilter: {
            none: 'none',
            blur: 'blur(20px)',
        },
        blur: {
            none: 'none',
        },
    },
    variants: {
        filter: ['responsive'],
        backdropFilter: ['responsive'],
    },
});

module.exports = index;
