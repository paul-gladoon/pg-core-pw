import {
  CollectionFragmentsAction,
  CollectionFragmentsGet,
  CollectionFragmentsWaitForDataState,
  CollectionFragmentsWaitForDisplayedState,
} from '../../../lib/collection/collection.fragments'
import {BaseFragment} from '../../../lib/base.fragment'
import {CollectionElements} from '../../../lib/collection/collection.elements'
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
} from '../../../lib/elements/button'

interface INavFragmentIsDisplayed extends CollectionFragmentsAction {
  _where?: {navItems?: ButtonCollectionGetResult}
  navItems?: ButtonCollectionIsDisplayed
}

interface INavFragmentIsExist extends CollectionFragmentsAction {
  _where?: {navItems?: ButtonCollectionGetResult}
  navItems?: ButtonCollectionIsExisting
}

interface INavFragmentClick extends CollectionFragmentsAction {
  _where?: {navItems?: ButtonCollectionGetResult}
  navItems?: ButtonCollectionClick
}

interface INavFragmentHover extends CollectionFragmentsAction {
  _where?: {navItems?: ButtonCollectionGetResult}
  navItems?: ButtonCollectionHover
}

interface INavFragmentGet extends CollectionFragmentsGet {
  _where?: {navItems?: ButtonCollectionGetResult}
  navItems?: ButtonCollectionGet
}

interface INavFragmentWaitForDatatState extends CollectionFragmentsWaitForDataState {
  _where?: {navItems?: ButtonCollectionWaitForDataState}
}

interface INavFragmentWaitForDisplayedState extends CollectionFragmentsWaitForDisplayedState {
  _where?: {navItems?: ButtonCollectionWaitForDataState}
  _state: {navItems?: ButtonCollectionWaitForDisplayedState}
}

class NavFragment extends BaseFragment {
  private navItems: CollectionElements

  constructor(page, parentLocator, fragmentRootSelector = '.navbar__items', name = 'Navigation bar', options) {
    super(page, parentLocator, fragmentRootSelector, name, options)
    this.navItems = this.initCollection(CollectionElements, ButtonElement, '.navbar__item', 'Navigation item')
  }
}

export {
  NavFragment,
  INavFragmentClick,
  INavFragmentGet,
  INavFragmentWaitForDatatState,
  INavFragmentWaitForDisplayedState,
  INavFragmentIsDisplayed,
  INavFragmentIsExist,
  INavFragmentHover,
}
