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
exports.HeaderFragment = void 0;
var lib_1 = require("../../../lib");
var base_fragment_1 = require("../../../lib/base.fragment");
var button_1 = require("../../../lib/elements/button");
var HeaderFragment = /** @class */ (function (_super) {
    __extends(HeaderFragment, _super);
    function HeaderFragment(page, parentLocator, fragmentRootSelector, name, options) {
        if (fragmentRootSelector === void 0) { fragmentRootSelector = 'header.hero'; }
        if (name === void 0) { name = 'Header'; }
        var _this = _super.call(this, page, parentLocator, fragmentRootSelector, name, options) || this;
        _this.title = _this.init(lib_1.TextElement, '.hero__title', 'Title');
        _this.getStarted = _this.init(button_1.ButtonElement, '.getStarted_Sjon', 'Get started');
        return _this;
    }
    return HeaderFragment;
}(base_fragment_1.BaseFragment));
exports.HeaderFragment = HeaderFragment;
