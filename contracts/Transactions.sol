// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Transactions {
  struct TransactionStruct {
    address sender;
    address receiver;
    uint amount;
    string message;
    string keyword;
    uint256 timestamp;
  }

  TransactionStruct[] transactions;

  event Transfer(address from, address to, uint amount, string message, string keyword, uint256 timestamp);

  function setTransaction (address payable to, string memory message, string memory keyword) public payable {
    transactions.push(TransactionStruct(msg.sender, to, msg.value, message, keyword, block.timestamp));
    to.transfer(msg.value);

    emit Transfer(msg.sender, to, msg.value, message, keyword, block.timestamp);
  }

  function getAllTransactions () public view returns (TransactionStruct[] memory) {
    return transactions;
  }
}
