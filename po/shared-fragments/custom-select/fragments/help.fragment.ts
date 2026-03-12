import {BaseFragment} from '../../../../lib/base.fragment'
import {
  ButtonClick,
  ButtonElement,
  ButtonGet,
  ButtonGetResult,
  ButtonHover,
  ButtonIsDisplayed,
  ButtonIsDisplayedResult,
  ButtonScroll,
  ButtonWaitForDataState,
  ButtonWaitForDisplayedState,
} from '../../../../lib/elements/button'
import {
  TextClick,
  TextElement,
  TextGet,
  TextGetResult,
  TextHover,
  TextIsDisplayed,
  TextIsDisplayedResult,
  TextWaitForDataState,
  TextWaitForDisplayedState,
} from '../../../../lib/elements/text'

interface IHelpFragmentClick {
  content?: TextClick
  help?: ButtonClick
  _root?: TextClick
}

interface IHelpFragmentGet {
  content?: TextGet
  help?: ButtonGet
  _root?: TextGet
}

interface IHelpFragmentGetResult {
  content?: TextGetResult
  help?: ButtonGetResult
  _root?: TextGetResult
}

interface IHelpFragmentIsDisplayed {
  content?: TextIsDisplayed
  help?: ButtonIsDisplayed
  _root?: TextIsDisplayed
}

interface IHelpFragmentIsDisplayedResult {
  content?: TextIsDisplayedResult
  help?: ButtonIsDisplayedResult
  _root?: TextIsDisplayedResult
}

interface IHelpFragmentHover {
  content?: TextHover
  help?: ButtonHover
  _root?: TextHover
}

interface IHelpFragmentWaitForDataState {
  content?: TextWaitForDataState
  help?: ButtonWaitForDataState
  _root?: TextWaitForDataState
}

interface IHelpFragmentWaitForDisplayedState {
  content?: TextWaitForDisplayedState
  help?: ButtonWaitForDisplayedState
  _root?: TextWaitForDisplayedState
}

interface IHelpFragmentScroll {
  help?: ButtonScroll
}

class HelpFragment extends BaseFragment {
  private content: TextElement
  private help: ButtonElement

  constructor(page, parentLocator, fragmentRootSelector = '.spvb-form-input-label', name = 'Help fragment', options) {
    super(page, parentLocator, fragmentRootSelector, name, options)
    this.content = this.init(TextElement, '.spvb-form-input-label-help-text', 'Help text')
    this.help = this.init(ButtonElement, '.spvb-form-input-label-help-button', 'Help button')
  }
}

export {
  HelpFragment,
  IHelpFragmentClick,
  IHelpFragmentGet,
  IHelpFragmentGetResult,
  IHelpFragmentIsDisplayed,
  IHelpFragmentIsDisplayedResult,
  IHelpFragmentHover,
  IHelpFragmentScroll,
  IHelpFragmentWaitForDataState,
  IHelpFragmentWaitForDisplayedState,
}
