import { ethers } from "hardhat";

async function main() {
  const Transcations = await ethers.getContractFactory("Transactions");
  const transcations = await Transcations.deploy();
  await transcations.waitForDeployment();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
