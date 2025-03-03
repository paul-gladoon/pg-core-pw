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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
exports.CollectionFragments = void 0;
var waiter_1 = require("../utils/waiter");
var _n = __importStar(require("lodash"));
var CollectionFragments = /** @class */ (function () {
    function CollectionFragments(page, parentLocator, fragmentsType, fragmentsRootSelector, name, options) {
        this.parentLocator = parentLocator;
        this.fragmentsRootSelector = fragmentsRootSelector;
        this.name = name;
        this.page = page;
        this.options = options;
        this.fragmentsType = fragmentsType;
    }
    Object.defineProperty(CollectionFragments.prototype, "parentElement", {
        get: function () {
            return this.parentLocator();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CollectionFragments.prototype, "preparedListFragments", {
        get: function () {
            var _a = this, options = _a.options, page = _a.page, parentLocator = _a.parentLocator, fragmentsRootSelector = _a.fragmentsRootSelector;
            var rootLocator = (options === null || options === void 0 ? void 0 : options.searchFromDOMRoot) ? page() : parentLocator();
            return rootLocator.locator(fragmentsRootSelector, __assign({}, options === null || options === void 0 ? void 0 : options.selectorOpts)).all();
        },
        enumerable: false,
        configurable: true
    });
    CollectionFragments.prototype.setCurrentFragments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _fragments;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waiter_1.waiter.waitForState(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.preparedListFragments];
                                case 1: return [2 /*return*/, (_a.sent()).length];
                            }
                        }); }); }, {
                            timeout: 10000,
                            interval: 2000,
                            dontThrow: true,
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.preparedListFragments];
                    case 2:
                        _fragments = _a.sent();
                        this.fragments = _fragments.map(function (_fragment, i) {
                            return new _this.fragmentsType(_this.page.bind(_this), _this.parentLocator.bind(_this), "".concat(_this.fragmentsRootSelector, " >> nth=").concat(i), "".concat(_this.name, " with index: ").concat(i), _this.options);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CollectionFragments.prototype.validateSetAndReturnDataFragments = function (dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (Object.keys(dataObject).length > 2) {
                            throw new Error("Please follow the rules of \"ICollectionFragment\" interface");
                        }
                        return [4 /*yield*/, this.setCurrentFragments()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.setCorretKeysSort(dataObject)];
                }
            });
        });
    };
    CollectionFragments.prototype.transformValues = function (data) {
        var _this = this;
        Object.keys(data).forEach(function (key) {
            var value = data[key];
            if (typeof value === 'string' || typeof value === 'number') {
                data[key] = null;
            }
            else if (typeof value === 'object') {
                _this.transformValues(value);
            }
        });
    };
    CollectionFragments.prototype.castValuesToBoolean = function (data) {
        var _this = this;
        Object.keys(data).forEach(function (key) {
            var value = data[key];
            if (typeof value === 'string' || typeof value === 'number' || _n.isNull(value)) {
                data[key] = false;
            }
            else if (typeof value === 'object') {
                _this.castValuesToBoolean(value);
            }
        });
    };
    CollectionFragments.prototype.setCorretKeysSort = function (obj) {
        return Object.keys(obj).sort(function (a) { return (a === 'by' ? -1 : null); });
    };
    CollectionFragments.prototype.byIndex = function (index, method, fragmentData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (index >= this.fragments.length) {
                            throw new Error("The provided index: \"".concat(index, "\" is exceeds the number of fragments with name: \"").concat(this.name, "\", selector: ").concat(this.fragmentsRootSelector, " and parent selector: \"").concat(this.parentElement['_selector'], "\"."));
                        }
                        if (method === 'get' || method === 'isDisplay') {
                            return [2 /*return*/, this.fragments[index][method](fragmentData)];
                        }
                        return [4 /*yield*/, this.fragments[index][method](fragmentData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CollectionFragments.prototype.byData = function (providedData, method, fragmentData) {
        return __awaiter(this, void 0, void 0, function () {
            var deepCopyOriginalData, _i, _a, fragment, actualData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        deepCopyOriginalData = JSON.parse(JSON.stringify(providedData));
                        this.transformValues(providedData);
                        _i = 0, _a = this.fragments;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        fragment = _a[_i];
                        return [4 /*yield*/, fragment.get(providedData)];
                    case 2:
                        actualData = _b.sent();
                        if (!_n.isEqual(actualData, deepCopyOriginalData)) return [3 /*break*/, 4];
                        if (method === 'get' || method === 'isDisplay') {
                            return [2 /*return*/, fragment[method](fragmentData)];
                        }
                        return [4 /*yield*/, fragment[method](fragmentData)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: throw new Error("None of the fragments contain the provided data: ".concat(JSON.stringify(deepCopyOriginalData), ". The fragments with name: \"").concat(this.name, "\", selector: \"").concat(this.fragmentsRootSelector, "\" and parent selector: \"").concat(this.parentElement['_selector'], "\"."));
                }
            });
        });
    };
    CollectionFragments.prototype.click = function (dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, by, fragmentArgs, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.validateSetAndReturnDataFragments(dataObject)];
                    case 1:
                        _a = _c.sent(), by = _a[0], fragmentArgs = _a[1];
                        if (!_n.has(dataObject, 'by.index')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.byIndex(dataObject.by.index, 'click', dataObject[fragmentArgs])];
                    case 2:
                        _b = _c.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.byData(dataObject.by.data, 'click', dataObject[fragmentArgs])];
                    case 4:
                        _b = _c.sent();
                        _c.label = 5;
                    case 5:
                        _b;
                        return [2 /*return*/];
                }
            });
        });
    };
    CollectionFragments.prototype.hover = function (dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, by, fragmentArgs, _i, _b, fragment;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.validateSetAndReturnDataFragments(dataObject)];
                    case 1:
                        _a = _c.sent(), by = _a[0], fragmentArgs = _a[1];
                        if (!_n.has(dataObject, 'by.index')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.byIndex(dataObject.by.index, 'hover', dataObject[fragmentArgs])];
                    case 2:
                        _c.sent();
                        return [2 /*return*/];
                    case 3:
                        if (!(dataObject.by === null)) return [3 /*break*/, 8];
                        _i = 0, _b = this.fragments;
                        _c.label = 4;
                    case 4:
                        if (!(_i < _b.length)) return [3 /*break*/, 7];
                        fragment = _b[_i];
                        return [4 /*yield*/, fragment.hover(dataObject[fragmentArgs])];
                    case 5:
                        _c.sent();
                        _c.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7: return [2 /*return*/];
                    case 8: return [4 /*yield*/, this.byData(dataObject.by.data, 'hover', dataObject[fragmentArgs])];
                    case 9:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CollectionFragments.prototype.get = function (dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, by, fragmentArgs, tempArray, _i, _b, fragment, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.validateSetAndReturnDataFragments(dataObject)];
                    case 1:
                        _a = _e.sent(), by = _a[0], fragmentArgs = _a[1];
                        if (_n.has(dataObject, 'by.index')) {
                            return [2 /*return*/, this.byIndex(dataObject.by.index, 'get', dataObject[fragmentArgs])];
                        }
                        if (!(dataObject.by === null)) return [3 /*break*/, 6];
                        tempArray = [];
                        _i = 0, _b = this.fragments;
                        _e.label = 2;
                    case 2:
                        if (!(_i < _b.length)) return [3 /*break*/, 5];
                        fragment = _b[_i];
                        _d = (_c = tempArray).push;
                        return [4 /*yield*/, fragment.get(dataObject[fragmentArgs])];
                    case 3:
                        _d.apply(_c, [_e.sent()]);
                        _e.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, tempArray];
                    case 6: return [2 /*return*/, this.byData(dataObject.by.data, 'get', dataObject[fragmentArgs])];
                }
            });
        });
    };
    CollectionFragments.prototype.sendKeys = function (dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, by, fragmentArgs, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.validateSetAndReturnDataFragments(dataObject)];
                    case 1:
                        _a = _c.sent(), by = _a[0], fragmentArgs = _a[1];
                        if (!_n.has(dataObject, 'by.index')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.byIndex(dataObject.by.index, 'sendKeys', dataObject[fragmentArgs])];
                    case 2:
                        _b = _c.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.byData(dataObject.by.data, 'sendKeys', dataObject[fragmentArgs])];
                    case 4:
                        _b = _c.sent();
                        _c.label = 5;
                    case 5:
                        _b;
                        return [2 /*return*/];
                }
            });
        });
    };
    CollectionFragments.prototype.isDisplay = function (dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, by, fragmentArgs, tempArray, _i, _b, fragment, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.validateSetAndReturnDataFragments(dataObject)];
                    case 1:
                        _a = _e.sent(), by = _a[0], fragmentArgs = _a[1];
                        if (_n.has(dataObject, 'by.index')) {
                            return [2 /*return*/, this.byIndex(dataObject.by.index, 'isDisplay', dataObject[fragmentArgs])];
                        }
                        if (!(dataObject.by === null)) return [3 /*break*/, 6];
                        tempArray = [];
                        _i = 0, _b = this.fragments;
                        _e.label = 2;
                    case 2:
                        if (!(_i < _b.length)) return [3 /*break*/, 5];
                        fragment = _b[_i];
                        _d = (_c = tempArray).push;
                        return [4 /*yield*/, fragment.isDisplay(dataObject[fragmentArgs])];
                    case 3:
                        _d.apply(_c, [_e.sent()]);
                        _e.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, tempArray];
                    case 6: return [2 /*return*/, this.byData(dataObject.by.data, 'isDisplay', dataObject[fragmentArgs])];
                }
            });
        });
    };
    CollectionFragments.prototype.getState = function (methodName, dataObject, waitTime, dontThrowError) {
        return __awaiter(this, void 0, void 0, function () {
            var arrResults, expectedState, _a, every, some, index, _i, _b, fragment, currentFragmentState, _c, _d, fragment, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, this.setCurrentFragments()];
                    case 1:
                        _g.sent();
                        arrResults = [];
                        expectedState = dataObject.expectedState, _a = dataObject.stateFor, every = _a.every, some = _a.some, index = _a.index;
                        if (!this.fragments.length) {
                            return [2 /*return*/, false];
                        }
                        if (!some) return [3 /*break*/, 6];
                        _i = 0, _b = this.fragments;
                        _g.label = 2;
                    case 2:
                        if (!(_i < _b.length)) return [3 /*break*/, 5];
                        fragment = _b[_i];
                        return [4 /*yield*/, fragment[methodName](__assign({}, expectedState), waitTime, dontThrowError)];
                    case 3:
                        currentFragmentState = _g.sent();
                        arrResults.push(currentFragmentState);
                        if (currentFragmentState)
                            return [3 /*break*/, 5];
                        _g.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, arrResults.some(function (stateResult) { return stateResult; })];
                    case 6:
                        if (!every) return [3 /*break*/, 11];
                        _c = 0, _d = this.fragments;
                        _g.label = 7;
                    case 7:
                        if (!(_c < _d.length)) return [3 /*break*/, 10];
                        fragment = _d[_c];
                        _f = (_e = arrResults).push;
                        return [4 /*yield*/, fragment[methodName](__assign({}, expectedState), waitTime, dontThrowError)];
                    case 8:
                        _f.apply(_e, [_g.sent()]);
                        _g.label = 9;
                    case 9:
                        _c++;
                        return [3 /*break*/, 7];
                    case 10: return [2 /*return*/, arrResults.every(function (stateResult) { return stateResult; })];
                    case 11:
                        if (_n.isNumber(index)) {
                            if (index >= this.fragments.length) {
                                throw new Error("The provided index: \"".concat(index, "\" is exceeds the number of fragments with name: \"").concat(this.name, "\", selector: ").concat(this.fragmentsRootSelector, " and parent selector: \"").concat(this.parentElement['_selector'], "\"."));
                            }
                            return [2 /*return*/, this.fragments[index][methodName](__assign({}, expectedState), waitTime, dontThrowError)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CollectionFragments.prototype.waitForDataState = function (dataObject, waitTime, dontThrowError) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getState('waitForDataState', dataObject, waitTime, dontThrowError)];
            });
        });
    };
    CollectionFragments.prototype.waitForDisplayedState = function (dataObject, waitTime, dontThrowError) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getState('waitForDisplayedState', dataObject, waitTime, dontThrowError)];
            });
        });
    };
    return CollectionFragments;
}());
exports.CollectionFragments = CollectionFragments;
