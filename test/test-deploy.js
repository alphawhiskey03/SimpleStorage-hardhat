const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", () => {
  let SimpleStorageFactory, simpleStorage;
  beforeEach(async () => {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorageFactory.deploy();
  });

  it("Should start with a favorite number of 0", async () => {
    const currentValue = await simpleStorage.retreive();
    const expectedValue = "0";
    assert.equal(currentValue.toString(), expectedValue);
    // expect(currentValue).toString().to.equal(expectedValue);
  });

  it("Should update when we call store", async () => {
    const expectedValue = "10";
    const transactionResponse = await simpleStorage.store("10");
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retreive();
    assert.equal(updatedValue.toString(), expectedValue);
  });
  it("Should add to people", async () => {
    const transactionResponse = await simpleStorage.addToPeople(2, "ram");
    await transactionResponse.wait(1);
    const arr = await simpleStorage.people(0);
    assert.equal(arr.favNumber.toString(), "2");
    assert.equal(arr.name.toString(), "ram");
  });
});
