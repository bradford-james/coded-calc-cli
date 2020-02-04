// CLI Tool Implementation
const chalk = require("chalk");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, prettyPrint } = format;
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

const logger = createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new transports.File({
      filename: "./logs/error.log",
      level: "error"
    }),
    new transports.File({ filename: "./logs/combined.log" })
  ]
});

module.exports = class CLI {
  constructor(calculator) {
    this.calculator = calculator;
  }

  run() {
    this.getDisplay();
    let opResult;

    readline.question("Enter Command: ", receivedInput => {
      switch (receivedInput) {
        case "EXT":
          process.exit(0);

        case "HELP":
          opResult = this.showHelp();
          break;

        default:
          opResult = this.calculator.handleInput(receivedInput);
          break;
      }
      if (opResult.success === "N") this.handleError(opResult.message);
      this.run();
    });
  }

  getDisplay() {
    const displayVal = this.calculator.display;

    console.log(chalk.blue("---------------"));
    console.log("\n");
    console.log(chalk.blue("---------------"));
    console.log(
      chalk.blue("| ") +
        this.setdisplayPadding(displayVal) +
        chalk.yellow(displayVal) +
        chalk.blue(" |")
    );
    console.log(chalk.blue("---------------"));

    return true;
  }

  setdisplayPadding(displayVal) {
    let padding = "";
    const displayLen = displayVal.toString().length;
    const padLen = 11 - displayLen;
    for (let i = 0; i < padLen; i++) {
      padding += " ";
    }
    return padding;
  }

  handleError(err) {
    logger.error(err);
    console.log(chalk.red(`ERROR: \n${this.toTitleCase(err)}`));
    return true;
  }

  toTitleCase(str) {
    str = str.toLowerCase().split(" ");
    for (let i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
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
