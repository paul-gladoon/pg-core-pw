import {BaseElementClick, BaseElementHover} from '../../lib'
import {BasePage, IBasePage} from '../../lib/base.page'
import {CollectionFragments} from '../../lib/base.types'
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
  TextCollectionIsDisplayed,
  TextCollectionIsExisting,
  TextCollectionWaitForDataState,
  TextCollectionWaitForDisplayedState,
  TextElement,
} from '../../lib/elements/text'
import {
  FooterFragment,
  IFooterFragmentClick,
  IFooterFragmentGet,
  IFooterFragmentHover,
  IFooterFragmentIsDisplayed,
  IFooterFragmentIsExist,
  IFooterFragmentWaitForDataState,
  IFooterFragmentWaitForDisplayedState,
} from './fragments/footer/footer.fragment'
import {HeaderFragment, IHeaderFragmentClick, IHeaderFragmentGet} from './fragments/header.fragment'
import {NavFragment, INavFragmentClick, INavFragmentGet} from './fragments/nav.fargment'

interface IMainPageClick {
  navigationBars?: INavFragmentClick
  searchBtn?: ButtonClick
  navItems?: TextCollectionClick
  github?: ButtonClick
  header?: IHeaderFragmentClick
  footer?: IFooterFragmentClick
  _root?: BaseElementClick
}

interface IMainPageSendKeys {
  searchInput?: InputSendKeys
}

interface IMainPageGet {
  navigationBars?: INavFragmentGet
  searchBtn?: ButtonGet
  searchInput?: InputGet
  navItems?: TextCollectionGet
  header?: IHeaderFragmentGet
  apiItem?: ButtonGet
  footer?: IFooterFragmentGet
}

interface IMainPageHover {
  searchBtn?: ButtonHover
  navItems?: TextCollectionHover
  footer?: IFooterFragmentHover
  _root?: BaseElementHover
}

interface IMainPageScroll {
  searchBtn?: ButtonScroll
}

interface IMainPageIsDisplayed {
  searchBtn?: ButtonIsDisplayed
  navItems?: TextCollectionIsDisplayed
  footer?: IFooterFragmentIsDisplayed
}

interface IMainPageIsExist {
  searchBtn?: ButtonIsExist
  navItems?: TextCollectionIsExisting
  footer?: IFooterFragmentIsExist
}

interface IMainPageGetScreenshot {
  searchBtn?: ButtonGetScreenshot
}

interface IMainPageWaitForDataState {
  searchBtn?: ButtonWaitForDataState
  navItems?: TextCollectionWaitForDataState
  footer?: IFooterFragmentWaitForDataState
}

interface IMainPageWaitForDisplayedState {
  searchBtn?: ButtonWaitForDisplayedState
  navItems?: TextCollectionWaitForDisplayedState
  footer?: IFooterFragmentWaitForDisplayedState
}

interface IMainPage extends IBasePage {
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
  private navigationBars: CollectionFragments
  private searchBtn: ButtonElement
  private github: ButtonElement
  private searchInput: InputElement
  private navItems: CollectionElements
  private header: HeaderFragment
  private apiItem: ButtonElement
  private footer: FooterFragment

  constructor(browserContext, page) {
    super(browserContext, page, '[id="__docusaurus"]', 'Playwright Main Page', 'https://playwright.dev/')
    this.navigationBars = this.initCollection(CollectionFragments, NavFragment, '.navbar__items', 'Navigation bar')
    this.searchBtn = this.init(ButtonElement, '[class="DocSearch DocSearch-Button"]', 'Search btn')
    this.searchInput = this.init(InputElement, '.DocSearch-Input', 'Search input', {searchFromDOMRoot: true})
    this.navItems = this.initCollection(CollectionElements, TextElement, '.navbar__items [class*="item"]', 'Menu items')
    this.github = this.init(ButtonElement, '[aria-label="GitHub repository"]', 'GitHub')
    this.header = this.init(HeaderFragment, 'header.hero', 'Header')
    this.apiItem = this.init(
      ButtonElement,
      [
        {selector: '.navbar__title', opts: {selectorOpts: {hasText: 'Playwright'}}},
        '..',
        '..',
        '..',
        {selector: 'a', opts: {selectorOpts: {hasText: 'API'}}},
      ],
      'Navbar'
    )
    this.footer = this.init(FooterFragment, '.footer', 'Footer')
  }
}

export {MainPage, IMainPage}
