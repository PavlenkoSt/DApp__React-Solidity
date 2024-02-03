// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.0;

contract Transaction {
  struct TransactionStruct {
    address sender;
    address receiver;
    uint amount;
    string message;
    string keyword;
    uint256 timestamp;
  }

  TransactionStruct[] transactions;
  uint256 transactionCount;

  event Transfer(address from, address to, uint amount, string message, string keyword, uint256 timestamp);

  function setTransaction (address payable to, uint amount, string memory message, string memory keyword) public {
    transactionCount += 1;
    transactions.push(TransactionStruct(msg.sender, to, amount, message, keyword, block.timestamp));

    emit Transfer(msg.sender, to, amount, message, keyword, block.timestamp);
  }

  function getAllTransactions () public view returns (TransactionStruct[] memory) {
    return transactions;
  }

  function getTransactionCount () public view returns (uint256) {
    return transactionCount;
  }
}
