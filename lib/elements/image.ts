import {getValues} from '../utils/evaluate.fn'
import {TAttributes} from '../base.types'
import {BaseElement, BaseElementClick} from '../base.element'

interface IImgGet {
  attribute?: TAttributes | TAttributes[]
  tagName?: null
  size?: null
  style?: string | string[]
  currentSrc?: null
}

interface IImgGetResult {
  attribute?: {[k: string]: string}
  tagName?: string
  size?: {width: string; height: string}
  style?: {[k: string]: string}
  currentSrc?: string
}

interface IImgCollectionGet {
  action: IImgGet
  by?: {index: number} | {data: IImgGetResult}
}

interface IImgCollectionIsDisplayed {
  action: null
  by?: {index: number} | {data: IImgGetResult}
}

function getImgData(_element, {getObj, getValues}) {
  const fn = new Function(`return ${getValues}`)()
  const values = {
    attribute: function (attr) {
      return _element.getAttribute(attr)
    },
    tagName: function () {
      return _element.tagName
    },
    size: function () {
      return {
        width: _element.getBoundingClientRect().width,
        height: _element.getBoundingClientRect().height,
      }
    },
    style: function (key) {
      return window.getComputedStyle(_element)[key]
    },
    currentSrc: function () {
      return _element.currentSrc
    },
  }

  return fn(getObj, values)
}

interface IImgCollectionWaitForDataState {
  expectedState: IImgGetResult
  stateFor: {every: boolean} | {some: boolean} | {index: number}
  includes?: boolean
}

interface IImgCollectionWaitForDisplayedState {
  expectedState: boolean
  stateFor: {every: boolean} | {some: boolean} | {index: number}
}

interface IImgWaitForDataState {
  expectedState: IImgGetResult
  includes?: boolean
}

type ImgGet = IImgGet
type ImgGetResult = IImgGetResult
type ImgClick = BaseElementClick
type ImgIsDisplayed = null
type ImgIsDisplayedResult = boolean
type ImgCollectionGet = IImgCollectionGet
type ImgCollectionGetResult = IImgGetResult
type ImgCollectionIsDisplayed = IImgCollectionIsDisplayed
type ImgCollectionIsDisplayedResult = boolean[] | boolean
type ImgCollectionWaitForDataState = IImgCollectionWaitForDataState
type ImgCollectionWaitForDisplayedState = IImgCollectionWaitForDisplayedState
type ImgWaitForDisplayedState = boolean
type ImgWaitForDataState = IImgWaitForDataState

class ImgElement extends BaseElement {
  constructor(page, parentLocator, elementRootSelector, name, options?) {
    super(page, parentLocator, elementRootSelector, name, options)
  }

  async get(getObj: IImgGet): Promise<IImgGetResult> {
    return this.element.evaluate(getImgData, {getObj, getValues: getValues.toString()})
  }
}

export {
  ImgElement,
  ImgIsDisplayed,
  ImgIsDisplayedResult,
  ImgClick,
  ImgGet,
  ImgGetResult,
  ImgCollectionGet,
  ImgCollectionGetResult,
  ImgCollectionIsDisplayed,
  ImgCollectionIsDisplayedResult,
  ImgCollectionWaitForDataState,
  ImgCollectionWaitForDisplayedState,
  ImgWaitForDisplayedState,
  ImgWaitForDataState,
  getImgData,
}
