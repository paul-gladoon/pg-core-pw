import { BaseElement } from './base.element';
import { type Page, type Locator } from '@playwright/test';
import { IBaseInitOptions, IChainLocatorOptions } from './base.types';
declare class BaseRootElement extends BaseElement {
    constructor(page: () => Page, parentLocator: () => Locator, elementRootSelector: string | Array<string | {
        selector: string;
        opts: IChainLocatorOptions;
    }>, name: string, options?: IBaseInitOptions);
    get element(): Locator;
}
export { BaseRootElement };
//# sourceMappingURL=base.root.element.d.ts.map