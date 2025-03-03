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
exports.CollectionElements = void 0;
var waiter_1 = require("../utils/waiter");
var base_element_1 = require("../base.element");
var _n = __importStar(require("lodash"));
var CollectionElements = /** @class */ (function () {
    function CollectionElements(page, parentLocator, elementsType, elementsRootSelector, name, options) {
        this.parentLocator = parentLocator;
        this.elementsRootSelector = elementsRootSelector;
        this.name = name;
        this.page = page;
        this.options = options;
        this.elementsType = elementsType;
    }
    Object.defineProperty(CollectionElements.prototype, "parentElement", {
        get: function () {
            return this.parentLocator();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CollectionElements.prototype, "preparedListElements", {
        get: function () {
            var _a = this, options = _a.options, page = _a.page, parentLocator = _a.parentLocator, elementsRootSelector = _a.elementsRootSelector;
            var rootLocator = (options === null || options === void 0 ? void 0 : options.searchFromDOMRoot) ? page() : parentLocator();
            return rootLocator.locator(elementsRootSelector, __assign({}, options === null || options === void 0 ? void 0 : options.selectorOpts)).all();
        },
        enumerable: false,
        configurable: true
    });
    CollectionElements.prototype.setCurrentElements = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _elements;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, waiter_1.waiter.waitForState(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.preparedListElements];
                                case 1: return [2 /*return*/, (_a.sent()).length];
                            }
                        }); }); }, {
                            timeout: 10000,
                            interval: 2000,
                            dontThrow: true,
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.preparedListElements];
                    case 2:
                        _elements = _a.sent();
                        this.elements = _elements.map(function (_element, i) {
                            return new _this.elementsType(_this.page.bind(_this), _this.parentLocator.bind(_this), "".concat(_this.elementsRootSelector, " >> nth=").concat(i), "".concat(_this.name, " with index: ").concat(i), _this.options);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CollectionElements.prototype.transformValues = function (data) {
        var _this = this;
        Object.keys(data).forEach(function (key) {
            var value = data[key];
            if (base_element_1.arrayValuesKeys.includes(key) && typeof value === 'object') {
                Object.keys(value).forEach(function (subKey) {
                    data[key] = subKey;
                });
                return;
            }
            if (typeof value === 'string' || typeof value === 'number') {
                data[key] = null;
            }
            else if (typeof value === 'object') {
                _this.transformValues(value);
            }
        });
    };
    CollectionElements.prototype._all = function (methodName_1) {
        return __awaiter(this, arguments, void 0, function (methodName, action) {
            var tempArray, _i, _a, element, _b, _c;
            if (action === void 0) { action = null; }
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.elements.length) {
                            throw new Error("There are no elements with name: \"".concat(this.name, "\", selector: \"").concat(this.elementsRootSelector, "\" and parent selector: \"").concat(this.parentElement['_selector'], "\"."));
                        }
                        tempArray = [];
                        _i = 0, _a = this.elements;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        element = _a[_i];
                        if (!(methodName === 'get' || methodName === 'isDisplay')) return [3 /*break*/, 3];
                        _c = (_b = tempArray).push;
                        return [4 /*yield*/, element[methodName](action)];
                    case 2:
                        _c.apply(_b, [_d.sent()]);
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, element[methodName](action)];
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
    CollectionElements.prototype._index = function (index_1, methodName_1) {
        return __awaiter(this, arguments, void 0, function (index, methodName, action) {
            if (action === void 0) { action = null; }
            return __generator(this, function (_a) {
                if (index >= this.elements.length) {
                    throw new Error("The provided index: \"".concat(index, "\" is exceeds the number of elements with name: \"").concat(this.name, "\", selector: \"").concat(this.elementsRootSelector, "\" and parent selector: \"").concat(this.parentElement['_selector'], "\"."));
                }
                return [2 /*return*/, this.elements[index][methodName](action)];
            });
        });
    };
    CollectionElements.prototype._where = function (providedData_1, methodName_1) {
        return __awaiter(this, arguments, void 0, function (providedData, methodName, action) {
            var originalData, _i, _a, element, actualData;
            if (action === void 0) { action = null; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        originalData = JSON.parse(JSON.stringify(providedData));
                        this.transformValues(providedData);
                        _i = 0, _a = this.elements;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        element = _a[_i];
                        return [4 /*yield*/, element.get(providedData)];
                    case 2:
                        actualData = _b.sent();
                        if (_n.isEqual(actualData, originalData)) {
                            return [2 /*return*/, element[methodName](action)];
                        }
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: throw new Error("None of the elements contain the provided data: ".concat(JSON.stringify(originalData), ". The elements with name: \"").concat(this.name, "\", selector: \"").concat(this.elementsRootSelector, "\" and parent selector: \"").concat(this.parentElement['_selector'], "\"."));
                }
            });
        });
    };
    CollectionElements.prototype.click = function (dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            var _action, _index, _where;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setCurrentElements()];
                    case 1:
                        _a.sent();
                        _action = dataObject._action, _index = dataObject._index, _where = dataObject._where;
                        if (!_n.isNumber(_index)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._index(_index, 'click', _action)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!_where) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._where(_where, 'click', _action)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!(!_where && !_n.isNumber(_index))) return [3 /*break*/, 7];
                        return [4 /*yield*/, this._all('click', _action)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    CollectionElements.prototype.hover = function (dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            var _action, _index, _where;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setCurrentElements()];
                    case 1:
                        _a.sent();
                        _action = dataObject._action, _index = dataObject._index, _where = dataObject._where;
                        if (!_n.isNumber(_index)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._index(_index, 'hover', _action)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!_where) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._where(_where, 'hover', _action)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!(!_where && !_n.isNumber(_index))) return [3 /*break*/, 7];
                        return [4 /*yield*/, this._all('hover', _action)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    CollectionElements.prototype.waitForDataState = function (dataObject, waitTime, dontThrowError) {
        return __awaiter(this, void 0, void 0, function () {
            var _where, _index, _every, _some, _includes, _length, arrResults, _i, _a, element, currentElementState, _b, _c, element, _d, _e, conditionCheck;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.setCurrentElements()];
                    case 1:
                        _f.sent();
                        if (!dataObject || _n.isEmpty(dataObject)) {
                            throw new Error("Please provide some strategy for \"waitForDataState\" method");
                        }
                        _where = dataObject._where, _index = dataObject._index, _every = dataObject._every, _some = dataObject._some, _includes = dataObject._includes, _length = dataObject._length;
                        arrResults = [];
                        if (!this.elements.length) {
                            return [2 /*return*/, false];
                        }
                        if (!_some) return [3 /*break*/, 6];
                        _i = 0, _a = this.elements;
                        _f.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        element = _a[_i];
                        return [4 /*yield*/, element.waitForDataState({ _where: _where, _includes: _includes }, waitTime, dontThrowError)];
                    case 3:
                        currentElementState = _f.sent();
                        arrResults.push(currentElementState);
                        if (currentElementState)
                            return [3 /*break*/, 5];
                        _f.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, arrResults.some(function (stateResult) { return stateResult; })];
                    case 6:
                        if (!_every) return [3 /*break*/, 11];
                        _b = 0, _c = this.elements;
                        _f.label = 7;
                    case 7:
                        if (!(_b < _c.length)) return [3 /*break*/, 10];
                        element = _c[_b];
                        _e = (_d = arrResults).push;
                        return [4 /*yield*/, element.waitForDataState({ _where: _where, _includes: _includes }, waitTime, dontThrowError)];
                    case 8:
                        _e.apply(_d, [_f.sent()]);
                        _f.label = 9;
                    case 9:
                        _b++;
                        return [3 /*break*/, 7];
                    case 10: return [2 /*return*/, arrResults.every(function (stateResult) { return stateResult; })];
                    case 11:
                        if (_n.isNumber(_index)) {
                            if (_index >= this.elements.length) {
                                throw new Error("The provided index: \"".concat(_index, "\" is exceeds the number of elements with name: \"").concat(this.name, "\", selector: \"").concat(this.elementsRootSelector, "\" and parent selector: \"").concat(this.parentElement['_selector'], "\"."));
                            }
                            return [2 /*return*/, this.elements[_index].waitForDataState({ _where: _where, _includes: _includes }, waitTime, dontThrowError)];
                        }
                        if (_n.isNumber(_length)) {
                            return [2 /*return*/, this.elements.length === _length];
                        }
                        if (_n.isString(_length)) {
                            conditionCheck = new Function('length', "return length ".concat(_length));
                            return [2 /*return*/, conditionCheck(this.elements.length)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CollectionElements.prototype.waitForDisplayedState = function (dataObject, waitTime, dontThrowError) {
        return __awaiter(this, void 0, void 0, function () {
            var _state, _every, _index, _some, arrResults, _i, _a, element, currentElementState, _b, _c, element, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.setCurrentElements()];
                    case 1:
                        _f.sent();
                        _state = dataObject._state, _every = dataObject._every, _index = dataObject._index, _some = dataObject._some;
                        arrResults = [];
                        if (!this.elements.length) {
                            return [2 /*return*/, false];
                        }
                        if (!_some) return [3 /*break*/, 6];
                        _i = 0, _a = this.elements;
                        _f.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        element = _a[_i];
                        return [4 /*yield*/, element.waitForDisplayedState(_state, waitTime, dontThrowError)];
                    case 3:
                        currentElementState = _f.sent();
                        arrResults.push(currentElementState);
                        if (currentElementState)
                            return [3 /*break*/, 5];
                        _f.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, arrResults.some(function (stateResult) { return stateResult; })];
                    case 6:
                        if (!(_every || (_n.isUndefined(_every) && _n.isUndefined(_some) && _n.isUndefined(_index)))) return [3 /*break*/, 11];
                        _b = 0, _c = this.elements;
                        _f.label = 7;
                    case 7:
                        if (!(_b < _c.length)) return [3 /*break*/, 10];
                        element = _c[_b];
                        _e = (_d = arrResults).push;
                        return [4 /*yield*/, element.waitForDisplayedState(_state, waitTime, dontThrowError)];
                    case 8:
                        _e.apply(_d, [_f.sent()]);
                        _f.label = 9;
                    case 9:
                        _b++;
                        return [3 /*break*/, 7];
                    case 10: return [2 /*return*/, arrResults.every(function (stateResult) { return stateResult; })];
                    case 11:
                        if (_n.isNumber(_index)) {
                            if (_index >= this.elements.length) {
                                throw new Error("The provided index: \"".concat(_index, "\" is exceeds the number of elements with name: \"").concat(this.name, "\", selector: \"").concat(this.elementsRootSelector, "\" and parent selector: \"").concat(this.parentElement['_selector'], "\"."));
                            }
                            return [2 /*return*/, this.elements[_index].waitForDisplayedState(_state, waitTime, dontThrowError)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CollectionElements.prototype.get = function (dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            var _action, _index, _length, _where;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setCurrentElements()];
                    case 1:
                        _a.sent();
                        if (!dataObject || _n.isEmpty(dataObject)) {
                            throw new Error("Please provide some strategy for \"get\" method");
                        }
                        _action = dataObject._action, _index = dataObject._index, _length = dataObject._length, _where = dataObject._where;
                        if (_n.isNumber(_index)) {
                            return [2 /*return*/, this._index(_index, 'get', _action)];
                        }
                        if (_where) {
                            return [2 /*return*/, this._where(_where, 'get', _action)];
                        }
                        if (_n.isNull(_length)) {
                            return [2 /*return*/, { _length: this.elements.length }];
                        }
                        if (!this.elements.length) {
                            return [2 /*return*/, []];
                        }
                        if (!_where && !_n.isNull(_length) && !_n.isNumber(_index)) {
                            return [2 /*return*/, this._all('get', _action)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CollectionElements.prototype.sendKeys = function (dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            var _action, _index, _where;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setCurrentElements()];
                    case 1:
                        _a.sent();
                        _action = dataObject._action, _index = dataObject._index, _where = dataObject._where;
                        if (!_n.isNumber(_index)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._index(_index, 'sendKeys', _action)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!_where) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._where(_where, 'click', _action)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!(!_where && !_n.isNumber(_index))) return [3 /*break*/, 7];
                        return [4 /*yield*/, this._all('click', _action)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    CollectionElements.prototype.isDisplay = function (dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            var _action, _index, _where;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setCurrentElements()];
                    case 1:
                        _a.sent();
                        _action = dataObject._action, _index = dataObject._index, _where = dataObject._where;
                        if (_n.isNumber(_index)) {
                            return [2 /*return*/, this._index(_index, 'isDisplay', _action)];
                        }
                        if (_where) {
                            return [2 /*return*/, this._where(_where, 'isDisplay', _action)];
                        }
                        if (!this.elements.length) {
                            return [2 /*return*/, []];
                        }
                        if (!_where && !_n.isNumber(_index)) {
                            return [2 /*return*/, this._all('isDisplay', _action)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CollectionElements.prototype.isExist = function (dataObject) {
        return __awaiter(this, void 0, void 0, function () {
            var _action, _index, _where;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setCurrentElements()];
                    case 1:
                        _a.sent();
                        _action = dataObject._action, _index = dataObject._index, _where = dataObject._where;
                        if (_n.isNumber(_index)) {
                            return [2 /*return*/, this._index(_index, 'isExist', _action)];
                        }
                        if (_where) {
                            return [2 /*return*/, this._where(_where, 'isExist', _action)];
                        }
                        if (!this.elements.length) {
                            return [2 /*return*/, []];
                        }
                        if (!_where && !_n.isNumber(_index)) {
                            return [2 /*return*/, this._all('isExist', _action)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return CollectionElements;
}());
exports.CollectionElements = CollectionElements;
