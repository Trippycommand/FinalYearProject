import Link from 'next/link'

import HistoryChart from './HistoryChart'
import { ArrowLeftIcon } from '@heroicons/react/solid'

const COINGECKO_API = 'https://api.coingecko.com/api/v3'

export default async function SymbolPage(props: { params: { id: string } }) {
  const coinId = props.params.id

  const coin = await fetch(
    `${COINGECKO_API}/coins/${coinId}?localization=false&tickers=false&market_data=false&community_data=false&sparkline=false`,
  ).then(async (res) => {
    const data = await res.json()
    console.log({ data })
    return data
  })

  const prices = await fetch(
    `${COINGECKO_API}/coins/${coinId}/market_chart?vs_currency=inr&days=7`,
  ).then(async (res) => {
    const data = await res.json()
    return data.prices
  })

  return (
    <div className="mx-auto max-w-[1200px] py-24">
      <div>
        <Link href="/">
          <ArrowLeftIcon className="mr-2 inline size-5 align-[-4px]" />
          Back
        </Link>
      </div>
      <div className="grid w-full grid-cols-[40%_60%] gap-16 pt-16">
        <div>
          <div className="text-xl">
            <img src={coin.image.small} alt="" className="mr-4 inline-block" />
            {coin.name}
          </div>

          <div className="my-4">
            {coin.categories.map((category) => (
              <div
                key={category}
                className="my-1 mr-2 inline-block rounded bg-indigo-800 px-1 py-0.5 text-xs text-white"
              >
                {category}
              </div>
            ))}
          </div>

          <div
            className="prose-invert text-justify text-sm text-neutral-200"
            dangerouslySetInnerHTML={{ __html: coin.description.en }}
          ></div>
        </div>
        <div className="pt-20">
          <HistoryChart symbol={coinId} prices={prices} />
        </div>
      </div>
    </div>
  )
}
