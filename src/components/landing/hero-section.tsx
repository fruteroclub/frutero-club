import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <section className="relative w-full py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8">
          {/* Mascota */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 relative">
              <div className="w-full h-full bg-frutero-green rounded-full flex items-center justify-center shadow-lg">
                <span className="text-6xl md:text-7xl">🥑</span>
              </div>
              {/* Decoración */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-frutero-orange rounded-full"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-frutero-pink rounded-full"></div>
            </div>
          </div>
          
          {/* Título Principal */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-frutero-dark leading-tight">
              La comunidad de{' '}
              <span className="bg-frutero-green text-white px-4 py-2 rounded-lg inline-block transform -rotate-1">
                Builders
              </span>
              <br />
              que crea{' '}
              <span className="bg-frutero-pink text-white px-4 py-2 rounded-lg inline-block transform rotate-1">
                Founders
              </span>
            </h1>
          </div>
          
          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-frutero-dark/70 max-w-2xl mx-auto">
            Nuestros <span className="font-bold text-frutero-orange">números</span> hablan
          </p>
          
          {/* CTA Button */}
          <div className="pt-8">
            <Button 
              size="lg" 
              className="bg-frutero-orange hover:bg-frutero-orange/90 text-white px-8 py-4 text-lg font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Únete al Club 🚀
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 