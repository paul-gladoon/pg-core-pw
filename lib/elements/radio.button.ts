import {getValues} from '../utils/evaluate.fn'
import {
  BaseElement,
  BaseElementCollectionIsExisting,
  BaseElementGetScreenshot,
  BaseElementHover,
  BaseElementScroll,
  IGeneralActionsOptions,
} from '../base.element'
import {step} from '../reporter/step'

interface ICheckedOptions extends IGeneralActionsOptions {
  position?: {
    x: number
    y: number
  }
  trial?: boolean
}

interface IRadioButtonGet {
  checked?: null
  text?: null
}

interface IRadioButtonGetReturn {
  checked?: boolean
  text?: string
}

interface IRadioButtonCollectionSendKeys {
  action: RadioButtonSendKeys
  by: {data: RadioButtonGetResult} | {index: number}
}

interface IRadioButtonCollectionGet {
  action: RadioButtonGet
  by?: {index: number} | {data: RadioButtonGetResult}
}

function getRadioButtonData(_element, {getObj, getValues}) {
  const fn = new Function(`return ${getValues}`)()
  const values = {
    checked: function () {
      return _element.checked
    },
    text: function () {
      return _element.parentElement.querySelector('label').innerText.trim()
    },
  }

  return fn(getObj, values)
}

interface IRadioButtonCollectionWaitForDataState {
  expectedState: RadioButtonGetResult
  stateFor: {every: boolean} | {some: boolean} | {index: number}
  includes?: boolean
}

interface IRadioButtonCollectionWaitForDisplayedState {
  expectedState: boolean
  stateFor: {every: boolean} | {some: boolean} | {index: number}
}

interface IRadioButtonWaitForDataState {
  expectedState: RadioButtonGetResult
  includes?: boolean
}

interface IRadioButtonCollectionHover {
  action: RadioButtonGet
  by: {data: RadioButtonGetResult} | {index: number}
}

interface IRadioButtonCollectionIsDisplayed {
  action: null
  by?: {index: number} | {data: RadioButtonGetResult}
}

type RadioButtonSendKeys = boolean | {state: boolean; opts: ICheckedOptions}
type RadioButtonGet = IRadioButtonGet
type RadioButtonGetResult = IRadioButtonGetReturn
type RadioButtonCollectionSendKeys = IRadioButtonCollectionSendKeys
type RadioButtonCollectionGet = IRadioButtonCollectionGet
type RadioButtonCollectionWaitForDataState = IRadioButtonCollectionWaitForDataState
type RadioButtonCollectionWaitForDisplayedState = IRadioButtonCollectionWaitForDisplayedState
type RadioButtonWaitForDisplayedState = boolean
type RadioButtonWaitForDataState = IRadioButtonWaitForDataState
type RadioButtonIsDisplayed = null
type RadioButtonHover = BaseElementHover
type RadioButtonIsDisplayedResult = boolean
type RadioButtonIsExist = null
type RadioButtonScroll = BaseElementScroll
type RadioButtonGetScreenshot = BaseElementGetScreenshot
type RadioButtonCollectionGetResult = RadioButtonGetResult | RadioButtonGetResult[]
type RadioButtonCollectionHover = IRadioButtonCollectionHover
type RadioButtonCollectionIsDisplayed = IRadioButtonCollectionIsDisplayed
type RadioButtonCollectionIsDisplayedResult = boolean[] | boolean
type RadioButtonCollectionIsExisting = BaseElementCollectionIsExisting
type RadioButtonCollectionIsExistingResult = boolean[] | boolean

class RadioButtonElement extends BaseElement {
  constructor(page, parentLocator, elementRootSelector, name, options?) {
    super(page, parentLocator, elementRootSelector, name, options)
  }

  @step((name) => `Set data on "${name}"`)
  async sendKeys(checkObj: RadioButtonSendKeys) {
    typeof checkObj === 'boolean'
      ? await this.element.setChecked(checkObj)
      : await this.element.setChecked(checkObj.state, {...checkObj.opts})
  }

  @step((name) => `Click on "${name}"`)
  async click() {
    throw new Error(`${this.name} is radio button, radio button does not have click, please use sendKeys.`)
  }

  async get(getObj: IRadioButtonGet): Promise<IRadioButtonGetReturn> {
    const label = new BaseElement(this.page, this.parentElement, 'label', 'Label')
    await label.waitVisible()
    return this.element.evaluate(getRadioButtonData, {getObj, getValues: getValues.toString()})
  }
}

export {
  RadioButtonElement,
  RadioButtonSendKeys,
  RadioButtonGet,
  RadioButtonGetResult,
  RadioButtonCollectionSendKeys,
  RadioButtonCollectionGet,
  RadioButtonCollectionWaitForDataState,
  RadioButtonCollectionWaitForDisplayedState,
  RadioButtonWaitForDisplayedState,
  RadioButtonWaitForDataState,
  RadioButtonIsDisplayed,
  RadioButtonHover,
  RadioButtonIsDisplayedResult,
  RadioButtonIsExist,
  RadioButtonScroll,
  RadioButtonGetScreenshot,
  RadioButtonCollectionGetResult,
  RadioButtonCollectionHover,
  RadioButtonCollectionIsDisplayed,
  RadioButtonCollectionIsDisplayedResult,
  RadioButtonCollectionIsExisting,
  RadioButtonCollectionIsExistingResult,
  getRadioButtonData,
}
