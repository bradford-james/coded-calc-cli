const getCmdObj = require("./utils/getCmdObj");

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

    // eqMem is presenved for sequential Equals operations
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
          this.val1 = this.operation(this.val1, this.val2).toString();
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
          this.val1 = this.operation(this.val1, this.val2).toString();
          this.eqMem = this.val2;
          this.eqOpMem = this.operation;
        }
        this.val2 = "";
        this.operand = "equals";
        this.operation = "";
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

      default:
        return "ERROR";
    }
  }
};
