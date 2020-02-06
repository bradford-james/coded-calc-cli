const fs = require('fs')
const path = require('path')

const logDir = path.join(__dirname, '/../../logs')
const logPath = path.join(logDir, '/access.log')
const errPath = path.join(logDir, '/error.log')
const error = fs.createWriteStream(logPath, { flags: 'a' })
const access = fs.createWriteStream(errPath, { flags: 'a' })

let sessionInicator = ''

const getTimeStamp = () => {
  return new Date()
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '')
}

const logError = (state, err) => {
  const timeStamp = getTimeStamp()
  const stateF = JSON.stringify(state)
  const errorLog = `${timeStamp} - ERROR: ${err} - App State: ${stateF}}\n`

  error.write(errorLog)

  return true
}

const logEvent = (state, err) => {
  const timeStamp = getTimeStamp()
  const stateF = JSON.stringify(state)
  const log = `${timeStamp} ${
    !err ? '- INFO:' : `- ERROR: ${err} -`
  } App State: ${stateF}}\n`

  access.write(log)

  return true
}

const logStartSession = () => {
  if (sessionInicator !== 'Y') {
    sessionInicator = 'Y'
    const timeStamp = getTimeStamp()
    const session = `SESSION_START - ${timeStamp}\n`

    access.write(session)
  }

  return true
}

const logEndSession = () => {
  const timeStamp = getTimeStamp()
  const session = `SESSION_ENDED - ${timeStamp}\n`

  access.write(session)

  return true
}

exports.logError = logError
exports.logEvent = logEvent
exports.logStartSession = logStartSession
exports.logEndSession = logEndSession
