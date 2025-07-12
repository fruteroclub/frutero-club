"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight, Play, Users } from 'lucide-react'

interface StatsItem {
  value: number
  label: string
  prefix?: string
  suffix?: string
}

interface VeranoHeroProps {
  className?: string
  deadline: Date
  onCtaClick: () => void
  onVideoClick?: () => void
}

function CountdownTimer({ deadline }: { deadline: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = deadline.getTime() - now

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [deadline])

  return (
    <div className="flex items-center gap-4 text-center font-mono">
      {Object.entries(timeLeft).map(([key, value]) => (
        <div key={key} className="flex flex-col">
          <span className="text-2xl font-bold">{value.toString().padStart(2, '0')}</span>
          <span className="text-xs uppercase text-muted-foreground">{key}</span>
        </div>
      ))}
    </div>
  )
}

function AnimatedStat({ item, delay = 0 }: { item: StatsItem; delay?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = item.value / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      current += increment
      step++

      if (step === steps) {
        setCount(item.value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [item.value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center text-center"
    >
      <span className="text-3xl font-bold">
        {item.prefix}
        {count}
        {item.suffix}
      </span>
      <span className="text-sm text-muted-foreground">{item.label}</span>
    </motion.div>
  )
}

const stats: StatsItem[] = [
  { value: 200, label: 'Developers Transformados', prefix: '+' },
  { value: 2, label: 'Millones USD Levantados', prefix: '$', suffix: 'M+' },
  { value: 15, label: 'Cupos Disponibles' },
]

export function VeranoHero({ className, deadline, onCtaClick, onVideoClick }: VeranoHeroProps) {
  return (
    <section className={cn('relative overflow-hidden', className)}>
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 -z-10 animate-gradient bg-[linear-gradient(45deg,var(--primary),var(--accent),var(--secondary))] opacity-5 blur-3xl"
        style={{ backgroundSize: '400% 400%' }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            De Developer a Founder Global en 21 Días
          </h1>

          <p className="text-xl text-muted-foreground">
            Únete a los 200+ developers que ya transformaron sus carreras
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <AnimatedStat key={stat.label} item={stat} delay={i * 0.2} />
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="xl"
              onClick={onCtaClick}
              className="group w-full sm:w-auto"
            >
              ASEGURAR CUPO - ÚLTIMOS DÍAS
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button
              variant="outline"
              size="xl"
              onClick={onVideoClick}
              className="group w-full sm:w-auto"
            >
              Ver Programa Completo
              <Play className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
            </Button>
          </div>

          {/* Countdown */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Aplicaciones cierran en:
            </span>
            <CountdownTimer deadline={deadline} />
          </div>

          {/* Social Proof */}
          <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground">
            <Users className="h-5 w-5" />
            <span className="text-sm">
              Se parte de una comunidad elite de founders técnicos en LATAM
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 