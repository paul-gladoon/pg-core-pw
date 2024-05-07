/* eslint-disable no-console */
import * as colors from 'colors'

async function consoleLogger(stepName, _target, originalValue, ...args) {
  const {name} = _target.constructor

  const argsStringify = args.map((arg) => JSON.stringify(arg)).join()

  if (name.includes('Page')) {
    console.info(`__${stepName}`.green)
  } else if (name.includes('API')) {
    console.info(`_[API] ${stepName}: `.green + `${argsStringify}`.yellow)
  } else if (name.includes('Browser')) {
    console.info(`_[BROWSER] ${stepName}: `.green + `${argsStringify}`.yellow)
  } else if (name.includes('Fragment')) {
    console.info(`____${stepName}`.green)
  } else if (name.includes('Element') && !stepName.includes('with index:')) {
    console.info(`______${stepName}: `.green + `${argsStringify}`.yellow)
  }

  try {
    return originalValue.call(_target, ...args)
  } catch (error) {
    console.error(`${colors.red(`__${stepName} Error: ${error}`)}`)
    throw error
  }
}

export {consoleLogger}
