"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputElement = void 0;
exports.getInputData = getInputData;
const base_element_1 = require("../base.element");
const evaluate_fn_1 = require("../utils/evaluate.fn");
const keys_1 = require("../utils/keys");
function getInputData(_element, { getObj, getValues }) {
    const fn = new Function(`return ${getValues}`)();
    const values = {
        value: function () {
            return _element.value.trim();
        },
        attribute: function (attr) {
            return _element.getAttribute(attr);
        },
        isDisabled: function () {
            return _element.disabled;
        },
        tagName: function () {
            return _element.tagName;
        },
        style: function (key) {
            return window.getComputedStyle(_element)[key];
        },
    };
    return fn(getObj, values);
}
class InputElement extends base_element_1.BaseElement {
    constructor(page, parentLocator, elementRootSelector, name, options) {
        super(page, parentLocator, elementRootSelector, name, options);
    }
    async sendKeys(sendObj) {
        const fill = async (_value, options) => {
            const methodName = options?.keysOneByOne && typeof options?.keysOneByOne === 'boolean' ? 'pressSequentially' : 'fill';
            const withEnter = _value.includes(keys_1.Keys.ENTER);
            await this.element[methodName](_value.replace(keys_1.Keys.ENTER, ''), { ...options?.fillOpts });
            if (withEnter) {
                await this.element.press(keys_1.Keys.ENTER, { ...options?.pressOpts });
            }
        };
        typeof sendObj === 'string' ? await fill(sendObj) : await fill(sendObj.value, sendObj.opts);
    }
    async get(getObj) {
        await this.waitVisible();
        return this.element.evaluate(getInputData, { getObj, getValues: evaluate_fn_1.getValues.toString() });
    }
}
exports.InputElement = InputElement;
//# sourceMappingURL=input.js.map