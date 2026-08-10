import { BaseElement, BaseElementGetScreenshot, BaseElementPerform, BaseElementCollectionWaitForDisplayedState, BaseElementCollectionIsExisting, IClickOptions, IHoverOptions, IScrollOptions } from '../base.element';
interface IButtonGet {
    attribute?: string | string[];
    isDisabled?: null;
    color?: null;
    text?: null;
    style?: string | string[];
}
interface IButtonGetReturn {
    attribute?: {
        [k: string]: string;
    };
    isDisabled?: boolean;
    color?: string;
    text?: string;
    style?: {
        [k: string]: string;
    };
}
interface IButtonWaitForDataState {
    _where: IButtonGetReturn;
    _includes?: boolean;
}
interface IButtonCollectionPerformClick extends IClickOptions {
    _action: 'click';
    _where?: ButtonGetResult;
    _index?: number;
}
interface IButtonCollectionPerformHover extends IHoverOptions {
    _action: 'hover';
    _where?: ButtonGetResult;
    _index?: number;
}
interface IButtonCollectionPerformScroll extends IScrollOptions {
    _action: 'scroll';
    _where?: ButtonGetResult;
    _index?: number;
}
interface IButtonCollectionWaitForDataState {
    _where?: ButtonGetResult;
    _every?: boolean;
    _some?: boolean;
    _index?: number;
    _includes?: boolean;
    _length?: number | string;
}
interface IButtonCollectionGet {
    _action?: ButtonGet;
    _where?: ButtonGetResult;
    _index?: number;
    _length?: null;
}
interface IButtonCollectionIsDisplayed {
    _action: ButtonIsDisplayed;
    _where?: ButtonGetResult;
    _index?: number;
}
type ButtonGet = IButtonGet;
type ButtonGetResult = IButtonGetReturn;
type ButtonPerform = BaseElementPerform;
type ButtonIsDisplayed = null;
type ButtonIsDisplayedResult = boolean;
type ButtonIsExistResult = boolean;
type ButtonIsExist = null;
type ButtonWaitForDisplayedState = boolean;
type ButtonWaitForDataState = IButtonWaitForDataState;
type ButtonGetScreenshot = BaseElementGetScreenshot;
type ButtonCollectionGet = IButtonCollectionGet;
type ButtonCollectionGetResult = ButtonGetResult[] & {
    _length?: number;
};
type ButtonCollectionPerform = IButtonCollectionPerformClick | IButtonCollectionPerformHover | IButtonCollectionPerformScroll;
type ButtonCollectionIsDisplayed = IButtonCollectionIsDisplayed;
type ButtonCollectionIsDisplayedResult = boolean[];
type ButtonCollectionWaitForDataState = IButtonCollectionWaitForDataState;
type ButtonCollectionWaitForDisplayedState = BaseElementCollectionWaitForDisplayedState;
type ButtonCollectionIsExisting = BaseElementCollectionIsExisting;
type ButtonCollectionIsExistingResult = boolean[];
declare const getButtonData: (_element: any, { getObj, getValues }: {
    getObj: any;
    getValues: any;
}) => any;
declare class ButtonElement extends BaseElement {
    constructor(page: any, parentLocator: any, elementRootSelector: any, name: any, options: any);
    sendKeys(): Promise<void>;
    get(getObj: IButtonGet): Promise<any>;
}
export { ButtonElement, ButtonIsDisplayed, ButtonIsExist, ButtonIsDisplayedResult, ButtonPerform, ButtonGet, ButtonGetResult, ButtonIsExistResult, ButtonWaitForDisplayedState, ButtonWaitForDataState, ButtonGetScreenshot, ButtonCollectionGet, ButtonCollectionGetResult, ButtonCollectionPerform, ButtonCollectionIsDisplayed, ButtonCollectionIsDisplayedResult, ButtonCollectionWaitForDataState, ButtonCollectionWaitForDisplayedState, ButtonCollectionIsExisting, ButtonCollectionIsExistingResult, getButtonData, };
//# sourceMappingURL=button.d.ts.map