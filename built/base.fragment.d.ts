import { type FrameLocator, type Locator, type Page } from '@playwright/test';
import { IBaseInitOptions, BaseElement, CollectionElements, ICollectionInitOptions, CollectionFragments, IChainLocatorOptions } from './base.types';
import { BaseRootElement } from './base.root.element';
declare class BaseFragment {
    protected page: () => Page;
    protected _root: BaseRootElement;
    private parentLocator;
    private fragmentRootSelector;
    protected name: string;
    private options?;
    constructor(page: () => Page, parentLocator: () => Locator, fragmentRootSelector: string | Array<string | {
        selector: string;
        opts: IChainLocatorOptions;
    }>, name: string, options?: IBaseInitOptions);
    private isOnlyRootProp;
    protected element(): Locator | FrameLocator;
    protected get parentElement(): Locator;
    set override(method: any);
    perform(performObj: object): Promise<void>;
    getScreenshot(getScreen: object): Promise<void>;
    get(getObj: object): Promise<{}>;
    isDisplay(isDispObj: object): Promise<{}>;
    waitForDataState(dataState: object, waitTime: number, dontThrowError: boolean): Promise<boolean>;
    waitForDisplayedState(dataState: object, waitTime: number, dontThrowError: boolean): Promise<any>;
    sendKeys(sendObj: object): Promise<void>;
    isExist(isExistObj: object): Promise<{}>;
    private isFrameLocator;
    waitVisible(): Promise<void>;
    waitExist(): Promise<void>;
    protected getParentNode(_locator: Locator): Promise<Locator>;
    protected init<T extends BaseFragment | BaseElement>(ClassName: new (page: () => Page, parentLocator: () => Locator, rootSelector: string | Array<string | {
        selector: string;
        opts: IChainLocatorOptions;
    }>, name: string, options?: IBaseInitOptions) => T, rootSelector: string | Array<string | {
        selector: string;
        opts: IChainLocatorOptions;
    }>, name: string, options?: IBaseInitOptions): T;
    protected initCollection<T extends CollectionElements | CollectionFragments>(ClassName: new (page: () => Page, parentLocator: () => Locator, collectionType: any, rootSelector: string, name: string, options?: ICollectionInitOptions) => T, collectionType: any, rootSelector: string, name: string, options?: ICollectionInitOptions): T;
}
export { BaseFragment, Locator };
//# sourceMappingURL=base.fragment.d.ts.map