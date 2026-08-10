import { BaseElement, BaseElementPerform, BaseElementCollectionIsExisting, BaseElementGetScreenshot, IClickOptions, IHoverOptions, IScrollOptions } from '../base.element';
interface IImgGet {
    attribute?: string | string[];
    tagName?: null;
    size?: null;
    style?: string | string[];
    currentSrc?: null;
}
interface IImgGetResult {
    attribute?: {
        [k: string]: string;
    };
    tagName?: string;
    size?: {
        width: string;
        height: string;
    };
    style?: {
        [k: string]: string;
    };
    currentSrc?: string;
}
interface IImgCollectionGet {
    _action?: ImgGet;
    _where?: ImgGetResult;
    _index?: number;
    _length?: null;
}
interface IImgCollectionIsDisplayed {
    _action: null;
    _where?: ImgGetResult;
    _index?: number;
}
declare function getImgData(_element: any, { getObj, getValues }: {
    getObj: any;
    getValues: any;
}): any;
interface IImgCollectionWaitForDataState {
    _where?: ImgGetResult;
    _every?: boolean;
    _some?: boolean;
    _index?: number;
    _includes?: boolean;
    _length?: number | string;
}
interface IImgCollectionWaitForDisplayedState {
    _state: boolean;
    _every?: boolean;
    _some?: boolean;
    _index?: number;
}
interface IImgWaitForDataState {
    _where: ImgGetResult;
    _includes?: boolean;
}
interface IImgCollectionPerformClick extends IClickOptions {
    _action: 'click';
    _where?: ImgGetResult;
    _index?: number;
}
interface IImgCollectionPerformHover extends IHoverOptions {
    _action: 'hover';
    _where?: ImgGetResult;
    _index?: number;
}
interface IImgCollectionPerformScroll extends IScrollOptions {
    _action: 'scroll';
    _where?: ImgGetResult;
    _index?: number;
}
type ImgGet = IImgGet;
type ImgGetResult = IImgGetResult;
type ImgPerform = BaseElementPerform;
type ImgIsDisplayed = null;
type ImgIsDisplayedResult = boolean;
type ImgCollectionGet = IImgCollectionGet;
type ImgCollectionGetResult = IImgGetResult[] & {
    _length?: number;
};
type ImgCollectionIsDisplayed = IImgCollectionIsDisplayed;
type ImgCollectionIsDisplayedResult = boolean[];
type ImgCollectionWaitForDataState = IImgCollectionWaitForDataState;
type ImgCollectionWaitForDisplayedState = IImgCollectionWaitForDisplayedState;
type ImgWaitForDisplayedState = boolean;
type ImgWaitForDataState = IImgWaitForDataState;
type ImgCollectionPerform = IImgCollectionPerformClick | IImgCollectionPerformHover | IImgCollectionPerformScroll;
type ImgIsExist = null;
type ImgIsExistResult = boolean;
type ImgGetScreenshot = BaseElementGetScreenshot;
type ImgCollectionIsExisting = BaseElementCollectionIsExisting;
type ImgCollectionIsExistingResult = boolean[];
declare class ImgElement extends BaseElement {
    constructor(page: any, parentLocator: any, elementRootSelector: any, name: any, options?: any);
    get(getObj: IImgGet): Promise<IImgGetResult>;
}
export { ImgElement, ImgIsDisplayed, ImgIsDisplayedResult, ImgPerform, ImgGet, ImgGetResult, ImgCollectionGet, ImgCollectionGetResult, ImgCollectionIsDisplayed, ImgCollectionIsDisplayedResult, ImgCollectionWaitForDataState, ImgCollectionWaitForDisplayedState, ImgWaitForDisplayedState, ImgWaitForDataState, ImgCollectionPerform, ImgIsExist, ImgIsExistResult, ImgGetScreenshot, ImgCollectionIsExisting, ImgCollectionIsExistingResult, getImgData, };
//# sourceMappingURL=image.d.ts.map