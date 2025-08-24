// src/components/buttons/auth-button-privy.tsx

'use client'

import { type Dispatch, type SetStateAction } from 'react'
import { useLogin, useLogout, usePrivy } from '@privy-io/react-auth'
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

export default function AuthButton({
  children,
  className,
  size = 'default',
  setIsMenuOpen,
}: AuthButtonProps) {
  const { ready: isPrivyReady, authenticated } = usePrivy()
  const { login: loginWithPrivy } = useLogin({
    onComplete: ({
      user,
      isNewUser,
      wasAlreadyAuthenticated,
      loginMethod,
      loginAccount,
    }) => {
      console.log('User logged in successfully', user)
      console.log('Is new user:', isNewUser)
      console.log('Was already authenticated:', wasAlreadyAuthenticated)
      console.log('Login method:', loginMethod)
      console.log('Login account:', loginAccount)
      router.push('/dashboard')
      setIsMenuOpen?.(false)
      toast.success('Sesión iniciada correctamente')
    },
    onError: (error) => {
      console.log('Login failed', error)
      toast.error('Inicio de sesión fallido')
    },
  })
  const { logout: logoutWithPrivy } = useLogout()

  // const disableLogin = !isPrivyReady || (isPrivyReady && authenticated);

  const router = useRouter()

  function login() {
    if (!authenticated) {
      loginWithPrivy()
    } else {
      toast.warning('ya existe una sesión activa')
    }
  }
  async function logout() {
    await logoutWithPrivy()
    router.push('/')
    setIsMenuOpen?.(false)
    toast.success('Sesión cerrada correctamente')
  }

  if (!isPrivyReady) {
    return null
  }

  return (
    <Button
      onClick={authenticated ? logout : login}
      size={size}
      className={cn('font-funnel font-medium', className)}
    >
      {authenticated ? 'Salir' : children || 'Entrar'}
    </Button>
  )
}
