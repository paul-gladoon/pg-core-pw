"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserFiler = void 0;
class BrowserFiler {
    constructor(page) {
        this.name = 'Browser Filer';
        this.page = page;
    }
    getPage() {
        return this.page();
    }
    async sendKeys({ download, upload }) {
        if (download) {
            const { action, path, predicate, timeout = 10000 } = download;
            const downloadPromise = this.page().waitForEvent('download', { predicate, timeout });
            await action();
            const downloadResult = await downloadPromise;
            const failure = await downloadResult.failure();
            if (failure !== null) {
                throw new Error(failure);
            }
            if (path)
                await downloadResult.saveAs(path + downloadResult.suggestedFilename());
        }
        if (upload) {
            const { action, files, predicate, timeout = 10000 } = upload;
            const fileChooserPromise = this.page().waitForEvent('filechooser', { predicate, timeout });
            await action();
            const fileChooser = await fileChooserPromise;
            await fileChooser.setFiles(files);
        }
    }
}
exports.BrowserFiler = BrowserFiler;
//# sourceMappingURL=browser.filer.js.map