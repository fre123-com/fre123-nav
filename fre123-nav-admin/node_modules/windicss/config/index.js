'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var Console = /** @class */ (function () {
    function Console() {
    }
    Console.log = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        // eslint-disable-next-line no-console
        console.log.apply(console, message);
    };
    Console.error = function () {
        var message = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            message[_i] = arguments[_i];
        }
        // eslint-disable-next-line no-console
        console.error.apply(console, message);
    };
    Console.time = function (label) {
        // eslint-disable-next-line no-console
        console.time(label);
    };
    Console.timeEnd = function (label) {
        // eslint-disable-next-line no-console
        console.timeEnd(label);
    };
    return Console;
}());

var sky = {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
};
var neutral = {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
};
var stone = {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
};
var slate = {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
};
var zinc = {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
};
var gray = {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
};
var warned = false;
function color_warn(from, to) {
    if (!warned) {
        Console.log("warn - '".concat(from, "' has been renamed to '").concat(to, "'."));
        Console.log('warn - Please update your color palette to eliminate this warning.');
        warned = true;
    }
}
var colors = {
    inherit: 'inherit',
    current: 'currentColor',
    transparent: 'transparent',
    black: '#000',
    white: '#fff',
    rose: {
        50: '#fff1f2',
        100: '#ffe4e6',
        200: '#fecdd3',
        300: '#fda4af',
        400: '#fb7185',
        500: '#f43f5e',
        600: '#e11d48',
        700: '#be123c',
        800: '#9f1239',
        900: '#881337',
    },
    pink: {
        50: '#fdf2f8',
        100: '#fce7f3',
        200: '#fbcfe8',
        300: '#f9a8d4',
        400: '#f472b6',
        500: '#ec4899',
        600: '#db2777',
        700: '#be185d',
        800: '#9d174d',
        900: '#831843',
    },
    fuchsia: {
        50: '#fdf4ff',
        100: '#fae8ff',
        200: '#f5d0fe',
        300: '#f0abfc',
        400: '#e879f9',
        500: '#d946ef',
        600: '#c026d3',
        700: '#a21caf',
        800: '#86198f',
        900: '#701a75',
    },
    purple: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7e22ce',
        800: '#6b21a8',
        900: '#581c87',
    },
    violet: {
        50: '#f5f3ff',
        100: '#ede9fe',
        200: '#ddd6fe',
        300: '#c4b5fd',
        400: '#a78bfa',
        500: '#8b5cf6',
        600: '#7c3aed',
        700: '#6d28d9',
        800: '#5b21b6',
        900: '#4c1d95',
    },
    indigo: {
        50: '#eef2ff',
        100: '#e0e7ff',
        200: '#c7d2fe',
        300: '#a5b4fc',
        400: '#818cf8',
        500: '#6366f1',
        600: '#4f46e5',
        700: '#4338ca',
        800: '#3730a3',
        900: '#312e81',
    },
    blue: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
    },
    sky: sky,
    get lightBlue() {
        color_warn('lightBlue', 'sky');
        return sky;
    },
    cyan: {
        50: '#ecfeff',
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63',
    },
    teal: {
        50: '#f0fdfa',
        100: '#ccfbf1',
        200: '#99f6e4',
        300: '#5eead4',
        400: '#2dd4bf',
        500: '#14b8a6',
        600: '#0d9488',
        700: '#0f766e',
        800: '#115e59',
        900: '#134e4a',
    },
    emerald: {
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
    },
    green: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
    },
    lime: {
        50: '#f7fee7',
        100: '#ecfccb',
        200: '#d9f99d',
        300: '#bef264',
        400: '#a3e635',
        500: '#84cc16',
        600: '#65a30d',
        700: '#4d7c0f',
        800: '#3f6212',
        900: '#365314',
    },
    yellow: {
        50: '#fefce8',
        100: '#fef9c3',
        200: '#fef08a',
        300: '#fde047',
        400: '#facc15',
        500: '#eab308',
        600: '#ca8a04',
        700: '#a16207',
        800: '#854d0e',
        900: '#713f12',
    },
    amber: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
    },
    orange: {
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#fed7aa',
        300: '#fdba74',
        400: '#fb923c',
        500: '#f97316',
        600: '#ea580c',
        700: '#c2410c',
        800: '#9a3412',
        900: '#7c2d12',
    },
    red: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
    },
    get warmGray() {
        color_warn('warmGray', 'stone');
        return stone;
    },
    get trueGray() {
        color_warn('trueGray', 'neutral');
        return neutral;
    },
    gray: gray,
    get coolGray() {
        color_warn('coolGray', 'gray');
        return gray;
    },
    get blueGray() {
        color_warn('blueGray', 'slate');
        return slate;
    },
    slate: slate,
    zinc: zinc,
    get zink() {
        color_warn('zink', 'zinc');
        return zinc;
    },
    neutral: neutral,
    stone: stone,
    light: {
        50: '#fdfdfd',
        100: '#fcfcfc',
        200: '#fafafa',
        300: '#f8f9fa',
        400: '#f6f6f6',
        500: '#f2f2f2',
        600: '#f1f3f5',
        700: '#e9ecef',
        800: '#dee2e6',
        900: '#dde1e3',
    },
    dark: {
        50: '#4a4a4a',
        100: '#3c3c3c',
        200: '#323232',
        300: '#2d2d2d',
        400: '#222222',
        500: '#1f1f1f',
        600: '#1c1c1e',
        700: '#1b1b1b',
        800: '#181818',
        900: '#0f0f0f',
    },
};

var keyframes = {
    spin: {
        from: {
            transform: 'rotate(0deg)',
        },
        to: {
            transform: 'rotate(360deg)',
        },
    },
    ping: {
        '0%': {
            transform: 'scale(1)',
            opacity: '1',
        },
        '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0',
        },
    },
    pulse: {
        '0%, 100%': {
            opacity: '1',
        },
        '50%': {
            opacity: '.5',
        },
    },
    bounce: {
        '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
        },
        '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
        },
    },
    shock: {
        'from, 20%, 53%, 80%, to': {
            animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            transform: 'translate3d(0, 0, 0)',
        },
        '40%, 43%': {
            animationTimingFunction: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
            transform: 'translate3d(0, -30px, 0)',
        },
        '70%': {
            animationTimingFunction: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
            transform: 'translate3d(0, -15px, 0)',
        },
        '90%': {
            transform: 'translate3d(0, -4px, 0)',
        },
    },
    flash: {
        'from, 50%, to': {
            opacity: '1',
        },
        '25%, 75%': {
            opacity: '0',
        },
    },
    bubble: {
        'from': {
            transform: 'scale3d(1, 1, 1)',
        },
        '50%': {
            transform: 'scale3d(1.05, 1.05, 1.05)',
        },
        'to': {
            transform: 'scale3d(1, 1, 1)',
        },
    },
    rubberBand: {
        'from': {
            transform: 'scale3d(1, 1, 1)',
        },
        '30%': {
            transform: 'scale3d(1.25, 0.75, 1)',
        },
        '40%': {
            transform: 'scale3d(0.75, 1.25, 1)',
        },
        '50%': {
            transform: 'scale3d(1.15, 0.85, 1)',
        },
        '65%': {
            transform: 'scale3d(0.95, 1.05, 1)',
        },
        '75%': {
            transform: 'scale3d(1.05, 0.95, 1)',
        },
        'to': {
            transform: 'scale3d(1, 1, 1)',
        },
    },
    shakeX: {
        'from, to': {
            transform: 'translate3d(0, 0, 0)',
        },
        '10%, 30%, 50%, 70%, 90%': {
            transform: 'translate3d(-10px, 0, 0)',
        },
        '20%, 40%, 60%, 80%': {
            transform: 'translate3d(10px, 0, 0)',
        },
    },
    shakeY: {
        'from, to': {
            transform: 'translate3d(0, 0, 0)',
        },
        '10%, 30%, 50%, 70%, 90%': {
            transform: 'translate3d(0, -10px, 0)',
        },
        '20%, 40%, 60%, 80%': {
            transform: 'translate3d(0, 10px, 0)',
        },
    },
    headShake: {
        '0%': {
            transform: 'translateX(0)',
        },
        '6.5%': {
            transform: 'translateX(-6px) rotateY(-9deg)',
        },
        '18.5%': {
            transform: 'translateX(5px) rotateY(7deg)',
        },
        '31.5%': {
            transform: 'translateX(-3px) rotateY(-5deg)',
        },
        '43.5%': {
            transform: 'translateX(2px) rotateY(3deg)',
        },
        '50%': {
            transform: 'translateX(0)',
        },
    },
    swing: {
        '20%': {
            transform: 'rotate3d(0, 0, 1, 15deg)',
        },
        '40%': {
            transform: 'rotate3d(0, 0, 1, -10deg)',
        },
        '60%': {
            transform: 'rotate3d(0, 0, 1, 5deg)',
        },
        '80%': {
            transform: 'rotate3d(0, 0, 1, -5deg)',
        },
        'to': {
            transform: 'rotate3d(0, 0, 1, 0deg)',
        },
    },
    tada: {
        'from': {
            transform: 'scale3d(1, 1, 1)',
        },
        '10%, 20%': {
            transform: 'scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)',
        },
        '30%, 50%, 70%, 90%': {
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
        },
        '40%, 60%, 80%': {
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
        },
        'to': {
            transform: 'scale3d(1, 1, 1)',
        },
    },
    wobble: {
        'from': {
            transform: 'translate3d(0, 0, 0)',
        },
        '15%': {
            transform: 'translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg)',
        },
        '30%': {
            transform: 'translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg)',
        },
        '45%': {
            transform: 'translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg)',
        },
        '60%': {
            transform: 'translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg)',
        },
        '75%': {
            transform: 'translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg)',
        },
        'to': {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    jello: {
        'from, 11.1% to': {
            transform: 'translate3d(0, 0, 0)',
        },
        '22.2%': {
            transform: 'skewX(-12.5deg) skewY(-12.5deg)',
        },
        '33.3%': {
            transform: 'skewX(6.25deg) skewY(6.25deg)',
        },
        '44.4%': {
            transform: 'skewX(-3.125deg) skewY(-3.125deg)',
        },
        '55.5%': {
            transform: 'skewX(1.5625deg) skewY(1.5625deg)',
        },
        '66.6%': {
            transform: 'skewX(-0.78125deg) skewY(-0.78125deg)',
        },
        '77.7%': {
            transform: 'skewX(0.390625deg) skewY(0.390625deg)',
        },
        '88.8%': {
            transform: 'skewX(-0.1953125deg) skewY(-0.1953125deg)',
        },
    },
    heartBeat: {
        '0%': {
            transform: 'scale(1)',
        },
        '14%': {
            transform: 'scale(1.3)',
        },
        '28%': {
            transform: 'scale(1)',
        },
        '42%': {
            transform: 'scale(1.3)',
        },
        '70%': {
            transform: 'scale(1)',
        },
    },
    hinge: {
        '0%': {
            transformOrigin: 'top left',
            animationTimingFunction: 'ease-in-out',
        },
        '20%, 60%': {
            transform: 'rotate3d(0, 0, 1, 80deg)',
            transformOrigin: 'top left',
            animationTimingFunction: 'ease-in-out',
        },
        '40%, 80%': {
            transform: 'rotate3d(0, 0, 1, 60deg)',
            transformOrigin: 'top left',
            animationTimingFunction: 'ease-in-out',
        },
        'to': {
            transform: 'translate3d(0, 700px, 0)',
            opacity: '0',
        },
    },
    jackInTheBox: {
        'from': {
            opacity: '0',
            transformOrigin: 'center bottom',
            transform: 'scale(0.1) rotate(30deg)',
        },
        '50%': {
            transform: 'rotate(-10deg)',
        },
        '70%': {
            transform: 'rotate(3deg)',
        },
        'to': {
            transform: 'scale(1)',
        },
    },
    // light speed
    lightSpeedInRight: {
        'from': {
            opacity: '0',
            transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
        },
        '60%': {
            opacity: '1',
            transform: 'skewX(20deg)',
        },
        '80%': {
            transform: 'skewX(-5deg)',
        },
        'to': {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    lightSpeedInLeft: {
        'from': {
            opacity: '0',
            transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
        },
        '60%': {
            opacity: '1',
            transform: 'skewX(20deg)',
        },
        '80%': {
            transform: 'skewX(-5deg)',
        },
        'to': {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    lightSpeedOutLeft: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(100%, 0, 0) skewX(30deg)',
        },
    },
    lightSpeedOutRight: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(100%, 0, 0) skewX(30deg)',
        },
    },
    // flip
    flip: {
        'from': {
            transform: 'perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg)',
            animationTimingFunction: 'ease-out',
        },
        '40%': {
            transform: 'perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg)',
            animationTimingFunction: 'ease-out',
        },
        '50%': {
            transform: 'perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg)',
            animationTimingFunction: 'ease-in',
        },
        '80%': {
            transform: 'perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)',
            animationTimingFunction: 'ease-in',
        },
        'to': {
            transform: 'perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg)',
            animationTimingFunction: 'ease-in',
        },
    },
    flipInX: {
        'from': {
            transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
            animationTimingFunction: 'ease-in',
            opacity: '0',
        },
        '40%': {
            transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
            animationTimingFunction: 'ease-in',
        },
        '60%': {
            transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)',
            opacity: '1',
        },
        '80%': {
            transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)',
        },
        'to': {
            transform: 'perspective(400px)',
        },
    },
    flipInY: {
        'from': {
            transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
            animationTimingFunction: 'ease-in',
            opacity: '0',
        },
        '40%': {
            transform: 'perspective(400px) rotate3d(0, 1, 0, -20deg)',
            animationTimingFunction: 'ease-in',
        },
        '60%': {
            transform: 'perspective(400px) rotate3d(0, 1, 0, 10deg)',
            opacity: '1',
        },
        '80%': {
            transform: 'perspective(400px) rotate3d(0, 1, 0, -5deg)',
        },
        'to': {
            transform: 'perspective(400px)',
        },
    },
    flipOutX: {
        'from': {
            transform: 'perspective(400px)',
        },
        '30%': {
            transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
            opacity: '1',
        },
        'to': {
            transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
            opacity: '0',
        },
    },
    flipOutY: {
        'from': {
            transform: 'perspective(400px)',
        },
        '30%': {
            transform: 'perspective(400px) rotate3d(0, 1, 0, -15deg)',
            opacity: '1',
        },
        'to': {
            transform: 'perspective(400px) rotate3d(0, 1, 0, 90deg)',
            opacity: '0',
        },
    },
    // rotate in
    rotateIn: {
        'from': {
            transformOrigin: 'center',
            transform: 'rotate3d(0, 0, 1, -200deg)',
            opacity: '0',
        },
        'to': {
            transformOrigin: 'center',
            transform: 'translate3d(0, 0, 0)',
            opacity: '1',
        },
    },
    rotateInDownLeft: {
        'from': {
            transformOrigin: 'left bottom',
            transform: 'rotate3d(0, 0, 1, -45deg)',
            opacity: '0',
        },
        'to': {
            transformOrigin: 'left bottom',
            transform: 'translate3d(0, 0, 0)',
            opacity: '1',
        },
    },
    rotateInDownRight: {
        'from': {
            transformOrigin: 'right bottom',
            transform: 'rotate3d(0, 0, 1, 45deg)',
            opacity: '0',
        },
        'to': {
            transformOrigin: 'right bottom',
            transform: 'translate3d(0, 0, 0)',
            opacity: '1',
        },
    },
    rotateInUpLeft: {
        'from': {
            transformOrigin: 'left top',
            transform: 'rotate3d(0, 0, 1, 45deg)',
            opacity: '0',
        },
        'to': {
            transformOrigin: 'left top',
            transform: 'translate3d(0, 0, 0)',
            opacity: '1',
        },
    },
    rotateInUpRight: {
        'from': {
            transformOrigin: 'right bottom',
            transform: 'rotate3d(0, 0, 1, -90deg)',
            opacity: '0',
        },
        'to': {
            transformOrigin: 'right bottom',
            transform: 'translate3d(0, 0, 0)',
            opacity: '1',
        },
    },
    rotateOut: {
        'from': {
            transformOrigin: 'center',
            opacity: '1',
        },
        'to': {
            transformOrigin: 'center',
            transform: 'rotate3d(0, 0, 1, 200deg)',
            opacity: '0',
        },
    },
    rotateOutDownLeft: {
        'from': {
            transformOrigin: 'left bottom',
            opacity: '1',
        },
        'to': {
            transformOrigin: 'left bottom',
            transform: 'rotate3d(0, 0, 1, 45deg)',
            opacity: '0',
        },
    },
    rotateOutDownRight: {
        'from': {
            transformOrigin: 'right bottom',
            opacity: '1',
        },
        'to': {
            transformOrigin: 'right bottom',
            transform: 'rotate3d(0, 0, 1, -45deg)',
            opacity: '0',
        },
    },
    rotateOutUpLeft: {
        'from': {
            transformOrigin: 'left bottom',
            opacity: '1',
        },
        'to': {
            transformOrigin: 'left bottom',
            transform: 'rotate3d(0, 0, 1, -45deg)',
            opacity: '0',
        },
    },
    rotateOutUpRight: {
        'from': {
            transformOrigin: 'right bottom',
            opacity: '1',
        },
        'to': {
            transformOrigin: 'left bottom',
            transform: 'rotate3d(0, 0, 1, 90deg)',
            opacity: '0',
        },
    },
    // roll
    rollIn: {
        'from': {
            opacity: '0',
            transform: 'translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    rollOut: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg)',
        },
    },
    // zoom in
    zoomIn: {
        'from': {
            opacity: '0',
            transform: 'scale3d(0.3, 0.3, 0.3)',
        },
        '50%': {
            opacity: '1',
        },
    },
    zoomInDown: {
        'from': {
            opacity: '0',
            transform: 'scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0)',
            animationTimingFunction: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        },
        '60%': {
            opacity: '1',
            transform: 'scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)',
            animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
        },
    },
    zoomInLeft: {
        'from': {
            opacity: '0',
            transform: 'scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0)',
            animationTimingFunction: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        },
        '60%': {
            opacity: '1',
            transform: 'scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0)',
            animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
        },
    },
    zoomInRight: {
        'from': {
            opacity: '0',
            transform: 'scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0)',
            animationTimingFunction: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        },
        '60%': {
            opacity: '1',
            transform: 'scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0)',
            animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
        },
    },
    zoomInUp: {
        'from': {
            opacity: '0',
            transform: 'scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0)',
            animationTimingFunction: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        },
        '60%': {
            opacity: '1',
            transform: 'scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)',
            animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
        },
    },
    // bounce in
    bounceIn: {
        'from, 20%, 40%, 60%, 80%, to': {
            animationTimingFunction: 'ease-in-out',
        },
        '0%': {
            opacity: '0',
            transform: 'scale3d(0.3, 0.3, 0.3)',
        },
        '20%': {
            transform: 'scale3d(1.1, 1.1, 1.1)',
        },
        '40%': {
            transform: 'scale3d(0.9, 0.9, 0.9)',
        },
        '60%': {
            transform: 'scale3d(1.03, 1.03, 1.03)',
            opacity: '1',
        },
        '80%': {
            transform: 'scale3d(0.97, 0.97, 0.97)',
        },
        'to': {
            opacity: '1',
            transform: 'scale3d(1, 1, 1)',
        },
    },
    bounceInDown: {
        'from, 60%, 75%, 90%, to': {
            animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        },
        '0%': {
            opacity: '0',
            transform: 'translate3d(0, -3000px, 0)',
        },
        '60%': {
            opacity: '1',
            transform: 'translate3d(0, 25px, 0)',
        },
        '75%': {
            transform: 'translate3d(0, -10px, 0)',
        },
        '90%': {
            transform: 'translate3d(0, 5px, 0)',
        },
        'to': {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    bounceInLeft: {
        'from, 60%, 75%, 90%, to': {
            animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        },
        '0%': {
            opacity: '0',
            transform: 'translate3d(-3000px, 0, 0)',
        },
        '60%': {
            opacity: '1',
            transform: 'translate3d(25px, 0, 0)',
        },
        '75%': {
            transform: 'translate3d(-10px, 0, 0)',
        },
        '90%': {
            transform: 'translate3d(5px, 0, 0)',
        },
        'to': {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    bounceInRight: {
        'from, 60%, 75%, 90%, to': {
            animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        },
        '0%': {
            opacity: '0',
            transform: 'translate3d(3000px, 0, 0)',
        },
        '60%': {
            opacity: '1',
            transform: 'translate3d(-25px, 0, 0)',
        },
        '75%': {
            transform: 'translate3d(10px, 0, 0)',
        },
        '90%': {
            transform: 'translate3d(-5px, 0, 0)',
        },
        'to': {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    bounceInUp: {
        'from, 60%, 75%, 90%, to': {
            animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        },
        '0%': {
            opacity: '0',
            transform: 'translate3d(0, 3000px, 0)',
        },
        '60%': {
            opacity: '1',
            transform: 'translate3d(0, -20px, 0)',
        },
        '75%': {
            transform: 'translate3d(0, 10px, 0)',
        },
        '90%': {
            transform: 'translate3d(0, -5px, 0)',
        },
        'to': {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    // bounce out
    bounceOut: {
        '20%': {
            transform: 'scale3d(0.9, 0.9, 0.9)',
        },
        '50%, 55%': {
            opacity: '1',
            transform: 'scale3d(1.1, 1.1, 1.1)',
        },
        'to': {
            opacity: '0',
            transform: 'scale3d(0.3, 0.3, 0.3)',
        },
    },
    bounceOutDown: {
        '20%': {
            transform: 'translate3d(0, 10px, 0)',
        },
        '40%, 45%': {
            opacity: '1',
            transform: 'translate3d(0, -20px, 0)',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(0, 2000px, 0)',
        },
    },
    bounceOutLeft: {
        '20%': {
            opacity: '1',
            transform: 'translate3d(20px, 0, 0)',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(-2000px, 0, 0)',
        },
    },
    bounceOutRight: {
        '20%': {
            opacity: '1',
            transform: 'translate3d(-20px, 0, 0)',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(2000px, 0, 0)',
        },
    },
    bounceOutUp: {
        '20%': {
            transform: 'translate3d(0, -10px, 0)',
        },
        '40%, 45%': {
            opacity: '1',
            transform: 'translate3d(0, 20px, 0)',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(0, -2000px, 0)',
        },
    },
    // zoom out
    zoomOut: {
        'from': {
            opacity: '1',
        },
        '50%': {
            opacity: '0',
            transform: 'scale3d(0.3, 0.3, 0.3)',
        },
        'to': {
            opacity: '0',
        },
    },
    zoomOutDown: {
        '40%': {
            opacity: '1',
            transform: 'scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0)',
            animationTimingFunction: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        },
        'to': {
            opacity: '0',
            transform: 'scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0)',
            transformOrigin: 'center bottom',
            animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
        },
    },
    zoomOutLeft: {
        '40%': {
            opacity: '1',
            transform: 'scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0)',
        },
        'to': {
            opacity: '0',
            transform: 'scale(0.1) translate3d(-2000px, 0, 0)',
            transformOrigin: 'left center',
        },
    },
    zoomOutRight: {
        '40%': {
            opacity: '1',
            transform: 'scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0)',
        },
        'to': {
            opacity: '0',
            transform: 'scale(0.1) translate3d(2000px, 0, 0)',
            transformOrigin: 'right center',
        },
    },
    zoomOutUp: {
        '40%': {
            opacity: '1',
            transform: 'scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)',
            animationTimingFunction: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        },
        'to': {
            opacity: '0',
            transform: 'scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0)',
            transformOrigin: 'center bottom',
            animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1)',
        },
    },
    // slide in
    slideInDown: {
        'from': {
            transform: 'translate3d(0, -100%, 0)',
            visibility: 'visible',
        },
        'to': {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    slideInLeft: {
        'from': {
            transform: 'translate3d(-100%, 0, 0)',
            visibility: 'visible',
        },
        'to': {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    slideInRight: {
        'from': {
            transform: 'translate3d(100%, 0, 0)',
            visibility: 'visible',
        },
        'to': {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    slideInUp: {
        'from': {
            transform: 'translate3d(0, 100%, 0)',
            visibility: 'visible',
        },
        'to': {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    // slide out
    slideOutDown: {
        'from': {
            transform: 'translate3d(0, 0, 0)',
        },
        'to': {
            visibility: 'hidden',
            transform: 'translate3d(0, 100%, 0)',
        },
    },
    slideOutLeft: {
        'from': {
            transform: 'translate3d(0, 0, 0)',
        },
        'to': {
            visibility: 'hidden',
            transform: 'translate3d(-100%, 0, 0)',
        },
    },
    slideOutRight: {
        'from': {
            transform: 'translate3d(0, 0, 0)',
        },
        'to': {
            visibility: 'hidden',
            transform: 'translate3d(100%, 0, 0)',
        },
    },
    slideOutUp: {
        'from': {
            transform: 'translate3d(0, 0, 0)',
        },
        'to': {
            visibility: 'hidden',
            transform: 'translate3d(0, -100%, 0)',
        },
    },
    // fade in
    fadeIn: {
        'from': {
            opacity: '0',
        },
        'to': {
            opacity: '1',
        },
    },
    fadeInDown: {
        'from': {
            opacity: '0',
            transform: 'translate3d(0, -100%, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    fadeInDownBig: {
        'from': {
            opacity: '0',
            transform: 'translate3d(0, -2000px, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    fadeInLeft: {
        'from': {
            opacity: '0',
            transform: 'translate3d(-100%, 0, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    fadeInLeftBig: {
        'from': {
            opacity: '0',
            transform: 'translate3d(-2000px, 0, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    fadeInRight: {
        'from': {
            opacity: '0',
            transform: 'translate3d(100%, 0, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    fadeInRightBig: {
        'from': {
            opacity: '0',
            transform: 'translate3d(2000px, 0, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    fadeInUp: {
        'from': {
            opacity: '0',
            transform: 'translate3d(0, 100%, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    fadeInUpBig: {
        'from': {
            opacity: '0',
            transform: 'translate3d(0, 2000px, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    fadeInTopLeft: {
        'from': {
            opacity: '0',
            transform: 'translate3d(-100%, -100%, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    fadeInTopRight: {
        'from': {
            opacity: '0',
            transform: 'translate3d(100%, -100%, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    fadeInBottomLeft: {
        'from': {
            opacity: '0',
            transform: 'translate3d(-100%, 100%, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    fadeInBottomRight: {
        'from': {
            opacity: '0',
            transform: 'translate3d(100%, 100%, 0)',
        },
        'to': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
    },
    // fade out
    fadeOut: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
        },
    },
    fadeOutDown: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(0, 100%, 0)',
        },
    },
    fadeOutDownBig: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(0, 2000px, 0)',
        },
    },
    fadeOutLeft: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(-100%, 0, 0)',
        },
    },
    fadeOutLeftBig: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(-2000px, 0, 0)',
        },
    },
    fadeOutRight: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(100%, 0, 0)',
        },
    },
    fadeOutRightBig: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(2000px, 0, 0)',
        },
    },
    fadeOutUp: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(0, -100%, 0)',
        },
    },
    fadeOutUpBig: {
        'from': {
            opacity: '1',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(0, -2000px, 0)',
        },
    },
    fadeOutTopLeft: {
        'from': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(-100%, -100%, 0)',
        },
    },
    fadeOutTopRight: {
        'from': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(100%, -100%, 0)',
        },
    },
    fadeOutBottomLeft: {
        'from': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(-100%, 100%, 0)',
        },
    },
    fadeOutBottomRight: {
        'from': {
            opacity: '1',
            transform: 'translate3d(0, 0, 0)',
        },
        'to': {
            opacity: '0',
            transform: 'translate3d(100%, 100%, 0)',
        },
    },
    // back in
    backInUp: {
        '0%': {
            opacity: '0.7',
            transform: 'translateY(1200px) scale(0.7)',
        },
        '80%': {
            opacity: '0.7',
            transform: 'translateY(0px) scale(0.7)',
        },
        '100%': {
            opacity: '1',
            transform: 'scale(1)',
        },
    },
    backInDown: {
        '0%': {
            opacity: '0.7',
            transform: 'translateY(-1200px) scale(0.7)',
        },
        '80%': {
            opacity: '0.7',
            transform: 'translateY(0px) scale(0.7)',
        },
        '100%': {
            opacity: '1',
            transform: 'scale(1)',
        },
    },
    backInLeft: {
        '0%': {
            opacity: '0.7',
            transform: 'translateX(-2000px) scale(0.7)',
        },
        '80%': {
            opacity: '0.7',
            transform: 'translateX(0px) scale(0.7)',
        },
        '100%': {
            opacity: '1',
            transform: 'scale(1)',
        },
    },
    backInRight: {
        '0%': {
            opacity: '0.7',
            transform: 'translateX(2000px) scale(0.7)',
        },
        '80%': {
            opacity: '0.7',
            transform: 'translateY(0px) scale(0.7)',
        },
        '100%': {
            opacity: '1',
            transform: 'scale(1)',
        },
    },
    // back out
    backOutUp: {
        '0%': {
            opacity: '1',
            transform: 'scale(1)',
        },
        '80%': {
            opacity: '0.7',
            transform: 'translateY(0px) scale(0.7)',
        },
        '100%': {
            opacity: '0.7',
            transform: 'translateY(-700px) scale(0.7)',
        },
    },
    backOutDown: {
        '0%': {
            opacity: '1',
            transform: 'scale(1)',
        },
        '80%': {
            opacity: '0.7',
            transform: 'translateY(0px) scale(0.7)',
        },
        '100%': {
            opacity: '0.7',
            transform: 'translateY(700px) scale(0.7)',
        },
    },
    backOutLeft: {
        '0%': {
            opacity: '1',
            transform: 'scale(1)',
        },
        '80%': {
            opacity: '0.7',
            transform: 'translateX(-2000px) scale(0.7)',
        },
        '100%': {
            opacity: '0.7',
            transform: 'translateY(-700px) scale(0.7)',
        },
    },
    backOutRight: {
        '0%': {
            opacity: '1',
            transform: 'scale(1)',
        },
        '80%': {
            opacity: '0.7',
            transform: 'translateY(0px) scale(0.7)',
        },
        '100%': {
            opacity: '0.7',
            transform: 'translateX(2000px) scale(0.7)',
        },
    },
};

var pseudoClassNames = [
    'hover',
    'focus',
    'active',
    'visited',
    'link',
    'target',
    'focus-visible',
    'focus-within',
    'checked',
    'default',
    'disabled',
    'enabled',
    'indeterminate',
    'invalid',
    'valid',
    'optional',
    'required',
    'placeholder-shown',
    'read-only',
    'read-write',
    'first-of-type',
    'last-of-type',
    'only-child',
    'only-of-type',
    'root',
    'empty',
];
var variantOrder = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], pseudoClassNames, true), [
    'not-checked',
    'not-disabled',
    'not-first-of-type',
    'not-last-of-type',
    'first',
    'not-first',
    'last',
    'not-last',
    'not-only-child',
    'not-only-of-type',
    'even',
    'odd',
    'even-of-type',
    'odd-of-type',
    'before',
    'after',
    'first-letter',
    'first-line',
    'file-selector-button',
    'file',
    'selection',
    'marker',
    'svg',
    'all',
    'children',
    'siblings',
    'sibling',
    'ltr',
    'rtl'
], false), pseudoClassNames.map(function (pseudoClassName) { return "group-".concat(pseudoClassName); }), true), [
    'motion-safe',
    'motion-reduce'
], false), pseudoClassNames.map(function (pseudoClassName) { return "peer-".concat(pseudoClassName); }), true), pseudoClassNames.map(function (pseudoClassName) { return "peer-not-".concat(pseudoClassName); }), true);
var layerOrder;
(function (layerOrder) {
    layerOrder[layerOrder["base"] = 10] = "base";
    layerOrder[layerOrder["components"] = 150] = "components";
    layerOrder[layerOrder["shortcuts"] = 160] = "shortcuts";
    layerOrder[layerOrder["utilities"] = 20000] = "utilities";
})(layerOrder || (layerOrder = {}));
var pluginOrder;
(function (pluginOrder) {
    pluginOrder[pluginOrder["columns"] = 80] = "columns";
    pluginOrder[pluginOrder["container"] = 100] = "container";
    pluginOrder[pluginOrder["space"] = 200] = "space";
    pluginOrder[pluginOrder["divideWidth"] = 300] = "divideWidth";
    pluginOrder[pluginOrder["divideColor"] = 400] = "divideColor";
    pluginOrder[pluginOrder["divideStyle"] = 500] = "divideStyle";
    pluginOrder[pluginOrder["divideOpacity"] = 600] = "divideOpacity";
    pluginOrder[pluginOrder["accessibility"] = 700] = "accessibility";
    pluginOrder[pluginOrder["appearance"] = 800] = "appearance";
    pluginOrder[pluginOrder["backgroundAttachment"] = 900] = "backgroundAttachment";
    pluginOrder[pluginOrder["backgroundClip"] = 1000] = "backgroundClip";
    pluginOrder[pluginOrder["backgroundColor"] = 1100] = "backgroundColor";
    pluginOrder[pluginOrder["backgroundImage"] = 1200] = "backgroundImage";
    pluginOrder[pluginOrder["gradientColorStops"] = 1300] = "gradientColorStops";
    pluginOrder[pluginOrder["backgroundOpacity"] = 1400] = "backgroundOpacity";
    pluginOrder[pluginOrder["backgroundPosition"] = 1500] = "backgroundPosition";
    pluginOrder[pluginOrder["backgroundRepeat"] = 1600] = "backgroundRepeat";
    pluginOrder[pluginOrder["backgroundSize"] = 1700] = "backgroundSize";
    pluginOrder[pluginOrder["backgroundOrigin"] = 1750] = "backgroundOrigin";
    pluginOrder[pluginOrder["borderCollapse"] = 1800] = "borderCollapse";
    pluginOrder[pluginOrder["borderColor"] = 1900] = "borderColor";
    pluginOrder[pluginOrder["borderOpacity"] = 2000] = "borderOpacity";
    pluginOrder[pluginOrder["borderRadius"] = 2100] = "borderRadius";
    pluginOrder[pluginOrder["borderStyle"] = 2200] = "borderStyle";
    pluginOrder[pluginOrder["borderWidth"] = 2300] = "borderWidth";
    pluginOrder[pluginOrder["boxDecorationBreak"] = 2350] = "boxDecorationBreak";
    pluginOrder[pluginOrder["boxSizing"] = 2400] = "boxSizing";
    pluginOrder[pluginOrder["cursor"] = 2500] = "cursor";
    pluginOrder[pluginOrder["captionSide"] = 2550] = "captionSide";
    pluginOrder[pluginOrder["emptyCells"] = 2560] = "emptyCells";
    pluginOrder[pluginOrder["display"] = 2600] = "display";
    pluginOrder[pluginOrder["flexBasis"] = 2699] = "flexBasis";
    pluginOrder[pluginOrder["flexDirection"] = 2700] = "flexDirection";
    pluginOrder[pluginOrder["flexWrap"] = 2800] = "flexWrap";
    pluginOrder[pluginOrder["placeItems"] = 2900] = "placeItems";
    pluginOrder[pluginOrder["placeContent"] = 3000] = "placeContent";
    pluginOrder[pluginOrder["placeSelf"] = 3100] = "placeSelf";
    pluginOrder[pluginOrder["alignItems"] = 3200] = "alignItems";
    pluginOrder[pluginOrder["alignContent"] = 3300] = "alignContent";
    pluginOrder[pluginOrder["alignSelf"] = 3400] = "alignSelf";
    pluginOrder[pluginOrder["justifyItems"] = 3500] = "justifyItems";
    pluginOrder[pluginOrder["justifyContent"] = 3600] = "justifyContent";
    pluginOrder[pluginOrder["justifySelf"] = 3700] = "justifySelf";
    pluginOrder[pluginOrder["flex"] = 3800] = "flex";
    pluginOrder[pluginOrder["flexGrow"] = 3900] = "flexGrow";
    pluginOrder[pluginOrder["flexShrink"] = 4000] = "flexShrink";
    pluginOrder[pluginOrder["order"] = 4100] = "order";
    pluginOrder[pluginOrder["float"] = 4200] = "float";
    pluginOrder[pluginOrder["clear"] = 4300] = "clear";
    pluginOrder[pluginOrder["fontFamily"] = 4400] = "fontFamily";
    pluginOrder[pluginOrder["fontWeight"] = 4500] = "fontWeight";
    pluginOrder[pluginOrder["height"] = 4600] = "height";
    pluginOrder[pluginOrder["fontSize"] = 4700] = "fontSize";
    pluginOrder[pluginOrder["lineHeight"] = 4800] = "lineHeight";
    pluginOrder[pluginOrder["listStylePosition"] = 4900] = "listStylePosition";
    pluginOrder[pluginOrder["listStyleType"] = 5000] = "listStyleType";
    pluginOrder[pluginOrder["margin"] = 5100] = "margin";
    pluginOrder[pluginOrder["maxHeight"] = 5200] = "maxHeight";
    pluginOrder[pluginOrder["maxWidth"] = 5300] = "maxWidth";
    pluginOrder[pluginOrder["minHeight"] = 5400] = "minHeight";
    pluginOrder[pluginOrder["minWidth"] = 5500] = "minWidth";
    pluginOrder[pluginOrder["objectFit"] = 5600] = "objectFit";
    pluginOrder[pluginOrder["objectPosition"] = 5700] = "objectPosition";
    pluginOrder[pluginOrder["opacity"] = 5800] = "opacity";
    pluginOrder[pluginOrder["outline"] = 5900] = "outline";
    pluginOrder[pluginOrder["overflow"] = 6000] = "overflow";
    pluginOrder[pluginOrder["overscrollBehavior"] = 6100] = "overscrollBehavior";
    pluginOrder[pluginOrder["padding"] = 6200] = "padding";
    pluginOrder[pluginOrder["placeholderColor"] = 6300] = "placeholderColor";
    pluginOrder[pluginOrder["placeholderOpacity"] = 6400] = "placeholderOpacity";
    pluginOrder[pluginOrder["caretColor"] = 6450] = "caretColor";
    pluginOrder[pluginOrder["caretOpacity"] = 6460] = "caretOpacity";
    pluginOrder[pluginOrder["tabSize"] = 6470] = "tabSize";
    pluginOrder[pluginOrder["pointerEvents"] = 6500] = "pointerEvents";
    pluginOrder[pluginOrder["position"] = 6600] = "position";
    pluginOrder[pluginOrder["inset"] = 6700] = "inset";
    pluginOrder[pluginOrder["resize"] = 6800] = "resize";
    pluginOrder[pluginOrder["boxShadow"] = 6900] = "boxShadow";
    pluginOrder[pluginOrder["boxShadowColor"] = 6950] = "boxShadowColor";
    pluginOrder[pluginOrder["ringWidth"] = 7000] = "ringWidth";
    pluginOrder[pluginOrder["ringOffsetColor"] = 7100] = "ringOffsetColor";
    pluginOrder[pluginOrder["ringOffsetWidth"] = 7200] = "ringOffsetWidth";
    pluginOrder[pluginOrder["ringColor"] = 7300] = "ringColor";
    pluginOrder[pluginOrder["ringOpacity"] = 7400] = "ringOpacity";
    pluginOrder[pluginOrder["fill"] = 7500] = "fill";
    pluginOrder[pluginOrder["stroke"] = 7600] = "stroke";
    pluginOrder[pluginOrder["strokeWidth"] = 7700] = "strokeWidth";
    pluginOrder[pluginOrder["strokeDashArray"] = 7750] = "strokeDashArray";
    pluginOrder[pluginOrder["strokeDashOffset"] = 7760] = "strokeDashOffset";
    pluginOrder[pluginOrder["tableLayout"] = 7800] = "tableLayout";
    pluginOrder[pluginOrder["textAlign"] = 7900] = "textAlign";
    pluginOrder[pluginOrder["textColor"] = 8000] = "textColor";
    pluginOrder[pluginOrder["textOpacity"] = 8100] = "textOpacity";
    pluginOrder[pluginOrder["textOverflow"] = 8200] = "textOverflow";
    pluginOrder[pluginOrder["textShadow"] = 8250] = "textShadow";
    pluginOrder[pluginOrder["fontStyle"] = 8300] = "fontStyle";
    pluginOrder[pluginOrder["textTransform"] = 8400] = "textTransform";
    pluginOrder[pluginOrder["textDecorationStyle"] = 8450] = "textDecorationStyle";
    pluginOrder[pluginOrder["textDecorationLength"] = 8455] = "textDecorationLength";
    pluginOrder[pluginOrder["textDecorationColor"] = 8460] = "textDecorationColor";
    pluginOrder[pluginOrder["textDecorationOpacity"] = 8470] = "textDecorationOpacity";
    pluginOrder[pluginOrder["textDecorationOffset"] = 8480] = "textDecorationOffset";
    pluginOrder[pluginOrder["textDecorationThickness"] = 8490] = "textDecorationThickness";
    pluginOrder[pluginOrder["textDecoration"] = 8500] = "textDecoration";
    pluginOrder[pluginOrder["textIndent"] = 8550] = "textIndent";
    pluginOrder[pluginOrder["textStrokeColor"] = 8560] = "textStrokeColor";
    pluginOrder[pluginOrder["textStrokeWidth"] = 8570] = "textStrokeWidth";
    pluginOrder[pluginOrder["content"] = 8580] = "content";
    pluginOrder[pluginOrder["fontSmoothing"] = 8600] = "fontSmoothing";
    pluginOrder[pluginOrder["fontVariantNumeric"] = 8700] = "fontVariantNumeric";
    pluginOrder[pluginOrder["letterSpacing"] = 8800] = "letterSpacing";
    pluginOrder[pluginOrder["userSelect"] = 8900] = "userSelect";
    pluginOrder[pluginOrder["verticalAlign"] = 9000] = "verticalAlign";
    pluginOrder[pluginOrder["visibility"] = 9100] = "visibility";
    pluginOrder[pluginOrder["backfaceVisibility"] = 9150] = "backfaceVisibility";
    pluginOrder[pluginOrder["whitespace"] = 9200] = "whitespace";
    pluginOrder[pluginOrder["wordBreak"] = 9300] = "wordBreak";
    pluginOrder[pluginOrder["writingMode"] = 9340] = "writingMode";
    pluginOrder[pluginOrder["hyphens"] = 9350] = "hyphens";
    pluginOrder[pluginOrder["width"] = 9400] = "width";
    pluginOrder[pluginOrder["zIndex"] = 9500] = "zIndex";
    pluginOrder[pluginOrder["isolation"] = 9550] = "isolation";
    pluginOrder[pluginOrder["gap"] = 9600] = "gap";
    pluginOrder[pluginOrder["gridAutoFlow"] = 9700] = "gridAutoFlow";
    pluginOrder[pluginOrder["gridTemplateColumns"] = 9800] = "gridTemplateColumns";
    pluginOrder[pluginOrder["gridAutoColumns"] = 9900] = "gridAutoColumns";
    pluginOrder[pluginOrder["gridColumn"] = 10000] = "gridColumn";
    pluginOrder[pluginOrder["gridColumnStart"] = 10100] = "gridColumnStart";
    pluginOrder[pluginOrder["gridColumnEnd"] = 10200] = "gridColumnEnd";
    pluginOrder[pluginOrder["gridTemplateRows"] = 10300] = "gridTemplateRows";
    pluginOrder[pluginOrder["gridAutoRows"] = 10400] = "gridAutoRows";
    pluginOrder[pluginOrder["gridRow"] = 10500] = "gridRow";
    pluginOrder[pluginOrder["gridRowStart"] = 10600] = "gridRowStart";
    pluginOrder[pluginOrder["gridRowEnd"] = 10700] = "gridRowEnd";
    pluginOrder[pluginOrder["transform"] = 10800] = "transform";
    pluginOrder[pluginOrder["transformOrigin"] = 10900] = "transformOrigin";
    pluginOrder[pluginOrder["scale"] = 11000] = "scale";
    pluginOrder[pluginOrder["rotate"] = 11100] = "rotate";
    pluginOrder[pluginOrder["translate"] = 11200] = "translate";
    pluginOrder[pluginOrder["skew"] = 11300] = "skew";
    pluginOrder[pluginOrder["perspective"] = 11350] = "perspective";
    pluginOrder[pluginOrder["perspectiveOrigin"] = 11360] = "perspectiveOrigin";
    pluginOrder[pluginOrder["transitionProperty"] = 11400] = "transitionProperty";
    pluginOrder[pluginOrder["transitionTimingFunction"] = 11500] = "transitionTimingFunction";
    pluginOrder[pluginOrder["transitionDuration"] = 11600] = "transitionDuration";
    pluginOrder[pluginOrder["transitionDelay"] = 11700] = "transitionDelay";
    pluginOrder[pluginOrder["keyframes"] = 11800] = "keyframes";
    pluginOrder[pluginOrder["animation"] = 11900] = "animation";
    pluginOrder[pluginOrder["imageRendering"] = 11950] = "imageRendering";
    pluginOrder[pluginOrder["mixBlendMode"] = 12000] = "mixBlendMode";
    pluginOrder[pluginOrder["backgroundBlendMode"] = 12100] = "backgroundBlendMode";
    pluginOrder[pluginOrder["filter"] = 12200] = "filter";
    pluginOrder[pluginOrder["blur"] = 12300] = "blur";
    pluginOrder[pluginOrder["brightness"] = 12400] = "brightness";
    pluginOrder[pluginOrder["contrast"] = 12500] = "contrast";
    pluginOrder[pluginOrder["dropShadow"] = 12600] = "dropShadow";
    pluginOrder[pluginOrder["grayscale"] = 12700] = "grayscale";
    pluginOrder[pluginOrder["hueRotate"] = 12800] = "hueRotate";
    pluginOrder[pluginOrder["invert"] = 12900] = "invert";
    pluginOrder[pluginOrder["saturate"] = 13000] = "saturate";
    pluginOrder[pluginOrder["sepia"] = 13100] = "sepia";
    pluginOrder[pluginOrder["backdropFilter"] = 13200] = "backdropFilter";
    pluginOrder[pluginOrder["backdropBlur"] = 13300] = "backdropBlur";
    pluginOrder[pluginOrder["backdropBrightness"] = 13400] = "backdropBrightness";
    pluginOrder[pluginOrder["backdropContrast"] = 13500] = "backdropContrast";
    pluginOrder[pluginOrder["backdropGrayscale"] = 13600] = "backdropGrayscale";
    pluginOrder[pluginOrder["backdropHueRotate"] = 13700] = "backdropHueRotate";
    pluginOrder[pluginOrder["backdropInvert"] = 13800] = "backdropInvert";
    pluginOrder[pluginOrder["backdropOpacity"] = 13900] = "backdropOpacity";
    pluginOrder[pluginOrder["backdropSaturate"] = 14000] = "backdropSaturate";
    pluginOrder[pluginOrder["backdropSepia"] = 14100] = "backdropSepia";
    pluginOrder[pluginOrder["willChange"] = 14200] = "willChange";
    pluginOrder[pluginOrder["touchAction"] = 14300] = "touchAction";
    pluginOrder[pluginOrder["scrollBehavior"] = 14400] = "scrollBehavior";
    pluginOrder[pluginOrder["accentColor"] = 14500] = "accentColor";
})(pluginOrder || (pluginOrder = {}));

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

var defaultColors = {
    transparent: 'transparent',
    current: 'currentColor',
    inherit: 'inherit',
    light: colors.light,
    dark: colors.dark,
    black: colors.black,
    white: colors.white,
    slate: colors.slate,
    gray: colors.gray,
    zinc: colors.zinc,
    neutral: colors.neutral,
    stone: colors.stone,
    red: colors.red,
    yellow: colors.amber,
    green: colors.emerald,
    blue: colors.blue,
    indigo: colors.indigo,
    purple: colors.violet,
    pink: colors.pink,
    rose: colors.rose,
    fuchsia: colors.fuchsia,
    violet: colors.violet,
    cyan: colors.cyan,
    teal: colors.teal,
    emerald: colors.emerald,
    lime: colors.lime,
    amber: colors.amber,
    orange: colors.orange,
    sky: colors.sky,
    'light-blue': colors.sky,
    'warm-gray': colors.stone,
    'true-gray': colors.neutral,
    'cool-gray': colors.gray,
    'blue-gray': colors.slate,
};
// tShirtScale describes the sizes xs - 7xl
var tShirtScale = {
    'xs': '20rem',
    'sm': '24rem',
    'md': '28rem',
    'lg': '32rem',
    'xl': '36rem',
    '2xl': '42rem',
    '3xl': '48rem',
    '4xl': '56rem',
    '5xl': '64rem',
    '6xl': '72rem',
    '7xl': '80rem',
};
var baseConfig = {
    // purge: [],
    presets: [],
    prefixer: true,
    attributify: false,
    darkMode: 'class',
    theme: {
        orientation: {
            portrait: 'portrait',
            landscape: 'landscape',
        },
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
        colors: defaultColors,
        spacing: {
            px: '1px',
            0: '0px',
            0.5: '0.125rem',
            1: '0.25rem',
            1.5: '0.375rem',
            2: '0.5rem',
            2.5: '0.625rem',
            3: '0.75rem',
            3.5: '0.875rem',
            4: '1rem',
            5: '1.25rem',
            6: '1.5rem',
            7: '1.75rem',
            8: '2rem',
            9: '2.25rem',
            10: '2.5rem',
            11: '2.75rem',
            12: '3rem',
            14: '3.5rem',
            16: '4rem',
            20: '5rem',
            24: '6rem',
            28: '7rem',
            32: '8rem',
            36: '9rem',
            40: '10rem',
            44: '11rem',
            48: '12rem',
            52: '13rem',
            56: '14rem',
            60: '15rem',
            64: '16rem',
            72: '18rem',
            80: '20rem',
            96: '24rem',
            // float -> float/4 rem
        },
        animation: {
            none: 'none',
            spin: 'spin 1s linear infinite',
            ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
            pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            bounce: 'bounce 1s infinite',
            'shock': {
                animation: 'shock',
                transformOrigin: 'center bottom',
            },
            'flash': 'flash',
            'bubble': 'bubble',
            'rubber-band': 'rubberBand',
            'shake-x': 'shakeX',
            'shake-y': 'shakeY',
            'head-shake': 'headShake 1s ease-in-out',
            'swing': {
                animation: 'swing',
                transformOrigin: 'top center',
            },
            'tada': 'tada',
            'wobble': 'wobble',
            'jello': 'jello',
            'heart-beat': 'heartBeat 1s ease-in-out',
            'hinge': 'hinge 2s',
            'jack-in': 'jackInTheBox',
            'light-speed-in-left': 'lightSpeedInLeft',
            'light-speed-in-right': 'lightSpeedInRight',
            'light-speed-out-left': 'lightSpeedOutLeft',
            'light-speed-out-right': 'lightSpeedOutRight',
            'flip': {
                animation: 'flip',
                backfaceVisibility: 'visible',
            },
            'flip-in-x': {
                animation: 'flipInX',
                backfaceVisibility: 'visible',
            },
            'flip-in-y': {
                animation: 'flipInY',
                backfaceVisibility: 'visible',
            },
            'flip-out-x': {
                animation: 'flipOutX',
                backfaceVisibility: 'visible',
            },
            'flip-out-y': {
                animation: 'flipOutY',
                backfaceVisibility: 'visible',
            },
            'rotate-in': 'rotateIn',
            'rotate-in-down-left': 'rotateInDownLeft',
            'rotate-in-down-right': 'rotateInDownRight',
            'rotate-in-up-left': 'rotateInUpLeft',
            'rotate-in-up-right': 'rotateInUpRight',
            'rotate-out': 'rotateOut',
            'rotate-out-down-left': 'rotateOutDownLeft',
            'rotate-out-down-right': 'rotateOutDownRight',
            'rotate-out-up-left': 'rotateOutUpLeft',
            'rotate-out-up-right': 'rotateOutUpRight',
            'roll-in': 'rollIn',
            'roll-out': 'rollOut',
            'zoom-in': 'zoomIn',
            'zoom-in-down': 'zoomInDown',
            'zoom-in-left': 'zoomInLeft',
            'zoom-in-right': 'zoomInRight',
            'zoom-in-up': 'zoomInUp',
            'bounce-in': 'bounceIn 750ms',
            'bounce-in-down': 'bounceInDown',
            'bounce-in-left': 'bounceInLeft',
            'bounce-in-right': 'bounceInRight',
            'bounce-in-up': 'bounceInUp',
            'bounce-out': 'bounceOut 750ms',
            'bounce-out-down': 'bounceOutDown',
            'bounce-out-left': 'bounceOutLeft',
            'bounce-out-right': 'bounceOutRight',
            'bounce-out-up': 'bounceOutUp',
            'zoom-out': 'zoomOut',
            'zoom-out-down': 'zoomOutDown',
            'zoom-out-left': 'zoomOutLeft',
            'zoom-out-right': 'zoomOutRight',
            'zoom-out-up': 'zoomOutUp',
            'slide-in-down': 'slideInDown',
            'slide-in-left': 'slideInLeft',
            'slide-in-right': 'slideInRight',
            'slide-in-up': 'slideInUp',
            'slide-out-down': 'slideOutDown',
            'slide-out-left': 'slideOutLeft',
            'slide-out-right': 'slideOutRight',
            'slide-out-up': 'slideOutUp',
            'fade-in': 'fadeIn',
            'fade-in-down': 'fadeInDown',
            'fade-in-down-big': 'fadeInDownBig',
            'fade-in-left': 'fadeInLeft',
            'fade-in-left-big': 'fadeInLeftBig',
            'fade-in-right': 'fadeInRight',
            'fade-in-right-big': 'fadeInRightBig',
            'fade-in-up': 'fadeInUp',
            'fade-in-up-big': 'fadeInUpBig',
            'fade-in-top-left': 'fadeInTopLeft',
            'fade-in-top-right': 'fadeInTopRight',
            'fade-in-bottom-left': 'fadeInBottomLeft',
            'fade-in-bottom-right': 'fadeInBottomRight',
            'fade-out': 'fadeOut',
            'fade-out-down': 'fadeOutDown',
            'fade-out-down-big': 'fadeOutDownBig',
            'fade-out-left': 'fadeOutLeft',
            'fade-out-left-big': 'fadeOutLeftBig',
            'fade-out-right': 'fadeOutRight',
            'fade-out-right-big': 'fadeOutRightBig',
            'fade-out-up': 'fadeOutUp',
            'fade-out-up-big': 'fadeOutUpBig',
            'back-in-up': 'backInUp',
            'back-in-down': 'backInDown',
            'back-in-left': 'backInLeft',
            'back-in-right': 'backInRight',
            'back-out-up': 'backOutUp',
            'back-out-down': 'backOutDown',
            'back-out-left': 'backOutLeft',
            'back-out-right': 'backOutRight',
        },
        animationDuration: {
            DEFAULT: '1000ms',
            75: '75ms',
            100: '100ms',
            150: '150ms',
            200: '200ms',
            300: '300ms',
            500: '500ms',
            700: '700ms',
            1000: '1000ms',
            1500: '1500ms',
            2000: '2000ms',
            2500: '2500ms',
            3000: '3000ms',
            // int >=0 -> int ms
        },
        animationDelay: {
            DEFAULT: '500ms',
            75: '75ms',
            100: '100ms',
            150: '150ms',
            200: '200ms',
            300: '300ms',
            500: '500ms',
            700: '700ms',
            1000: '1000ms',
            1500: '1500ms',
            2000: '2000ms',
            2500: '2500ms',
            3000: '3000ms',
            // int >=0 -> int ms
        },
        animationIterationCount: {
            DEFAULT: '1',
            loop: 'infinite',
            'repeat-1': '1',
            'repeat-2': '2',
            'repeat-3': '3',
            'repeat-4': '4',
            'repeat-5': '5',
            'repeat-6': '6',
            'repeat-7': '7',
            'repeat-8': '8',
            'repeat-9': '9',
            'repeat-10': '10',
            'repeat-11': '11',
            'repeat-12': '12',
        },
        animationTimingFunction: {
            DEFAULT: 'ease',
            linear: 'linear',
            in: 'ease-in',
            out: 'ease-out',
            'in-out': 'ease-in-out',
        },
        backdropBlur: function (theme) { return theme('blur'); },
        backdropBrightness: function (theme) { return theme('brightness'); },
        backdropContrast: function (theme) { return theme('contrast'); },
        backdropGrayscale: function (theme) { return theme('grayscale'); },
        backdropHueRotate: function (theme) { return theme('hueRotate'); },
        backdropInvert: function (theme) { return theme('invert'); },
        backdropOpacity: function (theme) { return theme('opacity'); },
        backdropSaturate: function (theme) { return theme('saturate'); },
        backdropSepia: function (theme) { return theme('sepia'); },
        backgroundColor: function (theme) { return theme('colors'); },
        backgroundImage: {
            none: 'none',
            'gradient-1': 'linear-gradient(135deg, #FDEB71 10%, #F8D800 100%)',
            'gradient-2': 'linear-gradient(135deg, #ABDCFF 10%, #0396FF 100%)',
            'gradient-3': 'linear-gradient(135deg, #FEB692 10%, #EA5455 100%)',
            'gradient-4': 'linear-gradient(135deg, #CE9FFC 10%, #7367F0 100%)',
            'gradient-5': 'linear-gradient(135deg, #90F7EC 10%, #32CCBC 100%)',
            'gradient-6': 'linear-gradient(135deg, #FFF6B7 10%, #F6416C 100%)',
            'gradient-7': 'linear-gradient(135deg, #81FBB8 10%, #28C76F 100%)',
            'gradient-8': 'linear-gradient(135deg, #E2B0FF 10%, #9F44D3 100%)',
            'gradient-9': 'linear-gradient(135deg, #F97794 10%, #623AA2 100%)',
            'gradient-10': 'linear-gradient(135deg, #FCCF31 10%, #F55555 100%)',
            'gradient-11': 'linear-gradient(135deg, #F761A1 10%, #8C1BAB 100%)',
            'gradient-12': 'linear-gradient(135deg, #43CBFF 10%, #9708CC 100%)',
            'gradient-13': 'linear-gradient(135deg, #5EFCE8 10%, #736EFE 100%)',
            'gradient-14': 'linear-gradient(135deg, #FAD7A1 10%, #E96D71 100%)',
            'gradient-15': 'linear-gradient(135deg, #FFD26F 10%, #3677FF 100%)',
            'gradient-16': 'linear-gradient(135deg, #A0FE65 10%, #FA016D 100%)',
            'gradient-17': 'linear-gradient(135deg, #FFDB01 10%, #0E197D 100%)',
            'gradient-18': 'linear-gradient(135deg, #FEC163 10%, #DE4313 100%)',
            'gradient-19': 'linear-gradient(135deg, #92FFC0 10%, #002661 100%)',
            'gradient-20': 'linear-gradient(135deg, #EEAD92 10%, #6018DC 100%)',
            'gradient-21': 'linear-gradient(135deg, #F6CEEC 10%, #D939CD 100%)',
            'gradient-22': 'linear-gradient(135deg, #52E5E7 10%, #130CB7 100%)',
            'gradient-23': 'linear-gradient(135deg, #F1CA74 10%, #A64DB6 100%)',
            'gradient-24': 'linear-gradient(135deg, #E8D07A 10%, #5312D6 100%)',
            'gradient-25': 'linear-gradient(135deg, #EECE13 10%, #B210FF 100%)',
            'gradient-26': 'linear-gradient(135deg, #79F1A4 10%, #0E5CAD 100%)',
            'gradient-27': 'linear-gradient(135deg, #FDD819 10%, #E80505 100%)',
            'gradient-28': 'linear-gradient(135deg, #FFF3B0 10%, #CA26FF 100%)',
            'gradient-29': 'linear-gradient(135deg, #FFF5C3 10%, #9452A5 100%)',
            'gradient-30': 'linear-gradient(135deg, #F05F57 10%, #360940 100%)',
            'gradient-31': 'linear-gradient(135deg, #2AFADF 10%, #4C83FF 100%)',
            'gradient-32': 'linear-gradient(135deg, #FFF886 10%, #F072B6 100%)',
            'gradient-33': 'linear-gradient(135deg, #97ABFF 10%, #123597 100%)',
            'gradient-34': 'linear-gradient(135deg, #F5CBFF 10%, #C346C2 100%)',
            'gradient-35': 'linear-gradient(135deg, #FFF720 10%, #3CD500 100%)',
            'gradient-36': 'linear-gradient(135deg, #FF6FD8 10%, #3813C2 100%)',
            'gradient-37': 'linear-gradient(135deg, #EE9AE5 10%, #5961F9 100%)',
            'gradient-38': 'linear-gradient(135deg, #FFD3A5 10%, #FD6585 100%)',
            'gradient-39': 'linear-gradient(135deg, #C2FFD8 10%, #465EFB 100%)',
            'gradient-40': 'linear-gradient(135deg, #FD6585 10%, #0D25B9 100%)',
            'gradient-41': 'linear-gradient(135deg, #FD6E6A 10%, #FFC600 100%)',
            'gradient-42': 'linear-gradient(135deg, #65FDF0 10%, #1D6FA3 100%)',
            'gradient-43': 'linear-gradient(135deg, #6B73FF 10%, #000DFF 100%)',
            'gradient-44': 'linear-gradient(135deg, #FF7AF5 10%, #513162 100%)',
            'gradient-45': 'linear-gradient(135deg, #F0FF00 10%, #58CFFB 100%)',
            'gradient-46': 'linear-gradient(135deg, #FFE985 10%, #FA742B 100%)',
            'gradient-47': 'linear-gradient(135deg, #FFA6B7 10%, #1E2AD2 100%)',
            'gradient-48': 'linear-gradient(135deg, #FFAA85 10%, #B3315F 100%)',
            'gradient-49': 'linear-gradient(135deg, #72EDF2 10%, #5151E5 100%)',
            'gradient-50': 'linear-gradient(135deg, #FF9D6C 10%, #BB4E75 100%)',
            'gradient-51': 'linear-gradient(135deg, #F6D242 10%, #FF52E5 100%)',
            'gradient-52': 'linear-gradient(135deg, #69FF97 10%, #00E4FF 100%)',
            'gradient-53': 'linear-gradient(135deg, #3B2667 10%, #BC78EC 100%)',
            'gradient-54': 'linear-gradient(135deg, #70F570 10%, #49C628 100%)',
            'gradient-55': 'linear-gradient(135deg, #3C8CE7 10%, #00EAFF 100%)',
            'gradient-56': 'linear-gradient(135deg, #FAB2FF 10%, #1904E5 100%)',
            'gradient-57': 'linear-gradient(135deg, #81FFEF 10%, #F067B4 100%)',
            'gradient-58': 'linear-gradient(135deg, #FFA8A8 10%, #FCFF00 100%)',
            'gradient-59': 'linear-gradient(135deg, #FFCF71 10%, #2376DD 100%)',
            'gradient-60': 'linear-gradient(135deg, #FF96F9 10%, #C32BAC 100%)',
            'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
            'gradient-to-tr': 'linear-gradient(to top right, var(--tw-gradient-stops))',
            'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
            'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
            'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
            'gradient-to-bl': 'linear-gradient(to bottom left, var(--tw-gradient-stops))',
            'gradient-to-l': 'linear-gradient(to left, var(--tw-gradient-stops))',
            'gradient-to-tl': 'linear-gradient(to top left, var(--tw-gradient-stops))',
        },
        backgroundOpacity: function (theme) { return theme('opacity'); },
        backgroundPosition: {
            bottom: 'bottom',
            center: 'center',
            left: 'left',
            'left-bottom': 'left bottom',
            'left-top': 'left top',
            right: 'right',
            'right-bottom': 'right bottom',
            'right-top': 'right top',
            top: 'top',
        },
        backgroundSize: {
            auto: 'auto',
            cover: 'cover',
            contain: 'contain',
        },
        blur: {
            DEFAULT: '8px',
            0: '0',
            sm: '4px',
            md: '12px',
            lg: '16px',
            xl: '24px',
            '2xl': '40px',
            '3xl': '64px',
        },
        borderColor: function (theme) {
            var _a;
            return (__assign({ DEFAULT: theme('colors.gray.200', 'currentColor') }, ((_a = theme('colors')) !== null && _a !== void 0 ? _a : {})));
        },
        borderOpacity: function (theme) { return theme('opacity'); },
        borderRadius: {
            DEFAULT: '0.25rem',
            none: '0px',
            sm: '0.125rem',
            md: '0.375rem',
            lg: '0.5rem',
            xl: '0.75rem',
            '2xl': '1rem',
            '3xl': '1.5rem',
            '1': '100%',
            full: '9999px',
        },
        borderWidth: {
            DEFAULT: '1px',
            0: '0px',
            2: '2px',
            4: '4px',
            8: '8px',
            // int >=0 -> int px
        },
        boxShadow: {
            DEFAULT: '0 1px 3px 0 rgb(0 0 0/0.1),0 1px 2px -1px rgb(0 0 0/0.1)',
            sm: '0 1px 2px 0 rgb(0 0 0/0.05)',
            md: '0 4px 6px -1px rgb(0 0 0/0.1),0 2px 4px -2px rgb(0 0 0/0.1)',
            lg: '0 10px 15px -3px rgb(0 0 0/0.1),0 4px 6px -4px rgb(0 0 0/0.1)',
            xl: '0 20px 25px -5px rgb(0 0 0/0.1),0 8px 10px -6px rgb(0 0 0/0.1)',
            '2xl': '0 25px 50px -12px rgb(0 0 0/0.25)',
            inner: 'inset 0 2px 4px 0 rgb(0 0 0/0.05)',
            none: '0 0 #0000',
        },
        boxShadowColor: function (theme) { return theme('colors'); },
        brightness: {
            0: '0',
            50: '.5',
            75: '.75',
            90: '.9',
            95: '.95',
            100: '1',
            105: '1.05',
            110: '1.1',
            125: '1.25',
            150: '1.5',
            200: '2',
        },
        caretColor: function (theme) {
            var _a;
            return (__assign({ auto: 'auto' }, ((_a = theme('colors')) !== null && _a !== void 0 ? _a : {})));
        },
        caretOpacity: function (theme) { return theme('opacity'); },
        columns: __assign(__assign({}, tShirtScale), { auto: 'auto', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10', 11: '11', 12: '12', '3xs': '16rem', '2xs': '18rem' }),
        container: {},
        content: {
            DEFAULT: '""',
            'open-quote': 'open-quote',
            'close-quote': 'close-quote',
            'open-square': '"["',
            'close-square': '"]"',
            'open-curly': '"{"',
            'close-curly': '"}"',
            'open-bracket': '"("',
            'close-bracket': '")"',
        },
        contrast: {
            0: '0',
            50: '.5',
            75: '.75',
            100: '1',
            125: '1.25',
            150: '1.5',
            200: '2',
        },
        cursor: {
            auto: 'auto',
            default: 'default',
            pointer: 'pointer',
            wait: 'wait',
            text: 'text',
            move: 'move',
            help: 'help',
            'not-allowed': 'not-allowed',
        },
        divideColor: function (theme) { return theme('borderColor'); },
        divideOpacity: function (theme) { return theme('borderOpacity'); },
        divideWidth: function (theme) { return theme('borderWidth'); },
        dropShadow: {
            DEFAULT: ['0 1px 2px rgba(0, 0, 0, 0.1)', '0 1px 1px rgba(0, 0, 0, 0.06)'],
            sm: '0 1px 1px rgba(0,0,0,0.05)',
            md: ['0 4px 3px rgba(0, 0, 0, 0.07)', '0 2px 2px rgba(0, 0, 0, 0.06)'],
            lg: ['0 10px 8px rgba(0, 0, 0, 0.04)', '0 4px 3px rgba(0, 0, 0, 0.1)'],
            xl: ['0 20px 13px rgba(0, 0, 0, 0.03)', '0 8px 5px rgba(0, 0, 0, 0.08)'],
            '2xl': '0 25px 25px rgba(0, 0, 0, 0.15)',
            none: '0 0 #0000',
        },
        fill: function (theme) {
            var _a;
            return (__assign(__assign({}, ((_a = theme('colors')) !== null && _a !== void 0 ? _a : {})), { none: 'none' }));
        },
        flex: {
            1: '1 1 0%',
            auto: '1 1 auto',
            initial: '0 1 auto',
            none: 'none',
        },
        flexGrow: {
            DEFAULT: '1',
            0: '0',
        },
        flexShrink: {
            DEFAULT: '1',
            0: '0',
        },
        fontFamily: {
            sans: [
                'ui-sans-serif',
                'system-ui',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                '"Noto Sans"',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
                '"Noto Color Emoji"',
            ],
            serif: [
                'ui-serif',
                'Georgia',
                'Cambria',
                '"Times New Roman"',
                'Times',
                'serif',
            ],
            mono: [
                'ui-monospace',
                'SFMono-Regular',
                'Menlo',
                'Monaco',
                'Consolas',
                '"Liberation Mono"',
                '"Courier New"',
                'monospace',
            ],
        },
        fontSize: {
            xs: ['0.75rem', { lineHeight: '1rem' }],
            sm: ['0.875rem', { lineHeight: '1.25rem' }],
            base: ['1rem', { lineHeight: '1.5rem' }],
            lg: ['1.125rem', { lineHeight: '1.75rem' }],
            xl: ['1.25rem', { lineHeight: '1.75rem' }],
            '2xl': ['1.5rem', { lineHeight: '2rem' }],
            '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
            '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
            '5xl': ['3rem', { lineHeight: '1' }],
            '6xl': ['3.75rem', { lineHeight: '1' }],
            '7xl': ['4.5rem', { lineHeight: '1' }],
            '8xl': ['6rem', { lineHeight: '1' }],
            '9xl': ['8rem', { lineHeight: '1' }],
            // nxl -> [n rem, lineHeight: 1]
        },
        fontWeight: {
            thin: '100',
            extralight: '200',
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            extrabold: '800',
            black: '900',
            // int[0, 900] -> int
        },
        gap: function (theme) { return theme('spacing'); },
        gradientColorStops: function (theme) { return theme('colors'); },
        grayscale: {
            DEFAULT: '100%',
            0: '0',
        },
        gridAutoColumns: {
            auto: 'auto',
            min: 'min-content',
            max: 'max-content',
            fr: 'minmax(0, 1fr)',
        },
        gridAutoRows: {
            auto: 'auto',
            min: 'min-content',
            max: 'max-content',
            fr: 'minmax(0, 1fr)',
        },
        gridColumn: {
            auto: 'auto',
            'span-1': 'span 1 / span 1',
            'span-2': 'span 2 / span 2',
            'span-3': 'span 3 / span 3',
            'span-4': 'span 4 / span 4',
            'span-5': 'span 5 / span 5',
            'span-6': 'span 6 / span 6',
            'span-7': 'span 7 / span 7',
            'span-8': 'span 8 / span 8',
            'span-9': 'span 9 / span 9',
            'span-10': 'span 10 / span 10',
            'span-11': 'span 11 / span 11',
            'span-12': 'span 12 / span 12',
            // span-int(>=1) -> span int / span int
            'span-full': '1 / -1',
        },
        gridColumnEnd: {
            auto: 'auto',
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6',
            7: '7',
            8: '8',
            9: '9',
            10: '10',
            11: '11',
            12: '12',
            13: '13',
            // int >=1 -> int
        },
        gridColumnStart: {
            auto: 'auto',
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6',
            7: '7',
            8: '8',
            9: '9',
            10: '10',
            11: '11',
            12: '12',
            13: '13',
            // int >=1 -> int
        },
        gridRow: {
            auto: 'auto',
            'span-1': 'span 1 / span 1',
            'span-2': 'span 2 / span 2',
            'span-3': 'span 3 / span 3',
            'span-4': 'span 4 / span 4',
            'span-5': 'span 5 / span 5',
            'span-6': 'span 6 / span 6',
            // span-int(>=1) -> span int / span int
            'span-full': '1 / -1',
        },
        gridRowStart: {
            auto: 'auto',
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6',
            7: '7',
            // int >=1 -> int
        },
        gridRowEnd: {
            auto: 'auto',
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6',
            7: '7',
            // int >=1 -> int
        },
        gridTemplateColumns: {
            none: 'none',
            1: 'repeat(1, minmax(0, 1fr))',
            2: 'repeat(2, minmax(0, 1fr))',
            3: 'repeat(3, minmax(0, 1fr))',
            4: 'repeat(4, minmax(0, 1fr))',
            5: 'repeat(5, minmax(0, 1fr))',
            6: 'repeat(6, minmax(0, 1fr))',
            7: 'repeat(7, minmax(0, 1fr))',
            8: 'repeat(8, minmax(0, 1fr))',
            9: 'repeat(9, minmax(0, 1fr))',
            10: 'repeat(10, minmax(0, 1fr))',
            11: 'repeat(11, minmax(0, 1fr))',
            12: 'repeat(12, minmax(0, 1fr))',
            // int >=1 -> repeat(int, minmax(0, 1fr))
        },
        gridTemplateRows: {
            none: 'none',
            1: 'repeat(1, minmax(0, 1fr))',
            2: 'repeat(2, minmax(0, 1fr))',
            3: 'repeat(3, minmax(0, 1fr))',
            4: 'repeat(4, minmax(0, 1fr))',
            5: 'repeat(5, minmax(0, 1fr))',
            6: 'repeat(6, minmax(0, 1fr))',
            // int >=1 -> repeat(int, minmax(0, 1fr))
        },
        height: function (theme, _a) {
            var _b, _c;
            var breakpoints = _a.breakpoints;
            return (__assign(__assign(__assign(__assign({}, ((_b = theme('spacing')) !== null && _b !== void 0 ? _b : {})), tShirtScale), { '1/2': '50%', '1/3': '33.333333%', '2/3': '66.666667%', '1/4': '25%', '2/4': '50%', '3/4': '75%', '1/5': '20%', '2/5': '40%', '3/5': '60%', '4/5': '80%', '1/6': '16.666667%', '2/6': '33.333333%', '3/6': '50%', '4/6': '66.666667%', '5/6': '83.333333%', 
                // fraction -> percent
                auto: 'auto', full: '100%', min: 'min-content', max: 'max-content', prose: '65ch', screen: '100vh' }), breakpoints((_c = theme('screens')) !== null && _c !== void 0 ? _c : {})));
        },
        hueRotate: {
            '-180': '-180deg',
            '-90': '-90deg',
            '-60': '-60deg',
            '-30': '-30deg',
            '-15': '-15deg',
            0: '0deg',
            15: '15deg',
            30: '30deg',
            60: '60deg',
            90: '90deg',
            180: '180deg',
        },
        inset: function (theme, _a) {
            var _b;
            var negative = _a.negative;
            return (__assign(__assign(__assign({ auto: 'auto' }, ((_b = theme('spacing')) !== null && _b !== void 0 ? _b : {})), negative(theme('spacing'))), { '1/2': '50%', '1/3': '33.333333%', '2/3': '66.666667%', '1/4': '25%', '2/4': '50%', '3/4': '75%', full: '100%', '-1/2': '-50%', '-1/3': '-33.333333%', '-2/3': '-66.666667%', '-1/4': '-25%', '-2/4': '-50%', '-3/4': '-75%', '-full': '-100%' }));
        },
        invert: {
            DEFAULT: '100%',
            0: '0',
        },
        keyframes: keyframes,
        letterSpacing: {
            tighter: '-0.05em',
            tight: '-0.025em',
            normal: '0em',
            wide: '0.025em',
            wider: '0.05em',
            widest: '0.1em',
        },
        lineHeight: {
            none: '1',
            tight: '1.25',
            snug: '1.375',
            normal: '1.5',
            relaxed: '1.625',
            loose: '2',
            3: '.75rem',
            4: '1rem',
            5: '1.25rem',
            6: '1.5rem',
            7: '1.75rem',
            8: '2rem',
            9: '2.25rem',
            10: '2.5rem',
            // int>=0 -> int/4 rem
        },
        listStyleType: {
            none: 'none',
            circle: 'circle',
            square: 'square',
            disc: 'disc',
            decimal: 'decimal',
            'zero-decimal': 'decimal-leading-zero',
            greek: 'lower-greek',
            roman: 'lower-roman',
            alpha: 'lower-alpha',
            'upper-roman': 'upper-roman',
            'upper-alpha': 'upper-alpha',
        },
        margin: function (theme, _a) {
            var _b;
            var negative = _a.negative;
            return (__assign(__assign({ auto: 'auto' }, ((_b = theme('spacing')) !== null && _b !== void 0 ? _b : {})), negative(theme('spacing'))));
        },
        maxHeight: function (theme, _a) {
            var _b, _c;
            var breakpoints = _a.breakpoints;
            return (__assign(__assign(__assign(__assign({}, breakpoints((_b = theme('screens')) !== null && _b !== void 0 ? _b : {})), ((_c = theme('spacing')) !== null && _c !== void 0 ? _c : {})), tShirtScale), { none: 'none', full: '100%', min: 'min-content', max: 'max-content', prose: '65ch', screen: '100vh' }));
        },
        maxWidth: function (theme, _a) {
            var _b, _c;
            var breakpoints = _a.breakpoints;
            return (__assign(__assign(__assign(__assign({}, breakpoints((_b = theme('screens')) !== null && _b !== void 0 ? _b : {})), ((_c = theme('spacing')) !== null && _c !== void 0 ? _c : {})), tShirtScale), { none: 'none', full: '100%', min: 'min-content', max: 'max-content', prose: '65ch', screen: '100vw' }));
        },
        minHeight: function (theme) { return theme('maxHeight'); },
        minWidth: function (theme) { return theme('maxWidth'); },
        objectPosition: {
            bottom: 'bottom',
            center: 'center',
            left: 'left',
            'left-bottom': 'left bottom',
            'left-top': 'left top',
            right: 'right',
            'right-bottom': 'right bottom',
            'right-top': 'right top',
            top: 'top',
        },
        opacity: {
            0: '0',
            5: '0.05',
            10: '0.1',
            20: '0.2',
            25: '0.25',
            30: '0.3',
            40: '0.4',
            50: '0.5',
            60: '0.6',
            70: '0.7',
            75: '0.75',
            80: '0.8',
            90: '0.9',
            95: '0.95',
            100: '1',
            // float -> float/100
        },
        order: {
            first: '-9999',
            last: '9999',
            none: '0',
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            6: '6',
            7: '7',
            8: '8',
            9: '9',
            10: '10',
            11: '11',
            12: '12',
            // int[1, 9999]
        },
        outlineColor: function (theme) { return theme('colors'); },
        outlineWidth: {
            0: '0px',
            1: '1px',
            2: '2px',
            4: '4px',
            8: '8px',
        },
        outlineOffset: {
            0: '0px',
            1: '1px',
            2: '2px',
            4: '4px',
            8: '8px',
        },
        padding: function (theme) { return theme('spacing'); },
        perspective: function (theme) {
            var _a;
            return (__assign(__assign(__assign({}, ((_a = theme('spacing')) !== null && _a !== void 0 ? _a : {})), tShirtScale), { none: 'none' }));
        },
        perspectiveOrigin: {
            center: 'center',
            top: 'top',
            'top-right': 'top right',
            right: 'right',
            'bottom-right': 'bottom right',
            bottom: 'bottom',
            'bottom-left': 'bottom left',
            left: 'left',
            'top-left': 'top left',
        },
        placeholderColor: function (theme) { return theme('colors'); },
        placeholderOpacity: function (theme) { return theme('opacity'); },
        ringColor: function (theme) {
            var _a;
            return (__assign({ DEFAULT: theme('colors.blue.500', '#3b82f6') }, ((_a = theme('colors')) !== null && _a !== void 0 ? _a : {})));
        },
        ringOffsetColor: function (theme) { return theme('colors'); },
        ringOffsetWidth: {
            0: '0px',
            1: '1px',
            2: '2px',
            4: '4px',
            8: '8px',
            // float -> float px
        },
        ringOpacity: function (theme) {
            var _a;
            return (__assign({ DEFAULT: '0.5' }, ((_a = theme('opacity')) !== null && _a !== void 0 ? _a : {})));
        },
        ringWidth: {
            DEFAULT: '3px',
            0: '0px',
            1: '1px',
            2: '2px',
            4: '4px',
            8: '8px',
            // float -> float px
        },
        rotate: {
            '-180': '-180deg',
            '-90': '-90deg',
            '-45': '-45deg',
            '-12': '-12deg',
            '-6': '-6deg',
            '-3': '-3deg',
            '-2': '-2deg',
            '-1': '-1deg',
            0: '0deg',
            1: '1deg',
            2: '2deg',
            3: '3deg',
            6: '6deg',
            12: '12deg',
            45: '45deg',
            90: '90deg',
            180: '180deg',
            // float[0, 360] -> float[0deg, 360deg]
            // ...negative
        },
        saturate: {
            DEFAULT: '0',
            0: '0',
            50: '.5',
            100: '1',
            150: '1.5',
            200: '2',
        },
        scale: {
            0: '0',
            50: '.5',
            75: '.75',
            90: '.9',
            95: '.95',
            100: '1',
            105: '1.05',
            110: '1.1',
            125: '1.25',
            150: '1.5',
            // int >=0 -> int/100
        },
        sepia: {
            DEFAULT: '100%',
            0: '0',
        },
        skew: {
            '-12': '-12deg',
            '-6': '-6deg',
            '-3': '-3deg',
            '-2': '-2deg',
            '-1': '-1deg',
            0: '0deg',
            1: '1deg',
            2: '2deg',
            3: '3deg',
            6: '6deg',
            12: '12deg',
            // float[0, 360] -> float[0deg, 360deg]
            // ...negative
        },
        space: function (theme, _a) {
            var negative = _a.negative;
            return (__assign(__assign({}, theme('spacing')), negative(theme('spacing'))));
        },
        stroke: function (theme) {
            var _a;
            return (__assign(__assign({}, ((_a = theme('colors')) !== null && _a !== void 0 ? _a : {})), { none: 'none' }));
        },
        strokeWidth: {
            0: '0',
            1: '1',
            2: '2',
        },
        strokeDashArray: {
            0: '0',
            1: '1',
            2: '2',
        },
        strokeDashOffset: {
            0: '0',
            1: '1',
            2: '2',
        },
        tabSize: {
            DEFAULT: '4',
            0: '0',
            2: '2',
            4: '4',
            8: '8',
            // int >=0 -> int px
        },
        textColor: function (theme) { return theme('colors'); },
        textOpacity: function (theme) { return theme('opacity'); },
        textShadow: {
            DEFAULT: '0px 0px 1px rgb(0 0 0 / 20%), 0px 0px 1px rgb(1 0 5 / 10%)',
            sm: '1px 1px 3px rgb(36 37 47 / 25%)',
            md: '0px 1px 2px rgb(30 29 39 / 19%), 1px 2px 4px rgb(54 64 147 / 18%)',
            lg: '3px 3px 6px rgb(0 0 0 / 26%), 0 0 5px rgb(15 3 86 / 22%)',
            xl: '1px 1px 3px rgb(0 0 0 / 29%), 2px 4px 7px rgb(73 64 125 / 35%)',
            none: 'none',
        },
        textDecorationColor: function (theme) { return theme('colors'); },
        textDecorationOpacity: function (theme) { return theme('opacity'); },
        textDecorationLength: {
            'auto': 'auto',
            0: '0px',
            2: '2px',
            4: '4px',
            8: '8px',
        },
        textDecorationOffset: {
            'auto': 'auto',
            0: '0px',
            1: '1px',
            2: '2px',
            4: '4px',
            8: '8px',
        },
        textDecorationThickness: {
            'auto': 'auto',
            'from-font': 'from-font',
            0: '0px',
            1: '1px',
            2: '2px',
            4: '4px',
            8: '8px',
        },
        textIndent: {
            DEFAULT: '1.5rem',
            xs: '0.5rem',
            sm: '1rem',
            md: '1.5rem',
            lg: '2rem',
            xl: '2.5rem',
            '2xl': '3rem',
            '3xl': '4rem',
        },
        textStrokeColor: function (theme) {
            var _a;
            return (__assign({ DEFAULT: theme('colors.gray.200', 'currentColor') }, ((_a = theme('colors')) !== null && _a !== void 0 ? _a : {})));
        },
        textStrokeWidth: {
            DEFAULT: 'medium',
            'none': '0',
            'sm': 'thin',
            'md': 'medium',
            'lg': 'thick',
        },
        transformOrigin: {
            center: 'center',
            top: 'top',
            'top-right': 'top right',
            right: 'right',
            'bottom-right': 'bottom right',
            bottom: 'bottom',
            'bottom-left': 'bottom left',
            left: 'left',
            'top-left': 'top left',
        },
        transitionDuration: {
            DEFAULT: '150ms',
            75: '75ms',
            100: '100ms',
            150: '150ms',
            200: '200ms',
            300: '300ms',
            500: '500ms',
            700: '700ms',
            1000: '1000ms',
            // int >=0 -> int ms
        },
        transitionDelay: {
            75: '75ms',
            100: '100ms',
            150: '150ms',
            200: '200ms',
            300: '300ms',
            500: '500ms',
            700: '700ms',
            1000: '1000ms',
            // int >=0 -> int ms
        },
        transitionProperty: {
            DEFAULT: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
            none: 'none',
            all: 'all',
            colors: 'background-color, border-color, color, fill, stroke',
            opacity: 'opacity',
            shadow: 'box-shadow',
            transform: 'transform',
        },
        transitionTimingFunction: {
            DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
            linear: 'linear',
            in: 'cubic-bezier(0.4, 0, 1, 1)',
            out: 'cubic-bezier(0, 0, 0.2, 1)',
            'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
        translate: function (theme, _a) {
            var _b;
            var negative = _a.negative;
            return (__assign(__assign(__assign({}, ((_b = theme('spacing')) !== null && _b !== void 0 ? _b : {})), negative(theme('spacing'))), { '1/2': '50%', '1/3': '33.333333%', '2/3': '66.666667%', '1/4': '25%', '2/4': '50%', '3/4': '75%', full: '100%', '-1/2': '-50%', '-1/3': '-33.333333%', '-2/3': '-66.666667%', '-1/4': '-25%', '-2/4': '-50%', '-3/4': '-75%', '-full': '-100%' }));
        },
        width: function (theme, _a) {
            var _b, _c;
            var breakpoints = _a.breakpoints;
            return (__assign(__assign(__assign(__assign({}, ((_b = theme('spacing')) !== null && _b !== void 0 ? _b : {})), tShirtScale), { 
                // fraction -> percent
                '1/2': '50%', '1/3': '33.333333%', '2/3': '66.666667%', '1/4': '25%', '2/4': '50%', '3/4': '75%', '1/5': '20%', '2/5': '40%', '3/5': '60%', '4/5': '80%', '1/6': '16.666667%', '2/6': '33.333333%', '3/6': '50%', '4/6': '66.666667%', '5/6': '83.333333%', '1/12': '8.333333%', '2/12': '16.666667%', '3/12': '25%', '4/12': '33.333333%', '5/12': '41.666667%', '6/12': '50%', '7/12': '58.333333%', '8/12': '66.666667%', '9/12': '75%', '10/12': '83.333333%', '11/12': '91.666667%', auto: 'auto', full: '100%', min: 'min-content', max: 'max-content', prose: '65ch', screen: '100vw' }), breakpoints((_c = theme('screens')) !== null && _c !== void 0 ? _c : {})));
        },
        zIndex: {
            auto: 'auto',
            0: '0',
            10: '10',
            20: '20',
            30: '30',
            40: '40',
            50: '50',
            // int[0, 99999] ->  int[0, 99999]
            // ...negative
        },
    },
    variantOrder: variantOrder,
    plugins: [
        createPlugin(function (_a) {
            var addUtilities = _a.addUtilities;
            addUtilities({
                '.before\\:contents': {
                    '&::before': {
                        content: '""',
                        display: 'contents',
                    },
                },
                '.after\\:contents': {
                    '&::after': {
                        content: '""',
                        display: 'contents',
                    },
                },
            });
        }),
    ],
    handlers: {
        static: true,
        time: true,
        color: true,
        opacity: true,
        number: true,
        string: true,
        bracket: true,
        hex: true,
        nxl: true,
        fraction: true,
        size: true,
        variable: true,
        negative: true,
    },
};

var twExclude = [
    /-hex-/,
    /-\$/,
    /(rem|em|px|rpx|vh|vw|ch|ex)$/,
    /-\d*[13579]$/,
    /-([0-9]{1,}[.][0-9]*)$/,
    /^!/, // disable important utility
];

exports.baseConfig = baseConfig;
exports.colors = colors;
exports.twExclude = twExclude;
