import {BaseElement} from './base.element'
import {type Page, type Locator} from '@playwright/test'
import {IBaseInitOptions} from './base.types'

class BaseRootElement extends BaseElement {
  constructor(
    page: () => Page,
    parentLocator: () => Locator,
    elementRootSelector: string | string[],
    name: string,
    options?: IBaseInitOptions
  ) {
    super(page, parentLocator, elementRootSelector, name, options)
  }

  protected get element(): Locator {
    return this.parentLocator()
  }
}

export {BaseRootElement}
