import {BaseElementPerform} from '../../lib'
import {BasePage, IBasePage} from '../../lib/base.page'
import {CollectionFragments} from '../../lib/base.types'
import {CollectionElements} from '../../lib/collection/collection.elements'
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
import {InputElement, InputGet, InputGetResult, InputSendKeys} from '../../lib/elements/input'
import {
  TextCollectionPerform,
  TextCollectionGet,
  TextCollectionGetResult,
  TextCollectionIsDisplayed,
  TextCollectionIsDisplayedResult,
  TextCollectionIsExisting,
  TextCollectionIsExistingResult,
  TextCollectionWaitForDataState,
  TextCollectionWaitForDisplayedState,
  TextElement,
} from '../../lib/elements/text'
import {
  FooterFragment,
  IFooterFragmentPerform,
  IFooterFragmentGet,
  IFooterFragmentGetResult,
  IFooterFragmentIsDisplayed,
  IFooterFragmentIsDisplayedResult,
  IFooterFragmentIsExist,
  IFooterFragmentIsExistResult,
  IFooterFragmentWaitForDataState,
  IFooterFragmentWaitForDisplayedState,
} from './fragments/footer/footer.fragment'
import {HeaderFragment, IHeaderFragmentPerform, IHeaderFragmentGet, IHeaderFragmentGetResult} from './fragments/header.fragment'
import {
  NavFragment,
  ICollectionNavFragmentPerform,
  ICollectionNavFragmentGet,
  ICollectionNavFragmentGetResult,
} from './fragments/nav.fargment'

interface IMainPagePerform {
  navigationBars?: ICollectionNavFragmentPerform
  searchBtn?: ButtonPerform
  navItems?: TextCollectionPerform
  github?: ButtonPerform
  header?: IHeaderFragmentPerform
  footer?: IFooterFragmentPerform
  _root?: BaseElementPerform
}

interface IMainPageSendKeys {
  searchInput?: InputSendKeys
}

interface IMainPageGet {
  navigationBars?: ICollectionNavFragmentGet
  searchBtn?: ButtonGet
  searchInput?: InputGet
  navItems?: TextCollectionGet
  header?: IHeaderFragmentGet
  apiItem?: ButtonGet
  footer?: IFooterFragmentGet
}

interface IMainPageGetResult {
  navigationBars?: ICollectionNavFragmentGetResult
  searchBtn?: ButtonGetResult
  searchInput?: InputGetResult
  navItems?: TextCollectionGetResult
  header?: IHeaderFragmentGetResult
  apiItem?: ButtonGetResult
  footer?: IFooterFragmentGetResult
}

interface IMainPageIsDisplayed {
  searchBtn?: ButtonIsDisplayed
  navItems?: TextCollectionIsDisplayed
  footer?: IFooterFragmentIsDisplayed
}

interface IMainPageIsDisplayedResult {
  searchBtn?: ButtonIsDisplayedResult
  navItems?: TextCollectionIsDisplayedResult
  footer?: IFooterFragmentIsDisplayedResult
}

interface IMainPageIsExist {
  searchBtn?: ButtonIsExist
  navItems?: TextCollectionIsExisting
  footer?: IFooterFragmentIsExist
}

interface IMainPageIsExistResult {
  searchBtn?: ButtonIsExistResult
  navItems?: TextCollectionIsExistingResult
  footer?: IFooterFragmentIsExistResult
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
  perform(performObj: IMainPagePerform): Promise<void>
  get(getObj: IMainPageGet): Promise<IMainPageGetResult>
  sendKeys(sendObj: IMainPageSendKeys)
  isDisplay(dispObj: IMainPageIsDisplayed): Promise<IMainPageIsDisplayedResult>
  isExist(existObj: IMainPageIsExist): Promise<IMainPageIsExistResult>
  getScreenshot(scrObj: IMainPageGetScreenshot): Promise<void>
  waitForDataState(waitForObj: IMainPageWaitForDataState, waitTime?: number, dontThrowError?: boolean): Promise<boolean>
  waitForDisplayedState(waitForObj: IMainPageWaitForDisplayedState, waitTime?: number, dontThrowError?: boolean): Promise<boolean>
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
    super(browserContext, page, '[id="__docusaurus"]', 'Playwright Main Page')
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
