import {BaseFragment} from '../../../../lib/base.fragment'
import {
  FooterSectionFragment,
  IFooterSectionFragmentClick,
  IFooterSectionFragmentGet,
  IFooterSectionFragmentGetResult,
  IFooterSectionFragmentHover,
  IFooterSectionFragmentIsDisplayed,
  IFooterSectionFragmentIsDisplayedResult,
  IFooterSectionFragmentIsExist,
  IFooterSectionFragmentIsExistResult,
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

interface IFooterFragmentGetResult {
  sections?: IFooterSectionFragmentGetResult[]
}

interface IFooterFragmentIsDisplayedResult {
  sections?: IFooterSectionFragmentIsDisplayedResult[]
}

interface IFooterFragmentIsDisplayed {
  sections?: IFooterSectionFragmentIsDisplayed
}

interface IFooterFragmentIsExist {
  sections?: IFooterSectionFragmentIsExist
}

interface IFooterFragmentIsExistResult {
  sections?: IFooterSectionFragmentIsExistResult[]
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
  IFooterFragmentGetResult,
  IFooterFragmentIsDisplayedResult,
  IFooterFragmentIsExistResult,
}
