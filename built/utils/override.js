"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyOverride = exports.getOverrideName = void 0;
const overridableMethods = /^(getScreenshot|get|perform|sendKeys|isDisplay|isExist|waitForDataState|waitForDisplayedState)$/;
const getOverrideName = (method) => {
    const parsedOverrideName = method?.name?.match(overridableMethods);
    if (!parsedOverrideName) {
        throw new Error('You are trying to "override" a method that is not in the allowed list to "override"');
    }
    return parsedOverrideName[0];
};
exports.getOverrideName = getOverrideName;
const applyOverride = (target, method) => {
    const name = getOverrideName(method);
    target[`${name}Initial`] = target[name];
    target[name] = method.bind(target);
};
exports.applyOverride = applyOverride;
//# sourceMappingURL=override.js.map