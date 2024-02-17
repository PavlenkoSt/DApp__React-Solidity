import { ethers } from "hardhat";
import fs from "fs/promises";

async function saveDeployedAddress(json: string) {
  const path = "client/src/entities/contracts/contractAddresses.json";
  await fs.writeFile(path, json, { encoding: "utf-8" });
}

async function main() {
  const Transcations = await ethers.getContractFactory("Transactions");
  const CoffeeToken = await ethers.getContractFactory("CoffeeToken");
  const TokenMarketplace = await ethers.getContractFactory("TokenMarketplace");

  const transcations = await Transcations.deploy();
  const coffeeToken = await CoffeeToken.deploy();

  await transcations.waitForDeployment();
  await coffeeToken.waitForDeployment();

  const tokenMarketplace = await TokenMarketplace.deploy(coffeeToken);

  await tokenMarketplace.waitForDeployment();

  const transactionsAddress = await transcations.getAddress();
  const coffeeTokenAddress = await coffeeToken.getAddress();
  const tokenMarketplaceAddress = await tokenMarketplace.getAddress();

  const objToSave = {
    transactions: transactionsAddress,
    coffeeToken: coffeeTokenAddress,
    tokenMarketplace: tokenMarketplaceAddress,
  };

  await saveDeployedAddress(JSON.stringify(objToSave));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
