const getCmdObj = require("./utils/getCmdObj");
const handleOpExec = require("./utils/handleOpExecution");

module.exports = class Calculator {
  constructor() {
    (this.val1 = ""),
      (this.val2 = ""),
      (this.eqMem = ""),
      (this.eqOpMem = ""),
      (this.operand = ""),
      (this.operation = ""),
      (this.memCache = []);
  }

  get display() {
    return Number(
      this.val2 != "" ? this.val2 : this.val1 != "" ? this.val1 : 0
    );
  }

  async handleInput(receivedInput) {
    var cmdObj = await getCmdObj(receivedInput);

    // eqMem, eqOpMem is preserved for sequential Equals operations
    if (cmdObj["code"] != "EQ") {
      this.eqMem = "";
      this.eqOpMem = "";
    }

    switch (cmdObj["type"]) {
      case "numeric":
        if (this.operand == "equals") {
          this.val1 = "";
          this.operand = "";
        }
        if (!this.operand) {
          this.val1 = this.val1 + cmdObj["value"];
        } else {
          this.val2 = this.val2 + cmdObj["value"];
        }
        break;

      case "op_continue":
        if (!this.val1) return "NON_ALLOWABLE";
        if (this.val2 != "") {
          this.val1 = handleOpExec(
            this.val1,
            this.val2,
            this.operand,
            this.operation
          ).toString();
          this.val2 = "";
        }
        this.operand = cmdObj["code"];
        this.operation = new Function(
          "val1",
          "val2",
          "return " + cmdObj["execution"]
        );
        break;

      case "op_exec":
        if (!this.val1 || !this.operand) return "NON_ALLOWABLE";
        if (cmdObj["code"] == "EQ") {
          if (!this.val2) this.val2 = this.eqMem;
          if (!this.operation) this.operation = this.eqOpMem;
          let result;
          try {
            result = handleOpExec(
              this.val1,
              this.val2,
              this.operand,
              this.operation
            ).toString();
            this.val1 = result;
            this.eqMem = this.val2;
            this.eqOpMem = this.operation;
            this.val2 = "";
            this.operand = "equals";
            this.operation = "";
          } catch (err) {
            console.log(err);
          }
        }
        break;

      case "clear":
        if (cmdObj["code"] == "ALL_CLR") {
          this.val2 = "";
          this.val1 = "";
          this.eqMem = "";
          this.eqOpMem = "";
          this.operand = "";
          this.operation = "";
        } else if (cmdObj["code"] == "CLR") {
          if (this.val2 != "") {
            this.val2 = "";
          } else {
            this.val1 = "";
            this.eqMem = "";
            this.eqOpMem = "";
            this.operand = "";
            this.operation = "";
          }
        }
        break;

      case "modifier":
        break;

      case "error":
        const errMessage = cmdObj["name"];
        console.log(errMessage);
        break;

      default:
        return "ERROR";
    }
  }
};
