/* eslint-disable no-console */

class Asserter {
  async assertStep(title: string, callback) {
    const loggerStep = async () => {
      console.info(`ASSERTION: `.black.bgGreen + `${title}`.green.bgGreen)
      await callback()
    }

    await loggerStep()
  }
}

export {Asserter}
