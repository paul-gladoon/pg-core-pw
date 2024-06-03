import {waiter} from '../utils/waiter'
import * as _n from 'lodash'
import {BrowserContext, type Page} from '@playwright/test'

interface IBrowserTabberSendKeys {
  switchTab?: {index?: number; url?: string; title?: string; defaultTab?: boolean}
  refresh?: boolean | {timeout?: number; waitUntil?: 'load' | 'domcontentloaded' | 'networkidle' | 'commit'}
  newTab?: string
  setWindowSize?: {width: number; height: number}
  navigateToUrl?: string
}

interface IBrowserTabberGet {
  url?: null
  title?: null
  tabsUrls?: null
  tabsLength?: null
  windowSize?: null
}

interface IBrowserTabberGetResult {
  url?: string
  title?: string
  tabsUrls?: string[]
  tabsLength?: number
  windowSize?: {width: number; height: number}
}

interface IBrowserTabberGetWaitForDataState {
  url?: string
  title?: string
  tabsLength?: number
  windowSize?: {width: number; height: number}
}

interface IBrowserTabberWaitForDataState {
  expectedState: IBrowserTabberGetWaitForDataState
  includes?: boolean
}

class BrowserTabber {
  private name: string
  private browserConext: BrowserContext
  private pageSetter: (page: Page) => void
  private page: () => Page

  constructor(browserContext: BrowserContext, pageSetter: (page: Page) => void, page: () => Page) {
    this.name = 'Browser Tab(s)'
    this.browserConext = browserContext
    this.pageSetter = pageSetter
    this.page = page
  }

  async sendKeys({switchTab, refresh, newTab, setWindowSize, navigateToUrl}: IBrowserTabberSendKeys) {
    if (switchTab) {
      const actions = {
        index: async (_index) => {
          await waiter.waitForState(async () => !!this.browserConext.pages()[_index], {
            timeout: 10000,
            interval: 2000,
            dontThrow: false,
            message: `The requested tab by index "${_index}" doesn't exist or tab was closed.`,
          })
          const pages = this.browserConext.pages()
          const currentPage = pages[_index]
          await currentPage.bringToFront()
          this.pageSetter(currentPage)
        },
        url: async (_url) => {
          let currentPage
          await waiter.waitForState(
            async () => {
              const pages = this.browserConext.pages()
              currentPage = pages[pages.findIndex((_page) => _page.url() === _url)]
              return !!currentPage
            },
            {
              timeout: 10000,
              interval: 2000,
              dontThrow: false,
              message: `The requested tab by url "${_url}" doesn't exist or tab was closed.`,
            }
          )

          await currentPage.bringToFront()
          this.pageSetter(currentPage)
        },
        title: async (_title) => {
          let currentPage
          await waiter.waitForState(
            async () => {
              const pages = this.browserConext.pages()
              const tempListTitles: string[] = []

              for (const _page of pages) {
                const currentTitle = await _page.title()
                tempListTitles.push(currentTitle)
              }

              currentPage = pages[tempListTitles.findIndex((_t) => _t === _title)]
              return !!currentPage
            },
            {
              timeout: 10000,
              interval: 2000,
              dontThrow: false,
              message: `The requested tab by title "${_title}" doesn't exist or tab was closed.`,
            }
          )

          await currentPage.bringToFront()
          this.pageSetter(currentPage)
        },
        defaultTab: async (state) => {
          if (state) {
            const pages = this.browserConext.pages()

            if (!pages.length) {
              throw new Error(`The default tab doesn't exist or tab was closed.`)
            }

            this.pageSetter(pages[0])
            await pages[0].bringToFront()
          }
        },
      }

      for (const _switch of Object.keys(switchTab)) {
        await actions[_switch](switchTab[_switch])
      }
    }

    if ((typeof refresh === 'boolean' && refresh) || typeof refresh === 'object') {
      typeof refresh === 'boolean' ? await this.page().reload() : await this.page().reload(refresh)
    }

    if (newTab) {
      const currentTabs = this.browserConext.pages()
      await this.browserConext.newPage()
      await waiter.waitForState(async () => currentTabs.length < this.browserConext.pages().length, {
        timeout: 10000,
        interval: 2000,
        dontThrow: false,
        message: `The new tab doesn't exist or tab was closed.`,
      })
      const currentPage = this.browserConext.pages()[this.browserConext.pages().length - 1]
      await currentPage.bringToFront()
      this.pageSetter(currentPage)
      await this.page().goto(newTab)
    }

    if (setWindowSize) {
      await this.page().setViewportSize({height: setWindowSize.height, width: setWindowSize.width})
    }

    if (navigateToUrl) {
      await this.page().goto(navigateToUrl)
    }
  }

  async get(data: IBrowserTabberGet): Promise<IBrowserTabberGetResult> {
    const values = {
      url: () => this.page().url(),
      title: async () => await this.page().title(),
      tabsUrls: async () => {
        const pages = this.browserConext.pages()
        const listOfTabs = []

        for (const _page of pages) {
          await _page.waitForLoadState('domcontentloaded')
          listOfTabs.push(await _page.url())
        }

        return listOfTabs
      },
      tabsLength: () => this.browserConext.pages().length,
      windowSize: () => this.page().viewportSize(),
    }
    const tempObj = {}

    for (const key of Object.keys(data)) {
      tempObj[key] = await values[key]()
    }
    return tempObj
  }

  async waitForDataState(
    {expectedState, includes}: IBrowserTabberWaitForDataState,
    waitTime: number = 3000,
    dontThrowError: boolean = true
  ) {
    const valueToNullKeys = ['url', 'title', 'tabsUrls', 'tabsLength']
    const tempObj = {}

    for (const key of Object.keys(expectedState)) {
      if (valueToNullKeys.includes(key)) {
        tempObj[key] = null
      }
    }

    return waiter.waitForState(
      async () => {
        const getResult = await this.get(tempObj)

        if (_n.isBoolean(includes)) {
          const expectedValuesList = Object.values(expectedState) as string[]
          const resultValuesList = Object.values(getResult) as string[]

          return resultValuesList.every((itemValue, index) =>
            includes ? itemValue.includes(expectedValuesList[index]) : !itemValue.includes(expectedValuesList[index])
          )
        }

        return _n.isEqual(getResult, expectedState)
      },
      {
        message: `Wait for data state on "${this.name}" is failed, for data: "${JSON.stringify(expectedState)}"`,
        timeout: waitTime,
        interval: 500,
        dontThrow: dontThrowError,
      }
    )
  }
}

export {BrowserTabber, IBrowserTabberGet, IBrowserTabberGetResult, IBrowserTabberWaitForDataState, IBrowserTabberSendKeys}
