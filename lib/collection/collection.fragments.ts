import {type Locator, type Page} from '@playwright/test'
import {BaseFragment, ICollectionInitOptions} from '../base.types'
import {waiter} from '../utils/waiter'
import * as _n from 'lodash'

interface ICollectionFragmentsAction {
  _index?: number
  _where?: object
}

interface ICollectionFragmentsGet {
  _index?: number
  _where?: object
  _length?: number
}

interface ICollectionFragmentsWaitForDataState {
  _where?: object
  _every?: boolean
  _some?: boolean
  _index?: number
  _length?: number | string
}

interface ICollectionFragmentsWaitForDisplayedState {
  _where?: object
  _state: object
  _every?: boolean
  _some?: boolean
  _index?: number
}

type CollectionFragmentsWaitForDisplayedState = ICollectionFragmentsWaitForDisplayedState
type CollectionFragmentsGet = ICollectionFragmentsGet
type CollectionFragmentsWaitForDataState = ICollectionFragmentsWaitForDataState
type CollectionFragmentsAction = ICollectionFragmentsAction

class CollectionFragments {
  protected page: () => Page
  private parentLocator: () => Locator
  protected name: string
  private fragmentsRootSelector: string
  private options?: ICollectionInitOptions
  private fragmentsType: typeof BaseFragment
  private fragments

  constructor(
    page: () => Page,
    parentLocator: () => Locator,
    fragmentsType: typeof BaseFragment,
    fragmentsRootSelector: string,
    name: string,
    options?: ICollectionInitOptions
  ) {
    this.parentLocator = parentLocator
    this.fragmentsRootSelector = fragmentsRootSelector
    this.name = name
    this.page = page
    this.options = options
    this.fragmentsType = fragmentsType
  }

  protected get parentElement(): Locator {
    return this.parentLocator()
  }

  private get preparedListFragments(): Promise<Locator[]> {
    const {options, page, parentLocator, fragmentsRootSelector} = this
    const rootLocator = options?.searchFromDOMRoot ? page() : parentLocator()

    return rootLocator.locator(fragmentsRootSelector, {...options?.selectorOpts}).all()
  }

  private async setCurrentFragments() {
    await waiter.waitForState(async () => (await this.preparedListFragments).length, {
      timeout: 10000,
      interval: 2000,
      dontThrow: true,
    })

    const _fragments = await this.preparedListFragments
    this.fragments = _fragments.map((_fragment, i) => {
      return new this.fragmentsType(
        this.page.bind(this),
        this.parentLocator.bind(this),
        `${this.fragmentsRootSelector} >> nth=${i}`,
        `${this.name} with index: ${i}`,
        this.options
      )
    })
  }

  private transformValues(data: object) {
    Object.keys(data).forEach((key) => {
      const value = data[key]
      if (typeof value === 'string' || typeof value === 'number') {
        data[key] = null
      } else if (typeof value === 'object') {
        this.transformValues(value)
      }
    })
  }

  private castValuesToBoolean(data: object) {
    Object.keys(data).forEach((key) => {
      const value = data[key]
      if (typeof value === 'string' || typeof value === 'number' || _n.isNull(value)) {
        data[key] = false
      } else if (typeof value === 'object') {
        this.castValuesToBoolean(value)
      }
    })
  }

  private async _index(index: number, methodName: string, data: unknown) {
    if (index >= this.fragments.length) {
      throw new Error(
        `The provided index: "${index}" is exceeds the number of fragments with name: "${this.name}", selector: "${this.fragmentsRootSelector}" and parent selector: "${this.parentElement['_selector']}".`
      )
    }

    return this.fragments[index][methodName](data)
  }

  private async _where(providedData: object, methodName: string, data: unknown) {
    const originalData = JSON.parse(JSON.stringify(providedData))
    this.transformValues(providedData)
    for (const fragment of this.fragments) {
      const actualData = await fragment.get(providedData)
      if (_n.isEqual(actualData, originalData)) {
        return fragment[methodName](data)
      }
    }

    throw new Error(
      `None of the fragments contain the provided data: ${JSON.stringify(originalData)}. The fragments with name: "${
        this.name
      }", selector: "${this.fragmentsRootSelector}" and parent selector: "${this.parentElement['_selector']}".`
    )
  }

  private async _all(methodName: string, data: unknown) {
    if (!this.fragments.length) {
      throw new Error(
        `There are no fragments with name: "${this.name}", selector: "${this.fragmentsRootSelector}" and parent selector: "${this.parentElement['_selector']}".`
      )
    }

    const tempArray = []

    for (const fragment of this.fragments) {
      if (methodName === 'get' || methodName === 'isDisplay' || methodName === 'isExist') {
        tempArray.push(await fragment[methodName](data))
      } else {
        await fragment[methodName](data)
      }
    }

    return tempArray
  }

  async click(dataObject: ICollectionFragmentsAction) {
    await this.setCurrentFragments()
    const {_where, _index, ..._data} = dataObject

    if (_n.isNumber(_index)) await this._index(_index, 'click', _data)

    if (_where) await this._where(_where, 'click', _data)
  }

  async hover(dataObject: ICollectionFragmentsAction) {
    await this.setCurrentFragments()
    const {_where, _index, ..._data} = dataObject

    if (_n.isNumber(_index)) await this._index(_index, 'hover', _data)

    if (_where) await this._where(_where, 'hover', _data)
  }

  async sendKeys(dataObject: ICollectionFragmentsAction) {
    await this.setCurrentFragments()
    const {_where, _index, ..._data} = dataObject

    if (_n.isNumber(_index)) await this._index(_index, 'sendKeys', _data)

    if (_where) await this._where(_where, 'sendKeys', _data)
  }

  async get(dataObject: ICollectionFragmentsGet) {
    await this.setCurrentFragments()

    if (!dataObject || _n.isEmpty(dataObject)) {
      throw new Error(`Please provide some strategy for "get" method`)
    }

    const {_index, _length, _where, ..._data} = dataObject

    if (_n.isNumber(_index)) {
      return this._index(_index, 'get', _data)
    }

    if (_where) {
      return this._where(_where, 'get', _data)
    }

    if (_n.isNull(_length)) {
      return {_length: this.fragments.length}
    }

    if (!this.fragments.length) {
      return []
    }

    if (!_where && !_n.isNull(_length) && !_n.isNumber(_index)) {
      return this._all('get', _data)
    }
  }

  async isDisplay(dataObject: ICollectionFragmentsAction) {
    await this.setCurrentFragments()
    const {_index, _where, ..._data} = dataObject

    if (_n.isNumber(_index)) {
      return this._index(_index, 'isDisplay', _data)
    }

    if (_where) {
      return this._where(_where, 'isDisplay', _data)
    }

    if (!this.fragments.length) {
      return []
    }

    if (!_where && !_n.isNumber(_index)) {
      return this._all('isDisplay', _data)
    }
  }

  async isExist(dataObject: ICollectionFragmentsAction) {
    await this.setCurrentFragments()
    const {_index, _where, ..._data} = dataObject

    if (_n.isNumber(_index)) {
      return this._index(_index, 'isExist', _data)
    }

    if (_where) {
      return this._where(_where, 'isExist', _data)
    }

    if (!this.fragments.length) {
      return []
    }

    if (!_where && !_n.isNumber(_index)) {
      return this._all('isExist', _data)
    }
  }

  async waitForDataState(dataObject: ICollectionFragmentsWaitForDataState, waitTime: number, dontThrowError: boolean) {
    await this.setCurrentFragments()

    if (!dataObject || _n.isEmpty(dataObject)) {
      throw new Error(`Please provide some strategy for "waitForDataState" method`)
    }

    const {_where, _index, _every, _some, _length} = dataObject
    const arrResults: object[] = []

    if (!this.fragments.length) {
      return false
    }

    if (_some) {
      for (const fragment of this.fragments) {
        const currentFragmentState = await fragment.waitForDataState(_where, waitTime, dontThrowError)
        arrResults.push(currentFragmentState)

        if (currentFragmentState) break
      }

      return arrResults.some((stateResult) => stateResult)
    }

    if (_every) {
      for (const fragment of this.fragments) {
        arrResults.push(await fragment.waitForDataState(_where, waitTime, dontThrowError))
      }

      return arrResults.every((stateResult) => stateResult)
    }

    if (_n.isNumber(_index)) {
      if (_index >= this.fragments.length) {
        throw new Error(
          `The provided index: "${_index}" is exceeds the number of fragments with name: "${this.name}", selector: "${this.fragmentsRootSelector}" and parent selector: "${this.parentElement['_selector']}".`
        )
      }

      return this.fragments[_index].waitForDataState(_where, waitTime, dontThrowError)
    }

    if (_n.isNumber(_length)) {
      return this.fragments.length === _length
    }

    if (_n.isString(_length)) {
      const conditionCheck = new Function('length', `return length ${_length}`)
      return conditionCheck(this.fragments.length)
    }
  }

  async waitForDisplayedState(dataObject: ICollectionFragmentsWaitForDisplayedState, waitTime: number, dontThrowError: boolean) {
    await this.setCurrentFragments()
    const {_state, _every, _index, _some, _where} = dataObject

    const arrResults: object[] = []

    if (!this.fragments.length) {
      return false
    }

    if (_where) {
      for (const fragment of this.fragments) {
        const currentFragmentState = await fragment.waitForDataState(_where, waitTime, dontThrowError)

        if (currentFragmentState) {
          const fragmentDisplayedState = await fragment.waitForDisplayedState(_state, waitTime, dontThrowError)
          arrResults.push(fragmentDisplayedState)
          break
        } else {
          continue
        }
      }

      return arrResults.some((stateResult) => stateResult)
    }

    if (_some) {
      for (const fragment of this.fragments) {
        const currentFragmentState = await fragment.waitForDisplayedState(_state, waitTime, dontThrowError)
        arrResults.push(currentFragmentState)

        if (currentFragmentState) break
      }

      return arrResults.some((stateResult) => stateResult)
    }

    if (_every || (_n.isUndefined(_every) && _n.isUndefined(_some) && _n.isUndefined(_index))) {
      for (const fragment of this.fragments) {
        arrResults.push(await fragment.waitForDisplayedState(_state, waitTime, dontThrowError))
      }

      return arrResults.every((stateResult) => stateResult)
    }

    if (_n.isNumber(_index)) {
      if (_index >= this.fragments.length) {
        throw new Error(
          `The provided index: "${_index}" is exceeds the number of fragments with name: "${this.name}", selector: "${this.fragmentsRootSelector}" and parent selector: "${this.parentElement['_selector']}".`
        )
      }

      return this.fragments[_index].waitForDisplayedState(_state, waitTime, dontThrowError)
    }
  }
}

export {
  CollectionFragments,
  CollectionFragmentsWaitForDisplayedState,
  CollectionFragmentsGet,
  CollectionFragmentsWaitForDataState,
  CollectionFragmentsAction,
}
