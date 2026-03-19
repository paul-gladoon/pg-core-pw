import {
  BaseElementClick,
  BaseElementGet,
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

interface ICollectionNavFragmentClick extends CollectionFragmentsAction {
  _where?: INavFragmentGetResult
  _root?: BaseElementClick
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

class NavFragment extends BaseFragment {
  private navItems: CollectionElements

  constructor(page, parentLocator, fragmentRootSelector = '.navbar__items', name = 'Navigation bar', options) {
    super(page, parentLocator, fragmentRootSelector, name, options)
    this.navItems = this.initCollection(CollectionElements, ButtonElement, '.navbar__item', 'Navigation item')
  }
}

export {NavFragment, ICollectionNavFragmentClick, ICollectionNavFragmentGet, ICollectionNavFragmentIsDisplayed}
