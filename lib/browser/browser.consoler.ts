import {getValues} from '../utils/evaluate.fn'
import {type Page} from '@playwright/test'

interface IBrowserConsolerGet {
  readyState?: null
  cookiesLength?: null
}

interface IBrowserConsolerSendKeys {
  clearState?: boolean
  clearClipboard?: boolean
  hideScrollBarFrom?: string
  removeNode?: string | string[]
  setStyleForNode?: {selector: string; styleName: string; value: string}
}

interface IBrowserConsolerGetResult {
  readyState?: string
  cookiesLength?: number
}

function setConsoleData(sendObj) {
  const values = {
    clearState(state) {
      if (state) {
        localStorage.clear()
      }
    },
    hideScrollBarFrom(selector) {
      if (selector) {
        const style = document.createElement('style')
        style.innerHTML = `${selector}::-webkit-scrollbar {display: none;}`
        document.head.appendChild(style)
      }
    },
    removeNode(selector) {
      const nodes = Array.isArray(selector) ? selector : [selector]
      for (const node of nodes) {
        document.querySelector(node).remove()
      }
    },
    setStyleForNode({selector, styleName, value}: {selector: string; styleName: string; value: string}) {
      const node = document.querySelector(selector)
      node ? (node['style'][styleName] = value) : null
    },
    clearClipboard(state) {
      if (state) {
        navigator.clipboard.writeText('')
      }
    },
  }

  for (const key of Object.keys(sendObj)) {
    values[key](sendObj[key])
  }
}

function getConsoleData({getObj, getValues}) {
  const fn = new Function(`return ${getValues}`)()
  const values = {
    readyState() {
      return document.readyState
    },
    cookiesLength() {
      return document.cookie.length
    },
  }

  return fn(getObj, values)
}

class BrowserConsoler {
  private name: string
  protected page: () => Page

  constructor(page: () => Page) {
    this.name = 'Browser console'
    this.page = page
  }

  protected getPage(): Page {
    return this.page()
  }

  async sendKeys(sendObj: IBrowserConsolerSendKeys): Promise<void> {
    await this.page().evaluate(setConsoleData, sendObj)
  }

  async get(getObj: IBrowserConsolerGet): Promise<IBrowserConsolerGetResult> {
    return this.page().evaluate(getConsoleData, {getObj, getValues: getValues.toString()})
  }
}

export {BrowserConsoler, IBrowserConsolerGet, IBrowserConsolerGetResult, IBrowserConsolerSendKeys}
