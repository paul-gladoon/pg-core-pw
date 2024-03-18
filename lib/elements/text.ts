import {getValues} from '../utils/evaluate.fn'
import {BaseElement, BaseElementClick, BaseElementHover} from '../base.element'
import {TAttributes} from '../base.types'

interface ITextGet {
  color?: null
  text?: null
  style?: string | string[]
  attribute?: TAttributes | TAttributes[]
  tagName?: null
}

interface ITextCollection {
  action: null
  by: {data: ITextGetReturn} | {index: number}
}

interface ITextCollectionWaitForDataState {
  expectedState: ITextGetReturn
  stateFor: {every: boolean} | {some: boolean} | {index: number}
  includes?: boolean
}

interface ITextCollectionWaitForDisplayedState {
  expectedState: boolean
  stateFor: {every: boolean} | {some: boolean} | {index: number}
}

interface ITextWaitForDataState {
  expectedState: ITextGetReturn
  includes?: boolean
}

interface ITextGetReturn {
  color?: string
  text?: string
  style?: {[k: string]: string}
  attribute?: {[k: string]: string}
  tagName?: string
}

interface ITextCollectionGet {
  action: ITextGet
  by?: {index: number} | {data: ITextGetReturn}
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
type TextCollectionGet = ITextCollectionGet
type TextCollectionGetResult = ITextGetReturn
type TextCollectionClick = ITextCollection
type TextCollectionHover = ITextCollection
type TextHover = BaseElementHover
type TextCollectionWaitForDataState = ITextCollectionWaitForDataState
type TextCollectionWaitForDisplayedState = ITextCollectionWaitForDisplayedState
type TextWaitForDisplayedState = boolean
type TextWaitForDataState = ITextWaitForDataState

class TextElement extends BaseElement {
  constructor(page, parentLocator, elementRootSelector, name, options?) {
    super(page, parentLocator, elementRootSelector, name, options)
  }

  async get(getObj: ITextGet): Promise<ITextGetReturn> {
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
  TextWaitForDisplayedState,
  TextWaitForDataState,
  getTextData,
}
