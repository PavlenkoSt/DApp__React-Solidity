// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {CoffeeToken} from "./CoffeeToken.sol";

contract TokenMarketplace {
  uint public constant priceInWei = 1000;
  CoffeeToken coffeeToken;

  constructor(CoffeeToken _coffeeToken) {
    coffeeToken = _coffeeToken;
  }

  event TokenPurchase(address indexed buyer, uint256 amount);

  function purchaseTokens(uint256 _amount) public payable {
    require(msg.value / priceInWei == _amount, "Incorrect requested amount, check price again");

    coffeeToken.mint(msg.sender, _amount);
    
    emit TokenPurchase(msg.sender, _amount);
  }

  function getBalance() public view returns(uint) {
    return coffeeToken.balanceOf(msg.sender);
  }
}
