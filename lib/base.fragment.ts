import {type FrameLocator, type Locator, type Page} from '@playwright/test'
import {isPlainObject} from './utils/helpers'
import {collectPerformVerbs} from './utils/perform'
import {waiter} from './utils/waiter'
import {
  IBaseInitOptions,
  BaseElement,
  CollectionElements,
  ICollectionInitOptions,
  CollectionFragments,
  IChainLocatorOptions,
} from './base.types'
import {BaseRootElement} from './base.root.element'

class BaseFragment {
  protected page: () => Page
  protected _root: BaseRootElement
  private parentLocator: () => Locator
  private fragmentRootSelector: string | Array<string | {selector: string; opts: IChainLocatorOptions}>
  protected name: string
  private options?: IBaseInitOptions

  constructor(
    page: () => Page,
    parentLocator: () => Locator,
    fragmentRootSelector: string | Array<string | {selector: string; opts: IChainLocatorOptions}>,
    name: string,
    options?: IBaseInitOptions
  ) {
    this.page = page
    this.parentLocator = parentLocator
    this.fragmentRootSelector = fragmentRootSelector
    this.name = name
    this.options = options
    this._root = this.init(BaseRootElement, fragmentRootSelector, `_root fragment ${this.name} element`)
  }

  private isOnlyRootProp(data: object) {
    return '_root' in data && Object.keys(data).length === 1
  }

  protected element(): Locator | FrameLocator {
    const {options, page, parentLocator, fragmentRootSelector} = this
    const rootLocator = options?.searchFromDOMRoot ? page() : parentLocator()
    const addLocatorOpts = (_rootLocator: Page | Locator, selector: string, _opts?: IChainLocatorOptions) => {
      const {locatorOpts} = _opts

      return typeof locatorOpts === 'string'
        ? _rootLocator.locator(selector, {..._opts?.selectorOpts})[locatorOpts]()
        : _rootLocator.locator(selector, {..._opts?.selectorOpts}).nth(locatorOpts.nth)
    }

    if (Array.isArray(fragmentRootSelector)) {
      return fragmentRootSelector.reduce((chainLocator: Locator, selectorData) => {
        if (typeof selectorData === 'object' && selectorData.opts.locatorOpts) {
          chainLocator = chainLocator
            ? addLocatorOpts(chainLocator, selectorData.selector, selectorData.opts)
            : addLocatorOpts(rootLocator, selectorData.selector, selectorData.opts)
        } else if (typeof selectorData === 'object' && !selectorData.opts.locatorOpts) {
          chainLocator = chainLocator
            ? chainLocator.locator(selectorData.selector, {...selectorData.opts.selectorOpts})
            : rootLocator.locator(selectorData.selector, {...selectorData.opts.selectorOpts})
        } else if (typeof selectorData === 'string') {
          chainLocator = chainLocator ? chainLocator.locator(selectorData) : rootLocator.locator(selectorData)
        }

        return chainLocator
      }, null)
    }

    if (options?.locatorOpts) {
      return addLocatorOpts(rootLocator, fragmentRootSelector, options)
    }

    return rootLocator.locator(fragmentRootSelector, {...options?.selectorOpts})
  }

  protected get parentElement(): Locator {
    return this.parentLocator()
  }

  set override(method) {
    const methodsWhatCanBeOverridden =
      /^(getScreenshot|get|perform|sendKeys|isDisplay|isExist|waitForDataState|waitForDisplayedState)$/
    const {name} = method
    const parsedOverrideName = name.match(methodsWhatCanBeOverridden)
    if (!parsedOverrideName) {
      throw new Error('You are trying to "override" a method that is not in the allowed list to "override"')
    }
    this[`${parsedOverrideName[0]}Initial`] = this[parsedOverrideName[0]]
    this[parsedOverrideName[0]] = method.bind(this)
  }

  async perform(performObj: object) {
    if (!isPlainObject(performObj)) {
      throw new Error(`${this.name} perform argument should be an object`)
    }
    const verbs = [...collectPerformVerbs(performObj)]
    verbs.length && verbs.every((verb) => verb === 'hover') ? await this.waitExist() : await this.waitVisible()
    for (const key of Object.keys(performObj)) {
      if (!this[key]) {
        throw new Error(`${this.name} does not have ${key} property`)
      }
      await this[key].perform(performObj[key])
    }
  }

  async getScreenshot(getScreen: object) {
    if (!isPlainObject(getScreen)) {
      throw new Error(`${this.name} getScreenshot argument should be an object`)
    }
    await this.waitVisible()
    for (const key of Object.keys(getScreen)) {
      if (!this[key]) {
        throw new Error(`${this.name} does not have ${key} property`)
      }
      await this[key].getScreenshot(getScreen[key])
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

    if (this.isOnlyRootProp(isDispObj)) {
      return {_root: await this._root.isDisplay()}
    }

    await this.waitExist()
    const tempGet = {...isDispObj}
    for (const key of Object.keys(tempGet)) {
      if (!this[key]) {
        throw new Error(`${this.name} does not have ${key} property`)
      }
      tempGet[key] = await this[key].isDisplay(tempGet[key])
    }

    return tempGet
  }

  async waitForDataState(dataState: object, waitTime: number, dontThrowError: boolean) {
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

  async waitForDisplayedState(dataState: object, waitTime: number, dontThrowError: boolean) {
    if (!isPlainObject(dataState)) {
      throw new Error(`${this.name} waitForDisplayedState argument should be an object`)
    }

    if (this.isOnlyRootProp(dataState)) {
      return this._root.waitForDisplayedState(dataState['_root'], waitTime, dontThrowError)
    }

    await this.waitExist()
    const tempListOfStatesResult: boolean[] = []
    for (const key of Object.keys(dataState)) {
      if (!this[key]) {
        throw new Error(`${this.name} does not have ${key} property`)
      }
      tempListOfStatesResult.push(await this[key].waitForDisplayedState(dataState[key], waitTime, dontThrowError))
    }

    return tempListOfStatesResult.every((stateResult) => stateResult)
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

  async isExist(isExistObj: object) {
    if (!isPlainObject(isExistObj)) {
      throw new Error(`${this.name} isExist argument should be an object`)
    }

    if (this.isOnlyRootProp(isExistObj)) {
      return {_root: await this._root.isExist()}
    }

    await this.waitExist()
    const tempGet = {...isExistObj}
    for (const key of Object.keys(tempGet)) {
      if (!this[key]) {
        throw new Error(`${this.name} does not have ${key} property`)
      }
      tempGet[key] = await this[key].isExist(tempGet[key])
    }

    return tempGet
  }

  private isFrameLocator(): boolean {
    return 'owner' in this.element()
  }

  async waitVisible() {
    if (!this.isFrameLocator()) {
      await waiter.waitFor(this.element() as Locator, this.name)
    }
  }

  async waitExist() {
    if (!this.isFrameLocator()) {
      await waiter.waitFor(this.element() as Locator, this.name, {state: 'attached'})
    }
  }

  protected async getParentNode(_locator: Locator) {
    return _locator.locator('xpath=..')
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
    return new ClassName(this.page.bind(this), this.element.bind(this), rootSelector, name, options)
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
    return new ClassName(this.page.bind(this), this.element.bind(this), collectionType, rootSelector, name, options)
  }
}

export {BaseFragment, Locator}
