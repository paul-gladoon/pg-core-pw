"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlainObject = void 0;
var isPlainObject = function (arg) { return Object.prototype.toString.call(arg) === '[object Object]'; };
exports.isPlainObject = isPlainObject;
