"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImgElement = void 0;
exports.getImgData = getImgData;
const evaluate_fn_1 = require("../utils/evaluate.fn");
const base_element_1 = require("../base.element");
function getImgData(_element, { getObj, getValues }) {
    const fn = new Function(`return ${getValues}`)();
    const values = {
        attribute: function (attr) {
            return _element.getAttribute(attr);
        },
        tagName: function () {
            return _element.tagName;
        },
        size: function () {
            return {
                width: _element.getBoundingClientRect().width,
                height: _element.getBoundingClientRect().height,
            };
        },
        style: function (key) {
            return window.getComputedStyle(_element)[key];
        },
        currentSrc: function () {
            return _element.currentSrc;
        },
    };
    return fn(getObj, values);
}
class ImgElement extends base_element_1.BaseElement {
    constructor(page, parentLocator, elementRootSelector, name, options) {
        super(page, parentLocator, elementRootSelector, name, options);
    }
    async get(getObj) {
        await this.waitVisible();
        return this.element.evaluate(getImgData, { getObj, getValues: evaluate_fn_1.getValues.toString() });
    }
}
exports.ImgElement = ImgElement;
//# sourceMappingURL=image.js.map