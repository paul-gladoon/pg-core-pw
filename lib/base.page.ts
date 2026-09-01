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
import {BrowserFiler} from './browser/browser.filer'

interface IBasePage {
  _actioner?: BrowserActioner
  _consoler?: BrowserConsoler
  _tabber?: BrowserTabber
  _filer?: BrowserFiler
  _page?: Page
}

class BasePage {
  protected browserContext: BrowserContext
  protected page: Page
  protected name: string
  protected pageRootSelector: string
  protected _root: BaseRootElement
  public _actioner: BrowserActioner
  public _consoler: BrowserConsoler
  public _tabber: BrowserTabber
  public _filer: BrowserFiler

  constructor(browserContext: BrowserContext, page: Page, pageRootSelector: string, name: string) {
    this.browserContext = browserContext
    this.page = page
    this.name = name
    this.pageRootSelector = pageRootSelector
    this._actioner = new BrowserActioner(this.getPage.bind(this))
    this._consoler = new BrowserConsoler(this.getPage.bind(this))
    this._filer = new BrowserFiler(this.getPage.bind(this))
    this._tabber = new BrowserTabber(browserContext, this.setPage.bind(this), this.getPage.bind(this))
    this._root = this.init(BaseRootElement, pageRootSelector, `_root ${this.name} element`)
  }

  protected element(): Locator {
    return this.getPage().locator(this.pageRootSelector)
  }

  protected setPage(page: Page) {
    this.page = page
  }

  protected getPage(): Page {
    return this.page
  }

  public get _page(): Page {
    return this.page
  }

  private async waitForPageToBeReady() {
    await this.page.waitForLoadState()
    await this.waitVisible()
  }

  async perform(performObj: object) {
    if (!isPlainObject(performObj)) {
      throw new Error(`${this.name} perform argument should be an object`)
    }
    await this.waitForPageToBeReady()
    for (const key of Object.keys(performObj)) {
      if (!this[key]) {
        throw new Error(`${this.name} does not have ${key} property`)
      }
      await this[key].perform(performObj[key])
    }
  }

  async get(getObj: object) {
    if (!isPlainObject(getObj)) {
      throw new Error(`${this.name} get argument should be an object`)
    }
    await this.waitForPageToBeReady()
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
    await this.waitForPageToBeReady()
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
    await this.waitForPageToBeReady()
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
    await this.waitForPageToBeReady()
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
    await this.waitForPageToBeReady()
    for (const key of Object.keys(sendObj)) {
      if (!this[key]) {
        throw new Error(`${this.name} does not have ${key} property`)
      }
      await this[key].sendKeys(sendObj[key])
    }
  }

  async waitForDataState(dataState: object, waitTime: number = 3000, dontThrowError: boolean = true) {
    if (!isPlainObject(dataState)) {
      throw new Error(`${this.name} waitForDataState argument should be an object`)
    }
    await this.waitForPageToBeReady()
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
    await this.waitForPageToBeReady()
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
    return new ClassName(this.getPage.bind(this), this.element.bind(this), rootSelector, name, options)
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
    return new ClassName(this.getPage.bind(this), this.element.bind(this), collectionType, rootSelector, name, options)
  }
}

export {BasePage, Page, Locator, IBasePage}
