const keccak256 = require("keccak256"); // hashing function used in ethereum
// console.log(keccak256('hello').toString('hex')) //=> "1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8"

class Transaction {
	constructor(to, from, amount) {
		this.to = to;
		this.from = from;
		this.amount = amount;
		this.id = Transaction.getCount();
		this.hash = keccak256(this.to + this.from + this.amount + this.id).toString('hex');
		Transaction.incrementCount();
	}

	static getCount() {
		return Transaction.count;
	}

	static incrementCount() {
		Transaction.count++;
	}

	getHash() {
		return keccak256(this.to + this.from + this.amount + this.id);
	}

	toString() {
		return `
        to:${this.to}
        from:${this.from}
        amount:${this.amount}
        hash:${this.hash}
        id:${this.id}`;
	}
}

Transaction.count = 0;

class TransactionList {
	constructor() {
		this.list = []; // array of transaction objects
	}

	add(transaction) {
		this.list.push(transaction);
	}
}

class MerkleTree {
  constructor(data, hashFn) {
    this.root = [];
    this.root.unshift(data) // adds data to beginning of root array
    this.root.unshift(data.map(item => hashFn(item).toString('hex'))); // creates first layer/leaves of tree (hashed values of data layer)

    while (this.root[0].length > 1) {
      let temp = [];
  
      for (let index = 0; index < this.root[0].length; index += 2) {
        if (index < this.root[0].length - 1 && index % 2 == 0)
          temp.push(hashFn(this.root[0][index] + this.root[0][index + 1]).toString('hex'));
        else temp.push(this.root[0][index]);
      }
      this.root.unshift(temp);
    }
  }
}



const data = ['a', 'b', 'c', 'd', 'e']

let transactionList = new TransactionList();
for (let i = 0; i < data.length; i++) {
	transactionList.add(new Transaction(Math.random(), Math.random(), Math.random()));
}
// console.log(transactionList); //=> array of transaction objects

const tree = new MerkleTree(data, keccak256) // takes in array of data, and hashing function you want to hash data with
console.log(tree.root)