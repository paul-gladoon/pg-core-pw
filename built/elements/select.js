"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectElement = void 0;
exports.getSelectedData = getSelectedData;
const evaluate_fn_1 = require("../utils/evaluate.fn");
const base_element_1 = require("../base.element");
function getSelectedData(_element, { getObj, getValues }) {
    const fn = new Function(`return ${getValues}`)();
    const values = {
        selected: function () {
            return _element.value.trim();
        },
        attribute: function (attr) {
            return _element.getAttribute(attr);
        },
        isDisabled: function () {
            return _element.disabled;
        },
    };
    return fn(getObj, values);
}
class SelectElement extends base_element_1.BaseElement {
    constructor(page, parentLocator, elementRootSelector, name, options) {
        super(page, parentLocator, elementRootSelector, name, options);
    }
    async sendKeys(sendObj) {
        if (typeof sendObj === 'string' || Array.isArray(sendObj)) {
            await this.element.selectOption(sendObj);
        }
        else {
            const { value, label, index, opts } = sendObj;
            const select = { value, label, index };
            await this.element.selectOption(select, opts);
        }
    }
    async get(getObj) {
        await this.waitVisible();
        return this.element.evaluate(getSelectedData, { getObj, getValues: evaluate_fn_1.getValues.toString() });
    }
    async click() {
        throw new Error(`${this.name} is select, select does not have click, please use sendKeys for select option.`);
    }
}
exports.SelectElement = SelectElement;
//# sourceMappingURL=select.js.map