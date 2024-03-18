const isPlainObject = (arg) => Object.prototype.toString.call(arg) === '[object Object]'

export {isPlainObject}