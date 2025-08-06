'use client'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
}

export function Section({ children, className }: SectionProps) {
  return (
    <section
      className={cn(
        'flex w-full flex-col items-center',
        'px-4 py-8 md:px-8 md:py-12 lg:px-16 lg:py-16 xl:px-24',
        className,
      )}
    >
      {children}
    </section>
  )
}
