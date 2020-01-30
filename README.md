# Calculator

## \#TODO

- [x] Accept input as singles (number or operand)
- [x] Will have an item in memory as rolling value
- [x] Will need memory for operand
- [ ] Need cache for cached value
  - [ ] 5 cached values, which can be iterated through
  - [ ] Add button, iterate, and clear
  - [ ] What does All Clear do to cache?
- [x] Some operaters don't require a second value
- [x] A number must be the first input
- [x] Sequential operands will replace each other
- [ ] Implement Decimals
- [ ] Prevent multiple decimals
- [ ] Some number modifiers (+/-)
- [ ] Display limit (rounding)
- [ ] Decimal limit (rounding)
- [ ] Value limit (switch to exponent?)
- [ ] Handle errors like divide by zero
- [ ] Square root needs an imaginary number handler
- [x] Always show zero if nothing in memory, initialization
- [x] Hitting enter again will repeat the operation
- [x] Clear and all clear

## Folder Structure

- **Coded-Calculator**

  - **Interface**
  - **Data**
    - db.json
  - **Utils**
    - Error Handling
    - Logging
  - **Tests**
    - test.js
  - index.js
  - calc.js

### Commands

Numeric Buttons

- **ONE**, **TWO**, **THREE**, **FOUR**, **FIVE**, **SIX**, **SEVEN**, **EIGHT**, **NINE**, **ZERO**

Clear Buttons

- **CLR** - will only clear the second value (addend, subtrahend, multipier, divisor) if present, otherwise will clear all memory. Memory cache is not cleared
- **ALL_CLR** - will clear all memory including the memory cache

Operand Buttons

- **ADD**, **SUB**, **MUL**, **DIV**

**Read the test cases for more information on application functionality**
