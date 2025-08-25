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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
    CollectionFragments.prototype._index = function (index, methodName, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (index >= this.fragments.length) {
                    throw new Error("The provided index: \"".concat(index, "\" is exceeds the number of fragments with name: \"").concat(this.name, "\", selector: \"").concat(this.fragmentsRootSelector, "\" and parent selector: \"").concat(this.parentElement['_selector'], "\"."));
                }
                return [2 /*return*/, this.fragments[index][methodName](data)];
            });
        });
    };
    CollectionFragments.prototype._where = function (providedData, methodName, data) {
        return __awaiter(this, void 0, void 0, function () {
            var originalData, _i, _a, fragment, actualData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        originalData = JSON.parse(JSON.stringify(providedData));
                        this.transformValues(providedData);
                        _i = 0, _a = this.fragments;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        fragment = _a[_i];
                        return [4 /*yield*/, fragment.get(providedData)];
                    case 2:
                        actualData = _b.sent();
                        if (_n.isEqual(actualData, originalData)) {
                            return [2 /*return*/, fragment[methodName](data)];
                        }
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: throw new Error("None of the fragments contain the provided data: ".concat(JSON.stringify(originalData), ". The fragments with name: \"").concat(this.name, "\", selector: \"").concat(this.fragmentsRootSelector, "\" and parent selector: \"").concat(this.parentElement['_selector'], "\"."));
                }
            });
        });
    };
    CollectionFragments.prototype._all = function (methodName, data) {
        return __awaiter(this, void 0, void 0, function () {
            var tempArray, _i, _a, fragment, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.fragments.length) {
                            throw new Error("There are no fragments with name: \"".concat(this.name, "\", selector: \"").concat(this.fragmentsRootSelector, "\" and parent selector: \"").concat(this.parentElement['_selector'], "\"."));
                        }
                        tempArray = [];
                        _i = 0, _a = this.fragments;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        fragment = _a[_i];
                        if (!(methodName === 'get' || methodName === 'isDisplay' || methodName === 'isExist')) return [3 /*break*/, 3];
                        _c = (_b = tempArray).push;
                        return [4 /*yield*/, fragment[methodName](data)];
                    case 2:
                        _c.apply(_b, [_d.sent()]);
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, fragment[methodName](data)];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, tempArray];
                }
            });
        });
    };
    CollectionFragments.prototype.click = function (dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            var _where, _index, _data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setCurrentFragments()];
                    case 1:
                        _a.sent();
                        _where = dataObject._where, _index = dataObject._index, _data = __rest(dataObject, ["_where", "_index"]);
                        if (!_n.isNumber(_index)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._index(_index, 'click', _data)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!_where) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._where(_where, 'click', _data)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CollectionFragments.prototype.hover = function (dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            var _where, _index, _data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setCurrentFragments()];
                    case 1:
                        _a.sent();
                        _where = dataObject._where, _index = dataObject._index, _data = __rest(dataObject, ["_where", "_index"]);
                        if (!_n.isNumber(_index)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._index(_index, 'hover', _data)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!_where) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._where(_where, 'hover', _data)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CollectionFragments.prototype.sendKeys = function (dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            var _where, _index, _data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setCurrentFragments()];
                    case 1:
                        _a.sent();
                        _where = dataObject._where, _index = dataObject._index, _data = __rest(dataObject, ["_where", "_index"]);
                        if (!_n.isNumber(_index)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._index(_index, 'sendKeys', _data)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!_where) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._where(_where, 'sendKeys', _data)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CollectionFragments.prototype.get = function (dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            var _index, _length, _where, _data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setCurrentFragments()];
                    case 1:
                        _a.sent();
                        if (!dataObject || _n.isEmpty(dataObject)) {
                            throw new Error("Please provide some strategy for \"get\" method");
                        }
                        _index = dataObject._index, _length = dataObject._length, _where = dataObject._where, _data = __rest(dataObject, ["_index", "_length", "_where"]);
                        if (_n.isNumber(_index)) {
                            return [2 /*return*/, this._index(_index, 'get', _data)];
                        }
                        if (_where) {
                            return [2 /*return*/, this._where(_where, 'get', _data)];
                        }
                        if (_n.isNull(_length)) {
                            return [2 /*return*/, { _length: this.fragments.length }];
                        }
                        if (!this.fragments.length) {
                            return [2 /*return*/, []];
                        }
                        if (!_where && !_n.isNull(_length) && !_n.isNumber(_index)) {
                            return [2 /*return*/, this._all('get', _data)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CollectionFragments.prototype.isDisplay = function (dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            var _index, _where, _data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setCurrentFragments()];
                    case 1:
                        _a.sent();
                        _index = dataObject._index, _where = dataObject._where, _data = __rest(dataObject, ["_index", "_where"]);
                        if (_n.isNumber(_index)) {
                            return [2 /*return*/, this._index(_index, 'isDisplay', _data)];
                        }
                        if (_where) {
                            return [2 /*return*/, this._where(_where, 'isDisplay', _data)];
                        }
                        if (!this.fragments.length) {
                            return [2 /*return*/, []];
                        }
                        if (!_where && !_n.isNumber(_index)) {
                            return [2 /*return*/, this._all('isDisplay', _data)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CollectionFragments.prototype.isExist = function (dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            var _index, _where, _data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setCurrentFragments()];
                    case 1:
                        _a.sent();
                        _index = dataObject._index, _where = dataObject._where, _data = __rest(dataObject, ["_index", "_where"]);
                        if (_n.isNumber(_index)) {
                            return [2 /*return*/, this._index(_index, 'isExist', _data)];
                        }
                        if (_where) {
                            return [2 /*return*/, this._where(_where, 'isExist', _data)];
                        }
                        if (!this.fragments.length) {
                            return [2 /*return*/, []];
                        }
                        if (!_where && !_n.isNumber(_index)) {
                            return [2 /*return*/, this._all('isExist', _data)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CollectionFragments.prototype.waitForDataState = function (dataObject, waitTime, dontThrowError) {
        return __awaiter(this, void 0, void 0, function () {
            var _where, _index, _every, _some, _length, arrResults, _i, _a, fragment, currentFragmentState, _b, _c, fragment, _d, _e, conditionCheck;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.setCurrentFragments()];
                    case 1:
                        _f.sent();
                        if (!dataObject || _n.isEmpty(dataObject)) {
                            throw new Error("Please provide some strategy for \"waitForDataState\" method");
                        }
                        _where = dataObject._where, _index = dataObject._index, _every = dataObject._every, _some = dataObject._some, _length = dataObject._length;
                        arrResults = [];
                        if (!this.fragments.length) {
                            return [2 /*return*/, false];
                        }
                        if (!_some) return [3 /*break*/, 6];
                        _i = 0, _a = this.fragments;
                        _f.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        fragment = _a[_i];
                        return [4 /*yield*/, fragment.waitForDataState(_where, waitTime, dontThrowError)];
                    case 3:
                        currentFragmentState = _f.sent();
                        arrResults.push(currentFragmentState);
                        if (currentFragmentState)
                            return [3 /*break*/, 5];
                        _f.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, arrResults.some(function (stateResult) { return stateResult; })];
                    case 6:
                        if (!_every) return [3 /*break*/, 11];
                        _b = 0, _c = this.fragments;
                        _f.label = 7;
                    case 7:
                        if (!(_b < _c.length)) return [3 /*break*/, 10];
                        fragment = _c[_b];
                        _e = (_d = arrResults).push;
                        return [4 /*yield*/, fragment.waitForDataState(_where, waitTime, dontThrowError)];
                    case 8:
                        _e.apply(_d, [_f.sent()]);
                        _f.label = 9;
                    case 9:
                        _b++;
                        return [3 /*break*/, 7];
                    case 10: return [2 /*return*/, arrResults.every(function (stateResult) { return stateResult; })];
                    case 11:
                        if (_n.isNumber(_index)) {
                            if (_index >= this.fragments.length) {
                                throw new Error("The provided index: \"".concat(_index, "\" is exceeds the number of fragments with name: \"").concat(this.name, "\", selector: \"").concat(this.fragmentsRootSelector, "\" and parent selector: \"").concat(this.parentElement['_selector'], "\"."));
                            }
                            return [2 /*return*/, this.fragments[_index].waitForDataState(_where, waitTime, dontThrowError)];
                        }
                        if (_n.isNumber(_length)) {
                            return [2 /*return*/, this.fragments.length === _length];
                        }
                        if (_n.isString(_length)) {
                            conditionCheck = new Function('length', "return length ".concat(_length));
                            return [2 /*return*/, conditionCheck(this.fragments.length)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CollectionFragments.prototype.waitForDisplayedState = function (dataObject, waitTime, dontThrowError) {
        return __awaiter(this, void 0, void 0, function () {
            var _state, _every, _index, _some, _where, arrResults, _i, _a, fragment, currentFragmentState, fragmentDisplayedState, _b, _c, fragment, currentFragmentState, _d, _e, fragment, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0: return [4 /*yield*/, this.setCurrentFragments()];
                    case 1:
                        _h.sent();
                        _state = dataObject._state, _every = dataObject._every, _index = dataObject._index, _some = dataObject._some, _where = dataObject._where;
                        arrResults = [];
                        if (!this.fragments.length) {
                            return [2 /*return*/, false];
                        }
                        if (!_where) return [3 /*break*/, 8];
                        _i = 0, _a = this.fragments;
                        _h.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        fragment = _a[_i];
                        return [4 /*yield*/, fragment.waitForDataState(_where, waitTime, dontThrowError)];
                    case 3:
                        currentFragmentState = _h.sent();
                        if (!currentFragmentState) return [3 /*break*/, 5];
                        return [4 /*yield*/, fragment.waitForDisplayedState(_state, waitTime, dontThrowError)];
                    case 4:
                        fragmentDisplayedState = _h.sent();
                        arrResults.push(fragmentDisplayedState);
                        return [3 /*break*/, 7];
                    case 5: return [3 /*break*/, 6];
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/, arrResults.some(function (stateResult) { return stateResult; })];
                    case 8:
                        if (!_some) return [3 /*break*/, 13];
                        _b = 0, _c = this.fragments;
                        _h.label = 9;
                    case 9:
                        if (!(_b < _c.length)) return [3 /*break*/, 12];
                        fragment = _c[_b];
                        return [4 /*yield*/, fragment.waitForDisplayedState(_state, waitTime, dontThrowError)];
                    case 10:
                        currentFragmentState = _h.sent();
                        arrResults.push(currentFragmentState);
                        if (currentFragmentState)
                            return [3 /*break*/, 12];
                        _h.label = 11;
                    case 11:
                        _b++;
                        return [3 /*break*/, 9];
                    case 12: return [2 /*return*/, arrResults.some(function (stateResult) { return stateResult; })];
                    case 13:
                        if (!(_every || (_n.isUndefined(_every) && _n.isUndefined(_some) && _n.isUndefined(_index)))) return [3 /*break*/, 18];
                        _d = 0, _e = this.fragments;
                        _h.label = 14;
                    case 14:
                        if (!(_d < _e.length)) return [3 /*break*/, 17];
                        fragment = _e[_d];
                        _g = (_f = arrResults).push;
                        return [4 /*yield*/, fragment.waitForDisplayedState(_state, waitTime, dontThrowError)];
                    case 15:
                        _g.apply(_f, [_h.sent()]);
                        _h.label = 16;
                    case 16:
                        _d++;
                        return [3 /*break*/, 14];
                    case 17: return [2 /*return*/, arrResults.every(function (stateResult) { return stateResult; })];
                    case 18:
                        if (_n.isNumber(_index)) {
                            if (_index >= this.fragments.length) {
                                throw new Error("The provided index: \"".concat(_index, "\" is exceeds the number of fragments with name: \"").concat(this.name, "\", selector: \"").concat(this.fragmentsRootSelector, "\" and parent selector: \"").concat(this.parentElement['_selector'], "\"."));
                            }
                            return [2 /*return*/, this.fragments[_index].waitForDisplayedState(_state, waitTime, dontThrowError)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return CollectionFragments;
}());
exports.CollectionFragments = CollectionFragments;
