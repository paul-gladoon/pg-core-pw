"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getButtonData = exports.ButtonElement = void 0;
const evaluate_fn_1 = require("../utils/evaluate.fn");
const base_element_1 = require("../base.element");
const getButtonData = (_element, { getObj, getValues }) => {
    const fn = new Function(`return ${getValues}`)();
    const values = {
        isDisabled: function () {
            return _element.disabled;
        },
        color: function () {
            return window.getComputedStyle(_element).color;
        },
        text: function () {
            return _element.innerText.trim();
        },
        style: function (key) {
            return window.getComputedStyle(_element)[key];
        },
        attribute: function (attr) {
            return _element.getAttribute(attr);
        },
    };
    return fn(getObj, values);
};
exports.getButtonData = getButtonData;
class ButtonElement extends base_element_1.BaseElement {
    constructor(page, parentLocator, elementRootSelector, name, options) {
        super(page, parentLocator, elementRootSelector, name, options);
    }
    async sendKeys() {
        throw new Error(`${this.name} is button, button does not have sendKeys`);
    }
    async get(getObj) {
        await this.waitVisible();
        return this.element.evaluate(getButtonData, { getObj, getValues: evaluate_fn_1.getValues.toString() });
    }
}
exports.ButtonElement = ButtonElement;
//# sourceMappingURL=button.js.map