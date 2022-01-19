const SHA512 = require('crypto-js/sha512');
const { Transaction } = require('./transaction');

class Block {
  constructor(timestamp, transaction = [], previousHash = '') {
    this.timestamp = timestamp;
    this.transaction = transaction;
    this.previousHash = previousHash;
    this.hash = this.generateHash();
    this.nonce = 0;
  }
  generateHash = () => {
    return SHA512(this.timestamp + JSON.stringify(this.transaction) + this.timestamp + this.nonce).toString();
  }
  mineBlock = (difficulty) => {
    while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join('9')) {
      this.nonce++;
      this.hash = this.generateHash();
    }
    console.log("BlockMined- ", this.hash);
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.generateInitBlock()]
    this.pendingTransaction = [];
    this.difficulty = 3;
    this.miningRewards = 19;
  }
  generateInitBlock() { 
    return new Block(Date.now());
  }
  addBlock(miningRewardsAddress) {
    let previousBlockHash = this.chain[this.chain.length -1].hash;
    let newBlock = new Block(Date.now(), this.pendingTransaction, previousBlockHash);
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
    // If block mined, the we will send mining reward to minedAddress i.e added a credit entry in chain
    this.pendingTransaction = [ 
      new Transaction(null, miningRewardsAddress, Date.now(), this.miningRewards)
    ];
    
  }
  createTransaction = (transaction) => {
    this.pendingTransaction.push(transaction);
  }
  getBalanceOfAddress = (address) => {
    let balance = 0;
    for(let i=0; i<this.chain.length; i++) {
      const block = this.chain[i].transaction;
      for(let j=0 ; j<block.length ;j++) {
        let transactionObj = block[j];
        if(transactionObj.toAddress === address) {
          balance += parseInt(transactionObj.amount)
        }
        if(transactionObj.fromAddress === address) {
          balance -= parseInt(transactionObj.amount)
        }
      } 
    }
    return balance;
  }
  getLatestBlock = () => {
    return this.chain[this.chain.length -1];
  }
  isChainValid = () => {
    for(let i=1; i<this.chain.length ;i++) {
      let currBlock = this.chain[i];
      let previousBlock = this.chain[i-1];
      if(currBlock.hash !== currBlock.generateHash() || currBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

module.exports.BlockChain = BlockChain;