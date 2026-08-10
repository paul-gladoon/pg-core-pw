import { type Page, type Locator, LocatorScreenshotOptions } from '@playwright/test';
import { IBaseInitOptions, IChainLocatorOptions } from './base.types';
declare const arrayValuesKeys: string[];
interface IGeneralActionsOptions {
    force?: boolean;
    noWaitAfter?: boolean;
    timeout?: number;
}
interface IClickOptions extends IGeneralActionsOptions {
    button?: 'left' | 'right' | 'middle';
    clickCount?: number;
    delay?: number;
    modifiers?: Array<'Alt' | 'Control' | 'Meta' | 'Shift'>;
    position?: {
        x: number;
        y: number;
    };
    trial?: boolean;
}
interface IHoverOptions extends IGeneralActionsOptions {
    modifiers?: Array<'Alt' | 'Control' | 'Meta' | 'Shift'>;
    position?: {
        x: number;
        y: number;
    };
    trial?: boolean;
    waitVisibilityBeforeHover?: boolean;
}
interface IScrollOptions {
    timeout?: number;
}
interface IBaseElementGetScreenshot {
    filePath: string;
    viewOptions?: LocatorScreenshotOptions;
}
interface IBaseElementGetValues {
    attribute?: string | string[];
    style?: string | string[];
    styleBefore?: string | string[];
    color?: null;
    tagName?: null;
    text?: null;
    checked?: null;
    boundingClientRect?: null;
    childrenTags?: null;
    isDisabled?: null;
}
interface IBaseElementGetReturn {
    attribute?: {
        [k: string]: string;
    };
    color?: string;
    tagName?: string;
    text?: string;
    checked?: boolean;
    style?: {
        [k: string]: string;
    };
    styleBefore?: {
        [k: string]: string;
    };
    boundingClientRect?: object;
    childrenTags?: string[];
    isDisabled?: boolean;
}
interface IBaseElementWaitForDataState {
    _where: IBaseElementGetReturn;
    _includes?: boolean;
}
interface IBaseElementPerformClick extends IClickOptions {
    _action: 'click';
}
interface IBaseElementPerformHover extends IHoverOptions {
    _action: 'hover';
}
interface IBaseElementPerformScroll extends IScrollOptions {
    _action: 'scroll';
}
interface IBaseElementCollectionPerformClick extends IClickOptions {
    _action: 'click';
    _where?: BaseElementGetResult;
    _index?: number;
}
interface IBaseElementCollectionPerformHover extends IHoverOptions {
    _action: 'hover';
    _where?: BaseElementGetResult;
    _index?: number;
}
interface IBaseElementCollectionPerformScroll extends IScrollOptions {
    _action: 'scroll';
    _where?: BaseElementGetResult;
    _index?: number;
}
interface IBaseElementCollectionGet {
    _action?: BaseElementGet;
    _where?: BaseElementGetResult;
    _index?: number;
    _length?: null;
}
interface IBaseElementCollectionIsDisplayed {
    _action: BaseElementIsDisplayed;
    _where?: BaseElementGetResult;
    _index?: number;
}
interface IBaseElementCollectionWaitForDataState {
    _where?: BaseElementGetResult;
    _every?: boolean;
    _some?: boolean;
    _index?: number;
    _includes?: boolean;
    _length?: number | string;
}
interface IBaseElementCollectionWaitForDisplayedState {
    _where?: BaseElementGetResult;
    _state: boolean;
    _every?: boolean;
    _some?: boolean;
    _index?: number;
}
type PerformVerb = 'click' | 'hover' | 'scroll';
type BaseElementPerformClick = 'click' | IBaseElementPerformClick;
type BaseElementPerformHover = 'hover' | IBaseElementPerformHover;
type BaseElementPerformScroll = 'scroll' | IBaseElementPerformScroll;
type BaseElementPerform = BaseElementPerformClick | BaseElementPerformHover | BaseElementPerformScroll;
type BaseElementGet = IBaseElementGetValues;
type BaseElementGetResult = IBaseElementGetReturn;
type BaseElementIsDisplayed = null;
type BaseElementIsDisplayedResult = boolean;
type BaseElementIsExist = null;
type BaseElementIsExistResult = boolean;
type BaseElementGetScreenshot = IBaseElementGetScreenshot;
type BaseElementWaitForDataState = IBaseElementWaitForDataState;
type BaseElementWaitForDisplayedState = boolean;
type BaseElementCollectionPerform = IBaseElementCollectionPerformClick | IBaseElementCollectionPerformHover | IBaseElementCollectionPerformScroll;
type BaseElementCollectionGet = IBaseElementCollectionGet;
type BaseElementCollectionGetResult = BaseElementGetResult[] & {
    _length?: number;
};
type BaseElementCollectionIsDisplayed = IBaseElementCollectionIsDisplayed;
type BaseElementCollectionIsDisplayedResult = boolean[];
type BaseElementCollectionIsExisting = IBaseElementCollectionIsDisplayed;
type BaseElementCollectionIsExistingResult = boolean[];
type BaseElementCollectionWaitForDataState = IBaseElementCollectionWaitForDataState;
type BaseElementCollectionWaitForDisplayedState = IBaseElementCollectionWaitForDisplayedState;
declare class BaseElement {
    protected page: () => Page;
    protected parentLocator: () => Locator;
    protected name: string;
    private elementRootSelector;
    private options?;
    constructor(page: () => Page, parentLocator: () => Locator, elementRootSelector: string | Array<string | {
        selector: string;
        opts: IChainLocatorOptions;
    }>, name: string, options?: IBaseInitOptions);
    get element(): Locator;
    set element(locator: Locator);
    protected parentElement(): Locator;
    set override(method: any);
    perform(action: BaseElementPerform): Promise<void>;
    protected click(options?: IClickOptions): Promise<void>;
    getScreenshot({ filePath, viewOptions }: IBaseElementGetScreenshot): Promise<void>;
    get(getObj: BaseElementGet): Promise<any>;
    isDisplay(): Promise<boolean>;
    waitForDisplayedState(_state: any, waitTime: any, dontThrowError: any): Promise<any>;
    waitForDataState({ _where, _includes }: {
        _where: any;
        _includes: any;
    }, waitTime: any, dontThrowError: any): Promise<any>;
    protected hover(options?: IHoverOptions): Promise<void>;
    protected scroll(options?: IScrollOptions): Promise<void>;
    isExist(): Promise<boolean>;
    waitVisible(): Promise<void>;
    protected waitExist(): Promise<void>;
    protected waitNotVisible(): Promise<void>;
    protected getParentNode(_locator: Locator): Promise<Locator>;
    protected init<T extends BaseElement>(ClassName: new (page: () => Page, parentLocator: () => Locator, rootSelector: string | Array<string | {
        selector: string;
        opts: IChainLocatorOptions;
    }>, name: string, options?: IBaseInitOptions) => T, rootSelector: string | Array<string | {
        selector: string;
        opts: IChainLocatorOptions;
    }>, name: string, options?: IBaseInitOptions): T;
}
export { BaseElement, Locator, PerformVerb, BaseElementPerform, BaseElementPerformClick, BaseElementPerformHover, BaseElementPerformScroll, BaseElementGet, BaseElementGetResult, BaseElementIsDisplayed, BaseElementIsExist, BaseElementIsExistResult, BaseElementGetScreenshot, BaseElementWaitForDataState, BaseElementWaitForDisplayedState, BaseElementCollectionPerform, BaseElementCollectionGet, BaseElementCollectionGetResult, BaseElementCollectionIsDisplayed, BaseElementCollectionIsDisplayedResult, BaseElementCollectionIsExisting, BaseElementCollectionIsExistingResult, BaseElementCollectionWaitForDataState, BaseElementCollectionWaitForDisplayedState, BaseElementIsDisplayedResult, IGeneralActionsOptions, IClickOptions, IHoverOptions, IScrollOptions, arrayValuesKeys, };
//# sourceMappingURL=base.element.d.ts.map