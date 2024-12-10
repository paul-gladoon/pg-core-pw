import {getValues} from '../utils/evaluate.fn'
import {
  BaseElement,
  BaseElementGetScreenshot,
  BaseElementClick,
  BaseElementHover,
  BaseElementScroll,
  BaseElementCollectionWaitForDisplayedState,
  BaseElementCollectionIsExisting,
} from '../base.element'

interface IButtonGet {
  attribute?: string | string[]
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
  _where: IButtonGetReturn
  _includes?: boolean
}

interface IButtonCollectionClick {
  _action: ButtonClick
  _where?: ButtonGetResult
  _index?: number
}

interface IButtonCollectionHover {
  _action: ButtonHover
  _where?: ButtonGetResult
  _index?: number
}

interface IButtonCollectionWaitForDataState {
  _where?: ButtonGetResult
  _every?: boolean
  _some?: boolean
  _index?: number
  _includes?: boolean
  _length?: number | string
}

interface IButtonCollectionGet {
  _action?: ButtonGet
  _where?: ButtonGetResult
  _index?: number
  _length?: null
}

interface IButtonCollectionIsDisplayed {
  _action: ButtonIsDisplayed
  _where?: ButtonGetResult
  _index?: number
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
      return (_element as HTMLButtonElement).disabled
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

  async sendKeys() {
    throw new Error(`${this.name} is button, button does not have sendKeys`)
  }

  async get(getObj: IButtonGet) {
    await this.waitVisible()
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
  getButtonData,
}
