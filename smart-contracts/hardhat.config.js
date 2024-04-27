/** @type import('hardhat/config').HardhatUserConfig */

require('@nomicfoundation/hardhat-toolbox')

const SEPOLIA_RPC_URL =
  'https://sepolia.infura.io/v3/443972dc6bec43d6942b131a89244806'
// 'https://eth-sepolia.g.alchemy.com/v2/7DJ4nBslp-trlbKbdSqF-1rJppAcSk6e'
const ARYAN_PRIVATE_KEY =
  'dd4da520435a7f5a9d9865c4616a7fda1f84c2ebb193c0c530c5b4aef15c9075'

module.exports = {
  solidity: '0.8.0',
  defaultNetwork: 'sepolia',
  etherscan: {
    apiKey: '226DIXVPZQ9QEXDQA59BQDK2E5NS39YE6F',
  },
  networks: {
    hardhat: {},
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [`0x${ARYAN_PRIVATE_KEY}`],
    },
  },
}
