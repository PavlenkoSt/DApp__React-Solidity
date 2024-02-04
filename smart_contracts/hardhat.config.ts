import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    goerli: {
      url: "https://goerli.infura.io/v3/5861c02e289e496d8b0c5c317bcac25c",
      accounts: [
        "df0ff7b396453ecf5e9e8b55fcebaf32d3ba52892ca733a48c4f5d46fa4773d0",
      ],
    },
  },
};

export default config;
