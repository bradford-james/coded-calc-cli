// --------
// IMPORTS
//--------

const {
  getCmd,
  handleError,
  appendNumber,
  invertSign,
  appendDecimal
} = require("./utils/functions");

// ----------
// CLASS DEF
//----------

module.exports = class Calculator {
  constructor() {
    this.val1 = "";
    this.operand = "";
    this.val2 = "";
    this.resultant = "";
    this.state = 0;
    this.VALUE_LENGTH_LIMIT = 100;
  }

  getDisplay() {
    // 'type' property of the return object can be used for handling
    // different display limitations on string length, upper/lower bounds, etc.

    return this.resultant != ""
      ? {
          type: "resultant",
          value: this.resultant
        }
      : this.val2 != ""
      ? {
          type: "value",
          value: this.val2
        }
      : this.val1 != ""
      ? {
          type: "value",
          value: this.val1
        }
      : {
          type: "value",
          value: "0"
        };
  }

  handleInput(receivedInput) {
    try {
      this.state = this._determineState();
      const cmd = getCmd(receivedInput);

      switch (true) {
        // ------------------------
        // STATE 0 - Initial State
        //------------------------
        case this.state === 0 && cmd.type == "NUM":
          this.val1 = appendNumber(this.val1, cmd.value);
          break;

        // --------------------------------------
        // STATE 1 - One number has been entered
        //--------------------------------------
        case this.state === 1 && cmd.type == "NUM":
          this.val1 = appendNumber(this.val1, cmd.value);
          break;

        case this.state === 1 && cmd.type == "OP_CONT":
          this.operand = cmd.value;
          break;

        case this.state === 1 && cmd.type == "OP_EXEC":
          // To be used by squared, square root, absolute value, etc
          break;

        case this.state === 1 && cmd.type == "DEC":
          this.val1 = appendDecimal(this.val1);
          break;

        case this.state === 1 && cmd.type == "SIGN":
          this.val1 = invertSign(this.val1);
          break;

        // ----------------------------------------------------
        // STATE 2 - A number and an operand have been entered
        //----------------------------------------------------
        case this.state === 2 && cmd.type == "NUM":
          this.val2 = appendNumber(this.val2, cmd.value);
          break;

        case this.state === 2 && cmd.type == "OP_CONT":
          this.operand = cmd.value;
          break;

        // -------------------------------------------------------
        // STATE 3 - Two numbers and an operand have been entered
        //-------------------------------------------------------
        case this.state === 3 && cmd.type == "NUM":
          this.val2 = appendNumber(this.val2, cmd.value);
          break;

        case this.state === 3 && cmd.type == "OP_CONT":
          this.val1 = this._executeOperation();
          this.operand = cmd.value;
          this.val2 = "";
          break;

        case this.state === 3 && cmd.type == "OP_EXEC":
          if (cmd.code == "EQ") this.resultant = this._executeOperation();
          break;

        case this.state === 3 && cmd.type == "DEC":
          this.val2 = appendDecimal(this.val2);
          break;

        case this.state === 3 && cmd.type == "SIGN":
          this.val2 = invertSign(this.val2);
          break;

        // ------------------------------------------------------------
        // STATE 4 - An equation has been executed and returned a result
        //------------------------------------------------------------
        case this.state === 4 && cmd.type == "NUM":
          this._clearState();
          this.val1 = appendNumber(this.val1, cmd.value);
          break;

        case this.state === 4 && cmd.type == "OP_EXEC":
          this.val1 = this.resultant;
          this.resultant = this._executeOperation();
          break;

        case this.state === 4 && cmd.type == "SIGN":
          this.resultant = invertSign(this.resultant);
          break;

        case this.state === 3 && cmd.code == "CLR":
          this.val2 = "";
          break;

        case cmd.type == "CLR":
          this._clearState();
          break;

        default:
          handleError("NON_ALLOW");
      }
      return this._setReturn(receivedInput);
    } catch (err) {
      return this._setReturn(receivedInput, err);
    }
  }

  _determineState() {
    if (!this.val1 && !this.operand && !this.val2 && !this.resultant) {
      return 0;
    } else if (
      this.val1 != "" &&
      !this.operand &&
      !this.val2 &&
      !this.resultant
    ) {
      return 1;
    } else if (
      this.val1 != "" &&
      this.operand != "" &&
      !this.val2 &&
      !this.resultant
    ) {
      return 2;
    } else if (
      this.val1 != "" &&
      this.operand != "" &&
      this.val2 != "" &&
      !this.resultant
    ) {
      return 3;
    } else if (
      this.val1 != "" &&
      this.operand != "" &&
      this.val2 != "" &&
      this.resultant != ""
    ) {
      return 4;
    } else {
      handleError("INV_STATE");
    }
  }

  _clearState() {
    this.val1 = "";
    this.operand = "";
    this.val2 = "";
    this.resultant = "";
    this.state = 0;

    return true;
  }

  _executeOperation() {
    if (this.operand === "/" && this.val2 == "0") handleError("DIV_ZERO");

    const value_1 = Number(this.val1);
    const value_2 = Number(this.val2);
    const operation = new Function(
      "value_1",
      "value_2",
      `return value_1 ${this.operand} value_2`
    );

    const result = operation(value_1, value_2);
    return result.toString();
  }

  _setReturn(inputCmd, err = "") {
    const success = !err ? "Y" : "N";

    return {
      success: success,
      message: err,
      appState: {
        command: inputCmd,
        val1: this.val1,
        operand: this.operand,
        val2: this.val2,
        resultant: this.resultant,
        state: this.state
      }
    };
  }
};
