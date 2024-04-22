import {getValues} from '../utils/evaluate.fn'
import {
  BaseElement,
  BaseElementClick,
  BaseElementCollectionIsExisting,
  BaseElementGetScreenshot,
  BaseElementHover,
  BaseElementScroll,
} from '../base.element'
import {TAttributes} from '../base.types'
import {step} from '../reporter/step'

interface ILinkGet {
  color?: null | {hover: boolean}
  href?: null
  text?: null
  style?: string | string[]
  attribute?: TAttributes | TAttributes[]
}

interface ILinkCollectionGet {
  action: LinkGet
  by?: {index: number} | {data: LinkGetResult} | null
}

interface ILinkCollectionHover {
  action: LinkHover
  by: {data: LinkGetResult} | {index: number}
}

interface ILinkCollectionWaitForDataState {
  expectedState: LinkGetResult
  stateFor: {every: boolean} | {some: boolean} | {index: number}
  includes?: boolean
}

interface ILinkCollectionWaitForDisplayedState {
  expectedState: boolean
  stateFor: {every: boolean} | {some: boolean} | {index: number}
}

interface ILinkWaitForDataState {
  expectedState: LinkGetResult
  includes?: boolean
}

interface ILinkGetReturn {
  color?: string
  href?: string
  text?: string
  style?: {[k: string]: string}
}

interface ILinkCollectionClick {
  action: LinkClick
  by: {data: LinkGetResult} | {index: number}
}

interface ILinkCollectionIsDisplayed {
  action: null
  by?: {index: number} | {data: LinkGetResult}
}

function getLinkData(_element, {getObj, getValues}) {
  const fn = new Function(`return ${getValues}`)()
  const values = {
    href: function () {
      return _element.href
    },
    color: function () {
      return window.getComputedStyle(_element).color
    },
    style: function (key) {
      return window.getComputedStyle(_element)[key]
    },
    text: function () {
      return _element.innerText.trim()
    },
    attribute: function (attr) {
      return _element.getAttribute(attr)
    },
  }

  return fn(getObj, values)
}

type LinkClick = BaseElementClick
type LinkGet = ILinkGet
type LinkHover = BaseElementHover
type LinkGetResult = ILinkGetReturn
type LinkIsDisplayed = null
type LinkIsDisplayedResult = boolean
type LinkCollectionGet = ILinkCollectionGet
type LinkCollectionGetResult = ILinkGetReturn
type LinkCollectionHover = ILinkCollectionHover
type LinkCollectionClick = ILinkCollectionClick
type LinkCollectionWaitForDataState = ILinkCollectionWaitForDataState
type LinkCollectionWaitForDisplayedState = ILinkCollectionWaitForDisplayedState
type LinkWaitForDisplayedState = boolean
type LinkWaitForDataState = ILinkWaitForDataState
type LinkIsExist = null
type LinkScroll = BaseElementScroll
type LinkGetScreenshot = BaseElementGetScreenshot
type LinkCollectionIsDisplayed = ILinkCollectionIsDisplayed
type LinkCollectionIsDisplayedResult = boolean[] | boolean
type LinkCollectionIsExisting = BaseElementCollectionIsExisting
type LinkCollectionIsExistingResult = boolean[] | boolean

class LinkElement extends BaseElement {
  constructor(page, parentLocator, elementRootSelector, name, options?) {
    super(page, parentLocator, elementRootSelector, name, options)
  }

  @step((name) => `Get data on "${name}"`)
  async get(getObj: ILinkGet): Promise<ILinkGetReturn> {
    return this.element.evaluate(getLinkData, {getObj, getValues: getValues.toString()})
  }
}

export {
  LinkElement,
  LinkGet,
  LinkHover,
  LinkGetResult,
  LinkIsDisplayed,
  LinkIsDisplayedResult,
  LinkClick,
  LinkCollectionGet,
  LinkCollectionGetResult,
  LinkCollectionHover,
  LinkCollectionClick,
  LinkCollectionWaitForDataState,
  LinkWaitForDataState,
  LinkCollectionWaitForDisplayedState,
  LinkWaitForDisplayedState,
  LinkIsExist,
  LinkScroll,
  LinkGetScreenshot,
  LinkCollectionIsDisplayed,
  LinkCollectionIsDisplayedResult,
  LinkCollectionIsExisting,
  LinkCollectionIsExistingResult,
  getLinkData,
}
