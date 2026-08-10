import {getValues} from '../utils/evaluate.fn'
import {BaseElement, BaseElementPerformScroll, IGeneralActionsOptions, IScrollOptions} from '../base.element'

interface ISelectGet {
  selected?: null
  isDisabled?: null
  attribute?: string | string[]
}

interface ISelectGetResult {
  selected?: string
  isDisabled?: boolean
}

function getSelectedData(_element, {getObj, getValues}) {
  const fn = new Function(`return ${getValues}`)()
  const values = {
    selected: function () {
      return _element.value.trim()
    },
    attribute: function (attr) {
      return _element.getAttribute(attr)
    },
    isDisabled: function () {
      return (_element as HTMLButtonElement).disabled
    },
  }

  return fn(getObj, values)
}

interface ISelectCollectionWaitForDataState {
  _where?: ISelectGetResult
  _every?: boolean
  _some?: boolean
  _index?: number
  _includes?: boolean
  _length?: number | string
}

interface ISelectCollectionWaitForDisplayedState {
  _state: boolean
  _every?: boolean
  _some?: boolean
  _index?: number
}

interface ISelectWaitForDataState {
  _where: ISelectGetResult
  _includes?: boolean
}

interface ISelectCollectionPerformScroll extends IScrollOptions {
  _action: 'scroll'
  _where?: SelectGetResult
  _index?: number
}

type SelectSendKeys = string | string[] | {value?: string; label?: string; index?: number; opts?: IGeneralActionsOptions}
type SelectPerform = BaseElementPerformScroll
type SelectCollectionPerform = ISelectCollectionPerformScroll
type SelectIsDisplayed = null
type SelectIsDisplayedResult = boolean
type SelectGet = ISelectGet
type SelectGetResult = ISelectGetResult
type SelectCollectionWaitForDataState = ISelectCollectionWaitForDataState
type SelectCollectionWaitForDisplayedState = ISelectCollectionWaitForDisplayedState
type SelectWaitForDisplayedState = boolean
type SelectWaitForDataState = ISelectWaitForDataState

class SelectElement extends BaseElement {
  constructor(page, parentLocator, elementRootSelector, name, options?) {
    super(page, parentLocator, elementRootSelector, name, options)
  }

  async sendKeys(sendObj: SelectSendKeys) {
    if (typeof sendObj === 'string' || Array.isArray(sendObj)) {
      await this.element.selectOption(sendObj)
    } else {
      const {value, label, index, opts} = sendObj
      const select = {value, label, index}

      await this.element.selectOption(select, opts)
    }
  }

  async get(getObj: ISelectGet) {
    await this.waitVisible()
    return this.element.evaluate(getSelectedData, {getObj, getValues: getValues.toString()})
  }

  async perform(action: SelectPerform) {
    return super.perform(action)
  }

  protected async click() {
    throw new Error(`${this.name} is select, select does not have click, please use sendKeys for select option.`)
  }

  protected async hover() {
    throw new Error(`${this.name} is select, select does not have hover, please use sendKeys for select option.`)
  }
}

export {
  SelectElement,
  SelectSendKeys,
  SelectIsDisplayed,
  SelectIsDisplayedResult,
  SelectGet,
  SelectGetResult,
  SelectCollectionWaitForDataState,
  SelectCollectionWaitForDisplayedState,
  SelectWaitForDisplayedState,
  SelectWaitForDataState,
  SelectPerform,
  SelectCollectionPerform,
  getSelectedData,
}
