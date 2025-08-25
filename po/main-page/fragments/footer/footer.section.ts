import {
  CollectionFragmentsAction,
  CollectionFragmentsGet,
  CollectionFragmentsWaitForDataState,
  CollectionFragmentsWaitForDisplayedState,
  TextClick,
  TextElement,
  TextGet,
  TextGetResult,
  TextHover,
  TextIsDisplayed,
  TextIsExist,
  TextWaitForDataState,
  TextWaitForDisplayedState,
} from '../../../../lib'
import {BaseFragment} from '../../../../lib/base.fragment'
import {
  ButtonCollectionClick,
  ButtonCollectionGet,
  ButtonCollectionGetResult,
  ButtonCollectionHover,
  ButtonCollectionIsDisplayed,
  ButtonCollectionIsExisting,
  ButtonCollectionWaitForDataState,
  ButtonCollectionWaitForDisplayedState,
  ButtonElement,
} from '../../../../lib/elements/button'
import {CollectionElements} from '../../../../lib'

interface IFooterSectionFragmentClick extends CollectionFragmentsAction {
  _where?: {title?: TextGetResult; items?: ButtonCollectionGetResult}
  title?: TextClick
  items?: ButtonCollectionClick
}

interface IFooterSectionFragmentHover extends CollectionFragmentsAction {
  _where?: {title?: TextGetResult}
  title?: TextHover
  items?: ButtonCollectionHover
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
  IFooterSectionFragmentClick,
  IFooterSectionFragmentGet,
  IFooterSectionFragmentIsDisplayed,
  IFooterSectionFragmentWaitForDatatState,
  IFooterSectionFragmentWaitForDisplayedState,
  IFooterSectionFragmentHover,
  IFooterSectionFragmentIsExist,
}
