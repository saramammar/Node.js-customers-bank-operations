const yargs = require('yargs');
const myfunctions = require('./functions');

yargs.command({
    command: 'add',
    describe: 'Add new customer',
    builders: {
        id: { type: 'number'},
        name: {
            demandOtion: true,
            describe: 'Customer Name',
            type: 'string'
        },
        accNum: {
            demandOtion: true,
            describe: 'Account Number',
            type: 'number'
        },
        balance: {
            demandOtion: true,
            describe: 'Balance Amount',
            type: 'number'
        },
        status: { type: 'boolean' }
    },
    handler: (argv) => myfunctions.add(argv)
});

yargs.command({
    command: 'del',
    describe: 'Delete customer',
    builders: {
        id: { 
            demandOption: true,
            type: 'number'
        }
    },
    handler: (argv) => myfunctions.delete(argv)
});

yargs.command({
    command: 'showAll',
    describe: 'Show all customers',
    handler: () => myfunctions.showAll()
});

yargs.command({
    command: 'changeStatus',
    describe: "Change customer's status customer",
    builders: {
        id: { 
            demandOption: true,
            type: 'number'
        },
        status: { 
            demandOption: true,
            type: 'boolean'
        }
    },
    handler: (argv) => myfunctions.changeStatus(argv)
});

yargs.command({
    command: 'search',
    describe: 'Search customer',
    builders: {
        id: { type: 'number' },
        name: {type: 'string'},
        accNum: {type: 'number'},
        balance: {type: 'number'}
    },
    handler: (argv) => myfunctions.search(argv)
});

yargs.command({
    command: 'edit',
    describe: 'Edit customer',
    builders: {
        id: { 
            demandOption: true,
            type: 'number'
        },
        name: {type: 'string'},
        balance: {
            demandOption: true, 
            type: 'number'
        }
    },
    handler: (argv) => myfunctions.edit(argv)
});

yargs.command({
    command: 'withdraw',
    describe: 'Withdraw your balance amount',
    builders: {
        id: { 
            demandOption: true,
            type: 'number'
        },
        balance: {
            demandOption: true, 
            type: 'number'
        }
    },
    handler: (argv) => myfunctions.withdraw(argv)
});

yargs.command({
    command: 'deposit',
    describe: 'Deposit your balance amount',
    builders: {
        id: { 
            demandOption: true,
            type: 'number'
        },
        balance: {
            demandOption: true, 
            type: 'number'
        }
    },
    handler: (argv) => myfunctions.deposit(argv)
});

yargs.argv
