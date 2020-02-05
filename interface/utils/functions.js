const displayValueValidation = valObj => {
  const { type, value } = valObj;
  const val = value;
  const valNum = Number(val);
  const valSign = val.startsWith("-") ? "-" : "";
  const valAbs = Math.abs(valNum);
  const formattedVal = val;
  const exp = "";

  // TODO Screen character limits
  if (type == "resultant") {
    if (valNum >= 10000000000 || valNum <= -10000000000) {
    } // Set decimal and show exponent (x10^_)
    if (valNum < 0.00000001 && valNum > -0.00000001) {
    } // Set decimal and show exponent (x10^-_)
  } else {
    if (
      valNum >= 1000000000 ||
      valNum <= -1000000000 ||
      (valNum < 0.00000001 && valNum > -0.00000001)
    ) {
      // return error/block
    }
  }
  /*
      if (this.hasDecimal(val) === true) {
        // round to <= 10 characters total
        const valAbsLength = valAbs.toString().length;
        if (valAbsLength > 10) {
          const excessLength = valAbsLength - 10;
          const adjustedForRounding = valNum * (10 ^ (excessLength * -1));
          const roundedVal = Math.round(adjustedForRounding);
          formattedVal = "";
        }
      }*/
  return {
    valSign: valSign,
    origVal: val,
    formattedVal: formattedVal,
    exponent: exp
  };
};

const hasDecimal = val => {
  const decimalCount = (val.match(/[0-9]\./g) || []).length;
  if (decimalCount >= 1) return true;
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

exports.displayValueValidation = displayValueValidation;
exports.hasDecimal = hasDecimal;
exports.setDisplayPadding = setDisplayPadding;
exports.toTitleCase = toTitleCase;
