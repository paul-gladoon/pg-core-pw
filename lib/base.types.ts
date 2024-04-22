import {BaseElement} from './base.element'
import {BaseFragment} from './base.fragment'
import {CollectionElements} from './collection/collection.elements'
import {CollectionFragments} from './collection/collection.fragments'

type TLocatorOptions = 'first' | 'last' | {nth: number}
type TSelectorOptions = {hasNotText?: string | RegExp; hasText?: string | RegExp}

type TAttributes = 'class' | 'id' | 'src' | 'href' | 'style' | 'placeholder'

interface IBaseInitOptions {
  searchFromDOMRoot?: boolean
  locatorOpts?: TLocatorOptions
  selectorOpts?: TSelectorOptions
}

interface ICollectionInitOptions {
  searchFromDOMRoot?: boolean
  selectorOpts?: TSelectorOptions
}

export {IBaseInitOptions, BaseElement, BaseFragment, TAttributes, CollectionElements, CollectionFragments, ICollectionInitOptions}
