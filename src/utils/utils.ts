import { ethers } from 'ethers'

export function toWei(amount: number, decimal = 18) {
  const toWei = ethers.utils.parseUnits(amount.toString(), decimal)
  return toWei.toString()
}

export function toEth(amount, decimal = 18) {
  const toEth = ethers.utils.formatUnits(amount, decimal)
  return toEth.toString()
}

export function parseErrorMsg(e: unknown) {
  console.log({ error: e })
  const json = JSON.parse(JSON.stringify(e))
  return json?.reason || json?.error?.message
}
