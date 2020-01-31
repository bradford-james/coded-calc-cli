const Calculator = require("./calc");
const Interface = require("./interface");

const CalcInst = new Calculator();
const InterfaceInst = new Interface(CalcInst);
InterfaceInst.run();
