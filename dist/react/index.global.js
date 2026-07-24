"use strict";
var ScreenGuardLib = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/react/cjs/react.production.min.js
  var require_react_production_min = __commonJS({
    "node_modules/react/cjs/react.production.min.js"(exports) {
      "use strict";
      var l = /* @__PURE__ */ Symbol.for("react.element");
      var n = /* @__PURE__ */ Symbol.for("react.portal");
      var p = /* @__PURE__ */ Symbol.for("react.fragment");
      var q = /* @__PURE__ */ Symbol.for("react.strict_mode");
      var r = /* @__PURE__ */ Symbol.for("react.profiler");
      var t = /* @__PURE__ */ Symbol.for("react.provider");
      var u = /* @__PURE__ */ Symbol.for("react.context");
      var v = /* @__PURE__ */ Symbol.for("react.forward_ref");
      var w = /* @__PURE__ */ Symbol.for("react.suspense");
      var x = /* @__PURE__ */ Symbol.for("react.memo");
      var y = /* @__PURE__ */ Symbol.for("react.lazy");
      var z = Symbol.iterator;
      function A(a) {
        if (null === a || "object" !== typeof a) return null;
        a = z && a[z] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      var B = { isMounted: function() {
        return false;
      }, enqueueForceUpdate: function() {
      }, enqueueReplaceState: function() {
      }, enqueueSetState: function() {
      } };
      var C = Object.assign;
      var D = {};
      function E(a, b, e) {
        this.props = a;
        this.context = b;
        this.refs = D;
        this.updater = e || B;
      }
      E.prototype.isReactComponent = {};
      E.prototype.setState = function(a, b) {
        if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, a, b, "setState");
      };
      E.prototype.forceUpdate = function(a) {
        this.updater.enqueueForceUpdate(this, a, "forceUpdate");
      };
      function F() {
      }
      F.prototype = E.prototype;
      function G(a, b, e) {
        this.props = a;
        this.context = b;
        this.refs = D;
        this.updater = e || B;
      }
      var H = G.prototype = new F();
      H.constructor = G;
      C(H, E.prototype);
      H.isPureReactComponent = true;
      var I = Array.isArray;
      var J = Object.prototype.hasOwnProperty;
      var K = { current: null };
      var L = { key: true, ref: true, __self: true, __source: true };
      function M(a, b, e) {
        var d, c = {}, k = null, h = null;
        if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
        var g = arguments.length - 2;
        if (1 === g) c.children = e;
        else if (1 < g) {
          for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
          c.children = f;
        }
        if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
        return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };
      }
      function N(a, b) {
        return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
      }
      function O(a) {
        return "object" === typeof a && null !== a && a.$$typeof === l;
      }
      function escape(a) {
        var b = { "=": "=0", ":": "=2" };
        return "$" + a.replace(/[=:]/g, function(a2) {
          return b[a2];
        });
      }
      var P = /\/+/g;
      function Q(a, b) {
        return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
      }
      function R(a, b, e, d, c) {
        var k = typeof a;
        if ("undefined" === k || "boolean" === k) a = null;
        var h = false;
        if (null === a) h = true;
        else switch (k) {
          case "string":
          case "number":
            h = true;
            break;
          case "object":
            switch (a.$$typeof) {
              case l:
              case n:
                h = true;
            }
        }
        if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
          return a2;
        })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
        h = 0;
        d = "" === d ? "." : d + ":";
        if (I(a)) for (var g = 0; g < a.length; g++) {
          k = a[g];
          var f = d + Q(k, g);
          h += R(k, b, e, f, c);
        }
        else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done; ) k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
        else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
        return h;
      }
      function S(a, b, e) {
        if (null == a) return a;
        var d = [], c = 0;
        R(a, d, "", "", function(a2) {
          return b.call(e, a2, c++);
        });
        return d;
      }
      function T(a) {
        if (-1 === a._status) {
          var b = a._result;
          b = b();
          b.then(function(b2) {
            if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
          }, function(b2) {
            if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
          });
          -1 === a._status && (a._status = 0, a._result = b);
        }
        if (1 === a._status) return a._result.default;
        throw a._result;
      }
      var U = { current: null };
      var V = { transition: null };
      var W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
      function X() {
        throw Error("act(...) is not supported in production builds of React.");
      }
      exports.Children = { map: S, forEach: function(a, b, e) {
        S(a, function() {
          b.apply(this, arguments);
        }, e);
      }, count: function(a) {
        var b = 0;
        S(a, function() {
          b++;
        });
        return b;
      }, toArray: function(a) {
        return S(a, function(a2) {
          return a2;
        }) || [];
      }, only: function(a) {
        if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
        return a;
      } };
      exports.Component = E;
      exports.Fragment = p;
      exports.Profiler = r;
      exports.PureComponent = G;
      exports.StrictMode = q;
      exports.Suspense = w;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
      exports.act = X;
      exports.cloneElement = function(a, b, e) {
        if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
        var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
        if (null != b) {
          void 0 !== b.ref && (k = b.ref, h = K.current);
          void 0 !== b.key && (c = "" + b.key);
          if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
          for (f in b) J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
        }
        var f = arguments.length - 2;
        if (1 === f) d.children = e;
        else if (1 < f) {
          g = Array(f);
          for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
          d.children = g;
        }
        return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
      };
      exports.createContext = function(a) {
        a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
        a.Provider = { $$typeof: t, _context: a };
        return a.Consumer = a;
      };
      exports.createElement = M;
      exports.createFactory = function(a) {
        var b = M.bind(null, a);
        b.type = a;
        return b;
      };
      exports.createRef = function() {
        return { current: null };
      };
      exports.forwardRef = function(a) {
        return { $$typeof: v, render: a };
      };
      exports.isValidElement = O;
      exports.lazy = function(a) {
        return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
      };
      exports.memo = function(a, b) {
        return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
      };
      exports.startTransition = function(a) {
        var b = V.transition;
        V.transition = {};
        try {
          a();
        } finally {
          V.transition = b;
        }
      };
      exports.unstable_act = X;
      exports.useCallback = function(a, b) {
        return U.current.useCallback(a, b);
      };
      exports.useContext = function(a) {
        return U.current.useContext(a);
      };
      exports.useDebugValue = function() {
      };
      exports.useDeferredValue = function(a) {
        return U.current.useDeferredValue(a);
      };
      exports.useEffect = function(a, b) {
        return U.current.useEffect(a, b);
      };
      exports.useId = function() {
        return U.current.useId();
      };
      exports.useImperativeHandle = function(a, b, e) {
        return U.current.useImperativeHandle(a, b, e);
      };
      exports.useInsertionEffect = function(a, b) {
        return U.current.useInsertionEffect(a, b);
      };
      exports.useLayoutEffect = function(a, b) {
        return U.current.useLayoutEffect(a, b);
      };
      exports.useMemo = function(a, b) {
        return U.current.useMemo(a, b);
      };
      exports.useReducer = function(a, b, e) {
        return U.current.useReducer(a, b, e);
      };
      exports.useRef = function(a) {
        return U.current.useRef(a);
      };
      exports.useState = function(a) {
        return U.current.useState(a);
      };
      exports.useSyncExternalStore = function(a, b, e) {
        return U.current.useSyncExternalStore(a, b, e);
      };
      exports.useTransition = function() {
        return U.current.useTransition();
      };
      exports.version = "18.3.1";
    }
  });

  // node_modules/react/cjs/react.development.js
  var require_react_development = __commonJS({
    "node_modules/react/cjs/react.development.js"(exports, module) {
      "use strict";
      if (process.env.NODE_ENV !== "production") {
        (function() {
          "use strict";
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
          }
          var ReactVersion = "18.3.1";
          var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.element");
          var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
          var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
          var REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode");
          var REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler");
          var REACT_PROVIDER_TYPE = /* @__PURE__ */ Symbol.for("react.provider");
          var REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context");
          var REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref");
          var REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense");
          var REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list");
          var REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo");
          var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
          var REACT_OFFSCREEN_TYPE = /* @__PURE__ */ Symbol.for("react.offscreen");
          var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = "@@iterator";
          function getIteratorFn(maybeIterable) {
            if (maybeIterable === null || typeof maybeIterable !== "object") {
              return null;
            }
            var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
            if (typeof maybeIterator === "function") {
              return maybeIterator;
            }
            return null;
          }
          var ReactCurrentDispatcher = {
            /**
             * @internal
             * @type {ReactComponent}
             */
            current: null
          };
          var ReactCurrentBatchConfig = {
            transition: null
          };
          var ReactCurrentActQueue = {
            current: null,
            // Used to reproduce behavior of `batchedUpdates` in legacy mode.
            isBatchingLegacy: false,
            didScheduleLegacyUpdate: false
          };
          var ReactCurrentOwner = {
            /**
             * @internal
             * @type {ReactComponent}
             */
            current: null
          };
          var ReactDebugCurrentFrame = {};
          var currentExtraStackFrame = null;
          function setExtraStackFrame(stack) {
            {
              currentExtraStackFrame = stack;
            }
          }
          {
            ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
              {
                currentExtraStackFrame = stack;
              }
            };
            ReactDebugCurrentFrame.getCurrentStack = null;
            ReactDebugCurrentFrame.getStackAddendum = function() {
              var stack = "";
              if (currentExtraStackFrame) {
                stack += currentExtraStackFrame;
              }
              var impl = ReactDebugCurrentFrame.getCurrentStack;
              if (impl) {
                stack += impl() || "";
              }
              return stack;
            };
          }
          var enableScopeAPI = false;
          var enableCacheElement = false;
          var enableTransitionTracing = false;
          var enableLegacyHidden = false;
          var enableDebugTracing = false;
          var ReactSharedInternals = {
            ReactCurrentDispatcher,
            ReactCurrentBatchConfig,
            ReactCurrentOwner
          };
          {
            ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
            ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
          }
          function warn(format) {
            {
              {
                for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = arguments[_key];
                }
                printWarning("warn", format, args);
              }
            }
          }
          function error(format) {
            {
              {
                for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = arguments[_key2];
                }
                printWarning("error", format, args);
              }
            }
          }
          function printWarning(level, format, args) {
            {
              var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame2.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
              var argsWithFormat = args.map(function(item) {
                return String(item);
              });
              argsWithFormat.unshift("Warning: " + format);
              Function.prototype.apply.call(console[level], console, argsWithFormat);
            }
          }
          var didWarnStateUpdateForUnmountedComponent = {};
          function warnNoop(publicInstance, callerName) {
            {
              var _constructor = publicInstance.constructor;
              var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
              var warningKey = componentName + "." + callerName;
              if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
                return;
              }
              error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
              didWarnStateUpdateForUnmountedComponent[warningKey] = true;
            }
          }
          var ReactNoopUpdateQueue = {
            /**
             * Checks whether or not this composite component is mounted.
             * @param {ReactClass} publicInstance The instance we want to test.
             * @return {boolean} True if mounted, false otherwise.
             * @protected
             * @final
             */
            isMounted: function(publicInstance) {
              return false;
            },
            /**
             * Forces an update. This should only be invoked when it is known with
             * certainty that we are **not** in a DOM transaction.
             *
             * You may want to call this when you know that some deeper aspect of the
             * component's state has changed but `setState` was not called.
             *
             * This will not invoke `shouldComponentUpdate`, but it will invoke
             * `componentWillUpdate` and `componentDidUpdate`.
             *
             * @param {ReactClass} publicInstance The instance that should rerender.
             * @param {?function} callback Called after component is updated.
             * @param {?string} callerName name of the calling function in the public API.
             * @internal
             */
            enqueueForceUpdate: function(publicInstance, callback, callerName) {
              warnNoop(publicInstance, "forceUpdate");
            },
            /**
             * Replaces all of the state. Always use this or `setState` to mutate state.
             * You should treat `this.state` as immutable.
             *
             * There is no guarantee that `this.state` will be immediately updated, so
             * accessing `this.state` after calling this method may return the old value.
             *
             * @param {ReactClass} publicInstance The instance that should rerender.
             * @param {object} completeState Next state.
             * @param {?function} callback Called after component is updated.
             * @param {?string} callerName name of the calling function in the public API.
             * @internal
             */
            enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
              warnNoop(publicInstance, "replaceState");
            },
            /**
             * Sets a subset of the state. This only exists because _pendingState is
             * internal. This provides a merging strategy that is not available to deep
             * properties which is confusing. TODO: Expose pendingState or don't use it
             * during the merge.
             *
             * @param {ReactClass} publicInstance The instance that should rerender.
             * @param {object} partialState Next partial state to be merged with state.
             * @param {?function} callback Called after component is updated.
             * @param {?string} Name of the calling function in the public API.
             * @internal
             */
            enqueueSetState: function(publicInstance, partialState, callback, callerName) {
              warnNoop(publicInstance, "setState");
            }
          };
          var assign = Object.assign;
          var emptyObject = {};
          {
            Object.freeze(emptyObject);
          }
          function Component(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          Component.prototype.isReactComponent = {};
          Component.prototype.setState = function(partialState, callback) {
            if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null) {
              throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
            }
            this.updater.enqueueSetState(this, partialState, callback, "setState");
          };
          Component.prototype.forceUpdate = function(callback) {
            this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
          };
          {
            var deprecatedAPIs = {
              isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
              replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
            };
            var defineDeprecationWarning = function(methodName, info) {
              Object.defineProperty(Component.prototype, methodName, {
                get: function() {
                  warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
                  return void 0;
                }
              });
            };
            for (var fnName in deprecatedAPIs) {
              if (deprecatedAPIs.hasOwnProperty(fnName)) {
                defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
              }
            }
          }
          function ComponentDummy() {
          }
          ComponentDummy.prototype = Component.prototype;
          function PureComponent(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
          pureComponentPrototype.constructor = PureComponent;
          assign(pureComponentPrototype, Component.prototype);
          pureComponentPrototype.isPureReactComponent = true;
          function createRef() {
            var refObject = {
              current: null
            };
            {
              Object.seal(refObject);
            }
            return refObject;
          }
          var isArrayImpl = Array.isArray;
          function isArray(a) {
            return isArrayImpl(a);
          }
          function typeName(value) {
            {
              var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
              var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
              return type;
            }
          }
          function willCoercionThrow(value) {
            {
              try {
                testStringCoercion(value);
                return false;
              } catch (e) {
                return true;
              }
            }
          }
          function testStringCoercion(value) {
            return "" + value;
          }
          function checkKeyStringCoercion(value) {
            {
              if (willCoercionThrow(value)) {
                error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          function getWrappedName(outerType, innerType, wrapperName) {
            var displayName = outerType.displayName;
            if (displayName) {
              return displayName;
            }
            var functionName = innerType.displayName || innerType.name || "";
            return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
          }
          function getContextName(type) {
            return type.displayName || "Context";
          }
          function getComponentNameFromType(type) {
            if (type == null) {
              return null;
            }
            {
              if (typeof type.tag === "number") {
                error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
              }
            }
            if (typeof type === "function") {
              return type.displayName || type.name || null;
            }
            if (typeof type === "string") {
              return type;
            }
            switch (type) {
              case REACT_FRAGMENT_TYPE:
                return "Fragment";
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_PROFILER_TYPE:
                return "Profiler";
              case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
              case REACT_SUSPENSE_TYPE:
                return "Suspense";
              case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_CONTEXT_TYPE:
                  var context = type;
                  return getContextName(context) + ".Consumer";
                case REACT_PROVIDER_TYPE:
                  var provider = type;
                  return getContextName(provider._context) + ".Provider";
                case REACT_FORWARD_REF_TYPE:
                  return getWrappedName(type, type.render, "ForwardRef");
                case REACT_MEMO_TYPE:
                  var outerName = type.displayName || null;
                  if (outerName !== null) {
                    return outerName;
                  }
                  return getComponentNameFromType(type.type) || "Memo";
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return getComponentNameFromType(init(payload));
                  } catch (x) {
                    return null;
                  }
                }
              }
            }
            return null;
          }
          var hasOwnProperty = Object.prototype.hasOwnProperty;
          var RESERVED_PROPS = {
            key: true,
            ref: true,
            __self: true,
            __source: true
          };
          var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
          {
            didWarnAboutStringRefs = {};
          }
          function hasValidRef(config) {
            {
              if (hasOwnProperty.call(config, "ref")) {
                var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.ref !== void 0;
          }
          function hasValidKey(config) {
            {
              if (hasOwnProperty.call(config, "key")) {
                var getter = Object.getOwnPropertyDescriptor(config, "key").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.key !== void 0;
          }
          function defineKeyPropWarningGetter(props, displayName) {
            var warnAboutAccessingKey = function() {
              {
                if (!specialPropKeyWarningShown) {
                  specialPropKeyWarningShown = true;
                  error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
          function defineRefPropWarningGetter(props, displayName) {
            var warnAboutAccessingRef = function() {
              {
                if (!specialPropRefWarningShown) {
                  specialPropRefWarningShown = true;
                  error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
          function warnIfStringRefCannotBeAutoConverted(config) {
            {
              if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
                var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
                if (!didWarnAboutStringRefs[componentName]) {
                  error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
                  didWarnAboutStringRefs[componentName] = true;
                }
              }
            }
          }
          var ReactElement = function(type, key, ref, self2, source, owner, props) {
            var element = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: REACT_ELEMENT_TYPE,
              // Built-in properties that belong on the element
              type,
              key,
              ref,
              props,
              // Record the component responsible for creating this element.
              _owner: owner
            };
            {
              element._store = {};
              Object.defineProperty(element._store, "validated", {
                configurable: false,
                enumerable: false,
                writable: true,
                value: false
              });
              Object.defineProperty(element, "_self", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: self2
              });
              Object.defineProperty(element, "_source", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: source
              });
              if (Object.freeze) {
                Object.freeze(element.props);
                Object.freeze(element);
              }
            }
            return element;
          };
          function createElement(type, config, children) {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            var self2 = null;
            var source = null;
            if (config != null) {
              if (hasValidRef(config)) {
                ref = config.ref;
                {
                  warnIfStringRefCannotBeAutoConverted(config);
                }
              }
              if (hasValidKey(config)) {
                {
                  checkKeyStringCoercion(config.key);
                }
                key = "" + config.key;
              }
              self2 = config.__self === void 0 ? null : config.__self;
              source = config.__source === void 0 ? null : config.__source;
              for (propName in config) {
                if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  props[propName] = config[propName];
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i = 0; i < childrenLength; i++) {
                childArray[i] = arguments[i + 2];
              }
              {
                if (Object.freeze) {
                  Object.freeze(childArray);
                }
              }
              props.children = childArray;
            }
            if (type && type.defaultProps) {
              var defaultProps = type.defaultProps;
              for (propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
            }
            {
              if (key || ref) {
                var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
                if (key) {
                  defineKeyPropWarningGetter(props, displayName);
                }
                if (ref) {
                  defineRefPropWarningGetter(props, displayName);
                }
              }
            }
            return ReactElement(type, key, ref, self2, source, ReactCurrentOwner.current, props);
          }
          function cloneAndReplaceKey(oldElement, newKey) {
            var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
            return newElement;
          }
          function cloneElement(element, config, children) {
            if (element === null || element === void 0) {
              throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
            }
            var propName;
            var props = assign({}, element.props);
            var key = element.key;
            var ref = element.ref;
            var self2 = element._self;
            var source = element._source;
            var owner = element._owner;
            if (config != null) {
              if (hasValidRef(config)) {
                ref = config.ref;
                owner = ReactCurrentOwner.current;
              }
              if (hasValidKey(config)) {
                {
                  checkKeyStringCoercion(config.key);
                }
                key = "" + config.key;
              }
              var defaultProps;
              if (element.type && element.type.defaultProps) {
                defaultProps = element.type.defaultProps;
              }
              for (propName in config) {
                if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  if (config[propName] === void 0 && defaultProps !== void 0) {
                    props[propName] = defaultProps[propName];
                  } else {
                    props[propName] = config[propName];
                  }
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i = 0; i < childrenLength; i++) {
                childArray[i] = arguments[i + 2];
              }
              props.children = childArray;
            }
            return ReactElement(element.type, key, ref, self2, source, owner, props);
          }
          function isValidElement(object) {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
          var SEPARATOR = ".";
          var SUBSEPARATOR = ":";
          function escape(key) {
            var escapeRegex = /[=:]/g;
            var escaperLookup = {
              "=": "=0",
              ":": "=2"
            };
            var escapedString = key.replace(escapeRegex, function(match) {
              return escaperLookup[match];
            });
            return "$" + escapedString;
          }
          var didWarnAboutMaps = false;
          var userProvidedKeyEscapeRegex = /\/+/g;
          function escapeUserProvidedKey(text) {
            return text.replace(userProvidedKeyEscapeRegex, "$&/");
          }
          function getElementKey(element, index) {
            if (typeof element === "object" && element !== null && element.key != null) {
              {
                checkKeyStringCoercion(element.key);
              }
              return escape("" + element.key);
            }
            return index.toString(36);
          }
          function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
            var type = typeof children;
            if (type === "undefined" || type === "boolean") {
              children = null;
            }
            var invokeCallback = false;
            if (children === null) {
              invokeCallback = true;
            } else {
              switch (type) {
                case "string":
                case "number":
                  invokeCallback = true;
                  break;
                case "object":
                  switch (children.$$typeof) {
                    case REACT_ELEMENT_TYPE:
                    case REACT_PORTAL_TYPE:
                      invokeCallback = true;
                  }
              }
            }
            if (invokeCallback) {
              var _child = children;
              var mappedChild = callback(_child);
              var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
              if (isArray(mappedChild)) {
                var escapedChildKey = "";
                if (childKey != null) {
                  escapedChildKey = escapeUserProvidedKey(childKey) + "/";
                }
                mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
                  return c;
                });
              } else if (mappedChild != null) {
                if (isValidElement(mappedChild)) {
                  {
                    if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
                      checkKeyStringCoercion(mappedChild.key);
                    }
                  }
                  mappedChild = cloneAndReplaceKey(
                    mappedChild,
                    // Keep both the (mapped) and old keys if they differ, just as
                    // traverseAllChildren used to do for objects as children
                    escapedPrefix + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
                    (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? (
                      // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                      // eslint-disable-next-line react-internal/safe-string-coercion
                      escapeUserProvidedKey("" + mappedChild.key) + "/"
                    ) : "") + childKey
                  );
                }
                array.push(mappedChild);
              }
              return 1;
            }
            var child;
            var nextName;
            var subtreeCount = 0;
            var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
            if (isArray(children)) {
              for (var i = 0; i < children.length; i++) {
                child = children[i];
                nextName = nextNamePrefix + getElementKey(child, i);
                subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
              }
            } else {
              var iteratorFn = getIteratorFn(children);
              if (typeof iteratorFn === "function") {
                var iterableChildren = children;
                {
                  if (iteratorFn === iterableChildren.entries) {
                    if (!didWarnAboutMaps) {
                      warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                    }
                    didWarnAboutMaps = true;
                  }
                }
                var iterator = iteratorFn.call(iterableChildren);
                var step;
                var ii = 0;
                while (!(step = iterator.next()).done) {
                  child = step.value;
                  nextName = nextNamePrefix + getElementKey(child, ii++);
                  subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
                }
              } else if (type === "object") {
                var childrenString = String(children);
                throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
              }
            }
            return subtreeCount;
          }
          function mapChildren(children, func, context) {
            if (children == null) {
              return children;
            }
            var result = [];
            var count = 0;
            mapIntoArray(children, result, "", "", function(child) {
              return func.call(context, child, count++);
            });
            return result;
          }
          function countChildren(children) {
            var n = 0;
            mapChildren(children, function() {
              n++;
            });
            return n;
          }
          function forEachChildren(children, forEachFunc, forEachContext) {
            mapChildren(children, function() {
              forEachFunc.apply(this, arguments);
            }, forEachContext);
          }
          function toArray(children) {
            return mapChildren(children, function(child) {
              return child;
            }) || [];
          }
          function onlyChild(children) {
            if (!isValidElement(children)) {
              throw new Error("React.Children.only expected to receive a single React element child.");
            }
            return children;
          }
          function createContext(defaultValue) {
            var context = {
              $$typeof: REACT_CONTEXT_TYPE,
              // As a workaround to support multiple concurrent renderers, we categorize
              // some renderers as primary and others as secondary. We only expect
              // there to be two concurrent renderers at most: React Native (primary) and
              // Fabric (secondary); React DOM (primary) and React ART (secondary).
              // Secondary renderers store their context values on separate fields.
              _currentValue: defaultValue,
              _currentValue2: defaultValue,
              // Used to track how many concurrent renderers this context currently
              // supports within in a single renderer. Such as parallel server rendering.
              _threadCount: 0,
              // These are circular
              Provider: null,
              Consumer: null,
              // Add these to use same hidden class in VM as ServerContext
              _defaultValue: null,
              _globalName: null
            };
            context.Provider = {
              $$typeof: REACT_PROVIDER_TYPE,
              _context: context
            };
            var hasWarnedAboutUsingNestedContextConsumers = false;
            var hasWarnedAboutUsingConsumerProvider = false;
            var hasWarnedAboutDisplayNameOnConsumer = false;
            {
              var Consumer = {
                $$typeof: REACT_CONTEXT_TYPE,
                _context: context
              };
              Object.defineProperties(Consumer, {
                Provider: {
                  get: function() {
                    if (!hasWarnedAboutUsingConsumerProvider) {
                      hasWarnedAboutUsingConsumerProvider = true;
                      error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                    }
                    return context.Provider;
                  },
                  set: function(_Provider) {
                    context.Provider = _Provider;
                  }
                },
                _currentValue: {
                  get: function() {
                    return context._currentValue;
                  },
                  set: function(_currentValue) {
                    context._currentValue = _currentValue;
                  }
                },
                _currentValue2: {
                  get: function() {
                    return context._currentValue2;
                  },
                  set: function(_currentValue2) {
                    context._currentValue2 = _currentValue2;
                  }
                },
                _threadCount: {
                  get: function() {
                    return context._threadCount;
                  },
                  set: function(_threadCount) {
                    context._threadCount = _threadCount;
                  }
                },
                Consumer: {
                  get: function() {
                    if (!hasWarnedAboutUsingNestedContextConsumers) {
                      hasWarnedAboutUsingNestedContextConsumers = true;
                      error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                    }
                    return context.Consumer;
                  }
                },
                displayName: {
                  get: function() {
                    return context.displayName;
                  },
                  set: function(displayName) {
                    if (!hasWarnedAboutDisplayNameOnConsumer) {
                      warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                      hasWarnedAboutDisplayNameOnConsumer = true;
                    }
                  }
                }
              });
              context.Consumer = Consumer;
            }
            {
              context._currentRenderer = null;
              context._currentRenderer2 = null;
            }
            return context;
          }
          var Uninitialized = -1;
          var Pending = 0;
          var Resolved = 1;
          var Rejected = 2;
          function lazyInitializer(payload) {
            if (payload._status === Uninitialized) {
              var ctor = payload._result;
              var thenable = ctor();
              thenable.then(function(moduleObject2) {
                if (payload._status === Pending || payload._status === Uninitialized) {
                  var resolved = payload;
                  resolved._status = Resolved;
                  resolved._result = moduleObject2;
                }
              }, function(error2) {
                if (payload._status === Pending || payload._status === Uninitialized) {
                  var rejected = payload;
                  rejected._status = Rejected;
                  rejected._result = error2;
                }
              });
              if (payload._status === Uninitialized) {
                var pending = payload;
                pending._status = Pending;
                pending._result = thenable;
              }
            }
            if (payload._status === Resolved) {
              var moduleObject = payload._result;
              {
                if (moduleObject === void 0) {
                  error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", moduleObject);
                }
              }
              {
                if (!("default" in moduleObject)) {
                  error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
                }
              }
              return moduleObject.default;
            } else {
              throw payload._result;
            }
          }
          function lazy(ctor) {
            var payload = {
              // We use these fields to store the result.
              _status: Uninitialized,
              _result: ctor
            };
            var lazyType = {
              $$typeof: REACT_LAZY_TYPE,
              _payload: payload,
              _init: lazyInitializer
            };
            {
              var defaultProps;
              var propTypes;
              Object.defineProperties(lazyType, {
                defaultProps: {
                  configurable: true,
                  get: function() {
                    return defaultProps;
                  },
                  set: function(newDefaultProps) {
                    error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    defaultProps = newDefaultProps;
                    Object.defineProperty(lazyType, "defaultProps", {
                      enumerable: true
                    });
                  }
                },
                propTypes: {
                  configurable: true,
                  get: function() {
                    return propTypes;
                  },
                  set: function(newPropTypes) {
                    error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    propTypes = newPropTypes;
                    Object.defineProperty(lazyType, "propTypes", {
                      enumerable: true
                    });
                  }
                }
              });
            }
            return lazyType;
          }
          function forwardRef(render) {
            {
              if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
                error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
              } else if (typeof render !== "function") {
                error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
              } else {
                if (render.length !== 0 && render.length !== 2) {
                  error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
                }
              }
              if (render != null) {
                if (render.defaultProps != null || render.propTypes != null) {
                  error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
                }
              }
            }
            var elementType = {
              $$typeof: REACT_FORWARD_REF_TYPE,
              render
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  if (!render.name && !render.displayName) {
                    render.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          var REACT_MODULE_REFERENCE;
          {
            REACT_MODULE_REFERENCE = /* @__PURE__ */ Symbol.for("react.module.reference");
          }
          function isValidElementType(type) {
            if (typeof type === "string" || typeof type === "function") {
              return true;
            }
            if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
              return true;
            }
            if (typeof type === "object" && type !== null) {
              if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
              // types supported by any Flight configuration anywhere since
              // we don't know which Flight build this will end up being used
              // with.
              type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
                return true;
              }
            }
            return false;
          }
          function memo(type, compare) {
            {
              if (!isValidElementType(type)) {
                error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
              }
            }
            var elementType = {
              $$typeof: REACT_MEMO_TYPE,
              type,
              compare: compare === void 0 ? null : compare
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  if (!type.name && !type.displayName) {
                    type.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          function resolveDispatcher() {
            var dispatcher = ReactCurrentDispatcher.current;
            {
              if (dispatcher === null) {
                error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
              }
            }
            return dispatcher;
          }
          function useContext(Context) {
            var dispatcher = resolveDispatcher();
            {
              if (Context._context !== void 0) {
                var realContext = Context._context;
                if (realContext.Consumer === Context) {
                  error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
                } else if (realContext.Provider === Context) {
                  error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
                }
              }
            }
            return dispatcher.useContext(Context);
          }
          function useState2(initialState) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useState(initialState);
          }
          function useReducer(reducer, initialArg, init) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useReducer(reducer, initialArg, init);
          }
          function useRef2(initialValue) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useRef(initialValue);
          }
          function useEffect2(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useEffect(create, deps);
          }
          function useInsertionEffect(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useInsertionEffect(create, deps);
          }
          function useLayoutEffect(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useLayoutEffect(create, deps);
          }
          function useCallback2(callback, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useCallback(callback, deps);
          }
          function useMemo(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useMemo(create, deps);
          }
          function useImperativeHandle(ref, create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useImperativeHandle(ref, create, deps);
          }
          function useDebugValue(value, formatterFn) {
            {
              var dispatcher = resolveDispatcher();
              return dispatcher.useDebugValue(value, formatterFn);
            }
          }
          function useTransition() {
            var dispatcher = resolveDispatcher();
            return dispatcher.useTransition();
          }
          function useDeferredValue(value) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useDeferredValue(value);
          }
          function useId() {
            var dispatcher = resolveDispatcher();
            return dispatcher.useId();
          }
          function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
          }
          var disabledDepth = 0;
          var prevLog;
          var prevInfo;
          var prevWarn;
          var prevError;
          var prevGroup;
          var prevGroupCollapsed;
          var prevGroupEnd;
          function disabledLog() {
          }
          disabledLog.__reactDisabledLog = true;
          function disableLogs() {
            {
              if (disabledDepth === 0) {
                prevLog = console.log;
                prevInfo = console.info;
                prevWarn = console.warn;
                prevError = console.error;
                prevGroup = console.group;
                prevGroupCollapsed = console.groupCollapsed;
                prevGroupEnd = console.groupEnd;
                var props = {
                  configurable: true,
                  enumerable: true,
                  value: disabledLog,
                  writable: true
                };
                Object.defineProperties(console, {
                  info: props,
                  log: props,
                  warn: props,
                  error: props,
                  group: props,
                  groupCollapsed: props,
                  groupEnd: props
                });
              }
              disabledDepth++;
            }
          }
          function reenableLogs() {
            {
              disabledDepth--;
              if (disabledDepth === 0) {
                var props = {
                  configurable: true,
                  enumerable: true,
                  writable: true
                };
                Object.defineProperties(console, {
                  log: assign({}, props, {
                    value: prevLog
                  }),
                  info: assign({}, props, {
                    value: prevInfo
                  }),
                  warn: assign({}, props, {
                    value: prevWarn
                  }),
                  error: assign({}, props, {
                    value: prevError
                  }),
                  group: assign({}, props, {
                    value: prevGroup
                  }),
                  groupCollapsed: assign({}, props, {
                    value: prevGroupCollapsed
                  }),
                  groupEnd: assign({}, props, {
                    value: prevGroupEnd
                  })
                });
              }
              if (disabledDepth < 0) {
                error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
              }
            }
          }
          var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
          var prefix;
          function describeBuiltInComponentFrame(name, source, ownerFn) {
            {
              if (prefix === void 0) {
                try {
                  throw Error();
                } catch (x) {
                  var match = x.stack.trim().match(/\n( *(at )?)/);
                  prefix = match && match[1] || "";
                }
              }
              return "\n" + prefix + name;
            }
          }
          var reentry = false;
          var componentFrameCache;
          {
            var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
            componentFrameCache = new PossiblyWeakMap();
          }
          function describeNativeComponentFrame(fn, construct) {
            if (!fn || reentry) {
              return "";
            }
            {
              var frame = componentFrameCache.get(fn);
              if (frame !== void 0) {
                return frame;
              }
            }
            var control;
            reentry = true;
            var previousPrepareStackTrace = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var previousDispatcher;
            {
              previousDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = null;
              disableLogs();
            }
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x) {
                    control = x;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x) {
                  control = x;
                }
                fn();
              }
            } catch (sample) {
              if (sample && control && typeof sample.stack === "string") {
                var sampleLines = sample.stack.split("\n");
                var controlLines = control.stack.split("\n");
                var s = sampleLines.length - 1;
                var c = controlLines.length - 1;
                while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                  c--;
                }
                for (; s >= 1 && c >= 0; s--, c--) {
                  if (sampleLines[s] !== controlLines[c]) {
                    if (s !== 1 || c !== 1) {
                      do {
                        s--;
                        c--;
                        if (c < 0 || sampleLines[s] !== controlLines[c]) {
                          var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                          if (fn.displayName && _frame.includes("<anonymous>")) {
                            _frame = _frame.replace("<anonymous>", fn.displayName);
                          }
                          {
                            if (typeof fn === "function") {
                              componentFrameCache.set(fn, _frame);
                            }
                          }
                          return _frame;
                        }
                      } while (s >= 1 && c >= 0);
                    }
                    break;
                  }
                }
              }
            } finally {
              reentry = false;
              {
                ReactCurrentDispatcher$1.current = previousDispatcher;
                reenableLogs();
              }
              Error.prepareStackTrace = previousPrepareStackTrace;
            }
            var name = fn ? fn.displayName || fn.name : "";
            var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
            {
              if (typeof fn === "function") {
                componentFrameCache.set(fn, syntheticFrame);
              }
            }
            return syntheticFrame;
          }
          function describeFunctionComponentFrame(fn, source, ownerFn) {
            {
              return describeNativeComponentFrame(fn, false);
            }
          }
          function shouldConstruct(Component2) {
            var prototype = Component2.prototype;
            return !!(prototype && prototype.isReactComponent);
          }
          function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
            if (type == null) {
              return "";
            }
            if (typeof type === "function") {
              {
                return describeNativeComponentFrame(type, shouldConstruct(type));
              }
            }
            if (typeof type === "string") {
              return describeBuiltInComponentFrame(type);
            }
            switch (type) {
              case REACT_SUSPENSE_TYPE:
                return describeBuiltInComponentFrame("Suspense");
              case REACT_SUSPENSE_LIST_TYPE:
                return describeBuiltInComponentFrame("SuspenseList");
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE:
                  return describeFunctionComponentFrame(type.render);
                case REACT_MEMO_TYPE:
                  return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                  } catch (x) {
                  }
                }
              }
            }
            return "";
          }
          var loggedTypeFailures = {};
          var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
          function setCurrentlyValidatingElement(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
              } else {
                ReactDebugCurrentFrame$1.setExtraStackFrame(null);
              }
            }
          }
          function checkPropTypes(typeSpecs, values, location, componentName, element) {
            {
              var has = Function.call.bind(hasOwnProperty);
              for (var typeSpecName in typeSpecs) {
                if (has(typeSpecs, typeSpecName)) {
                  var error$1 = void 0;
                  try {
                    if (typeof typeSpecs[typeSpecName] !== "function") {
                      var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                      err.name = "Invariant Violation";
                      throw err;
                    }
                    error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                  } catch (ex) {
                    error$1 = ex;
                  }
                  if (error$1 && !(error$1 instanceof Error)) {
                    setCurrentlyValidatingElement(element);
                    error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                    setCurrentlyValidatingElement(null);
                  }
                  if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                    loggedTypeFailures[error$1.message] = true;
                    setCurrentlyValidatingElement(element);
                    error("Failed %s type: %s", location, error$1.message);
                    setCurrentlyValidatingElement(null);
                  }
                }
              }
            }
          }
          function setCurrentlyValidatingElement$1(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                setExtraStackFrame(stack);
              } else {
                setExtraStackFrame(null);
              }
            }
          }
          var propTypesMisspellWarningShown;
          {
            propTypesMisspellWarningShown = false;
          }
          function getDeclarationErrorAddendum() {
            if (ReactCurrentOwner.current) {
              var name = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (name) {
                return "\n\nCheck the render method of `" + name + "`.";
              }
            }
            return "";
          }
          function getSourceInfoErrorAddendum(source) {
            if (source !== void 0) {
              var fileName = source.fileName.replace(/^.*[\\\/]/, "");
              var lineNumber = source.lineNumber;
              return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
            }
            return "";
          }
          function getSourceInfoErrorAddendumForProps(elementProps) {
            if (elementProps !== null && elementProps !== void 0) {
              return getSourceInfoErrorAddendum(elementProps.__source);
            }
            return "";
          }
          var ownerHasKeyUseWarning = {};
          function getCurrentComponentErrorInfo(parentType) {
            var info = getDeclarationErrorAddendum();
            if (!info) {
              var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                info = "\n\nCheck the top-level render call using <" + parentName + ">.";
              }
            }
            return info;
          }
          function validateExplicitKey(element, parentType) {
            if (!element._store || element._store.validated || element.key != null) {
              return;
            }
            element._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
              childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
            }
            {
              setCurrentlyValidatingElement$1(element);
              error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
              setCurrentlyValidatingElement$1(null);
            }
          }
          function validateChildKeys(node, parentType) {
            if (typeof node !== "object") {
              return;
            }
            if (isArray(node)) {
              for (var i = 0; i < node.length; i++) {
                var child = node[i];
                if (isValidElement(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (isValidElement(node)) {
              if (node._store) {
                node._store.validated = true;
              }
            } else if (node) {
              var iteratorFn = getIteratorFn(node);
              if (typeof iteratorFn === "function") {
                if (iteratorFn !== node.entries) {
                  var iterator = iteratorFn.call(node);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (isValidElement(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
          function validatePropTypes(element) {
            {
              var type = element.type;
              if (type === null || type === void 0 || typeof type === "string") {
                return;
              }
              var propTypes;
              if (typeof type === "function") {
                propTypes = type.propTypes;
              } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
              // Inner props are checked in the reconciler.
              type.$$typeof === REACT_MEMO_TYPE)) {
                propTypes = type.propTypes;
              } else {
                return;
              }
              if (propTypes) {
                var name = getComponentNameFromType(type);
                checkPropTypes(propTypes, element.props, "prop", name, element);
              } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
                propTypesMisspellWarningShown = true;
                var _name = getComponentNameFromType(type);
                error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
              }
              if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
                error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
              }
            }
          }
          function validateFragmentProps(fragment) {
            {
              var keys = Object.keys(fragment.props);
              for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (key !== "children" && key !== "key") {
                  setCurrentlyValidatingElement$1(fragment);
                  error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                  setCurrentlyValidatingElement$1(null);
                  break;
                }
              }
              if (fragment.ref !== null) {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid attribute `ref` supplied to `React.Fragment`.");
                setCurrentlyValidatingElement$1(null);
              }
            }
          }
          function createElementWithValidation(type, props, children) {
            var validType = isValidElementType(type);
            if (!validType) {
              var info = "";
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
              var sourceInfo = getSourceInfoErrorAddendumForProps(props);
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }
              var typeString;
              if (type === null) {
                typeString = "null";
              } else if (isArray(type)) {
                typeString = "array";
              } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
                info = " Did you accidentally export a JSX literal instead of a component?";
              } else {
                typeString = typeof type;
              }
              {
                error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
              }
            }
            var element = createElement.apply(this, arguments);
            if (element == null) {
              return element;
            }
            if (validType) {
              for (var i = 2; i < arguments.length; i++) {
                validateChildKeys(arguments[i], type);
              }
            }
            if (type === REACT_FRAGMENT_TYPE) {
              validateFragmentProps(element);
            } else {
              validatePropTypes(element);
            }
            return element;
          }
          var didWarnAboutDeprecatedCreateFactory = false;
          function createFactoryWithValidation(type) {
            var validatedFactory = createElementWithValidation.bind(null, type);
            validatedFactory.type = type;
            {
              if (!didWarnAboutDeprecatedCreateFactory) {
                didWarnAboutDeprecatedCreateFactory = true;
                warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
              }
              Object.defineProperty(validatedFactory, "type", {
                enumerable: false,
                get: function() {
                  warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                  Object.defineProperty(this, "type", {
                    value: type
                  });
                  return type;
                }
              });
            }
            return validatedFactory;
          }
          function cloneElementWithValidation(element, props, children) {
            var newElement = cloneElement.apply(this, arguments);
            for (var i = 2; i < arguments.length; i++) {
              validateChildKeys(arguments[i], newElement.type);
            }
            validatePropTypes(newElement);
            return newElement;
          }
          function startTransition(scope, options) {
            var prevTransition = ReactCurrentBatchConfig.transition;
            ReactCurrentBatchConfig.transition = {};
            var currentTransition = ReactCurrentBatchConfig.transition;
            {
              ReactCurrentBatchConfig.transition._updatedFibers = /* @__PURE__ */ new Set();
            }
            try {
              scope();
            } finally {
              ReactCurrentBatchConfig.transition = prevTransition;
              {
                if (prevTransition === null && currentTransition._updatedFibers) {
                  var updatedFibersCount = currentTransition._updatedFibers.size;
                  if (updatedFibersCount > 10) {
                    warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
                  }
                  currentTransition._updatedFibers.clear();
                }
              }
            }
          }
          var didWarnAboutMessageChannel = false;
          var enqueueTaskImpl = null;
          function enqueueTask(task) {
            if (enqueueTaskImpl === null) {
              try {
                var requireString = ("require" + Math.random()).slice(0, 7);
                var nodeRequire = module && module[requireString];
                enqueueTaskImpl = nodeRequire.call(module, "timers").setImmediate;
              } catch (_err) {
                enqueueTaskImpl = function(callback) {
                  {
                    if (didWarnAboutMessageChannel === false) {
                      didWarnAboutMessageChannel = true;
                      if (typeof MessageChannel === "undefined") {
                        error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
                      }
                    }
                  }
                  var channel = new MessageChannel();
                  channel.port1.onmessage = callback;
                  channel.port2.postMessage(void 0);
                };
              }
            }
            return enqueueTaskImpl(task);
          }
          var actScopeDepth = 0;
          var didWarnNoAwaitAct = false;
          function act(callback) {
            {
              var prevActScopeDepth = actScopeDepth;
              actScopeDepth++;
              if (ReactCurrentActQueue.current === null) {
                ReactCurrentActQueue.current = [];
              }
              var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
              var result;
              try {
                ReactCurrentActQueue.isBatchingLegacy = true;
                result = callback();
                if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
                  var queue = ReactCurrentActQueue.current;
                  if (queue !== null) {
                    ReactCurrentActQueue.didScheduleLegacyUpdate = false;
                    flushActQueue(queue);
                  }
                }
              } catch (error2) {
                popActScope(prevActScopeDepth);
                throw error2;
              } finally {
                ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
              }
              if (result !== null && typeof result === "object" && typeof result.then === "function") {
                var thenableResult = result;
                var wasAwaited = false;
                var thenable = {
                  then: function(resolve, reject) {
                    wasAwaited = true;
                    thenableResult.then(function(returnValue2) {
                      popActScope(prevActScopeDepth);
                      if (actScopeDepth === 0) {
                        recursivelyFlushAsyncActWork(returnValue2, resolve, reject);
                      } else {
                        resolve(returnValue2);
                      }
                    }, function(error2) {
                      popActScope(prevActScopeDepth);
                      reject(error2);
                    });
                  }
                };
                {
                  if (!didWarnNoAwaitAct && typeof Promise !== "undefined") {
                    Promise.resolve().then(function() {
                    }).then(function() {
                      if (!wasAwaited) {
                        didWarnNoAwaitAct = true;
                        error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
                      }
                    });
                  }
                }
                return thenable;
              } else {
                var returnValue = result;
                popActScope(prevActScopeDepth);
                if (actScopeDepth === 0) {
                  var _queue = ReactCurrentActQueue.current;
                  if (_queue !== null) {
                    flushActQueue(_queue);
                    ReactCurrentActQueue.current = null;
                  }
                  var _thenable = {
                    then: function(resolve, reject) {
                      if (ReactCurrentActQueue.current === null) {
                        ReactCurrentActQueue.current = [];
                        recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                      } else {
                        resolve(returnValue);
                      }
                    }
                  };
                  return _thenable;
                } else {
                  var _thenable2 = {
                    then: function(resolve, reject) {
                      resolve(returnValue);
                    }
                  };
                  return _thenable2;
                }
              }
            }
          }
          function popActScope(prevActScopeDepth) {
            {
              if (prevActScopeDepth !== actScopeDepth - 1) {
                error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
              }
              actScopeDepth = prevActScopeDepth;
            }
          }
          function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
            {
              var queue = ReactCurrentActQueue.current;
              if (queue !== null) {
                try {
                  flushActQueue(queue);
                  enqueueTask(function() {
                    if (queue.length === 0) {
                      ReactCurrentActQueue.current = null;
                      resolve(returnValue);
                    } else {
                      recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                    }
                  });
                } catch (error2) {
                  reject(error2);
                }
              } else {
                resolve(returnValue);
              }
            }
          }
          var isFlushing = false;
          function flushActQueue(queue) {
            {
              if (!isFlushing) {
                isFlushing = true;
                var i = 0;
                try {
                  for (; i < queue.length; i++) {
                    var callback = queue[i];
                    do {
                      callback = callback(true);
                    } while (callback !== null);
                  }
                  queue.length = 0;
                } catch (error2) {
                  queue = queue.slice(i + 1);
                  throw error2;
                } finally {
                  isFlushing = false;
                }
              }
            }
          }
          var createElement$1 = createElementWithValidation;
          var cloneElement$1 = cloneElementWithValidation;
          var createFactory = createFactoryWithValidation;
          var Children = {
            map: mapChildren,
            forEach: forEachChildren,
            count: countChildren,
            toArray,
            only: onlyChild
          };
          exports.Children = Children;
          exports.Component = Component;
          exports.Fragment = REACT_FRAGMENT_TYPE;
          exports.Profiler = REACT_PROFILER_TYPE;
          exports.PureComponent = PureComponent;
          exports.StrictMode = REACT_STRICT_MODE_TYPE;
          exports.Suspense = REACT_SUSPENSE_TYPE;
          exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
          exports.act = act;
          exports.cloneElement = cloneElement$1;
          exports.createContext = createContext;
          exports.createElement = createElement$1;
          exports.createFactory = createFactory;
          exports.createRef = createRef;
          exports.forwardRef = forwardRef;
          exports.isValidElement = isValidElement;
          exports.lazy = lazy;
          exports.memo = memo;
          exports.startTransition = startTransition;
          exports.unstable_act = act;
          exports.useCallback = useCallback2;
          exports.useContext = useContext;
          exports.useDebugValue = useDebugValue;
          exports.useDeferredValue = useDeferredValue;
          exports.useEffect = useEffect2;
          exports.useId = useId;
          exports.useImperativeHandle = useImperativeHandle;
          exports.useInsertionEffect = useInsertionEffect;
          exports.useLayoutEffect = useLayoutEffect;
          exports.useMemo = useMemo;
          exports.useReducer = useReducer;
          exports.useRef = useRef2;
          exports.useState = useState2;
          exports.useSyncExternalStore = useSyncExternalStore;
          exports.useTransition = useTransition;
          exports.version = ReactVersion;
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
          }
        })();
      }
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (process.env.NODE_ENV === "production") {
        module.exports = require_react_production_min();
      } else {
        module.exports = require_react_development();
      }
    }
  });

  // src/react/index.ts
  var react_exports = {};
  __export(react_exports, {
    useScreenGuard: () => useScreenGuard
  });
  var import_react = __toESM(require_react());

  // src/core/kd_crypto.ts
  async function kd_sha256(data) {
    if (!data) return "";
    if (typeof crypto !== "undefined" && crypto.subtle) {
      try {
        const encoder = new TextEncoder();
        const buffer = encoder.encode(data);
        const copy = new Uint8Array(buffer);
        const hashBuffer = await crypto.subtle.digest("SHA-256", copy.buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      } catch {
      }
    }
    return kd_jsSha256(data);
  }
  async function kd_pbkdf2(password, salt, iterations = 1e5) {
    if (!password || !salt) return "";
    if (typeof crypto !== "undefined" && crypto.subtle) {
      try {
        const encoder = new TextEncoder();
        const passBuffer = new Uint8Array(encoder.encode(password));
        const saltBuffer = new Uint8Array(encoder.encode(salt));
        const key = await crypto.subtle.importKey(
          "raw",
          passBuffer,
          { name: "PBKDF2" },
          false,
          ["deriveBits"]
        );
        const derivedBits = await crypto.subtle.deriveBits(
          {
            name: "PBKDF2",
            salt: saltBuffer,
            iterations,
            hash: "SHA-256"
          },
          key,
          256
        );
        const hashArray = Array.from(new Uint8Array(derivedBits));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      } catch {
      }
    }
    return kd_pureJsPbkdf2(password, salt, iterations);
  }
  function kd_pureJsPbkdf2(password, salt, iterations) {
    let currentHash = kd_jsSha256(`${salt}:${password}`);
    const saltPass = `${salt}:${password}`;
    for (let i = 1; i < iterations; i++) {
      currentHash = kd_jsSha256(`${currentHash}:${saltPass}:${i % 16}`);
    }
    return currentHash;
  }
  function kd_jsSha256(str) {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    const K = [
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ];
    const H = [
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ];
    const l = bytes.length;
    const bitLen = l * 8;
    const newLen = Math.ceil((l + 9) / 64) * 64;
    const M = new Uint8Array(newLen);
    M.set(bytes);
    M[l] = 128;
    const view = new DataView(M.buffer, M.byteOffset, M.byteLength);
    view.setUint32(newLen - 4, bitLen & 4294967295, false);
    view.setUint32(newLen - 8, Math.floor(bitLen / 4294967296), false);
    const W = new Uint32Array(64);
    for (let i = 0; i < newLen; i += 64) {
      for (let t = 0; t < 16; t++) {
        W[t] = view.getUint32(i + t * 4, false);
      }
      for (let t = 16; t < 64; t++) {
        const s0 = kd_rotr(W[t - 15], 7) ^ kd_rotr(W[t - 15], 18) ^ W[t - 15] >>> 3;
        const s1 = kd_rotr(W[t - 2], 17) ^ kd_rotr(W[t - 2], 19) ^ W[t - 2] >>> 10;
        W[t] = W[t - 16] + s0 + W[t - 7] + s1 | 0;
      }
      let a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
      for (let t = 0; t < 64; t++) {
        const S1 = kd_rotr(e, 6) ^ kd_rotr(e, 11) ^ kd_rotr(e, 25);
        const ch = e & f ^ ~e & g;
        const temp1 = h + S1 + ch + K[t] + W[t] | 0;
        const S0 = kd_rotr(a, 2) ^ kd_rotr(a, 13) ^ kd_rotr(a, 22);
        const maj = a & b ^ a & c ^ b & c;
        const temp2 = S0 + maj | 0;
        h = g;
        g = f;
        f = e;
        e = d + temp1 | 0;
        d = c;
        c = b;
        b = a;
        a = temp1 + temp2 | 0;
      }
      H[0] = H[0] + a | 0;
      H[1] = H[1] + b | 0;
      H[2] = H[2] + c | 0;
      H[3] = H[3] + d | 0;
      H[4] = H[4] + e | 0;
      H[5] = H[5] + f | 0;
      H[6] = H[6] + g | 0;
      H[7] = H[7] + h | 0;
    }
    return H.map((h) => (h >>> 0).toString(16).padStart(8, "0")).join("");
  }
  function kd_rotr(n, b) {
    return n >>> b | n << 32 - b;
  }

  // src/core/kd_worker_crypto.ts
  function kd_workerMain() {
    self.onmessage = async function(e) {
      const data = e.data;
      if (!data || !data.id || !data.type) return;
      try {
        if (data.type === "PBKDF2") {
          const hash = await kd_workerPbkdf2(data.password, data.salt, data.iterations);
          self.postMessage({ id: data.id, success: true, hash });
        } else if (data.type === "SHA256") {
          const hash = await kd_workerSha256(data.data);
          self.postMessage({ id: data.id, success: true, hash });
        }
      } catch (err) {
        self.postMessage({ id: data.id, success: false, error: String(err) });
      }
    };
    async function kd_workerSha256(data) {
      if (!data) return "";
      if (typeof self !== "undefined" && self.crypto && self.crypto.subtle) {
        try {
          const encoder = new TextEncoder();
          const buffer = encoder.encode(data);
          const hashBuffer = await self.crypto.subtle.digest("SHA-256", buffer);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        } catch {
        }
      }
      return kd_workerJsSha256(data);
    }
    async function kd_workerPbkdf2(password, salt, iterations = 1e5) {
      if (!password || !salt) return "";
      if (typeof self !== "undefined" && self.crypto && self.crypto.subtle) {
        try {
          const encoder = new TextEncoder();
          const passBuffer = encoder.encode(password);
          const saltBuffer = encoder.encode(salt);
          const key = await self.crypto.subtle.importKey("raw", passBuffer, { name: "PBKDF2" }, false, ["deriveBits"]);
          const derivedBits = await self.crypto.subtle.deriveBits({ name: "PBKDF2", salt: saltBuffer, iterations, hash: "SHA-256" }, key, 256);
          const hashArray = Array.from(new Uint8Array(derivedBits));
          return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        } catch {
        }
      }
      return kd_workerPureJsPbkdf2(password, salt, iterations);
    }
    function kd_workerPureJsPbkdf2(password, salt, iterations) {
      let currentHash = kd_workerJsSha256(`${salt}:${password}`);
      const saltPass = `${salt}:${password}`;
      for (let i = 1; i < iterations; i++) {
        currentHash = kd_workerJsSha256(`${currentHash}:${saltPass}:${i % 16}`);
      }
      return currentHash;
    }
    function kd_workerJsSha256(str) {
      const encoder = new TextEncoder();
      const bytes = encoder.encode(str);
      const K = [
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ];
      const H = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];
      const l = bytes.length;
      const bitLen = l * 8;
      const newLen = Math.ceil((l + 9) / 64) * 64;
      const M = new Uint8Array(newLen);
      M.set(bytes);
      M[l] = 128;
      const view = new DataView(M.buffer, M.byteOffset, M.byteLength);
      view.setUint32(newLen - 4, bitLen & 4294967295, false);
      view.setUint32(newLen - 8, Math.floor(bitLen / 4294967296), false);
      const W = new Uint32Array(64);
      for (let i = 0; i < newLen; i += 64) {
        for (let t = 0; t < 16; t++) W[t] = view.getUint32(i + t * 4, false);
        for (let t = 16; t < 64; t++) {
          const s0 = kd_workerRotr(W[t - 15], 7) ^ kd_workerRotr(W[t - 15], 18) ^ W[t - 15] >>> 3;
          const s1 = kd_workerRotr(W[t - 2], 17) ^ kd_workerRotr(W[t - 2], 19) ^ W[t - 2] >>> 10;
          W[t] = W[t - 16] + s0 + W[t - 7] + s1 | 0;
        }
        let a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
        for (let t = 0; t < 64; t++) {
          const S1 = kd_workerRotr(e, 6) ^ kd_workerRotr(e, 11) ^ kd_workerRotr(e, 25);
          const ch = e & f ^ ~e & g;
          const temp1 = h + S1 + ch + K[t] + W[t] | 0;
          const S0 = kd_workerRotr(a, 2) ^ kd_workerRotr(a, 13) ^ kd_workerRotr(a, 22);
          const maj = a & b ^ a & c ^ b & c;
          const temp2 = S0 + maj | 0;
          h = g;
          g = f;
          f = e;
          e = d + temp1 | 0;
          d = c;
          c = b;
          b = a;
          a = temp1 + temp2 | 0;
        }
        H[0] = H[0] + a | 0;
        H[1] = H[1] + b | 0;
        H[2] = H[2] + c | 0;
        H[3] = H[3] + d | 0;
        H[4] = H[4] + e | 0;
        H[5] = H[5] + f | 0;
        H[6] = H[6] + g | 0;
        H[7] = H[7] + h | 0;
      }
      return H.map((h) => (h >>> 0).toString(16).padStart(8, "0")).join("");
    }
    function kd_workerRotr(n, b) {
      return n >>> b | n << 32 - b;
    }
  }
  var kd_WorkerCryptoManager = class {
    constructor() {
      this.kd_worker = null;
      this.kd_callbacks = /* @__PURE__ */ new Map();
      this.kd_msgId = 0;
      if (typeof window !== "undefined" && typeof Worker !== "undefined" && typeof Blob !== "undefined") {
        try {
          const code = "(" + kd_workerMain.toString() + ")();";
          const blob = new Blob([code], { type: "application/javascript" });
          const blobUrl = URL.createObjectURL(blob);
          this.kd_worker = new Worker(blobUrl);
          this.kd_worker.onmessage = (e) => {
            const { id, success, hash, error } = e.data || {};
            const cb = this.kd_callbacks.get(id);
            if (cb) {
              this.kd_callbacks.delete(id);
              if (success) {
                cb.resolve(hash);
              } else {
                cb.reject(new Error(error || "Worker hashing failed"));
              }
            }
          };
          this.kd_worker.onerror = () => {
            this.kd_callbacks.forEach((cb) => cb.reject(new Error("Worker script error")));
            this.kd_callbacks.clear();
            if (this.kd_worker) {
              this.kd_worker.terminate();
              this.kd_worker = null;
            }
          };
        } catch {
          this.kd_worker = null;
        }
      }
    }
    async kd_pbkdf2(password, salt, iterations = 1e5) {
      if (!this.kd_worker) {
        return await kd_pbkdf2(password, salt, iterations);
      }
      const id = `pb_${++this.kd_msgId}`;
      try {
        return await new Promise((resolve, reject) => {
          this.kd_callbacks.set(id, { resolve, reject });
          this.kd_worker.postMessage({ id, type: "PBKDF2", password, salt, iterations });
        });
      } catch {
        return await kd_pbkdf2(password, salt, iterations);
      }
    }
    async kd_sha256(data) {
      if (!this.kd_worker) {
        return await kd_sha256(data);
      }
      const id = `sha_${++this.kd_msgId}`;
      try {
        return await new Promise((resolve, reject) => {
          this.kd_callbacks.set(id, { resolve, reject });
          this.kd_worker.postMessage({ id, type: "SHA256", data });
        });
      } catch {
        return await kd_sha256(data);
      }
    }
  };
  var kd_workerCrypto = new kd_WorkerCryptoManager();

  // src/core/kd_auto_lock.ts
  var DEFAULT_STORAGE_KEY_PREFIX = "kd_screen_guard_last_activity";
  var DEFAULT_BROADCAST_CHANNEL = "kd_screen_guard_channel";
  var kd_AutoLockTracker = class {
    constructor(autoLockMinutes, onTimeout, onUnlockReceived, onPasswordResetReceived, channelName = DEFAULT_BROADCAST_CHANNEL) {
      this.kd_intervalId = null;
      this.kd_listenersActive = false;
      this.kd_channel = null;
      this.kd_memoryTimestamp = Date.now();
      this.kd_isLocked = false;
      this.kd_autoLockMinutes = autoLockMinutes;
      this.kd_onTimeout = onTimeout;
      this.kd_onUnlockReceived = onUnlockReceived;
      this.kd_onPasswordResetReceived = onPasswordResetReceived;
      this.kd_storageKey = `${DEFAULT_STORAGE_KEY_PREFIX}_${channelName || DEFAULT_BROADCAST_CHANNEL}`;
      this.kd_boundHandler = () => this.kd_updateActivityTimestamp();
      this.kd_visibilityHandler = () => {
        if (typeof document !== "undefined" && document.visibilityState === "visible" && !this.kd_isLocked) {
          this.kd_checkTimeout();
        }
      };
      if (typeof BroadcastChannel !== "undefined") {
        try {
          this.kd_channel = new BroadcastChannel(channelName || DEFAULT_BROADCAST_CHANNEL);
          this.kd_channel.onmessage = (event) => {
            if (event.data) {
              if (event.data.type === "LOCK_NOW") {
                this.kd_onTimeout();
              } else if (event.data.type === "UNLOCK_NOW") {
                this.kd_onUnlockReceived?.();
              } else if (event.data.type === "PASSWORD_RESET" && event.data.newHash) {
                this.kd_onPasswordResetReceived?.(event.data.newHash);
              }
            }
          };
        } catch {
          this.kd_channel = null;
        }
      }
    }
    kd_setLockedState(isLocked) {
      this.kd_isLocked = isLocked;
    }
    kd_start() {
      if (this.kd_autoLockMinutes <= 0) return;
      this.kd_setupEventListeners();
      this.kd_resetActivityTimestamp();
      if (this.kd_intervalId) clearInterval(this.kd_intervalId);
      this.kd_intervalId = setInterval(() => {
        if (!this.kd_isLocked) {
          this.kd_checkTimeout();
        }
      }, 2e3);
    }
    kd_stop() {
      if (this.kd_intervalId) {
        clearInterval(this.kd_intervalId);
        this.kd_intervalId = null;
      }
      this.kd_removeEventListeners();
    }
    kd_notifyUnlockEvent() {
      if (this.kd_channel) {
        try {
          this.kd_channel.postMessage({ type: "UNLOCK_NOW" });
        } catch {
        }
      }
    }
    kd_notifyPasswordResetEvent(newHash) {
      if (this.kd_channel) {
        try {
          this.kd_channel.postMessage({ type: "PASSWORD_RESET", newHash });
        } catch {
        }
      }
    }
    kd_updateConfig(minutes) {
      this.kd_autoLockMinutes = minutes;
      if (minutes > 0) {
        this.kd_start();
      } else {
        this.kd_stop();
      }
    }
    kd_resetActivityTimestamp() {
      const now = Date.now();
      this.kd_memoryTimestamp = now;
      try {
        localStorage.setItem(this.kd_storageKey, now.toString());
      } catch {
      }
    }
    kd_destroy() {
      this.kd_stop();
      if (this.kd_channel) {
        this.kd_channel.close();
        this.kd_channel = null;
      }
    }
    kd_checkTimeout() {
      if (this.kd_autoLockMinutes <= 0) return;
      const now = Date.now();
      const lastActive = this.kd_getLastActivityTimestamp();
      const elapsed = now - lastActive;
      const threshold = this.kd_autoLockMinutes * 60 * 1e3;
      if (!isNaN(elapsed) && elapsed >= threshold) {
        this.kd_notifyLockEvent();
        this.kd_onTimeout();
      }
    }
    kd_getLastActivityTimestamp() {
      try {
        const value = localStorage.getItem(this.kd_storageKey);
        if (!value) return this.kd_memoryTimestamp;
        const parsed = parseInt(value, 10);
        if (isNaN(parsed) || parsed <= 0) {
          localStorage.removeItem(this.kd_storageKey);
          return this.kd_memoryTimestamp;
        }
        return parsed;
      } catch {
        return this.kd_memoryTimestamp;
      }
    }
    kd_updateActivityTimestamp() {
      if (this.kd_isLocked) return;
      const now = Date.now();
      const last = this.kd_getLastActivityTimestamp();
      this.kd_memoryTimestamp = now;
      if (now < last || now - last > 3e3) {
        try {
          localStorage.setItem(this.kd_storageKey, now.toString());
        } catch {
        }
      }
    }
    kd_setupEventListeners() {
      if (this.kd_listenersActive || typeof window === "undefined") return;
      const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
      events.forEach((evt) => {
        window.addEventListener(evt, this.kd_boundHandler, { passive: true });
      });
      if (typeof document !== "undefined") {
        document.addEventListener("visibilitychange", this.kd_visibilityHandler);
      }
      this.kd_listenersActive = true;
    }
    kd_removeEventListeners() {
      if (!this.kd_listenersActive || typeof window === "undefined") return;
      const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
      events.forEach((evt) => {
        window.removeEventListener(evt, this.kd_boundHandler);
      });
      if (typeof document !== "undefined") {
        document.removeEventListener("visibilitychange", this.kd_visibilityHandler);
      }
      this.kd_listenersActive = false;
    }
    kd_notifyLockEvent() {
      if (this.kd_channel) {
        try {
          this.kd_channel.postMessage({ type: "LOCK_NOW" });
        } catch {
        }
      }
    }
  };

  // src/guard/kd_tamper_guard.ts
  var kd_TamperGuard = class {
    constructor(onTamperDetected) {
      this.kd_observer = null;
      this.kd_tamperCheckTimer = null;
      this.kd_periodicIntervalId = null;
      this.kd_storageListener = null;
      this.kd_onTamperDetected = onTamperDetected;
    }
    kd_startMonitoring() {
      if (typeof window === "undefined" || typeof document === "undefined") return;
      this.kd_stopMonitoring();
      if (typeof MutationObserver !== "undefined") {
        this.kd_observer = new MutationObserver((mutations) => {
          if (this.kd_isMutationRelevant(mutations)) {
            this.kd_scheduleTamperCheck();
          }
        });
        this.kd_observer.observe(document.documentElement, {
          childList: true,
          attributes: true,
          subtree: true,
          attributeFilter: ["style", "class", "hidden", "id"]
        });
      }
      this.kd_storageListener = (evt) => {
        if (evt.key && evt.key.startsWith("kd_screen_guard_")) {
          if (evt.newValue === null || evt.newValue === "") {
            this.kd_onTamperDetected({
              timestamp: Date.now(),
              reason: `Storage Security Tampering detected: Key '${evt.key}' was deleted from browser storage.`
            });
          }
        }
      };
      window.addEventListener("storage", this.kd_storageListener);
      this.kd_periodicIntervalId = setInterval(() => {
        this.kd_verifyOverlayIntegrity();
      }, 500);
    }
    kd_stopMonitoring() {
      if (this.kd_observer) {
        this.kd_observer.disconnect();
        this.kd_observer = null;
      }
      if (this.kd_tamperCheckTimer) {
        clearTimeout(this.kd_tamperCheckTimer);
        this.kd_tamperCheckTimer = null;
      }
      if (this.kd_periodicIntervalId) {
        clearInterval(this.kd_periodicIntervalId);
        this.kd_periodicIntervalId = null;
      }
      if (this.kd_storageListener && typeof window !== "undefined") {
        window.removeEventListener("storage", this.kd_storageListener);
        this.kd_storageListener = null;
      }
    }
    kd_scheduleTamperCheck() {
      if (this.kd_tamperCheckTimer) return;
      this.kd_tamperCheckTimer = setTimeout(() => {
        this.kd_tamperCheckTimer = null;
        this.kd_verifyOverlayIntegrity();
      }, 100);
    }
    kd_verifyOverlayIntegrity() {
      if (typeof document === "undefined") return;
      const lockOverlay = document.getElementById("kd-lock-screen");
      if (!lockOverlay) {
        this.kd_onTamperDetected({
          timestamp: Date.now(),
          reason: "Lock overlay element was removed from DOM."
        });
        return;
      }
      if (lockOverlay.getRootNode && lockOverlay.getRootNode() !== document) {
        this.kd_onTamperDetected({
          timestamp: Date.now(),
          reason: "Lock overlay was re-parented into Shadow DOM or external DocumentFragment."
        });
        return;
      }
      const computedStyle = window.getComputedStyle(lockOverlay);
      const display = computedStyle.display;
      const visibility = computedStyle.visibility;
      const opacity = parseFloat(computedStyle.opacity || "1");
      const zIndexStr = computedStyle.zIndex;
      const zIndex = parseInt(zIndexStr, 10);
      const rect = lockOverlay.getBoundingClientRect();
      if (display === "none" || visibility === "hidden" || opacity < 0.1 || rect.height < 10) {
        this.kd_onTamperDetected({
          timestamp: Date.now(),
          reason: `Lock overlay style/CSS tampering detected (display: ${display}, visibility: ${visibility}, opacity: ${opacity}, height: ${rect.height}px).`
        });
        return;
      }
      if (!isNaN(zIndex) && zIndex < 999999) {
        this.kd_onTamperDetected({
          timestamp: Date.now(),
          reason: `Lock overlay z-index lowered below security threshold (z-index: ${zIndex}).`
        });
        return;
      }
      if (typeof localStorage !== "undefined") {
        const isLockedSaved = localStorage.getItem("kd_screen_guard_is_locked") || sessionStorage.getItem("kd_screen_guard_is_locked");
        if (isLockedSaved !== "true") {
          this.kd_onTamperDetected({
            timestamp: Date.now(),
            reason: "Same-tab storage clearing detected: Lock storage key was deleted."
          });
        }
      }
    }
    kd_isMutationRelevant(mutations) {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          for (let i = 0; i < mutation.removedNodes.length; i++) {
            const node = mutation.removedNodes[i];
            if (node.id === "kd-lock-screen" || node.querySelector && node.querySelector("#kd-lock-screen")) {
              return true;
            }
          }
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const node = mutation.addedNodes[i];
            if (node.tagName === "STYLE" || node.tagName === "LINK") {
              return true;
            }
            const target = mutation.target;
            if (target && (target.id === "kd-lock-screen" || target.closest && target.closest("#kd-lock-screen"))) {
              return true;
            }
          }
        } else if (mutation.type === "attributes") {
          const target = mutation.target;
          if (target.id === "kd-lock-screen" || target.querySelector && target.querySelector("#kd-lock-screen")) {
            return true;
          }
        }
      }
      return false;
    }
  };

  // src/guard/kd_alarm_system.ts
  var kd_AlarmSystem = class {
    constructor(speechEnabled = true, speechMessage = "Security Alert! System Locked!", audioEnabled = true, alarmSoundUrl) {
      this.kd_activeAudio = null;
      this.kd_audioContext = null;
      this.kd_oscillator = null;
      this.kd_lfo = null;
      this.kd_isSpeechActive = false;
      this.kd_isSirenActive = false;
      this.kd_interactionTrapActive = false;
      this.kd_speechErrorCount = 0;
      this.kd_trapHandler = null;
      this.kd_voicesChangedHandler = null;
      this.kd_voicesFallbackTimer = null;
      this.kd_speechLoopFallbackTimer = null;
      this.kd_trapEvents = ["mousemove", "scroll", "click", "keydown", "mousedown", "touchstart"];
      this.kd_speechEnabled = speechEnabled;
      this.kd_speechMessage = speechMessage;
      this.kd_audioEnabled = audioEnabled;
      this.kd_alarmSoundUrl = alarmSoundUrl;
    }
    kd_triggerAlarm(forceTrap = false) {
      if (this.kd_speechEnabled) {
        this.kd_startSpeech();
      }
      if (this.kd_audioEnabled) {
        if (this.kd_alarmSoundUrl) {
          this.kd_playAudioSound(this.kd_alarmSoundUrl, forceTrap);
        } else {
          this.kd_startBuiltInSiren(forceTrap);
        }
      }
    }
    kd_stopAlarm() {
      this.kd_isSpeechActive = false;
      this.kd_isSirenActive = false;
      this.kd_speechErrorCount = 0;
      if (this.kd_voicesFallbackTimer) {
        clearTimeout(this.kd_voicesFallbackTimer);
        this.kd_voicesFallbackTimer = null;
      }
      if (this.kd_speechLoopFallbackTimer) {
        clearTimeout(this.kd_speechLoopFallbackTimer);
        this.kd_speechLoopFallbackTimer = null;
      }
      if (this.kd_voicesChangedHandler && typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.removeEventListener("voiceschanged", this.kd_voicesChangedHandler);
        this.kd_voicesChangedHandler = null;
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      this.kd_stopBuiltInSiren();
      if (this.kd_activeAudio) {
        this.kd_activeAudio.pause();
        this.kd_activeAudio = null;
      }
      this.kd_removeInteractionTrap();
    }
    async kd_startBuiltInSiren(forceTrap) {
      if (typeof window === "undefined") return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        if (!this.kd_audioContext) {
          this.kd_audioContext = new AudioCtx();
        }
        if (this.kd_audioContext.state === "suspended") {
          if (forceTrap) {
            this.kd_enableInteractionTrap("");
            return;
          }
          try {
            await this.kd_audioContext.resume();
          } catch {
            this.kd_enableInteractionTrap("");
            return;
          }
        }
        if (this.kd_isSirenActive) return;
        this.kd_isSirenActive = true;
        const osc = this.kd_audioContext.createOscillator();
        const lfo = this.kd_audioContext.createOscillator();
        const lfoGain = this.kd_audioContext.createGain();
        const masterGain = this.kd_audioContext.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(880, this.kd_audioContext.currentTime);
        lfo.type = "sine";
        lfo.frequency.setValueAtTime(4, this.kd_audioContext.currentTime);
        lfoGain.gain.setValueAtTime(440, this.kd_audioContext.currentTime);
        lfo.connect(osc.frequency);
        osc.connect(masterGain);
        masterGain.connect(this.kd_audioContext.destination);
        masterGain.gain.setValueAtTime(0.3, this.kd_audioContext.currentTime);
        lfo.start();
        osc.start();
        this.kd_oscillator = osc;
        this.kd_lfo = lfo;
      } catch {
      }
    }
    kd_stopBuiltInSiren() {
      if (this.kd_oscillator) {
        try {
          this.kd_oscillator.stop();
          this.kd_oscillator.disconnect();
        } catch {
        }
        this.kd_oscillator = null;
      }
      if (this.kd_lfo) {
        try {
          this.kd_lfo.stop();
          this.kd_lfo.disconnect();
        } catch {
        }
        this.kd_lfo = null;
      }
      if (this.kd_audioContext && this.kd_audioContext.state !== "closed") {
        try {
          this.kd_audioContext.suspend();
        } catch {
        }
      }
      this.kd_isSirenActive = false;
    }
    kd_startSpeech() {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      if (this.kd_isSpeechActive) return;
      this.kd_isSpeechActive = true;
      this.kd_speechErrorCount = 0;
      const speak = () => {
        if (this.kd_voicesFallbackTimer) {
          clearTimeout(this.kd_voicesFallbackTimer);
          this.kd_voicesFallbackTimer = null;
        }
        if (this.kd_speechLoopFallbackTimer) {
          clearTimeout(this.kd_speechLoopFallbackTimer);
          this.kd_speechLoopFallbackTimer = null;
        }
        if (this.kd_voicesChangedHandler) {
          window.speechSynthesis.removeEventListener("voiceschanged", this.kd_voicesChangedHandler);
          this.kd_voicesChangedHandler = null;
        }
        if (!this.kd_isSpeechActive || this.kd_speechErrorCount >= 3) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(this.kd_speechMessage);
        utterance.lang = "en-US";
        utterance.rate = 1.1;
        utterance.volume = 1;
        utterance.pitch = 1.1;
        utterance.onend = () => {
          this.kd_speechErrorCount = 0;
          if (this.kd_speechLoopFallbackTimer) {
            clearTimeout(this.kd_speechLoopFallbackTimer);
            this.kd_speechLoopFallbackTimer = null;
          }
          if (this.kd_isSpeechActive) setTimeout(speak, 500);
        };
        utterance.onerror = (evt) => {
          if (evt && evt.error === "canceled") return;
          this.kd_speechErrorCount++;
          if (this.kd_speechErrorCount < 3 && this.kd_isSpeechActive) {
            setTimeout(speak, 1e3);
          } else {
            this.kd_isSpeechActive = false;
          }
        };
        window.speechSynthesis.speak(utterance);
        this.kd_speechLoopFallbackTimer = setTimeout(() => {
          if (this.kd_isSpeechActive) {
            speak();
          }
        }, 5e3);
      };
      if (window.speechSynthesis.getVoices().length === 0) {
        this.kd_voicesChangedHandler = () => speak();
        window.speechSynthesis.addEventListener("voiceschanged", this.kd_voicesChangedHandler, { once: true });
        this.kd_voicesFallbackTimer = setTimeout(() => {
          speak();
        }, 1e3);
      } else {
        speak();
      }
    }
    kd_playAudioSound(url, forceTrap) {
      if (typeof Audio === "undefined") return;
      if (this.kd_activeAudio) {
        this.kd_activeAudio.pause();
        this.kd_activeAudio = null;
      }
      const audio = new Audio(url);
      audio.loop = true;
      this.kd_activeAudio = audio;
      if (forceTrap) {
        this.kd_enableInteractionTrap(url);
        return;
      }
      const playPromise = audio.play();
      if (playPromise !== void 0) {
        playPromise.then(() => {
          if (!this.kd_activeAudio || this.kd_activeAudio !== audio) {
            audio.pause();
          }
        }).catch(() => {
          setTimeout(() => {
            this.kd_enableInteractionTrap(url);
          }, 100);
        });
      }
    }
    kd_enableInteractionTrap(url) {
      if (this.kd_interactionTrapActive || typeof document === "undefined") return;
      this.kd_interactionTrapActive = true;
      const weakEvents = ["mousemove", "scroll"];
      const strongEvents = ["click", "keydown", "mousedown", "touchstart"];
      this.kd_trapHandler = (evt) => {
        const isStrongGesture = strongEvents.includes(evt.type);
        if (!isStrongGesture) {
          if (!this.kd_isSpeechActive && this.kd_speechEnabled) {
            this.kd_startSpeech();
          }
          return;
        }
        this.kd_removeInteractionTrap();
        if (this.kd_isSpeechActive) {
          this.kd_isSpeechActive = false;
          if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
          }
        }
        if (url) {
          this.kd_playAudioSound(url, false);
        } else {
          this.kd_startBuiltInSiren(false);
        }
      };
      this.kd_trapEvents.forEach((evtName) => {
        document.addEventListener(evtName, this.kd_trapHandler, { capture: true });
      });
    }
    kd_removeInteractionTrap() {
      if (this.kd_trapHandler && typeof document !== "undefined") {
        this.kd_trapEvents.forEach((evtName) => {
          document.removeEventListener(evtName, this.kd_trapHandler, true);
        });
        this.kd_trapHandler = null;
      }
      this.kd_interactionTrapActive = false;
    }
  };

  // src/guard/kd_intruder_camera.ts
  var _kd_IntruderCamera = class _kd_IntruderCamera {
    static async kd_captureSnapshot() {
      if (typeof window === "undefined" || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return null;
      }
      if (this.kd_isCapturing) {
        return null;
      }
      this.kd_isCapturing = true;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } }
        });
        return await new Promise((resolve) => {
          const video = document.createElement("video");
          video.autoplay = true;
          video.playsInline = true;
          video.muted = true;
          video.srcObject = stream;
          video.onloadedmetadata = () => {
            video.play().then(() => {
              setTimeout(() => {
                try {
                  const canvas = document.createElement("canvas");
                  canvas.width = video.videoWidth || 640;
                  canvas.height = video.videoHeight || 480;
                  const ctx = canvas.getContext("2d");
                  if (ctx) {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
                    kd_stopStream();
                    resolve(dataUrl);
                  } else {
                    kd_stopStream();
                    resolve(null);
                  }
                } catch {
                  kd_stopStream();
                  resolve(null);
                }
              }, 200);
            }).catch(() => {
              kd_stopStream();
              resolve(null);
            });
          };
          function kd_stopStream() {
            stream.getTracks().forEach((track) => track.stop());
            video.srcObject = null;
            _kd_IntruderCamera.kd_isCapturing = false;
          }
        });
      } catch {
        this.kd_isCapturing = false;
        return null;
      }
    }
  };
  _kd_IntruderCamera.kd_isCapturing = false;
  var kd_IntruderCamera = _kd_IntruderCamera;

  // src/guard/kd_webauthn.ts
  var kd_WebAuthnManager = class {
    static async kd_isSupported() {
      if (typeof window === "undefined" || !window.PublicKeyCredential) return false;
      try {
        return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      } catch {
        return false;
      }
    }
    static async kd_registerBiometrics(userDisplayName = "ScreenGuard User") {
      if (!await this.kd_isSupported()) return null;
      try {
        const challenge = new Uint8Array(32);
        window.crypto.getRandomValues(challenge);
        const userId = new Uint8Array(16);
        window.crypto.getRandomValues(userId);
        const publicKey = {
          challenge,
          rp: { name: "kd-screen-guard" },
          user: {
            id: userId,
            name: "user@screenguard",
            displayName: userDisplayName
          },
          pubKeyCredParams: [
            { alg: -7, type: "public-key" },
            { alg: -257, type: "public-key" }
          ],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required"
          },
          timeout: 6e4
        };
        const credential = await navigator.credentials.create({ publicKey });
        if (credential && credential.id) {
          return credential.id;
        }
        return null;
      } catch {
        return null;
      }
    }
    static async kd_authenticateBiometrics(credentialId) {
      if (!await this.kd_isSupported()) return false;
      try {
        const challenge = new Uint8Array(32);
        window.crypto.getRandomValues(challenge);
        const publicKey = {
          challenge,
          userVerification: "required",
          timeout: 6e4
        };
        if (credentialId) {
          const credBuf = kd_stringToBuffer(credentialId);
          publicKey.allowCredentials = [{
            id: credBuf,
            type: "public-key"
          }];
        }
        const assertion = await navigator.credentials.get({ publicKey });
        return !!assertion;
      } catch {
        return false;
      }
    }
  };
  function kd_stringToBuffer(base64UrlStr) {
    try {
      let base64 = base64UrlStr.replace(/-/g, "+").replace(/_/g, "/");
      while (base64.length % 4) {
        base64 += "=";
      }
      const binaryStr = typeof window !== "undefined" ? atob(base64) : "";
      const bytes = new Uint8Array(binaryStr.length);
      for (let i = 0; i < binaryStr.length; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }
      return bytes;
    } catch {
      const encoder = new TextEncoder();
      return encoder.encode(base64UrlStr);
    }
  }

  // src/ui/kd_lock_ui.ts
  var LOCK_HEADER_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`;
  var EYE_ICON_SVG = `<svg class="kd-eye-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>`;
  var EYE_SLASHED_ICON_SVG = `<svg class="kd-eye-icon-slashed" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 1.78 9.93 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path></svg>`;
  function kd_escapeHTML(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
  function kd_sanitizeCssClass(str) {
    if (!str) return "";
    return str.replace(/[^\w\s-]/g, "").trim();
  }
  var kd_LockUI = class {
    constructor(options, onUnlockAttempt, onRecoveryAttempt, onResetPassword, onWebAuthnAttempt, onBackgroundInteraction) {
      this.kd_focusTrapHandler = null;
      this.kd_touchMoveHandler = null;
      this.kd_visibilitySecurityHandler = null;
      this.kd_isSubmitting = false;
      this.kd_activeViewId = "kd-view-password";
      this.kd_options = options;
      this.kd_onUnlockAttempt = onUnlockAttempt;
      this.kd_onRecoveryAttempt = onRecoveryAttempt;
      this.kd_onResetPassword = onResetPassword;
      this.kd_onWebAuthnAttempt = onWebAuthnAttempt;
      this.kd_onBackgroundInteraction = onBackgroundInteraction;
    }
    get kd_currentActiveViewId() {
      return this.kd_activeViewId;
    }
    kd_renderOverlay(preserveViewId) {
      if (typeof document === "undefined") return;
      this.kd_removeOverlay();
      if (preserveViewId) {
        this.kd_activeViewId = preserveViewId;
      }
      const titleText = kd_escapeHTML(this.kd_options.title || "Application Locked");
      const subtitleText = kd_escapeHTML(this.kd_options.subtitle || "Please enter your password to continue.");
      const questionText = kd_escapeHTML(this.kd_options.securityQuestion || "");
      const customClass = kd_sanitizeCssClass(this.kd_options.customCssClass || "");
      const isPassActive = this.kd_activeViewId === "kd-view-password" ? "active" : "";
      const isRecActive = this.kd_activeViewId === "kd-view-recovery" ? "active" : "";
      const isResetActive = this.kd_activeViewId === "kd-view-reset" ? "active" : "";
      const webAuthnBtnHTML = this.kd_options.enableWebAuthn ? `<button type="button" id="kd-btn-webauthn" class="kd-btn-webauthn"><span>\u{1F446} Touch ID / Face ID / Hello</span></button>` : "";
      const overlayHTML = `
            <div class="kd-lock-overlay ${customClass}" id="kd-lock-screen" role="dialog" aria-modal="true">
                <div class="kd-lock-panel" tabindex="-1">

                    <!-- View: Password Login -->
                    <div id="kd-view-password" class="kd-view ${isPassActive}">
                        <h2>${titleText}</h2>
                        <p>${subtitleText}</p>
                        <div class="kd-lock-input-container">
                            <input type="password" id="kd-lock-password-input" class="kd-lock-input" placeholder="Password" autocomplete="current-password">
                            <button type="button" class="kd-password-toggle" data-target="kd-lock-password-input" aria-label="Show Password" aria-pressed="false" title="Show Password">
                                ${EYE_ICON_SVG}
                                ${EYE_SLASHED_ICON_SVG}
                            </button>
                        </div>
                        <div class="kd-lock-error" id="kd-password-error" aria-live="polite" role="status"></div>
                        <button type="button" id="kd-unlock-btn" class="kd-lock-button">Unlock</button>
                        ${webAuthnBtnHTML}
                        <button type="button" id="kd-forgot-link" class="kd-lock-forgot-link" ${!this.kd_options.securityQuestion || !this.kd_options.securityAnswerHash ? 'disabled title="No security question is set"' : ""}>Forgot Password?</button>
                    </div>

                    <!-- View: Recovery Question -->
                    <div id="kd-view-recovery" class="kd-view ${isRecActive}">
                        <h2>Password Recovery</h2>
                        <p id="kd-recovery-question-text">${questionText}</p>
                        <div class="kd-lock-input-container">
                            <input type="password" id="kd-recovery-answer-input" class="kd-lock-input" placeholder="Your Answer" autocomplete="off">
                            <button type="button" class="kd-password-toggle" data-target="kd-recovery-answer-input" aria-label="Show Answer" aria-pressed="false" title="Show Answer">
                                ${EYE_ICON_SVG}
                                ${EYE_SLASHED_ICON_SVG}
                            </button>
                        </div>
                        <div class="kd-lock-error" id="kd-recovery-error" aria-live="polite" role="status"></div>
                        <button type="button" id="kd-submit-answer-btn" class="kd-lock-button">Submit Answer</button>
                        <button type="button" id="kd-back-to-login-link" class="kd-lock-forgot-link">Back to Login</button>
                    </div>

                    <!-- View: Reset Password -->
                    <div id="kd-view-reset" class="kd-view ${isResetActive}">
                        <h2>Set New Password</h2>
                        <p>Please enter and confirm your new password.</p>
                        <div class="kd-lock-input-container">
                            <input type="password" id="kd-reset-new-password" class="kd-lock-input" placeholder="New Password" autocomplete="new-password">
                            <button type="button" class="kd-password-toggle" data-target="kd-reset-new-password" aria-label="Show Password" aria-pressed="false" title="Show Password">
                                ${EYE_ICON_SVG}
                                ${EYE_SLASHED_ICON_SVG}
                            </button>
                        </div>
                        <div class="kd-lock-input-container">
                            <input type="password" id="kd-reset-confirm-password" class="kd-lock-input" placeholder="Confirm New Password" autocomplete="new-password">
                            <button type="button" class="kd-password-toggle" data-target="kd-reset-confirm-password" aria-label="Show Password" aria-pressed="false" title="Show Password">
                                ${EYE_ICON_SVG}
                                ${EYE_SLASHED_ICON_SVG}
                            </button>
                        </div>
                        <div class="kd-lock-error" id="kd-reset-error" aria-live="polite" role="status"></div>
                        <button type="button" id="kd-reset-password-btn" class="kd-lock-button">Set New Password & Unlock</button>
                        <button type="button" id="kd-reset-back-to-login-link" class="kd-lock-forgot-link">Back to Login</button>
                    </div>
                </div>
            </div>
        `;
      document.body.insertAdjacentHTML("beforeend", overlayHTML);
      document.body.classList.add("kd-body-locked");
      this.kd_setAriaHiddenSiblings(true);
      this.kd_setupFocusTrap();
      this.kd_setupTouchMovePrevention();
      this.kd_setupVisibilitySecurity();
      this.kd_bindEvents();
    }
    kd_removeOverlay() {
      if (typeof document === "undefined") return;
      this.kd_setAriaHiddenSiblings(false);
      const existing = document.getElementById("kd-lock-screen");
      if (existing) existing.remove();
      document.body.classList.remove("kd-body-locked");
      if (this.kd_focusTrapHandler) {
        window.removeEventListener("keydown", this.kd_focusTrapHandler, true);
        this.kd_focusTrapHandler = null;
      }
      if (this.kd_touchMoveHandler) {
        window.removeEventListener("touchmove", this.kd_touchMoveHandler);
        this.kd_touchMoveHandler = null;
      }
      if (this.kd_visibilitySecurityHandler) {
        document.removeEventListener("visibilitychange", this.kd_visibilitySecurityHandler);
        this.kd_visibilitySecurityHandler = null;
      }
      this.kd_isSubmitting = false;
    }
    static kd_createHeaderLockButtonIcon() {
      const btnContainer = document.createElement("button");
      btnContainer.type = "button";
      btnContainer.title = "Lock Screen";
      btnContainer.setAttribute("aria-label", "Lock Screen");
      btnContainer.className = "kd-header-lock-btn";
      btnContainer.innerHTML = LOCK_HEADER_ICON;
      return btnContainer;
    }
    static kd_showIntruderReviewModal(dataUrl, reason, timestamp) {
      if (typeof document === "undefined" || !dataUrl) return;
      const existingModal = document.getElementById("kd-intruder-modal");
      if (existingModal) existingModal.remove();
      const dateStr = new Date(timestamp).toLocaleString();
      const reasonText = kd_escapeHTML(reason);
      const modalHTML = `
            <div class="kd-intruder-overlay" id="kd-intruder-modal" role="dialog" aria-modal="true">
                <div class="kd-intruder-panel">
                    <div class="kd-intruder-badge">
                        <span>\u26A0\uFE0F Intruder Snapshot Captured</span>
                    </div>
                    <h3>Security Incident Detected</h3>
                    <p>An unauthorized attempt occurred on <strong>${dateStr}</strong>.<br>Reason: <em>${reasonText}</em></p>
                    <div class="kd-intruder-img-container">
                        <img src="${dataUrl}" alt="Intruder Snapshot" class="kd-intruder-img">
                    </div>
                    <div class="kd-intruder-actions">
                        <button type="button" id="kd-btn-download-snapshot" class="kd-btn-download">
                            <span>\u{1F4E5} Download Photo</span>
                        </button>
                        <button type="button" id="kd-btn-dismiss-snapshot" class="kd-btn-dismiss">
                            <span>\u2716\uFE0F Dismiss & Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
      document.body.insertAdjacentHTML("beforeend", modalHTML);
      const modal = document.getElementById("kd-intruder-modal");
      if (!modal) return;
      const downloadBtn = modal.querySelector("#kd-btn-download-snapshot");
      const dismissBtn = modal.querySelector("#kd-btn-dismiss-snapshot");
      if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
          const a = document.createElement("a");
          a.href = dataUrl;
          a.download = `intruder_snapshot_${Date.now()}.jpg`;
          document.body.appendChild(a);
          a.click();
          a.remove();
        });
      }
      if (dismissBtn) {
        dismissBtn.addEventListener("click", () => {
          modal.remove();
        });
      }
    }
    kd_showError(msgOrElementId, message) {
      if (typeof document === "undefined") return;
      if (message !== void 0) {
        const el = document.getElementById(msgOrElementId);
        if (el) el.textContent = message;
      } else {
        const el = document.getElementById("kd-password-error") || document.getElementById("kd-recovery-error") || document.getElementById("kd-reset-error");
        if (el) el.textContent = msgOrElementId;
      }
    }
    kd_clearError() {
      this.kd_showError("");
    }
    kd_showLockoutError(secondsRemaining) {
      this.kd_showError(`Too many failed attempts. Locked out for ${secondsRemaining}s.`);
      const unlockBtn = document.getElementById("kd-unlock-btn");
      const passInput = document.getElementById("kd-lock-password-input");
      if (unlockBtn) {
        unlockBtn.disabled = true;
        unlockBtn.setAttribute("data-lockout", "true");
      }
      if (passInput) passInput.disabled = true;
    }
    kd_clearLockoutError() {
      this.kd_showError("");
      const unlockBtn = document.getElementById("kd-unlock-btn");
      const passInput = document.getElementById("kd-lock-password-input");
      if (unlockBtn) {
        unlockBtn.disabled = false;
        unlockBtn.removeAttribute("data-lockout");
      }
      if (passInput) passInput.disabled = false;
    }
    kd_destroy() {
      this.kd_removeOverlay();
    }
    kd_setAriaHiddenSiblings(hide) {
      if (typeof document === "undefined") return;
      const children = Array.from(document.body.children);
      children.forEach((child) => {
        if (child.id !== "kd-lock-screen" && child.tagName !== "SCRIPT" && child.tagName !== "STYLE") {
          if (hide) {
            child.setAttribute("aria-hidden", "true");
            child.setAttribute("data-kd-aria-hidden", "true");
          } else if (child.getAttribute("data-kd-aria-hidden") === "true") {
            child.removeAttribute("aria-hidden");
            child.removeAttribute("data-kd-aria-hidden");
          }
        }
      });
    }
    kd_setupVisibilitySecurity() {
      if (typeof document === "undefined") return;
      this.kd_visibilitySecurityHandler = () => {
        if (document.visibilityState === "hidden") {
          const overlay = document.getElementById("kd-lock-screen");
          if (overlay) {
            overlay.querySelectorAll("input").forEach((input) => {
              input.value = "";
            });
          }
        }
      };
      document.addEventListener("visibilitychange", this.kd_visibilitySecurityHandler);
    }
    kd_setupTouchMovePrevention() {
      const overlay = document.getElementById("kd-lock-screen");
      if (!overlay) return;
      this.kd_touchMoveHandler = (evt) => {
        const targetEl = evt.target;
        if (targetEl && targetEl.closest(".kd-lock-panel")) {
          return;
        }
        if (evt.cancelable) {
          evt.preventDefault();
        }
      };
      overlay.addEventListener("touchmove", this.kd_touchMoveHandler, { passive: false });
    }
    kd_setupFocusTrap() {
      if (this.kd_focusTrapHandler) {
        window.removeEventListener("keydown", this.kd_focusTrapHandler, true);
      }
      this.kd_focusTrapHandler = (evt) => {
        const overlay = document.getElementById("kd-lock-screen");
        if (!overlay) return;
        if (evt.key === "Tab") {
          const activeView = overlay.querySelector(".kd-view.active");
          if (!activeView) return;
          const focusables = Array.from(
            activeView.querySelectorAll(
              'input:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          ).filter((el) => el.offsetParent !== null && window.getComputedStyle(el).display !== "none");
          if (focusables.length === 0) {
            evt.preventDefault();
            const panel = overlay.querySelector(".kd-lock-panel");
            if (panel) panel.focus();
            return;
          }
          const firstEl = focusables[0];
          const lastEl = focusables[focusables.length - 1];
          if (!activeView.contains(document.activeElement)) {
            evt.preventDefault();
            firstEl.focus();
            return;
          }
          if (evt.shiftKey && document.activeElement === firstEl) {
            evt.preventDefault();
            lastEl.focus();
          } else if (!evt.shiftKey && document.activeElement === lastEl) {
            evt.preventDefault();
            firstEl.focus();
          }
        } else if (evt.key === "Escape") {
          evt.preventDefault();
          evt.stopPropagation();
        }
      };
      window.addEventListener("keydown", this.kd_focusTrapHandler, true);
    }
    kd_bindEvents() {
      const lockScreen = document.getElementById("kd-lock-screen");
      if (!lockScreen) return;
      const lockPanel = lockScreen.querySelector(".kd-lock-panel");
      if (lockPanel) {
        lockPanel.addEventListener("mousedown", (e) => {
          e.stopPropagation();
        });
      }
      const activeView = lockScreen.querySelector(`#${this.kd_activeViewId}`);
      const activeInput = activeView ? activeView.querySelector("input") : null;
      const passInput = lockScreen.querySelector("#kd-lock-password-input");
      const unlockBtn = lockScreen.querySelector("#kd-unlock-btn");
      const webAuthnBtn = lockScreen.querySelector("#kd-btn-webauthn");
      const forgotLink = lockScreen.querySelector("#kd-forgot-link");
      const backLoginLink = lockScreen.querySelector("#kd-back-to-login-link");
      const resetBackLoginLink = lockScreen.querySelector("#kd-reset-back-to-login-link");
      const submitAnswerBtn = lockScreen.querySelector("#kd-submit-answer-btn");
      const answerInput = lockScreen.querySelector("#kd-recovery-answer-input");
      const resetPasswordBtn = lockScreen.querySelector("#kd-reset-password-btn");
      if (this.kd_onBackgroundInteraction) {
        lockScreen.addEventListener("mousedown", (e) => {
          if (e.target === lockScreen) {
            this.kd_onBackgroundInteraction?.();
          }
        });
      }
      if (activeInput) activeInput.focus();
      const handleUnlock = async () => {
        if (this.kd_isSubmitting || !passInput) return;
        this.kd_isSubmitting = true;
        if (unlockBtn) unlockBtn.disabled = true;
        try {
          const val = passInput.value;
          const success = await this.kd_onUnlockAttempt(val);
          if (!success) {
            passInput.value = "";
          }
        } finally {
          this.kd_isSubmitting = false;
          if (unlockBtn && !unlockBtn.hasAttribute("data-lockout")) unlockBtn.disabled = false;
        }
      };
      if (unlockBtn) unlockBtn.onclick = handleUnlock;
      if (passInput) {
        passInput.onkeydown = (e) => {
          if (e.key === "Enter" && !e.isComposing) handleUnlock();
        };
      }
      if (webAuthnBtn && this.kd_onWebAuthnAttempt) {
        webAuthnBtn.onclick = async () => {
          if (this.kd_isSubmitting) return;
          this.kd_isSubmitting = true;
          webAuthnBtn.disabled = true;
          try {
            const success = await this.kd_onWebAuthnAttempt();
            if (!success) {
              this.kd_showError("kd-password-error", "Biometric verification failed.");
            }
          } finally {
            this.kd_isSubmitting = false;
            webAuthnBtn.disabled = false;
          }
        };
      }
      if (forgotLink && !forgotLink.disabled) {
        forgotLink.onclick = () => this.kd_switchView("kd-view-recovery");
      }
      if (backLoginLink) {
        backLoginLink.onclick = () => this.kd_switchView("kd-view-password");
      }
      if (resetBackLoginLink) {
        resetBackLoginLink.onclick = () => this.kd_switchView("kd-view-password");
      }
      if (submitAnswerBtn && answerInput) {
        const handleAnswer = async () => {
          if (this.kd_isSubmitting) return;
          this.kd_isSubmitting = true;
          if (submitAnswerBtn) submitAnswerBtn.disabled = true;
          try {
            const val = answerInput.value.toLowerCase().trim();
            if (this.kd_onRecoveryAttempt) {
              const success = await this.kd_onRecoveryAttempt(val);
              if (success) {
                this.kd_switchView("kd-view-reset");
              } else {
                this.kd_showError("kd-recovery-error", "Incorrect answer.");
                answerInput.value = "";
              }
            }
          } finally {
            this.kd_isSubmitting = false;
            if (submitAnswerBtn) submitAnswerBtn.disabled = false;
          }
        };
        submitAnswerBtn.onclick = handleAnswer;
        answerInput.onkeydown = (e) => {
          if (e.key === "Enter" && !e.isComposing) handleAnswer();
        };
      }
      if (resetPasswordBtn) {
        resetPasswordBtn.onclick = async () => {
          if (this.kd_isSubmitting) return;
          const newPass = lockScreen.querySelector("#kd-reset-new-password")?.value;
          const confirmPass = lockScreen.querySelector("#kd-reset-confirm-password")?.value;
          if (!newPass || !confirmPass || newPass.trim().length === 0 || confirmPass.trim().length === 0) {
            return this.kd_showError("kd-reset-error", "Password cannot be empty or whitespace only.");
          }
          if (newPass !== confirmPass) {
            return this.kd_showError("kd-reset-error", "Passwords do not match.");
          }
          this.kd_isSubmitting = true;
          if (resetPasswordBtn) resetPasswordBtn.disabled = true;
          try {
            if (this.kd_onResetPassword) {
              await this.kd_onResetPassword(newPass);
            }
          } catch (err) {
            this.kd_showError("kd-reset-error", err?.message || "Failed to sync password with server. Please try again.");
          } finally {
            this.kd_isSubmitting = false;
            if (resetPasswordBtn) resetPasswordBtn.disabled = false;
          }
        };
      }
      lockScreen.querySelectorAll(".kd-password-toggle").forEach((btn) => {
        btn.onclick = (e) => {
          const button = e.currentTarget;
          const targetId = button.dataset.target;
          if (!targetId) return;
          const input = lockScreen.querySelector(`#${targetId}`);
          if (!input) return;
          const isPassword = input.type === "password";
          input.type = isPassword ? "text" : "password";
          button.classList.toggle("show-password", isPassword);
          button.setAttribute("aria-pressed", isPassword ? "true" : "false");
          const actionLabel = isPassword ? "Hide Password" : "Show Password";
          button.setAttribute("aria-label", actionLabel);
          button.title = actionLabel;
        };
      });
    }
    kd_switchView(viewId) {
      const overlay = document.getElementById("kd-lock-screen");
      if (!overlay) return;
      this.kd_activeViewId = viewId;
      overlay.querySelectorAll(".kd-view").forEach((v) => v.classList.remove("active"));
      overlay.querySelectorAll(".kd-lock-error").forEach((e) => e.textContent = "");
      overlay.querySelectorAll("input").forEach((input) => {
        input.value = "";
      });
      const target = overlay.querySelector(`#${viewId}`);
      if (target) {
        target.classList.add("active");
        const input = target.querySelector("input");
        if (input) input.focus();
      }
    }
  };

  // src/core/kd_lock_engine.ts
  var LOCK_STORAGE_KEY = "kd_screen_guard_is_locked";
  var FAILED_ATTEMPTS_STORAGE_KEY = "kd_screen_guard_failed_attempts";
  var LOCKOUT_UNTIL_STORAGE_KEY = "kd_screen_guard_lockout_until";
  var LOCKOUT_COUNT_STORAGE_KEY = "kd_screen_guard_lockout_count";
  var kd_LockEngine = class {
    constructor(options = {}) {
      this.kd_passwordHash = "";
      this.kd_isLocked = false;
      this.kd_tamperCount = 0;
      this.kd_actionCount = 0;
      this.kd_failedAttemptsCount = 0;
      this.kd_lockoutCount = 0;
      this.kd_lockoutUntilTimestamp = 0;
      this.kd_lockoutTimerId = null;
      this.kd_lastAlertTimestamp = 0;
      this.kd_autoLockTracker = null;
      this.kd_tamperGuard = null;
      this.kd_alarmSystem = null;
      this.kd_ui = null;
      this.kd_attachedButtons = [];
      this.kd_historySecurityHandler = null;
      this.kd_lastIntruderSnapshot = null;
      this.kd_isHashing = false;
      this.kd_options = { ...options };
    }
    get kd_isLockedState() {
      return this.kd_isLocked;
    }
    async kd_init() {
      if (this.kd_autoLockTracker) {
        this.kd_autoLockTracker.kd_destroy();
        this.kd_autoLockTracker = null;
      }
      if (this.kd_tamperGuard) {
        this.kd_tamperGuard.kd_stopMonitoring();
        this.kd_tamperGuard = null;
      }
      if (this.kd_alarmSystem) {
        this.kd_alarmSystem.kd_stopAlarm();
        this.kd_alarmSystem = null;
      }
      if (this.kd_options.passwordHash) {
        this.kd_passwordHash = this.kd_options.passwordHash;
      } else if (this.kd_options.password) {
        this.kd_passwordHash = await this.kd_hashText(this.kd_options.password);
        delete this.kd_options.password;
      }
      this.kd_alarmSystem = new kd_AlarmSystem(
        this.kd_options.enableSpeechAlarm ?? (this.kd_options.enableAudioAlarm ?? false),
        this.kd_options.speechMessage || "Security Alert! System Locked!",
        this.kd_options.enableAudioAlarm ?? false,
        this.kd_options.alarmSoundUrl
      );
      this.kd_tamperGuard = new kd_TamperGuard((details) => {
        this.kd_handleTamperEvent(details);
      });
      this.kd_ui = new kd_LockUI(
        this.kd_options,
        (pass) => this.kd_verifyAndUnlock(pass),
        (ans) => this.kd_verifyRecoveryAnswer(ans),
        (newPass) => this.kd_resetPasswordAndUnlock(newPass),
        () => this.kd_verifyWebAuthn(),
        () => {
          if (this.kd_options.securityTriggerInteraction !== false) {
            this.kd_sendSecurityAlert("User interaction detected on lock screen.", false);
          }
        }
      );
      this.kd_autoLockTracker = new kd_AutoLockTracker(
        this.kd_options.autoLockMinutes || 0,
        () => this.kd_lock(),
        () => this.kd_unlock(true),
        (newHash) => {
          this.kd_passwordHash = newHash;
          this.kd_options.passwordHash = newHash;
        },
        this.kd_options.channelName
      );
      if (this.kd_options.autoLockMinutes && this.kd_options.autoLockMinutes > 0) {
        this.kd_autoLockTracker.kd_start();
      }
      this.kd_restoreSessionLockState();
      if (this.kd_options.lockOnStartup && !this.kd_isLocked) {
        this.kd_lock();
      }
      if (this.kd_isLocked) {
        if (this.kd_autoLockTracker) {
          this.kd_autoLockTracker.kd_setLockedState(true);
        }
        if (this.kd_ui) {
          this.kd_ui.kd_renderOverlay();
        }
        this.kd_setupHistorySecurityListeners();
      }
    }
    kd_lock() {
      if (this.kd_isLocked) return;
      this.kd_isLocked = true;
      this.kd_lastIntruderSnapshot = null;
      if (this.kd_autoLockTracker) {
        this.kd_autoLockTracker.kd_setLockedState(true);
        this.kd_autoLockTracker.kd_resetActivityTimestamp();
      }
      this.kd_setSessionLockState(true);
      if (this.kd_ui) {
        this.kd_ui.kd_renderOverlay();
      }
      if (this.kd_options.antiTamper !== false && this.kd_tamperGuard) {
        this.kd_tamperGuard.kd_startMonitoring();
      }
      this.kd_setupHistorySecurityListeners();
      this.kd_notifyStateChange();
      if (this.kd_options.onLock) {
        this.kd_options.onLock();
      }
    }
    kd_unlock(isSilent = false) {
      if (!this.kd_isLocked) return;
      this.kd_isLocked = false;
      this.kd_actionCount = 0;
      this.kd_failedAttemptsCount = 0;
      this.kd_lockoutCount = 0;
      this.kd_lockoutUntilTimestamp = 0;
      if (this.kd_lockoutTimerId) {
        clearInterval(this.kd_lockoutTimerId);
        this.kd_lockoutTimerId = null;
      }
      if (this.kd_autoLockTracker) {
        this.kd_autoLockTracker.kd_setLockedState(false);
        this.kd_autoLockTracker.kd_resetActivityTimestamp();
        if (!isSilent) {
          this.kd_autoLockTracker.kd_notifyUnlockEvent();
        }
      }
      this.kd_setSessionLockState(false);
      if (this.kd_tamperGuard) {
        this.kd_tamperGuard.kd_stopMonitoring();
      }
      if (this.kd_alarmSystem) {
        this.kd_alarmSystem.kd_stopAlarm();
      }
      if (this.kd_ui) {
        this.kd_ui.kd_removeOverlay();
      }
      this.kd_removeHistorySecurityListeners();
      if (this.kd_lastIntruderSnapshot) {
        const snapshot = this.kd_lastIntruderSnapshot;
        this.kd_lastIntruderSnapshot = null;
        setTimeout(() => {
          kd_LockUI.kd_showIntruderReviewModal(snapshot.dataUrl, snapshot.reason, snapshot.timestamp);
        }, 300);
      }
      this.kd_notifyStateChange();
      if (this.kd_options.onUnlock) {
        this.kd_options.onUnlock();
      }
    }
    async kd_updateOptions(newOptions) {
      this.kd_options = { ...this.kd_options, ...newOptions };
      if (newOptions.password) {
        this.kd_passwordHash = await this.kd_hashText(newOptions.password);
        delete this.kd_options.password;
      } else if (newOptions.passwordHash) {
        this.kd_passwordHash = newOptions.passwordHash;
      }
      if (newOptions.autoLockMinutes !== void 0 && this.kd_autoLockTracker) {
        this.kd_autoLockTracker.kd_updateConfig(newOptions.autoLockMinutes);
      }
      if (this.kd_alarmSystem) {
        this.kd_alarmSystem.kd_stopAlarm();
        this.kd_alarmSystem = new kd_AlarmSystem(
          this.kd_options.enableSpeechAlarm ?? (this.kd_options.enableAudioAlarm ?? false),
          this.kd_options.speechMessage || "Security Alert! System Locked!",
          this.kd_options.enableAudioAlarm ?? false,
          this.kd_options.alarmSoundUrl
        );
        if (this.kd_isLocked) {
          this.kd_alarmSystem.kd_triggerAlarm();
        }
      }
      if (this.kd_isLocked && this.kd_ui) {
        const currentViewId = this.kd_ui.kd_currentActiveViewId;
        this.kd_ui.kd_destroy();
        this.kd_ui = new kd_LockUI(
          this.kd_options,
          (pass) => this.kd_verifyAndUnlock(pass),
          (ans) => this.kd_verifyRecoveryAnswer(ans),
          (newPass) => this.kd_resetPasswordAndUnlock(newPass),
          () => this.kd_verifyWebAuthn(),
          () => {
            if (this.kd_options.securityTriggerInteraction !== false) {
              this.kd_sendSecurityAlert("User interaction detected on lock screen.", false);
            }
          }
        );
        this.kd_ui.kd_renderOverlay(currentViewId);
      }
    }
    kd_getState() {
      return {
        isLocked: this.kd_isLocked,
        lastActivity: Date.now(),
        tamperCount: this.kd_tamperCount
      };
    }
    async kd_verifyAndUnlock(enteredPassword) {
      if (this.kd_isLockoutActive() || this.kd_isHashing) {
        return false;
      }
      if (!this.kd_passwordHash || !enteredPassword) {
        this.kd_handleFailedAttempt("Empty password attempt or unconfigured password hash.");
        return false;
      }
      this.kd_isHashing = true;
      try {
        const hash = await this.kd_hashText(enteredPassword);
        if (hash === this.kd_passwordHash) {
          this.kd_unlock();
          return true;
        }
        this.kd_handleFailedAttempt("Incorrect password entered.");
        return false;
      } finally {
        this.kd_isHashing = false;
      }
    }
    async kd_verifyWebAuthn() {
      if (this.kd_isLockoutActive()) {
        return false;
      }
      const success = await kd_WebAuthnManager.kd_authenticateBiometrics(this.kd_options.webAuthnCredentialId);
      if (success) {
        this.kd_unlock();
        return true;
      }
      this.kd_handleFailedAttempt("Biometric verification failed.");
      return false;
    }
    async kd_verifyRecoveryAnswer(enteredAnswer) {
      if (this.kd_isLockoutActive()) {
        return false;
      }
      if (!this.kd_options.securityAnswerHash || !enteredAnswer || !enteredAnswer.trim()) {
        this.kd_handleFailedAttempt("Empty recovery answer attempt or unconfigured recovery hash.");
        return false;
      }
      const hash = await this.kd_hashText(enteredAnswer.toLowerCase().trim());
      if (hash === this.kd_options.securityAnswerHash) {
        return true;
      }
      this.kd_handleFailedAttempt("Incorrect password recovery answer attempt.");
      return false;
    }
    async kd_resetPasswordAndUnlock(newPassword) {
      if (!newPassword) return;
      const newHash = await this.kd_hashText(newPassword);
      if (this.kd_options.onPasswordReset) {
        await this.kd_options.onPasswordReset(newHash);
      }
      this.kd_passwordHash = newHash;
      this.kd_options.passwordHash = newHash;
      if (this.kd_autoLockTracker) {
        this.kd_autoLockTracker.kd_notifyPasswordResetEvent(newHash);
      }
      this.kd_unlock();
    }
    kd_createLockButton() {
      const btn = kd_LockUI.kd_createHeaderLockButtonIcon();
      btn.onclick = (e) => {
        e.stopPropagation();
        this.kd_lock();
      };
      this.kd_attachedButtons.push(btn);
      return btn;
    }
    kd_attachLockButton(target) {
      if (typeof document === "undefined") return null;
      let el = null;
      if (typeof target === "string") {
        el = document.querySelector(target);
      } else {
        el = target;
      }
      if (!el) return null;
      const btn = this.kd_createLockButton();
      el.appendChild(btn);
      return btn;
    }
    kd_destroy() {
      this.kd_unlock();
      this.kd_removeHistorySecurityListeners();
      if (this.kd_autoLockTracker) {
        this.kd_autoLockTracker.kd_destroy();
        this.kd_autoLockTracker = null;
      }
      if (this.kd_tamperGuard) {
        this.kd_tamperGuard.kd_stopMonitoring();
        this.kd_tamperGuard = null;
      }
      if (this.kd_alarmSystem) {
        this.kd_alarmSystem.kd_stopAlarm();
        this.kd_alarmSystem = null;
      }
      this.kd_attachedButtons.forEach((btn) => {
        btn.onclick = null;
      });
      this.kd_attachedButtons = [];
      this.kd_ui = null;
      this.kd_lastIntruderSnapshot = null;
    }
    async kd_hashText(text) {
      if (this.kd_options.salt) {
        return await kd_workerCrypto.kd_pbkdf2(text, this.kd_options.salt, this.kd_options.iterations || 1e5);
      }
      return await kd_workerCrypto.kd_sha256(text);
    }
    kd_setupHistorySecurityListeners() {
      if (typeof window === "undefined" || this.kd_historySecurityHandler) return;
      this.kd_historySecurityHandler = () => {
        if (this.kd_isLocked) {
          this.kd_sendSecurityAlert("Browser history navigation detected while locked.", false);
        }
      };
      window.addEventListener("popstate", this.kd_historySecurityHandler);
      window.addEventListener("hashchange", this.kd_historySecurityHandler);
    }
    kd_removeHistorySecurityListeners() {
      if (typeof window === "undefined" || !this.kd_historySecurityHandler) return;
      window.removeEventListener("popstate", this.kd_historySecurityHandler);
      window.removeEventListener("hashchange", this.kd_historySecurityHandler);
      this.kd_historySecurityHandler = null;
    }
    async kd_handleFailedAttempt(reason) {
      this.kd_failedAttemptsCount++;
      const maxAttempts = this.kd_options.maxFailedAttempts || 5;
      if (this.kd_failedAttemptsCount >= maxAttempts) {
        this.kd_lockoutCount++;
        const baseDuration = this.kd_options.lockoutDurationSeconds || 30;
        let durationSec = baseDuration;
        if (this.kd_options.enableExponentialLockout !== false) {
          if (this.kd_lockoutCount === 1) {
            durationSec = baseDuration;
          } else if (this.kd_lockoutCount === 2) {
            durationSec = Math.max(baseDuration * 2, 60);
          } else if (this.kd_lockoutCount === 3) {
            durationSec = Math.max(baseDuration * 10, 300);
          } else if (this.kd_lockoutCount === 4) {
            durationSec = Math.max(baseDuration * 30, 900);
          } else {
            durationSec = Math.max(baseDuration * 120, 3600);
          }
        }
        this.kd_lockoutUntilTimestamp = Date.now() + durationSec * 1e3;
        this.kd_saveSecurityState();
        this.kd_startLockoutCountdown();
        this.kd_sendSecurityAlert(`Max failed authentication attempts exceeded (${this.kd_failedAttemptsCount}). Lockout level ${this.kd_lockoutCount} engaged (${durationSec}s).`, true);
      } else {
        this.kd_saveSecurityState();
        const remaining = maxAttempts - this.kd_failedAttemptsCount;
        if (this.kd_ui) {
          if (remaining === 1) {
            this.kd_ui.kd_showError("Warning: 1 attempt remaining before temporary security lockout.");
          } else {
            this.kd_ui.kd_showError("Incorrect password.");
          }
        }
        this.kd_sendSecurityAlert(`Failed authentication attempt: ${reason}`, false);
      }
      if (this.kd_options.enableIntruderSnapshot) {
        kd_IntruderCamera.kd_captureSnapshot().then((photoUrl) => {
          if (photoUrl) {
            this.kd_lastIntruderSnapshot = {
              dataUrl: photoUrl,
              reason: `Unauthorized unlock attempt: ${reason}`,
              timestamp: Date.now()
            };
            if (this.kd_options.onIntruderCaptured) {
              const alertDetails = {
                reason,
                timestamp: Date.now(),
                actionCount: this.kd_actionCount,
                isLocked: this.kd_isLocked,
                intruderSnapshotUrl: photoUrl
              };
              this.kd_options.onIntruderCaptured(photoUrl, alertDetails);
            }
          }
        }).catch(() => {
        });
      }
    }
    kd_handleTamperEvent(details) {
      this.kd_tamperCount++;
      const baseDuration = Math.max(this.kd_options.lockoutDurationSeconds || 30, 300);
      this.kd_lockoutUntilTimestamp = Date.now() + baseDuration * 1e3;
      this.kd_saveSecurityState();
      this.kd_startLockoutCountdown();
      if (this.kd_options.enableIntruderSnapshot) {
        kd_IntruderCamera.kd_captureSnapshot().then((photoUrl) => {
          if (photoUrl) {
            this.kd_lastIntruderSnapshot = {
              dataUrl: photoUrl,
              reason: `Anti-Tamper Security Triggered: ${details.reason}`,
              timestamp: Date.now()
            };
            if (this.kd_options.onIntruderCaptured) {
              const alertDetails = {
                reason: details.reason,
                timestamp: Date.now(),
                actionCount: this.kd_actionCount,
                isLocked: this.kd_isLocked,
                intruderSnapshotUrl: photoUrl
              };
              this.kd_options.onIntruderCaptured(photoUrl, alertDetails);
            }
          }
        }).catch(() => {
        });
      }
      if (this.kd_ui) {
        this.kd_ui.kd_renderOverlay();
      }
      this.kd_sendSecurityAlert(`Critical Security Tamper Event Detected: ${details.reason}. 5-minute Hard Lockout engaged.`, true);
    }
    kd_isLockoutActive() {
      if (this.kd_lockoutUntilTimestamp > Date.now()) {
        const remainingSec = Math.ceil((this.kd_lockoutUntilTimestamp - Date.now()) / 1e3);
        if (this.kd_ui) {
          this.kd_ui.kd_showLockoutError(remainingSec);
        }
        return true;
      }
      if (this.kd_ui) {
        this.kd_ui.kd_clearLockoutError();
      }
      return false;
    }
    kd_startLockoutCountdown() {
      if (this.kd_lockoutTimerId) {
        clearInterval(this.kd_lockoutTimerId);
      }
      this.kd_lockoutTimerId = setInterval(() => {
        if (this.kd_lockoutUntilTimestamp <= Date.now()) {
          clearInterval(this.kd_lockoutTimerId);
          this.kd_lockoutTimerId = null;
          this.kd_failedAttemptsCount = 0;
          if (this.kd_ui) {
            this.kd_ui.kd_clearError();
          }
        } else {
          this.kd_isLockoutActive();
        }
      }, 1e3);
    }
    kd_sendSecurityAlert(message, isSevere = false) {
      const now = Date.now();
      if (now - this.kd_lastAlertTimestamp < 1e3 && !isSevere) return;
      this.kd_lastAlertTimestamp = now;
      if (this.kd_alarmSystem) {
        this.kd_alarmSystem.kd_triggerAlarm(isSevere);
      }
      if (this.kd_options.onSecurityAlert) {
        const alertDetails = {
          reason: message,
          timestamp: now,
          actionCount: ++this.kd_actionCount,
          isLocked: this.kd_isLocked
        };
        this.kd_options.onSecurityAlert(alertDetails);
      }
    }
    kd_notifyStateChange() {
      if (this.kd_options.onStateChange) {
        this.kd_options.onStateChange(this.kd_getState());
      }
    }
    kd_setSessionLockState(locked) {
      if (typeof window === "undefined") return;
      const storage = this.kd_options.persistLockState === "local" ? localStorage : sessionStorage;
      if (locked) {
        storage.setItem(LOCK_STORAGE_KEY, "true");
      } else {
        storage.removeItem(LOCK_STORAGE_KEY);
        sessionStorage.removeItem(LOCK_STORAGE_KEY);
        localStorage.removeItem(LOCK_STORAGE_KEY);
        sessionStorage.removeItem(FAILED_ATTEMPTS_STORAGE_KEY);
        localStorage.removeItem(FAILED_ATTEMPTS_STORAGE_KEY);
        sessionStorage.removeItem(LOCKOUT_COUNT_STORAGE_KEY);
        localStorage.removeItem(LOCKOUT_COUNT_STORAGE_KEY);
        sessionStorage.removeItem(LOCKOUT_UNTIL_STORAGE_KEY);
        localStorage.removeItem(LOCKOUT_UNTIL_STORAGE_KEY);
      }
    }
    kd_saveSecurityState() {
      if (typeof window === "undefined") return;
      const storage = this.kd_options.persistLockState === "local" ? localStorage : sessionStorage;
      if (this.kd_isLocked) {
        storage.setItem(LOCK_STORAGE_KEY, "true");
      }
      localStorage.setItem(FAILED_ATTEMPTS_STORAGE_KEY, String(this.kd_failedAttemptsCount));
      localStorage.setItem(LOCKOUT_COUNT_STORAGE_KEY, String(this.kd_lockoutCount));
      if (this.kd_lockoutUntilTimestamp > Date.now()) {
        localStorage.setItem(LOCKOUT_UNTIL_STORAGE_KEY, String(this.kd_lockoutUntilTimestamp));
      } else {
        localStorage.removeItem(LOCKOUT_UNTIL_STORAGE_KEY);
      }
    }
    kd_restoreSessionLockState() {
      if (typeof window === "undefined") return;
      const storage = this.kd_options.persistLockState === "local" ? localStorage : sessionStorage;
      const savedLocked = storage.getItem(LOCK_STORAGE_KEY) || sessionStorage.getItem(LOCK_STORAGE_KEY) || localStorage.getItem(LOCK_STORAGE_KEY);
      if (savedLocked === "true") {
        this.kd_isLocked = true;
      }
      const savedFailed = localStorage.getItem(FAILED_ATTEMPTS_STORAGE_KEY) || sessionStorage.getItem(FAILED_ATTEMPTS_STORAGE_KEY);
      if (savedFailed) {
        this.kd_failedAttemptsCount = parseInt(savedFailed, 10) || 0;
      }
      const savedLockoutCount = localStorage.getItem(LOCKOUT_COUNT_STORAGE_KEY) || sessionStorage.getItem(LOCKOUT_COUNT_STORAGE_KEY);
      if (savedLockoutCount) {
        this.kd_lockoutCount = parseInt(savedLockoutCount, 10) || 0;
      }
      const savedUntil = localStorage.getItem(LOCKOUT_UNTIL_STORAGE_KEY) || sessionStorage.getItem(LOCKOUT_UNTIL_STORAGE_KEY);
      if (savedUntil) {
        const untilTs = parseInt(savedUntil, 10) || 0;
        if (untilTs > Date.now()) {
          this.kd_lockoutUntilTimestamp = untilTs;
          this.kd_isLocked = true;
          this.kd_startLockoutCountdown();
        } else {
          localStorage.removeItem(LOCKOUT_UNTIL_STORAGE_KEY);
          sessionStorage.removeItem(LOCKOUT_UNTIL_STORAGE_KEY);
        }
      }
    }
  };

  // src/index.ts
  var ScreenGuard = class {
    constructor(options = {}) {
      this.kd_engine = new kd_LockEngine(options);
    }
    get isLocked() {
      return this.kd_engine.kd_isLockedState;
    }
    async init() {
      await this.kd_engine.kd_init();
    }
    lock() {
      this.kd_engine.kd_lock();
    }
    unlock() {
      this.kd_engine.kd_unlock();
    }
    async updateOptions(newOptions) {
      await this.kd_engine.kd_updateOptions(newOptions);
    }
    getState() {
      return this.kd_engine.kd_getState();
    }
    createLockButton() {
      return this.kd_engine.kd_createLockButton();
    }
    attachLockButton(target) {
      return this.kd_engine.kd_attachLockButton(target);
    }
    destroy() {
      this.kd_engine.kd_destroy();
    }
    static async registerBiometrics(userDisplayName = "ScreenGuard User") {
      return await kd_WebAuthnManager.kd_registerBiometrics(userDisplayName);
    }
    static async isBiometricsSupported() {
      return await kd_WebAuthnManager.kd_isSupported();
    }
    static async hashPassword(password, salt, iterations = 1e5) {
      if (salt) {
        return await kd_pbkdf2(password, salt, iterations);
      }
      return await kd_sha256(password);
    }
    static async pbkdf2(password, salt, iterations = 1e5) {
      return await kd_pbkdf2(password, salt, iterations);
    }
    static async hashRecoveryAnswer(answer, salt, iterations = 1e5) {
      if (!answer || !answer.trim()) return "";
      const normalized = answer.toLowerCase().trim();
      if (salt) {
        return await kd_pbkdf2(normalized, salt, iterations);
      }
      return await kd_sha256(normalized);
    }
  };

  // src/react/index.ts
  function useScreenGuard(options = {}) {
    const [isLocked, setIsLocked] = (0, import_react.useState)(false);
    const guardRef = (0, import_react.useRef)(null);
    const optionsRef = (0, import_react.useRef)(options);
    optionsRef.current = options;
    (0, import_react.useEffect)(() => {
      let isMounted = true;
      const mergedOptions = {
        ...optionsRef.current,
        onStateChange: (state) => {
          if (isMounted) {
            setIsLocked(state.isLocked);
          }
          optionsRef.current.onStateChange?.(state);
        }
      };
      const guard = new ScreenGuard(mergedOptions);
      guardRef.current = guard;
      guard.init().then(() => {
        if (isMounted) {
          setIsLocked(guard.isLocked);
        }
      });
      return () => {
        isMounted = false;
        guard.destroy();
        guardRef.current = null;
      };
    }, []);
    (0, import_react.useEffect)(() => {
      if (guardRef.current) {
        guardRef.current.updateOptions(options);
      }
    }, [options.autoLockMinutes, options.enableWebAuthn, options.enableIntruderSnapshot, options.enableAudioAlarm, options.enableSpeechAlarm, options.speechMessage, options.lockoutDurationSeconds, options.maxFailedAttempts]);
    const lock = (0, import_react.useCallback)(() => {
      guardRef.current?.lock();
    }, []);
    const unlock = (0, import_react.useCallback)(() => {
      guardRef.current?.unlock();
    }, []);
    const updateOptions = (0, import_react.useCallback)(async (newOptions) => {
      if (guardRef.current) {
        await guardRef.current.updateOptions(newOptions);
      }
    }, []);
    return {
      isLocked,
      lock,
      unlock,
      updateOptions,
      guard: guardRef.current
    };
  }
  return __toCommonJS(react_exports);
})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
