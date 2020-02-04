const ds = require("./data/dataStore");

module.exports = class Calculator {
  constructor() {
    this.val1 = "";
    this.operand = "";
    this.val2 = "";
    this.resultant = "";
    this.state = 0;
    this.VALUE_LENGTH_LIMIT = 10;
  }

  get display() {
    return this.resultant != ""
      ? this.resultant
      : this.val2 != ""
      ? this.val2
      : this.val1 != ""
      ? this.val1
      : "0";
  }

  handleInput(receivedInput) {
    try {
      this.state = this.determineState();
      const cmd = this.getCmd(receivedInput);

      switch (true) {
        // ------------------------
        // STATE 0 - Initial State
        //------------------------
        case this.state === 0 && cmd.type == "NUM":
          this.val1 = this.appendNumber(this.val1, cmd.value);
          break;

        // --------------------------------------
        // STATE 1 - One number has been entered
        //--------------------------------------
        case this.state === 1 && cmd.type == "NUM":
          this.val1 = this.appendNumber(this.val1, cmd.value);
          break;

        case this.state === 1 && cmd.type == "OP_CONT":
          this.operand = cmd.value;
          break;

        case this.state === 1 && cmd.type == "OP_EXEC":
          // To be used by squared, square root, absolute value, etc
          break;

        case this.state === 1 && cmd.type == "DEC":
          this.val1 = this.appendDecimal(this.val1);
          break;

        case this.state === 1 && cmd.type == "SIGN":
          this.val1 = this.invertSign(this.val1);
          break;

        // ----------------------------------------------------
        // STATE 2 - A number and an operand have been entered
        //----------------------------------------------------
        case this.state === 2 && cmd.type == "NUM":
          this.val2 = this.appendNumber(this.val2, cmd.value);
          break;

        case this.state === 2 && cmd.type == "OP_CONT":
          this.operand = cmd.value;
          break;

        // -------------------------------------------------------
        // STATE 3 - Two numbers and an operand have been entered
        //-------------------------------------------------------
        case this.state === 3 && cmd.type == "NUM":
          this.val2 = this.appendNumber(this.val2, cmd.value);
          break;

        case this.state === 3 && cmd.type == "OP_CONT":
          this.val1 = this.executeOperation();
          this.operand = cmd.value;
          this.val2 = "";
          break;

        case this.state === 3 && cmd.type == "OP_EXEC":
          if (cmd.code == "EQ") this.resultant = this.executeOperation();
          break;

        case this.state === 3 && cmd.type == "DEC":
          this.val2 = this.appendDecimal(this.val2);
          break;

        case this.state === 3 && cmd.type == "SIGN":
          this.val2 = this.invertSign(this.val2);
          break;

        // ------------------------------------------------------------
        // STATE 4 - An equation has been executed and returned a result
        //------------------------------------------------------------
        case this.state === 4 && cmd.type == "NUM":
          this.clearState();
          this.val1 = this.appendNumber(this.val1, cmd.value);
          break;

        case this.state === 4 && cmd.type == "OP_EXEC":
          this.val1 = this.resultant;
          this.resultant = this.executeOperation();
          break;

        case this.state === 4 && cmd.type == "SIGN":
          this.resultant = this.invertSign(this.resultant);
          break;

        case this.state === 3 && cmd.code == "CLR":
          this.val2 = "";
          break;

        case cmd.type == "CLR":
          this.clearState();
          break;

        default:
          throw "COMMAND NOT ALLOWABLE";
      }
      return {
        success: "Y",
        message: ""
      };
    } catch (err) {
      return {
        success: "N",
        message: err
      };
    }
  }

  determineState() {
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
      throw "INVALID STATE";
    }
  }

  getCmd(inputCode) {
    const cmdObj = ds.commands.find(obj => obj.code === inputCode);
    if (!cmdObj) throw "COMMAND NOT RECOGNIZED";

    return cmdObj;
  }

  appendNumber(val, appendee) {
    val = val.toString();
    appendee = appendee.toString();

    if (val.length >= this.VALUE_LENGTH_LIMIT)
      throw "LENGTH GREATER THAN ALLOWABLE";
    if (val === "" || val === 0) return appendee;

    return val.concat(appendee);
  }

  executeOperation() {
    if (this.operand === "/" && this.val2 == "0") throw "DIVIDE BY ZERO";

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

  appendDecimal(val) {
    val = val.toString();

    const decimalCount = (val.match(/[0-9]\./g) || []).length;
    if (decimalCount >= 1) throw "ALREADY HAS DECIMAL";
    if (val.length >= this.VALUE_LENGTH_LIMIT)
      throw "LENGTH GREATER THAN ALLOWABLE";

    return val.concat(".");
  }

  invertSign(val) {
    val = Number(val);
    if (val === "" || val == 0) return val;

    const invertedVal = (val * -1).toString();
    return invertedVal;
  }

  clearState() {
    this.val1 = "";
    this.operand = "";
    this.val2 = "";
    this.resultant = "";
    this.state = 0;

    return true;
  }
};
