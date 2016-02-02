'use strict'

let util = require('util')
let winston = require('winston')

winston.info('[Logger] Initializing')

let env = process.env.NODE_ENV
const LOG_LEVEL = env.LOG_LEVEL || 'debug'

winston.info('[Logger] LOG_LEVEL = %s', LOG_LEVEL)

winston.emitErrs = true

let logger = new winston.Logger({
  transports: [
    // new winston.transports.File({
    //  level: 'info',
    //  filename: env.logDirectory + '/all-logs.log',
    //  handleExceptions: true,
    //  json: true,
    //  maxsize: 20971520, // 20MB
    //  maxFiles: 10,
    //  colorize: false
    // }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      prettyPrint: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
})
function formatArgs (args) {
  return [util.format.apply(util.format, Array.prototype.slice.call(args))]
}

console.log = function () {
  logger.info.apply(logger, formatArgs(arguments))
}
console.info = function () {
  logger.info.apply(logger, formatArgs(arguments))
}
console.warn = function () {
  logger.warn.apply(logger, formatArgs(arguments))
}
console.error = function () {
  logger.error.apply(logger, formatArgs(arguments))
}
console.debug = function () {
  logger.debug.apply(logger, formatArgs(arguments))
}
console.silly = function () {
  logger.silly.apply(logger, formatArgs(arguments))
}

module.exports = logger
module.exports.stream = {
  write: function (message, encoding) {
    logger.info(message)
  }
}

console.info('[Logger] Done')
