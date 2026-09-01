import { type Page, type Download, type FileChooser } from '@playwright/test';
type IBrowserFilerPayload = {
    name: string;
    mimeType: string;
    buffer: Buffer;
};
interface IBrowserFilerDownload {
    action: () => Promise<void>;
    path?: string;
    predicate?: (download: Download) => boolean | Promise<boolean>;
    timeout?: number;
}
interface IBrowserFilerUpload {
    action: () => Promise<void>;
    files: string | string[] | IBrowserFilerPayload | IBrowserFilerPayload[];
    predicate?: (fileChooser: FileChooser) => boolean | Promise<boolean>;
    timeout?: number;
}
interface IBrowserFilerSendKeys {
    download?: IBrowserFilerDownload;
    upload?: IBrowserFilerUpload;
}
declare class BrowserFiler {
    private name;
    protected page: () => Page;
    constructor(page: () => Page);
    protected getPage(): Page;
    sendKeys({ download, upload }: IBrowserFilerSendKeys): Promise<void>;
}
export { BrowserFiler, IBrowserFilerSendKeys, IBrowserFilerDownload, IBrowserFilerUpload, IBrowserFilerPayload };
//# sourceMappingURL=browser.filer.d.ts.map