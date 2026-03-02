import { BaseElement, BaseElementScroll, IGeneralActionsOptions, BaseElementClick, BaseElementHover, BaseElementGetScreenshot, BaseElementCollectionIsExisting } from '../base.element';
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
interface IInputCollectionClick {
    _action: InputClick;
    _where?: InputGetResult;
    _index?: number;
}
interface IInputCollectionSendKeys {
    _action: InputSendKeys;
    _index?: number;
    _where?: InputGetResult;
}
interface IInputCollectionHover {
    _action: InputHover;
    _where?: InputGetResult;
    _index?: number;
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
type InputClick = BaseElementClick;
type InputGet = IInputGet;
type InputGetResult = IInputGetReturn;
type InputIsDisplayed = null;
type InputIsDisplayedResult = boolean;
type InputCollectionWaitForDataState = IInputCollectionWaitForDataState;
type InputCollectionWaitForDisplayedState = IInputCollectionWaitForDisplayedState;
type InputWaitForDisplayedState = boolean;
type InputWaitForDataState = IInputWaitForDataState;
type InputScroll = BaseElementScroll;
type InputHover = BaseElementHover;
type InputCollectionClick = IInputCollectionClick;
type InputIsExist = null;
type InputGetScreenshot = BaseElementGetScreenshot;
type InputCollectionGet = IInputCollectionGet;
type InputCollectionGetResult = InputGetResult | InputGetResult[];
type InputCollectionHover = IInputCollectionHover;
type InputCollectionIsDisplayed = IInputCollectionIsDisplayed;
type InputCollectionIsDisplayedResult = boolean[] | boolean;
type InputCollectionIsExisting = BaseElementCollectionIsExisting;
type InputCollectionIsExistingResult = boolean[] | boolean;
type InputCollectionSendKeys = IInputCollectionSendKeys;
declare class InputElement extends BaseElement {
    constructor(page: any, parentLocator: any, elementRootSelector: any, name: any, options?: any);
    sendKeys(sendObj: InputSendKeys): Promise<void>;
    get(getObj: IInputGet): Promise<IInputGetReturn>;
}
export { InputElement, InputSendKeys, InputClick, InputGet, InputGetResult, InputIsDisplayed, InputIsDisplayedResult, InputCollectionWaitForDataState, InputCollectionWaitForDisplayedState, InputWaitForDisplayedState, InputWaitForDataState, InputScroll, InputCollectionClick, InputIsExist, InputGetScreenshot, InputCollectionGet, InputCollectionGetResult, InputCollectionHover, InputCollectionIsDisplayed, InputCollectionIsDisplayedResult, InputCollectionIsExisting, InputCollectionIsExistingResult, InputCollectionSendKeys, getInputData, };
//# sourceMappingURL=input.d.ts.map