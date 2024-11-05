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
var BrowserTabber = /** @class */ (function () {
    function BrowserTabber(browserContext, pageSetter, page) {
        this.name = 'Browser Tab(s)';
        this.browserConext = browserContext;
        this.pageSetter = pageSetter;
        this.page = page;
    }
    BrowserTabber.prototype._page = function () {
        return this.page();
    };
    BrowserTabber.prototype.sendKeys = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
            var actions, _i, _c, _switch, _d, currentTabs_1, currentPage;
            var _this = this;
            var switchTab = _b.switchTab, refresh = _b.refresh, newTab = _b.newTab, setWindowSize = _b.setWindowSize, navigateToUrl = _b.navigateToUrl;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!switchTab) return [3 /*break*/, 4];
                        actions = {
                            index: function (_index) { return __awaiter(_this, void 0, void 0, function () {
                                var pages, currentPage;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, waiter_1.waiter.waitForState(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                                return [2 /*return*/, !!this.browserConext.pages()[_index]];
                                            }); }); }, {
                                                timeout: 10000,
                                                interval: 2000,
                                                dontThrow: false,
                                                message: "The requested tab by index \"".concat(_index, "\" doesn't exist or tab was closed."),
                                            })];
                                        case 1:
                                            _a.sent();
                                            pages = this.browserConext.pages();
                                            currentPage = pages[_index];
                                            return [4 /*yield*/, currentPage.bringToFront()];
                                        case 2:
                                            _a.sent();
                                            this.pageSetter(currentPage);
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                            url: function (_url) { return __awaiter(_this, void 0, void 0, function () {
                                var currentPage;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, waiter_1.waiter.waitForState(function () { return __awaiter(_this, void 0, void 0, function () {
                                                var pages;
                                                return __generator(this, function (_a) {
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
                                            _a.sent();
                                            return [4 /*yield*/, currentPage.bringToFront()];
                                        case 2:
                                            _a.sent();
                                            this.pageSetter(currentPage);
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                            title: function (_title) { return __awaiter(_this, void 0, void 0, function () {
                                var currentPage;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, waiter_1.waiter.waitForState(function () { return __awaiter(_this, void 0, void 0, function () {
                                                var pages, tempListTitles, _i, pages_1, _page, currentTitle;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            pages = this.browserConext.pages();
                                                            tempListTitles = [];
                                                            _i = 0, pages_1 = pages;
                                                            _a.label = 1;
                                                        case 1:
                                                            if (!(_i < pages_1.length)) return [3 /*break*/, 4];
                                                            _page = pages_1[_i];
                                                            return [4 /*yield*/, _page.title()];
                                                        case 2:
                                                            currentTitle = _a.sent();
                                                            tempListTitles.push(currentTitle);
                                                            _a.label = 3;
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
                                            _a.sent();
                                            return [4 /*yield*/, currentPage.bringToFront()];
                                        case 2:
                                            _a.sent();
                                            this.pageSetter(currentPage);
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                            defaultTab: function (state) { return __awaiter(_this, void 0, void 0, function () {
                                var pages;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!state) return [3 /*break*/, 2];
                                            pages = this.browserConext.pages();
                                            if (!pages.length) {
                                                throw new Error("The default tab doesn't exist or tab was closed.");
                                            }
                                            this.pageSetter(pages[0]);
                                            return [4 /*yield*/, pages[0].bringToFront()];
                                        case 1:
                                            _a.sent();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); },
                        };
                        _i = 0, _c = Object.keys(switchTab);
                        _e.label = 1;
                    case 1:
                        if (!(_i < _c.length)) return [3 /*break*/, 4];
                        _switch = _c[_i];
                        return [4 /*yield*/, actions[_switch](switchTab[_switch])];
                    case 2:
                        _e.sent();
                        _e.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (!((typeof refresh === 'boolean' && refresh) || typeof refresh === 'object')) return [3 /*break*/, 9];
                        if (!(typeof refresh === 'boolean')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.page().reload()];
                    case 5:
                        _d = _e.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.page().reload(refresh)];
                    case 7:
                        _d = _e.sent();
                        _e.label = 8;
                    case 8:
                        _d;
                        _e.label = 9;
                    case 9:
                        if (!newTab) return [3 /*break*/, 14];
                        currentTabs_1 = this.browserConext.pages();
                        return [4 /*yield*/, this.browserConext.newPage()];
                    case 10:
                        _e.sent();
                        return [4 /*yield*/, waiter_1.waiter.waitForState(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, currentTabs_1.length < this.browserConext.pages().length];
                            }); }); }, {
                                timeout: 10000,
                                interval: 2000,
                                dontThrow: false,
                                message: "The new tab doesn't exist or tab was closed.",
                            })];
                    case 11:
                        _e.sent();
                        currentPage = this.browserConext.pages()[this.browserConext.pages().length - 1];
                        return [4 /*yield*/, currentPage.bringToFront()];
                    case 12:
                        _e.sent();
                        this.pageSetter(currentPage);
                        return [4 /*yield*/, this.page().goto(newTab)];
                    case 13:
                        _e.sent();
                        _e.label = 14;
                    case 14:
                        if (!setWindowSize) return [3 /*break*/, 16];
                        return [4 /*yield*/, this.page().setViewportSize({ height: setWindowSize.height, width: setWindowSize.width })];
                    case 15:
                        _e.sent();
                        _e.label = 16;
                    case 16:
                        if (!navigateToUrl) return [3 /*break*/, 18];
                        return [4 /*yield*/, this.page().goto(navigateToUrl)];
                    case 17:
                        _e.sent();
                        _e.label = 18;
                    case 18: return [2 /*return*/];
                }
            });
        });
    };
    BrowserTabber.prototype.get = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var values, tempObj, _i, _a, key, _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        values = {
                            url: function () { return _this.page().url(); },
                            title: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.page().title()];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); },
                            tabsUrls: function () { return __awaiter(_this, void 0, void 0, function () {
                                var pages, listOfTabs, _i, pages_2, _page, _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            pages = this.browserConext.pages();
                                            listOfTabs = [];
                                            _i = 0, pages_2 = pages;
                                            _c.label = 1;
                                        case 1:
                                            if (!(_i < pages_2.length)) return [3 /*break*/, 5];
                                            _page = pages_2[_i];
                                            return [4 /*yield*/, _page.waitForLoadState('domcontentloaded')];
                                        case 2:
                                            _c.sent();
                                            _b = (_a = listOfTabs).push;
                                            return [4 /*yield*/, _page.url()];
                                        case 3:
                                            _b.apply(_a, [_c.sent()]);
                                            _c.label = 4;
                                        case 4:
                                            _i++;
                                            return [3 /*break*/, 1];
                                        case 5: return [2 /*return*/, listOfTabs];
                                    }
                                });
                            }); },
                            tabsLength: function () { return _this.browserConext.pages().length; },
                            windowSize: function () { return _this.page().viewportSize(); },
                        };
                        tempObj = {};
                        _i = 0, _a = Object.keys(data);
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        key = _a[_i];
                        _b = tempObj;
                        _c = key;
                        return [4 /*yield*/, values[key]()];
                    case 2:
                        _b[_c] = _d.sent();
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, tempObj];
                }
            });
        });
    };
    BrowserTabber.prototype.waitForDataState = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b, waitTime, dontThrowError) {
            var valueToNullKeys, tempObj, _i, _c, key;
            var _this = this;
            var expectedState = _b.expectedState, includes = _b.includes;
            if (waitTime === void 0) { waitTime = 3000; }
            if (dontThrowError === void 0) { dontThrowError = true; }
            return __generator(this, function (_d) {
                valueToNullKeys = ['url', 'title', 'tabsUrls', 'tabsLength'];
                tempObj = {};
                for (_i = 0, _c = Object.keys(expectedState); _i < _c.length; _i++) {
                    key = _c[_i];
                    if (valueToNullKeys.includes(key)) {
                        tempObj[key] = null;
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
                                                return includes ? itemValue.includes(expectedValuesList_1[index]) : !itemValue.includes(expectedValuesList_1[index]);
                                            })];
                                    }
                                    return [2 /*return*/, _n.isEqual(getResult, expectedState)];
                            }
                        });
                    }); }, {
                        message: "Wait for data state on \"".concat(this.name, "\" is failed, for data: \"").concat(JSON.stringify(expectedState), "\""),
                        timeout: waitTime,
                        interval: 1000,
                        dontThrow: dontThrowError,
                    })];
            });
        });
    };
    return BrowserTabber;
}());
exports.BrowserTabber = BrowserTabber;
