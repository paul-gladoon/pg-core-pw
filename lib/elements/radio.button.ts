import {getValues} from '../utils/evaluate.fn'
import {BaseElement, IGeneralActionsOptions} from '../base.element'

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
  by: {data: IRadioButtonGetReturn} | {index: number}
}

interface IRadioButtonCollectionGet {
  action: IRadioButtonGet
  by?: {index: number} | {data: IRadioButtonGetReturn}
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
  expectedState: IRadioButtonGetReturn
  stateFor: {every: boolean} | {some: boolean} | {index: number}
  includes?: boolean
}

interface IRadioButtonCollectionWaitForDisplayedState {
  expectedState: boolean
  stateFor: {every: boolean} | {some: boolean} | {index: number}
}

interface IRadioButtonWaitForDataState {
  expectedState: IRadioButtonGetReturn
  includes?: boolean
}

type RadioButtonSendKeys = boolean | {state: boolean, opts: ICheckedOptions}
type RadioButtonGet = IRadioButtonGet
type RadioButtonGetResult = IRadioButtonGetReturn
type RadioButtonCollectionSendKeys = IRadioButtonCollectionSendKeys
type RadioButtonCollectionGet = IRadioButtonCollectionGet
type RadioButtonCollectionWaitForDataState = IRadioButtonCollectionWaitForDataState
type RadioButtonCollectionWaitForDisplayedState = IRadioButtonCollectionWaitForDisplayedState
type RadioButtonWaitForDisplayedState = boolean
type RadioButtonWaitForDataState = IRadioButtonWaitForDataState

class RadioButtonElement extends BaseElement {
  constructor(page, parentLocator, elementRootSelector, name, options?) {
    super(page, parentLocator, elementRootSelector, name, options)
  }

  async sendKeys(checkObj: RadioButtonSendKeys) {
    typeof checkObj === 'boolean'
      ? await this.element.setChecked(checkObj)
      : await this.element.setChecked(checkObj.state, {...checkObj.opts})
  }

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
  getRadioButtonData,
}
