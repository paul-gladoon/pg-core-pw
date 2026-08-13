import { type Page } from '@playwright/test';
interface IBrowserConsolerGet {
    readyState?: null;
    cookiesLength?: null;
}
interface IBrowserConsolerSendKeys {
    clearState?: boolean;
    clearClipboard?: boolean;
    hideScrollBarFrom?: string;
    removeNode?: string | string[];
    setStyleForNode?: {
        selector: string;
        styleName: string;
        value: string;
    };
}
interface IBrowserConsolerGetResult {
    readyState?: string;
    cookiesLength?: number;
}
declare class BrowserConsoler {
    private name;
    protected page: () => Page;
    constructor(page: () => Page);
    protected getPage(): Page;
    sendKeys(sendObj: IBrowserConsolerSendKeys): Promise<void>;
    get(getObj: IBrowserConsolerGet): Promise<IBrowserConsolerGetResult>;
}
export { BrowserConsoler, IBrowserConsolerGet, IBrowserConsolerGetResult, IBrowserConsolerSendKeys };
//# sourceMappingURL=browser.consoler.d.ts.map