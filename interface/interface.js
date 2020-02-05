// CLI Tool Implementation
const chalk = require("chalk");
const { logError, logEvent, logStartSession, logEndSession } = require("./utils/logger")
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = class CLI {
  constructor(calculator) {
    this.calculator = calculator;
  }

  run() {
    logStartSession();
    this.getDisplay();

    let opResult;
    readline.question("Enter Command: ", receivedInput => {
      switch (receivedInput) {
        case "EXT":
          logEndSession();
          process.exit(0);

        case "HELP":
          opResult = this.showHelp();
          break;

        default:
          opResult = this.calculator.handleInput(receivedInput);
          break;
      }
      if (opResult.success === "N") logError(opResult.appState, opResult.message)
      logEvent(opResult.appState, opResult.message);

      this.run();
    });
  }

  getDisplay() {
    const displayValueObj = this.calculator.getDisplay();
    const validatedDisplayValueObj = this.displayValueValidation(displayValueObj);

    const { valSign, formattedVal, exponent } = validatedDisplayValueObj
    const displayVal = valSign.concat(formattedVal)

    console.log(chalk.blue("---------------"));
    console.log("\n");
    console.log(chalk.blue("---------------"));
    console.log(
      chalk.blue("| ") +
      this.setDisplayPadding(displayVal) +
      chalk.yellow(displayVal) +
      chalk.blue(" |") +
      (exponent !== "" && exponent !== "1" && exponent !== "0" ? ` *10^${exponent}` : "")
    );
    console.log(chalk.blue("---------------"));

    return true;
  }

  displayValueValidation(valObj) {
    const { type, value } = valObj;
    const val = value;
    const valNum = Number(val);
    const valSign = val.startsWith("-") ? "-" : "";
    const valAbs = Math.abs(valNum);
    const formattedVal = val;
    const exp = "";

    // TODO Screen character limits
    if (type == "resultant") {
      if (valNum >= 10000000000 || valNum <= -10000000000) { } // Set decimal and show exponent (x10^_)
      if (valNum < 0.00000001 && valNum > -0.00000001) { } // Set decimal and show exponent (x10^-_)
    } else {
      if (valNum >= 1000000000 || valNum <= -1000000000 || (valNum < 0.00000001 && valNum > -0.00000001)) {
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
    }
  }

  hasDecimal(val) {
    const decimalCount = (val.match(/[0-9]\./g) || []).length;
    if (decimalCount >= 1) return true;
  }

  setDisplayPadding(displayVal) {
    let padding = "";
    const displayLen = displayVal.toString().length;
    const padLen = 11 - displayLen;
    for (let i = 0; i < padLen; i++) {
      padding += " ";
    }
    return padding;
  }

  showHelp() {
    const g = chalk.gray;
    const b = chalk.blue;
    const row = "-------------------------";
    const row2 = "-------------------------------";
    const fR = `${b(row)}  ${g("||")}  ${b(row2)}`;

    console.log(`
${fR}
|                       |  ${g("||")}  |                             |
|       -BUTTONS-       |  ${g("||")}  |         -KEY CODES-         |
|                       |  ${g("||")}  |                             |
${fR}
|   AC/C    | +/- |  +  |  ${g("||")}  | ALL_CLR/CLR   | SIGN  | ADD |
${fR}
|  1  |  2  |  3  |  -  |  ${g("||")}  | ONE   | TWO   | THREE | SUB |
${fR}
|  4  |  5  |  6  |  /  |  ${g("||")}  | FOUR  | FIVE  | SIX   | MUL |
${fR}
|  7  |  8  |  9  |  x  |  ${g("||")}  | SEVEN | EIGHT | NINE  | DIV |
${fR}
|     0     |  .  |  =  |  ${g("||")}  | ZERO          | DEC   | EQ  |
${fR}
    `);
    console.log("EXT - Exit the application\n");

    return {
      success: "Y",
      message: ""
    };
  }
};
