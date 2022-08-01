const { task } = require("hardhat/config");

task("block-number", "prints the current block number").setAction(
  async (taskArgs, hre) => {
    // hre is the hardhat runtine environment
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`Current blocknumbers : ${blockNumber}`);
  }
);
