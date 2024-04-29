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
exports.BasePage = void 0;
var helpers_1 = require("./utils/helpers");
var waiter_1 = require("./utils/waiter");
var base_types_1 = require("./base.types");
var browser_actioner_1 = require("./browser/browser.actioner");
var browser_consoler_1 = require("./browser/browser.consoler");
var browser_tabber_1 = require("./browser/browser.tabber");
var step_1 = require("./reporter/step");
var BasePage = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _goToPage_decorators;
    var _click_decorators;
    var _get_decorators;
    var _isDisplay_decorators;
    var _isExist_decorators;
    var _getScreenshot_decorators;
    var _sendKeys_decorators;
    var _scroll_decorators;
    var _hover_decorators;
    var _waitForDataState_decorators;
    var _waitForDisplayedState_decorators;
    return _a = /** @class */ (function () {
            function BasePage(browserContext, page, pageRootSelector, name, url) {
                this.browserContext = __runInitializers(this, _instanceExtraInitializers);
                this.browserContext = browserContext;
                this.page = page;
                this.name = name;
                this.url = url;
                this.pageRootSelector = pageRootSelector;
                this._actioner = new browser_actioner_1.BrowserActioner(this.getCurrentPage.bind(this));
                this._consoler = new browser_consoler_1.BrowserConsoler(this.getCurrentPage.bind(this));
                this._tabber = new browser_tabber_1.BrowserTabber(browserContext, this.setCurrentPage.bind(this), this.getCurrentPage.bind(this));
                this._root = this.init(base_types_1.BaseElement, pageRootSelector, "_root element ".concat(this.name));
            }
            BasePage.prototype.element = function () {
                return this.getCurrentPage().locator(this.pageRootSelector);
            };
            BasePage.prototype.setCurrentPage = function (page) {
                this.page = page;
            };
            BasePage.prototype.getCurrentPage = function () {
                return this.page;
            };
            BasePage.prototype.goToPage = function (args) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, this.page.goto(this.url)];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            BasePage.prototype.click = function (clickObj) {
                return __awaiter(this, void 0, void 0, function () {
                    var _i, _b, key;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!(0, helpers_1.isPlainObject)(clickObj)) {
                                    throw new Error("".concat(this.name, " click argument should be an object"));
                                }
                                return [4 /*yield*/, this.waitVisible()];
                            case 1:
                                _c.sent();
                                _i = 0, _b = Object.keys(clickObj);
                                _c.label = 2;
                            case 2:
                                if (!(_i < _b.length)) return [3 /*break*/, 5];
                                key = _b[_i];
                                if (!this[key]) {
                                    throw new Error("".concat(this.name, " does not have ").concat(key, " property"));
                                }
                                return [4 /*yield*/, this[key].click(clickObj[key])];
                            case 3:
                                _c.sent();
                                _c.label = 4;
                            case 4:
                                _i++;
                                return [3 /*break*/, 2];
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            };
            BasePage.prototype.get = function (getObj) {
                return __awaiter(this, void 0, void 0, function () {
                    var tempGet, _i, _b, key, _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                if (!(0, helpers_1.isPlainObject)(getObj)) {
                                    throw new Error("".concat(this.name, " get argument should be an object"));
                                }
                                return [4 /*yield*/, this.waitVisible()];
                            case 1:
                                _e.sent();
                                tempGet = __assign({}, getObj);
                                _i = 0, _b = Object.keys(tempGet);
                                _e.label = 2;
                            case 2:
                                if (!(_i < _b.length)) return [3 /*break*/, 5];
                                key = _b[_i];
                                if (!this[key]) {
                                    throw new Error("".concat(this.name, " does not have ").concat(key, " property"));
                                }
                                _c = tempGet;
                                _d = key;
                                return [4 /*yield*/, this[key].get(tempGet[key])];
                            case 3:
                                _c[_d] = _e.sent();
                                _e.label = 4;
                            case 4:
                                _i++;
                                return [3 /*break*/, 2];
                            case 5: return [2 /*return*/, tempGet];
                        }
                    });
                });
            };
            BasePage.prototype.isDisplay = function (isDispObj) {
                return __awaiter(this, void 0, void 0, function () {
                    var tempGet, _i, _b, key, _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                if (!(0, helpers_1.isPlainObject)(isDispObj)) {
                                    throw new Error("".concat(this.name, " isDisplay argument should be an object"));
                                }
                                return [4 /*yield*/, this.waitVisible()];
                            case 1:
                                _e.sent();
                                tempGet = __assign({}, isDispObj);
                                _i = 0, _b = Object.keys(tempGet);
                                _e.label = 2;
                            case 2:
                                if (!(_i < _b.length)) return [3 /*break*/, 5];
                                key = _b[_i];
                                if (!this[key]) {
                                    throw new Error("".concat(this.name, " does not have ").concat(key, " property"));
                                }
                                _c = tempGet;
                                _d = key;
                                return [4 /*yield*/, this[key].isDisplay(tempGet[key])];
                            case 3:
                                _c[_d] = _e.sent();
                                _e.label = 4;
                            case 4:
                                _i++;
                                return [3 /*break*/, 2];
                            case 5: return [2 /*return*/, tempGet];
                        }
                    });
                });
            };
            BasePage.prototype.isExist = function (isExistObj) {
                return __awaiter(this, void 0, void 0, function () {
                    var tempGet, _i, _b, key, _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                if (!(0, helpers_1.isPlainObject)(isExistObj)) {
                                    throw new Error("".concat(this.name, " isExist argument should be an object"));
                                }
                                return [4 /*yield*/, this.waitVisible()];
                            case 1:
                                _e.sent();
                                tempGet = __assign({}, isExistObj);
                                _i = 0, _b = Object.keys(tempGet);
                                _e.label = 2;
                            case 2:
                                if (!(_i < _b.length)) return [3 /*break*/, 5];
                                key = _b[_i];
                                if (!this[key]) {
                                    throw new Error("".concat(this.name, " does not have ").concat(key, " property"));
                                }
                                _c = tempGet;
                                _d = key;
                                return [4 /*yield*/, this[key].isExist(tempGet[key])];
                            case 3:
                                _c[_d] = _e.sent();
                                _e.label = 4;
                            case 4:
                                _i++;
                                return [3 /*break*/, 2];
                            case 5: return [2 /*return*/, tempGet];
                        }
                    });
                });
            };
            BasePage.prototype.getScreenshot = function (scrObject) {
                return __awaiter(this, void 0, void 0, function () {
                    var _i, _b, key;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!scrObject) {
                                    throw new Error("".concat(this.name, " get screenshot argument should be an object"));
                                }
                                return [4 /*yield*/, this.waitVisible()];
                            case 1:
                                _c.sent();
                                _i = 0, _b = Object.keys(scrObject);
                                _c.label = 2;
                            case 2:
                                if (!(_i < _b.length)) return [3 /*break*/, 5];
                                key = _b[_i];
                                if (!this[key]) {
                                    throw new Error("".concat(this.name, " does not have ").concat(key, " property"));
                                }
                                return [4 /*yield*/, this[key].getScreenshot(scrObject[key])];
                            case 3:
                                _c.sent();
                                _c.label = 4;
                            case 4:
                                _i++;
                                return [3 /*break*/, 2];
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            };
            BasePage.prototype.sendKeys = function (sendObj) {
                return __awaiter(this, void 0, void 0, function () {
                    var _i, _b, key;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!(0, helpers_1.isPlainObject)(sendObj)) {
                                    throw new Error("".concat(this.name, " sendKeys argument should be an object"));
                                }
                                return [4 /*yield*/, this.waitVisible()];
                            case 1:
                                _c.sent();
                                _i = 0, _b = Object.keys(sendObj);
                                _c.label = 2;
                            case 2:
                                if (!(_i < _b.length)) return [3 /*break*/, 5];
                                key = _b[_i];
                                if (!this[key]) {
                                    throw new Error("".concat(this.name, " does not have ").concat(key, " property"));
                                }
                                return [4 /*yield*/, this[key].sendKeys(sendObj[key])];
                            case 3:
                                _c.sent();
                                _c.label = 4;
                            case 4:
                                _i++;
                                return [3 /*break*/, 2];
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            };
            BasePage.prototype.scroll = function (scrollObj) {
                return __awaiter(this, void 0, void 0, function () {
                    var _i, _b, key;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!(0, helpers_1.isPlainObject)(scrollObj)) {
                                    throw new Error("".concat(this.name, " scroll argument should be an object"));
                                }
                                return [4 /*yield*/, this.waitVisible()];
                            case 1:
                                _c.sent();
                                _i = 0, _b = Object.keys(scrollObj);
                                _c.label = 2;
                            case 2:
                                if (!(_i < _b.length)) return [3 /*break*/, 5];
                                key = _b[_i];
                                if (!this[key]) {
                                    throw new Error("".concat(this.name, " does not have ").concat(key, " property"));
                                }
                                return [4 /*yield*/, this[key].scroll(scrollObj[key])];
                            case 3:
                                _c.sent();
                                _c.label = 4;
                            case 4:
                                _i++;
                                return [3 /*break*/, 2];
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            };
            BasePage.prototype.hover = function (hoverObj) {
                return __awaiter(this, void 0, void 0, function () {
                    var _i, _b, key;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!(0, helpers_1.isPlainObject)(hoverObj)) {
                                    throw new Error("".concat(this.name, " hover argument should be an object"));
                                }
                                return [4 /*yield*/, this.waitVisible()];
                            case 1:
                                _c.sent();
                                _i = 0, _b = Object.keys(hoverObj);
                                _c.label = 2;
                            case 2:
                                if (!(_i < _b.length)) return [3 /*break*/, 5];
                                key = _b[_i];
                                if (!this[key]) {
                                    throw new Error("".concat(this.name, " does not have ").concat(key, " property"));
                                }
                                return [4 /*yield*/, this[key].hover(hoverObj[key])];
                            case 3:
                                _c.sent();
                                _c.label = 4;
                            case 4:
                                _i++;
                                return [3 /*break*/, 2];
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            };
            BasePage.prototype.waitForDataState = function (dataState_1) {
                return __awaiter(this, arguments, void 0, function (dataState, waitTime, dontThrowError) {
                    var tempListOfStatesResult, _i, _a, key, _b, _c;
                    if (waitTime === void 0) { waitTime = 3000; }
                    if (dontThrowError === void 0) { dontThrowError = true; }
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                if (!(0, helpers_1.isPlainObject)(dataState)) {
                                    throw new Error("".concat(this.name, " waitForDataState argument should be an object"));
                                }
                                return [4 /*yield*/, this.waitVisible()];
                            case 1:
                                _d.sent();
                                tempListOfStatesResult = [];
                                _i = 0, _a = Object.keys(dataState);
                                _d.label = 2;
                            case 2:
                                if (!(_i < _a.length)) return [3 /*break*/, 5];
                                key = _a[_i];
                                if (!this[key]) {
                                    throw new Error("".concat(this.name, " does not have ").concat(key, " property"));
                                }
                                _c = (_b = tempListOfStatesResult).push;
                                return [4 /*yield*/, this[key].waitForDataState(dataState[key], waitTime, dontThrowError)];
                            case 3:
                                _c.apply(_b, [_d.sent()]);
                                _d.label = 4;
                            case 4:
                                _i++;
                                return [3 /*break*/, 2];
                            case 5: return [2 /*return*/, tempListOfStatesResult.every(function (stateResult) { return stateResult; })];
                        }
                    });
                });
            };
            BasePage.prototype.waitForDisplayedState = function (dataState_1) {
                return __awaiter(this, arguments, void 0, function (dataState, waitTime, dontThrowError) {
                    var tempListOfStatesResult, _i, _a, key, _b, _c;
                    if (waitTime === void 0) { waitTime = 3000; }
                    if (dontThrowError === void 0) { dontThrowError = true; }
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                if (!(0, helpers_1.isPlainObject)(dataState)) {
                                    throw new Error("".concat(this.name, " waitForDisplayedState argument should be an object"));
                                }
                                return [4 /*yield*/, this.waitVisible()];
                            case 1:
                                _d.sent();
                                tempListOfStatesResult = [];
                                _i = 0, _a = Object.keys(dataState);
                                _d.label = 2;
                            case 2:
                                if (!(_i < _a.length)) return [3 /*break*/, 5];
                                key = _a[_i];
                                if (!this[key]) {
                                    throw new Error("".concat(this.name, " does not have ").concat(key, " property"));
                                }
                                _c = (_b = tempListOfStatesResult).push;
                                return [4 /*yield*/, this[key].waitForDisplayedState(dataState[key], waitTime, dontThrowError)];
                            case 3:
                                _c.apply(_b, [_d.sent()]);
                                _d.label = 4;
                            case 4:
                                _i++;
                                return [3 /*break*/, 2];
                            case 5: return [2 /*return*/, tempListOfStatesResult.every(function (stateResult) { return stateResult; })];
                        }
                    });
                });
            };
            BasePage.prototype.waitVisible = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, waiter_1.waiter.waitFor(this.element())];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            BasePage.prototype.waitExist = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, waiter_1.waiter.waitFor(this.element(), { state: 'attached' })];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            BasePage.prototype.init = function (ClassName, rootSelector, name, options) {
                return new ClassName(this.getCurrentPage.bind(this), this.element.bind(this), rootSelector, name, options);
            };
            BasePage.prototype.initCollection = function (ClassName, collectionType, rootSelector, name, options) {
                return new ClassName(this.getCurrentPage.bind(this), this.element.bind(this), collectionType, rootSelector, name, options);
            };
            return BasePage;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _goToPage_decorators = [(0, step_1.step)(function (name) { return "Go to page on \"".concat(name, "\" page."); })];
            _click_decorators = [(0, step_1.step)(function (name) { return "Click on element(s) on \"".concat(name, "\" page"); })];
            _get_decorators = [(0, step_1.step)(function (name) { return "Get data on \"".concat(name, "\" page"); })];
            _isDisplay_decorators = [(0, step_1.step)(function (name) { return "Check is displayed element(s) on \"".concat(name, "\" page"); })];
            _isExist_decorators = [(0, step_1.step)(function (name) { return "Check is exist element(s) on \"".concat(name, "\" page"); })];
            _getScreenshot_decorators = [(0, step_1.step)(function (name) { return "Get screenshot on \"".concat(name, "\" page"); })];
            _sendKeys_decorators = [(0, step_1.step)(function (name) { return "Set data on \"".concat(name, "\" page"); })];
            _scroll_decorators = [(0, step_1.step)(function (name) { return "Scroll on \"".concat(name, "\" page"); })];
            _hover_decorators = [(0, step_1.step)(function (name) { return "Hover on element(s) on \"".concat(name, "\" page"); })];
            _waitForDataState_decorators = [(0, step_1.step)(function (name) { return "Wait for data state on \"".concat(name, "\" page"); })];
            _waitForDisplayedState_decorators = [(0, step_1.step)(function (name) { return "Wait for displayed state on \"".concat(name, "\" page"); })];
            __esDecorate(_a, null, _goToPage_decorators, { kind: "method", name: "goToPage", static: false, private: false, access: { has: function (obj) { return "goToPage" in obj; }, get: function (obj) { return obj.goToPage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _click_decorators, { kind: "method", name: "click", static: false, private: false, access: { has: function (obj) { return "click" in obj; }, get: function (obj) { return obj.click; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_decorators, { kind: "method", name: "get", static: false, private: false, access: { has: function (obj) { return "get" in obj; }, get: function (obj) { return obj.get; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _isDisplay_decorators, { kind: "method", name: "isDisplay", static: false, private: false, access: { has: function (obj) { return "isDisplay" in obj; }, get: function (obj) { return obj.isDisplay; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _isExist_decorators, { kind: "method", name: "isExist", static: false, private: false, access: { has: function (obj) { return "isExist" in obj; }, get: function (obj) { return obj.isExist; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _getScreenshot_decorators, { kind: "method", name: "getScreenshot", static: false, private: false, access: { has: function (obj) { return "getScreenshot" in obj; }, get: function (obj) { return obj.getScreenshot; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _sendKeys_decorators, { kind: "method", name: "sendKeys", static: false, private: false, access: { has: function (obj) { return "sendKeys" in obj; }, get: function (obj) { return obj.sendKeys; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _scroll_decorators, { kind: "method", name: "scroll", static: false, private: false, access: { has: function (obj) { return "scroll" in obj; }, get: function (obj) { return obj.scroll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _hover_decorators, { kind: "method", name: "hover", static: false, private: false, access: { has: function (obj) { return "hover" in obj; }, get: function (obj) { return obj.hover; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _waitForDataState_decorators, { kind: "method", name: "waitForDataState", static: false, private: false, access: { has: function (obj) { return "waitForDataState" in obj; }, get: function (obj) { return obj.waitForDataState; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _waitForDisplayedState_decorators, { kind: "method", name: "waitForDisplayedState", static: false, private: false, access: { has: function (obj) { return "waitForDisplayedState" in obj; }, get: function (obj) { return obj.waitForDisplayedState; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.BasePage = BasePage;
