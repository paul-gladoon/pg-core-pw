"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionElements = void 0;
const waiter_1 = require("../utils/waiter");
const base_element_1 = require("../base.element");
const _n = __importStar(require("lodash"));
class CollectionElements {
    constructor(page, parentLocator, elementsType, elementsRootSelector, name, options) {
        this.parentLocator = parentLocator;
        this.elementsRootSelector = elementsRootSelector;
        this.name = name;
        this.page = page;
        this.options = options;
        this.elementsType = elementsType;
    }
    get parentElement() {
        return this.parentLocator();
    }
    get preparedListElements() {
        const { options, page, parentLocator, elementsRootSelector } = this;
        const rootLocator = options?.searchFromDOMRoot ? page() : parentLocator();
        return rootLocator.locator(elementsRootSelector, { ...options?.selectorOpts }).all();
    }
    async setCurrentElements() {
        await waiter_1.waiter.waitForState(async () => (await this.preparedListElements).length, {
            timeout: 10000,
            interval: 2000,
            dontThrow: true,
        });
        const _elements = await this.preparedListElements;
        this.elements = _elements.map((_element, i) => {
            return new this.elementsType(this.page.bind(this), this.parentLocator.bind(this), `${this.elementsRootSelector} >> nth=${i}`, `${this.name} with index: ${i}`, this.options);
        });
    }
    transformValues(data) {
        Object.keys(data).forEach((key) => {
            const value = data[key];
            if (base_element_1.arrayValuesKeys.includes(key) && typeof value === 'object') {
                Object.keys(value).forEach((subKey) => {
                    data[key] = subKey;
                });
                return;
            }
            if (typeof value === 'string' || typeof value === 'number') {
                data[key] = null;
            }
            else if (typeof value === 'object') {
                this.transformValues(value);
            }
        });
    }
    async _all(methodName, action = null) {
        if (!this.elements.length) {
            throw new Error(`There are no elements with name: "${this.name}", selector: "${this.elementsRootSelector}" and parent selector: "${this.parentElement['_selector']}".`);
        }
        const tempArray = [];
        for (const element of this.elements) {
            if (methodName === 'get' || methodName === 'isDisplay' || methodName === 'isExist') {
                tempArray.push(await element[methodName](action));
            }
            else {
                await element[methodName](action);
            }
        }
        return tempArray;
    }
    async _index(index, methodName, action = null) {
        if (index >= this.elements.length) {
            throw new Error(`The provided index: "${index}" is exceeds the number of elements with name: "${this.name}", selector: "${this.elementsRootSelector}" and parent selector: "${this.parentElement['_selector']}".`);
        }
        return this.elements[index][methodName](action);
    }
    async _where(providedData, methodName, action = null) {
        const originalData = JSON.parse(JSON.stringify(providedData));
        this.transformValues(providedData);
        for (const element of this.elements) {
            const actualData = await element.get(providedData);
            if (_n.isEqual(actualData, originalData)) {
                return element[methodName](action);
            }
        }
        throw new Error(`None of the elements contain the provided data: ${JSON.stringify(originalData)}. The elements with name: "${this.name}", selector: "${this.elementsRootSelector}" and parent selector: "${this.parentElement['_selector']}".`);
    }
    async click(dataObject) {
        await this.setCurrentElements();
        const { _action, _index, _where } = dataObject;
        if (_n.isNumber(_index))
            await this._index(_index, 'click', _action);
        if (_where)
            await this._where(_where, 'click', _action);
        if (!_where && !_n.isNumber(_index))
            await this._all('click', _action);
    }
    async hover(dataObject) {
        await this.setCurrentElements();
        const { _action, _index, _where } = dataObject;
        if (_n.isNumber(_index))
            await this._index(_index, 'hover', _action);
        if (_where)
            await this._where(_where, 'hover', _action);
        if (!_where && !_n.isNumber(_index))
            await this._all('hover', _action);
    }
    async waitForDataState(dataObject, waitTime, dontThrowError) {
        await this.setCurrentElements();
        if (!dataObject || _n.isEmpty(dataObject)) {
            throw new Error(`Please provide some strategy for "waitForDataState" method`);
        }
        const { _where, _index, _every, _some, _includes, _length } = dataObject;
        const arrResults = [];
        if (!this.elements.length) {
            return false;
        }
        if (_some) {
            for (const element of this.elements) {
                const currentElementState = await element.waitForDataState({ _where, _includes }, waitTime, dontThrowError);
                arrResults.push(currentElementState);
                if (currentElementState)
                    break;
            }
            return arrResults.some((stateResult) => stateResult);
        }
        if (_every) {
            for (const element of this.elements) {
                arrResults.push(await element.waitForDataState({ _where, _includes }, waitTime, dontThrowError));
            }
            return arrResults.every((stateResult) => stateResult);
        }
        if (_n.isNumber(_index)) {
            if (_index >= this.elements.length) {
                throw new Error(`The provided index: "${_index}" is exceeds the number of elements with name: "${this.name}", selector: "${this.elementsRootSelector}" and parent selector: "${this.parentElement['_selector']}".`);
            }
            return this.elements[_index].waitForDataState({ _where, _includes }, waitTime, dontThrowError);
        }
        if (_n.isNumber(_length)) {
            return this.elements.length === _length;
        }
        if (_n.isString(_length)) {
            const conditionCheck = new Function('length', `return length ${_length}`);
            return conditionCheck(this.elements.length);
        }
    }
    async waitForDisplayedState(dataObject, waitTime, dontThrowError) {
        await this.setCurrentElements();
        const { _state, _every, _index, _some, _where } = dataObject;
        const arrResults = [];
        if (!this.elements.length) {
            return false;
        }
        if (_where) {
            for (const element of this.elements) {
                const currentElementState = await element.waitForDataState({ _where }, waitTime, dontThrowError);
                if (currentElementState) {
                    const elementDisplayedState = await element.waitForDisplayedState(_state, waitTime, dontThrowError);
                    arrResults.push(elementDisplayedState);
                    break;
                }
                else {
                    continue;
                }
            }
            return arrResults.some((stateResult) => stateResult);
        }
        if (_some) {
            for (const element of this.elements) {
                const currentElementState = await element.waitForDisplayedState(_state, waitTime, dontThrowError);
                arrResults.push(currentElementState);
                if (currentElementState)
                    break;
            }
            return arrResults.some((stateResult) => stateResult);
        }
        if (_every || (_n.isUndefined(_every) && _n.isUndefined(_some) && _n.isUndefined(_index))) {
            for (const element of this.elements) {
                arrResults.push(await element.waitForDisplayedState(_state, waitTime, dontThrowError));
            }
            return arrResults.every((stateResult) => stateResult);
        }
        if (_n.isNumber(_index)) {
            if (_index >= this.elements.length) {
                throw new Error(`The provided index: "${_index}" is exceeds the number of elements with name: "${this.name}", selector: "${this.elementsRootSelector}" and parent selector: "${this.parentElement['_selector']}".`);
            }
            return this.elements[_index].waitForDisplayedState(_state, waitTime, dontThrowError);
        }
    }
    async get(dataObject) {
        await this.setCurrentElements();
        if (!dataObject || _n.isEmpty(dataObject)) {
            throw new Error(`Please provide some strategy for "get" method`);
        }
        const { _action, _index, _length, _where } = dataObject;
        if (_n.isNumber(_index)) {
            return this._index(_index, 'get', _action);
        }
        if (_where) {
            return this._where(_where, 'get', _action);
        }
        if (_n.isNull(_length)) {
            return { _length: this.elements.length };
        }
        if (!this.elements.length) {
            return [];
        }
        if (!_where && !_n.isNull(_length) && !_n.isNumber(_index)) {
            return this._all('get', _action);
        }
    }
    async sendKeys(dataObject) {
        await this.setCurrentElements();
        const { _action, _index, _where } = dataObject;
        if (_n.isNumber(_index))
            await this._index(_index, 'sendKeys', _action);
        if (_where)
            await this._where(_where, 'sendKeys', _action);
        if (!_where && !_n.isNumber(_index))
            await this._all('sendKeys', _action);
    }
    async isDisplay(dataObject) {
        await this.setCurrentElements();
        const { _action, _index, _where } = dataObject;
        if (_n.isNumber(_index)) {
            return this._index(_index, 'isDisplay', _action);
        }
        if (_where) {
            return this._where(_where, 'isDisplay', _action);
        }
        if (!this.elements.length) {
            return [];
        }
        if (!_where && !_n.isNumber(_index)) {
            return this._all('isDisplay', _action);
        }
    }
    async isExist(dataObject) {
        await this.setCurrentElements();
        const { _action, _index, _where } = dataObject;
        if (_n.isNumber(_index)) {
            return this._index(_index, 'isExist', _action);
        }
        if (_where) {
            return this._where(_where, 'isExist', _action);
        }
        if (!this.elements.length) {
            return [];
        }
        if (!_where && !_n.isNumber(_index)) {
            return this._all('isExist', _action);
        }
    }
}
exports.CollectionElements = CollectionElements;
//# sourceMappingURL=collection.elements.js.map