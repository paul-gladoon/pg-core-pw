import {getValues} from '../utils/evaluate.fn'
import {
  BaseElement,
  BaseElementClick,
  BaseElementCollectionIsExisting,
  BaseElementGetScreenshot,
  BaseElementHover,
  BaseElementScroll,
} from '../base.element'

interface IImgGet {
  attribute?: string | string[]
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
  _action?: ImgGet
  _where?: ImgGetResult
  _index?: number
  _length?: null
}

interface IImgCollectionIsDisplayed {
  _action: null
  _where?: ImgGetResult
  _index?: number
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
  _where?: ImgGetResult
  _every?: boolean
  _some?: boolean
  _index?: number
  _includes?: boolean
  _length?: number | string
}

interface IImgCollectionWaitForDisplayedState {
  _state: boolean
  _every?: boolean
  _some?: boolean
  _index?: number
}

interface IImgWaitForDataState {
  _where: ImgGetResult
  _includes?: boolean
}

interface IImgCollectionClick {
  _action: ImgClick
  _where?: ImgGetResult
  _index?: number
}

interface IImgCollectionHover {
  _action: ImgHover
  _where?: ImgGetResult
  _index?: number
}

type ImgGet = IImgGet
type ImgGetResult = IImgGetResult
type ImgClick = BaseElementClick
type ImgIsDisplayed = null
type ImgIsDisplayedResult = boolean
type ImgCollectionGet = IImgCollectionGet
type ImgCollectionGetResult = IImgGetResult[] & {_length?: number}
type ImgCollectionIsDisplayed = IImgCollectionIsDisplayed
type ImgCollectionIsDisplayedResult = boolean[]
type ImgCollectionWaitForDataState = IImgCollectionWaitForDataState
type ImgCollectionWaitForDisplayedState = IImgCollectionWaitForDisplayedState
type ImgWaitForDisplayedState = boolean
type ImgWaitForDataState = IImgWaitForDataState
type ImgHover = BaseElementHover
type ImgCollectionClick = IImgCollectionClick
type ImgIsExist = null
type ImgIsExistResult = boolean
type ImgScroll = BaseElementScroll
type ImgGetScreenshot = BaseElementGetScreenshot
type ImgCollectionHover = IImgCollectionHover
type ImgCollectionIsExisting = BaseElementCollectionIsExisting
type ImgCollectionIsExistingResult = boolean[]

class ImgElement extends BaseElement {
  constructor(page, parentLocator, elementRootSelector, name, options?) {
    super(page, parentLocator, elementRootSelector, name, options)
  }

  async get(getObj: IImgGet): Promise<IImgGetResult> {
    await this.waitVisible()
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
  ImgCollectionClick,
  ImgIsExist,
  ImgIsExistResult,
  ImgScroll,
  ImgHover,
  ImgGetScreenshot,
  ImgCollectionHover,
  ImgCollectionIsExisting,
  ImgCollectionIsExistingResult,
  getImgData,
}
