import { ethers } from "hardhat";
import fs from "fs/promises";

async function saveDeployedAddress(json: string) {
  const path = "client/src/entities/contracts/contractAddresses.json";
  await fs.writeFile(path, json, { encoding: "utf-8" });
}

async function main() {
  const Transcations = await ethers.getContractFactory("Transactions");
  const transcations = await Transcations.deploy();
  await transcations.waitForDeployment();

  const transactionsAddress = await transcations.getAddress();

  const objToSave = {
    transactions: transactionsAddress,
  };

  await saveDeployedAddress(JSON.stringify(objToSave));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
