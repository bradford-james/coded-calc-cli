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
        return {
          success: "Y",
          message: ""
        };

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
        return {
          success: "Y",
          message: ""
        };

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
        return {
          success: "Y",
          message: ""
        };

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
        return {
          success: "Y",
          message: ""
        };

      case "modifier":
        return {
          success: "Y",
          message: ""
        };

      case "error":
        const errMessage = cmdObj["name"];
        const result = {
          success: "N",
          message: errMessage
        };
        return result;

      default:
        result = {
          success: "N",
          message: "No Such Command"
        };
        return result;
    }
  }
};
