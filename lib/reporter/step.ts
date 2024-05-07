/* eslint-disable @typescript-eslint/no-unused-vars */
import {allureReporting} from './allure'
import {consoleLogger} from './console.logger'
const {PW_CORE_ALLURE} = process.env

function step(stepName: (name: string) => string) {
  return function actualDecorator(originalMethod, context: ClassMethodDecoratorContext) {
    function replacementMethod(this, ...args) {
      const message = stepName.call(this, this.name)

      if (PW_CORE_ALLURE) {
        return allureReporting(message, this, originalMethod.bind(this), ...args)
      }

      return consoleLogger(message, this, originalMethod.bind(this), ...args)
    }

    return replacementMethod
  }
}

export {step}
