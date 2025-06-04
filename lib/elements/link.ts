import {getValues} from '../utils/evaluate.fn'
import {
  BaseElement,
  BaseElementClick,
  BaseElementCollectionIsExisting,
  BaseElementGetScreenshot,
  BaseElementHover,
  BaseElementScroll,
} from '../base.element'

interface ILinkGet {
  color?: null | {hover: boolean}
  href?: null
  text?: null
  style?: string | string[]
  attribute?: string | string[]
}

interface ILinkCollectionGet {
  _action?: LinkGet
  _where?: LinkGetResult
  _index?: number
  _length?: null
}

interface ILinkCollectionHover {
  _action: LinkHover
  _where?: LinkGetResult
  _index?: number
}

interface ILinkCollectionWaitForDataState {
  _where?: LinkGetResult
  _every?: boolean
  _some?: boolean
  _index?: number
  _includes?: boolean
  _length?: number | string
}

interface ILinkCollectionWaitForDisplayedState {
  _state: boolean
  _every?: boolean
  _some?: boolean
  _index?: number
}

interface ILinkWaitForDataState {
  _where: LinkGetResult
  _includes?: boolean
}

interface ILinkGetReturn {
  color?: string
  href?: string
  text?: string
  style?: {[k: string]: string}
  attribute?: {[k: string]: string}
}

interface ILinkCollectionClick {
  _action: LinkClick
  _where?: LinkGetResult
  _index?: number
}

interface ILinkCollectionIsDisplayed {
  _action: null
  _where?: LinkGetResult
  _index?: number
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

  async get(getObj: ILinkGet): Promise<ILinkGetReturn> {
    await this.waitVisible()
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
