"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkElement = void 0;
exports.getLinkData = getLinkData;
const evaluate_fn_1 = require("../utils/evaluate.fn");
const base_element_1 = require("../base.element");
function getLinkData(_element, { getObj, getValues }) {
    const fn = new Function(`return ${getValues}`)();
    const values = {
        href: function () {
            return _element.href;
        },
        color: function () {
            return window.getComputedStyle(_element).color;
        },
        style: function (key) {
            return window.getComputedStyle(_element)[key];
        },
        text: function () {
            return _element.innerText.trim();
        },
        attribute: function (attr) {
            return _element.getAttribute(attr);
        },
    };
    return fn(getObj, values);
}
class LinkElement extends base_element_1.BaseElement {
    constructor(page, parentLocator, elementRootSelector, name, options) {
        super(page, parentLocator, elementRootSelector, name, options);
    }
    async get(getObj) {
        await this.waitVisible();
        return this.element.evaluate(getLinkData, { getObj, getValues: evaluate_fn_1.getValues.toString() });
    }
}
exports.LinkElement = LinkElement;
//# sourceMappingURL=link.js.map