// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/AccessControl.sol
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";


contract CoffeeToken is ERC20, AccessControl {
  bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");
  bytes32 public constant MARKETPLACE_ROLE = keccak256("MARKETPLACE_ROLE");

  constructor() ERC20("CoffeeToken", "CFE") {
    _grantRole(OWNER_ROLE, msg.sender);
  }

  function registerMarketplace(address _marketplace) public onlyRole(OWNER_ROLE) {
    _grantRole(MARKETPLACE_ROLE, _marketplace);
  }

  function unregisterMarketplace(address _marketplace) public onlyRole(OWNER_ROLE) {
    _revokeRole(MARKETPLACE_ROLE, _marketplace);
  }

  function mint(address _to, uint256 _amount) public onlyRole(MARKETPLACE_ROLE) {
    _mint(_to, _amount);
  }
}