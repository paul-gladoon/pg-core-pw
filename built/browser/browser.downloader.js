"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserDownloader = void 0;
class BrowserDownloader {
    constructor(page) {
        this.name = 'Browser Downloader';
        this.page = page;
    }
    getPage() {
        return this.page();
    }
    async sendKeys({ startDownloadAction, optionsOrPredicate: { predicate, timeout = 10000 } = {}, path }) {
        const downloadPromise = this.page().waitForEvent('download', { predicate, timeout });
        await startDownloadAction();
        const download = await downloadPromise;
        const result = await download.failure();
        if (result !== null) {
            throw new Error(result);
        }
        if (path)
            await download.saveAs(path + download.suggestedFilename());
    }
}
exports.BrowserDownloader = BrowserDownloader;
//# sourceMappingURL=browser.downloader.js.map