import { type BrowserContext, type Locator, type Page } from '@playwright/test';
import { IBaseInitOptions, BaseFragment, BaseElement, CollectionElements, ICollectionInitOptions, CollectionFragments, IChainLocatorOptions } from './base.types';
import { BrowserActioner } from './browser/browser.actioner';
import { BrowserConsoler } from './browser/browser.consoler';
import { BrowserTabber } from './browser/browser.tabber';
import { BaseRootElement } from './base.root.element';
import { BrowserFiler } from './browser/browser.filer';
interface IBasePage {
    _actioner?: BrowserActioner;
    _consoler?: BrowserConsoler;
    _tabber?: BrowserTabber;
    _filer?: BrowserFiler;
    _page?: Page;
}
declare class BasePage {
    protected browserContext: BrowserContext;
    protected page: Page;
    protected name: string;
    protected pageRootSelector: string;
    protected _root: BaseRootElement;
    _actioner: BrowserActioner;
    _consoler: BrowserConsoler;
    _tabber: BrowserTabber;
    _filer: BrowserFiler;
    constructor(browserContext: BrowserContext, page: Page, pageRootSelector: string, name: string);
    protected element(): Locator;
    protected setPage(page: Page): void;
    protected getPage(): Page;
    get _page(): Page;
    private waitForPageToBeReady;
    perform(performObj: object): Promise<void>;
    get(getObj: object): Promise<{}>;
    isDisplay(isDispObj: object): Promise<{}>;
    isExist(isExistObj: object): Promise<{}>;
    getScreenshot(scrObject: object): Promise<void>;
    sendKeys(sendObj: object): Promise<void>;
    waitForDataState(dataState: object, waitTime?: number, dontThrowError?: boolean): Promise<boolean>;
    waitForDisplayedState(dataState: object, waitTime?: number, dontThrowError?: boolean): Promise<boolean>;
    protected waitVisible(): Promise<void>;
    protected waitExist(): Promise<void>;
    protected init<T extends BaseFragment | BaseElement>(ClassName: new (page: () => Page, parentLocator: () => Locator, rootSelector: string | Array<string | {
        selector: string;
        opts: IChainLocatorOptions;
    }>, name: string, options?: IBaseInitOptions) => T, rootSelector: string | Array<string | {
        selector: string;
        opts: IChainLocatorOptions;
    }>, name: string, options?: IBaseInitOptions): T;
    protected initCollection<T extends CollectionElements | CollectionFragments>(ClassName: new (page: () => Page, parentLocator: () => Locator, collectionType: any, rootSelector: string, name: string, options?: ICollectionInitOptions) => T, collectionType: any, rootSelector: string, name: string, options?: ICollectionInitOptions): T;
}
export { BasePage, Page, Locator, IBasePage };
//# sourceMappingURL=base.page.d.ts.map