"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
exports.SelectElement = void 0;
exports.getSelectedData = getSelectedData;
var evaluate_fn_1 = require("../utils/evaluate.fn");
var base_element_1 = require("../base.element");
function getSelectedData(_element, _a) {
    var getObj = _a.getObj, getValues = _a.getValues;
    var fn = new Function("return ".concat(getValues))();
    var values = {
        selected: function () {
            return _element.value.trim();
        },
        attribute: function (attr) {
            return _element.getAttribute(attr);
        },
    };
    return fn(getObj, values);
}
var SelectElement = /** @class */ (function (_super) {
    __extends(SelectElement, _super);
    function SelectElement(page, parentLocator, elementRootSelector, name, options) {
        return _super.call(this, page, parentLocator, elementRootSelector, name, options) || this;
    }
    SelectElement.prototype.sendKeys = function (sendObj) {
        return __awaiter(this, void 0, void 0, function () {
            var value, label, index, opts, select;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof sendObj === 'string' || Array.isArray(sendObj))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.element.selectOption(sendObj)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        value = sendObj.value, label = sendObj.label, index = sendObj.index, opts = sendObj.opts;
                        select = { value: value, label: label, index: index };
                        return [4 /*yield*/, this.element.selectOption(select, opts)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SelectElement.prototype.get = function (getObj) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.waitVisible()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.element.evaluate(getSelectedData, { getObj: getObj, getValues: evaluate_fn_1.getValues.toString() })];
                }
            });
        });
    };
    SelectElement.prototype.click = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("".concat(this.name, " is select, select does not have click, please use sendKeys for select option."));
            });
        });
    };
    return SelectElement;
}(base_element_1.BaseElement));
exports.SelectElement = SelectElement;
