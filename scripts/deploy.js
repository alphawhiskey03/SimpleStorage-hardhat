const { ethers, run, network } = require("hardhat");
require("dotenv").config();
const main = async () => {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract....");

  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Contract deployed to : ${simpleStorage.address}`);
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    // etherscan might not know about the contract quickly so waiting for 6 blocks confirmation
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }
  const currentValue = await simpleStorage.retreive();
  console.log(`current value ${currentValue}`);
  const transactionResponse = await simpleStorage.store(22);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retreive();
  console.log(`updated value ${updatedValue}`);
};

// Auto verification of contracts
// this might only work on few block explorers like etherscan
const verify = async (contractAddress, args) => {
  console.log("Verifying contract....");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (err) {
    console.log(err);
  }
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
  });
