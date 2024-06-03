"use strict";
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
exports.BrowserConsoler = void 0;
var evaluate_fn_1 = require("../utils/evaluate.fn");
function setConsoleData(sendObj) {
    var values = {
        clearState: function (state) {
            if (state) {
                localStorage.clear();
            }
        },
        hideScrollBarFrom: function (selector) {
            if (selector) {
                var style = document.createElement('style');
                style.innerHTML = "".concat(selector, "::-webkit-scrollbar {display: none;}");
                document.head.appendChild(style);
            }
        },
        removeNode: function (selector) {
            var nodes = Array.isArray(selector) ? selector : [selector];
            for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                var node = nodes_1[_i];
                document.querySelector(node).remove();
            }
        },
        setStyleForNode: function (_a) {
            var selector = _a.selector, styleName = _a.styleName, value = _a.value;
            var node = document.querySelector(selector);
            node ? (node['style'][styleName] = value) : null;
        },
    };
    for (var _i = 0, _a = Object.keys(sendObj); _i < _a.length; _i++) {
        var key = _a[_i];
        values[key](sendObj[key]);
    }
}
function getConsoleData(_a) {
    var getObj = _a.getObj, getValues = _a.getValues;
    var fn = new Function("return ".concat(getValues))();
    var values = {
        shortpointVersion: new Function('return shortpoint.version'),
        readyState: function () {
            return document.readyState;
        },
    };
    return fn(getObj, values);
}
var BrowserConsoler = /** @class */ (function () {
    function BrowserConsoler(page) {
        this.name = 'Browser console';
        this.page = page;
    }
    BrowserConsoler.prototype.sendKeys = function (sendObj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page().evaluate(setConsoleData, sendObj)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BrowserConsoler.prototype.get = function (getObj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.page().evaluate(getConsoleData, { getObj: getObj, getValues: evaluate_fn_1.getValues.toString() })];
            });
        });
    };
    return BrowserConsoler;
}());
exports.BrowserConsoler = BrowserConsoler;
