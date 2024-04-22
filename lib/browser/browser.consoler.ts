import {step} from '../reporter/step'
import {getValues} from '../utils/evaluate.fn'
import {type Page} from '@playwright/test'

interface IBrowserConsolerGet {
  readyState?: null
}

interface IBrowserConsolerSendKeys {
  clearState?: boolean
  hideScrollBarFrom?: string
  removeNode?: string | string[]
  setStyleForNode?: {selector: string; styleName: string; value: string}
}

interface IBrowserConsolerGetResult {
  readyState?: string
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
  }

  for (const key of Object.keys(sendObj)) {
    values[key](sendObj[key])
  }
}

function getConsoleData({getObj, getValues}) {
  const fn = new Function(`return ${getValues}`)()
  const values = {
    shortpointVersion: new Function('return shortpoint.version'),
    readyState() {
      return document.readyState
    },
  }

  return fn(getObj, values)
}

class BrowserConsoler {
  private name: string
  private page: () => Page

  constructor(page: () => Page) {
    this.name = 'Browser console'
    this.page = page
  }

  @step((name) => `Set data to "${name}"`)
  async sendKeys(sendObj: IBrowserConsolerSendKeys): Promise<void> {
    await this.page().evaluate(setConsoleData, sendObj)
  }

  @step((name) => `Get data from "${name}"`)
  async get(getObj: IBrowserConsolerGet): Promise<IBrowserConsolerGetResult> {
    return this.page().evaluate(getConsoleData, {getObj, getValues: getValues.toString()})
  }
}

export {BrowserConsoler}
