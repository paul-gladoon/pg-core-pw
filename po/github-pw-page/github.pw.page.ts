import {BasePage, IBasePage} from '../../lib/base.page'
import {BrowserConsoler} from '../../lib/browser/browser.consoler'
import {BrowserTabber} from '../../lib/browser/browser.tabber'
import {
  ButtonPerform,
  ButtonElement,
  ButtonGet,
  ButtonGetResult,
  ButtonGetScreenshot,
  ButtonIsDisplayed,
  ButtonIsDisplayedResult,
  ButtonIsExist,
  ButtonIsExistResult,
  ButtonWaitForDataState,
  ButtonWaitForDisplayedState,
} from '../../lib/elements/button'

interface IGithubPWPagePerform {
  home?: ButtonPerform
}

interface IGithubPWPageGet {
  home?: ButtonGet
}

interface IGithubPWPageGetResult {
  home?: ButtonGetResult
}

interface IGithubPWPageIsDisplayed {
  home?: ButtonIsDisplayed
}

interface IGithubPWPageIsExist {
  home?: ButtonIsExist
}

interface IGithubPWPageIsDisplayedResult {
  home?: ButtonIsDisplayedResult
}

interface IGithubPWPageIsExistResult {
  home?: ButtonIsExistResult
}

interface IGithubPWPageGetScreenshot {
  home?: ButtonGetScreenshot
}

interface IGithubPWPageWaitForDataState {
  home?: ButtonWaitForDataState
}

interface IGithubPWPageWaitForDisplayedState {
  home?: ButtonWaitForDisplayedState
}

interface IGithubPWPage extends IBasePage {
  perform(performObj: IGithubPWPagePerform): Promise<void>
  get(getObj: IGithubPWPageGet): Promise<IGithubPWPageGetResult>
  isDisplay(dispObj: IGithubPWPageIsDisplayed): Promise<IGithubPWPageIsDisplayedResult>
  isExist(existObj: IGithubPWPageIsExist): Promise<IGithubPWPageIsExistResult>
  getScreenshot(scrObj: IGithubPWPageGetScreenshot): Promise<void>
  waitForDataState(waitForObj: IGithubPWPageWaitForDataState, waitTime?: number, dontThrowError?: boolean): Promise<boolean>
  waitForDisplayedState(
    waitForObj: IGithubPWPageWaitForDisplayedState,
    waitTime?: number,
    dontThrowError?: boolean
  ): Promise<boolean>
  _tabber: BrowserTabber
  _consoler: BrowserConsoler
}

class GithubPWPage extends BasePage {
  private home: ButtonElement

  constructor(browserContext, page) {
    super(browserContext, page, 'body', 'GitHub PW Page')
    this.home = this.init(ButtonElement, '[aria-label="Homepage"]', 'Home')
  }
}

export {GithubPWPage, IGithubPWPage}
