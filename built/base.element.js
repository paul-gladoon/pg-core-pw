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
exports.arrayValuesKeys = exports.BaseElement = void 0;
const evaluate_fn_1 = require("./utils/evaluate.fn");
const waiter_1 = require("./utils/waiter");
const _n = __importStar(require("lodash"));
const arrayNullKeys = [
    'text',
    'color',
    'tagName',
    'boundingClientRect',
    'childrenTags',
    'checked',
    'isDisabled',
    'size',
    'currentSrc',
    'value',
    'href',
    'selected',
];
const arrayValuesKeys = ['attribute', 'style', 'styleBefore'];
exports.arrayValuesKeys = arrayValuesKeys;
class BaseElement {
    constructor(page, parentLocator, elementRootSelector, name, options) {
        this.parentLocator = parentLocator;
        this.elementRootSelector = elementRootSelector;
        this.name = name;
        this.page = page;
        this.options = options;
    }
    get element() {
        const { options, page, parentLocator, elementRootSelector } = this;
        const rootLocator = options?.searchFromDOMRoot ? page() : parentLocator();
        const addLocatorOpts = (_rootLocator, selector, _opts) => {
            const { locatorOpts } = _opts;
            return typeof locatorOpts === 'string'
                ? _rootLocator.locator(selector, { ..._opts?.selectorOpts })[locatorOpts]()
                : _rootLocator.locator(selector, { ..._opts?.selectorOpts }).nth(locatorOpts.nth);
        };
        if (Array.isArray(elementRootSelector)) {
            return elementRootSelector.reduce((chainLocator, selectorData) => {
                if (typeof selectorData === 'object' && selectorData.opts.locatorOpts) {
                    chainLocator = chainLocator
                        ? addLocatorOpts(chainLocator, selectorData.selector, selectorData.opts)
                        : addLocatorOpts(rootLocator, selectorData.selector, selectorData.opts);
                }
                else if (typeof selectorData === 'object' && !selectorData.opts.locatorOpts) {
                    chainLocator = chainLocator
                        ? chainLocator.locator(selectorData.selector, { ...selectorData.opts.selectorOpts })
                        : rootLocator.locator(selectorData.selector, { ...selectorData.opts.selectorOpts });
                }
                else if (typeof selectorData === 'string') {
                    chainLocator = chainLocator ? chainLocator.locator(selectorData) : rootLocator.locator(selectorData);
                }
                return chainLocator;
            }, null);
        }
        if (options?.locatorOpts) {
            return addLocatorOpts(rootLocator, elementRootSelector, options);
        }
        return rootLocator.locator(elementRootSelector, { ...options?.selectorOpts });
    }
    set element(locator) {
        this.element = locator;
    }
    parentElement() {
        return this.parentLocator();
    }
    set override(method) {
        const methodsWhatCanBeOverridden = /^(getScreenshot|get|perform|sendKeys|isDisplay|isExist|waitForDataState|waitForDisplayedState)$/;
        const { name } = method;
        const parsedOverrideName = name.match(methodsWhatCanBeOverridden);
        if (!parsedOverrideName) {
            throw new Error('You are trying to "override" a method that is not in the allowed list to "override"');
        }
        this[`${parsedOverrideName[0]}Initial`] = this[parsedOverrideName[0]];
        this[parsedOverrideName[0]] = method.bind(this);
    }
    async perform(action) {
        const verb = typeof action === 'string' ? action : action?._action;
        if (verb !== 'click' && verb !== 'hover' && verb !== 'scroll') {
            throw new Error(`${this.name} perform received invalid action "${JSON.stringify(action)}", ` +
                `use 'click' | 'hover' | 'scroll' or {_action: <verb>, ...options}`);
        }
        const options = typeof action === 'string' ? undefined : _n.omit(action, '_action');
        if (verb === 'click') {
            await this.click(options);
        }
        if (verb === 'hover') {
            await this.hover(options);
        }
        if (verb === 'scroll') {
            await this.scroll(options);
        }
    }
    async click(options) {
        await this.element.click(options);
    }
    async getScreenshot({ filePath, viewOptions }) {
        await this.element.screenshot({ path: filePath, ...viewOptions });
    }
    async get(getObj) {
        await this.waitVisible();
        return this.element.evaluate((_element, { getObj, getValues }) => {
            const fn = new Function(`return ${getValues}`)();
            const values = {
                isDisabled: function () {
                    return _element.disabled;
                },
                attribute: function (attr) {
                    return _element.getAttribute(attr);
                },
                color: function () {
                    return window.getComputedStyle(_element).color;
                },
                tagName: function () {
                    return _element.tagName;
                },
                text: function () {
                    return _element.innerText.trim();
                },
                style: function (key) {
                    return window.getComputedStyle(_element)[key];
                },
                styleBefore: function (key) {
                    return window.getComputedStyle(_element, ':before')[key];
                },
                boundingClientRect: function () {
                    return _element.getBoundingClientRect();
                },
                childrenTags: function () {
                    const childrenList = _element.children;
                    return Array.prototype.map.call(childrenList, function (ch) {
                        return ch.tagName;
                    });
                },
            };
            return fn(getObj, values);
        }, { getObj, getValues: evaluate_fn_1.getValues.toString() });
    }
    async isDisplay() {
        return this.element.isVisible();
    }
    async waitForDisplayedState(_state, waitTime, dontThrowError) {
        return waiter_1.waiter.waitForState(async () => {
            const isDisplayResult = await this.isDisplay();
            return _n.isEqual(isDisplayResult, _state);
        }, {
            message: `Wait for displayed state on "${this.name}" element is failed, element with selector: "${this.element.toString()}"`,
            timeout: waitTime,
            interval: 1000,
            dontThrow: dontThrowError,
        });
    }
    async waitForDataState({ _where, _includes }, waitTime, dontThrowError) {
        const tempObj = {};
        for (const key of Object.keys(_where)) {
            if (arrayNullKeys.includes(key)) {
                tempObj[key] = null;
            }
            if (arrayValuesKeys.includes(key)) {
                tempObj[key] = Object.keys(_where[key]);
            }
        }
        return waiter_1.waiter.waitForState(async () => {
            const getResult = await this.get(tempObj);
            if (_n.isBoolean(_includes)) {
                const expectedValuesList = Object.values(_where);
                const resultValuesList = Object.values(getResult);
                return resultValuesList.every((itemValue, index) => {
                    if (_n.isObject(itemValue)) {
                        return Object.keys(itemValue).every((key) => {
                            return _includes
                                ? itemValue[key].includes(expectedValuesList[index][key])
                                : !itemValue[key].includes(expectedValuesList[index][key]);
                        });
                    }
                    return _includes ? itemValue.includes(expectedValuesList[index]) : !itemValue.includes(expectedValuesList[index]);
                });
            }
            return _n.isEqual(getResult, _where);
        }, {
            message: `Wait for data state on "${this.name}" element is failed, for data: "${JSON.stringify(_where)}"`,
            timeout: waitTime,
            interval: 1000,
            dontThrow: dontThrowError,
        });
    }
    async hover(options) {
        const _options = typeof options?.force === 'boolean' ? options : { force: true, ...options };
        _options?.waitVisibilityBeforeHover ? await this.waitVisible() : await this.waitExist();
        await this.element.hover(_options);
    }
    async scroll(options) {
        await this.element.scrollIntoViewIfNeeded(options);
    }
    async isExist() {
        return !!(await this.element.count());
    }
    async waitVisible() {
        await waiter_1.waiter.waitFor(this.element, this.name);
    }
    async waitExist() {
        await waiter_1.waiter.waitFor(this.element, this.name, { state: 'attached' });
    }
    async waitNotVisible() {
        await waiter_1.waiter.waitFor(this.element, this.name, { state: 'hidden' });
    }
    async getParentNode(_locator) {
        return _locator.locator('xpath=..');
    }
    init(ClassName, rootSelector, name, options) {
        return new ClassName(this.page.bind(this), this.parentLocator.bind(this), rootSelector, name, options);
    }
}
exports.BaseElement = BaseElement;
//# sourceMappingURL=base.element.js.map