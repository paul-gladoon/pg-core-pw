import {BasePage} from "../../lib/base.page";
import {ButtonClick, ButtonElement, ButtonGet, ButtonGetResult, ButtonGetScreenshot, ButtonHover, ButtonIsDisplayed, ButtonIsExist, ButtonScroll, ButtonWaitForDataState, ButtonWaitForDisplayedState} from "../../lib/elements/button";
import {InputElement, InputGet, InputSendKeys} from "../../lib/elements/input";
import {NavFragment, INavFragmentClick, INavFragmentGet, INavFragmentGetResult} from "./fragments/nav.fargment";

interface IMainPageClick {
  navigationBar?: INavFragmentClick
  searchBtn?: ButtonClick
}

interface IMainPageSendKeys {
  searchInput?: InputSendKeys
}

interface IMainPageGet {
  navigationBar?: INavFragmentGet
  searchBtn?: ButtonGet
  searchInput?: InputGet
}

interface IMainPageGetResult {
  navigationBar?: INavFragmentGetResult
  searchBtn?: ButtonGetResult
}

interface IMainPageHover {
  searchBtn?: ButtonHover
}

interface IMainPageScroll {
  searchBtn?: ButtonScroll
}

interface IMainPageIsDisplayed {
  searchBtn?: ButtonIsDisplayed
}

interface IMainPageIsExist {
  searchBtn?: ButtonIsExist
}

interface IMainPageGetScreenshot {
  searchBtn?: ButtonGetScreenshot
}

interface IMainPageWaitForDataState {
  searchBtn?: ButtonWaitForDataState
}

interface IMainPageWaitForDisplayedState {
  searchBtn?: ButtonWaitForDisplayedState
}

interface IMainPage {
  click(clickObj: IMainPageClick)
  goToPage()
  get(getObj: IMainPageGet)
  sendKeys(sendObj: IMainPageSendKeys)
  hover(hoverObj: IMainPageHover)
  scroll(scrollObj: IMainPageScroll)
  isDisplay(dispObj: IMainPageIsDisplayed)
  isExist(existObj: IMainPageIsExist)
  getScreenshot(scrObj: IMainPageGetScreenshot)
  waitForDataState(waitForObj: IMainPageWaitForDataState, waitTime?: number, dontThrowError?: boolean)
  waitForDisplayedState(waitForObj: IMainPageWaitForDisplayedState, waitTime?: number, dontThrowError?: boolean)
}

class MainPage extends BasePage {
  private navigationBar: NavFragment
  private searchBtn: ButtonElement
  private searchInput: InputElement

  constructor(page) {
    super(page, '[id="__docusaurus"]', 'Playwright Main Page', 'https://playwright.dev/')
    this.navigationBar = this.init(NavFragment, '[class="navbar__items"]', 'Navigation bar', {locatorOpts: {nth: 0}})
    this.searchBtn = this.init(ButtonElement, '[class="DocSearch DocSearch-Button"]', 'Search btn')
    this.searchInput = this.init(InputElement, '.DocSearch-Input', 'Search input', {searchFromDOMRoot: true})
  }
}

export {MainPage, IMainPage}