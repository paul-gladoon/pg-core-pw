import {BaseFragment} from '../../../../lib/base.fragment'
import {
  FooterSectionFragment,
  IFooterSectionFragmentClick,
  IFooterSectionFragmentGet,
  IFooterSectionFragmentHover,
  IFooterSectionFragmentIsDisplayed,
  IFooterSectionFragmentIsExist,
  IFooterSectionFragmentWaitForDatatState,
  IFooterSectionFragmentWaitForDisplayedState,
} from './footer.section'
import {CollectionFragments} from '../../../../lib'

interface IFooterFragmentClick {
  sections?: IFooterSectionFragmentClick
}

interface IFooterFragmentHover {
  sections?: IFooterSectionFragmentHover
}

interface IFooterFragmentGet {
  sections?: IFooterSectionFragmentGet
}

interface IFooterFragmentIsDisplayed {
  sections?: IFooterSectionFragmentIsDisplayed
}

interface IFooterFragmentIsExist {
  sections?: IFooterSectionFragmentIsExist
}

interface IFooterFragmentWaitForDataState {
  sections?: IFooterSectionFragmentWaitForDatatState
}

interface IFooterFragmentWaitForDisplayedState {
  sections?: IFooterSectionFragmentWaitForDisplayedState
}

class FooterFragment extends BaseFragment {
  private sections: CollectionFragments

  constructor(page, parentLocator, fragmentRootSelector = 'header.hero', name = 'Header', options) {
    super(page, parentLocator, fragmentRootSelector, name, options)
    this.sections = this.initCollection(CollectionFragments, FooterSectionFragment, '.footer__col', 'Sections')
  }
}

export {
  FooterFragment,
  IFooterFragmentClick,
  IFooterFragmentGet,
  IFooterFragmentIsDisplayed,
  IFooterFragmentWaitForDataState,
  IFooterFragmentWaitForDisplayedState,
  IFooterFragmentHover,
  IFooterFragmentIsExist,
}
