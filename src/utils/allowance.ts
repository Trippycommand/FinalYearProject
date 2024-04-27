import { BigNumber } from 'ethers'

import { CreateContract, CreateTokenContract } from './contract'
import { parseErrorMsg, toWei } from './utils'

export async function increaseAllowance(tokenName, amount) {
  try {
    const contract = await CreateContract()
    const address = await contract.getTokenAddress(tokenName)

    const tokenContract = await CreateTokenContract(address)
    const data = await tokenContract.approve(
      process.env.NEXT_PUBLIC_CONTRACT_ID,
      toWei(amount),
    )

    const receipt = await data.wait()
    return receipt
  } catch (e) {
    return parseErrorMsg(e)
  }
}

export async function hasValidAllowance(owner, tokenName, amount) {
  try {
    const contract = await CreateContract()
    const address = await contract.getTokenAddress(tokenName)

    const tokenContract = await CreateTokenContract(address)
    const data = await tokenContract.allowance(
      owner,
      process.env.NEXT_PUBLIC_CONTRACT_ID,
    )

    const result = BigNumber.from(data.toString()).gte(
      BigNumber.from(toWei(amount)),
    )
    return result
  } catch (e) {
    return parseErrorMsg(e)
  }
}
