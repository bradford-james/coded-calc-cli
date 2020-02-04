// CLI Tool Implementation
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = class CLI {
  constructor(calculator) {
    this.calculator = calculator;
    this.err = "";
  }

  run(prevState = {}) {
    if (prevState.success == "N") this.err = prevState.message;
    if (this.err != "") this.showError(this.err);
    this.getDisplay();

    readline.question("Enter command: ", async receivedInput => {
      let operationResult;

      switch (receivedInput) {
        case "EXT":
          process.exit(0);

        case "HELP":
          operationResult = this.showHelp();
          break;

        default:
          operationResult = await this.calculator.handleInput(receivedInput);
          break;
      }
      this.run(operationResult);
    });
  }

  getDisplay() {
    const displayVal = this.calculator.display;

    console.log("--------------");
    console.log("\n");
    console.log("--------------");
    console.log("|" + this.setdisplayPadding(displayVal) + displayVal + " |");
    console.log("--------------");
  }

  setdisplayPadding(displayVal) {
    let padding = "";
    const displayLen = displayVal.toString().length;
    const padLen = 12 - displayLen;
    for (let i = 0; i < padLen; i++) {
      padding += " ";
    }
    return padding;
  }

  showError(err) {
    console.log(`ERROR: ${err}`);
  }

  showHelp() {
    console.log("\n");
    console.log(
      "-------------------------  ||  -------------------------------"
    );
    console.log(
      "|                       |  ||  |                             |"
    );
    console.log(
      "|       -BUTTONS-       |  ||  |         -KEY CODES-         |"
    );
    console.log(
      "|                       |  ||  |                             |"
    );
    console.log(
      "-------------------------  ||  -------------------------------"
    );
    console.log(
      "|   AC/C    | +/- |  +  |  ||  | ALL_CLR/CLR   | SIGN  | ADD |"
    );
    console.log(
      "-------------------------  ||  -------------------------------"
    );
    console.log(
      "|  1  |  2  |  3  |  -  |  ||  | ONE   | TWO   | THREE | SUB |"
    );
    console.log(
      "-------------------------  ||  -------------------------------"
    );
    console.log(
      "|  4  |  5  |  6  |  /  |  ||  | FOUR  | FIVE  | SIX   | MUL |"
    );
    console.log(
      "-------------------------  ||  -------------------------------"
    );
    console.log(
      "|  7  |  8  |  9  |  x  |  ||  | SEVEN | EIGHT | NINE  | DIV |"
    );
    console.log(
      "-------------------------  ||  -------------------------------"
    );
    console.log(
      "|     0     |  .  |  =  |  ||  | ZERO          | DEC   | EQ  |"
    );
    console.log(
      "-------------------------  ||  -------------------------------"
    );
    console.log("\n");
    console.log("EXT - Exit the application");

    return {
      success: "Y",
      message: ""
    };
  }
};
