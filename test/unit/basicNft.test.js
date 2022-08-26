const { assert, expect } = require("chai")
const { deployments, ethers, network } = require("hardhat")
const {
    developmentChains,
    networkConfig,
} = require("../../helper-hardhat-config")
!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Basic Bft unit Tests", function () {
          let deployer, basicNft
          beforeEach(async function () {
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              await deployments.fixture(["basicnft"])
              basicNft = await ethers.getContract("BasicNFT", deployer)
          })
          describe("constructor", async function () {
              it("Initializes the NFT Correctly.", async () => {
                  let name = await basicNft.name()
                  let symbol = await basicNft.symbol()
                  let count = await basicNft.getTokenCounter()
                  assert.equal("0", count.toString())
                  assert.equal("Dogie", name.toString())
                  assert.equal("DOG", symbol.toString())
              })
          })
          describe("Mint NFT", () => {
              it("correct mint", async function () {
                  const txResponse = await basicNft.mintNFT()
                  await txResponse.wait(1)
                  const tokenURI = await basicNft.tokenURI(0)
                  const tokenCounter = await basicNft.getTokenCounter()

                  assert.equal(tokenCounter.toString(), "1")
                  assert.equal(tokenURI, await basicNft.TOKEN_URI())
              })
          })
      })
