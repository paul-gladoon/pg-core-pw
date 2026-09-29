const overridableMethods = /^(getScreenshot|get|perform|sendKeys|isDisplay|isExist|waitForDataState|waitForDisplayedState)$/

const getOverrideName = (method): string => {
  const parsedOverrideName = method?.name?.match(overridableMethods)
  if (!parsedOverrideName) {
    throw new Error('You are trying to "override" a method that is not in the allowed list to "override"')
  }

  return parsedOverrideName[0]
}

const applyOverride = (target, method) => {
  const name = getOverrideName(method)
  target[`${name}Initial`] = target[name]
  target[name] = method.bind(target)
}

export {getOverrideName, applyOverride}
