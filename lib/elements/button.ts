import {TAttributes} from '../base.types'
import {getValues} from '../utils/evaluate.fn'
import {BaseElement, BaseElementGetScreenshot, BaseElementClick, BaseElementHover, BaseElementScroll} from '../base.element'

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

  async sendKeys() {
    throw new Error(`${this.name} is button, button does not have sendKeys`)
  }

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
  getButtonData
}
