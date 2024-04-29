"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.step = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
var console_logger_1 = require("./console.logger");
function step(stepName) {
    return function actualDecorator(originalMethod, context) {
        function replacementMethod() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var message = stepName.call(this, this.name);
            return console_logger_1.consoleLogger.apply(void 0, __spreadArray([message, this, originalMethod.bind(this)], args, false));
        }
        return replacementMethod;
    };
}
exports.step = step;
