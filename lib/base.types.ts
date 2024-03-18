import {BaseElement} from './base.element'
import {BaseFragment} from './base.fragment'

type TLocatorOptions = 'first' | 'last' | {nth: number}
type TSelectorOptions = {hasNotText?: string | RegExp, hasText?: string | RegExp}
type TAttributes = 'class' | 'id' | 'src' | 'href' | 'style' | 'placeholder'

interface IBaseInitOptions {
  searchFromDOMRoot?: boolean
  locatorOpts?: TLocatorOptions
  selectorOpts?: TSelectorOptions
}

export {IBaseInitOptions, BaseElement, BaseFragment, TAttributes}