import {type Locator} from '@playwright/test'

interface IWaitFor {
  state?: 'attached' | 'detached' | 'visible' | 'hidden'
  timeout?: number
}

interface IWaitForState {
  timeout?: number
  dontThrow?: boolean
  interval?: number
  message?: string
}

const waiter = {
  waitFor: async (element: Locator, name: string, options?: IWaitFor) => {
    try {
      await element.waitFor(options)
    } catch (e) {
      e.message =
        e.message +
        (options ? ` - element by name: "${name}" to be ${options.state}` : ` - element by name: ${name} to be visible`)
      throw e
    }
  },
  waitForState: async (callback, options: IWaitForState = {}) => {
    const defaultOptions = {timeout: 3000, interval: 1000, dontThrow: true, message: 'Wait for state is not completed'}
    const _options = {...defaultOptions, ...options}
    const {timeout, interval, dontThrow, message} = _options
    const start = Date.now()
    let result

    async function sleep(millisecond = 5 * 1000) {
      return new Promise((resolve) => setTimeout(resolve, millisecond))
    }

    while (Date.now() - start < timeout) {
      result = await callback()
      if (result) {
        break
      }
      await sleep(interval)
    }

    if (!result && !dontThrow) {
      throw new Error(message)
    }

    return result
  },
}

export {waiter, IWaitForState}
