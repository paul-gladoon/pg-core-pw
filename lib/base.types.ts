import {BaseElement} from './base.element'
import {BaseFragment} from './base.fragment'
import {CollectionElements} from './collection/collection.elements'
import {CollectionFragments} from './collection/collection.fragments'

type TLocatorOptions = 'first' | 'last' | {nth: number}
type TSelectorOptions = {hasNotText?: string | RegExp; hasText?: string | RegExp}

interface IBaseInitOptions {
  searchFromDOMRoot?: boolean
  locatorOpts?: TLocatorOptions
  selectorOpts?: TSelectorOptions
}

interface ICollectionInitOptions {
  searchFromDOMRoot?: boolean
  selectorOpts?: TSelectorOptions
}

interface IChainLocatorOptions {
  locatorOpts?: TLocatorOptions
  selectorOpts?: TSelectorOptions
}

export {
  IBaseInitOptions,
  BaseElement,
  BaseFragment,
  CollectionElements,
  CollectionFragments,
  ICollectionInitOptions,
  IChainLocatorOptions,
}
