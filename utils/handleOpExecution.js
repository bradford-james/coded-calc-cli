module.exports = function(val1, val2, operand, operation) {
  if (operand == "DIV" && val2 == "0") {
    throw "Divide by Zero Error";
    return val1;
  }
  return operation(val1, val2);
};
