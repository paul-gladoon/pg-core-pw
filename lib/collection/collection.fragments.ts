import {type Locator, type Page} from '@playwright/test'
import {BaseFragment, ICollectionInitOptions} from '../base.types'
import {waiter} from '../utils/waiter'
import * as _n from 'lodash'

interface ICollectionFragment {
  by: {index?: number; data?: object}
  [key: string]: object
}

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
        `${this.name} with index: ${i}`
      )
    })
  }

  private async validateSetAndReturnDataFragments(dataObject: ICollectionFragment) {
    if (Object.keys(dataObject).length > 2) {
      throw new Error(`Please follow the rules of "ICollectionFragment" interface`)
    }
    await this.setCurrentFragments()
    return this.setCorretKeysSort(dataObject)
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

  private setCorretKeysSort(obj) {
    return Object.keys(obj).sort((a) => (a === 'by' ? -1 : null))
  }

  private async byIndex(index: number, method: string, fragmentData?) {
    if (index >= this.fragments.length) {
      throw new Error(
        `The provided index: "${index}" is exceeds the number of fragments with name: "${this.name}", selector: ${this.fragmentsRootSelector} and parent selector: "${this.parentElement['_selector']}".`
      )
    }
    if (method === 'get' || method === 'isDisplay') {
      return this.fragments[index][method](fragmentData)
    }

    await this.fragments[index][method](fragmentData)
  }

  private async byData(providedData: object, method: string, fragmentData: object) {
    const deepCopyOriginalData = JSON.parse(JSON.stringify(providedData))
    this.transformValues(providedData)
    for (const fragment of this.fragments) {
      const actualData = await fragment.get(providedData)
      if (_n.isEqual(actualData, deepCopyOriginalData)) {
        if (method === 'get' || method === 'isDisplay') {
          return fragment[method](fragmentData)
        }

        await fragment[method](fragmentData)
        return
      }
    }

    throw new Error(
      `None of the fragments contain the provided data: ${JSON.stringify(deepCopyOriginalData)}. The fragments with name: "${
        this.name
      }", selector: "${this.fragmentsRootSelector}" and parent selector: "${this.parentElement['_selector']}".`
    )
  }

  async click(dataObject) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [by, fragmentArgs] = await this.validateSetAndReturnDataFragments(dataObject)

    _n.has(dataObject, 'by.index')
      ? await this.byIndex(dataObject.by.index, 'click', dataObject[fragmentArgs])
      : await this.byData(dataObject.by.data, 'click', dataObject[fragmentArgs])
  }

  async hover(dataObject) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [by, fragmentArgs] = await this.validateSetAndReturnDataFragments(dataObject)

    if (_n.has(dataObject, 'by.index')) {
      await this.byIndex(dataObject.by.index, 'hover', dataObject[fragmentArgs])
      return
    }

    if (dataObject.by === null) {
      for (const fragment of this.fragments) {
        await fragment.hover(dataObject[fragmentArgs])
      }
      return
    }

    await this.byData(dataObject.by.data, 'hover', dataObject[fragmentArgs])
  }

  async get(dataObject) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [by, fragmentArgs] = await this.validateSetAndReturnDataFragments(dataObject)

    if (_n.has(dataObject, 'by.index')) {
      return this.byIndex(dataObject.by.index, 'get', dataObject[fragmentArgs])
    }

    if (dataObject.by === null) {
      const tempArray: object[] = []
      for (const fragment of this.fragments) {
        tempArray.push(await fragment.get(dataObject[fragmentArgs]))
      }
      return tempArray
    }

    return this.byData(dataObject.by.data, 'get', dataObject[fragmentArgs])
  }

  async sendKeys(dataObject) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [by, fragmentArgs] = await this.validateSetAndReturnDataFragments(dataObject)

    _n.has(dataObject, 'by.index')
      ? await this.byIndex(dataObject.by.index, 'sendKeys', dataObject[fragmentArgs])
      : await this.byData(dataObject.by.data, 'sendKeys', dataObject[fragmentArgs])
  }

  async isDisplay(dataObject) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [by, fragmentArgs] = await this.validateSetAndReturnDataFragments(dataObject)

    if (_n.has(dataObject, 'by.index')) {
      return this.byIndex(dataObject.by.index, 'isDisplay', dataObject[fragmentArgs])
    }

    if (dataObject.by === null) {
      const tempArray: boolean[] = []
      for (const fragment of this.fragments) {
        tempArray.push(await fragment.isDisplay(dataObject[fragmentArgs]))
      }
      return tempArray
    }

    return this.byData(dataObject.by.data, 'isDisplay', dataObject[fragmentArgs])
  }

  private async getState(methodName: string, dataObject, waitTime, dontThrowError) {
    await this.setCurrentFragments()
    const arrResults: boolean[] = []
    const {
      expectedState,
      stateFor: {every, some, index},
    } = dataObject

    if (!this.fragments.length) {
      return false
    }

    if (some) {
      for (const fragment of this.fragments) {
        const currentFragmentState = await fragment[methodName]({...expectedState}, waitTime, dontThrowError)
        arrResults.push(currentFragmentState)

        if (currentFragmentState) break
      }

      return arrResults.some((stateResult) => stateResult)
    }

    if (every) {
      for (const fragment of this.fragments) {
        arrResults.push(await fragment[methodName]({...expectedState}, waitTime, dontThrowError))
      }

      return arrResults.every((stateResult) => stateResult)
    }

    if (_n.isNumber(index)) {
      if (index >= this.fragments.length) {
        throw new Error(
          `The provided index: "${index}" is exceeds the number of fragments with name: "${this.name}", selector: ${this.fragmentsRootSelector} and parent selector: "${this.parentElement['_selector']}".`
        )
      }

      return this.fragments[index][methodName]({...expectedState}, waitTime, dontThrowError)
    }
  }

  async waitForDataState(dataObject, waitTime, dontThrowError) {
    return this.getState('waitForDataState', dataObject, waitTime, dontThrowError)
  }

  async waitForDisplayedState(dataObject, waitTime, dontThrowError) {
    return this.getState('waitForDisplayedState', dataObject, waitTime, dontThrowError)
  }
}

export {CollectionFragments}
