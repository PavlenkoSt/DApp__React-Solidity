import { ethers } from "ethers";
import { ethProvider } from "@/shared/utils/ethProvider";
import TransactionsContract from "./artifacts/contracts/Transactions.sol/Transactions.json";
import TokenMarketplaceContract from "./artifacts/contracts/TokenMarketplace.sol/TokenMarketplace.json";
import contractAddressesJson from "./contractAddresses.json";

const getTransactionContract = async () => {
  if (!ethProvider) throw new Error("ethProvider empty");

  const address = contractAddressesJson.transactions;
  const signer = await ethProvider.getSigner();

  return new ethers.Contract(address, TransactionsContract.abi, signer);
};

const getTokenMarketplaceContract = async () => {
  if (!ethProvider) throw new Error("ethProvider empty");

  const address = contractAddressesJson.tokenMarketplace;
  const signer = await ethProvider.getSigner();

  return new ethers.Contract(address, TokenMarketplaceContract.abi, signer);
};

export { getTransactionContract, getTokenMarketplaceContract };
