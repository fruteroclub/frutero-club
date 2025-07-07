import { JSX, SVGProps } from 'react'
import StatCard from '@/components/stats/stat-card'
import { CoinsIcon, GlobeIcon, HandshakeIcon, RocketIcon, TestTubeDiagonalIcon, TrophyIcon } from 'lucide-react'

export default function StatsSection() {

  return (
    <section className="page py-12">
      <div className="container gap-y-8">
        <div className="text-center flex flex-col gap-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Nuestro <span className="text-primary">impacto</span> en números
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            No son promesas, son <span className='text-foreground underline underline-offset-2 decoration-primary decoration-2 font-semibold'>resultados</span> de nuestra comunidad
          </p>
        </div>

        <div className="md:max-w-xl grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 lg:max-w-screen-md mx-auto">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              number={stat.number}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const stats = [
  {
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <HandshakeIcon {...props} />
    ),
    number: '100+',
    description: 'Profesionales conectados',
  },
  {
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <CoinsIcon {...props} />
    ),
    number: '$100k+',
    description: 'USD en premios y grants',
  },
  {
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <RocketIcon {...props} />
    ),
    number: '30+',
    description: 'Startups lanzadas',
  },
  {
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <GlobeIcon {...props} />
    ),
    number: '15+',
    description: 'Países alcanzados',
  },
  {
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <TrophyIcon {...props} />
    ),
    number: '25+',
    description: 'Finalistas de Hackatones',
  },
  {
    icon: (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
      <TestTubeDiagonalIcon {...props} />
    ),
    number: '150+',
    description: 'Proyectos construidos',
  }
]