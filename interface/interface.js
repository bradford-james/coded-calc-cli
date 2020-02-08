// --------
// IMPORTS
//--------

const chalk = require('chalk')
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
})
const {
  logError,
  logEvent,
  logStartSession,
  logEndSession,
} = require('./utils/logger')
const {
  breakdownDisplayVal,
  setDisplayPadding,
  toTitleCase,
  handleError,
} = require('./utils/functions')

// ----------
// CLASS DEF
//----------

module.exports = class CLI {
  constructor(calculator) {
    this.calculator = calculator
    this.UPPER_LIMIT = 1000000000000
    this.LOWER_LIMIT = 0.00000001
  }

  run() {
    logStartSession()
    this._getDisplay()

    let opResult
    readline.question('Enter Command: ', receivedInput => {
      switch (receivedInput) {
        case 'EXT':
          logEndSession()
          process.exit(0)
          break

        case 'HELP':
          opResult = CLI._showHelp()
          break

        default:
          opResult = this.calculator.handleInput(receivedInput)
          break
      }
      if (opResult.success === 'N') {
        logError(opResult.appState, opResult.code)
        CLI._showError(opResult.code)
      }
      logEvent(opResult.appState, opResult.code)

      this.run()
    })
  }

  _getDisplay() {
    const { type, value } = this.calculator.getDisplay()

    const validated = this._validateCalcValue(value)
    if (!validated) this.calculator.handleInput('ALL_CLR')

    const { valSign, adjustedVal, exp } = breakdownDisplayVal(type, value)
    const displayVal = valSign.concat(adjustedVal)

    console.log(chalk.blue('---------------'))
    console.log('\n')
    console.log(chalk.blue('---------------'))
    console.log(
      chalk.blue('| ') +
        setDisplayPadding(displayVal) +
        chalk.yellow(displayVal) +
        chalk.blue(' |') +
        (exp !== '' && exp !== '1' && exp !== '0' ? ` * 10^${exp}` : '')
    )
    console.log(chalk.blue('---------------'))

    return true
  }

  _validateCalcValue(value) {
    const state = { value }

    if (
      value < this.LOWER_LIMIT &&
      value > this.LOWER_LIMIT * -1 &&
      // eslint-disable-next-line eqeqeq
      value != 0
    ) {
      logError(state, 'LOWER_LIMIT')
      logEvent(state, 'LOWER_LIMIT')
      CLI._showError('LOWER_LIMIT')
      return false
    }
    if (value > this.UPPER_LIMIT || value < this.UPPER_LIMIT * -1) {
      logError(state, 'UPPER_LIMIT')
      logEvent(state, 'UPPER_LIMIT')
      CLI._showError('UPPER_LIMIT')
      return false
    }
    return true
  }

  static _showError(errCode) {
    const errMessage = handleError(errCode)
    console.log(chalk.red(`ERROR: \n${toTitleCase(errMessage)}`))
    return true
  }

  static _showHelp() {
    const g = chalk.gray
    const b = chalk.blue
    const row = '-------------------------'
    const row2 = '-------------------------------'
    const fR = `${b(row)}  ${g('||')}  ${b(row2)}`

    console.log(`
${fR}
|                       |  ${g('||')}  |                             |
|       -BUTTONS-       |  ${g('||')}  |         -KEY CODES-         |
|                       |  ${g('||')}  |                             |
${fR}
|   AC/C    | +/- |  +  |  ${g('||')}  | ALL_CLR/CLR   | SIGN  | ADD |
${fR}
|  1  |  2  |  3  |  -  |  ${g('||')}  | ONE   | TWO   | THREE | SUB |
${fR}
|  4  |  5  |  6  |  x  |  ${g('||')}  | FOUR  | FIVE  | SIX   | MUL |
${fR}
|  7  |  8  |  9  |  /  |  ${g('||')}  | SEVEN | EIGHT | NINE  | DIV |
${fR}
|     0     |  .  |  =  |  ${g('||')}  | ZERO          | DEC   | EQ  |
${fR}
    `)
    console.log('EXT - Exit the application\n')

    return {
      success: 'Y',
      message: '',
    }
  }
}
