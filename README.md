# Calculator

## \#TODO

- [x] Accept input as singles (number or operand)
- [x] Will have an item in memory as rolling value
- [x] Will need memory for operand
- [x] Some operaters don't require a second value
- [x] A number must be the first input
- [x] Sequential operands will replace each other
- [x] Implement Decimals
- [x] Prevent multiple decimals
- [x] Some number modifiers (+/-)
- [ ] Display limit (rounding)
- [ ] Decimal limit (rounding)
- [ ] Value limit (switch to exponent?)
- [x] Handle errors like divide by zero
- [x] Always show zero if nothing in memory, initialization
- [x] Hitting enter again will repeat the operation
- [x] Clear and all clear

- [x] Add Chalk to output display
- [ ] Finish writing tests for interface
- [ ] Write errors to log
- [ ] Use TravisCI
- [ ] Publish to NPM Repo
- [ ]

## Folder Structure

- **Coded-Calculator**

  - **interface**
    - interface.js
    - **Utils**
      - errorLogging.js
    - **Tests**
      - test.js
  - **calculator**
    - calculator.js
    - **data**
      - dataStore.js
    - **Tests**
      - test.js
  - index.js

### Commands

Numeric Buttons

- **ONE**, **TWO**, **THREE**, **FOUR**, **FIVE**, **SIX**, **SEVEN**, **EIGHT**, **NINE**, **ZERO**

Clear Buttons

- **CLR** - will only clear the second value (addend, subtrahend, multipier, divisor) if present, otherwise will clear all memory. Memory cache is not cleared
- **ALL_CLR** - will clear all memory including the memory cache

Operand Buttons

- **ADD**, **SUB**, **MUL**, **DIV**

Other Buttons

- **DEC** - adds a decimal to the current value
- **SIGN** - flips the sign of the current value

**Read the test cases for more information on application functionality**
