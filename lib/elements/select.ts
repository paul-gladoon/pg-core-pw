import {getValues} from '../utils/evaluate.fn'
import {BaseElement, BaseElementScroll, IGeneralActionsOptions} from '../base.element'

interface ISelectGet {
  selected?: null
  attribute?: string | string[]
}

interface ISelectGetResult {
  selected?: string
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

type SelectSendKeys = string | string[] | {value?: string; label?: string; index?: number; opts?: IGeneralActionsOptions}
type SelectScroll = BaseElementScroll
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

  async click() {
    throw new Error(`${this.name} is select, select does not have click, please use sendKeys for select option.`)
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
  SelectScroll,
  getSelectedData,
}
