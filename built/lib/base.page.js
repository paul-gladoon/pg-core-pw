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
var browser_actioner_1 = require("./browser/browser.actioner");
var browser_consoler_1 = require("./browser/browser.consoler");
var browser_tabber_1 = require("./browser/browser.tabber");
var base_root_element_1 = require("./base.root.element");
var browser_downloader_1 = require("./browser/browser.downloader");
var BasePage = /** @class */ (function () {
    function BasePage(browserContext, page, pageRootSelector, name, url) {
        this.browserContext = browserContext;
        this.page = page;
        this.name = name;
        this.url = url;
        this.pageRootSelector = pageRootSelector;
        this._actioner = new browser_actioner_1.BrowserActioner(this._page.bind(this));
        this._consoler = new browser_consoler_1.BrowserConsoler(this._page.bind(this));
        this._downloader = new browser_downloader_1.BrowserDownloader(this._page.bind(this));
        this._tabber = new browser_tabber_1.BrowserTabber(browserContext, this.setPage.bind(this), this._page.bind(this));
        this._root = this.init(base_root_element_1.BaseRootElement, pageRootSelector, "_root ".concat(this.name, " element"));
    }
    BasePage.prototype.element = function () {
        return this._page().locator(this.pageRootSelector);
    };
    BasePage.prototype.setPage = function (page) {
        this.page = page;
    };
    BasePage.prototype._page = function () {
        return this.page;
    };
    BasePage.prototype.goToPage = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.goto(this.url, opts)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BasePage.prototype.click = function (clickObj) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, key;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(0, helpers_1.isPlainObject)(clickObj)) {
                            throw new Error("".concat(this.name, " click argument should be an object"));
                        }
                        return [4 /*yield*/, this.waitVisible()];
                    case 1:
                        _b.sent();
                        _i = 0, _a = Object.keys(clickObj);
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        key = _a[_i];
                        if (!this[key]) {
                            throw new Error("".concat(this.name, " does not have ").concat(key, " property"));
                        }
                        return [4 /*yield*/, this[key].click(clickObj[key])];
                    case 3:
                        _b.sent();
                        _b.label = 4;
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
            var tempGet, _i, _a, key, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(0, helpers_1.isPlainObject)(getObj)) {
                            throw new Error("".concat(this.name, " get argument should be an object"));
                        }
                        return [4 /*yield*/, this.waitVisible()];
                    case 1:
                        _d.sent();
                        tempGet = __assign({}, getObj);
                        _i = 0, _a = Object.keys(tempGet);
                        _d.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        key = _a[_i];
                        if (!this[key]) {
                            throw new Error("".concat(this.name, " does not have ").concat(key, " property"));
                        }
                        _b = tempGet;
                        _c = key;
                        return [4 /*yield*/, this[key].get(tempGet[key])];
                    case 3:
                        _b[_c] = _d.sent();
                        _d.label = 4;
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
            var tempGet, _i, _a, key, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(0, helpers_1.isPlainObject)(isDispObj)) {
                            throw new Error("".concat(this.name, " isDisplay argument should be an object"));
                        }
                        return [4 /*yield*/, this.waitVisible()];
                    case 1:
                        _d.sent();
                        tempGet = __assign({}, isDispObj);
                        _i = 0, _a = Object.keys(tempGet);
                        _d.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        key = _a[_i];
                        if (!this[key]) {
                            throw new Error("".concat(this.name, " does not have ").concat(key, " property"));
                        }
                        _b = tempGet;
                        _c = key;
                        return [4 /*yield*/, this[key].isDisplay(tempGet[key])];
                    case 3:
                        _b[_c] = _d.sent();
                        _d.label = 4;
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
            var tempGet, _i, _a, key, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(0, helpers_1.isPlainObject)(isExistObj)) {
                            throw new Error("".concat(this.name, " isExist argument should be an object"));
                        }
                        return [4 /*yield*/, this.waitVisible()];
                    case 1:
                        _d.sent();
                        tempGet = __assign({}, isExistObj);
                        _i = 0, _a = Object.keys(tempGet);
                        _d.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        key = _a[_i];
                        if (!this[key]) {
                            throw new Error("".concat(this.name, " does not have ").concat(key, " property"));
                        }
                        _b = tempGet;
                        _c = key;
                        return [4 /*yield*/, this[key].isExist(tempGet[key])];
                    case 3:
                        _b[_c] = _d.sent();
                        _d.label = 4;
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
            var _i, _a, key;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!scrObject) {
                            throw new Error("".concat(this.name, " get screenshot argument should be an object"));
                        }
                        return [4 /*yield*/, this.waitVisible()];
                    case 1:
                        _b.sent();
                        _i = 0, _a = Object.keys(scrObject);
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        key = _a[_i];
                        if (!this[key]) {
                            throw new Error("".concat(this.name, " does not have ").concat(key, " property"));
                        }
                        return [4 /*yield*/, this[key].getScreenshot(scrObject[key])];
                    case 3:
                        _b.sent();
                        _b.label = 4;
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
            var _i, _a, key;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(0, helpers_1.isPlainObject)(sendObj)) {
                            throw new Error("".concat(this.name, " sendKeys argument should be an object"));
                        }
                        return [4 /*yield*/, this.waitVisible()];
                    case 1:
                        _b.sent();
                        _i = 0, _a = Object.keys(sendObj);
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        key = _a[_i];
                        if (!this[key]) {
                            throw new Error("".concat(this.name, " does not have ").concat(key, " property"));
                        }
                        return [4 /*yield*/, this[key].sendKeys(sendObj[key])];
                    case 3:
                        _b.sent();
                        _b.label = 4;
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
            var _i, _a, key;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(0, helpers_1.isPlainObject)(scrollObj)) {
                            throw new Error("".concat(this.name, " scroll argument should be an object"));
                        }
                        return [4 /*yield*/, this.waitVisible()];
                    case 1:
                        _b.sent();
                        _i = 0, _a = Object.keys(scrollObj);
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        key = _a[_i];
                        if (!this[key]) {
                            throw new Error("".concat(this.name, " does not have ").concat(key, " property"));
                        }
                        return [4 /*yield*/, this[key].scroll(scrollObj[key])];
                    case 3:
                        _b.sent();
                        _b.label = 4;
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
            var _i, _a, key;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(0, helpers_1.isPlainObject)(hoverObj)) {
                            throw new Error("".concat(this.name, " hover argument should be an object"));
                        }
                        return [4 /*yield*/, this.waitVisible()];
                    case 1:
                        _b.sent();
                        _i = 0, _a = Object.keys(hoverObj);
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        key = _a[_i];
                        if (!this[key]) {
                            throw new Error("".concat(this.name, " does not have ").concat(key, " property"));
                        }
                        return [4 /*yield*/, this[key].hover(hoverObj[key])];
                    case 3:
                        _b.sent();
                        _b.label = 4;
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
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waiter_1.waiter.waitFor(this.element(), this.name)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BasePage.prototype.waitExist = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waiter_1.waiter.waitFor(this.element(), this.name, { state: 'attached' })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BasePage.prototype.init = function (ClassName, rootSelector, name, options) {
        return new ClassName(this._page.bind(this), this.element.bind(this), rootSelector, name, options);
    };
    BasePage.prototype.initCollection = function (ClassName, collectionType, rootSelector, name, options) {
        return new ClassName(this._page.bind(this), this.element.bind(this), collectionType, rootSelector, name, options);
    };
    return BasePage;
}());
exports.BasePage = BasePage;
