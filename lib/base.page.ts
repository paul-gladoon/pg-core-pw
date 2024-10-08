import {type BrowserContext, type Locator, type Page} from '@playwright/test'
import {isPlainObject} from './utils/helpers'
import {waiter} from './utils/waiter'
import {
  IBaseInitOptions,
  BaseFragment,
  BaseElement,
  CollectionElements,
  ICollectionInitOptions,
  CollectionFragments,
  IChainLocatorOptions,
} from './base.types'
import {BrowserActioner} from './browser/browser.actioner'
import {BrowserConsoler} from './browser/browser.consoler'
import {BrowserTabber} from './browser/browser.tabber'
import {BaseRootElement} from './base.root.element'
import {BrowserDownloader} from './browser/browser.downloader'

interface IBasePage {
  _actioner?: BrowserActioner
  _consoler?: BrowserConsoler
  _tabber?: BrowserTabber
  _downloader?: BrowserDownloader
}

class BasePage {
  protected browserContext: BrowserContext
  protected page: Page
  protected name: string
  protected url: string
  protected pageRootSelector: string
  protected _root: BaseRootElement
  public _actioner: BrowserActioner
  public _consoler: BrowserConsoler
  public _tabber: BrowserTabber
  public _downloader: BrowserDownloader

  constructor(browserContext: BrowserContext, page: Page, pageRootSelector: string, name: string, url: string) {
    this.browserContext = browserContext
    this.page = page
    this.name = name
    this.url = url
    this.pageRootSelector = pageRootSelector
    this._actioner = new BrowserActioner(this.getCurrentPage.bind(this))
    this._consoler = new BrowserConsoler(this.getCurrentPage.bind(this))
    this._downloader = new BrowserDownloader(this.getCurrentPage.bind(this))
    this._tabber = new BrowserTabber(browserContext, this.setCurrentPage.bind(this), this.getCurrentPage.bind(this))
    this._root = this.init(BaseRootElement, pageRootSelector, `_root ${this.name} element`)
  }

  protected element(): Locator {
    return this.getCurrentPage().locator(this.pageRootSelector)
  }

  protected setCurrentPage(page: Page) {
    this.page = page
  }

  protected getCurrentPage(): Page {
    return this.page
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async goToPage(args?: object) {
    await this.page.goto(this.url, args)
  }

  async click(clickObj: object) {
    if (!isPlainObject(clickObj)) {
      throw new Error(`${this.name} click argument should be an object`)
    }
    await this.waitVisible()
    for (const key of Object.keys(clickObj)) {
      if (!this[key]) {
        throw new Error(`${this.name} does not have ${key} property`)
      }
      await this[key].click(clickObj[key])
    }
  }

  async get(getObj: object) {
    if (!isPlainObject(getObj)) {
      throw new Error(`${this.name} get argument should be an object`)
    }
    await this.waitVisible()
    const tempGet = {...getObj}
    for (const key of Object.keys(tempGet)) {
      if (!this[key]) {
        throw new Error(`${this.name} does not have ${key} property`)
      }
      tempGet[key] = await this[key].get(tempGet[key])
    }

    return tempGet
  }

  async isDisplay(isDispObj: object) {
    if (!isPlainObject(isDispObj)) {
      throw new Error(`${this.name} isDisplay argument should be an object`)
    }
    await this.waitVisible()
    const tempGet = {...isDispObj}
    for (const key of Object.keys(tempGet)) {
      if (!this[key]) {
        throw new Error(`${this.name} does not have ${key} property`)
      }
      tempGet[key] = await this[key].isDisplay(tempGet[key])
    }

    return tempGet
  }

  async isExist(isExistObj: object) {
    if (!isPlainObject(isExistObj)) {
      throw new Error(`${this.name} isExist argument should be an object`)
    }
    await this.waitVisible()
    const tempGet = {...isExistObj}
    for (const key of Object.keys(tempGet)) {
      if (!this[key]) {
        throw new Error(`${this.name} does not have ${key} property`)
      }
      tempGet[key] = await this[key].isExist(tempGet[key])
    }

    return tempGet
  }

  async getScreenshot(scrObject: object) {
    if (!scrObject) {
      throw new Error(`${this.name} get screenshot argument should be an object`)
    }
    await this.waitVisible()
    for (const key of Object.keys(scrObject)) {
      if (!this[key]) {
        throw new Error(`${this.name} does not have ${key} property`)
      }
      await this[key].getScreenshot(scrObject[key])
    }
  }

  async sendKeys(sendObj: object) {
    if (!isPlainObject(sendObj)) {
      throw new Error(`${this.name} sendKeys argument should be an object`)
    }
    await this.waitVisible()
    for (const key of Object.keys(sendObj)) {
      if (!this[key]) {
        throw new Error(`${this.name} does not have ${key} property`)
      }
      await this[key].sendKeys(sendObj[key])
    }
  }

  async scroll(scrollObj: object) {
    if (!isPlainObject(scrollObj)) {
      throw new Error(`${this.name} scroll argument should be an object`)
    }
    await this.waitVisible()
    for (const key of Object.keys(scrollObj)) {
      if (!this[key]) {
        throw new Error(`${this.name} does not have ${key} property`)
      }
      await this[key].scroll(scrollObj[key])
    }
  }

  async hover(hoverObj: object) {
    if (!isPlainObject(hoverObj)) {
      throw new Error(`${this.name} hover argument should be an object`)
    }
    await this.waitVisible()
    for (const key of Object.keys(hoverObj)) {
      if (!this[key]) {
        throw new Error(`${this.name} does not have ${key} property`)
      }
      await this[key].hover(hoverObj[key])
    }
  }

  async waitForDataState(dataState: object, waitTime: number = 3000, dontThrowError: boolean = true) {
    if (!isPlainObject(dataState)) {
      throw new Error(`${this.name} waitForDataState argument should be an object`)
    }
    await this.waitVisible()
    const tempListOfStatesResult: boolean[] = []
    for (const key of Object.keys(dataState)) {
      if (!this[key]) {
        throw new Error(`${this.name} does not have ${key} property`)
      }
      tempListOfStatesResult.push(await this[key].waitForDataState(dataState[key], waitTime, dontThrowError))
    }

    return tempListOfStatesResult.every((stateResult) => stateResult)
  }

  async waitForDisplayedState(dataState: object, waitTime: number = 3000, dontThrowError: boolean = true) {
    if (!isPlainObject(dataState)) {
      throw new Error(`${this.name} waitForDisplayedState argument should be an object`)
    }
    await this.waitVisible()
    const tempListOfStatesResult: boolean[] = []
    for (const key of Object.keys(dataState)) {
      if (!this[key]) {
        throw new Error(`${this.name} does not have ${key} property`)
      }
      tempListOfStatesResult.push(await this[key].waitForDisplayedState(dataState[key], waitTime, dontThrowError))
    }

    return tempListOfStatesResult.every((stateResult) => stateResult)
  }

  protected async waitVisible() {
    await waiter.waitFor(this.element(), this.name)
  }

  protected async waitExist() {
    await waiter.waitFor(this.element(), this.name, {state: 'attached'})
  }

  protected init<T extends BaseFragment | BaseElement>(
    ClassName: new (
      page: () => Page,
      parentLocator: () => Locator,
      rootSelector: string | Array<string | {selector: string; opts: IChainLocatorOptions}>,
      name: string,
      options?: IBaseInitOptions
    ) => T,
    rootSelector: string | Array<string | {selector: string; opts: IChainLocatorOptions}>,
    name: string,
    options?: IBaseInitOptions
  ) {
    return new ClassName(this.getCurrentPage.bind(this), this.element.bind(this), rootSelector, name, options)
  }

  protected initCollection<T extends CollectionElements | CollectionFragments>(
    ClassName: new (
      page: () => Page,
      parentLocator: () => Locator,
      collectionType,
      rootSelector: string,
      name: string,
      options?: ICollectionInitOptions
    ) => T,
    collectionType,
    rootSelector: string,
    name: string,
    options?: ICollectionInitOptions
  ) {
    return new ClassName(this.getCurrentPage.bind(this), this.element.bind(this), collectionType, rootSelector, name, options)
  }
}

export {BasePage, Page, Locator, IBasePage}
