// --------
// IMPORTS
//--------

const chalk = require("chalk");
const {
  logError,
  logEvent,
  logStartSession,
  logEndSession
} = require("./utils/logger");
const {
  displayValueValidation,
  setDisplayPadding,
  toTitleCase,
  handleError
} = require("./utils/functions");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

// ---------
//CLASS DEF
//---------

module.exports = class CLI {
  constructor(calculator) {
    this.calculator = calculator;
  }

  run() {
    logStartSession();
    this._getDisplay();

    let opResult;
    readline.question("Enter Command: ", receivedInput => {
      switch (receivedInput) {
        case "EXT":
          logEndSession();
          process.exit(0);

        case "HELP":
          opResult = this._showHelp();
          break;

        default:
          opResult = this.calculator.handleInput(receivedInput);
          break;
      }
      if (opResult.success === "N") {
        logError(opResult.appState, opResult.code);
        this._showError(opResult.code);
      }
      logEvent(opResult.appState, opResult.code);

      this.run();
    });
  }

  _getDisplay() {
    const displayValueObj = this.calculator.getDisplay();
    const validatedDisplayValueObj = displayValueValidation(displayValueObj);

    const { valSign, formattedVal, exponent } = validatedDisplayValueObj;
    const displayVal = valSign.concat(formattedVal);

    console.log(chalk.blue("---------------"));
    console.log("\n");
    console.log(chalk.blue("---------------"));
    console.log(
      chalk.blue("| ") +
      setDisplayPadding(displayVal) +
      chalk.yellow(displayVal) +
      chalk.blue(" |") +
      (exponent !== "" && exponent !== "1" && exponent !== "0"
        ? ` *10^${exponent}`
        : "")
    );
    console.log(chalk.blue("---------------"));

    return true;
  }

  _showError(errCode) {
    const errMessage = handleError(errCode);
    console.log(chalk.red(`ERROR: \n${toTitleCase(errMessage)}`));
  }

  _showHelp() {
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
