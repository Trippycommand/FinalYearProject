'use client'

import Link from 'next/link'
import { useState } from 'react'

import { TrendingDownIcon, TrendingUpIcon } from '@heroicons/react/solid'

export default function CryptoData(props: { data: any }) {
  const [filter, setFilter] = useState('Most Popular')
  const [searchTerm, setSearchTerm] = useState('')

  const sortData = (data: any) => {
    const sortedData = [...data]
    if (filter === 'Highest Price') {
      sortedData.sort((a, b) => b.current_price - a.current_price)
    } else if (filter === 'Lowest Price') {
      sortedData.sort((a, b) => a.current_price - b.current_price)
    }
    return sortedData
  }

  const filteredData = props.data.filter(
    (crypto: any) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <div className="my-8 flex flex-row gap-6">
        <input
          className="flex-grow rounded-md bg-gray-800 px-4 py-2"
          placeholder="Search"
          onChange={(event: any) => {
            const searchTerm = event.target.value
            setSearchTerm(searchTerm)
            setSearchTerm(searchTerm)
          }}
        />
        <select
          className="rounded-md bg-gray-800 px-4 py-2"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="Most Popular">Most Popular</option>
          <option value="Highest Price">Highest Price</option>
          <option value="Lowest Price">Lowest Price</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortData(filteredData.slice(0, 20)).map((coin, index) => {
          const circulating_supply = parseFloat(coin.circulating_supply)
          const total_supply = parseFloat(coin.total_supply)
          const percent = ((circulating_supply / total_supply) * 100).toFixed(2)
          return (
            <Link
              key={index}
              href={`/coin/${coin.id}`}
              className="transform cursor-pointer overflow-hidden rounded-lg bg-gradient-to-br from-indigo-900 to-blue-950 p-4 text-gray-200 text-white shadow-lg transition duration-300 hover:scale-105"
            >
              <div></div>
              <div className="flex flex-row justify-between text-lg">
                <div className="align-middle font-medium">
                  <img src={coin.image} alt="" className="mr-2 inline size-6" />
                  {coin.name}
                </div>
                <div className="font-semibold uppercase text-neutral-200">
                  {coin.symbol}
                </div>
              </div>

              <div className="flex flex-row justify-between px-2 py-4">
                <div>₹ {coin.current_price}</div>
                <div
                  className={
                    coin.price_change_percentage_24h < 0
                      ? 'text-red-400'
                      : 'text-green-400'
                  }
                >
                  {parseFloat(coin.price_change_percentage_24h).toFixed(2)}%
                  {coin.price_change_percentage_24h < 0 ? (
                    <TrendingDownIcon className="ml-2 inline-block size-6 align-[-6px]" />
                  ) : (
                    <TrendingUpIcon className="ml-2 inline-block size-6 align-[-6px]" />
                  )}
                </div>
              </div>

              <div className="px-2 text-xs text-neutral-300">
                {percent}% coins in circulation
              </div>
              <div className="mt-1 h-4 w-full overflow-hidden rounded-full bg-teal-200">
                <div
                  className="h-full rounded-full rounded-r-none bg-teal-500"
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
