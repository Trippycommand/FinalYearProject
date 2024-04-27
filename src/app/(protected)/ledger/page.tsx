'use client'

import { use } from 'react'

import { getAllHistory } from '@/utils/history'

export default function TransactionsPage() {
  const history = use(getAllHistory())
  if (typeof history === 'string')
    throw new Error('Kindly connect wallet to view transactions.')
  return (
    <div className="container mx-auto min-h-[90vh] max-w-[1200px] p-2 text-gray-100 sm:p-4">
      <h2 className="mb-8 mt-10 text-3xl font-semibold">Recent transactions</h2>

      <table className="mb-24 min-w-full text-xs">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="w-24" />
        </colgroup>
        <thead className="bg-[#181818]">
          <tr className="text-left">
            <th className="p-3">ID #</th>
            <th className="p-3">User</th>
            <th className="p-3">From</th>
            <th className="p-3">To</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {history?.map((history, i) => {
            return (
              <tr
                key={i + 1}
                className="border-b border-gray-700 border-opacity-20 bg-[#27272A]"
              >
                <td className="p-3">
                  <p>{history.historyId}</p>
                </td>
                <td className="p-3">
                  <p>{history.userAddress}</p>
                </td>
                <td className="p-3">
                  <p>
                    {history.tokenA} {history.inputValue}
                  </p>
                </td>
                <td className="p-3">
                  <p>
                    {history.tokenB} {history.outputValue}
                  </p>
                </td>
                <td className="p-3">
                  <span className="rounded-md bg-[#7765F3] px-3 py-1 font-semibold text-white">
                    <span>Completed</span>
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
