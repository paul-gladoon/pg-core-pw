import { type Locator, type Page } from '@playwright/test';
import { BaseElement, ICollectionInitOptions } from '../base.types';
import { BaseElementCollectionPerform, BaseElementCollectionGet, BaseElementCollectionIsDisplayed, BaseElementCollectionIsExisting, BaseElementCollectionWaitForDataState, BaseElementCollectionWaitForDisplayedState } from '../base.element';
declare class CollectionElements {
    protected page: () => Page;
    private parentLocator;
    protected name: string;
    private elementsRootSelector;
    private options?;
    private elementsType;
    private elements;
    constructor(page: () => Page, parentLocator: () => Locator, elementsType: typeof BaseElement, elementsRootSelector: string, name: string, options?: ICollectionInitOptions);
    protected get parentElement(): Locator;
    private get preparedListElements();
    private setCurrentElements;
    private transformValues;
    private _all;
    private _index;
    private _where;
    perform(dataObject: BaseElementCollectionPerform): Promise<void>;
    waitForDataState(dataObject: BaseElementCollectionWaitForDataState, waitTime: number, dontThrowError: boolean): Promise<any>;
    waitForDisplayedState(dataObject: BaseElementCollectionWaitForDisplayedState, waitTime: number, dontThrowError: boolean): Promise<any>;
    get(dataObject: BaseElementCollectionGet): Promise<any>;
    sendKeys(dataObject: {
        _action: any;
        _index: any;
        _where: any;
    }): Promise<void>;
    isDisplay(dataObject: BaseElementCollectionIsDisplayed): Promise<any>;
    isExist(dataObject: BaseElementCollectionIsExisting): Promise<any>;
}
export { CollectionElements };
//# sourceMappingURL=collection.elements.d.ts.map