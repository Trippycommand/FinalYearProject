import { BigNumber, ethers } from 'ethers'

import CryptoScoutDexABI from '@/contract/CryptoScoutDex.json'
import CustomTokenABI from '@/contract/CustomToken.json'

export async function CreateContract() {
  if (!('ethereum' in window)) throw 'Could Not Find Ethereum in Window'

  // @ts-expect-error
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contractReader = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ID || '',
    CryptoScoutDexABI.abi,
    signer,
  )

  // ? GET BALANCE OF ETH
  // const balance = await contractReader.getEtherBalance()
  // const bal = ethers.utils.formatUnits(balance.toString(), 18)
  // console.log({ address, bal })

  // ? GET BALANCE OF SEPOLIA ETH on TEST NETWORK
  // const address = await signer.getAddress()
  // const balance = await contractReader.provider.getBalance(address)
  // const bal = ethers.utils.formatUnits(balance.toString(), 18)
  // console.log({ address, bal })

  // const tokenContract = await CreateTokenContract(address)
  // const tokenBal =
  // ? GET BALANCE OF ERC20 TOKEN DEPLOYED

  return contractReader
}

export async function CreateTokenContract(address) {
  if (!('ethereum' in window)) throw 'Could Not Find Ethereum in Window'

  // @ts-expect-error
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contractReader = new ethers.Contract(
    address,
    CustomTokenABI.abi,
    signer,
  )
  return contractReader
}
