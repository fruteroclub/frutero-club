'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import MobileMenu from './mobile-menu'
import AuthButton from '../buttons/auth-button-dummy'
import { SparkleIcon } from 'lucide-react'

export type MenuItemType = {
  displayText: string
  href: string
  isMobileOnly: boolean
  isExternal?: boolean
}

const MENU_ITEMS: MenuItemType[] = [
  {
    displayText: 'club',
    href: '/club',
    isMobileOnly: false,
  },
  {
    displayText: 'ecosistema',
    href: '/ecosistema',
    isMobileOnly: false,
  },
  {
    displayText: 'mobil3',
    href: '/programa',
    isMobileOnly: false,
  },
  { displayText: 'recursos', href: '/recursos', isMobileOnly: false },
  { displayText: '$PULPA', href: '/pulpa', isMobileOnly: false },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="top-0 h-24 w-full bg-background">
      <div className="mx-auto flex h-full w-full max-w-3xl items-center justify-between p-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-5 lg:px-8">
        <Link className="flex w-36 items-center" href="/">
          <Image
            src="/images/logos/frutero.svg"
            alt="Frutero logo"
            width={128}
            height={128}
            className="-mt-1 w-full transition duration-300 ease-in-out hover:scale-105"
          />
          <span className="sr-only">Frutero Club</span>
        </Link>
        <div className="z-10 col-span-3 flex items-center justify-center">
          <nav className="hidden gap-4 lg:flex">
            {MENU_ITEMS.filter((menuItem) => !menuItem.isMobileOnly).map(
              (menuItem, index) => (
                <Link
                  key={`${menuItem.displayText}-menuItem-${index}`}
                  className={`inline-flex items-center justify-center px-4 py-2 font-funnel text-xl font-medium text-foreground transition-colors hover:text-primary focus:text-primary focus:outline-none ${pathname === menuItem.href &&
                    'pointer-events-none underline decoration-primary decoration-2 underline-offset-[6px] hover:!text-foreground'
                    }`}
                  href={menuItem.href}
                  target={menuItem.isExternal ? '_blank' : ''}
                >
                  {menuItem.displayText}
                </Link>
              ),
            )}
          </nav>
        </div>
        <div className="hidden lg:flex lg:justify-end">
          <AuthButton
            size="lg"
            className="transition duration-300 ease-in-out hover:scale-105"
          >
            <SparkleIcon className="mr-2 -ml-2 h-4 w-4 fill-background" /> Únete
          </AuthButton>
        </div>
        <MobileMenu menuItems={MENU_ITEMS} pathname={pathname} />
      </div>
    </header>
  )
}
