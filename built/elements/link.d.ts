import { BaseElement, BaseElementClick, BaseElementCollectionIsExisting, BaseElementGetScreenshot, BaseElementHover, BaseElementScroll } from '../base.element';
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
interface ILinkCollectionHover {
    _action: LinkHover;
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
interface ILinkCollectionClick {
    _action: LinkClick;
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
type LinkClick = BaseElementClick;
type LinkGet = ILinkGet;
type LinkHover = BaseElementHover;
type LinkGetResult = ILinkGetReturn;
type LinkIsDisplayed = null;
type LinkIsDisplayedResult = boolean;
type LinkCollectionGet = ILinkCollectionGet;
type LinkCollectionGetResult = ILinkGetReturn;
type LinkCollectionHover = ILinkCollectionHover;
type LinkCollectionClick = ILinkCollectionClick;
type LinkCollectionWaitForDataState = ILinkCollectionWaitForDataState;
type LinkCollectionWaitForDisplayedState = ILinkCollectionWaitForDisplayedState;
type LinkWaitForDisplayedState = boolean;
type LinkWaitForDataState = ILinkWaitForDataState;
type LinkIsExist = null;
type LinkScroll = BaseElementScroll;
type LinkGetScreenshot = BaseElementGetScreenshot;
type LinkCollectionIsDisplayed = ILinkCollectionIsDisplayed;
type LinkCollectionIsDisplayedResult = boolean[] | boolean;
type LinkCollectionIsExisting = BaseElementCollectionIsExisting;
type LinkCollectionIsExistingResult = boolean[] | boolean;
declare class LinkElement extends BaseElement {
    constructor(page: any, parentLocator: any, elementRootSelector: any, name: any, options?: any);
    get(getObj: ILinkGet): Promise<ILinkGetReturn>;
}
export { LinkElement, LinkGet, LinkHover, LinkGetResult, LinkIsDisplayed, LinkIsDisplayedResult, LinkClick, LinkCollectionGet, LinkCollectionGetResult, LinkCollectionHover, LinkCollectionClick, LinkCollectionWaitForDataState, LinkWaitForDataState, LinkCollectionWaitForDisplayedState, LinkWaitForDisplayedState, LinkIsExist, LinkScroll, LinkGetScreenshot, LinkCollectionIsDisplayed, LinkCollectionIsDisplayedResult, LinkCollectionIsExisting, LinkCollectionIsExistingResult, getLinkData, };
//# sourceMappingURL=link.d.ts.map