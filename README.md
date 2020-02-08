# Coded-Calculator

## Getting Started

This application is a single input calculator, similar to a simple handheld model, implemented as a CLI tool. The _buttons_ of the calculator have been mocked with coded values (see below).

```
-------------------------           -------------------------------
|                       |           |                             |
|       -BUTTONS-       |           |         -KEY CODES-         |
|                       |           |                             |
-------------------------           -------------------------------
|   AC/C    | +/- |  +  |           | ALL_CLR/CLR   | SIGN  | ADD |
-------------------------           -------------------------------
|  1  |  2  |  3  |  -  |           | ONE   | TWO   | THREE | SUB |
-------------------------   ---->   -------------------------------
|  4  |  5  |  6  |  x  |           | FOUR  | FIVE  | SIX   | MUL |
-------------------------           -------------------------------
|  7  |  8  |  9  |  /  |           | SEVEN | EIGHT | NINE  | DIV |
-------------------------           -------------------------------
|     0     |  .  |  =  |           | ZERO          | DEC   | EQ  |
-------------------------           -------------------------------

EXT - Exit the application
```

Terminal view:

```
---------------
|           0 |
---------------
Enter Command: FIVE
---------------

---------------
|           5 |
---------------
Enter Command: TWO
---------------

---------------
|           52 |
---------------
Enter Command: ADD
---------------

---------------
|           52 |
---------------
Enter Command: SIX
---------------

---------------
|           6 |
---------------
Enter Command: EQ
---------------

---------------
|           58 |
---------------
Enter Command:
---------------
```

## \#TODO

- [ ] Finish writing tests
- [ ] Publish to NPM Repo
- [ ] Utility scripts for display last session to CLI, clearing logs, etc
- [ ] add .dockerfile

## Folder Structure

- **calculator**
  - **data**
  - **tests**
  - **utils**
  - calculator.js
- **cmds**
- **interface**
  - **data**
  - **tests**
  - **utils**
  - interface.js
- index.js

## Commands

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
