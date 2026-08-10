"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckBoxElement = void 0;
exports.getCheckBoxData = getCheckBoxData;
const evaluate_fn_1 = require("../utils/evaluate.fn");
const base_element_1 = require("../base.element");
function getCheckBoxData(_element, { getObj, getValues }) {
    const fn = new Function(`return ${getValues}`)();
    const values = {
        checked: function () {
            return _element.checked;
        },
        isDisabled: function () {
            return _element.disabled;
        },
    };
    return fn(getObj, values);
}
class CheckBoxElement extends base_element_1.BaseElement {
    constructor(page, parentLocator, elementRootSelector, name, options) {
        super(page, parentLocator, elementRootSelector, name, options);
    }
    async sendKeys(checkObj) {
        typeof checkObj === 'boolean'
            ? await this.element.setChecked(checkObj)
            : await this.element.setChecked(checkObj.state, { ...checkObj.opts });
    }
    async perform(action) {
        return super.perform(action);
    }
    async click() {
        throw new Error(`${this.name} is checkbox, checkbox does not have click, please use sendKeys for changing state.`);
    }
    async get(getObj) {
        const label = this.init(base_element_1.BaseElement, ['..', 'label'], 'Label');
        await label.waitVisible();
        return this.element.evaluate(getCheckBoxData, { getObj, getValues: evaluate_fn_1.getValues.toString() });
    }
}
exports.CheckBoxElement = CheckBoxElement;
//# sourceMappingURL=checkbox.js.map