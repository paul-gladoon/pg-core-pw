/* eslint-disable no-console */
async function consoleAssertStep(title, fn) {
  console.info(`ASSERTION: `.black.bgGreen + `${title}`.green.bgGreen)
  await fn()
}

const assertStep = consoleAssertStep

export {assertStep}
