const calculator = require('./calc');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

function main() {
    // ERROR CONDITION val_1 == '', val_2 != ''
    console.log('-------------');
    console.log('\n');
    console.log('-------------');
    console.log('|     ' + calculator.getDisplay() + '     |');
    console.log('-------------');
    readline.question('Enter command: ', async (receivedInput) => {
        if (receivedInput == 'EXT') process.exit(1);
        if (receivedInput == 'HELP' || receivedInput == 'Help' || receivedInput == 'help') {
            console.log('\n');
            console.log('-------------');
            console.log('Key Codes (Buttons)');
            console.log('-------------');
            console.log('ADD, SUB, MUL, DIV');
            console.log('ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, ZERO');
            console.log('EQ, ALL_CLR, EXT');
        } else {
            await calculator.handleInput(receivedInput);
        }
        main();
    });
}

main();
