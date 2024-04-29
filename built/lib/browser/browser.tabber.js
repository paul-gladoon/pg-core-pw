"use strict";
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
exports.BrowserTabber = void 0;
var waiter_1 = require("../utils/waiter");
var _n = __importStar(require("lodash"));
var step_1 = require("../reporter/step");
var BrowserTabber = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _sendKeys_decorators;
    var _get_decorators;
    return _a = /** @class */ (function () {
            function BrowserTabber(browserContext, pageSetter, page) {
                this.name = __runInitializers(this, _instanceExtraInitializers);
                this.name = 'Browser Tab(s)';
                this.browserConext = browserContext;
                this.pageSetter = pageSetter;
                this.page = page;
            }
            BrowserTabber.prototype.sendKeys = function (_b) {
                return __awaiter(this, arguments, void 0, function (_c) {
                    var actions, _i, _d, _switch, _e, currentTabs_1, currentPage;
                    var _this = this;
                    var switchTab = _c.switchTab, refresh = _c.refresh, newTab = _c.newTab, setWindowSize = _c.setWindowSize, navigateToUrl = _c.navigateToUrl;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                if (!switchTab) return [3 /*break*/, 4];
                                actions = {
                                    index: function (_index) { return __awaiter(_this, void 0, void 0, function () {
                                        var pages, currentPage;
                                        var _this = this;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0: return [4 /*yield*/, waiter_1.waiter.waitForState(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_b) {
                                                        return [2 /*return*/, !!this.browserConext.pages()[_index]];
                                                    }); }); }, {
                                                        timeout: 10000,
                                                        interval: 2000,
                                                        dontThrow: false,
                                                        message: "The requested tab by index \"".concat(_index, "\" doesn't exist or tab was closed."),
                                                    })];
                                                case 1:
                                                    _b.sent();
                                                    pages = this.browserConext.pages();
                                                    currentPage = pages[_index];
                                                    return [4 /*yield*/, currentPage.bringToFront()];
                                                case 2:
                                                    _b.sent();
                                                    this.pageSetter(currentPage);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                    url: function (_url) { return __awaiter(_this, void 0, void 0, function () {
                                        var currentPage;
                                        var _this = this;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0: return [4 /*yield*/, waiter_1.waiter.waitForState(function () { return __awaiter(_this, void 0, void 0, function () {
                                                        var pages;
                                                        return __generator(this, function (_b) {
                                                            pages = this.browserConext.pages();
                                                            currentPage = pages[pages.findIndex(function (_page) { return _page.url() === _url; })];
                                                            return [2 /*return*/, !!currentPage];
                                                        });
                                                    }); }, {
                                                        timeout: 10000,
                                                        interval: 2000,
                                                        dontThrow: false,
                                                        message: "The requested tab by url \"".concat(_url, "\" doesn't exist or tab was closed."),
                                                    })];
                                                case 1:
                                                    _b.sent();
                                                    return [4 /*yield*/, currentPage.bringToFront()];
                                                case 2:
                                                    _b.sent();
                                                    this.pageSetter(currentPage);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                    title: function (_title) { return __awaiter(_this, void 0, void 0, function () {
                                        var currentPage;
                                        var _this = this;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0: return [4 /*yield*/, waiter_1.waiter.waitForState(function () { return __awaiter(_this, void 0, void 0, function () {
                                                        var pages, tempListTitles, _i, pages_1, _page, currentTitle;
                                                        return __generator(this, function (_b) {
                                                            switch (_b.label) {
                                                                case 0:
                                                                    pages = this.browserConext.pages();
                                                                    tempListTitles = [];
                                                                    _i = 0, pages_1 = pages;
                                                                    _b.label = 1;
                                                                case 1:
                                                                    if (!(_i < pages_1.length)) return [3 /*break*/, 4];
                                                                    _page = pages_1[_i];
                                                                    return [4 /*yield*/, _page.title()];
                                                                case 2:
                                                                    currentTitle = _b.sent();
                                                                    tempListTitles.push(currentTitle);
                                                                    _b.label = 3;
                                                                case 3:
                                                                    _i++;
                                                                    return [3 /*break*/, 1];
                                                                case 4:
                                                                    currentPage = pages[tempListTitles.findIndex(function (_t) { return _t === _title; })];
                                                                    return [2 /*return*/, !!currentPage];
                                                            }
                                                        });
                                                    }); }, {
                                                        timeout: 10000,
                                                        interval: 2000,
                                                        dontThrow: false,
                                                        message: "The requested tab by title \"".concat(_title, "\" doesn't exist or tab was closed."),
                                                    })];
                                                case 1:
                                                    _b.sent();
                                                    return [4 /*yield*/, currentPage.bringToFront()];
                                                case 2:
                                                    _b.sent();
                                                    this.pageSetter(currentPage);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                    defaultTab: function (state) { return __awaiter(_this, void 0, void 0, function () {
                                        var pages;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    if (!state) return [3 /*break*/, 2];
                                                    pages = this.browserConext.pages();
                                                    if (!pages.length) {
                                                        throw new Error("The default tab doesn't exist or tab was closed.");
                                                    }
                                                    this.pageSetter(pages[0]);
                                                    return [4 /*yield*/, pages[0].bringToFront()];
                                                case 1:
                                                    _b.sent();
                                                    _b.label = 2;
                                                case 2: return [2 /*return*/];
                                            }
                                        });
                                    }); },
                                };
                                _i = 0, _d = Object.keys(switchTab);
                                _f.label = 1;
                            case 1:
                                if (!(_i < _d.length)) return [3 /*break*/, 4];
                                _switch = _d[_i];
                                return [4 /*yield*/, actions[_switch](switchTab[_switch])];
                            case 2:
                                _f.sent();
                                _f.label = 3;
                            case 3:
                                _i++;
                                return [3 /*break*/, 1];
                            case 4:
                                if (!((typeof refresh === 'boolean' && refresh) || typeof refresh === 'object')) return [3 /*break*/, 9];
                                if (!(typeof refresh === 'boolean')) return [3 /*break*/, 6];
                                return [4 /*yield*/, this.page().reload()];
                            case 5:
                                _e = _f.sent();
                                return [3 /*break*/, 8];
                            case 6: return [4 /*yield*/, this.page().reload(refresh)];
                            case 7:
                                _e = _f.sent();
                                _f.label = 8;
                            case 8:
                                _e;
                                _f.label = 9;
                            case 9:
                                if (!newTab) return [3 /*break*/, 14];
                                currentTabs_1 = this.browserConext.pages();
                                return [4 /*yield*/, this.browserConext.newPage()];
                            case 10:
                                _f.sent();
                                return [4 /*yield*/, waiter_1.waiter.waitForState(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_b) {
                                        return [2 /*return*/, currentTabs_1.length < this.browserConext.pages().length];
                                    }); }); }, {
                                        timeout: 10000,
                                        interval: 2000,
                                        dontThrow: false,
                                        message: "The new tab doesn't exist or tab was closed.",
                                    })];
                            case 11:
                                _f.sent();
                                currentPage = this.browserConext.pages()[this.browserConext.pages().length - 1];
                                return [4 /*yield*/, currentPage.bringToFront()];
                            case 12:
                                _f.sent();
                                this.pageSetter(currentPage);
                                return [4 /*yield*/, this.page().goto(newTab)];
                            case 13:
                                _f.sent();
                                _f.label = 14;
                            case 14:
                                if (!setWindowSize) return [3 /*break*/, 16];
                                return [4 /*yield*/, this.page().setViewportSize({ height: setWindowSize.height, width: setWindowSize.width })];
                            case 15:
                                _f.sent();
                                _f.label = 16;
                            case 16:
                                if (!navigateToUrl) return [3 /*break*/, 18];
                                return [4 /*yield*/, this.page().goto(navigateToUrl)];
                            case 17:
                                _f.sent();
                                _f.label = 18;
                            case 18: return [2 /*return*/];
                        }
                    });
                });
            };
            BrowserTabber.prototype.get = function (data) {
                return __awaiter(this, void 0, void 0, function () {
                    var values, tempObj, _i, _b, key, _c, _d;
                    var _this = this;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                values = {
                                    url: function () { return _this.page().url(); },
                                    title: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, this.page().title()];
                                            case 1: return [2 /*return*/, _b.sent()];
                                        }
                                    }); }); },
                                    tabs: function () { return _this.browserConext.pages(); },
                                    tabsLength: function () { return _this.browserConext.pages().length; },
                                    windowSize: function () { return _this.page().viewportSize(); },
                                };
                                tempObj = {};
                                _i = 0, _b = Object.keys(data);
                                _e.label = 1;
                            case 1:
                                if (!(_i < _b.length)) return [3 /*break*/, 4];
                                key = _b[_i];
                                _c = tempObj;
                                _d = key;
                                return [4 /*yield*/, values[key]()];
                            case 2:
                                _c[_d] = _e.sent();
                                _e.label = 3;
                            case 3:
                                _i++;
                                return [3 /*break*/, 1];
                            case 4: return [2 /*return*/, tempObj];
                        }
                    });
                });
            };
            BrowserTabber.prototype.waitForDataState = function (_b) {
                return __awaiter(this, arguments, void 0, function (_c, waitTime, dontThrowError) {
                    var valueToNullKeys, tempObj, _i, _d, key;
                    var _this = this;
                    var expectedState = _c.expectedState, includes = _c.includes;
                    if (waitTime === void 0) { waitTime = 3000; }
                    if (dontThrowError === void 0) { dontThrowError = true; }
                    return __generator(this, function (_e) {
                        valueToNullKeys = ['url', 'title', 'tabs', 'tabsLength'];
                        tempObj = {};
                        for (_i = 0, _d = Object.keys(expectedState); _i < _d.length; _i++) {
                            key = _d[_i];
                            if (valueToNullKeys.includes(key)) {
                                tempObj[key] = null;
                            }
                        }
                        return [2 /*return*/, waiter_1.waiter.waitForState(function () { return __awaiter(_this, void 0, void 0, function () {
                                var getResult, expectedValuesList_1, resultValuesList;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, this.get(tempObj)];
                                        case 1:
                                            getResult = _b.sent();
                                            if (_n.isBoolean(includes)) {
                                                expectedValuesList_1 = Object.values(expectedState);
                                                resultValuesList = Object.values(getResult);
                                                return [2 /*return*/, resultValuesList.every(function (itemValue, index) {
                                                        return includes ? itemValue.includes(expectedValuesList_1[index]) : !itemValue.includes(expectedValuesList_1[index]);
                                                    })];
                                            }
                                            return [2 /*return*/, _n.isEqual(getResult, expectedState)];
                                    }
                                });
                            }); }, {
                                message: "Wait for data state on \"".concat(this.name, "\" is failed, for data: \"").concat(JSON.stringify(expectedState), "\""),
                                timeout: waitTime,
                                interval: 500,
                                dontThrow: dontThrowError,
                            })];
                    });
                });
            };
            return BrowserTabber;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _sendKeys_decorators = [(0, step_1.step)(function (name) { return "Set data to \"".concat(name, "\""); })];
            _get_decorators = [(0, step_1.step)(function (name) { return "Get data from \"".concat(name, "\""); })];
            __esDecorate(_a, null, _sendKeys_decorators, { kind: "method", name: "sendKeys", static: false, private: false, access: { has: function (obj) { return "sendKeys" in obj; }, get: function (obj) { return obj.sendKeys; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _get_decorators, { kind: "method", name: "get", static: false, private: false, access: { has: function (obj) { return "get" in obj; }, get: function (obj) { return obj.get; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.BrowserTabber = BrowserTabber;
