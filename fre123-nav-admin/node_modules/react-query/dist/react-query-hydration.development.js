(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react-query')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react-query'], factory) :
  (global = global || self, factory(global.ReactQueryHydration = {}, global.ReactQuery));
}(this, (function (exports, reactQuery) { 'use strict';

  Object.defineProperty(exports, 'Hydrate', {
    enumerable: true,
    get: function () {
      return reactQuery.Hydrate;
    }
  });
  Object.defineProperty(exports, 'dehydrate', {
    enumerable: true,
    get: function () {
      return reactQuery.dehydrate;
    }
  });
  Object.defineProperty(exports, 'hydrate', {
    enumerable: true,
    get: function () {
      return reactQuery.hydrate;
    }
  });
  Object.defineProperty(exports, 'useHydrate', {
    enumerable: true,
    get: function () {
      return reactQuery.useHydrate;
    }
  });

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=react-query-hydration.development.js.map
