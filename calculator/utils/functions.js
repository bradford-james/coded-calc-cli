const { getCmdDAL } = require("./DAL");

const getCmd = inputCode => {
  const cmdObj = getCmdDAL(inputCode);
  if (!cmdObj) handleError("NOT_FOUND");

  return cmdObj;
};

const handleError = errCode => {
  throw errCode;
};

const appendNumber = (val, appendee, limit = 100) => {
  val = val.toString();
  appendee = appendee.toString();

  if (val.length >= limit) handleError("EXCESS_LEN");
  if (val === "" || val === 0) return appendee;

  return val.concat(appendee);
};

const appendDecimal = (val, limit = 100) => {
  val = val.toString();

  const decimalCount = (val.match(/[0-9]\./g) || []).length;
  if (decimalCount >= 1) handleError("DUP_DEC");
  if (val.length >= limit) handleError("EXCESS_LEN");

  return val.concat(".");
};

const invertSign = val => {
  val = Number(val);
  if (val === "" || val == 0) return val;

  const invertedVal = (val * -1).toString();
  return invertedVal;
};

exports.getCmd = getCmd;
exports.handleError = handleError;
exports.appendNumber = appendNumber;
exports.invertSign = invertSign;
exports.appendDecimal = appendDecimal;
