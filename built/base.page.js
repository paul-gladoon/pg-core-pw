"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
const helpers_1 = require("./utils/helpers");
const waiter_1 = require("./utils/waiter");
const browser_actioner_1 = require("./browser/browser.actioner");
const browser_consoler_1 = require("./browser/browser.consoler");
const browser_tabber_1 = require("./browser/browser.tabber");
const base_root_element_1 = require("./base.root.element");
const browser_downloader_1 = require("./browser/browser.downloader");
class BasePage {
    constructor(browserContext, page, pageRootSelector, name) {
        this.browserContext = browserContext;
        this.page = page;
        this.name = name;
        this.pageRootSelector = pageRootSelector;
        this._actioner = new browser_actioner_1.BrowserActioner(this.getPage.bind(this));
        this._consoler = new browser_consoler_1.BrowserConsoler(this.getPage.bind(this));
        this._downloader = new browser_downloader_1.BrowserDownloader(this.getPage.bind(this));
        this._tabber = new browser_tabber_1.BrowserTabber(browserContext, this.setPage.bind(this), this.getPage.bind(this));
        this._root = this.init(base_root_element_1.BaseRootElement, pageRootSelector, `_root ${this.name} element`);
    }
    element() {
        return this.getPage().locator(this.pageRootSelector);
    }
    setPage(page) {
        this.page = page;
    }
    getPage() {
        return this.page;
    }
    get _page() {
        return this.page;
    }
    async waitForPageToBeReady() {
        await this.page.waitForLoadState();
        await this.waitVisible();
    }
    async perform(performObj) {
        if (!(0, helpers_1.isPlainObject)(performObj)) {
            throw new Error(`${this.name} perform argument should be an object`);
        }
        await this.waitForPageToBeReady();
        for (const key of Object.keys(performObj)) {
            if (!this[key]) {
                throw new Error(`${this.name} does not have ${key} property`);
            }
            await this[key].perform(performObj[key]);
        }
    }
    async get(getObj) {
        if (!(0, helpers_1.isPlainObject)(getObj)) {
            throw new Error(`${this.name} get argument should be an object`);
        }
        await this.waitForPageToBeReady();
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
        await this.waitForPageToBeReady();
        const tempGet = { ...isDispObj };
        for (const key of Object.keys(tempGet)) {
            if (!this[key]) {
                throw new Error(`${this.name} does not have ${key} property`);
            }
            tempGet[key] = await this[key].isDisplay(tempGet[key]);
        }
        return tempGet;
    }
    async isExist(isExistObj) {
        if (!(0, helpers_1.isPlainObject)(isExistObj)) {
            throw new Error(`${this.name} isExist argument should be an object`);
        }
        await this.waitForPageToBeReady();
        const tempGet = { ...isExistObj };
        for (const key of Object.keys(tempGet)) {
            if (!this[key]) {
                throw new Error(`${this.name} does not have ${key} property`);
            }
            tempGet[key] = await this[key].isExist(tempGet[key]);
        }
        return tempGet;
    }
    async getScreenshot(scrObject) {
        if (!scrObject) {
            throw new Error(`${this.name} get screenshot argument should be an object`);
        }
        await this.waitForPageToBeReady();
        for (const key of Object.keys(scrObject)) {
            if (!this[key]) {
                throw new Error(`${this.name} does not have ${key} property`);
            }
            await this[key].getScreenshot(scrObject[key]);
        }
    }
    async sendKeys(sendObj) {
        if (!(0, helpers_1.isPlainObject)(sendObj)) {
            throw new Error(`${this.name} sendKeys argument should be an object`);
        }
        await this.waitForPageToBeReady();
        for (const key of Object.keys(sendObj)) {
            if (!this[key]) {
                throw new Error(`${this.name} does not have ${key} property`);
            }
            await this[key].sendKeys(sendObj[key]);
        }
    }
    async waitForDataState(dataState, waitTime = 3000, dontThrowError = true) {
        if (!(0, helpers_1.isPlainObject)(dataState)) {
            throw new Error(`${this.name} waitForDataState argument should be an object`);
        }
        await this.waitForPageToBeReady();
        const tempListOfStatesResult = [];
        for (const key of Object.keys(dataState)) {
            if (!this[key]) {
                throw new Error(`${this.name} does not have ${key} property`);
            }
            tempListOfStatesResult.push(await this[key].waitForDataState(dataState[key], waitTime, dontThrowError));
        }
        return tempListOfStatesResult.every((stateResult) => stateResult);
    }
    async waitForDisplayedState(dataState, waitTime = 3000, dontThrowError = true) {
        if (!(0, helpers_1.isPlainObject)(dataState)) {
            throw new Error(`${this.name} waitForDisplayedState argument should be an object`);
        }
        await this.waitForPageToBeReady();
        const tempListOfStatesResult = [];
        for (const key of Object.keys(dataState)) {
            if (!this[key]) {
                throw new Error(`${this.name} does not have ${key} property`);
            }
            tempListOfStatesResult.push(await this[key].waitForDisplayedState(dataState[key], waitTime, dontThrowError));
        }
        return tempListOfStatesResult.every((stateResult) => stateResult);
    }
    async waitVisible() {
        await waiter_1.waiter.waitFor(this.element(), this.name);
    }
    async waitExist() {
        await waiter_1.waiter.waitFor(this.element(), this.name, { state: 'attached' });
    }
    init(ClassName, rootSelector, name, options) {
        return new ClassName(this.getPage.bind(this), this.element.bind(this), rootSelector, name, options);
    }
    initCollection(ClassName, collectionType, rootSelector, name, options) {
        return new ClassName(this.getPage.bind(this), this.element.bind(this), collectionType, rootSelector, name, options);
    }
}
exports.BasePage = BasePage;
//# sourceMappingURL=base.page.js.map