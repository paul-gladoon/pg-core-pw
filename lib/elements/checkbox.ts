import {getValues} from '../utils/evaluate.fn'
import {BaseElement, BaseElementHover, IGeneralActionsOptions} from '../base.element'

interface ICheckedOptions extends IGeneralActionsOptions {
  position?: {
    x: number
    y: number
  }
  trial?: boolean
}

interface ICheckBoxGetValues {
  checked?: null
  isDisabled?: null
}

interface ICheckBoxReturn {
  checked?: boolean
  isDisabled?: boolean
}

function getCheckBoxData(_element, {getObj, getValues}) {
  const fn = new Function(`return ${getValues}`)()
  const values = {
    checked: function () {
      return _element.checked
    },
    isDisabled: function () {
      return _element.disabled
    },
  }

  return fn(getObj, values)
}

interface ICheckBoxCollectionWaitForDataState {
  expectedState: ICheckBoxReturn
  stateFor: {every: boolean} | {some: boolean} | {index: number}
  includes?: boolean
}

interface ICheckBoxCollectionWaitForDisplayedState {
  expectedState: boolean
  stateFor: {every: boolean} | {some: boolean} | {index: number}
}

interface ICheckBoxWaitForDataState {
  expectedState: ICheckBoxReturn
  includes?: boolean
}

type CheckBoxSendKeys = boolean | {state: boolean, opts: ICheckedOptions}
type CheckBoxGet = ICheckBoxGetValues
type CheckBoxGetResult = ICheckBoxReturn
type CheckBoxIsDisplayed = null
type CheckBoxHover = BaseElementHover
type CheckBoxIsDisplayedResult = boolean
type CheckBoxCollectionWaitForDataState = ICheckBoxCollectionWaitForDataState
type CheckBoxCollectionWaitForDisplayedState = ICheckBoxCollectionWaitForDisplayedState
type CheckBoxWaitForDisplayedState = boolean
type CheckBoxWaitForDataState = ICheckBoxWaitForDataState

class CheckBoxElement extends BaseElement {
  constructor(page, parentLocator, elementRootSelector, name, options?) {
    super(page, parentLocator, elementRootSelector, name, options)
  }

  async sendKeys(checkObj: CheckBoxSendKeys) {
    typeof checkObj === 'boolean'
      ? await this.element.setChecked(checkObj)
      : await this.element.setChecked(checkObj.state, {...checkObj.opts})
  }

  async click() {
    throw new Error(`${this.name} is checkbox, checkbox does not have click, please use sendKeys for changing state.`)
  }

  async get(getObj: ICheckBoxGetValues): Promise<ICheckBoxReturn> {
    return this.element.evaluate(getCheckBoxData, {getObj, getValues: getValues.toString()})
  }
}

export {
  CheckBoxElement,
  CheckBoxSendKeys,
  CheckBoxGet,
  CheckBoxGetResult,
  CheckBoxIsDisplayed,
  CheckBoxIsDisplayedResult,
  CheckBoxHover,
  getCheckBoxData,
  CheckBoxCollectionWaitForDataState,
  CheckBoxCollectionWaitForDisplayedState,
  CheckBoxWaitForDisplayedState,
  CheckBoxWaitForDataState,
}
