import { type Locator, type Page } from '@playwright/test';
import { BaseFragment, ICollectionInitOptions } from '../base.types';
interface ICollectionFragmentsAction {
    _index?: number;
    _where?: object;
}
interface ICollectionFragmentsGet {
    _index?: number;
    _where?: object;
    _length?: null;
}
interface ICollectionFragmentsWaitForDataState {
    _where?: object;
    _every?: boolean;
    _some?: boolean;
    _index?: number;
    _length?: number | string;
}
interface ICollectionFragmentsWaitForDisplayedState {
    _where?: object;
    _state: object;
    _every?: boolean;
    _some?: boolean;
    _index?: number;
}
type CollectionFragmentsWaitForDisplayedState = ICollectionFragmentsWaitForDisplayedState;
type CollectionFragmentsGet = ICollectionFragmentsGet;
type CollectionFragmentsWaitForDataState = ICollectionFragmentsWaitForDataState;
type CollectionFragmentsAction = ICollectionFragmentsAction;
declare class CollectionFragments {
    protected page: () => Page;
    private parentLocator;
    protected name: string;
    private fragmentsRootSelector;
    private options?;
    private fragmentsType;
    private fragments;
    constructor(page: () => Page, parentLocator: () => Locator, fragmentsType: typeof BaseFragment, fragmentsRootSelector: string, name: string, options?: ICollectionInitOptions);
    protected get parentElement(): Locator;
    private get preparedListFragments();
    private setCurrentFragments;
    private transformValues;
    private castValuesToBoolean;
    private _index;
    private _where;
    private _all;
    perform(dataObject: ICollectionFragmentsAction): Promise<void>;
    sendKeys(dataObject: ICollectionFragmentsAction): Promise<void>;
    get(dataObject: ICollectionFragmentsGet): Promise<any>;
    isDisplay(dataObject: ICollectionFragmentsAction): Promise<any>;
    isExist(dataObject: ICollectionFragmentsAction): Promise<any>;
    waitForDataState(dataObject: ICollectionFragmentsWaitForDataState, waitTime: number, dontThrowError: boolean): Promise<any>;
    waitForDisplayedState(dataObject: ICollectionFragmentsWaitForDisplayedState, waitTime: number, dontThrowError: boolean): Promise<any>;
}
export { CollectionFragments, CollectionFragmentsWaitForDisplayedState, CollectionFragmentsGet, CollectionFragmentsWaitForDataState, CollectionFragmentsAction, };
//# sourceMappingURL=collection.fragments.d.ts.map