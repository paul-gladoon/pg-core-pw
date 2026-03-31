import { BrowserContext, type Page } from '@playwright/test';
interface IBrowserTabberWaits {
    timeout?: number;
    waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit';
}
interface IBrowserTabberGoToPage extends IBrowserTabberWaits {
    referer?: string;
    urlCheck?: boolean;
}
interface IBrowserTabberSendKeys {
    switchTab?: {
        index?: number;
        url?: string;
        title?: string;
        defaultTab?: boolean;
    };
    refresh?: boolean | IBrowserTabberWaits;
    newTab?: string;
    setWindowSize?: {
        width: number;
        height: number;
    };
    goto?: string | {
        url: string;
        opts: IBrowserTabberGoToPage;
    };
}
interface IBrowserTabberGet {
    url?: null;
    title?: null;
    tabsUrls?: null;
    tabsLength?: null;
    windowSize?: null;
}
interface IBrowserTabberGetResult {
    url?: string;
    title?: string;
    tabsUrls?: string[];
    tabsLength?: number;
    windowSize?: {
        width: number;
        height: number;
    };
}
interface IBrowserTabberGetWaitForDataState {
    url?: string;
    title?: string;
    tabsLength?: number;
    windowSize?: {
        width: number;
        height: number;
    };
}
interface IBrowserTabberWaitForDataState {
    expectedState: IBrowserTabberGetWaitForDataState;
    includes?: boolean;
}
declare class BrowserTabber {
    private name;
    private browserConext;
    private pageSetter;
    protected page: () => Page;
    constructor(browserContext: BrowserContext, pageSetter: (page: Page) => void, page: () => Page);
    protected getPage(): Page;
    sendKeys({ switchTab, refresh, newTab, setWindowSize, goto }: IBrowserTabberSendKeys): Promise<void>;
    get(data: IBrowserTabberGet): Promise<IBrowserTabberGetResult>;
    waitForDataState({ expectedState, includes }: IBrowserTabberWaitForDataState, waitTime?: number, dontThrowError?: boolean): Promise<any>;
}
export { BrowserTabber, IBrowserTabberGet, IBrowserTabberGetResult, IBrowserTabberWaitForDataState, IBrowserTabberSendKeys };
//# sourceMappingURL=browser.tabber.d.ts.map