import {BaseElement} from './base.element'
import {type Page, type Locator} from '@playwright/test'
import {IBaseInitOptions, IChainLocatorOptions} from './base.types'

class BaseRootElement extends BaseElement {
  constructor(
    page: () => Page,
    parentLocator: () => Locator,
    elementRootSelector: string | Array<string | {selector: string; opts: IChainLocatorOptions}>,
    name: string,
    options?: IBaseInitOptions
  ) {
    super(page, parentLocator, elementRootSelector, name, options)
  }

  public get element(): Locator {
    return this.parentLocator()
  }
}

export {BaseRootElement}
