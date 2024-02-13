import { ethers } from "ethers";
import TransactionsContract from "#/artifacts/contracts/Transactions.sol/Transactions.json";

const transactionContract = new ethers.Contract(
  "0x971bfe5f1B8Cab4836CB6A6EFBcbBBA63B85167A",
  TransactionsContract.abi,
);

export { transactionContract };
