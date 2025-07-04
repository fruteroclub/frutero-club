import { Button } from '@/components/ui/button'
import { SparklesIcon } from 'lucide-react'

export default function HeroSection() {
  return (
    <div className="relative w-full py-20 md:py-28">
      <div className="container mx-auto space-y-16 px-4 text-center">
        {/* Título Principal */}
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl leading-tight font-semibold text-foreground md:text-6xl lg:text-7xl">
            El club de{' '}
            <span className="inline-block -rotate-1 transform rounded-lg bg-accent px-4 py-2 text-white">
              Builders
            </span>
            <br />
            que crea{' '}
            <span className="inline-block rotate-1 transform rounded-lg bg-secondary px-4 py-2 text-white">
              Founders
            </span>
          </h1>
        </div>

        {/* CTA Button */}
        <div>
          <Button
            size="xl"
            className="transform rounded-full bg-primary px-16 py-8 text-3xl font-bold text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-primary/90"
          >
            Quiero unirme <SparklesIcon className="ml-2 h-6 w-6" />
          </Button>
        </div>

        {/* Subtítulo */}
        <h3 className="mx-auto max-w-2xl font-raleway text-muted-foreground">
          Cambia las reglas del juego y<br />
          <span className="font-bold text-secondary">hackea</span> tu vida
        </h3>
      </div>
    </div>
  )
}
