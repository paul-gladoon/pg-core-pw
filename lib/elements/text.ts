import {getValues} from '../utils/evaluate.fn'
import {
  BaseElement,
  BaseElementClick,
  BaseElementCollectionIsExisting,
  BaseElementCollectionWaitForDisplayedState,
  BaseElementGetScreenshot,
  BaseElementHover,
} from '../base.element'

interface ITextGet {
  color?: null
  text?: null
  style?: string | string[]
  attribute?: string | string[]
  tagName?: null
}

interface ITextCollectionClick {
  action: TextClick
  by: {data: TextGetResult} | {index: number}
}

interface ITextCollectionHover {
  action: TextHover
  by: {data: TextGetResult} | {index: number}
}

interface ITextCollectionWaitForDataState {
  expectedState: TextGetResult
  stateFor: {every: boolean} | {some: boolean} | {index: number}
  includes?: boolean
}

interface ITextWaitForDataState {
  expectedState: ITextGetReturn
  includes?: boolean
}

interface ITextCollectionIsDisplayed {
  action: null
  by?: {index: number} | {data: TextGetResult}
}

interface ITextGetReturn {
  color?: string
  text?: string
  style?: {[k: string]: string}
  attribute?: {[k: string]: string}
  tagName?: string
}

interface ITextCollectionGet {
  action: TextGet
  by?: {index: number} | {data: TextGetResult}
}

function getTextData(_element, {getObj, getValues}) {
  const fn = new Function(`return ${getValues}`)()
  const values = {
    text: function () {
      return _element.innerText.trim()
    },
    color: function () {
      return window.getComputedStyle(_element).color
    },
    style: function (key) {
      return window.getComputedStyle(_element)[key]
    },
    attribute: function (attr) {
      return _element.getAttribute(attr)
    },
    tagName: function () {
      return _element.tagName
    },
  }

  return fn(getObj, values)
}

type TextIsDisplayed = null
type TextIsDisplayedResult = boolean
type TextGet = ITextGet
type TextGetResult = ITextGetReturn
type TextClick = BaseElementClick
type TextHover = BaseElementHover
type TextIsExist = null
type TextWaitForDisplayedState = boolean
type TextWaitForDataState = ITextWaitForDataState
type TextCollectionGet = ITextCollectionGet
type TextCollectionGetResult = TextGetResult | TextGetResult[]
type TextCollectionClick = ITextCollectionClick
type TextCollectionHover = ITextCollectionHover
type TextCollectionIsDisplayed = ITextCollectionIsDisplayed
type TextCollectionIsDisplayedResult = boolean[] | boolean
type TextCollectionWaitForDataState = ITextCollectionWaitForDataState
type TextCollectionWaitForDisplayedState = BaseElementCollectionWaitForDisplayedState
type TextGetScreenshot = BaseElementGetScreenshot
type TextCollectionIsExisting = BaseElementCollectionIsExisting
type TextCollectionIsExistingResult = boolean[] | boolean
type TextScroll = null

class TextElement extends BaseElement {
  constructor(page, parentLocator, elementRootSelector, name, options?) {
    super(page, parentLocator, elementRootSelector, name, options)
  }

  async get(getObj: ITextGet): Promise<ITextGetReturn> {
    await this.waitVisible()
    return this.element.evaluate(getTextData, {getObj, getValues: getValues.toString()})
  }
}

export {
  TextElement,
  TextIsDisplayedResult,
  TextGet,
  TextGetResult,
  TextClick,
  TextIsDisplayed,
  TextCollectionGet,
  TextCollectionGetResult,
  TextCollectionClick,
  TextCollectionHover,
  TextHover,
  TextCollectionWaitForDataState,
  TextCollectionWaitForDisplayedState,
  TextCollectionIsDisplayed,
  TextCollectionIsDisplayedResult,
  TextCollectionIsExisting,
  TextWaitForDisplayedState,
  TextCollectionIsExistingResult,
  TextWaitForDataState,
  TextGetScreenshot,
  TextScroll,
  TextIsExist,
  getTextData,
}
