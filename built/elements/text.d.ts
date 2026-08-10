import { BaseElement, BaseElementPerform, BaseElementCollectionIsExisting, BaseElementCollectionWaitForDisplayedState, BaseElementGetScreenshot, IClickOptions, IHoverOptions, IScrollOptions } from '../base.element';
interface ITextGet {
    color?: null;
    text?: null;
    style?: string | string[];
    attribute?: string | string[];
    tagName?: null;
}
interface ITextCollectionPerformClick extends IClickOptions {
    _action: 'click';
    _where?: TextGetResult;
    _index?: number;
}
interface ITextCollectionPerformHover extends IHoverOptions {
    _action: 'hover';
    _where?: TextGetResult;
    _index?: number;
}
interface ITextCollectionPerformScroll extends IScrollOptions {
    _action: 'scroll';
    _where?: TextGetResult;
    _index?: number;
}
interface ITextCollectionWaitForDataState {
    _where?: TextGetResult;
    _every?: boolean;
    _some?: boolean;
    _index?: number;
    _includes?: boolean;
    _length?: number | string;
}
interface ITextWaitForDataState {
    _where: ITextGetReturn;
    _includes?: boolean;
}
interface ITextCollectionIsDisplayed {
    _action: null;
    _where?: ITextGetReturn;
    _index?: number;
}
interface ITextGetReturn {
    color?: string;
    text?: string;
    style?: {
        [k: string]: string;
    };
    attribute?: {
        [k: string]: string;
    };
    tagName?: string;
}
interface ITextCollectionGet {
    _action?: TextGet;
    _where?: TextGetResult;
    _index?: number;
    _length?: null;
}
declare function getTextData(_element: any, { getObj, getValues }: {
    getObj: any;
    getValues: any;
}): any;
type TextIsDisplayed = null;
type TextIsDisplayedResult = boolean;
type TextGet = ITextGet;
type TextGetResult = ITextGetReturn;
type TextPerform = BaseElementPerform;
type TextIsExist = null;
type TextIsExistResult = boolean;
type TextWaitForDisplayedState = boolean;
type TextWaitForDataState = ITextWaitForDataState;
type TextCollectionGet = ITextCollectionGet;
type TextCollectionGetResult = TextGetResult[] & {
    _length?: number;
};
type TextCollectionPerform = ITextCollectionPerformClick | ITextCollectionPerformHover | ITextCollectionPerformScroll;
type TextCollectionIsDisplayed = ITextCollectionIsDisplayed;
type TextCollectionIsDisplayedResult = boolean[];
type TextCollectionWaitForDataState = ITextCollectionWaitForDataState;
type TextCollectionWaitForDisplayedState = BaseElementCollectionWaitForDisplayedState;
type TextGetScreenshot = BaseElementGetScreenshot;
type TextCollectionIsExisting = BaseElementCollectionIsExisting;
type TextCollectionIsExistingResult = boolean[];
declare class TextElement extends BaseElement {
    constructor(page: any, parentLocator: any, elementRootSelector: any, name: any, options?: any);
    get(getObj: ITextGet): Promise<ITextGetReturn>;
}
export { TextElement, TextIsDisplayedResult, TextGet, TextGetResult, TextPerform, TextIsDisplayed, TextCollectionGet, TextCollectionGetResult, TextCollectionPerform, TextCollectionWaitForDataState, TextCollectionWaitForDisplayedState, TextCollectionIsDisplayed, TextCollectionIsDisplayedResult, TextCollectionIsExisting, TextWaitForDisplayedState, TextCollectionIsExistingResult, TextWaitForDataState, TextGetScreenshot, TextIsExist, TextIsExistResult, getTextData, };
//# sourceMappingURL=text.d.ts.map