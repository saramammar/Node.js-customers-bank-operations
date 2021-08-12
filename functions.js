const fs = require('fs');

class Customer {
    allCustomers = null;

    readFromJsonFile() {
        try {
            this.allCustomers = JSON.parse(fs.readFileSync('./all-customers.json').toString());
            if (!Array.isArray(this.allCustomers)) throw new Error('Data is not array')
        }
        catch(err) {
            this.allCustomers = []
        }
    }

    writeOnJsonFile() {
        fs.writeFileSync('./all-customers.json', JSON.stringify(this.allCustomers));
    }

    add(customerData) {
        let customer = {
            id: new Date().getTime(),
            name: customerData.name,
            accNum: customerData.accNum,
            balance: customerData.balance,
            status: true
        }
        this.readFromJsonFile();
        this.allCustomers.push(customer);
        this.writeOnJsonFile();
        console.log('Customer added successfuly');
    }

    delete(argv) {
        this.readFromJsonFile();
        // this.allCustomers = this.allCustomers.filter(c => c.id !== customerId);
        const indx = this.allCustomers.findIndex(c => c.id === argv.id);
        if (indx === -1) return console.log('Customer is not found');
        this.allCustomers.splice(indx, 1);
        this.writeOnJsonFile();
        console.log('Customer deleted successfuly');
    }

    showAll() {
        this.readFromJsonFile();
        if (this.allCustomers.length === 0) return console.log('No Data to show');
        this.allCustomers.map(c => console.log(`name: ${c.name} - balance: ${c.balance} - status: ${c.status}`))
    }

    changeStatus(argv) {
        this.readFromJsonFile();
        const indx = this.allCustomers.findIndex(c => c.id === argv.id);
        if (indx === -1) return console.log('Customer is not found');
        if (!this.allCustomers[indx].status && argv.status == 'false') return console.log(`Customer already deactivated`);
        if (this.allCustomers[indx].status && argv.status == 'true') return console.log(`Customer already activated`);
        this.allCustomers[indx].status = !this.allCustomers[indx].status;
        this.writeOnJsonFile();
        console.log("Customer's status changed successfuly");
    }

    search(argv) {
        let searchKey = null;
        for (let x in argv) if (x !== '_' && x !== '$0') searchKey = x;
        this.readFromJsonFile();
        const indx = this.allCustomers.findIndex(c => c[searchKey] === argv[searchKey]);
        if (indx === -1) return console.log('Customer is not found');
        console.log(
          `name: ${this.allCustomers[indx].name} - balance: ${this.allCustomers[indx].balance} - status: ${this.allCustomers[indx].status}`
        );
    }

    edit(argv) {
        this.readFromJsonFile();
        const indx = this.allCustomers.findIndex(c => c.id === argv.id);
        if (indx === -1) return console.log('Customer is not found');
        this.allCustomers[indx].name = argv.name || this.allCustomers[indx].name;
        this.allCustomers[indx].balance = argv.balance;
        this.writeOnJsonFile()
    }
}

const customer = new Customer();
module.exports = customer;