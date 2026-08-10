import {type Locator, type Page} from '@playwright/test'
import {BaseElement, ICollectionInitOptions} from '../base.types'
import {waiter} from '../utils/waiter'
import {
  arrayValuesKeys,
  BaseElementCollectionPerform,
  BaseElementCollectionGet,
  BaseElementCollectionIsDisplayed,
  BaseElementCollectionIsExisting,
  BaseElementCollectionWaitForDataState,
  BaseElementCollectionWaitForDisplayedState,
} from '../base.element'
import * as _n from 'lodash'

class CollectionElements {
  protected page: () => Page
  private parentLocator: () => Locator
  protected name: string
  private elementsRootSelector: string
  private options?: ICollectionInitOptions
  private elementsType: typeof BaseElement
  private elements

  constructor(
    page: () => Page,
    parentLocator: () => Locator,
    elementsType: typeof BaseElement,
    elementsRootSelector: string,
    name: string,
    options?: ICollectionInitOptions
  ) {
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
    await waiter.waitForState(async () => (await this.preparedListElements).length, {
      timeout: 10000,
      interval: 2000,
      dontThrow: true,
    })

    const _elements = await this.preparedListElements
    this.elements = _elements.map((_element, i) => {
      return new this.elementsType(
        this.page.bind(this),
        this.parentLocator.bind(this),
        `${this.elementsRootSelector} >> nth=${i}`,
        `${this.name} with index: ${i}`,
        this.options
      )
    })
  }

  private transformValues(data: object) {
    Object.keys(data).forEach((key) => {
      const value = data[key]
      if (arrayValuesKeys.includes(key) && typeof value === 'object') {
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

  private async _all(methodName, action = null) {
    if (!this.elements.length) {
      throw new Error(
        `There are no elements with name: "${this.name}", selector: "${this.elementsRootSelector}" and parent selector: "${this.parentElement['_selector']}".`
      )
    }

    const tempArray = []

    for (const element of this.elements) {
      if (methodName === 'get' || methodName === 'isDisplay' || methodName === 'isExist') {
        tempArray.push(await element[methodName](action))
      } else {
        await element[methodName](action)
      }
    }

    return tempArray
  }

  private async _index(index: number, methodName: string, action = null) {
    if (index >= this.elements.length) {
      throw new Error(
        `The provided index: "${index}" is exceeds the number of elements with name: "${this.name}", selector: "${this.elementsRootSelector}" and parent selector: "${this.parentElement['_selector']}".`
      )
    }

    if (methodName === 'get' || methodName === 'isDisplay' || methodName === 'isExist') {
      return [await this.elements[index][methodName](action)]
    }

    await this.elements[index][methodName](action)
  }

  private async _where(providedData: object, methodName, action = null) {
    const originalData = JSON.parse(JSON.stringify(providedData))
    this.transformValues(providedData)
    for (const element of this.elements) {
      const actualData = await element.get(providedData)
      if (_n.isEqual(actualData, originalData)) {
        if (methodName === 'get' || methodName === 'isDisplay' || methodName === 'isExist') {
          return [await element[methodName](action)]
        }
        return await element[methodName](action)
      }
    }

    throw new Error(
      `None of the elements contain the provided data: ${JSON.stringify(originalData)}. The elements with name: "${
        this.name
      }", selector: "${this.elementsRootSelector}" and parent selector: "${this.parentElement['_selector']}".`
    )
  }

  async perform(dataObject: BaseElementCollectionPerform) {
    await this.setCurrentElements()
    const {_index, _where, ...action} = dataObject

    if (_n.isNumber(_index)) await this._index(_index, 'perform', action)

    if (_where) await this._where(_where, 'perform', action)

    if (!_where && !_n.isNumber(_index)) await this._all('perform', action)
  }

  async waitForDataState(dataObject: BaseElementCollectionWaitForDataState, waitTime: number, dontThrowError: boolean) {
    await this.setCurrentElements()

    if (!dataObject || _n.isEmpty(dataObject)) {
      throw new Error(`Please provide some strategy for "waitForDataState" method`)
    }

    const {_where, _index, _every, _some, _includes, _length} = dataObject
    const arrResults: object[] = []

    if (!this.elements.length) {
      return false
    }

    if (_some) {
      for (const element of this.elements) {
        const currentElementState = await element.waitForDataState({_where, _includes}, waitTime, dontThrowError)
        arrResults.push(currentElementState)

        if (currentElementState) break
      }

      return arrResults.some((stateResult) => stateResult)
    }

    if (_every) {
      for (const element of this.elements) {
        arrResults.push(await element.waitForDataState({_where, _includes}, waitTime, dontThrowError))
      }

      return arrResults.every((stateResult) => stateResult)
    }

    if (_n.isNumber(_index)) {
      if (_index >= this.elements.length) {
        throw new Error(
          `The provided index: "${_index}" is exceeds the number of elements with name: "${this.name}", selector: "${this.elementsRootSelector}" and parent selector: "${this.parentElement['_selector']}".`
        )
      }

      return this.elements[_index].waitForDataState({_where, _includes}, waitTime, dontThrowError)
    }

    if (_n.isNumber(_length)) {
      return this.elements.length === _length
    }

    if (_n.isString(_length)) {
      const conditionCheck = new Function('length', `return length ${_length}`)
      return conditionCheck(this.elements.length)
    }
  }

  async waitForDisplayedState(dataObject: BaseElementCollectionWaitForDisplayedState, waitTime: number, dontThrowError: boolean) {
    await this.setCurrentElements()
    const {_state, _every, _index, _some, _where} = dataObject

    const arrResults: object[] = []

    if (!this.elements.length) {
      return false
    }

    if (_where) {
      for (const element of this.elements) {
        const currentElementState = await element.waitForDataState({_where}, waitTime, dontThrowError)

        if (currentElementState) {
          const elementDisplayedState = await element.waitForDisplayedState(_state, waitTime, dontThrowError)
          arrResults.push(elementDisplayedState)
          break
        } else {
          continue
        }
      }

      return arrResults.some((stateResult) => stateResult)
    }

    if (_some) {
      for (const element of this.elements) {
        const currentElementState = await element.waitForDisplayedState(_state, waitTime, dontThrowError)
        arrResults.push(currentElementState)

        if (currentElementState) break
      }

      return arrResults.some((stateResult) => stateResult)
    }

    if (_every || (_n.isUndefined(_every) && _n.isUndefined(_some) && _n.isUndefined(_index))) {
      for (const element of this.elements) {
        arrResults.push(await element.waitForDisplayedState(_state, waitTime, dontThrowError))
      }

      return arrResults.every((stateResult) => stateResult)
    }

    if (_n.isNumber(_index)) {
      if (_index >= this.elements.length) {
        throw new Error(
          `The provided index: "${_index}" is exceeds the number of elements with name: "${this.name}", selector: "${this.elementsRootSelector}" and parent selector: "${this.parentElement['_selector']}".`
        )
      }

      return this.elements[_index].waitForDisplayedState(_state, waitTime, dontThrowError)
    }
  }

  async get(dataObject: BaseElementCollectionGet) {
    await this.setCurrentElements()

    if (!dataObject || _n.isEmpty(dataObject)) {
      throw new Error(`Please provide some strategy for "get" method`)
    }

    const {_action, _index, _length, _where} = dataObject

    if (_n.isNumber(_index)) {
      return this._index(_index, 'get', _action)
    }

    if (_where) {
      return this._where(_where, 'get', _action)
    }

    if (_n.isNull(_length)) {
      return {_length: this.elements.length}
    }

    if (!this.elements.length) {
      return []
    }

    if (!_where && !_n.isNull(_length) && !_n.isNumber(_index)) {
      return this._all('get', _action)
    }
  }

  async sendKeys(dataObject: {_action; _index; _where}) {
    await this.setCurrentElements()
    const {_action, _index, _where} = dataObject

    if (_n.isNumber(_index)) await this._index(_index, 'sendKeys', _action)

    if (_where) await this._where(_where, 'sendKeys', _action)

    if (!_where && !_n.isNumber(_index)) await this._all('sendKeys', _action)
  }

  async isDisplay(dataObject: BaseElementCollectionIsDisplayed) {
    await this.setCurrentElements()
    const {_action, _index, _where} = dataObject

    if (_n.isNumber(_index)) {
      return this._index(_index, 'isDisplay', _action)
    }

    if (_where) {
      return this._where(_where, 'isDisplay', _action)
    }

    if (!this.elements.length) {
      return []
    }

    if (!_where && !_n.isNumber(_index)) {
      return this._all('isDisplay', _action)
    }
  }

  async isExist(dataObject: BaseElementCollectionIsExisting) {
    await this.setCurrentElements()
    const {_action, _index, _where} = dataObject

    if (_n.isNumber(_index)) {
      return this._index(_index, 'isExist', _action)
    }

    if (_where) {
      return this._where(_where, 'isExist', _action)
    }

    if (!this.elements.length) {
      return []
    }

    if (!_where && !_n.isNumber(_index)) {
      return this._all('isExist', _action)
    }
  }
}

export {CollectionElements}
