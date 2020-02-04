// Tests are based on Jest javascript testing library

/*
-----------------
SET UP/TEAR DOWN
----------------
*/

const Calculator = require("../calc");
CalcInst = new Calculator();

beforeEach(async () => {
  await CalcInst.handleInput("ALL_CLR");
});

/*
--------
TESTS
-------
*/

describe("Init", () => {
  test("Initial Display", () => {
    expect(CalcInst.display).toBe(0);
  });
});

describe("Basic Commands", () => {
  test("Addition test", async () => {
    await CalcInst.handleInput("SEVEN");
    await CalcInst.handleInput("ADD");
    await CalcInst.handleInput("THREE");
    await CalcInst.handleInput("EQ");
    expect(CalcInst.display).toBe(10);
  });

  test("Subtraction test", async () => {
    await CalcInst.handleInput("TWO");
    await CalcInst.handleInput("SUB");
    await CalcInst.handleInput("FOUR");
    await CalcInst.handleInput("EQ");
    expect(CalcInst.display).toBe(-2);
  });

  test("Multiplication test", async () => {
    await CalcInst.handleInput("EIGHT");
    await CalcInst.handleInput("MUL");
    await CalcInst.handleInput("SIX");
    await CalcInst.handleInput("EQ");
    expect(CalcInst.display).toBe(48);
  });

  test("Division test", async () => {
    await CalcInst.handleInput("NINE");
    await CalcInst.handleInput("DIV");
    await CalcInst.handleInput("THREE");
    await CalcInst.handleInput("EQ");
    expect(CalcInst.display).toBe(3);
  });

  test("All Clear test", async () => {
    await CalcInst.handleInput("NINE");
    await CalcInst.handleInput("DIV");
    await CalcInst.handleInput("THREE");
    await CalcInst.handleInput("ALL_CLR");
    await CalcInst.handleInput("FOUR");
    await CalcInst.handleInput("ADD");
    await CalcInst.handleInput("THREE");
    await CalcInst.handleInput("EQ");
    expect(CalcInst.display).toBe(7);
  });

  test("Clear test", async () => {
    await CalcInst.handleInput("NINE");
    await CalcInst.handleInput("ADD");
    await CalcInst.handleInput("THREE");
    await CalcInst.handleInput("CLR");
    await CalcInst.handleInput("FIVE");
    await CalcInst.handleInput("EQ");
    expect(CalcInst.display).toBe(14);
  });
});

describe("Non-Allowable/Blocked Commands", () => {
  test("Starting Operand check", () => {
    expect.assertions(1);
    return expect(CalcInst.handleInput("ADD")).resolves.toEqual(
      "NON_ALLOWABLE"
    );
  });

  test("Starting Equals check", () => {
    expect.assertions(1);
    return expect(CalcInst.handleInput("EQ")).resolves.toEqual("NON_ALLOWABLE");
  });

  test("Starting Operand Check", async () => {
    await CalcInst.handleInput("ADD");
    expect(CalcInst.display).toBe(0);
  });

  test("Equals With No Operand", async () => {
    await CalcInst.handleInput("ONE");
    await CalcInst.handleInput("EQ");
    expect(CalcInst.display).toBe(1);
  });

  test("Equals With No Second Value", async () => {
    await CalcInst.handleInput("ONE");
    await CalcInst.handleInput("ADD");
    await CalcInst.handleInput("EQ");
    expect(CalcInst.display).toBe(1);
  });
});

describe("Advanced Use Cases", () => {
  test("Double Digit Numbers", async () => {
    await CalcInst.handleInput("ONE");
    await CalcInst.handleInput("TWO");
    await CalcInst.handleInput("ADD");
    await CalcInst.handleInput("THREE");
    await CalcInst.handleInput("ONE");
    await CalcInst.handleInput("EQ");
    expect(CalcInst.display).toBe(43);
  });

  test("Decimal Returns", async () => {
    await CalcInst.handleInput("FIVE");
    await CalcInst.handleInput("DIV");
    await CalcInst.handleInput("TWO");
    await CalcInst.handleInput("EQ");
    expect(CalcInst.display).toBe(2.5);
  });

  test("Complex Decimal Returns", async () => {
    await CalcInst.handleInput("FIVE");
    await CalcInst.handleInput("ONE");
    await CalcInst.handleInput("DIV");
    await CalcInst.handleInput("SEVEN");
    await CalcInst.handleInput("EQ");
    expect(Number(CalcInst.display.toFixed(6))).toBe(7.285714);
  });

  test("Switched Operand Entries", async () => {
    await CalcInst.handleInput("FIVE");
    await CalcInst.handleInput("SUB");
    await CalcInst.handleInput("ADD");
    await CalcInst.handleInput("TWO");
    await CalcInst.handleInput("EQ");
    expect(CalcInst.display).toBe(7);
  });

  test("Sequential Operand Entries", async () => {
    await CalcInst.handleInput("FIVE");
    await CalcInst.handleInput("ADD");
    await CalcInst.handleInput("TWO");
    await CalcInst.handleInput("ADD");
    await CalcInst.handleInput("THREE");
    await CalcInst.handleInput("ADD");
    await CalcInst.handleInput("TWO");
    await CalcInst.handleInput("EQ");
    expect(CalcInst.display).toBe(12);
  });

  test("Separate Equations", async () => {
    await CalcInst.handleInput("FOUR");
    await CalcInst.handleInput("ADD");
    await CalcInst.handleInput("TWO");
    await CalcInst.handleInput("EQ");
    await CalcInst.handleInput("THREE");
    await CalcInst.handleInput("ADD");
    await CalcInst.handleInput("TWO");
    await CalcInst.handleInput("EQ");
    expect(CalcInst.display).toBe(5);
  });

  test("Sequential Equals, Increments", async () => {
    await CalcInst.handleInput("FOUR");
    await CalcInst.handleInput("ADD");
    await CalcInst.handleInput("TWO");
    await CalcInst.handleInput("EQ");
    await CalcInst.handleInput("EQ");
    expect(CalcInst.display).toBe(8);
  });
});
