import {BasePage} from '../../lib/base.page'
import {CollectionFragments} from '../../lib/base.types'
import {BrowserActioner} from '../../lib/browser/browser.actioner'
import {BrowserConsoler} from '../../lib/browser/browser.consoler'
import {BrowserTabber} from '../../lib/browser/browser.tabber'
import {CollectionElements} from '../../lib/collection/collection.elements'
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
import {InputElement, InputGet, InputSendKeys} from '../../lib/elements/input'
import {
  TextCollectionClick,
  TextCollectionGet,
  TextCollectionHover,
  TextCollectionWaitForDataState,
  TextCollectionWaitForDisplayedState,
  TextElement,
} from '../../lib/elements/text'
import {NavFragment, ICollectionNavFragmentClick, ICollectionNavFragmentGet} from './fragments/nav.fargment'

interface IMainPageClick {
  navigationBars?: ICollectionNavFragmentClick
  searchBtn?: ButtonClick
  navItems?: TextCollectionClick
  github?: ButtonClick
}

interface IMainPageSendKeys {
  searchInput?: InputSendKeys
}

interface IMainPageGet {
  navigationBars?: ICollectionNavFragmentGet
  searchBtn?: ButtonGet
  searchInput?: InputGet
  navItems?: TextCollectionGet
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
  _tabber: BrowserTabber
  _consoler: BrowserConsoler
  _actioner: BrowserActioner
}

class MainPage extends BasePage {
  private navigationBars: CollectionFragments
  private searchBtn: ButtonElement
  private github: ButtonElement
  private searchInput: InputElement
  private navItems: CollectionElements

  constructor(browserContext, page) {
    super(browserContext, page, '[id="__docusaurus"]', 'Playwright Main Page', 'https://playwright.dev/')
    this.navigationBars = this.initCollection(CollectionFragments, NavFragment, '.navbar__items', 'Navigation bar')
    this.searchBtn = this.init(ButtonElement, '[class="DocSearch DocSearch-Button"]', 'Search btn')
    this.searchInput = this.init(InputElement, '.DocSearch-Input', 'Search input', {searchFromDOMRoot: true})
    this.navItems = this.initCollection(CollectionElements, TextElement, '.navbar__items [class*="item"]', 'Menu items')
    this.github = this.init(ButtonElement, '[aria-label="GitHub repository"]', 'GitHub')
  }
}

export {MainPage, IMainPage}
