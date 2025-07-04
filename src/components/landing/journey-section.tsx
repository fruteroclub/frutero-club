import Image from 'next/image'

const phases = [
  {
    phase: 'Fase 1',
    title: 'Sembrando semillas',
    duration: '2 - 3 Meses',
    mascot: '/images/fruits/avocado.svg',
  },
  {
    phase: 'Fase 2',
    title: 'Cultivando',
    duration: '3 - 6 Meses',
    mascot: '/images/fruits/cherries.svg',
  },
  {
    phase: 'Fase 3',
    title: 'Incubando',
    duration: '6 - 12 Meses',
    mascot: '/images/fruits/platano.svg',
  },
  {
    phase: 'Fase 4',
    title: 'Floreciendo',
    duration: 'Ongoing',
    mascot: '/images/fruits/manzana.svg',
  },
]

export default function JourneyPage() {
  return (
    <section className="w-full py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Tu camino de <span className="text-primary">Hacker</span> a{' '}
            <span className="text-secondary">Founder</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Una metodología probada que transforma talento en éxito
          </p>
        </div>

        <div className="relative mx-auto mt-20 max-w-2xl">
          {/* Línea vertical */}
          <div className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-gray-200" />

          {/* Fases */}
          <div className="space-y-16">
            {phases.map((phase, index) => (
              <div
                key={index}
                className="relative flex items-center gap-8 md:gap-12"
              >
                {/* Línea y punto */}
                <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-primary" />
                </div>

                {/* Mascota */}
                <div className="flex w-1/2 justify-end">
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
                <div className="w-1/2 pl-8">
                  <div className="text-sm font-semibold text-primary">
                    {phase.phase}
                  </div>
                  <div className="mt-2 text-xl font-bold">{phase.title}</div>
                  <div className="mt-1 text-sm text-gray-600">
                    {phase.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
