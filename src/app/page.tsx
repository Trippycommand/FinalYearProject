import CryptoData from './CryptoData'
import LottiePlayer from '@/components/LottiePlayer'
import HeroLottie from '@/lottie/HeroLottie.json'

const COINGECKO_API = 'https://api.coingecko.com/api/v3'

export default async function App() {
  const coins = await fetch(
    `${COINGECKO_API}/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
  ).then(async (res) => await res.json())


  return (
    <div className="mx-auto max-w-[1200px] pb-20">
      <div className="mb-12 mt-24 flex flex-row ">
        <div>
          <h2 className="bg-gradient-to-br from-blue-600 via-pink-600 via-65% to-rose-600 bg-clip-text py-8 text-6xl font-bold text-transparent transition-transform duration-300 ease-in-out">
            CryptoScout
            <span className="block leading-loose">
              India's Leading Platform
            </span>
          </h2>
          <p className="mt-4 max-w-[80%] text-balance text-lg text-white">
            Join our community at CryptoScout where we assist you in exchanging
            your cryptocurrency or any crytoken for the value you deem
            optimal.Become a Cryptoscout and continuously seek out the most
            profitable opportunities with our real-time data. Gain access to a
            wide array of options and start maximizing your profits today! make
            it look proffesional for a website which is in production.
          </p>
        </div>

        <LottiePlayer
          animationData={HeroLottie}
          className="h-full w-full py-16"
        />
      </div>
      <div className="lg:grid-cols-0 grid grid-cols-6 gap-8 sm:grid-cols-1 md:grid-cols-4">
        <Card
          heading="Multiple Wallet Integration"
          description="Our platform boasts seamless integration with a range of leading wallets, with MetaMask emerging as the preferred option."
          img="MetaMask.gif"
        />
        <Card
          heading="Interactive Dashboard"
          description="Provide with a Interactive Dashboard using power BI which top crypto such as Bitcoin,etc"
          img="Chart.gif"
        />
        <Card
          heading="Secure"
          description="We prioritize user privacy and security, ensuring the protection of user credentials and sensitive information as our top priority."
          img="Security.gif"
        />
        <Card
          heading="Filters"
          description="We provide you with filters designed to streamline your exploration of new cryptocurrencies."
          img="Filter.gif"
        />
      </div>

      <h1 className="mb-8 mt-32 text-center text-4xl font-semibold tracking-wider">
        CRYPTOCURRENCY
      </h1>

      <CryptoData data={coins} />
    </div>
  )
}

function Card(props: { heading: string; description: string; img: string }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-gray-900 px-8 py-5 text-white shadow-lg">
      <h1 className="font-medium ">{props.heading}</h1>
      <p className="text-balance text-sm text-neutral-300">
        {props.description}
      </p>
      {/* <img src={props.img} className="mt-6 block size-16" /> */}
    </div>
  )
}
