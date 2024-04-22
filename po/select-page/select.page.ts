import {BasePage} from '../../lib/base.page'
import {SelectElement, SelectSendKeys, SelectWaitForDataState, SelectWaitForDisplayedState} from '../../lib/elements/select'

interface ISelectPageSendKeys {
  select?: SelectSendKeys
}

interface ISelectPageWaitForDataState {
  select?: SelectWaitForDataState
}

interface ISelectPageWaitForDisplayedState {
  select?: SelectWaitForDisplayedState
}

interface ISelectPage {
  goToPage()
  sendKeys(sendObj: ISelectPageSendKeys)
  waitForDataState(waitForObj: ISelectPageWaitForDataState, waitTime?: number, dontThrowError?: boolean)
  waitForDisplayedState(waitForObj: ISelectPageWaitForDisplayedState, waitTime?: number, dontThrowError?: boolean)
}

class SelectPage extends BasePage {
  private select: SelectElement

  constructor(browserContext, page) {
    super(
      browserContext,
      page,
      'body',
      'Select Main Page',
      'https://stevefaulkner.github.io/html-mapping-tests/browser-tests/select-test.html'
    )
    this.select = this.init(SelectElement, 'select', 'Select', {locatorOpts: 'first'})
  }
}

export {SelectPage, ISelectPage}
