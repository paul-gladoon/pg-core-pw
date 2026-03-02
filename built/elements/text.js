"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextElement = void 0;
exports.getTextData = getTextData;
const evaluate_fn_1 = require("../utils/evaluate.fn");
const base_element_1 = require("../base.element");
function getTextData(_element, { getObj, getValues }) {
    const fn = new Function(`return ${getValues}`)();
    const values = {
        text: function () {
            return _element.innerText.trim();
        },
        color: function () {
            return window.getComputedStyle(_element).color;
        },
        style: function (key) {
            return window.getComputedStyle(_element)[key];
        },
        attribute: function (attr) {
            return _element.getAttribute(attr);
        },
        tagName: function () {
            return _element.tagName;
        },
    };
    return fn(getObj, values);
}
class TextElement extends base_element_1.BaseElement {
    constructor(page, parentLocator, elementRootSelector, name, options) {
        super(page, parentLocator, elementRootSelector, name, options);
    }
    async get(getObj) {
        await this.waitVisible();
        return this.element.evaluate(getTextData, { getObj, getValues: evaluate_fn_1.getValues.toString() });
    }
}
exports.TextElement = TextElement;
//# sourceMappingURL=text.js.map