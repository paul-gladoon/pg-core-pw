/* eslint-disable @typescript-eslint/ban-ts-comment */
import {CollectionElements} from '../../../lib/collection/collection.elements'
import {InputElement} from '../../../lib/elements/input'
import {
  TextElement,
  TextGet,
  TextGetResult,
  TextIsDisplayed,
  TextIsDisplayedResult,
  TextIsExist,
  TextWaitForDataState,
  TextWaitForDisplayedState,
} from '../../../lib/elements/text'
import {
  BaseElement,
  BaseElementGet,
  BaseElementGetResult,
  BaseElementIsDisplayed,
  BaseElementIsExist,
  BaseElementScroll,
  BaseElementWaitForDisplayedState,
} from '../../../lib/base.element'
import {
  HelpFragment,
  IHelpFragmentClick,
  IHelpFragmentGet,
  IHelpFragmentGetResult,
  IHelpFragmentHover,
  IHelpFragmentIsDisplayed,
  IHelpFragmentIsDisplayedResult,
  IHelpFragmentWaitForDataState,
  IHelpFragmentWaitForDisplayedState,
} from './fragments/help.fragment'
import {BaseFragment} from '../../../lib/base.fragment'

interface ICustomSelectSharedFragmentSendKeys {
  option?: string
}

interface ICustomSelectSharedFragmentClick {
  helpMenu?: IHelpFragmentClick
}

interface ICustomSelectSharedFragmentGet {
  selected?: TextGet
  helpMenu?: IHelpFragmentGet
  _root?: BaseElementGet
  select?: BaseElementGet
}

interface ICustomSelectSharedFragmentGetResult {
  selected?: TextGetResult
  helpMenu?: IHelpFragmentGetResult
  _root?: BaseElementGetResult
  select?: BaseElementGetResult
}

interface ICustomSelectSharedFragmentIsDisplayed {
  selected?: TextIsDisplayed
  helpMenu?: IHelpFragmentIsDisplayed
  select?: BaseElementIsDisplayed
  _root?: BaseElementIsDisplayed
}

interface ICustomSelectSharedFragmentIsDisplayedResult {
  selected?: TextIsDisplayedResult
  helpMenu?: IHelpFragmentIsDisplayedResult
}

interface ICustomSelectSharedFragmentIsExist {
  selected?: TextIsExist
  helpMenu?: IHelpFragmentIsDisplayed
  select?: BaseElementIsExist
  _root?: BaseElementIsExist
}

interface ICustomSelectSharedFragmentWaitForDataState {
  selected?: TextWaitForDataState
  helpMenu?: IHelpFragmentWaitForDataState
}

interface ICustomSelectSharedFragmentWaitForDisplayedState {
  selected?: TextWaitForDisplayedState
  helpMenu?: IHelpFragmentWaitForDisplayedState
  _root?: BaseElementWaitForDisplayedState
}

interface ICustomSelectSharedFragmentHover {
  helpMenu?: IHelpFragmentHover
}

interface ICustomSelectSharedFragmentScroll {
  select?: BaseElementScroll
}

class CustomSelectSharedFragment extends BaseFragment {
  private select: BaseElement
  private input: InputElement
  private _options: CollectionElements
  private selected: TextElement
  private helpMenu: HelpFragment

  constructor(page, parentLocator, fragmentRootSelector, name = 'Custom select', options) {
    super(page, parentLocator, fragmentRootSelector, name, options)
    this.select = this.init(BaseElement, '.spvb-select-color', 'Select')
    this.input = this.init(InputElement, 'input[id*="react-select-"]', 'Input')
    this._options = this.initCollection(CollectionElements, TextElement, '[class*="spvb-select-options-menu-lab"]', 'Options')
    this.selected = this.init(TextElement, '.spvb-select__single-value, .spvb-select-current-value-label', 'Selected value')
    this.helpMenu = this.init(HelpFragment, '.spvb-form-input-label', 'Help fragment')
  }

  async sendKeys(data: ICustomSelectSharedFragmentSendKeys) {
    await this.waitVisible()
    for (const key of Object.keys(data)) {
      if (key === 'option') {
        // @ts-ignore
        await this.select.click(null)
        await this.input.sendKeys(data.option)
        await this._options.click({_action: null, _where: {text: data.option}})
      }
    }
  }

  async get(getObj: ICustomSelectSharedFragmentGet) {
    if (!getObj) {
      throw new Error(`${this.name} get argument should be an object`)
    }
    await this.waitVisible()
    const tempGet: ICustomSelectSharedFragmentGetResult = {}
    for (const key of Object.keys(getObj)) {
      if (!this[key]) {
        throw new Error(`${this.name} does not have ${key} property`)
      }
      if (key === '_options') {
        await this.select.click(null)
        tempGet[key] = await this._options.get({_action: {text: null}})
        return tempGet
      }
      tempGet[key] = await this[key].get(getObj[key])
    }
    return tempGet
  }
}

export {
  CustomSelectSharedFragment,
  ICustomSelectSharedFragmentGet,
  ICustomSelectSharedFragmentGetResult,
  ICustomSelectSharedFragmentIsDisplayed,
  ICustomSelectSharedFragmentIsDisplayedResult,
  ICustomSelectSharedFragmentIsExist,
  ICustomSelectSharedFragmentSendKeys,
  ICustomSelectSharedFragmentClick,
  ICustomSelectSharedFragmentHover,
  ICustomSelectSharedFragmentWaitForDataState,
  ICustomSelectSharedFragmentWaitForDisplayedState,
  ICustomSelectSharedFragmentScroll,
}
