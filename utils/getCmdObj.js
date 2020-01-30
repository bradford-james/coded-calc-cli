const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const path = require("path");

module.exports = async function getLookup(val) {
  const readDirectory = __dirname;
  const readFileURL = path.resolve(readDirectory, "../data/db.json");
  const adapter = new FileSync(readFileURL);
  const db = low(adapter);

  try {
    commandObj = await db
      .get("commands")
      .find({ code: val })
      .value();
    if (!commandObj) throw "Command not recognized";
  } catch (err) {
    console.error("Error: " + err);
    commandObj = "";
  }

  return commandObj;
};
