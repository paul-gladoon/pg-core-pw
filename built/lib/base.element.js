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
var BaseElement = /** @class */ (function () {
    function BaseElement(page, parentLocator, elementRootSelector, name, options) {
        this.parentLocator = parentLocator;
        this.elementRootSelector = elementRootSelector;
        this.name = name;
        this.page = page;
        this.options = options;
    }
    Object.defineProperty(BaseElement.prototype, "element", {
        get: function () {
            var _a = this, options = _a.options, page = _a.page, parentLocator = _a.parentLocator, elementRootSelector = _a.elementRootSelector;
            var rootLocator = (options === null || options === void 0 ? void 0 : options.searchFromDOMRoot) ? page() : parentLocator();
            var addLocatorOpts = function (_rootLocator, selector, _opts) {
                var locatorOpts = _opts.locatorOpts;
                return typeof locatorOpts === 'string'
                    ? _rootLocator.locator(selector, __assign({}, _opts === null || _opts === void 0 ? void 0 : _opts.selectorOpts))[locatorOpts]()
                    : _rootLocator.locator(selector, __assign({}, _opts === null || _opts === void 0 ? void 0 : _opts.selectorOpts)).nth(locatorOpts.nth);
            };
            if (Array.isArray(elementRootSelector)) {
                return elementRootSelector.reduce(function (chainLocator, selectorData) {
                    if (typeof selectorData === 'object' && selectorData.opts.locatorOpts) {
                        chainLocator = chainLocator
                            ? addLocatorOpts(chainLocator, selectorData.selector, selectorData.opts)
                            : addLocatorOpts(rootLocator, selectorData.selector, selectorData.opts);
                    }
                    else if (typeof selectorData === 'object' && !selectorData.opts.locatorOpts) {
                        chainLocator = chainLocator
                            ? chainLocator.locator(selectorData.selector, __assign({}, selectorData.opts.selectorOpts))
                            : rootLocator.locator(selectorData.selector, __assign({}, selectorData.opts.selectorOpts));
                    }
                    else if (typeof selectorData === 'string') {
                        chainLocator = chainLocator ? chainLocator.locator(selectorData) : rootLocator.locator(selectorData);
                    }
                    return chainLocator;
                }, null);
            }
            if (options === null || options === void 0 ? void 0 : options.locatorOpts) {
                return addLocatorOpts(rootLocator, elementRootSelector, options);
            }
            return rootLocator.locator(elementRootSelector, __assign({}, options === null || options === void 0 ? void 0 : options.selectorOpts));
        },
        set: function (locator) {
            this.element = locator;
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
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.element.click(options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseElement.prototype.getScreenshot = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var filePath = _b.filePath, viewOptions = _b.viewOptions;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.element.screenshot(__assign({ path: filePath }, viewOptions))];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseElement.prototype.get = function (getObj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.element.evaluate(function (_element, _a) {
                        var getObj = _a.getObj, getValues = _a.getValues;
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
            return __generator(this, function (_a) {
                return [2 /*return*/, this.element.isVisible()];
            });
        });
    };
    BaseElement.prototype.waitForDisplayedState = function (expectedState, waitTime, dontThrowError) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, waiter_1.waiter.waitForState(function () { return __awaiter(_this, void 0, void 0, function () {
                        var isDisplayResult;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.isDisplay()];
                                case 1:
                                    isDisplayResult = _a.sent();
                                    return [2 /*return*/, _n.isEqual(isDisplayResult, expectedState)];
                            }
                        });
                    }); }, {
                        message: "Wait for displayed state on \"".concat(this.name, "\" element is failed, element with selector: \"").concat(this.element.toString(), "\""),
                        timeout: waitTime,
                        interval: 1000,
                        dontThrow: dontThrowError,
                    })];
            });
        });
    };
    BaseElement.prototype.waitForDataState = function (_a, waitTime_1, dontThrowError_1) {
        return __awaiter(this, arguments, void 0, function (_b, waitTime, dontThrowError) {
            var tempObj, _i, _c, key;
            var _this = this;
            var expectedState = _b.expectedState, includes = _b.includes;
            return __generator(this, function (_d) {
                tempObj = {};
                for (_i = 0, _c = Object.keys(expectedState); _i < _c.length; _i++) {
                    key = _c[_i];
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
                        interval: 1000,
                        dontThrow: dontThrowError,
                    })];
            });
        });
    };
    BaseElement.prototype.hover = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.waitExist()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.element.hover(__assign({ force: true }, options))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseElement.prototype.scroll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.element.scrollIntoViewIfNeeded()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseElement.prototype.isExist = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.element.count()];
                    case 1: return [2 /*return*/, !!(_a.sent())];
                }
            });
        });
    };
    BaseElement.prototype.waitVisible = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waiter_1.waiter.waitFor(this.element, this.name)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseElement.prototype.waitExist = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waiter_1.waiter.waitFor(this.element, this.name, { state: 'attached' })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseElement.prototype.waitNotVisible = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waiter_1.waiter.waitFor(this.element, this.name, { state: 'hidden' })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseElement.prototype.getParentNode = function (_locator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, _locator.locator('xpath=..')];
            });
        });
    };
    BaseElement.prototype.init = function (ClassName, rootSelector, name, options) {
        return new ClassName(this.page.bind(this), this.parentLocator.bind(this), rootSelector, name, options);
    };
    return BaseElement;
}());
exports.BaseElement = BaseElement;
