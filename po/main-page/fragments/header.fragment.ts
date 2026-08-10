import {
  BaseElementPerform,
  BaseElementGet,
  BaseElementGetResult,
  TextPerform,
  TextElement,
  TextGet,
  TextGetResult,
} from '../../../lib'
import {BaseFragment} from '../../../lib/base.fragment'
import {ButtonPerform, ButtonElement, ButtonGet, ButtonGetResult} from '../../../lib/elements/button'

interface IHeaderFragmentPerform {
  title?: TextPerform
  getStarted?: ButtonPerform
  _root?: BaseElementPerform
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

export {HeaderFragment, IHeaderFragmentPerform, IHeaderFragmentGet, IHeaderFragmentGetResult}
