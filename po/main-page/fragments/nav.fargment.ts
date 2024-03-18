import {BaseElement, BaseElementClick, BaseElementGet, BaseElementGetResult} from "../../../lib/base.element";
import {BaseFragment, Locator} from "../../../lib/base.fragment";

interface INavFragmentClick {
  docs?: BaseElementClick
}

interface INavFragmentGet {
  docs?: BaseElementGet
}

interface INavFragmentGetResult {
  docs?: BaseElementGetResult
}

class NavFragment extends BaseFragment {
  private docs: BaseElement

  constructor(page, parentLocator, fragmentRootSelector = '[class="navbar__items"]', name = 'Navigation bar', options) {
    super(page, parentLocator, fragmentRootSelector, name, options)
    this.docs = this.init(BaseElement, '[href="/docs/intro"]', 'Docs item menu')
  }
}

export {NavFragment, INavFragmentClick, INavFragmentGet, INavFragmentGetResult}