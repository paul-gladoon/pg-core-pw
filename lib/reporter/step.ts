/* eslint-disable @typescript-eslint/no-unused-vars */
import {consoleLogger} from './console.logger'

function step(stepName: (name: string) => string) {
  return function actualDecorator(originalMethod, context: ClassMethodDecoratorContext) {
    function replacementMethod(this, ...args) {
      const message = stepName.call(this, this.name)
      return consoleLogger(message, this, originalMethod.bind(this), ...args)
    }

    return replacementMethod
  }
}

export {step}
