import { BaseElement, BaseElementPerform, IGeneralActionsOptions, BaseElementGetScreenshot, BaseElementCollectionIsExisting, IClickOptions, IHoverOptions, IScrollOptions } from '../base.element';
interface IInputGet {
    value?: null;
    attribute?: string | string[];
    isDisabled?: null;
    tagName?: null;
    style?: string | string[];
}
interface IInputGetReturn {
    attribute?: {
        [k: string]: string;
    };
    value?: string;
    isDisabled?: boolean;
    tagName?: string;
    style?: {
        [k: string]: string;
    };
}
interface IPressOptions {
    delay?: number;
    noWaitAfter?: boolean;
    timeout?: number;
}
interface IInputOptions {
    fillOpts?: IGeneralActionsOptions;
    pressOpts?: IPressOptions;
    keysOneByOne?: boolean;
}
declare function getInputData(_element: any, { getObj, getValues }: {
    getObj: any;
    getValues: any;
}): any;
interface IInputCollectionWaitForDataState {
    _where?: InputGetResult;
    _every?: boolean;
    _some?: boolean;
    _index?: number;
    _includes?: boolean;
    _length?: number | string;
}
interface IInputCollectionWaitForDisplayedState {
    _state: boolean;
    _every?: boolean;
    _some?: boolean;
    _index?: number;
}
interface IInputWaitForDataState {
    _where: InputGetResult;
    _includes?: boolean;
}
interface IInputCollectionGet {
    _action?: InputGet;
    _where?: InputGetResult;
    _index?: number;
    _length?: null;
}
interface IInputCollectionPerformClick extends IClickOptions {
    _action: 'click';
    _where?: InputGetResult;
    _index?: number;
}
interface IInputCollectionPerformHover extends IHoverOptions {
    _action: 'hover';
    _where?: InputGetResult;
    _index?: number;
}
interface IInputCollectionPerformScroll extends IScrollOptions {
    _action: 'scroll';
    _where?: InputGetResult;
    _index?: number;
}
interface IInputCollectionSendKeys {
    _action: InputSendKeys;
    _index?: number;
    _where?: InputGetResult;
}
interface IInputCollectionIsDisplayed {
    _action: null;
    _where?: InputGetResult;
    _index?: number;
}
type InputSendKeys = string | {
    value: string;
    opts: IInputOptions;
};
type InputPerform = BaseElementPerform;
type InputGet = IInputGet;
type InputGetResult = IInputGetReturn;
type InputIsDisplayed = null;
type InputIsDisplayedResult = boolean;
type InputCollectionWaitForDataState = IInputCollectionWaitForDataState;
type InputCollectionWaitForDisplayedState = IInputCollectionWaitForDisplayedState;
type InputWaitForDisplayedState = boolean;
type InputWaitForDataState = IInputWaitForDataState;
type InputCollectionPerform = IInputCollectionPerformClick | IInputCollectionPerformHover | IInputCollectionPerformScroll;
type InputIsExist = null;
type InputIsExistResult = boolean;
type InputGetScreenshot = BaseElementGetScreenshot;
type InputCollectionGet = IInputCollectionGet;
type InputCollectionGetResult = InputGetResult[] & {
    _length?: number;
};
type InputCollectionIsDisplayed = IInputCollectionIsDisplayed;
type InputCollectionIsDisplayedResult = boolean[];
type InputCollectionIsExisting = BaseElementCollectionIsExisting;
type InputCollectionIsExistingResult = boolean[];
type InputCollectionSendKeys = IInputCollectionSendKeys;
declare class InputElement extends BaseElement {
    constructor(page: any, parentLocator: any, elementRootSelector: any, name: any, options?: any);
    sendKeys(sendObj: InputSendKeys): Promise<void>;
    get(getObj: IInputGet): Promise<IInputGetReturn>;
}
export { InputElement, InputSendKeys, InputPerform, InputGet, InputGetResult, InputIsDisplayed, InputIsDisplayedResult, InputCollectionWaitForDataState, InputCollectionWaitForDisplayedState, InputWaitForDisplayedState, InputWaitForDataState, InputCollectionPerform, InputIsExist, InputGetScreenshot, InputCollectionGet, InputCollectionGetResult, InputCollectionIsDisplayed, InputCollectionIsDisplayedResult, InputCollectionIsExisting, InputCollectionIsExistingResult, InputCollectionSendKeys, InputIsExistResult, getInputData, };
//# sourceMappingURL=input.d.ts.map