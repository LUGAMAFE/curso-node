const argv = require('yargs/yargs')(process.argv.slice(2))
    .option('b', {
        alias: 'base',
        demandOption: true,
        default: 1,
        describe: 'base to multiply',
        type: 'number'
    })
    .option('l', {
        alias: 'list',
        demandOption: false,
        default: false,
        describe: 'show console logs',
        type: 'boolean'
    })
    .option('t', {
        alias: 'to',
        demandOption: true,
        default: 10,
        describe: 'to where stop the table',
        type: 'number'
    })
    .check((argv, options) => {
        if (isNaN(argv.base)) {
          throw new Error("Base should be a number");
        } else if (argv.to <= 0) {
            throw new Error("To should be greater than 0");
        } else {
          return true // tell Yargs that the arguments passed the check
        }
      })
    .argv;

module.exports = argv;