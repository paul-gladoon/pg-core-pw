import {BasePage, IBasePage} from '../../lib/base.page'
import {
  CheckBoxElement,
  CheckBoxSendKeys,
  CheckBoxWaitForDataState,
  CheckBoxWaitForDisplayedState,
} from '../../lib/elements/checkbox'

interface ICheckboxPageSendKeys {
  checkbox?: CheckBoxSendKeys
}

interface ICheckboxPageWaitForDataState {
  checkbox?: CheckBoxWaitForDataState
}

interface ICheckboxPageWaitForDisplayedState {
  checkbox?: CheckBoxWaitForDisplayedState
}

interface ICheckboxPage extends IBasePage {
  sendKeys(sendObj: ICheckboxPageSendKeys)
  waitForDataState(waitForObj: ICheckboxPageWaitForDataState, waitTime?: number, dontThrowError?: boolean)
  waitForDisplayedState(waitForObj: ICheckboxPageWaitForDisplayedState, waitTime?: number, dontThrowError?: boolean)
}

class CheckboxPage extends BasePage {
  private checkbox: CheckBoxElement

  constructor(browserContext, page) {
    super(browserContext, page, 'body', 'Checkbox Main Page')
    this.checkbox = this.init(CheckBoxElement, '[type="checkbox"]', 'Checkbox', {locatorOpts: 'first'})
  }
}

export {CheckboxPage, ICheckboxPage}
