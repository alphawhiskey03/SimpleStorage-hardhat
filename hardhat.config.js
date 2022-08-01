require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");
require("hardhat-gas-reporter");
require("solidity-coverage");

// custom task for printing out available test accounts
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
/** @type import('hardhat/config').HardhatUserConfig */
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "https://eth-rinkeby";
const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY || "0xkey";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "etherkey";
const COINMARKET_API_KEY = process.env.COINMARKET_API_KEY || "coinmarketkey";
module.exports = {
  // default network
  networks: {
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [RINKEBY_PRIVATE_KEY],
      chainId: 4,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKET_API_KEY,
  },
  solidity: "0.8.7",
};
