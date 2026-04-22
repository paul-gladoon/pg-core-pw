import {BasePage, IBasePage} from '../../lib/base.page'
import {BrowserConsoler} from '../../lib/browser/browser.consoler'
import {BrowserTabber} from '../../lib/browser/browser.tabber'
import {
  ButtonClick,
  ButtonElement,
  ButtonGet,
  ButtonGetResult,
  ButtonGetScreenshot,
  ButtonHover,
  ButtonIsDisplayed,
  ButtonIsDisplayedResult,
  ButtonIsExist,
  ButtonIsExistResult,
  ButtonScroll,
  ButtonWaitForDataState,
  ButtonWaitForDisplayedState,
} from '../../lib/elements/button'

interface IGithubPWPageClick {
  home?: ButtonClick
}

interface IGithubPWPageGet {
  home?: ButtonGet
}

interface IGithubPWPageGetResult {
  home?: ButtonGetResult
}

interface IGithubPWPageHover {
  home?: ButtonHover
}

interface IGithubPWPageScroll {
  home?: ButtonScroll
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
  click(clickObj: IGithubPWPageClick): Promise<void>
  get(getObj: IGithubPWPageGet): Promise<IGithubPWPageGetResult>
  hover(hoverObj: IGithubPWPageHover): Promise<void>
  scroll(scrollObj: IGithubPWPageScroll): Promise<void>
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
    this.home = this.init(ButtonElement, '.HeaderMenu-link--sign-in', 'Sign In')
  }
}

export {GithubPWPage, IGithubPWPage}
