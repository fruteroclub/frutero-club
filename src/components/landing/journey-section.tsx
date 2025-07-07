import Image from 'next/image'
import { SparkleIcon } from 'lucide-react'

const phases = [
  {
    phase: 'Módulo 1',
    title: 'Monetizando en Internet: IA y Cripto',
    duration: '2 Semanas',
    description: 'Aprende fundamentos, identifica un problema y desarrolla tu idea',
    mascot: '/images/fruits/avocado.svg',
  },
  {
    phase: 'Módulo 2',
    title: 'Construyendo tu MVP con IA',
    duration: '4 Semanas',
    description: 'Construye tu producto, obtén tus primeros usuarios e itera',
    mascot: '/images/fruits/cherries.svg',
  },
  {
    phase: 'Módulo 3',
    title: 'Lanza tu producto y monetiza',
    duration: '4 Semanas',
    description: 'Growth Hacking, Marketing y Ventas para ganar',
    mascot: '/images/fruits/platano.svg',
  },
  {
    phase: 'Módulo 4',
    title: 'Incubación de talento',
    duration: '6 Semanas',
    description: 'Acelera tu startup o inicia un internship',
    mascot: '/images/fruits/manzana.svg',
  },
]

export default function JourneyPage() {
  return (
    <section className="page py-12 lg:py-16">
      <div className="container gap-y-12 items-start">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold md:text-5xl">
            Tu camino de <span className="text-primary">Hacker</span> a{' '}
            <span className="text-secondary">Founder</span>
          </h2>
          <p className="text-lg text-muted">
            Una metodología probada que transforma talento en éxito en solo <span className="font-semibold underline underline-offset-4 decoration-secondary decoration-2">4 meses</span>
          </p>
        </div>
        <div className="w-full flex justify-start px-4">
          <div className="relative">
            {/* Línea vertical */}
            <div className="absolute top-0 left-1/3 h-full -translate-x-1/3 bg-foreground w-[2px]" />

            {/* Fases */}
            <div className="space-y-8">
              {phases.map((phase, index) => (
                <div
                  key={index}
                  className="relative flex items-center gap-8 md:gap-12"
                >
                  {/* Línea y punto */}
                  <div className="absolute top-1/2 left-1/3 flex -translate-x-1/3 -translate-y-1/2 items-center justify-center">
                    <SparkleIcon className="w-5 h-5 text-foreground fill-foreground mr-2" />
                  </div>

                  {/* Mascota */}
                  <div className="flex w-1/3 justify-end">
                    <div className="relative h-24 w-24">
                      <Image
                        src={phase.mascot}
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="w-2/3 pl-2">
                    <div className="flex items-center justify-between gap-x-2">
                      <div className="text-xl font-semibold text-primary">
                        {phase.phase}
                      </div>
                      <div className="text-sm text-muted">
                        {phase.duration}
                      </div>
                    </div>
                    <div className="text-xl font-bold">{phase.title}</div>
                    <div className="text-sm text-muted">
                      {phase.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
