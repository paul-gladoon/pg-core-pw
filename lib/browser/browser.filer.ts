import {type Page, type Download, type FileChooser} from '@playwright/test'

type IBrowserFilerPayload = {name: string; mimeType: string; buffer: Buffer}

interface IBrowserFilerDownload {
  action: () => Promise<void>
  path?: string
  predicate?: (download: Download) => boolean | Promise<boolean>
  timeout?: number
}

interface IBrowserFilerUpload {
  action: () => Promise<void>
  files: string | string[] | IBrowserFilerPayload | IBrowserFilerPayload[]
  predicate?: (fileChooser: FileChooser) => boolean | Promise<boolean>
  timeout?: number
}

interface IBrowserFilerSendKeys {
  download?: IBrowserFilerDownload
  upload?: IBrowserFilerUpload
}

class BrowserFiler {
  private name: string
  protected page: () => Page

  constructor(page: () => Page) {
    this.name = 'Browser Filer'
    this.page = page
  }

  protected getPage(): Page {
    return this.page()
  }

  async sendKeys({download, upload}: IBrowserFilerSendKeys) {
    if (download) {
      const {action, path, predicate, timeout = 10000} = download
      const downloadPromise = this.page().waitForEvent('download', {predicate, timeout})
      await action()
      const downloadResult = await downloadPromise
      const failure = await downloadResult.failure()

      if (failure !== null) {
        throw new Error(failure)
      }

      if (path) await downloadResult.saveAs(path + downloadResult.suggestedFilename())
    }

    if (upload) {
      const {action, files, predicate, timeout = 10000} = upload
      const fileChooserPromise = this.page().waitForEvent('filechooser', {predicate, timeout})
      await action()
      const fileChooser = await fileChooserPromise
      await fileChooser.setFiles(files)
    }
  }
}

export {BrowserFiler, IBrowserFilerSendKeys, IBrowserFilerDownload, IBrowserFilerUpload, IBrowserFilerPayload}
