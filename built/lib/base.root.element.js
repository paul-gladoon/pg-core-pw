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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRootElement = void 0;
var base_element_1 = require("./base.element");
var BaseRootElement = /** @class */ (function (_super) {
    __extends(BaseRootElement, _super);
    function BaseRootElement(page, parentLocator, elementRootSelector, name, options) {
        return _super.call(this, page, parentLocator, elementRootSelector, name, options) || this;
    }
    Object.defineProperty(BaseRootElement.prototype, "element", {
        get: function () {
            return this.parentLocator();
        },
        enumerable: false,
        configurable: true
    });
    return BaseRootElement;
}(base_element_1.BaseElement));
exports.BaseRootElement = BaseRootElement;
