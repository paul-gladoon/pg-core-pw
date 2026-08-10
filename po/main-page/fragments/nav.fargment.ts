import {
  BaseElementPerform,
  BaseElementGet,
  BaseElementGetResult,
  BaseElementIsDisplayed,
  CollectionFragmentsAction,
  CollectionFragmentsGet,
} from '../../../lib'
import {BaseFragment} from '../../../lib/base.fragment'
import {CollectionElements} from '../../../lib/base.types'
import {ButtonCollectionGet, ButtonCollectionGetResult, ButtonElement} from '../../../lib/elements/button'

interface INavFragmentGetResult {
  navItems?: ButtonCollectionGetResult
}

interface ICollectionNavFragmentPerform extends CollectionFragmentsAction {
  _where?: INavFragmentGetResult
  _root?: BaseElementPerform
}

interface ICollectionNavFragmentGet extends CollectionFragmentsGet {
  _where?: INavFragmentGetResult
  _root?: BaseElementGet
  navItems?: ButtonCollectionGet
}

interface ICollectionNavFragmentIsDisplayed extends CollectionFragmentsAction {
  _where?: INavFragmentGetResult
  _root?: BaseElementIsDisplayed
}

interface ICollectionNavFragmentGetResult {
  _root?: BaseElementGetResult
  navItems?: ButtonCollectionGetResult
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
  ICollectionNavFragmentPerform,
  ICollectionNavFragmentGet,
  ICollectionNavFragmentIsDisplayed,
  ICollectionNavFragmentGetResult,
}
