import { BaseElement, BaseElementCollectionIsExisting, BaseElementGetScreenshot, BaseElementPerformHover, BaseElementPerformScroll, IGeneralActionsOptions, IHoverOptions, IScrollOptions } from '../base.element';
interface ICheckedOptions extends IGeneralActionsOptions {
    position?: {
        x: number;
        y: number;
    };
    trial?: boolean;
}
interface IRadioButtonGet {
    checked?: null;
    text?: null;
}
interface IRadioButtonGetReturn {
    checked?: boolean;
    text?: string;
}
interface IRadioButtonCollectionSendKeys {
    _action: RadioButtonSendKeys;
    _where?: RadioButtonGetResult;
    _index?: number;
}
interface IRadioButtonCollectionGet {
    _action?: RadioButtonGet;
    _where?: RadioButtonGetResult;
    _index?: number;
    _length?: null;
}
declare function getRadioButtonData(_element: any, { getObj, getValues }: {
    getObj: any;
    getValues: any;
}): any;
interface IRadioButtonCollectionWaitForDataState {
    _where?: RadioButtonGetResult;
    _every?: boolean;
    _some?: boolean;
    _index?: number;
    _includes?: boolean;
    _length?: number | string;
}
interface IRadioButtonCollectionWaitForDisplayedState {
    _state: boolean;
    _every?: boolean;
    _some?: boolean;
    _index?: number;
}
interface IRadioButtonWaitForDataState {
    _where: RadioButtonGetResult;
    _includes?: boolean;
}
interface IRadioButtonCollectionPerformHover extends IHoverOptions {
    _action: 'hover';
    _where?: RadioButtonGetResult;
    _index?: number;
}
interface IRadioButtonCollectionPerformScroll extends IScrollOptions {
    _action: 'scroll';
    _where?: RadioButtonGetResult;
    _index?: number;
}
interface IRadioButtonCollectionIsDisplayed {
    _action: null;
    _where?: RadioButtonGetResult;
    _index?: number;
}
type RadioButtonSendKeys = boolean | {
    state: boolean;
    opts: ICheckedOptions;
};
type RadioButtonGet = IRadioButtonGet;
type RadioButtonGetResult = IRadioButtonGetReturn;
type RadioButtonCollectionSendKeys = IRadioButtonCollectionSendKeys;
type RadioButtonCollectionGet = IRadioButtonCollectionGet;
type RadioButtonCollectionWaitForDataState = IRadioButtonCollectionWaitForDataState;
type RadioButtonCollectionWaitForDisplayedState = IRadioButtonCollectionWaitForDisplayedState;
type RadioButtonWaitForDisplayedState = boolean;
type RadioButtonWaitForDataState = IRadioButtonWaitForDataState;
type RadioButtonIsDisplayed = null;
type RadioButtonPerform = BaseElementPerformHover | BaseElementPerformScroll;
type RadioButtonIsDisplayedResult = boolean;
type RadioButtonIsExist = null;
type RadioButtonIsExistResult = boolean;
type RadioButtonGetScreenshot = BaseElementGetScreenshot;
type RadioButtonCollectionGetResult = RadioButtonGetResult[] & {
    _length?: number;
};
type RadioButtonCollectionPerform = IRadioButtonCollectionPerformHover | IRadioButtonCollectionPerformScroll;
type RadioButtonCollectionIsDisplayed = IRadioButtonCollectionIsDisplayed;
type RadioButtonCollectionIsDisplayedResult = boolean[];
type RadioButtonCollectionIsExisting = BaseElementCollectionIsExisting;
type RadioButtonCollectionIsExistingResult = boolean[];
declare class RadioButtonElement extends BaseElement {
    constructor(page: any, parentLocator: any, elementRootSelector: any, name: any, options?: any);
    sendKeys(checkObj: RadioButtonSendKeys): Promise<void>;
    perform(action: RadioButtonPerform): Promise<void>;
    protected click(): Promise<void>;
    get(getObj: IRadioButtonGet): Promise<IRadioButtonGetReturn>;
}
export { RadioButtonElement, RadioButtonSendKeys, RadioButtonGet, RadioButtonGetResult, RadioButtonCollectionSendKeys, RadioButtonCollectionGet, RadioButtonCollectionWaitForDataState, RadioButtonCollectionWaitForDisplayedState, RadioButtonWaitForDisplayedState, RadioButtonWaitForDataState, RadioButtonIsDisplayed, RadioButtonPerform, RadioButtonIsDisplayedResult, RadioButtonIsExist, RadioButtonIsExistResult, RadioButtonGetScreenshot, RadioButtonCollectionGetResult, RadioButtonCollectionPerform, RadioButtonCollectionIsDisplayed, RadioButtonCollectionIsDisplayedResult, RadioButtonCollectionIsExisting, RadioButtonCollectionIsExistingResult, getRadioButtonData, };
//# sourceMappingURL=radio.button.d.ts.map