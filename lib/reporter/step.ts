import {consoleLogger} from './console.logger'

function step(stepName: (name: string) => string) {
  return function actualDecorator(originalMethod: any, context: ClassMethodDecoratorContext) {
    function replacementMethod(this: any, ...args: any[]) {
      const message = stepName.call(this, this.name)
      return consoleLogger(message, this, originalMethod.bind(this), ...args)
    }

    return replacementMethod;
  }
}

export {step}
