import { Button } from '@/components/ui/button'
import { SparkleIcon } from 'lucide-react'

export default function HeroSection() {
  return (
    <div className="relative w-full py-20 md:py-32">
      <div className="container mx-auto space-y-16 px-4 text-center">
        {/* Título Principal */}
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl leading-tight font-semibold text-foreground md:text-6xl lg:text-7xl">
            La comunidad de{' '}
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
            className="transform rounded-full bg-primary px-16 py-8 text-2xl font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-primary/90"
          >
            <SparkleIcon className="mr-2 -ml-2 h-6 w-6" /> Únete
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
