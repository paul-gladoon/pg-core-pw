import {
  BaseElementClick,
  BaseElementGet,
  BaseElementGetResult,
  TextClick,
  TextElement,
  TextGet,
  TextGetResult,
} from '../../../lib'
import {BaseFragment} from '../../../lib/base.fragment'
import {ButtonClick, ButtonElement, ButtonGet, ButtonGetResult} from '../../../lib/elements/button'

interface IHeaderFragmentClick {
  title?: TextClick
  getStarted?: ButtonClick
  _root?: BaseElementClick
}

interface IHeaderFragmentGet {
  title?: TextGet
  getStarted?: ButtonGet
  _root?: BaseElementGet
}

interface IHeaderFragmentGetResult {
  title?: TextGetResult
  getStarted?: ButtonGetResult
  _root?: BaseElementGetResult
}

class HeaderFragment extends BaseFragment {
  private title: TextElement
  private getStarted: ButtonElement

  constructor(page, parentLocator, fragmentRootSelector = 'header.hero', name = 'Header', options) {
    super(page, parentLocator, fragmentRootSelector, name, options)
    this.title = this.init(TextElement, '.hero__title', 'Title')
    this.getStarted = this.init(ButtonElement, '.getStarted_Sjon', 'Get started')
  }
}

export {HeaderFragment, IHeaderFragmentClick, IHeaderFragmentGet, IHeaderFragmentGetResult}
