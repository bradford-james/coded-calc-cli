const fs = require("fs");
const chalk = require("chalk");

const logDir = (__dirname + "/../../logs");
const error = fs.createWriteStream(logDir + '/error.log', { flags: 'a' });
const access = fs.createWriteStream(logDir + '/access.log', { flags: 'a' });

let sessionInicator = "";

const logError = (state, err) => {
  const timeStamp = getTimeStamp();
  state = JSON.stringify(state);
  const errorLog = `${timeStamp} - ERROR: ${err} - App State: ${state}}\n`

  error.write(errorLog);

  console.log(chalk.red(`ERROR: \n${toTitleCase(err)}`));
  return true;
}

const logEvent = (state, err) => {
  const timeStamp = getTimeStamp();
  state = JSON.stringify(state);
  const log = `${timeStamp} ${!err ? "" : "- ERROR: " + err + " "}- App State: ${state}}\n`

  access.write(log);

  return true;
}

const logStartSession = () => {
  if (sessionInicator != "Y") {
    sessionInicator = "Y";
    const timeStamp = getTimeStamp();
    const session = `SESSION - ${timeStamp}\n`;

    access.write(session);
  }

  return true;
}

const logEndSession = () => {
  const timeStamp = getTimeStamp();
  const session = `SESSION_ENDED - ${timeStamp}\n`;

  access.write(session);

  return true;
}

const getTimeStamp = () => {
  return (new Date().toISOString().
    replace(/T/, ' ').
    replace(/\..+/, ''))
}

const toTitleCase = str => {
  str = str.toLowerCase().split(" ");
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
}

exports.logError = logError;
exports.logEvent = logEvent;
exports.logStartSession = logStartSession;
exports.logEndSession = logEndSession;