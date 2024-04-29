"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValues = void 0;
function getValues(argsObject, values) {
    return Object.keys(argsObject).reduce(function (acc, key) {
        if (key === 'attribute' || key === 'style' || key === 'styleBefore') {
            argsObject[key] = Array.isArray(argsObject[key]) ? argsObject[key] : [argsObject[key]];
            acc[key] = argsObject[key].reduce(function (attrAcc, attrKey) {
                attrAcc[attrKey] = values[key](attrKey);
                return attrAcc;
            }, {});
            return acc;
        }
        acc[key] = values[key]();
        return acc;
    }, {});
}
exports.getValues = getValues;
