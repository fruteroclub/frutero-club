# Para Wallet Integration - Implementation Guide

## Overview
This guide shows how to integrate Para's Guest Mode wallet functionality into a Next.js application, enabling frictionless Web3 onboarding on Monad testnet.

## Implementation Steps

### Step 1: Install Dependencies

```bash
bun add @getpara/react-sdk @tanstack/react-query wagmi viem
```

**Additional dependencies for Para SDK:**
```bash
bun add @farcaster/miniapp-sdk @farcaster/miniapp-wagmi-connector @farcaster/mini-app-solana pino-pretty
```

### Step 2: Add Post-Install Script

Add to your `package.json`:
```json
{
  "scripts": {
    "postinstall": "npx setup-para"
  }
}
```

### Step 3: Environment Configuration

Add to your `.env.local`:
```bash
NEXT_PUBLIC_PARA_API_KEY=your_para_api_key_here
```

### Step 4: Create OnchainProvider

**File**: `src/providers/onchain-provider.tsx`

Key implementation details:
- Import Para SDK styles: `import "@getpara/react-sdk/styles.css"`
- Configure theme in `paraModalConfig` to avoid transparent modal
- Include mock authentication context for better UX
- Suppress React DOM warnings from Para SDK

```typescript
'use client'

import { Suspense, type ReactNode } from 'react'
import "@getpara/react-sdk/styles.css"  // Required CSS import
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/contexts/auth-context'
import { ParaProvider, Environment } from '@getpara/react-sdk'
import { createConfig, WagmiProvider } from 'wagmi'
import { http } from 'wagmi'
import { defineChain } from 'viem'

// Suppress React DOM warnings for Para SDK
if (typeof window !== 'undefined') {
  const originalError = console.error
  console.error = (...args) => {
    if (args[0]?.includes?.('isVisible') || args[0]?.includes?.('React does not recognize')) {
      return // Suppress Para SDK prop warnings
    }
    originalError.apply(console, args)
  }
}

// Define Monad testnet chain
const monadTestnet = defineChain({
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: { name: 'Monad', symbol: 'MON', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.monad.xyz'] },
    public: { http: ['https://testnet-rpc.monad.xyz'] }
  },
  blockExplorers: {
    default: { name: 'Monad Explorer', url: 'https://testnet.monadexplorer.com' }
  },
  testnet: true
})

const PARA_API_KEY = process.env.NEXT_PUBLIC_PARA_API_KEY ?? ''

const wagmiConfig = createConfig({
  chains: [monadTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [monadTestnet.id]: http('https://testnet-rpc.monad.xyz'),
  },
})

function OnchainProviderComponent({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient()

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ParaProvider
          config={{
            appName: 'Frutero Club',
          }}
          paraClientConfig={{
            env: Environment.PROD,
            apiKey: PARA_API_KEY
          }}
          paraModalConfig={{
            isGuestModeEnabled: true,
            theme: {
              backgroundColor: "#fcf2e9", // Fix transparent modal
              accentColor: "#d97706",     
              font: "Raleway",            
              borderRadius: "md"
            }
          }}
          callbacks={{
            onGuestWalletsCreated: (event) => {
              console.log('Guest wallets created!', event.detail)
            }
          }}
        >
          <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
        </ParaProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default function OnchainProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p>Loading wallet...</p>
          </div>
        </div>
      }
    >
      <OnchainProviderComponent>{children}</OnchainProviderComponent>
    </Suspense>
  )
}
```

### Step 5: Add Required CSS Variables

Add to your `globals.css`:
```css
:root {
  --card-background-color: #fcf2e9;
  /* ... other variables */
}

.dark {
  --card-background-color: #2a2a2a;
  /* ... other variables */
}

@theme inline {
  --color-card-background-color: var(--card-background-color);
  /* ... other theme variables */
}
```

### Step 6: Create Mock Authentication Context

**File**: `src/contexts/auth-context.tsx`

```typescript
'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type AuthContextType = {
  isAppAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAppAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAppAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAppAuthenticated, setIsAppAuthenticated] = useState(false)

  useEffect(() => {
    const savedAuthState = localStorage.getItem('frutero-app-auth')
    if (savedAuthState === 'true') {
      setIsAppAuthenticated(true)
    }
  }, [])

  const login = () => {
    setIsAppAuthenticated(true)
    localStorage.setItem('frutero-app-auth', 'true')
  }

  const logout = () => {
    setIsAppAuthenticated(false)
    localStorage.removeItem('frutero-app-auth')
  }

  return (
    <AuthContext.Provider value={{ isAppAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
```

### Step 7: Create Auth Button Component

**File**: `src/components/buttons/auth-button-para.tsx`

Key Para SDK hooks:
- `useModal()` - Control Para's wallet modal
- `useWallet()` - Access wallet information  
- `useAccount()` - Check connection status
- `useLogout()` - App logout functionality

```typescript
'use client'

import { type Dispatch, type SetStateAction } from 'react'
import { 
  useModal,
  useWallet,
  useAccount,
  useCreateGuestWalletsState
} from '@getpara/react-sdk'
import { useAppAuth } from '@/contexts/auth-context'
import { toast } from 'sonner'
import { Button } from '../ui/button'
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
  // App-level auth state
  const { isAppAuthenticated, login: appLogin, logout: appLogout } = useAppAuth()
  
  // Para SDK Hooks
  const { openModal } = useModal()
  const { data: wallet, isLoading: walletLoading } = useWallet()
  const { isConnected, connectionType, embedded } = useAccount()
  const { isPending: isCreatingGuestWallets, error: guestWalletError } = useCreateGuestWalletsState()

  // Handle opening Para modal and app login
  function handleAuth() {
    if (!isAppAuthenticated) {
      // App login using existing Para wallet
      appLogin()
      setIsMenuOpen?.(false)
      toast.success('¡Bienvenido de vuelta!')
    } else {
      // Open Para modal for wallet management
      openModal()
      setIsMenuOpen?.(false)
    }
  }

  // Handle app logout (keeps Para wallet connected)
  function handleLogout() {
    appLogout()
    setIsMenuOpen?.(false)
    toast.success('Sesión cerrada correctamente')
  }

  // Show guest wallet creation error if any
  if (guestWalletError) {
    console.error('Error creating guest wallets:', guestWalletError)
    toast.error('Error al crear billetera de invitado')
  }

  // Display wallet info when app-authenticated and Para connected
  if (isAppAuthenticated && isConnected && wallet) {
    const isGuest = connectionType === 'embedded' && !embedded?.email
    
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm">
          {wallet.id ? `${wallet.id.slice(0, 6)}...${wallet.id.slice(-4)}` : ''}
          {isGuest && <span className="ml-1 text-xs text-muted-foreground">(Invitado)</span>}
        </span>
        <Button
          onClick={handleAuth}
          size="sm"
          variant="outline"
          className="font-funnel font-medium"
        >
          Gestionar
        </Button>
        <Button
          onClick={handleLogout}
          size="sm"
          variant="ghost"
          className="font-funnel font-medium text-muted-foreground hover:text-foreground"
        >
          Salir
        </Button>
      </div>
    )
  }

  // Loading state
  if (walletLoading || isCreatingGuestWallets) {
    return (
      <Button disabled size={size} className={className}>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
        {isCreatingGuestWallets ? 'Creando billetera...' : 'Cargando...'}
      </Button>
    )
  }

  // Show appropriate button based on Para connection and app auth state
  if (!isConnected || !wallet) {
    // Para not connected - create/connect wallet first
    return (
      <Button
        onClick={() => {
          openModal()
          setIsMenuOpen?.(false)
        }}
        size={size}
        className={cn('font-funnel font-medium', className)}
      >
        {children || 'Únete'}
      </Button>
    )
  }

  // Para connected but not app-authenticated - show login button
  return (
    <Button
      onClick={handleAuth}
      size={size}
      className={cn('font-funnel font-medium', className)}
    >
      {children || 'Entrar'}
    </Button>
  )
}
```

### Step 8: Update App Layout

**File**: `src/app/layout.tsx`

```typescript
import OnchainProvider from '@/providers/onchain-provider'

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <OnchainProvider>{children}</OnchainProvider>
        <Toaster richColors />
      </body>
    </html>
  )
}
```

## Key Implementation Notes

### Essential Requirements
1. **CSS Import**: `import "@getpara/react-sdk/styles.css"` in OnchainProvider
2. **Theme Configuration**: Prevents transparent modal background
3. **Additional Dependencies**: Farcaster packages required by Para SDK
4. **Post-install Script**: `npx setup-para` for proper SDK setup

### Mock Authentication Flow
- **First Visit**: "Únete" → Para modal → Guest wallet → "Entrar" → Authenticated
- **Return Visits**: "Entrar" → Instant app login (Para wallet persists)
- **Logout**: "Salir" → App logout only (Para wallet preserved)

### Benefits
- **Fast re-authentication**: No Para SDK calls on return visits
- **Preserved wallet data**: Pregenerated wallets maintained
- **Clear UX**: Users understand app vs wallet state
- **True logout feeling**: Clean state reset with preserved technical benefits

## Testing
1. Click "Únete" → Para modal opens
2. Select "Continue as Guest" → Guest wallet created
3. Button shows "Entrar" → Click to log into app
4. See authenticated state with "Gestionar" and "Salir" buttons
5. Click "Salir" → Returns to "Entrar" state
6. Refresh page → Still shows "Entrar" (wallet data persisted)

This implementation provides the optimal balance between user experience and technical functionality for Para wallet integration.