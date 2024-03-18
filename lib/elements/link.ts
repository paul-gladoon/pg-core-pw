import {getValues} from '../utils/evaluate.fn'
import {BaseElement, BaseElementClick, BaseElementHover} from '../base.element'
import {TAttributes} from '../base.types'

interface ILinkGet {
  color?: null | {hover: boolean}
  href?: null
  text?: null
  style?: string | string[]
  attribute?: TAttributes | TAttributes[]
}

interface ILinkCollectionGet {
  action: ILinkGet
  by?: {index: number} | {data: ILinkGetReturn} | null
}

interface ILinkCollectionHover {
  action: null
  by: {data: ILinkGetReturn} | {index: number}
}

interface ILinkCollectionWaitForDataState {
  expectedState: ILinkGetReturn
  stateFor: {every: boolean} | {some: boolean} | {index: number}
  includes?: boolean
}

interface ILinkCollectionWaitForDisplayedState {
  expectedState: boolean
  stateFor: {every: boolean} | {some: boolean} | {index: number}
}

interface ILinkWaitForDataState {
  expectedState: ILinkGetReturn
  includes?: boolean
}

interface ILinkGetReturn {
  color?: string
  href?: string
  text?: string
  style?: {[k: string]: string}
}

interface ILinkCollectionClick {
  action: null
  by: {data: ILinkGetReturn} | {index: number}
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

class LinkElement extends BaseElement {
  constructor(page, parentLocator, elementRootSelector, name, options?) {
    super(page, parentLocator, elementRootSelector, name, options)
  }

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
  getLinkData,
}
