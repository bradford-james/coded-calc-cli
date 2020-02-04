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
    const displayVal = this.calculator.display;
    // TODO Screen character limits
    // If resultant, check if value is >= 1000000000 or <= 1000000000 (1 billion)
    // Set decimal and show exponent (x10^_),
    // If resultant, check if value is <= 0.00000001 >= -0.00000001
    // Set decimal and show exponent (x10^-_)
    // If other value, past 1 billion (+/-) or less than 0.00000001 (+/-)
    // return error/block 

    // If decimal, round to <= 10 characters total

    console.log(chalk.blue("---------------"));
    console.log("\n");
    console.log(chalk.blue("---------------"));
    console.log(
      chalk.blue("| ") +
      this.setDisplayPadding(displayVal) +
      chalk.yellow(displayVal) +
      chalk.blue(" |")
    );
    console.log(chalk.blue("---------------"));

    return true;
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
