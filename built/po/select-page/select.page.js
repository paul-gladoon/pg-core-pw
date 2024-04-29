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
exports.SelectPage = void 0;
var base_page_1 = require("../../lib/base.page");
var select_1 = require("../../lib/elements/select");
var SelectPage = /** @class */ (function (_super) {
    __extends(SelectPage, _super);
    function SelectPage(browserContext, page) {
        var _this = _super.call(this, browserContext, page, 'body', 'Select Main Page', 'https://stevefaulkner.github.io/html-mapping-tests/browser-tests/select-test.html') || this;
        _this.select = _this.init(select_1.SelectElement, 'select', 'Select', { locatorOpts: 'first' });
        return _this;
    }
    return SelectPage;
}(base_page_1.BasePage));
exports.SelectPage = SelectPage;
