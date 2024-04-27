import { CreateContract } from './contract'
import { parseErrorMsg, toWei } from './utils'

export async function swapEthToToken(
  destToken: string,
  srcAmount: number,
  destAmount: number,
) {
  try {
    const contract = await CreateContract()
    const data = await contract.swapEthToToken(destToken, toWei(destAmount), {
      value: toWei(srcAmount),
    })
    const receipt = await data.wait()
    return receipt
  } catch (e) {
    return parseErrorMsg(e)
  }
}

export async function swapTokenToEth(
  srcToken: string,
  srcAmount: number,
  destAmount: number,
) {
  try {
    console.log({
      srcAmount: toWei(srcAmount),
      destAmount: toWei(destAmount),
    })
    const contract = await CreateContract()
    const data = await contract.swapTokenToEth(
      srcToken,
      toWei(srcAmount),
      toWei(destAmount),
    )
    const receipt = await data.wait()
    return receipt
  } catch (e) {
    return parseErrorMsg(e)
  }
}

export async function swapTokenToToken(
  srcToken: string,
  destToken: string,
  srcAmount: number,
  destAmount: number,
) {
  try {
    const contract = await CreateContract()
    const data = await contract.swapTokenToToken(
      srcToken,
      destToken,
      toWei(srcAmount),
      toWei(destAmount),
    )
    const receipt = await data.wait()
    return receipt
  } catch (e) {
    return parseErrorMsg(e)
  }
}
