// import calc_data as calc_data
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

module.exports = {
    val1: '',
    val2: '',
    eqMem: '',
    operand: '',
    operation: '',
    memCache: [],
    getDisplay: function () {
        return Number(this.val2 != '' ? this.val2 : (this.val1 != '' ? this.val1 : 0));
    },
    handleInput: async function (receivedInput) {
        input = cleanseInput(receivedInput);
        var commandObj = await getLookup(input)

        if (commandObj['code'] != 'EQ') eqMem = '';

        switch (commandObj['type']) {
            case 'numeric':
                if (!this.operand) {
                    this.val1 = this.val1 + commandObj['value'];
                } else {
                    this.val2 = this.val2 + commandObj['value'];
                }
                break;

            case 'op_continue':
                if (!this.val1) return 'ERROR';
                if (this.val2 != '') {
                    this.val1 = this.operation(this.val1, this.val2).toString();
                    this.val2 = '';
                }
                this.operand = commandObj['code'];
                this.operation = new Function('val1', 'val2', 'return ' + commandObj['execution']);
                break;

            case 'op_exec':
                this.val1 = (commandObj['code'] = 'EQ' ? this.operation(this.val1, this.val2).toString() : '');
                this.eqMem = this.val2;
                this.val2 = '';
                break;

            case 'clear':
                if (commandObj['code'] = 'ALL_CLR') {
                    this.val2 = '';
                    this.val1 = '';
                    this.eqMem = '';
                    this.operand = '';
                    this.operation = '';
                }
                break;

            default:
                return 'ERROR';
        }
    }
}


// -- UTILS --


async function getLookup(val) {
    const writeDirectory = __dirname;
    const writeFileURL = path.resolve(writeDirectory, './db.json');
    const adapter = new FileSync(writeFileURL);
    const db = low(adapter);

    try {
        commandObj = await db.get('commands').find({ code: val }).value();
        if (!commandObj) throw 'Command not recognized';
    } catch (err) {
        console.error('Error: ' + err);
        commandObj = ''
    }

    return commandObj;
}

function cleanseInput(input) {
    return input;
    // Check that is code value
    // Check if operand that val2 and val1 aren't empty
}


