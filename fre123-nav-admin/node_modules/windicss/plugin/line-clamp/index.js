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
    var addDynamic = _a.addDynamic, theme = _a.theme;
    addDynamic('line-clamp', function (_a) {
        var Utility = _a.Utility, Property = _a.Property, Style = _a.Style;
        if (Utility.amount === 'none')
            return Style(Utility.class, Property('-webkit-line-clamp', 'unset'));
        var value = Utility.handler.handleStatic(theme('lineClamp')).handleNumber(1, undefined, 'int').value;
        if (value) {
            return Style.generate(Utility.class, {
                overflow: 'hidden',
                display: '-webkit-box',
                '-webkit-box-orient': 'vertical',
                '-webkit-line-clamp': value,
            });
        }
    }, {
        group: 'lineClamp',
        completions: [
            'line-clamp-none',
            'line-clamp-{int}',
        ],
    });
}, {
    theme: {
        lineClamp: {},
    },
    variants: {
        lineClamp: ['responsive'],
    },
});

module.exports = index;
