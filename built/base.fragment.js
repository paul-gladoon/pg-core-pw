"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseFragment = void 0;
const helpers_1 = require("./utils/helpers");
const perform_1 = require("./utils/perform");
const waiter_1 = require("./utils/waiter");
const base_root_element_1 = require("./base.root.element");
class BaseFragment {
    constructor(page, parentLocator, fragmentRootSelector, name, options) {
        this.page = page;
        this.parentLocator = parentLocator;
        this.fragmentRootSelector = fragmentRootSelector;
        this.name = name;
        this.options = options;
        this._root = this.init(base_root_element_1.BaseRootElement, fragmentRootSelector, `_root fragment ${this.name} element`);
    }
    isOnlyRootProp(data) {
        return '_root' in data && Object.keys(data).length === 1;
    }
    element() {
        const { options, page, parentLocator, fragmentRootSelector } = this;
        const rootLocator = options?.searchFromDOMRoot ? page() : parentLocator();
        const addLocatorOpts = (_rootLocator, selector, _opts) => {
            const { locatorOpts } = _opts;
            return typeof locatorOpts === 'string'
                ? _rootLocator.locator(selector, { ..._opts?.selectorOpts })[locatorOpts]()
                : _rootLocator.locator(selector, { ..._opts?.selectorOpts }).nth(locatorOpts.nth);
        };
        if (Array.isArray(fragmentRootSelector)) {
            return fragmentRootSelector.reduce((chainLocator, selectorData) => {
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
            return addLocatorOpts(rootLocator, fragmentRootSelector, options);
        }
        return rootLocator.locator(fragmentRootSelector, { ...options?.selectorOpts });
    }
    get parentElement() {
        return this.parentLocator();
    }
    set override(method) {
        const methodsWhatCanBeOverridden = /^get|perform|sendKeys|isDisplay/;
        const { name } = method;
        const parsedOverrideName = name.match(methodsWhatCanBeOverridden);
        if (!parsedOverrideName) {
            throw new Error('You are trying to "override" a method that is not in the allowed list to "override"');
        }
        this[`${parsedOverrideName[0]}Initial`] = this[parsedOverrideName[0]];
        this[parsedOverrideName[0]] = method.bind(this);
    }
    async perform(performObj) {
        if (!(0, helpers_1.isPlainObject)(performObj)) {
            throw new Error(`${this.name} perform argument should be an object`);
        }
        const verbs = [...(0, perform_1.collectPerformVerbs)(performObj)];
        verbs.length && verbs.every((verb) => verb === 'hover') ? await this.waitExist() : await this.waitVisible();
        for (const key of Object.keys(performObj)) {
            if (!this[key]) {
                throw new Error(`${this.name} does not have ${key} property`);
            }
            await this[key].perform(performObj[key]);
        }
    }
    async getScreenshot(getScreen) {
        if (!(0, helpers_1.isPlainObject)(getScreen)) {
            throw new Error(`${this.name} getScreenshot argument should be an object`);
        }
        await this.waitVisible();
        for (const key of Object.keys(getScreen)) {
            if (!this[key]) {
                throw new Error(`${this.name} does not have ${key} property`);
            }
            await this[key].getScreenshot(getScreen[key]);
        }
    }
    async get(getObj) {
        if (!(0, helpers_1.isPlainObject)(getObj)) {
            throw new Error(`${this.name} get argument should be an object`);
        }
        await this.waitVisible();
        const tempGet = { ...getObj };
        for (const key of Object.keys(tempGet)) {
            if (!this[key]) {
                throw new Error(`${this.name} does not have ${key} property`);
            }
            tempGet[key] = await this[key].get(tempGet[key]);
        }
        return tempGet;
    }
    async isDisplay(isDispObj) {
        if (!(0, helpers_1.isPlainObject)(isDispObj)) {
            throw new Error(`${this.name} isDisplay argument should be an object`);
        }
        if (this.isOnlyRootProp(isDispObj)) {
            return { _root: await this._root.isDisplay() };
        }
        await this.waitExist();
        const tempGet = { ...isDispObj };
        for (const key of Object.keys(tempGet)) {
            if (!this[key]) {
                throw new Error(`${this.name} does not have ${key} property`);
            }
            tempGet[key] = await this[key].isDisplay(tempGet[key]);
        }
        return tempGet;
    }
    async waitForDataState(dataState, waitTime, dontThrowError) {
        if (!(0, helpers_1.isPlainObject)(dataState)) {
            throw new Error(`${this.name} waitForDataState argument should be an object`);
        }
        await this.waitVisible();
        const tempListOfStatesResult = [];
        for (const key of Object.keys(dataState)) {
            if (!this[key]) {
                throw new Error(`${this.name} does not have ${key} property`);
            }
            tempListOfStatesResult.push(await this[key].waitForDataState(dataState[key], waitTime, dontThrowError));
        }
        return tempListOfStatesResult.every((stateResult) => stateResult);
    }
    async waitForDisplayedState(dataState, waitTime, dontThrowError) {
        if (!(0, helpers_1.isPlainObject)(dataState)) {
            throw new Error(`${this.name} waitForDisplayedState argument should be an object`);
        }
        if (this.isOnlyRootProp(dataState)) {
            return this._root.waitForDisplayedState(dataState['_root'], waitTime, dontThrowError);
        }
        await this.waitExist();
        const tempListOfStatesResult = [];
        for (const key of Object.keys(dataState)) {
            if (!this[key]) {
                throw new Error(`${this.name} does not have ${key} property`);
            }
            tempListOfStatesResult.push(await this[key].waitForDisplayedState(dataState[key], waitTime, dontThrowError));
        }
        return tempListOfStatesResult.every((stateResult) => stateResult);
    }
    async sendKeys(sendObj) {
        if (!(0, helpers_1.isPlainObject)(sendObj)) {
            throw new Error(`${this.name} sendKeys argument should be an object`);
        }
        await this.waitVisible();
        for (const key of Object.keys(sendObj)) {
            if (!this[key]) {
                throw new Error(`${this.name} does not have ${key} property`);
            }
            await this[key].sendKeys(sendObj[key]);
        }
    }
    async isExist(isExistObj) {
        if (!(0, helpers_1.isPlainObject)(isExistObj)) {
            throw new Error(`${this.name} isExist argument should be an object`);
        }
        if (this.isOnlyRootProp(isExistObj)) {
            return { _root: await this._root.isExist() };
        }
        await this.waitExist();
        const tempGet = { ...isExistObj };
        for (const key of Object.keys(tempGet)) {
            if (!this[key]) {
                throw new Error(`${this.name} does not have ${key} property`);
            }
            tempGet[key] = await this[key].isExist(tempGet[key]);
        }
        return tempGet;
    }
    isFrameLocator() {
        return 'owner' in this.element();
    }
    async waitVisible() {
        if (!this.isFrameLocator()) {
            await waiter_1.waiter.waitFor(this.element(), this.name);
        }
    }
    async waitExist() {
        if (!this.isFrameLocator()) {
            await waiter_1.waiter.waitFor(this.element(), this.name, { state: 'attached' });
        }
    }
    async getParentNode(_locator) {
        return _locator.locator('xpath=..');
    }
    init(ClassName, rootSelector, name, options) {
        return new ClassName(this.page.bind(this), this.element.bind(this), rootSelector, name, options);
    }
    initCollection(ClassName, collectionType, rootSelector, name, options) {
        return new ClassName(this.page.bind(this), this.element.bind(this), collectionType, rootSelector, name, options);
    }
}
exports.BaseFragment = BaseFragment;
//# sourceMappingURL=base.fragment.js.map