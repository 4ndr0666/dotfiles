!function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.r = function(exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }, __webpack_require__.t = function(value, mode) {
        if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module.default;
        } : function() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 220);
}([ , function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = __webpack_require__(2);
}, function(module, exports, __webpack_require__) {
    "use strict";
    /** @license React v16.4.2
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */    (function() {
        var _assign = __webpack_require__(3), invariant = __webpack_require__(4), emptyObject = __webpack_require__(5), warning = __webpack_require__(6), emptyFunction = __webpack_require__(7), checkPropTypes = __webpack_require__(8), hasSymbol = "function" == typeof Symbol && Symbol.for, REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103, REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106, REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107, REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108, REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114, REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109, REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110, REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111, REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112, REACT_TIMEOUT_TYPE = hasSymbol ? Symbol.for("react.timeout") : 60113, MAYBE_ITERATOR_SYMBOL = "function" == typeof Symbol && Symbol.iterator;
        function getIteratorFn(maybeIterable) {
            if (null == maybeIterable) return null;
            var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
            return "function" == typeof maybeIterator ? maybeIterator : null;
        }
        var printWarning = function(format) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
            var argIndex = 0, message = "Warning: " + format.replace(/%s/g, (function() {
                return args[argIndex++];
            }));
            try {
                throw new Error(message);
            } catch (x) {}
        }, lowPriorityWarning$1 = function(condition, format) {
            if (void 0 === format) throw new Error("`warning(condition, format, ...args)` requires a warning message argument");
            if (!condition) {
                for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) args[_key2 - 2] = arguments[_key2];
                printWarning.apply(void 0, [ format ].concat(args));
            }
        }, didWarnStateUpdateForUnmountedComponent = {};
        function warnNoop(publicInstance, callerName) {
            var _constructor = publicInstance.constructor, componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass", warningKey = componentName + "." + callerName;
            didWarnStateUpdateForUnmountedComponent[warningKey] || (warning(!1, "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName), 
            didWarnStateUpdateForUnmountedComponent[warningKey] = !0);
        }
        var ReactNoopUpdateQueue = {
            isMounted: function(publicInstance) {
                return !1;
            },
            enqueueForceUpdate: function(publicInstance, callback, callerName) {
                warnNoop(publicInstance, "forceUpdate");
            },
            enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
                warnNoop(publicInstance, "replaceState");
            },
            enqueueSetState: function(publicInstance, partialState, callback, callerName) {
                warnNoop(publicInstance, "setState");
            }
        };
        function Component(props, context, updater) {
            this.props = props, this.context = context, this.refs = emptyObject, this.updater = updater || ReactNoopUpdateQueue;
        }
        Component.prototype.isReactComponent = {}, Component.prototype.setState = function(partialState, callback) {
            "object" != typeof partialState && "function" != typeof partialState && null != partialState && invariant(!1, "setState(...): takes an object of state variables to update or a function which returns an object of state variables."), 
            this.updater.enqueueSetState(this, partialState, callback, "setState");
        }, Component.prototype.forceUpdate = function(callback) {
            this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
        };
        var deprecatedAPIs = {
            isMounted: [ "isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks." ],
            replaceState: [ "replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)." ]
        }, defineDeprecationWarning = function(methodName, info) {
            Object.defineProperty(Component.prototype, methodName, {
                get: function() {
                    lowPriorityWarning$1(!1, "%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
                }
            });
        };
        for (var fnName in deprecatedAPIs) deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        function ComponentDummy() {}
        function PureComponent(props, context, updater) {
            this.props = props, this.context = context, this.refs = emptyObject, this.updater = updater || ReactNoopUpdateQueue;
        }
        ComponentDummy.prototype = Component.prototype;
        var pureComponentPrototype = PureComponent.prototype = new ComponentDummy;
        pureComponentPrototype.constructor = PureComponent, _assign(pureComponentPrototype, Component.prototype), 
        pureComponentPrototype.isPureReactComponent = !0;
        var ReactCurrentOwner = {
            current: null
        }, hasOwnProperty = Object.prototype.hasOwnProperty, RESERVED_PROPS = {
            key: !0,
            ref: !0,
            __self: !0,
            __source: !0
        }, specialPropKeyWarningShown = void 0, specialPropRefWarningShown = void 0;
        function hasValidRef(config) {
            if (hasOwnProperty.call(config, "ref")) {
                var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
                if (getter && getter.isReactWarning) return !1;
            }
            return void 0 !== config.ref;
        }
        function hasValidKey(config) {
            if (hasOwnProperty.call(config, "key")) {
                var getter = Object.getOwnPropertyDescriptor(config, "key").get;
                if (getter && getter.isReactWarning) return !1;
            }
            return void 0 !== config.key;
        }
        function defineKeyPropWarningGetter(props, displayName) {
            var warnAboutAccessingKey = function() {
                specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, warning(!1, "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://fb.me/react-special-props)", displayName));
            };
            warnAboutAccessingKey.isReactWarning = !0, Object.defineProperty(props, "key", {
                get: warnAboutAccessingKey,
                configurable: !0
            });
        }
        function defineRefPropWarningGetter(props, displayName) {
            var warnAboutAccessingRef = function() {
                specialPropRefWarningShown || (specialPropRefWarningShown = !0, warning(!1, "%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://fb.me/react-special-props)", displayName));
            };
            warnAboutAccessingRef.isReactWarning = !0, Object.defineProperty(props, "ref", {
                get: warnAboutAccessingRef,
                configurable: !0
            });
        }
        var ReactElement = function(type, key, ref, self, source, owner, props) {
            var element = {
                $$typeof: REACT_ELEMENT_TYPE,
                type: type,
                key: key,
                ref: ref,
                props: props,
                _owner: owner,
                _store: {}
            };
            return Object.defineProperty(element._store, "validated", {
                configurable: !1,
                enumerable: !1,
                writable: !0,
                value: !1
            }), Object.defineProperty(element, "_self", {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: self
            }), Object.defineProperty(element, "_source", {
                configurable: !1,
                enumerable: !1,
                writable: !1,
                value: source
            }), Object.freeze && (Object.freeze(element.props), Object.freeze(element)), element;
        };
        function createElement(type, config, children) {
            var propName = void 0, props = {}, key = null, ref = null, self = null, source = null;
            if (null != config) for (propName in hasValidRef(config) && (ref = config.ref), 
            hasValidKey(config) && (key = "" + config.key), self = void 0 === config.__self ? null : config.__self, 
            source = void 0 === config.__source ? null : config.__source, config) hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName) && (props[propName] = config[propName]);
            var childrenLength = arguments.length - 2;
            if (1 === childrenLength) props.children = children; else if (childrenLength > 1) {
                for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
                Object.freeze && Object.freeze(childArray), props.children = childArray;
            }
            if (type && type.defaultProps) {
                var defaultProps = type.defaultProps;
                for (propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);
            }
            if ((key || ref) && (void 0 === props.$$typeof || props.$$typeof !== REACT_ELEMENT_TYPE)) {
                var displayName = "function" == typeof type ? type.displayName || type.name || "Unknown" : type;
                key && defineKeyPropWarningGetter(props, displayName), ref && defineRefPropWarningGetter(props, displayName);
            }
            return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
        }
        function cloneElement(element, config, children) {
            null == element && invariant(!1, "React.cloneElement(...): The argument must be a React element, but you passed %s.", element);
            var propName = void 0, props = _assign({}, element.props), key = element.key, ref = element.ref, self = element._self, source = element._source, owner = element._owner;
            if (null != config) {
                hasValidRef(config) && (ref = config.ref, owner = ReactCurrentOwner.current), hasValidKey(config) && (key = "" + config.key);
                var defaultProps = void 0;
                for (propName in element.type && element.type.defaultProps && (defaultProps = element.type.defaultProps), 
                config) hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName) && (void 0 === config[propName] && void 0 !== defaultProps ? props[propName] = defaultProps[propName] : props[propName] = config[propName]);
            }
            var childrenLength = arguments.length - 2;
            if (1 === childrenLength) props.children = children; else if (childrenLength > 1) {
                for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
                props.children = childArray;
            }
            return ReactElement(element.type, key, ref, self, source, owner, props);
        }
        function isValidElement(object) {
            return "object" == typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        var ReactDebugCurrentFrame = {
            getCurrentStack: null,
            getStackAddendum: function() {
                var impl = ReactDebugCurrentFrame.getCurrentStack;
                return impl ? impl() : null;
            }
        };
        var didWarnAboutMaps = !1, userProvidedKeyEscapeRegex = /\/+/g;
        function escapeUserProvidedKey(text) {
            return ("" + text).replace(userProvidedKeyEscapeRegex, "$&/");
        }
        var traverseContextPool = [];
        function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
            if (traverseContextPool.length) {
                var traverseContext = traverseContextPool.pop();
                return traverseContext.result = mapResult, traverseContext.keyPrefix = keyPrefix, 
                traverseContext.func = mapFunction, traverseContext.context = mapContext, traverseContext.count = 0, 
                traverseContext;
            }
            return {
                result: mapResult,
                keyPrefix: keyPrefix,
                func: mapFunction,
                context: mapContext,
                count: 0
            };
        }
        function releaseTraverseContext(traverseContext) {
            traverseContext.result = null, traverseContext.keyPrefix = null, traverseContext.func = null, 
            traverseContext.context = null, traverseContext.count = 0, traverseContextPool.length < 10 && traverseContextPool.push(traverseContext);
        }
        function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
            var type = typeof children;
            "undefined" !== type && "boolean" !== type || (children = null);
            var invokeCallback = !1;
            if (null === children) invokeCallback = !0; else switch (type) {
              case "string":
              case "number":
                invokeCallback = !0;
                break;

              case "object":
                switch (children.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    invokeCallback = !0;
                }
            }
            if (invokeCallback) return callback(traverseContext, children, "" === nameSoFar ? "." + getComponentKey(children, 0) : nameSoFar), 
            1;
            var child = void 0, subtreeCount = 0, nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
            if (Array.isArray(children)) for (var i = 0; i < children.length; i++) subtreeCount += traverseAllChildrenImpl(child = children[i], nextNamePrefix + getComponentKey(child, i), callback, traverseContext); else {
                var iteratorFn = getIteratorFn(children);
                if ("function" == typeof iteratorFn) {
                    iteratorFn === children.entries && (didWarnAboutMaps || warning(!1, "Using Maps as children is unsupported and will likely yield unexpected results. Convert it to a sequence/iterable of keyed ReactElements instead.%s", ReactDebugCurrentFrame.getStackAddendum()), 
                    didWarnAboutMaps = !0);
                    for (var iterator = iteratorFn.call(children), step = void 0, ii = 0; !(step = iterator.next()).done; ) subtreeCount += traverseAllChildrenImpl(child = step.value, nextNamePrefix + getComponentKey(child, ii++), callback, traverseContext);
                } else if ("object" === type) {
                    var addendum;
                    addendum = " If you meant to render a collection of children, use an array instead." + ReactDebugCurrentFrame.getStackAddendum();
                    var childrenString = "" + children;
                    invariant(!1, "Objects are not valid as a React child (found: %s).%s", "[object Object]" === childrenString ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString, addendum);
                }
            }
            return subtreeCount;
        }
        function traverseAllChildren(children, callback, traverseContext) {
            return null == children ? 0 : traverseAllChildrenImpl(children, "", callback, traverseContext);
        }
        function getComponentKey(component, index) {
            return "object" == typeof component && null !== component && null != component.key ? (key = component.key, 
            escaperLookup = {
                "=": "=0",
                ":": "=2"
            }, "$" + ("" + key).replace(/[=:]/g, (function(match) {
                return escaperLookup[match];
            }))) : index.toString(36);
            var key, escaperLookup;
        }
        function forEachSingleChild(bookKeeping, child, name) {
            var func = bookKeeping.func, context = bookKeeping.context;
            func.call(context, child, bookKeeping.count++);
        }
        function mapSingleChildIntoContext(bookKeeping, child, childKey) {
            var oldElement, newKey, result = bookKeeping.result, keyPrefix = bookKeeping.keyPrefix, func = bookKeeping.func, context = bookKeeping.context, mappedChild = func.call(context, child, bookKeeping.count++);
            Array.isArray(mappedChild) ? mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument) : null != mappedChild && (isValidElement(mappedChild) && (oldElement = mappedChild, 
            newKey = keyPrefix + (!mappedChild.key || child && child.key === mappedChild.key ? "" : escapeUserProvidedKey(mappedChild.key) + "/") + childKey, 
            mappedChild = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props)), 
            result.push(mappedChild));
        }
        function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
            var escapedPrefix = "";
            null != prefix && (escapedPrefix = escapeUserProvidedKey(prefix) + "/");
            var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
            traverseAllChildren(children, mapSingleChildIntoContext, traverseContext), releaseTraverseContext(traverseContext);
        }
        function isValidElementType(type) {
            return "string" == typeof type || "function" == typeof type || type === REACT_FRAGMENT_TYPE || type === REACT_ASYNC_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_TIMEOUT_TYPE || "object" == typeof type && null !== type && (type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
        }
        function getComponentName(fiber) {
            var type = fiber.type;
            if ("function" == typeof type) return type.displayName || type.name;
            if ("string" == typeof type) return type;
            switch (type) {
              case REACT_ASYNC_MODE_TYPE:
                return "AsyncMode";

              case REACT_CONTEXT_TYPE:
                return "Context.Consumer";

              case REACT_FRAGMENT_TYPE:
                return "ReactFragment";

              case REACT_PORTAL_TYPE:
                return "ReactPortal";

              case REACT_PROFILER_TYPE:
                return "Profiler(" + fiber.pendingProps.id + ")";

              case REACT_PROVIDER_TYPE:
                return "Context.Provider";

              case REACT_STRICT_MODE_TYPE:
                return "StrictMode";

              case REACT_TIMEOUT_TYPE:
                return "Timeout";
            }
            if ("object" == typeof type && null !== type) switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                var functionName = type.render.displayName || type.render.name || "";
                return "" !== functionName ? "ForwardRef(" + functionName + ")" : "ForwardRef";
            }
            return null;
        }
        var getDisplayName, getStackAddendum, currentlyValidatingElement = void 0, propTypesMisspellWarningShown = void 0;
        function getDeclarationErrorAddendum() {
            if (ReactCurrentOwner.current) {
                var name = getComponentName(ReactCurrentOwner.current);
                if (name) return "\n\nCheck the render method of `" + name + "`.";
            }
            return "";
        }
        function getSourceInfoErrorAddendum(elementProps) {
            if (null != elementProps && void 0 !== elementProps.__source) {
                var source = elementProps.__source;
                return "\n\nCheck your code at " + source.fileName.replace(/^.*[\\\/]/, "") + ":" + source.lineNumber + ".";
            }
            return "";
        }
        currentlyValidatingElement = null, propTypesMisspellWarningShown = !1, getDisplayName = function(element) {
            if (null == element) return "#empty";
            if ("string" == typeof element || "number" == typeof element) return "#text";
            if ("string" == typeof element.type) return element.type;
            var type = element.type;
            if (type === REACT_FRAGMENT_TYPE) return "React.Fragment";
            if ("object" == typeof type && null !== type && type.$$typeof === REACT_FORWARD_REF_TYPE) {
                var functionName = type.render.displayName || type.render.name || "";
                return "" !== functionName ? "ForwardRef(" + functionName + ")" : "ForwardRef";
            }
            return type.displayName || type.name || "Unknown";
        }, getStackAddendum = function() {
            var stack = "";
            if (currentlyValidatingElement) {
                var name = getDisplayName(currentlyValidatingElement), owner = currentlyValidatingElement._owner;
                stack += function(name, source, ownerName) {
                    return "\n    in " + (name || "Unknown") + (source ? " (at " + source.fileName.replace(/^.*[\\\/]/, "") + ":" + source.lineNumber + ")" : ownerName ? " (created by " + ownerName + ")" : "");
                }(name, currentlyValidatingElement._source, owner && getComponentName(owner));
            }
            return stack += ReactDebugCurrentFrame.getStackAddendum() || "";
        };
        var ownerHasKeyUseWarning = {};
        function validateExplicitKey(element, parentType) {
            if (element._store && !element._store.validated && null == element.key) {
                element._store.validated = !0;
                var currentComponentErrorInfo = function(parentType) {
                    var info = getDeclarationErrorAddendum();
                    if (!info) {
                        var parentName = "string" == typeof parentType ? parentType : parentType.displayName || parentType.name;
                        parentName && (info = "\n\nCheck the top-level render call using <" + parentName + ">.");
                    }
                    return info;
                }(parentType);
                if (!ownerHasKeyUseWarning[currentComponentErrorInfo]) {
                    ownerHasKeyUseWarning[currentComponentErrorInfo] = !0;
                    var childOwner = "";
                    element && element._owner && element._owner !== ReactCurrentOwner.current && (childOwner = " It was passed a child from " + getComponentName(element._owner) + "."), 
                    currentlyValidatingElement = element, warning(!1, 'Each child in an array or iterator should have a unique "key" prop.%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum()), 
                    currentlyValidatingElement = null;
                }
            }
        }
        function validateChildKeys(node, parentType) {
            if ("object" == typeof node) if (Array.isArray(node)) for (var i = 0; i < node.length; i++) {
                var child = node[i];
                isValidElement(child) && validateExplicitKey(child, parentType);
            } else if (isValidElement(node)) node._store && (node._store.validated = !0); else if (node) {
                var iteratorFn = getIteratorFn(node);
                if ("function" == typeof iteratorFn && iteratorFn !== node.entries) for (var iterator = iteratorFn.call(node), step = void 0; !(step = iterator.next()).done; ) isValidElement(step.value) && validateExplicitKey(step.value, parentType);
            }
        }
        function validatePropTypes(element) {
            var type = element.type, name = void 0, propTypes = void 0;
            if ("function" == typeof type) name = type.displayName || type.name, propTypes = type.propTypes; else {
                if ("object" != typeof type || null === type || type.$$typeof !== REACT_FORWARD_REF_TYPE) return;
                var functionName = type.render.displayName || type.render.name || "";
                name = "" !== functionName ? "ForwardRef(" + functionName + ")" : "ForwardRef", 
                propTypes = type.propTypes;
            }
            propTypes ? (currentlyValidatingElement = element, checkPropTypes(propTypes, element.props, "prop", name, getStackAddendum), 
            currentlyValidatingElement = null) : void 0 === type.PropTypes || propTypesMisspellWarningShown || (propTypesMisspellWarningShown = !0, 
            warning(!1, "Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", name || "Unknown")), 
            "function" == typeof type.getDefaultProps && (type.getDefaultProps.isReactClassApproved || warning(!1, "getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead."));
        }
        function validateFragmentProps(fragment) {
            currentlyValidatingElement = fragment;
            for (var keys = Object.keys(fragment.props), i = 0; i < keys.length; i++) {
                var key = keys[i];
                if ("children" !== key && "key" !== key) {
                    warning(!1, "Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.%s", key, getStackAddendum());
                    break;
                }
            }
            null !== fragment.ref && warning(!1, "Invalid attribute `ref` supplied to `React.Fragment`.%s", getStackAddendum()), 
            currentlyValidatingElement = null;
        }
        function createElementWithValidation(type, props, children) {
            var validType = isValidElementType(type);
            if (!validType) {
                var info = "";
                (void 0 === type || "object" == typeof type && null !== type && 0 === Object.keys(type).length) && (info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                var sourceInfo = getSourceInfoErrorAddendum(props);
                info += sourceInfo || getDeclarationErrorAddendum(), info += getStackAddendum() || "";
                var typeString = void 0;
                typeString = null === type ? "null" : Array.isArray(type) ? "array" : typeof type, 
                warning(!1, "React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
            }
            var element = createElement.apply(this, arguments);
            if (null == element) return element;
            if (validType) for (var i = 2; i < arguments.length; i++) validateChildKeys(arguments[i], type);
            return type === REACT_FRAGMENT_TYPE ? validateFragmentProps(element) : validatePropTypes(element), 
            element;
        }
        var React = {
            Children: {
                map: function(children, func, context) {
                    if (null == children) return children;
                    var result = [];
                    return mapIntoWithKeyPrefixInternal(children, result, null, func, context), result;
                },
                forEach: function(children, forEachFunc, forEachContext) {
                    if (null == children) return children;
                    var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
                    traverseAllChildren(children, forEachSingleChild, traverseContext), releaseTraverseContext(traverseContext);
                },
                count: function(children) {
                    return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
                },
                toArray: function(children) {
                    var result = [];
                    return mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument), 
                    result;
                },
                only: function(children) {
                    return isValidElement(children) || invariant(!1, "React.Children.only expected to receive a single React element child."), 
                    children;
                }
            },
            createRef: function() {
                var refObject = {
                    current: null
                };
                return Object.seal(refObject), refObject;
            },
            Component: Component,
            PureComponent: PureComponent,
            createContext: function(defaultValue, calculateChangedBits) {
                void 0 === calculateChangedBits ? calculateChangedBits = null : null !== calculateChangedBits && "function" != typeof calculateChangedBits && warning(!1, "createContext: Expected the optional second argument to be a function. Instead received: %s", calculateChangedBits);
                var context = {
                    $$typeof: REACT_CONTEXT_TYPE,
                    _calculateChangedBits: calculateChangedBits,
                    _defaultValue: defaultValue,
                    _currentValue: defaultValue,
                    _currentValue2: defaultValue,
                    _changedBits: 0,
                    _changedBits2: 0,
                    Provider: null,
                    Consumer: null
                };
                return context.Provider = {
                    $$typeof: REACT_PROVIDER_TYPE,
                    _context: context
                }, context.Consumer = context, context._currentRenderer = null, context._currentRenderer2 = null, 
                context;
            },
            forwardRef: function(render) {
                return "function" != typeof render && warning(!1, "forwardRef requires a render function but was given %s.", null === render ? "null" : typeof render), 
                null != render && (null != render.defaultProps || null != render.propTypes) && warning(!1, "forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?"), 
                {
                    $$typeof: REACT_FORWARD_REF_TYPE,
                    render: render
                };
            },
            Fragment: REACT_FRAGMENT_TYPE,
            StrictMode: REACT_STRICT_MODE_TYPE,
            unstable_AsyncMode: REACT_ASYNC_MODE_TYPE,
            unstable_Profiler: REACT_PROFILER_TYPE,
            createElement: createElementWithValidation,
            cloneElement: function(element, props, children) {
                for (var newElement = cloneElement.apply(this, arguments), i = 2; i < arguments.length; i++) validateChildKeys(arguments[i], newElement.type);
                return validatePropTypes(newElement), newElement;
            },
            createFactory: function(type) {
                var validatedFactory = createElementWithValidation.bind(null, type);
                return validatedFactory.type = type, Object.defineProperty(validatedFactory, "type", {
                    enumerable: !1,
                    get: function() {
                        return lowPriorityWarning$1(!1, "Factory.type is deprecated. Access the class directly before passing it to createFactory."), 
                        Object.defineProperty(this, "type", {
                            value: type
                        }), type;
                    }
                }), validatedFactory;
            },
            isValidElement: isValidElement,
            version: "16.4.2",
            __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
                ReactCurrentOwner: ReactCurrentOwner,
                assign: _assign
            }
        };
        _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
            ReactDebugCurrentFrame: ReactDebugCurrentFrame,
            ReactComponentTreeHook: {}
        });
        var React$2 = Object.freeze({
            default: React
        }), React$3 = React$2 && React || React$2, react = React$3.default ? React$3.default : React$3;
        module.exports = react;
    })();
}, function(module, exports, __webpack_require__) {
    "use strict";
    /*
object-assign
(c) Sindre Sorhus
@license MIT
*/    var getOwnPropertySymbols = Object.getOwnPropertySymbols, hasOwnProperty = Object.prototype.hasOwnProperty, propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
        if (null == val) throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(val);
    }
    module.exports = function() {
        try {
            if (!Object.assign) return !1;
            var test1 = new String("abc");
            if (test1[5] = "de", "5" === Object.getOwnPropertyNames(test1)[0]) return !1;
            for (var test2 = {}, i = 0; i < 10; i++) test2["_" + String.fromCharCode(i)] = i;
            if ("0123456789" !== Object.getOwnPropertyNames(test2).map((function(n) {
                return test2[n];
            })).join("")) return !1;
            var test3 = {};
            return "abcdefghijklmnopqrst".split("").forEach((function(letter) {
                test3[letter] = letter;
            })), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, test3)).join("");
        } catch (err) {
            return !1;
        }
    }() ? Object.assign : function(target, source) {
        for (var from, symbols, to = toObject(target), s = 1; s < arguments.length; s++) {
            for (var key in from = Object(arguments[s])) hasOwnProperty.call(from, key) && (to[key] = from[key]);
            if (getOwnPropertySymbols) {
                symbols = getOwnPropertySymbols(from);
                for (var i = 0; i < symbols.length; i++) propIsEnumerable.call(from, symbols[i]) && (to[symbols[i]] = from[symbols[i]]);
            }
        }
        return to;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var validateFormat = function(format) {};
    validateFormat = function(format) {
        if (void 0 === format) throw new Error("invariant requires an error message argument");
    }, module.exports = function(condition, format, a, b, c, d, e, f) {
        if (validateFormat(format), !condition) {
            var error;
            if (void 0 === format) error = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."); else {
                var args = [ a, b, c, d, e, f ], argIndex = 0;
                (error = new Error(format.replace(/%s/g, (function() {
                    return args[argIndex++];
                })))).name = "Invariant Violation";
            }
            throw error.framesToPop = 1, error;
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var emptyObject = {};
    Object.freeze(emptyObject), module.exports = emptyObject;
}, function(module, exports, __webpack_require__) {
    "use strict";
    var warning = __webpack_require__(7), printWarning = function(format) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
        var argIndex = 0, message = "Warning: " + format.replace(/%s/g, (function() {
            return args[argIndex++];
        }));
        try {
            throw new Error(message);
        } catch (x) {}
    };
    warning = function(condition, format) {
        if (void 0 === format) throw new Error("`warning(condition, format, ...args)` requires a warning message argument");
        if (0 !== format.indexOf("Failed Composite propType: ") && !condition) {
            for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) args[_key2 - 2] = arguments[_key2];
            printWarning.apply(void 0, [ format ].concat(args));
        }
    }, module.exports = warning;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function makeEmptyFunction(arg) {
        return function() {
            return arg;
        };
    }
    var emptyFunction = function() {};
    emptyFunction.thatReturns = makeEmptyFunction, emptyFunction.thatReturnsFalse = makeEmptyFunction(!1), 
    emptyFunction.thatReturnsTrue = makeEmptyFunction(!0), emptyFunction.thatReturnsNull = makeEmptyFunction(null), 
    emptyFunction.thatReturnsThis = function() {
        return this;
    }, emptyFunction.thatReturnsArgument = function(arg) {
        return arg;
    }, module.exports = emptyFunction;
}, function(module, exports, __webpack_require__) {
    "use strict";
    var printWarning = function() {}, ReactPropTypesSecret = __webpack_require__(9), loggedTypeFailures = {};
    printWarning = function(text) {
        var message = "Warning: " + text;
        try {
            throw new Error(message);
        } catch (x) {}
    }, module.exports = function(typeSpecs, values, location, componentName, getStack) {
        for (var typeSpecName in typeSpecs) if (typeSpecs.hasOwnProperty(typeSpecName)) {
            var error;
            try {
                if ("function" != typeof typeSpecs[typeSpecName]) {
                    var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.");
                    throw err.name = "Invariant Violation", err;
                }
                error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
            } catch (ex) {
                error = ex;
            }
            if (!error || error instanceof Error || printWarning((componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."), 
            error instanceof Error && !(error.message in loggedTypeFailures)) {
                loggedTypeFailures[error.message] = !0;
                var stack = getStack ? getStack() : "";
                printWarning("Failed " + location + " type: " + error.message + (null != stack ? stack : ""));
            }
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = __webpack_require__(11);
}, function(module, exports, __webpack_require__) {
    "use strict";
    /** @license React v16.4.2
 * react-dom.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */    (function() {
        var invariant = __webpack_require__(4), React = __webpack_require__(1), warning = __webpack_require__(6), ExecutionEnvironment = __webpack_require__(12), _assign = __webpack_require__(3), emptyFunction = __webpack_require__(7), checkPropTypes = __webpack_require__(8), getActiveElement = __webpack_require__(13), shallowEqual = __webpack_require__(14), containsNode = __webpack_require__(15), emptyObject = __webpack_require__(5), hyphenateStyleName = __webpack_require__(18), camelizeStyleName = __webpack_require__(20);
        React || invariant(!1, "ReactDOM was loaded before React. Make sure you load the React package before loading ReactDOM.");
        var invokeGuardedCallback = function(name, func, context, a, b, c, d, e, f) {
            this._hasCaughtError = !1, this._caughtError = null;
            var funcArgs = Array.prototype.slice.call(arguments, 3);
            try {
                func.apply(context, funcArgs);
            } catch (error) {
                this._caughtError = error, this._hasCaughtError = !0;
            }
        };
        if ("undefined" != typeof window && "function" == typeof window.dispatchEvent && "undefined" != typeof document && "function" == typeof document.createEvent) {
            var fakeNode = document.createElement("react");
            invokeGuardedCallback = function(name, func, context, a, b, c, d, e, f) {
                "undefined" == typeof document && invariant(!1, "The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
                var evt = document.createEvent("Event"), didError = !0, funcArgs = Array.prototype.slice.call(arguments, 3);
                function callCallback() {
                    fakeNode.removeEventListener(evtType, callCallback, !1), func.apply(context, funcArgs), 
                    didError = !1;
                }
                var error = void 0, didSetError = !1, isCrossOriginError = !1;
                function onError(event) {
                    error = event.error, didSetError = !0, null === error && 0 === event.colno && 0 === event.lineno && (isCrossOriginError = !0);
                }
                var evtType = "react-" + (name || "invokeguardedcallback");
                window.addEventListener("error", onError), fakeNode.addEventListener(evtType, callCallback, !1), 
                evt.initEvent(evtType, !1, !1), fakeNode.dispatchEvent(evt), didError ? (didSetError ? isCrossOriginError && (error = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://fb.me/react-crossorigin-error for more information.")) : error = new Error("An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the \"Pause on exceptions\" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue."), 
                this._hasCaughtError = !0, this._caughtError = error) : (this._hasCaughtError = !1, 
                this._caughtError = null), window.removeEventListener("error", onError);
            };
        }
        var invokeGuardedCallback$1 = invokeGuardedCallback, ReactErrorUtils = {
            _caughtError: null,
            _hasCaughtError: !1,
            _rethrowError: null,
            _hasRethrowError: !1,
            invokeGuardedCallback: function(name, func, context, a, b, c, d, e, f) {
                invokeGuardedCallback$1.apply(ReactErrorUtils, arguments);
            },
            invokeGuardedCallbackAndCatchFirstError: function(name, func, context, a, b, c, d, e, f) {
                if (ReactErrorUtils.invokeGuardedCallback.apply(this, arguments), ReactErrorUtils.hasCaughtError()) {
                    var error = ReactErrorUtils.clearCaughtError();
                    ReactErrorUtils._hasRethrowError || (ReactErrorUtils._hasRethrowError = !0, ReactErrorUtils._rethrowError = error);
                }
            },
            rethrowCaughtError: function() {
                return rethrowCaughtError.apply(ReactErrorUtils, arguments);
            },
            hasCaughtError: function() {
                return ReactErrorUtils._hasCaughtError;
            },
            clearCaughtError: function() {
                if (ReactErrorUtils._hasCaughtError) {
                    var error = ReactErrorUtils._caughtError;
                    return ReactErrorUtils._caughtError = null, ReactErrorUtils._hasCaughtError = !1, 
                    error;
                }
                invariant(!1, "clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
            }
        }, rethrowCaughtError = function() {
            if (ReactErrorUtils._hasRethrowError) {
                var error = ReactErrorUtils._rethrowError;
                throw ReactErrorUtils._rethrowError = null, ReactErrorUtils._hasRethrowError = !1, 
                error;
            }
        }, eventPluginOrder = null, namesToPlugins = {};
        function recomputePluginOrdering() {
            if (eventPluginOrder) for (var pluginName in namesToPlugins) {
                var pluginModule = namesToPlugins[pluginName], pluginIndex = eventPluginOrder.indexOf(pluginName);
                if (pluginIndex > -1 || invariant(!1, "EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `%s`.", pluginName), 
                !plugins[pluginIndex]) {
                    pluginModule.extractEvents || invariant(!1, "EventPluginRegistry: Event plugins must implement an `extractEvents` method, but `%s` does not.", pluginName), 
                    plugins[pluginIndex] = pluginModule;
                    var publishedEvents = pluginModule.eventTypes;
                    for (var eventName in publishedEvents) publishEventForPlugin(publishedEvents[eventName], pluginModule, eventName) || invariant(!1, "EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.", eventName, pluginName);
                }
            }
        }
        function publishEventForPlugin(dispatchConfig, pluginModule, eventName) {
            eventNameDispatchConfigs.hasOwnProperty(eventName) && invariant(!1, "EventPluginHub: More than one plugin attempted to publish the same event name, `%s`.", eventName), 
            eventNameDispatchConfigs[eventName] = dispatchConfig;
            var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
            if (phasedRegistrationNames) {
                for (var phaseName in phasedRegistrationNames) {
                    if (phasedRegistrationNames.hasOwnProperty(phaseName)) publishRegistrationName(phasedRegistrationNames[phaseName], pluginModule, eventName);
                }
                return !0;
            }
            return !!dispatchConfig.registrationName && (publishRegistrationName(dispatchConfig.registrationName, pluginModule, eventName), 
            !0);
        }
        function publishRegistrationName(registrationName, pluginModule, eventName) {
            registrationNameModules[registrationName] && invariant(!1, "EventPluginHub: More than one plugin attempted to publish the same registration name, `%s`.", registrationName), 
            registrationNameModules[registrationName] = pluginModule, registrationNameDependencies[registrationName] = pluginModule.eventTypes[eventName].dependencies;
            var lowerCasedName = registrationName.toLowerCase();
            possibleRegistrationNames[lowerCasedName] = registrationName, "onDoubleClick" === registrationName && (possibleRegistrationNames.ondblclick = registrationName);
        }
        var plugins = [], eventNameDispatchConfigs = {}, registrationNameModules = {}, registrationNameDependencies = {}, possibleRegistrationNames = {};
        function injectEventPluginOrder(injectedEventPluginOrder) {
            eventPluginOrder && invariant(!1, "EventPluginRegistry: Cannot inject event plugin ordering more than once. You are likely trying to load more than one copy of React."), 
            eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder), recomputePluginOrdering();
        }
        function injectEventPluginsByName(injectedNamesToPlugins) {
            var isOrderingDirty = !1;
            for (var pluginName in injectedNamesToPlugins) if (injectedNamesToPlugins.hasOwnProperty(pluginName)) {
                var pluginModule = injectedNamesToPlugins[pluginName];
                namesToPlugins.hasOwnProperty(pluginName) && namesToPlugins[pluginName] === pluginModule || (namesToPlugins[pluginName] && invariant(!1, "EventPluginRegistry: Cannot inject two different event plugins using the same name, `%s`.", pluginName), 
                namesToPlugins[pluginName] = pluginModule, isOrderingDirty = !0);
            }
            isOrderingDirty && recomputePluginOrdering();
        }
        var validateEventDispatches, EventPluginRegistry = Object.freeze({
            plugins: plugins,
            eventNameDispatchConfigs: eventNameDispatchConfigs,
            registrationNameModules: registrationNameModules,
            registrationNameDependencies: registrationNameDependencies,
            possibleRegistrationNames: possibleRegistrationNames,
            injectEventPluginOrder: injectEventPluginOrder,
            injectEventPluginsByName: injectEventPluginsByName
        }), getFiberCurrentPropsFromNode = null, getInstanceFromNode = null, getNodeFromInstance = null, injection$1_injectComponentTree = function(Injected) {
            getFiberCurrentPropsFromNode = Injected.getFiberCurrentPropsFromNode, getInstanceFromNode = Injected.getInstanceFromNode, 
            (getNodeFromInstance = Injected.getNodeFromInstance) && getInstanceFromNode || warning(!1, "EventPluginUtils.injection.injectComponentTree(...): Injected module is missing getNodeFromInstance or getInstanceFromNode.");
        };
        function executeDispatch(event, simulated, listener, inst) {
            var type = event.type || "unknown-event";
            event.currentTarget = getNodeFromInstance(inst), ReactErrorUtils.invokeGuardedCallbackAndCatchFirstError(type, listener, void 0, event), 
            event.currentTarget = null;
        }
        function accumulateInto(current, next) {
            return null == next && invariant(!1, "accumulateInto(...): Accumulated items must not be null or undefined."), 
            null == current ? next : Array.isArray(current) ? Array.isArray(next) ? (current.push.apply(current, next), 
            current) : (current.push(next), current) : Array.isArray(next) ? [ current ].concat(next) : [ current, next ];
        }
        function forEachAccumulated(arr, cb, scope) {
            Array.isArray(arr) ? arr.forEach(cb, scope) : arr && cb.call(scope, arr);
        }
        validateEventDispatches = function(event) {
            var dispatchListeners = event._dispatchListeners, dispatchInstances = event._dispatchInstances, listenersIsArr = Array.isArray(dispatchListeners), listenersLen = listenersIsArr ? dispatchListeners.length : dispatchListeners ? 1 : 0, instancesIsArr = Array.isArray(dispatchInstances), instancesLen = instancesIsArr ? dispatchInstances.length : dispatchInstances ? 1 : 0;
            (instancesIsArr !== listenersIsArr || instancesLen !== listenersLen) && warning(!1, "EventPluginUtils: Invalid `event`.");
        };
        var eventQueue = null, executeDispatchesAndRelease = function(event, simulated) {
            event && (!function(event, simulated) {
                var dispatchListeners = event._dispatchListeners, dispatchInstances = event._dispatchInstances;
                if (validateEventDispatches(event), Array.isArray(dispatchListeners)) for (var i = 0; i < dispatchListeners.length && !event.isPropagationStopped(); i++) executeDispatch(event, 0, dispatchListeners[i], dispatchInstances[i]); else dispatchListeners && executeDispatch(event, 0, dispatchListeners, dispatchInstances);
                event._dispatchListeners = null, event._dispatchInstances = null;
            }(event), event.isPersistent() || event.constructor.release(event));
        }, executeDispatchesAndReleaseSimulated = function(e) {
            return executeDispatchesAndRelease(e);
        }, executeDispatchesAndReleaseTopLevel = function(e) {
            return executeDispatchesAndRelease(e);
        };
        var injection = {
            injectEventPluginOrder: injectEventPluginOrder,
            injectEventPluginsByName: injectEventPluginsByName
        };
        function getListener(inst, registrationName) {
            var listener, stateNode = inst.stateNode;
            if (!stateNode) return null;
            var props = getFiberCurrentPropsFromNode(stateNode);
            return props ? (listener = props[registrationName], function(name, type, props) {
                switch (name) {
                  case "onClick":
                  case "onClickCapture":
                  case "onDoubleClick":
                  case "onDoubleClickCapture":
                  case "onMouseDown":
                  case "onMouseDownCapture":
                  case "onMouseMove":
                  case "onMouseMoveCapture":
                  case "onMouseUp":
                  case "onMouseUpCapture":
                    return !(!props.disabled || (tag = type, "button" !== tag && "input" !== tag && "select" !== tag && "textarea" !== tag));

                  default:
                    return !1;
                }
                var tag;
            }(registrationName, inst.type, props) ? null : (listener && "function" != typeof listener && invariant(!1, "Expected `%s` listener to be a function, instead got a value of `%s` type.", registrationName, typeof listener), 
            listener)) : null;
        }
        function runEventsInBatch(events, simulated) {
            null !== events && (eventQueue = accumulateInto(eventQueue, events));
            var processingEventQueue = eventQueue;
            eventQueue = null, processingEventQueue && (forEachAccumulated(processingEventQueue, simulated ? executeDispatchesAndReleaseSimulated : executeDispatchesAndReleaseTopLevel), 
            eventQueue && invariant(!1, "processEventQueue(): Additional events were enqueued while processing an event queue. Support for this has not yet been implemented."), 
            ReactErrorUtils.rethrowCaughtError());
        }
        function runExtractedEventsInBatch(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
            runEventsInBatch(function(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
                for (var events = null, i = 0; i < plugins.length; i++) {
                    var possiblePlugin = plugins[i];
                    if (possiblePlugin) {
                        var extractedEvents = possiblePlugin.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
                        extractedEvents && (events = accumulateInto(events, extractedEvents));
                    }
                }
                return events;
            }(topLevelType, targetInst, nativeEvent, nativeEventTarget), !1);
        }
        var EventPluginHub = Object.freeze({
            injection: injection,
            getListener: getListener,
            runEventsInBatch: runEventsInBatch,
            runExtractedEventsInBatch: runExtractedEventsInBatch
        }), randomKey = Math.random().toString(36).slice(2), internalInstanceKey = "__reactInternalInstance$" + randomKey, internalEventHandlersKey = "__reactEventHandlers$" + randomKey;
        function precacheFiberNode(hostInst, node) {
            node[internalInstanceKey] = hostInst;
        }
        function getClosestInstanceFromNode(node) {
            if (node[internalInstanceKey]) return node[internalInstanceKey];
            for (;!node[internalInstanceKey]; ) {
                if (!node.parentNode) return null;
                node = node.parentNode;
            }
            var inst = node[internalInstanceKey];
            return 5 === inst.tag || 6 === inst.tag ? inst : null;
        }
        function getInstanceFromNode$1(node) {
            var inst = node[internalInstanceKey];
            return inst && (5 === inst.tag || 6 === inst.tag) ? inst : null;
        }
        function getNodeFromInstance$1(inst) {
            if (5 === inst.tag || 6 === inst.tag) return inst.stateNode;
            invariant(!1, "getNodeFromInstance: Invalid argument.");
        }
        function getFiberCurrentPropsFromNode$1(node) {
            return node[internalEventHandlersKey] || null;
        }
        function updateFiberProps(node, props) {
            node[internalEventHandlersKey] = props;
        }
        var ReactDOMComponentTree = Object.freeze({
            precacheFiberNode: precacheFiberNode,
            getClosestInstanceFromNode: getClosestInstanceFromNode,
            getInstanceFromNode: getInstanceFromNode$1,
            getNodeFromInstance: getNodeFromInstance$1,
            getFiberCurrentPropsFromNode: getFiberCurrentPropsFromNode$1,
            updateFiberProps: updateFiberProps
        });
        function getParent(inst) {
            do {
                inst = inst.return;
            } while (inst && 5 !== inst.tag);
            return inst || null;
        }
        function traverseTwoPhase(inst, fn, arg) {
            for (var path = []; inst; ) path.push(inst), inst = getParent(inst);
            var i = void 0;
            for (i = path.length; i-- > 0; ) fn(path[i], "captured", arg);
            for (i = 0; i < path.length; i++) fn(path[i], "bubbled", arg);
        }
        function traverseEnterLeave(from, to, fn, argFrom, argTo) {
            for (var common = from && to ? function(instA, instB) {
                for (var depthA = 0, tempA = instA; tempA; tempA = getParent(tempA)) depthA++;
                for (var depthB = 0, tempB = instB; tempB; tempB = getParent(tempB)) depthB++;
                for (;depthA - depthB > 0; ) instA = getParent(instA), depthA--;
                for (;depthB - depthA > 0; ) instB = getParent(instB), depthB--;
                for (var depth = depthA; depth--; ) {
                    if (instA === instB || instA === instB.alternate) return instA;
                    instA = getParent(instA), instB = getParent(instB);
                }
                return null;
            }(from, to) : null, pathFrom = []; from && from !== common; ) {
                var alternate = from.alternate;
                if (null !== alternate && alternate === common) break;
                pathFrom.push(from), from = getParent(from);
            }
            for (var pathTo = []; to && to !== common; ) {
                var _alternate = to.alternate;
                if (null !== _alternate && _alternate === common) break;
                pathTo.push(to), to = getParent(to);
            }
            for (var i = 0; i < pathFrom.length; i++) fn(pathFrom[i], "bubbled", argFrom);
            for (var _i = pathTo.length; _i-- > 0; ) fn(pathTo[_i], "captured", argTo);
        }
        function accumulateDirectionalDispatches(inst, phase, event) {
            inst || warning(!1, "Dispatching inst must not be null");
            var listener = function(inst, event, propagationPhase) {
                return getListener(inst, event.dispatchConfig.phasedRegistrationNames[propagationPhase]);
            }(inst, event, phase);
            listener && (event._dispatchListeners = accumulateInto(event._dispatchListeners, listener), 
            event._dispatchInstances = accumulateInto(event._dispatchInstances, inst));
        }
        function accumulateTwoPhaseDispatchesSingle(event) {
            event && event.dispatchConfig.phasedRegistrationNames && traverseTwoPhase(event._targetInst, accumulateDirectionalDispatches, event);
        }
        function accumulateTwoPhaseDispatchesSingleSkipTarget(event) {
            if (event && event.dispatchConfig.phasedRegistrationNames) {
                var targetInst = event._targetInst;
                traverseTwoPhase(targetInst ? getParent(targetInst) : null, accumulateDirectionalDispatches, event);
            }
        }
        function accumulateDispatches(inst, ignoredDirection, event) {
            if (inst && event && event.dispatchConfig.registrationName) {
                var listener = getListener(inst, event.dispatchConfig.registrationName);
                listener && (event._dispatchListeners = accumulateInto(event._dispatchListeners, listener), 
                event._dispatchInstances = accumulateInto(event._dispatchInstances, inst));
            }
        }
        function accumulateDirectDispatchesSingle(event) {
            event && event.dispatchConfig.registrationName && accumulateDispatches(event._targetInst, 0, event);
        }
        function accumulateTwoPhaseDispatches(events) {
            forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
        }
        function accumulateEnterLeaveDispatches(leave, enter, from, to) {
            traverseEnterLeave(from, to, accumulateDispatches, leave, enter);
        }
        var EventPropagators = Object.freeze({
            accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
            accumulateTwoPhaseDispatchesSkipTarget: function(events) {
                forEachAccumulated(events, accumulateTwoPhaseDispatchesSingleSkipTarget);
            },
            accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches,
            accumulateDirectDispatches: function(events) {
                forEachAccumulated(events, accumulateDirectDispatchesSingle);
            }
        });
        function makePrefixMap(styleProp, eventName) {
            var prefixes = {};
            return prefixes[styleProp.toLowerCase()] = eventName.toLowerCase(), prefixes["Webkit" + styleProp] = "webkit" + eventName, 
            prefixes["Moz" + styleProp] = "moz" + eventName, prefixes["ms" + styleProp] = "MS" + eventName, 
            prefixes["O" + styleProp] = "o" + eventName.toLowerCase(), prefixes;
        }
        var vendorPrefixes = {
            animationend: makePrefixMap("Animation", "AnimationEnd"),
            animationiteration: makePrefixMap("Animation", "AnimationIteration"),
            animationstart: makePrefixMap("Animation", "AnimationStart"),
            transitionend: makePrefixMap("Transition", "TransitionEnd")
        }, prefixedEventNames = {}, style = {};
        function getVendorPrefixedEventName(eventName) {
            if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
            if (!vendorPrefixes[eventName]) return eventName;
            var prefixMap = vendorPrefixes[eventName];
            for (var styleProp in prefixMap) if (prefixMap.hasOwnProperty(styleProp) && styleProp in style) return prefixedEventNames[eventName] = prefixMap[styleProp];
            return eventName;
        }
        ExecutionEnvironment.canUseDOM && (style = document.createElement("div").style, 
        "AnimationEvent" in window || (delete vendorPrefixes.animationend.animation, delete vendorPrefixes.animationiteration.animation, 
        delete vendorPrefixes.animationstart.animation), "TransitionEvent" in window || delete vendorPrefixes.transitionend.transition);
        var TOP_ANIMATION_END = getVendorPrefixedEventName("animationend"), TOP_ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration"), TOP_ANIMATION_START = getVendorPrefixedEventName("animationstart"), TOP_TRANSITION_END = getVendorPrefixedEventName("transitionend"), mediaEventTypes = [ "abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting" ];
        var contentKey = null;
        function getTextContentAccessor() {
            return !contentKey && ExecutionEnvironment.canUseDOM && (contentKey = "textContent" in document.documentElement ? "textContent" : "innerText"), 
            contentKey;
        }
        var compositionState = {
            _root: null,
            _startText: null,
            _fallbackText: null
        };
        function getData() {
            if (compositionState._fallbackText) return compositionState._fallbackText;
            var start = void 0, startValue = compositionState._startText, startLength = startValue.length, end = void 0, endValue = getText(), endLength = endValue.length;
            for (start = 0; start < startLength && startValue[start] === endValue[start]; start++) ;
            var minEnd = startLength - start;
            for (end = 1; end <= minEnd && startValue[startLength - end] === endValue[endLength - end]; end++) ;
            var sliceTail = end > 1 ? 1 - end : void 0;
            return compositionState._fallbackText = endValue.slice(start, sliceTail), compositionState._fallbackText;
        }
        function getText() {
            return "value" in compositionState._root ? compositionState._root.value : compositionState._root[getTextContentAccessor()];
        }
        var didWarnForAddedNewProperty = !1, shouldBeReleasedProperties = [ "dispatchConfig", "_targetInst", "nativeEvent", "isDefaultPrevented", "isPropagationStopped", "_dispatchListeners", "_dispatchInstances" ], EventInterface = {
            type: null,
            target: null,
            currentTarget: emptyFunction.thatReturnsNull,
            eventPhase: null,
            bubbles: null,
            cancelable: null,
            timeStamp: function(event) {
                return event.timeStamp || Date.now();
            },
            defaultPrevented: null,
            isTrusted: null
        };
        function SyntheticEvent(dispatchConfig, targetInst, nativeEvent, nativeEventTarget) {
            delete this.nativeEvent, delete this.preventDefault, delete this.stopPropagation, 
            this.dispatchConfig = dispatchConfig, this._targetInst = targetInst, this.nativeEvent = nativeEvent;
            var Interface = this.constructor.Interface;
            for (var propName in Interface) if (Interface.hasOwnProperty(propName)) {
                delete this[propName];
                var normalize = Interface[propName];
                normalize ? this[propName] = normalize(nativeEvent) : "target" === propName ? this.target = nativeEventTarget : this[propName] = nativeEvent[propName];
            }
            var defaultPrevented = null != nativeEvent.defaultPrevented ? nativeEvent.defaultPrevented : !1 === nativeEvent.returnValue;
            return this.isDefaultPrevented = defaultPrevented ? emptyFunction.thatReturnsTrue : emptyFunction.thatReturnsFalse, 
            this.isPropagationStopped = emptyFunction.thatReturnsFalse, this;
        }
        function getPooledWarningPropertyDefinition(propName, getVal) {
            var isFunction = "function" == typeof getVal;
            return {
                configurable: !0,
                set: function(val) {
                    return warn(isFunction ? "setting the method" : "setting the property", "This is effectively a no-op"), 
                    val;
                },
                get: function() {
                    return warn(isFunction ? "accessing the method" : "accessing the property", isFunction ? "This is a no-op function" : "This is set to null"), 
                    getVal;
                }
            };
            function warn(action, result) {
                warning(!1, "This synthetic event is reused for performance reasons. If you're seeing this, you're %s `%s` on a released/nullified synthetic event. %s. If you must keep the original synthetic event around, use event.persist(). See https://fb.me/react-event-pooling for more information.", action, propName, result);
            }
        }
        function getPooledEvent(dispatchConfig, targetInst, nativeEvent, nativeInst) {
            if (this.eventPool.length) {
                var instance = this.eventPool.pop();
                return this.call(instance, dispatchConfig, targetInst, nativeEvent, nativeInst), 
                instance;
            }
            return new this(dispatchConfig, targetInst, nativeEvent, nativeInst);
        }
        function releasePooledEvent(event) {
            event instanceof this || invariant(!1, "Trying to release an event instance  into a pool of a different type."), 
            event.destructor(), this.eventPool.length < 10 && this.eventPool.push(event);
        }
        function addEventPoolingTo(EventConstructor) {
            EventConstructor.eventPool = [], EventConstructor.getPooled = getPooledEvent, EventConstructor.release = releasePooledEvent;
        }
        _assign(SyntheticEvent.prototype, {
            preventDefault: function() {
                this.defaultPrevented = !0;
                var event = this.nativeEvent;
                event && (event.preventDefault ? event.preventDefault() : "unknown" != typeof event.returnValue && (event.returnValue = !1), 
                this.isDefaultPrevented = emptyFunction.thatReturnsTrue);
            },
            stopPropagation: function() {
                var event = this.nativeEvent;
                event && (event.stopPropagation ? event.stopPropagation() : "unknown" != typeof event.cancelBubble && (event.cancelBubble = !0), 
                this.isPropagationStopped = emptyFunction.thatReturnsTrue);
            },
            persist: function() {
                this.isPersistent = emptyFunction.thatReturnsTrue;
            },
            isPersistent: emptyFunction.thatReturnsFalse,
            destructor: function() {
                var Interface = this.constructor.Interface;
                for (var propName in Interface) Object.defineProperty(this, propName, getPooledWarningPropertyDefinition(propName, Interface[propName]));
                for (var i = 0; i < shouldBeReleasedProperties.length; i++) this[shouldBeReleasedProperties[i]] = null;
                Object.defineProperty(this, "nativeEvent", getPooledWarningPropertyDefinition("nativeEvent", null)), 
                Object.defineProperty(this, "preventDefault", getPooledWarningPropertyDefinition("preventDefault", emptyFunction)), 
                Object.defineProperty(this, "stopPropagation", getPooledWarningPropertyDefinition("stopPropagation", emptyFunction));
            }
        }), SyntheticEvent.Interface = EventInterface, SyntheticEvent.extend = function(Interface) {
            var Super = this, E = function() {};
            E.prototype = Super.prototype;
            var prototype = new E;
            function Class() {
                return Super.apply(this, arguments);
            }
            return _assign(prototype, Class.prototype), Class.prototype = prototype, Class.prototype.constructor = Class, 
            Class.Interface = _assign({}, Super.Interface, Interface), Class.extend = Super.extend, 
            addEventPoolingTo(Class), Class;
        }, "function" == typeof Proxy && !Object.isSealed(new Proxy({}, {})) && (SyntheticEvent = new Proxy(SyntheticEvent, {
            construct: function(target, args) {
                return this.apply(target, Object.create(target.prototype), args);
            },
            apply: function(constructor, that, args) {
                return new Proxy(constructor.apply(that, args), {
                    set: function(target, prop, value) {
                        return "isPersistent" === prop || target.constructor.Interface.hasOwnProperty(prop) || -1 !== shouldBeReleasedProperties.indexOf(prop) || (didWarnForAddedNewProperty || target.isPersistent() || warning(!1, "This synthetic event is reused for performance reasons. If you're seeing this, you're adding a new property in the synthetic event object. The property is never released. See https://fb.me/react-event-pooling for more information."), 
                        didWarnForAddedNewProperty = !0), target[prop] = value, !0;
                    }
                });
            }
        })), addEventPoolingTo(SyntheticEvent);
        var SyntheticEvent$1 = SyntheticEvent, SyntheticCompositionEvent = SyntheticEvent$1.extend({
            data: null
        }), SyntheticInputEvent = SyntheticEvent$1.extend({
            data: null
        }), END_KEYCODES = [ 9, 13, 27, 32 ], canUseCompositionEvent = ExecutionEnvironment.canUseDOM && "CompositionEvent" in window, documentMode = null;
        ExecutionEnvironment.canUseDOM && "documentMode" in document && (documentMode = document.documentMode);
        var canUseTextInputEvent = ExecutionEnvironment.canUseDOM && "TextEvent" in window && !documentMode, useFallbackCompositionData = ExecutionEnvironment.canUseDOM && (!canUseCompositionEvent || documentMode && documentMode > 8 && documentMode <= 11), SPACEBAR_CHAR = String.fromCharCode(32), eventTypes = {
            beforeInput: {
                phasedRegistrationNames: {
                    bubbled: "onBeforeInput",
                    captured: "onBeforeInputCapture"
                },
                dependencies: [ "compositionend", "keypress", "textInput", "paste" ]
            },
            compositionEnd: {
                phasedRegistrationNames: {
                    bubbled: "onCompositionEnd",
                    captured: "onCompositionEndCapture"
                },
                dependencies: [ "blur", "compositionend", "keydown", "keypress", "keyup", "mousedown" ]
            },
            compositionStart: {
                phasedRegistrationNames: {
                    bubbled: "onCompositionStart",
                    captured: "onCompositionStartCapture"
                },
                dependencies: [ "blur", "compositionstart", "keydown", "keypress", "keyup", "mousedown" ]
            },
            compositionUpdate: {
                phasedRegistrationNames: {
                    bubbled: "onCompositionUpdate",
                    captured: "onCompositionUpdateCapture"
                },
                dependencies: [ "blur", "compositionupdate", "keydown", "keypress", "keyup", "mousedown" ]
            }
        }, hasSpaceKeypress = !1;
        function isFallbackCompositionEnd(topLevelType, nativeEvent) {
            switch (topLevelType) {
              case "keyup":
                return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);

              case "keydown":
                return 229 !== nativeEvent.keyCode;

              case "keypress":
              case "mousedown":
              case "blur":
                return !0;

              default:
                return !1;
            }
        }
        function getDataFromCustomEvent(nativeEvent) {
            var detail = nativeEvent.detail;
            return "object" == typeof detail && "data" in detail ? detail.data : null;
        }
        var isComposing = !1;
        function extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
            var eventType = void 0, fallbackData = void 0;
            if (canUseCompositionEvent ? eventType = function(topLevelType) {
                switch (topLevelType) {
                  case "compositionstart":
                    return eventTypes.compositionStart;

                  case "compositionend":
                    return eventTypes.compositionEnd;

                  case "compositionupdate":
                    return eventTypes.compositionUpdate;
                }
            }(topLevelType) : isComposing ? isFallbackCompositionEnd(topLevelType, nativeEvent) && (eventType = eventTypes.compositionEnd) : function(topLevelType, nativeEvent) {
                return "keydown" === topLevelType && 229 === nativeEvent.keyCode;
            }(topLevelType, nativeEvent) && (eventType = eventTypes.compositionStart), !eventType) return null;
            useFallbackCompositionData && (isComposing || eventType !== eventTypes.compositionStart ? eventType === eventTypes.compositionEnd && isComposing && (fallbackData = getData()) : isComposing = function(nativeEventTarget) {
                return compositionState._root = nativeEventTarget, compositionState._startText = getText(), 
                !0;
            }(nativeEventTarget));
            var event = SyntheticCompositionEvent.getPooled(eventType, targetInst, nativeEvent, nativeEventTarget);
            if (fallbackData) event.data = fallbackData; else {
                var customData = getDataFromCustomEvent(nativeEvent);
                null !== customData && (event.data = customData);
            }
            return accumulateTwoPhaseDispatches(event), event;
        }
        function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
            if (isComposing) {
                if ("compositionend" === topLevelType || !canUseCompositionEvent && isFallbackCompositionEnd(topLevelType, nativeEvent)) {
                    var chars = getData();
                    return compositionState._root = null, compositionState._startText = null, compositionState._fallbackText = null, 
                    isComposing = !1, chars;
                }
                return null;
            }
            switch (topLevelType) {
              case "paste":
                return null;

              case "keypress":
                if (!function(nativeEvent) {
                    return (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) && !(nativeEvent.ctrlKey && nativeEvent.altKey);
                }(nativeEvent)) {
                    if (nativeEvent.char && nativeEvent.char.length > 1) return nativeEvent.char;
                    if (nativeEvent.which) return String.fromCharCode(nativeEvent.which);
                }
                return null;

              case "compositionend":
                return useFallbackCompositionData ? null : nativeEvent.data;

              default:
                return null;
            }
        }
        function extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
            var chars = void 0;
            if (!(chars = canUseTextInputEvent ? function(topLevelType, nativeEvent) {
                switch (topLevelType) {
                  case "compositionend":
                    return getDataFromCustomEvent(nativeEvent);

                  case "keypress":
                    return 32 !== nativeEvent.which ? null : (hasSpaceKeypress = !0, SPACEBAR_CHAR);

                  case "textInput":
                    var chars = nativeEvent.data;
                    return chars === SPACEBAR_CHAR && hasSpaceKeypress ? null : chars;

                  default:
                    return null;
                }
            }(topLevelType, nativeEvent) : getFallbackBeforeInputChars(topLevelType, nativeEvent))) return null;
            var event = SyntheticInputEvent.getPooled(eventTypes.beforeInput, targetInst, nativeEvent, nativeEventTarget);
            return event.data = chars, accumulateTwoPhaseDispatches(event), event;
        }
        var BeforeInputEventPlugin = {
            eventTypes: eventTypes,
            extractEvents: function(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
                var composition = extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget), beforeInput = extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget);
                return null === composition ? beforeInput : null === beforeInput ? composition : [ composition, beforeInput ];
            }
        }, fiberHostComponent = null, restoreTarget = null, restoreQueue = null;
        function restoreStateOfTarget(target) {
            var internalInstance = getInstanceFromNode(target);
            if (internalInstance) {
                fiberHostComponent && "function" == typeof fiberHostComponent.restoreControlledState || invariant(!1, "Fiber needs to be injected to handle a fiber target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
                var props = getFiberCurrentPropsFromNode(internalInstance.stateNode);
                fiberHostComponent.restoreControlledState(internalInstance.stateNode, internalInstance.type, props);
            }
        }
        var injection$2 = {
            injectFiberControlledHostComponent: function(hostComponentImpl) {
                fiberHostComponent = hostComponentImpl;
            }
        };
        function enqueueStateRestore(target) {
            restoreTarget ? restoreQueue ? restoreQueue.push(target) : restoreQueue = [ target ] : restoreTarget = target;
        }
        function needsStateRestore() {
            return null !== restoreTarget || null !== restoreQueue;
        }
        function restoreStateIfNeeded() {
            if (restoreTarget) {
                var target = restoreTarget, queuedTargets = restoreQueue;
                if (restoreTarget = null, restoreQueue = null, restoreStateOfTarget(target), queuedTargets) for (var i = 0; i < queuedTargets.length; i++) restoreStateOfTarget(queuedTargets[i]);
            }
        }
        var ReactControlledComponent = Object.freeze({
            injection: injection$2,
            enqueueStateRestore: enqueueStateRestore,
            needsStateRestore: needsStateRestore,
            restoreStateIfNeeded: restoreStateIfNeeded
        }), _batchedUpdates = function(fn, bookkeeping) {
            return fn(bookkeeping);
        }, _interactiveUpdates = function(fn, a, b) {
            return fn(a, b);
        }, _flushInteractiveUpdates = function() {}, isBatching = !1;
        function batchedUpdates(fn, bookkeeping) {
            if (isBatching) return fn(bookkeeping);
            isBatching = !0;
            try {
                return _batchedUpdates(fn, bookkeeping);
            } finally {
                isBatching = !1, needsStateRestore() && (_flushInteractiveUpdates(), restoreStateIfNeeded());
            }
        }
        var injection$3_injectRenderer = function(renderer) {
            _batchedUpdates = renderer.batchedUpdates, _interactiveUpdates = renderer.interactiveUpdates, 
            _flushInteractiveUpdates = renderer.flushInteractiveUpdates;
        }, supportedInputTypes = {
            color: !0,
            date: !0,
            datetime: !0,
            "datetime-local": !0,
            email: !0,
            month: !0,
            number: !0,
            password: !0,
            range: !0,
            search: !0,
            tel: !0,
            text: !0,
            time: !0,
            url: !0,
            week: !0
        };
        function isTextInputElement(elem) {
            var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
            return "input" === nodeName ? !!supportedInputTypes[elem.type] : "textarea" === nodeName;
        }
        function getEventTarget(nativeEvent) {
            var target = nativeEvent.target || nativeEvent.srcElement || window;
            return target.correspondingUseElement && (target = target.correspondingUseElement), 
            3 === target.nodeType ? target.parentNode : target;
        }
        /**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */        function isEventSupported(eventNameSuffix, capture) {
            if (!ExecutionEnvironment.canUseDOM || capture && !("addEventListener" in document)) return !1;
            var eventName = "on" + eventNameSuffix, isSupported = eventName in document;
            if (!isSupported) {
                var element = document.createElement("div");
                element.setAttribute(eventName, "return;"), isSupported = "function" == typeof element[eventName];
            }
            return isSupported;
        }
        function isCheckable(elem) {
            var type = elem.type, nodeName = elem.nodeName;
            return nodeName && "input" === nodeName.toLowerCase() && ("checkbox" === type || "radio" === type);
        }
        function getTracker(node) {
            return node._valueTracker;
        }
        function track(node) {
            getTracker(node) || (node._valueTracker = function(node) {
                var valueField = isCheckable(node) ? "checked" : "value", descriptor = Object.getOwnPropertyDescriptor(node.constructor.prototype, valueField), currentValue = "" + node[valueField];
                if (!node.hasOwnProperty(valueField) && void 0 !== descriptor && "function" == typeof descriptor.get && "function" == typeof descriptor.set) {
                    var get = descriptor.get, set = descriptor.set;
                    return Object.defineProperty(node, valueField, {
                        configurable: !0,
                        get: function() {
                            return get.call(this);
                        },
                        set: function(value) {
                            currentValue = "" + value, set.call(this, value);
                        }
                    }), Object.defineProperty(node, valueField, {
                        enumerable: descriptor.enumerable
                    }), {
                        getValue: function() {
                            return currentValue;
                        },
                        setValue: function(value) {
                            currentValue = "" + value;
                        },
                        stopTracking: function() {
                            !function(node) {
                                node._valueTracker = null;
                            }(node), delete node[valueField];
                        }
                    };
                }
            }(node));
        }
        function updateValueIfChanged(node) {
            if (!node) return !1;
            var tracker = getTracker(node);
            if (!tracker) return !0;
            var lastValue = tracker.getValue(), nextValue = function(node) {
                var value = "";
                return node ? value = isCheckable(node) ? node.checked ? "true" : "false" : node.value : value;
            }(node);
            return nextValue !== lastValue && (tracker.setValue(nextValue), !0);
        }
        var ReactInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ReactCurrentOwner = ReactInternals.ReactCurrentOwner, ReactDebugCurrentFrame = ReactInternals.ReactDebugCurrentFrame, hasSymbol = "function" == typeof Symbol && Symbol.for, REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103, REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106, REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107, REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108, REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114, REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109, REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110, REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111, REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112, REACT_TIMEOUT_TYPE = hasSymbol ? Symbol.for("react.timeout") : 60113, MAYBE_ITERATOR_SYMBOL = "function" == typeof Symbol && Symbol.iterator;
        function getIteratorFn(maybeIterable) {
            if (null == maybeIterable) return null;
            var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
            return "function" == typeof maybeIterator ? maybeIterator : null;
        }
        function getComponentName(fiber) {
            var type = fiber.type;
            if ("function" == typeof type) return type.displayName || type.name;
            if ("string" == typeof type) return type;
            switch (type) {
              case REACT_ASYNC_MODE_TYPE:
                return "AsyncMode";

              case REACT_CONTEXT_TYPE:
                return "Context.Consumer";

              case REACT_FRAGMENT_TYPE:
                return "ReactFragment";

              case REACT_PORTAL_TYPE:
                return "ReactPortal";

              case REACT_PROFILER_TYPE:
                return "Profiler(" + fiber.pendingProps.id + ")";

              case REACT_PROVIDER_TYPE:
                return "Context.Provider";

              case REACT_STRICT_MODE_TYPE:
                return "StrictMode";

              case REACT_TIMEOUT_TYPE:
                return "Timeout";
            }
            if ("object" == typeof type && null !== type) switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                var functionName = type.render.displayName || type.render.name || "";
                return "" !== functionName ? "ForwardRef(" + functionName + ")" : "ForwardRef";
            }
            return null;
        }
        function describeFiber(fiber) {
            switch (fiber.tag) {
              case 0:
              case 1:
              case 2:
              case 5:
                var owner = fiber._debugOwner, source = fiber._debugSource, name = getComponentName(fiber), ownerName = null;
                return owner && (ownerName = getComponentName(owner)), function(name, source, ownerName) {
                    return "\n    in " + (name || "Unknown") + (source ? " (at " + source.fileName.replace(/^.*[\\\/]/, "") + ":" + source.lineNumber + ")" : ownerName ? " (created by " + ownerName + ")" : "");
                }(name, source, ownerName);

              default:
                return "";
            }
        }
        function getStackAddendumByWorkInProgressFiber(workInProgress) {
            var info = "", node = workInProgress;
            do {
                info += describeFiber(node), node = node.return;
            } while (node);
            return info;
        }
        function getCurrentFiberStackAddendum$1() {
            var fiber = ReactDebugCurrentFiber.current;
            return null === fiber ? null : getStackAddendumByWorkInProgressFiber(fiber);
        }
        var ReactDebugCurrentFiber = {
            current: null,
            phase: null,
            resetCurrentFiber: function() {
                ReactDebugCurrentFrame.getCurrentStack = null, ReactDebugCurrentFiber.current = null, 
                ReactDebugCurrentFiber.phase = null;
            },
            setCurrentFiber: function(fiber) {
                ReactDebugCurrentFrame.getCurrentStack = getCurrentFiberStackAddendum$1, ReactDebugCurrentFiber.current = fiber, 
                ReactDebugCurrentFiber.phase = null;
            },
            setCurrentPhase: function(phase) {
                ReactDebugCurrentFiber.phase = phase;
            },
            getCurrentFiberOwnerName: function() {
                var fiber = ReactDebugCurrentFiber.current;
                if (null === fiber) return null;
                var owner = fiber._debugOwner;
                return null != owner ? getComponentName(owner) : null;
            },
            getCurrentFiberStackAddendum: getCurrentFiberStackAddendum$1
        }, ATTRIBUTE_NAME_START_CHAR = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ATTRIBUTE_NAME_CHAR = ATTRIBUTE_NAME_START_CHAR + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", VALID_ATTRIBUTE_NAME_REGEX = new RegExp("^[" + ATTRIBUTE_NAME_START_CHAR + "][" + ATTRIBUTE_NAME_CHAR + "]*$"), hasOwnProperty = Object.prototype.hasOwnProperty, illegalAttributeNameCache = {}, validatedAttributeNameCache = {};
        function isAttributeNameSafe(attributeName) {
            return !!hasOwnProperty.call(validatedAttributeNameCache, attributeName) || !hasOwnProperty.call(illegalAttributeNameCache, attributeName) && (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName) ? (validatedAttributeNameCache[attributeName] = !0, 
            !0) : (illegalAttributeNameCache[attributeName] = !0, warning(!1, "Invalid attribute name: `%s`", attributeName), 
            !1));
        }
        function shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag) {
            return null !== propertyInfo ? 0 === propertyInfo.type : !isCustomComponentTag && (name.length > 2 && ("o" === name[0] || "O" === name[0]) && ("n" === name[1] || "N" === name[1]));
        }
        function shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag) {
            if (null !== propertyInfo && 0 === propertyInfo.type) return !1;
            switch (typeof value) {
              case "function":
              case "symbol":
                return !0;

              case "boolean":
                if (isCustomComponentTag) return !1;
                if (null !== propertyInfo) return !propertyInfo.acceptsBooleans;
                var prefix = name.toLowerCase().slice(0, 5);
                return "data-" !== prefix && "aria-" !== prefix;

              default:
                return !1;
            }
        }
        function shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag) {
            if (null == value) return !0;
            if (shouldRemoveAttributeWithWarning(name, value, propertyInfo, isCustomComponentTag)) return !0;
            if (isCustomComponentTag) return !1;
            if (null !== propertyInfo) switch (propertyInfo.type) {
              case 3:
                return !value;

              case 4:
                return !1 === value;

              case 5:
                return isNaN(value);

              case 6:
                return isNaN(value) || value < 1;
            }
            return !1;
        }
        function getPropertyInfo(name) {
            return properties.hasOwnProperty(name) ? properties[name] : null;
        }
        function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace) {
            this.acceptsBooleans = 2 === type || 3 === type || 4 === type, this.attributeName = attributeName, 
            this.attributeNamespace = attributeNamespace, this.mustUseProperty = mustUseProperty, 
            this.propertyName = name, this.type = type;
        }
        var properties = {};
        [ "children", "dangerouslySetInnerHTML", "defaultValue", "defaultChecked", "innerHTML", "suppressContentEditableWarning", "suppressHydrationWarning", "style" ].forEach((function(name) {
            properties[name] = new PropertyInfoRecord(name, 0, !1, name, null);
        })), [ [ "acceptCharset", "accept-charset" ], [ "className", "class" ], [ "htmlFor", "for" ], [ "httpEquiv", "http-equiv" ] ].forEach((function(_ref) {
            var name = _ref[0], attributeName = _ref[1];
            properties[name] = new PropertyInfoRecord(name, 1, !1, attributeName, null);
        })), [ "contentEditable", "draggable", "spellCheck", "value" ].forEach((function(name) {
            properties[name] = new PropertyInfoRecord(name, 2, !1, name.toLowerCase(), null);
        })), [ "autoReverse", "externalResourcesRequired", "preserveAlpha" ].forEach((function(name) {
            properties[name] = new PropertyInfoRecord(name, 2, !1, name, null);
        })), [ "allowFullScreen", "async", "autoFocus", "autoPlay", "controls", "default", "defer", "disabled", "formNoValidate", "hidden", "loop", "noModule", "noValidate", "open", "playsInline", "readOnly", "required", "reversed", "scoped", "seamless", "itemScope" ].forEach((function(name) {
            properties[name] = new PropertyInfoRecord(name, 3, !1, name.toLowerCase(), null);
        })), [ "checked", "multiple", "muted", "selected" ].forEach((function(name) {
            properties[name] = new PropertyInfoRecord(name, 3, !0, name.toLowerCase(), null);
        })), [ "capture", "download" ].forEach((function(name) {
            properties[name] = new PropertyInfoRecord(name, 4, !1, name.toLowerCase(), null);
        })), [ "cols", "rows", "size", "span" ].forEach((function(name) {
            properties[name] = new PropertyInfoRecord(name, 6, !1, name.toLowerCase(), null);
        })), [ "rowSpan", "start" ].forEach((function(name) {
            properties[name] = new PropertyInfoRecord(name, 5, !1, name.toLowerCase(), null);
        }));
        var CAMELIZE = /[\-\:]([a-z])/g, capitalize = function(token) {
            return token[1].toUpperCase();
        };
        function getValueForProperty(node, name, expected, propertyInfo) {
            if (propertyInfo.mustUseProperty) return node[propertyInfo.propertyName];
            var attributeName = propertyInfo.attributeName, stringValue = null;
            if (4 === propertyInfo.type) {
                if (node.hasAttribute(attributeName)) {
                    var value = node.getAttribute(attributeName);
                    return "" === value || (shouldRemoveAttribute(name, expected, propertyInfo, !1) ? value : value === "" + expected ? expected : value);
                }
            } else if (node.hasAttribute(attributeName)) {
                if (shouldRemoveAttribute(name, expected, propertyInfo, !1)) return node.getAttribute(attributeName);
                if (3 === propertyInfo.type) return expected;
                stringValue = node.getAttribute(attributeName);
            }
            return shouldRemoveAttribute(name, expected, propertyInfo, !1) ? null === stringValue ? expected : stringValue : stringValue === "" + expected ? expected : stringValue;
        }
        function getValueForAttribute(node, name, expected) {
            if (isAttributeNameSafe(name)) {
                if (!node.hasAttribute(name)) return void 0 === expected ? void 0 : null;
                var value = node.getAttribute(name);
                return value === "" + expected ? expected : value;
            }
        }
        function setValueForProperty(node, name, value, isCustomComponentTag) {
            var propertyInfo = getPropertyInfo(name);
            if (!shouldIgnoreAttribute(name, propertyInfo, isCustomComponentTag)) if (shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag) && (value = null), 
            isCustomComponentTag || null === propertyInfo) {
                if (isAttributeNameSafe(name)) {
                    var _attributeName = name;
                    null === value ? node.removeAttribute(_attributeName) : node.setAttribute(_attributeName, "" + value);
                }
            } else if (propertyInfo.mustUseProperty) {
                var propertyName = propertyInfo.propertyName;
                if (null === value) {
                    var type = propertyInfo.type;
                    node[propertyName] = 3 !== type && "";
                } else node[propertyName] = value;
            } else {
                var attributeName = propertyInfo.attributeName, attributeNamespace = propertyInfo.attributeNamespace;
                if (null === value) node.removeAttribute(attributeName); else {
                    var _type = propertyInfo.type, attributeValue = void 0;
                    attributeValue = 3 === _type || 4 === _type && !0 === value ? "" : "" + value, attributeNamespace ? node.setAttributeNS(attributeNamespace, attributeName, attributeValue) : node.setAttribute(attributeName, attributeValue);
                }
            }
        }
        [ "accent-height", "alignment-baseline", "arabic-form", "baseline-shift", "cap-height", "clip-path", "clip-rule", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "dominant-baseline", "enable-background", "fill-opacity", "fill-rule", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "glyph-name", "glyph-orientation-horizontal", "glyph-orientation-vertical", "horiz-adv-x", "horiz-origin-x", "image-rendering", "letter-spacing", "lighting-color", "marker-end", "marker-mid", "marker-start", "overline-position", "overline-thickness", "paint-order", "panose-1", "pointer-events", "rendering-intent", "shape-rendering", "stop-color", "stop-opacity", "strikethrough-position", "strikethrough-thickness", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-anchor", "text-decoration", "text-rendering", "underline-position", "underline-thickness", "unicode-bidi", "unicode-range", "units-per-em", "v-alphabetic", "v-hanging", "v-ideographic", "v-mathematical", "vector-effect", "vert-adv-y", "vert-origin-x", "vert-origin-y", "word-spacing", "writing-mode", "xmlns:xlink", "x-height" ].forEach((function(attributeName) {
            var name = attributeName.replace(CAMELIZE, capitalize);
            properties[name] = new PropertyInfoRecord(name, 1, !1, attributeName, null);
        })), [ "xlink:actuate", "xlink:arcrole", "xlink:href", "xlink:role", "xlink:show", "xlink:title", "xlink:type" ].forEach((function(attributeName) {
            var name = attributeName.replace(CAMELIZE, capitalize);
            properties[name] = new PropertyInfoRecord(name, 1, !1, attributeName, "http://www.w3.org/1999/xlink");
        })), [ "xml:base", "xml:lang", "xml:space" ].forEach((function(attributeName) {
            var name = attributeName.replace(CAMELIZE, capitalize);
            properties[name] = new PropertyInfoRecord(name, 1, !1, attributeName, "http://www.w3.org/XML/1998/namespace");
        })), properties.tabIndex = new PropertyInfoRecord("tabIndex", 1, !1, "tabindex", null);
        var ReactControlledValuePropTypes = {
            checkPropTypes: null
        }, hasReadOnlyValue = {
            button: !0,
            checkbox: !0,
            image: !0,
            hidden: !0,
            radio: !0,
            reset: !0,
            submit: !0
        }, propTypes = {
            value: function(props, propName, componentName) {
                return !props[propName] || hasReadOnlyValue[props.type] || props.onChange || props.readOnly || props.disabled ? null : new Error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.");
            },
            checked: function(props, propName, componentName) {
                return !props[propName] || props.onChange || props.readOnly || props.disabled ? null : new Error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
            }
        };
        ReactControlledValuePropTypes.checkPropTypes = function(tagName, props, getStack) {
            checkPropTypes(propTypes, props, "prop", tagName, getStack);
        };
        var getCurrentFiberOwnerName = ReactDebugCurrentFiber.getCurrentFiberOwnerName, getCurrentFiberStackAddendum = ReactDebugCurrentFiber.getCurrentFiberStackAddendum, didWarnValueDefaultValue = !1, didWarnCheckedDefaultChecked = !1, didWarnControlledToUncontrolled = !1, didWarnUncontrolledToControlled = !1;
        function isControlled(props) {
            return "checkbox" === props.type || "radio" === props.type ? null != props.checked : null != props.value;
        }
        function getHostProps(element, props) {
            var node = element, checked = props.checked;
            return _assign({}, props, {
                defaultChecked: void 0,
                defaultValue: void 0,
                value: void 0,
                checked: null != checked ? checked : node._wrapperState.initialChecked
            });
        }
        function initWrapperState(element, props) {
            ReactControlledValuePropTypes.checkPropTypes("input", props, getCurrentFiberStackAddendum), 
            void 0 === props.checked || void 0 === props.defaultChecked || didWarnCheckedDefaultChecked || (warning(!1, "%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://fb.me/react-controlled-components", getCurrentFiberOwnerName() || "A component", props.type), 
            didWarnCheckedDefaultChecked = !0), void 0 === props.value || void 0 === props.defaultValue || didWarnValueDefaultValue || (warning(!1, "%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://fb.me/react-controlled-components", getCurrentFiberOwnerName() || "A component", props.type), 
            didWarnValueDefaultValue = !0);
            var node = element, defaultValue = null == props.defaultValue ? "" : props.defaultValue;
            node._wrapperState = {
                initialChecked: null != props.checked ? props.checked : props.defaultChecked,
                initialValue: getSafeValue(null != props.value ? props.value : defaultValue),
                controlled: isControlled(props)
            };
        }
        function updateChecked(element, props) {
            var node = element, checked = props.checked;
            null != checked && setValueForProperty(node, "checked", checked, !1);
        }
        function updateWrapper(element, props) {
            var node = element, _controlled = isControlled(props);
            node._wrapperState.controlled || !_controlled || didWarnUncontrolledToControlled || (warning(!1, "A component is changing an uncontrolled input of type %s to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://fb.me/react-controlled-components%s", props.type, getCurrentFiberStackAddendum()), 
            didWarnUncontrolledToControlled = !0), !node._wrapperState.controlled || _controlled || didWarnControlledToUncontrolled || (warning(!1, "A component is changing a controlled input of type %s to be uncontrolled. Input elements should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://fb.me/react-controlled-components%s", props.type, getCurrentFiberStackAddendum()), 
            didWarnControlledToUncontrolled = !0), updateChecked(element, props);
            var value = getSafeValue(props.value);
            null != value && ("number" === props.type ? (0 === value && "" === node.value || node.value != value) && (node.value = "" + value) : node.value !== "" + value && (node.value = "" + value)), 
            props.hasOwnProperty("value") ? setDefaultValue(node, props.type, value) : props.hasOwnProperty("defaultValue") && setDefaultValue(node, props.type, getSafeValue(props.defaultValue)), 
            null == props.checked && null != props.defaultChecked && (node.defaultChecked = !!props.defaultChecked);
        }
        function postMountWrapper(element, props, isHydrating) {
            var node = element;
            if (props.hasOwnProperty("value") || props.hasOwnProperty("defaultValue")) {
                var _initialValue = "" + node._wrapperState.initialValue, currentValue = node.value;
                isHydrating || _initialValue !== currentValue && (node.value = _initialValue), node.defaultValue = _initialValue;
            }
            var name = node.name;
            "" !== name && (node.name = ""), node.defaultChecked = !node.defaultChecked, node.defaultChecked = !node.defaultChecked, 
            "" !== name && (node.name = name);
        }
        function restoreControlledState(element, props) {
            var node = element;
            updateWrapper(node, props), function(rootNode, props) {
                var name = props.name;
                if ("radio" === props.type && null != name) {
                    for (var queryRoot = rootNode; queryRoot.parentNode; ) queryRoot = queryRoot.parentNode;
                    for (var group = queryRoot.querySelectorAll("input[name=" + JSON.stringify("" + name) + '][type="radio"]'), i = 0; i < group.length; i++) {
                        var otherNode = group[i];
                        if (otherNode !== rootNode && otherNode.form === rootNode.form) {
                            var otherProps = getFiberCurrentPropsFromNode$1(otherNode);
                            otherProps || invariant(!1, "ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported."), 
                            updateValueIfChanged(otherNode), updateWrapper(otherNode, otherProps);
                        }
                    }
                }
            }(node, props);
        }
        function setDefaultValue(node, type, value) {
            "number" === type && node.ownerDocument.activeElement === node || (null == value ? node.defaultValue = "" + node._wrapperState.initialValue : node.defaultValue !== "" + value && (node.defaultValue = "" + value));
        }
        function getSafeValue(value) {
            switch (typeof value) {
              case "boolean":
              case "number":
              case "object":
              case "string":
              case "undefined":
                return value;

              default:
                return "";
            }
        }
        var eventTypes$1 = {
            change: {
                phasedRegistrationNames: {
                    bubbled: "onChange",
                    captured: "onChangeCapture"
                },
                dependencies: [ "blur", "change", "click", "focus", "input", "keydown", "keyup", "selectionchange" ]
            }
        };
        function createAndAccumulateChangeEvent(inst, nativeEvent, target) {
            var event = SyntheticEvent$1.getPooled(eventTypes$1.change, inst, nativeEvent, target);
            return event.type = "change", enqueueStateRestore(target), accumulateTwoPhaseDispatches(event), 
            event;
        }
        var activeElement = null, activeElementInst = null;
        function runEventInBatch(event) {
            runEventsInBatch(event, !1);
        }
        function getInstIfValueChanged(targetInst) {
            if (updateValueIfChanged(getNodeFromInstance$1(targetInst))) return targetInst;
        }
        function getTargetInstForChangeEvent(topLevelType, targetInst) {
            if ("change" === topLevelType) return targetInst;
        }
        var isInputEventSupported = !1;
        function stopWatchingForValueChange() {
            activeElement && (activeElement.detachEvent("onpropertychange", handlePropertyChange), 
            activeElement = null, activeElementInst = null);
        }
        function handlePropertyChange(nativeEvent) {
            "value" === nativeEvent.propertyName && getInstIfValueChanged(activeElementInst) && function(nativeEvent) {
                batchedUpdates(runEventInBatch, createAndAccumulateChangeEvent(activeElementInst, nativeEvent, getEventTarget(nativeEvent)));
            }(nativeEvent);
        }
        function handleEventsForInputEventPolyfill(topLevelType, target, targetInst) {
            "focus" === topLevelType ? (stopWatchingForValueChange(), function(target, targetInst) {
                activeElementInst = targetInst, (activeElement = target).attachEvent("onpropertychange", handlePropertyChange);
            }(target, targetInst)) : "blur" === topLevelType && stopWatchingForValueChange();
        }
        function getTargetInstForInputEventPolyfill(topLevelType, targetInst) {
            if ("selectionchange" === topLevelType || "keyup" === topLevelType || "keydown" === topLevelType) return getInstIfValueChanged(activeElementInst);
        }
        function getTargetInstForClickEvent(topLevelType, targetInst) {
            if ("click" === topLevelType) return getInstIfValueChanged(targetInst);
        }
        function getTargetInstForInputOrChangeEvent(topLevelType, targetInst) {
            if ("input" === topLevelType || "change" === topLevelType) return getInstIfValueChanged(targetInst);
        }
        ExecutionEnvironment.canUseDOM && (isInputEventSupported = isEventSupported("input") && (!document.documentMode || document.documentMode > 9));
        var ChangeEventPlugin = {
            eventTypes: eventTypes$1,
            _isInputEventSupported: isInputEventSupported,
            extractEvents: function(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
                var elem, nodeName, node, state, targetNode = targetInst ? getNodeFromInstance$1(targetInst) : window, getTargetInstFunc = void 0, handleEventFunc = void 0;
                if ("select" === (nodeName = (elem = targetNode).nodeName && elem.nodeName.toLowerCase()) || "input" === nodeName && "file" === elem.type ? getTargetInstFunc = getTargetInstForChangeEvent : isTextInputElement(targetNode) ? isInputEventSupported ? getTargetInstFunc = getTargetInstForInputOrChangeEvent : (getTargetInstFunc = getTargetInstForInputEventPolyfill, 
                handleEventFunc = handleEventsForInputEventPolyfill) : function(elem) {
                    var nodeName = elem.nodeName;
                    return nodeName && "input" === nodeName.toLowerCase() && ("checkbox" === elem.type || "radio" === elem.type);
                }(targetNode) && (getTargetInstFunc = getTargetInstForClickEvent), getTargetInstFunc) {
                    var inst = getTargetInstFunc(topLevelType, targetInst);
                    if (inst) return createAndAccumulateChangeEvent(inst, nativeEvent, nativeEventTarget);
                }
                handleEventFunc && handleEventFunc(topLevelType, targetNode, targetInst), "blur" === topLevelType && (state = (node = targetNode)._wrapperState) && state.controlled && "number" === node.type && setDefaultValue(node, "number", node.value);
            }
        }, SyntheticUIEvent = SyntheticEvent$1.extend({
            view: null,
            detail: null
        }), modifierKeyToProp = {
            Alt: "altKey",
            Control: "ctrlKey",
            Meta: "metaKey",
            Shift: "shiftKey"
        };
        function modifierStateGetter(keyArg) {
            var nativeEvent = this.nativeEvent;
            if (nativeEvent.getModifierState) return nativeEvent.getModifierState(keyArg);
            var keyProp = modifierKeyToProp[keyArg];
            return !!keyProp && !!nativeEvent[keyProp];
        }
        function getEventModifierState(nativeEvent) {
            return modifierStateGetter;
        }
        var SyntheticMouseEvent = SyntheticUIEvent.extend({
            screenX: null,
            screenY: null,
            clientX: null,
            clientY: null,
            pageX: null,
            pageY: null,
            ctrlKey: null,
            shiftKey: null,
            altKey: null,
            metaKey: null,
            getModifierState: getEventModifierState,
            button: null,
            buttons: null,
            relatedTarget: function(event) {
                return event.relatedTarget || (event.fromElement === event.srcElement ? event.toElement : event.fromElement);
            }
        }), SyntheticPointerEvent = SyntheticMouseEvent.extend({
            pointerId: null,
            width: null,
            height: null,
            pressure: null,
            tiltX: null,
            tiltY: null,
            pointerType: null,
            isPrimary: null
        }), eventTypes$2 = {
            mouseEnter: {
                registrationName: "onMouseEnter",
                dependencies: [ "mouseout", "mouseover" ]
            },
            mouseLeave: {
                registrationName: "onMouseLeave",
                dependencies: [ "mouseout", "mouseover" ]
            },
            pointerEnter: {
                registrationName: "onPointerEnter",
                dependencies: [ "pointerout", "pointerover" ]
            },
            pointerLeave: {
                registrationName: "onPointerLeave",
                dependencies: [ "pointerout", "pointerover" ]
            }
        }, EnterLeaveEventPlugin = {
            eventTypes: eventTypes$2,
            extractEvents: function(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
                var isOverEvent = "mouseover" === topLevelType || "pointerover" === topLevelType, isOutEvent = "mouseout" === topLevelType || "pointerout" === topLevelType;
                if (isOverEvent && (nativeEvent.relatedTarget || nativeEvent.fromElement)) return null;
                if (!isOutEvent && !isOverEvent) return null;
                var win = void 0;
                if (nativeEventTarget.window === nativeEventTarget) win = nativeEventTarget; else {
                    var doc = nativeEventTarget.ownerDocument;
                    win = doc ? doc.defaultView || doc.parentWindow : window;
                }
                var from = void 0, to = void 0;
                if (isOutEvent) {
                    from = targetInst;
                    var related = nativeEvent.relatedTarget || nativeEvent.toElement;
                    to = related ? getClosestInstanceFromNode(related) : null;
                } else from = null, to = targetInst;
                if (from === to) return null;
                var eventInterface = void 0, leaveEventType = void 0, enterEventType = void 0, eventTypePrefix = void 0;
                "mouseout" === topLevelType || "mouseover" === topLevelType ? (eventInterface = SyntheticMouseEvent, 
                leaveEventType = eventTypes$2.mouseLeave, enterEventType = eventTypes$2.mouseEnter, 
                eventTypePrefix = "mouse") : "pointerout" !== topLevelType && "pointerover" !== topLevelType || (eventInterface = SyntheticPointerEvent, 
                leaveEventType = eventTypes$2.pointerLeave, enterEventType = eventTypes$2.pointerEnter, 
                eventTypePrefix = "pointer");
                var fromNode = null == from ? win : getNodeFromInstance$1(from), toNode = null == to ? win : getNodeFromInstance$1(to), leave = eventInterface.getPooled(leaveEventType, from, nativeEvent, nativeEventTarget);
                leave.type = eventTypePrefix + "leave", leave.target = fromNode, leave.relatedTarget = toNode;
                var enter = eventInterface.getPooled(enterEventType, to, nativeEvent, nativeEventTarget);
                return enter.type = eventTypePrefix + "enter", enter.target = toNode, enter.relatedTarget = fromNode, 
                accumulateEnterLeaveDispatches(leave, enter, from, to), [ leave, enter ];
            }
        };
        function get(key) {
            return key._reactInternalFiber;
        }
        function isFiberMountedImpl(fiber) {
            var node = fiber;
            if (fiber.alternate) for (;node.return; ) node = node.return; else {
                if (0 != (2 & node.effectTag)) return 1;
                for (;node.return; ) if (0 != (2 & (node = node.return).effectTag)) return 1;
            }
            return 3 === node.tag ? 2 : 3;
        }
        function isFiberMounted(fiber) {
            return 2 === isFiberMountedImpl(fiber);
        }
        function assertIsMounted(fiber) {
            2 !== isFiberMountedImpl(fiber) && invariant(!1, "Unable to find node on an unmounted component.");
        }
        function findCurrentFiberUsingSlowPath(fiber) {
            var alternate = fiber.alternate;
            if (!alternate) {
                var state = isFiberMountedImpl(fiber);
                return 3 === state && invariant(!1, "Unable to find node on an unmounted component."), 
                1 === state ? null : fiber;
            }
            for (var a = fiber, b = alternate; ;) {
                var parentA = a.return, parentB = parentA ? parentA.alternate : null;
                if (!parentA || !parentB) break;
                if (parentA.child === parentB.child) {
                    for (var child = parentA.child; child; ) {
                        if (child === a) return assertIsMounted(parentA), fiber;
                        if (child === b) return assertIsMounted(parentA), alternate;
                        child = child.sibling;
                    }
                    invariant(!1, "Unable to find node on an unmounted component.");
                }
                if (a.return !== b.return) a = parentA, b = parentB; else {
                    for (var didFindChild = !1, _child = parentA.child; _child; ) {
                        if (_child === a) {
                            didFindChild = !0, a = parentA, b = parentB;
                            break;
                        }
                        if (_child === b) {
                            didFindChild = !0, b = parentA, a = parentB;
                            break;
                        }
                        _child = _child.sibling;
                    }
                    if (!didFindChild) {
                        for (_child = parentB.child; _child; ) {
                            if (_child === a) {
                                didFindChild = !0, a = parentB, b = parentA;
                                break;
                            }
                            if (_child === b) {
                                didFindChild = !0, b = parentB, a = parentA;
                                break;
                            }
                            _child = _child.sibling;
                        }
                        didFindChild || invariant(!1, "Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
                    }
                }
                a.alternate !== b && invariant(!1, "Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
            }
            return 3 !== a.tag && invariant(!1, "Unable to find node on an unmounted component."), 
            a.stateNode.current === a ? fiber : alternate;
        }
        function findCurrentHostFiber(parent) {
            var currentParent = findCurrentFiberUsingSlowPath(parent);
            if (!currentParent) return null;
            for (var node = currentParent; ;) {
                if (5 === node.tag || 6 === node.tag) return node;
                if (node.child) node.child.return = node, node = node.child; else {
                    if (node === currentParent) return null;
                    for (;!node.sibling; ) {
                        if (!node.return || node.return === currentParent) return null;
                        node = node.return;
                    }
                    node.sibling.return = node.return, node = node.sibling;
                }
            }
            return null;
        }
        var SyntheticAnimationEvent = SyntheticEvent$1.extend({
            animationName: null,
            elapsedTime: null,
            pseudoElement: null
        }), SyntheticClipboardEvent = SyntheticEvent$1.extend({
            clipboardData: function(event) {
                return "clipboardData" in event ? event.clipboardData : window.clipboardData;
            }
        }), SyntheticFocusEvent = SyntheticUIEvent.extend({
            relatedTarget: null
        });
        function getEventCharCode(nativeEvent) {
            var charCode = void 0, keyCode = nativeEvent.keyCode;
            return "charCode" in nativeEvent ? 0 === (charCode = nativeEvent.charCode) && 13 === keyCode && (charCode = 13) : charCode = keyCode, 
            10 === charCode && (charCode = 13), charCode >= 32 || 13 === charCode ? charCode : 0;
        }
        var normalizeKey = {
            Esc: "Escape",
            Spacebar: " ",
            Left: "ArrowLeft",
            Up: "ArrowUp",
            Right: "ArrowRight",
            Down: "ArrowDown",
            Del: "Delete",
            Win: "OS",
            Menu: "ContextMenu",
            Apps: "ContextMenu",
            Scroll: "ScrollLock",
            MozPrintableKey: "Unidentified"
        }, translateToKey = {
            8: "Backspace",
            9: "Tab",
            12: "Clear",
            13: "Enter",
            16: "Shift",
            17: "Control",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Escape",
            32: " ",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "ArrowLeft",
            38: "ArrowUp",
            39: "ArrowRight",
            40: "ArrowDown",
            45: "Insert",
            46: "Delete",
            112: "F1",
            113: "F2",
            114: "F3",
            115: "F4",
            116: "F5",
            117: "F6",
            118: "F7",
            119: "F8",
            120: "F9",
            121: "F10",
            122: "F11",
            123: "F12",
            144: "NumLock",
            145: "ScrollLock",
            224: "Meta"
        };
        var SyntheticKeyboardEvent = SyntheticUIEvent.extend({
            key: function(nativeEvent) {
                if (nativeEvent.key) {
                    var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
                    if ("Unidentified" !== key) return key;
                }
                if ("keypress" === nativeEvent.type) {
                    var charCode = getEventCharCode(nativeEvent);
                    return 13 === charCode ? "Enter" : String.fromCharCode(charCode);
                }
                return "keydown" === nativeEvent.type || "keyup" === nativeEvent.type ? translateToKey[nativeEvent.keyCode] || "Unidentified" : "";
            },
            location: null,
            ctrlKey: null,
            shiftKey: null,
            altKey: null,
            metaKey: null,
            repeat: null,
            locale: null,
            getModifierState: getEventModifierState,
            charCode: function(event) {
                return "keypress" === event.type ? getEventCharCode(event) : 0;
            },
            keyCode: function(event) {
                return "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
            },
            which: function(event) {
                return "keypress" === event.type ? getEventCharCode(event) : "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
            }
        }), SyntheticDragEvent = SyntheticMouseEvent.extend({
            dataTransfer: null
        }), SyntheticTouchEvent = SyntheticUIEvent.extend({
            touches: null,
            targetTouches: null,
            changedTouches: null,
            altKey: null,
            metaKey: null,
            ctrlKey: null,
            shiftKey: null,
            getModifierState: getEventModifierState
        }), SyntheticTransitionEvent = SyntheticEvent$1.extend({
            propertyName: null,
            elapsedTime: null,
            pseudoElement: null
        }), SyntheticWheelEvent = SyntheticMouseEvent.extend({
            deltaX: function(event) {
                return "deltaX" in event ? event.deltaX : "wheelDeltaX" in event ? -event.wheelDeltaX : 0;
            },
            deltaY: function(event) {
                return "deltaY" in event ? event.deltaY : "wheelDeltaY" in event ? -event.wheelDeltaY : "wheelDelta" in event ? -event.wheelDelta : 0;
            },
            deltaZ: null,
            deltaMode: null
        }), nonInteractiveEventTypeNames = [ [ "abort", "abort" ], [ TOP_ANIMATION_END, "animationEnd" ], [ TOP_ANIMATION_ITERATION, "animationIteration" ], [ TOP_ANIMATION_START, "animationStart" ], [ "canplay", "canPlay" ], [ "canplaythrough", "canPlayThrough" ], [ "drag", "drag" ], [ "dragenter", "dragEnter" ], [ "dragexit", "dragExit" ], [ "dragleave", "dragLeave" ], [ "dragover", "dragOver" ], [ "durationchange", "durationChange" ], [ "emptied", "emptied" ], [ "encrypted", "encrypted" ], [ "ended", "ended" ], [ "error", "error" ], [ "gotpointercapture", "gotPointerCapture" ], [ "load", "load" ], [ "loadeddata", "loadedData" ], [ "loadedmetadata", "loadedMetadata" ], [ "loadstart", "loadStart" ], [ "lostpointercapture", "lostPointerCapture" ], [ "mousemove", "mouseMove" ], [ "mouseout", "mouseOut" ], [ "mouseover", "mouseOver" ], [ "playing", "playing" ], [ "pointermove", "pointerMove" ], [ "pointerout", "pointerOut" ], [ "pointerover", "pointerOver" ], [ "progress", "progress" ], [ "scroll", "scroll" ], [ "seeking", "seeking" ], [ "stalled", "stalled" ], [ "suspend", "suspend" ], [ "timeupdate", "timeUpdate" ], [ "toggle", "toggle" ], [ "touchmove", "touchMove" ], [ TOP_TRANSITION_END, "transitionEnd" ], [ "waiting", "waiting" ], [ "wheel", "wheel" ] ], eventTypes$4 = {}, topLevelEventsToDispatchConfig = {};
        function addEventTypeNameToConfig(_ref, isInteractive) {
            var topEvent = _ref[0], event = _ref[1], onEvent = "on" + (event[0].toUpperCase() + event.slice(1)), type = {
                phasedRegistrationNames: {
                    bubbled: onEvent,
                    captured: onEvent + "Capture"
                },
                dependencies: [ topEvent ],
                isInteractive: isInteractive
            };
            eventTypes$4[event] = type, topLevelEventsToDispatchConfig[topEvent] = type;
        }
        [ [ "blur", "blur" ], [ "cancel", "cancel" ], [ "click", "click" ], [ "close", "close" ], [ "contextmenu", "contextMenu" ], [ "copy", "copy" ], [ "cut", "cut" ], [ "dblclick", "doubleClick" ], [ "dragend", "dragEnd" ], [ "dragstart", "dragStart" ], [ "drop", "drop" ], [ "focus", "focus" ], [ "input", "input" ], [ "invalid", "invalid" ], [ "keydown", "keyDown" ], [ "keypress", "keyPress" ], [ "keyup", "keyUp" ], [ "mousedown", "mouseDown" ], [ "mouseup", "mouseUp" ], [ "paste", "paste" ], [ "pause", "pause" ], [ "play", "play" ], [ "pointercancel", "pointerCancel" ], [ "pointerdown", "pointerDown" ], [ "pointerup", "pointerUp" ], [ "ratechange", "rateChange" ], [ "reset", "reset" ], [ "seeked", "seeked" ], [ "submit", "submit" ], [ "touchcancel", "touchCancel" ], [ "touchend", "touchEnd" ], [ "touchstart", "touchStart" ], [ "volumechange", "volumeChange" ] ].forEach((function(eventTuple) {
            addEventTypeNameToConfig(eventTuple, !0);
        })), nonInteractiveEventTypeNames.forEach((function(eventTuple) {
            addEventTypeNameToConfig(eventTuple, !1);
        }));
        var knownHTMLTopLevelTypes = [ "abort", "cancel", "canplay", "canplaythrough", "close", "durationchange", "emptied", "encrypted", "ended", "error", "input", "invalid", "load", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "reset", "seeked", "seeking", "stalled", "submit", "suspend", "timeupdate", "toggle", "volumechange", "waiting" ], SimpleEventPlugin = {
            eventTypes: eventTypes$4,
            isInteractiveTopLevelEventType: function(topLevelType) {
                var config = topLevelEventsToDispatchConfig[topLevelType];
                return void 0 !== config && !0 === config.isInteractive;
            },
            extractEvents: function(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
                var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
                if (!dispatchConfig) return null;
                var EventConstructor = void 0;
                switch (topLevelType) {
                  case "keypress":
                    if (0 === getEventCharCode(nativeEvent)) return null;

                  case "keydown":
                  case "keyup":
                    EventConstructor = SyntheticKeyboardEvent;
                    break;

                  case "blur":
                  case "focus":
                    EventConstructor = SyntheticFocusEvent;
                    break;

                  case "click":
                    if (2 === nativeEvent.button) return null;

                  case "dblclick":
                  case "mousedown":
                  case "mousemove":
                  case "mouseup":
                  case "mouseout":
                  case "mouseover":
                  case "contextmenu":
                    EventConstructor = SyntheticMouseEvent;
                    break;

                  case "drag":
                  case "dragend":
                  case "dragenter":
                  case "dragexit":
                  case "dragleave":
                  case "dragover":
                  case "dragstart":
                  case "drop":
                    EventConstructor = SyntheticDragEvent;
                    break;

                  case "touchcancel":
                  case "touchend":
                  case "touchmove":
                  case "touchstart":
                    EventConstructor = SyntheticTouchEvent;
                    break;

                  case TOP_ANIMATION_END:
                  case TOP_ANIMATION_ITERATION:
                  case TOP_ANIMATION_START:
                    EventConstructor = SyntheticAnimationEvent;
                    break;

                  case TOP_TRANSITION_END:
                    EventConstructor = SyntheticTransitionEvent;
                    break;

                  case "scroll":
                    EventConstructor = SyntheticUIEvent;
                    break;

                  case "wheel":
                    EventConstructor = SyntheticWheelEvent;
                    break;

                  case "copy":
                  case "cut":
                  case "paste":
                    EventConstructor = SyntheticClipboardEvent;
                    break;

                  case "gotpointercapture":
                  case "lostpointercapture":
                  case "pointercancel":
                  case "pointerdown":
                  case "pointermove":
                  case "pointerout":
                  case "pointerover":
                  case "pointerup":
                    EventConstructor = SyntheticPointerEvent;
                    break;

                  default:
                    -1 === knownHTMLTopLevelTypes.indexOf(topLevelType) && warning(!1, "SimpleEventPlugin: Unhandled event type, `%s`. This warning is likely caused by a bug in React. Please file an issue.", topLevelType), 
                    EventConstructor = SyntheticEvent$1;
                }
                var event = EventConstructor.getPooled(dispatchConfig, targetInst, nativeEvent, nativeEventTarget);
                return accumulateTwoPhaseDispatches(event), event;
            }
        }, isInteractiveTopLevelEventType = SimpleEventPlugin.isInteractiveTopLevelEventType, callbackBookkeepingPool = [];
        function findRootContainerNode(inst) {
            for (;inst.return; ) inst = inst.return;
            return 3 !== inst.tag ? null : inst.stateNode.containerInfo;
        }
        function handleTopLevel(bookKeeping) {
            var targetInst = bookKeeping.targetInst, ancestor = targetInst;
            do {
                if (!ancestor) {
                    bookKeeping.ancestors.push(ancestor);
                    break;
                }
                var root = findRootContainerNode(ancestor);
                if (!root) break;
                bookKeeping.ancestors.push(ancestor), ancestor = getClosestInstanceFromNode(root);
            } while (ancestor);
            for (var i = 0; i < bookKeeping.ancestors.length; i++) targetInst = bookKeeping.ancestors[i], 
            runExtractedEventsInBatch(bookKeeping.topLevelType, targetInst, bookKeeping.nativeEvent, getEventTarget(bookKeeping.nativeEvent));
        }
        var _enabled = !0;
        function setEnabled(enabled) {
            _enabled = !!enabled;
        }
        function isEnabled() {
            return _enabled;
        }
        function trapBubbledEvent(topLevelType, element) {
            if (!element) return null;
            !function(element, eventType, listener) {
                element.addEventListener(eventType, listener, !1);
            }(element, topLevelType, (isInteractiveTopLevelEventType(topLevelType) ? dispatchInteractiveEvent : dispatchEvent).bind(null, topLevelType));
        }
        function trapCapturedEvent(topLevelType, element) {
            if (!element) return null;
            !function(element, eventType, listener) {
                element.addEventListener(eventType, listener, !0);
            }(element, topLevelType, (isInteractiveTopLevelEventType(topLevelType) ? dispatchInteractiveEvent : dispatchEvent).bind(null, topLevelType));
        }
        function dispatchInteractiveEvent(topLevelType, nativeEvent) {
            _interactiveUpdates(dispatchEvent, topLevelType, nativeEvent);
        }
        function dispatchEvent(topLevelType, nativeEvent) {
            if (_enabled) {
                var targetInst = getClosestInstanceFromNode(getEventTarget(nativeEvent));
                null === targetInst || "number" != typeof targetInst.tag || isFiberMounted(targetInst) || (targetInst = null);
                var instance, bookKeeping = function(topLevelType, nativeEvent, targetInst) {
                    if (callbackBookkeepingPool.length) {
                        var instance = callbackBookkeepingPool.pop();
                        return instance.topLevelType = topLevelType, instance.nativeEvent = nativeEvent, 
                        instance.targetInst = targetInst, instance;
                    }
                    return {
                        topLevelType: topLevelType,
                        nativeEvent: nativeEvent,
                        targetInst: targetInst,
                        ancestors: []
                    };
                }(topLevelType, nativeEvent, targetInst);
                try {
                    batchedUpdates(handleTopLevel, bookKeeping);
                } finally {
                    (instance = bookKeeping).topLevelType = null, instance.nativeEvent = null, instance.targetInst = null, 
                    instance.ancestors.length = 0, callbackBookkeepingPool.length < 10 && callbackBookkeepingPool.push(instance);
                }
            }
        }
        var ReactDOMEventListener = Object.freeze({
            get _enabled() {
                return _enabled;
            },
            setEnabled: setEnabled,
            isEnabled: isEnabled,
            trapBubbledEvent: trapBubbledEvent,
            trapCapturedEvent: trapCapturedEvent,
            dispatchEvent: dispatchEvent
        }), alreadyListeningTo = {}, reactTopListenersCounter = 0, topListenersIDKey = "_reactListenersID" + ("" + Math.random()).slice(2);
        function getListeningForDocument(mountAt) {
            return Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey) || (mountAt[topListenersIDKey] = reactTopListenersCounter++, 
            alreadyListeningTo[mountAt[topListenersIDKey]] = {}), alreadyListeningTo[mountAt[topListenersIDKey]];
        }
        function getLeafNode(node) {
            for (;node && node.firstChild; ) node = node.firstChild;
            return node;
        }
        function getSiblingNode(node) {
            for (;node; ) {
                if (node.nextSibling) return node.nextSibling;
                node = node.parentNode;
            }
        }
        function getNodeForCharacterOffset(root, offset) {
            for (var node = getLeafNode(root), nodeStart = 0, nodeEnd = 0; node; ) {
                if (3 === node.nodeType) {
                    if (nodeEnd = nodeStart + node.textContent.length, nodeStart <= offset && nodeEnd >= offset) return {
                        node: node,
                        offset: offset - nodeStart
                    };
                    nodeStart = nodeEnd;
                }
                node = getLeafNode(getSiblingNode(node));
            }
        }
        function getOffsets(outerNode) {
            var selection = window.getSelection && window.getSelection();
            if (!selection || 0 === selection.rangeCount) return null;
            var anchorNode = selection.anchorNode, anchorOffset = selection.anchorOffset, focusNode = selection.focusNode, focusOffset = selection.focusOffset;
            try {
                anchorNode.nodeType, focusNode.nodeType;
            } catch (e) {
                return null;
            }
            return function(outerNode, anchorNode, anchorOffset, focusNode, focusOffset) {
                var length = 0, start = -1, end = -1, indexWithinAnchor = 0, indexWithinFocus = 0, node = outerNode, parentNode = null;
                outer: for (;;) {
                    for (var next = null; node !== anchorNode || 0 !== anchorOffset && 3 !== node.nodeType || (start = length + anchorOffset), 
                    node !== focusNode || 0 !== focusOffset && 3 !== node.nodeType || (end = length + focusOffset), 
                    3 === node.nodeType && (length += node.nodeValue.length), null !== (next = node.firstChild); ) parentNode = node, 
                    node = next;
                    for (;;) {
                        if (node === outerNode) break outer;
                        if (parentNode === anchorNode && ++indexWithinAnchor === anchorOffset && (start = length), 
                        parentNode === focusNode && ++indexWithinFocus === focusOffset && (end = length), 
                        null !== (next = node.nextSibling)) break;
                        parentNode = (node = parentNode).parentNode;
                    }
                    node = next;
                }
                if (-1 === start || -1 === end) return null;
                return {
                    start: start,
                    end: end
                };
            }(outerNode, anchorNode, anchorOffset, focusNode, focusOffset);
        }
        function hasSelectionCapabilities(elem) {
            var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
            return nodeName && ("input" === nodeName && ("text" === elem.type || "search" === elem.type || "tel" === elem.type || "url" === elem.type || "password" === elem.type) || "textarea" === nodeName || "true" === elem.contentEditable);
        }
        function restoreSelection(priorSelectionInformation) {
            var node, curFocusedElem = getActiveElement(), priorFocusedElem = priorSelectionInformation.focusedElem, priorSelectionRange = priorSelectionInformation.selectionRange;
            if (curFocusedElem !== priorFocusedElem && (node = priorFocusedElem, containsNode(document.documentElement, node))) {
                null !== priorSelectionRange && hasSelectionCapabilities(priorFocusedElem) && function(input, offsets) {
                    var start = offsets.start, end = offsets.end;
                    void 0 === end && (end = start);
                    "selectionStart" in input ? (input.selectionStart = start, input.selectionEnd = Math.min(end, input.value.length)) : function(node, offsets) {
                        if (window.getSelection) {
                            var selection = window.getSelection(), length = node[getTextContentAccessor()].length, start = Math.min(offsets.start, length), end = void 0 === offsets.end ? start : Math.min(offsets.end, length);
                            if (!selection.extend && start > end) {
                                var temp = end;
                                end = start, start = temp;
                            }
                            var startMarker = getNodeForCharacterOffset(node, start), endMarker = getNodeForCharacterOffset(node, end);
                            if (startMarker && endMarker) {
                                if (1 === selection.rangeCount && selection.anchorNode === startMarker.node && selection.anchorOffset === startMarker.offset && selection.focusNode === endMarker.node && selection.focusOffset === endMarker.offset) return;
                                var range = document.createRange();
                                range.setStart(startMarker.node, startMarker.offset), selection.removeAllRanges(), 
                                start > end ? (selection.addRange(range), selection.extend(endMarker.node, endMarker.offset)) : (range.setEnd(endMarker.node, endMarker.offset), 
                                selection.addRange(range));
                            }
                        }
                    }(input, offsets);
                }(priorFocusedElem, priorSelectionRange);
                for (var ancestors = [], ancestor = priorFocusedElem; ancestor = ancestor.parentNode; ) 1 === ancestor.nodeType && ancestors.push({
                    element: ancestor,
                    left: ancestor.scrollLeft,
                    top: ancestor.scrollTop
                });
                "function" == typeof priorFocusedElem.focus && priorFocusedElem.focus();
                for (var i = 0; i < ancestors.length; i++) {
                    var info = ancestors[i];
                    info.element.scrollLeft = info.left, info.element.scrollTop = info.top;
                }
            }
        }
        function getSelection$1(input) {
            return ("selectionStart" in input ? {
                start: input.selectionStart,
                end: input.selectionEnd
            } : getOffsets(input)) || {
                start: 0,
                end: 0
            };
        }
        var skipSelectionChangeEvent = ExecutionEnvironment.canUseDOM && "documentMode" in document && document.documentMode <= 11, eventTypes$3 = {
            select: {
                phasedRegistrationNames: {
                    bubbled: "onSelect",
                    captured: "onSelectCapture"
                },
                dependencies: [ "blur", "contextmenu", "focus", "keydown", "keyup", "mousedown", "mouseup", "selectionchange" ]
            }
        }, activeElement$1 = null, activeElementInst$1 = null, lastSelection = null, mouseDown = !1;
        function constructSelectEvent(nativeEvent, nativeEventTarget) {
            if (mouseDown || null == activeElement$1 || activeElement$1 !== getActiveElement()) return null;
            var currentSelection = function(node) {
                if ("selectionStart" in node && hasSelectionCapabilities(node)) return {
                    start: node.selectionStart,
                    end: node.selectionEnd
                };
                if (window.getSelection) {
                    var selection = window.getSelection();
                    return {
                        anchorNode: selection.anchorNode,
                        anchorOffset: selection.anchorOffset,
                        focusNode: selection.focusNode,
                        focusOffset: selection.focusOffset
                    };
                }
            }(activeElement$1);
            if (!lastSelection || !shallowEqual(lastSelection, currentSelection)) {
                lastSelection = currentSelection;
                var syntheticEvent = SyntheticEvent$1.getPooled(eventTypes$3.select, activeElementInst$1, nativeEvent, nativeEventTarget);
                return syntheticEvent.type = "select", syntheticEvent.target = activeElement$1, 
                accumulateTwoPhaseDispatches(syntheticEvent), syntheticEvent;
            }
            return null;
        }
        var SelectEventPlugin = {
            eventTypes: eventTypes$3,
            extractEvents: function(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
                var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : 9 === nativeEventTarget.nodeType ? nativeEventTarget : nativeEventTarget.ownerDocument;
                if (!doc || !function(registrationName, mountAt) {
                    for (var isListening = getListeningForDocument(mountAt), dependencies = registrationNameDependencies[registrationName], i = 0; i < dependencies.length; i++) {
                        var dependency = dependencies[i];
                        if (!isListening.hasOwnProperty(dependency) || !isListening[dependency]) return !1;
                    }
                    return !0;
                }("onSelect", doc)) return null;
                var targetNode = targetInst ? getNodeFromInstance$1(targetInst) : window;
                switch (topLevelType) {
                  case "focus":
                    (isTextInputElement(targetNode) || "true" === targetNode.contentEditable) && (activeElement$1 = targetNode, 
                    activeElementInst$1 = targetInst, lastSelection = null);
                    break;

                  case "blur":
                    activeElement$1 = null, activeElementInst$1 = null, lastSelection = null;
                    break;

                  case "mousedown":
                    mouseDown = !0;
                    break;

                  case "contextmenu":
                  case "mouseup":
                    return mouseDown = !1, constructSelectEvent(nativeEvent, nativeEventTarget);

                  case "selectionchange":
                    if (skipSelectionChangeEvent) break;

                  case "keydown":
                  case "keyup":
                    return constructSelectEvent(nativeEvent, nativeEventTarget);
                }
                return null;
            }
        };
        injection.injectEventPluginOrder([ "ResponderEventPlugin", "SimpleEventPlugin", "TapEventPlugin", "EnterLeaveEventPlugin", "ChangeEventPlugin", "SelectEventPlugin", "BeforeInputEventPlugin" ]), 
        injection$1_injectComponentTree(ReactDOMComponentTree), injection.injectEventPluginsByName({
            SimpleEventPlugin: SimpleEventPlugin,
            EnterLeaveEventPlugin: EnterLeaveEventPlugin,
            ChangeEventPlugin: ChangeEventPlugin,
            SelectEventPlugin: SelectEventPlugin,
            BeforeInputEventPlugin: BeforeInputEventPlugin
        });
        var localRequestAnimationFrame$1 = "function" == typeof requestAnimationFrame ? requestAnimationFrame : void 0, localDate = Date, localSetTimeout = setTimeout, localClearTimeout = clearTimeout, hasNativePerformanceNow = "object" == typeof performance && "function" == typeof performance.now, now$1 = void 0;
        if (hasNativePerformanceNow) {
            var Performance = performance;
            now$1 = function() {
                return Performance.now();
            };
        } else now$1 = function() {
            return localDate.now();
        };
        var scheduleWork = void 0, cancelScheduledWork = void 0;
        if (ExecutionEnvironment.canUseDOM) {
            "function" != typeof localRequestAnimationFrame$1 && warning(!1, "React depends on requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
            var localRequestAnimationFrame = "function" == typeof localRequestAnimationFrame$1 ? localRequestAnimationFrame$1 : function(callback) {
                invariant(!1, "React depends on requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
            }, headOfPendingCallbacksLinkedList = null, tailOfPendingCallbacksLinkedList = null, nextSoonestTimeoutTime = -1, isIdleScheduled = !1, isAnimationFrameScheduled = !1, frameDeadline = 0, previousFrameTime = 33, activeFrameTime = 33, frameDeadlineObject = {
                didTimeout: !1,
                timeRemaining: function() {
                    var remaining = frameDeadline - now$1();
                    return remaining > 0 ? remaining : 0;
                }
            }, callUnsafely = function(callbackConfig, arg) {
                var callback = callbackConfig.scheduledCallback, finishedCalling = !1;
                try {
                    callback(arg), finishedCalling = !0;
                } finally {
                    cancelScheduledWork(callbackConfig), finishedCalling || (isIdleScheduled = !0, window.postMessage(messageKey, "*"));
                }
            }, messageKey = "__reactIdleCallback$" + Math.random().toString(36).slice(2);
            window.addEventListener("message", (function(event) {
                if (event.source === window && event.data === messageKey && (isIdleScheduled = !1, 
                null !== headOfPendingCallbacksLinkedList)) {
                    !function() {
                        if (null !== headOfPendingCallbacksLinkedList) {
                            var currentTime = now$1();
                            if (!(-1 === nextSoonestTimeoutTime || nextSoonestTimeoutTime > currentTime)) {
                                for (var updatedNextSoonestTimeoutTime = -1, timedOutCallbacks = [], currentCallbackConfig = headOfPendingCallbacksLinkedList; null !== currentCallbackConfig; ) {
                                    var _timeoutTime = currentCallbackConfig.timeoutTime;
                                    -1 !== _timeoutTime && _timeoutTime <= currentTime ? timedOutCallbacks.push(currentCallbackConfig) : -1 !== _timeoutTime && (-1 === updatedNextSoonestTimeoutTime || _timeoutTime < updatedNextSoonestTimeoutTime) && (updatedNextSoonestTimeoutTime = _timeoutTime), 
                                    currentCallbackConfig = currentCallbackConfig.next;
                                }
                                if (timedOutCallbacks.length > 0) {
                                    frameDeadlineObject.didTimeout = !0;
                                    for (var i = 0, len = timedOutCallbacks.length; i < len; i++) callUnsafely(timedOutCallbacks[i], frameDeadlineObject);
                                }
                                nextSoonestTimeoutTime = updatedNextSoonestTimeoutTime;
                            }
                        }
                    }();
                    for (var currentTime = now$1(); frameDeadline - currentTime > 0 && null !== headOfPendingCallbacksLinkedList; ) {
                        var latestCallbackConfig = headOfPendingCallbacksLinkedList;
                        frameDeadlineObject.didTimeout = !1, callUnsafely(latestCallbackConfig, frameDeadlineObject), 
                        currentTime = now$1();
                    }
                    null !== headOfPendingCallbacksLinkedList && (isAnimationFrameScheduled || (isAnimationFrameScheduled = !0, 
                    localRequestAnimationFrame(animationTick)));
                }
            }), !1);
            var animationTick = function(rafTime) {
                isAnimationFrameScheduled = !1;
                var nextFrameTime = rafTime - frameDeadline + activeFrameTime;
                nextFrameTime < activeFrameTime && previousFrameTime < activeFrameTime ? (nextFrameTime < 8 && (nextFrameTime = 8), 
                activeFrameTime = nextFrameTime < previousFrameTime ? previousFrameTime : nextFrameTime) : previousFrameTime = nextFrameTime, 
                frameDeadline = rafTime + activeFrameTime, isIdleScheduled || (isIdleScheduled = !0, 
                window.postMessage(messageKey, "*"));
            };
            scheduleWork = function(callback, options) {
                var timeoutTime = -1;
                null != options && "number" == typeof options.timeout && (timeoutTime = now$1() + options.timeout), 
                (-1 === nextSoonestTimeoutTime || -1 !== timeoutTime && timeoutTime < nextSoonestTimeoutTime) && (nextSoonestTimeoutTime = timeoutTime);
                var scheduledCallbackConfig = {
                    scheduledCallback: callback,
                    timeoutTime: timeoutTime,
                    prev: null,
                    next: null
                };
                if (null === headOfPendingCallbacksLinkedList) headOfPendingCallbacksLinkedList = scheduledCallbackConfig, 
                tailOfPendingCallbacksLinkedList = scheduledCallbackConfig; else {
                    scheduledCallbackConfig.prev = tailOfPendingCallbacksLinkedList;
                    null !== tailOfPendingCallbacksLinkedList && (tailOfPendingCallbacksLinkedList.next = scheduledCallbackConfig), 
                    tailOfPendingCallbacksLinkedList = scheduledCallbackConfig;
                }
                return isAnimationFrameScheduled || (isAnimationFrameScheduled = !0, localRequestAnimationFrame(animationTick)), 
                scheduledCallbackConfig;
            }, cancelScheduledWork = function(callbackConfig) {
                if (null !== callbackConfig.prev || headOfPendingCallbacksLinkedList === callbackConfig) {
                    var next = callbackConfig.next, prev = callbackConfig.prev;
                    return callbackConfig.next = null, callbackConfig.prev = null, null !== next ? null !== prev ? (prev.next = next, 
                    void (next.prev = prev)) : (next.prev = null, void (headOfPendingCallbacksLinkedList = next)) : null !== prev ? (prev.next = null, 
                    void (tailOfPendingCallbacksLinkedList = prev)) : (headOfPendingCallbacksLinkedList = null, 
                    void (tailOfPendingCallbacksLinkedList = null));
                }
            };
        } else {
            var timeoutIds = new Map;
            scheduleWork = function(callback, options) {
                var callbackConfig = {
                    scheduledCallback: callback,
                    timeoutTime: 0,
                    next: null,
                    prev: null
                }, timeoutId = localSetTimeout((function() {
                    callback({
                        timeRemaining: function() {
                            return 1 / 0;
                        },
                        didTimeout: !1
                    });
                }));
                return timeoutIds.set(callback, timeoutId), callbackConfig;
            }, cancelScheduledWork = function(callbackId) {
                var callback = callbackId.scheduledCallback, timeoutId = timeoutIds.get(callback);
                timeoutIds.delete(callbackId), localClearTimeout(timeoutId);
            };
        }
        var didWarnSelectedSetOnOption = !1;
        function validateProps(element, props) {
            null == props.selected || didWarnSelectedSetOnOption || (warning(!1, "Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), 
            didWarnSelectedSetOnOption = !0);
        }
        function getHostProps$1(element, props) {
            var hostProps = _assign({
                children: void 0
            }, props), content = function(children) {
                var content = "";
                return React.Children.forEach(children, (function(child) {
                    null != child && ("string" != typeof child && "number" != typeof child || (content += child));
                })), content;
            }(props.children);
            return content && (hostProps.children = content), hostProps;
        }
        var getCurrentFiberOwnerName$3 = ReactDebugCurrentFiber.getCurrentFiberOwnerName, getCurrentFiberStackAddendum$3 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum, didWarnValueDefaultValue$1 = void 0;
        function getDeclarationErrorAddendum() {
            var ownerName = getCurrentFiberOwnerName$3();
            return ownerName ? "\n\nCheck the render method of `" + ownerName + "`." : "";
        }
        didWarnValueDefaultValue$1 = !1;
        var valuePropNames = [ "value", "defaultValue" ];
        function updateOptions(node, multiple, propValue, setDefaultSelected) {
            var options = node.options;
            if (multiple) {
                for (var selectedValues = propValue, selectedValue = {}, i = 0; i < selectedValues.length; i++) selectedValue["$" + selectedValues[i]] = !0;
                for (var _i = 0; _i < options.length; _i++) {
                    var selected = selectedValue.hasOwnProperty("$" + options[_i].value);
                    options[_i].selected !== selected && (options[_i].selected = selected), selected && setDefaultSelected && (options[_i].defaultSelected = !0);
                }
            } else {
                for (var _selectedValue = "" + propValue, defaultSelected = null, _i2 = 0; _i2 < options.length; _i2++) {
                    if (options[_i2].value === _selectedValue) return options[_i2].selected = !0, void (setDefaultSelected && (options[_i2].defaultSelected = !0));
                    null !== defaultSelected || options[_i2].disabled || (defaultSelected = options[_i2]);
                }
                null !== defaultSelected && (defaultSelected.selected = !0);
            }
        }
        function getHostProps$2(element, props) {
            return _assign({}, props, {
                value: void 0
            });
        }
        function initWrapperState$1(element, props) {
            var node = element;
            !function(props) {
                ReactControlledValuePropTypes.checkPropTypes("select", props, getCurrentFiberStackAddendum$3);
                for (var i = 0; i < valuePropNames.length; i++) {
                    var propName = valuePropNames[i];
                    if (null != props[propName]) {
                        var isArray = Array.isArray(props[propName]);
                        props.multiple && !isArray ? warning(!1, "The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", propName, getDeclarationErrorAddendum()) : !props.multiple && isArray && warning(!1, "The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", propName, getDeclarationErrorAddendum());
                    }
                }
            }(props);
            var value = props.value;
            node._wrapperState = {
                initialValue: null != value ? value : props.defaultValue,
                wasMultiple: !!props.multiple
            }, void 0 === props.value || void 0 === props.defaultValue || didWarnValueDefaultValue$1 || (warning(!1, "Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://fb.me/react-controlled-components"), 
            didWarnValueDefaultValue$1 = !0);
        }
        var getCurrentFiberStackAddendum$4 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum, didWarnValDefaultVal = !1;
        function getHostProps$3(element, props) {
            var node = element;
            return null != props.dangerouslySetInnerHTML && invariant(!1, "`dangerouslySetInnerHTML` does not make sense on <textarea>."), 
            _assign({}, props, {
                value: void 0,
                defaultValue: void 0,
                children: "" + node._wrapperState.initialValue
            });
        }
        function initWrapperState$2(element, props) {
            var node = element;
            ReactControlledValuePropTypes.checkPropTypes("textarea", props, getCurrentFiberStackAddendum$4), 
            void 0 === props.value || void 0 === props.defaultValue || didWarnValDefaultVal || (warning(!1, "Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://fb.me/react-controlled-components"), 
            didWarnValDefaultVal = !0);
            var initialValue = props.value;
            if (null == initialValue) {
                var defaultValue = props.defaultValue, children = props.children;
                null != children && (warning(!1, "Use the `defaultValue` or `value` props instead of setting children on <textarea>."), 
                null != defaultValue && invariant(!1, "If you supply `defaultValue` on a <textarea>, do not pass children."), 
                Array.isArray(children) && (children.length <= 1 || invariant(!1, "<textarea> can only have at most one child."), 
                children = children[0]), defaultValue = "" + children), null == defaultValue && (defaultValue = ""), 
                initialValue = defaultValue;
            }
            node._wrapperState = {
                initialValue: "" + initialValue
            };
        }
        function updateWrapper$1(element, props) {
            var node = element, value = props.value;
            if (null != value) {
                var newValue = "" + value;
                newValue !== node.value && (node.value = newValue), null == props.defaultValue && (node.defaultValue = newValue);
            }
            null != props.defaultValue && (node.defaultValue = props.defaultValue);
        }
        function postMountWrapper$3(element, props) {
            var node = element, textContent = node.textContent;
            textContent === node._wrapperState.initialValue && (node.value = textContent);
        }
        var HTML_NAMESPACE$1 = "http://www.w3.org/1999/xhtml", SVG_NAMESPACE = "http://www.w3.org/2000/svg", Namespaces_html = HTML_NAMESPACE$1, Namespaces_svg = SVG_NAMESPACE;
        function getIntrinsicNamespace(type) {
            switch (type) {
              case "svg":
                return SVG_NAMESPACE;

              case "math":
                return "http://www.w3.org/1998/Math/MathML";

              default:
                return HTML_NAMESPACE$1;
            }
        }
        function getChildNamespace(parentNamespace, type) {
            return null == parentNamespace || parentNamespace === HTML_NAMESPACE$1 ? getIntrinsicNamespace(type) : parentNamespace === SVG_NAMESPACE && "foreignObject" === type ? HTML_NAMESPACE$1 : parentNamespace;
        }
        var func, reusableSVGContainer = void 0, setInnerHTML = (func = function(node, html) {
            if (node.namespaceURI !== Namespaces_svg || "innerHTML" in node) node.innerHTML = html; else {
                (reusableSVGContainer = reusableSVGContainer || document.createElement("div")).innerHTML = "<svg>" + html + "</svg>";
                for (var svgNode = reusableSVGContainer.firstChild; node.firstChild; ) node.removeChild(node.firstChild);
                for (;svgNode.firstChild; ) node.appendChild(svgNode.firstChild);
            }
        }, "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction ? function(arg0, arg1, arg2, arg3) {
            MSApp.execUnsafeLocalFunction((function() {
                return func(arg0, arg1, arg2, arg3);
            }));
        } : func), setTextContent = function(node, text) {
            if (text) {
                var firstChild = node.firstChild;
                if (firstChild && firstChild === node.lastChild && 3 === firstChild.nodeType) return void (firstChild.nodeValue = text);
            }
            node.textContent = text;
        }, isUnitlessNumber = {
            animationIterationCount: !0,
            borderImageOutset: !0,
            borderImageSlice: !0,
            borderImageWidth: !0,
            boxFlex: !0,
            boxFlexGroup: !0,
            boxOrdinalGroup: !0,
            columnCount: !0,
            columns: !0,
            flex: !0,
            flexGrow: !0,
            flexPositive: !0,
            flexShrink: !0,
            flexNegative: !0,
            flexOrder: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowSpan: !0,
            gridRowStart: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnSpan: !0,
            gridColumnStart: !0,
            fontWeight: !0,
            lineClamp: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            tabSize: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
            fillOpacity: !0,
            floodOpacity: !0,
            stopOpacity: !0,
            strokeDasharray: !0,
            strokeDashoffset: !0,
            strokeMiterlimit: !0,
            strokeOpacity: !0,
            strokeWidth: !0
        };
        var prefixes = [ "Webkit", "ms", "Moz", "O" ];
        function dangerousStyleValue(name, value, isCustomProperty) {
            return null == value || "boolean" == typeof value || "" === value ? "" : isCustomProperty || "number" != typeof value || 0 === value || isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name] ? ("" + value).trim() : value + "px";
        }
        Object.keys(isUnitlessNumber).forEach((function(prop) {
            prefixes.forEach((function(prefix) {
                isUnitlessNumber[function(prefix, key) {
                    return prefix + key.charAt(0).toUpperCase() + key.substring(1);
                }(prefix, prop)] = isUnitlessNumber[prop];
            }));
        }));
        var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/, badStyleValueWithSemicolonPattern = /;\s*$/, warnedStyleNames = {}, warnedStyleValues = {}, warnedForNaNValue = !1, warnedForInfinityValue = !1, warnValidStyle$1 = function(name, value, getStack) {
            name.indexOf("-") > -1 ? function(name, getStack) {
                warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name] || (warnedStyleNames[name] = !0, 
                warning(!1, "Unsupported style property %s. Did you mean %s?%s", name, camelizeStyleName(name), getStack()));
            }(name, getStack) : badVendoredStyleNamePattern.test(name) ? function(name, getStack) {
                warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name] || (warnedStyleNames[name] = !0, 
                warning(!1, "Unsupported vendor-prefixed style property %s. Did you mean %s?%s", name, name.charAt(0).toUpperCase() + name.slice(1), getStack()));
            }(name, getStack) : badStyleValueWithSemicolonPattern.test(value) && function(name, value, getStack) {
                warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value] || (warnedStyleValues[value] = !0, 
                warning(!1, 'Style property values shouldn\'t contain a semicolon. Try "%s: %s" instead.%s', name, value.replace(badStyleValueWithSemicolonPattern, ""), getStack()));
            }(name, value, getStack), "number" == typeof value && (isNaN(value) ? function(name, value, getStack) {
                warnedForNaNValue || (warnedForNaNValue = !0, warning(!1, "`NaN` is an invalid value for the `%s` css style property.%s", name, getStack()));
            }(name, 0, getStack) : isFinite(value) || function(name, value, getStack) {
                warnedForInfinityValue || (warnedForInfinityValue = !0, warning(!1, "`Infinity` is an invalid value for the `%s` css style property.%s", name, getStack()));
            }(name, 0, getStack));
        };
        function createDangerousStringForStyles(styles) {
            var serialized = "", delimiter = "";
            for (var styleName in styles) if (styles.hasOwnProperty(styleName)) {
                var styleValue = styles[styleName];
                if (null != styleValue) {
                    var isCustomProperty = 0 === styleName.indexOf("--");
                    serialized += delimiter + hyphenateStyleName(styleName) + ":", serialized += dangerousStyleValue(styleName, styleValue, isCustomProperty), 
                    delimiter = ";";
                }
            }
            return serialized || null;
        }
        function setValueForStyles(node, styles, getStack) {
            var style = node.style;
            for (var styleName in styles) if (styles.hasOwnProperty(styleName)) {
                var isCustomProperty = 0 === styleName.indexOf("--");
                isCustomProperty || warnValidStyle$1(styleName, styles[styleName], getStack);
                var styleValue = dangerousStyleValue(styleName, styles[styleName], isCustomProperty);
                "float" === styleName && (styleName = "cssFloat"), isCustomProperty ? style.setProperty(styleName, styleValue) : style[styleName] = styleValue;
            }
        }
        var voidElementTags = _assign({
            menuitem: !0
        }, {
            area: !0,
            base: !0,
            br: !0,
            col: !0,
            embed: !0,
            hr: !0,
            img: !0,
            input: !0,
            keygen: !0,
            link: !0,
            meta: !0,
            param: !0,
            source: !0,
            track: !0,
            wbr: !0
        });
        function assertValidProps(tag, props, getStack) {
            props && (voidElementTags[tag] && (null != props.children || null != props.dangerouslySetInnerHTML) && invariant(!1, "%s is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.%s", tag, getStack()), 
            null != props.dangerouslySetInnerHTML && (null != props.children && invariant(!1, "Can only set one of `children` or `props.dangerouslySetInnerHTML`."), 
            "object" == typeof props.dangerouslySetInnerHTML && "__html" in props.dangerouslySetInnerHTML || invariant(!1, "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://fb.me/react-invariant-dangerously-set-inner-html for more information.")), 
            !props.suppressContentEditableWarning && props.contentEditable && null != props.children && warning(!1, "A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional.%s", getStack()), 
            null != props.style && "object" != typeof props.style && invariant(!1, "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.%s", getStack()));
        }
        function isCustomComponent(tagName, props) {
            if (-1 === tagName.indexOf("-")) return "string" == typeof props.is;
            switch (tagName) {
              case "annotation-xml":
              case "color-profile":
              case "font-face":
              case "font-face-src":
              case "font-face-uri":
              case "font-face-format":
              case "font-face-name":
              case "missing-glyph":
                return !1;

              default:
                return !0;
            }
        }
        var possibleStandardNames = {
            accept: "accept",
            acceptcharset: "acceptCharset",
            "accept-charset": "acceptCharset",
            accesskey: "accessKey",
            action: "action",
            allowfullscreen: "allowFullScreen",
            alt: "alt",
            as: "as",
            async: "async",
            autocapitalize: "autoCapitalize",
            autocomplete: "autoComplete",
            autocorrect: "autoCorrect",
            autofocus: "autoFocus",
            autoplay: "autoPlay",
            autosave: "autoSave",
            capture: "capture",
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            challenge: "challenge",
            charset: "charSet",
            checked: "checked",
            children: "children",
            cite: "cite",
            class: "className",
            classid: "classID",
            classname: "className",
            cols: "cols",
            colspan: "colSpan",
            content: "content",
            contenteditable: "contentEditable",
            contextmenu: "contextMenu",
            controls: "controls",
            controlslist: "controlsList",
            coords: "coords",
            crossorigin: "crossOrigin",
            dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
            data: "data",
            datetime: "dateTime",
            default: "default",
            defaultchecked: "defaultChecked",
            defaultvalue: "defaultValue",
            defer: "defer",
            dir: "dir",
            disabled: "disabled",
            download: "download",
            draggable: "draggable",
            enctype: "encType",
            for: "htmlFor",
            form: "form",
            formmethod: "formMethod",
            formaction: "formAction",
            formenctype: "formEncType",
            formnovalidate: "formNoValidate",
            formtarget: "formTarget",
            frameborder: "frameBorder",
            headers: "headers",
            height: "height",
            hidden: "hidden",
            high: "high",
            href: "href",
            hreflang: "hrefLang",
            htmlfor: "htmlFor",
            httpequiv: "httpEquiv",
            "http-equiv": "httpEquiv",
            icon: "icon",
            id: "id",
            innerhtml: "innerHTML",
            inputmode: "inputMode",
            integrity: "integrity",
            is: "is",
            itemid: "itemID",
            itemprop: "itemProp",
            itemref: "itemRef",
            itemscope: "itemScope",
            itemtype: "itemType",
            keyparams: "keyParams",
            keytype: "keyType",
            kind: "kind",
            label: "label",
            lang: "lang",
            list: "list",
            loop: "loop",
            low: "low",
            manifest: "manifest",
            marginwidth: "marginWidth",
            marginheight: "marginHeight",
            max: "max",
            maxlength: "maxLength",
            media: "media",
            mediagroup: "mediaGroup",
            method: "method",
            min: "min",
            minlength: "minLength",
            multiple: "multiple",
            muted: "muted",
            name: "name",
            nomodule: "noModule",
            nonce: "nonce",
            novalidate: "noValidate",
            open: "open",
            optimum: "optimum",
            pattern: "pattern",
            placeholder: "placeholder",
            playsinline: "playsInline",
            poster: "poster",
            preload: "preload",
            profile: "profile",
            radiogroup: "radioGroup",
            readonly: "readOnly",
            referrerpolicy: "referrerPolicy",
            rel: "rel",
            required: "required",
            reversed: "reversed",
            role: "role",
            rows: "rows",
            rowspan: "rowSpan",
            sandbox: "sandbox",
            scope: "scope",
            scoped: "scoped",
            scrolling: "scrolling",
            seamless: "seamless",
            selected: "selected",
            shape: "shape",
            size: "size",
            sizes: "sizes",
            span: "span",
            spellcheck: "spellCheck",
            src: "src",
            srcdoc: "srcDoc",
            srclang: "srcLang",
            srcset: "srcSet",
            start: "start",
            step: "step",
            style: "style",
            summary: "summary",
            tabindex: "tabIndex",
            target: "target",
            title: "title",
            type: "type",
            usemap: "useMap",
            value: "value",
            width: "width",
            wmode: "wmode",
            wrap: "wrap",
            about: "about",
            accentheight: "accentHeight",
            "accent-height": "accentHeight",
            accumulate: "accumulate",
            additive: "additive",
            alignmentbaseline: "alignmentBaseline",
            "alignment-baseline": "alignmentBaseline",
            allowreorder: "allowReorder",
            alphabetic: "alphabetic",
            amplitude: "amplitude",
            arabicform: "arabicForm",
            "arabic-form": "arabicForm",
            ascent: "ascent",
            attributename: "attributeName",
            attributetype: "attributeType",
            autoreverse: "autoReverse",
            azimuth: "azimuth",
            basefrequency: "baseFrequency",
            baselineshift: "baselineShift",
            "baseline-shift": "baselineShift",
            baseprofile: "baseProfile",
            bbox: "bbox",
            begin: "begin",
            bias: "bias",
            by: "by",
            calcmode: "calcMode",
            capheight: "capHeight",
            "cap-height": "capHeight",
            clip: "clip",
            clippath: "clipPath",
            "clip-path": "clipPath",
            clippathunits: "clipPathUnits",
            cliprule: "clipRule",
            "clip-rule": "clipRule",
            color: "color",
            colorinterpolation: "colorInterpolation",
            "color-interpolation": "colorInterpolation",
            colorinterpolationfilters: "colorInterpolationFilters",
            "color-interpolation-filters": "colorInterpolationFilters",
            colorprofile: "colorProfile",
            "color-profile": "colorProfile",
            colorrendering: "colorRendering",
            "color-rendering": "colorRendering",
            contentscripttype: "contentScriptType",
            contentstyletype: "contentStyleType",
            cursor: "cursor",
            cx: "cx",
            cy: "cy",
            d: "d",
            datatype: "datatype",
            decelerate: "decelerate",
            descent: "descent",
            diffuseconstant: "diffuseConstant",
            direction: "direction",
            display: "display",
            divisor: "divisor",
            dominantbaseline: "dominantBaseline",
            "dominant-baseline": "dominantBaseline",
            dur: "dur",
            dx: "dx",
            dy: "dy",
            edgemode: "edgeMode",
            elevation: "elevation",
            enablebackground: "enableBackground",
            "enable-background": "enableBackground",
            end: "end",
            exponent: "exponent",
            externalresourcesrequired: "externalResourcesRequired",
            fill: "fill",
            fillopacity: "fillOpacity",
            "fill-opacity": "fillOpacity",
            fillrule: "fillRule",
            "fill-rule": "fillRule",
            filter: "filter",
            filterres: "filterRes",
            filterunits: "filterUnits",
            floodopacity: "floodOpacity",
            "flood-opacity": "floodOpacity",
            floodcolor: "floodColor",
            "flood-color": "floodColor",
            focusable: "focusable",
            fontfamily: "fontFamily",
            "font-family": "fontFamily",
            fontsize: "fontSize",
            "font-size": "fontSize",
            fontsizeadjust: "fontSizeAdjust",
            "font-size-adjust": "fontSizeAdjust",
            fontstretch: "fontStretch",
            "font-stretch": "fontStretch",
            fontstyle: "fontStyle",
            "font-style": "fontStyle",
            fontvariant: "fontVariant",
            "font-variant": "fontVariant",
            fontweight: "fontWeight",
            "font-weight": "fontWeight",
            format: "format",
            from: "from",
            fx: "fx",
            fy: "fy",
            g1: "g1",
            g2: "g2",
            glyphname: "glyphName",
            "glyph-name": "glyphName",
            glyphorientationhorizontal: "glyphOrientationHorizontal",
            "glyph-orientation-horizontal": "glyphOrientationHorizontal",
            glyphorientationvertical: "glyphOrientationVertical",
            "glyph-orientation-vertical": "glyphOrientationVertical",
            glyphref: "glyphRef",
            gradienttransform: "gradientTransform",
            gradientunits: "gradientUnits",
            hanging: "hanging",
            horizadvx: "horizAdvX",
            "horiz-adv-x": "horizAdvX",
            horizoriginx: "horizOriginX",
            "horiz-origin-x": "horizOriginX",
            ideographic: "ideographic",
            imagerendering: "imageRendering",
            "image-rendering": "imageRendering",
            in2: "in2",
            in: "in",
            inlist: "inlist",
            intercept: "intercept",
            k1: "k1",
            k2: "k2",
            k3: "k3",
            k4: "k4",
            k: "k",
            kernelmatrix: "kernelMatrix",
            kernelunitlength: "kernelUnitLength",
            kerning: "kerning",
            keypoints: "keyPoints",
            keysplines: "keySplines",
            keytimes: "keyTimes",
            lengthadjust: "lengthAdjust",
            letterspacing: "letterSpacing",
            "letter-spacing": "letterSpacing",
            lightingcolor: "lightingColor",
            "lighting-color": "lightingColor",
            limitingconeangle: "limitingConeAngle",
            local: "local",
            markerend: "markerEnd",
            "marker-end": "markerEnd",
            markerheight: "markerHeight",
            markermid: "markerMid",
            "marker-mid": "markerMid",
            markerstart: "markerStart",
            "marker-start": "markerStart",
            markerunits: "markerUnits",
            markerwidth: "markerWidth",
            mask: "mask",
            maskcontentunits: "maskContentUnits",
            maskunits: "maskUnits",
            mathematical: "mathematical",
            mode: "mode",
            numoctaves: "numOctaves",
            offset: "offset",
            opacity: "opacity",
            operator: "operator",
            order: "order",
            orient: "orient",
            orientation: "orientation",
            origin: "origin",
            overflow: "overflow",
            overlineposition: "overlinePosition",
            "overline-position": "overlinePosition",
            overlinethickness: "overlineThickness",
            "overline-thickness": "overlineThickness",
            paintorder: "paintOrder",
            "paint-order": "paintOrder",
            panose1: "panose1",
            "panose-1": "panose1",
            pathlength: "pathLength",
            patterncontentunits: "patternContentUnits",
            patterntransform: "patternTransform",
            patternunits: "patternUnits",
            pointerevents: "pointerEvents",
            "pointer-events": "pointerEvents",
            points: "points",
            pointsatx: "pointsAtX",
            pointsaty: "pointsAtY",
            pointsatz: "pointsAtZ",
            prefix: "prefix",
            preservealpha: "preserveAlpha",
            preserveaspectratio: "preserveAspectRatio",
            primitiveunits: "primitiveUnits",
            property: "property",
            r: "r",
            radius: "radius",
            refx: "refX",
            refy: "refY",
            renderingintent: "renderingIntent",
            "rendering-intent": "renderingIntent",
            repeatcount: "repeatCount",
            repeatdur: "repeatDur",
            requiredextensions: "requiredExtensions",
            requiredfeatures: "requiredFeatures",
            resource: "resource",
            restart: "restart",
            result: "result",
            results: "results",
            rotate: "rotate",
            rx: "rx",
            ry: "ry",
            scale: "scale",
            security: "security",
            seed: "seed",
            shaperendering: "shapeRendering",
            "shape-rendering": "shapeRendering",
            slope: "slope",
            spacing: "spacing",
            specularconstant: "specularConstant",
            specularexponent: "specularExponent",
            speed: "speed",
            spreadmethod: "spreadMethod",
            startoffset: "startOffset",
            stddeviation: "stdDeviation",
            stemh: "stemh",
            stemv: "stemv",
            stitchtiles: "stitchTiles",
            stopcolor: "stopColor",
            "stop-color": "stopColor",
            stopopacity: "stopOpacity",
            "stop-opacity": "stopOpacity",
            strikethroughposition: "strikethroughPosition",
            "strikethrough-position": "strikethroughPosition",
            strikethroughthickness: "strikethroughThickness",
            "strikethrough-thickness": "strikethroughThickness",
            string: "string",
            stroke: "stroke",
            strokedasharray: "strokeDasharray",
            "stroke-dasharray": "strokeDasharray",
            strokedashoffset: "strokeDashoffset",
            "stroke-dashoffset": "strokeDashoffset",
            strokelinecap: "strokeLinecap",
            "stroke-linecap": "strokeLinecap",
            strokelinejoin: "strokeLinejoin",
            "stroke-linejoin": "strokeLinejoin",
            strokemiterlimit: "strokeMiterlimit",
            "stroke-miterlimit": "strokeMiterlimit",
            strokewidth: "strokeWidth",
            "stroke-width": "strokeWidth",
            strokeopacity: "strokeOpacity",
            "stroke-opacity": "strokeOpacity",
            suppresscontenteditablewarning: "suppressContentEditableWarning",
            suppresshydrationwarning: "suppressHydrationWarning",
            surfacescale: "surfaceScale",
            systemlanguage: "systemLanguage",
            tablevalues: "tableValues",
            targetx: "targetX",
            targety: "targetY",
            textanchor: "textAnchor",
            "text-anchor": "textAnchor",
            textdecoration: "textDecoration",
            "text-decoration": "textDecoration",
            textlength: "textLength",
            textrendering: "textRendering",
            "text-rendering": "textRendering",
            to: "to",
            transform: "transform",
            typeof: "typeof",
            u1: "u1",
            u2: "u2",
            underlineposition: "underlinePosition",
            "underline-position": "underlinePosition",
            underlinethickness: "underlineThickness",
            "underline-thickness": "underlineThickness",
            unicode: "unicode",
            unicodebidi: "unicodeBidi",
            "unicode-bidi": "unicodeBidi",
            unicoderange: "unicodeRange",
            "unicode-range": "unicodeRange",
            unitsperem: "unitsPerEm",
            "units-per-em": "unitsPerEm",
            unselectable: "unselectable",
            valphabetic: "vAlphabetic",
            "v-alphabetic": "vAlphabetic",
            values: "values",
            vectoreffect: "vectorEffect",
            "vector-effect": "vectorEffect",
            version: "version",
            vertadvy: "vertAdvY",
            "vert-adv-y": "vertAdvY",
            vertoriginx: "vertOriginX",
            "vert-origin-x": "vertOriginX",
            vertoriginy: "vertOriginY",
            "vert-origin-y": "vertOriginY",
            vhanging: "vHanging",
            "v-hanging": "vHanging",
            videographic: "vIdeographic",
            "v-ideographic": "vIdeographic",
            viewbox: "viewBox",
            viewtarget: "viewTarget",
            visibility: "visibility",
            vmathematical: "vMathematical",
            "v-mathematical": "vMathematical",
            vocab: "vocab",
            widths: "widths",
            wordspacing: "wordSpacing",
            "word-spacing": "wordSpacing",
            writingmode: "writingMode",
            "writing-mode": "writingMode",
            x1: "x1",
            x2: "x2",
            x: "x",
            xchannelselector: "xChannelSelector",
            xheight: "xHeight",
            "x-height": "xHeight",
            xlinkactuate: "xlinkActuate",
            "xlink:actuate": "xlinkActuate",
            xlinkarcrole: "xlinkArcrole",
            "xlink:arcrole": "xlinkArcrole",
            xlinkhref: "xlinkHref",
            "xlink:href": "xlinkHref",
            xlinkrole: "xlinkRole",
            "xlink:role": "xlinkRole",
            xlinkshow: "xlinkShow",
            "xlink:show": "xlinkShow",
            xlinktitle: "xlinkTitle",
            "xlink:title": "xlinkTitle",
            xlinktype: "xlinkType",
            "xlink:type": "xlinkType",
            xmlbase: "xmlBase",
            "xml:base": "xmlBase",
            xmllang: "xmlLang",
            "xml:lang": "xmlLang",
            xmlns: "xmlns",
            "xml:space": "xmlSpace",
            xmlnsxlink: "xmlnsXlink",
            "xmlns:xlink": "xmlnsXlink",
            xmlspace: "xmlSpace",
            y1: "y1",
            y2: "y2",
            y: "y",
            ychannelselector: "yChannelSelector",
            z: "z",
            zoomandpan: "zoomAndPan"
        }, ariaProperties = {
            "aria-current": 0,
            "aria-details": 0,
            "aria-disabled": 0,
            "aria-hidden": 0,
            "aria-invalid": 0,
            "aria-keyshortcuts": 0,
            "aria-label": 0,
            "aria-roledescription": 0,
            "aria-autocomplete": 0,
            "aria-checked": 0,
            "aria-expanded": 0,
            "aria-haspopup": 0,
            "aria-level": 0,
            "aria-modal": 0,
            "aria-multiline": 0,
            "aria-multiselectable": 0,
            "aria-orientation": 0,
            "aria-placeholder": 0,
            "aria-pressed": 0,
            "aria-readonly": 0,
            "aria-required": 0,
            "aria-selected": 0,
            "aria-sort": 0,
            "aria-valuemax": 0,
            "aria-valuemin": 0,
            "aria-valuenow": 0,
            "aria-valuetext": 0,
            "aria-atomic": 0,
            "aria-busy": 0,
            "aria-live": 0,
            "aria-relevant": 0,
            "aria-dropeffect": 0,
            "aria-grabbed": 0,
            "aria-activedescendant": 0,
            "aria-colcount": 0,
            "aria-colindex": 0,
            "aria-colspan": 0,
            "aria-controls": 0,
            "aria-describedby": 0,
            "aria-errormessage": 0,
            "aria-flowto": 0,
            "aria-labelledby": 0,
            "aria-owns": 0,
            "aria-posinset": 0,
            "aria-rowcount": 0,
            "aria-rowindex": 0,
            "aria-rowspan": 0,
            "aria-setsize": 0
        }, warnedProperties = {}, rARIA = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$"), rARIACamel = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$"), hasOwnProperty$1 = Object.prototype.hasOwnProperty;
        function getStackAddendum() {
            var stack = ReactDebugCurrentFrame.getStackAddendum();
            return null != stack ? stack : "";
        }
        function validateProperty(tagName, name) {
            if (hasOwnProperty$1.call(warnedProperties, name) && warnedProperties[name]) return !0;
            if (rARIACamel.test(name)) {
                var ariaName = "aria-" + name.slice(4).toLowerCase(), correctName = ariaProperties.hasOwnProperty(ariaName) ? ariaName : null;
                if (null == correctName) return warning(!1, "Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.%s", name, getStackAddendum()), 
                warnedProperties[name] = !0, !0;
                if (name !== correctName) return warning(!1, "Invalid ARIA attribute `%s`. Did you mean `%s`?%s", name, correctName, getStackAddendum()), 
                warnedProperties[name] = !0, !0;
            }
            if (rARIA.test(name)) {
                var lowerCasedName = name.toLowerCase(), standardName = ariaProperties.hasOwnProperty(lowerCasedName) ? lowerCasedName : null;
                if (null == standardName) return warnedProperties[name] = !0, !1;
                if (name !== standardName) return warning(!1, "Unknown ARIA attribute `%s`. Did you mean `%s`?%s", name, standardName, getStackAddendum()), 
                warnedProperties[name] = !0, !0;
            }
            return !0;
        }
        function validateProperties(type, props) {
            isCustomComponent(type, props) || function(type, props) {
                var invalidProps = [];
                for (var key in props) validateProperty(0, key) || invalidProps.push(key);
                var unknownPropString = invalidProps.map((function(prop) {
                    return "`" + prop + "`";
                })).join(", ");
                1 === invalidProps.length ? warning(!1, "Invalid aria prop %s on <%s> tag. For details, see https://fb.me/invalid-aria-prop%s", unknownPropString, type, getStackAddendum()) : invalidProps.length > 1 && warning(!1, "Invalid aria props %s on <%s> tag. For details, see https://fb.me/invalid-aria-prop%s", unknownPropString, type, getStackAddendum());
            }(type, props);
        }
        var didWarnValueNull = !1;
        function getStackAddendum$1() {
            var stack = ReactDebugCurrentFrame.getStackAddendum();
            return null != stack ? stack : "";
        }
        function getStackAddendum$2() {
            var stack = ReactDebugCurrentFrame.getStackAddendum();
            return null != stack ? stack : "";
        }
        var validateProperty$1, warnedProperties$1 = {}, _hasOwnProperty = Object.prototype.hasOwnProperty, EVENT_NAME_REGEX = /^on./, INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/, rARIA$1 = new RegExp("^(aria)-[" + ATTRIBUTE_NAME_CHAR + "]*$"), rARIACamel$1 = new RegExp("^(aria)[A-Z][" + ATTRIBUTE_NAME_CHAR + "]*$");
        validateProperty$1 = function(tagName, name, value, canUseEventSystem) {
            if (_hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name]) return !0;
            var lowerCasedName = name.toLowerCase();
            if ("onfocusin" === lowerCasedName || "onfocusout" === lowerCasedName) return warning(!1, "React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), 
            warnedProperties$1[name] = !0, !0;
            if (canUseEventSystem) {
                if (registrationNameModules.hasOwnProperty(name)) return !0;
                var registrationName = possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? possibleRegistrationNames[lowerCasedName] : null;
                if (null != registrationName) return warning(!1, "Invalid event handler property `%s`. Did you mean `%s`?%s", name, registrationName, getStackAddendum$2()), 
                warnedProperties$1[name] = !0, !0;
                if (EVENT_NAME_REGEX.test(name)) return warning(!1, "Unknown event handler property `%s`. It will be ignored.%s", name, getStackAddendum$2()), 
                warnedProperties$1[name] = !0, !0;
            } else if (EVENT_NAME_REGEX.test(name)) return INVALID_EVENT_NAME_REGEX.test(name) && warning(!1, "Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.%s", name, getStackAddendum$2()), 
            warnedProperties$1[name] = !0, !0;
            if (rARIA$1.test(name) || rARIACamel$1.test(name)) return !0;
            if ("innerhtml" === lowerCasedName) return warning(!1, "Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), 
            warnedProperties$1[name] = !0, !0;
            if ("aria" === lowerCasedName) return warning(!1, "The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), 
            warnedProperties$1[name] = !0, !0;
            if ("is" === lowerCasedName && null != value && "string" != typeof value) return warning(!1, "Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.%s", typeof value, getStackAddendum$2()), 
            warnedProperties$1[name] = !0, !0;
            if ("number" == typeof value && isNaN(value)) return warning(!1, "Received NaN for the `%s` attribute. If this is expected, cast the value to a string.%s", name, getStackAddendum$2()), 
            warnedProperties$1[name] = !0, !0;
            var propertyInfo = getPropertyInfo(name), isReserved = null !== propertyInfo && 0 === propertyInfo.type;
            if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
                var standardName = possibleStandardNames[lowerCasedName];
                if (standardName !== name) return warning(!1, "Invalid DOM property `%s`. Did you mean `%s`?%s", name, standardName, getStackAddendum$2()), 
                warnedProperties$1[name] = !0, !0;
            } else if (!isReserved && name !== lowerCasedName) return warning(!1, "React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.%s", name, lowerCasedName, getStackAddendum$2()), 
            warnedProperties$1[name] = !0, !0;
            return "boolean" == typeof value && shouldRemoveAttributeWithWarning(name, value, propertyInfo, !1) ? (value ? warning(!1, 'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.%s', value, name, name, value, name, getStackAddendum$2()) : warning(!1, 'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.%s', value, name, name, value, name, name, name, getStackAddendum$2()), 
            warnedProperties$1[name] = !0, !0) : !!isReserved || (!shouldRemoveAttributeWithWarning(name, value, propertyInfo, !1) || (warnedProperties$1[name] = !0, 
            !1));
        };
        function validateProperties$2(type, props, canUseEventSystem) {
            isCustomComponent(type, props) || function(type, props, canUseEventSystem) {
                var unknownProps = [];
                for (var key in props) validateProperty$1(0, key, props[key], canUseEventSystem) || unknownProps.push(key);
                var unknownPropString = unknownProps.map((function(prop) {
                    return "`" + prop + "`";
                })).join(", ");
                1 === unknownProps.length ? warning(!1, "Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://fb.me/react-attribute-behavior%s", unknownPropString, type, getStackAddendum$2()) : unknownProps.length > 1 && warning(!1, "Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://fb.me/react-attribute-behavior%s", unknownPropString, type, getStackAddendum$2());
            }(type, props, canUseEventSystem);
        }
        var validatePropertiesInDevelopment, warnForTextDifference, warnForPropDifference, warnForExtraAttributes, warnForInvalidEventListener, normalizeMarkupForTextOrAttribute, normalizeHTML, getCurrentFiberOwnerName$2 = ReactDebugCurrentFiber.getCurrentFiberOwnerName, getCurrentFiberStackAddendum$2 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum, didWarnInvalidHydration = !1, didWarnShadyDOM = !1, HTML = "__html", HTML_NAMESPACE = Namespaces_html, getStack = emptyFunction.thatReturns(""), warnedUnknownTags = void 0, suppressHydrationWarning = void 0;
        getStack = getCurrentFiberStackAddendum$2, warnedUnknownTags = {
            time: !0,
            dialog: !0
        }, validatePropertiesInDevelopment = function(type, props) {
            validateProperties(type, props), function(type, props) {
                "input" !== type && "textarea" !== type && "select" !== type || null == props || null !== props.value || didWarnValueNull || (didWarnValueNull = !0, 
                "select" === type && props.multiple ? warning(!1, "`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.%s", type, getStackAddendum$1()) : warning(!1, "`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.%s", type, getStackAddendum$1()));
            }(type, props), validateProperties$2(type, props, !0);
        };
        var NORMALIZE_NEWLINES_REGEX = /\r\n?/g, NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g;
        function ensureListeningTo(rootContainerElement, registrationName) {
            !function(registrationName, mountAt) {
                for (var isListening = getListeningForDocument(mountAt), dependencies = registrationNameDependencies[registrationName], i = 0; i < dependencies.length; i++) {
                    var dependency = dependencies[i];
                    if (!isListening.hasOwnProperty(dependency) || !isListening[dependency]) {
                        switch (dependency) {
                          case "scroll":
                            trapCapturedEvent("scroll", mountAt);
                            break;

                          case "focus":
                          case "blur":
                            trapCapturedEvent("focus", mountAt), trapCapturedEvent("blur", mountAt), isListening.blur = !0, 
                            isListening.focus = !0;
                            break;

                          case "cancel":
                          case "close":
                            isEventSupported(dependency, !0) && trapCapturedEvent(dependency, mountAt);
                            break;

                          case "invalid":
                          case "submit":
                          case "reset":
                            break;

                          default:
                            -1 !== mediaEventTypes.indexOf(dependency) || trapBubbledEvent(dependency, mountAt);
                        }
                        isListening[dependency] = !0;
                    }
                }
            }(registrationName, 9 === rootContainerElement.nodeType || 11 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument);
        }
        function getOwnerDocumentFromRootContainer(rootContainerElement) {
            return 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
        }
        function trapClickOnNonInteractiveElement(node) {
            node.onclick = emptyFunction;
        }
        function createElement$1(type, props, rootContainerElement, parentNamespace) {
            var isCustomComponentTag = void 0, ownerDocument = getOwnerDocumentFromRootContainer(rootContainerElement), domElement = void 0, namespaceURI = parentNamespace;
            if (namespaceURI === HTML_NAMESPACE && (namespaceURI = getIntrinsicNamespace(type)), 
            namespaceURI === HTML_NAMESPACE) if ((isCustomComponentTag = isCustomComponent(type, props)) || type === type.toLowerCase() || warning(!1, "<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", type), 
            "script" === type) {
                var div = ownerDocument.createElement("div");
                div.innerHTML = "<script><\/script>";
                var firstChild = div.firstChild;
                domElement = div.removeChild(firstChild);
            } else domElement = "string" == typeof props.is ? ownerDocument.createElement(type, {
                is: props.is
            }) : ownerDocument.createElement(type); else domElement = ownerDocument.createElementNS(namespaceURI, type);
            return namespaceURI === HTML_NAMESPACE && (isCustomComponentTag || "[object HTMLUnknownElement]" !== Object.prototype.toString.call(domElement) || Object.prototype.hasOwnProperty.call(warnedUnknownTags, type) || (warnedUnknownTags[type] = !0, 
            warning(!1, "The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", type))), 
            domElement;
        }
        function createTextNode$1(text, rootContainerElement) {
            return getOwnerDocumentFromRootContainer(rootContainerElement).createTextNode(text);
        }
        function setInitialProperties$1(domElement, tag, rawProps, rootContainerElement) {
            var isCustomComponentTag = isCustomComponent(tag, rawProps);
            validatePropertiesInDevelopment(tag, rawProps), isCustomComponentTag && !didWarnShadyDOM && domElement.shadyRoot && (warning(!1, "%s is using shady DOM. Using shady DOM with React can cause things to break subtly.", getCurrentFiberOwnerName$2() || "A component"), 
            didWarnShadyDOM = !0);
            var props = void 0;
            switch (tag) {
              case "iframe":
              case "object":
                trapBubbledEvent("load", domElement), props = rawProps;
                break;

              case "video":
              case "audio":
                for (var i = 0; i < mediaEventTypes.length; i++) trapBubbledEvent(mediaEventTypes[i], domElement);
                props = rawProps;
                break;

              case "source":
                trapBubbledEvent("error", domElement), props = rawProps;
                break;

              case "img":
              case "image":
              case "link":
                trapBubbledEvent("error", domElement), trapBubbledEvent("load", domElement), props = rawProps;
                break;

              case "form":
                trapBubbledEvent("reset", domElement), trapBubbledEvent("submit", domElement), props = rawProps;
                break;

              case "details":
                trapBubbledEvent("toggle", domElement), props = rawProps;
                break;

              case "input":
                initWrapperState(domElement, rawProps), props = getHostProps(domElement, rawProps), 
                trapBubbledEvent("invalid", domElement), ensureListeningTo(rootContainerElement, "onChange");
                break;

              case "option":
                validateProps(0, rawProps), props = getHostProps$1(0, rawProps);
                break;

              case "select":
                initWrapperState$1(domElement, rawProps), props = getHostProps$2(0, rawProps), trapBubbledEvent("invalid", domElement), 
                ensureListeningTo(rootContainerElement, "onChange");
                break;

              case "textarea":
                initWrapperState$2(domElement, rawProps), props = getHostProps$3(domElement, rawProps), 
                trapBubbledEvent("invalid", domElement), ensureListeningTo(rootContainerElement, "onChange");
                break;

              default:
                props = rawProps;
            }
            switch (assertValidProps(tag, props, getStack), function(tag, domElement, rootContainerElement, nextProps, isCustomComponentTag) {
                for (var propKey in nextProps) if (nextProps.hasOwnProperty(propKey)) {
                    var nextProp = nextProps[propKey];
                    if ("style" === propKey) nextProp && Object.freeze(nextProp), setValueForStyles(domElement, nextProp, getStack); else if ("dangerouslySetInnerHTML" === propKey) {
                        var nextHtml = nextProp ? nextProp[HTML] : void 0;
                        null != nextHtml && setInnerHTML(domElement, nextHtml);
                    } else "children" === propKey ? "string" == typeof nextProp ? ("textarea" !== tag || "" !== nextProp) && setTextContent(domElement, nextProp) : "number" == typeof nextProp && setTextContent(domElement, "" + nextProp) : "suppressContentEditableWarning" === propKey || "suppressHydrationWarning" === propKey || "autoFocus" === propKey || (registrationNameModules.hasOwnProperty(propKey) ? null != nextProp && ("function" != typeof nextProp && warnForInvalidEventListener(propKey, nextProp), 
                    ensureListeningTo(rootContainerElement, propKey)) : null != nextProp && setValueForProperty(domElement, propKey, nextProp, isCustomComponentTag));
                }
            }(tag, domElement, rootContainerElement, props, isCustomComponentTag), tag) {
              case "input":
                track(domElement), postMountWrapper(domElement, rawProps, !1);
                break;

              case "textarea":
                track(domElement), postMountWrapper$3(domElement);
                break;

              case "option":
                !function(element, props) {
                    null != props.value && element.setAttribute("value", props.value);
                }(domElement, rawProps);
                break;

              case "select":
                !function(element, props) {
                    var node = element;
                    node.multiple = !!props.multiple;
                    var value = props.value;
                    null != value ? updateOptions(node, !!props.multiple, value, !1) : null != props.defaultValue && updateOptions(node, !!props.multiple, props.defaultValue, !0);
                }(domElement, rawProps);
                break;

              default:
                "function" == typeof props.onClick && trapClickOnNonInteractiveElement(domElement);
            }
        }
        function diffProperties$1(domElement, tag, lastRawProps, nextRawProps, rootContainerElement) {
            validatePropertiesInDevelopment(tag, nextRawProps);
            var updatePayload = null, lastProps = void 0, nextProps = void 0;
            switch (tag) {
              case "input":
                lastProps = getHostProps(domElement, lastRawProps), nextProps = getHostProps(domElement, nextRawProps), 
                updatePayload = [];
                break;

              case "option":
                lastProps = getHostProps$1(0, lastRawProps), nextProps = getHostProps$1(0, nextRawProps), 
                updatePayload = [];
                break;

              case "select":
                lastProps = getHostProps$2(0, lastRawProps), nextProps = getHostProps$2(0, nextRawProps), 
                updatePayload = [];
                break;

              case "textarea":
                lastProps = getHostProps$3(domElement, lastRawProps), nextProps = getHostProps$3(domElement, nextRawProps), 
                updatePayload = [];
                break;

              default:
                nextProps = nextRawProps, "function" != typeof (lastProps = lastRawProps).onClick && "function" == typeof nextProps.onClick && trapClickOnNonInteractiveElement(domElement);
            }
            assertValidProps(tag, nextProps, getStack);
            var propKey = void 0, styleName = void 0, styleUpdates = null;
            for (propKey in lastProps) if (!nextProps.hasOwnProperty(propKey) && lastProps.hasOwnProperty(propKey) && null != lastProps[propKey]) if ("style" === propKey) {
                var lastStyle = lastProps[propKey];
                for (styleName in lastStyle) lastStyle.hasOwnProperty(styleName) && (styleUpdates || (styleUpdates = {}), 
                styleUpdates[styleName] = "");
            } else "dangerouslySetInnerHTML" === propKey || "children" === propKey || "suppressContentEditableWarning" === propKey || "suppressHydrationWarning" === propKey || "autoFocus" === propKey || (registrationNameModules.hasOwnProperty(propKey) ? updatePayload || (updatePayload = []) : (updatePayload = updatePayload || []).push(propKey, null));
            for (propKey in nextProps) {
                var nextProp = nextProps[propKey], lastProp = null != lastProps ? lastProps[propKey] : void 0;
                if (nextProps.hasOwnProperty(propKey) && nextProp !== lastProp && (null != nextProp || null != lastProp)) if ("style" === propKey) if (nextProp && Object.freeze(nextProp), 
                lastProp) {
                    for (styleName in lastProp) !lastProp.hasOwnProperty(styleName) || nextProp && nextProp.hasOwnProperty(styleName) || (styleUpdates || (styleUpdates = {}), 
                    styleUpdates[styleName] = "");
                    for (styleName in nextProp) nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName] && (styleUpdates || (styleUpdates = {}), 
                    styleUpdates[styleName] = nextProp[styleName]);
                } else styleUpdates || (updatePayload || (updatePayload = []), updatePayload.push(propKey, styleUpdates)), 
                styleUpdates = nextProp; else if ("dangerouslySetInnerHTML" === propKey) {
                    var nextHtml = nextProp ? nextProp[HTML] : void 0, lastHtml = lastProp ? lastProp[HTML] : void 0;
                    null != nextHtml && lastHtml !== nextHtml && (updatePayload = updatePayload || []).push(propKey, "" + nextHtml);
                } else "children" === propKey ? lastProp === nextProp || "string" != typeof nextProp && "number" != typeof nextProp || (updatePayload = updatePayload || []).push(propKey, "" + nextProp) : "suppressContentEditableWarning" === propKey || "suppressHydrationWarning" === propKey || (registrationNameModules.hasOwnProperty(propKey) ? (null != nextProp && ("function" != typeof nextProp && warnForInvalidEventListener(propKey, nextProp), 
                ensureListeningTo(rootContainerElement, propKey)), updatePayload || lastProp === nextProp || (updatePayload = [])) : (updatePayload = updatePayload || []).push(propKey, nextProp));
            }
            return styleUpdates && (updatePayload = updatePayload || []).push("style", styleUpdates), 
            updatePayload;
        }
        function updateProperties$1(domElement, updatePayload, tag, lastRawProps, nextRawProps) {
            "input" === tag && "radio" === nextRawProps.type && null != nextRawProps.name && updateChecked(domElement, nextRawProps);
            isCustomComponent(tag, lastRawProps);
            switch (function(domElement, updatePayload, wasCustomComponentTag, isCustomComponentTag) {
                for (var i = 0; i < updatePayload.length; i += 2) {
                    var propKey = updatePayload[i], propValue = updatePayload[i + 1];
                    "style" === propKey ? setValueForStyles(domElement, propValue, getStack) : "dangerouslySetInnerHTML" === propKey ? setInnerHTML(domElement, propValue) : "children" === propKey ? setTextContent(domElement, propValue) : setValueForProperty(domElement, propKey, propValue, isCustomComponentTag);
                }
            }(domElement, updatePayload, 0, isCustomComponent(tag, nextRawProps)), tag) {
              case "input":
                updateWrapper(domElement, nextRawProps);
                break;

              case "textarea":
                updateWrapper$1(domElement, nextRawProps);
                break;

              case "select":
                !function(element, props) {
                    var node = element;
                    node._wrapperState.initialValue = void 0;
                    var wasMultiple = node._wrapperState.wasMultiple;
                    node._wrapperState.wasMultiple = !!props.multiple;
                    var value = props.value;
                    null != value ? updateOptions(node, !!props.multiple, value, !1) : wasMultiple !== !!props.multiple && (null != props.defaultValue ? updateOptions(node, !!props.multiple, props.defaultValue, !0) : updateOptions(node, !!props.multiple, props.multiple ? [] : "", !1));
                }(domElement, nextRawProps);
            }
        }
        function diffHydratedProperties$1(domElement, tag, rawProps, parentNamespace, rootContainerElement) {
            var isCustomComponentTag, extraAttributeNames = void 0;
            switch (suppressHydrationWarning = !0 === rawProps.suppressHydrationWarning, isCustomComponentTag = isCustomComponent(tag, rawProps), 
            validatePropertiesInDevelopment(tag, rawProps), isCustomComponentTag && !didWarnShadyDOM && domElement.shadyRoot && (warning(!1, "%s is using shady DOM. Using shady DOM with React can cause things to break subtly.", getCurrentFiberOwnerName$2() || "A component"), 
            didWarnShadyDOM = !0), tag) {
              case "iframe":
              case "object":
                trapBubbledEvent("load", domElement);
                break;

              case "video":
              case "audio":
                for (var i = 0; i < mediaEventTypes.length; i++) trapBubbledEvent(mediaEventTypes[i], domElement);
                break;

              case "source":
                trapBubbledEvent("error", domElement);
                break;

              case "img":
              case "image":
              case "link":
                trapBubbledEvent("error", domElement), trapBubbledEvent("load", domElement);
                break;

              case "form":
                trapBubbledEvent("reset", domElement), trapBubbledEvent("submit", domElement);
                break;

              case "details":
                trapBubbledEvent("toggle", domElement);
                break;

              case "input":
                initWrapperState(domElement, rawProps), trapBubbledEvent("invalid", domElement), 
                ensureListeningTo(rootContainerElement, "onChange");
                break;

              case "option":
                validateProps(0, rawProps);
                break;

              case "select":
                initWrapperState$1(domElement, rawProps), trapBubbledEvent("invalid", domElement), 
                ensureListeningTo(rootContainerElement, "onChange");
                break;

              case "textarea":
                initWrapperState$2(domElement, rawProps), trapBubbledEvent("invalid", domElement), 
                ensureListeningTo(rootContainerElement, "onChange");
            }
            assertValidProps(tag, rawProps, getStack), extraAttributeNames = new Set;
            for (var attributes = domElement.attributes, _i = 0; _i < attributes.length; _i++) {
                switch (attributes[_i].name.toLowerCase()) {
                  case "data-reactroot":
                  case "value":
                  case "checked":
                  case "selected":
                    break;

                  default:
                    extraAttributeNames.add(attributes[_i].name);
                }
            }
            var lowerCasedName, updatePayload = null;
            for (var propKey in rawProps) if (rawProps.hasOwnProperty(propKey)) {
                var nextProp = rawProps[propKey];
                if ("children" === propKey) "string" == typeof nextProp ? domElement.textContent !== nextProp && (suppressHydrationWarning || warnForTextDifference(domElement.textContent, nextProp), 
                updatePayload = [ "children", nextProp ]) : "number" == typeof nextProp && domElement.textContent !== "" + nextProp && (suppressHydrationWarning || warnForTextDifference(domElement.textContent, nextProp), 
                updatePayload = [ "children", "" + nextProp ]); else if (registrationNameModules.hasOwnProperty(propKey)) null != nextProp && ("function" != typeof nextProp && warnForInvalidEventListener(propKey, nextProp), 
                ensureListeningTo(rootContainerElement, propKey)); else if ("boolean" == typeof isCustomComponentTag) {
                    var serverValue = void 0, propertyInfo = getPropertyInfo(propKey);
                    if (suppressHydrationWarning) ; else if ("suppressContentEditableWarning" === propKey || "suppressHydrationWarning" === propKey || "value" === propKey || "checked" === propKey || "selected" === propKey) ; else if ("dangerouslySetInnerHTML" === propKey) {
                        var rawHtml = nextProp && nextProp[HTML] || "", serverHTML = domElement.innerHTML, expectedHTML = normalizeHTML(domElement, rawHtml);
                        expectedHTML !== serverHTML && warnForPropDifference(propKey, serverHTML, expectedHTML);
                    } else if ("style" === propKey) {
                        extraAttributeNames.delete(propKey);
                        var expectedStyle = createDangerousStringForStyles(nextProp);
                        expectedStyle !== (serverValue = domElement.getAttribute("style")) && warnForPropDifference(propKey, serverValue, expectedStyle);
                    } else if (isCustomComponentTag) extraAttributeNames.delete(propKey.toLowerCase()), 
                    nextProp !== (serverValue = getValueForAttribute(domElement, propKey, nextProp)) && warnForPropDifference(propKey, serverValue, nextProp); else if (!shouldIgnoreAttribute(propKey, propertyInfo, isCustomComponentTag) && !shouldRemoveAttribute(propKey, nextProp, propertyInfo, isCustomComponentTag)) {
                        var isMismatchDueToBadCasing = !1;
                        if (null !== propertyInfo) extraAttributeNames.delete(propertyInfo.attributeName), 
                        serverValue = getValueForProperty(domElement, propKey, nextProp, propertyInfo); else {
                            var ownNamespace = parentNamespace;
                            if (ownNamespace === HTML_NAMESPACE && (ownNamespace = getIntrinsicNamespace(tag)), 
                            ownNamespace === HTML_NAMESPACE) extraAttributeNames.delete(propKey.toLowerCase()); else {
                                var standardName = (lowerCasedName = void 0, lowerCasedName = propKey.toLowerCase(), 
                                possibleStandardNames.hasOwnProperty(lowerCasedName) && possibleStandardNames[lowerCasedName] || null);
                                null !== standardName && standardName !== propKey && (isMismatchDueToBadCasing = !0, 
                                extraAttributeNames.delete(standardName)), extraAttributeNames.delete(propKey);
                            }
                            serverValue = getValueForAttribute(domElement, propKey, nextProp);
                        }
                        nextProp === serverValue || isMismatchDueToBadCasing || warnForPropDifference(propKey, serverValue, nextProp);
                    }
                }
            }
            switch (extraAttributeNames.size > 0 && !suppressHydrationWarning && warnForExtraAttributes(extraAttributeNames), 
            tag) {
              case "input":
                track(domElement), postMountWrapper(domElement, rawProps, !0);
                break;

              case "textarea":
                track(domElement), postMountWrapper$3(domElement);
                break;

              case "select":
              case "option":
                break;

              default:
                "function" == typeof rawProps.onClick && trapClickOnNonInteractiveElement(domElement);
            }
            return updatePayload;
        }
        function diffHydratedText$1(textNode, text) {
            return textNode.nodeValue !== text;
        }
        function warnForUnmatchedText$1(textNode, text) {
            warnForTextDifference(textNode.nodeValue, text);
        }
        function warnForDeletedHydratableElement$1(parentNode, child) {
            didWarnInvalidHydration || (didWarnInvalidHydration = !0, warning(!1, "Did not expect server HTML to contain a <%s> in <%s>.", child.nodeName.toLowerCase(), parentNode.nodeName.toLowerCase()));
        }
        function warnForDeletedHydratableText$1(parentNode, child) {
            didWarnInvalidHydration || (didWarnInvalidHydration = !0, warning(!1, 'Did not expect server HTML to contain the text node "%s" in <%s>.', child.nodeValue, parentNode.nodeName.toLowerCase()));
        }
        function warnForInsertedHydratedElement$1(parentNode, tag, props) {
            didWarnInvalidHydration || (didWarnInvalidHydration = !0, warning(!1, "Expected server HTML to contain a matching <%s> in <%s>.", tag, parentNode.nodeName.toLowerCase()));
        }
        function warnForInsertedHydratedText$1(parentNode, text) {
            "" !== text && (didWarnInvalidHydration || (didWarnInvalidHydration = !0, warning(!1, 'Expected server HTML to contain a matching text node for "%s" in <%s>.', text, parentNode.nodeName.toLowerCase())));
        }
        normalizeMarkupForTextOrAttribute = function(markup) {
            return ("string" == typeof markup ? markup : "" + markup).replace(NORMALIZE_NEWLINES_REGEX, "\n").replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, "");
        }, warnForTextDifference = function(serverText, clientText) {
            if (!didWarnInvalidHydration) {
                var normalizedClientText = normalizeMarkupForTextOrAttribute(clientText), normalizedServerText = normalizeMarkupForTextOrAttribute(serverText);
                normalizedServerText !== normalizedClientText && (didWarnInvalidHydration = !0, 
                warning(!1, 'Text content did not match. Server: "%s" Client: "%s"', normalizedServerText, normalizedClientText));
            }
        }, warnForPropDifference = function(propName, serverValue, clientValue) {
            if (!didWarnInvalidHydration) {
                var normalizedClientValue = normalizeMarkupForTextOrAttribute(clientValue), normalizedServerValue = normalizeMarkupForTextOrAttribute(serverValue);
                normalizedServerValue !== normalizedClientValue && (didWarnInvalidHydration = !0, 
                warning(!1, "Prop `%s` did not match. Server: %s Client: %s", propName, JSON.stringify(normalizedServerValue), JSON.stringify(normalizedClientValue)));
            }
        }, warnForExtraAttributes = function(attributeNames) {
            if (!didWarnInvalidHydration) {
                didWarnInvalidHydration = !0;
                var names = [];
                attributeNames.forEach((function(name) {
                    names.push(name);
                })), warning(!1, "Extra attributes from the server: %s", names);
            }
        }, warnForInvalidEventListener = function(registrationName, listener) {
            !1 === listener ? warning(!1, "Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.%s", registrationName, registrationName, registrationName, getCurrentFiberStackAddendum$2()) : warning(!1, "Expected `%s` listener to be a function, instead got a value of `%s` type.%s", registrationName, typeof listener, getCurrentFiberStackAddendum$2());
        }, normalizeHTML = function(parent, html) {
            var testElement = parent.namespaceURI === HTML_NAMESPACE ? parent.ownerDocument.createElement(parent.tagName) : parent.ownerDocument.createElementNS(parent.namespaceURI, parent.tagName);
            return testElement.innerHTML = html, testElement.innerHTML;
        };
        var validateDOMNesting, ReactDOMFiberComponent = Object.freeze({
            createElement: createElement$1,
            createTextNode: createTextNode$1,
            setInitialProperties: setInitialProperties$1,
            diffProperties: diffProperties$1,
            updateProperties: updateProperties$1,
            diffHydratedProperties: diffHydratedProperties$1,
            diffHydratedText: diffHydratedText$1,
            warnForUnmatchedText: warnForUnmatchedText$1,
            warnForDeletedHydratableElement: warnForDeletedHydratableElement$1,
            warnForDeletedHydratableText: warnForDeletedHydratableText$1,
            warnForInsertedHydratedElement: warnForInsertedHydratedElement$1,
            warnForInsertedHydratedText: warnForInsertedHydratedText$1,
            restoreControlledState: function(domElement, tag, props) {
                switch (tag) {
                  case "input":
                    return void restoreControlledState(domElement, props);

                  case "textarea":
                    return void function(element, props) {
                        updateWrapper$1(element, props);
                    }(domElement, props);

                  case "select":
                    return void function(element, props) {
                        var node = element, value = props.value;
                        null != value && updateOptions(node, !!props.multiple, value, !1);
                    }(domElement, props);
                }
            }
        }), getCurrentFiberStackAddendum$5 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum, specialTags = [ "address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp" ], inScopeTags = [ "applet", "caption", "html", "table", "td", "th", "marquee", "object", "template", "foreignObject", "desc", "title" ], buttonScopeTags = inScopeTags.concat([ "button" ]), impliedEndTags = [ "dd", "dt", "li", "option", "optgroup", "p", "rp", "rt" ], emptyAncestorInfo = {
            current: null,
            formTag: null,
            aTagInScope: null,
            buttonTagInScope: null,
            nobrTagInScope: null,
            pTagInButtonScope: null,
            listItemTagAutoclosing: null,
            dlItemTagAutoclosing: null
        }, didWarn = {};
        (validateDOMNesting = function(childTag, childText, ancestorInfo) {
            var parentInfo = (ancestorInfo = ancestorInfo || emptyAncestorInfo).current, parentTag = parentInfo && parentInfo.tag;
            null != childText && (null != childTag && warning(!1, "validateDOMNesting: when childText is passed, childTag should be null"), 
            childTag = "#text");
            var invalidParent = function(tag, parentTag) {
                switch (parentTag) {
                  case "select":
                    return "option" === tag || "optgroup" === tag || "#text" === tag;

                  case "optgroup":
                    return "option" === tag || "#text" === tag;

                  case "option":
                    return "#text" === tag;

                  case "tr":
                    return "th" === tag || "td" === tag || "style" === tag || "script" === tag || "template" === tag;

                  case "tbody":
                  case "thead":
                  case "tfoot":
                    return "tr" === tag || "style" === tag || "script" === tag || "template" === tag;

                  case "colgroup":
                    return "col" === tag || "template" === tag;

                  case "table":
                    return "caption" === tag || "colgroup" === tag || "tbody" === tag || "tfoot" === tag || "thead" === tag || "style" === tag || "script" === tag || "template" === tag;

                  case "head":
                    return "base" === tag || "basefont" === tag || "bgsound" === tag || "link" === tag || "meta" === tag || "title" === tag || "noscript" === tag || "noframes" === tag || "style" === tag || "script" === tag || "template" === tag;

                  case "html":
                    return "head" === tag || "body" === tag;

                  case "#document":
                    return "html" === tag;
                }
                switch (tag) {
                  case "h1":
                  case "h2":
                  case "h3":
                  case "h4":
                  case "h5":
                  case "h6":
                    return "h1" !== parentTag && "h2" !== parentTag && "h3" !== parentTag && "h4" !== parentTag && "h5" !== parentTag && "h6" !== parentTag;

                  case "rp":
                  case "rt":
                    return -1 === impliedEndTags.indexOf(parentTag);

                  case "body":
                  case "caption":
                  case "col":
                  case "colgroup":
                  case "frame":
                  case "head":
                  case "html":
                  case "tbody":
                  case "td":
                  case "tfoot":
                  case "th":
                  case "thead":
                  case "tr":
                    return null == parentTag;
                }
                return !0;
            }(childTag, parentTag) ? null : parentInfo, invalidAncestor = invalidParent ? null : function(tag, ancestorInfo) {
                switch (tag) {
                  case "address":
                  case "article":
                  case "aside":
                  case "blockquote":
                  case "center":
                  case "details":
                  case "dialog":
                  case "dir":
                  case "div":
                  case "dl":
                  case "fieldset":
                  case "figcaption":
                  case "figure":
                  case "footer":
                  case "header":
                  case "hgroup":
                  case "main":
                  case "menu":
                  case "nav":
                  case "ol":
                  case "p":
                  case "section":
                  case "summary":
                  case "ul":
                  case "pre":
                  case "listing":
                  case "table":
                  case "hr":
                  case "xmp":
                  case "h1":
                  case "h2":
                  case "h3":
                  case "h4":
                  case "h5":
                  case "h6":
                    return ancestorInfo.pTagInButtonScope;

                  case "form":
                    return ancestorInfo.formTag || ancestorInfo.pTagInButtonScope;

                  case "li":
                    return ancestorInfo.listItemTagAutoclosing;

                  case "dd":
                  case "dt":
                    return ancestorInfo.dlItemTagAutoclosing;

                  case "button":
                    return ancestorInfo.buttonTagInScope;

                  case "a":
                    return ancestorInfo.aTagInScope;

                  case "nobr":
                    return ancestorInfo.nobrTagInScope;
                }
                return null;
            }(childTag, ancestorInfo), invalidParentOrAncestor = invalidParent || invalidAncestor;
            if (invalidParentOrAncestor) {
                var ancestorTag = invalidParentOrAncestor.tag, addendum = getCurrentFiberStackAddendum$5(), warnKey = !!invalidParent + "|" + childTag + "|" + ancestorTag + "|" + addendum;
                if (!didWarn[warnKey]) {
                    didWarn[warnKey] = !0;
                    var tagDisplayName = childTag, whitespaceInfo = "";
                    if ("#text" === childTag ? /\S/.test(childText) ? tagDisplayName = "Text nodes" : (tagDisplayName = "Whitespace text nodes", 
                    whitespaceInfo = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : tagDisplayName = "<" + childTag + ">", 
                    invalidParent) {
                        var info = "";
                        "table" === ancestorTag && "tr" === childTag && (info += " Add a <tbody> to your code to match the DOM tree generated by the browser."), 
                        warning(!1, "validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s%s", tagDisplayName, ancestorTag, whitespaceInfo, info, addendum);
                    } else warning(!1, "validateDOMNesting(...): %s cannot appear as a descendant of <%s>.%s", tagDisplayName, ancestorTag, addendum);
                }
            }
        }).updatedAncestorInfo = function(oldInfo, tag, instance) {
            var ancestorInfo = _assign({}, oldInfo || emptyAncestorInfo), info = {
                tag: tag,
                instance: instance
            };
            return -1 !== inScopeTags.indexOf(tag) && (ancestorInfo.aTagInScope = null, ancestorInfo.buttonTagInScope = null, 
            ancestorInfo.nobrTagInScope = null), -1 !== buttonScopeTags.indexOf(tag) && (ancestorInfo.pTagInButtonScope = null), 
            -1 !== specialTags.indexOf(tag) && "address" !== tag && "div" !== tag && "p" !== tag && (ancestorInfo.listItemTagAutoclosing = null, 
            ancestorInfo.dlItemTagAutoclosing = null), ancestorInfo.current = info, "form" === tag && (ancestorInfo.formTag = info), 
            "a" === tag && (ancestorInfo.aTagInScope = info), "button" === tag && (ancestorInfo.buttonTagInScope = info), 
            "nobr" === tag && (ancestorInfo.nobrTagInScope = info), "p" === tag && (ancestorInfo.pTagInButtonScope = info), 
            "li" === tag && (ancestorInfo.listItemTagAutoclosing = info), "dd" !== tag && "dt" !== tag || (ancestorInfo.dlItemTagAutoclosing = info), 
            ancestorInfo;
        };
        var validateDOMNesting$1 = validateDOMNesting;
        var createElement = createElement$1, createTextNode = createTextNode$1, setInitialProperties = setInitialProperties$1, diffProperties = diffProperties$1, updateProperties = updateProperties$1, diffHydratedProperties = diffHydratedProperties$1, diffHydratedText = diffHydratedText$1, warnForUnmatchedText = warnForUnmatchedText$1, warnForDeletedHydratableElement = warnForDeletedHydratableElement$1, warnForDeletedHydratableText = warnForDeletedHydratableText$1, warnForInsertedHydratedElement = warnForInsertedHydratedElement$1, warnForInsertedHydratedText = warnForInsertedHydratedText$1, updatedAncestorInfo = validateDOMNesting$1.updatedAncestorInfo, precacheFiberNode$1 = precacheFiberNode, updateFiberProps$1 = updateFiberProps;
        var eventsEnabled = null, selectionInformation = null;
        function shouldAutoFocusHostComponent(type, props) {
            switch (type) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                return !!props.autoFocus;
            }
            return !1;
        }
        function prepareForCommit(containerInfo) {
            var focusedElem;
            eventsEnabled = isEnabled(), focusedElem = getActiveElement(), selectionInformation = {
                focusedElem: focusedElem,
                selectionRange: hasSelectionCapabilities(focusedElem) ? getSelection$1(focusedElem) : null
            }, setEnabled(!1);
        }
        function finalizeInitialChildren(domElement, type, props, rootContainerInstance, hostContext) {
            return setInitialProperties(domElement, type, props, rootContainerInstance), shouldAutoFocusHostComponent(type, props);
        }
        function shouldSetTextContent(type, props) {
            return "textarea" === type || "string" == typeof props.children || "number" == typeof props.children || "object" == typeof props.dangerouslySetInnerHTML && null !== props.dangerouslySetInnerHTML && "string" == typeof props.dangerouslySetInnerHTML.__html;
        }
        function shouldDeprioritizeSubtree(type, props) {
            return !!props.hidden;
        }
        function createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {
            validateDOMNesting$1(null, text, hostContext.ancestorInfo);
            var textNode = createTextNode(text, rootContainerInstance);
            return precacheFiberNode$1(internalInstanceHandle, textNode), textNode;
        }
        var now = now$1, scheduleDeferredCallback = scheduleWork, cancelDeferredCallback = cancelScheduledWork;
        function resetTextContent(domElement) {
            setTextContent(domElement, "");
        }
        function appendChild(parentInstance, child) {
            parentInstance.appendChild(child);
        }
        function appendChildToContainer(container, child) {
            8 === container.nodeType ? container.parentNode.insertBefore(child, container) : container.appendChild(child);
        }
        function insertBefore(parentInstance, child, beforeChild) {
            parentInstance.insertBefore(child, beforeChild);
        }
        function removeChild(parentInstance, child) {
            parentInstance.removeChild(child);
        }
        function getNextHydratableSibling(instance) {
            for (var node = instance.nextSibling; node && 1 !== node.nodeType && 3 !== node.nodeType; ) node = node.nextSibling;
            return node;
        }
        function getFirstHydratableChild(parentInstance) {
            for (var next = parentInstance.firstChild; next && 1 !== next.nodeType && 3 !== next.nodeType; ) next = next.nextSibling;
            return next;
        }
        var supportsUserTiming = "undefined" != typeof performance && "function" == typeof performance.mark && "function" == typeof performance.clearMarks && "function" == typeof performance.measure && "function" == typeof performance.clearMeasures, currentFiber = null, currentPhase = null, currentPhaseFiber = null, isCommitting = !1, hasScheduledUpdateInCurrentCommit = !1, hasScheduledUpdateInCurrentPhase = !1, commitCountInCurrentWorkLoop = 0, effectCountInCurrentCommit = 0, isWaitingForCallback = !1, labelsInCurrentCommit = new Set, formatMarkName = function(markName) {
            return "⚛ " + markName;
        }, beginMark = function(markName) {
            performance.mark(formatMarkName(markName));
        }, endMark = function(label, markName, warning$$1) {
            var formattedMarkName = formatMarkName(markName), formattedLabel = function(label, warning$$1) {
                return (warning$$1 ? "⛔ " : "⚛ ") + label + (warning$$1 ? " Warning: " + warning$$1 : "");
            }(label, warning$$1);
            try {
                performance.measure(formattedLabel, formattedMarkName);
            } catch (err) {}
            performance.clearMarks(formattedMarkName), performance.clearMeasures(formattedLabel);
        }, getFiberMarkName = function(label, debugID) {
            return label + " (#" + debugID + ")";
        }, getFiberLabel = function(componentName, isMounted, phase) {
            return null === phase ? componentName + " [" + (isMounted ? "update" : "mount") + "]" : componentName + "." + phase;
        }, beginFiberMark = function(fiber, phase) {
            var componentName = getComponentName(fiber) || "Unknown", debugID = fiber._debugID, isMounted = null !== fiber.alternate, label = getFiberLabel(componentName, isMounted, phase);
            if (isCommitting && labelsInCurrentCommit.has(label)) return !1;
            labelsInCurrentCommit.add(label);
            var markName = getFiberMarkName(label, debugID);
            return beginMark(markName), !0;
        }, clearFiberMark = function(fiber, phase) {
            var componentName = getComponentName(fiber) || "Unknown", debugID = fiber._debugID, isMounted = null !== fiber.alternate, label = getFiberLabel(componentName, isMounted, phase);
            !function(markName) {
                performance.clearMarks(formatMarkName(markName));
            }(getFiberMarkName(label, debugID));
        }, endFiberMark = function(fiber, phase, warning$$1) {
            var componentName = getComponentName(fiber) || "Unknown", debugID = fiber._debugID, isMounted = null !== fiber.alternate, label = getFiberLabel(componentName, isMounted, phase), markName = getFiberMarkName(label, debugID);
            endMark(label, markName, warning$$1);
        }, shouldIgnoreFiber = function(fiber) {
            switch (fiber.tag) {
              case 3:
              case 5:
              case 6:
              case 4:
              case 10:
              case 13:
              case 12:
              case 11:
                return !0;

              default:
                return !1;
            }
        }, resumeTimersRecursively = function(fiber) {
            null !== fiber.return && resumeTimersRecursively(fiber.return), fiber._debugIsCurrentlyTiming && beginFiberMark(fiber, null);
        };
        function recordEffect() {
            effectCountInCurrentCommit++;
        }
        function cancelWorkTimer(fiber) {
            supportsUserTiming && !shouldIgnoreFiber(fiber) && (fiber._debugIsCurrentlyTiming = !1, 
            clearFiberMark(fiber, null));
        }
        function stopWorkTimer(fiber) {
            supportsUserTiming && !shouldIgnoreFiber(fiber) && (currentFiber = fiber.return, 
            fiber._debugIsCurrentlyTiming && (fiber._debugIsCurrentlyTiming = !1, endFiberMark(fiber, null, null)));
        }
        function stopFailedWorkTimer(fiber) {
            if (supportsUserTiming && !shouldIgnoreFiber(fiber) && (currentFiber = fiber.return, 
            fiber._debugIsCurrentlyTiming)) {
                fiber._debugIsCurrentlyTiming = !1;
                endFiberMark(fiber, null, "An error was thrown inside this error boundary");
            }
        }
        function startPhaseTimer(fiber, phase) {
            supportsUserTiming && (null !== currentPhase && null !== currentPhaseFiber && clearFiberMark(currentPhaseFiber, currentPhase), 
            currentPhaseFiber = null, currentPhase = null, hasScheduledUpdateInCurrentPhase = !1, 
            beginFiberMark(fiber, phase) && (currentPhaseFiber = fiber, currentPhase = phase));
        }
        function stopPhaseTimer() {
            supportsUserTiming && (null !== currentPhase && null !== currentPhaseFiber && endFiberMark(currentPhaseFiber, currentPhase, hasScheduledUpdateInCurrentPhase ? "Scheduled a cascading update" : null), 
            currentPhase = null, currentPhaseFiber = null);
        }
        function startWorkLoopTimer(nextUnitOfWork) {
            currentFiber = nextUnitOfWork, supportsUserTiming && (commitCountInCurrentWorkLoop = 0, 
            beginMark("(React Tree Reconciliation)"), null !== currentFiber && resumeTimersRecursively(currentFiber));
        }
        function stopWorkLoopTimer(interruptedBy, didCompleteRoot) {
            if (supportsUserTiming) {
                var warning$$1 = null;
                null !== interruptedBy ? warning$$1 = 3 === interruptedBy.tag ? "A top-level update interrupted the previous render" : "An update to " + (getComponentName(interruptedBy) || "Unknown") + " interrupted the previous render" : commitCountInCurrentWorkLoop > 1 && (warning$$1 = "There were cascading updates"), 
                commitCountInCurrentWorkLoop = 0;
                var label = didCompleteRoot ? "(React Tree Reconciliation: Completed Root)" : "(React Tree Reconciliation: Yielded)";
                !function() {
                    for (var fiber = currentFiber; fiber; ) fiber._debugIsCurrentlyTiming && endFiberMark(fiber, null, null), 
                    fiber = fiber.return;
                }(), endMark(label, "(React Tree Reconciliation)", warning$$1);
            }
        }
        var valueStack = [], fiberStack = void 0;
        fiberStack = [];
        var index = -1;
        function createCursor(defaultValue) {
            return {
                current: defaultValue
            };
        }
        function pop(cursor, fiber) {
            index < 0 ? warning(!1, "Unexpected pop.") : (fiber !== fiberStack[index] && warning(!1, "Unexpected Fiber popped."), 
            cursor.current = valueStack[index], valueStack[index] = null, fiberStack[index] = null, 
            index--);
        }
        function push(cursor, value, fiber) {
            index++, valueStack[index] = cursor.current, fiberStack[index] = fiber, cursor.current = value;
        }
        var warnedAboutMissingGetChildContext = void 0;
        warnedAboutMissingGetChildContext = {};
        var contextStackCursor = createCursor(emptyObject), didPerformWorkStackCursor = createCursor(!1), previousContext = emptyObject;
        function getUnmaskedContext(workInProgress) {
            return isContextProvider(workInProgress) ? previousContext : contextStackCursor.current;
        }
        function cacheContext(workInProgress, unmaskedContext, maskedContext) {
            var instance = workInProgress.stateNode;
            instance.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext, instance.__reactInternalMemoizedMaskedChildContext = maskedContext;
        }
        function getMaskedContext(workInProgress, unmaskedContext) {
            var contextTypes = workInProgress.type.contextTypes;
            if (!contextTypes) return emptyObject;
            var instance = workInProgress.stateNode;
            if (instance && instance.__reactInternalMemoizedUnmaskedChildContext === unmaskedContext) return instance.__reactInternalMemoizedMaskedChildContext;
            var context = {};
            for (var key in contextTypes) context[key] = unmaskedContext[key];
            var name = getComponentName(workInProgress) || "Unknown";
            return checkPropTypes(contextTypes, context, "context", name, ReactDebugCurrentFiber.getCurrentFiberStackAddendum), 
            instance && cacheContext(workInProgress, unmaskedContext, context), context;
        }
        function hasContextChanged() {
            return didPerformWorkStackCursor.current;
        }
        function isContextProvider(fiber) {
            return 2 === fiber.tag && null != fiber.type.childContextTypes;
        }
        function popContextProvider(fiber) {
            isContextProvider(fiber) && (pop(didPerformWorkStackCursor, fiber), pop(contextStackCursor, fiber));
        }
        function popTopLevelContextObject(fiber) {
            pop(didPerformWorkStackCursor, fiber), pop(contextStackCursor, fiber);
        }
        function pushTopLevelContextObject(fiber, context, didChange) {
            contextStackCursor.current !== emptyObject && invariant(!1, "Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue."), 
            push(contextStackCursor, context, fiber), push(didPerformWorkStackCursor, didChange, fiber);
        }
        function processChildContext(fiber, parentContext) {
            var instance = fiber.stateNode, childContextTypes = fiber.type.childContextTypes;
            if ("function" != typeof instance.getChildContext) {
                var componentName = getComponentName(fiber) || "Unknown";
                return warnedAboutMissingGetChildContext[componentName] || (warnedAboutMissingGetChildContext[componentName] = !0, 
                warning(!1, "%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", componentName, componentName)), 
                parentContext;
            }
            var childContext;
            for (var contextKey in ReactDebugCurrentFiber.setCurrentPhase("getChildContext"), 
            startPhaseTimer(fiber, "getChildContext"), childContext = instance.getChildContext(), 
            stopPhaseTimer(), ReactDebugCurrentFiber.setCurrentPhase(null), childContext) contextKey in childContextTypes || invariant(!1, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', getComponentName(fiber) || "Unknown", contextKey);
            var name = getComponentName(fiber) || "Unknown";
            return checkPropTypes(childContextTypes, childContext, "child context", name, ReactDebugCurrentFiber.getCurrentFiberStackAddendum), 
            _assign({}, parentContext, childContext);
        }
        function pushContextProvider(workInProgress) {
            if (!isContextProvider(workInProgress)) return !1;
            var instance = workInProgress.stateNode, memoizedMergedChildContext = instance && instance.__reactInternalMemoizedMergedChildContext || emptyObject;
            return previousContext = contextStackCursor.current, push(contextStackCursor, memoizedMergedChildContext, workInProgress), 
            push(didPerformWorkStackCursor, didPerformWorkStackCursor.current, workInProgress), 
            !0;
        }
        function invalidateContextProvider(workInProgress, didChange) {
            var instance = workInProgress.stateNode;
            if (instance || invariant(!1, "Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue."), 
            didChange) {
                var mergedContext = processChildContext(workInProgress, previousContext);
                instance.__reactInternalMemoizedMergedChildContext = mergedContext, pop(didPerformWorkStackCursor, workInProgress), 
                pop(contextStackCursor, workInProgress), push(contextStackCursor, mergedContext, workInProgress), 
                push(didPerformWorkStackCursor, didChange, workInProgress);
            } else pop(didPerformWorkStackCursor, workInProgress), push(didPerformWorkStackCursor, didChange, workInProgress);
        }
        var Never = 1073741823;
        function msToExpirationTime(ms) {
            return 2 + (ms / 10 | 0);
        }
        function expirationTimeToMs(expirationTime) {
            return 10 * (expirationTime - 2);
        }
        function computeExpirationBucket(currentTime, expirationInMs, bucketSizeMs) {
            return 2 + (1 + ((currentTime - 2 + expirationInMs / 10) / (precision = bucketSizeMs / 10) | 0)) * precision;
            var precision;
        }
        var hasBadMapPolyfill = void 0;
        hasBadMapPolyfill = !1;
        try {
            var nonExtensibleObject = Object.preventExtensions({}), testMap = new Map([ [ nonExtensibleObject, null ] ]), testSet = new Set([ nonExtensibleObject ]);
            testMap.set(0, 0), testSet.add(0);
        } catch (e) {
            hasBadMapPolyfill = !0;
        }
        var debugCounter = void 0;
        function FiberNode(tag, pendingProps, key, mode) {
            this.tag = tag, this.key = key, this.type = null, this.stateNode = null, this.return = null, 
            this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = pendingProps, 
            this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.mode = mode, 
            this.effectTag = 0, this.nextEffect = null, this.firstEffect = null, this.lastEffect = null, 
            this.expirationTime = 0, this.alternate = null, this.actualDuration = 0, this.actualStartTime = 0, 
            this.selfBaseTime = 0, this.treeBaseTime = 0, this._debugID = debugCounter++, this._debugSource = null, 
            this._debugOwner = null, this._debugIsCurrentlyTiming = !1, hasBadMapPolyfill || "function" != typeof Object.preventExtensions || Object.preventExtensions(this);
        }
        debugCounter = 1;
        var createFiber = function(tag, pendingProps, key, mode) {
            return new FiberNode(tag, pendingProps, key, mode);
        };
        function createWorkInProgress(current, pendingProps, expirationTime) {
            var workInProgress = current.alternate;
            return null === workInProgress ? ((workInProgress = createFiber(current.tag, pendingProps, current.key, current.mode)).type = current.type, 
            workInProgress.stateNode = current.stateNode, workInProgress._debugID = current._debugID, 
            workInProgress._debugSource = current._debugSource, workInProgress._debugOwner = current._debugOwner, 
            workInProgress.alternate = current, current.alternate = workInProgress) : (workInProgress.pendingProps = pendingProps, 
            workInProgress.effectTag = 0, workInProgress.nextEffect = null, workInProgress.firstEffect = null, 
            workInProgress.lastEffect = null, workInProgress.actualDuration = 0, workInProgress.actualStartTime = 0), 
            workInProgress.expirationTime = expirationTime, workInProgress.child = current.child, 
            workInProgress.memoizedProps = current.memoizedProps, workInProgress.memoizedState = current.memoizedState, 
            workInProgress.updateQueue = current.updateQueue, workInProgress.sibling = current.sibling, 
            workInProgress.index = current.index, workInProgress.ref = current.ref, workInProgress.selfBaseTime = current.selfBaseTime, 
            workInProgress.treeBaseTime = current.treeBaseTime, workInProgress;
        }
        function createFiberFromElement(element, mode, expirationTime) {
            var owner;
            owner = element._owner;
            var Component, fiber = void 0, type = element.type, key = element.key, pendingProps = element.props, fiberTag = void 0;
            if ("function" == typeof type) fiberTag = (Component = type).prototype && Component.prototype.isReactComponent ? 2 : 0; else if ("string" == typeof type) fiberTag = 5; else switch (type) {
              case REACT_FRAGMENT_TYPE:
                return createFiberFromFragment(pendingProps.children, mode, expirationTime, key);

              case REACT_ASYNC_MODE_TYPE:
                fiberTag = 11, mode |= 3;
                break;

              case REACT_STRICT_MODE_TYPE:
                fiberTag = 11, mode |= 2;
                break;

              case REACT_PROFILER_TYPE:
                return function(pendingProps, mode, expirationTime, key) {
                    "string" == typeof pendingProps.id && "function" == typeof pendingProps.onRender || invariant(!1, 'Profiler must specify an "id" string and "onRender" function as props');
                    var fiber = createFiber(15, pendingProps, key, 4 | mode);
                    return fiber.type = REACT_PROFILER_TYPE, fiber.expirationTime = expirationTime, 
                    fiber;
                }(pendingProps, mode, expirationTime, key);

              case REACT_TIMEOUT_TYPE:
                fiberTag = 16, mode |= 2;
                break;

              default:
                fiberTag = function(type, owner) {
                    switch ("object" == typeof type && null !== type ? type.$$typeof : null) {
                      case REACT_PROVIDER_TYPE:
                        return 13;

                      case REACT_CONTEXT_TYPE:
                        return 12;

                      case REACT_FORWARD_REF_TYPE:
                        return 14;

                      default:
                        var info = "";
                        (void 0 === type || "object" == typeof type && null !== type && 0 === Object.keys(type).length) && (info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
                        var ownerName = owner ? getComponentName(owner) : null;
                        ownerName && (info += "\n\nCheck the render method of `" + ownerName + "`."), invariant(!1, "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", null == type ? type : typeof type, info);
                    }
                }(type, owner);
            }
            return (fiber = createFiber(fiberTag, pendingProps, key, mode)).type = type, fiber.expirationTime = expirationTime, 
            fiber._debugSource = element._source, fiber._debugOwner = element._owner, fiber;
        }
        function createFiberFromFragment(elements, mode, expirationTime, key) {
            var fiber = createFiber(10, elements, key, mode);
            return fiber.expirationTime = expirationTime, fiber;
        }
        function createFiberFromText(content, mode, expirationTime) {
            var fiber = createFiber(6, content, null, mode);
            return fiber.expirationTime = expirationTime, fiber;
        }
        function createFiberFromPortal(portal, mode, expirationTime) {
            var pendingProps = null !== portal.children ? portal.children : [], fiber = createFiber(4, pendingProps, portal.key, mode);
            return fiber.expirationTime = expirationTime, fiber.stateNode = {
                containerInfo: portal.containerInfo,
                pendingChildren: null,
                implementation: portal.implementation
            }, fiber;
        }
        function assignFiberPropertiesInDEV(target, source) {
            return null === target && (target = createFiber(0, null, null, 0)), target.tag = source.tag, 
            target.key = source.key, target.type = source.type, target.stateNode = source.stateNode, 
            target.return = source.return, target.child = source.child, target.sibling = source.sibling, 
            target.index = source.index, target.ref = source.ref, target.pendingProps = source.pendingProps, 
            target.memoizedProps = source.memoizedProps, target.updateQueue = source.updateQueue, 
            target.memoizedState = source.memoizedState, target.mode = source.mode, target.effectTag = source.effectTag, 
            target.nextEffect = source.nextEffect, target.firstEffect = source.firstEffect, 
            target.lastEffect = source.lastEffect, target.expirationTime = source.expirationTime, 
            target.alternate = source.alternate, target.actualDuration = source.actualDuration, 
            target.actualStartTime = source.actualStartTime, target.selfBaseTime = source.selfBaseTime, 
            target.treeBaseTime = source.treeBaseTime, target._debugID = source._debugID, target._debugSource = source._debugSource, 
            target._debugOwner = source._debugOwner, target._debugIsCurrentlyTiming = source._debugIsCurrentlyTiming, 
            target;
        }
        function createFiberRoot(containerInfo, isAsync, hydrate) {
            var uninitializedFiber = function(isAsync) {
                return createFiber(3, null, null, isAsync ? 3 : 0);
            }(isAsync), root = {
                current: uninitializedFiber,
                containerInfo: containerInfo,
                pendingChildren: null,
                earliestPendingTime: 0,
                latestPendingTime: 0,
                earliestSuspendedTime: 0,
                latestSuspendedTime: 0,
                latestPingedTime: 0,
                pendingCommitExpirationTime: 0,
                finishedWork: null,
                context: null,
                pendingContext: null,
                hydrate: hydrate,
                remainingExpirationTime: 0,
                firstBatch: null,
                nextScheduledRoot: null
            };
            return uninitializedFiber.stateNode = root, root;
        }
        var onCommitFiberRoot = null, onCommitFiberUnmount = null, hasLoggedError = !1;
        function catchErrors(fn) {
            return function(arg) {
                try {
                    return fn(arg);
                } catch (err) {
                    hasLoggedError || (hasLoggedError = !0, warning(!1, "React DevTools encountered an error: %s", err));
                }
            };
        }
        function onCommitRoot(root) {
            "function" == typeof onCommitFiberRoot && onCommitFiberRoot(root);
        }
        function onCommitUnmount(fiber) {
            "function" == typeof onCommitFiberUnmount && onCommitFiberUnmount(fiber);
        }
        var printWarning = function(format) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
            var argIndex = 0, message = "Warning: " + format.replace(/%s/g, (function() {
                return args[argIndex++];
            }));
            try {
                throw new Error(message);
            } catch (x) {}
        }, lowPriorityWarning$1 = function(condition, format) {
            if (void 0 === format) throw new Error("`warning(condition, format, ...args)` requires a warning message argument");
            if (!condition) {
                for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) args[_key2 - 2] = arguments[_key2];
                printWarning.apply(void 0, [ format ].concat(args));
            }
        }, ReactStrictModeWarnings = {
            discardPendingWarnings: function() {},
            flushPendingDeprecationWarnings: function() {},
            flushPendingUnsafeLifecycleWarnings: function() {},
            recordDeprecationWarnings: function(fiber, instance) {},
            recordUnsafeLifecycleWarnings: function(fiber, instance) {},
            recordLegacyContextWarning: function(fiber, instance) {},
            flushLegacyContextWarning: function() {}
        }, LIFECYCLE_SUGGESTIONS = {
            UNSAFE_componentWillMount: "componentDidMount",
            UNSAFE_componentWillReceiveProps: "static getDerivedStateFromProps",
            UNSAFE_componentWillUpdate: "componentDidUpdate"
        }, pendingComponentWillMountWarnings = [], pendingComponentWillReceivePropsWarnings = [], pendingComponentWillUpdateWarnings = [], pendingUnsafeLifecycleWarnings = new Map, pendingLegacyContextWarning = new Map, didWarnAboutDeprecatedLifecycles = new Set, didWarnAboutUnsafeLifecycles = new Set, didWarnAboutLegacyContext = new Set, setToSortedString = function(set) {
            var array = [];
            return set.forEach((function(value) {
                array.push(value);
            })), array.sort().join(", ");
        };
        ReactStrictModeWarnings.discardPendingWarnings = function() {
            pendingComponentWillMountWarnings = [], pendingComponentWillReceivePropsWarnings = [], 
            pendingComponentWillUpdateWarnings = [], pendingUnsafeLifecycleWarnings = new Map, 
            pendingLegacyContextWarning = new Map;
        }, ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings = function() {
            pendingUnsafeLifecycleWarnings.forEach((function(lifecycleWarningsMap, strictRoot) {
                var lifecyclesWarningMesages = [];
                if (Object.keys(lifecycleWarningsMap).forEach((function(lifecycle) {
                    var lifecycleWarnings = lifecycleWarningsMap[lifecycle];
                    if (lifecycleWarnings.length > 0) {
                        var componentNames = new Set;
                        lifecycleWarnings.forEach((function(fiber) {
                            componentNames.add(getComponentName(fiber) || "Component"), didWarnAboutUnsafeLifecycles.add(fiber.type);
                        }));
                        var formatted = lifecycle.replace("UNSAFE_", ""), suggestion = LIFECYCLE_SUGGESTIONS[lifecycle], sortedComponentNames = setToSortedString(componentNames);
                        lifecyclesWarningMesages.push(formatted + ": Please update the following components to use " + suggestion + " instead: " + sortedComponentNames);
                    }
                })), lifecyclesWarningMesages.length > 0) {
                    var strictRootComponentStack = getStackAddendumByWorkInProgressFiber(strictRoot);
                    warning(!1, "Unsafe lifecycle methods were found within a strict-mode tree:%s\n\n%s\n\nLearn more about this warning here:\nhttps://fb.me/react-strict-mode-warnings", strictRootComponentStack, lifecyclesWarningMesages.join("\n\n"));
                }
            })), pendingUnsafeLifecycleWarnings = new Map;
        };
        var findStrictRoot = function(fiber) {
            for (var maybeStrictRoot = null, node = fiber; null !== node; ) 2 & node.mode && (maybeStrictRoot = node), 
            node = node.return;
            return maybeStrictRoot;
        };
        ReactStrictModeWarnings.flushPendingDeprecationWarnings = function() {
            if (pendingComponentWillMountWarnings.length > 0) {
                var uniqueNames = new Set;
                pendingComponentWillMountWarnings.forEach((function(fiber) {
                    uniqueNames.add(getComponentName(fiber) || "Component"), didWarnAboutDeprecatedLifecycles.add(fiber.type);
                }));
                var sortedNames = setToSortedString(uniqueNames);
                lowPriorityWarning$1(!1, "componentWillMount is deprecated and will be removed in the next major version. Use componentDidMount instead. As a temporary workaround, you can rename to UNSAFE_componentWillMount.\n\nPlease update the following components: %s\n\nLearn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks", sortedNames), 
                pendingComponentWillMountWarnings = [];
            }
            if (pendingComponentWillReceivePropsWarnings.length > 0) {
                var _uniqueNames = new Set;
                pendingComponentWillReceivePropsWarnings.forEach((function(fiber) {
                    _uniqueNames.add(getComponentName(fiber) || "Component"), didWarnAboutDeprecatedLifecycles.add(fiber.type);
                }));
                var _sortedNames = setToSortedString(_uniqueNames);
                lowPriorityWarning$1(!1, "componentWillReceiveProps is deprecated and will be removed in the next major version. Use static getDerivedStateFromProps instead.\n\nPlease update the following components: %s\n\nLearn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks", _sortedNames), 
                pendingComponentWillReceivePropsWarnings = [];
            }
            if (pendingComponentWillUpdateWarnings.length > 0) {
                var _uniqueNames2 = new Set;
                pendingComponentWillUpdateWarnings.forEach((function(fiber) {
                    _uniqueNames2.add(getComponentName(fiber) || "Component"), didWarnAboutDeprecatedLifecycles.add(fiber.type);
                }));
                var _sortedNames2 = setToSortedString(_uniqueNames2);
                lowPriorityWarning$1(!1, "componentWillUpdate is deprecated and will be removed in the next major version. Use componentDidUpdate instead. As a temporary workaround, you can rename to UNSAFE_componentWillUpdate.\n\nPlease update the following components: %s\n\nLearn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks", _sortedNames2), 
                pendingComponentWillUpdateWarnings = [];
            }
        }, ReactStrictModeWarnings.recordDeprecationWarnings = function(fiber, instance) {
            didWarnAboutDeprecatedLifecycles.has(fiber.type) || ("function" == typeof instance.componentWillMount && !0 !== instance.componentWillMount.__suppressDeprecationWarning && pendingComponentWillMountWarnings.push(fiber), 
            "function" == typeof instance.componentWillReceiveProps && !0 !== instance.componentWillReceiveProps.__suppressDeprecationWarning && pendingComponentWillReceivePropsWarnings.push(fiber), 
            "function" == typeof instance.componentWillUpdate && !0 !== instance.componentWillUpdate.__suppressDeprecationWarning && pendingComponentWillUpdateWarnings.push(fiber));
        }, ReactStrictModeWarnings.recordUnsafeLifecycleWarnings = function(fiber, instance) {
            var strictRoot = findStrictRoot(fiber);
            if (null !== strictRoot) {
                if (!didWarnAboutUnsafeLifecycles.has(fiber.type)) {
                    var warningsForRoot = void 0;
                    pendingUnsafeLifecycleWarnings.has(strictRoot) ? warningsForRoot = pendingUnsafeLifecycleWarnings.get(strictRoot) : (warningsForRoot = {
                        UNSAFE_componentWillMount: [],
                        UNSAFE_componentWillReceiveProps: [],
                        UNSAFE_componentWillUpdate: []
                    }, pendingUnsafeLifecycleWarnings.set(strictRoot, warningsForRoot));
                    var unsafeLifecycles = [];
                    ("function" == typeof instance.componentWillMount && !0 !== instance.componentWillMount.__suppressDeprecationWarning || "function" == typeof instance.UNSAFE_componentWillMount) && unsafeLifecycles.push("UNSAFE_componentWillMount"), 
                    ("function" == typeof instance.componentWillReceiveProps && !0 !== instance.componentWillReceiveProps.__suppressDeprecationWarning || "function" == typeof instance.UNSAFE_componentWillReceiveProps) && unsafeLifecycles.push("UNSAFE_componentWillReceiveProps"), 
                    ("function" == typeof instance.componentWillUpdate && !0 !== instance.componentWillUpdate.__suppressDeprecationWarning || "function" == typeof instance.UNSAFE_componentWillUpdate) && unsafeLifecycles.push("UNSAFE_componentWillUpdate"), 
                    unsafeLifecycles.length > 0 && unsafeLifecycles.forEach((function(lifecycle) {
                        warningsForRoot[lifecycle].push(fiber);
                    }));
                }
            } else warning(!1, "Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
        }, ReactStrictModeWarnings.recordLegacyContextWarning = function(fiber, instance) {
            var strictRoot = findStrictRoot(fiber);
            if (null !== strictRoot) {
                if (!didWarnAboutLegacyContext.has(fiber.type)) {
                    var warningsForRoot = pendingLegacyContextWarning.get(strictRoot);
                    (null != fiber.type.contextTypes || null != fiber.type.childContextTypes || null !== instance && "function" == typeof instance.getChildContext) && (void 0 === warningsForRoot && (warningsForRoot = [], 
                    pendingLegacyContextWarning.set(strictRoot, warningsForRoot)), warningsForRoot.push(fiber));
                }
            } else warning(!1, "Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
        }, ReactStrictModeWarnings.flushLegacyContextWarning = function() {
            pendingLegacyContextWarning.forEach((function(fiberArray, strictRoot) {
                var uniqueNames = new Set;
                fiberArray.forEach((function(fiber) {
                    uniqueNames.add(getComponentName(fiber) || "Component"), didWarnAboutLegacyContext.add(fiber.type);
                }));
                var sortedNames = setToSortedString(uniqueNames), strictRootComponentStack = getStackAddendumByWorkInProgressFiber(strictRoot);
                warning(!1, "Legacy context API has been detected within a strict-mode tree: %s\n\nPlease update the following components: %s\n\nLearn more about this warning here:\nhttps://fb.me/react-strict-mode-warnings", strictRootComponentStack, sortedNames);
            }));
        };
        var ReactFiberInstrumentation_1 = {
            debugTool: null
        };
        function findNextPendingPriorityLevel(root) {
            return root.current.expirationTime;
        }
        var resetCurrentlyProcessingQueue, hasForceUpdate = !1, didWarnUpdateInsideUpdate = void 0, currentlyProcessingQueue = void 0;
        function createUpdateQueue(baseState) {
            return {
                expirationTime: 0,
                baseState: baseState,
                firstUpdate: null,
                lastUpdate: null,
                firstCapturedUpdate: null,
                lastCapturedUpdate: null,
                firstEffect: null,
                lastEffect: null,
                firstCapturedEffect: null,
                lastCapturedEffect: null
            };
        }
        function cloneUpdateQueue(currentQueue) {
            return {
                expirationTime: currentQueue.expirationTime,
                baseState: currentQueue.baseState,
                firstUpdate: currentQueue.firstUpdate,
                lastUpdate: currentQueue.lastUpdate,
                firstCapturedUpdate: null,
                lastCapturedUpdate: null,
                firstEffect: null,
                lastEffect: null,
                firstCapturedEffect: null,
                lastCapturedEffect: null
            };
        }
        function createUpdate(expirationTime) {
            return {
                expirationTime: expirationTime,
                tag: 0,
                payload: null,
                callback: null,
                next: null,
                nextEffect: null
            };
        }
        function appendUpdateToQueue(queue, update, expirationTime) {
            null === queue.lastUpdate ? queue.firstUpdate = queue.lastUpdate = update : (queue.lastUpdate.next = update, 
            queue.lastUpdate = update), (0 === queue.expirationTime || queue.expirationTime > expirationTime) && (queue.expirationTime = expirationTime);
        }
        function enqueueUpdate(fiber, update, expirationTime) {
            var alternate = fiber.alternate, queue1 = void 0, queue2 = void 0;
            null === alternate ? (queue2 = null, null === (queue1 = fiber.updateQueue) && (queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState))) : (queue1 = fiber.updateQueue, 
            queue2 = alternate.updateQueue, null === queue1 ? null === queue2 ? (queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState), 
            queue2 = alternate.updateQueue = createUpdateQueue(alternate.memoizedState)) : queue1 = fiber.updateQueue = cloneUpdateQueue(queue2) : null === queue2 && (queue2 = alternate.updateQueue = cloneUpdateQueue(queue1))), 
            null === queue2 || queue1 === queue2 ? appendUpdateToQueue(queue1, update, expirationTime) : null === queue1.lastUpdate || null === queue2.lastUpdate ? (appendUpdateToQueue(queue1, update, expirationTime), 
            appendUpdateToQueue(queue2, update, expirationTime)) : (appendUpdateToQueue(queue1, update, expirationTime), 
            queue2.lastUpdate = update), 2 !== fiber.tag || currentlyProcessingQueue !== queue1 && (null === queue2 || currentlyProcessingQueue !== queue2) || didWarnUpdateInsideUpdate || (warning(!1, "An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), 
            didWarnUpdateInsideUpdate = !0);
        }
        function enqueueCapturedUpdate(workInProgress, update, renderExpirationTime) {
            var workInProgressQueue = workInProgress.updateQueue;
            null === (workInProgressQueue = null === workInProgressQueue ? workInProgress.updateQueue = createUpdateQueue(workInProgress.memoizedState) : ensureWorkInProgressQueueIsAClone(workInProgress, workInProgressQueue)).lastCapturedUpdate ? workInProgressQueue.firstCapturedUpdate = workInProgressQueue.lastCapturedUpdate = update : (workInProgressQueue.lastCapturedUpdate.next = update, 
            workInProgressQueue.lastCapturedUpdate = update), (0 === workInProgressQueue.expirationTime || workInProgressQueue.expirationTime > renderExpirationTime) && (workInProgressQueue.expirationTime = renderExpirationTime);
        }
        function ensureWorkInProgressQueueIsAClone(workInProgress, queue) {
            var current = workInProgress.alternate;
            return null !== current && queue === current.updateQueue && (queue = workInProgress.updateQueue = cloneUpdateQueue(queue)), 
            queue;
        }
        function getStateFromUpdate(workInProgress, queue, update, prevState, nextProps, instance) {
            switch (update.tag) {
              case 1:
                var _payload = update.payload;
                return "function" == typeof _payload ? (2 & workInProgress.mode && _payload.call(instance, prevState, nextProps), 
                _payload.call(instance, prevState, nextProps)) : _payload;

              case 3:
                workInProgress.effectTag = -1025 & workInProgress.effectTag | 64;

              case 0:
                var _payload2 = update.payload, partialState = void 0;
                return "function" == typeof _payload2 ? (2 & workInProgress.mode && _payload2.call(instance, prevState, nextProps), 
                partialState = _payload2.call(instance, prevState, nextProps)) : partialState = _payload2, 
                null == partialState ? prevState : _assign({}, prevState, partialState);

              case 2:
                return hasForceUpdate = !0, prevState;
            }
            return prevState;
        }
        function processUpdateQueue(workInProgress, queue, props, instance, renderExpirationTime) {
            if (hasForceUpdate = !1, !(0 === queue.expirationTime || queue.expirationTime > renderExpirationTime)) {
                queue = ensureWorkInProgressQueueIsAClone(workInProgress, queue), currentlyProcessingQueue = queue;
                for (var newBaseState = queue.baseState, newFirstUpdate = null, newExpirationTime = 0, update = queue.firstUpdate, resultState = newBaseState; null !== update; ) {
                    var updateExpirationTime = update.expirationTime;
                    if (updateExpirationTime > renderExpirationTime) null === newFirstUpdate && (newFirstUpdate = update, 
                    newBaseState = resultState), (0 === newExpirationTime || newExpirationTime > updateExpirationTime) && (newExpirationTime = updateExpirationTime); else resultState = getStateFromUpdate(workInProgress, 0, update, resultState, props, instance), 
                    null !== update.callback && (workInProgress.effectTag |= 32, update.nextEffect = null, 
                    null === queue.lastEffect ? queue.firstEffect = queue.lastEffect = update : (queue.lastEffect.nextEffect = update, 
                    queue.lastEffect = update));
                    update = update.next;
                }
                var newFirstCapturedUpdate = null;
                for (update = queue.firstCapturedUpdate; null !== update; ) {
                    var _updateExpirationTime = update.expirationTime;
                    if (_updateExpirationTime > renderExpirationTime) null === newFirstCapturedUpdate && (newFirstCapturedUpdate = update, 
                    null === newFirstUpdate && (newBaseState = resultState)), (0 === newExpirationTime || newExpirationTime > _updateExpirationTime) && (newExpirationTime = _updateExpirationTime); else resultState = getStateFromUpdate(workInProgress, 0, update, resultState, props, instance), 
                    null !== update.callback && (workInProgress.effectTag |= 32, update.nextEffect = null, 
                    null === queue.lastCapturedEffect ? queue.firstCapturedEffect = queue.lastCapturedEffect = update : (queue.lastCapturedEffect.nextEffect = update, 
                    queue.lastCapturedEffect = update));
                    update = update.next;
                }
                null === newFirstUpdate && (queue.lastUpdate = null), null === newFirstCapturedUpdate ? queue.lastCapturedUpdate = null : workInProgress.effectTag |= 32, 
                null === newFirstUpdate && null === newFirstCapturedUpdate && (newBaseState = resultState), 
                queue.baseState = newBaseState, queue.firstUpdate = newFirstUpdate, queue.firstCapturedUpdate = newFirstCapturedUpdate, 
                queue.expirationTime = newExpirationTime, workInProgress.memoizedState = resultState, 
                currentlyProcessingQueue = null;
            }
        }
        function callCallback(callback, context) {
            "function" != typeof callback && invariant(!1, "Invalid argument passed as callback. Expected a function. Instead received: %s", callback), 
            callback.call(context);
        }
        function resetHasForceUpdateBeforeProcessing() {
            hasForceUpdate = !1;
        }
        function checkHasForceUpdateAfterProcessing() {
            return hasForceUpdate;
        }
        function commitUpdateQueue(finishedWork, finishedQueue, instance, renderExpirationTime) {
            null !== finishedQueue.firstCapturedUpdate && (null !== finishedQueue.lastUpdate && (finishedQueue.lastUpdate.next = finishedQueue.firstCapturedUpdate, 
            finishedQueue.lastUpdate = finishedQueue.lastCapturedUpdate), finishedQueue.firstCapturedUpdate = finishedQueue.lastCapturedUpdate = null);
            var effect = finishedQueue.firstEffect;
            for (finishedQueue.firstEffect = finishedQueue.lastEffect = null; null !== effect; ) {
                var _callback3 = effect.callback;
                null !== _callback3 && (effect.callback = null, callCallback(_callback3, instance)), 
                effect = effect.nextEffect;
            }
            for (effect = finishedQueue.firstCapturedEffect, finishedQueue.firstCapturedEffect = finishedQueue.lastCapturedEffect = null; null !== effect; ) {
                var _callback4 = effect.callback;
                null !== _callback4 && (effect.callback = null, callCallback(_callback4, instance)), 
                effect = effect.nextEffect;
            }
        }
        function createCapturedValue(value, source) {
            return {
                value: value,
                source: source,
                stack: getStackAddendumByWorkInProgressFiber(source)
            };
        }
        didWarnUpdateInsideUpdate = !1, currentlyProcessingQueue = null, resetCurrentlyProcessingQueue = function() {
            currentlyProcessingQueue = null;
        };
        var rendererSigil, providerCursor = createCursor(null), valueCursor = createCursor(null), changedBitsCursor = createCursor(0);
        function pushProvider(providerFiber) {
            var context = providerFiber.type._context;
            push(changedBitsCursor, context._changedBits, providerFiber), push(valueCursor, context._currentValue, providerFiber), 
            push(providerCursor, providerFiber, providerFiber), context._currentValue = providerFiber.pendingProps.value, 
            context._changedBits = providerFiber.stateNode, void 0 !== context._currentRenderer && null !== context._currentRenderer && context._currentRenderer !== rendererSigil && warning(!1, "Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), 
            context._currentRenderer = rendererSigil;
        }
        function popProvider(providerFiber) {
            var changedBits = changedBitsCursor.current, currentValue = valueCursor.current;
            pop(providerCursor, providerFiber), pop(valueCursor, providerFiber), pop(changedBitsCursor, providerFiber);
            var context = providerFiber.type._context;
            context._currentValue = currentValue, context._changedBits = changedBits;
        }
        rendererSigil = {};
        var NO_CONTEXT = {}, contextStackCursor$1 = createCursor(NO_CONTEXT), contextFiberStackCursor = createCursor(NO_CONTEXT), rootInstanceStackCursor = createCursor(NO_CONTEXT);
        function requiredContext(c) {
            return c === NO_CONTEXT && invariant(!1, "Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."), 
            c;
        }
        function getRootHostContainer() {
            return requiredContext(rootInstanceStackCursor.current);
        }
        function pushHostContainer(fiber, nextRootInstance) {
            push(rootInstanceStackCursor, nextRootInstance, fiber), push(contextFiberStackCursor, fiber, fiber), 
            push(contextStackCursor$1, NO_CONTEXT, fiber);
            var nextRootContext = function(rootContainerInstance) {
                var type = void 0, namespace = void 0, nodeType = rootContainerInstance.nodeType;
                switch (nodeType) {
                  case 9:
                  case 11:
                    type = 9 === nodeType ? "#document" : "#fragment";
                    var root = rootContainerInstance.documentElement;
                    namespace = root ? root.namespaceURI : getChildNamespace(null, "");
                    break;

                  default:
                    var container = 8 === nodeType ? rootContainerInstance.parentNode : rootContainerInstance;
                    namespace = getChildNamespace(container.namespaceURI || null, type = container.tagName);
                }
                var validatedTag = type.toLowerCase();
                return {
                    namespace: namespace,
                    ancestorInfo: updatedAncestorInfo(null, validatedTag, null)
                };
            }(nextRootInstance);
            pop(contextStackCursor$1, fiber), push(contextStackCursor$1, nextRootContext, fiber);
        }
        function popHostContainer(fiber) {
            pop(contextStackCursor$1, fiber), pop(contextFiberStackCursor, fiber), pop(rootInstanceStackCursor, fiber);
        }
        function getHostContext() {
            return requiredContext(contextStackCursor$1.current);
        }
        function pushHostContext(fiber) {
            requiredContext(rootInstanceStackCursor.current);
            var parentHostContext, type, parentHostContextDev, context = requiredContext(contextStackCursor$1.current), nextContext = (parentHostContext = context, 
            type = fiber.type, {
                namespace: getChildNamespace((parentHostContextDev = parentHostContext).namespace, type),
                ancestorInfo: updatedAncestorInfo(parentHostContextDev.ancestorInfo, type, null)
            });
            context !== nextContext && (push(contextFiberStackCursor, fiber, fiber), push(contextStackCursor$1, nextContext, fiber));
        }
        function popHostContext(fiber) {
            contextFiberStackCursor.current === fiber && (pop(contextStackCursor$1, fiber), 
            pop(contextFiberStackCursor, fiber));
        }
        var commitTime = 0;
        var fiberStack$1 = void 0;
        fiberStack$1 = [];
        var timerPausedAt = 0, totalElapsedPauseTime = 0;
        function pauseActualRenderTimerIfRunning() {
            0 === timerPausedAt && (timerPausedAt = now());
        }
        function recordElapsedActualRenderTime(fiber) {
            fiber !== fiberStack$1.pop() && warning(!1, "Unexpected Fiber (%s) popped.", getComponentName(fiber)), 
            fiber.actualDuration = now() - totalElapsedPauseTime - fiber.actualDuration;
        }
        function resumeActualRenderTimerIfPaused() {
            timerPausedAt > 0 && (totalElapsedPauseTime += now() - timerPausedAt, timerPausedAt = 0);
        }
        var baseStartTime = -1;
        function stopBaseRenderTimerIfRunning() {
            baseStartTime = -1;
        }
        var warnOnUndefinedDerivedState, warnOnInvalidCallback$1, fakeInternalInstance = {}, isArray = Array.isArray, didWarnAboutStateAssignmentForComponent = void 0, didWarnAboutUninitializedState = void 0, didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = void 0, didWarnAboutLegacyLifecyclesAndDerivedState = void 0, didWarnAboutUndefinedDerivedState = void 0;
        didWarnAboutStateAssignmentForComponent = new Set, didWarnAboutUninitializedState = new Set, 
        didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = new Set, didWarnAboutLegacyLifecyclesAndDerivedState = new Set, 
        didWarnAboutUndefinedDerivedState = new Set;
        var didWarnOnInvalidCallback = new Set;
        function applyDerivedStateFromProps(workInProgress, getDerivedStateFromProps, nextProps) {
            var prevState = workInProgress.memoizedState;
            2 & workInProgress.mode && getDerivedStateFromProps(nextProps, prevState);
            var partialState = getDerivedStateFromProps(nextProps, prevState);
            warnOnUndefinedDerivedState(workInProgress, partialState);
            var memoizedState = null == partialState ? prevState : _assign({}, prevState, partialState);
            workInProgress.memoizedState = memoizedState;
            var updateQueue = workInProgress.updateQueue;
            null !== updateQueue && 0 === updateQueue.expirationTime && (updateQueue.baseState = memoizedState);
        }
        warnOnInvalidCallback$1 = function(callback, callerName) {
            if (null !== callback && "function" != typeof callback) {
                var key = callerName + "_" + callback;
                didWarnOnInvalidCallback.has(key) || (didWarnOnInvalidCallback.add(key), warning(!1, "%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", callerName, callback));
            }
        }, warnOnUndefinedDerivedState = function(workInProgress, partialState) {
            if (void 0 === partialState) {
                var componentName = getComponentName(workInProgress) || "Component";
                didWarnAboutUndefinedDerivedState.has(componentName) || (didWarnAboutUndefinedDerivedState.add(componentName), 
                warning(!1, "%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", componentName));
            }
        }, Object.defineProperty(fakeInternalInstance, "_processChildContext", {
            enumerable: !1,
            value: function() {
                invariant(!1, "_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
            }
        }), Object.freeze(fakeInternalInstance);
        var classComponentUpdater = {
            isMounted: function(component) {
                var owner = ReactCurrentOwner.current;
                if (null !== owner && 2 === owner.tag) {
                    var ownerFiber = owner, instance = ownerFiber.stateNode;
                    instance._warnedAboutRefsInRender || warning(!1, "%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", getComponentName(ownerFiber) || "A component"), 
                    instance._warnedAboutRefsInRender = !0;
                }
                var fiber = get(component);
                return !!fiber && 2 === isFiberMountedImpl(fiber);
            },
            enqueueSetState: function(inst, payload, callback) {
                var fiber = get(inst), expirationTime = computeExpirationForFiber(recalculateCurrentTime(), fiber), update = createUpdate(expirationTime);
                update.payload = payload, null != callback && (warnOnInvalidCallback$1(callback, "setState"), 
                update.callback = callback), enqueueUpdate(fiber, update, expirationTime), scheduleWork$1(fiber, expirationTime);
            },
            enqueueReplaceState: function(inst, payload, callback) {
                var fiber = get(inst), expirationTime = computeExpirationForFiber(recalculateCurrentTime(), fiber), update = createUpdate(expirationTime);
                update.tag = 1, update.payload = payload, null != callback && (warnOnInvalidCallback$1(callback, "replaceState"), 
                update.callback = callback), enqueueUpdate(fiber, update, expirationTime), scheduleWork$1(fiber, expirationTime);
            },
            enqueueForceUpdate: function(inst, callback) {
                var fiber = get(inst), expirationTime = computeExpirationForFiber(recalculateCurrentTime(), fiber), update = createUpdate(expirationTime);
                update.tag = 2, null != callback && (warnOnInvalidCallback$1(callback, "forceUpdate"), 
                update.callback = callback), enqueueUpdate(fiber, update, expirationTime), scheduleWork$1(fiber, expirationTime);
            }
        };
        function checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext) {
            var instance = workInProgress.stateNode, ctor = workInProgress.type;
            if ("function" == typeof instance.shouldComponentUpdate) {
                startPhaseTimer(workInProgress, "shouldComponentUpdate");
                var shouldUpdate = instance.shouldComponentUpdate(newProps, newState, newContext);
                return stopPhaseTimer(), void 0 === shouldUpdate && warning(!1, "%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", getComponentName(workInProgress) || "Component"), 
                shouldUpdate;
            }
            return !ctor.prototype || !ctor.prototype.isPureReactComponent || (!shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState));
        }
        function adoptClassInstance(workInProgress, instance) {
            var value;
            instance.updater = classComponentUpdater, workInProgress.stateNode = instance, value = workInProgress, 
            instance._reactInternalFiber = value, instance._reactInternalInstance = fakeInternalInstance;
        }
        function callComponentWillReceiveProps(workInProgress, instance, newProps, newContext) {
            var oldState = instance.state;
            if (startPhaseTimer(workInProgress, "componentWillReceiveProps"), "function" == typeof instance.componentWillReceiveProps && instance.componentWillReceiveProps(newProps, newContext), 
            "function" == typeof instance.UNSAFE_componentWillReceiveProps && instance.UNSAFE_componentWillReceiveProps(newProps, newContext), 
            stopPhaseTimer(), instance.state !== oldState) {
                var componentName = getComponentName(workInProgress) || "Component";
                didWarnAboutStateAssignmentForComponent.has(componentName) || (didWarnAboutStateAssignmentForComponent.add(componentName), 
                warning(!1, "%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", componentName)), 
                classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
            }
        }
        function mountClassInstance(workInProgress, renderExpirationTime) {
            var ctor = workInProgress.type;
            !function(workInProgress) {
                var instance = workInProgress.stateNode, type = workInProgress.type, name = getComponentName(workInProgress) || "Component";
                instance.render || (type.prototype && "function" == typeof type.prototype.render ? warning(!1, "%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", name) : warning(!1, "%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", name)), 
                !instance.getInitialState || instance.getInitialState.isReactClassApproved || instance.state || warning(!1, "getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", name), 
                !instance.getDefaultProps || instance.getDefaultProps.isReactClassApproved || warning(!1, "getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", name), 
                !instance.propTypes || warning(!1, "propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", name), 
                !instance.contextTypes || warning(!1, "contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", name), 
                "function" != typeof instance.componentShouldUpdate || warning(!1, "%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", name), 
                type.prototype && type.prototype.isPureReactComponent && void 0 !== instance.shouldComponentUpdate && warning(!1, "%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", getComponentName(workInProgress) || "A pure component"), 
                "function" != typeof instance.componentDidUnmount || warning(!1, "%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", name), 
                "function" != typeof instance.componentDidReceiveProps || warning(!1, "%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", name), 
                "function" != typeof instance.componentWillRecieveProps || warning(!1, "%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", name), 
                "function" != typeof instance.UNSAFE_componentWillRecieveProps || warning(!1, "%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", name);
                var hasMutatedProps = instance.props !== workInProgress.pendingProps;
                void 0 !== instance.props && hasMutatedProps && warning(!1, "%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", name, name), 
                !instance.defaultProps || warning(!1, "Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", name, name), 
                "function" != typeof instance.getSnapshotBeforeUpdate || "function" == typeof instance.componentDidUpdate || didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(type) || (didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(type), 
                warning(!1, "%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", getComponentName(workInProgress))), 
                "function" != typeof instance.getDerivedStateFromProps || warning(!1, "%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name), 
                "function" != typeof instance.getDerivedStateFromCatch || warning(!1, "%s: getDerivedStateFromCatch() is defined as an instance method and will be ignored. Instead, declare it as a static method.", name), 
                "function" != typeof type.getSnapshotBeforeUpdate || warning(!1, "%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", name);
                var _state = instance.state;
                _state && ("object" != typeof _state || isArray(_state)) && warning(!1, "%s.state: must be set to an object or null", name), 
                "function" == typeof instance.getChildContext && "object" != typeof type.childContextTypes && warning(!1, "%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", name);
            }(workInProgress);
            var instance = workInProgress.stateNode, props = workInProgress.pendingProps, unmaskedContext = getUnmaskedContext(workInProgress);
            instance.props = props, instance.state = workInProgress.memoizedState, instance.refs = emptyObject, 
            instance.context = getMaskedContext(workInProgress, unmaskedContext), 2 & workInProgress.mode && (ReactStrictModeWarnings.recordUnsafeLifecycleWarnings(workInProgress, instance), 
            ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress, instance));
            var updateQueue = workInProgress.updateQueue;
            null !== updateQueue && (processUpdateQueue(workInProgress, updateQueue, props, instance, renderExpirationTime), 
            instance.state = workInProgress.memoizedState);
            var getDerivedStateFromProps = workInProgress.type.getDerivedStateFromProps;
            "function" == typeof getDerivedStateFromProps && (applyDerivedStateFromProps(workInProgress, getDerivedStateFromProps, props), 
            instance.state = workInProgress.memoizedState), "function" == typeof ctor.getDerivedStateFromProps || "function" == typeof instance.getSnapshotBeforeUpdate || "function" != typeof instance.UNSAFE_componentWillMount && "function" != typeof instance.componentWillMount || (!function(workInProgress, instance) {
                startPhaseTimer(workInProgress, "componentWillMount");
                var oldState = instance.state;
                "function" == typeof instance.componentWillMount && instance.componentWillMount(), 
                "function" == typeof instance.UNSAFE_componentWillMount && instance.UNSAFE_componentWillMount(), 
                stopPhaseTimer(), oldState !== instance.state && (warning(!1, "%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", getComponentName(workInProgress) || "Component"), 
                classComponentUpdater.enqueueReplaceState(instance, instance.state, null));
            }(workInProgress, instance), null !== (updateQueue = workInProgress.updateQueue) && (processUpdateQueue(workInProgress, updateQueue, props, instance, renderExpirationTime), 
            instance.state = workInProgress.memoizedState)), "function" == typeof instance.componentDidMount && (workInProgress.effectTag |= 4);
        }
        var warnForMissingKey, getCurrentFiberStackAddendum$7 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum, didWarnAboutMaps = void 0, didWarnAboutStringRefInStrictMode = void 0, ownerHasKeyUseWarning = void 0, ownerHasFunctionTypeWarning = void 0;
        didWarnAboutMaps = !1, didWarnAboutStringRefInStrictMode = {}, ownerHasKeyUseWarning = {}, 
        ownerHasFunctionTypeWarning = {}, warnForMissingKey = function(child) {
            if (null !== child && "object" == typeof child && child._store && !child._store.validated && null == child.key) {
                "object" != typeof child._store && invariant(!1, "React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue."), 
                child._store.validated = !0;
                var currentComponentErrorInfo = 'Each child in an array or iterator should have a unique "key" prop. See https://fb.me/react-warning-keys for more information.' + (getCurrentFiberStackAddendum$7() || "");
                ownerHasKeyUseWarning[currentComponentErrorInfo] || (ownerHasKeyUseWarning[currentComponentErrorInfo] = !0, 
                warning(!1, 'Each child in an array or iterator should have a unique "key" prop. See https://fb.me/react-warning-keys for more information.%s', getCurrentFiberStackAddendum$7()));
            }
        };
        var isArray$1 = Array.isArray;
        function coerceRef(returnFiber, current, element) {
            var mixedRef = element.ref;
            if (null !== mixedRef && "function" != typeof mixedRef && "object" != typeof mixedRef) {
                if (2 & returnFiber.mode) {
                    var componentName = getComponentName(returnFiber) || "Component";
                    didWarnAboutStringRefInStrictMode[componentName] || (warning(!1, 'A string ref, "%s", has been found within a strict mode tree. String refs are a source of potential bugs and should be avoided. We recommend using createRef() instead.\n%s\n\nLearn more about using refs safely here:\nhttps://fb.me/react-strict-mode-string-ref', mixedRef, getStackAddendumByWorkInProgressFiber(returnFiber)), 
                    didWarnAboutStringRefInStrictMode[componentName] = !0);
                }
                if (element._owner) {
                    var owner = element._owner, inst = void 0;
                    if (owner) {
                        var ownerFiber = owner;
                        2 !== ownerFiber.tag && invariant(!1, "Stateless function components cannot have refs."), 
                        inst = ownerFiber.stateNode;
                    }
                    inst || invariant(!1, "Missing owner for string ref %s. This error is likely caused by a bug in React. Please file an issue.", mixedRef);
                    var stringRef = "" + mixedRef;
                    if (null !== current && null !== current.ref && "function" == typeof current.ref && current.ref._stringRef === stringRef) return current.ref;
                    var ref = function(value) {
                        var refs = inst.refs === emptyObject ? inst.refs = {} : inst.refs;
                        null === value ? delete refs[stringRef] : refs[stringRef] = value;
                    };
                    return ref._stringRef = stringRef, ref;
                }
                "string" != typeof mixedRef && invariant(!1, "Expected ref to be a function or a string."), 
                element._owner || invariant(!1, "Element ref was specified as a string (%s) but no owner was set. This could happen for one of the following reasons:\n1. You may be adding a ref to a functional component\n2. You may be adding a ref to a component that was not created inside a component's render method\n3. You have multiple copies of React loaded\nSee https://fb.me/react-refs-must-have-owner for more information.", mixedRef);
            }
            return mixedRef;
        }
        function throwOnInvalidObjectType(returnFiber, newChild) {
            if ("textarea" !== returnFiber.type) {
                var addendum;
                addendum = " If you meant to render a collection of children, use an array instead." + (getCurrentFiberStackAddendum$7() || ""), 
                invariant(!1, "Objects are not valid as a React child (found: %s).%s", "[object Object]" === Object.prototype.toString.call(newChild) ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : newChild, addendum);
            }
        }
        function warnOnFunctionType() {
            var currentComponentErrorInfo = "Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it." + (getCurrentFiberStackAddendum$7() || "");
            ownerHasFunctionTypeWarning[currentComponentErrorInfo] || (ownerHasFunctionTypeWarning[currentComponentErrorInfo] = !0, 
            warning(!1, "Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.%s", getCurrentFiberStackAddendum$7() || ""));
        }
        function ChildReconciler(shouldTrackSideEffects) {
            function deleteChild(returnFiber, childToDelete) {
                if (shouldTrackSideEffects) {
                    var last = returnFiber.lastEffect;
                    null !== last ? (last.nextEffect = childToDelete, returnFiber.lastEffect = childToDelete) : returnFiber.firstEffect = returnFiber.lastEffect = childToDelete, 
                    childToDelete.nextEffect = null, childToDelete.effectTag = 8;
                }
            }
            function deleteRemainingChildren(returnFiber, currentFirstChild) {
                if (!shouldTrackSideEffects) return null;
                for (var childToDelete = currentFirstChild; null !== childToDelete; ) deleteChild(returnFiber, childToDelete), 
                childToDelete = childToDelete.sibling;
                return null;
            }
            function mapRemainingChildren(returnFiber, currentFirstChild) {
                for (var existingChildren = new Map, existingChild = currentFirstChild; null !== existingChild; ) null !== existingChild.key ? existingChildren.set(existingChild.key, existingChild) : existingChildren.set(existingChild.index, existingChild), 
                existingChild = existingChild.sibling;
                return existingChildren;
            }
            function useFiber(fiber, pendingProps, expirationTime) {
                var clone = createWorkInProgress(fiber, pendingProps, expirationTime);
                return clone.index = 0, clone.sibling = null, clone;
            }
            function placeChild(newFiber, lastPlacedIndex, newIndex) {
                if (newFiber.index = newIndex, !shouldTrackSideEffects) return lastPlacedIndex;
                var current = newFiber.alternate;
                if (null !== current) {
                    var oldIndex = current.index;
                    return oldIndex < lastPlacedIndex ? (newFiber.effectTag = 2, lastPlacedIndex) : oldIndex;
                }
                return newFiber.effectTag = 2, lastPlacedIndex;
            }
            function placeSingleChild(newFiber) {
                return shouldTrackSideEffects && null === newFiber.alternate && (newFiber.effectTag = 2), 
                newFiber;
            }
            function updateTextNode(returnFiber, current, textContent, expirationTime) {
                if (null === current || 6 !== current.tag) {
                    var created = createFiberFromText(textContent, returnFiber.mode, expirationTime);
                    return created.return = returnFiber, created;
                }
                var existing = useFiber(current, textContent, expirationTime);
                return existing.return = returnFiber, existing;
            }
            function updateElement(returnFiber, current, element, expirationTime) {
                if (null !== current && current.type === element.type) {
                    var existing = useFiber(current, element.props, expirationTime);
                    return existing.ref = coerceRef(returnFiber, current, element), existing.return = returnFiber, 
                    existing._debugSource = element._source, existing._debugOwner = element._owner, 
                    existing;
                }
                var created = createFiberFromElement(element, returnFiber.mode, expirationTime);
                return created.ref = coerceRef(returnFiber, current, element), created.return = returnFiber, 
                created;
            }
            function updatePortal(returnFiber, current, portal, expirationTime) {
                if (null === current || 4 !== current.tag || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation) {
                    var created = createFiberFromPortal(portal, returnFiber.mode, expirationTime);
                    return created.return = returnFiber, created;
                }
                var existing = useFiber(current, portal.children || [], expirationTime);
                return existing.return = returnFiber, existing;
            }
            function updateFragment(returnFiber, current, fragment, expirationTime, key) {
                if (null === current || 10 !== current.tag) {
                    var created = createFiberFromFragment(fragment, returnFiber.mode, expirationTime, key);
                    return created.return = returnFiber, created;
                }
                var existing = useFiber(current, fragment, expirationTime);
                return existing.return = returnFiber, existing;
            }
            function createChild(returnFiber, newChild, expirationTime) {
                if ("string" == typeof newChild || "number" == typeof newChild) {
                    var created = createFiberFromText("" + newChild, returnFiber.mode, expirationTime);
                    return created.return = returnFiber, created;
                }
                if ("object" == typeof newChild && null !== newChild) {
                    switch (newChild.$$typeof) {
                      case REACT_ELEMENT_TYPE:
                        var _created = createFiberFromElement(newChild, returnFiber.mode, expirationTime);
                        return _created.ref = coerceRef(returnFiber, null, newChild), _created.return = returnFiber, 
                        _created;

                      case REACT_PORTAL_TYPE:
                        var _created2 = createFiberFromPortal(newChild, returnFiber.mode, expirationTime);
                        return _created2.return = returnFiber, _created2;
                    }
                    if (isArray$1(newChild) || getIteratorFn(newChild)) {
                        var _created3 = createFiberFromFragment(newChild, returnFiber.mode, expirationTime, null);
                        return _created3.return = returnFiber, _created3;
                    }
                    throwOnInvalidObjectType(returnFiber, newChild);
                }
                return "function" == typeof newChild && warnOnFunctionType(), null;
            }
            function updateSlot(returnFiber, oldFiber, newChild, expirationTime) {
                var key = null !== oldFiber ? oldFiber.key : null;
                if ("string" == typeof newChild || "number" == typeof newChild) return null !== key ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, expirationTime);
                if ("object" == typeof newChild && null !== newChild) {
                    switch (newChild.$$typeof) {
                      case REACT_ELEMENT_TYPE:
                        return newChild.key === key ? newChild.type === REACT_FRAGMENT_TYPE ? updateFragment(returnFiber, oldFiber, newChild.props.children, expirationTime, key) : updateElement(returnFiber, oldFiber, newChild, expirationTime) : null;

                      case REACT_PORTAL_TYPE:
                        return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, expirationTime) : null;
                    }
                    if (isArray$1(newChild) || getIteratorFn(newChild)) return null !== key ? null : updateFragment(returnFiber, oldFiber, newChild, expirationTime, null);
                    throwOnInvalidObjectType(returnFiber, newChild);
                }
                return "function" == typeof newChild && warnOnFunctionType(), null;
            }
            function updateFromMap(existingChildren, returnFiber, newIdx, newChild, expirationTime) {
                if ("string" == typeof newChild || "number" == typeof newChild) return updateTextNode(returnFiber, existingChildren.get(newIdx) || null, "" + newChild, expirationTime);
                if ("object" == typeof newChild && null !== newChild) {
                    switch (newChild.$$typeof) {
                      case REACT_ELEMENT_TYPE:
                        var _matchedFiber = existingChildren.get(null === newChild.key ? newIdx : newChild.key) || null;
                        return newChild.type === REACT_FRAGMENT_TYPE ? updateFragment(returnFiber, _matchedFiber, newChild.props.children, expirationTime, newChild.key) : updateElement(returnFiber, _matchedFiber, newChild, expirationTime);

                      case REACT_PORTAL_TYPE:
                        return updatePortal(returnFiber, existingChildren.get(null === newChild.key ? newIdx : newChild.key) || null, newChild, expirationTime);
                    }
                    if (isArray$1(newChild) || getIteratorFn(newChild)) return updateFragment(returnFiber, existingChildren.get(newIdx) || null, newChild, expirationTime, null);
                    throwOnInvalidObjectType(returnFiber, newChild);
                }
                return "function" == typeof newChild && warnOnFunctionType(), null;
            }
            function warnOnInvalidKey(child, knownKeys) {
                if ("object" != typeof child || null === child) return knownKeys;
                switch (child.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    warnForMissingKey(child);
                    var key = child.key;
                    if ("string" != typeof key) break;
                    if (null === knownKeys) {
                        (knownKeys = new Set).add(key);
                        break;
                    }
                    if (!knownKeys.has(key)) {
                        knownKeys.add(key);
                        break;
                    }
                    warning(!1, "Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.%s", key, getCurrentFiberStackAddendum$7());
                }
                return knownKeys;
            }
            return function(returnFiber, currentFirstChild, newChild, expirationTime) {
                var isUnkeyedTopLevelFragment = "object" == typeof newChild && null !== newChild && newChild.type === REACT_FRAGMENT_TYPE && null === newChild.key;
                isUnkeyedTopLevelFragment && (newChild = newChild.props.children);
                var isObject = "object" == typeof newChild && null !== newChild;
                if (isObject) switch (newChild.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                    return placeSingleChild(function(returnFiber, currentFirstChild, element, expirationTime) {
                        for (var key = element.key, child = currentFirstChild; null !== child; ) {
                            if (child.key === key) {
                                if (10 === child.tag ? element.type === REACT_FRAGMENT_TYPE : child.type === element.type) {
                                    deleteRemainingChildren(returnFiber, child.sibling);
                                    var existing = useFiber(child, element.type === REACT_FRAGMENT_TYPE ? element.props.children : element.props, expirationTime);
                                    return existing.ref = coerceRef(returnFiber, child, element), existing.return = returnFiber, 
                                    existing._debugSource = element._source, existing._debugOwner = element._owner, 
                                    existing;
                                }
                                deleteRemainingChildren(returnFiber, child);
                                break;
                            }
                            deleteChild(returnFiber, child), child = child.sibling;
                        }
                        if (element.type === REACT_FRAGMENT_TYPE) {
                            var created = createFiberFromFragment(element.props.children, returnFiber.mode, expirationTime, element.key);
                            return created.return = returnFiber, created;
                        }
                        var _created4 = createFiberFromElement(element, returnFiber.mode, expirationTime);
                        return _created4.ref = coerceRef(returnFiber, currentFirstChild, element), _created4.return = returnFiber, 
                        _created4;
                    }(returnFiber, currentFirstChild, newChild, expirationTime));

                  case REACT_PORTAL_TYPE:
                    return placeSingleChild(function(returnFiber, currentFirstChild, portal, expirationTime) {
                        for (var key = portal.key, child = currentFirstChild; null !== child; ) {
                            if (child.key === key) {
                                if (4 === child.tag && child.stateNode.containerInfo === portal.containerInfo && child.stateNode.implementation === portal.implementation) {
                                    deleteRemainingChildren(returnFiber, child.sibling);
                                    var existing = useFiber(child, portal.children || [], expirationTime);
                                    return existing.return = returnFiber, existing;
                                }
                                deleteRemainingChildren(returnFiber, child);
                                break;
                            }
                            deleteChild(returnFiber, child), child = child.sibling;
                        }
                        var created = createFiberFromPortal(portal, returnFiber.mode, expirationTime);
                        return created.return = returnFiber, created;
                    }(returnFiber, currentFirstChild, newChild, expirationTime));
                }
                if ("string" == typeof newChild || "number" == typeof newChild) return placeSingleChild(function(returnFiber, currentFirstChild, textContent, expirationTime) {
                    if (null !== currentFirstChild && 6 === currentFirstChild.tag) {
                        deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
                        var existing = useFiber(currentFirstChild, textContent, expirationTime);
                        return existing.return = returnFiber, existing;
                    }
                    deleteRemainingChildren(returnFiber, currentFirstChild);
                    var created = createFiberFromText(textContent, returnFiber.mode, expirationTime);
                    return created.return = returnFiber, created;
                }(returnFiber, currentFirstChild, "" + newChild, expirationTime));
                if (isArray$1(newChild)) return function(returnFiber, currentFirstChild, newChildren, expirationTime) {
                    for (var knownKeys = null, i = 0; i < newChildren.length; i++) knownKeys = warnOnInvalidKey(newChildren[i], knownKeys);
                    for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, lastPlacedIndex = 0, newIdx = 0, nextOldFiber = null; null !== oldFiber && newIdx < newChildren.length; newIdx++) {
                        oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
                        var newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx], expirationTime);
                        if (null === newFiber) {
                            null === oldFiber && (oldFiber = nextOldFiber);
                            break;
                        }
                        shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber), 
                        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx), null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber, 
                        previousNewFiber = newFiber, oldFiber = nextOldFiber;
                    }
                    if (newIdx === newChildren.length) return deleteRemainingChildren(returnFiber, oldFiber), 
                    resultingFirstChild;
                    if (null === oldFiber) {
                        for (;newIdx < newChildren.length; newIdx++) {
                            var _newFiber = createChild(returnFiber, newChildren[newIdx], expirationTime);
                            _newFiber && (lastPlacedIndex = placeChild(_newFiber, lastPlacedIndex, newIdx), 
                            null === previousNewFiber ? resultingFirstChild = _newFiber : previousNewFiber.sibling = _newFiber, 
                            previousNewFiber = _newFiber);
                        }
                        return resultingFirstChild;
                    }
                    for (var existingChildren = mapRemainingChildren(0, oldFiber); newIdx < newChildren.length; newIdx++) {
                        var _newFiber2 = updateFromMap(existingChildren, returnFiber, newIdx, newChildren[newIdx], expirationTime);
                        _newFiber2 && (shouldTrackSideEffects && null !== _newFiber2.alternate && existingChildren.delete(null === _newFiber2.key ? newIdx : _newFiber2.key), 
                        lastPlacedIndex = placeChild(_newFiber2, lastPlacedIndex, newIdx), null === previousNewFiber ? resultingFirstChild = _newFiber2 : previousNewFiber.sibling = _newFiber2, 
                        previousNewFiber = _newFiber2);
                    }
                    return shouldTrackSideEffects && existingChildren.forEach((function(child) {
                        return deleteChild(returnFiber, child);
                    })), resultingFirstChild;
                }(returnFiber, currentFirstChild, newChild, expirationTime);
                if (getIteratorFn(newChild)) return function(returnFiber, currentFirstChild, newChildrenIterable, expirationTime) {
                    var iteratorFn = getIteratorFn(newChildrenIterable);
                    "function" != typeof iteratorFn && invariant(!1, "An object is not an iterable. This error is likely caused by a bug in React. Please file an issue."), 
                    newChildrenIterable.entries === iteratorFn && (didWarnAboutMaps || warning(!1, "Using Maps as children is unsupported and will likely yield unexpected results. Convert it to a sequence/iterable of keyed ReactElements instead.%s", getCurrentFiberStackAddendum$7()), 
                    didWarnAboutMaps = !0);
                    var _newChildren = iteratorFn.call(newChildrenIterable);
                    if (_newChildren) for (var knownKeys = null, _step = _newChildren.next(); !_step.done; _step = _newChildren.next()) knownKeys = warnOnInvalidKey(_step.value, knownKeys);
                    var newChildren = iteratorFn.call(newChildrenIterable);
                    null == newChildren && invariant(!1, "An iterable object provided no iterator.");
                    for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, lastPlacedIndex = 0, newIdx = 0, nextOldFiber = null, step = newChildren.next(); null !== oldFiber && !step.done; newIdx++, 
                    step = newChildren.next()) {
                        oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
                        var newFiber = updateSlot(returnFiber, oldFiber, step.value, expirationTime);
                        if (null === newFiber) {
                            oldFiber || (oldFiber = nextOldFiber);
                            break;
                        }
                        shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber), 
                        lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx), null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber, 
                        previousNewFiber = newFiber, oldFiber = nextOldFiber;
                    }
                    if (step.done) return deleteRemainingChildren(returnFiber, oldFiber), resultingFirstChild;
                    if (null === oldFiber) {
                        for (;!step.done; newIdx++, step = newChildren.next()) {
                            var _newFiber3 = createChild(returnFiber, step.value, expirationTime);
                            null !== _newFiber3 && (lastPlacedIndex = placeChild(_newFiber3, lastPlacedIndex, newIdx), 
                            null === previousNewFiber ? resultingFirstChild = _newFiber3 : previousNewFiber.sibling = _newFiber3, 
                            previousNewFiber = _newFiber3);
                        }
                        return resultingFirstChild;
                    }
                    for (var existingChildren = mapRemainingChildren(0, oldFiber); !step.done; newIdx++, 
                    step = newChildren.next()) {
                        var _newFiber4 = updateFromMap(existingChildren, returnFiber, newIdx, step.value, expirationTime);
                        null !== _newFiber4 && (shouldTrackSideEffects && null !== _newFiber4.alternate && existingChildren.delete(null === _newFiber4.key ? newIdx : _newFiber4.key), 
                        lastPlacedIndex = placeChild(_newFiber4, lastPlacedIndex, newIdx), null === previousNewFiber ? resultingFirstChild = _newFiber4 : previousNewFiber.sibling = _newFiber4, 
                        previousNewFiber = _newFiber4);
                    }
                    return shouldTrackSideEffects && existingChildren.forEach((function(child) {
                        return deleteChild(returnFiber, child);
                    })), resultingFirstChild;
                }(returnFiber, currentFirstChild, newChild, expirationTime);
                if (isObject && throwOnInvalidObjectType(returnFiber, newChild), "function" == typeof newChild && warnOnFunctionType(), 
                void 0 === newChild && !isUnkeyedTopLevelFragment) switch (returnFiber.tag) {
                  case 2:
                    if (returnFiber.stateNode.render._isMockFunction) break;

                  case 1:
                    var Component = returnFiber.type;
                    invariant(!1, "%s(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.", Component.displayName || Component.name || "Component");
                }
                return deleteRemainingChildren(returnFiber, currentFirstChild);
            };
        }
        var reconcileChildFibers = ChildReconciler(!0), mountChildFibers = ChildReconciler(!1);
        var hydrationParentFiber = null, nextHydratableInstance = null, isHydrating = !1;
        function deleteHydratableInstance(returnFiber, instance) {
            switch (returnFiber.tag) {
              case 3:
                !function(parentContainer, instance) {
                    1 === instance.nodeType ? warnForDeletedHydratableElement(parentContainer, instance) : warnForDeletedHydratableText(parentContainer, instance);
                }(returnFiber.stateNode.containerInfo, instance);
                break;

              case 5:
                !function(parentType, parentProps, parentInstance, instance) {
                    !0 !== parentProps.suppressHydrationWarning && (1 === instance.nodeType ? warnForDeletedHydratableElement(parentInstance, instance) : warnForDeletedHydratableText(parentInstance, instance));
                }(returnFiber.type, returnFiber.memoizedProps, returnFiber.stateNode, instance);
            }
            var fiber, childToDelete = ((fiber = createFiber(5, null, null, 0)).type = "DELETED", 
            fiber);
            childToDelete.stateNode = instance, childToDelete.return = returnFiber, childToDelete.effectTag = 8, 
            null !== returnFiber.lastEffect ? (returnFiber.lastEffect.nextEffect = childToDelete, 
            returnFiber.lastEffect = childToDelete) : returnFiber.firstEffect = returnFiber.lastEffect = childToDelete;
        }
        function insertNonHydratedInstance(returnFiber, fiber) {
            switch (fiber.effectTag |= 2, returnFiber.tag) {
              case 3:
                var parentContainer = returnFiber.stateNode.containerInfo;
                switch (fiber.tag) {
                  case 5:
                    !function(parentContainer, type, props) {
                        warnForInsertedHydratedElement(parentContainer, type, props);
                    }(parentContainer, fiber.type, fiber.pendingProps);
                    break;

                  case 6:
                    !function(parentContainer, text) {
                        warnForInsertedHydratedText(parentContainer, text);
                    }(parentContainer, fiber.pendingProps);
                }
                break;

              case 5:
                returnFiber.type;
                var parentProps = returnFiber.memoizedProps, parentInstance = returnFiber.stateNode;
                switch (fiber.tag) {
                  case 5:
                    !function(parentType, parentProps, parentInstance, type, props) {
                        !0 !== parentProps.suppressHydrationWarning && warnForInsertedHydratedElement(parentInstance, type, props);
                    }(0, parentProps, parentInstance, fiber.type, fiber.pendingProps);
                    break;

                  case 6:
                    !function(parentType, parentProps, parentInstance, text) {
                        !0 !== parentProps.suppressHydrationWarning && warnForInsertedHydratedText(parentInstance, text);
                    }(0, parentProps, parentInstance, fiber.pendingProps);
                }
                break;

              default:
                return;
            }
        }
        function tryHydrate(fiber, nextInstance) {
            switch (fiber.tag) {
              case 5:
                var type = fiber.type, instance = (fiber.pendingProps, function(instance, type, props) {
                    return 1 !== instance.nodeType || type.toLowerCase() !== instance.nodeName.toLowerCase() ? null : instance;
                }(nextInstance, type));
                return null !== instance && (fiber.stateNode = instance, !0);

              case 6:
                var textInstance = function(instance, text) {
                    return "" === text || 3 !== instance.nodeType ? null : instance;
                }(nextInstance, fiber.pendingProps);
                return null !== textInstance && (fiber.stateNode = textInstance, !0);

              default:
                return !1;
            }
        }
        function tryToClaimNextHydratableInstance(fiber) {
            if (isHydrating) {
                var nextInstance = nextHydratableInstance;
                if (!nextInstance) return insertNonHydratedInstance(hydrationParentFiber, fiber), 
                isHydrating = !1, void (hydrationParentFiber = fiber);
                var firstAttemptedInstance = nextInstance;
                if (!tryHydrate(fiber, nextInstance)) {
                    if (!(nextInstance = getNextHydratableSibling(firstAttemptedInstance)) || !tryHydrate(fiber, nextInstance)) return insertNonHydratedInstance(hydrationParentFiber, fiber), 
                    isHydrating = !1, void (hydrationParentFiber = fiber);
                    deleteHydratableInstance(hydrationParentFiber, firstAttemptedInstance);
                }
                hydrationParentFiber = fiber, nextHydratableInstance = getFirstHydratableChild(nextInstance);
            }
        }
        function prepareToHydrateHostInstance(fiber, rootContainerInstance, hostContext) {
            var updatePayload = function(instance, type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
                var parentNamespace;
                return precacheFiberNode$1(internalInstanceHandle, instance), updateFiberProps$1(instance, props), 
                parentNamespace = hostContext.namespace, diffHydratedProperties(instance, type, props, parentNamespace, rootContainerInstance);
            }(fiber.stateNode, fiber.type, fiber.memoizedProps, rootContainerInstance, hostContext, fiber);
            return fiber.updateQueue = updatePayload, null !== updatePayload;
        }
        function prepareToHydrateHostTextInstance(fiber) {
            var textInstance = fiber.stateNode, textContent = fiber.memoizedProps, shouldUpdate = function(textInstance, text, internalInstanceHandle) {
                return precacheFiberNode$1(internalInstanceHandle, textInstance), diffHydratedText(textInstance, text);
            }(textInstance, textContent, fiber);
            if (shouldUpdate) {
                var returnFiber = hydrationParentFiber;
                if (null !== returnFiber) switch (returnFiber.tag) {
                  case 3:
                    returnFiber.stateNode.containerInfo;
                    !function(parentContainer, textInstance, text) {
                        warnForUnmatchedText(textInstance, text);
                    }(0, textInstance, textContent);
                    break;

                  case 5:
                    returnFiber.type;
                    var parentProps = returnFiber.memoizedProps;
                    returnFiber.stateNode;
                    !function(parentType, parentProps, parentInstance, textInstance, text) {
                        !0 !== parentProps.suppressHydrationWarning && warnForUnmatchedText(textInstance, text);
                    }(0, parentProps, 0, textInstance, textContent);
                }
            }
            return shouldUpdate;
        }
        function popToNextHostParent(fiber) {
            for (var parent = fiber.return; null !== parent && 5 !== parent.tag && 3 !== parent.tag; ) parent = parent.return;
            hydrationParentFiber = parent;
        }
        function popHydrationState(fiber) {
            if (fiber !== hydrationParentFiber) return !1;
            if (!isHydrating) return popToNextHostParent(fiber), isHydrating = !0, !1;
            var type = fiber.type;
            if (5 !== fiber.tag || "head" !== type && "body" !== type && !shouldSetTextContent(type, fiber.memoizedProps)) for (var nextInstance = nextHydratableInstance; nextInstance; ) deleteHydratableInstance(fiber, nextInstance), 
            nextInstance = getNextHydratableSibling(nextInstance);
            return popToNextHostParent(fiber), nextHydratableInstance = hydrationParentFiber ? getNextHydratableSibling(fiber.stateNode) : null, 
            !0;
        }
        function resetHydrationState() {
            hydrationParentFiber = null, nextHydratableInstance = null, isHydrating = !1;
        }
        var getCurrentFiberStackAddendum$6 = ReactDebugCurrentFiber.getCurrentFiberStackAddendum, didWarnAboutBadClass = void 0, didWarnAboutGetDerivedStateOnFunctionalComponent = void 0, didWarnAboutStatelessRefs = void 0;
        function reconcileChildren(current, workInProgress, nextChildren) {
            reconcileChildrenAtExpirationTime(current, workInProgress, nextChildren, workInProgress.expirationTime);
        }
        function reconcileChildrenAtExpirationTime(current, workInProgress, nextChildren, renderExpirationTime) {
            workInProgress.child = null === current ? mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime) : reconcileChildFibers(workInProgress, current.child, nextChildren, renderExpirationTime);
        }
        function markRef(current, workInProgress) {
            var ref = workInProgress.ref;
            (null === current && null !== ref || null !== current && current.ref !== ref) && (workInProgress.effectTag |= 128);
        }
        function updateClassComponent(current, workInProgress, renderExpirationTime) {
            var hasContext = pushContextProvider(workInProgress), shouldUpdate = void 0;
            return null === current ? null === workInProgress.stateNode ? (!function(workInProgress, props, renderExpirationTime) {
                var fiber, ctor = workInProgress.type, unmaskedContext = getUnmaskedContext(workInProgress), needsContext = 2 === (fiber = workInProgress).tag && null != fiber.type.contextTypes, context = needsContext ? getMaskedContext(workInProgress, unmaskedContext) : emptyObject;
                2 & workInProgress.mode && new ctor(props, context);
                var instance = new ctor(props, context), state = workInProgress.memoizedState = null !== instance.state && void 0 !== instance.state ? instance.state : null;
                if (adoptClassInstance(workInProgress, instance), "function" == typeof ctor.getDerivedStateFromProps && null === state) {
                    var componentName = getComponentName(workInProgress) || "Component";
                    didWarnAboutUninitializedState.has(componentName) || (didWarnAboutUninitializedState.add(componentName), 
                    warning(!1, "%s: Did not properly initialize state during construction. Expected state to be an object, but it was %s.", componentName, null === instance.state ? "null" : "undefined"));
                }
                if ("function" == typeof ctor.getDerivedStateFromProps || "function" == typeof instance.getSnapshotBeforeUpdate) {
                    var foundWillMountName = null, foundWillReceivePropsName = null, foundWillUpdateName = null;
                    if ("function" == typeof instance.componentWillMount && !0 !== instance.componentWillMount.__suppressDeprecationWarning ? foundWillMountName = "componentWillMount" : "function" == typeof instance.UNSAFE_componentWillMount && (foundWillMountName = "UNSAFE_componentWillMount"), 
                    "function" == typeof instance.componentWillReceiveProps && !0 !== instance.componentWillReceiveProps.__suppressDeprecationWarning ? foundWillReceivePropsName = "componentWillReceiveProps" : "function" == typeof instance.UNSAFE_componentWillReceiveProps && (foundWillReceivePropsName = "UNSAFE_componentWillReceiveProps"), 
                    "function" == typeof instance.componentWillUpdate && !0 !== instance.componentWillUpdate.__suppressDeprecationWarning ? foundWillUpdateName = "componentWillUpdate" : "function" == typeof instance.UNSAFE_componentWillUpdate && (foundWillUpdateName = "UNSAFE_componentWillUpdate"), 
                    null !== foundWillMountName || null !== foundWillReceivePropsName || null !== foundWillUpdateName) {
                        var _componentName = getComponentName(workInProgress) || "Component", newApiName = "function" == typeof ctor.getDerivedStateFromProps ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
                        didWarnAboutLegacyLifecyclesAndDerivedState.has(_componentName) || (didWarnAboutLegacyLifecyclesAndDerivedState.add(_componentName), 
                        warning(!1, "Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks", _componentName, newApiName, null !== foundWillMountName ? "\n  " + foundWillMountName : "", null !== foundWillReceivePropsName ? "\n  " + foundWillReceivePropsName : "", null !== foundWillUpdateName ? "\n  " + foundWillUpdateName : ""));
                    }
                }
                needsContext && cacheContext(workInProgress, unmaskedContext, context);
            }(workInProgress, workInProgress.pendingProps), mountClassInstance(workInProgress, renderExpirationTime), 
            shouldUpdate = !0) : shouldUpdate = function(workInProgress, renderExpirationTime) {
                var ctor = workInProgress.type, instance = workInProgress.stateNode, oldProps = workInProgress.memoizedProps, newProps = workInProgress.pendingProps;
                instance.props = oldProps;
                var oldContext = instance.context, newContext = getMaskedContext(workInProgress, getUnmaskedContext(workInProgress)), getDerivedStateFromProps = ctor.getDerivedStateFromProps, hasNewLifecycles = "function" == typeof getDerivedStateFromProps || "function" == typeof instance.getSnapshotBeforeUpdate;
                hasNewLifecycles || "function" != typeof instance.UNSAFE_componentWillReceiveProps && "function" != typeof instance.componentWillReceiveProps || oldProps === newProps && oldContext === newContext || callComponentWillReceiveProps(workInProgress, instance, newProps, newContext), 
                resetHasForceUpdateBeforeProcessing();
                var oldState = workInProgress.memoizedState, newState = instance.state = oldState, updateQueue = workInProgress.updateQueue;
                if (null !== updateQueue && (processUpdateQueue(workInProgress, updateQueue, newProps, instance, renderExpirationTime), 
                newState = workInProgress.memoizedState), oldProps === newProps && oldState === newState && !hasContextChanged() && !checkHasForceUpdateAfterProcessing()) return "function" == typeof instance.componentDidMount && (workInProgress.effectTag |= 4), 
                !1;
                "function" == typeof getDerivedStateFromProps && (applyDerivedStateFromProps(workInProgress, getDerivedStateFromProps, newProps), 
                newState = workInProgress.memoizedState);
                var shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext);
                return shouldUpdate ? (hasNewLifecycles || "function" != typeof instance.UNSAFE_componentWillMount && "function" != typeof instance.componentWillMount || (startPhaseTimer(workInProgress, "componentWillMount"), 
                "function" == typeof instance.componentWillMount && instance.componentWillMount(), 
                "function" == typeof instance.UNSAFE_componentWillMount && instance.UNSAFE_componentWillMount(), 
                stopPhaseTimer()), "function" == typeof instance.componentDidMount && (workInProgress.effectTag |= 4)) : ("function" == typeof instance.componentDidMount && (workInProgress.effectTag |= 4), 
                workInProgress.memoizedProps = newProps, workInProgress.memoizedState = newState), 
                instance.props = newProps, instance.state = newState, instance.context = newContext, 
                shouldUpdate;
            }(workInProgress, renderExpirationTime) : shouldUpdate = function(current, workInProgress, renderExpirationTime) {
                var ctor = workInProgress.type, instance = workInProgress.stateNode, oldProps = workInProgress.memoizedProps, newProps = workInProgress.pendingProps;
                instance.props = oldProps;
                var oldContext = instance.context, newContext = getMaskedContext(workInProgress, getUnmaskedContext(workInProgress)), getDerivedStateFromProps = ctor.getDerivedStateFromProps, hasNewLifecycles = "function" == typeof getDerivedStateFromProps || "function" == typeof instance.getSnapshotBeforeUpdate;
                hasNewLifecycles || "function" != typeof instance.UNSAFE_componentWillReceiveProps && "function" != typeof instance.componentWillReceiveProps || oldProps === newProps && oldContext === newContext || callComponentWillReceiveProps(workInProgress, instance, newProps, newContext), 
                resetHasForceUpdateBeforeProcessing();
                var oldState = workInProgress.memoizedState, newState = instance.state = oldState, updateQueue = workInProgress.updateQueue;
                if (null !== updateQueue && (processUpdateQueue(workInProgress, updateQueue, newProps, instance, renderExpirationTime), 
                newState = workInProgress.memoizedState), oldProps === newProps && oldState === newState && !hasContextChanged() && !checkHasForceUpdateAfterProcessing()) return "function" == typeof instance.componentDidUpdate && (oldProps === current.memoizedProps && oldState === current.memoizedState || (workInProgress.effectTag |= 4)), 
                "function" == typeof instance.getSnapshotBeforeUpdate && (oldProps === current.memoizedProps && oldState === current.memoizedState || (workInProgress.effectTag |= 256)), 
                !1;
                "function" == typeof getDerivedStateFromProps && (applyDerivedStateFromProps(workInProgress, getDerivedStateFromProps, newProps), 
                newState = workInProgress.memoizedState);
                var shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext);
                return shouldUpdate ? (hasNewLifecycles || "function" != typeof instance.UNSAFE_componentWillUpdate && "function" != typeof instance.componentWillUpdate || (startPhaseTimer(workInProgress, "componentWillUpdate"), 
                "function" == typeof instance.componentWillUpdate && instance.componentWillUpdate(newProps, newState, newContext), 
                "function" == typeof instance.UNSAFE_componentWillUpdate && instance.UNSAFE_componentWillUpdate(newProps, newState, newContext), 
                stopPhaseTimer()), "function" == typeof instance.componentDidUpdate && (workInProgress.effectTag |= 4), 
                "function" == typeof instance.getSnapshotBeforeUpdate && (workInProgress.effectTag |= 256)) : ("function" == typeof instance.componentDidUpdate && (oldProps === current.memoizedProps && oldState === current.memoizedState || (workInProgress.effectTag |= 4)), 
                "function" == typeof instance.getSnapshotBeforeUpdate && (oldProps === current.memoizedProps && oldState === current.memoizedState || (workInProgress.effectTag |= 256)), 
                workInProgress.memoizedProps = newProps, workInProgress.memoizedState = newState), 
                instance.props = newProps, instance.state = newState, instance.context = newContext, 
                shouldUpdate;
            }(current, workInProgress, renderExpirationTime), finishClassComponent(current, workInProgress, shouldUpdate, hasContext, renderExpirationTime);
        }
        function finishClassComponent(current, workInProgress, shouldUpdate, hasContext, renderExpirationTime) {
            markRef(current, workInProgress);
            var didCaptureError = 0 != (64 & workInProgress.effectTag);
            if (!shouldUpdate && !didCaptureError) return hasContext && invalidateContextProvider(workInProgress, !1), 
            bailoutOnAlreadyFinishedWork(current, workInProgress);
            workInProgress.type;
            var instance = workInProgress.stateNode;
            ReactCurrentOwner.current = workInProgress;
            var nextChildren = void 0;
            return didCaptureError ? (nextChildren = null, stopBaseRenderTimerIfRunning()) : (ReactDebugCurrentFiber.setCurrentPhase("render"), 
            nextChildren = instance.render(), 2 & workInProgress.mode && instance.render(), 
            ReactDebugCurrentFiber.setCurrentPhase(null)), workInProgress.effectTag |= 1, didCaptureError && (reconcileChildrenAtExpirationTime(current, workInProgress, null, renderExpirationTime), 
            workInProgress.child = null), reconcileChildrenAtExpirationTime(current, workInProgress, nextChildren, renderExpirationTime), 
            function(workInProgress, nextState) {
                workInProgress.memoizedState = nextState;
            }(workInProgress, instance.state), memoizeProps(workInProgress, instance.props), 
            hasContext && invalidateContextProvider(workInProgress, !0), workInProgress.child;
        }
        function pushHostRootContext(workInProgress) {
            var root = workInProgress.stateNode;
            root.pendingContext ? pushTopLevelContextObject(workInProgress, root.pendingContext, root.pendingContext !== root.context) : root.context && pushTopLevelContextObject(workInProgress, root.context, !1), 
            pushHostContainer(workInProgress, root.containerInfo);
        }
        function updateHostRoot(current, workInProgress, renderExpirationTime) {
            pushHostRootContext(workInProgress);
            var fiber, parentInstance, updateQueue = workInProgress.updateQueue;
            if (null !== updateQueue) {
                var nextProps = workInProgress.pendingProps, prevState = workInProgress.memoizedState, prevChildren = null !== prevState ? prevState.element : null;
                processUpdateQueue(workInProgress, updateQueue, nextProps, null, renderExpirationTime);
                var nextChildren = workInProgress.memoizedState.element;
                if (nextChildren === prevChildren) return resetHydrationState(), bailoutOnAlreadyFinishedWork(current, workInProgress);
                var root = workInProgress.stateNode;
                return (null === current || null === current.child) && root.hydrate && (parentInstance = (fiber = workInProgress).stateNode.containerInfo, 
                nextHydratableInstance = getFirstHydratableChild(parentInstance), hydrationParentFiber = fiber, 
                isHydrating = !0, 1) ? (workInProgress.effectTag |= 2, workInProgress.child = mountChildFibers(workInProgress, null, nextChildren, renderExpirationTime)) : (resetHydrationState(), 
                reconcileChildren(current, workInProgress, nextChildren)), workInProgress.child;
            }
            return resetHydrationState(), bailoutOnAlreadyFinishedWork(current, workInProgress);
        }
        function propagateContextChange(workInProgress, context, changedBits, renderExpirationTime) {
            var fiber = workInProgress.child;
            for (null !== fiber && (fiber.return = workInProgress); null !== fiber; ) {
                var nextFiber = void 0;
                switch (fiber.tag) {
                  case 12:
                    var observedBits = 0 | fiber.stateNode;
                    if (fiber.type === context && 0 != (observedBits & changedBits)) {
                        for (var node = fiber; null !== node; ) {
                            var alternate = node.alternate;
                            if (0 === node.expirationTime || node.expirationTime > renderExpirationTime) node.expirationTime = renderExpirationTime, 
                            null !== alternate && (0 === alternate.expirationTime || alternate.expirationTime > renderExpirationTime) && (alternate.expirationTime = renderExpirationTime); else {
                                if (null === alternate || !(0 === alternate.expirationTime || alternate.expirationTime > renderExpirationTime)) break;
                                alternate.expirationTime = renderExpirationTime;
                            }
                            node = node.return;
                        }
                        nextFiber = null;
                    } else nextFiber = fiber.child;
                    break;

                  case 13:
                    nextFiber = fiber.type === workInProgress.type ? null : fiber.child;
                    break;

                  default:
                    nextFiber = fiber.child;
                }
                if (null !== nextFiber) nextFiber.return = fiber; else for (nextFiber = fiber; null !== nextFiber; ) {
                    if (nextFiber === workInProgress) {
                        nextFiber = null;
                        break;
                    }
                    var sibling = nextFiber.sibling;
                    if (null !== sibling) {
                        sibling.return = nextFiber.return, nextFiber = sibling;
                        break;
                    }
                    nextFiber = nextFiber.return;
                }
                fiber = nextFiber;
            }
        }
        function bailoutOnAlreadyFinishedWork(current, workInProgress) {
            return cancelWorkTimer(workInProgress), stopBaseRenderTimerIfRunning(), function(current, workInProgress) {
                if (null !== current && workInProgress.child !== current.child && invariant(!1, "Resuming work not yet implemented."), 
                null !== workInProgress.child) {
                    var currentChild = workInProgress.child, newChild = createWorkInProgress(currentChild, currentChild.pendingProps, currentChild.expirationTime);
                    for (workInProgress.child = newChild, newChild.return = workInProgress; null !== currentChild.sibling; ) currentChild = currentChild.sibling, 
                    (newChild = newChild.sibling = createWorkInProgress(currentChild, currentChild.pendingProps, currentChild.expirationTime)).return = workInProgress;
                    newChild.sibling = null;
                }
            }(current, workInProgress), workInProgress.child;
        }
        function memoizeProps(workInProgress, nextProps) {
            workInProgress.memoizedProps = nextProps;
        }
        function beginWork(current, workInProgress, renderExpirationTime) {
            var fiber;
            if (4 & workInProgress.mode && (fiber = workInProgress, fiberStack$1.push(fiber), 
            fiber.actualDuration = now() - fiber.actualDuration - totalElapsedPauseTime, fiber.actualStartTime = now()), 
            0 === workInProgress.expirationTime || workInProgress.expirationTime > renderExpirationTime) return function(current, workInProgress) {
                switch (cancelWorkTimer(workInProgress), stopBaseRenderTimerIfRunning(), workInProgress.tag) {
                  case 3:
                    pushHostRootContext(workInProgress);
                    break;

                  case 2:
                    pushContextProvider(workInProgress);
                    break;

                  case 4:
                    pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
                    break;

                  case 13:
                    pushProvider(workInProgress);
                }
                return null;
            }(0, workInProgress);
            switch (workInProgress.tag) {
              case 0:
                return function(current, workInProgress, renderExpirationTime) {
                    null !== current && invariant(!1, "An indeterminate component should never have mounted. This error is likely caused by a bug in React. Please file an issue.");
                    var value, fn = workInProgress.type, props = workInProgress.pendingProps, context = getMaskedContext(workInProgress, getUnmaskedContext(workInProgress));
                    if (fn.prototype && "function" == typeof fn.prototype.render) {
                        var componentName = getComponentName(workInProgress) || "Unknown";
                        didWarnAboutBadClass[componentName] || (warning(!1, "The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", componentName, componentName), 
                        didWarnAboutBadClass[componentName] = !0);
                    }
                    if (2 & workInProgress.mode && ReactStrictModeWarnings.recordLegacyContextWarning(workInProgress, null), 
                    ReactCurrentOwner.current = workInProgress, value = fn(props, context), workInProgress.effectTag |= 1, 
                    "object" == typeof value && null !== value && "function" == typeof value.render && void 0 === value.$$typeof) {
                        var Component = workInProgress.type;
                        workInProgress.tag = 2, workInProgress.memoizedState = null !== value.state && void 0 !== value.state ? value.state : null;
                        var getDerivedStateFromProps = Component.getDerivedStateFromProps;
                        "function" == typeof getDerivedStateFromProps && applyDerivedStateFromProps(workInProgress, getDerivedStateFromProps, props);
                        var hasContext = pushContextProvider(workInProgress);
                        return adoptClassInstance(workInProgress, value), mountClassInstance(workInProgress, renderExpirationTime), 
                        finishClassComponent(current, workInProgress, !0, hasContext, renderExpirationTime);
                    }
                    workInProgress.tag = 1;
                    var _Component = workInProgress.type;
                    if (_Component && _Component.childContextTypes && warning(!1, "%s(...): childContextTypes cannot be defined on a functional component.", _Component.displayName || _Component.name || "Component"), 
                    null !== workInProgress.ref) {
                        var info = "", ownerName = ReactDebugCurrentFiber.getCurrentFiberOwnerName();
                        ownerName && (info += "\n\nCheck the render method of `" + ownerName + "`.");
                        var warningKey = ownerName || workInProgress._debugID || "", debugSource = workInProgress._debugSource;
                        debugSource && (warningKey = debugSource.fileName + ":" + debugSource.lineNumber), 
                        didWarnAboutStatelessRefs[warningKey] || (didWarnAboutStatelessRefs[warningKey] = !0, 
                        warning(!1, "Stateless function components cannot be given refs. Attempts to access this ref will fail.%s%s", info, ReactDebugCurrentFiber.getCurrentFiberStackAddendum()));
                    }
                    if ("function" == typeof fn.getDerivedStateFromProps) {
                        var _componentName = getComponentName(workInProgress) || "Unknown";
                        didWarnAboutGetDerivedStateOnFunctionalComponent[_componentName] || (warning(!1, "%s: Stateless functional components do not support getDerivedStateFromProps.", _componentName), 
                        didWarnAboutGetDerivedStateOnFunctionalComponent[_componentName] = !0);
                    }
                    return reconcileChildren(current, workInProgress, value), memoizeProps(workInProgress, props), 
                    workInProgress.child;
                }(current, workInProgress, renderExpirationTime);

              case 1:
                return function(current, workInProgress) {
                    var fn = workInProgress.type, nextProps = workInProgress.pendingProps;
                    if (hasContextChanged()) ; else if (workInProgress.memoizedProps === nextProps) return bailoutOnAlreadyFinishedWork(current, workInProgress);
                    var nextChildren, context = getMaskedContext(workInProgress, getUnmaskedContext(workInProgress));
                    return ReactCurrentOwner.current = workInProgress, ReactDebugCurrentFiber.setCurrentPhase("render"), 
                    nextChildren = fn(nextProps, context), ReactDebugCurrentFiber.setCurrentPhase(null), 
                    workInProgress.effectTag |= 1, reconcileChildren(current, workInProgress, nextChildren), 
                    memoizeProps(workInProgress, nextProps), workInProgress.child;
                }(current, workInProgress);

              case 2:
                return updateClassComponent(current, workInProgress, renderExpirationTime);

              case 3:
                return updateHostRoot(current, workInProgress, renderExpirationTime);

              case 5:
                return function(current, workInProgress, renderExpirationTime) {
                    pushHostContext(workInProgress), null === current && tryToClaimNextHydratableInstance(workInProgress);
                    var type = workInProgress.type, memoizedProps = workInProgress.memoizedProps, nextProps = workInProgress.pendingProps, prevProps = null !== current ? current.memoizedProps : null;
                    if (hasContextChanged()) ; else if (memoizedProps === nextProps) {
                        var isHidden = 1 & workInProgress.mode && shouldDeprioritizeSubtree(0, nextProps);
                        if (isHidden && (workInProgress.expirationTime = Never), !isHidden || renderExpirationTime !== Never) return bailoutOnAlreadyFinishedWork(current, workInProgress);
                    }
                    var nextChildren = nextProps.children;
                    return shouldSetTextContent(type, nextProps) ? nextChildren = null : prevProps && shouldSetTextContent(type, prevProps) && (workInProgress.effectTag |= 16), 
                    markRef(current, workInProgress), renderExpirationTime !== Never && 1 & workInProgress.mode && shouldDeprioritizeSubtree(0, nextProps) ? (workInProgress.expirationTime = Never, 
                    workInProgress.memoizedProps = nextProps, null) : (reconcileChildren(current, workInProgress, nextChildren), 
                    memoizeProps(workInProgress, nextProps), workInProgress.child);
                }(current, workInProgress, renderExpirationTime);

              case 6:
                return function(current, workInProgress) {
                    return null === current && tryToClaimNextHydratableInstance(workInProgress), memoizeProps(workInProgress, workInProgress.pendingProps), 
                    null;
                }(current, workInProgress);

              case 16:
                return null;

              case 4:
                return function(current, workInProgress, renderExpirationTime) {
                    pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
                    var nextChildren = workInProgress.pendingProps;
                    if (hasContextChanged()) ; else if (workInProgress.memoizedProps === nextChildren) return bailoutOnAlreadyFinishedWork(current, workInProgress);
                    return null === current ? (workInProgress.child = reconcileChildFibers(workInProgress, null, nextChildren, renderExpirationTime), 
                    memoizeProps(workInProgress, nextChildren)) : (reconcileChildren(current, workInProgress, nextChildren), 
                    memoizeProps(workInProgress, nextChildren)), workInProgress.child;
                }(current, workInProgress, renderExpirationTime);

              case 14:
                return function(current, workInProgress) {
                    var nextChildren, render = workInProgress.type.render, nextProps = workInProgress.pendingProps, ref = workInProgress.ref;
                    if (hasContextChanged()) ; else if (workInProgress.memoizedProps === nextProps && ref === (null !== current ? current.ref : null)) return bailoutOnAlreadyFinishedWork(current, workInProgress);
                    return ReactCurrentOwner.current = workInProgress, ReactDebugCurrentFiber.setCurrentPhase("render"), 
                    nextChildren = render(nextProps, ref), ReactDebugCurrentFiber.setCurrentPhase(null), 
                    reconcileChildren(current, workInProgress, nextChildren), memoizeProps(workInProgress, nextProps), 
                    workInProgress.child;
                }(current, workInProgress);

              case 10:
                return function(current, workInProgress) {
                    var nextChildren = workInProgress.pendingProps;
                    if (hasContextChanged()) ; else if (workInProgress.memoizedProps === nextChildren) return bailoutOnAlreadyFinishedWork(current, workInProgress);
                    return reconcileChildren(current, workInProgress, nextChildren), memoizeProps(workInProgress, nextChildren), 
                    workInProgress.child;
                }(current, workInProgress);

              case 11:
                return function(current, workInProgress) {
                    var nextChildren = workInProgress.pendingProps.children;
                    if (hasContextChanged()) ; else if (null === nextChildren || workInProgress.memoizedProps === nextChildren) return bailoutOnAlreadyFinishedWork(current, workInProgress);
                    return reconcileChildren(current, workInProgress, nextChildren), memoizeProps(workInProgress, nextChildren), 
                    workInProgress.child;
                }(current, workInProgress);

              case 15:
                return function(current, workInProgress) {
                    var nextProps = workInProgress.pendingProps;
                    return workInProgress.effectTag |= 4, workInProgress.memoizedProps === nextProps ? bailoutOnAlreadyFinishedWork(current, workInProgress) : (reconcileChildren(current, workInProgress, nextProps.children), 
                    memoizeProps(workInProgress, nextProps), workInProgress.child);
                }(current, workInProgress);

              case 13:
                return function(current, workInProgress, renderExpirationTime) {
                    var context = workInProgress.type._context, newProps = workInProgress.pendingProps, oldProps = workInProgress.memoizedProps, canBailOnProps = !0;
                    if (hasContextChanged()) canBailOnProps = !1; else if (oldProps === newProps) return workInProgress.stateNode = 0, 
                    pushProvider(workInProgress), bailoutOnAlreadyFinishedWork(current, workInProgress);
                    var newValue = newProps.value;
                    workInProgress.memoizedProps = newProps;
                    var providerPropTypes = workInProgress.type.propTypes;
                    providerPropTypes && checkPropTypes(providerPropTypes, newProps, "prop", "Context.Provider", getCurrentFiberStackAddendum$6);
                    var changedBits = void 0;
                    if (null === oldProps) changedBits = 1073741823; else if (oldProps.value === newProps.value) {
                        if (oldProps.children === newProps.children && canBailOnProps) return workInProgress.stateNode = 0, 
                        pushProvider(workInProgress), bailoutOnAlreadyFinishedWork(current, workInProgress);
                        changedBits = 0;
                    } else {
                        var oldValue = oldProps.value;
                        if (oldValue === newValue && (0 !== oldValue || 1 / oldValue == 1 / newValue) || oldValue != oldValue && newValue != newValue) {
                            if (oldProps.children === newProps.children && canBailOnProps) return workInProgress.stateNode = 0, 
                            pushProvider(workInProgress), bailoutOnAlreadyFinishedWork(current, workInProgress);
                            changedBits = 0;
                        } else if ((1073741823 & (changedBits = "function" == typeof context._calculateChangedBits ? context._calculateChangedBits(oldValue, newValue) : 1073741823)) !== changedBits && warning(!1, "calculateChangedBits: Expected the return value to be a 31-bit integer. Instead received: %s", changedBits), 
                        0 == (changedBits |= 0)) {
                            if (oldProps.children === newProps.children && canBailOnProps) return workInProgress.stateNode = 0, 
                            pushProvider(workInProgress), bailoutOnAlreadyFinishedWork(current, workInProgress);
                        } else propagateContextChange(workInProgress, context, changedBits, renderExpirationTime);
                    }
                    return workInProgress.stateNode = changedBits, pushProvider(workInProgress), reconcileChildren(current, workInProgress, newProps.children), 
                    workInProgress.child;
                }(current, workInProgress, renderExpirationTime);

              case 12:
                return function(current, workInProgress, renderExpirationTime) {
                    var context = workInProgress.type, newProps = workInProgress.pendingProps, oldProps = workInProgress.memoizedProps, newValue = function(context) {
                        return context._currentValue;
                    }(context), changedBits = function(context) {
                        return context._changedBits;
                    }(context);
                    if (hasContextChanged()) ; else if (0 === changedBits && oldProps === newProps) return bailoutOnAlreadyFinishedWork(current, workInProgress);
                    workInProgress.memoizedProps = newProps;
                    var observedBits = newProps.unstable_observedBits;
                    if (null == observedBits && (observedBits = 1073741823), workInProgress.stateNode = observedBits, 
                    0 != (changedBits & observedBits)) propagateContextChange(workInProgress, context, changedBits, renderExpirationTime); else if (oldProps === newProps) return bailoutOnAlreadyFinishedWork(current, workInProgress);
                    var newChildren, render = newProps.children;
                    return "function" != typeof render && warning(!1, "A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), 
                    ReactCurrentOwner.current = workInProgress, ReactDebugCurrentFiber.setCurrentPhase("render"), 
                    newChildren = render(newValue), ReactDebugCurrentFiber.setCurrentPhase(null), workInProgress.effectTag |= 1, 
                    reconcileChildren(current, workInProgress, newChildren), workInProgress.child;
                }(current, workInProgress, renderExpirationTime);

              default:
                invariant(!1, "Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.");
            }
        }
        function markUpdate(workInProgress) {
            workInProgress.effectTag |= 4;
        }
        function markRef$1(workInProgress) {
            workInProgress.effectTag |= 128;
        }
        function appendAllChildren(parent, workInProgress) {
            for (var parentInstance, child, node = workInProgress.child; null !== node; ) {
                if (5 === node.tag || 6 === node.tag) parentInstance = parent, child = node.stateNode, 
                parentInstance.appendChild(child); else if (4 === node.tag) ; else if (null !== node.child) {
                    node.child.return = node, node = node.child;
                    continue;
                }
                if (node === workInProgress) return;
                for (;null === node.sibling; ) {
                    if (null === node.return || node.return === workInProgress) return;
                    node = node.return;
                }
                node.sibling.return = node.return, node = node.sibling;
            }
        }
        didWarnAboutBadClass = {}, didWarnAboutGetDerivedStateOnFunctionalComponent = {}, 
        didWarnAboutStatelessRefs = {};
        var updateHostContainer = void 0, updateHostComponent$1 = void 0, updateHostText$1 = void 0;
        function completeWork(current, workInProgress, renderExpirationTime) {
            var newProps = workInProgress.pendingProps;
            switch (4 & workInProgress.mode && recordElapsedActualRenderTime(workInProgress), 
            workInProgress.tag) {
              case 1:
                return null;

              case 2:
                return popContextProvider(workInProgress), null;

              case 3:
                popHostContainer(workInProgress), popTopLevelContextObject(workInProgress);
                var fiberRoot = workInProgress.stateNode;
                return fiberRoot.pendingContext && (fiberRoot.context = fiberRoot.pendingContext, 
                fiberRoot.pendingContext = null), null !== current && null !== current.child || (popHydrationState(workInProgress), 
                workInProgress.effectTag &= -3), updateHostContainer(workInProgress), null;

              case 5:
                popHostContext(workInProgress);
                var rootContainerInstance = getRootHostContainer(), type = workInProgress.type;
                if (null !== current && null != workInProgress.stateNode) {
                    var oldProps = current.memoizedProps, instance = workInProgress.stateNode, currentHostContext = getHostContext(), updatePayload = function(domElement, type, oldProps, newProps, rootContainerInstance, hostContext) {
                        var hostContextDev = hostContext;
                        if (typeof newProps.children != typeof oldProps.children && ("string" == typeof newProps.children || "number" == typeof newProps.children)) {
                            var string = "" + newProps.children, ownAncestorInfo = updatedAncestorInfo(hostContextDev.ancestorInfo, type, null);
                            validateDOMNesting$1(null, string, ownAncestorInfo);
                        }
                        return diffProperties(domElement, type, oldProps, newProps, rootContainerInstance);
                    }(instance, type, oldProps, newProps, rootContainerInstance, currentHostContext);
                    updateHostComponent$1(current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance, currentHostContext), 
                    current.ref !== workInProgress.ref && markRef$1(workInProgress);
                } else {
                    if (!newProps) return null === workInProgress.stateNode && invariant(!1, "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."), 
                    null;
                    var _currentHostContext = getHostContext();
                    if (popHydrationState(workInProgress)) prepareToHydrateHostInstance(workInProgress, rootContainerInstance, _currentHostContext) && markUpdate(workInProgress); else {
                        var _instance = function(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
                            var parentNamespace, hostContextDev = hostContext;
                            if (validateDOMNesting$1(type, null, hostContextDev.ancestorInfo), "string" == typeof props.children || "number" == typeof props.children) {
                                var string = "" + props.children, ownAncestorInfo = updatedAncestorInfo(hostContextDev.ancestorInfo, type, null);
                                validateDOMNesting$1(null, string, ownAncestorInfo);
                            }
                            parentNamespace = hostContextDev.namespace;
                            var domElement = createElement(type, props, rootContainerInstance, parentNamespace);
                            return precacheFiberNode$1(internalInstanceHandle, domElement), updateFiberProps$1(domElement, props), 
                            domElement;
                        }(type, newProps, rootContainerInstance, _currentHostContext, workInProgress);
                        appendAllChildren(_instance, workInProgress), finalizeInitialChildren(_instance, type, newProps, rootContainerInstance) && markUpdate(workInProgress), 
                        workInProgress.stateNode = _instance;
                    }
                    null !== workInProgress.ref && markRef$1(workInProgress);
                }
                return null;

              case 6:
                var newText = newProps;
                if (current && null != workInProgress.stateNode) {
                    var oldText = current.memoizedProps;
                    updateHostText$1(current, workInProgress, oldText, newText);
                } else {
                    if ("string" != typeof newText) return null === workInProgress.stateNode && invariant(!1, "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."), 
                    null;
                    var _rootContainerInstance = getRootHostContainer(), _currentHostContext2 = getHostContext();
                    popHydrationState(workInProgress) ? prepareToHydrateHostTextInstance(workInProgress) && markUpdate(workInProgress) : workInProgress.stateNode = createTextInstance(newText, _rootContainerInstance, _currentHostContext2, workInProgress);
                }
                return null;

              case 14:
              case 16:
              case 10:
              case 11:
              case 15:
                return null;

              case 4:
                return popHostContainer(workInProgress), updateHostContainer(workInProgress), null;

              case 13:
                return popProvider(workInProgress), null;

              case 12:
                return null;

              case 0:
                invariant(!1, "An indeterminate component should have become determinate before completing. This error is likely caused by a bug in React. Please file an issue.");

              default:
                invariant(!1, "Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.");
            }
        }
        updateHostContainer = function(workInProgress) {}, updateHostComponent$1 = function(current, workInProgress, updatePayload, type, oldProps, newProps, rootContainerInstance, currentHostContext) {
            workInProgress.updateQueue = updatePayload, updatePayload && markUpdate(workInProgress);
        }, updateHostText$1 = function(current, workInProgress, oldText, newText) {
            oldText !== newText && markUpdate(workInProgress);
        };
        var didWarnAboutUndefinedSnapshotBeforeUpdate, invokeGuardedCallback$3 = ReactErrorUtils.invokeGuardedCallback, hasCaughtError$1 = ReactErrorUtils.hasCaughtError, clearCaughtError$1 = ReactErrorUtils.clearCaughtError;
        function logError(boundary, errorInfo) {
            var source = errorInfo.source, stack = errorInfo.stack;
            null === stack && null !== source && (stack = getStackAddendumByWorkInProgressFiber(source));
            var capturedError = {
                componentName: null !== source ? getComponentName(source) : null,
                componentStack: null !== stack ? stack : "",
                error: errorInfo.value,
                errorBoundary: null,
                errorBoundaryName: null,
                errorBoundaryFound: !1,
                willRetry: !1
            };
            null !== boundary && 2 === boundary.tag && (capturedError.errorBoundary = boundary.stateNode, 
            capturedError.errorBoundaryName = getComponentName(boundary), capturedError.errorBoundaryFound = !0, 
            capturedError.willRetry = !0);
            try {
                !function(capturedError) {
                    var error = capturedError.error;
                    if (!error || !error.suppressReactErrorLogging) capturedError.componentName, capturedError.componentStack, 
                    capturedError.errorBoundaryName, capturedError.errorBoundaryFound, capturedError.willRetry;
                }(capturedError);
            } catch (e) {
                e && e.suppressReactErrorLogging;
            }
        }
        didWarnAboutUndefinedSnapshotBeforeUpdate = new Set;
        var callComponentWillUnmountWithTimer = function(current, instance) {
            startPhaseTimer(current, "componentWillUnmount"), instance.props = current.memoizedProps, 
            instance.state = current.memoizedState, instance.componentWillUnmount(), stopPhaseTimer();
        };
        function safelyDetachRef(current) {
            var ref = current.ref;
            null !== ref && ("function" == typeof ref ? (invokeGuardedCallback$3(null, ref, null, null), 
            hasCaughtError$1() && captureCommitPhaseError(current, clearCaughtError$1())) : ref.current = null);
        }
        function commitBeforeMutationLifeCycles(current, finishedWork) {
            switch (finishedWork.tag) {
              case 2:
                if (256 & finishedWork.effectTag && null !== current) {
                    var prevProps = current.memoizedProps, prevState = current.memoizedState;
                    startPhaseTimer(finishedWork, "getSnapshotBeforeUpdate");
                    var instance = finishedWork.stateNode;
                    instance.props = finishedWork.memoizedProps, instance.state = finishedWork.memoizedState;
                    var snapshot = instance.getSnapshotBeforeUpdate(prevProps, prevState), didWarnSet = didWarnAboutUndefinedSnapshotBeforeUpdate;
                    void 0 !== snapshot || didWarnSet.has(finishedWork.type) || (didWarnSet.add(finishedWork.type), 
                    warning(!1, "%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", getComponentName(finishedWork))), 
                    instance.__reactInternalSnapshotBeforeUpdate = snapshot, stopPhaseTimer();
                }
                return;

              case 3:
              case 5:
              case 6:
              case 4:
                return;

              default:
                invariant(!1, "This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
            }
        }
        function commitLifeCycles(finishedRoot, current, finishedWork, currentTime, committedExpirationTime) {
            switch (finishedWork.tag) {
              case 2:
                var instance = finishedWork.stateNode;
                if (4 & finishedWork.effectTag) if (null === current) startPhaseTimer(finishedWork, "componentDidMount"), 
                instance.props = finishedWork.memoizedProps, instance.state = finishedWork.memoizedState, 
                instance.componentDidMount(), stopPhaseTimer(); else {
                    var prevProps = current.memoizedProps, prevState = current.memoizedState;
                    startPhaseTimer(finishedWork, "componentDidUpdate"), instance.props = finishedWork.memoizedProps, 
                    instance.state = finishedWork.memoizedState, instance.componentDidUpdate(prevProps, prevState, instance.__reactInternalSnapshotBeforeUpdate), 
                    stopPhaseTimer();
                }
                var updateQueue = finishedWork.updateQueue;
                return void (null !== updateQueue && (instance.props = finishedWork.memoizedProps, 
                instance.state = finishedWork.memoizedState, commitUpdateQueue(0, updateQueue, instance)));

              case 3:
                var _updateQueue = finishedWork.updateQueue;
                if (null !== _updateQueue) {
                    var _instance = null;
                    if (null !== finishedWork.child) switch (finishedWork.child.tag) {
                      case 5:
                      case 2:
                        _instance = finishedWork.child.stateNode;
                    }
                    commitUpdateQueue(0, _updateQueue, _instance);
                }
                return;

              case 5:
                var _instance2 = finishedWork.stateNode;
                if (null === current && 4 & finishedWork.effectTag) !function(domElement, type, newProps, internalInstanceHandle) {
                    shouldAutoFocusHostComponent(type, newProps) && domElement.focus();
                }(_instance2, finishedWork.type, finishedWork.memoizedProps);
                return;

              case 6:
              case 4:
              case 15:
              case 16:
                return;

              default:
                invariant(!1, "This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
            }
        }
        function commitAttachRef(finishedWork) {
            var ref = finishedWork.ref;
            if (null !== ref) {
                var instance = finishedWork.stateNode, instanceToUse = void 0;
                switch (finishedWork.tag) {
                  case 5:
                    instanceToUse = instance;
                    break;

                  default:
                    instanceToUse = instance;
                }
                "function" == typeof ref ? ref(instanceToUse) : (ref.hasOwnProperty("current") || warning(!1, "Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().%s", getComponentName(finishedWork), getStackAddendumByWorkInProgressFiber(finishedWork)), 
                ref.current = instanceToUse);
            }
        }
        function commitDetachRef(current) {
            var currentRef = current.ref;
            null !== currentRef && ("function" == typeof currentRef ? currentRef(null) : currentRef.current = null);
        }
        function commitUnmount(current) {
            switch (onCommitUnmount(current), current.tag) {
              case 2:
                safelyDetachRef(current);
                var instance = current.stateNode;
                return void ("function" == typeof instance.componentWillUnmount && function(current, instance) {
                    invokeGuardedCallback$3(null, callComponentWillUnmountWithTimer, null, current, instance), 
                    hasCaughtError$1() && captureCommitPhaseError(current, clearCaughtError$1());
                }(current, instance));

              case 5:
                return void safelyDetachRef(current);

              case 4:
                return void unmountHostComponents(current);
            }
        }
        function commitNestedUnmounts(root) {
            for (var node = root; ;) if (commitUnmount(node), null === node.child || 4 === node.tag) {
                if (node === root) return;
                for (;null === node.sibling; ) {
                    if (null === node.return || node.return === root) return;
                    node = node.return;
                }
                node.sibling.return = node.return, node = node.sibling;
            } else node.child.return = node, node = node.child;
        }
        function isHostParent(fiber) {
            return 5 === fiber.tag || 3 === fiber.tag || 4 === fiber.tag;
        }
        function commitPlacement(finishedWork) {
            var parentFiber = function(fiber) {
                for (var parent = fiber.return; null !== parent; ) {
                    if (isHostParent(parent)) return parent;
                    parent = parent.return;
                }
                invariant(!1, "Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
            }(finishedWork), parent = void 0, isContainer = void 0;
            switch (parentFiber.tag) {
              case 5:
                parent = parentFiber.stateNode, isContainer = !1;
                break;

              case 3:
              case 4:
                parent = parentFiber.stateNode.containerInfo, isContainer = !0;
                break;

              default:
                invariant(!1, "Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
            }
            16 & parentFiber.effectTag && (resetTextContent(parent), parentFiber.effectTag &= -17);
            for (var container, child, beforeChild, before = function(fiber) {
                var node = fiber;
                siblings: for (;;) {
                    for (;null === node.sibling; ) {
                        if (null === node.return || isHostParent(node.return)) return null;
                        node = node.return;
                    }
                    for (node.sibling.return = node.return, node = node.sibling; 5 !== node.tag && 6 !== node.tag; ) {
                        if (2 & node.effectTag) continue siblings;
                        if (null === node.child || 4 === node.tag) continue siblings;
                        node.child.return = node, node = node.child;
                    }
                    if (!(2 & node.effectTag)) return node.stateNode;
                }
            }(finishedWork), node = finishedWork; ;) {
                if (5 === node.tag || 6 === node.tag) before ? isContainer ? (container = parent, 
                child = node.stateNode, beforeChild = before, 8 === container.nodeType ? container.parentNode.insertBefore(child, beforeChild) : container.insertBefore(child, beforeChild)) : insertBefore(parent, node.stateNode, before) : isContainer ? appendChildToContainer(parent, node.stateNode) : appendChild(parent, node.stateNode); else if (4 === node.tag) ; else if (null !== node.child) {
                    node.child.return = node, node = node.child;
                    continue;
                }
                if (node === finishedWork) return;
                for (;null === node.sibling; ) {
                    if (null === node.return || node.return === finishedWork) return;
                    node = node.return;
                }
                node.sibling.return = node.return, node = node.sibling;
            }
        }
        function unmountHostComponents(current) {
            for (var container, child, node = current, currentParentIsValid = !1, currentParent = void 0, currentParentIsContainer = void 0; ;) {
                if (!currentParentIsValid) {
                    var parent = node.return;
                    findParent: for (;;) {
                        switch (null === parent && invariant(!1, "Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue."), 
                        parent.tag) {
                          case 5:
                            currentParent = parent.stateNode, currentParentIsContainer = !1;
                            break findParent;

                          case 3:
                          case 4:
                            currentParent = parent.stateNode.containerInfo, currentParentIsContainer = !0;
                            break findParent;
                        }
                        parent = parent.return;
                    }
                    currentParentIsValid = !0;
                }
                if (5 === node.tag || 6 === node.tag) commitNestedUnmounts(node), currentParentIsContainer ? (container = currentParent, 
                child = node.stateNode, 8 === container.nodeType ? container.parentNode.removeChild(child) : container.removeChild(child)) : removeChild(currentParent, node.stateNode); else if (4 === node.tag) {
                    if (currentParent = node.stateNode.containerInfo, null !== node.child) {
                        node.child.return = node, node = node.child;
                        continue;
                    }
                } else if (commitUnmount(node), null !== node.child) {
                    node.child.return = node, node = node.child;
                    continue;
                }
                if (node === current) return;
                for (;null === node.sibling; ) {
                    if (null === node.return || node.return === current) return;
                    4 === (node = node.return).tag && (currentParentIsValid = !1);
                }
                node.sibling.return = node.return, node = node.sibling;
            }
        }
        function commitDeletion(current) {
            unmountHostComponents(current), function(current) {
                current.return = null, current.child = null, current.alternate && (current.alternate.child = null, 
                current.alternate.return = null);
            }(current);
        }
        function commitWork(current, finishedWork) {
            switch (finishedWork.tag) {
              case 2:
                return;

              case 5:
                var instance = finishedWork.stateNode;
                if (null != instance) {
                    var newProps = finishedWork.memoizedProps, oldProps = null !== current ? current.memoizedProps : newProps, type = finishedWork.type, updatePayload = finishedWork.updateQueue;
                    finishedWork.updateQueue = null, null !== updatePayload && function(domElement, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
                        updateFiberProps$1(domElement, newProps), updateProperties(domElement, updatePayload, type, oldProps, newProps);
                    }(instance, updatePayload, type, oldProps, newProps);
                }
                return;

              case 6:
                null === finishedWork.stateNode && invariant(!1, "This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
                var textInstance = finishedWork.stateNode, newText = finishedWork.memoizedProps;
                null !== current && current.memoizedProps;
                return void function(textInstance, oldText, newText) {
                    textInstance.nodeValue = newText;
                }(textInstance, 0, newText);

              case 3:
                return;

              case 15:
                return void (0, finishedWork.memoizedProps.onRender)(finishedWork.memoizedProps.id, null === current ? "mount" : "update", finishedWork.actualDuration, finishedWork.treeBaseTime, finishedWork.actualStartTime, commitTime);

              case 16:
                return;

              default:
                invariant(!1, "This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
            }
        }
        function commitResetTextContent(current) {
            resetTextContent(current.stateNode);
        }
        function createRootErrorUpdate(fiber, errorInfo, expirationTime) {
            var update = createUpdate(expirationTime);
            update.tag = 3, update.payload = {
                element: null
            };
            var error = errorInfo.value;
            return update.callback = function() {
                onUncaughtError(error), logError(fiber, errorInfo);
            }, update;
        }
        function createClassErrorUpdate(fiber, errorInfo, expirationTime) {
            var update = createUpdate(expirationTime);
            update.tag = 3;
            fiber.type.getDerivedStateFromCatch;
            var inst = fiber.stateNode;
            return null !== inst && "function" == typeof inst.componentDidCatch && (update.callback = function() {
                var instance;
                instance = this, null === legacyErrorBoundariesThatAlreadyFailed ? legacyErrorBoundariesThatAlreadyFailed = new Set([ instance ]) : legacyErrorBoundariesThatAlreadyFailed.add(instance);
                var error = errorInfo.value, stack = errorInfo.stack;
                logError(fiber, errorInfo), this.componentDidCatch(error, {
                    componentStack: null !== stack ? stack : ""
                });
            }), update;
        }
        function throwException(root, returnFiber, sourceFiber, value, renderIsExpired, renderExpirationTime, currentTimeMs) {
            sourceFiber.effectTag |= 512, sourceFiber.firstEffect = sourceFiber.lastEffect = null, 
            value = createCapturedValue(value, sourceFiber);
            var workInProgress = returnFiber;
            do {
                switch (workInProgress.tag) {
                  case 3:
                    var _errorInfo = value;
                    return workInProgress.effectTag |= 1024, void enqueueCapturedUpdate(workInProgress, createRootErrorUpdate(workInProgress, _errorInfo, renderExpirationTime), renderExpirationTime);

                  case 2:
                    var errorInfo = value, ctor = workInProgress.type, instance = workInProgress.stateNode;
                    if (0 == (64 & workInProgress.effectTag) && (ctor.getDerivedStateFromCatch, null !== instance && "function" == typeof instance.componentDidCatch && !isAlreadyFailedLegacyErrorBoundary(instance))) return workInProgress.effectTag |= 1024, 
                    void enqueueCapturedUpdate(workInProgress, createClassErrorUpdate(workInProgress, errorInfo, renderExpirationTime), renderExpirationTime);
                }
                workInProgress = workInProgress.return;
            } while (null !== workInProgress);
        }
        function unwindWork(workInProgress, renderIsExpired, renderExpirationTime) {
            switch (4 & workInProgress.mode && recordElapsedActualRenderTime(workInProgress), 
            workInProgress.tag) {
              case 2:
                popContextProvider(workInProgress);
                var effectTag = workInProgress.effectTag;
                return 1024 & effectTag ? (workInProgress.effectTag = -1025 & effectTag | 64, workInProgress) : null;

              case 3:
                popHostContainer(workInProgress), popTopLevelContextObject(workInProgress);
                var _effectTag = workInProgress.effectTag;
                return 1024 & _effectTag ? (workInProgress.effectTag = -1025 & _effectTag | 64, 
                workInProgress) : null;

              case 5:
                return popHostContext(workInProgress), null;

              case 16:
                var _effectTag2 = workInProgress.effectTag;
                return 1024 & _effectTag2 ? (workInProgress.effectTag = -1025 & _effectTag2 | 64, 
                workInProgress) : null;

              case 4:
                return popHostContainer(workInProgress), null;

              case 13:
                return popProvider(workInProgress), null;

              default:
                return null;
            }
        }
        function unwindInterruptedWork(interruptedWork) {
            switch (4 & interruptedWork.mode && (resumeActualRenderTimerIfPaused(), recordElapsedActualRenderTime(interruptedWork)), 
            interruptedWork.tag) {
              case 2:
                popContextProvider(interruptedWork);
                break;

              case 3:
                popHostContainer(interruptedWork), popTopLevelContextObject(interruptedWork);
                break;

              case 5:
                popHostContext(interruptedWork);
                break;

              case 4:
                popHostContainer(interruptedWork);
                break;

              case 13:
                popProvider(interruptedWork);
            }
        }
        var warnAboutUpdateOnUnmounted, warnAboutInvalidUpdates, invokeGuardedCallback$2 = ReactErrorUtils.invokeGuardedCallback, hasCaughtError = ReactErrorUtils.hasCaughtError, clearCaughtError = ReactErrorUtils.clearCaughtError, didWarnAboutStateTransition = void 0, didWarnSetStateChildContext = void 0;
        didWarnAboutStateTransition = !1, didWarnSetStateChildContext = !1;
        var didWarnStateUpdateForUnmountedComponent = {};
        warnAboutUpdateOnUnmounted = function(fiber) {
            var componentName = getComponentName(fiber) || "ReactClass";
            didWarnStateUpdateForUnmountedComponent[componentName] || (warning(!1, "Can't call setState (or forceUpdate) on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.%s", getStackAddendumByWorkInProgressFiber(fiber)), 
            didWarnStateUpdateForUnmountedComponent[componentName] = !0);
        }, warnAboutInvalidUpdates = function(instance) {
            switch (ReactDebugCurrentFiber.phase) {
              case "getChildContext":
                if (didWarnSetStateChildContext) return;
                warning(!1, "setState(...): Cannot call setState() inside getChildContext()"), didWarnSetStateChildContext = !0;
                break;

              case "render":
                if (didWarnAboutStateTransition) return;
                warning(!1, "Cannot update during an existing state transition (such as within `render` or another component's constructor). Render methods should be a pure function of props and state; constructor side-effects are an anti-pattern, but can be moved to `componentWillMount`."), 
                didWarnAboutStateTransition = !0;
            }
        };
        var originalStartTimeMs = now(), mostRecentCurrentTime = msToExpirationTime(0), mostRecentCurrentTimeMs = originalStartTimeMs, lastUniqueAsyncExpiration = 0, expirationContext = 0, isWorking = !1, nextUnitOfWork = null, nextRoot = null, nextRenderExpirationTime = 0, nextLatestTimeoutMs = -1, nextRenderIsExpired = !1, nextEffect = null, isCommitting$1 = !1, isRootReadyForCommit = !1, legacyErrorBoundariesThatAlreadyFailed = null, interruptedBy = null, stashedWorkInProgressProperties = void 0, replayUnitOfWork = void 0, isReplayingFailedUnitOfWork = void 0, originalReplayError = void 0, rethrowOriginalError = void 0;
        function resetStack() {
            if (null !== nextUnitOfWork) for (var interruptedWork = nextUnitOfWork.return; null !== interruptedWork; ) unwindInterruptedWork(interruptedWork), 
            interruptedWork = interruptedWork.return;
            ReactStrictModeWarnings.discardPendingWarnings(), -1 !== index && warning(!1, "Expected an empty stack. Something was not reset properly."), 
            nextRoot = null, nextRenderExpirationTime = 0, nextLatestTimeoutMs = -1, nextRenderIsExpired = !1, 
            nextUnitOfWork = null, isRootReadyForCommit = !1;
        }
        function commitAllHostEffects() {
            for (;null !== nextEffect; ) {
                ReactDebugCurrentFiber.setCurrentFiber(nextEffect), recordEffect();
                var effectTag = nextEffect.effectTag;
                if (16 & effectTag && commitResetTextContent(nextEffect), 128 & effectTag) {
                    var current = nextEffect.alternate;
                    null !== current && commitDetachRef(current);
                }
                switch (14 & effectTag) {
                  case 2:
                    commitPlacement(nextEffect), nextEffect.effectTag &= -3;
                    break;

                  case 6:
                    commitPlacement(nextEffect), nextEffect.effectTag &= -3, commitWork(nextEffect.alternate, nextEffect);
                    break;

                  case 4:
                    commitWork(nextEffect.alternate, nextEffect);
                    break;

                  case 8:
                    commitDeletion(nextEffect);
                }
                nextEffect = nextEffect.nextEffect;
            }
            ReactDebugCurrentFiber.resetCurrentFiber();
        }
        function commitBeforeMutationLifecycles() {
            for (;null !== nextEffect; ) {
                if (256 & nextEffect.effectTag) recordEffect(), commitBeforeMutationLifeCycles(nextEffect.alternate, nextEffect);
                nextEffect = nextEffect.nextEffect;
            }
        }
        function commitAllLifeCycles(finishedRoot, currentTime, committedExpirationTime) {
            for (ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings(); null !== nextEffect; ) {
                var effectTag = nextEffect.effectTag;
                if (36 & effectTag) recordEffect(), commitLifeCycles(0, nextEffect.alternate, nextEffect);
                128 & effectTag && (recordEffect(), commitAttachRef(nextEffect));
                var next = nextEffect.nextEffect;
                nextEffect.nextEffect = null, nextEffect = next;
            }
        }
        function isAlreadyFailedLegacyErrorBoundary(instance) {
            return null !== legacyErrorBoundariesThatAlreadyFailed && legacyErrorBoundariesThatAlreadyFailed.has(instance);
        }
        function commitRoot(finishedWork) {
            isWorking = !0, isCommitting$1 = !0, supportsUserTiming && (isCommitting = !0, hasScheduledUpdateInCurrentCommit = !1, 
            labelsInCurrentCommit.clear(), beginMark("(Committing Changes)"));
            var root = finishedWork.stateNode;
            root.current === finishedWork && invariant(!1, "Cannot commit the same tree as before. This is probably a bug related to the return field. This error is likely caused by a bug in React. Please file an issue.");
            var committedExpirationTime = root.pendingCommitExpirationTime;
            0 === committedExpirationTime && invariant(!1, "Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue."), 
            root.pendingCommitExpirationTime = 0;
            var currentTime = recalculateCurrentTime();
            ReactCurrentOwner.current = null;
            var firstEffect = void 0;
            for (finishedWork.effectTag > 1 ? null !== finishedWork.lastEffect ? (finishedWork.lastEffect.nextEffect = finishedWork, 
            firstEffect = finishedWork.firstEffect) : firstEffect = finishedWork : firstEffect = finishedWork.firstEffect, 
            prepareForCommit(root.containerInfo), nextEffect = firstEffect, supportsUserTiming && (effectCountInCurrentCommit = 0, 
            beginMark("(Committing Snapshot Effects)")); null !== nextEffect; ) {
                var didError = !1, error = void 0;
                invokeGuardedCallback$2(null, commitBeforeMutationLifecycles, null), hasCaughtError() && (didError = !0, 
                error = clearCaughtError()), didError && (null === nextEffect && invariant(!1, "Should have next effect. This error is likely caused by a bug in React. Please file an issue."), 
                captureCommitPhaseError(nextEffect, error), null !== nextEffect && (nextEffect = nextEffect.nextEffect));
            }
            for (!function() {
                if (supportsUserTiming) {
                    var count = effectCountInCurrentCommit;
                    effectCountInCurrentCommit = 0, endMark("(Committing Snapshot Effects: " + count + " Total)", "(Committing Snapshot Effects)", null);
                }
            }(), commitTime = now(), nextEffect = firstEffect, supportsUserTiming && (effectCountInCurrentCommit = 0, 
            beginMark("(Committing Host Effects)")); null !== nextEffect; ) {
                var _didError = !1, _error = void 0;
                invokeGuardedCallback$2(null, commitAllHostEffects, null), hasCaughtError() && (_didError = !0, 
                _error = clearCaughtError()), _didError && (null === nextEffect && invariant(!1, "Should have next effect. This error is likely caused by a bug in React. Please file an issue."), 
                captureCommitPhaseError(nextEffect, _error), null !== nextEffect && (nextEffect = nextEffect.nextEffect));
            }
            for (!function() {
                if (supportsUserTiming) {
                    var count = effectCountInCurrentCommit;
                    effectCountInCurrentCommit = 0, endMark("(Committing Host Effects: " + count + " Total)", "(Committing Host Effects)", null);
                }
            }(), root.containerInfo, restoreSelection(selectionInformation), selectionInformation = null, 
            setEnabled(eventsEnabled), eventsEnabled = null, root.current = finishedWork, nextEffect = firstEffect, 
            supportsUserTiming && (effectCountInCurrentCommit = 0, beginMark("(Calling Lifecycle Methods)")); null !== nextEffect; ) {
                var _didError2 = !1, _error2 = void 0;
                invokeGuardedCallback$2(null, commitAllLifeCycles, null, root, currentTime, committedExpirationTime), 
                hasCaughtError() && (_didError2 = !0, _error2 = clearCaughtError()), _didError2 && (null === nextEffect && invariant(!1, "Should have next effect. This error is likely caused by a bug in React. Please file an issue."), 
                captureCommitPhaseError(nextEffect, _error2), null !== nextEffect && (nextEffect = nextEffect.nextEffect));
            }
            0 !== fiberStack$1.length && warning(!1, "Expected an empty stack. Something was not reset properly."), 
            totalElapsedPauseTime = 0, isCommitting$1 = !1, isWorking = !1, function() {
                if (supportsUserTiming) {
                    var count = effectCountInCurrentCommit;
                    effectCountInCurrentCommit = 0, endMark("(Calling Lifecycle Methods: " + count + " Total)", "(Calling Lifecycle Methods)", null);
                }
            }(), function() {
                if (supportsUserTiming) {
                    var warning$$1 = null;
                    hasScheduledUpdateInCurrentCommit ? warning$$1 = "Lifecycle hook scheduled a cascading update" : commitCountInCurrentWorkLoop > 0 && (warning$$1 = "Caused by a cascading update in earlier commit"), 
                    hasScheduledUpdateInCurrentCommit = !1, commitCountInCurrentWorkLoop++, isCommitting = !1, 
                    labelsInCurrentCommit.clear(), endMark("(Committing Changes)", "(Committing Changes)", warning$$1);
                }
            }(), onCommitRoot(finishedWork.stateNode), ReactFiberInstrumentation_1.debugTool && ReactFiberInstrumentation_1.debugTool.onCommitWork(finishedWork), 
            root.current.expirationTime;
            var remainingTime = findNextPendingPriorityLevel(root);
            return 0 === remainingTime && (legacyErrorBoundariesThatAlreadyFailed = null), remainingTime;
        }
        function resetExpirationTime(workInProgress, renderTime) {
            if (renderTime === Never || workInProgress.expirationTime !== Never) {
                var newExpirationTime = 0;
                switch (workInProgress.tag) {
                  case 3:
                  case 2:
                    var updateQueue = workInProgress.updateQueue;
                    null !== updateQueue && (newExpirationTime = updateQueue.expirationTime);
                }
                if (4 & workInProgress.mode) {
                    for (var treeBaseTime = workInProgress.selfBaseTime, child = workInProgress.child; null !== child; ) treeBaseTime += child.treeBaseTime, 
                    0 !== child.expirationTime && (0 === newExpirationTime || newExpirationTime > child.expirationTime) && (newExpirationTime = child.expirationTime), 
                    child = child.sibling;
                    workInProgress.treeBaseTime = treeBaseTime;
                } else for (var _child = workInProgress.child; null !== _child; ) 0 !== _child.expirationTime && (0 === newExpirationTime || newExpirationTime > _child.expirationTime) && (newExpirationTime = _child.expirationTime), 
                _child = _child.sibling;
                workInProgress.expirationTime = newExpirationTime;
            }
        }
        function completeUnitOfWork(workInProgress) {
            for (;;) {
                var current = workInProgress.alternate;
                ReactDebugCurrentFiber.setCurrentFiber(workInProgress);
                var returnFiber = workInProgress.return, siblingFiber = workInProgress.sibling;
                if (0 == (512 & workInProgress.effectTag)) {
                    var next = completeWork(current, workInProgress);
                    if (stopWorkTimer(workInProgress), resetExpirationTime(workInProgress, nextRenderExpirationTime), 
                    ReactDebugCurrentFiber.resetCurrentFiber(), null !== next) return stopWorkTimer(workInProgress), 
                    ReactFiberInstrumentation_1.debugTool && ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress), 
                    next;
                    if (null !== returnFiber && 0 == (512 & returnFiber.effectTag)) null === returnFiber.firstEffect && (returnFiber.firstEffect = workInProgress.firstEffect), 
                    null !== workInProgress.lastEffect && (null !== returnFiber.lastEffect && (returnFiber.lastEffect.nextEffect = workInProgress.firstEffect), 
                    returnFiber.lastEffect = workInProgress.lastEffect), workInProgress.effectTag > 1 && (null !== returnFiber.lastEffect ? returnFiber.lastEffect.nextEffect = workInProgress : returnFiber.firstEffect = workInProgress, 
                    returnFiber.lastEffect = workInProgress);
                    if (ReactFiberInstrumentation_1.debugTool && ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress), 
                    null !== siblingFiber) return siblingFiber;
                    if (null !== returnFiber) {
                        workInProgress = returnFiber;
                        continue;
                    }
                    return isRootReadyForCommit = !0, null;
                }
                var _next = unwindWork(workInProgress);
                if (64 & workInProgress.effectTag ? stopFailedWorkTimer(workInProgress) : stopWorkTimer(workInProgress), 
                ReactDebugCurrentFiber.resetCurrentFiber(), null !== _next) return stopWorkTimer(workInProgress), 
                ReactFiberInstrumentation_1.debugTool && ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress), 
                _next.effectTag &= 511, _next;
                if (null !== returnFiber && (returnFiber.firstEffect = returnFiber.lastEffect = null, 
                returnFiber.effectTag |= 512), ReactFiberInstrumentation_1.debugTool && ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress), 
                null !== siblingFiber) return siblingFiber;
                if (null === returnFiber) return null;
                workInProgress = returnFiber;
            }
            return null;
        }
        function performUnitOfWork(workInProgress) {
            var fiber, current = workInProgress.alternate;
            fiber = workInProgress, supportsUserTiming && !shouldIgnoreFiber(fiber) && (currentFiber = fiber, 
            beginFiberMark(fiber, null) && (fiber._debugIsCurrentlyTiming = !0)), ReactDebugCurrentFiber.setCurrentFiber(workInProgress), 
            stashedWorkInProgressProperties = assignFiberPropertiesInDEV(stashedWorkInProgressProperties, workInProgress);
            var next = void 0;
            return 4 & workInProgress.mode && (-1 !== baseStartTime && warning(!1, "Cannot start base timer that is already running. This error is likely caused by a bug in React. Please file an issue."), 
            baseStartTime = now()), next = beginWork(current, workInProgress, nextRenderExpirationTime), 
            4 & workInProgress.mode && (!function(fiber) {
                -1 !== baseStartTime && (fiber.selfBaseTime = now() - baseStartTime);
            }(workInProgress), stopBaseRenderTimerIfRunning()), ReactDebugCurrentFiber.resetCurrentFiber(), 
            isReplayingFailedUnitOfWork && rethrowOriginalError(), ReactFiberInstrumentation_1.debugTool && ReactFiberInstrumentation_1.debugTool.onBeginWork(workInProgress), 
            null === next && (next = completeUnitOfWork(workInProgress)), ReactCurrentOwner.current = null, 
            next;
        }
        function workLoop(isAsync) {
            if (isAsync) {
                for (;null !== nextUnitOfWork && !shouldYield(); ) nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
                pauseActualRenderTimerIfRunning();
            } else for (;null !== nextUnitOfWork; ) nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
        }
        function renderRoot(root, expirationTime, isAsync) {
            isWorking && invariant(!1, "renderRoot was called recursively. This error is likely caused by a bug in React. Please file an issue."), 
            isWorking = !0, expirationTime === nextRenderExpirationTime && root === nextRoot && null !== nextUnitOfWork || (resetStack(), 
            nextRenderExpirationTime = expirationTime, nextLatestTimeoutMs = -1, nextUnitOfWork = createWorkInProgress((nextRoot = root).current, null, nextRenderExpirationTime), 
            root.pendingCommitExpirationTime = 0);
            var didFatal = !1;
            for (nextRenderIsExpired = !isAsync || nextRenderExpirationTime <= mostRecentCurrentTime, 
            startWorkLoopTimer(nextUnitOfWork); ;) {
                try {
                    workLoop(isAsync);
                } catch (thrownValue) {
                    if (stopBaseRenderTimerIfRunning(), null === nextUnitOfWork) didFatal = !0, onUncaughtError(thrownValue); else {
                        resetCurrentlyProcessingQueue(), replayUnitOfWork(nextUnitOfWork, thrownValue, isAsync), 
                        null === nextUnitOfWork && invariant(!1, "Failed to replay rendering after an error. This is likely caused by a bug in React. Please file an issue with a reproducing case to help us find it.");
                        var sourceFiber = nextUnitOfWork, returnFiber = sourceFiber.return;
                        if (null === returnFiber) {
                            didFatal = !0, onUncaughtError(thrownValue);
                            break;
                        }
                        throwException(0, returnFiber, sourceFiber, thrownValue, 0, nextRenderExpirationTime), 
                        nextUnitOfWork = completeUnitOfWork(sourceFiber);
                    }
                }
                break;
            }
            var remainingExpirationTime, didCompleteRoot = !1;
            if (isWorking = !1, didFatal) return stopWorkLoopTimer(interruptedBy, didCompleteRoot), 
            interruptedBy = null, index = -1, valueStack.length = 0, fiberStack.length = 0, 
            null;
            if (null === nextUnitOfWork) {
                if (isRootReadyForCommit) return stopWorkLoopTimer(interruptedBy, didCompleteRoot = !0), 
                interruptedBy = null, root.pendingCommitExpirationTime = expirationTime, root.current.alternate;
                stopWorkLoopTimer(interruptedBy, didCompleteRoot), interruptedBy = null, nextRenderIsExpired && invariant(!1, "Expired work should have completed. This error is likely caused by a bug in React. Please file an issue."), 
                nextLatestTimeoutMs >= 0 && setTimeout((function() {
                    retrySuspendedRoot(root, expirationTime);
                }), nextLatestTimeoutMs);
                var firstUnblockedExpirationTime = findNextPendingPriorityLevel(root);
                return remainingExpirationTime = firstUnblockedExpirationTime, null === nextFlushedRoot && invariant(!1, "Should be working on a root. This error is likely caused by a bug in React. Please file an issue."), 
                nextFlushedRoot.remainingExpirationTime = remainingExpirationTime, null;
            }
            return stopWorkLoopTimer(interruptedBy, didCompleteRoot), interruptedBy = null, 
            null;
        }
        function captureCommitPhaseError(fiber, error) {
            return function(sourceFiber, value, expirationTime) {
                isWorking && !isCommitting$1 && invariant(!1, "dispatch: Cannot dispatch during the render phase.");
                for (var fiber = sourceFiber.return; null !== fiber; ) {
                    switch (fiber.tag) {
                      case 2:
                        var ctor = fiber.type, instance = fiber.stateNode;
                        if ("function" == typeof ctor.getDerivedStateFromCatch || "function" == typeof instance.componentDidCatch && !isAlreadyFailedLegacyErrorBoundary(instance)) return enqueueUpdate(fiber, createClassErrorUpdate(fiber, createCapturedValue(value, sourceFiber), expirationTime), expirationTime), 
                        void scheduleWork$1(fiber, expirationTime);
                        break;

                      case 3:
                        return enqueueUpdate(fiber, createRootErrorUpdate(fiber, createCapturedValue(value, sourceFiber), expirationTime), expirationTime), 
                        void scheduleWork$1(fiber, expirationTime);
                    }
                    fiber = fiber.return;
                }
                if (3 === sourceFiber.tag) {
                    var rootFiber = sourceFiber;
                    enqueueUpdate(rootFiber, createRootErrorUpdate(rootFiber, createCapturedValue(value, rootFiber), expirationTime), expirationTime), 
                    scheduleWork$1(rootFiber, expirationTime);
                }
            }(fiber, error, 1);
        }
        function computeAsyncExpiration(currentTime) {
            return computeExpirationBucket(currentTime, 5e3, 250);
        }
        function computeUniqueAsyncExpiration() {
            var result = computeAsyncExpiration(recalculateCurrentTime());
            return result <= lastUniqueAsyncExpiration && (result = lastUniqueAsyncExpiration + 1), 
            lastUniqueAsyncExpiration = result;
        }
        function computeExpirationForFiber(currentTime, fiber) {
            var expirationTime = void 0;
            return expirationTime = 0 !== expirationContext ? expirationContext : isWorking ? isCommitting$1 ? 1 : nextRenderExpirationTime : 1 & fiber.mode ? isBatchingInteractiveUpdates ? function(currentTime) {
                return computeExpirationBucket(currentTime, 500, 100);
            }(currentTime) : computeAsyncExpiration(currentTime) : 1, isBatchingInteractiveUpdates && (0 === lowestPendingInteractiveExpirationTime || expirationTime > lowestPendingInteractiveExpirationTime) && (lowestPendingInteractiveExpirationTime = expirationTime), 
            expirationTime;
        }
        function retrySuspendedRoot(root, suspendedTime) {
            var retryTime = findNextPendingPriorityLevel(root);
            0 !== retryTime && function(root, expirationTime) {
                (0 === root.remainingExpirationTime || root.remainingExpirationTime < expirationTime) && requestWork(root, expirationTime);
            }(root, retryTime);
        }
        function scheduleWork$1(fiber, expirationTime) {
            if (isCommitting && (hasScheduledUpdateInCurrentCommit = !0), null !== currentPhase && "componentWillMount" !== currentPhase && "componentWillReceiveProps" !== currentPhase && (hasScheduledUpdateInCurrentPhase = !0), 
            2 === fiber.tag) {
                fiber.stateNode;
                warnAboutInvalidUpdates();
            }
            for (var node = fiber; null !== node; ) {
                if ((0 === node.expirationTime || node.expirationTime > expirationTime) && (node.expirationTime = expirationTime), 
                null !== node.alternate && (0 === node.alternate.expirationTime || node.alternate.expirationTime > expirationTime) && (node.alternate.expirationTime = expirationTime), 
                null === node.return) {
                    if (3 !== node.tag) return void (2 === fiber.tag && warnAboutUpdateOnUnmounted(fiber));
                    var root = node.stateNode;
                    !isWorking && 0 !== nextRenderExpirationTime && expirationTime < nextRenderExpirationTime && (interruptedBy = fiber, 
                    resetStack());
                    var nextExpirationTimeToWorkOn = findNextPendingPriorityLevel(root);
                    isWorking && !isCommitting$1 && nextRoot === root || requestWork(root, nextExpirationTimeToWorkOn), 
                    nestedUpdateCount > NESTED_UPDATE_LIMIT && invariant(!1, "Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
                }
                node = node.return;
            }
        }
        function recalculateCurrentTime() {
            return mostRecentCurrentTimeMs = now() - originalStartTimeMs, mostRecentCurrentTime = msToExpirationTime(mostRecentCurrentTimeMs);
        }
        function deferredUpdates(fn) {
            var previousExpirationContext = expirationContext, currentTime = recalculateCurrentTime();
            expirationContext = computeAsyncExpiration(currentTime);
            try {
                return fn();
            } finally {
                expirationContext = previousExpirationContext;
            }
        }
        function syncUpdates(fn, a, b, c, d) {
            var previousExpirationContext = expirationContext;
            expirationContext = 1;
            try {
                return fn(a, b, c, d);
            } finally {
                expirationContext = previousExpirationContext;
            }
        }
        stashedWorkInProgressProperties = null, isReplayingFailedUnitOfWork = !1, originalReplayError = null, 
        replayUnitOfWork = function(failedUnitOfWork, thrownValue, isAsync) {
            if (null === thrownValue || "object" != typeof thrownValue || "function" != typeof thrownValue.then) if (null !== stashedWorkInProgressProperties) {
                switch (assignFiberPropertiesInDEV(failedUnitOfWork, stashedWorkInProgressProperties), 
                failedUnitOfWork.tag) {
                  case 3:
                    popHostContainer(failedUnitOfWork), popTopLevelContextObject(failedUnitOfWork);
                    break;

                  case 5:
                    popHostContext(failedUnitOfWork);
                    break;

                  case 2:
                    popContextProvider(failedUnitOfWork);
                    break;

                  case 4:
                    popHostContainer(failedUnitOfWork);
                    break;

                  case 13:
                    popProvider(failedUnitOfWork);
                }
                isReplayingFailedUnitOfWork = !0, originalReplayError = thrownValue, invokeGuardedCallback$2(null, workLoop, null, isAsync), 
                isReplayingFailedUnitOfWork = !1, originalReplayError = null, hasCaughtError() ? (clearCaughtError(), 
                4 & failedUnitOfWork.mode && recordElapsedActualRenderTime(failedUnitOfWork), stopBaseRenderTimerIfRunning()) : nextUnitOfWork = failedUnitOfWork;
            } else warning(!1, "Could not replay rendering after an error. This is likely a bug in React. Please file an issue.");
        }, rethrowOriginalError = function() {
            throw originalReplayError;
        };
        var firstScheduledRoot = null, lastScheduledRoot = null, callbackExpirationTime = 0, callbackID = void 0, isRendering = !1, nextFlushedRoot = null, nextFlushedExpirationTime = 0, lowestPendingInteractiveExpirationTime = 0, deadlineDidExpire = !1, hasUnhandledError = !1, unhandledError = null, deadline = null, isBatchingUpdates = !1, isUnbatchingUpdates = !1, isBatchingInteractiveUpdates = !1, completedBatches = null, NESTED_UPDATE_LIMIT = 1e3, nestedUpdateCount = 0;
        function scheduleCallbackWithExpiration(expirationTime) {
            if (0 !== callbackExpirationTime) {
                if (expirationTime > callbackExpirationTime) return;
                null !== callbackID && cancelDeferredCallback(callbackID);
            } else supportsUserTiming && !isWaitingForCallback && (isWaitingForCallback = !0, 
            beginMark("(Waiting for async callback...)"));
            var currentMs = now() - originalStartTimeMs, expirationMs = expirationTimeToMs(expirationTime);
            callbackExpirationTime = expirationTime, callbackID = scheduleDeferredCallback(performAsyncWork, {
                timeout: expirationMs - currentMs
            });
        }
        function requestWork(root, expirationTime) {
            !function(root, expirationTime) {
                if (null === root.nextScheduledRoot) root.remainingExpirationTime = expirationTime, 
                null === lastScheduledRoot ? (firstScheduledRoot = lastScheduledRoot = root, root.nextScheduledRoot = root) : (lastScheduledRoot.nextScheduledRoot = root, 
                (lastScheduledRoot = root).nextScheduledRoot = firstScheduledRoot); else {
                    var remainingExpirationTime = root.remainingExpirationTime;
                    (0 === remainingExpirationTime || expirationTime < remainingExpirationTime) && (root.remainingExpirationTime = expirationTime);
                }
            }(root, expirationTime), isRendering || (isBatchingUpdates ? isUnbatchingUpdates && (nextFlushedRoot = root, 
            nextFlushedExpirationTime = 1, performWorkOnRoot(root, 1, !1)) : 1 === expirationTime ? performSyncWork() : scheduleCallbackWithExpiration(expirationTime));
        }
        function findHighestPriorityRoot() {
            var highestPriorityWork = 0, highestPriorityRoot = null;
            if (null !== lastScheduledRoot) for (var previousScheduledRoot = lastScheduledRoot, root = firstScheduledRoot; null !== root; ) {
                var remainingExpirationTime = root.remainingExpirationTime;
                if (0 === remainingExpirationTime) {
                    if ((null === previousScheduledRoot || null === lastScheduledRoot) && invariant(!1, "Should have a previous and last root. This error is likely caused by a bug in React. Please file an issue."), 
                    root === root.nextScheduledRoot) {
                        root.nextScheduledRoot = null, firstScheduledRoot = lastScheduledRoot = null;
                        break;
                    }
                    if (root === firstScheduledRoot) {
                        var next = root.nextScheduledRoot;
                        firstScheduledRoot = next, lastScheduledRoot.nextScheduledRoot = next, root.nextScheduledRoot = null;
                    } else {
                        if (root === lastScheduledRoot) {
                            (lastScheduledRoot = previousScheduledRoot).nextScheduledRoot = firstScheduledRoot, 
                            root.nextScheduledRoot = null;
                            break;
                        }
                        previousScheduledRoot.nextScheduledRoot = root.nextScheduledRoot, root.nextScheduledRoot = null;
                    }
                    root = previousScheduledRoot.nextScheduledRoot;
                } else {
                    if ((0 === highestPriorityWork || remainingExpirationTime < highestPriorityWork) && (highestPriorityWork = remainingExpirationTime, 
                    highestPriorityRoot = root), root === lastScheduledRoot) break;
                    previousScheduledRoot = root, root = root.nextScheduledRoot;
                }
            }
            null !== nextFlushedRoot && nextFlushedRoot === highestPriorityRoot && 1 === highestPriorityWork ? nestedUpdateCount++ : nestedUpdateCount = 0, 
            nextFlushedRoot = highestPriorityRoot, nextFlushedExpirationTime = highestPriorityWork;
        }
        function performAsyncWork(dl) {
            performWork(0, !0, dl);
        }
        function performSyncWork() {
            performWork(1, !1, null);
        }
        function performWork(minExpirationTime, isAsync, dl) {
            (deadline = dl, findHighestPriorityRoot(), resumeActualRenderTimerIfPaused(), null !== deadline) && function(didExpire, expirationTime) {
                supportsUserTiming && (isWaitingForCallback = !1, endMark("(Waiting for async callback... will force flush in " + expirationTime + " ms)", "(Waiting for async callback...)", didExpire ? "React was blocked by main thread" : null));
            }(nextFlushedExpirationTime < recalculateCurrentTime(), expirationTimeToMs(nextFlushedExpirationTime));
            if (isAsync) for (;null !== nextFlushedRoot && 0 !== nextFlushedExpirationTime && (0 === minExpirationTime || minExpirationTime >= nextFlushedExpirationTime) && (!deadlineDidExpire || recalculateCurrentTime() >= nextFlushedExpirationTime); ) recalculateCurrentTime(), 
            performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, !deadlineDidExpire), 
            findHighestPriorityRoot(); else for (;null !== nextFlushedRoot && 0 !== nextFlushedExpirationTime && (0 === minExpirationTime || minExpirationTime >= nextFlushedExpirationTime); ) performWorkOnRoot(nextFlushedRoot, nextFlushedExpirationTime, !1), 
            findHighestPriorityRoot();
            null !== deadline && (callbackExpirationTime = 0, callbackID = null), 0 !== nextFlushedExpirationTime && scheduleCallbackWithExpiration(nextFlushedExpirationTime), 
            deadline = null, deadlineDidExpire = !1, finishRendering();
        }
        function flushRoot(root, expirationTime) {
            isRendering && invariant(!1, "work.commit(): Cannot commit while already rendering. This likely means you attempted to commit from inside a lifecycle method."), 
            nextFlushedRoot = root, nextFlushedExpirationTime = expirationTime, performWorkOnRoot(root, expirationTime, !1), 
            performSyncWork(), finishRendering();
        }
        function finishRendering() {
            if (nestedUpdateCount = 0, null !== completedBatches) {
                var batches = completedBatches;
                completedBatches = null;
                for (var i = 0; i < batches.length; i++) {
                    var batch = batches[i];
                    try {
                        batch._onComplete();
                    } catch (error) {
                        hasUnhandledError || (hasUnhandledError = !0, unhandledError = error);
                    }
                }
            }
            if (hasUnhandledError) {
                var error = unhandledError;
                throw unhandledError = null, hasUnhandledError = !1, error;
            }
        }
        function performWorkOnRoot(root, expirationTime, isAsync) {
            if (isRendering && invariant(!1, "performWorkOnRoot was called recursively. This error is likely caused by a bug in React. Please file an issue."), 
            isRendering = !0, isAsync) {
                var _finishedWork = root.finishedWork;
                null !== _finishedWork ? completeRoot(root, _finishedWork, expirationTime) : null !== (_finishedWork = renderRoot(root, expirationTime, !0)) && (shouldYield() ? (root.finishedWork = _finishedWork, 
                pauseActualRenderTimerIfRunning()) : completeRoot(root, _finishedWork, expirationTime));
            } else {
                var finishedWork = root.finishedWork;
                (null !== finishedWork || null !== (finishedWork = renderRoot(root, expirationTime, !1))) && completeRoot(root, finishedWork, expirationTime);
            }
            isRendering = !1;
        }
        function completeRoot(root, finishedWork, expirationTime) {
            var firstBatch = root.firstBatch;
            if (null !== firstBatch && firstBatch._expirationTime <= expirationTime && (null === completedBatches ? completedBatches = [ firstBatch ] : completedBatches.push(firstBatch), 
            firstBatch._defer)) return root.finishedWork = finishedWork, void (root.remainingExpirationTime = 0);
            root.finishedWork = null, root.remainingExpirationTime = commitRoot(finishedWork);
        }
        function shouldYield() {
            return null !== deadline && (!(deadline.timeRemaining() > 1) && (deadlineDidExpire = !0, 
            !0));
        }
        function onUncaughtError(error) {
            null === nextFlushedRoot && invariant(!1, "Should be working on a root. This error is likely caused by a bug in React. Please file an issue."), 
            nextFlushedRoot.remainingExpirationTime = 0, hasUnhandledError || (hasUnhandledError = !0, 
            unhandledError = error);
        }
        function batchedUpdates$1(fn, a) {
            var previousIsBatchingUpdates = isBatchingUpdates;
            isBatchingUpdates = !0;
            try {
                return fn(a);
            } finally {
                (isBatchingUpdates = previousIsBatchingUpdates) || isRendering || performSyncWork();
            }
        }
        function unbatchedUpdates(fn, a) {
            if (isBatchingUpdates && !isUnbatchingUpdates) {
                isUnbatchingUpdates = !0;
                try {
                    return fn(a);
                } finally {
                    isUnbatchingUpdates = !1;
                }
            }
            return fn(a);
        }
        function flushSync(fn, a) {
            isRendering && invariant(!1, "flushSync was called from inside a lifecycle method. It cannot be called when React is already rendering.");
            var previousIsBatchingUpdates = isBatchingUpdates;
            isBatchingUpdates = !0;
            try {
                return syncUpdates(fn, a);
            } finally {
                isBatchingUpdates = previousIsBatchingUpdates, performSyncWork();
            }
        }
        function interactiveUpdates$1(fn, a, b) {
            if (isBatchingInteractiveUpdates) return fn(a, b);
            isBatchingUpdates || isRendering || 0 === lowestPendingInteractiveExpirationTime || (performWork(lowestPendingInteractiveExpirationTime, !1, null), 
            lowestPendingInteractiveExpirationTime = 0);
            var previousIsBatchingInteractiveUpdates = isBatchingInteractiveUpdates, previousIsBatchingUpdates = isBatchingUpdates;
            isBatchingInteractiveUpdates = !0, isBatchingUpdates = !0;
            try {
                return fn(a, b);
            } finally {
                isBatchingInteractiveUpdates = previousIsBatchingInteractiveUpdates, (isBatchingUpdates = previousIsBatchingUpdates) || isRendering || performSyncWork();
            }
        }
        function flushControlled(fn) {
            var previousIsBatchingUpdates = isBatchingUpdates;
            isBatchingUpdates = !0;
            try {
                syncUpdates(fn);
            } finally {
                (isBatchingUpdates = previousIsBatchingUpdates) || isRendering || performWork(1, !1, null);
            }
        }
        var didWarnAboutNestedUpdates = void 0;
        function getContextForSubtree(parentComponent) {
            if (!parentComponent) return emptyObject;
            var fiber = get(parentComponent), parentContext = function(fiber) {
                isFiberMounted(fiber) && 2 === fiber.tag || invariant(!1, "Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
                for (var node = fiber; 3 !== node.tag; ) {
                    if (isContextProvider(node)) return node.stateNode.__reactInternalMemoizedMergedChildContext;
                    var parent = node.return;
                    parent || invariant(!1, "Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue."), 
                    node = parent;
                }
                return node.stateNode.context;
            }(fiber);
            return isContextProvider(fiber) ? processChildContext(fiber, parentContext) : parentContext;
        }
        function updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, callback) {
            var current = container.current;
            ReactFiberInstrumentation_1.debugTool && (null === current.alternate ? ReactFiberInstrumentation_1.debugTool.onMountContainer(container) : null === element ? ReactFiberInstrumentation_1.debugTool.onUnmountContainer(container) : ReactFiberInstrumentation_1.debugTool.onUpdateContainer(container));
            var context = getContextForSubtree(parentComponent);
            return null === container.context ? container.context = context : container.pendingContext = context, 
            function(current, element, expirationTime, callback) {
                "render" !== ReactDebugCurrentFiber.phase || null === ReactDebugCurrentFiber.current || didWarnAboutNestedUpdates || (didWarnAboutNestedUpdates = !0, 
                warning(!1, "Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.\n\nCheck the render method of %s.", getComponentName(ReactDebugCurrentFiber.current) || "Unknown"));
                var update = createUpdate(expirationTime);
                return update.payload = {
                    element: element
                }, null !== (callback = void 0 === callback ? null : callback) && ("function" != typeof callback && warning(!1, "render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", callback), 
                update.callback = callback), enqueueUpdate(current, update, expirationTime), scheduleWork$1(current, expirationTime), 
                expirationTime;
            }(current, element, expirationTime, callback);
        }
        function findHostInstance(component) {
            var fiber = get(component);
            void 0 === fiber && ("function" == typeof component.render ? invariant(!1, "Unable to find node on an unmounted component.") : invariant(!1, "Argument appears to not be a ReactComponent. Keys: %s", Object.keys(component)));
            var hostFiber = findCurrentHostFiber(fiber);
            return null === hostFiber ? null : hostFiber.stateNode;
        }
        function createContainer(containerInfo, isAsync, hydrate) {
            return createFiberRoot(containerInfo, isAsync, hydrate);
        }
        function updateContainer(element, container, parentComponent, callback) {
            var current = container.current;
            return updateContainerAtExpirationTime(element, container, parentComponent, computeExpirationForFiber(recalculateCurrentTime(), current), callback);
        }
        function getPublicRootInstance(container) {
            var containerFiber = container.current;
            if (!containerFiber.child) return null;
            switch (containerFiber.child.tag) {
              case 5:
              default:
                return containerFiber.child.stateNode;
            }
        }
        function findHostInstanceWithNoPortals(fiber) {
            var hostFiber = function(parent) {
                var currentParent = findCurrentFiberUsingSlowPath(parent);
                if (!currentParent) return null;
                for (var node = currentParent; ;) {
                    if (5 === node.tag || 6 === node.tag) return node;
                    if (node.child && 4 !== node.tag) node.child.return = node, node = node.child; else {
                        if (node === currentParent) return null;
                        for (;!node.sibling; ) {
                            if (!node.return || node.return === currentParent) return null;
                            node = node.return;
                        }
                        node.sibling.return = node.return, node = node.sibling;
                    }
                }
                return null;
            }(fiber);
            return null === hostFiber ? null : hostFiber.stateNode;
        }
        function injectIntoDevTools(devToolsConfig) {
            var findFiberByHostInstance = devToolsConfig.findFiberByHostInstance;
            return function(internals) {
                if ("undefined" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
                var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
                if (hook.isDisabled) return !0;
                if (!hook.supportsFiber) return warning(!1, "The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://fb.me/react-devtools"), 
                !0;
                try {
                    var rendererID = hook.inject(internals);
                    onCommitFiberRoot = catchErrors((function(root) {
                        return hook.onCommitFiberRoot(rendererID, root);
                    })), onCommitFiberUnmount = catchErrors((function(fiber) {
                        return hook.onCommitFiberUnmount(rendererID, fiber);
                    }));
                } catch (err) {
                    warning(!1, "React DevTools encountered an error: %s.", err);
                }
                return !0;
            }(_assign({}, devToolsConfig, {
                findHostInstanceByFiber: function(fiber) {
                    var hostFiber = findCurrentHostFiber(fiber);
                    return null === hostFiber ? null : hostFiber.stateNode;
                },
                findFiberByHostInstance: function(instance) {
                    return findFiberByHostInstance ? findFiberByHostInstance(instance) : null;
                }
            }));
        }
        didWarnAboutNestedUpdates = !1;
        var DOMRenderer = Object.freeze({
            updateContainerAtExpirationTime: updateContainerAtExpirationTime,
            createContainer: createContainer,
            updateContainer: updateContainer,
            flushRoot: flushRoot,
            requestWork: requestWork,
            computeUniqueAsyncExpiration: computeUniqueAsyncExpiration,
            batchedUpdates: batchedUpdates$1,
            unbatchedUpdates: unbatchedUpdates,
            deferredUpdates: deferredUpdates,
            syncUpdates: syncUpdates,
            interactiveUpdates: interactiveUpdates$1,
            flushInteractiveUpdates: function() {
                isRendering || 0 === lowestPendingInteractiveExpirationTime || (performWork(lowestPendingInteractiveExpirationTime, !1, null), 
                lowestPendingInteractiveExpirationTime = 0);
            },
            flushControlled: flushControlled,
            flushSync: flushSync,
            getPublicRootInstance: getPublicRootInstance,
            findHostInstance: findHostInstance,
            findHostInstanceWithNoPortals: findHostInstanceWithNoPortals,
            injectIntoDevTools: injectIntoDevTools
        });
        function createPortal$1(children, containerInfo, implementation) {
            var key = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
            return {
                $$typeof: REACT_PORTAL_TYPE,
                key: null == key ? null : "" + key,
                children: children,
                containerInfo: containerInfo,
                implementation: implementation
            };
        }
        var topLevelUpdateWarnings, warnOnInvalidCallback, didWarnAboutUnstableCreatePortal = !1;
        function ReactBatch(root) {
            var expirationTime = computeUniqueAsyncExpiration();
            this._expirationTime = expirationTime, this._root = root, this._next = null, this._callbacks = null, 
            this._didComplete = !1, this._hasChildren = !1, this._children = null, this._defer = !0;
        }
        function ReactWork() {
            this._callbacks = null, this._didCommit = !1, this._onCommit = this._onCommit.bind(this);
        }
        function ReactRoot(container, isAsync, hydrate) {
            var root = createContainer(container, isAsync, hydrate);
            this._internalRoot = root;
        }
        function isValidContainer(node) {
            return !(!node || 1 !== node.nodeType && 9 !== node.nodeType && 11 !== node.nodeType && (8 !== node.nodeType || " react-mount-point-unstable " !== node.nodeValue));
        }
        function getReactRootElementInContainer(container) {
            return container ? 9 === container.nodeType ? container.documentElement : container.firstChild : null;
        }
        "function" == typeof Map && null != Map.prototype && "function" == typeof Map.prototype.forEach && "function" == typeof Set && null != Set.prototype && "function" == typeof Set.prototype.clear && "function" == typeof Set.prototype.forEach || warning(!1, "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"), 
        topLevelUpdateWarnings = function(container) {
            if (container._reactRootContainer && 8 !== container.nodeType) {
                var hostInstance = findHostInstanceWithNoPortals(container._reactRootContainer._internalRoot.current);
                hostInstance && hostInstance.parentNode !== container && warning(!1, "render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
            }
            var isRootRenderedBySomeReact = !!container._reactRootContainer, rootEl = getReactRootElementInContainer(container);
            !(!rootEl || !getInstanceFromNode$1(rootEl)) && !isRootRenderedBySomeReact && warning(!1, "render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), 
            1 === container.nodeType && container.tagName && "BODY" === container.tagName.toUpperCase() && warning(!1, "render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
        }, warnOnInvalidCallback = function(callback, callerName) {
            null !== callback && "function" != typeof callback && warning(!1, "%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", callerName, callback);
        }, injection$2.injectFiberControlledHostComponent(ReactDOMFiberComponent), ReactBatch.prototype.render = function(children) {
            this._defer || invariant(!1, "batch.render: Cannot render a batch that already committed."), 
            this._hasChildren = !0, this._children = children;
            var internalRoot = this._root._internalRoot, expirationTime = this._expirationTime, work = new ReactWork;
            return updateContainerAtExpirationTime(children, internalRoot, null, expirationTime, work._onCommit), 
            work;
        }, ReactBatch.prototype.then = function(onComplete) {
            if (this._didComplete) onComplete(); else {
                var callbacks = this._callbacks;
                null === callbacks && (callbacks = this._callbacks = []), callbacks.push(onComplete);
            }
        }, ReactBatch.prototype.commit = function() {
            var internalRoot = this._root._internalRoot, firstBatch = internalRoot.firstBatch;
            if (this._defer && null !== firstBatch || invariant(!1, "batch.commit: Cannot commit a batch multiple times."), 
            !this._hasChildren) return this._next = null, void (this._defer = !1);
            var expirationTime = this._expirationTime;
            if (firstBatch !== this) {
                this._hasChildren && (expirationTime = this._expirationTime = firstBatch._expirationTime, 
                this.render(this._children));
                for (var previous = null, batch = firstBatch; batch !== this; ) previous = batch, 
                batch = batch._next;
                null === previous && invariant(!1, "batch.commit: Cannot commit a batch multiple times."), 
                previous._next = batch._next, this._next = firstBatch, firstBatch = internalRoot.firstBatch = this;
            }
            this._defer = !1, flushRoot(internalRoot, expirationTime);
            var next = this._next;
            this._next = null, null !== (firstBatch = internalRoot.firstBatch = next) && firstBatch._hasChildren && firstBatch.render(firstBatch._children);
        }, ReactBatch.prototype._onComplete = function() {
            if (!this._didComplete) {
                this._didComplete = !0;
                var callbacks = this._callbacks;
                if (null !== callbacks) for (var i = 0; i < callbacks.length; i++) {
                    (0, callbacks[i])();
                }
            }
        }, ReactWork.prototype.then = function(onCommit) {
            if (this._didCommit) onCommit(); else {
                var callbacks = this._callbacks;
                null === callbacks && (callbacks = this._callbacks = []), callbacks.push(onCommit);
            }
        }, ReactWork.prototype._onCommit = function() {
            if (!this._didCommit) {
                this._didCommit = !0;
                var callbacks = this._callbacks;
                if (null !== callbacks) for (var i = 0; i < callbacks.length; i++) {
                    var _callback2 = callbacks[i];
                    "function" != typeof _callback2 && invariant(!1, "Invalid argument passed as callback. Expected a function. Instead received: %s", _callback2), 
                    _callback2();
                }
            }
        }, ReactRoot.prototype.render = function(children, callback) {
            var root = this._internalRoot, work = new ReactWork;
            return warnOnInvalidCallback(callback = void 0 === callback ? null : callback, "render"), 
            null !== callback && work.then(callback), updateContainer(children, root, null, work._onCommit), 
            work;
        }, ReactRoot.prototype.unmount = function(callback) {
            var root = this._internalRoot, work = new ReactWork;
            return warnOnInvalidCallback(callback = void 0 === callback ? null : callback, "render"), 
            null !== callback && work.then(callback), updateContainer(null, root, null, work._onCommit), 
            work;
        }, ReactRoot.prototype.legacy_renderSubtreeIntoContainer = function(parentComponent, children, callback) {
            var root = this._internalRoot, work = new ReactWork;
            return warnOnInvalidCallback(callback = void 0 === callback ? null : callback, "render"), 
            null !== callback && work.then(callback), updateContainer(children, root, parentComponent, work._onCommit), 
            work;
        }, ReactRoot.prototype.createBatch = function() {
            var batch = new ReactBatch(this), expirationTime = batch._expirationTime, internalRoot = this._internalRoot, firstBatch = internalRoot.firstBatch;
            if (null === firstBatch) internalRoot.firstBatch = batch, batch._next = null; else {
                for (var insertAfter = null, insertBefore = firstBatch; null !== insertBefore && insertBefore._expirationTime <= expirationTime; ) insertAfter = insertBefore, 
                insertBefore = insertBefore._next;
                batch._next = insertBefore, null !== insertAfter && (insertAfter._next = batch);
            }
            return batch;
        }, injection$3_injectRenderer(DOMRenderer);
        var warnedAboutHydrateAPI = !1;
        function legacyCreateRootFromDOMContainer(container, forceHydrate) {
            var shouldHydrate = forceHydrate || function(container) {
                var rootElement = getReactRootElementInContainer(container);
                return !(!rootElement || 1 !== rootElement.nodeType || !rootElement.hasAttribute("data-reactroot"));
            }(container);
            if (!shouldHydrate) for (var warned = !1, rootSibling = void 0; rootSibling = container.lastChild; ) !warned && 1 === rootSibling.nodeType && rootSibling.hasAttribute("data-reactroot") && (warned = !0, 
            warning(!1, "render(): Target node has markup rendered by React, but there are unrelated nodes as well. This is most commonly caused by white-space inserted around server-rendered markup.")), 
            container.removeChild(rootSibling);
            !shouldHydrate || forceHydrate || warnedAboutHydrateAPI || (warnedAboutHydrateAPI = !0, 
            lowPriorityWarning$1(!1, "render(): Calling ReactDOM.render() to hydrate server-rendered markup will stop working in React v17. Replace the ReactDOM.render() call with ReactDOM.hydrate() if you want React to attach to the server HTML."));
            return new ReactRoot(container, !1, shouldHydrate);
        }
        function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
            isValidContainer(container) || invariant(!1, "Target container is not a DOM element."), 
            topLevelUpdateWarnings(container);
            var root = container._reactRootContainer;
            if (root) {
                if ("function" == typeof callback) {
                    var _originalCallback = callback;
                    callback = function() {
                        var instance = getPublicRootInstance(root._internalRoot);
                        _originalCallback.call(instance);
                    };
                }
                null != parentComponent ? root.legacy_renderSubtreeIntoContainer(parentComponent, children, callback) : root.render(children, callback);
            } else {
                if (root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate), 
                "function" == typeof callback) {
                    var originalCallback = callback;
                    callback = function() {
                        var instance = getPublicRootInstance(root._internalRoot);
                        originalCallback.call(instance);
                    };
                }
                unbatchedUpdates((function() {
                    null != parentComponent ? root.legacy_renderSubtreeIntoContainer(parentComponent, children, callback) : root.render(children, callback);
                }));
            }
            return getPublicRootInstance(root._internalRoot);
        }
        function createPortal(children, container) {
            var key = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
            return isValidContainer(container) || invariant(!1, "Target container is not a DOM element."), 
            createPortal$1(children, container, null, key);
        }
        var ReactDOM = {
            createPortal: createPortal,
            findDOMNode: function(componentOrElement) {
                var owner = ReactCurrentOwner.current;
                null !== owner && null !== owner.stateNode && (owner.stateNode._warnedAboutRefsInRender || warning(!1, "%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", getComponentName(owner) || "A component"), 
                owner.stateNode._warnedAboutRefsInRender = !0);
                return null == componentOrElement ? null : 1 === componentOrElement.nodeType ? componentOrElement : findHostInstance(componentOrElement);
            },
            hydrate: function(element, container, callback) {
                return legacyRenderSubtreeIntoContainer(null, element, container, !0, callback);
            },
            render: function(element, container, callback) {
                return legacyRenderSubtreeIntoContainer(null, element, container, !1, callback);
            },
            unstable_renderSubtreeIntoContainer: function(parentComponent, element, containerNode, callback) {
                return (null == parentComponent || void 0 === parentComponent._reactInternalFiber) && invariant(!1, "parentComponent must be a valid React Component"), 
                legacyRenderSubtreeIntoContainer(parentComponent, element, containerNode, !1, callback);
            },
            unmountComponentAtNode: function(container) {
                if (isValidContainer(container) || invariant(!1, "unmountComponentAtNode(...): Target container is not a DOM element."), 
                container._reactRootContainer) {
                    var rootEl = getReactRootElementInContainer(container);
                    return rootEl && !getInstanceFromNode$1(rootEl) && warning(!1, "unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React."), 
                    unbatchedUpdates((function() {
                        legacyRenderSubtreeIntoContainer(null, null, container, !1, (function() {
                            container._reactRootContainer = null;
                        }));
                    })), !0;
                }
                var _rootEl = getReactRootElementInContainer(container), hasNonRootReactChild = !(!_rootEl || !getInstanceFromNode$1(_rootEl)), isContainerReactRoot = 1 === container.nodeType && isValidContainer(container.parentNode) && !!container.parentNode._reactRootContainer;
                return hasNonRootReactChild && warning(!1, "unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", isContainerReactRoot ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component."), 
                !1;
            },
            unstable_createPortal: function() {
                return didWarnAboutUnstableCreatePortal || (didWarnAboutUnstableCreatePortal = !0, 
                lowPriorityWarning$1(!1, 'The ReactDOM.unstable_createPortal() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactDOM.createPortal() instead. It has the exact same API, but without the "unstable_" prefix.')), 
                createPortal.apply(void 0, arguments);
            },
            unstable_batchedUpdates: batchedUpdates$1,
            unstable_deferredUpdates: deferredUpdates,
            unstable_interactiveUpdates: interactiveUpdates$1,
            flushSync: flushSync,
            unstable_flushControlled: flushControlled,
            __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
                EventPluginHub: EventPluginHub,
                EventPluginRegistry: EventPluginRegistry,
                EventPropagators: EventPropagators,
                ReactControlledComponent: ReactControlledComponent,
                ReactDOMComponentTree: ReactDOMComponentTree,
                ReactDOMEventListener: ReactDOMEventListener
            },
            unstable_createRoot: function(container, options) {
                return new ReactRoot(container, !0, null != options && !0 === options.hydrate);
            }
        };
        if (!injectIntoDevTools({
            findFiberByHostInstance: getClosestInstanceFromNode,
            bundleType: 1,
            version: "16.4.2",
            rendererPackageName: "react-dom"
        }) && ExecutionEnvironment.canUseDOM && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && -1 === navigator.userAgent.indexOf("Edge") || navigator.userAgent.indexOf("Firefox") > -1)) {
            var protocol = window.location.protocol;
            /^(https?|file):$/.test(protocol);
        }
        var ReactDOM$2 = Object.freeze({
            default: ReactDOM
        }), ReactDOM$3 = ReactDOM$2 && ReactDOM || ReactDOM$2, reactDom = ReactDOM$3.default ? ReactDOM$3.default : ReactDOM$3;
        module.exports = reactDom;
    })();
}, function(module, exports, __webpack_require__) {
    "use strict";
    var canUseDOM = !("undefined" == typeof window || !window.document || !window.document.createElement), ExecutionEnvironment = {
        canUseDOM: canUseDOM,
        canUseWorkers: "undefined" != typeof Worker,
        canUseEventListeners: canUseDOM && !(!window.addEventListener && !window.attachEvent),
        canUseViewport: canUseDOM && !!window.screen,
        isInWorker: !canUseDOM
    };
    module.exports = ExecutionEnvironment;
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = function(doc) {
        if (void 0 === (doc = doc || ("undefined" != typeof document ? document : void 0))) return null;
        try {
            return doc.activeElement || doc.body;
        } catch (e) {
            return doc.body;
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function is(x, y) {
        return x === y ? 0 !== x || 0 !== y || 1 / x == 1 / y : x != x && y != y;
    }
    module.exports = function(objA, objB) {
        if (is(objA, objB)) return !0;
        if ("object" != typeof objA || null === objA || "object" != typeof objB || null === objB) return !1;
        var keysA = Object.keys(objA), keysB = Object.keys(objB);
        if (keysA.length !== keysB.length) return !1;
        for (var i = 0; i < keysA.length; i++) if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) return !1;
        return !0;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isTextNode = __webpack_require__(16);
    module.exports = function containsNode(outerNode, innerNode) {
        return !(!outerNode || !innerNode) && (outerNode === innerNode || !isTextNode(outerNode) && (isTextNode(innerNode) ? containsNode(outerNode, innerNode.parentNode) : "contains" in outerNode ? outerNode.contains(innerNode) : !!outerNode.compareDocumentPosition && !!(16 & outerNode.compareDocumentPosition(innerNode))));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var isNode = __webpack_require__(17);
    module.exports = function(object) {
        return isNode(object) && 3 == object.nodeType;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = function(object) {
        var defaultView = (object ? object.ownerDocument || object : document).defaultView || window;
        return !(!object || !("function" == typeof defaultView.Node ? object instanceof defaultView.Node : "object" == typeof object && "number" == typeof object.nodeType && "string" == typeof object.nodeName));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var hyphenate = __webpack_require__(19), msPattern = /^ms-/;
    module.exports = function(string) {
        return hyphenate(string).replace(msPattern, "-ms-");
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var _uppercasePattern = /([A-Z])/g;
    module.exports = function(string) {
        return string.replace(_uppercasePattern, "-$1").toLowerCase();
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var camelize = __webpack_require__(21), msPattern = /^-ms-/;
    module.exports = function(string) {
        return camelize(string.replace(msPattern, "ms-"));
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var _hyphenPattern = /-(.)/g;
    module.exports = function(string) {
        return string.replace(_hyphenPattern, (function(_, character) {
            return character.toUpperCase();
        }));
    };
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(module, exports, __webpack_require__) {
    module.exports = {
        default: __webpack_require__(59),
        __esModule: !0
    };
}, function(module, exports, __webpack_require__) {
    __webpack_require__(60);
    var $Object = __webpack_require__(63).Object;
    module.exports = function(it, key, desc) {
        return $Object.defineProperty(it, key, desc);
    };
}, function(module, exports, __webpack_require__) {
    var $export = __webpack_require__(61);
    $export($export.S + $export.F * !__webpack_require__(71), "Object", {
        defineProperty: __webpack_require__(67).f
    });
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(62), core = __webpack_require__(63), ctx = __webpack_require__(64), hide = __webpack_require__(66), has = __webpack_require__(76), $export = function(type, name, source) {
        var key, own, out, IS_FORCED = type & $export.F, IS_GLOBAL = type & $export.G, IS_STATIC = type & $export.S, IS_PROTO = type & $export.P, IS_BIND = type & $export.B, IS_WRAP = type & $export.W, exports = IS_GLOBAL ? core : core[name] || (core[name] = {}), expProto = exports.prototype, target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {}).prototype;
        for (key in IS_GLOBAL && (source = name), source) (own = !IS_FORCED && target && void 0 !== target[key]) && has(exports, key) || (out = own ? target[key] : source[key], 
        exports[key] = IS_GLOBAL && "function" != typeof target[key] ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? function(C) {
            var F = function(a, b, c) {
                if (this instanceof C) {
                    switch (arguments.length) {
                      case 0:
                        return new C;

                      case 1:
                        return new C(a);

                      case 2:
                        return new C(a, b);
                    }
                    return new C(a, b, c);
                }
                return C.apply(this, arguments);
            };
            return F.prototype = C.prototype, F;
        }(out) : IS_PROTO && "function" == typeof out ? ctx(Function.call, out) : out, IS_PROTO && ((exports.virtual || (exports.virtual = {}))[key] = out, 
        type & $export.R && expProto && !expProto[key] && hide(expProto, key, out)));
    };
    $export.F = 1, $export.G = 2, $export.S = 4, $export.P = 8, $export.B = 16, $export.W = 32, 
    $export.U = 64, $export.R = 128, module.exports = $export;
}, function(module, exports) {
    var global = module.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = global);
}, function(module, exports) {
    var core = module.exports = {
        version: "2.5.7"
    };
    "number" == typeof __e && (__e = core);
}, function(module, exports, __webpack_require__) {
    var aFunction = __webpack_require__(65);
    module.exports = function(fn, that, length) {
        if (aFunction(fn), void 0 === that) return fn;
        switch (length) {
          case 1:
            return function(a) {
                return fn.call(that, a);
            };

          case 2:
            return function(a, b) {
                return fn.call(that, a, b);
            };

          case 3:
            return function(a, b, c) {
                return fn.call(that, a, b, c);
            };
        }
        return function() {
            return fn.apply(that, arguments);
        };
    };
}, function(module, exports) {
    module.exports = function(it) {
        if ("function" != typeof it) throw TypeError(it + " is not a function!");
        return it;
    };
}, function(module, exports, __webpack_require__) {
    var dP = __webpack_require__(67), createDesc = __webpack_require__(75);
    module.exports = __webpack_require__(71) ? function(object, key, value) {
        return dP.f(object, key, createDesc(1, value));
    } : function(object, key, value) {
        return object[key] = value, object;
    };
}, function(module, exports, __webpack_require__) {
    var anObject = __webpack_require__(68), IE8_DOM_DEFINE = __webpack_require__(70), toPrimitive = __webpack_require__(74), dP = Object.defineProperty;
    exports.f = __webpack_require__(71) ? Object.defineProperty : function(O, P, Attributes) {
        if (anObject(O), P = toPrimitive(P, !0), anObject(Attributes), IE8_DOM_DEFINE) try {
            return dP(O, P, Attributes);
        } catch (e) {}
        if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported!");
        return "value" in Attributes && (O[P] = Attributes.value), O;
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(69);
    module.exports = function(it) {
        if (!isObject(it)) throw TypeError(it + " is not an object!");
        return it;
    };
}, function(module, exports) {
    module.exports = function(it) {
        return "object" == typeof it ? null !== it : "function" == typeof it;
    };
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(71) && !__webpack_require__(72)((function() {
        return 7 != Object.defineProperty(__webpack_require__(73)("div"), "a", {
            get: function() {
                return 7;
            }
        }).a;
    }));
}, function(module, exports, __webpack_require__) {
    module.exports = !__webpack_require__(72)((function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7;
            }
        }).a;
    }));
}, function(module, exports) {
    module.exports = function(exec) {
        try {
            return !!exec();
        } catch (e) {
            return !0;
        }
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(69), document = __webpack_require__(62).document, is = isObject(document) && isObject(document.createElement);
    module.exports = function(it) {
        return is ? document.createElement(it) : {};
    };
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(69);
    module.exports = function(it, S) {
        if (!isObject(it)) return it;
        var fn, val;
        if (S && "function" == typeof (fn = it.toString) && !isObject(val = fn.call(it))) return val;
        if ("function" == typeof (fn = it.valueOf) && !isObject(val = fn.call(it))) return val;
        if (!S && "function" == typeof (fn = it.toString) && !isObject(val = fn.call(it))) return val;
        throw TypeError("Can't convert object to primitive value");
    };
}, function(module, exports) {
    module.exports = function(bitmap, value) {
        return {
            enumerable: !(1 & bitmap),
            configurable: !(2 & bitmap),
            writable: !(4 & bitmap),
            value: value
        };
    };
}, function(module, exports) {
    var hasOwnProperty = {}.hasOwnProperty;
    module.exports = function(it, key) {
        return hasOwnProperty.call(it, key);
    };
}, , , , , , function(module, exports, __webpack_require__) {
    var $keys = __webpack_require__(83), enumBugKeys = __webpack_require__(96);
    module.exports = Object.keys || function(O) {
        return $keys(O, enumBugKeys);
    };
}, function(module, exports, __webpack_require__) {
    var has = __webpack_require__(76), toIObject = __webpack_require__(84), arrayIndexOf = __webpack_require__(88)(!1), IE_PROTO = __webpack_require__(92)("IE_PROTO");
    module.exports = function(object, names) {
        var key, O = toIObject(object), i = 0, result = [];
        for (key in O) key != IE_PROTO && has(O, key) && result.push(key);
        for (;names.length > i; ) has(O, key = names[i++]) && (~arrayIndexOf(result, key) || result.push(key));
        return result;
    };
}, function(module, exports, __webpack_require__) {
    var IObject = __webpack_require__(85), defined = __webpack_require__(87);
    module.exports = function(it) {
        return IObject(defined(it));
    };
}, function(module, exports, __webpack_require__) {
    var cof = __webpack_require__(86);
    module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
        return "String" == cof(it) ? it.split("") : Object(it);
    };
}, function(module, exports) {
    var toString = {}.toString;
    module.exports = function(it) {
        return toString.call(it).slice(8, -1);
    };
}, function(module, exports) {
    module.exports = function(it) {
        if (null == it) throw TypeError("Can't call method on  " + it);
        return it;
    };
}, function(module, exports, __webpack_require__) {
    var toIObject = __webpack_require__(84), toLength = __webpack_require__(89), toAbsoluteIndex = __webpack_require__(91);
    module.exports = function(IS_INCLUDES) {
        return function($this, el, fromIndex) {
            var value, O = toIObject($this), length = toLength(O.length), index = toAbsoluteIndex(fromIndex, length);
            if (IS_INCLUDES && el != el) {
                for (;length > index; ) if ((value = O[index++]) != value) return !0;
            } else for (;length > index; index++) if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
            return !IS_INCLUDES && -1;
        };
    };
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(90), min = Math.min;
    module.exports = function(it) {
        return it > 0 ? min(toInteger(it), 9007199254740991) : 0;
    };
}, function(module, exports) {
    var ceil = Math.ceil, floor = Math.floor;
    module.exports = function(it) {
        return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
    };
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(90), max = Math.max, min = Math.min;
    module.exports = function(index, length) {
        return (index = toInteger(index)) < 0 ? max(index + length, 0) : min(index, length);
    };
}, function(module, exports, __webpack_require__) {
    var shared = __webpack_require__(93)("keys"), uid = __webpack_require__(95);
    module.exports = function(key) {
        return shared[key] || (shared[key] = uid(key));
    };
}, function(module, exports, __webpack_require__) {
    var core = __webpack_require__(63), global = __webpack_require__(62), store = global["__core-js_shared__"] || (global["__core-js_shared__"] = {});
    (module.exports = function(key, value) {
        return store[key] || (store[key] = void 0 !== value ? value : {});
    })("versions", []).push({
        version: core.version,
        mode: __webpack_require__(94) ? "pure" : "global",
        copyright: "© 2018 Denis Pushkarev (zloirock.ru)"
    });
}, function(module, exports) {
    module.exports = !0;
}, function(module, exports) {
    var id = 0, px = Math.random();
    module.exports = function(key) {
        return "Symbol(".concat(void 0 === key ? "" : key, ")_", (++id + px).toString(36));
    };
}, function(module, exports) {
    module.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
}, function(module, exports) {
    exports.f = Object.getOwnPropertySymbols;
}, function(module, exports) {
    exports.f = {}.propertyIsEnumerable;
}, function(module, exports, __webpack_require__) {
    var defined = __webpack_require__(87);
    module.exports = function(it) {
        return Object(defined(it));
    };
}, , function(module, exports, __webpack_require__) {
    module.exports = {
        default: __webpack_require__(102),
        __esModule: !0
    };
}, function(module, exports, __webpack_require__) {
    __webpack_require__(103), module.exports = __webpack_require__(63).Object.getPrototypeOf;
}, function(module, exports, __webpack_require__) {
    var toObject = __webpack_require__(99), $getPrototypeOf = __webpack_require__(104);
    __webpack_require__(105)("getPrototypeOf", (function() {
        return function(it) {
            return $getPrototypeOf(toObject(it));
        };
    }));
}, function(module, exports, __webpack_require__) {
    var has = __webpack_require__(76), toObject = __webpack_require__(99), IE_PROTO = __webpack_require__(92)("IE_PROTO"), ObjectProto = Object.prototype;
    module.exports = Object.getPrototypeOf || function(O) {
        return O = toObject(O), has(O, IE_PROTO) ? O[IE_PROTO] : "function" == typeof O.constructor && O instanceof O.constructor ? O.constructor.prototype : O instanceof Object ? ObjectProto : null;
    };
}, function(module, exports, __webpack_require__) {
    var $export = __webpack_require__(61), core = __webpack_require__(63), fails = __webpack_require__(72);
    module.exports = function(KEY, exec) {
        var fn = (core.Object || {})[KEY] || Object[KEY], exp = {};
        exp[KEY] = exec(fn), $export($export.S + $export.F * fails((function() {
            fn(1);
        })), "Object", exp);
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    exports.__esModule = !0, exports.default = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    exports.__esModule = !0;
    var obj, _defineProperty = __webpack_require__(58), _defineProperty2 = (obj = _defineProperty) && obj.__esModule ? obj : {
        default: obj
    };
    exports.default = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), (0, _defineProperty2.default)(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }();
}, function(module, exports, __webpack_require__) {
    "use strict";
    exports.__esModule = !0;
    var obj, _typeof2 = __webpack_require__(109), _typeof3 = (obj = _typeof2) && obj.__esModule ? obj : {
        default: obj
    };
    exports.default = function(self, call) {
        if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !call || "object" !== (void 0 === call ? "undefined" : (0, _typeof3.default)(call)) && "function" != typeof call ? self : call;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    exports.__esModule = !0;
    var _iterator2 = _interopRequireDefault(__webpack_require__(110)), _symbol2 = _interopRequireDefault(__webpack_require__(128)), _typeof = "function" == typeof _symbol2.default && "symbol" == typeof _iterator2.default ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof _symbol2.default && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj;
    };
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    exports.default = "function" == typeof _symbol2.default && "symbol" === _typeof(_iterator2.default) ? function(obj) {
        return void 0 === obj ? "undefined" : _typeof(obj);
    } : function(obj) {
        return obj && "function" == typeof _symbol2.default && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : void 0 === obj ? "undefined" : _typeof(obj);
    };
}, function(module, exports, __webpack_require__) {
    module.exports = {
        default: __webpack_require__(111),
        __esModule: !0
    };
}, function(module, exports, __webpack_require__) {
    __webpack_require__(112), __webpack_require__(123), module.exports = __webpack_require__(127).f("iterator");
}, function(module, exports, __webpack_require__) {
    "use strict";
    var $at = __webpack_require__(113)(!0);
    __webpack_require__(114)(String, "String", (function(iterated) {
        this._t = String(iterated), this._i = 0;
    }), (function() {
        var point, O = this._t, index = this._i;
        return index >= O.length ? {
            value: void 0,
            done: !0
        } : (point = $at(O, index), this._i += point.length, {
            value: point,
            done: !1
        });
    }));
}, function(module, exports, __webpack_require__) {
    var toInteger = __webpack_require__(90), defined = __webpack_require__(87);
    module.exports = function(TO_STRING) {
        return function(that, pos) {
            var a, b, s = String(defined(that)), i = toInteger(pos), l = s.length;
            return i < 0 || i >= l ? TO_STRING ? "" : void 0 : (a = s.charCodeAt(i)) < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : b - 56320 + (a - 55296 << 10) + 65536;
        };
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var LIBRARY = __webpack_require__(94), $export = __webpack_require__(61), redefine = __webpack_require__(115), hide = __webpack_require__(66), Iterators = __webpack_require__(116), $iterCreate = __webpack_require__(117), setToStringTag = __webpack_require__(121), getPrototypeOf = __webpack_require__(104), ITERATOR = __webpack_require__(122)("iterator"), BUGGY = !([].keys && "next" in [].keys()), returnThis = function() {
        return this;
    };
    module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
        $iterCreate(Constructor, NAME, next);
        var methods, key, IteratorPrototype, getMethod = function(kind) {
            if (!BUGGY && kind in proto) return proto[kind];
            switch (kind) {
              case "keys":
              case "values":
                return function() {
                    return new Constructor(this, kind);
                };
            }
            return function() {
                return new Constructor(this, kind);
            };
        }, TAG = NAME + " Iterator", DEF_VALUES = "values" == DEFAULT, VALUES_BUG = !1, proto = Base.prototype, $native = proto[ITERATOR] || proto["@@iterator"] || DEFAULT && proto[DEFAULT], $default = $native || getMethod(DEFAULT), $entries = DEFAULT ? DEF_VALUES ? getMethod("entries") : $default : void 0, $anyNative = "Array" == NAME && proto.entries || $native;
        if ($anyNative && (IteratorPrototype = getPrototypeOf($anyNative.call(new Base))) !== Object.prototype && IteratorPrototype.next && (setToStringTag(IteratorPrototype, TAG, !0), 
        LIBRARY || "function" == typeof IteratorPrototype[ITERATOR] || hide(IteratorPrototype, ITERATOR, returnThis)), 
        DEF_VALUES && $native && "values" !== $native.name && (VALUES_BUG = !0, $default = function() {
            return $native.call(this);
        }), LIBRARY && !FORCED || !BUGGY && !VALUES_BUG && proto[ITERATOR] || hide(proto, ITERATOR, $default), 
        Iterators[NAME] = $default, Iterators[TAG] = returnThis, DEFAULT) if (methods = {
            values: DEF_VALUES ? $default : getMethod("values"),
            keys: IS_SET ? $default : getMethod("keys"),
            entries: $entries
        }, FORCED) for (key in methods) key in proto || redefine(proto, key, methods[key]); else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
        return methods;
    };
}, function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(66);
}, function(module, exports) {
    module.exports = {};
}, function(module, exports, __webpack_require__) {
    "use strict";
    var create = __webpack_require__(118), descriptor = __webpack_require__(75), setToStringTag = __webpack_require__(121), IteratorPrototype = {};
    __webpack_require__(66)(IteratorPrototype, __webpack_require__(122)("iterator"), (function() {
        return this;
    })), module.exports = function(Constructor, NAME, next) {
        Constructor.prototype = create(IteratorPrototype, {
            next: descriptor(1, next)
        }), setToStringTag(Constructor, NAME + " Iterator");
    };
}, function(module, exports, __webpack_require__) {
    var anObject = __webpack_require__(68), dPs = __webpack_require__(119), enumBugKeys = __webpack_require__(96), IE_PROTO = __webpack_require__(92)("IE_PROTO"), Empty = function() {}, createDict = function() {
        var iframeDocument, iframe = __webpack_require__(73)("iframe"), i = enumBugKeys.length;
        for (iframe.style.display = "none", __webpack_require__(120).appendChild(iframe), 
        iframe.src = "javascript:", (iframeDocument = iframe.contentWindow.document).open(), 
        iframeDocument.write("<script>document.F=Object<\/script>"), iframeDocument.close(), 
        createDict = iframeDocument.F; i--; ) delete createDict.prototype[enumBugKeys[i]];
        return createDict();
    };
    module.exports = Object.create || function(O, Properties) {
        var result;
        return null !== O ? (Empty.prototype = anObject(O), result = new Empty, Empty.prototype = null, 
        result[IE_PROTO] = O) : result = createDict(), void 0 === Properties ? result : dPs(result, Properties);
    };
}, function(module, exports, __webpack_require__) {
    var dP = __webpack_require__(67), anObject = __webpack_require__(68), getKeys = __webpack_require__(82);
    module.exports = __webpack_require__(71) ? Object.defineProperties : function(O, Properties) {
        anObject(O);
        for (var P, keys = getKeys(Properties), length = keys.length, i = 0; length > i; ) dP.f(O, P = keys[i++], Properties[P]);
        return O;
    };
}, function(module, exports, __webpack_require__) {
    var document = __webpack_require__(62).document;
    module.exports = document && document.documentElement;
}, function(module, exports, __webpack_require__) {
    var def = __webpack_require__(67).f, has = __webpack_require__(76), TAG = __webpack_require__(122)("toStringTag");
    module.exports = function(it, tag, stat) {
        it && !has(it = stat ? it : it.prototype, TAG) && def(it, TAG, {
            configurable: !0,
            value: tag
        });
    };
}, function(module, exports, __webpack_require__) {
    var store = __webpack_require__(93)("wks"), uid = __webpack_require__(95), Symbol = __webpack_require__(62).Symbol, USE_SYMBOL = "function" == typeof Symbol;
    (module.exports = function(name) {
        return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)("Symbol." + name));
    }).store = store;
}, function(module, exports, __webpack_require__) {
    __webpack_require__(124);
    for (var global = __webpack_require__(62), hide = __webpack_require__(66), Iterators = __webpack_require__(116), TO_STRING_TAG = __webpack_require__(122)("toStringTag"), DOMIterables = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), i = 0; i < DOMIterables.length; i++) {
        var NAME = DOMIterables[i], Collection = global[NAME], proto = Collection && Collection.prototype;
        proto && !proto[TO_STRING_TAG] && hide(proto, TO_STRING_TAG, NAME), Iterators[NAME] = Iterators.Array;
    }
}, function(module, exports, __webpack_require__) {
    "use strict";
    var addToUnscopables = __webpack_require__(125), step = __webpack_require__(126), Iterators = __webpack_require__(116), toIObject = __webpack_require__(84);
    module.exports = __webpack_require__(114)(Array, "Array", (function(iterated, kind) {
        this._t = toIObject(iterated), this._i = 0, this._k = kind;
    }), (function() {
        var O = this._t, kind = this._k, index = this._i++;
        return !O || index >= O.length ? (this._t = void 0, step(1)) : step(0, "keys" == kind ? index : "values" == kind ? O[index] : [ index, O[index] ]);
    }), "values"), Iterators.Arguments = Iterators.Array, addToUnscopables("keys"), 
    addToUnscopables("values"), addToUnscopables("entries");
}, function(module, exports) {
    module.exports = function() {};
}, function(module, exports) {
    module.exports = function(done, value) {
        return {
            value: value,
            done: !!done
        };
    };
}, function(module, exports, __webpack_require__) {
    exports.f = __webpack_require__(122);
}, function(module, exports, __webpack_require__) {
    module.exports = {
        default: __webpack_require__(129),
        __esModule: !0
    };
}, function(module, exports, __webpack_require__) {
    __webpack_require__(130), __webpack_require__(138), __webpack_require__(139), __webpack_require__(140), 
    module.exports = __webpack_require__(63).Symbol;
}, function(module, exports, __webpack_require__) {
    "use strict";
    var global = __webpack_require__(62), has = __webpack_require__(76), DESCRIPTORS = __webpack_require__(71), $export = __webpack_require__(61), redefine = __webpack_require__(115), META = __webpack_require__(131).KEY, $fails = __webpack_require__(72), shared = __webpack_require__(93), setToStringTag = __webpack_require__(121), uid = __webpack_require__(95), wks = __webpack_require__(122), wksExt = __webpack_require__(127), wksDefine = __webpack_require__(132), enumKeys = __webpack_require__(133), isArray = __webpack_require__(134), anObject = __webpack_require__(68), isObject = __webpack_require__(69), toIObject = __webpack_require__(84), toPrimitive = __webpack_require__(74), createDesc = __webpack_require__(75), _create = __webpack_require__(118), gOPNExt = __webpack_require__(135), $GOPD = __webpack_require__(137), $DP = __webpack_require__(67), $keys = __webpack_require__(82), gOPD = $GOPD.f, dP = $DP.f, gOPN = gOPNExt.f, $Symbol = global.Symbol, $JSON = global.JSON, _stringify = $JSON && $JSON.stringify, HIDDEN = wks("_hidden"), TO_PRIMITIVE = wks("toPrimitive"), isEnum = {}.propertyIsEnumerable, SymbolRegistry = shared("symbol-registry"), AllSymbols = shared("symbols"), OPSymbols = shared("op-symbols"), ObjectProto = Object.prototype, USE_NATIVE = "function" == typeof $Symbol, QObject = global.QObject, setter = !QObject || !QObject.prototype || !QObject.prototype.findChild, setSymbolDesc = DESCRIPTORS && $fails((function() {
        return 7 != _create(dP({}, "a", {
            get: function() {
                return dP(this, "a", {
                    value: 7
                }).a;
            }
        })).a;
    })) ? function(it, key, D) {
        var protoDesc = gOPD(ObjectProto, key);
        protoDesc && delete ObjectProto[key], dP(it, key, D), protoDesc && it !== ObjectProto && dP(ObjectProto, key, protoDesc);
    } : dP, wrap = function(tag) {
        var sym = AllSymbols[tag] = _create($Symbol.prototype);
        return sym._k = tag, sym;
    }, isSymbol = USE_NATIVE && "symbol" == typeof $Symbol.iterator ? function(it) {
        return "symbol" == typeof it;
    } : function(it) {
        return it instanceof $Symbol;
    }, $defineProperty = function(it, key, D) {
        return it === ObjectProto && $defineProperty(OPSymbols, key, D), anObject(it), key = toPrimitive(key, !0), 
        anObject(D), has(AllSymbols, key) ? (D.enumerable ? (has(it, HIDDEN) && it[HIDDEN][key] && (it[HIDDEN][key] = !1), 
        D = _create(D, {
            enumerable: createDesc(0, !1)
        })) : (has(it, HIDDEN) || dP(it, HIDDEN, createDesc(1, {})), it[HIDDEN][key] = !0), 
        setSymbolDesc(it, key, D)) : dP(it, key, D);
    }, $defineProperties = function(it, P) {
        anObject(it);
        for (var key, keys = enumKeys(P = toIObject(P)), i = 0, l = keys.length; l > i; ) $defineProperty(it, key = keys[i++], P[key]);
        return it;
    }, $propertyIsEnumerable = function(key) {
        var E = isEnum.call(this, key = toPrimitive(key, !0));
        return !(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) && (!(E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]) || E);
    }, $getOwnPropertyDescriptor = function(it, key) {
        if (it = toIObject(it), key = toPrimitive(key, !0), it !== ObjectProto || !has(AllSymbols, key) || has(OPSymbols, key)) {
            var D = gOPD(it, key);
            return !D || !has(AllSymbols, key) || has(it, HIDDEN) && it[HIDDEN][key] || (D.enumerable = !0), 
            D;
        }
    }, $getOwnPropertyNames = function(it) {
        for (var key, names = gOPN(toIObject(it)), result = [], i = 0; names.length > i; ) has(AllSymbols, key = names[i++]) || key == HIDDEN || key == META || result.push(key);
        return result;
    }, $getOwnPropertySymbols = function(it) {
        for (var key, IS_OP = it === ObjectProto, names = gOPN(IS_OP ? OPSymbols : toIObject(it)), result = [], i = 0; names.length > i; ) !has(AllSymbols, key = names[i++]) || IS_OP && !has(ObjectProto, key) || result.push(AllSymbols[key]);
        return result;
    };
    USE_NATIVE || (redefine(($Symbol = function() {
        if (this instanceof $Symbol) throw TypeError("Symbol is not a constructor!");
        var tag = uid(arguments.length > 0 ? arguments[0] : void 0), $set = function(value) {
            this === ObjectProto && $set.call(OPSymbols, value), has(this, HIDDEN) && has(this[HIDDEN], tag) && (this[HIDDEN][tag] = !1), 
            setSymbolDesc(this, tag, createDesc(1, value));
        };
        return DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
            configurable: !0,
            set: $set
        }), wrap(tag);
    }).prototype, "toString", (function() {
        return this._k;
    })), $GOPD.f = $getOwnPropertyDescriptor, $DP.f = $defineProperty, __webpack_require__(136).f = gOPNExt.f = $getOwnPropertyNames, 
    __webpack_require__(98).f = $propertyIsEnumerable, __webpack_require__(97).f = $getOwnPropertySymbols, 
    DESCRIPTORS && !__webpack_require__(94) && redefine(ObjectProto, "propertyIsEnumerable", $propertyIsEnumerable, !0), 
    wksExt.f = function(name) {
        return wrap(wks(name));
    }), $export($export.G + $export.W + $export.F * !USE_NATIVE, {
        Symbol: $Symbol
    });
    for (var es6Symbols = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), j = 0; es6Symbols.length > j; ) wks(es6Symbols[j++]);
    for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k; ) wksDefine(wellKnownSymbols[k++]);
    $export($export.S + $export.F * !USE_NATIVE, "Symbol", {
        for: function(key) {
            return has(SymbolRegistry, key += "") ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
        },
        keyFor: function(sym) {
            if (!isSymbol(sym)) throw TypeError(sym + " is not a symbol!");
            for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
        },
        useSetter: function() {
            setter = !0;
        },
        useSimple: function() {
            setter = !1;
        }
    }), $export($export.S + $export.F * !USE_NATIVE, "Object", {
        create: function(it, P) {
            return void 0 === P ? _create(it) : $defineProperties(_create(it), P);
        },
        defineProperty: $defineProperty,
        defineProperties: $defineProperties,
        getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
        getOwnPropertyNames: $getOwnPropertyNames,
        getOwnPropertySymbols: $getOwnPropertySymbols
    }), $JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails((function() {
        var S = $Symbol();
        return "[null]" != _stringify([ S ]) || "{}" != _stringify({
            a: S
        }) || "{}" != _stringify(Object(S));
    }))), "JSON", {
        stringify: function(it) {
            for (var replacer, $replacer, args = [ it ], i = 1; arguments.length > i; ) args.push(arguments[i++]);
            if ($replacer = replacer = args[1], (isObject(replacer) || void 0 !== it) && !isSymbol(it)) return isArray(replacer) || (replacer = function(key, value) {
                if ("function" == typeof $replacer && (value = $replacer.call(this, key, value)), 
                !isSymbol(value)) return value;
            }), args[1] = replacer, _stringify.apply($JSON, args);
        }
    }), $Symbol.prototype[TO_PRIMITIVE] || __webpack_require__(66)($Symbol.prototype, TO_PRIMITIVE, $Symbol.prototype.valueOf), 
    setToStringTag($Symbol, "Symbol"), setToStringTag(Math, "Math", !0), setToStringTag(global.JSON, "JSON", !0);
}, function(module, exports, __webpack_require__) {
    var META = __webpack_require__(95)("meta"), isObject = __webpack_require__(69), has = __webpack_require__(76), setDesc = __webpack_require__(67).f, id = 0, isExtensible = Object.isExtensible || function() {
        return !0;
    }, FREEZE = !__webpack_require__(72)((function() {
        return isExtensible(Object.preventExtensions({}));
    })), setMeta = function(it) {
        setDesc(it, META, {
            value: {
                i: "O" + ++id,
                w: {}
            }
        });
    }, meta = module.exports = {
        KEY: META,
        NEED: !1,
        fastKey: function(it, create) {
            if (!isObject(it)) return "symbol" == typeof it ? it : ("string" == typeof it ? "S" : "P") + it;
            if (!has(it, META)) {
                if (!isExtensible(it)) return "F";
                if (!create) return "E";
                setMeta(it);
            }
            return it[META].i;
        },
        getWeak: function(it, create) {
            if (!has(it, META)) {
                if (!isExtensible(it)) return !0;
                if (!create) return !1;
                setMeta(it);
            }
            return it[META].w;
        },
        onFreeze: function(it) {
            return FREEZE && meta.NEED && isExtensible(it) && !has(it, META) && setMeta(it), 
            it;
        }
    };
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(62), core = __webpack_require__(63), LIBRARY = __webpack_require__(94), wksExt = __webpack_require__(127), defineProperty = __webpack_require__(67).f;
    module.exports = function(name) {
        var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
        "_" == name.charAt(0) || name in $Symbol || defineProperty($Symbol, name, {
            value: wksExt.f(name)
        });
    };
}, function(module, exports, __webpack_require__) {
    var getKeys = __webpack_require__(82), gOPS = __webpack_require__(97), pIE = __webpack_require__(98);
    module.exports = function(it) {
        var result = getKeys(it), getSymbols = gOPS.f;
        if (getSymbols) for (var key, symbols = getSymbols(it), isEnum = pIE.f, i = 0; symbols.length > i; ) isEnum.call(it, key = symbols[i++]) && result.push(key);
        return result;
    };
}, function(module, exports, __webpack_require__) {
    var cof = __webpack_require__(86);
    module.exports = Array.isArray || function(arg) {
        return "Array" == cof(arg);
    };
}, function(module, exports, __webpack_require__) {
    var toIObject = __webpack_require__(84), gOPN = __webpack_require__(136).f, toString = {}.toString, windowNames = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
    module.exports.f = function(it) {
        return windowNames && "[object Window]" == toString.call(it) ? function(it) {
            try {
                return gOPN(it);
            } catch (e) {
                return windowNames.slice();
            }
        }(it) : gOPN(toIObject(it));
    };
}, function(module, exports, __webpack_require__) {
    var $keys = __webpack_require__(83), hiddenKeys = __webpack_require__(96).concat("length", "prototype");
    exports.f = Object.getOwnPropertyNames || function(O) {
        return $keys(O, hiddenKeys);
    };
}, function(module, exports, __webpack_require__) {
    var pIE = __webpack_require__(98), createDesc = __webpack_require__(75), toIObject = __webpack_require__(84), toPrimitive = __webpack_require__(74), has = __webpack_require__(76), IE8_DOM_DEFINE = __webpack_require__(70), gOPD = Object.getOwnPropertyDescriptor;
    exports.f = __webpack_require__(71) ? gOPD : function(O, P) {
        if (O = toIObject(O), P = toPrimitive(P, !0), IE8_DOM_DEFINE) try {
            return gOPD(O, P);
        } catch (e) {}
        if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
    };
}, function(module, exports) {}, function(module, exports, __webpack_require__) {
    __webpack_require__(132)("asyncIterator");
}, function(module, exports, __webpack_require__) {
    __webpack_require__(132)("observable");
}, function(module, exports, __webpack_require__) {
    "use strict";
    exports.__esModule = !0;
    var _setPrototypeOf2 = _interopRequireDefault(__webpack_require__(142)), _create2 = _interopRequireDefault(__webpack_require__(146)), _typeof3 = _interopRequireDefault(__webpack_require__(109));
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    exports.default = function(subClass, superClass) {
        if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === superClass ? "undefined" : (0, 
        _typeof3.default)(superClass)));
        subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), superClass && (_setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass);
    };
}, function(module, exports, __webpack_require__) {
    module.exports = {
        default: __webpack_require__(143),
        __esModule: !0
    };
}, function(module, exports, __webpack_require__) {
    __webpack_require__(144), module.exports = __webpack_require__(63).Object.setPrototypeOf;
}, function(module, exports, __webpack_require__) {
    var $export = __webpack_require__(61);
    $export($export.S, "Object", {
        setPrototypeOf: __webpack_require__(145).set
    });
}, function(module, exports, __webpack_require__) {
    var isObject = __webpack_require__(69), anObject = __webpack_require__(68), check = function(O, proto) {
        if (anObject(O), !isObject(proto) && null !== proto) throw TypeError(proto + ": can't set as prototype!");
    };
    module.exports = {
        set: Object.setPrototypeOf || ("__proto__" in {} ? function(test, buggy, set) {
            try {
                (set = __webpack_require__(64)(Function.call, __webpack_require__(137).f(Object.prototype, "__proto__").set, 2))(test, []), 
                buggy = !(test instanceof Array);
            } catch (e) {
                buggy = !0;
            }
            return function(O, proto) {
                return check(O, proto), buggy ? O.__proto__ = proto : set(O, proto), O;
            };
        }({}, !1) : void 0),
        check: check
    };
}, function(module, exports, __webpack_require__) {
    module.exports = {
        default: __webpack_require__(147),
        __esModule: !0
    };
}, function(module, exports, __webpack_require__) {
    __webpack_require__(148);
    var $Object = __webpack_require__(63).Object;
    module.exports = function(P, D) {
        return $Object.create(P, D);
    };
}, function(module, exports, __webpack_require__) {
    var $export = __webpack_require__(61);
    $export($export.S, "Object", {
        create: __webpack_require__(118)
    });
}, , , , , , function(module, exports, __webpack_require__) {
    module.exports = {
        default: __webpack_require__(155),
        __esModule: !0
    };
}, function(module, exports, __webpack_require__) {
    __webpack_require__(138), __webpack_require__(112), __webpack_require__(123), __webpack_require__(156), 
    __webpack_require__(174), __webpack_require__(175), module.exports = __webpack_require__(63).Promise;
}, function(module, exports, __webpack_require__) {
    "use strict";
    var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper, LIBRARY = __webpack_require__(94), global = __webpack_require__(62), ctx = __webpack_require__(64), classof = __webpack_require__(157), $export = __webpack_require__(61), isObject = __webpack_require__(69), aFunction = __webpack_require__(65), anInstance = __webpack_require__(158), forOf = __webpack_require__(159), speciesConstructor = __webpack_require__(163), task = __webpack_require__(164).set, microtask = __webpack_require__(166)(), newPromiseCapabilityModule = __webpack_require__(167), perform = __webpack_require__(168), userAgent = __webpack_require__(169), promiseResolve = __webpack_require__(170), TypeError = global.TypeError, process = global.process, versions = process && process.versions, v8 = versions && versions.v8 || "", $Promise = global.Promise, isNode = "process" == classof(process), empty = function() {}, newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f, USE_NATIVE = !!function() {
        try {
            var promise = $Promise.resolve(1), FakePromise = (promise.constructor = {})[__webpack_require__(122)("species")] = function(exec) {
                exec(empty, empty);
            };
            return (isNode || "function" == typeof PromiseRejectionEvent) && promise.then(empty) instanceof FakePromise && 0 !== v8.indexOf("6.6") && -1 === userAgent.indexOf("Chrome/66");
        } catch (e) {}
    }(), isThenable = function(it) {
        var then;
        return !(!isObject(it) || "function" != typeof (then = it.then)) && then;
    }, notify = function(promise, isReject) {
        if (!promise._n) {
            promise._n = !0;
            var chain = promise._c;
            microtask((function() {
                for (var value = promise._v, ok = 1 == promise._s, i = 0, run = function(reaction) {
                    var result, then, exited, handler = ok ? reaction.ok : reaction.fail, resolve = reaction.resolve, reject = reaction.reject, domain = reaction.domain;
                    try {
                        handler ? (ok || (2 == promise._h && onHandleUnhandled(promise), promise._h = 1), 
                        !0 === handler ? result = value : (domain && domain.enter(), result = handler(value), 
                        domain && (domain.exit(), exited = !0)), result === reaction.promise ? reject(TypeError("Promise-chain cycle")) : (then = isThenable(result)) ? then.call(result, resolve, reject) : resolve(result)) : reject(value);
                    } catch (e) {
                        domain && !exited && domain.exit(), reject(e);
                    }
                }; chain.length > i; ) run(chain[i++]);
                promise._c = [], promise._n = !1, isReject && !promise._h && onUnhandled(promise);
            }));
        }
    }, onUnhandled = function(promise) {
        task.call(global, (function() {
            var result, handler, console, value = promise._v, unhandled = isUnhandled(promise);
            if (unhandled && (result = perform((function() {
                isNode ? process.emit("unhandledRejection", value, promise) : (handler = global.onunhandledrejection) ? handler({
                    promise: promise,
                    reason: value
                }) : (console = global.console) && console.error && console.error("Unhandled promise rejection", value);
            })), promise._h = isNode || isUnhandled(promise) ? 2 : 1), promise._a = void 0, 
            unhandled && result.e) throw result.v;
        }));
    }, isUnhandled = function(promise) {
        return 1 !== promise._h && 0 === (promise._a || promise._c).length;
    }, onHandleUnhandled = function(promise) {
        task.call(global, (function() {
            var handler;
            isNode ? process.emit("rejectionHandled", promise) : (handler = global.onrejectionhandled) && handler({
                promise: promise,
                reason: promise._v
            });
        }));
    }, $reject = function(value) {
        var promise = this;
        promise._d || (promise._d = !0, (promise = promise._w || promise)._v = value, promise._s = 2, 
        promise._a || (promise._a = promise._c.slice()), notify(promise, !0));
    }, $resolve = function(value) {
        var then, promise = this;
        if (!promise._d) {
            promise._d = !0, promise = promise._w || promise;
            try {
                if (promise === value) throw TypeError("Promise can't be resolved itself");
                (then = isThenable(value)) ? microtask((function() {
                    var wrapper = {
                        _w: promise,
                        _d: !1
                    };
                    try {
                        then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
                    } catch (e) {
                        $reject.call(wrapper, e);
                    }
                })) : (promise._v = value, promise._s = 1, notify(promise, !1));
            } catch (e) {
                $reject.call({
                    _w: promise,
                    _d: !1
                }, e);
            }
        }
    };
    USE_NATIVE || ($Promise = function(executor) {
        anInstance(this, $Promise, "Promise", "_h"), aFunction(executor), Internal.call(this);
        try {
            executor(ctx($resolve, this, 1), ctx($reject, this, 1));
        } catch (err) {
            $reject.call(this, err);
        }
    }, (Internal = function(executor) {
        this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, 
        this._n = !1;
    }).prototype = __webpack_require__(171)($Promise.prototype, {
        then: function(onFulfilled, onRejected) {
            var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
            return reaction.ok = "function" != typeof onFulfilled || onFulfilled, reaction.fail = "function" == typeof onRejected && onRejected, 
            reaction.domain = isNode ? process.domain : void 0, this._c.push(reaction), this._a && this._a.push(reaction), 
            this._s && notify(this, !1), reaction.promise;
        },
        catch: function(onRejected) {
            return this.then(void 0, onRejected);
        }
    }), OwnPromiseCapability = function() {
        var promise = new Internal;
        this.promise = promise, this.resolve = ctx($resolve, promise, 1), this.reject = ctx($reject, promise, 1);
    }, newPromiseCapabilityModule.f = newPromiseCapability = function(C) {
        return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
    }), $export($export.G + $export.W + $export.F * !USE_NATIVE, {
        Promise: $Promise
    }), __webpack_require__(121)($Promise, "Promise"), __webpack_require__(172)("Promise"), 
    Wrapper = __webpack_require__(63).Promise, $export($export.S + $export.F * !USE_NATIVE, "Promise", {
        reject: function(r) {
            var capability = newPromiseCapability(this);
            return (0, capability.reject)(r), capability.promise;
        }
    }), $export($export.S + $export.F * (LIBRARY || !USE_NATIVE), "Promise", {
        resolve: function(x) {
            return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
        }
    }), $export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(173)((function(iter) {
        $Promise.all(iter).catch(empty);
    }))), "Promise", {
        all: function(iterable) {
            var C = this, capability = newPromiseCapability(C), resolve = capability.resolve, reject = capability.reject, result = perform((function() {
                var values = [], index = 0, remaining = 1;
                forOf(iterable, !1, (function(promise) {
                    var $index = index++, alreadyCalled = !1;
                    values.push(void 0), remaining++, C.resolve(promise).then((function(value) {
                        alreadyCalled || (alreadyCalled = !0, values[$index] = value, --remaining || resolve(values));
                    }), reject);
                })), --remaining || resolve(values);
            }));
            return result.e && reject(result.v), capability.promise;
        },
        race: function(iterable) {
            var C = this, capability = newPromiseCapability(C), reject = capability.reject, result = perform((function() {
                forOf(iterable, !1, (function(promise) {
                    C.resolve(promise).then(capability.resolve, reject);
                }));
            }));
            return result.e && reject(result.v), capability.promise;
        }
    });
}, function(module, exports, __webpack_require__) {
    var cof = __webpack_require__(86), TAG = __webpack_require__(122)("toStringTag"), ARG = "Arguments" == cof(function() {
        return arguments;
    }());
    module.exports = function(it) {
        var O, T, B;
        return void 0 === it ? "Undefined" : null === it ? "Null" : "string" == typeof (T = function(it, key) {
            try {
                return it[key];
            } catch (e) {}
        }(O = Object(it), TAG)) ? T : ARG ? cof(O) : "Object" == (B = cof(O)) && "function" == typeof O.callee ? "Arguments" : B;
    };
}, function(module, exports) {
    module.exports = function(it, Constructor, name, forbiddenField) {
        if (!(it instanceof Constructor) || void 0 !== forbiddenField && forbiddenField in it) throw TypeError(name + ": incorrect invocation!");
        return it;
    };
}, function(module, exports, __webpack_require__) {
    var ctx = __webpack_require__(64), call = __webpack_require__(160), isArrayIter = __webpack_require__(161), anObject = __webpack_require__(68), toLength = __webpack_require__(89), getIterFn = __webpack_require__(162), BREAK = {}, RETURN = {};
    (exports = module.exports = function(iterable, entries, fn, that, ITERATOR) {
        var length, step, iterator, result, iterFn = ITERATOR ? function() {
            return iterable;
        } : getIterFn(iterable), f = ctx(fn, that, entries ? 2 : 1), index = 0;
        if ("function" != typeof iterFn) throw TypeError(iterable + " is not iterable!");
        if (isArrayIter(iterFn)) {
            for (length = toLength(iterable.length); length > index; index++) if ((result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index])) === BREAK || result === RETURN) return result;
        } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done; ) if ((result = call(iterator, f, step.value, entries)) === BREAK || result === RETURN) return result;
    }).BREAK = BREAK, exports.RETURN = RETURN;
}, function(module, exports, __webpack_require__) {
    var anObject = __webpack_require__(68);
    module.exports = function(iterator, fn, value, entries) {
        try {
            return entries ? fn(anObject(value)[0], value[1]) : fn(value);
        } catch (e) {
            var ret = iterator.return;
            throw void 0 !== ret && anObject(ret.call(iterator)), e;
        }
    };
}, function(module, exports, __webpack_require__) {
    var Iterators = __webpack_require__(116), ITERATOR = __webpack_require__(122)("iterator"), ArrayProto = Array.prototype;
    module.exports = function(it) {
        return void 0 !== it && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
    };
}, function(module, exports, __webpack_require__) {
    var classof = __webpack_require__(157), ITERATOR = __webpack_require__(122)("iterator"), Iterators = __webpack_require__(116);
    module.exports = __webpack_require__(63).getIteratorMethod = function(it) {
        if (null != it) return it[ITERATOR] || it["@@iterator"] || Iterators[classof(it)];
    };
}, function(module, exports, __webpack_require__) {
    var anObject = __webpack_require__(68), aFunction = __webpack_require__(65), SPECIES = __webpack_require__(122)("species");
    module.exports = function(O, D) {
        var S, C = anObject(O).constructor;
        return void 0 === C || null == (S = anObject(C)[SPECIES]) ? D : aFunction(S);
    };
}, function(module, exports, __webpack_require__) {
    var defer, channel, port, ctx = __webpack_require__(64), invoke = __webpack_require__(165), html = __webpack_require__(120), cel = __webpack_require__(73), global = __webpack_require__(62), process = global.process, setTask = global.setImmediate, clearTask = global.clearImmediate, MessageChannel = global.MessageChannel, Dispatch = global.Dispatch, counter = 0, queue = {}, run = function() {
        var id = +this;
        if (queue.hasOwnProperty(id)) {
            var fn = queue[id];
            delete queue[id], fn();
        }
    }, listener = function(event) {
        run.call(event.data);
    };
    setTask && clearTask || (setTask = function(fn) {
        for (var args = [], i = 1; arguments.length > i; ) args.push(arguments[i++]);
        return queue[++counter] = function() {
            invoke("function" == typeof fn ? fn : Function(fn), args);
        }, defer(counter), counter;
    }, clearTask = function(id) {
        delete queue[id];
    }, "process" == __webpack_require__(86)(process) ? defer = function(id) {
        process.nextTick(ctx(run, id, 1));
    } : Dispatch && Dispatch.now ? defer = function(id) {
        Dispatch.now(ctx(run, id, 1));
    } : MessageChannel ? (port = (channel = new MessageChannel).port2, channel.port1.onmessage = listener, 
    defer = ctx(port.postMessage, port, 1)) : global.addEventListener && "function" == typeof postMessage && !global.importScripts ? (defer = function(id) {
        global.postMessage(id + "", "*");
    }, global.addEventListener("message", listener, !1)) : defer = "onreadystatechange" in cel("script") ? function(id) {
        html.appendChild(cel("script")).onreadystatechange = function() {
            html.removeChild(this), run.call(id);
        };
    } : function(id) {
        setTimeout(ctx(run, id, 1), 0);
    }), module.exports = {
        set: setTask,
        clear: clearTask
    };
}, function(module, exports) {
    module.exports = function(fn, args, that) {
        var un = void 0 === that;
        switch (args.length) {
          case 0:
            return un ? fn() : fn.call(that);

          case 1:
            return un ? fn(args[0]) : fn.call(that, args[0]);

          case 2:
            return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);

          case 3:
            return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);

          case 4:
            return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
        }
        return fn.apply(that, args);
    };
}, function(module, exports, __webpack_require__) {
    var global = __webpack_require__(62), macrotask = __webpack_require__(164).set, Observer = global.MutationObserver || global.WebKitMutationObserver, process = global.process, Promise = global.Promise, isNode = "process" == __webpack_require__(86)(process);
    module.exports = function() {
        var head, last, notify, flush = function() {
            var parent, fn;
            for (isNode && (parent = process.domain) && parent.exit(); head; ) {
                fn = head.fn, head = head.next;
                try {
                    fn();
                } catch (e) {
                    throw head ? notify() : last = void 0, e;
                }
            }
            last = void 0, parent && parent.enter();
        };
        if (isNode) notify = function() {
            process.nextTick(flush);
        }; else if (!Observer || global.navigator && global.navigator.standalone) if (Promise && Promise.resolve) {
            var promise = Promise.resolve(void 0);
            notify = function() {
                promise.then(flush);
            };
        } else notify = function() {
            macrotask.call(global, flush);
        }; else {
            var toggle = !0, node = document.createTextNode("");
            new Observer(flush).observe(node, {
                characterData: !0
            }), notify = function() {
                node.data = toggle = !toggle;
            };
        }
        return function(fn) {
            var task = {
                fn: fn,
                next: void 0
            };
            last && (last.next = task), head || (head = task, notify()), last = task;
        };
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var aFunction = __webpack_require__(65);
    function PromiseCapability(C) {
        var resolve, reject;
        this.promise = new C((function($$resolve, $$reject) {
            if (void 0 !== resolve || void 0 !== reject) throw TypeError("Bad Promise constructor");
            resolve = $$resolve, reject = $$reject;
        })), this.resolve = aFunction(resolve), this.reject = aFunction(reject);
    }
    module.exports.f = function(C) {
        return new PromiseCapability(C);
    };
}, function(module, exports) {
    module.exports = function(exec) {
        try {
            return {
                e: !1,
                v: exec()
            };
        } catch (e) {
            return {
                e: !0,
                v: e
            };
        }
    };
}, function(module, exports, __webpack_require__) {
    var navigator = __webpack_require__(62).navigator;
    module.exports = navigator && navigator.userAgent || "";
}, function(module, exports, __webpack_require__) {
    var anObject = __webpack_require__(68), isObject = __webpack_require__(69), newPromiseCapability = __webpack_require__(167);
    module.exports = function(C, x) {
        if (anObject(C), isObject(x) && x.constructor === C) return x;
        var promiseCapability = newPromiseCapability.f(C);
        return (0, promiseCapability.resolve)(x), promiseCapability.promise;
    };
}, function(module, exports, __webpack_require__) {
    var hide = __webpack_require__(66);
    module.exports = function(target, src, safe) {
        for (var key in src) safe && target[key] ? target[key] = src[key] : hide(target, key, src[key]);
        return target;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var global = __webpack_require__(62), core = __webpack_require__(63), dP = __webpack_require__(67), DESCRIPTORS = __webpack_require__(71), SPECIES = __webpack_require__(122)("species");
    module.exports = function(KEY) {
        var C = "function" == typeof core[KEY] ? core[KEY] : global[KEY];
        DESCRIPTORS && C && !C[SPECIES] && dP.f(C, SPECIES, {
            configurable: !0,
            get: function() {
                return this;
            }
        });
    };
}, function(module, exports, __webpack_require__) {
    var ITERATOR = __webpack_require__(122)("iterator"), SAFE_CLOSING = !1;
    try {
        var riter = [ 7 ][ITERATOR]();
        riter.return = function() {
            SAFE_CLOSING = !0;
        }, Array.from(riter, (function() {
            throw 2;
        }));
    } catch (e) {}
    module.exports = function(exec, skipClosing) {
        if (!skipClosing && !SAFE_CLOSING) return !1;
        var safe = !1;
        try {
            var arr = [ 7 ], iter = arr[ITERATOR]();
            iter.next = function() {
                return {
                    done: safe = !0
                };
            }, arr[ITERATOR] = function() {
                return iter;
            }, exec(arr);
        } catch (e) {}
        return safe;
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    var $export = __webpack_require__(61), core = __webpack_require__(63), global = __webpack_require__(62), speciesConstructor = __webpack_require__(163), promiseResolve = __webpack_require__(170);
    $export($export.P + $export.R, "Promise", {
        finally: function(onFinally) {
            var C = speciesConstructor(this, core.Promise || global.Promise), isFunction = "function" == typeof onFinally;
            return this.then(isFunction ? function(x) {
                return promiseResolve(C, onFinally()).then((function() {
                    return x;
                }));
            } : onFinally, isFunction ? function(e) {
                return promiseResolve(C, onFinally()).then((function() {
                    throw e;
                }));
            } : onFinally);
        }
    });
}, function(module, exports, __webpack_require__) {
    "use strict";
    var $export = __webpack_require__(61), newPromiseCapability = __webpack_require__(167), perform = __webpack_require__(168);
    $export($export.S, "Promise", {
        try: function(callbackfn) {
            var promiseCapability = newPromiseCapability.f(this), result = perform(callbackfn);
            return (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v), 
            promiseCapability.promise;
        }
    });
}, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(module, exports, __webpack_require__) {
    "use strict";
    var _promise2 = _interopRequireDefault(__webpack_require__(154)), _reactDom2 = _interopRequireDefault(__webpack_require__(10)), _App2 = _interopRequireDefault(__webpack_require__(221)), _react2 = _interopRequireDefault(__webpack_require__(1));
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    var root = document.createElement("div");
    root.id = "preview_maker_root";
    var appContainer = document.createElement("div"), parent = document.createElement("div"), style = document.createElement("style"), shadow = root.attachShadow({
        mode: "open"
    });
    parent.appendChild(style), parent.appendChild(appContainer), shadow.appendChild(parent), 
    _promise2.default.all([ new _promise2.default((function(resolve, reject) {
        if (document.body) return resolve();
        var count = 0, interval = setInterval((function() {
            return count > 5e3 ? (clearInterval(interval), reject({
                err: "<body> did not load."
            })) : (++count, document.body ? (clearInterval(interval), resolve()) : void 0);
        }), 1);
    })), new _promise2.default((function(resolve, reject) {
        fetch(chrome.runtime.getURL("assets/preview-maker.css")).then((function(res) {
            return res.text();
        })).then((function(res) {
            var style = document.createElement("style");
            style.innerHTML = res, resolve(style);
        })).catch((function(e) {
            resolve(null);
        }));
    })) ]).then((function(data) {
        data[1] && parent.appendChild(data[1]), document.body.appendChild(root), Promise.resolve().then(__webpack_require__.t.bind(null, 221, 7)).then((function(e) {
            window.app = _reactDom2.default.render(_react2.default.createElement(_App2.default, null), appContainer);
        }));
    }));
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(101)), _classCallCheck3 = _interopRequireDefault(__webpack_require__(106)), _createClass3 = _interopRequireDefault(__webpack_require__(107)), _possibleConstructorReturn3 = _interopRequireDefault(__webpack_require__(108)), _inherits3 = _interopRequireDefault(__webpack_require__(141)), _react = __webpack_require__(1), _react2 = _interopRequireDefault(_react), _cropperjs2 = _interopRequireDefault(__webpack_require__(222));
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    __webpack_require__(223);
    var App = function(_Component) {
        function App(props) {
            (0, _classCallCheck3.default)(this, App);
            var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, 
            _getPrototypeOf2.default)(App)).call(this, props));
            return _this.state = {
                isCropping: !1,
                isMakingScreenshot: !1,
                img: null,
                cropper: null
            }, _this;
        }
        return (0, _inherits3.default)(App, _Component), (0, _createClass3.default)(App, [ {
            key: "componentDidMount",
            value: function() {
                var _this2 = this;
                this.refs.createBtn.addEventListener("click", (function() {
                    _this2.setState({
                        isMakingScreenshot: !0
                    }), setTimeout((function() {
                        chrome.runtime.sendMessage({
                            action: "make_screenshot"
                        }, (function(img) {
                            _this2.setState({
                                isMakingScreenshot: !1
                            }), _this2.setState({
                                img: img
                            }), _this2.setState({
                                isCropping: !0
                            }), setTimeout((function() {
                                _this2.initCropper();
                            }), 100);
                        }));
                    }), 200);
                })), this.refs.setBtn.addEventListener("click", (function() {
                    chrome.runtime.sendMessage({
                        action: "set_bookmark_preview",
                        img: _this2.state.cropper.getCroppedCanvas().toDataURL()
                    }), chrome.runtime.sendMessage({
                        action: "close_bookmark_preview_tab"
                    });
                }));
            }
        }, {
            key: "initCropper",
            value: function() {
                this.setState({
                    cropper: new _cropperjs2.default(this.refs.img, {
                        aspectRatio: 1.58040463,
                        viewMode: 1
                    })
                });
            }
        }, {
            key: "render",
            value: function() {
                return _react2.default.createElement("div", {
                    className: "preview-maker-root " + (this.state.isCropping ? "full-height" : "") + (this.state.isMakingScreenshot ? " hidden" : "")
                }, _react2.default.createElement("header", null, _react2.default.createElement("div", {
                    className: "controls"
                }, _react2.default.createElement("div", {
                    className: "btn " + (this.state.isCropping ? "" : "hidden"),
                    ref: "setBtn"
                }, "Set Preview"), _react2.default.createElement("div", {
                    className: "btn " + (this.state.isCropping ? "hidden" : ""),
                    ref: "createBtn"
                }, "Create Preview"))), _react2.default.createElement("div", {
                    className: "img-container " + (this.state.img ? "" : "hidden")
                }, _react2.default.createElement("img", {
                    ref: "img",
                    src: this.state.img,
                    alt: ""
                })));
            }
        } ]), App;
    }(_react.Component);
    exports.default = App;
}, function(module, exports, __webpack_require__) {
    /*!
 * Cropper.js v1.5.12
 * https://fengyuanchen.github.io/cropperjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2021-06-12T08:00:17.411Z
 */
    module.exports = function() {
        "use strict";
        function ownKeys(object, enumerableOnly) {
            var keys = Object.keys(object);
            if (Object.getOwnPropertySymbols) {
                var symbols = Object.getOwnPropertySymbols(object);
                enumerableOnly && (symbols = symbols.filter((function(sym) {
                    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
                }))), keys.push.apply(keys, symbols);
            }
            return keys;
        }
        function _objectSpread2(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = null != arguments[i] ? arguments[i] : {};
                i % 2 ? ownKeys(Object(source), !0).forEach((function(key) {
                    _defineProperty(target, key, source[key]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach((function(key) {
                    Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
                }));
            }
            return target;
        }
        function _typeof(obj) {
            return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            })(obj);
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        function _createClass(Constructor, protoProps, staticProps) {
            return protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
            Constructor;
        }
        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj;
        }
        function _toConsumableArray(arr) {
            return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
        }
        function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr)) return _arrayLikeToArray(arr);
        }
        function _iterableToArray(iter) {
            if ("undefined" != typeof Symbol && null != iter[Symbol.iterator] || null != iter["@@iterator"]) return Array.from(iter);
        }
        function _unsupportedIterableToArray(o, minLen) {
            if (o) {
                if ("string" == typeof o) return _arrayLikeToArray(o, minLen);
                var n = Object.prototype.toString.call(o).slice(8, -1);
                return "Object" === n && o.constructor && (n = o.constructor.name), "Map" === n || "Set" === n ? Array.from(o) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? _arrayLikeToArray(o, minLen) : void 0;
            }
        }
        function _arrayLikeToArray(arr, len) {
            (null == len || len > arr.length) && (len = arr.length);
            for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
            return arr2;
        }
        function _nonIterableSpread() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var IS_BROWSER = "undefined" != typeof window && void 0 !== window.document, WINDOW = IS_BROWSER ? window : {}, IS_TOUCH_DEVICE = !(!IS_BROWSER || !WINDOW.document.documentElement) && "ontouchstart" in WINDOW.document.documentElement, HAS_POINTER_EVENT = !!IS_BROWSER && "PointerEvent" in WINDOW, NAMESPACE = "cropper", ACTION_ALL = "all", ACTION_CROP = "crop", ACTION_MOVE = "move", ACTION_ZOOM = "zoom", ACTION_EAST = "e", ACTION_WEST = "w", ACTION_SOUTH = "s", ACTION_NORTH = "n", ACTION_NORTH_EAST = "ne", ACTION_NORTH_WEST = "nw", ACTION_SOUTH_EAST = "se", ACTION_SOUTH_WEST = "sw", CLASS_CROP = "".concat(NAMESPACE, "-crop"), CLASS_DISABLED = "".concat(NAMESPACE, "-disabled"), CLASS_HIDDEN = "".concat(NAMESPACE, "-hidden"), CLASS_HIDE = "".concat(NAMESPACE, "-hide"), CLASS_INVISIBLE = "".concat(NAMESPACE, "-invisible"), CLASS_MODAL = "".concat(NAMESPACE, "-modal"), CLASS_MOVE = "".concat(NAMESPACE, "-move"), DATA_ACTION = "".concat(NAMESPACE, "Action"), DATA_PREVIEW = "".concat(NAMESPACE, "Preview"), DRAG_MODE_CROP = "crop", DRAG_MODE_MOVE = "move", DRAG_MODE_NONE = "none", EVENT_CROP = "crop", EVENT_CROP_END = "cropend", EVENT_CROP_MOVE = "cropmove", EVENT_CROP_START = "cropstart", EVENT_DBLCLICK = "dblclick", EVENT_TOUCH_START = IS_TOUCH_DEVICE ? "touchstart" : "mousedown", EVENT_TOUCH_MOVE = IS_TOUCH_DEVICE ? "touchmove" : "mousemove", EVENT_TOUCH_END = IS_TOUCH_DEVICE ? "touchend touchcancel" : "mouseup", EVENT_POINTER_DOWN = HAS_POINTER_EVENT ? "pointerdown" : EVENT_TOUCH_START, EVENT_POINTER_MOVE = HAS_POINTER_EVENT ? "pointermove" : EVENT_TOUCH_MOVE, EVENT_POINTER_UP = HAS_POINTER_EVENT ? "pointerup pointercancel" : EVENT_TOUCH_END, EVENT_READY = "ready", EVENT_RESIZE = "resize", EVENT_WHEEL = "wheel", EVENT_ZOOM = "zoom", MIME_TYPE_JPEG = "image/jpeg", REGEXP_ACTIONS = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/, REGEXP_DATA_URL = /^data:/, REGEXP_DATA_URL_JPEG = /^data:image\/jpeg;base64,/, REGEXP_TAG_NAME = /^img|canvas$/i, MIN_CONTAINER_WIDTH = 200, MIN_CONTAINER_HEIGHT = 100, DEFAULTS = {
            viewMode: 0,
            dragMode: DRAG_MODE_CROP,
            initialAspectRatio: NaN,
            aspectRatio: NaN,
            data: null,
            preview: "",
            responsive: !0,
            restore: !0,
            checkCrossOrigin: !0,
            checkOrientation: !0,
            modal: !0,
            guides: !0,
            center: !0,
            highlight: !0,
            background: !0,
            autoCrop: !0,
            autoCropArea: .8,
            movable: !0,
            rotatable: !0,
            scalable: !0,
            zoomable: !0,
            zoomOnTouch: !0,
            zoomOnWheel: !0,
            wheelZoomRatio: .1,
            cropBoxMovable: !0,
            cropBoxResizable: !0,
            toggleDragModeOnDblclick: !0,
            minCanvasWidth: 0,
            minCanvasHeight: 0,
            minCropBoxWidth: 0,
            minCropBoxHeight: 0,
            minContainerWidth: MIN_CONTAINER_WIDTH,
            minContainerHeight: MIN_CONTAINER_HEIGHT,
            ready: null,
            cropstart: null,
            cropmove: null,
            cropend: null,
            crop: null,
            zoom: null
        }, TEMPLATE = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>', isNaN = Number.isNaN || WINDOW.isNaN;
        function isNumber(value) {
            return "number" == typeof value && !isNaN(value);
        }
        var isPositiveNumber = function(value) {
            return value > 0 && value < 1 / 0;
        };
        function isUndefined(value) {
            return void 0 === value;
        }
        function isObject(value) {
            return "object" === _typeof(value) && null !== value;
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        function isPlainObject(value) {
            if (!isObject(value)) return !1;
            try {
                var _constructor = value.constructor, prototype = _constructor.prototype;
                return _constructor && prototype && hasOwnProperty.call(prototype, "isPrototypeOf");
            } catch (error) {
                return !1;
            }
        }
        function isFunction(value) {
            return "function" == typeof value;
        }
        var slice = Array.prototype.slice;
        function toArray(value) {
            return Array.from ? Array.from(value) : slice.call(value);
        }
        function forEach(data, callback) {
            return data && isFunction(callback) && (Array.isArray(data) || isNumber(data.length) ? toArray(data).forEach((function(value, key) {
                callback.call(data, value, key, data);
            })) : isObject(data) && Object.keys(data).forEach((function(key) {
                callback.call(data, data[key], key, data);
            }))), data;
        }
        var assign = Object.assign || function(target) {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
            return isObject(target) && args.length > 0 && args.forEach((function(arg) {
                isObject(arg) && Object.keys(arg).forEach((function(key) {
                    target[key] = arg[key];
                }));
            })), target;
        }, REGEXP_DECIMALS = /\.\d*(?:0|9){12}\d*$/;
        function normalizeDecimalNumber(value) {
            var times = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e11;
            return REGEXP_DECIMALS.test(value) ? Math.round(value * times) / times : value;
        }
        var REGEXP_SUFFIX = /^width|height|left|top|marginLeft|marginTop$/;
        function setStyle(element, styles) {
            var style = element.style;
            forEach(styles, (function(value, property) {
                REGEXP_SUFFIX.test(property) && isNumber(value) && (value = "".concat(value, "px")), 
                style[property] = value;
            }));
        }
        function hasClass(element, value) {
            return element.classList ? element.classList.contains(value) : element.className.indexOf(value) > -1;
        }
        function addClass(element, value) {
            if (value) if (isNumber(element.length)) forEach(element, (function(elem) {
                addClass(elem, value);
            })); else if (element.classList) element.classList.add(value); else {
                var className = element.className.trim();
                className ? className.indexOf(value) < 0 && (element.className = "".concat(className, " ").concat(value)) : element.className = value;
            }
        }
        function removeClass(element, value) {
            value && (isNumber(element.length) ? forEach(element, (function(elem) {
                removeClass(elem, value);
            })) : element.classList ? element.classList.remove(value) : element.className.indexOf(value) >= 0 && (element.className = element.className.replace(value, "")));
        }
        function toggleClass(element, value, added) {
            value && (isNumber(element.length) ? forEach(element, (function(elem) {
                toggleClass(elem, value, added);
            })) : added ? addClass(element, value) : removeClass(element, value));
        }
        var REGEXP_CAMEL_CASE = /([a-z\d])([A-Z])/g;
        function toParamCase(value) {
            return value.replace(REGEXP_CAMEL_CASE, "$1-$2").toLowerCase();
        }
        function getData(element, name) {
            return isObject(element[name]) ? element[name] : element.dataset ? element.dataset[name] : element.getAttribute("data-".concat(toParamCase(name)));
        }
        function setData(element, name, data) {
            isObject(data) ? element[name] = data : element.dataset ? element.dataset[name] = data : element.setAttribute("data-".concat(toParamCase(name)), data);
        }
        function removeData(element, name) {
            if (isObject(element[name])) try {
                delete element[name];
            } catch (error) {
                element[name] = void 0;
            } else if (element.dataset) try {
                delete element.dataset[name];
            } catch (error) {
                element.dataset[name] = void 0;
            } else element.removeAttribute("data-".concat(toParamCase(name)));
        }
        var REGEXP_SPACES = /\s\s*/, onceSupported = function() {
            var supported = !1;
            if (IS_BROWSER) {
                var once = !1, listener = function() {}, options = Object.defineProperty({}, "once", {
                    get: function() {
                        return supported = !0, once;
                    },
                    set: function(value) {
                        once = value;
                    }
                });
                WINDOW.addEventListener("test", listener, options), WINDOW.removeEventListener("test", listener, options);
            }
            return supported;
        }();
        function removeListener(element, type, listener) {
            var options = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, handler = listener;
            type.trim().split(REGEXP_SPACES).forEach((function(event) {
                if (!onceSupported) {
                    var listeners = element.listeners;
                    listeners && listeners[event] && listeners[event][listener] && (handler = listeners[event][listener], 
                    delete listeners[event][listener], 0 === Object.keys(listeners[event]).length && delete listeners[event], 
                    0 === Object.keys(listeners).length && delete element.listeners);
                }
                element.removeEventListener(event, handler, options);
            }));
        }
        function addListener(element, type, listener) {
            var options = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}, _handler = listener;
            type.trim().split(REGEXP_SPACES).forEach((function(event) {
                if (options.once && !onceSupported) {
                    var _element$listeners = element.listeners, listeners = void 0 === _element$listeners ? {} : _element$listeners;
                    _handler = function() {
                        delete listeners[event][listener], element.removeEventListener(event, _handler, options);
                        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                        listener.apply(element, args);
                    }, listeners[event] || (listeners[event] = {}), listeners[event][listener] && element.removeEventListener(event, listeners[event][listener], options), 
                    listeners[event][listener] = _handler, element.listeners = listeners;
                }
                element.addEventListener(event, _handler, options);
            }));
        }
        function dispatchEvent(element, type, data) {
            var event;
            return isFunction(Event) && isFunction(CustomEvent) ? event = new CustomEvent(type, {
                detail: data,
                bubbles: !0,
                cancelable: !0
            }) : (event = document.createEvent("CustomEvent")).initCustomEvent(type, !0, !0, data), 
            element.dispatchEvent(event);
        }
        function getOffset(element) {
            var box = element.getBoundingClientRect();
            return {
                left: box.left + (window.pageXOffset - document.documentElement.clientLeft),
                top: box.top + (window.pageYOffset - document.documentElement.clientTop)
            };
        }
        var location = WINDOW.location, REGEXP_ORIGINS = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
        function isCrossOriginURL(url) {
            var parts = url.match(REGEXP_ORIGINS);
            return null !== parts && (parts[1] !== location.protocol || parts[2] !== location.hostname || parts[3] !== location.port);
        }
        function addTimestamp(url) {
            var timestamp = "timestamp=".concat((new Date).getTime());
            return url + (-1 === url.indexOf("?") ? "?" : "&") + timestamp;
        }
        function getTransforms(_ref) {
            var rotate = _ref.rotate, scaleX = _ref.scaleX, scaleY = _ref.scaleY, translateX = _ref.translateX, translateY = _ref.translateY, values = [];
            isNumber(translateX) && 0 !== translateX && values.push("translateX(".concat(translateX, "px)")), 
            isNumber(translateY) && 0 !== translateY && values.push("translateY(".concat(translateY, "px)")), 
            isNumber(rotate) && 0 !== rotate && values.push("rotate(".concat(rotate, "deg)")), 
            isNumber(scaleX) && 1 !== scaleX && values.push("scaleX(".concat(scaleX, ")")), 
            isNumber(scaleY) && 1 !== scaleY && values.push("scaleY(".concat(scaleY, ")"));
            var transform = values.length ? values.join(" ") : "none";
            return {
                WebkitTransform: transform,
                msTransform: transform,
                transform: transform
            };
        }
        function getMaxZoomRatio(pointers) {
            var pointers2 = _objectSpread2({}, pointers), maxRatio = 0;
            return forEach(pointers, (function(pointer, pointerId) {
                delete pointers2[pointerId], forEach(pointers2, (function(pointer2) {
                    var x1 = Math.abs(pointer.startX - pointer2.startX), y1 = Math.abs(pointer.startY - pointer2.startY), x2 = Math.abs(pointer.endX - pointer2.endX), y2 = Math.abs(pointer.endY - pointer2.endY), z1 = Math.sqrt(x1 * x1 + y1 * y1), ratio = (Math.sqrt(x2 * x2 + y2 * y2) - z1) / z1;
                    Math.abs(ratio) > Math.abs(maxRatio) && (maxRatio = ratio);
                }));
            })), maxRatio;
        }
        function getPointer(_ref2, endOnly) {
            var pageX = _ref2.pageX, pageY = _ref2.pageY, end = {
                endX: pageX,
                endY: pageY
            };
            return endOnly ? end : _objectSpread2({
                startX: pageX,
                startY: pageY
            }, end);
        }
        function getPointersCenter(pointers) {
            var pageX = 0, pageY = 0, count = 0;
            return forEach(pointers, (function(_ref3) {
                var startX = _ref3.startX, startY = _ref3.startY;
                pageX += startX, pageY += startY, count += 1;
            })), {
                pageX: pageX /= count,
                pageY: pageY /= count
            };
        }
        function getAdjustedSizes(_ref4) {
            var aspectRatio = _ref4.aspectRatio, height = _ref4.height, width = _ref4.width, type = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "contain", isValidWidth = isPositiveNumber(width), isValidHeight = isPositiveNumber(height);
            if (isValidWidth && isValidHeight) {
                var adjustedWidth = height * aspectRatio;
                "contain" === type && adjustedWidth > width || "cover" === type && adjustedWidth < width ? height = width / aspectRatio : width = height * aspectRatio;
            } else isValidWidth ? height = width / aspectRatio : isValidHeight && (width = height * aspectRatio);
            return {
                width: width,
                height: height
            };
        }
        function getRotatedSizes(_ref5) {
            var width = _ref5.width, height = _ref5.height, degree = _ref5.degree;
            if (90 == (degree = Math.abs(degree) % 180)) return {
                width: height,
                height: width
            };
            var arc = degree % 90 * Math.PI / 180, sinArc = Math.sin(arc), cosArc = Math.cos(arc), newWidth = width * cosArc + height * sinArc, newHeight = width * sinArc + height * cosArc;
            return degree > 90 ? {
                width: newHeight,
                height: newWidth
            } : {
                width: newWidth,
                height: newHeight
            };
        }
        function getSourceCanvas(image, _ref6, _ref7, _ref8) {
            var imageAspectRatio = _ref6.aspectRatio, imageNaturalWidth = _ref6.naturalWidth, imageNaturalHeight = _ref6.naturalHeight, _ref6$rotate = _ref6.rotate, rotate = void 0 === _ref6$rotate ? 0 : _ref6$rotate, _ref6$scaleX = _ref6.scaleX, scaleX = void 0 === _ref6$scaleX ? 1 : _ref6$scaleX, _ref6$scaleY = _ref6.scaleY, scaleY = void 0 === _ref6$scaleY ? 1 : _ref6$scaleY, aspectRatio = _ref7.aspectRatio, naturalWidth = _ref7.naturalWidth, naturalHeight = _ref7.naturalHeight, _ref8$fillColor = _ref8.fillColor, fillColor = void 0 === _ref8$fillColor ? "transparent" : _ref8$fillColor, _ref8$imageSmoothingE = _ref8.imageSmoothingEnabled, imageSmoothingEnabled = void 0 === _ref8$imageSmoothingE || _ref8$imageSmoothingE, _ref8$imageSmoothingQ = _ref8.imageSmoothingQuality, imageSmoothingQuality = void 0 === _ref8$imageSmoothingQ ? "low" : _ref8$imageSmoothingQ, _ref8$maxWidth = _ref8.maxWidth, maxWidth = void 0 === _ref8$maxWidth ? 1 / 0 : _ref8$maxWidth, _ref8$maxHeight = _ref8.maxHeight, maxHeight = void 0 === _ref8$maxHeight ? 1 / 0 : _ref8$maxHeight, _ref8$minWidth = _ref8.minWidth, minWidth = void 0 === _ref8$minWidth ? 0 : _ref8$minWidth, _ref8$minHeight = _ref8.minHeight, minHeight = void 0 === _ref8$minHeight ? 0 : _ref8$minHeight, canvas = document.createElement("canvas"), context = canvas.getContext("2d"), maxSizes = getAdjustedSizes({
                aspectRatio: aspectRatio,
                width: maxWidth,
                height: maxHeight
            }), minSizes = getAdjustedSizes({
                aspectRatio: aspectRatio,
                width: minWidth,
                height: minHeight
            }, "cover"), width = Math.min(maxSizes.width, Math.max(minSizes.width, naturalWidth)), height = Math.min(maxSizes.height, Math.max(minSizes.height, naturalHeight)), destMaxSizes = getAdjustedSizes({
                aspectRatio: imageAspectRatio,
                width: maxWidth,
                height: maxHeight
            }), destMinSizes = getAdjustedSizes({
                aspectRatio: imageAspectRatio,
                width: minWidth,
                height: minHeight
            }, "cover"), destWidth = Math.min(destMaxSizes.width, Math.max(destMinSizes.width, imageNaturalWidth)), destHeight = Math.min(destMaxSizes.height, Math.max(destMinSizes.height, imageNaturalHeight)), params = [ -destWidth / 2, -destHeight / 2, destWidth, destHeight ];
            return canvas.width = normalizeDecimalNumber(width), canvas.height = normalizeDecimalNumber(height), 
            context.fillStyle = fillColor, context.fillRect(0, 0, width, height), context.save(), 
            context.translate(width / 2, height / 2), context.rotate(rotate * Math.PI / 180), 
            context.scale(scaleX, scaleY), context.imageSmoothingEnabled = imageSmoothingEnabled, 
            context.imageSmoothingQuality = imageSmoothingQuality, context.drawImage.apply(context, [ image ].concat(_toConsumableArray(params.map((function(param) {
                return Math.floor(normalizeDecimalNumber(param));
            }))))), context.restore(), canvas;
        }
        var fromCharCode = String.fromCharCode;
        function getStringFromCharCode(dataView, start, length) {
            var str = "";
            length += start;
            for (var i = start; i < length; i += 1) str += fromCharCode(dataView.getUint8(i));
            return str;
        }
        var REGEXP_DATA_URL_HEAD = /^data:.*,/;
        function dataURLToArrayBuffer(dataURL) {
            var base64 = dataURL.replace(REGEXP_DATA_URL_HEAD, ""), binary = atob(base64), arrayBuffer = new ArrayBuffer(binary.length), uint8 = new Uint8Array(arrayBuffer);
            return forEach(uint8, (function(value, i) {
                uint8[i] = binary.charCodeAt(i);
            })), arrayBuffer;
        }
        function arrayBufferToDataURL(arrayBuffer, mimeType) {
            for (var chunks = [], chunkSize = 8192, uint8 = new Uint8Array(arrayBuffer); uint8.length > 0; ) chunks.push(fromCharCode.apply(null, toArray(uint8.subarray(0, chunkSize)))), 
            uint8 = uint8.subarray(chunkSize);
            return "data:".concat(mimeType, ";base64,").concat(btoa(chunks.join("")));
        }
        function resetAndGetOrientation(arrayBuffer) {
            var orientation, dataView = new DataView(arrayBuffer);
            try {
                var littleEndian, app1Start, ifdStart;
                if (255 === dataView.getUint8(0) && 216 === dataView.getUint8(1)) for (var length = dataView.byteLength, offset = 2; offset + 1 < length; ) {
                    if (255 === dataView.getUint8(offset) && 225 === dataView.getUint8(offset + 1)) {
                        app1Start = offset;
                        break;
                    }
                    offset += 1;
                }
                if (app1Start) {
                    var tiffOffset = app1Start + 10;
                    if ("Exif" === getStringFromCharCode(dataView, app1Start + 4, 4)) {
                        var endianness = dataView.getUint16(tiffOffset);
                        if (((littleEndian = 18761 === endianness) || 19789 === endianness) && 42 === dataView.getUint16(tiffOffset + 2, littleEndian)) {
                            var firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
                            firstIFDOffset >= 8 && (ifdStart = tiffOffset + firstIFDOffset);
                        }
                    }
                }
                if (ifdStart) {
                    var _offset, i, _length = dataView.getUint16(ifdStart, littleEndian);
                    for (i = 0; i < _length; i += 1) if (_offset = ifdStart + 12 * i + 2, 274 === dataView.getUint16(_offset, littleEndian)) {
                        _offset += 8, orientation = dataView.getUint16(_offset, littleEndian), dataView.setUint16(_offset, 1, littleEndian);
                        break;
                    }
                }
            } catch (error) {
                orientation = 1;
            }
            return orientation;
        }
        function parseOrientation(orientation) {
            var rotate = 0, scaleX = 1, scaleY = 1;
            switch (orientation) {
              case 2:
                scaleX = -1;
                break;

              case 3:
                rotate = -180;
                break;

              case 4:
                scaleY = -1;
                break;

              case 5:
                rotate = 90, scaleY = -1;
                break;

              case 6:
                rotate = 90;
                break;

              case 7:
                rotate = 90, scaleX = -1;
                break;

              case 8:
                rotate = -90;
            }
            return {
                rotate: rotate,
                scaleX: scaleX,
                scaleY: scaleY
            };
        }
        var render = {
            render: function() {
                this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), 
                this.cropped && this.renderCropBox();
            },
            initContainer: function() {
                var element = this.element, options = this.options, container = this.container, cropper = this.cropper, minWidth = Number(options.minContainerWidth), minHeight = Number(options.minContainerHeight);
                addClass(cropper, CLASS_HIDDEN), removeClass(element, CLASS_HIDDEN);
                var containerData = {
                    width: Math.max(container.offsetWidth, minWidth >= 0 ? minWidth : MIN_CONTAINER_WIDTH),
                    height: Math.max(container.offsetHeight, minHeight >= 0 ? minHeight : MIN_CONTAINER_HEIGHT)
                };
                this.containerData = containerData, setStyle(cropper, {
                    width: containerData.width,
                    height: containerData.height
                }), addClass(element, CLASS_HIDDEN), removeClass(cropper, CLASS_HIDDEN);
            },
            initCanvas: function() {
                var containerData = this.containerData, imageData = this.imageData, viewMode = this.options.viewMode, rotated = Math.abs(imageData.rotate) % 180 == 90, naturalWidth = rotated ? imageData.naturalHeight : imageData.naturalWidth, naturalHeight = rotated ? imageData.naturalWidth : imageData.naturalHeight, aspectRatio = naturalWidth / naturalHeight, canvasWidth = containerData.width, canvasHeight = containerData.height;
                containerData.height * aspectRatio > containerData.width ? 3 === viewMode ? canvasWidth = containerData.height * aspectRatio : canvasHeight = containerData.width / aspectRatio : 3 === viewMode ? canvasHeight = containerData.width / aspectRatio : canvasWidth = containerData.height * aspectRatio;
                var canvasData = {
                    aspectRatio: aspectRatio,
                    naturalWidth: naturalWidth,
                    naturalHeight: naturalHeight,
                    width: canvasWidth,
                    height: canvasHeight
                };
                this.canvasData = canvasData, this.limited = 1 === viewMode || 2 === viewMode, this.limitCanvas(!0, !0), 
                canvasData.width = Math.min(Math.max(canvasData.width, canvasData.minWidth), canvasData.maxWidth), 
                canvasData.height = Math.min(Math.max(canvasData.height, canvasData.minHeight), canvasData.maxHeight), 
                canvasData.left = (containerData.width - canvasData.width) / 2, canvasData.top = (containerData.height - canvasData.height) / 2, 
                canvasData.oldLeft = canvasData.left, canvasData.oldTop = canvasData.top, this.initialCanvasData = assign({}, canvasData);
            },
            limitCanvas: function(sizeLimited, positionLimited) {
                var options = this.options, containerData = this.containerData, canvasData = this.canvasData, cropBoxData = this.cropBoxData, viewMode = options.viewMode, aspectRatio = canvasData.aspectRatio, cropped = this.cropped && cropBoxData;
                if (sizeLimited) {
                    var minCanvasWidth = Number(options.minCanvasWidth) || 0, minCanvasHeight = Number(options.minCanvasHeight) || 0;
                    viewMode > 1 ? (minCanvasWidth = Math.max(minCanvasWidth, containerData.width), 
                    minCanvasHeight = Math.max(minCanvasHeight, containerData.height), 3 === viewMode && (minCanvasHeight * aspectRatio > minCanvasWidth ? minCanvasWidth = minCanvasHeight * aspectRatio : minCanvasHeight = minCanvasWidth / aspectRatio)) : viewMode > 0 && (minCanvasWidth ? minCanvasWidth = Math.max(minCanvasWidth, cropped ? cropBoxData.width : 0) : minCanvasHeight ? minCanvasHeight = Math.max(minCanvasHeight, cropped ? cropBoxData.height : 0) : cropped && (minCanvasWidth = cropBoxData.width, 
                    (minCanvasHeight = cropBoxData.height) * aspectRatio > minCanvasWidth ? minCanvasWidth = minCanvasHeight * aspectRatio : minCanvasHeight = minCanvasWidth / aspectRatio));
                    var _getAdjustedSizes = getAdjustedSizes({
                        aspectRatio: aspectRatio,
                        width: minCanvasWidth,
                        height: minCanvasHeight
                    });
                    minCanvasWidth = _getAdjustedSizes.width, minCanvasHeight = _getAdjustedSizes.height, 
                    canvasData.minWidth = minCanvasWidth, canvasData.minHeight = minCanvasHeight, canvasData.maxWidth = 1 / 0, 
                    canvasData.maxHeight = 1 / 0;
                }
                if (positionLimited) if (viewMode > (cropped ? 0 : 1)) {
                    var newCanvasLeft = containerData.width - canvasData.width, newCanvasTop = containerData.height - canvasData.height;
                    canvasData.minLeft = Math.min(0, newCanvasLeft), canvasData.minTop = Math.min(0, newCanvasTop), 
                    canvasData.maxLeft = Math.max(0, newCanvasLeft), canvasData.maxTop = Math.max(0, newCanvasTop), 
                    cropped && this.limited && (canvasData.minLeft = Math.min(cropBoxData.left, cropBoxData.left + (cropBoxData.width - canvasData.width)), 
                    canvasData.minTop = Math.min(cropBoxData.top, cropBoxData.top + (cropBoxData.height - canvasData.height)), 
                    canvasData.maxLeft = cropBoxData.left, canvasData.maxTop = cropBoxData.top, 2 === viewMode && (canvasData.width >= containerData.width && (canvasData.minLeft = Math.min(0, newCanvasLeft), 
                    canvasData.maxLeft = Math.max(0, newCanvasLeft)), canvasData.height >= containerData.height && (canvasData.minTop = Math.min(0, newCanvasTop), 
                    canvasData.maxTop = Math.max(0, newCanvasTop))));
                } else canvasData.minLeft = -canvasData.width, canvasData.minTop = -canvasData.height, 
                canvasData.maxLeft = containerData.width, canvasData.maxTop = containerData.height;
            },
            renderCanvas: function(changed, transformed) {
                var canvasData = this.canvasData, imageData = this.imageData;
                if (transformed) {
                    var _getRotatedSizes = getRotatedSizes({
                        width: imageData.naturalWidth * Math.abs(imageData.scaleX || 1),
                        height: imageData.naturalHeight * Math.abs(imageData.scaleY || 1),
                        degree: imageData.rotate || 0
                    }), naturalWidth = _getRotatedSizes.width, naturalHeight = _getRotatedSizes.height, width = canvasData.width * (naturalWidth / canvasData.naturalWidth), height = canvasData.height * (naturalHeight / canvasData.naturalHeight);
                    canvasData.left -= (width - canvasData.width) / 2, canvasData.top -= (height - canvasData.height) / 2, 
                    canvasData.width = width, canvasData.height = height, canvasData.aspectRatio = naturalWidth / naturalHeight, 
                    canvasData.naturalWidth = naturalWidth, canvasData.naturalHeight = naturalHeight, 
                    this.limitCanvas(!0, !1);
                }
                (canvasData.width > canvasData.maxWidth || canvasData.width < canvasData.minWidth) && (canvasData.left = canvasData.oldLeft), 
                (canvasData.height > canvasData.maxHeight || canvasData.height < canvasData.minHeight) && (canvasData.top = canvasData.oldTop), 
                canvasData.width = Math.min(Math.max(canvasData.width, canvasData.minWidth), canvasData.maxWidth), 
                canvasData.height = Math.min(Math.max(canvasData.height, canvasData.minHeight), canvasData.maxHeight), 
                this.limitCanvas(!1, !0), canvasData.left = Math.min(Math.max(canvasData.left, canvasData.minLeft), canvasData.maxLeft), 
                canvasData.top = Math.min(Math.max(canvasData.top, canvasData.minTop), canvasData.maxTop), 
                canvasData.oldLeft = canvasData.left, canvasData.oldTop = canvasData.top, setStyle(this.canvas, assign({
                    width: canvasData.width,
                    height: canvasData.height
                }, getTransforms({
                    translateX: canvasData.left,
                    translateY: canvasData.top
                }))), this.renderImage(changed), this.cropped && this.limited && this.limitCropBox(!0, !0);
            },
            renderImage: function(changed) {
                var canvasData = this.canvasData, imageData = this.imageData, width = imageData.naturalWidth * (canvasData.width / canvasData.naturalWidth), height = imageData.naturalHeight * (canvasData.height / canvasData.naturalHeight);
                assign(imageData, {
                    width: width,
                    height: height,
                    left: (canvasData.width - width) / 2,
                    top: (canvasData.height - height) / 2
                }), setStyle(this.image, assign({
                    width: imageData.width,
                    height: imageData.height
                }, getTransforms(assign({
                    translateX: imageData.left,
                    translateY: imageData.top
                }, imageData)))), changed && this.output();
            },
            initCropBox: function() {
                var options = this.options, canvasData = this.canvasData, aspectRatio = options.aspectRatio || options.initialAspectRatio, autoCropArea = Number(options.autoCropArea) || .8, cropBoxData = {
                    width: canvasData.width,
                    height: canvasData.height
                };
                aspectRatio && (canvasData.height * aspectRatio > canvasData.width ? cropBoxData.height = cropBoxData.width / aspectRatio : cropBoxData.width = cropBoxData.height * aspectRatio), 
                this.cropBoxData = cropBoxData, this.limitCropBox(!0, !0), cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth), 
                cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight), 
                cropBoxData.width = Math.max(cropBoxData.minWidth, cropBoxData.width * autoCropArea), 
                cropBoxData.height = Math.max(cropBoxData.minHeight, cropBoxData.height * autoCropArea), 
                cropBoxData.left = canvasData.left + (canvasData.width - cropBoxData.width) / 2, 
                cropBoxData.top = canvasData.top + (canvasData.height - cropBoxData.height) / 2, 
                cropBoxData.oldLeft = cropBoxData.left, cropBoxData.oldTop = cropBoxData.top, this.initialCropBoxData = assign({}, cropBoxData);
            },
            limitCropBox: function(sizeLimited, positionLimited) {
                var options = this.options, containerData = this.containerData, canvasData = this.canvasData, cropBoxData = this.cropBoxData, limited = this.limited, aspectRatio = options.aspectRatio;
                if (sizeLimited) {
                    var minCropBoxWidth = Number(options.minCropBoxWidth) || 0, minCropBoxHeight = Number(options.minCropBoxHeight) || 0, maxCropBoxWidth = limited ? Math.min(containerData.width, canvasData.width, canvasData.width + canvasData.left, containerData.width - canvasData.left) : containerData.width, maxCropBoxHeight = limited ? Math.min(containerData.height, canvasData.height, canvasData.height + canvasData.top, containerData.height - canvasData.top) : containerData.height;
                    minCropBoxWidth = Math.min(minCropBoxWidth, containerData.width), minCropBoxHeight = Math.min(minCropBoxHeight, containerData.height), 
                    aspectRatio && (minCropBoxWidth && minCropBoxHeight ? minCropBoxHeight * aspectRatio > minCropBoxWidth ? minCropBoxHeight = minCropBoxWidth / aspectRatio : minCropBoxWidth = minCropBoxHeight * aspectRatio : minCropBoxWidth ? minCropBoxHeight = minCropBoxWidth / aspectRatio : minCropBoxHeight && (minCropBoxWidth = minCropBoxHeight * aspectRatio), 
                    maxCropBoxHeight * aspectRatio > maxCropBoxWidth ? maxCropBoxHeight = maxCropBoxWidth / aspectRatio : maxCropBoxWidth = maxCropBoxHeight * aspectRatio), 
                    cropBoxData.minWidth = Math.min(minCropBoxWidth, maxCropBoxWidth), cropBoxData.minHeight = Math.min(minCropBoxHeight, maxCropBoxHeight), 
                    cropBoxData.maxWidth = maxCropBoxWidth, cropBoxData.maxHeight = maxCropBoxHeight;
                }
                positionLimited && (limited ? (cropBoxData.minLeft = Math.max(0, canvasData.left), 
                cropBoxData.minTop = Math.max(0, canvasData.top), cropBoxData.maxLeft = Math.min(containerData.width, canvasData.left + canvasData.width) - cropBoxData.width, 
                cropBoxData.maxTop = Math.min(containerData.height, canvasData.top + canvasData.height) - cropBoxData.height) : (cropBoxData.minLeft = 0, 
                cropBoxData.minTop = 0, cropBoxData.maxLeft = containerData.width - cropBoxData.width, 
                cropBoxData.maxTop = containerData.height - cropBoxData.height));
            },
            renderCropBox: function() {
                var options = this.options, containerData = this.containerData, cropBoxData = this.cropBoxData;
                (cropBoxData.width > cropBoxData.maxWidth || cropBoxData.width < cropBoxData.minWidth) && (cropBoxData.left = cropBoxData.oldLeft), 
                (cropBoxData.height > cropBoxData.maxHeight || cropBoxData.height < cropBoxData.minHeight) && (cropBoxData.top = cropBoxData.oldTop), 
                cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth), 
                cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight), 
                this.limitCropBox(!1, !0), cropBoxData.left = Math.min(Math.max(cropBoxData.left, cropBoxData.minLeft), cropBoxData.maxLeft), 
                cropBoxData.top = Math.min(Math.max(cropBoxData.top, cropBoxData.minTop), cropBoxData.maxTop), 
                cropBoxData.oldLeft = cropBoxData.left, cropBoxData.oldTop = cropBoxData.top, options.movable && options.cropBoxMovable && setData(this.face, DATA_ACTION, cropBoxData.width >= containerData.width && cropBoxData.height >= containerData.height ? ACTION_MOVE : ACTION_ALL), 
                setStyle(this.cropBox, assign({
                    width: cropBoxData.width,
                    height: cropBoxData.height
                }, getTransforms({
                    translateX: cropBoxData.left,
                    translateY: cropBoxData.top
                }))), this.cropped && this.limited && this.limitCanvas(!0, !0), this.disabled || this.output();
            },
            output: function() {
                this.preview(), dispatchEvent(this.element, EVENT_CROP, this.getData());
            }
        }, preview = {
            initPreview: function() {
                var element = this.element, crossOrigin = this.crossOrigin, preview = this.options.preview, url = crossOrigin ? this.crossOriginUrl : this.url, alt = element.alt || "The image to preview", image = document.createElement("img");
                if (crossOrigin && (image.crossOrigin = crossOrigin), image.src = url, image.alt = alt, 
                this.viewBox.appendChild(image), this.viewBoxImage = image, preview) {
                    var previews = preview;
                    "string" == typeof preview ? previews = element.ownerDocument.querySelectorAll(preview) : preview.querySelector && (previews = [ preview ]), 
                    this.previews = previews, forEach(previews, (function(el) {
                        var img = document.createElement("img");
                        setData(el, DATA_PREVIEW, {
                            width: el.offsetWidth,
                            height: el.offsetHeight,
                            html: el.innerHTML
                        }), crossOrigin && (img.crossOrigin = crossOrigin), img.src = url, img.alt = alt, 
                        img.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"', 
                        el.innerHTML = "", el.appendChild(img);
                    }));
                }
            },
            resetPreview: function() {
                forEach(this.previews, (function(element) {
                    var data = getData(element, DATA_PREVIEW);
                    setStyle(element, {
                        width: data.width,
                        height: data.height
                    }), element.innerHTML = data.html, removeData(element, DATA_PREVIEW);
                }));
            },
            preview: function() {
                var imageData = this.imageData, canvasData = this.canvasData, cropBoxData = this.cropBoxData, cropBoxWidth = cropBoxData.width, cropBoxHeight = cropBoxData.height, width = imageData.width, height = imageData.height, left = cropBoxData.left - canvasData.left - imageData.left, top = cropBoxData.top - canvasData.top - imageData.top;
                this.cropped && !this.disabled && (setStyle(this.viewBoxImage, assign({
                    width: width,
                    height: height
                }, getTransforms(assign({
                    translateX: -left,
                    translateY: -top
                }, imageData)))), forEach(this.previews, (function(element) {
                    var data = getData(element, DATA_PREVIEW), originalWidth = data.width, originalHeight = data.height, newWidth = originalWidth, newHeight = originalHeight, ratio = 1;
                    cropBoxWidth && (newHeight = cropBoxHeight * (ratio = originalWidth / cropBoxWidth)), 
                    cropBoxHeight && newHeight > originalHeight && (newWidth = cropBoxWidth * (ratio = originalHeight / cropBoxHeight), 
                    newHeight = originalHeight), setStyle(element, {
                        width: newWidth,
                        height: newHeight
                    }), setStyle(element.getElementsByTagName("img")[0], assign({
                        width: width * ratio,
                        height: height * ratio
                    }, getTransforms(assign({
                        translateX: -left * ratio,
                        translateY: -top * ratio
                    }, imageData))));
                })));
            }
        }, events = {
            bind: function() {
                var element = this.element, options = this.options, cropper = this.cropper;
                isFunction(options.cropstart) && addListener(element, EVENT_CROP_START, options.cropstart), 
                isFunction(options.cropmove) && addListener(element, EVENT_CROP_MOVE, options.cropmove), 
                isFunction(options.cropend) && addListener(element, EVENT_CROP_END, options.cropend), 
                isFunction(options.crop) && addListener(element, EVENT_CROP, options.crop), isFunction(options.zoom) && addListener(element, EVENT_ZOOM, options.zoom), 
                addListener(cropper, EVENT_POINTER_DOWN, this.onCropStart = this.cropStart.bind(this)), 
                options.zoomable && options.zoomOnWheel && addListener(cropper, EVENT_WHEEL, this.onWheel = this.wheel.bind(this), {
                    passive: !1,
                    capture: !0
                }), options.toggleDragModeOnDblclick && addListener(cropper, EVENT_DBLCLICK, this.onDblclick = this.dblclick.bind(this)), 
                addListener(element.ownerDocument, EVENT_POINTER_MOVE, this.onCropMove = this.cropMove.bind(this)), 
                addListener(element.ownerDocument, EVENT_POINTER_UP, this.onCropEnd = this.cropEnd.bind(this)), 
                options.responsive && addListener(window, EVENT_RESIZE, this.onResize = this.resize.bind(this));
            },
            unbind: function() {
                var element = this.element, options = this.options, cropper = this.cropper;
                isFunction(options.cropstart) && removeListener(element, EVENT_CROP_START, options.cropstart), 
                isFunction(options.cropmove) && removeListener(element, EVENT_CROP_MOVE, options.cropmove), 
                isFunction(options.cropend) && removeListener(element, EVENT_CROP_END, options.cropend), 
                isFunction(options.crop) && removeListener(element, EVENT_CROP, options.crop), isFunction(options.zoom) && removeListener(element, EVENT_ZOOM, options.zoom), 
                removeListener(cropper, EVENT_POINTER_DOWN, this.onCropStart), options.zoomable && options.zoomOnWheel && removeListener(cropper, EVENT_WHEEL, this.onWheel, {
                    passive: !1,
                    capture: !0
                }), options.toggleDragModeOnDblclick && removeListener(cropper, EVENT_DBLCLICK, this.onDblclick), 
                removeListener(element.ownerDocument, EVENT_POINTER_MOVE, this.onCropMove), removeListener(element.ownerDocument, EVENT_POINTER_UP, this.onCropEnd), 
                options.responsive && removeListener(window, EVENT_RESIZE, this.onResize);
            }
        }, handlers = {
            resize: function() {
                if (!this.disabled) {
                    var canvasData, cropBoxData, options = this.options, container = this.container, containerData = this.containerData, ratioX = container.offsetWidth / containerData.width, ratioY = container.offsetHeight / containerData.height, ratio = Math.abs(ratioX - 1) > Math.abs(ratioY - 1) ? ratioX : ratioY;
                    1 !== ratio && (options.restore && (canvasData = this.getCanvasData(), cropBoxData = this.getCropBoxData()), 
                    this.render(), options.restore && (this.setCanvasData(forEach(canvasData, (function(n, i) {
                        canvasData[i] = n * ratio;
                    }))), this.setCropBoxData(forEach(cropBoxData, (function(n, i) {
                        cropBoxData[i] = n * ratio;
                    })))));
                }
            },
            dblclick: function() {
                this.disabled || this.options.dragMode === DRAG_MODE_NONE || this.setDragMode(hasClass(this.dragBox, CLASS_CROP) ? DRAG_MODE_MOVE : DRAG_MODE_CROP);
            },
            wheel: function(event) {
                var _this = this, ratio = Number(this.options.wheelZoomRatio) || .1, delta = 1;
                this.disabled || (event.preventDefault(), this.wheeling || (this.wheeling = !0, 
                setTimeout((function() {
                    _this.wheeling = !1;
                }), 50), event.deltaY ? delta = event.deltaY > 0 ? 1 : -1 : event.wheelDelta ? delta = -event.wheelDelta / 120 : event.detail && (delta = event.detail > 0 ? 1 : -1), 
                this.zoom(-delta * ratio, event)));
            },
            cropStart: function(event) {
                var buttons = event.buttons, button = event.button;
                if (!(this.disabled || ("mousedown" === event.type || "pointerdown" === event.type && "mouse" === event.pointerType) && (isNumber(buttons) && 1 !== buttons || isNumber(button) && 0 !== button || event.ctrlKey))) {
                    var action, options = this.options, pointers = this.pointers;
                    event.changedTouches ? forEach(event.changedTouches, (function(touch) {
                        pointers[touch.identifier] = getPointer(touch);
                    })) : pointers[event.pointerId || 0] = getPointer(event), action = Object.keys(pointers).length > 1 && options.zoomable && options.zoomOnTouch ? ACTION_ZOOM : getData(event.target, DATA_ACTION), 
                    REGEXP_ACTIONS.test(action) && !1 !== dispatchEvent(this.element, EVENT_CROP_START, {
                        originalEvent: event,
                        action: action
                    }) && (event.preventDefault(), this.action = action, this.cropping = !1, action === ACTION_CROP && (this.cropping = !0, 
                    addClass(this.dragBox, CLASS_MODAL)));
                }
            },
            cropMove: function(event) {
                var action = this.action;
                if (!this.disabled && action) {
                    var pointers = this.pointers;
                    event.preventDefault(), !1 !== dispatchEvent(this.element, EVENT_CROP_MOVE, {
                        originalEvent: event,
                        action: action
                    }) && (event.changedTouches ? forEach(event.changedTouches, (function(touch) {
                        assign(pointers[touch.identifier] || {}, getPointer(touch, !0));
                    })) : assign(pointers[event.pointerId || 0] || {}, getPointer(event, !0)), this.change(event));
                }
            },
            cropEnd: function(event) {
                if (!this.disabled) {
                    var action = this.action, pointers = this.pointers;
                    event.changedTouches ? forEach(event.changedTouches, (function(touch) {
                        delete pointers[touch.identifier];
                    })) : delete pointers[event.pointerId || 0], action && (event.preventDefault(), 
                    Object.keys(pointers).length || (this.action = ""), this.cropping && (this.cropping = !1, 
                    toggleClass(this.dragBox, CLASS_MODAL, this.cropped && this.options.modal)), dispatchEvent(this.element, EVENT_CROP_END, {
                        originalEvent: event,
                        action: action
                    }));
                }
            }
        }, change = {
            change: function(event) {
                var offset, options = this.options, canvasData = this.canvasData, containerData = this.containerData, cropBoxData = this.cropBoxData, pointers = this.pointers, action = this.action, aspectRatio = options.aspectRatio, left = cropBoxData.left, top = cropBoxData.top, width = cropBoxData.width, height = cropBoxData.height, right = left + width, bottom = top + height, minLeft = 0, minTop = 0, maxWidth = containerData.width, maxHeight = containerData.height, renderable = !0;
                !aspectRatio && event.shiftKey && (aspectRatio = width && height ? width / height : 1), 
                this.limited && (minLeft = cropBoxData.minLeft, minTop = cropBoxData.minTop, maxWidth = minLeft + Math.min(containerData.width, canvasData.width, canvasData.left + canvasData.width), 
                maxHeight = minTop + Math.min(containerData.height, canvasData.height, canvasData.top + canvasData.height));
                var pointer = pointers[Object.keys(pointers)[0]], range = {
                    x: pointer.endX - pointer.startX,
                    y: pointer.endY - pointer.startY
                }, check = function(side) {
                    switch (side) {
                      case ACTION_EAST:
                        right + range.x > maxWidth && (range.x = maxWidth - right);
                        break;

                      case ACTION_WEST:
                        left + range.x < minLeft && (range.x = minLeft - left);
                        break;

                      case ACTION_NORTH:
                        top + range.y < minTop && (range.y = minTop - top);
                        break;

                      case ACTION_SOUTH:
                        bottom + range.y > maxHeight && (range.y = maxHeight - bottom);
                    }
                };
                switch (action) {
                  case ACTION_ALL:
                    left += range.x, top += range.y;
                    break;

                  case ACTION_EAST:
                    if (range.x >= 0 && (right >= maxWidth || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
                        renderable = !1;
                        break;
                    }
                    check(ACTION_EAST), (width += range.x) < 0 && (action = ACTION_WEST, left -= width = -width), 
                    aspectRatio && (height = width / aspectRatio, top += (cropBoxData.height - height) / 2);
                    break;

                  case ACTION_NORTH:
                    if (range.y <= 0 && (top <= minTop || aspectRatio && (left <= minLeft || right >= maxWidth))) {
                        renderable = !1;
                        break;
                    }
                    check(ACTION_NORTH), height -= range.y, top += range.y, height < 0 && (action = ACTION_SOUTH, 
                    top -= height = -height), aspectRatio && (width = height * aspectRatio, left += (cropBoxData.width - width) / 2);
                    break;

                  case ACTION_WEST:
                    if (range.x <= 0 && (left <= minLeft || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
                        renderable = !1;
                        break;
                    }
                    check(ACTION_WEST), width -= range.x, left += range.x, width < 0 && (action = ACTION_EAST, 
                    left -= width = -width), aspectRatio && (height = width / aspectRatio, top += (cropBoxData.height - height) / 2);
                    break;

                  case ACTION_SOUTH:
                    if (range.y >= 0 && (bottom >= maxHeight || aspectRatio && (left <= minLeft || right >= maxWidth))) {
                        renderable = !1;
                        break;
                    }
                    check(ACTION_SOUTH), (height += range.y) < 0 && (action = ACTION_NORTH, top -= height = -height), 
                    aspectRatio && (width = height * aspectRatio, left += (cropBoxData.width - width) / 2);
                    break;

                  case ACTION_NORTH_EAST:
                    if (aspectRatio) {
                        if (range.y <= 0 && (top <= minTop || right >= maxWidth)) {
                            renderable = !1;
                            break;
                        }
                        check(ACTION_NORTH), height -= range.y, top += range.y, width = height * aspectRatio;
                    } else check(ACTION_NORTH), check(ACTION_EAST), range.x >= 0 ? right < maxWidth ? width += range.x : range.y <= 0 && top <= minTop && (renderable = !1) : width += range.x, 
                    range.y <= 0 ? top > minTop && (height -= range.y, top += range.y) : (height -= range.y, 
                    top += range.y);
                    width < 0 && height < 0 ? (action = ACTION_SOUTH_WEST, top -= height = -height, 
                    left -= width = -width) : width < 0 ? (action = ACTION_NORTH_WEST, left -= width = -width) : height < 0 && (action = ACTION_SOUTH_EAST, 
                    top -= height = -height);
                    break;

                  case ACTION_NORTH_WEST:
                    if (aspectRatio) {
                        if (range.y <= 0 && (top <= minTop || left <= minLeft)) {
                            renderable = !1;
                            break;
                        }
                        check(ACTION_NORTH), height -= range.y, top += range.y, width = height * aspectRatio, 
                        left += cropBoxData.width - width;
                    } else check(ACTION_NORTH), check(ACTION_WEST), range.x <= 0 ? left > minLeft ? (width -= range.x, 
                    left += range.x) : range.y <= 0 && top <= minTop && (renderable = !1) : (width -= range.x, 
                    left += range.x), range.y <= 0 ? top > minTop && (height -= range.y, top += range.y) : (height -= range.y, 
                    top += range.y);
                    width < 0 && height < 0 ? (action = ACTION_SOUTH_EAST, top -= height = -height, 
                    left -= width = -width) : width < 0 ? (action = ACTION_NORTH_EAST, left -= width = -width) : height < 0 && (action = ACTION_SOUTH_WEST, 
                    top -= height = -height);
                    break;

                  case ACTION_SOUTH_WEST:
                    if (aspectRatio) {
                        if (range.x <= 0 && (left <= minLeft || bottom >= maxHeight)) {
                            renderable = !1;
                            break;
                        }
                        check(ACTION_WEST), width -= range.x, left += range.x, height = width / aspectRatio;
                    } else check(ACTION_SOUTH), check(ACTION_WEST), range.x <= 0 ? left > minLeft ? (width -= range.x, 
                    left += range.x) : range.y >= 0 && bottom >= maxHeight && (renderable = !1) : (width -= range.x, 
                    left += range.x), range.y >= 0 ? bottom < maxHeight && (height += range.y) : height += range.y;
                    width < 0 && height < 0 ? (action = ACTION_NORTH_EAST, top -= height = -height, 
                    left -= width = -width) : width < 0 ? (action = ACTION_SOUTH_EAST, left -= width = -width) : height < 0 && (action = ACTION_NORTH_WEST, 
                    top -= height = -height);
                    break;

                  case ACTION_SOUTH_EAST:
                    if (aspectRatio) {
                        if (range.x >= 0 && (right >= maxWidth || bottom >= maxHeight)) {
                            renderable = !1;
                            break;
                        }
                        check(ACTION_EAST), height = (width += range.x) / aspectRatio;
                    } else check(ACTION_SOUTH), check(ACTION_EAST), range.x >= 0 ? right < maxWidth ? width += range.x : range.y >= 0 && bottom >= maxHeight && (renderable = !1) : width += range.x, 
                    range.y >= 0 ? bottom < maxHeight && (height += range.y) : height += range.y;
                    width < 0 && height < 0 ? (action = ACTION_NORTH_WEST, top -= height = -height, 
                    left -= width = -width) : width < 0 ? (action = ACTION_SOUTH_WEST, left -= width = -width) : height < 0 && (action = ACTION_NORTH_EAST, 
                    top -= height = -height);
                    break;

                  case ACTION_MOVE:
                    this.move(range.x, range.y), renderable = !1;
                    break;

                  case ACTION_ZOOM:
                    this.zoom(getMaxZoomRatio(pointers), event), renderable = !1;
                    break;

                  case ACTION_CROP:
                    if (!range.x || !range.y) {
                        renderable = !1;
                        break;
                    }
                    offset = getOffset(this.cropper), left = pointer.startX - offset.left, top = pointer.startY - offset.top, 
                    width = cropBoxData.minWidth, height = cropBoxData.minHeight, range.x > 0 ? action = range.y > 0 ? ACTION_SOUTH_EAST : ACTION_NORTH_EAST : range.x < 0 && (left -= width, 
                    action = range.y > 0 ? ACTION_SOUTH_WEST : ACTION_NORTH_WEST), range.y < 0 && (top -= height), 
                    this.cropped || (removeClass(this.cropBox, CLASS_HIDDEN), this.cropped = !0, this.limited && this.limitCropBox(!0, !0));
                }
                renderable && (cropBoxData.width = width, cropBoxData.height = height, cropBoxData.left = left, 
                cropBoxData.top = top, this.action = action, this.renderCropBox()), forEach(pointers, (function(p) {
                    p.startX = p.endX, p.startY = p.endY;
                }));
            }
        }, methods = {
            crop: function() {
                return !this.ready || this.cropped || this.disabled || (this.cropped = !0, this.limitCropBox(!0, !0), 
                this.options.modal && addClass(this.dragBox, CLASS_MODAL), removeClass(this.cropBox, CLASS_HIDDEN), 
                this.setCropBoxData(this.initialCropBoxData)), this;
            },
            reset: function() {
                return this.ready && !this.disabled && (this.imageData = assign({}, this.initialImageData), 
                this.canvasData = assign({}, this.initialCanvasData), this.cropBoxData = assign({}, this.initialCropBoxData), 
                this.renderCanvas(), this.cropped && this.renderCropBox()), this;
            },
            clear: function() {
                return this.cropped && !this.disabled && (assign(this.cropBoxData, {
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0
                }), this.cropped = !1, this.renderCropBox(), this.limitCanvas(!0, !0), this.renderCanvas(), 
                removeClass(this.dragBox, CLASS_MODAL), addClass(this.cropBox, CLASS_HIDDEN)), this;
            },
            replace: function(url) {
                var hasSameSize = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                return !this.disabled && url && (this.isImg && (this.element.src = url), hasSameSize ? (this.url = url, 
                this.image.src = url, this.ready && (this.viewBoxImage.src = url, forEach(this.previews, (function(element) {
                    element.getElementsByTagName("img")[0].src = url;
                })))) : (this.isImg && (this.replaced = !0), this.options.data = null, this.uncreate(), 
                this.load(url))), this;
            },
            enable: function() {
                return this.ready && this.disabled && (this.disabled = !1, removeClass(this.cropper, CLASS_DISABLED)), 
                this;
            },
            disable: function() {
                return this.ready && !this.disabled && (this.disabled = !0, addClass(this.cropper, CLASS_DISABLED)), 
                this;
            },
            destroy: function() {
                var element = this.element;
                return element[NAMESPACE] ? (element[NAMESPACE] = void 0, this.isImg && this.replaced && (element.src = this.originalUrl), 
                this.uncreate(), this) : this;
            },
            move: function(offsetX) {
                var offsetY = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : offsetX, _this$canvasData = this.canvasData, left = _this$canvasData.left, top = _this$canvasData.top;
                return this.moveTo(isUndefined(offsetX) ? offsetX : left + Number(offsetX), isUndefined(offsetY) ? offsetY : top + Number(offsetY));
            },
            moveTo: function(x) {
                var y = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : x, canvasData = this.canvasData, changed = !1;
                return x = Number(x), y = Number(y), this.ready && !this.disabled && this.options.movable && (isNumber(x) && (canvasData.left = x, 
                changed = !0), isNumber(y) && (canvasData.top = y, changed = !0), changed && this.renderCanvas(!0)), 
                this;
            },
            zoom: function(ratio, _originalEvent) {
                var canvasData = this.canvasData;
                return ratio = (ratio = Number(ratio)) < 0 ? 1 / (1 - ratio) : 1 + ratio, this.zoomTo(canvasData.width * ratio / canvasData.naturalWidth, null, _originalEvent);
            },
            zoomTo: function(ratio, pivot, _originalEvent) {
                var options = this.options, canvasData = this.canvasData, width = canvasData.width, height = canvasData.height, naturalWidth = canvasData.naturalWidth, naturalHeight = canvasData.naturalHeight;
                if ((ratio = Number(ratio)) >= 0 && this.ready && !this.disabled && options.zoomable) {
                    var newWidth = naturalWidth * ratio, newHeight = naturalHeight * ratio;
                    if (!1 === dispatchEvent(this.element, EVENT_ZOOM, {
                        ratio: ratio,
                        oldRatio: width / naturalWidth,
                        originalEvent: _originalEvent
                    })) return this;
                    if (_originalEvent) {
                        var pointers = this.pointers, offset = getOffset(this.cropper), center = pointers && Object.keys(pointers).length ? getPointersCenter(pointers) : {
                            pageX: _originalEvent.pageX,
                            pageY: _originalEvent.pageY
                        };
                        canvasData.left -= (newWidth - width) * ((center.pageX - offset.left - canvasData.left) / width), 
                        canvasData.top -= (newHeight - height) * ((center.pageY - offset.top - canvasData.top) / height);
                    } else isPlainObject(pivot) && isNumber(pivot.x) && isNumber(pivot.y) ? (canvasData.left -= (newWidth - width) * ((pivot.x - canvasData.left) / width), 
                    canvasData.top -= (newHeight - height) * ((pivot.y - canvasData.top) / height)) : (canvasData.left -= (newWidth - width) / 2, 
                    canvasData.top -= (newHeight - height) / 2);
                    canvasData.width = newWidth, canvasData.height = newHeight, this.renderCanvas(!0);
                }
                return this;
            },
            rotate: function(degree) {
                return this.rotateTo((this.imageData.rotate || 0) + Number(degree));
            },
            rotateTo: function(degree) {
                return isNumber(degree = Number(degree)) && this.ready && !this.disabled && this.options.rotatable && (this.imageData.rotate = degree % 360, 
                this.renderCanvas(!0, !0)), this;
            },
            scaleX: function(_scaleX) {
                var scaleY = this.imageData.scaleY;
                return this.scale(_scaleX, isNumber(scaleY) ? scaleY : 1);
            },
            scaleY: function(_scaleY) {
                var scaleX = this.imageData.scaleX;
                return this.scale(isNumber(scaleX) ? scaleX : 1, _scaleY);
            },
            scale: function(scaleX) {
                var scaleY = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : scaleX, imageData = this.imageData, transformed = !1;
                return scaleX = Number(scaleX), scaleY = Number(scaleY), this.ready && !this.disabled && this.options.scalable && (isNumber(scaleX) && (imageData.scaleX = scaleX, 
                transformed = !0), isNumber(scaleY) && (imageData.scaleY = scaleY, transformed = !0), 
                transformed && this.renderCanvas(!0, !0)), this;
            },
            getData: function() {
                var data, rounded = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], options = this.options, imageData = this.imageData, canvasData = this.canvasData, cropBoxData = this.cropBoxData;
                if (this.ready && this.cropped) {
                    data = {
                        x: cropBoxData.left - canvasData.left,
                        y: cropBoxData.top - canvasData.top,
                        width: cropBoxData.width,
                        height: cropBoxData.height
                    };
                    var ratio = imageData.width / imageData.naturalWidth;
                    if (forEach(data, (function(n, i) {
                        data[i] = n / ratio;
                    })), rounded) {
                        var bottom = Math.round(data.y + data.height), right = Math.round(data.x + data.width);
                        data.x = Math.round(data.x), data.y = Math.round(data.y), data.width = right - data.x, 
                        data.height = bottom - data.y;
                    }
                } else data = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                };
                return options.rotatable && (data.rotate = imageData.rotate || 0), options.scalable && (data.scaleX = imageData.scaleX || 1, 
                data.scaleY = imageData.scaleY || 1), data;
            },
            setData: function(data) {
                var options = this.options, imageData = this.imageData, canvasData = this.canvasData, cropBoxData = {};
                if (this.ready && !this.disabled && isPlainObject(data)) {
                    var transformed = !1;
                    options.rotatable && isNumber(data.rotate) && data.rotate !== imageData.rotate && (imageData.rotate = data.rotate, 
                    transformed = !0), options.scalable && (isNumber(data.scaleX) && data.scaleX !== imageData.scaleX && (imageData.scaleX = data.scaleX, 
                    transformed = !0), isNumber(data.scaleY) && data.scaleY !== imageData.scaleY && (imageData.scaleY = data.scaleY, 
                    transformed = !0)), transformed && this.renderCanvas(!0, !0);
                    var ratio = imageData.width / imageData.naturalWidth;
                    isNumber(data.x) && (cropBoxData.left = data.x * ratio + canvasData.left), isNumber(data.y) && (cropBoxData.top = data.y * ratio + canvasData.top), 
                    isNumber(data.width) && (cropBoxData.width = data.width * ratio), isNumber(data.height) && (cropBoxData.height = data.height * ratio), 
                    this.setCropBoxData(cropBoxData);
                }
                return this;
            },
            getContainerData: function() {
                return this.ready ? assign({}, this.containerData) : {};
            },
            getImageData: function() {
                return this.sized ? assign({}, this.imageData) : {};
            },
            getCanvasData: function() {
                var canvasData = this.canvasData, data = {};
                return this.ready && forEach([ "left", "top", "width", "height", "naturalWidth", "naturalHeight" ], (function(n) {
                    data[n] = canvasData[n];
                })), data;
            },
            setCanvasData: function(data) {
                var canvasData = this.canvasData, aspectRatio = canvasData.aspectRatio;
                return this.ready && !this.disabled && isPlainObject(data) && (isNumber(data.left) && (canvasData.left = data.left), 
                isNumber(data.top) && (canvasData.top = data.top), isNumber(data.width) ? (canvasData.width = data.width, 
                canvasData.height = data.width / aspectRatio) : isNumber(data.height) && (canvasData.height = data.height, 
                canvasData.width = data.height * aspectRatio), this.renderCanvas(!0)), this;
            },
            getCropBoxData: function() {
                var data, cropBoxData = this.cropBoxData;
                return this.ready && this.cropped && (data = {
                    left: cropBoxData.left,
                    top: cropBoxData.top,
                    width: cropBoxData.width,
                    height: cropBoxData.height
                }), data || {};
            },
            setCropBoxData: function(data) {
                var widthChanged, heightChanged, cropBoxData = this.cropBoxData, aspectRatio = this.options.aspectRatio;
                return this.ready && this.cropped && !this.disabled && isPlainObject(data) && (isNumber(data.left) && (cropBoxData.left = data.left), 
                isNumber(data.top) && (cropBoxData.top = data.top), isNumber(data.width) && data.width !== cropBoxData.width && (widthChanged = !0, 
                cropBoxData.width = data.width), isNumber(data.height) && data.height !== cropBoxData.height && (heightChanged = !0, 
                cropBoxData.height = data.height), aspectRatio && (widthChanged ? cropBoxData.height = cropBoxData.width / aspectRatio : heightChanged && (cropBoxData.width = cropBoxData.height * aspectRatio)), 
                this.renderCropBox()), this;
            },
            getCroppedCanvas: function() {
                var options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (!this.ready || !window.HTMLCanvasElement) return null;
                var canvasData = this.canvasData, source = getSourceCanvas(this.image, this.imageData, canvasData, options);
                if (!this.cropped) return source;
                var _this$getData = this.getData(), initialX = _this$getData.x, initialY = _this$getData.y, initialWidth = _this$getData.width, initialHeight = _this$getData.height, ratio = source.width / Math.floor(canvasData.naturalWidth);
                1 !== ratio && (initialX *= ratio, initialY *= ratio, initialWidth *= ratio, initialHeight *= ratio);
                var aspectRatio = initialWidth / initialHeight, maxSizes = getAdjustedSizes({
                    aspectRatio: aspectRatio,
                    width: options.maxWidth || 1 / 0,
                    height: options.maxHeight || 1 / 0
                }), minSizes = getAdjustedSizes({
                    aspectRatio: aspectRatio,
                    width: options.minWidth || 0,
                    height: options.minHeight || 0
                }, "cover"), _getAdjustedSizes = getAdjustedSizes({
                    aspectRatio: aspectRatio,
                    width: options.width || (1 !== ratio ? source.width : initialWidth),
                    height: options.height || (1 !== ratio ? source.height : initialHeight)
                }), width = _getAdjustedSizes.width, height = _getAdjustedSizes.height;
                width = Math.min(maxSizes.width, Math.max(minSizes.width, width)), height = Math.min(maxSizes.height, Math.max(minSizes.height, height));
                var canvas = document.createElement("canvas"), context = canvas.getContext("2d");
                canvas.width = normalizeDecimalNumber(width), canvas.height = normalizeDecimalNumber(height), 
                context.fillStyle = options.fillColor || "transparent", context.fillRect(0, 0, width, height);
                var _options$imageSmoothi = options.imageSmoothingEnabled, imageSmoothingEnabled = void 0 === _options$imageSmoothi || _options$imageSmoothi, imageSmoothingQuality = options.imageSmoothingQuality;
                context.imageSmoothingEnabled = imageSmoothingEnabled, imageSmoothingQuality && (context.imageSmoothingQuality = imageSmoothingQuality);
                var srcWidth, srcHeight, dstX, dstY, dstWidth, dstHeight, sourceWidth = source.width, sourceHeight = source.height, srcX = initialX, srcY = initialY;
                srcX <= -initialWidth || srcX > sourceWidth ? (srcX = 0, srcWidth = 0, dstX = 0, 
                dstWidth = 0) : srcX <= 0 ? (dstX = -srcX, srcX = 0, dstWidth = srcWidth = Math.min(sourceWidth, initialWidth + srcX)) : srcX <= sourceWidth && (dstX = 0, 
                dstWidth = srcWidth = Math.min(initialWidth, sourceWidth - srcX)), srcWidth <= 0 || srcY <= -initialHeight || srcY > sourceHeight ? (srcY = 0, 
                srcHeight = 0, dstY = 0, dstHeight = 0) : srcY <= 0 ? (dstY = -srcY, srcY = 0, dstHeight = srcHeight = Math.min(sourceHeight, initialHeight + srcY)) : srcY <= sourceHeight && (dstY = 0, 
                dstHeight = srcHeight = Math.min(initialHeight, sourceHeight - srcY));
                var params = [ srcX, srcY, srcWidth, srcHeight ];
                if (dstWidth > 0 && dstHeight > 0) {
                    var scale = width / initialWidth;
                    params.push(dstX * scale, dstY * scale, dstWidth * scale, dstHeight * scale);
                }
                return context.drawImage.apply(context, [ source ].concat(_toConsumableArray(params.map((function(param) {
                    return Math.floor(normalizeDecimalNumber(param));
                }))))), canvas;
            },
            setAspectRatio: function(aspectRatio) {
                var options = this.options;
                return this.disabled || isUndefined(aspectRatio) || (options.aspectRatio = Math.max(0, aspectRatio) || NaN, 
                this.ready && (this.initCropBox(), this.cropped && this.renderCropBox())), this;
            },
            setDragMode: function(mode) {
                var options = this.options, dragBox = this.dragBox, face = this.face;
                if (this.ready && !this.disabled) {
                    var croppable = mode === DRAG_MODE_CROP, movable = options.movable && mode === DRAG_MODE_MOVE;
                    mode = croppable || movable ? mode : DRAG_MODE_NONE, options.dragMode = mode, setData(dragBox, DATA_ACTION, mode), 
                    toggleClass(dragBox, CLASS_CROP, croppable), toggleClass(dragBox, CLASS_MOVE, movable), 
                    options.cropBoxMovable || (setData(face, DATA_ACTION, mode), toggleClass(face, CLASS_CROP, croppable), 
                    toggleClass(face, CLASS_MOVE, movable));
                }
                return this;
            }
        }, AnotherCropper = WINDOW.Cropper, Cropper = function() {
            function Cropper(element) {
                var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (_classCallCheck(this, Cropper), !element || !REGEXP_TAG_NAME.test(element.tagName)) throw new Error("The first argument is required and must be an <img> or <canvas> element.");
                this.element = element, this.options = assign({}, DEFAULTS, isPlainObject(options) && options), 
                this.cropped = !1, this.disabled = !1, this.pointers = {}, this.ready = !1, this.reloading = !1, 
                this.replaced = !1, this.sized = !1, this.sizing = !1, this.init();
            }
            return _createClass(Cropper, [ {
                key: "init",
                value: function() {
                    var url, element = this.element, tagName = element.tagName.toLowerCase();
                    if (!element[NAMESPACE]) {
                        if (element[NAMESPACE] = this, "img" === tagName) {
                            if (this.isImg = !0, url = element.getAttribute("src") || "", this.originalUrl = url, 
                            !url) return;
                            url = element.src;
                        } else "canvas" === tagName && window.HTMLCanvasElement && (url = element.toDataURL());
                        this.load(url);
                    }
                }
            }, {
                key: "load",
                value: function(url) {
                    var _this = this;
                    if (url) {
                        this.url = url, this.imageData = {};
                        var element = this.element, options = this.options;
                        if (options.rotatable || options.scalable || (options.checkOrientation = !1), options.checkOrientation && window.ArrayBuffer) if (REGEXP_DATA_URL.test(url)) REGEXP_DATA_URL_JPEG.test(url) ? this.read(dataURLToArrayBuffer(url)) : this.clone(); else {
                            var xhr = new XMLHttpRequest, clone = this.clone.bind(this);
                            this.reloading = !0, this.xhr = xhr, xhr.onabort = clone, xhr.onerror = clone, xhr.ontimeout = clone, 
                            xhr.onprogress = function() {
                                xhr.getResponseHeader("content-type") !== MIME_TYPE_JPEG && xhr.abort();
                            }, xhr.onload = function() {
                                _this.read(xhr.response);
                            }, xhr.onloadend = function() {
                                _this.reloading = !1, _this.xhr = null;
                            }, options.checkCrossOrigin && isCrossOriginURL(url) && element.crossOrigin && (url = addTimestamp(url)), 
                            xhr.open("GET", url, !0), xhr.responseType = "arraybuffer", xhr.withCredentials = "use-credentials" === element.crossOrigin, 
                            xhr.send();
                        } else this.clone();
                    }
                }
            }, {
                key: "read",
                value: function(arrayBuffer) {
                    var options = this.options, imageData = this.imageData, orientation = resetAndGetOrientation(arrayBuffer), rotate = 0, scaleX = 1, scaleY = 1;
                    if (orientation > 1) {
                        this.url = arrayBufferToDataURL(arrayBuffer, MIME_TYPE_JPEG);
                        var _parseOrientation = parseOrientation(orientation);
                        rotate = _parseOrientation.rotate, scaleX = _parseOrientation.scaleX, scaleY = _parseOrientation.scaleY;
                    }
                    options.rotatable && (imageData.rotate = rotate), options.scalable && (imageData.scaleX = scaleX, 
                    imageData.scaleY = scaleY), this.clone();
                }
            }, {
                key: "clone",
                value: function() {
                    var element = this.element, url = this.url, crossOrigin = element.crossOrigin, crossOriginUrl = url;
                    this.options.checkCrossOrigin && isCrossOriginURL(url) && (crossOrigin || (crossOrigin = "anonymous"), 
                    crossOriginUrl = addTimestamp(url)), this.crossOrigin = crossOrigin, this.crossOriginUrl = crossOriginUrl;
                    var image = document.createElement("img");
                    crossOrigin && (image.crossOrigin = crossOrigin), image.src = crossOriginUrl || url, 
                    image.alt = element.alt || "The image to crop", this.image = image, image.onload = this.start.bind(this), 
                    image.onerror = this.stop.bind(this), addClass(image, CLASS_HIDE), element.parentNode.insertBefore(image, element.nextSibling);
                }
            }, {
                key: "start",
                value: function() {
                    var _this2 = this, image = this.image;
                    image.onload = null, image.onerror = null, this.sizing = !0;
                    var isIOSWebKit = WINDOW.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(WINDOW.navigator.userAgent), done = function(naturalWidth, naturalHeight) {
                        assign(_this2.imageData, {
                            naturalWidth: naturalWidth,
                            naturalHeight: naturalHeight,
                            aspectRatio: naturalWidth / naturalHeight
                        }), _this2.initialImageData = assign({}, _this2.imageData), _this2.sizing = !1, 
                        _this2.sized = !0, _this2.build();
                    };
                    if (!image.naturalWidth || isIOSWebKit) {
                        var sizingImage = document.createElement("img"), body = document.body || document.documentElement;
                        this.sizingImage = sizingImage, sizingImage.onload = function() {
                            done(sizingImage.width, sizingImage.height), isIOSWebKit || body.removeChild(sizingImage);
                        }, sizingImage.src = image.src, isIOSWebKit || (sizingImage.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", 
                        body.appendChild(sizingImage));
                    } else done(image.naturalWidth, image.naturalHeight);
                }
            }, {
                key: "stop",
                value: function() {
                    var image = this.image;
                    image.onload = null, image.onerror = null, image.parentNode.removeChild(image), 
                    this.image = null;
                }
            }, {
                key: "build",
                value: function() {
                    if (this.sized && !this.ready) {
                        var element = this.element, options = this.options, image = this.image, container = element.parentNode, template = document.createElement("div");
                        template.innerHTML = TEMPLATE;
                        var cropper = template.querySelector(".".concat(NAMESPACE, "-container")), canvas = cropper.querySelector(".".concat(NAMESPACE, "-canvas")), dragBox = cropper.querySelector(".".concat(NAMESPACE, "-drag-box")), cropBox = cropper.querySelector(".".concat(NAMESPACE, "-crop-box")), face = cropBox.querySelector(".".concat(NAMESPACE, "-face"));
                        this.container = container, this.cropper = cropper, this.canvas = canvas, this.dragBox = dragBox, 
                        this.cropBox = cropBox, this.viewBox = cropper.querySelector(".".concat(NAMESPACE, "-view-box")), 
                        this.face = face, canvas.appendChild(image), addClass(element, CLASS_HIDDEN), container.insertBefore(cropper, element.nextSibling), 
                        this.isImg || removeClass(image, CLASS_HIDE), this.initPreview(), this.bind(), options.initialAspectRatio = Math.max(0, options.initialAspectRatio) || NaN, 
                        options.aspectRatio = Math.max(0, options.aspectRatio) || NaN, options.viewMode = Math.max(0, Math.min(3, Math.round(options.viewMode))) || 0, 
                        addClass(cropBox, CLASS_HIDDEN), options.guides || addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-dashed")), CLASS_HIDDEN), 
                        options.center || addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-center")), CLASS_HIDDEN), 
                        options.background && addClass(cropper, "".concat(NAMESPACE, "-bg")), options.highlight || addClass(face, CLASS_INVISIBLE), 
                        options.cropBoxMovable && (addClass(face, CLASS_MOVE), setData(face, DATA_ACTION, ACTION_ALL)), 
                        options.cropBoxResizable || (addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-line")), CLASS_HIDDEN), 
                        addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-point")), CLASS_HIDDEN)), 
                        this.render(), this.ready = !0, this.setDragMode(options.dragMode), options.autoCrop && this.crop(), 
                        this.setData(options.data), isFunction(options.ready) && addListener(element, EVENT_READY, options.ready, {
                            once: !0
                        }), dispatchEvent(element, EVENT_READY);
                    }
                }
            }, {
                key: "unbuild",
                value: function() {
                    this.ready && (this.ready = !1, this.unbind(), this.resetPreview(), this.cropper.parentNode.removeChild(this.cropper), 
                    removeClass(this.element, CLASS_HIDDEN));
                }
            }, {
                key: "uncreate",
                value: function() {
                    this.ready ? (this.unbuild(), this.ready = !1, this.cropped = !1) : this.sizing ? (this.sizingImage.onload = null, 
                    this.sizing = !1, this.sized = !1) : this.reloading ? (this.xhr.onabort = null, 
                    this.xhr.abort()) : this.image && this.stop();
                }
            } ], [ {
                key: "noConflict",
                value: function() {
                    return window.Cropper = AnotherCropper, Cropper;
                }
            }, {
                key: "setDefaults",
                value: function(options) {
                    assign(DEFAULTS, isPlainObject(options) && options);
                }
            } ]), Cropper;
        }();
        return assign(Cropper.prototype, render, preview, events, handlers, change, methods), 
        Cropper;
    }();
}, function(module, exports, __webpack_require__) {} ]);