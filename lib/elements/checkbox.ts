import {getValues} from '../utils/evaluate.fn'
import {
  BaseElement,
  BaseElementCollectionIsExisting,
  BaseElementGetScreenshot,
  BaseElementHover,
  BaseElementScroll,
  IGeneralActionsOptions,
} from '../base.element'

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
  _where?: ICheckBoxReturn
  _every?: boolean
  _some?: boolean
  _index?: number
  _includes?: boolean
  _length?: number | string
}

interface ICheckBoxCollectionWaitForDisplayedState {
  _state: boolean
  _every?: boolean
  _some?: boolean
  _index?: number
}

interface ICheckBoxWaitForDataState {
  _where: ICheckBoxReturn
  _includes?: boolean
}

interface ICheckBoxCollectionGet {
  _action?: CheckBoxGet
  _where?: CheckBoxGetResult
  _index?: number
  _length?: null
}

interface ICheckBoxCollectionIsDisplayed {
  _action: null
  _where?: CheckBoxGetResult
  _index?: number
}

interface ICheckBoxCollectionHover {
  _action: CheckBoxHover
  _where?: CheckBoxGetResult
  _index?: number
}

interface ICheckBoxCollectionSendKeys {
  _action: CheckBoxSendKeys
  _where?: CheckBoxGetResult
  _index?: number
}

type CheckBoxSendKeys = boolean | {state: boolean; opts: ICheckedOptions}
type CheckBoxGet = ICheckBoxGetValues
type CheckBoxGetResult = ICheckBoxReturn
type CheckBoxIsDisplayed = null
type CheckBoxHover = BaseElementHover
type CheckBoxIsDisplayedResult = boolean
type CheckBoxCollectionWaitForDataState = ICheckBoxCollectionWaitForDataState
type CheckBoxCollectionWaitForDisplayedState = ICheckBoxCollectionWaitForDisplayedState
type CheckBoxWaitForDisplayedState = boolean
type CheckBoxWaitForDataState = ICheckBoxWaitForDataState
type CheckBoxIsExist = null
type CheckBoxIsExistResult = boolean
type CheckBoxScroll = BaseElementScroll
type CheckBoxGetScreenshot = BaseElementGetScreenshot
type CheckBoxCollectionGet = ICheckBoxCollectionGet
type CheckBoxCollectionGetResult = CheckBoxGetResult[] & {_length?: number}
type CheckBoxCollectionHover = ICheckBoxCollectionHover
type CheckBoxCollectionIsDisplayed = ICheckBoxCollectionIsDisplayed
type CheckBoxCollectionIsDisplayedResult = boolean[]
type CheckBoxCollectionIsExisting = BaseElementCollectionIsExisting
type CheckBoxCollectionIsExistingResult = boolean[]
type CheckBoxCollectionSendKeys = ICheckBoxCollectionSendKeys

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
    const label = this.init(BaseElement, ['..', 'label'], 'Label')
    await label.waitVisible()
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
  CheckBoxIsExist,
  CheckBoxIsExistResult,
  CheckBoxScroll,
  CheckBoxGetScreenshot,
  CheckBoxCollectionGet,
  CheckBoxCollectionGetResult,
  CheckBoxCollectionHover,
  CheckBoxCollectionIsDisplayed,
  CheckBoxCollectionIsDisplayedResult,
  CheckBoxCollectionIsExisting,
  CheckBoxCollectionIsExistingResult,
  CheckBoxCollectionSendKeys,
}
