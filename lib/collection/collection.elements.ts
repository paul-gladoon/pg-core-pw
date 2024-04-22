import {type Locator, type Page} from '@playwright/test'
import {BaseElement, ICollectionInitOptions} from '../base.types'
import {waiter} from '../utils/waiter'
import {arrayValuesKeys} from '../base.element'
import * as _n from 'lodash'
import {step} from '../reporter/step'

class CollectionElements {
  protected page: () => Page
  private parentLocator: () => Locator
  protected name: string
  private elementsRootSelector: string
  private options?: ICollectionInitOptions
  private elementsType: typeof BaseElement
  private elements

  constructor(page: () => Page, parentLocator: () => Locator, elementsType: typeof BaseElement, elementsRootSelector: string, name: string, options?: ICollectionInitOptions) {
    this.parentLocator = parentLocator
    this.elementsRootSelector = elementsRootSelector
    this.name = name
    this.page = page
    this.options = options
    this.elementsType = elementsType
  }

  protected get parentElement(): Locator {
    return this.parentLocator()
  }

  private get preparedListElements(): Promise<Locator[]> {
    const {options, page, parentLocator, elementsRootSelector} = this
    const rootLocator = options?.searchFromDOMRoot ? page() : parentLocator()

    return rootLocator.locator(elementsRootSelector, {...options?.selectorOpts}).all()
  }

  private async setCurrentElements() {
    const _elements = await this.preparedListElements
    await waiter.waitForState(async () => _elements.length, {timeout: 10000, interval: 2000, dontThrow: true})

    this.elements = _elements.map((_element, i) => {
      return new this.elementsType(this.page.bind(this), this.parentLocator.bind(this), `${this.elementsRootSelector} >> nth=${i}`, `${this.name} with index: ${i}`)
    })
  }

  private transformValues(data: object) {
    Object.keys(data).forEach((key) => {
      const value = data[key]
      if ((arrayValuesKeys.includes(key)) && typeof value === 'object') {
        Object.keys(value).forEach((subKey) => {
          data[key] = subKey
        })
        return
      }
      if (typeof value === 'string' || typeof value === 'number') {
        data[key] = null
      } else if (typeof value === 'object') {
        this.transformValues(value)
      }
    })
  }

  private async byIndex(index: number, method: string, action = null) {
    if (index >= this.elements.length) {
      throw new Error(
        `The provided index: "${index}" is exceeds the number of elements with name: "${this.name}", selector: "${
          this.elementsRootSelector
        }" and parent selector: "${this.parentElement['_selector']}".`
      )
    }

    if (method === 'get' || method === 'isDisplay') {
      return this.elements[index][method](action)
    }

    await this.elements[index][method](action)
  }

  private async byData(providedData: object, method: string, action = null) {
    const deepCopyOriginalData = JSON.parse(JSON.stringify(providedData))
    this.transformValues(providedData)
    for (const element of this.elements) {
      const actualData = await element.get(providedData)
      if (_n.isEqual(actualData, deepCopyOriginalData)) {
        if (method === 'get' || method === 'isDisplay') {
          return element[method](action)
        }

        await element[method](action)
        return
      }
    }

    throw new Error(
      `None of the elements contain the provided data: ${JSON.stringify(deepCopyOriginalData)}. The elements with name: "${
        this.name
      }", selector: "${this.elementsRootSelector}" and parent selector: "${this.parentElement['_selector']}".`
    )
  }

  @step((elementsName) => `Click on '${elementsName}' array elements:`)
  async click(dataObject) {
    await this.setCurrentElements()
    const {action, by: {index, data}} = dataObject

    if (_n.has(dataObject, 'by.index')) {
      await this.byIndex(index, 'click')
      return
    }

    await this.byData(data, 'click', action)
  }

  @step((elementsName) => `Hover on '${elementsName}' array elements:`)
  async hover(dataObject) {
    await this.setCurrentElements()
    const {action, by: {index, data}} = dataObject

    if (_n.has(dataObject, 'by.index')) {
      await this.byIndex(index, 'hover')
      return
    }

    await this.byData(data, 'hover', action)
  }

  @step((elementsName) => `Wait for data state for '${elementsName}' array elements:`)
  async waitForDataState(dataObject, waitTime, dontThrowError) {
    await this.setCurrentElements()
    const {
      expectedState,
      includes,
      stateFor: {every, some, index},
    } = dataObject

    const arrResults: object[] = []

    if (!this.elements.length) {
      return false
    }

    if (some) {
      for (const element of this.elements) {
        const currentElementState = await element.waitForDataState({expectedState, includes}, waitTime, dontThrowError)
        arrResults.push(currentElementState)

        if (currentElementState) break
      }

      return arrResults.some((stateResult) => stateResult)
    }

    if (every) {
      for (const element of this.elements) {
        arrResults.push(await element.waitForDataState({expectedState, includes}, waitTime, dontThrowError))
      }

      return arrResults.every((stateResult) => stateResult)
    }

    if (_n.isNumber(index)) {
      if (index >= this.elements.length) {
        throw new Error(
          `The provided index: "${index}" is exceeds the number of elements with name: "${this.name}", selector: "${
            this.elementsRootSelector
          }" and parent selector: "${this.parentElement['_selector']}".`
        )
      }

      return this.elements[index].waitForDataState({expectedState, includes}, waitTime, dontThrowError)
    }
  }

  @step((elementsName) => `Wait for displayed state for '${elementsName}' array elements:`)
  async waitForDisplayedState(dataObject, waitTime, dontThrowError) {
    await this.setCurrentElements()
    const {
      expectedState,
      stateFor: {every, some, index},
    } = dataObject

    const arrResults: object[] = []

    if (!this.elements.length) {
      return false
    }

    if (some) {
      for (const element of this.elements) {
        const currentElementState = await element.waitForDisplayedState(expectedState, waitTime, dontThrowError)
        arrResults.push(currentElementState)

        if (currentElementState) break
      }

      return arrResults.some((stateResult) => stateResult)
    }

    if (every) {
      for (const element of this.elements) {
        arrResults.push(await element.waitForDisplayedState(expectedState, waitTime, dontThrowError))
      }

      return arrResults.every((stateResult) => stateResult)
    }

    if (_n.isNumber(index)) {
      if (index >= this.elements.length) {
        throw new Error(
          `The provided index: "${index}" is exceeds the number of elements with name: "${this.name}", selector: "${
            this.elementsRootSelector
          }" and parent selector: "${this.parentElement['_selector']}".`
        )
      }

      return this.elements[index].waitForDisplayedState(expectedState, waitTime, dontThrowError)
    }
  }

  @step((elementsName) => `Get data from '${elementsName}' array elements:`)
  async get(dataObject) {
    await this.setCurrentElements()
    const {action} = dataObject

    if (_n.has(dataObject, 'by.index')) {
      const {
        by: {index},
      } = dataObject
      return this.byIndex(index, 'get', action)
    }

    if (_n.has(dataObject, 'by.data')) {
      const {
        by: {data},
      } = dataObject
      return this.byData(data, 'get', action)
    }

    const arrResults: object[] = []

    if (!this.elements.length) {
      return arrResults
    }

    for (const element of this.elements) {
      arrResults.push(await element.get(action))
    }

    return arrResults
  }

  @step((elementsName) => `Send keys to '${elementsName}' array elements:`)
  async sendKeys(dataObject) {
    await this.setCurrentElements()
    const {
      action,
      by: {index, data},
    } = dataObject

    if (_n.has(dataObject, 'by.index')) {
      await this.byIndex(index, 'sendKeys', action.keys)
      return
    }

    await this.byData(data, 'sendKeys', action.keys)
  }

  @step((elementsName) => `Get visibility of '${elementsName}' array elements:`)
  async isDisplay() {
    await this.setCurrentElements()
    const arrResults: boolean[] = []
    for (const element of this.elements) {
      arrResults.push(await element.isDisplay())
    }

    return arrResults
  }

  @step((elementsName) => `Get existing of '${elementsName}' array elements:`)
  async isExist() {
    await this.setCurrentElements()
    const arrResults: boolean[] = []
    for (const element of this.elements) {
      arrResults.push(await element.isExist())
    }

    return arrResults
  }

}

export {CollectionElements}