import {type Locator, type Page} from '@playwright/test';
import {isPlainObject} from './utils/helpers';
import {waiter} from './utils/waiter';
import {IBaseInitOptions, BaseFragment, BaseElement, CollectionElements, ICollectionInitOptions} from './base.types'

class BasePage {
  private page: Page
  private root: Locator
  private name: string
  private url: string

  constructor(page: Page, pageRootSelector: string, name: string, url: string) {
    this.page = page
    this.root = page.locator(pageRootSelector)
    this.name = name
    this.url = url
  }

  get element(): Locator {
    return this.root
  }

  async goToPage(goToObj?: object) {
    await this.page.goto(this.url)
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
    await waiter.waitFor(this.element)
  }

  protected async waitExist() {
    await waiter.waitFor(this.element, {state: 'attached'})
  }

  protected init<T extends BaseFragment | BaseElement>(ClassName: new (page: Page, parentLocator: Locator, rootSelector: string, name: string, options?: IBaseInitOptions) => T, rootSelector: string, name: string, options?: IBaseInitOptions) {
    return new ClassName(this.page, this.element, rootSelector, name, options)
  }

  protected initCollection<T extends CollectionElements>(ClassName: new (page: Page, parentLocator: Locator, collectionType: typeof BaseElement, rootSelector: string, name: string, options?: ICollectionInitOptions) => T, collectionType: typeof BaseElement, rootSelector: string, name: string, options?: ICollectionInitOptions) {
    return new ClassName(this.page, this.element, collectionType, rootSelector, name, options)
  }
}

export {BasePage, Page, Locator}