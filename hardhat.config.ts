import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  paths: {
    artifacts: "client/src/entities/contracts/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
      initialBaseFeePerGas: 0,
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/" + process.env.API_KEY,
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
};

export default config;
