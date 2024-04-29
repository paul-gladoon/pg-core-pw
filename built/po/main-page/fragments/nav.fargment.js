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
exports.NavFragment = void 0;
var base_fragment_1 = require("../../../lib/base.fragment");
var base_types_1 = require("../../../lib/base.types");
var button_1 = require("../../../lib/elements/button");
var NavFragment = /** @class */ (function (_super) {
    __extends(NavFragment, _super);
    function NavFragment(page, parentLocator, fragmentRootSelector, name, options) {
        if (fragmentRootSelector === void 0) { fragmentRootSelector = '.navbar__items'; }
        if (name === void 0) { name = 'Navigation bar'; }
        var _this = _super.call(this, page, parentLocator, fragmentRootSelector, name, options) || this;
        _this.navItems = _this.initCollection(base_types_1.CollectionElements, button_1.ButtonElement, '.navbar__item', 'Navigation item');
        return _this;
    }
    return NavFragment;
}(base_fragment_1.BaseFragment));
exports.NavFragment = NavFragment;
