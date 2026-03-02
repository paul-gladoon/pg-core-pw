import { type Page, type Download } from '@playwright/test';
interface IBrowserDownloaderSendKeys {
    startDownloadAction: () => Promise<void>;
    optionsOrPredicate?: {
        predicate?: (download: Download) => boolean | Promise<boolean>;
        timeout?: number;
    };
    path?: string;
}
declare class BrowserDownloader {
    private name;
    protected page: () => Page;
    constructor(page: () => Page);
    protected getPage(): Page;
    sendKeys({ startDownloadAction, optionsOrPredicate: { predicate, timeout }, path }: IBrowserDownloaderSendKeys): Promise<void>;
}
export { BrowserDownloader, IBrowserDownloaderSendKeys };
//# sourceMappingURL=browser.downloader.d.ts.map