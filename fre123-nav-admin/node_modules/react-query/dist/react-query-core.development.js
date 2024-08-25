(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.ReactQueryCore = {}));
}(this, (function (exports) { 'use strict';

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  var Subscribable = /*#__PURE__*/function () {
    function Subscribable() {
      this.listeners = [];
    }

    var _proto = Subscribable.prototype;

    _proto.subscribe = function subscribe(listener) {
      var _this = this;

      var callback = listener || function () {
        return undefined;
      };

      this.listeners.push(callback);
      this.onSubscribe();
      return function () {
        _this.listeners = _this.listeners.filter(function (x) {
          return x !== callback;
        });

        _this.onUnsubscribe();
      };
    };

    _proto.hasListeners = function hasListeners() {
      return this.listeners.length > 0;
    };

    _proto.onSubscribe = function onSubscribe() {// Do nothing
    };

    _proto.onUnsubscribe = function onUnsubscribe() {// Do nothing
    };

    return Subscribable;
  }();

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  // TYPES
  // UTILS
  var isServer = typeof window === 'undefined';
  function noop() {
    return undefined;
  }
  function functionalUpdate(updater, input) {
    return typeof updater === 'function' ? updater(input) : updater;
  }
  function isValidTimeout(value) {
    return typeof value === 'number' && value >= 0 && value !== Infinity;
  }
  function ensureQueryKeyArray(value) {
    return Array.isArray(value) ? value : [value];
  }
  function difference(array1, array2) {
    return array1.filter(function (x) {
      return array2.indexOf(x) === -1;
    });
  }
  function replaceAt(array, index, value) {
    var copy = array.slice(0);
    copy[index] = value;
    return copy;
  }
  function timeUntilStale(updatedAt, staleTime) {
    return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
  }
  function parseQueryArgs(arg1, arg2, arg3) {
    if (!isQueryKey(arg1)) {
      return arg1;
    }

    if (typeof arg2 === 'function') {
      return _extends({}, arg3, {
        queryKey: arg1,
        queryFn: arg2
      });
    }

    return _extends({}, arg2, {
      queryKey: arg1
    });
  }
  function parseFilterArgs(arg1, arg2, arg3) {
    return isQueryKey(arg1) ? [_extends({}, arg2, {
      queryKey: arg1
    }), arg3] : [arg1 || {}, arg2];
  }
  function mapQueryStatusFilter(active, inactive) {
    if (active === true && inactive === true || active == null && inactive == null) {
      return 'all';
    } else if (active === false && inactive === false) {
      return 'none';
    } else {
      // At this point, active|inactive can only be true|false or false|true
      // so, when only one value is provided, the missing one has to be the negated value
      var isActive = active != null ? active : !inactive;
      return isActive ? 'active' : 'inactive';
    }
  }
  function matchQuery(filters, query) {
    var active = filters.active,
        exact = filters.exact,
        fetching = filters.fetching,
        inactive = filters.inactive,
        predicate = filters.predicate,
        queryKey = filters.queryKey,
        stale = filters.stale;

    if (isQueryKey(queryKey)) {
      if (exact) {
        if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
          return false;
        }
      } else if (!partialMatchKey(query.queryKey, queryKey)) {
        return false;
      }
    }

    var queryStatusFilter = mapQueryStatusFilter(active, inactive);

    if (queryStatusFilter === 'none') {
      return false;
    } else if (queryStatusFilter !== 'all') {
      var isActive = query.isActive();

      if (queryStatusFilter === 'active' && !isActive) {
        return false;
      }

      if (queryStatusFilter === 'inactive' && isActive) {
        return false;
      }
    }

    if (typeof stale === 'boolean' && query.isStale() !== stale) {
      return false;
    }

    if (typeof fetching === 'boolean' && query.isFetching() !== fetching) {
      return false;
    }

    if (predicate && !predicate(query)) {
      return false;
    }

    return true;
  }
  function matchMutation(filters, mutation) {
    var exact = filters.exact,
        fetching = filters.fetching,
        predicate = filters.predicate,
        mutationKey = filters.mutationKey;

    if (isQueryKey(mutationKey)) {
      if (!mutation.options.mutationKey) {
        return false;
      }

      if (exact) {
        if (hashQueryKey(mutation.options.mutationKey) !== hashQueryKey(mutationKey)) {
          return false;
        }
      } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
        return false;
      }
    }

    if (typeof fetching === 'boolean' && mutation.state.status === 'loading' !== fetching) {
      return false;
    }

    if (predicate && !predicate(mutation)) {
      return false;
    }

    return true;
  }
  function hashQueryKeyByOptions(queryKey, options) {
    var hashFn = (options == null ? void 0 : options.queryKeyHashFn) || hashQueryKey;
    return hashFn(queryKey);
  }
  /**
   * Default query keys hash function.
   */

  function hashQueryKey(queryKey) {
    var asArray = ensureQueryKeyArray(queryKey);
    return stableValueHash(asArray);
  }
  /**
   * Hashes the value into a stable hash.
   */

  function stableValueHash(value) {
    return JSON.stringify(value, function (_, val) {
      return isPlainObject(val) ? Object.keys(val).sort().reduce(function (result, key) {
        result[key] = val[key];
        return result;
      }, {}) : val;
    });
  }
  /**
   * Checks if key `b` partially matches with key `a`.
   */

  function partialMatchKey(a, b) {
    return partialDeepEqual(ensureQueryKeyArray(a), ensureQueryKeyArray(b));
  }
  /**
   * Checks if `b` partially matches with `a`.
   */

  function partialDeepEqual(a, b) {
    if (a === b) {
      return true;
    }

    if (typeof a !== typeof b) {
      return false;
    }

    if (a && b && typeof a === 'object' && typeof b === 'object') {
      return !Object.keys(b).some(function (key) {
        return !partialDeepEqual(a[key], b[key]);
      });
    }

    return false;
  }
  /**
   * This function returns `a` if `b` is deeply equal.
   * If not, it will replace any deeply equal children of `b` with those of `a`.
   * This can be used for structural sharing between JSON values for example.
   */

  function replaceEqualDeep(a, b) {
    if (a === b) {
      return a;
    }

    var array = Array.isArray(a) && Array.isArray(b);

    if (array || isPlainObject(a) && isPlainObject(b)) {
      var aSize = array ? a.length : Object.keys(a).length;
      var bItems = array ? b : Object.keys(b);
      var bSize = bItems.length;
      var copy = array ? [] : {};
      var equalItems = 0;

      for (var i = 0; i < bSize; i++) {
        var key = array ? i : bItems[i];
        copy[key] = replaceEqualDeep(a[key], b[key]);

        if (copy[key] === a[key]) {
          equalItems++;
        }
      }

      return aSize === bSize && equalItems === aSize ? a : copy;
    }

    return b;
  }
  /**
   * Shallow compare objects. Only works with objects that always have the same properties.
   */

  function shallowEqualObjects(a, b) {
    if (a && !b || b && !a) {
      return false;
    }

    for (var key in a) {
      if (a[key] !== b[key]) {
        return false;
      }
    }

    return true;
  } // Copied from: https://github.com/jonschlinkert/is-plain-object

  function isPlainObject(o) {
    if (!hasObjectPrototype(o)) {
      return false;
    } // If has modified constructor


    var ctor = o.constructor;

    if (typeof ctor === 'undefined') {
      return true;
    } // If has modified prototype


    var prot = ctor.prototype;

    if (!hasObjectPrototype(prot)) {
      return false;
    } // If constructor does not have an Object-specific method


    if (!prot.hasOwnProperty('isPrototypeOf')) {
      return false;
    } // Most likely a plain Object


    return true;
  }

  function hasObjectPrototype(o) {
    return Object.prototype.toString.call(o) === '[object Object]';
  }

  function isQueryKey(value) {
    return typeof value === 'string' || Array.isArray(value);
  }
  function isError(value) {
    return value instanceof Error;
  }
  function sleep(timeout) {
    return new Promise(function (resolve) {
      setTimeout(resolve, timeout);
    });
  }
  /**
   * Schedules a microtask.
   * This can be useful to schedule state updates after rendering.
   */

  function scheduleMicrotask(callback) {
    Promise.resolve().then(callback).catch(function (error) {
      return setTimeout(function () {
        throw error;
      });
    });
  }
  function getAbortController() {
    if (typeof AbortController === 'function') {
      return new AbortController();
    }
  }

  var FocusManager = /*#__PURE__*/function (_Subscribable) {
    _inheritsLoose(FocusManager, _Subscribable);

    function FocusManager() {
      var _this;

      _this = _Subscribable.call(this) || this;

      _this.setup = function (onFocus) {
        var _window;

        if (!isServer && ((_window = window) == null ? void 0 : _window.addEventListener)) {
          var listener = function listener() {
            return onFocus();
          }; // Listen to visibillitychange and focus


          window.addEventListener('visibilitychange', listener, false);
          window.addEventListener('focus', listener, false);
          return function () {
            // Be sure to unsubscribe if a new handler is set
            window.removeEventListener('visibilitychange', listener);
            window.removeEventListener('focus', listener);
          };
        }
      };

      return _this;
    }

    var _proto = FocusManager.prototype;

    _proto.onSubscribe = function onSubscribe() {
      if (!this.cleanup) {
        this.setEventListener(this.setup);
      }
    };

    _proto.onUnsubscribe = function onUnsubscribe() {
      if (!this.hasListeners()) {
        var _this$cleanup;

        (_this$cleanup = this.cleanup) == null ? void 0 : _this$cleanup.call(this);
        this.cleanup = undefined;
      }
    };

    _proto.setEventListener = function setEventListener(setup) {
      var _this$cleanup2,
          _this2 = this;

      this.setup = setup;
      (_this$cleanup2 = this.cleanup) == null ? void 0 : _this$cleanup2.call(this);
      this.cleanup = setup(function (focused) {
        if (typeof focused === 'boolean') {
          _this2.setFocused(focused);
        } else {
          _this2.onFocus();
        }
      });
    };

    _proto.setFocused = function setFocused(focused) {
      this.focused = focused;

      if (focused) {
        this.onFocus();
      }
    };

    _proto.onFocus = function onFocus() {
      this.listeners.forEach(function (listener) {
        listener();
      });
    };

    _proto.isFocused = function isFocused() {
      if (typeof this.focused === 'boolean') {
        return this.focused;
      } // document global can be unavailable in react native


      if (typeof document === 'undefined') {
        return true;
      }

      return [undefined, 'visible', 'prerender'].includes(document.visibilityState);
    };

    return FocusManager;
  }(Subscribable);
  var focusManager = new FocusManager();

  var OnlineManager = /*#__PURE__*/function (_Subscribable) {
    _inheritsLoose(OnlineManager, _Subscribable);

    function OnlineManager() {
      var _this;

      _this = _Subscribable.call(this) || this;

      _this.setup = function (onOnline) {
        var _window;

        if (!isServer && ((_window = window) == null ? void 0 : _window.addEventListener)) {
          var listener = function listener() {
            return onOnline();
          }; // Listen to online


          window.addEventListener('online', listener, false);
          window.addEventListener('offline', listener, false);
          return function () {
            // Be sure to unsubscribe if a new handler is set
            window.removeEventListener('online', listener);
            window.removeEventListener('offline', listener);
          };
        }
      };

      return _this;
    }

    var _proto = OnlineManager.prototype;

    _proto.onSubscribe = function onSubscribe() {
      if (!this.cleanup) {
        this.setEventListener(this.setup);
      }
    };

    _proto.onUnsubscribe = function onUnsubscribe() {
      if (!this.hasListeners()) {
        var _this$cleanup;

        (_this$cleanup = this.cleanup) == null ? void 0 : _this$cleanup.call(this);
        this.cleanup = undefined;
      }
    };

    _proto.setEventListener = function setEventListener(setup) {
      var _this$cleanup2,
          _this2 = this;

      this.setup = setup;
      (_this$cleanup2 = this.cleanup) == null ? void 0 : _this$cleanup2.call(this);
      this.cleanup = setup(function (online) {
        if (typeof online === 'boolean') {
          _this2.setOnline(online);
        } else {
          _this2.onOnline();
        }
      });
    };

    _proto.setOnline = function setOnline(online) {
      this.online = online;

      if (online) {
        this.onOnline();
      }
    };

    _proto.onOnline = function onOnline() {
      this.listeners.forEach(function (listener) {
        listener();
      });
    };

    _proto.isOnline = function isOnline() {
      if (typeof this.online === 'boolean') {
        return this.online;
      }

      if (typeof navigator === 'undefined' || typeof navigator.onLine === 'undefined') {
        return true;
      }

      return navigator.onLine;
    };

    return OnlineManager;
  }(Subscribable);
  var onlineManager = new OnlineManager();

  function defaultRetryDelay(failureCount) {
    return Math.min(1000 * Math.pow(2, failureCount), 30000);
  }

  function isCancelable(value) {
    return typeof (value == null ? void 0 : value.cancel) === 'function';
  }
  var CancelledError = function CancelledError(options) {
    this.revert = options == null ? void 0 : options.revert;
    this.silent = options == null ? void 0 : options.silent;
  };
  function isCancelledError(value) {
    return value instanceof CancelledError;
  } // CLASS

  var Retryer = function Retryer(config) {
    var _this = this;

    var cancelRetry = false;
    var cancelFn;
    var continueFn;
    var promiseResolve;
    var promiseReject;
    this.abort = config.abort;

    this.cancel = function (cancelOptions) {
      return cancelFn == null ? void 0 : cancelFn(cancelOptions);
    };

    this.cancelRetry = function () {
      cancelRetry = true;
    };

    this.continueRetry = function () {
      cancelRetry = false;
    };

    this.continue = function () {
      return continueFn == null ? void 0 : continueFn();
    };

    this.failureCount = 0;
    this.isPaused = false;
    this.isResolved = false;
    this.isTransportCancelable = false;
    this.promise = new Promise(function (outerResolve, outerReject) {
      promiseResolve = outerResolve;
      promiseReject = outerReject;
    });

    var resolve = function resolve(value) {
      if (!_this.isResolved) {
        _this.isResolved = true;
        config.onSuccess == null ? void 0 : config.onSuccess(value);
        continueFn == null ? void 0 : continueFn();
        promiseResolve(value);
      }
    };

    var reject = function reject(value) {
      if (!_this.isResolved) {
        _this.isResolved = true;
        config.onError == null ? void 0 : config.onError(value);
        continueFn == null ? void 0 : continueFn();
        promiseReject(value);
      }
    };

    var pause = function pause() {
      return new Promise(function (continueResolve) {
        continueFn = continueResolve;
        _this.isPaused = true;
        config.onPause == null ? void 0 : config.onPause();
      }).then(function () {
        continueFn = undefined;
        _this.isPaused = false;
        config.onContinue == null ? void 0 : config.onContinue();
      });
    }; // Create loop function


    var run = function run() {
      // Do nothing if already resolved
      if (_this.isResolved) {
        return;
      }

      var promiseOrValue; // Execute query

      try {
        promiseOrValue = config.fn();
      } catch (error) {
        promiseOrValue = Promise.reject(error);
      } // Create callback to cancel this fetch


      cancelFn = function cancelFn(cancelOptions) {
        if (!_this.isResolved) {
          reject(new CancelledError(cancelOptions));
          _this.abort == null ? void 0 : _this.abort(); // Cancel transport if supported

          if (isCancelable(promiseOrValue)) {
            try {
              promiseOrValue.cancel();
            } catch (_unused) {}
          }
        }
      }; // Check if the transport layer support cancellation


      _this.isTransportCancelable = isCancelable(promiseOrValue);
      Promise.resolve(promiseOrValue).then(resolve).catch(function (error) {
        var _config$retry, _config$retryDelay;

        // Stop if the fetch is already resolved
        if (_this.isResolved) {
          return;
        } // Do we need to retry the request?


        var retry = (_config$retry = config.retry) != null ? _config$retry : 3;
        var retryDelay = (_config$retryDelay = config.retryDelay) != null ? _config$retryDelay : defaultRetryDelay;
        var delay = typeof retryDelay === 'function' ? retryDelay(_this.failureCount, error) : retryDelay;
        var shouldRetry = retry === true || typeof retry === 'number' && _this.failureCount < retry || typeof retry === 'function' && retry(_this.failureCount, error);

        if (cancelRetry || !shouldRetry) {
          // We are done if the query does not need to be retried
          reject(error);
          return;
        }

        _this.failureCount++; // Notify on fail

        config.onFail == null ? void 0 : config.onFail(_this.failureCount, error); // Delay

        sleep(delay) // Pause if the document is not visible or when the device is offline
        .then(function () {
          if (!focusManager.isFocused() || !onlineManager.isOnline()) {
            return pause();
          }
        }).then(function () {
          if (cancelRetry) {
            reject(error);
          } else {
            run();
          }
        });
      });
    }; // Start loop


    run();
  };

  // CLASS
  var NotifyManager = /*#__PURE__*/function () {
    function NotifyManager() {
      this.queue = [];
      this.transactions = 0;

      this.notifyFn = function (callback) {
        callback();
      };

      this.batchNotifyFn = function (callback) {
        callback();
      };
    }

    var _proto = NotifyManager.prototype;

    _proto.batch = function batch(callback) {
      var result;
      this.transactions++;

      try {
        result = callback();
      } finally {
        this.transactions--;

        if (!this.transactions) {
          this.flush();
        }
      }

      return result;
    };

    _proto.schedule = function schedule(callback) {
      var _this = this;

      if (this.transactions) {
        this.queue.push(callback);
      } else {
        scheduleMicrotask(function () {
          _this.notifyFn(callback);
        });
      }
    }
    /**
     * All calls to the wrapped function will be batched.
     */
    ;

    _proto.batchCalls = function batchCalls(callback) {
      var _this2 = this;

      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this2.schedule(function () {
          callback.apply(void 0, args);
        });
      };
    };

    _proto.flush = function flush() {
      var _this3 = this;

      var queue = this.queue;
      this.queue = [];

      if (queue.length) {
        scheduleMicrotask(function () {
          _this3.batchNotifyFn(function () {
            queue.forEach(function (callback) {
              _this3.notifyFn(callback);
            });
          });
        });
      }
    }
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    ;

    _proto.setNotifyFunction = function setNotifyFunction(fn) {
      this.notifyFn = fn;
    }
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    ;

    _proto.setBatchNotifyFunction = function setBatchNotifyFunction(fn) {
      this.batchNotifyFn = fn;
    };

    return NotifyManager;
  }(); // SINGLETON

  var notifyManager = new NotifyManager();

  // TYPES
  // FUNCTIONS
  var logger = console;
  function getLogger() {
    return logger;
  }
  function setLogger(newLogger) {
    logger = newLogger;
  }

  // CLASS
  var Query = /*#__PURE__*/function () {
    function Query(config) {
      this.abortSignalConsumed = false;
      this.hadObservers = false;
      this.defaultOptions = config.defaultOptions;
      this.setOptions(config.options);
      this.observers = [];
      this.cache = config.cache;
      this.queryKey = config.queryKey;
      this.queryHash = config.queryHash;
      this.initialState = config.state || this.getDefaultState(this.options);
      this.state = this.initialState;
      this.meta = config.meta;
      this.scheduleGc();
    }

    var _proto = Query.prototype;

    _proto.setOptions = function setOptions(options) {
      var _this$options$cacheTi;

      this.options = _extends({}, this.defaultOptions, options);
      this.meta = options == null ? void 0 : options.meta; // Default to 5 minutes if not cache time is set

      this.cacheTime = Math.max(this.cacheTime || 0, (_this$options$cacheTi = this.options.cacheTime) != null ? _this$options$cacheTi : 5 * 60 * 1000);
    };

    _proto.setDefaultOptions = function setDefaultOptions(options) {
      this.defaultOptions = options;
    };

    _proto.scheduleGc = function scheduleGc() {
      var _this = this;

      this.clearGcTimeout();

      if (isValidTimeout(this.cacheTime)) {
        this.gcTimeout = setTimeout(function () {
          _this.optionalRemove();
        }, this.cacheTime);
      }
    };

    _proto.clearGcTimeout = function clearGcTimeout() {
      if (this.gcTimeout) {
        clearTimeout(this.gcTimeout);
        this.gcTimeout = undefined;
      }
    };

    _proto.optionalRemove = function optionalRemove() {
      if (!this.observers.length) {
        if (this.state.isFetching) {
          if (this.hadObservers) {
            this.scheduleGc();
          }
        } else {
          this.cache.remove(this);
        }
      }
    };

    _proto.setData = function setData(updater, options) {
      var _this$options$isDataE, _this$options;

      var prevData = this.state.data; // Get the new data

      var data = functionalUpdate(updater, prevData); // Use prev data if an isDataEqual function is defined and returns `true`

      if ((_this$options$isDataE = (_this$options = this.options).isDataEqual) == null ? void 0 : _this$options$isDataE.call(_this$options, prevData, data)) {
        data = prevData;
      } else if (this.options.structuralSharing !== false) {
        // Structurally share data between prev and new data if needed
        data = replaceEqualDeep(prevData, data);
      } // Set data and mark it as cached


      this.dispatch({
        data: data,
        type: 'success',
        dataUpdatedAt: options == null ? void 0 : options.updatedAt
      });
      return data;
    };

    _proto.setState = function setState(state, setStateOptions) {
      this.dispatch({
        type: 'setState',
        state: state,
        setStateOptions: setStateOptions
      });
    };

    _proto.cancel = function cancel(options) {
      var _this$retryer;

      var promise = this.promise;
      (_this$retryer = this.retryer) == null ? void 0 : _this$retryer.cancel(options);
      return promise ? promise.then(noop).catch(noop) : Promise.resolve();
    };

    _proto.destroy = function destroy() {
      this.clearGcTimeout();
      this.cancel({
        silent: true
      });
    };

    _proto.reset = function reset() {
      this.destroy();
      this.setState(this.initialState);
    };

    _proto.isActive = function isActive() {
      return this.observers.some(function (observer) {
        return observer.options.enabled !== false;
      });
    };

    _proto.isFetching = function isFetching() {
      return this.state.isFetching;
    };

    _proto.isStale = function isStale() {
      return this.state.isInvalidated || !this.state.dataUpdatedAt || this.observers.some(function (observer) {
        return observer.getCurrentResult().isStale;
      });
    };

    _proto.isStaleByTime = function isStaleByTime(staleTime) {
      if (staleTime === void 0) {
        staleTime = 0;
      }

      return this.state.isInvalidated || !this.state.dataUpdatedAt || !timeUntilStale(this.state.dataUpdatedAt, staleTime);
    };

    _proto.onFocus = function onFocus() {
      var _this$retryer2;

      var observer = this.observers.find(function (x) {
        return x.shouldFetchOnWindowFocus();
      });

      if (observer) {
        observer.refetch();
      } // Continue fetch if currently paused


      (_this$retryer2 = this.retryer) == null ? void 0 : _this$retryer2.continue();
    };

    _proto.onOnline = function onOnline() {
      var _this$retryer3;

      var observer = this.observers.find(function (x) {
        return x.shouldFetchOnReconnect();
      });

      if (observer) {
        observer.refetch();
      } // Continue fetch if currently paused


      (_this$retryer3 = this.retryer) == null ? void 0 : _this$retryer3.continue();
    };

    _proto.addObserver = function addObserver(observer) {
      if (this.observers.indexOf(observer) === -1) {
        this.observers.push(observer);
        this.hadObservers = true; // Stop the query from being garbage collected

        this.clearGcTimeout();
        this.cache.notify({
          type: 'observerAdded',
          query: this,
          observer: observer
        });
      }
    };

    _proto.removeObserver = function removeObserver(observer) {
      if (this.observers.indexOf(observer) !== -1) {
        this.observers = this.observers.filter(function (x) {
          return x !== observer;
        });

        if (!this.observers.length) {
          // If the transport layer does not support cancellation
          // we'll let the query continue so the result can be cached
          if (this.retryer) {
            if (this.retryer.isTransportCancelable || this.abortSignalConsumed) {
              this.retryer.cancel({
                revert: true
              });
            } else {
              this.retryer.cancelRetry();
            }
          }

          if (this.cacheTime) {
            this.scheduleGc();
          } else {
            this.cache.remove(this);
          }
        }

        this.cache.notify({
          type: 'observerRemoved',
          query: this,
          observer: observer
        });
      }
    };

    _proto.getObserversCount = function getObserversCount() {
      return this.observers.length;
    };

    _proto.invalidate = function invalidate() {
      if (!this.state.isInvalidated) {
        this.dispatch({
          type: 'invalidate'
        });
      }
    };

    _proto.fetch = function fetch(options, fetchOptions) {
      var _this2 = this,
          _this$options$behavio,
          _context$fetchOptions,
          _abortController$abor;

      if (this.state.isFetching) {
        if (this.state.dataUpdatedAt && (fetchOptions == null ? void 0 : fetchOptions.cancelRefetch)) {
          // Silently cancel current fetch if the user wants to cancel refetches
          this.cancel({
            silent: true
          });
        } else if (this.promise) {
          var _this$retryer4;

          // make sure that retries that were potentially cancelled due to unmounts can continue
          (_this$retryer4 = this.retryer) == null ? void 0 : _this$retryer4.continueRetry(); // Return current promise if we are already fetching

          return this.promise;
        }
      } // Update config if passed, otherwise the config from the last execution is used


      if (options) {
        this.setOptions(options);
      } // Use the options from the first observer with a query function if no function is found.
      // This can happen when the query is hydrated or created with setQueryData.


      if (!this.options.queryFn) {
        var observer = this.observers.find(function (x) {
          return x.options.queryFn;
        });

        if (observer) {
          this.setOptions(observer.options);
        }
      }

      var queryKey = ensureQueryKeyArray(this.queryKey);
      var abortController = getAbortController(); // Create query function context

      var queryFnContext = {
        queryKey: queryKey,
        pageParam: undefined,
        meta: this.meta
      };
      Object.defineProperty(queryFnContext, 'signal', {
        enumerable: true,
        get: function get() {
          if (abortController) {
            _this2.abortSignalConsumed = true;
            return abortController.signal;
          }

          return undefined;
        }
      }); // Create fetch function

      var fetchFn = function fetchFn() {
        if (!_this2.options.queryFn) {
          return Promise.reject('Missing queryFn');
        }

        _this2.abortSignalConsumed = false;
        return _this2.options.queryFn(queryFnContext);
      }; // Trigger behavior hook


      var context = {
        fetchOptions: fetchOptions,
        options: this.options,
        queryKey: queryKey,
        state: this.state,
        fetchFn: fetchFn,
        meta: this.meta
      };

      if ((_this$options$behavio = this.options.behavior) == null ? void 0 : _this$options$behavio.onFetch) {
        var _this$options$behavio2;

        (_this$options$behavio2 = this.options.behavior) == null ? void 0 : _this$options$behavio2.onFetch(context);
      } // Store state in case the current fetch needs to be reverted


      this.revertState = this.state; // Set to fetching state if not already in it

      if (!this.state.isFetching || this.state.fetchMeta !== ((_context$fetchOptions = context.fetchOptions) == null ? void 0 : _context$fetchOptions.meta)) {
        var _context$fetchOptions2;

        this.dispatch({
          type: 'fetch',
          meta: (_context$fetchOptions2 = context.fetchOptions) == null ? void 0 : _context$fetchOptions2.meta
        });
      } // Try to fetch the data


      this.retryer = new Retryer({
        fn: context.fetchFn,
        abort: abortController == null ? void 0 : (_abortController$abor = abortController.abort) == null ? void 0 : _abortController$abor.bind(abortController),
        onSuccess: function onSuccess(data) {
          _this2.setData(data); // Notify cache callback


          _this2.cache.config.onSuccess == null ? void 0 : _this2.cache.config.onSuccess(data, _this2); // Remove query after fetching if cache time is 0

          if (_this2.cacheTime === 0) {
            _this2.optionalRemove();
          }
        },
        onError: function onError(error) {
          // Optimistically update state if needed
          if (!(isCancelledError(error) && error.silent)) {
            _this2.dispatch({
              type: 'error',
              error: error
            });
          }

          if (!isCancelledError(error)) {
            // Notify cache callback
            _this2.cache.config.onError == null ? void 0 : _this2.cache.config.onError(error, _this2); // Log error

            getLogger().error(error);
          } // Remove query after fetching if cache time is 0


          if (_this2.cacheTime === 0) {
            _this2.optionalRemove();
          }
        },
        onFail: function onFail() {
          _this2.dispatch({
            type: 'failed'
          });
        },
        onPause: function onPause() {
          _this2.dispatch({
            type: 'pause'
          });
        },
        onContinue: function onContinue() {
          _this2.dispatch({
            type: 'continue'
          });
        },
        retry: context.options.retry,
        retryDelay: context.options.retryDelay
      });
      this.promise = this.retryer.promise;
      return this.promise;
    };

    _proto.dispatch = function dispatch(action) {
      var _this3 = this;

      this.state = this.reducer(this.state, action);
      notifyManager.batch(function () {
        _this3.observers.forEach(function (observer) {
          observer.onQueryUpdate(action);
        });

        _this3.cache.notify({
          query: _this3,
          type: 'queryUpdated',
          action: action
        });
      });
    };

    _proto.getDefaultState = function getDefaultState(options) {
      var data = typeof options.initialData === 'function' ? options.initialData() : options.initialData;
      var hasInitialData = typeof options.initialData !== 'undefined';
      var initialDataUpdatedAt = hasInitialData ? typeof options.initialDataUpdatedAt === 'function' ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
      var hasData = typeof data !== 'undefined';
      return {
        data: data,
        dataUpdateCount: 0,
        dataUpdatedAt: hasData ? initialDataUpdatedAt != null ? initialDataUpdatedAt : Date.now() : 0,
        error: null,
        errorUpdateCount: 0,
        errorUpdatedAt: 0,
        fetchFailureCount: 0,
        fetchMeta: null,
        isFetching: false,
        isInvalidated: false,
        isPaused: false,
        status: hasData ? 'success' : 'idle'
      };
    };

    _proto.reducer = function reducer(state, action) {
      var _action$meta, _action$dataUpdatedAt;

      switch (action.type) {
        case 'failed':
          return _extends({}, state, {
            fetchFailureCount: state.fetchFailureCount + 1
          });

        case 'pause':
          return _extends({}, state, {
            isPaused: true
          });

        case 'continue':
          return _extends({}, state, {
            isPaused: false
          });

        case 'fetch':
          return _extends({}, state, {
            fetchFailureCount: 0,
            fetchMeta: (_action$meta = action.meta) != null ? _action$meta : null,
            isFetching: true,
            isPaused: false
          }, !state.dataUpdatedAt && {
            error: null,
            status: 'loading'
          });

        case 'success':
          return _extends({}, state, {
            data: action.data,
            dataUpdateCount: state.dataUpdateCount + 1,
            dataUpdatedAt: (_action$dataUpdatedAt = action.dataUpdatedAt) != null ? _action$dataUpdatedAt : Date.now(),
            error: null,
            fetchFailureCount: 0,
            isFetching: false,
            isInvalidated: false,
            isPaused: false,
            status: 'success'
          });

        case 'error':
          var error = action.error;

          if (isCancelledError(error) && error.revert && this.revertState) {
            return _extends({}, this.revertState);
          }

          return _extends({}, state, {
            error: error,
            errorUpdateCount: state.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: state.fetchFailureCount + 1,
            isFetching: false,
            isPaused: false,
            status: 'error'
          });

        case 'invalidate':
          return _extends({}, state, {
            isInvalidated: true
          });

        case 'setState':
          return _extends({}, state, action.state);

        default:
          return state;
      }
    };

    return Query;
  }();

  // CLASS
  var QueryCache = /*#__PURE__*/function (_Subscribable) {
    _inheritsLoose(QueryCache, _Subscribable);

    function QueryCache(config) {
      var _this;

      _this = _Subscribable.call(this) || this;
      _this.config = config || {};
      _this.queries = [];
      _this.queriesMap = {};
      return _this;
    }

    var _proto = QueryCache.prototype;

    _proto.build = function build(client, options, state) {
      var _options$queryHash;

      var queryKey = options.queryKey;
      var queryHash = (_options$queryHash = options.queryHash) != null ? _options$queryHash : hashQueryKeyByOptions(queryKey, options);
      var query = this.get(queryHash);

      if (!query) {
        query = new Query({
          cache: this,
          queryKey: queryKey,
          queryHash: queryHash,
          options: client.defaultQueryOptions(options),
          state: state,
          defaultOptions: client.getQueryDefaults(queryKey),
          meta: options.meta
        });
        this.add(query);
      }

      return query;
    };

    _proto.add = function add(query) {
      if (!this.queriesMap[query.queryHash]) {
        this.queriesMap[query.queryHash] = query;
        this.queries.push(query);
        this.notify({
          type: 'queryAdded',
          query: query
        });
      }
    };

    _proto.remove = function remove(query) {
      var queryInMap = this.queriesMap[query.queryHash];

      if (queryInMap) {
        query.destroy();
        this.queries = this.queries.filter(function (x) {
          return x !== query;
        });

        if (queryInMap === query) {
          delete this.queriesMap[query.queryHash];
        }

        this.notify({
          type: 'queryRemoved',
          query: query
        });
      }
    };

    _proto.clear = function clear() {
      var _this2 = this;

      notifyManager.batch(function () {
        _this2.queries.forEach(function (query) {
          _this2.remove(query);
        });
      });
    };

    _proto.get = function get(queryHash) {
      return this.queriesMap[queryHash];
    };

    _proto.getAll = function getAll() {
      return this.queries;
    };

    _proto.find = function find(arg1, arg2) {
      var _parseFilterArgs = parseFilterArgs(arg1, arg2),
          filters = _parseFilterArgs[0];

      if (typeof filters.exact === 'undefined') {
        filters.exact = true;
      }

      return this.queries.find(function (query) {
        return matchQuery(filters, query);
      });
    };

    _proto.findAll = function findAll(arg1, arg2) {
      var _parseFilterArgs2 = parseFilterArgs(arg1, arg2),
          filters = _parseFilterArgs2[0];

      return Object.keys(filters).length > 0 ? this.queries.filter(function (query) {
        return matchQuery(filters, query);
      }) : this.queries;
    };

    _proto.notify = function notify(event) {
      var _this3 = this;

      notifyManager.batch(function () {
        _this3.listeners.forEach(function (listener) {
          listener(event);
        });
      });
    };

    _proto.onFocus = function onFocus() {
      var _this4 = this;

      notifyManager.batch(function () {
        _this4.queries.forEach(function (query) {
          query.onFocus();
        });
      });
    };

    _proto.onOnline = function onOnline() {
      var _this5 = this;

      notifyManager.batch(function () {
        _this5.queries.forEach(function (query) {
          query.onOnline();
        });
      });
    };

    return QueryCache;
  }(Subscribable);

  // CLASS
  var Mutation = /*#__PURE__*/function () {
    function Mutation(config) {
      this.options = _extends({}, config.defaultOptions, config.options);
      this.mutationId = config.mutationId;
      this.mutationCache = config.mutationCache;
      this.observers = [];
      this.state = config.state || getDefaultState();
      this.meta = config.meta;
    }

    var _proto = Mutation.prototype;

    _proto.setState = function setState(state) {
      this.dispatch({
        type: 'setState',
        state: state
      });
    };

    _proto.addObserver = function addObserver(observer) {
      if (this.observers.indexOf(observer) === -1) {
        this.observers.push(observer);
      }
    };

    _proto.removeObserver = function removeObserver(observer) {
      this.observers = this.observers.filter(function (x) {
        return x !== observer;
      });
    };

    _proto.cancel = function cancel() {
      if (this.retryer) {
        this.retryer.cancel();
        return this.retryer.promise.then(noop).catch(noop);
      }

      return Promise.resolve();
    };

    _proto.continue = function _continue() {
      if (this.retryer) {
        this.retryer.continue();
        return this.retryer.promise;
      }

      return this.execute();
    };

    _proto.execute = function execute() {
      var _this = this;

      var data;
      var restored = this.state.status === 'loading';
      var promise = Promise.resolve();

      if (!restored) {
        this.dispatch({
          type: 'loading',
          variables: this.options.variables
        });
        promise = promise.then(function () {
          // Notify cache callback
          _this.mutationCache.config.onMutate == null ? void 0 : _this.mutationCache.config.onMutate(_this.state.variables, _this);
        }).then(function () {
          return _this.options.onMutate == null ? void 0 : _this.options.onMutate(_this.state.variables);
        }).then(function (context) {
          if (context !== _this.state.context) {
            _this.dispatch({
              type: 'loading',
              context: context,
              variables: _this.state.variables
            });
          }
        });
      }

      return promise.then(function () {
        return _this.executeMutation();
      }).then(function (result) {
        data = result; // Notify cache callback

        _this.mutationCache.config.onSuccess == null ? void 0 : _this.mutationCache.config.onSuccess(data, _this.state.variables, _this.state.context, _this);
      }).then(function () {
        return _this.options.onSuccess == null ? void 0 : _this.options.onSuccess(data, _this.state.variables, _this.state.context);
      }).then(function () {
        return _this.options.onSettled == null ? void 0 : _this.options.onSettled(data, null, _this.state.variables, _this.state.context);
      }).then(function () {
        _this.dispatch({
          type: 'success',
          data: data
        });

        return data;
      }).catch(function (error) {
        // Notify cache callback
        _this.mutationCache.config.onError == null ? void 0 : _this.mutationCache.config.onError(error, _this.state.variables, _this.state.context, _this); // Log error

        getLogger().error(error);
        return Promise.resolve().then(function () {
          return _this.options.onError == null ? void 0 : _this.options.onError(error, _this.state.variables, _this.state.context);
        }).then(function () {
          return _this.options.onSettled == null ? void 0 : _this.options.onSettled(undefined, error, _this.state.variables, _this.state.context);
        }).then(function () {
          _this.dispatch({
            type: 'error',
            error: error
          });

          throw error;
        });
      });
    };

    _proto.executeMutation = function executeMutation() {
      var _this2 = this,
          _this$options$retry;

      this.retryer = new Retryer({
        fn: function fn() {
          if (!_this2.options.mutationFn) {
            return Promise.reject('No mutationFn found');
          }

          return _this2.options.mutationFn(_this2.state.variables);
        },
        onFail: function onFail() {
          _this2.dispatch({
            type: 'failed'
          });
        },
        onPause: function onPause() {
          _this2.dispatch({
            type: 'pause'
          });
        },
        onContinue: function onContinue() {
          _this2.dispatch({
            type: 'continue'
          });
        },
        retry: (_this$options$retry = this.options.retry) != null ? _this$options$retry : 0,
        retryDelay: this.options.retryDelay
      });
      return this.retryer.promise;
    };

    _proto.dispatch = function dispatch(action) {
      var _this3 = this;

      this.state = reducer(this.state, action);
      notifyManager.batch(function () {
        _this3.observers.forEach(function (observer) {
          observer.onMutationUpdate(action);
        });

        _this3.mutationCache.notify(_this3);
      });
    };

    return Mutation;
  }();
  function getDefaultState() {
    return {
      context: undefined,
      data: undefined,
      error: null,
      failureCount: 0,
      isPaused: false,
      status: 'idle',
      variables: undefined
    };
  }

  function reducer(state, action) {
    switch (action.type) {
      case 'failed':
        return _extends({}, state, {
          failureCount: state.failureCount + 1
        });

      case 'pause':
        return _extends({}, state, {
          isPaused: true
        });

      case 'continue':
        return _extends({}, state, {
          isPaused: false
        });

      case 'loading':
        return _extends({}, state, {
          context: action.context,
          data: undefined,
          error: null,
          isPaused: false,
          status: 'loading',
          variables: action.variables
        });

      case 'success':
        return _extends({}, state, {
          data: action.data,
          error: null,
          status: 'success',
          isPaused: false
        });

      case 'error':
        return _extends({}, state, {
          data: undefined,
          error: action.error,
          failureCount: state.failureCount + 1,
          isPaused: false,
          status: 'error'
        });

      case 'setState':
        return _extends({}, state, action.state);

      default:
        return state;
    }
  }

  // CLASS
  var MutationCache = /*#__PURE__*/function (_Subscribable) {
    _inheritsLoose(MutationCache, _Subscribable);

    function MutationCache(config) {
      var _this;

      _this = _Subscribable.call(this) || this;
      _this.config = config || {};
      _this.mutations = [];
      _this.mutationId = 0;
      return _this;
    }

    var _proto = MutationCache.prototype;

    _proto.build = function build(client, options, state) {
      var mutation = new Mutation({
        mutationCache: this,
        mutationId: ++this.mutationId,
        options: client.defaultMutationOptions(options),
        state: state,
        defaultOptions: options.mutationKey ? client.getMutationDefaults(options.mutationKey) : undefined,
        meta: options.meta
      });
      this.add(mutation);
      return mutation;
    };

    _proto.add = function add(mutation) {
      this.mutations.push(mutation);
      this.notify(mutation);
    };

    _proto.remove = function remove(mutation) {
      this.mutations = this.mutations.filter(function (x) {
        return x !== mutation;
      });
      mutation.cancel();
      this.notify(mutation);
    };

    _proto.clear = function clear() {
      var _this2 = this;

      notifyManager.batch(function () {
        _this2.mutations.forEach(function (mutation) {
          _this2.remove(mutation);
        });
      });
    };

    _proto.getAll = function getAll() {
      return this.mutations;
    };

    _proto.find = function find(filters) {
      if (typeof filters.exact === 'undefined') {
        filters.exact = true;
      }

      return this.mutations.find(function (mutation) {
        return matchMutation(filters, mutation);
      });
    };

    _proto.findAll = function findAll(filters) {
      return this.mutations.filter(function (mutation) {
        return matchMutation(filters, mutation);
      });
    };

    _proto.notify = function notify(mutation) {
      var _this3 = this;

      notifyManager.batch(function () {
        _this3.listeners.forEach(function (listener) {
          listener(mutation);
        });
      });
    };

    _proto.onFocus = function onFocus() {
      this.resumePausedMutations();
    };

    _proto.onOnline = function onOnline() {
      this.resumePausedMutations();
    };

    _proto.resumePausedMutations = function resumePausedMutations() {
      var pausedMutations = this.mutations.filter(function (x) {
        return x.state.isPaused;
      });
      return notifyManager.batch(function () {
        return pausedMutations.reduce(function (promise, mutation) {
          return promise.then(function () {
            return mutation.continue().catch(noop);
          });
        }, Promise.resolve());
      });
    };

    return MutationCache;
  }(Subscribable);

  function infiniteQueryBehavior() {
    return {
      onFetch: function onFetch(context) {
        context.fetchFn = function () {
          var _context$fetchOptions, _context$fetchOptions2, _context$fetchOptions3, _context$fetchOptions4, _context$state$data, _context$state$data2;

          var refetchPage = (_context$fetchOptions = context.fetchOptions) == null ? void 0 : (_context$fetchOptions2 = _context$fetchOptions.meta) == null ? void 0 : _context$fetchOptions2.refetchPage;
          var fetchMore = (_context$fetchOptions3 = context.fetchOptions) == null ? void 0 : (_context$fetchOptions4 = _context$fetchOptions3.meta) == null ? void 0 : _context$fetchOptions4.fetchMore;
          var pageParam = fetchMore == null ? void 0 : fetchMore.pageParam;
          var isFetchingNextPage = (fetchMore == null ? void 0 : fetchMore.direction) === 'forward';
          var isFetchingPreviousPage = (fetchMore == null ? void 0 : fetchMore.direction) === 'backward';
          var oldPages = ((_context$state$data = context.state.data) == null ? void 0 : _context$state$data.pages) || [];
          var oldPageParams = ((_context$state$data2 = context.state.data) == null ? void 0 : _context$state$data2.pageParams) || [];
          var abortController = getAbortController();
          var abortSignal = abortController == null ? void 0 : abortController.signal;
          var newPageParams = oldPageParams;
          var cancelled = false; // Get query function

          var queryFn = context.options.queryFn || function () {
            return Promise.reject('Missing queryFn');
          };

          var buildNewPages = function buildNewPages(pages, param, page, previous) {
            newPageParams = previous ? [param].concat(newPageParams) : [].concat(newPageParams, [param]);
            return previous ? [page].concat(pages) : [].concat(pages, [page]);
          }; // Create function to fetch a page


          var fetchPage = function fetchPage(pages, manual, param, previous) {
            if (cancelled) {
              return Promise.reject('Cancelled');
            }

            if (typeof param === 'undefined' && !manual && pages.length) {
              return Promise.resolve(pages);
            }

            var queryFnContext = {
              queryKey: context.queryKey,
              signal: abortSignal,
              pageParam: param,
              meta: context.meta
            };
            var queryFnResult = queryFn(queryFnContext);
            var promise = Promise.resolve(queryFnResult).then(function (page) {
              return buildNewPages(pages, param, page, previous);
            });

            if (isCancelable(queryFnResult)) {
              var promiseAsAny = promise;
              promiseAsAny.cancel = queryFnResult.cancel;
            }

            return promise;
          };

          var promise; // Fetch first page?

          if (!oldPages.length) {
            promise = fetchPage([]);
          } // Fetch next page?
          else if (isFetchingNextPage) {
              var manual = typeof pageParam !== 'undefined';
              var param = manual ? pageParam : getNextPageParam(context.options, oldPages);
              promise = fetchPage(oldPages, manual, param);
            } // Fetch previous page?
            else if (isFetchingPreviousPage) {
                var _manual = typeof pageParam !== 'undefined';

                var _param = _manual ? pageParam : getPreviousPageParam(context.options, oldPages);

                promise = fetchPage(oldPages, _manual, _param, true);
              } // Refetch pages
              else {
                  (function () {
                    newPageParams = [];
                    var manual = typeof context.options.getNextPageParam === 'undefined';
                    var shouldFetchFirstPage = refetchPage && oldPages[0] ? refetchPage(oldPages[0], 0, oldPages) : true; // Fetch first page

                    promise = shouldFetchFirstPage ? fetchPage([], manual, oldPageParams[0]) : Promise.resolve(buildNewPages([], oldPageParams[0], oldPages[0])); // Fetch remaining pages

                    var _loop = function _loop(i) {
                      promise = promise.then(function (pages) {
                        var shouldFetchNextPage = refetchPage && oldPages[i] ? refetchPage(oldPages[i], i, oldPages) : true;

                        if (shouldFetchNextPage) {
                          var _param2 = manual ? oldPageParams[i] : getNextPageParam(context.options, pages);

                          return fetchPage(pages, manual, _param2);
                        }

                        return Promise.resolve(buildNewPages(pages, oldPageParams[i], oldPages[i]));
                      });
                    };

                    for (var i = 1; i < oldPages.length; i++) {
                      _loop(i);
                    }
                  })();
                }

          var finalPromise = promise.then(function (pages) {
            return {
              pages: pages,
              pageParams: newPageParams
            };
          });
          var finalPromiseAsAny = finalPromise;

          finalPromiseAsAny.cancel = function () {
            cancelled = true;
            abortController == null ? void 0 : abortController.abort();

            if (isCancelable(promise)) {
              promise.cancel();
            }
          };

          return finalPromise;
        };
      }
    };
  }
  function getNextPageParam(options, pages) {
    return options.getNextPageParam == null ? void 0 : options.getNextPageParam(pages[pages.length - 1], pages);
  }
  function getPreviousPageParam(options, pages) {
    return options.getPreviousPageParam == null ? void 0 : options.getPreviousPageParam(pages[0], pages);
  }
  /**
   * Checks if there is a next page.
   * Returns `undefined` if it cannot be determined.
   */

  function hasNextPage(options, pages) {
    if (options.getNextPageParam && Array.isArray(pages)) {
      var nextPageParam = getNextPageParam(options, pages);
      return typeof nextPageParam !== 'undefined' && nextPageParam !== null && nextPageParam !== false;
    }
  }
  /**
   * Checks if there is a previous page.
   * Returns `undefined` if it cannot be determined.
   */

  function hasPreviousPage(options, pages) {
    if (options.getPreviousPageParam && Array.isArray(pages)) {
      var previousPageParam = getPreviousPageParam(options, pages);
      return typeof previousPageParam !== 'undefined' && previousPageParam !== null && previousPageParam !== false;
    }
  }

  // CLASS
  var QueryClient = /*#__PURE__*/function () {
    function QueryClient(config) {
      if (config === void 0) {
        config = {};
      }

      this.queryCache = config.queryCache || new QueryCache();
      this.mutationCache = config.mutationCache || new MutationCache();
      this.defaultOptions = config.defaultOptions || {};
      this.queryDefaults = [];
      this.mutationDefaults = [];
    }

    var _proto = QueryClient.prototype;

    _proto.mount = function mount() {
      var _this = this;

      this.unsubscribeFocus = focusManager.subscribe(function () {
        if (focusManager.isFocused() && onlineManager.isOnline()) {
          _this.mutationCache.onFocus();

          _this.queryCache.onFocus();
        }
      });
      this.unsubscribeOnline = onlineManager.subscribe(function () {
        if (focusManager.isFocused() && onlineManager.isOnline()) {
          _this.mutationCache.onOnline();

          _this.queryCache.onOnline();
        }
      });
    };

    _proto.unmount = function unmount() {
      var _this$unsubscribeFocu, _this$unsubscribeOnli;

      (_this$unsubscribeFocu = this.unsubscribeFocus) == null ? void 0 : _this$unsubscribeFocu.call(this);
      (_this$unsubscribeOnli = this.unsubscribeOnline) == null ? void 0 : _this$unsubscribeOnli.call(this);
    };

    _proto.isFetching = function isFetching(arg1, arg2) {
      var _parseFilterArgs = parseFilterArgs(arg1, arg2),
          filters = _parseFilterArgs[0];

      filters.fetching = true;
      return this.queryCache.findAll(filters).length;
    };

    _proto.isMutating = function isMutating(filters) {
      return this.mutationCache.findAll(_extends({}, filters, {
        fetching: true
      })).length;
    };

    _proto.getQueryData = function getQueryData(queryKey, filters) {
      var _this$queryCache$find;

      return (_this$queryCache$find = this.queryCache.find(queryKey, filters)) == null ? void 0 : _this$queryCache$find.state.data;
    };

    _proto.getQueriesData = function getQueriesData(queryKeyOrFilters) {
      return this.getQueryCache().findAll(queryKeyOrFilters).map(function (_ref) {
        var queryKey = _ref.queryKey,
            state = _ref.state;
        var data = state.data;
        return [queryKey, data];
      });
    };

    _proto.setQueryData = function setQueryData(queryKey, updater, options) {
      var parsedOptions = parseQueryArgs(queryKey);
      var defaultedOptions = this.defaultQueryOptions(parsedOptions);
      return this.queryCache.build(this, defaultedOptions).setData(updater, options);
    };

    _proto.setQueriesData = function setQueriesData(queryKeyOrFilters, updater, options) {
      var _this2 = this;

      return notifyManager.batch(function () {
        return _this2.getQueryCache().findAll(queryKeyOrFilters).map(function (_ref2) {
          var queryKey = _ref2.queryKey;
          return [queryKey, _this2.setQueryData(queryKey, updater, options)];
        });
      });
    };

    _proto.getQueryState = function getQueryState(queryKey, filters) {
      var _this$queryCache$find2;

      return (_this$queryCache$find2 = this.queryCache.find(queryKey, filters)) == null ? void 0 : _this$queryCache$find2.state;
    };

    _proto.removeQueries = function removeQueries(arg1, arg2) {
      var _parseFilterArgs2 = parseFilterArgs(arg1, arg2),
          filters = _parseFilterArgs2[0];

      var queryCache = this.queryCache;
      notifyManager.batch(function () {
        queryCache.findAll(filters).forEach(function (query) {
          queryCache.remove(query);
        });
      });
    };

    _proto.resetQueries = function resetQueries(arg1, arg2, arg3) {
      var _this3 = this;

      var _parseFilterArgs3 = parseFilterArgs(arg1, arg2, arg3),
          filters = _parseFilterArgs3[0],
          options = _parseFilterArgs3[1];

      var queryCache = this.queryCache;

      var refetchFilters = _extends({}, filters, {
        active: true
      });

      return notifyManager.batch(function () {
        queryCache.findAll(filters).forEach(function (query) {
          query.reset();
        });
        return _this3.refetchQueries(refetchFilters, options);
      });
    };

    _proto.cancelQueries = function cancelQueries(arg1, arg2, arg3) {
      var _this4 = this;

      var _parseFilterArgs4 = parseFilterArgs(arg1, arg2, arg3),
          filters = _parseFilterArgs4[0],
          _parseFilterArgs4$ = _parseFilterArgs4[1],
          cancelOptions = _parseFilterArgs4$ === void 0 ? {} : _parseFilterArgs4$;

      if (typeof cancelOptions.revert === 'undefined') {
        cancelOptions.revert = true;
      }

      var promises = notifyManager.batch(function () {
        return _this4.queryCache.findAll(filters).map(function (query) {
          return query.cancel(cancelOptions);
        });
      });
      return Promise.all(promises).then(noop).catch(noop);
    };

    _proto.invalidateQueries = function invalidateQueries(arg1, arg2, arg3) {
      var _ref3,
          _filters$refetchActiv,
          _filters$refetchInact,
          _this5 = this;

      var _parseFilterArgs5 = parseFilterArgs(arg1, arg2, arg3),
          filters = _parseFilterArgs5[0],
          options = _parseFilterArgs5[1];

      var refetchFilters = _extends({}, filters, {
        // if filters.refetchActive is not provided and filters.active is explicitly false,
        // e.g. invalidateQueries({ active: false }), we don't want to refetch active queries
        active: (_ref3 = (_filters$refetchActiv = filters.refetchActive) != null ? _filters$refetchActiv : filters.active) != null ? _ref3 : true,
        inactive: (_filters$refetchInact = filters.refetchInactive) != null ? _filters$refetchInact : false
      });

      return notifyManager.batch(function () {
        _this5.queryCache.findAll(filters).forEach(function (query) {
          query.invalidate();
        });

        return _this5.refetchQueries(refetchFilters, options);
      });
    };

    _proto.refetchQueries = function refetchQueries(arg1, arg2, arg3) {
      var _this6 = this;

      var _parseFilterArgs6 = parseFilterArgs(arg1, arg2, arg3),
          filters = _parseFilterArgs6[0],
          options = _parseFilterArgs6[1];

      var promises = notifyManager.batch(function () {
        return _this6.queryCache.findAll(filters).map(function (query) {
          return query.fetch(undefined, _extends({}, options, {
            meta: {
              refetchPage: filters == null ? void 0 : filters.refetchPage
            }
          }));
        });
      });
      var promise = Promise.all(promises).then(noop);

      if (!(options == null ? void 0 : options.throwOnError)) {
        promise = promise.catch(noop);
      }

      return promise;
    };

    _proto.fetchQuery = function fetchQuery(arg1, arg2, arg3) {
      var parsedOptions = parseQueryArgs(arg1, arg2, arg3);
      var defaultedOptions = this.defaultQueryOptions(parsedOptions); // https://github.com/tannerlinsley/react-query/issues/652

      if (typeof defaultedOptions.retry === 'undefined') {
        defaultedOptions.retry = false;
      }

      var query = this.queryCache.build(this, defaultedOptions);
      return query.isStaleByTime(defaultedOptions.staleTime) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
    };

    _proto.prefetchQuery = function prefetchQuery(arg1, arg2, arg3) {
      return this.fetchQuery(arg1, arg2, arg3).then(noop).catch(noop);
    };

    _proto.fetchInfiniteQuery = function fetchInfiniteQuery(arg1, arg2, arg3) {
      var parsedOptions = parseQueryArgs(arg1, arg2, arg3);
      parsedOptions.behavior = infiniteQueryBehavior();
      return this.fetchQuery(parsedOptions);
    };

    _proto.prefetchInfiniteQuery = function prefetchInfiniteQuery(arg1, arg2, arg3) {
      return this.fetchInfiniteQuery(arg1, arg2, arg3).then(noop).catch(noop);
    };

    _proto.cancelMutations = function cancelMutations() {
      var _this7 = this;

      var promises = notifyManager.batch(function () {
        return _this7.mutationCache.getAll().map(function (mutation) {
          return mutation.cancel();
        });
      });
      return Promise.all(promises).then(noop).catch(noop);
    };

    _proto.resumePausedMutations = function resumePausedMutations() {
      return this.getMutationCache().resumePausedMutations();
    };

    _proto.executeMutation = function executeMutation(options) {
      return this.mutationCache.build(this, options).execute();
    };

    _proto.getQueryCache = function getQueryCache() {
      return this.queryCache;
    };

    _proto.getMutationCache = function getMutationCache() {
      return this.mutationCache;
    };

    _proto.getDefaultOptions = function getDefaultOptions() {
      return this.defaultOptions;
    };

    _proto.setDefaultOptions = function setDefaultOptions(options) {
      this.defaultOptions = options;
    };

    _proto.setQueryDefaults = function setQueryDefaults(queryKey, options) {
      var result = this.queryDefaults.find(function (x) {
        return hashQueryKey(queryKey) === hashQueryKey(x.queryKey);
      });

      if (result) {
        result.defaultOptions = options;
      } else {
        this.queryDefaults.push({
          queryKey: queryKey,
          defaultOptions: options
        });
      }
    };

    _proto.getQueryDefaults = function getQueryDefaults(queryKey) {
      var _this$queryDefaults$f;

      return queryKey ? (_this$queryDefaults$f = this.queryDefaults.find(function (x) {
        return partialMatchKey(queryKey, x.queryKey);
      })) == null ? void 0 : _this$queryDefaults$f.defaultOptions : undefined;
    };

    _proto.setMutationDefaults = function setMutationDefaults(mutationKey, options) {
      var result = this.mutationDefaults.find(function (x) {
        return hashQueryKey(mutationKey) === hashQueryKey(x.mutationKey);
      });

      if (result) {
        result.defaultOptions = options;
      } else {
        this.mutationDefaults.push({
          mutationKey: mutationKey,
          defaultOptions: options
        });
      }
    };

    _proto.getMutationDefaults = function getMutationDefaults(mutationKey) {
      var _this$mutationDefault;

      return mutationKey ? (_this$mutationDefault = this.mutationDefaults.find(function (x) {
        return partialMatchKey(mutationKey, x.mutationKey);
      })) == null ? void 0 : _this$mutationDefault.defaultOptions : undefined;
    };

    _proto.defaultQueryOptions = function defaultQueryOptions(options) {
      if (options == null ? void 0 : options._defaulted) {
        return options;
      }

      var defaultedOptions = _extends({}, this.defaultOptions.queries, this.getQueryDefaults(options == null ? void 0 : options.queryKey), options, {
        _defaulted: true
      });

      if (!defaultedOptions.queryHash && defaultedOptions.queryKey) {
        defaultedOptions.queryHash = hashQueryKeyByOptions(defaultedOptions.queryKey, defaultedOptions);
      }

      return defaultedOptions;
    };

    _proto.defaultQueryObserverOptions = function defaultQueryObserverOptions(options) {
      return this.defaultQueryOptions(options);
    };

    _proto.defaultMutationOptions = function defaultMutationOptions(options) {
      if (options == null ? void 0 : options._defaulted) {
        return options;
      }

      return _extends({}, this.defaultOptions.mutations, this.getMutationDefaults(options == null ? void 0 : options.mutationKey), options, {
        _defaulted: true
      });
    };

    _proto.clear = function clear() {
      this.queryCache.clear();
      this.mutationCache.clear();
    };

    return QueryClient;
  }();

  var QueryObserver = /*#__PURE__*/function (_Subscribable) {
    _inheritsLoose(QueryObserver, _Subscribable);

    function QueryObserver(client, options) {
      var _this;

      _this = _Subscribable.call(this) || this;
      _this.client = client;
      _this.options = options;
      _this.trackedProps = [];
      _this.selectError = null;

      _this.bindMethods();

      _this.setOptions(options);

      return _this;
    }

    var _proto = QueryObserver.prototype;

    _proto.bindMethods = function bindMethods() {
      this.remove = this.remove.bind(this);
      this.refetch = this.refetch.bind(this);
    };

    _proto.onSubscribe = function onSubscribe() {
      if (this.listeners.length === 1) {
        this.currentQuery.addObserver(this);

        if (shouldFetchOnMount(this.currentQuery, this.options)) {
          this.executeFetch();
        }

        this.updateTimers();
      }
    };

    _proto.onUnsubscribe = function onUnsubscribe() {
      if (!this.listeners.length) {
        this.destroy();
      }
    };

    _proto.shouldFetchOnReconnect = function shouldFetchOnReconnect() {
      return shouldFetchOn(this.currentQuery, this.options, this.options.refetchOnReconnect);
    };

    _proto.shouldFetchOnWindowFocus = function shouldFetchOnWindowFocus() {
      return shouldFetchOn(this.currentQuery, this.options, this.options.refetchOnWindowFocus);
    };

    _proto.destroy = function destroy() {
      this.listeners = [];
      this.clearTimers();
      this.currentQuery.removeObserver(this);
    };

    _proto.setOptions = function setOptions(options, notifyOptions) {
      var prevOptions = this.options;
      var prevQuery = this.currentQuery;
      this.options = this.client.defaultQueryObserverOptions(options);

      if (typeof this.options.enabled !== 'undefined' && typeof this.options.enabled !== 'boolean') {
        throw new Error('Expected enabled to be a boolean');
      } // Keep previous query key if the user does not supply one


      if (!this.options.queryKey) {
        this.options.queryKey = prevOptions.queryKey;
      }

      this.updateQuery();
      var mounted = this.hasListeners(); // Fetch if there are subscribers

      if (mounted && shouldFetchOptionally(this.currentQuery, prevQuery, this.options, prevOptions)) {
        this.executeFetch();
      } // Update result


      this.updateResult(notifyOptions); // Update stale interval if needed

      if (mounted && (this.currentQuery !== prevQuery || this.options.enabled !== prevOptions.enabled || this.options.staleTime !== prevOptions.staleTime)) {
        this.updateStaleTimeout();
      }

      var nextRefetchInterval = this.computeRefetchInterval(); // Update refetch interval if needed

      if (mounted && (this.currentQuery !== prevQuery || this.options.enabled !== prevOptions.enabled || nextRefetchInterval !== this.currentRefetchInterval)) {
        this.updateRefetchInterval(nextRefetchInterval);
      }
    };

    _proto.getOptimisticResult = function getOptimisticResult(options) {
      var defaultedOptions = this.client.defaultQueryObserverOptions(options);
      var query = this.client.getQueryCache().build(this.client, defaultedOptions);
      return this.createResult(query, defaultedOptions);
    };

    _proto.getCurrentResult = function getCurrentResult() {
      return this.currentResult;
    };

    _proto.trackResult = function trackResult(result, defaultedOptions) {
      var _this2 = this;

      var trackedResult = {};

      var trackProp = function trackProp(key) {
        if (!_this2.trackedProps.includes(key)) {
          _this2.trackedProps.push(key);
        }
      };

      Object.keys(result).forEach(function (key) {
        Object.defineProperty(trackedResult, key, {
          configurable: false,
          enumerable: true,
          get: function get() {
            trackProp(key);
            return result[key];
          }
        });
      });

      if (defaultedOptions.useErrorBoundary || defaultedOptions.suspense) {
        trackProp('error');
      }

      return trackedResult;
    };

    _proto.getNextResult = function getNextResult(options) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var unsubscribe = _this3.subscribe(function (result) {
          if (!result.isFetching) {
            unsubscribe();

            if (result.isError && (options == null ? void 0 : options.throwOnError)) {
              reject(result.error);
            } else {
              resolve(result);
            }
          }
        });
      });
    };

    _proto.getCurrentQuery = function getCurrentQuery() {
      return this.currentQuery;
    };

    _proto.remove = function remove() {
      this.client.getQueryCache().remove(this.currentQuery);
    };

    _proto.refetch = function refetch(options) {
      return this.fetch(_extends({}, options, {
        meta: {
          refetchPage: options == null ? void 0 : options.refetchPage
        }
      }));
    };

    _proto.fetchOptimistic = function fetchOptimistic(options) {
      var _this4 = this;

      var defaultedOptions = this.client.defaultQueryObserverOptions(options);
      var query = this.client.getQueryCache().build(this.client, defaultedOptions);
      return query.fetch().then(function () {
        return _this4.createResult(query, defaultedOptions);
      });
    };

    _proto.fetch = function fetch(fetchOptions) {
      var _this5 = this;

      return this.executeFetch(fetchOptions).then(function () {
        _this5.updateResult();

        return _this5.currentResult;
      });
    };

    _proto.executeFetch = function executeFetch(fetchOptions) {
      // Make sure we reference the latest query as the current one might have been removed
      this.updateQuery(); // Fetch

      var promise = this.currentQuery.fetch(this.options, fetchOptions);

      if (!(fetchOptions == null ? void 0 : fetchOptions.throwOnError)) {
        promise = promise.catch(noop);
      }

      return promise;
    };

    _proto.updateStaleTimeout = function updateStaleTimeout() {
      var _this6 = this;

      this.clearStaleTimeout();

      if (isServer || this.currentResult.isStale || !isValidTimeout(this.options.staleTime)) {
        return;
      }

      var time = timeUntilStale(this.currentResult.dataUpdatedAt, this.options.staleTime); // The timeout is sometimes triggered 1 ms before the stale time expiration.
      // To mitigate this issue we always add 1 ms to the timeout.

      var timeout = time + 1;
      this.staleTimeoutId = setTimeout(function () {
        if (!_this6.currentResult.isStale) {
          _this6.updateResult();
        }
      }, timeout);
    };

    _proto.computeRefetchInterval = function computeRefetchInterval() {
      var _this$options$refetch;

      return typeof this.options.refetchInterval === 'function' ? this.options.refetchInterval(this.currentResult.data, this.currentQuery) : (_this$options$refetch = this.options.refetchInterval) != null ? _this$options$refetch : false;
    };

    _proto.updateRefetchInterval = function updateRefetchInterval(nextInterval) {
      var _this7 = this;

      this.clearRefetchInterval();
      this.currentRefetchInterval = nextInterval;

      if (isServer || this.options.enabled === false || !isValidTimeout(this.currentRefetchInterval) || this.currentRefetchInterval === 0) {
        return;
      }

      this.refetchIntervalId = setInterval(function () {
        if (_this7.options.refetchIntervalInBackground || focusManager.isFocused()) {
          _this7.executeFetch();
        }
      }, this.currentRefetchInterval);
    };

    _proto.updateTimers = function updateTimers() {
      this.updateStaleTimeout();
      this.updateRefetchInterval(this.computeRefetchInterval());
    };

    _proto.clearTimers = function clearTimers() {
      this.clearStaleTimeout();
      this.clearRefetchInterval();
    };

    _proto.clearStaleTimeout = function clearStaleTimeout() {
      if (this.staleTimeoutId) {
        clearTimeout(this.staleTimeoutId);
        this.staleTimeoutId = undefined;
      }
    };

    _proto.clearRefetchInterval = function clearRefetchInterval() {
      if (this.refetchIntervalId) {
        clearInterval(this.refetchIntervalId);
        this.refetchIntervalId = undefined;
      }
    };

    _proto.createResult = function createResult(query, options) {
      var prevQuery = this.currentQuery;
      var prevOptions = this.options;
      var prevResult = this.currentResult;
      var prevResultState = this.currentResultState;
      var prevResultOptions = this.currentResultOptions;
      var queryChange = query !== prevQuery;
      var queryInitialState = queryChange ? query.state : this.currentQueryInitialState;
      var prevQueryResult = queryChange ? this.currentResult : this.previousQueryResult;
      var state = query.state;
      var dataUpdatedAt = state.dataUpdatedAt,
          error = state.error,
          errorUpdatedAt = state.errorUpdatedAt,
          isFetching = state.isFetching,
          status = state.status;
      var isPreviousData = false;
      var isPlaceholderData = false;
      var data; // Optimistically set result in fetching state if needed

      if (options.optimisticResults) {
        var mounted = this.hasListeners();
        var fetchOnMount = !mounted && shouldFetchOnMount(query, options);
        var fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);

        if (fetchOnMount || fetchOptionally) {
          isFetching = true;

          if (!dataUpdatedAt) {
            status = 'loading';
          }
        }
      } // Keep previous data if needed


      if (options.keepPreviousData && !state.dataUpdateCount && (prevQueryResult == null ? void 0 : prevQueryResult.isSuccess) && status !== 'error') {
        data = prevQueryResult.data;
        dataUpdatedAt = prevQueryResult.dataUpdatedAt;
        status = prevQueryResult.status;
        isPreviousData = true;
      } // Select data if needed
      else if (options.select && typeof state.data !== 'undefined') {
          // Memoize select result
          if (prevResult && state.data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === this.selectFn) {
            data = this.selectResult;
          } else {
            try {
              this.selectFn = options.select;
              data = options.select(state.data);

              if (options.structuralSharing !== false) {
                data = replaceEqualDeep(prevResult == null ? void 0 : prevResult.data, data);
              }

              this.selectResult = data;
              this.selectError = null;
            } catch (selectError) {
              getLogger().error(selectError);
              this.selectError = selectError;
            }
          }
        } // Use query data
        else {
            data = state.data;
          } // Show placeholder data if needed


      if (typeof options.placeholderData !== 'undefined' && typeof data === 'undefined' && (status === 'loading' || status === 'idle')) {
        var placeholderData; // Memoize placeholder data

        if ((prevResult == null ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
          placeholderData = prevResult.data;
        } else {
          placeholderData = typeof options.placeholderData === 'function' ? options.placeholderData() : options.placeholderData;

          if (options.select && typeof placeholderData !== 'undefined') {
            try {
              placeholderData = options.select(placeholderData);

              if (options.structuralSharing !== false) {
                placeholderData = replaceEqualDeep(prevResult == null ? void 0 : prevResult.data, placeholderData);
              }

              this.selectError = null;
            } catch (selectError) {
              getLogger().error(selectError);
              this.selectError = selectError;
            }
          }
        }

        if (typeof placeholderData !== 'undefined') {
          status = 'success';
          data = placeholderData;
          isPlaceholderData = true;
        }
      }

      if (this.selectError) {
        error = this.selectError;
        data = this.selectResult;
        errorUpdatedAt = Date.now();
        status = 'error';
      }

      var result = {
        status: status,
        isLoading: status === 'loading',
        isSuccess: status === 'success',
        isError: status === 'error',
        isIdle: status === 'idle',
        data: data,
        dataUpdatedAt: dataUpdatedAt,
        error: error,
        errorUpdatedAt: errorUpdatedAt,
        failureCount: state.fetchFailureCount,
        errorUpdateCount: state.errorUpdateCount,
        isFetched: state.dataUpdateCount > 0 || state.errorUpdateCount > 0,
        isFetchedAfterMount: state.dataUpdateCount > queryInitialState.dataUpdateCount || state.errorUpdateCount > queryInitialState.errorUpdateCount,
        isFetching: isFetching,
        isRefetching: isFetching && status !== 'loading',
        isLoadingError: status === 'error' && state.dataUpdatedAt === 0,
        isPlaceholderData: isPlaceholderData,
        isPreviousData: isPreviousData,
        isRefetchError: status === 'error' && state.dataUpdatedAt !== 0,
        isStale: isStale(query, options),
        refetch: this.refetch,
        remove: this.remove
      };
      return result;
    };

    _proto.shouldNotifyListeners = function shouldNotifyListeners(result, prevResult) {
      if (!prevResult) {
        return true;
      }

      var _this$options = this.options,
          notifyOnChangeProps = _this$options.notifyOnChangeProps,
          notifyOnChangePropsExclusions = _this$options.notifyOnChangePropsExclusions;

      if (!notifyOnChangeProps && !notifyOnChangePropsExclusions) {
        return true;
      }

      if (notifyOnChangeProps === 'tracked' && !this.trackedProps.length) {
        return true;
      }

      var includedProps = notifyOnChangeProps === 'tracked' ? this.trackedProps : notifyOnChangeProps;
      return Object.keys(result).some(function (key) {
        var typedKey = key;
        var changed = result[typedKey] !== prevResult[typedKey];
        var isIncluded = includedProps == null ? void 0 : includedProps.some(function (x) {
          return x === key;
        });
        var isExcluded = notifyOnChangePropsExclusions == null ? void 0 : notifyOnChangePropsExclusions.some(function (x) {
          return x === key;
        });
        return changed && !isExcluded && (!includedProps || isIncluded);
      });
    };

    _proto.updateResult = function updateResult(notifyOptions) {
      var prevResult = this.currentResult;
      this.currentResult = this.createResult(this.currentQuery, this.options);
      this.currentResultState = this.currentQuery.state;
      this.currentResultOptions = this.options; // Only notify if something has changed

      if (shallowEqualObjects(this.currentResult, prevResult)) {
        return;
      } // Determine which callbacks to trigger


      var defaultNotifyOptions = {
        cache: true
      };

      if ((notifyOptions == null ? void 0 : notifyOptions.listeners) !== false && this.shouldNotifyListeners(this.currentResult, prevResult)) {
        defaultNotifyOptions.listeners = true;
      }

      this.notify(_extends({}, defaultNotifyOptions, notifyOptions));
    };

    _proto.updateQuery = function updateQuery() {
      var query = this.client.getQueryCache().build(this.client, this.options);

      if (query === this.currentQuery) {
        return;
      }

      var prevQuery = this.currentQuery;
      this.currentQuery = query;
      this.currentQueryInitialState = query.state;
      this.previousQueryResult = this.currentResult;

      if (this.hasListeners()) {
        prevQuery == null ? void 0 : prevQuery.removeObserver(this);
        query.addObserver(this);
      }
    };

    _proto.onQueryUpdate = function onQueryUpdate(action) {
      var notifyOptions = {};

      if (action.type === 'success') {
        notifyOptions.onSuccess = true;
      } else if (action.type === 'error' && !isCancelledError(action.error)) {
        notifyOptions.onError = true;
      }

      this.updateResult(notifyOptions);

      if (this.hasListeners()) {
        this.updateTimers();
      }
    };

    _proto.notify = function notify(notifyOptions) {
      var _this8 = this;

      notifyManager.batch(function () {
        // First trigger the configuration callbacks
        if (notifyOptions.onSuccess) {
          _this8.options.onSuccess == null ? void 0 : _this8.options.onSuccess(_this8.currentResult.data);
          _this8.options.onSettled == null ? void 0 : _this8.options.onSettled(_this8.currentResult.data, null);
        } else if (notifyOptions.onError) {
          _this8.options.onError == null ? void 0 : _this8.options.onError(_this8.currentResult.error);
          _this8.options.onSettled == null ? void 0 : _this8.options.onSettled(undefined, _this8.currentResult.error);
        } // Then trigger the listeners


        if (notifyOptions.listeners) {
          _this8.listeners.forEach(function (listener) {
            listener(_this8.currentResult);
          });
        } // Then the cache listeners


        if (notifyOptions.cache) {
          _this8.client.getQueryCache().notify({
            query: _this8.currentQuery,
            type: 'observerResultsUpdated'
          });
        }
      });
    };

    return QueryObserver;
  }(Subscribable);

  function shouldLoadOnMount(query, options) {
    return options.enabled !== false && !query.state.dataUpdatedAt && !(query.state.status === 'error' && options.retryOnMount === false);
  }

  function shouldFetchOnMount(query, options) {
    return shouldLoadOnMount(query, options) || query.state.dataUpdatedAt > 0 && shouldFetchOn(query, options, options.refetchOnMount);
  }

  function shouldFetchOn(query, options, field) {
    if (options.enabled !== false) {
      var value = typeof field === 'function' ? field(query) : field;
      return value === 'always' || value !== false && isStale(query, options);
    }

    return false;
  }

  function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
    return options.enabled !== false && (query !== prevQuery || prevOptions.enabled === false) && (!options.suspense || query.state.status !== 'error') && isStale(query, options);
  }

  function isStale(query, options) {
    return query.isStaleByTime(options.staleTime);
  }

  var QueriesObserver = /*#__PURE__*/function (_Subscribable) {
    _inheritsLoose(QueriesObserver, _Subscribable);

    function QueriesObserver(client, queries) {
      var _this;

      _this = _Subscribable.call(this) || this;
      _this.client = client;
      _this.queries = [];
      _this.result = [];
      _this.observers = [];
      _this.observersMap = {};

      if (queries) {
        _this.setQueries(queries);
      }

      return _this;
    }

    var _proto = QueriesObserver.prototype;

    _proto.onSubscribe = function onSubscribe() {
      var _this2 = this;

      if (this.listeners.length === 1) {
        this.observers.forEach(function (observer) {
          observer.subscribe(function (result) {
            _this2.onUpdate(observer, result);
          });
        });
      }
    };

    _proto.onUnsubscribe = function onUnsubscribe() {
      if (!this.listeners.length) {
        this.destroy();
      }
    };

    _proto.destroy = function destroy() {
      this.listeners = [];
      this.observers.forEach(function (observer) {
        observer.destroy();
      });
    };

    _proto.setQueries = function setQueries(queries, notifyOptions) {
      this.queries = queries;
      this.updateObservers(notifyOptions);
    };

    _proto.getCurrentResult = function getCurrentResult() {
      return this.result;
    };

    _proto.getOptimisticResult = function getOptimisticResult(queries) {
      return this.findMatchingObservers(queries).map(function (match) {
        return match.observer.getOptimisticResult(match.defaultedQueryOptions);
      });
    };

    _proto.findMatchingObservers = function findMatchingObservers(queries) {
      var _this3 = this;

      var prevObservers = this.observers;
      var defaultedQueryOptions = queries.map(function (options) {
        return _this3.client.defaultQueryObserverOptions(options);
      });
      var matchingObservers = defaultedQueryOptions.flatMap(function (defaultedOptions) {
        var match = prevObservers.find(function (observer) {
          return observer.options.queryHash === defaultedOptions.queryHash;
        });

        if (match != null) {
          return [{
            defaultedQueryOptions: defaultedOptions,
            observer: match
          }];
        }

        return [];
      });
      var matchedQueryHashes = matchingObservers.map(function (match) {
        return match.defaultedQueryOptions.queryHash;
      });
      var unmatchedQueries = defaultedQueryOptions.filter(function (defaultedOptions) {
        return !matchedQueryHashes.includes(defaultedOptions.queryHash);
      });
      var unmatchedObservers = prevObservers.filter(function (prevObserver) {
        return !matchingObservers.some(function (match) {
          return match.observer === prevObserver;
        });
      });
      var newOrReusedObservers = unmatchedQueries.map(function (options, index) {
        if (options.keepPreviousData) {
          // return previous data from one of the observers that no longer match
          var previouslyUsedObserver = unmatchedObservers[index];

          if (previouslyUsedObserver !== undefined) {
            return {
              defaultedQueryOptions: options,
              observer: previouslyUsedObserver
            };
          }
        }

        return {
          defaultedQueryOptions: options,
          observer: _this3.getObserver(options)
        };
      });

      var sortMatchesByOrderOfQueries = function sortMatchesByOrderOfQueries(a, b) {
        return defaultedQueryOptions.indexOf(a.defaultedQueryOptions) - defaultedQueryOptions.indexOf(b.defaultedQueryOptions);
      };

      return matchingObservers.concat(newOrReusedObservers).sort(sortMatchesByOrderOfQueries);
    };

    _proto.getObserver = function getObserver(options) {
      var defaultedOptions = this.client.defaultQueryObserverOptions(options);
      var currentObserver = this.observersMap[defaultedOptions.queryHash];
      return currentObserver != null ? currentObserver : new QueryObserver(this.client, defaultedOptions);
    };

    _proto.updateObservers = function updateObservers(notifyOptions) {
      var _this4 = this;

      notifyManager.batch(function () {
        var prevObservers = _this4.observers;

        var newObserverMatches = _this4.findMatchingObservers(_this4.queries); // set options for the new observers to notify of changes


        newObserverMatches.forEach(function (match) {
          return match.observer.setOptions(match.defaultedQueryOptions, notifyOptions);
        });
        var newObservers = newObserverMatches.map(function (match) {
          return match.observer;
        });
        var newObserversMap = Object.fromEntries(newObservers.map(function (observer) {
          return [observer.options.queryHash, observer];
        }));
        var newResult = newObservers.map(function (observer) {
          return observer.getCurrentResult();
        });
        var hasIndexChange = newObservers.some(function (observer, index) {
          return observer !== prevObservers[index];
        });

        if (prevObservers.length === newObservers.length && !hasIndexChange) {
          return;
        }

        _this4.observers = newObservers;
        _this4.observersMap = newObserversMap;
        _this4.result = newResult;

        if (!_this4.hasListeners()) {
          return;
        }

        difference(prevObservers, newObservers).forEach(function (observer) {
          observer.destroy();
        });
        difference(newObservers, prevObservers).forEach(function (observer) {
          observer.subscribe(function (result) {
            _this4.onUpdate(observer, result);
          });
        });

        _this4.notify();
      });
    };

    _proto.onUpdate = function onUpdate(observer, result) {
      var index = this.observers.indexOf(observer);

      if (index !== -1) {
        this.result = replaceAt(this.result, index, result);
        this.notify();
      }
    };

    _proto.notify = function notify() {
      var _this5 = this;

      notifyManager.batch(function () {
        _this5.listeners.forEach(function (listener) {
          listener(_this5.result);
        });
      });
    };

    return QueriesObserver;
  }(Subscribable);

  var InfiniteQueryObserver = /*#__PURE__*/function (_QueryObserver) {
    _inheritsLoose(InfiniteQueryObserver, _QueryObserver);

    // Type override
    // Type override
    // Type override
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    function InfiniteQueryObserver(client, options) {
      return _QueryObserver.call(this, client, options) || this;
    }

    var _proto = InfiniteQueryObserver.prototype;

    _proto.bindMethods = function bindMethods() {
      _QueryObserver.prototype.bindMethods.call(this);

      this.fetchNextPage = this.fetchNextPage.bind(this);
      this.fetchPreviousPage = this.fetchPreviousPage.bind(this);
    };

    _proto.setOptions = function setOptions(options, notifyOptions) {
      _QueryObserver.prototype.setOptions.call(this, _extends({}, options, {
        behavior: infiniteQueryBehavior()
      }), notifyOptions);
    };

    _proto.getOptimisticResult = function getOptimisticResult(options) {
      options.behavior = infiniteQueryBehavior();
      return _QueryObserver.prototype.getOptimisticResult.call(this, options);
    };

    _proto.fetchNextPage = function fetchNextPage(options) {
      var _options$cancelRefetc;

      return this.fetch({
        // TODO consider removing `?? true` in future breaking change, to be consistent with `refetch` API (see https://github.com/tannerlinsley/react-query/issues/2617)
        cancelRefetch: (_options$cancelRefetc = options == null ? void 0 : options.cancelRefetch) != null ? _options$cancelRefetc : true,
        throwOnError: options == null ? void 0 : options.throwOnError,
        meta: {
          fetchMore: {
            direction: 'forward',
            pageParam: options == null ? void 0 : options.pageParam
          }
        }
      });
    };

    _proto.fetchPreviousPage = function fetchPreviousPage(options) {
      var _options$cancelRefetc2;

      return this.fetch({
        // TODO consider removing `?? true` in future breaking change, to be consistent with `refetch` API (see https://github.com/tannerlinsley/react-query/issues/2617)
        cancelRefetch: (_options$cancelRefetc2 = options == null ? void 0 : options.cancelRefetch) != null ? _options$cancelRefetc2 : true,
        throwOnError: options == null ? void 0 : options.throwOnError,
        meta: {
          fetchMore: {
            direction: 'backward',
            pageParam: options == null ? void 0 : options.pageParam
          }
        }
      });
    };

    _proto.createResult = function createResult(query, options) {
      var _state$data, _state$data2, _state$fetchMeta, _state$fetchMeta$fetc, _state$fetchMeta2, _state$fetchMeta2$fet;

      var state = query.state;

      var result = _QueryObserver.prototype.createResult.call(this, query, options);

      return _extends({}, result, {
        fetchNextPage: this.fetchNextPage,
        fetchPreviousPage: this.fetchPreviousPage,
        hasNextPage: hasNextPage(options, (_state$data = state.data) == null ? void 0 : _state$data.pages),
        hasPreviousPage: hasPreviousPage(options, (_state$data2 = state.data) == null ? void 0 : _state$data2.pages),
        isFetchingNextPage: state.isFetching && ((_state$fetchMeta = state.fetchMeta) == null ? void 0 : (_state$fetchMeta$fetc = _state$fetchMeta.fetchMore) == null ? void 0 : _state$fetchMeta$fetc.direction) === 'forward',
        isFetchingPreviousPage: state.isFetching && ((_state$fetchMeta2 = state.fetchMeta) == null ? void 0 : (_state$fetchMeta2$fet = _state$fetchMeta2.fetchMore) == null ? void 0 : _state$fetchMeta2$fet.direction) === 'backward'
      });
    };

    return InfiniteQueryObserver;
  }(QueryObserver);

  // CLASS
  var MutationObserver = /*#__PURE__*/function (_Subscribable) {
    _inheritsLoose(MutationObserver, _Subscribable);

    function MutationObserver(client, options) {
      var _this;

      _this = _Subscribable.call(this) || this;
      _this.client = client;

      _this.setOptions(options);

      _this.bindMethods();

      _this.updateResult();

      return _this;
    }

    var _proto = MutationObserver.prototype;

    _proto.bindMethods = function bindMethods() {
      this.mutate = this.mutate.bind(this);
      this.reset = this.reset.bind(this);
    };

    _proto.setOptions = function setOptions(options) {
      this.options = this.client.defaultMutationOptions(options);
    };

    _proto.onUnsubscribe = function onUnsubscribe() {
      if (!this.listeners.length) {
        var _this$currentMutation;

        (_this$currentMutation = this.currentMutation) == null ? void 0 : _this$currentMutation.removeObserver(this);
      }
    };

    _proto.onMutationUpdate = function onMutationUpdate(action) {
      this.updateResult(); // Determine which callbacks to trigger

      var notifyOptions = {
        listeners: true
      };

      if (action.type === 'success') {
        notifyOptions.onSuccess = true;
      } else if (action.type === 'error') {
        notifyOptions.onError = true;
      }

      this.notify(notifyOptions);
    };

    _proto.getCurrentResult = function getCurrentResult() {
      return this.currentResult;
    };

    _proto.reset = function reset() {
      this.currentMutation = undefined;
      this.updateResult();
      this.notify({
        listeners: true
      });
    };

    _proto.mutate = function mutate(variables, options) {
      this.mutateOptions = options;

      if (this.currentMutation) {
        this.currentMutation.removeObserver(this);
      }

      this.currentMutation = this.client.getMutationCache().build(this.client, _extends({}, this.options, {
        variables: typeof variables !== 'undefined' ? variables : this.options.variables
      }));
      this.currentMutation.addObserver(this);
      return this.currentMutation.execute();
    };

    _proto.updateResult = function updateResult() {
      var state = this.currentMutation ? this.currentMutation.state : getDefaultState();

      var result = _extends({}, state, {
        isLoading: state.status === 'loading',
        isSuccess: state.status === 'success',
        isError: state.status === 'error',
        isIdle: state.status === 'idle',
        mutate: this.mutate,
        reset: this.reset
      });

      this.currentResult = result;
    };

    _proto.notify = function notify(options) {
      var _this2 = this;

      notifyManager.batch(function () {
        // First trigger the mutate callbacks
        if (_this2.mutateOptions) {
          if (options.onSuccess) {
            _this2.mutateOptions.onSuccess == null ? void 0 : _this2.mutateOptions.onSuccess(_this2.currentResult.data, _this2.currentResult.variables, _this2.currentResult.context);
            _this2.mutateOptions.onSettled == null ? void 0 : _this2.mutateOptions.onSettled(_this2.currentResult.data, null, _this2.currentResult.variables, _this2.currentResult.context);
          } else if (options.onError) {
            _this2.mutateOptions.onError == null ? void 0 : _this2.mutateOptions.onError(_this2.currentResult.error, _this2.currentResult.variables, _this2.currentResult.context);
            _this2.mutateOptions.onSettled == null ? void 0 : _this2.mutateOptions.onSettled(undefined, _this2.currentResult.error, _this2.currentResult.variables, _this2.currentResult.context);
          }
        } // Then trigger the listeners


        if (options.listeners) {
          _this2.listeners.forEach(function (listener) {
            listener(_this2.currentResult);
          });
        }
      });
    };

    return MutationObserver;
  }(Subscribable);

  // TYPES
  // FUNCTIONS
  function dehydrateMutation(mutation) {
    return {
      mutationKey: mutation.options.mutationKey,
      state: mutation.state
    };
  } // Most config is not dehydrated but instead meant to configure again when
  // consuming the de/rehydrated data, typically with useQuery on the client.
  // Sometimes it might make sense to prefetch data on the server and include
  // in the html-payload, but not consume it on the initial render.


  function dehydrateQuery(query) {
    return {
      state: query.state,
      queryKey: query.queryKey,
      queryHash: query.queryHash
    };
  }

  function defaultShouldDehydrateMutation(mutation) {
    return mutation.state.isPaused;
  }

  function defaultShouldDehydrateQuery(query) {
    return query.state.status === 'success';
  }

  function dehydrate(client, options) {
    var _options, _options2;

    options = options || {};
    var mutations = [];
    var queries = [];

    if (((_options = options) == null ? void 0 : _options.dehydrateMutations) !== false) {
      var shouldDehydrateMutation = options.shouldDehydrateMutation || defaultShouldDehydrateMutation;
      client.getMutationCache().getAll().forEach(function (mutation) {
        if (shouldDehydrateMutation(mutation)) {
          mutations.push(dehydrateMutation(mutation));
        }
      });
    }

    if (((_options2 = options) == null ? void 0 : _options2.dehydrateQueries) !== false) {
      var shouldDehydrateQuery = options.shouldDehydrateQuery || defaultShouldDehydrateQuery;
      client.getQueryCache().getAll().forEach(function (query) {
        if (shouldDehydrateQuery(query)) {
          queries.push(dehydrateQuery(query));
        }
      });
    }

    return {
      mutations: mutations,
      queries: queries
    };
  }
  function hydrate(client, dehydratedState, options) {
    if (typeof dehydratedState !== 'object' || dehydratedState === null) {
      return;
    }

    var mutationCache = client.getMutationCache();
    var queryCache = client.getQueryCache();
    var mutations = dehydratedState.mutations || [];
    var queries = dehydratedState.queries || [];
    mutations.forEach(function (dehydratedMutation) {
      var _options$defaultOptio;

      mutationCache.build(client, _extends({}, options == null ? void 0 : (_options$defaultOptio = options.defaultOptions) == null ? void 0 : _options$defaultOptio.mutations, {
        mutationKey: dehydratedMutation.mutationKey
      }), dehydratedMutation.state);
    });
    queries.forEach(function (dehydratedQuery) {
      var _options$defaultOptio2;

      var query = queryCache.get(dehydratedQuery.queryHash); // Do not hydrate if an existing query exists with newer data

      if (query) {
        if (query.state.dataUpdatedAt < dehydratedQuery.state.dataUpdatedAt) {
          query.setState(dehydratedQuery.state);
        }

        return;
      } // Restore query


      queryCache.build(client, _extends({}, options == null ? void 0 : (_options$defaultOptio2 = options.defaultOptions) == null ? void 0 : _options$defaultOptio2.queries, {
        queryKey: dehydratedQuery.queryKey,
        queryHash: dehydratedQuery.queryHash
      }), dehydratedQuery.state);
    });
  }

  exports.CancelledError = CancelledError;
  exports.InfiniteQueryObserver = InfiniteQueryObserver;
  exports.MutationCache = MutationCache;
  exports.MutationObserver = MutationObserver;
  exports.QueriesObserver = QueriesObserver;
  exports.QueryCache = QueryCache;
  exports.QueryClient = QueryClient;
  exports.QueryObserver = QueryObserver;
  exports.dehydrate = dehydrate;
  exports.focusManager = focusManager;
  exports.hashQueryKey = hashQueryKey;
  exports.hydrate = hydrate;
  exports.isCancelledError = isCancelledError;
  exports.isError = isError;
  exports.notifyManager = notifyManager;
  exports.onlineManager = onlineManager;
  exports.setLogger = setLogger;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=react-query-core.development.js.map
