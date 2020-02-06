const { getErrorDAL } = require("./DAL");

const breakdownDisplayVal = (type, val) => {
  const valSign = val.startsWith("-") ? "-" : "";
  const valAbs = Math.abs(Number(val)).toString();
  const hasDecimal = findDecimal(val);
  const int = Math.floor(valAbs).toString();
  let decRemainder = Number(valAbs) % 1;
  decRemainder = decRemainder.toString();

  let exp = "1";
  let adjustedVal = "";

  // length validation
  if (valAbs.length > 10) {
    if (int.length > 10) {
      const stringLen = int.length;

      exp = stringLen - 1;
      exp = exp.toString();

      adjustedVal = int.slice(0, 10);
      adjustedVal = Math.round(Number(adjustedVal) * 0.1);
      adjustedVal = adjustedVal.toString();
      adjustedVal = adjustedVal
        .slice(0, 1)
        .concat(".", int.slice(1, adjustedVal.length));
    } else if (hasDecimal) {
      adjustedVal = valAbs.slice(0, 10);
    } else {
      adjustedVal = valAbs.slice(0, 11);
      adjustedVal = Math.round(Number(adjustedVal) * 0.1).toString();
    }
  } else {
    adjustedVal = valAbs;
  }

  return {
    origVal: val,
    valSign,
    exp,
    adjustedVal,
    valAbs,
    hasDecimal,
    int,
    decRemainder
  };
};

const findDecimal = val => {
  const decimalCount = (val.match(/[0-9]\./g) || []).length;
  if (decimalCount >= 1) return true;
  return false;
};

const setDisplayPadding = displayVal => {
  let padding = "";
  const displayLen = displayVal.toString().length;
  const padLen = 11 - displayLen;
  for (let i = 0; i < padLen; i++) {
    padding += " ";
  }
  return padding;
};

const toTitleCase = str => {
  str = str.toLowerCase().split(" ");
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
};

const handleError = errCode => {
  const errMessage = getErrorDAL(errCode);
  return errMessage || "ERROR CODE NOT FOUND";
};

exports.breakdownDisplayVal = breakdownDisplayVal;
exports.setDisplayPadding = setDisplayPadding;
exports.toTitleCase = toTitleCase;
exports.handleError = handleError;
