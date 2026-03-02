import { BaseElement, BaseElementCollectionIsExisting, BaseElementGetScreenshot, BaseElementHover, BaseElementScroll, IGeneralActionsOptions } from '../base.element';
interface ITogglerOptions extends IGeneralActionsOptions {
    position?: {
        x: number;
        y: number;
    };
    trial?: boolean;
}
interface ITogglerGet {
    checked?: null;
    text?: null;
    isDisabled?: null;
}
interface ITogglerGetReturn {
    checked?: boolean;
    text?: string;
    isDisabled?: boolean;
}
interface ITogglerCollectionSendKeys {
    _action: TogglerSendKeys;
    _where?: TogglerGetResult;
    _index?: number;
}
interface ITogglerCollectionGet {
    _action?: TogglerGet;
    _where?: TogglerGetResult;
    _index?: number;
    _length?: null;
}
declare function getTogglerData(_element: any, { getObj, getValues }: {
    getObj: any;
    getValues: any;
}): any;
interface ITogglerCollectionWaitForDataState {
    _where?: TogglerGetResult;
    _every?: boolean;
    _some?: boolean;
    _index?: number;
    _includes?: boolean;
    _length?: number | string;
}
interface ITogglerCollectionWaitForDisplayedState {
    _state: boolean;
    _every?: boolean;
    _some?: boolean;
    _index?: number;
}
interface ITogglerWaitForDataState {
    _where: TogglerGetResult;
    _includes?: boolean;
}
interface ITogglerCollectionHover {
    _action: TogglerHover;
    _where?: TogglerGetResult;
    _index?: number;
}
interface ITogglerCollectionIsDisplayed {
    _action: null;
    _where?: TogglerGetResult;
    _index?: number;
}
type TogglerSendKeys = boolean | {
    state: boolean;
    opts: ITogglerOptions;
};
type TogglerGet = ITogglerGet;
type TogglerGetResult = ITogglerGetReturn;
type TogglerCollectionSendKeys = ITogglerCollectionSendKeys;
type TogglerCollectionGet = ITogglerCollectionGet;
type TogglerIsDisplayed = null;
type TogglerIsDisplayedResult = boolean;
type TogglerScroll = BaseElementScroll;
type TogglerCollectionWaitForDataState = ITogglerCollectionWaitForDataState;
type TogglerCollectionWaitForDisplayedState = ITogglerCollectionWaitForDisplayedState;
type TogglerWaitForDisplayedState = boolean;
type TogglerWaitForDataState = ITogglerWaitForDataState;
type TogglerHover = BaseElementHover;
type TogglerIsExist = null;
type TogglerGetScreenshot = BaseElementGetScreenshot;
type TogglerCollectionGetResult = TogglerGetResult | TogglerGetResult[];
type TogglerCollectionHover = ITogglerCollectionHover;
type TogglerCollectionIsDisplayed = ITogglerCollectionIsDisplayed;
type TogglerCollectionIsDisplayedResult = boolean[] | boolean;
type TogglerCollectionIsExisting = BaseElementCollectionIsExisting;
type TogglerCollectionIsExistingResult = boolean[] | boolean;
declare class TogglerElement extends BaseElement {
    constructor(page: any, parentLocator: any, elementRootSelector: any, name: any, options?: any);
    sendKeys(checkObj: TogglerSendKeys): Promise<void>;
    click(): Promise<void>;
    get(getObj: ITogglerGet): Promise<ITogglerGetReturn>;
}
export { TogglerElement, TogglerSendKeys, TogglerGet, TogglerGetResult, TogglerCollectionSendKeys, TogglerCollectionGet, getTogglerData, TogglerIsDisplayed, TogglerIsDisplayedResult, TogglerScroll, TogglerCollectionWaitForDataState, TogglerCollectionWaitForDisplayedState, TogglerWaitForDisplayedState, TogglerWaitForDataState, TogglerHover, TogglerIsExist, TogglerGetScreenshot, TogglerCollectionGetResult, TogglerCollectionHover, TogglerCollectionIsDisplayed, TogglerCollectionIsDisplayedResult, TogglerCollectionIsExisting, TogglerCollectionIsExistingResult, };
//# sourceMappingURL=toggler.d.ts.map