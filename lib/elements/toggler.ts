import {getValues} from '../utils/evaluate.fn'
import {
  BaseElement,
  BaseElementCollectionIsExisting,
  BaseElementGetScreenshot,
  BaseElementHover,
  BaseElementScroll,
  IGeneralActionsOptions,
} from '../base.element'

interface ITogglerOptions extends IGeneralActionsOptions {
  position?: {
    x: number
    y: number
  }
  trial?: boolean
}

interface ITogglerGet {
  checked?: null
  text?: null
  isDisabled?: null
}

interface ITogglerGetReturn {
  checked?: boolean
  text?: string
  isDisabled?: boolean
}

interface ITogglerCollectionSendKeys {
  action: TogglerSendKeys
  by: {data: TogglerGetResult} | {index: number}
}

interface ITogglerCollectionGet {
  action: TogglerGet
  by?: {index: number} | {data: TogglerGetResult}
}

function getTogglerData(_element, {getObj, getValues}) {
  const fn = new Function(`return ${getValues}`)()
  const values = {
    checked: function () {
      return _element.checked
    },
    text: function () {
      return _element.parentElement.querySelector('label').innerText.trim()
    },
    isDisabled: function () {
      return _element.disabled
    },
  }

  return fn(getObj, values)
}

interface ITogglerCollectionWaitForDataState {
  expectedState: TogglerGetResult
  stateFor: {every: boolean} | {some: boolean} | {index: number}
  includes?: boolean
}

interface ITogglerCollectionWaitForDisplayedState {
  expectedState: boolean
  stateFor: {every: boolean} | {some: boolean} | {index: number}
}

interface ITogglerWaitForDataState {
  expectedState: TogglerGetResult
  includes?: boolean
}

interface ITogglerCollectionHover {
  action: TogglerGet
  by: {data: TogglerGetResult} | {index: number}
}

interface ITogglerCollectionIsDisplayed {
  action: null
  by?: {index: number} | {data: TogglerGetResult}
}

type TogglerSendKeys = boolean | {state: boolean; opts: ITogglerOptions}
type TogglerGet = ITogglerGet
type TogglerGetResult = ITogglerGetReturn
type TogglerCollectionSendKeys = ITogglerCollectionSendKeys
type TogglerCollectionGet = ITogglerCollectionGet
type TogglerIsDisplayed = null
type TogglerIsDisplayedResult = boolean
type TogglerScroll = BaseElementScroll
type TogglerCollectionWaitForDataState = ITogglerCollectionWaitForDataState
type TogglerCollectionWaitForDisplayedState = ITogglerCollectionWaitForDisplayedState
type TogglerWaitForDisplayedState = boolean
type TogglerWaitForDataState = ITogglerWaitForDataState
type TogglerHover = BaseElementHover
type TogglerIsExist = null
type TogglerGetScreenshot = BaseElementGetScreenshot
type TogglerCollectionGetResult = TogglerGetResult | TogglerGetResult[]
type TogglerCollectionHover = ITogglerCollectionHover
type TogglerCollectionIsDisplayed = ITogglerCollectionIsDisplayed
type TogglerCollectionIsDisplayedResult = boolean[] | boolean
type TogglerCollectionIsExisting = BaseElementCollectionIsExisting
type TogglerCollectionIsExistingResult = boolean[] | boolean

class TogglerElement extends BaseElement {
  constructor(page, parentLocator, elementRootSelector, name, options?) {
    super(page, parentLocator, elementRootSelector, name, options)
  }

  async sendKeys(checkObj: TogglerSendKeys) {
    typeof checkObj === 'boolean'
      ? await this.element.setChecked(checkObj)
      : await this.element.setChecked(checkObj.state, {...checkObj.opts})
  }

  async click() {
    throw new Error(`${this.name} is toggler, toggler does not have click, please use sendKeys.`)
  }

  async get(getObj: ITogglerGet): Promise<ITogglerGetReturn> {
    const label = this.init(BaseElement, 'label', 'Label')
    await label.waitVisible()
    return this.element.evaluate(getTogglerData, {getObj, getValues: getValues.toString()})
  }
}

export {
  TogglerElement,
  TogglerSendKeys,
  TogglerGet,
  TogglerGetResult,
  TogglerCollectionSendKeys,
  TogglerCollectionGet,
  getTogglerData,
  TogglerIsDisplayed,
  TogglerIsDisplayedResult,
  TogglerScroll,
  TogglerCollectionWaitForDataState,
  TogglerCollectionWaitForDisplayedState,
  TogglerWaitForDisplayedState,
  TogglerWaitForDataState,
  TogglerHover,
  TogglerIsExist,
  TogglerGetScreenshot,
  TogglerCollectionGetResult,
  TogglerCollectionHover,
  TogglerCollectionIsDisplayed,
  TogglerCollectionIsDisplayedResult,
  TogglerCollectionIsExisting,
  TogglerCollectionIsExistingResult,
}
