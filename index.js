const Calculator = require("./calculator/calc");
const Interface = require("./interface/interface");

const CalcInst = new Calculator();
const InterfaceInst = new Interface(CalcInst);
InterfaceInst.run();
