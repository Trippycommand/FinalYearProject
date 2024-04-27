const hre = require('hardhat')

async function main() {
  const CryptoScoutDex = await hre.ethers.getContractFactory('CryptoScoutDex')
  const cryptoScoutDex = await CryptoScoutDex.deploy()
  await cryptoScoutDex.deployed()
  console.log(`CustomDex: ${cryptoScoutDex.address}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
