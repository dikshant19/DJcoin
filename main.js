const { BlockChain } = require('./src/blockchain');
const { Transaction } = require('./src/transaction');

let Dchain = new BlockChain();

Dchain.createTransaction(new Transaction("1234", "5678", Date.now(), 100))
Dchain.createTransaction(new Transaction("2224", "4678", Date.now(), 10))
Dchain.addBlock("1234");

Dchain.createTransaction(new Transaction("3424", "43278", Date.now(), 12))
Dchain.addBlock("1234");

console.log("Full chain-->", Dchain);

console.log('getBalanceOfAddress--->', Dchain.getBalanceOfAddress("1234"))
console.log("IsChainValid", Dchain.isChainValid());