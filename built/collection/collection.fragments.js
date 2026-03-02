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
exports.CollectionFragments = void 0;
const waiter_1 = require("../utils/waiter");
const _n = __importStar(require("lodash"));
class CollectionFragments {
    constructor(page, parentLocator, fragmentsType, fragmentsRootSelector, name, options) {
        this.parentLocator = parentLocator;
        this.fragmentsRootSelector = fragmentsRootSelector;
        this.name = name;
        this.page = page;
        this.options = options;
        this.fragmentsType = fragmentsType;
    }
    get parentElement() {
        return this.parentLocator();
    }
    get preparedListFragments() {
        const { options, page, parentLocator, fragmentsRootSelector } = this;
        const rootLocator = options?.searchFromDOMRoot ? page() : parentLocator();
        return rootLocator.locator(fragmentsRootSelector, { ...options?.selectorOpts }).all();
    }
    async setCurrentFragments() {
        await waiter_1.waiter.waitForState(async () => (await this.preparedListFragments).length, {
            timeout: 10000,
            interval: 2000,
            dontThrow: true,
        });
        const _fragments = await this.preparedListFragments;
        this.fragments = _fragments.map((_fragment, i) => {
            return new this.fragmentsType(this.page.bind(this), this.parentLocator.bind(this), `${this.fragmentsRootSelector} >> nth=${i}`, `${this.name} with index: ${i}`, this.options);
        });
    }
    transformValues(data) {
        Object.keys(data).forEach((key) => {
            const value = data[key];
            if (typeof value === 'string' || typeof value === 'number') {
                data[key] = null;
            }
            else if (typeof value === 'object') {
                this.transformValues(value);
            }
        });
    }
    castValuesToBoolean(data) {
        Object.keys(data).forEach((key) => {
            const value = data[key];
            if (typeof value === 'string' || typeof value === 'number' || _n.isNull(value)) {
                data[key] = false;
            }
            else if (typeof value === 'object') {
                this.castValuesToBoolean(value);
            }
        });
    }
    async _index(index, methodName, data) {
        if (index >= this.fragments.length) {
            throw new Error(`The provided index: "${index}" is exceeds the number of fragments with name: "${this.name}", selector: "${this.fragmentsRootSelector}" and parent selector: "${this.parentElement['_selector']}".`);
        }
        return this.fragments[index][methodName](data);
    }
    async _where(providedData, methodName, data) {
        const originalData = JSON.parse(JSON.stringify(providedData));
        this.transformValues(providedData);
        for (const fragment of this.fragments) {
            const actualData = await fragment.get(providedData);
            if (_n.isEqual(actualData, originalData)) {
                return fragment[methodName](data);
            }
        }
        throw new Error(`None of the fragments contain the provided data: ${JSON.stringify(originalData)}. The fragments with name: "${this.name}", selector: "${this.fragmentsRootSelector}" and parent selector: "${this.parentElement['_selector']}".`);
    }
    async _all(methodName, data) {
        if (!this.fragments.length) {
            throw new Error(`There are no fragments with name: "${this.name}", selector: "${this.fragmentsRootSelector}" and parent selector: "${this.parentElement['_selector']}".`);
        }
        const tempArray = [];
        for (const fragment of this.fragments) {
            if (methodName === 'get' || methodName === 'isDisplay' || methodName === 'isExist') {
                tempArray.push(await fragment[methodName](data));
            }
            else {
                await fragment[methodName](data);
            }
        }
        return tempArray;
    }
    async click(dataObject) {
        await this.setCurrentFragments();
        const { _where, _index, ..._data } = dataObject;
        if (_n.isNumber(_index))
            await this._index(_index, 'click', _data);
        if (_where)
            await this._where(_where, 'click', _data);
    }
    async hover(dataObject) {
        await this.setCurrentFragments();
        const { _where, _index, ..._data } = dataObject;
        if (_n.isNumber(_index))
            await this._index(_index, 'hover', _data);
        if (_where)
            await this._where(_where, 'hover', _data);
    }
    async sendKeys(dataObject) {
        await this.setCurrentFragments();
        const { _where, _index, ..._data } = dataObject;
        if (_n.isNumber(_index))
            await this._index(_index, 'sendKeys', _data);
        if (_where)
            await this._where(_where, 'sendKeys', _data);
    }
    async get(dataObject) {
        await this.setCurrentFragments();
        if (!dataObject || _n.isEmpty(dataObject)) {
            throw new Error(`Please provide some strategy for "get" method`);
        }
        const { _index, _length, _where, ..._data } = dataObject;
        if (_n.isNumber(_index)) {
            return this._index(_index, 'get', _data);
        }
        if (_where) {
            return this._where(_where, 'get', _data);
        }
        if (_n.isNull(_length)) {
            return { _length: this.fragments.length };
        }
        if (!this.fragments.length) {
            return [];
        }
        if (!_where && !_n.isNull(_length) && !_n.isNumber(_index)) {
            return this._all('get', _data);
        }
    }
    async isDisplay(dataObject) {
        await this.setCurrentFragments();
        const { _index, _where, ..._data } = dataObject;
        if (_n.isNumber(_index)) {
            return this._index(_index, 'isDisplay', _data);
        }
        if (_where) {
            return this._where(_where, 'isDisplay', _data);
        }
        if (!this.fragments.length) {
            return [];
        }
        if (!_where && !_n.isNumber(_index)) {
            return this._all('isDisplay', _data);
        }
    }
    async isExist(dataObject) {
        await this.setCurrentFragments();
        const { _index, _where, ..._data } = dataObject;
        if (_n.isNumber(_index)) {
            return this._index(_index, 'isExist', _data);
        }
        if (_where) {
            return this._where(_where, 'isExist', _data);
        }
        if (!this.fragments.length) {
            return [];
        }
        if (!_where && !_n.isNumber(_index)) {
            return this._all('isExist', _data);
        }
    }
    async waitForDataState(dataObject, waitTime, dontThrowError) {
        await this.setCurrentFragments();
        if (!dataObject || _n.isEmpty(dataObject)) {
            throw new Error(`Please provide some strategy for "waitForDataState" method`);
        }
        const { _where, _index, _every, _some, _length } = dataObject;
        const arrResults = [];
        if (_n.isNumber(_length)) {
            return waiter_1.waiter.waitForState(async () => (await this.preparedListFragments).length === _length, {
                timeout: waitTime,
                dontThrow: dontThrowError,
            });
        }
        if (_n.isString(_length)) {
            const conditionCheck = new Function('length', `return length ${_length}`);
            return waiter_1.waiter.waitForState(async () => conditionCheck((await this.preparedListFragments).length), {
                timeout: waitTime,
                dontThrow: dontThrowError,
            });
        }
        if (!this.fragments.length) {
            return false;
        }
        if (_some) {
            for (const fragment of this.fragments) {
                const currentFragmentState = await fragment.waitForDataState(_where, waitTime, dontThrowError);
                arrResults.push(currentFragmentState);
                if (currentFragmentState)
                    break;
            }
            return arrResults.some((stateResult) => stateResult);
        }
        if (_every) {
            for (const fragment of this.fragments) {
                arrResults.push(await fragment.waitForDataState(_where, waitTime, dontThrowError));
            }
            return arrResults.every((stateResult) => stateResult);
        }
        if (_n.isNumber(_index)) {
            if (_index >= this.fragments.length) {
                throw new Error(`The provided index: "${_index}" is exceeds the number of fragments with name: "${this.name}", selector: "${this.fragmentsRootSelector}" and parent selector: "${this.parentElement['_selector']}".`);
            }
            return this.fragments[_index].waitForDataState(_where, waitTime, dontThrowError);
        }
    }
    async waitForDisplayedState(dataObject, waitTime, dontThrowError) {
        await this.setCurrentFragments();
        const { _state, _every, _index, _some, _where } = dataObject;
        const arrResults = [];
        if (!this.fragments.length) {
            return false;
        }
        if (_where) {
            for (const fragment of this.fragments) {
                const currentFragmentState = await fragment.waitForDataState(_where, waitTime, dontThrowError);
                if (currentFragmentState) {
                    const fragmentDisplayedState = await fragment.waitForDisplayedState(_state, waitTime, dontThrowError);
                    arrResults.push(fragmentDisplayedState);
                    break;
                }
                else {
                    continue;
                }
            }
            return arrResults.some((stateResult) => stateResult);
        }
        if (_some) {
            for (const fragment of this.fragments) {
                const currentFragmentState = await fragment.waitForDisplayedState(_state, waitTime, dontThrowError);
                arrResults.push(currentFragmentState);
                if (currentFragmentState)
                    break;
            }
            return arrResults.some((stateResult) => stateResult);
        }
        if (_every || (_n.isUndefined(_every) && _n.isUndefined(_some) && _n.isUndefined(_index))) {
            for (const fragment of this.fragments) {
                arrResults.push(await fragment.waitForDisplayedState(_state, waitTime, dontThrowError));
            }
            return arrResults.every((stateResult) => stateResult);
        }
        if (_n.isNumber(_index)) {
            if (_index >= this.fragments.length) {
                throw new Error(`The provided index: "${_index}" is exceeds the number of fragments with name: "${this.name}", selector: "${this.fragmentsRootSelector}" and parent selector: "${this.parentElement['_selector']}".`);
            }
            return this.fragments[_index].waitForDisplayedState(_state, waitTime, dontThrowError);
        }
    }
}
exports.CollectionFragments = CollectionFragments;
//# sourceMappingURL=collection.fragments.js.map