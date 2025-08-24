# Para Guest Mode Integration Guide - Monad Testnet

## Overview
This guide demonstrates how to integrate Para's wallet infrastructure with Guest Mode into a Next.js application, enabling frictionless Web3 onboarding on Monad testnet. Users can instantly generate wallets without sign-up, perfect for interacting with $PULPA tokens and on-chain assets.

## Reference Implementation
Example code is provided in: `/docs/integrations/para-wallet-auth-integration/example-code/`

## Implementation Steps

### Step 1: Add Para API Key Configuration ✅
Add the following to your `.env.local` file:
```bash
# Para Wallet Configuration
NEXT_PUBLIC_PARA_API_KEY=your_para_api_key_here

# Optional: Monad Testnet Configuration
NEXT_PUBLIC_MONAD_RPC_URL=https://testnet-rpc.monad.xyz
NEXT_PUBLIC_MONAD_CHAIN_ID=10143
```

### Step 2: Install Dependencies
```bash
bun add @getpara/react-sdk@alpha @tanstack/react-query wagmi viem
```

### Step 3: Create OnchainProvider with Para Integration

**File**: `/src/providers/onchain-provider.tsx`

**Reference**: See example at `/docs/integrations/para-wallet-auth-integration/example-code/providers/onchain-provider.tsx`

**Key Implementation Points**:
```typescript
'use client'

import { Suspense, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ParaProvider } from '@getpara/react-sdk@alpha'  // Para SDK import
import { createConfig, WagmiProvider } from 'wagmi'
import { http } from 'wagmi'
import { defineChain } from 'viem'

// Define Monad testnet chain
const monadTestnet = defineChain({
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: { name: 'Monad', symbol: 'MON', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.monad.xyz'] }
  },
  blockExplorers: {
    default: { name: 'Monad Explorer', url: 'https://testnet.monadexplorer.com' }
  }
})

// Para API Key from environment
const PARA_API_KEY = process.env.NEXT_PUBLIC_PARA_API_KEY ?? ''

// Wagmi configuration for Web3 interactions
const wagmiConfig = createConfig({
  chains: [monadTestnet],
  transports: {
    [monadTestnet.id]: http('https://testnet-rpc.monad.xyz'),
  },
})

function OnchainProviderComponent({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient()

  return (
    <ParaProvider
      apiKey={PARA_API_KEY}
      config={{
        // Enable Guest Mode - Key Para SDK Feature
        guestMode: {
          enabled: true,
          autoConnect: true,  // Automatically create wallet on first visit
        },
        // Configure default chain
        defaultChain: monadTestnet,
        supportedChains: [monadTestnet],
        // Guest wallet configuration
        walletConfig: {
          type: 'guest',
          persistSession: true,  // Persist guest wallet across sessions
        }
      }}
      // Callback when guest wallet is created
      onGuestWalletCreated={(wallet) => {
        console.log('Guest wallet created:', wallet.address)
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
      </QueryClientProvider>
    </ParaProvider>
  )
}

export default function OnchainProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<div>Loading wallet...</div>}>
      <OnchainProviderComponent>{children}</OnchainProviderComponent>
    </Suspense>
  )
}
```

**Key Para SDK Features Highlighted**:
- `guestMode.enabled`: Enables instant wallet generation
- `autoConnect`: Automatically creates wallet on first visit
- `persistSession`: Maintains wallet across browser sessions
- `onGuestWalletCreated`: Callback for wallet creation events

### Step 4: Create Auth Button Component with Para SDK Hooks

**File**: `/src/components/buttons/auth-button-para.tsx`

**Reference**: Adapt from `/docs/integrations/para-wallet-auth-integration/example-code/buttons/auth-button-privy.tsx`

**Key Para SDK Hooks Used**:
- `useModal` - Modal control for wallet management
- `useSignUpOrLogIn` - Authentication flow handling
- `useWallet` - Current wallet information
- `useAccount` - Connection status and account details

**Implementation with Para SDK Hooks**:
```typescript
'use client'

import { type Dispatch, type SetStateAction, useState } from 'react'
import { 
  useModal,           // Modal control hook
  useSignUpOrLogIn,   // Auth flow hook
  useWallet,          // Wallet info hook
  useAccount          // Account connection hook
} from '@getpara/react-sdk@alpha'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

type AuthButtonProps = {
  children?: React.ReactNode
  className?: string
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'icon' | null | undefined
  setIsMenuOpen?: Dispatch<SetStateAction<boolean>>
}

export default function AuthButtonPara({
  children,
  className,
  size = 'default',
  setIsMenuOpen,
}: AuthButtonProps) {
  const router = useRouter()
  
  // Para SDK Hooks
  const { isOpen, openModal, closeModal } = useModal()  // Modal management
  const { signUpOrLogInAsync, isPending } = useSignUpOrLogIn()  // Auth flow
  const { data: wallet, isLoading: walletLoading } = useWallet()  // Wallet info
  const { isConnected, connectionType, embedded } = useAccount()  // Connection status

  // Handle Guest Mode authentication
  async function handleGuestLogin() {
    try {
      // Use signUpOrLogInAsync with guest mode
      const result = await signUpOrLogInAsync({
        isGuestMode: true  // Enable guest mode
      })
      
      if (result) {
        console.log('Guest wallet created')
        toast.success('Billetera de invitado creada')
        setIsMenuOpen?.(false)
      }
    } catch (error) {
      console.error('Failed to create guest wallet:', error)
      toast.error('Error al crear billetera')
    }
  }

  // Handle modal-based authentication
  function handleModalAuth() {
    openModal()  // Opens Para's built-in modal
  }

  // Handle logout
  async function handleLogout() {
    // Para SDK handles logout through modal
    openModal()  // User can disconnect from modal
    setIsMenuOpen?.(false)
  }

  // Display wallet info when connected
  if (isConnected && wallet) {
    const isGuest = connectionType === 'embedded' && !embedded?.email
    
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm">
          {/* Use Para's display address method */}
          {wallet.id ? `${wallet.id.slice(0, 6)}...${wallet.id.slice(-4)}` : ''}
          {isGuest && <span className="ml-1 text-xs">(Invitado)</span>}
        </span>
        <Button
          onClick={handleModalAuth}  // Open modal for wallet management
          size={size}
          variant="outline"
          className={cn('font-funnel font-medium', className)}
        >
          Gestionar
        </Button>
      </div>
    )
  }

  // Loading state
  if (walletLoading || isPending) {
    return (
      <Button disabled size={size} className={className}>
        Cargando...
      </Button>
    )
  }

  // Not connected - show login options
  return (
    <div className="flex gap-2">
      <Button
        onClick={handleGuestLogin}
        size={size}
        className={cn('font-funnel font-medium', className)}
        disabled={isPending}
      >
        {children || 'Entrar como Invitado'}
      </Button>
      <Button
        onClick={handleModalAuth}
        size={size}
        variant="outline"
        className={cn('font-funnel font-medium', className)}
      >
        Conectar Billetera
      </Button>
    </div>
  )
}
```

**Key Para SDK Hooks Integration**:

#### 1. useModal Hook
```typescript
const { isOpen, openModal, closeModal } = useModal()
```
**Purpose**: Controls Para's built-in wallet management modal
- `openModal()` - Opens Para's wallet management modal
- `isOpen` - Boolean to check if modal is open
- `closeModal()` - Programmatically close the modal

#### 2. useSignUpOrLogIn Hook
```typescript
const { signUpOrLogInAsync, isPending } = useSignUpOrLogIn()
```
**Purpose**: Handles authentication flow including guest mode
- `signUpOrLogInAsync({ isGuestMode: true })` - Create guest wallet
- `isPending` - Loading state during authentication

#### 3. useWallet Hook
```typescript
const { data: wallet, isLoading } = useWallet()
```
**Purpose**: Provides current wallet information
- `wallet.id` - Wallet identifier
- `wallet.type` - Wallet type (embedded/external)
- `isLoading` - Wallet loading state

#### 4. useAccount Hook
```typescript
const { isConnected, connectionType, embedded } = useAccount()
```
**Purpose**: Manages connection status and account details
- `isConnected` - Boolean connection status
- `connectionType` - 'embedded', 'external', 'both', or 'none'
- `embedded.email` - User email if not guest

### Step 5: Update App Layout

**File**: `/src/app/layout.tsx`

**Reference**: See example at `/docs/integrations/para-wallet-auth-integration/example-code/app/layout.tsx`

**Key Changes**:
```typescript
import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'

import OnchainProvider from '@/providers/onchain-provider'  // Add this import
import { Toaster } from '@/components/ui/sonner'
import { fonts } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'Frutero Club',
  description: 'Donde el talento se transforma en impacto',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fonts.funnelDisplay.variable,
          fonts.ledger.variable,
          fonts.raleway.variable,
          fonts.spaceGrotesk.variable,
        )}
      >
        <OnchainProvider>{children}</OnchainProvider>  {/* Wrap with provider */}
        <Toaster richColors />
      </body>
    </html>
  )
}
```

### Step 6: Test Implementation

**Testing Checklist**:

#### Guest Wallet Generation
1. Click "Entrar como Invitado"
2. Verify wallet is created using `useAccount().isConnected`
3. Check `useWallet()` returns wallet data
4. Confirm guest status in UI

#### Modal Integration
1. Click "Conectar Billetera" to open Para modal
2. Test wallet management features
3. Verify `useModal().isOpen` state
4. Test modal close functionality

#### Connection Status
1. Use `useAccount()` to verify connection
2. Check `connectionType` for 'embedded' (guest)
3. Verify wallet persistence on refresh
4. Test logout through modal

#### Monad Testnet Integration
1. Verify chain ID is 10143
2. Get test MON from faucet: https://faucet.monad.xyz
3. Test transactions on Monad testnet
4. Check balance updates

## Para SDK Hooks Reference

### Essential Hooks for Integration

| Hook | Purpose | Key Methods | Documentation |
|------|---------|-------------|---------------|
| `useModal` | Control Para's built-in modal | `openModal()`, `closeModal()`, `isOpen` | [Docs](https://docs.getpara.com/v2/react/guides/hooks/use-modal) |
| `useSignUpOrLogIn` | Handle authentication flow | `signUpOrLogInAsync()`, `isPending` | [Docs](https://docs.getpara.com/v2/react/guides/hooks/use-sign-up-or-login) |
| `useWallet` | Access current wallet info | `data: wallet`, `isLoading` | [Docs](https://docs.getpara.com/v2/react/guides/hooks/use-wallet) |
| `useAccount` | Check connection status | `isConnected`, `connectionType`, `embedded` | [Docs](https://docs.getpara.com/v2/react/guides/hooks/use-account) |

### Additional Useful Hooks
- `useCreateWallet` - Programmatically create wallets
- `useClient` - Access Para client instance
- `useTransaction` - Handle blockchain transactions
- `useBalance` - Get wallet balances

### Hook Usage Examples

#### Modal Control
```typescript
function ModalExample() {
  const { isOpen, openModal, closeModal } = useModal()
  
  return (
    <div>
      <button onClick={openModal}>
        {isConnected ? "Manage Wallet" : "Connect Wallet"}
      </button>
      {isOpen && <p>Modal is open</p>}
    </div>
  )
}
```

#### Authentication Flow
```typescript
function AuthExample() {
  const { signUpOrLogInAsync, isPending } = useSignUpOrLogIn()
  
  const handleAuth = async () => {
    const result = await signUpOrLogInAsync({
      isGuestMode: true  // Create guest wallet
    })
  }
  
  return (
    <button onClick={handleAuth} disabled={isPending}>
      {isPending ? "Creating..." : "Enter as Guest"}
    </button>
  )
}
```

#### Wallet Information
```typescript
function WalletInfo() {
  const { data: wallet, isLoading } = useWallet()
  const { isConnected, connectionType } = useAccount()
  
  if (isLoading) return <div>Loading wallet...</div>
  if (!isConnected) return <div>Not connected</div>
  
  return (
    <div>
      <p>Wallet ID: {wallet?.id}</p>
      <p>Connection Type: {connectionType}</p>
    </div>
  )
}
```

## Monad Testnet Configuration

### Chain Details
```typescript
const monadTestnet = {
  id: 10143,
  name: 'Monad Testnet',
  network: 'monad-testnet',
  nativeCurrency: {
    name: 'Monad',
    symbol: 'MON',
    decimals: 18,
  },
  rpcUrls: {
    default: 'https://testnet-rpc.monad.xyz',
    public: 'https://testnet-rpc.monad.xyz',
  },
  blockExplorers: {
    default: {
      name: 'Monad Explorer',
      url: 'https://testnet.monadexplorer.com',
    },
  },
  testnet: true,
}
```

### Getting Test Tokens
1. Visit the Monad faucet: https://faucet.monad.xyz
2. Connect your guest wallet
3. Request MON test tokens
4. Verify receipt on explorer: https://testnet.monadexplorer.com

## Guest Mode Benefits

### User Experience
- **Zero Friction**: No sign-up, email, or social login required
- **Instant Access**: Wallet generated in <1 second
- **Persistent Sessions**: Wallet survives page refreshes
- **Upgrade Path**: Convert to full account when ready

### Technical Advantages
- **Session Management**: Automatic wallet persistence
- **Security**: MPC-based key management
- **Cross-Platform**: Works across devices with session transfer
- **Upgradeability**: Seamless conversion to full accounts

## Developer Resources

### Para Documentation
- **Main Docs**: https://docs.getpara.com
- **React SDK**: https://docs.getpara.com/v2/react/quickstart
- **Guest Mode**: https://docs.getpara.com/v2/react/guides/customization/guest-mode

### Hook Documentation
- **Modal Hook**: https://docs.getpara.com/v2/react/guides/hooks/use-modal
- **Auth Hook**: https://docs.getpara.com/v2/react/guides/hooks/use-sign-up-or-login
- **Wallet Hook**: https://docs.getpara.com/v2/react/guides/hooks/use-wallet
- **Account Hook**: https://docs.getpara.com/v2/react/guides/hooks/use-account

### Monad Resources
- **Network Info**: https://docs.monad.xyz/developer-essentials/network-information
- **Faucet**: https://faucet.monad.xyz
- **Explorer**: https://testnet.monadexplorer.com

## Troubleshooting

### Common Issues

#### Hook-Related Issues
1. **Hooks Not Working**: 
   - Ensure you're using `@getpara/react-sdk@alpha`
   - Check ParaProvider is at the root of your app
   
2. **Modal Not Opening**: 
   - Verify `useModal()` is called within ParaProvider
   - Check API key is properly configured

3. **Guest Wallet Not Created**: 
   - Confirm `isGuestMode: true` in `signUpOrLogInAsync()`
   - Check browser console for errors

#### Connection Issues
1. **Connection Status Wrong**: 
   - Use `useAccount().isConnected` instead of custom state
   - Verify ParaProvider configuration

2. **Wallet Data Missing**: 
   - Check `useWallet().data` for wallet information
   - Ensure wallet is fully loaded before accessing properties

3. **Chain Connection Failed**: 
   - Verify Monad RPC URL is accessible
   - Check network configuration in wagmi config

#### Environment Issues
1. **API Key Issues**: 
   - Ensure key has `NEXT_PUBLIC_` prefix
   - Verify key is from Para dashboard

2. **TypeScript Errors**: 
   - Install `@types/node` for environment variables
   - Add proper type imports for Para SDK

### Debug Tools
```typescript
// Add debug logging to track hook states
function DebugInfo() {
  const account = useAccount()
  const wallet = useWallet()
  const modal = useModal()
  
  return (
    <div className="p-4 bg-gray-100 text-xs">
      <p>Connected: {account.isConnected ? 'Yes' : 'No'}</p>
      <p>Connection Type: {account.connectionType}</p>
      <p>Wallet Loading: {wallet.isLoading ? 'Yes' : 'No'}</p>
      <p>Modal Open: {modal.isOpen ? 'Yes' : 'No'}</p>
    </div>
  )
}
```

## Next Steps

After completing this integration:

1. **Test $PULPA Token Integration**
   - Deploy test token on Monad testnet
   - Test token transfers with guest wallets
   - Implement token balance display

2. **Add Advanced Features**
   - Multi-chain support
   - NFT integration
   - DeFi protocol interactions

3. **Production Deployment**
   - Switch to production Para environment
   - Implement proper error handling
   - Add analytics and monitoring

This implementation provides a robust foundation for Web3 integration using Para's Guest Mode, enabling immediate user onboarding while maintaining the option to upgrade to full accounts when users are ready to engage more deeply with the platform.

---

*Last Updated: December 2024*  
*Version: 1.0.0*  
*Status: Ready for Implementation*