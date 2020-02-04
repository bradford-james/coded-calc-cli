const package = require("../package.json");

const versionOutput = () => {
  console.log(`v${package.version}`);
};

module.exports = versionOutput;
