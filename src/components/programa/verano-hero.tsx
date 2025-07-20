"use client"

import { JSX, SVGProps, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, BitcoinIcon, BrainCircuitIcon, HandMetalIcon } from 'lucide-react'
import { CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import IconCard from '@/components/stats/icon-card'
import Image from 'next/image'

interface VeranoHeroProps {
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
    <div className="flex items-center gap-6 text-center font-mono">
      {/* Days */}
      <div className="flex flex-col">
        <span className="text-5xl font-medium">{timeLeft.days.toString().padStart(2, '0')}</span>
        <span className="text-xs uppercase text-background/75">days</span>
      </div>

      {/* Hours:Minutes:Seconds */}
      <div className="flex flex-col text-primary">
        <div className="flex items-center text-5xl font-medium">
          <span>{timeLeft.hours.toString().padStart(2, '0')}</span>
          <span className="mx-1 text-4xl">:</span>
          <span>{timeLeft.minutes.toString().padStart(2, '0')}</span>
          <span className="mx-1 text-4xl">:</span>
          <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
        </div>
        <div className="flex items-center justify-between text-xs uppercase">
          <span>hours</span>
          <span className="mx-1 opacity-0">:</span>
          <span>minutes</span>
          <span className="mx-1 opacity-0">:</span>
          <span>seconds</span>
        </div>
      </div>
    </div>
  )
}

// function AnimatedStat({ item, delay = 0 }: { item: StatsItem; delay?: number }) {
//   const [count, setCount] = useState(0)

//   useEffect(() => {
//     const duration = 2000 // 2 seconds
//     const steps = 60
//     const increment = item.value / steps
//     let current = 0
//     let step = 0

//     const timer = setInterval(() => {
//       current += increment
//       step++

//       if (step === steps) {
//         setCount(item.value)
//         clearInterval(timer)
//       } else {
//         setCount(Math.floor(current))
//       }
//     }, duration / steps)

//     return () => clearInterval(timer)
//   }, [item.value])

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay }}
//       className="flex flex-col items-center text-center"
//     >
//       <span className="text-3xl font-bold">
//         {item.prefix}
//         {count}
//         {item.suffix}
//       </span>
//       <span className="text-sm text-muted-foreground">{item.description}</span>
//     </motion.div>
//   )
// }

const stats = [
  {
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <BrainCircuitIcon strokeWidth={1} {...props} />
    ),
    label: 'Inteligencia Artificial',
  },
  {
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <BitcoinIcon strokeWidth={1} {...props} />
    ),
    label: 'Negocios Digitales',
  },
  {
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <HandMetalIcon strokeWidth={1} {...props} />
    ),
    label: 'Cultura de Internet',
  },
]
const statsSmallViewport = [
  {
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <BrainCircuitIcon {...props} />
    ),
    label: 'Inteligencia Artificial',
  },
  {
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <BitcoinIcon {...props} />
    ),
    label: 'Negocios Digitales',
  },
  {
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <HandMetalIcon {...props} />
    ),
    label: 'Cultura de Internet',
  },
]

export function VeranoHero({ deadline, onCtaClick, onVideoClick }: VeranoHeroProps) {
  return (
    <div className="md:max-w-3/4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        data-slot="card"
        className="bg-foreground lg:bg-transparent text-background flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-x-0 rounded-xl pb-6"
      >
        <Image src="/images/programa/verano-en-cadena.jpg" alt="Verano En Cadena" width={500} height={500} className="rounded-t-xl w-full lg:rounded-l-xl lg:rounded-r-none lg:rounded-t-none" />

        <CardHeader className="space-y-8 lg:bg-foreground lg:rounded-r-xl lg:flex lg:flex-col lg:justify-center lg:px-8">
          <div className="flex flex-col gap-y-0">
            <h1 className="text-center lg:text-left text-primary font-medium my-0">
              Verano En Cadena
            </h1>
            <h3 className="text-center lg:text-left">
              De Cero a Impacto <br />en solo <span className="subrayado">3 Semanas</span>
            </h3>
          </div>
          <div className='w-full flex justify-center'>
            <Button
              size="lg"
              onClick={onCtaClick}
              className="group text-foreground font-semibold"
            >
              Regístrate Ahora
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="w-full flex flex-col items-center lg:col-span-2">

          {/* Stats */}
          <div className="w-full grid md:hidden grid-cols-1 gap-4 p-4">
            {statsSmallViewport.map((stat) => (
              <IconCard className="bg-transparent text-background py-0" key={stat.label} icon={stat.icon} label={stat.label} />
            ))}
          </div>
          <div className="hidden md:grid md:w-full grid-cols-3 gap-2 md:py-2 lg:max-w-screen-sm">
            {stats.map((stat) => (
              <IconCard className="bg-transparent lg:text-primary border-none text-background md:py-0 lg:shadow-none" key={stat.label} icon={stat.icon} label={stat.label} />
            ))}
          </div>
          <div className="w-full flex justify-center md:py-2">
            <Button
              variant="ghost"
              onClick={onVideoClick}
              className="group text-background md:text-foreground"
            >
              Ver Programa Completo
              <Play className="ml-2 h-5 w-5 text-primary fill-primary transition-transform group-hover:scale-110" />
            </Button>
          </div>
        </CardContent>
        {/* CTAs */}
        <CardFooter className="md:text-foreground w-full flex flex-col items-center gap-6 sm:flex-row sm:justify-center py-4 lg:col-span-2">

          {/* Countdown */}
          <div className="flex flex-col items-center gap-1 md:pb-8">
            <span className="text-lg font-medium">
              Aplicaciones cierran en:
            </span>
            <CountdownTimer deadline={deadline} />
          </div>
        </CardFooter>
      </motion.div>
    </div>
  )
}