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
exports.MainPage = void 0;
var base_page_1 = require("../../lib/base.page");
var base_types_1 = require("../../lib/base.types");
var collection_elements_1 = require("../../lib/collection/collection.elements");
var button_1 = require("../../lib/elements/button");
var input_1 = require("../../lib/elements/input");
var text_1 = require("../../lib/elements/text");
var header_fragment_1 = require("./fragments/header.fragment");
var nav_fargment_1 = require("./fragments/nav.fargment");
var MainPage = /** @class */ (function (_super) {
    __extends(MainPage, _super);
    function MainPage(browserContext, page) {
        var _this = _super.call(this, browserContext, page, '[id="__docusaurus"]', 'Playwright Main Page', 'https://playwright.dev/') || this;
        _this.navigationBars = _this.initCollection(base_types_1.CollectionFragments, nav_fargment_1.NavFragment, '.navbar__items', 'Navigation bar');
        _this.searchBtn = _this.init(button_1.ButtonElement, '[class="DocSearch DocSearch-Button"]', 'Search btn');
        _this.searchInput = _this.init(input_1.InputElement, '.DocSearch-Input', 'Search input', { searchFromDOMRoot: true });
        _this.navItems = _this.initCollection(collection_elements_1.CollectionElements, text_1.TextElement, '.navbar__items [class*="item"]', 'Menu items');
        _this.github = _this.init(button_1.ButtonElement, '[aria-label="GitHub repository"]', 'GitHub');
        _this.header = _this.init(header_fragment_1.HeaderFragment, 'header.hero', 'Header');
        _this.apiItem = _this.init(button_1.ButtonElement, [
            { selector: '.navbar__title', opts: { selectorOpts: { hasText: 'Playwright' } } },
            '..',
            '..',
            '..',
            { selector: 'a', opts: { selectorOpts: { hasText: 'API' } } },
        ], 'Navbar');
        return _this;
    }
    return MainPage;
}(base_page_1.BasePage));
exports.MainPage = MainPage;
