import {allure} from 'allure-playwright'

async function allureReporting(stepName, _target, originalValue, ...args) {
  const {name} = _target.constructor

  return allure.step(stepName, async function () {
    const param = args.map((arg) => JSON.stringify(arg, null, '\t')).join()
    const logs = []
    if (!stepName.includes('with index:') && args.length) {
      await allure.attachment('args', param, 'text/plain')
    }

    try {
      if (name.includes('Page')) {
        _target.getCurrentPage().on('console', async (msg) => {
          if (msg.type() === 'error') logs.push(msg)
        })
      }

      const originalFnResult = await originalValue.call(_target, ...args)
      return originalFnResult
    } catch (error) {
      await allure.attachment('error-message', error.toString(), 'text/plain')

      if (name.includes('Page')) {
        await allure.attachment('screenshot.png', await _target.getCurrentPage().screenshot(), {
          contentType: 'image/png',
        })
        const logsToReadableState = logs.map((arg) => JSON.stringify(arg, null, '\t')).join()
        await allure.attachment('borwser-logs', logsToReadableState, 'text/plain')
      }

      if (name.includes('Browser')) {
        await allure.attachment('screenshot.png', await _target.page().screenshot(), {
          contentType: 'image/png',
        })
      }
      throw error
    }
  })
}

export {allureReporting}
