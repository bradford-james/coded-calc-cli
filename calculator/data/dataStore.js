exports.commands = [
  {
    code: "ONE",
    name: "One",
    type: "NUM",
    value: "1"
  },
  {
    code: "TWO",
    name: "Two",
    type: "NUM",
    value: "2"
  },
  {
    code: "THREE",
    name: "Three",
    type: "NUM",
    value: "3"
  },
  {
    code: "FOUR",
    name: "Four",
    type: "NUM",
    value: "4"
  },
  {
    code: "FIVE",
    name: "Five",
    type: "NUM",
    value: "5"
  },
  {
    code: "SIX",
    name: "Six",
    type: "NUM",
    value: "6"
  },
  {
    code: "SEVEN",
    name: "Seven",
    type: "NUM",
    value: "7"
  },
  {
    code: "EIGHT",
    name: "Eight",
    type: "NUM",
    value: "8"
  },
  {
    code: "NINE",
    name: "Nine",
    type: "NUM",
    value: "9"
  },
  {
    code: "ZERO",
    name: "Zero",
    type: "NUM",
    value: "0"
  },
  {
    code: "ADD",
    name: "Addition",
    type: "OP_CONT",
    value: "+"
  },
  {
    code: "SUB",
    name: "Subract",
    type: "OP_CONT",
    value: "-"
  },
  {
    code: "MUL",
    name: "Multiply",
    type: "OP_CONT",
    value: "*"
  },
  {
    code: "DIV",
    name: "Divide",
    type: "OP_CONT",
    value: "/"
  },
  {
    code: "EQ",
    name: "Equals",
    type: "OP_EXEC"
  },
  {
    code: "ALL_CLR",
    name: "All Clear",
    type: "CLR"
  },
  {
    code: "CLR",
    name: "Clear",
    type: "CLR"
  },
  {
    code: "SIGN",
    name: "Positive/Negative",
    type: "SIGN"
  },
  {
    code: "DEC",
    name: "Decimal",
    type: "DEC"
  }
];

exports.errors = [
  {
    code: "NON_ALLOW",
    message: "COMMAND NOT ALLOWABLE",
    display: "This command is not available at this time"
  },
  {
    code: "INV_STATE",
    message: "INVALID STATE",
    display: "Internal state of the application is invalid"
  },
  {
    code: "DIV_ZERO",
    message: "DIVIDE BY ZERO",
    display: "A 'divide by zero' expression has been detected"
  },
  {
    code: "NOT_FOUND",
    message: "COMMAND NOT RECOGNIZED",
    display: "This command is not recognized as an enumerated value"
  },
  {
    code: "EXCESS_LEN",
    message: "LENGTH GREATER THAN ALLOWABLE",
    display: "Value string length is greater than is allowable"
  },
  {
    code: "DUP_DEC",
    message: "ALREADY HAS DECIMAL",
    display: "This value already has a decimal"
  }
];
