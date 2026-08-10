import { BaseElement, BaseElementPerformScroll, IGeneralActionsOptions, IScrollOptions } from '../base.element';
interface ISelectGet {
    selected?: null;
    isDisabled?: null;
    attribute?: string | string[];
}
interface ISelectGetResult {
    selected?: string;
    isDisabled?: boolean;
}
declare function getSelectedData(_element: any, { getObj, getValues }: {
    getObj: any;
    getValues: any;
}): any;
interface ISelectCollectionWaitForDataState {
    _where?: ISelectGetResult;
    _every?: boolean;
    _some?: boolean;
    _index?: number;
    _includes?: boolean;
    _length?: number | string;
}
interface ISelectCollectionWaitForDisplayedState {
    _state: boolean;
    _every?: boolean;
    _some?: boolean;
    _index?: number;
}
interface ISelectWaitForDataState {
    _where: ISelectGetResult;
    _includes?: boolean;
}
interface ISelectCollectionPerformScroll extends IScrollOptions {
    _action: 'scroll';
    _where?: SelectGetResult;
    _index?: number;
}
type SelectSendKeys = string | string[] | {
    value?: string;
    label?: string;
    index?: number;
    opts?: IGeneralActionsOptions;
};
type SelectPerform = BaseElementPerformScroll;
type SelectCollectionPerform = ISelectCollectionPerformScroll;
type SelectIsDisplayed = null;
type SelectIsDisplayedResult = boolean;
type SelectGet = ISelectGet;
type SelectGetResult = ISelectGetResult;
type SelectCollectionWaitForDataState = ISelectCollectionWaitForDataState;
type SelectCollectionWaitForDisplayedState = ISelectCollectionWaitForDisplayedState;
type SelectWaitForDisplayedState = boolean;
type SelectWaitForDataState = ISelectWaitForDataState;
declare class SelectElement extends BaseElement {
    constructor(page: any, parentLocator: any, elementRootSelector: any, name: any, options?: any);
    sendKeys(sendObj: SelectSendKeys): Promise<void>;
    get(getObj: ISelectGet): Promise<any>;
    perform(action: SelectPerform): Promise<void>;
    protected click(): Promise<void>;
    protected hover(): Promise<void>;
}
export { SelectElement, SelectSendKeys, SelectIsDisplayed, SelectIsDisplayedResult, SelectGet, SelectGetResult, SelectCollectionWaitForDataState, SelectCollectionWaitForDisplayedState, SelectWaitForDisplayedState, SelectWaitForDataState, SelectPerform, SelectCollectionPerform, getSelectedData, };
//# sourceMappingURL=select.d.ts.map