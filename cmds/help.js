const Interface = require("../interface/interface");
const InterfaceInst = new Interface({});

const menus = {
  main: `
  coded-calc <options>
    <default - no option> ..... will launch calculator app
    --version ................... show package version
    --help ...................... show help menu
    --help commands ............. shows command key interface

    This application models single command input similar to a
    handheld calculator.  Each command (numeric, operand, modifier)
    follows these same patterns and general functionality.  
    
    All commands are coded values (i.e. Addition = 'ADD').
    Use '--help commands' here or the 'HELP' command once the 
    application is launched to view a layout of coded values.

    `,
  commands: InterfaceInst.showHelp
};

const help = args => {
  if (args.h == "commands" || args.help == "commands") {
    menus.commands();
  } else {
    console.log(menus.main);
  }
};

module.exports = help;
