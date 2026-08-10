import {getValues} from '../utils/evaluate.fn'
import {
  BaseElement,
  BaseElementCollectionIsExisting,
  BaseElementGetScreenshot,
  BaseElementPerformHover,
  BaseElementPerformScroll,
  IGeneralActionsOptions,
  IHoverOptions,
  IScrollOptions,
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
  _action: TogglerSendKeys
  _where?: TogglerGetResult
  _index?: number
}

interface ITogglerCollectionGet {
  _action?: TogglerGet
  _where?: TogglerGetResult
  _index?: number
  _length?: null
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
  _where?: TogglerGetResult
  _every?: boolean
  _some?: boolean
  _index?: number
  _includes?: boolean
  _length?: number | string
}

interface ITogglerCollectionWaitForDisplayedState {
  _state: boolean
  _every?: boolean
  _some?: boolean
  _index?: number
}

interface ITogglerWaitForDataState {
  _where: TogglerGetResult
  _includes?: boolean
}

interface ITogglerCollectionPerformHover extends IHoverOptions {
  _action: 'hover'
  _where?: TogglerGetResult
  _index?: number
}

interface ITogglerCollectionPerformScroll extends IScrollOptions {
  _action: 'scroll'
  _where?: TogglerGetResult
  _index?: number
}

interface ITogglerCollectionIsDisplayed {
  _action: null
  _where?: TogglerGetResult
  _index?: number
}

type TogglerSendKeys = boolean | {state: boolean; opts: ITogglerOptions}
type TogglerGet = ITogglerGet
type TogglerGetResult = ITogglerGetReturn
type TogglerCollectionSendKeys = ITogglerCollectionSendKeys
type TogglerCollectionGet = ITogglerCollectionGet
type TogglerIsDisplayed = null
type TogglerIsDisplayedResult = boolean
type TogglerPerform = BaseElementPerformHover | BaseElementPerformScroll
type TogglerCollectionWaitForDataState = ITogglerCollectionWaitForDataState
type TogglerCollectionWaitForDisplayedState = ITogglerCollectionWaitForDisplayedState
type TogglerWaitForDisplayedState = boolean
type TogglerWaitForDataState = ITogglerWaitForDataState
type TogglerIsExist = null
type TogglerIsExistResult = boolean
type TogglerGetScreenshot = BaseElementGetScreenshot
type TogglerCollectionGetResult = TogglerGetResult[] & {_length?: number}
type TogglerCollectionPerform = ITogglerCollectionPerformHover | ITogglerCollectionPerformScroll
type TogglerCollectionIsDisplayed = ITogglerCollectionIsDisplayed
type TogglerCollectionIsDisplayedResult = boolean[]
type TogglerCollectionIsExisting = BaseElementCollectionIsExisting
type TogglerCollectionIsExistingResult = boolean[]

class TogglerElement extends BaseElement {
  constructor(page, parentLocator, elementRootSelector, name, options?) {
    super(page, parentLocator, elementRootSelector, name, options)
  }

  async sendKeys(checkObj: TogglerSendKeys) {
    typeof checkObj === 'boolean'
      ? await this.element.setChecked(checkObj)
      : await this.element.setChecked(checkObj.state, {...checkObj.opts})
  }

  async perform(action: TogglerPerform) {
    return super.perform(action)
  }

  protected async click() {
    throw new Error(`${this.name} is toggler, toggler does not have click, please use sendKeys.`)
  }

  async get(getObj: ITogglerGet): Promise<ITogglerGetReturn> {
    const label = this.init(BaseElement, ['..', 'label'], 'Label')
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
  TogglerPerform,
  TogglerCollectionWaitForDataState,
  TogglerCollectionWaitForDisplayedState,
  TogglerWaitForDisplayedState,
  TogglerWaitForDataState,
  TogglerIsExist,
  TogglerIsExistResult,
  TogglerGetScreenshot,
  TogglerCollectionGetResult,
  TogglerCollectionPerform,
  TogglerCollectionIsDisplayed,
  TogglerCollectionIsDisplayedResult,
  TogglerCollectionIsExisting,
  TogglerCollectionIsExistingResult,
}
