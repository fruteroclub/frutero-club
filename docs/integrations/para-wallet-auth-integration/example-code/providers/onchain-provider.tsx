// src/providers/onchain-provider.tsx

'use client'

import { Suspense, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { PrivyProvider } from '@privy-io/react-auth'
import { createConfig, WagmiProvider } from '@privy-io/wagmi'
import { http } from 'wagmi'
import { arbitrum, base, mainnet, polygon } from 'viem/chains'

const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? ''
const PRIVY_CLIENT_ID = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID ?? ''

const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ?? undefined

const wagmiConfig = createConfig({
  chains: [arbitrum, base, mainnet, polygon],
  multiInjectedProviderDiscovery: false,
  transports: {
    [arbitrum.id]: http(
      `https://arb-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
    ),
    [base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${alchemyApiKey}`),
    [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`),
    [polygon.id]: http(
      `https://polygon-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
    ),
  },
})

function OnchainProviderComponent({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient()

  return (
    <PrivyProvider
      appId={PRIVY_APP_ID}
      clientId={PRIVY_CLIENT_ID}
      config={{
        defaultChain: base,
        supportedChains: [arbitrum, base, mainnet, polygon],
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'all-users',
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  )
}

// Main export with Suspense
export default function OnchainProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          Loading...
        </div>
      }
    >
      <OnchainProviderComponent>{children}</OnchainProviderComponent>
    </Suspense>
  )
}
