import { CreateContract } from './contract'
import { parseErrorMsg, toEth } from './utils'

export async function getAllHistory() {
  try {
    if (typeof window === 'undefined') return undefined

    const contract = await CreateContract()
    const getAllHistory = await contract.getAllHistory()

    const historyTransaction = getAllHistory.map((history, i) => {
      return {
        historyId: history.historyId.toNumber(),
        tokenA: history.tokenA,
        tokenB: history.tokenB,
        inputValue: toEth(history?.inputValue),
        outputValue: toEth(history?.outputValue),
        userAddress: history.userAddress,
      }
    })

    console.log({ historyTransaction })
    return historyTransaction
  } catch (e) {
    return parseErrorMsg(e)
  }
}
