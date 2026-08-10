import {BaseFragment} from '../../../../lib/base.fragment'
import {
  FooterSectionFragment,
  IFooterSectionFragmentPerform,
  IFooterSectionFragmentGet,
  IFooterSectionFragmentGetResult,
  IFooterSectionFragmentIsDisplayed,
  IFooterSectionFragmentIsDisplayedResult,
  IFooterSectionFragmentIsExist,
  IFooterSectionFragmentIsExistResult,
  IFooterSectionFragmentWaitForDatatState,
  IFooterSectionFragmentWaitForDisplayedState,
} from './footer.section'
import {CollectionFragments} from '../../../../lib'

interface IFooterFragmentPerform {
  sections?: IFooterSectionFragmentPerform
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
  IFooterFragmentPerform,
  IFooterFragmentGet,
  IFooterFragmentIsDisplayed,
  IFooterFragmentWaitForDataState,
  IFooterFragmentWaitForDisplayedState,
  IFooterFragmentIsExist,
  IFooterFragmentGetResult,
  IFooterFragmentIsDisplayedResult,
  IFooterFragmentIsExistResult,
}
