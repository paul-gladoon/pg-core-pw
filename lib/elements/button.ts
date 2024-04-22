import {TAttributes} from '../base.types'
import {getValues} from '../utils/evaluate.fn'
import {BaseElement, BaseElementGetScreenshot, BaseElementClick, BaseElementHover, BaseElementScroll, BaseElementCollectionWaitForDisplayedState, BaseElementCollectionIsExisting} from '../base.element'
import {step} from '../reporter/step'

interface IButtonGet {
  attribute?: TAttributes | TAttributes[]
  isDisabled?: null
  color?: null
  text?: null
  style?: string | string[]
}

interface IButtonGetReturn {
  attribute?: {[k: string]: string}
  isDisabled?: boolean
  color?: string
  text?: string
  style?: {[k: string]: string}
}

interface IButtonWaitForDataState {
  expectedState: IButtonGetReturn
  includes?: boolean
}

interface IButtonCollectionClick {
  action: ButtonClick
  by: {data: ButtonGetResult} | {index: number}
}

interface IButtonCollectionHover {
  action: ButtonHover
  by: {data: ButtonGetResult} | {index: number}
}

interface IButtonCollectionWaitForDataState {
  expectedState: ButtonGetResult
  stateFor: {every: boolean} | {some: boolean} | {index: number}
  includes?: boolean
}

interface IButtonCollectionGet {
  action: ButtonGet
  by?: {index: number} | {data: ButtonGetResult}
}

interface IButtonCollectionIsDisplayed {
  action: null
  by?: {index: number} | {data: ButtonGetResult}
}

type ButtonGet = IButtonGet
type ButtonGetResult = IButtonGetReturn
type ButtonClick = BaseElementClick
type ButtonIsDisplayed = null
type ButtonIsDisplayedResult = boolean
type ButtonHover = BaseElementHover
type ButtonIsExist = null
type ButtonScroll = BaseElementScroll
type ButtonWaitForDisplayedState = boolean
type ButtonWaitForDataState = IButtonWaitForDataState
type ButtonGetScreenshot = BaseElementGetScreenshot
type ButtonCollectionGet = IButtonCollectionGet
type ButtonCollectionGetResult = ButtonGetResult | ButtonGetResult[]
type ButtonCollectionClick = IButtonCollectionClick
type ButtonCollectionHover = IButtonCollectionHover
type ButtonCollectionIsDisplayed = IButtonCollectionIsDisplayed
type ButtonCollectionIsDisplayedResult = boolean[] | boolean
type ButtonCollectionWaitForDataState = IButtonCollectionWaitForDataState
type ButtonCollectionWaitForDisplayedState = BaseElementCollectionWaitForDisplayedState
type ButtonCollectionIsExisting = BaseElementCollectionIsExisting
type ButtonCollectionIsExistingResult = boolean[] | boolean

const getButtonData = (_element, {getObj, getValues}) => {
  const fn = new Function(`return ${getValues}`)()
  const values = {
    isDisabled: function () {
      return (_element as any).disabled
    },
    color: function () {
      return window.getComputedStyle(_element).color
    },
    text: function () {
      return _element.innerText.trim()
    },
    style: function (key) {
      return window.getComputedStyle(_element)[key]
    },
    attribute: function (attr) {
      return _element.getAttribute(attr)
    },
  }

  return fn(getObj, values)
}

class ButtonElement extends BaseElement {
  constructor(page, parentLocator, elementRootSelector, name, options) {
    super(page, parentLocator, elementRootSelector, name, options)
  }

  @step((name) => `Set data on "${name}"`)
  async sendKeys() {
    throw new Error(`${this.name} is button, button does not have sendKeys`)
  }

  @step((name) => `Get data on "${name}"`)
  async get(getObj: IButtonGet) {
    return this.element.evaluate(getButtonData, {getObj, getValues: getValues.toString()})
  }
}

export {
  ButtonElement,
  ButtonIsDisplayed,
  ButtonIsExist,
  ButtonIsDisplayedResult,
  ButtonClick,
  ButtonGet,
  ButtonGetResult,
  ButtonHover,
  ButtonScroll,
  ButtonWaitForDisplayedState,
  ButtonWaitForDataState,
  ButtonGetScreenshot,
  ButtonCollectionGet,
  ButtonCollectionGetResult,
  ButtonCollectionClick,
  ButtonCollectionHover,
  ButtonCollectionIsDisplayed,
  ButtonCollectionIsDisplayedResult,
  ButtonCollectionWaitForDataState,
  ButtonCollectionWaitForDisplayedState,
  ButtonCollectionIsExisting,
  ButtonCollectionIsExistingResult,
  getButtonData
}
