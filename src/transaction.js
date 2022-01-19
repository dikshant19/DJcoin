class Transaction {
  constructor(fromAddress, toAddress, timestamp, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.timestamp = timestamp;
    this.amount = amount;
  }
}

module.exports.Transaction = Transaction;