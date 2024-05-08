/* eslint-disable no-console */
import {type Page} from '@playwright/test'
import {allure} from 'allure-playwright'
const {PW_CORE_ALLURE} = process.env

class Asserter {
  private name: string
  private page: () => Page

  constructor(page: () => Page) {
    this.name = 'Asserter'
    this.page = page
  }

  async assertStep(title: string, callback) {
    const allureStep = async () => {
      const logs = []

      await allure.step(title, async function () {
        try {
          await callback()
        } catch (error) {
          this.page().on('console', async (msg) => {
            if (msg.type() === 'error') logs.push(msg)
          })
          await allure.attachment('error-message', error.toString(), 'text/plain')
          await allure.attachment('screenshot.png', await this.page().screenshot(), {
            contentType: 'image/png',
          })

          const logsToReadableState = logs.map((arg) => JSON.stringify(arg, null, '\t')).join()
          if (logsToReadableState.length) await allure.attachment('borwser-logs', logsToReadableState, 'text/plain')

          throw error
        }
      })
    }

    const loggerStep = async () => {
      console.info(`ASSERTION: `.black.bgGreen + `${title}`.green.bgGreen)
      await callback()
    }

    PW_CORE_ALLURE ? await allureStep() : await loggerStep()
  }
}

export {Asserter}
