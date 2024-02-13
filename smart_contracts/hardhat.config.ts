import { readFileSync } from "fs";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const apiKey = readFileSync(".api").toString().trim();
const account_private_key = readFileSync(".account_private_key")
  .toString()
  .trim();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://sepolia.infura.io/v3/" + apiKey,
      accounts: [account_private_key],
    },
  },
};

export default config;
