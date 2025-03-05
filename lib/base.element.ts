import {type Page, type Locator, LocatorScreenshotOptions} from '@playwright/test'
import {getValues} from './utils/evaluate.fn'
import {waiter} from './utils/waiter'
import {IBaseInitOptions, IChainLocatorOptions} from './base.types'
import * as _n from 'lodash'

const arrayNullKeys = [
  'text',
  'color',
  'tagName',
  'boundingClientRect',
  'childrenTags',
  'checked',
  'isDisabled',
  'size',
  'currentSrc',
  'value',
  'href',
  'selected',
]

const arrayValuesKeys = ['attribute', 'style', 'styleBefore']

interface IGeneralActionsOptions {
  force?: boolean
  noWaitAfter?: boolean
  timeout?: number
}

interface IClickOptions extends IGeneralActionsOptions {
  button?: 'left' | 'right' | 'middle'
  clickCount?: number
  delay?: number
  modifiers?: Array<'Alt' | 'Control' | 'Meta' | 'Shift'>
  position?: {
    x: number
    y: number
  }
  trial?: boolean
}

interface IHoverOptions extends IGeneralActionsOptions {
  modifiers?: Array<'Alt' | 'Control' | 'Meta' | 'Shift'>
  position?: {
    x: number
    y: number
  }
  trial?: boolean
  waitVisibilityBeforeHover?: boolean
}

interface IBaseElementGetScreenshot {
  filePath: string
  viewOptions?: LocatorScreenshotOptions
}

interface IBaseElementGetValues {
  attribute?: string | string[]
  style?: string | string[]
  styleBefore?: string | string[]
  color?: null
  tagName?: null
  text?: null
  checked?: null
  boundingClientRect?: null
  childrenTags?: null
  isDisabled?: null
}

interface IBaseElementGetReturn {
  attribute?: {[k: string]: string}
  color?: string
  tagName?: string
  text?: string
  checked?: boolean
  style?: {[k: string]: string}
  styleBefore?: {[k: string]: string}
  boundingClientRect?: object
  childrenTags?: string[]
  isDisabled?: boolean
}

interface IBaseElementWaitForDataState {
  _where: IBaseElementGetReturn
  _includes?: boolean
}

interface IBaseElementCollectionClick {
  _action: BaseElementClick
  _where?: BaseElementGetResult
  _index?: number
}

interface IBaseElementCollectionHover {
  _action: BaseElementHover
  _where?: BaseElementGetResult
  _index?: number
}

interface IBaseElementCollectionGet {
  _action?: BaseElementGet
  _where?: BaseElementGetResult
  _index?: number
  _length?: null
}

interface IBaseElementCollectionIsDisplayed {
  _action: BaseElementIsDisplayed
  _where?: BaseElementGetResult
  _index?: number
}

interface IBaseElementCollectionWaitForDataState {
  _where?: BaseElementGetResult
  _every?: boolean
  _some?: boolean
  _index?: number
  _includes?: boolean
  _length?: number | string
}

interface IBaseElementCollectionWaitForDisplayedState {
  _state: boolean
  _every?: boolean
  _some?: boolean
  _index?: number
}

type BaseElementClick = null | IClickOptions
type BaseElementGet = IBaseElementGetValues
type BaseElementGetResult = IBaseElementGetReturn
type BaseElementHover = null | IHoverOptions
type BaseElementScroll = null
type BaseElementIsDisplayed = null
type BaseElementIsDisplayedResult = boolean
type BaseElementIsExist = null
type BaseElementGetScreenshot = IBaseElementGetScreenshot
type BaseElementWaitForDataState = IBaseElementWaitForDataState
type BaseElementWaitForDisplayedState = boolean
type BaseElementCollectionClick = IBaseElementCollectionClick
type BaseElementCollectionGet = IBaseElementCollectionGet
type BaseElementCollectionGetResult = BaseElementGetResult | BaseElementGetResult[]
type BaseElementCollectionHover = IBaseElementCollectionHover
type BaseElementCollectionIsDisplayed = IBaseElementCollectionIsDisplayed
type BaseElementCollectionIsDisplayedResult = boolean[] | boolean
type BaseElementCollectionIsExisting = IBaseElementCollectionIsDisplayed
type BaseElementCollectionIsExistingResult = boolean[] | boolean
type BaseElementCollectionWaitForDataState = IBaseElementCollectionWaitForDataState
type BaseElementCollectionWaitForDisplayedState = IBaseElementCollectionWaitForDisplayedState

class BaseElement {
  protected page: () => Page
  protected parentLocator: () => Locator
  protected name: string
  private elementRootSelector: string | Array<string | {selector: string; opts: IChainLocatorOptions}>
  private options?: IBaseInitOptions

  constructor(
    page: () => Page,
    parentLocator: () => Locator,
    elementRootSelector: string | Array<string | {selector: string; opts: IChainLocatorOptions}>,
    name: string,
    options?: IBaseInitOptions
  ) {
    this.parentLocator = parentLocator
    this.elementRootSelector = elementRootSelector
    this.name = name
    this.page = page
    this.options = options
  }

  public get element(): Locator {
    const {options, page, parentLocator, elementRootSelector} = this
    const rootLocator = options?.searchFromDOMRoot ? page() : parentLocator()
    const addLocatorOpts = (_rootLocator: Page | Locator, selector: string, _opts?: IChainLocatorOptions) => {
      const {locatorOpts} = _opts

      return typeof locatorOpts === 'string'
        ? _rootLocator.locator(selector, {..._opts?.selectorOpts})[locatorOpts]()
        : _rootLocator.locator(selector, {..._opts?.selectorOpts}).nth(locatorOpts.nth)
    }

    if (Array.isArray(elementRootSelector)) {
      return elementRootSelector.reduce((chainLocator: Locator, selectorData) => {
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
      return addLocatorOpts(rootLocator, elementRootSelector, options)
    }

    return rootLocator.locator(elementRootSelector, {...options?.selectorOpts})
  }

  public set element(locator: Locator) {
    this.element = locator
  }

  protected parentElement(): Locator {
    return this.parentLocator()
  }

  set override(method) {
    const methodsWhatCanBeOverridden = /^get|click|sendKeys|isDisplay|hover/
    const {name} = method
    const parsedOverrideName = name.match(methodsWhatCanBeOverridden)
    if (!parsedOverrideName) {
      throw new Error('You are trying to "override" a method that is not in the allowed list to "override"')
    }
    this[`${parsedOverrideName[0]}Initial`] = this[parsedOverrideName[0]]
    this[parsedOverrideName[0]] = method.bind(this)
  }

  async click(options?: IClickOptions) {
    await this.element.click(options)
  }

  async getScreenshot({filePath, viewOptions}: IBaseElementGetScreenshot) {
    await this.element.screenshot({path: filePath, ...viewOptions})
  }

  async get(getObj: BaseElementGet) {
    await this.waitVisible()
    return this.element.evaluate(
      (_element: HTMLElement, {getObj, getValues}) => {
        const fn = new Function(`return ${getValues}`)()
        const values = {
          isDisabled: function () {
            return (_element as HTMLButtonElement).disabled
          },
          attribute: function (attr) {
            return _element.getAttribute(attr)
          },
          color: function () {
            return window.getComputedStyle(_element).color
          },
          tagName: function () {
            return _element.tagName
          },
          text: function () {
            return _element.innerText.trim()
          },
          style: function (key) {
            return window.getComputedStyle(_element)[key]
          },
          styleBefore: function (key) {
            return window.getComputedStyle(_element, ':before')[key]
          },
          boundingClientRect: function () {
            return _element.getBoundingClientRect()
          },
          childrenTags: function () {
            const childrenList = _element.children
            return Array.prototype.map.call(childrenList, function (ch) {
              return ch.tagName
            })
          },
        }

        return fn(getObj, values)
      },
      {getObj, getValues: getValues.toString()}
    )
  }

  async isDisplay() {
    return this.element.isVisible()
  }

  async waitForDisplayedState(_state, waitTime, dontThrowError) {
    return waiter.waitForState(
      async () => {
        const isDisplayResult = await this.isDisplay()
        return _n.isEqual(isDisplayResult, _state)
      },
      {
        message: `Wait for displayed state on "${this.name}" element is failed, element with selector: "${this.element.toString()}"`,
        timeout: waitTime,
        interval: 1000,
        dontThrow: dontThrowError,
      }
    )
  }

  async waitForDataState({_where, _includes}, waitTime, dontThrowError) {
    const tempObj = {}

    for (const key of Object.keys(_where)) {
      if (arrayNullKeys.includes(key)) {
        tempObj[key] = null
      }

      if (arrayValuesKeys.includes(key)) {
        tempObj[key] = Object.keys(_where[key])
      }
    }

    return waiter.waitForState(
      async () => {
        const getResult = await this.get(tempObj)

        if (_n.isBoolean(_includes)) {
          const expectedValuesList = Object.values(_where) as string[]
          const resultValuesList = Object.values(getResult) as string[]

          return resultValuesList.every((itemValue, index) => {
            if (_n.isObject(itemValue)) {
              return Object.keys(itemValue).every((key) => {
                return _includes
                  ? (itemValue[key] as string).includes(expectedValuesList[index][key])
                  : !(itemValue[key] as string).includes(expectedValuesList[index][key])
              })
            }

            return _includes ? itemValue.includes(expectedValuesList[index]) : !itemValue.includes(expectedValuesList[index])
          })
        }

        return _n.isEqual(getResult, _where)
      },
      {
        message: `Wait for data state on "${this.name}" element is failed, for data: "${JSON.stringify(_where)}"`,
        timeout: waitTime,
        interval: 1000,
        dontThrow: dontThrowError,
      }
    )
  }

  async hover(options?: IHoverOptions) {
    options?.waitVisibilityBeforeHover ? await this.waitVisible() : await this.waitExist()
    await this.element.hover(options)
  }

  async scroll() {
    await this.element.scrollIntoViewIfNeeded()
  }

  async isExist() {
    return !!(await this.element.count())
  }

  public async waitVisible() {
    await waiter.waitFor(this.element, this.name)
  }

  protected async waitExist() {
    await waiter.waitFor(this.element, this.name, {state: 'attached'})
  }

  protected async waitNotVisible() {
    await waiter.waitFor(this.element, this.name, {state: 'hidden'})
  }

  protected async getParentNode(_locator: Locator) {
    return _locator.locator('xpath=..')
  }

  protected init<T extends BaseElement>(
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
    return new ClassName(this.page.bind(this), this.parentLocator.bind(this), rootSelector, name, options)
  }
}

export {
  BaseElement,
  Locator,
  BaseElementClick,
  BaseElementGet,
  BaseElementGetResult,
  BaseElementHover,
  BaseElementScroll,
  BaseElementIsDisplayed,
  BaseElementIsExist,
  BaseElementGetScreenshot,
  BaseElementWaitForDataState,
  BaseElementWaitForDisplayedState,
  BaseElementCollectionClick,
  BaseElementCollectionGet,
  BaseElementCollectionGetResult,
  BaseElementCollectionHover,
  BaseElementCollectionIsDisplayed,
  BaseElementCollectionIsDisplayedResult,
  BaseElementCollectionIsExisting,
  BaseElementCollectionIsExistingResult,
  BaseElementCollectionWaitForDataState,
  BaseElementCollectionWaitForDisplayedState,
  BaseElementIsDisplayedResult,
  IGeneralActionsOptions,
  arrayValuesKeys,
}
