import {
  CollectionFragmentsAction,
  CollectionFragmentsGet,
  CollectionFragmentsWaitForDataState,
  CollectionFragmentsWaitForDisplayedState,
  TextPerform,
  TextElement,
  TextGet,
  TextGetResult,
  TextIsDisplayed,
  TextIsDisplayedResult,
  TextIsExist,
  TextWaitForDataState,
  TextWaitForDisplayedState,
} from '../../../../lib'
import {BaseFragment} from '../../../../lib/base.fragment'
import {
  ButtonCollectionPerform,
  ButtonCollectionGet,
  ButtonCollectionGetResult,
  ButtonCollectionIsDisplayed,
  ButtonCollectionIsDisplayedResult,
  ButtonCollectionIsExisting,
  ButtonCollectionIsExistingResult,
  ButtonCollectionWaitForDataState,
  ButtonCollectionWaitForDisplayedState,
  ButtonElement,
} from '../../../../lib/elements/button'
import {CollectionElements} from '../../../../lib'
import {TextIsExistResult} from '../../../../lib/elements/text'

interface IFooterSectionFragmentPerform extends CollectionFragmentsAction {
  _where?: {title?: TextGetResult; items?: ButtonCollectionGetResult}
  title?: TextPerform
  items?: ButtonCollectionPerform
}

interface IFooterSectionFragmentGet extends CollectionFragmentsGet {
  _where?: {title?: TextGetResult}
  title?: TextGet
  items?: ButtonCollectionGet
}

interface IFooterSectionFragmentIsDisplayed extends CollectionFragmentsAction {
  _where?: {title?: TextGetResult}
  title?: TextIsDisplayed
  items?: ButtonCollectionIsDisplayed
}

interface IFooterSectionFragmentIsExist extends CollectionFragmentsAction {
  _where?: {title?: TextGetResult}
  title?: TextIsExist
  items?: ButtonCollectionIsExisting
}

interface IFooterSectionFragmentWaitForDatatState extends CollectionFragmentsWaitForDataState {
  _where?: {title?: TextWaitForDataState; items?: ButtonCollectionWaitForDataState}
}

interface IFooterSectionFragmentWaitForDisplayedState extends CollectionFragmentsWaitForDisplayedState {
  _where?: {title?: TextWaitForDataState; items?: ButtonCollectionWaitForDataState}
  _state: {title?: TextWaitForDisplayedState; items?: ButtonCollectionWaitForDisplayedState}
}

interface IFooterSectionFragmentGetResult {
  title?: TextGetResult
  items?: ButtonCollectionGetResult
}

interface IFooterSectionFragmentIsDisplayedResult {
  title?: TextIsDisplayedResult
  items?: ButtonCollectionIsDisplayedResult
}

interface IFooterSectionFragmentIsExistResult {
  title?: TextIsExistResult
  items?: ButtonCollectionIsExistingResult
}

class FooterSectionFragment extends BaseFragment {
  private title: TextElement
  private items: CollectionElements

  constructor(page, parentLocator, fragmentRootSelector = '.footer', name = 'Footer', options) {
    super(page, parentLocator, fragmentRootSelector, name, options)
    this.title = this.init(TextElement, '.footer__title', 'Title')
    this.items = this.initCollection(CollectionElements, ButtonElement, '.footer__link-item', 'Items')
  }
}

export {
  FooterSectionFragment,
  IFooterSectionFragmentPerform,
  IFooterSectionFragmentGet,
  IFooterSectionFragmentIsDisplayed,
  IFooterSectionFragmentWaitForDatatState,
  IFooterSectionFragmentWaitForDisplayedState,
  IFooterSectionFragmentIsExist,
  IFooterSectionFragmentGetResult,
  IFooterSectionFragmentIsDisplayedResult,
  IFooterSectionFragmentIsExistResult,
}
