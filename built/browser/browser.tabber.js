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
exports.BrowserTabber = void 0;
const waiter_1 = require("../utils/waiter");
const _n = __importStar(require("lodash"));
class BrowserTabber {
    constructor(browserContext, pageSetter, page) {
        this.name = 'Browser Tab(s)';
        this.browserConext = browserContext;
        this.pageSetter = pageSetter;
        this.page = page;
    }
    getPage() {
        return this.page();
    }
    async sendKeys({ switchTab, refresh, newTab, setWindowSize, navigateToUrl }) {
        if (switchTab) {
            const actions = {
                index: async (_index) => {
                    await waiter_1.waiter.waitForState(async () => !!this.browserConext.pages()[_index], {
                        timeout: 10000,
                        interval: 2000,
                        dontThrow: false,
                        message: `The requested tab by index "${_index}" doesn't exist or tab was closed.`,
                    });
                    const pages = this.browserConext.pages();
                    const currentPage = pages[_index];
                    await currentPage.bringToFront();
                    this.pageSetter(currentPage);
                },
                url: async (_url) => {
                    let currentPage;
                    await waiter_1.waiter.waitForState(async () => {
                        const pages = this.browserConext.pages();
                        currentPage = pages[pages.findIndex((_page) => _page.url() === _url)];
                        return !!currentPage;
                    }, {
                        timeout: 10000,
                        interval: 2000,
                        dontThrow: false,
                        message: `The requested tab by url "${_url}" doesn't exist or tab was closed.`,
                    });
                    await currentPage.bringToFront();
                    this.pageSetter(currentPage);
                },
                title: async (_title) => {
                    let currentPage;
                    await waiter_1.waiter.waitForState(async () => {
                        const pages = this.browserConext.pages();
                        const tempListTitles = [];
                        for (const _page of pages) {
                            const currentTitle = await _page.title();
                            tempListTitles.push(currentTitle);
                        }
                        currentPage = pages[tempListTitles.findIndex((_t) => _t === _title)];
                        return !!currentPage;
                    }, {
                        timeout: 10000,
                        interval: 2000,
                        dontThrow: false,
                        message: `The requested tab by title "${_title}" doesn't exist or tab was closed.`,
                    });
                    await currentPage.bringToFront();
                    this.pageSetter(currentPage);
                },
                defaultTab: async (state) => {
                    if (state) {
                        const pages = this.browserConext.pages();
                        if (!pages.length) {
                            throw new Error(`The default tab doesn't exist or tab was closed.`);
                        }
                        this.pageSetter(pages[0]);
                        await pages[0].bringToFront();
                    }
                },
            };
            for (const _switch of Object.keys(switchTab)) {
                await actions[_switch](switchTab[_switch]);
            }
        }
        if ((typeof refresh === 'boolean' && refresh) || typeof refresh === 'object') {
            typeof refresh === 'boolean' ? await this.page().reload() : await this.page().reload(refresh);
        }
        if (newTab) {
            const currentTabs = this.browserConext.pages();
            await this.browserConext.newPage();
            await waiter_1.waiter.waitForState(async () => currentTabs.length < this.browserConext.pages().length, {
                timeout: 10000,
                interval: 2000,
                dontThrow: false,
                message: `The new tab doesn't exist or tab was closed.`,
            });
            const currentPage = this.browserConext.pages()[this.browserConext.pages().length - 1];
            await currentPage.bringToFront();
            this.pageSetter(currentPage);
            await this.page().goto(newTab);
        }
        if (setWindowSize) {
            await this.page().setViewportSize({ height: setWindowSize.height, width: setWindowSize.width });
        }
        if (navigateToUrl) {
            await this.page().goto(navigateToUrl);
        }
    }
    async get(data) {
        const values = {
            url: () => this.page().url(),
            title: async () => await this.page().title(),
            tabsUrls: async () => {
                const pages = this.browserConext.pages();
                const listOfTabs = [];
                for (const _page of pages) {
                    await _page.waitForLoadState('domcontentloaded');
                    listOfTabs.push(await _page.url());
                }
                return listOfTabs;
            },
            tabsLength: () => this.browserConext.pages().length,
            windowSize: () => this.page().viewportSize(),
        };
        const tempObj = {};
        for (const key of Object.keys(data)) {
            tempObj[key] = await values[key]();
        }
        return tempObj;
    }
    async waitForDataState({ expectedState, includes }, waitTime = 3000, dontThrowError = true) {
        const valueToNullKeys = ['url', 'title', 'tabsUrls', 'tabsLength'];
        const tempObj = {};
        for (const key of Object.keys(expectedState)) {
            if (valueToNullKeys.includes(key)) {
                tempObj[key] = null;
            }
        }
        return waiter_1.waiter.waitForState(async () => {
            const getResult = await this.get(tempObj);
            if (_n.isBoolean(includes)) {
                const expectedValuesList = Object.values(expectedState);
                const resultValuesList = Object.values(getResult);
                return resultValuesList.every((itemValue, index) => includes ? itemValue.includes(expectedValuesList[index]) : !itemValue.includes(expectedValuesList[index]));
            }
            return _n.isEqual(getResult, expectedState);
        }, {
            message: `Wait for data state on "${this.name}" is failed, for data: "${JSON.stringify(expectedState)}"`,
            timeout: waitTime,
            interval: 1000,
            dontThrow: dontThrowError,
        });
    }
}
exports.BrowserTabber = BrowserTabber;
//# sourceMappingURL=browser.tabber.js.map