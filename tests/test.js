const calc = require('../calc');

// Tests are based on Jest library

test('Basic', () => {
    expect(calc.getDisplay()).toBe(0);
})


// Test (Double Digit Numbers) - 
//		Value, Value, Operand, Value, Value, Equals

// Test (Repeating Operand) - 
//		Value, Operand, Value, Operand, Value, Equals

// Test (Operand Overwrite) - 
//		Value, Operand, Operand, Value, Equals

// Test (Starting Operand ignored) - 
//		Operand, Value, Operand, Value, Equals

// Test (Starting Operand check) - 
//		Operand
test('Starting Operand check', () => {
    expect(calc.handleInput('ADD')).toBe({});
})

// Test (Sequential Equals) - 
//		Value, Operand, Value, Equals, Equals

// Test (Sequential, but different, equations) - 
//		Value, Operand, Value, Equals, Value, Operand, Value, Equals


