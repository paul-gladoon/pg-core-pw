import { BaseElement, BaseElementCollectionIsExisting, BaseElementGetScreenshot, BaseElementHover, BaseElementScroll, IGeneralActionsOptions } from '../base.element';
interface ICheckedOptions extends IGeneralActionsOptions {
    position?: {
        x: number;
        y: number;
    };
    trial?: boolean;
}
interface ICheckBoxGetValues {
    checked?: null;
    isDisabled?: null;
}
interface ICheckBoxReturn {
    checked?: boolean;
    isDisabled?: boolean;
}
declare function getCheckBoxData(_element: any, { getObj, getValues }: {
    getObj: any;
    getValues: any;
}): any;
interface ICheckBoxCollectionWaitForDataState {
    _where?: ICheckBoxReturn;
    _every?: boolean;
    _some?: boolean;
    _index?: number;
    _includes?: boolean;
    _length?: number | string;
}
interface ICheckBoxCollectionWaitForDisplayedState {
    _state: boolean;
    _every?: boolean;
    _some?: boolean;
    _index?: number;
}
interface ICheckBoxWaitForDataState {
    _where: ICheckBoxReturn;
    _includes?: boolean;
}
interface ICheckBoxCollectionGet {
    _action?: CheckBoxGet;
    _where?: CheckBoxGetResult;
    _index?: number;
    _length?: null;
}
interface ICheckBoxCollectionIsDisplayed {
    _action: null;
    _where?: CheckBoxGetResult;
    _index?: number;
}
interface ICheckBoxCollectionHover {
    _action: CheckBoxHover;
    _where?: CheckBoxGetResult;
    _index?: number;
}
interface ICheckBoxCollectionSendKeys {
    _action: CheckBoxSendKeys;
    _where?: CheckBoxGetResult;
    _index?: number;
}
type CheckBoxSendKeys = boolean | {
    state: boolean;
    opts: ICheckedOptions;
};
type CheckBoxGet = ICheckBoxGetValues;
type CheckBoxGetResult = ICheckBoxReturn;
type CheckBoxIsDisplayed = null;
type CheckBoxHover = BaseElementHover;
type CheckBoxIsDisplayedResult = boolean;
type CheckBoxCollectionWaitForDataState = ICheckBoxCollectionWaitForDataState;
type CheckBoxCollectionWaitForDisplayedState = ICheckBoxCollectionWaitForDisplayedState;
type CheckBoxWaitForDisplayedState = boolean;
type CheckBoxWaitForDataState = ICheckBoxWaitForDataState;
type CheckBoxIsExist = null;
type CheckBoxScroll = BaseElementScroll;
type CheckBoxGetScreenshot = BaseElementGetScreenshot;
type CheckBoxCollectionGet = ICheckBoxCollectionGet;
type CheckBoxCollectionGetResult = CheckBoxGetResult | CheckBoxGetResult[];
type CheckBoxCollectionHover = ICheckBoxCollectionHover;
type CheckBoxCollectionIsDisplayed = ICheckBoxCollectionIsDisplayed;
type CheckBoxCollectionIsDisplayedResult = boolean[] | boolean;
type CheckBoxCollectionIsExisting = BaseElementCollectionIsExisting;
type CheckBoxCollectionIsExistingResult = boolean[] | boolean;
type CheckBoxCollectionSendKeys = ICheckBoxCollectionSendKeys;
declare class CheckBoxElement extends BaseElement {
    constructor(page: any, parentLocator: any, elementRootSelector: any, name: any, options?: any);
    sendKeys(checkObj: CheckBoxSendKeys): Promise<void>;
    click(): Promise<void>;
    get(getObj: ICheckBoxGetValues): Promise<ICheckBoxReturn>;
}
export { CheckBoxElement, CheckBoxSendKeys, CheckBoxGet, CheckBoxGetResult, CheckBoxIsDisplayed, CheckBoxIsDisplayedResult, CheckBoxHover, getCheckBoxData, CheckBoxCollectionWaitForDataState, CheckBoxCollectionWaitForDisplayedState, CheckBoxWaitForDisplayedState, CheckBoxWaitForDataState, CheckBoxIsExist, CheckBoxScroll, CheckBoxGetScreenshot, CheckBoxCollectionGet, CheckBoxCollectionGetResult, CheckBoxCollectionHover, CheckBoxCollectionIsDisplayed, CheckBoxCollectionIsDisplayedResult, CheckBoxCollectionIsExisting, CheckBoxCollectionIsExistingResult, CheckBoxCollectionSendKeys, };
//# sourceMappingURL=checkbox.d.ts.map