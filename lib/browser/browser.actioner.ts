import {step} from '../reporter/step'
import {Keys} from '../utils/keys'
import {type Page} from '@playwright/test'

type IActionerModifySendKeys = {keys: Keys | Keys[]; options: {delay: number}}

class BrowserActioner {
  private name: string
  private page: () => Page

  constructor(page: () => Page) {
    this.name = 'Browser Actioner(s)'
    this.page = page
  }

  @step((name) => `Set data to "${name}"`)
  async sendKeys(keysObj: Keys | Keys[] | IActionerModifySendKeys) {
    const pressAction = async (keysData, options?) => {
      const keysToPress = Array.isArray(keysData) ? keysData.join('+') : keysData
      await this.page().keyboard.press(keysToPress, options)
    }

    if (typeof keysObj === 'string' || Array.isArray(keysObj)) {
      await pressAction(keysObj)
    }

    if (typeof keysObj === 'object' && !Array.isArray(keysObj)) {
      const {keys, options} = keysObj
      await pressAction(keys, options)
    }
  }
}

export {BrowserActioner}
