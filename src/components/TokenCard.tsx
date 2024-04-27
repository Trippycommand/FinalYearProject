'use client'

import { useAccount } from 'wagmi'

import TokenBalance from './TokenBalance'

export default function TokenCard({ name }: { name: string }) {
  const { address: walletAddress } = useAccount()
  return (
    <div className="flex min-w-80 flex-col rounded-xl bg-[#212429] px-6 py-4">
      <div className="mb-4 text-lg font-medium uppercase text-indigo-300">
        {name}
      </div>
      <TokenBalance tokenName={name} walletAddress={walletAddress} />
    </div>
  )
}
