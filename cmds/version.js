const pckg = require('../package.json')

const versionOutput = () => {
  console.log(`v${pckg.version}`)
}

module.exports = versionOutput
