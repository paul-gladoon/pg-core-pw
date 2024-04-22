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
  waitFor: async (element: Locator, options?: IWaitFor) => {
    await element.waitFor(options)
  },
  waitForState: async (
    callback,
    {timeout = 3000, interval = 500, dontThrow = true, message = 'Wait for state is not completed'}: IWaitForState
  ) => {
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
