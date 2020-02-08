const Calculator = require('coded-calc-core-js')
const minimist = require('minimist')
const version = require('./cmds/version')
const help = require('./cmds/help')

const Interface = require('./interface/interface')

const CalcInst = new Calculator()
const InterfaceInst = new Interface(CalcInst)

const cli = () => {
  const args = minimist(process.argv.slice(2))

  let cmd = args._[0] || 'calc'

  if (args.version || args.v) {
    cmd = 'version'
  } else if (args.help || args.h) {
    cmd = 'help'
  }

  switch (cmd) {
    case 'calc':
      InterfaceInst.run()
      break

    case 'version':
      version(args)
      process.exit(0)
      break

    case 'help':
      help(args)
      process.exit(0)
      break

    default:
      console.error(`${cmd} is not a valid command`)
      process.exit(1)
  }
}

module.exports = cli()
