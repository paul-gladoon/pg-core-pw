import {BaseFragment} from '../../../lib/base.fragment'
import {CollectionElements} from '../../../lib/base.types'
import {ButtonCollectionClick, ButtonCollectionGet, ButtonCollectionGetResult, ButtonElement} from '../../../lib/elements/button'

interface INavFragmentClick {
  navItems?: ButtonCollectionClick
}

interface INavFragmentGet {
  navItems?: ButtonCollectionGet
}

interface INavFragmentGetResult {
  navItems?: ButtonCollectionGetResult
}

interface ICollectionNavFragmentClick {
  by: {index: number} | null | {data: INavFragmentGetResult}
  navItem: INavFragmentClick
}

interface ICollectionNavFragmentGet {
  by: {index: number} | null | {data: INavFragmentGetResult}
  navItem: INavFragmentGet
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
  INavFragmentGetResult,
  ICollectionNavFragmentClick,
  ICollectionNavFragmentGet,
}
