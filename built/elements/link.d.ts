import { BaseElement, BaseElementPerform, BaseElementCollectionIsExisting, BaseElementGetScreenshot, IClickOptions, IHoverOptions, IScrollOptions } from '../base.element';
interface ILinkGet {
    color?: null | {
        hover: boolean;
    };
    href?: null;
    text?: null;
    style?: string | string[];
    attribute?: string | string[];
}
interface ILinkCollectionGet {
    _action?: LinkGet;
    _where?: LinkGetResult;
    _index?: number;
    _length?: null;
}
interface ILinkCollectionPerformHover extends IHoverOptions {
    _action: 'hover';
    _where?: LinkGetResult;
    _index?: number;
}
interface ILinkCollectionPerformScroll extends IScrollOptions {
    _action: 'scroll';
    _where?: LinkGetResult;
    _index?: number;
}
interface ILinkCollectionWaitForDataState {
    _where?: LinkGetResult;
    _every?: boolean;
    _some?: boolean;
    _index?: number;
    _includes?: boolean;
    _length?: number | string;
}
interface ILinkCollectionWaitForDisplayedState {
    _state: boolean;
    _every?: boolean;
    _some?: boolean;
    _index?: number;
}
interface ILinkWaitForDataState {
    _where: LinkGetResult;
    _includes?: boolean;
}
interface ILinkGetReturn {
    color?: string;
    href?: string;
    text?: string;
    style?: {
        [k: string]: string;
    };
    attribute?: {
        [k: string]: string;
    };
}
interface ILinkCollectionPerformClick extends IClickOptions {
    _action: 'click';
    _where?: LinkGetResult;
    _index?: number;
}
interface ILinkCollectionIsDisplayed {
    _action: null;
    _where?: LinkGetResult;
    _index?: number;
}
declare function getLinkData(_element: any, { getObj, getValues }: {
    getObj: any;
    getValues: any;
}): any;
type LinkPerform = BaseElementPerform;
type LinkGet = ILinkGet;
type LinkGetResult = ILinkGetReturn;
type LinkIsDisplayed = null;
type LinkIsDisplayedResult = boolean;
type LinkCollectionGet = ILinkCollectionGet;
type LinkCollectionGetResult = ILinkGetReturn[] & {
    _length?: number;
};
type LinkCollectionPerform = ILinkCollectionPerformClick | ILinkCollectionPerformHover | ILinkCollectionPerformScroll;
type LinkCollectionWaitForDataState = ILinkCollectionWaitForDataState;
type LinkCollectionWaitForDisplayedState = ILinkCollectionWaitForDisplayedState;
type LinkWaitForDisplayedState = boolean;
type LinkWaitForDataState = ILinkWaitForDataState;
type LinkIsExist = null;
type LinkIsExistResult = boolean;
type LinkGetScreenshot = BaseElementGetScreenshot;
type LinkCollectionIsDisplayed = ILinkCollectionIsDisplayed;
type LinkCollectionIsDisplayedResult = boolean[];
type LinkCollectionIsExisting = BaseElementCollectionIsExisting;
type LinkCollectionIsExistingResult = boolean[];
declare class LinkElement extends BaseElement {
    constructor(page: any, parentLocator: any, elementRootSelector: any, name: any, options?: any);
    get(getObj: ILinkGet): Promise<ILinkGetReturn>;
}
export { LinkElement, LinkGet, LinkGetResult, LinkIsDisplayed, LinkIsDisplayedResult, LinkPerform, LinkCollectionGet, LinkCollectionGetResult, LinkCollectionPerform, LinkCollectionWaitForDataState, LinkWaitForDataState, LinkCollectionWaitForDisplayedState, LinkWaitForDisplayedState, LinkIsExist, LinkIsExistResult, LinkGetScreenshot, LinkCollectionIsDisplayed, LinkCollectionIsDisplayedResult, LinkCollectionIsExisting, LinkCollectionIsExistingResult, getLinkData, };
//# sourceMappingURL=link.d.ts.map