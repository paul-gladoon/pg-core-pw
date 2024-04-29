"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayValuesKeys = exports.BaseElement = void 0;
var evaluate_fn_1 = require("./utils/evaluate.fn");
var waiter_1 = require("./utils/waiter");
var _n = __importStar(require("lodash"));
var step_1 = require("./reporter/step");
var arrayNullKeys = [
    'text',
    'color',
    'tagName',
    'boundingClientRect',
    'childrenTags',
    'checked',
    'isDisabled',
    'size',
    'currentSrc',
    'value',
    'href',
    'selected',
];
var arrayValuesKeys = ['attribute', 'style', 'styleBefore'];
exports.arrayValuesKeys = arrayValuesKeys;
var BaseElement = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _click_decorators;
    var _getScreenshot_decorators;
    var _get_decorators;
    var _isDisplay_decorators;
    var _waitForDisplayedState_decorators;
    var _waitForDataState_decorators;
    var _hover_decorators;
    var _scroll_decorators;
    var _isExist_decorators;
    return _a = /** @class */ (function () {
            function BaseElement(page, parentLocator, elementRootSelector, name, options) {
                this.page = __runInitializers(this, _instanceExtraInitializers);
                this.parentLocator = parentLocator;
                this.elementRootSelector = elementRootSelector;
                this.name = name;
                this.page = page;
                this.options = options;
            }
            Object.defineProperty(BaseElement.prototype, "element", {
                get: function () {
                    var _b = this, options = _b.options, page = _b.page, parentLocator = _b.parentLocator, elementRootSelector = _b.elementRootSelector;
                    var rootLocator = (options === null || options === void 0 ? void 0 : options.searchFromDOMRoot) ? page() : parentLocator();
                    if (options === null || options === void 0 ? void 0 : options.locatorOpts) {
                        var locatorOpts = options.locatorOpts;
                        return typeof locatorOpts === 'string'
                            ? rootLocator.locator(elementRootSelector, __assign({}, options === null || options === void 0 ? void 0 : options.selectorOpts))[locatorOpts]()
                            : rootLocator.locator(elementRootSelector, __assign({}, options === null || options === void 0 ? void 0 : options.selectorOpts)).nth(locatorOpts.nth);
                    }
                    return rootLocator.locator(elementRootSelector, __assign({}, options === null || options === void 0 ? void 0 : options.selectorOpts));
                },
                enumerable: false,
                configurable: true
            });
            BaseElement.prototype.parentElement = function () {
                return this.parentLocator();
            };
            Object.defineProperty(BaseElement.prototype, "override", {
                set: function (method) {
                    var methodsWhatCanBeOverridden = /^get|click|sendKeys|isDisplay|hover/;
                    var name = method.name;
                    var parsedOverrideName = name.match(methodsWhatCanBeOverridden);
                    if (!parsedOverrideName) {
                        throw new Error('You are trying to "override" a method that is not in the allowed list to "override"');
                    }
                    this["".concat(parsedOverrideName[0], "Initial")] = this[parsedOverrideName[0]];
                    this[parsedOverrideName[0]] = method.bind(this);
                },
                enumerable: false,
                configurable: true
            });
            BaseElement.prototype.click = function (options) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, this.element.click(options)];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            BaseElement.prototype.getScreenshot = function (_b) {
                return __awaiter(this, arguments, void 0, function (_c) {
                    var filePath = _c.filePath, viewOptions = _c.viewOptions;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, this.element.screenshot(__assign({ path: filePath }, viewOptions))];
                            case 1:
                                _d.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            BaseElement.prototype.get = function (getObj) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        return [2 /*return*/, this.element.evaluate(function (_element, _b) {
                                var getObj = _b.getObj, getValues = _b.getValues;
                                var fn = new Function("return ".concat(getValues))();
                                var values = {
                                    isDisabled: function () {
                                        return _element.disabled;
                                    },
                                    attribute: function (attr) {
                                        return _element.getAttribute(attr);
                                    },
                                    color: function () {
                                        return window.getComputedStyle(_element).color;
                                    },
                                    tagName: function () {
                                        return _element.tagName;
                                    },
                                    text: function () {
                                        return _element.innerText.trim();
                                    },
                                    style: function (key) {
                                        return window.getComputedStyle(_element)[key];
                                    },
                                    styleBefore: function (key) {
                                        return window.getComputedStyle(_element, ':before')[key];
                                    },
                                    boundingClientRect: function () {
                                        return _element.getBoundingClientRect();
                                    },
                                    childrenTags: function () {
                                        var childrenList = _element.children;
                                        return Array.prototype.map.call(childrenList, function (ch) {
                                            return ch.tagName;
                                        });
                                    },
                                };
                                return fn(getObj, values);
                            }, { getObj: getObj, getValues: evaluate_fn_1.getValues.toString() })];
                    });
                });
            };
            BaseElement.prototype.isDisplay = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        return [2 /*return*/, this.element.isVisible()];
                    });
                });
            };
            BaseElement.prototype.waitForDisplayedState = function (expectedState, waitTime, dontThrowError) {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_b) {
                        return [2 /*return*/, waiter_1.waiter.waitForState(function () { return __awaiter(_this, void 0, void 0, function () {
                                var isDisplayResult;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, this.isDisplay()];
                                        case 1:
                                            isDisplayResult = _b.sent();
                                            return [2 /*return*/, _n.isEqual(isDisplayResult, expectedState)];
                                    }
                                });
                            }); }, {
                                message: "Wait for displayed state on \"".concat(this.name, "\" element is failed, element with selector: \"").concat(this.element.toString(), "\""),
                                timeout: waitTime,
                                interval: 500,
                                dontThrow: dontThrowError,
                            })];
                    });
                });
            };
            BaseElement.prototype.waitForDataState = function (_b, waitTime_1, dontThrowError_1) {
                return __awaiter(this, arguments, void 0, function (_c, waitTime, dontThrowError) {
                    var tempObj, _i, _d, key;
                    var _this = this;
                    var expectedState = _c.expectedState, includes = _c.includes;
                    return __generator(this, function (_e) {
                        tempObj = {};
                        for (_i = 0, _d = Object.keys(expectedState); _i < _d.length; _i++) {
                            key = _d[_i];
                            if (arrayNullKeys.includes(key)) {
                                tempObj[key] = null;
                            }
                            if (arrayValuesKeys.includes(key)) {
                                tempObj[key] = Object.keys(expectedState[key]);
                            }
                        }
                        return [2 /*return*/, waiter_1.waiter.waitForState(function () { return __awaiter(_this, void 0, void 0, function () {
                                var getResult, expectedValuesList_1, resultValuesList;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.get(tempObj)];
                                        case 1:
                                            getResult = _a.sent();
                                            if (_n.isBoolean(includes)) {
                                                expectedValuesList_1 = Object.values(expectedState);
                                                resultValuesList = Object.values(getResult);
                                                return [2 /*return*/, resultValuesList.every(function (itemValue, index) {
                                                        if (_n.isObject(itemValue)) {
                                                            return Object.keys(itemValue).every(function (key) {
                                                                return includes
                                                                    ? itemValue[key].includes(expectedValuesList_1[index][key])
                                                                    : !itemValue[key].includes(expectedValuesList_1[index][key]);
                                                            });
                                                        }
                                                        return includes ? itemValue.includes(expectedValuesList_1[index]) : !itemValue.includes(expectedValuesList_1[index]);
                                                    })];
                                            }
                                            return [2 /*return*/, _n.isEqual(getResult, expectedState)];
                                    }
                                });
                            }); }, {
                                message: "Wait for data state on \"".concat(this.name, "\" element is failed, for data: \"").concat(JSON.stringify(expectedState), "\""),
                                timeout: waitTime,
                                interval: 500,
                                dontThrow: dontThrowError,
                            })];
                    });
                });
            };
            BaseElement.prototype.hover = function (options) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, this.waitExist()];
                            case 1:
                                _b.sent();
                                return [4 /*yield*/, this.element.hover(__assign({ force: true }, options))];
                            case 2:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            BaseElement.prototype.scroll = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, this.element.scrollIntoViewIfNeeded()];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            BaseElement.prototype.isExist = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, this.element.count()];
                            case 1: return [2 /*return*/, !!(_b.sent())];
                        }
                    });
                });
            };
            BaseElement.prototype.waitVisible = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, waiter_1.waiter.waitFor(this.element)];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            BaseElement.prototype.waitExist = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, waiter_1.waiter.waitFor(this.element, { state: 'attached' })];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            BaseElement.prototype.waitNotVisible = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, waiter_1.waiter.waitFor(this.element, { state: 'hidden' })];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            return BaseElement;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _click_decorators = [(0, step_1.step)(function (name) { return "Click on element(s) on \"".concat(name, "\""); })];
            _getScreenshot_decorators = [(0, step_1.step)(function (name) { return "Get screenshot on \"".concat(name, "\""); })];
            _get_decorators = [(0, step_1.step)(function (name) { return "Get data on \"".concat(name, "\""); })];
            _isDisplay_decorators = [(0, step_1.step)(function (name) { return "Check is displayed element(s) on \"".concat(name, "\""); })];
            _waitForDisplayedState_decorators = [(0, step_1.step)(function (name) { return "Wait for displayed state on \"".concat(name, "\""); })];
            _waitForDataState_decorators = [(0, step_1.step)(function (name) { return "Wait for data state on \"".concat(name, "\""); })];
            _hover_decorators = [(0, step_1.step)(function (name) { return "Hover on \"".concat(name, "\" fragment"); })];
            _scroll_decorators = [(0, step_1.step)(function (name) { return "Scroll on \"".concat(name, "\" fragment"); })];
            _isExist_decorators = [(0, step_1.step)(function (name) { return "Check is exist element(s) on \"".concat(name, "\""); })];
            __esDecorate(_a, null, _click_decorators, { kind: "method", name: "click", static: false, private: false, access: { has: function (obj) { return "click" in obj; }, get: function (obj) { return obj.click; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getScreenshot_decorators, { kind: "method", name: "getScreenshot", static: false, private: false, access: { has: function (obj) { return "getScreenshot" in obj; }, get: function (obj) { return obj.getScreenshot; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_decorators, { kind: "method", name: "get", static: false, private: false, access: { has: function (obj) { return "get" in obj; }, get: function (obj) { return obj.get; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _isDisplay_decorators, { kind: "method", name: "isDisplay", static: false, private: false, access: { has: function (obj) { return "isDisplay" in obj; }, get: function (obj) { return obj.isDisplay; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _waitForDisplayedState_decorators, { kind: "method", name: "waitForDisplayedState", static: false, private: false, access: { has: function (obj) { return "waitForDisplayedState" in obj; }, get: function (obj) { return obj.waitForDisplayedState; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _waitForDataState_decorators, { kind: "method", name: "waitForDataState", static: false, private: false, access: { has: function (obj) { return "waitForDataState" in obj; }, get: function (obj) { return obj.waitForDataState; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _hover_decorators, { kind: "method", name: "hover", static: false, private: false, access: { has: function (obj) { return "hover" in obj; }, get: function (obj) { return obj.hover; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _scroll_decorators, { kind: "method", name: "scroll", static: false, private: false, access: { has: function (obj) { return "scroll" in obj; }, get: function (obj) { return obj.scroll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _isExist_decorators, { kind: "method", name: "isExist", static: false, private: false, access: { has: function (obj) { return "isExist" in obj; }, get: function (obj) { return obj.isExist; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.BaseElement = BaseElement;
