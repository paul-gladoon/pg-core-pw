import {BasePage} from '../../lib/base.page'
import {BrowserConsoler} from '../../lib/browser/browser.consoler'
import {BrowserTabber} from '../../lib/browser/browser.tabber'
import {
  ButtonClick,
  ButtonElement,
  ButtonGet,
  ButtonGetScreenshot,
  ButtonHover,
  ButtonIsDisplayed,
  ButtonIsExist,
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

interface IGithubPWPageGetScreenshot {
  home?: ButtonGetScreenshot
}

interface IGithubPWPageWaitForDataState {
  home?: ButtonWaitForDataState
}

interface IGithubPWPageWaitForDisplayedState {
  home?: ButtonWaitForDisplayedState
}

interface IGithubPWPage {
  click(clickObj: IGithubPWPageClick)
  get(getObj: IGithubPWPageGet)
  hover(hoverObj: IGithubPWPageHover)
  scroll(scrollObj: IGithubPWPageScroll)
  isDisplay(dispObj: IGithubPWPageIsDisplayed)
  isExist(existObj: IGithubPWPageIsExist)
  getScreenshot(scrObj: IGithubPWPageGetScreenshot)
  waitForDataState(waitForObj: IGithubPWPageWaitForDataState, waitTime?: number, dontThrowError?: boolean)
  waitForDisplayedState(waitForObj: IGithubPWPageWaitForDisplayedState, waitTime?: number, dontThrowError?: boolean)
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
