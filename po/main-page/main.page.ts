import {BasePage} from "../../lib/base.page";
import {CollectionElements} from "../../lib/collection.elements";
import {ButtonClick, ButtonElement, ButtonGet, ButtonGetResult, ButtonGetScreenshot, ButtonHover, ButtonIsDisplayed, ButtonIsExist, ButtonScroll, ButtonWaitForDataState, ButtonWaitForDisplayedState} from "../../lib/elements/button";
import {InputElement, InputGet, InputSendKeys} from "../../lib/elements/input";
import {TextCollectionClick, TextCollectionGet, TextCollectionHover, TextCollectionWaitForDataState, TextCollectionWaitForDisplayedState, TextElement} from "../../lib/elements/text";
import {NavFragment, INavFragmentClick, INavFragmentGet, INavFragmentGetResult} from "./fragments/nav.fargment";

interface IMainPageClick {
  navigationBar?: INavFragmentClick
  searchBtn?: ButtonClick
  navItems?: TextCollectionClick
}

interface IMainPageSendKeys {
  searchInput?: InputSendKeys
}

interface IMainPageGet {
  navigationBar?: INavFragmentGet
  searchBtn?: ButtonGet
  searchInput?: InputGet
  navItems?: TextCollectionGet
}

interface IMainPageGetResult {
  navigationBar?: INavFragmentGetResult
  searchBtn?: ButtonGetResult
}

interface IMainPageHover {
  searchBtn?: ButtonHover
  navItems?: TextCollectionHover
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
  navItems?: TextCollectionWaitForDataState
}

interface IMainPageWaitForDisplayedState {
  searchBtn?: ButtonWaitForDisplayedState
  navItems?: TextCollectionWaitForDisplayedState
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
  private navItems: CollectionElements

  constructor(page) {
    super(page, '[id="__docusaurus"]', 'Playwright Main Page', 'https://playwright.dev/')
    this.navigationBar = this.init(NavFragment, '[class="navbar__items"]', 'Navigation bar', {locatorOpts: {nth: 0}})
    this.searchBtn = this.init(ButtonElement, '[class="DocSearch DocSearch-Button"]', 'Search btn')
    this.searchInput = this.init(InputElement, '.DocSearch-Input', 'Search input', {searchFromDOMRoot: true})
    this.navItems = this.initCollection(CollectionElements, TextElement, '.navbar__items [class*="item"]', 'Menu items')
  }
}

export {MainPage, IMainPage}