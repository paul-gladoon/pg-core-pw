import {
  BaseElement,
  BaseElementScroll,
  IGeneralActionsOptions,
  BaseElementClick,
  BaseElementHover,
  BaseElementGetScreenshot,
  BaseElementCollectionIsExisting,
} from '../base.element'
import {getValues} from '../utils/evaluate.fn'
import {Keys} from '../utils/keys'

interface IInputGet {
  value?: null
  attribute?: string | string[]
  isDisabled?: null
  tagName?: null
  style?: string | string[]
}

interface IInputGetReturn {
  attribute?: {[k: string]: string}
  value?: string
  isDisabled?: boolean
  tagName?: string
  style?: {[k: string]: string}
}

interface IPressOptions {
  delay?: number
  noWaitAfter?: boolean
  timeout?: number
}

interface IInputOptions {
  fillOpts?: IGeneralActionsOptions
  pressOpts?: IPressOptions
  keysOneByOne?: boolean
}

function getInputData(_element, {getObj, getValues}) {
  const fn = new Function(`return ${getValues}`)()
  const values = {
    value: function () {
      return _element.value.trim()
    },
    attribute: function (attr) {
      return _element.getAttribute(attr)
    },
    isDisabled: function () {
      return _element.disabled
    },
    tagName: function () {
      return _element.tagName
    },
    style: function (key) {
      return window.getComputedStyle(_element)[key]
    },
  }

  return fn(getObj, values)
}

interface IInputCollectionWaitForDataState {
  expectedState: InputGetResult
  stateFor: {every: boolean} | {some: boolean} | {index: number}
  includes?: boolean
}

interface IInputCollectionWaitForDisplayedState {
  expectedState: boolean
  stateFor: {every: boolean} | {some: boolean} | {index: number}
}

interface IInputWaitForDataState {
  expectedState: InputGetResult
  includes?: boolean
}

interface IInputCollectionGet {
  action: InputGet
  by?: {index: number} | {data: InputGetResult}
}

interface IInputCollectionClick {
  action: InputClick
  by?: {index: number} | {data: InputGetResult}
}

interface IInputCollectionSendKeys {
  action: InputSendKeys
  by?: {index: number} | {data: InputGetResult}
}

interface IInputCollectionHover {
  action: InputHover
  by?: {index: number} | {data: InputGetResult}
}

interface IInputCollectionIsDisplayed {
  action: null
  by?: {index: number} | {data: InputGetResult}
}

type InputSendKeys = string | {value: string; opts: IInputOptions}
type InputClick = BaseElementClick
type InputGet = IInputGet
type InputGetResult = IInputGetReturn
type InputIsDisplayed = null
type InputIsDisplayedResult = boolean
type InputCollectionWaitForDataState = IInputCollectionWaitForDataState
type InputCollectionWaitForDisplayedState = IInputCollectionWaitForDisplayedState
type InputWaitForDisplayedState = boolean
type InputWaitForDataState = IInputWaitForDataState
type InputScroll = BaseElementScroll
type InputHover = BaseElementHover
type InputCollectionClick = IInputCollectionClick
type InputIsExist = null
type InputGetScreenshot = BaseElementGetScreenshot
type InputCollectionGet = IInputCollectionGet
type InputCollectionGetResult = InputGetResult | InputGetResult[]
type InputCollectionHover = IInputCollectionHover
type InputCollectionIsDisplayed = IInputCollectionIsDisplayed
type InputCollectionIsDisplayedResult = boolean[] | boolean
type InputCollectionIsExisting = BaseElementCollectionIsExisting
type InputCollectionIsExistingResult = boolean[] | boolean
type InputCollectionSendKeys = IInputCollectionSendKeys

class InputElement extends BaseElement {
  constructor(page, parentLocator, elementRootSelector, name, options?) {
    super(page, parentLocator, elementRootSelector, name, options)
  }

  async sendKeys(sendObj: InputSendKeys) {
    const fill = async (_value: string, options?: IInputOptions) => {
      const methodName = options?.keysOneByOne && typeof options?.keysOneByOne === 'boolean' ? 'pressSequentially' : 'fill'
      const withEnter = _value.includes(Keys.ENTER)
      await this.element[methodName](_value.replace(Keys.ENTER, ''), {...options?.fillOpts})

      if (withEnter) {
        await this.element.press(Keys.ENTER, {...options?.pressOpts})
      }
    }

    typeof sendObj === 'string' ? await fill(sendObj) : await fill(sendObj.value, sendObj.opts)
  }

  async get(getObj: IInputGet): Promise<IInputGetReturn> {
    await this.waitVisible()
    return this.element.evaluate(getInputData, {getObj, getValues: getValues.toString()})
  }
}

export {
  InputElement,
  InputSendKeys,
  InputClick,
  InputGet,
  InputGetResult,
  InputIsDisplayed,
  InputIsDisplayedResult,
  InputCollectionWaitForDataState,
  InputCollectionWaitForDisplayedState,
  InputWaitForDisplayedState,
  InputWaitForDataState,
  InputScroll,
  InputCollectionClick,
  InputIsExist,
  InputGetScreenshot,
  InputCollectionGet,
  InputCollectionGetResult,
  InputCollectionHover,
  InputCollectionIsDisplayed,
  InputCollectionIsDisplayedResult,
  InputCollectionIsExisting,
  InputCollectionIsExistingResult,
  InputCollectionSendKeys,
  getInputData,
}
