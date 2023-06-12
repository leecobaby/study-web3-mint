const hre = require('hardhat')

async function main() {
  const Contract = await hre.ethers.getContractFactory('RoboPunksNFT')
  const roboPunksNFT = await Contract.deploy()

  await roboPunksNFT.deployed()
  console.log('RoboPunksNFT deployed to:\n', roboPunksNFT.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
