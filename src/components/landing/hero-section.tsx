import { Button } from '@/components/ui/button'
import { SparklesIcon } from 'lucide-react'

export default function HeroSection() {
  return (
    <div className="relative w-full py-28 lg:pt-20">
      <div className="container mx-auto space-y-16 lg:space-y-8 px-4 text-center">
        {/* Título Principal */}
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl leading-tight font-semibold text-foreground md:text-5xl">
            El club de{' '}
            <span className="inline-block -rotate-2 transform rounded-lg bg-accent px-4 py-2 text-white">
              Builders
            </span>
            <br />
            que crea{' '}
            <span className="inline-block rotate-2 transform rounded-lg bg-secondary px-4 py-2 text-white">
              Founders
            </span>
          </h1>
        </div>

        <p className="text-muted-foreground text-2xl md:text-3xl lg:text-2xl md:font-medium lg:font-medium">
          Desarrolla tu potencial y<br /> construye tu propio futuro
        </p>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button
            size="xl"
            className="transform rounded-full bg-primary lg:px-14 lg:py-6 text-2xl font-medium text-white shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:bg-primary/90"
          >
            Quiero unirme <SparklesIcon className="ml-2 h-6 w-6" />
          </Button>
        </div>

        {/* Subtítulo */}
        <h3 className="mx-auto max-w-2xl text-muted-foreground leading-normal text-left md:text-2xl">
          🌱 Sube de nivel<br />
          🛠️ Cambia las reglas<br />
          🏆 <span className="font-bold underline underline-offset-4 decoration-secondary decoration-4">Hackea</span> tu vida
        </h3>
      </div>
    </div>
  )
}
