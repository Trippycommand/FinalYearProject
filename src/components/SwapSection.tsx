'use client'

import { useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useAccount } from 'wagmi'

import TransactionStatus from './TransactionStatus'
import { hasValidAllowance, increaseAllowance } from '@/utils/allowance'
import { swapEthToToken, swapTokenToEth, swapTokenToToken } from '@/utils/swap'
import { CogIcon } from '@heroicons/react/outline'
import { ArrowDownIcon } from '@heroicons/react/solid'

const COIN_OPTIONS = [
  'Ethereum',
  'Tether USDt',
  'USDC',
  'Shiba Inu',
  'BNB',
  'TRON',
  'Uniswap',
  'Polygon',
]

export default function SwapSection({
  tokens,
}: {
  tokens: { name: string; inr: number }[]
}) {

  const TokenRefs = {
    1: {
      name: useRef<HTMLSelectElement>(null),
      input: useRef<HTMLInputElement>(null),
    },
    2: {
      name: useRef<HTMLSelectElement>(null),
      input: useRef<HTMLInputElement>(null),
    },
  }

  function calcExchangeValues(inputIndex: number) {
    const inputName = TokenRefs[inputIndex].name.current?.value
    const inputQty = TokenRefs[inputIndex].input.current?.value
    const inputInrValue = tokens.filter((token) => token.name === inputName)[0]
      .inr

    const outputIndex = inputIndex === 1 ? 2 : 1
    const outputName = TokenRefs[outputIndex].name.current?.value
    const outputInrValue = tokens.filter(
      (token) => token.name === outputName,
    )[0].inr
    const outputQty = ((inputQty * inputInrValue) / outputInrValue).toFixed(16)

    // @ts-expect-error
    TokenRefs[outputIndex].input.current.value = outputQty
  }

  // TOKEN SWAP:

  const { address } = useAccount()
  const [txPending, setTxnPending] = useState(false)

  async function handleSwap() {
    const destToken = TokenRefs[2].name.current?.value || ''
    const srcToken = TokenRefs[1].name.current?.value || ''
    const srcValue = parseFloat(TokenRefs[1].input.current?.value || '')
    const destValue = parseFloat(TokenRefs[2].input.current?.value || '')

    console.log({ srcValue, destValue })

    if (srcToken === destToken)
      return toast.error(
        'Kindly select different Source and Destination Token Names',
        { duration: 6000 },
      )
    else if (srcValue <= 0 || destValue <= 0)
      return toast.error('Kindly enter valid Token Values', { duration: 6000 })

    setTxnPending(true)
    if (srcToken !== 'Ethereum') {
      const result = await hasValidAllowance(address, srcToken, srcValue)
      if (!result) {
        const result = await increaseAllowance(srcToken, srcValue)
        if (!result)
          toast.error('Increase Allowance Failed', { duration: 6000 })
        else
          toast.success('Allowance Increased Successfully', {
            duration: 6000,
          })
        setTxnPending(false)
        return
      }
    }

    const receipt =
      srcToken === 'Ethereum' && destToken !== 'Ethereum'
        ? await swapEthToToken(destToken, srcValue, destValue)
        : srcToken !== 'Ethereum' && destToken === 'Ethereum'
          ? await swapTokenToEth(srcToken, srcValue, destValue)
          : await swapTokenToToken(srcToken, destToken, srcValue, destValue)

    console.log({ receipt })

    if (receipt && !receipt.hasOwnProperty('transactionHash'))
      toast.error('Txn Error: ' + receipt, { duration: 6000 })
    else {
      toast.success('Transaction Successful!', { duration: 6000 })
      window.location.reload()
    }

    setTxnPending(false)
  }

  return (
    <div className="w-[100%] rounded-xl bg-violet-600 p-4 px-6">
      <div className="flex items-center justify-between px-1 py-4 text-white">
        <p>Swap</p>
        <CogIcon className="h-6" />
      </div>

      <div className="relative mb-4">
        <input
          type="number"
          placeholder="0.0"
          ref={TokenRefs[1].input}
          className="w-full rounded-lg bg-neutral-800 px-4 py-4 font-mono text-2xl"
          onInput={() => calcExchangeValues(1)}
          // @ts-expect-error
          onWheel={(e) => e.target?.blur()}
        />
        <select
          ref={TokenRefs[1].name}
          onChange={() => calcExchangeValues(2)}
          className="absolute right-4 top-3 min-w-16 rounded-lg bg-neutral-700 px-4 py-2.5"
        >
          {COIN_OPTIONS.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>

        <button className="absolute left-[45%] top-14 z-10 rounded-lg bg-neutral-600 p-2">
          <ArrowDownIcon className="size-6" />
        </button>
      </div>

      <div className="relative mb-4">
        <input
          type="number"
          placeholder="0.0"
          ref={TokenRefs[2].input}
          className="w-full rounded-lg bg-neutral-800 px-4 py-4 font-mono text-2xl"
          onInput={() => calcExchangeValues(2)}
          // @ts-expect-error
          onWheel={(e) => e.target?.blur()}
        />
        <select
          ref={TokenRefs[2].name}
          onChange={() => calcExchangeValues(1)}
          defaultValue="Shiba Inu"
          className="absolute right-4 top-3 min-w-16 rounded-lg bg-neutral-700 px-4 py-2.5"
        >
          {COIN_OPTIONS.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button
        className="mt-4 w-full rounded-md bg-neutral-800 py-4 text-lg text-white transition-all hover:bg-neutral-900 disabled:bg-neutral-800"
        onClick={handleSwap}
      >
        {
          'Swap'
         
        }
      </button>

      {txPending && <TransactionStatus />}

      <Toaster />
    </div>
  )
}
