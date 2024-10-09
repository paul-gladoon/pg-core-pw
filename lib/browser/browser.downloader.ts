import {type Page, type Download} from '@playwright/test'

interface IBrowserDownloaderSendKeys {
  startDownloadAction: () => Promise<void>
  optionsOrPredicate?: {predicate?: (download: Download) => boolean | Promise<boolean>; timeout?: number}
  path?: string
}

class BrowserDownloader {
  private name: string
  private page: () => Page

  constructor(page: () => Page) {
    this.name = 'Browser Downloader'
    this.page = page
  }

  protected getCurrentPage() {
    return this.page()
  }

  async sendKeys({startDownloadAction, optionsOrPredicate: {predicate, timeout = 10000} = {}, path}: IBrowserDownloaderSendKeys) {
    const downloadPromise = this.page().waitForEvent('download', {predicate, timeout})
    await startDownloadAction()
    const download = await downloadPromise
    const result = await download.failure()

    if (result !== null) {
      throw new Error(result)
    }

    if (path) await download.saveAs(path + download.suggestedFilename())
  }
}

export {BrowserDownloader, IBrowserDownloaderSendKeys}
