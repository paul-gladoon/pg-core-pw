import {BasePage, IBasePage} from '../../lib/base.page'
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

interface ISelectPage extends IBasePage {
  sendKeys(sendObj: ISelectPageSendKeys): Promise<void>
  waitForDataState(waitForObj: ISelectPageWaitForDataState, waitTime?: number, dontThrowError?: boolean): Promise<boolean>
  waitForDisplayedState(
    waitForObj: ISelectPageWaitForDisplayedState,
    waitTime?: number,
    dontThrowError?: boolean
  ): Promise<boolean>
}

class SelectPage extends BasePage {
  private select: SelectElement

  constructor(browserContext, page) {
    super(browserContext, page, 'body', 'Select Main Page')
    this.select = this.init(SelectElement, 'select', 'Select', {locatorOpts: 'first'})
  }
}

export {SelectPage, ISelectPage}
