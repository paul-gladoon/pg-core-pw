"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRootElement = void 0;
const base_element_1 = require("./base.element");
class BaseRootElement extends base_element_1.BaseElement {
    constructor(page, parentLocator, elementRootSelector, name, options) {
        super(page, parentLocator, elementRootSelector, name, options);
    }
    get element() {
        return this.parentLocator();
    }
}
exports.BaseRootElement = BaseRootElement;
//# sourceMappingURL=base.root.element.js.map