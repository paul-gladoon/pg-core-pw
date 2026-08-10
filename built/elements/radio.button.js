"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioButtonElement = void 0;
exports.getRadioButtonData = getRadioButtonData;
const evaluate_fn_1 = require("../utils/evaluate.fn");
const base_element_1 = require("../base.element");
function getRadioButtonData(_element, { getObj, getValues }) {
    const fn = new Function(`return ${getValues}`)();
    const values = {
        checked: function () {
            return _element.checked;
        },
        text: function () {
            return _element.parentElement.querySelector('label').innerText.trim();
        },
    };
    return fn(getObj, values);
}
class RadioButtonElement extends base_element_1.BaseElement {
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
        throw new Error(`${this.name} is radio button, radio button does not have click, please use sendKeys.`);
    }
    async get(getObj) {
        const label = this.init(base_element_1.BaseElement, ['..', 'label'], 'Label');
        await label.waitVisible();
        return this.element.evaluate(getRadioButtonData, { getObj, getValues: evaluate_fn_1.getValues.toString() });
    }
}
exports.RadioButtonElement = RadioButtonElement;
//# sourceMappingURL=radio.button.js.map