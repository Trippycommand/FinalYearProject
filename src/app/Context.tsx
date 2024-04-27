'use client'

import merge from 'lodash/merge'
import { WagmiConfig, chain, configureChains, createClient } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

import {
  RainbowKitProvider,
  getDefaultWallets,
  midnightTheme,
} from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

const theme = merge(midnightTheme(), {
  colors: { accentColor: '#18181b', accentColorForeground: '#fff' },
})

const { chains, provider } = configureChains(
  [chain.sepolia],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_KEY }),
    jsonRpcProvider({
      rpc: () => ({
        http: `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
      }),
    }),
  ],
)
const { connectors } = getDefaultWallets({ appName: 'Custom Dex', chains })
const wagmiClient = createClient({ autoConnect: true, connectors, provider })

export default function StyleContext({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={theme}>
          {children}
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  )
}
