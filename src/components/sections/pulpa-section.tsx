export default function PulpaSection() {
  const benefits = [
    {
      title: "Gana $PULPA",
      description: "Por contribuir, enseñar y ayudar a la comunidad",
      icon: "✨",
      position: "left"
    },
    {
      title: "Niveles de acceso",
      description: "Más PULPA = más beneficios y reconocimiento",
      icon: "📈",
      position: "left"
    },
    {
      title: "Participa en governance",
      description: "Vota en decisiones importantes del club",
      icon: "🗳️",
      position: "right"
    },
    {
      title: "Desbloquea rewards",
      description: "Acceso a eventos exclusivos y oportunidades",
      icon: "🎁",
      position: "right"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-frutero-dark mb-4">
            <span className="text-frutero-orange">$PULPA</span>: Tu{' '}
            <span className="text-frutero-orange">reputación</span> tiene{' '}
            <span className="text-frutero-orange">valor</span>
          </h2>
          <p className="text-xl text-frutero-dark/70 max-w-2xl mx-auto">
            El token que convierte tus contribuciones en oportunidades
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8">
            {/* Left Benefits */}
            <div className="flex-1 space-y-8">
              {benefits.filter(b => b.position === 'left').map((benefit, index) => (
                <div key={index} className="text-center lg:text-right">
                  <div className="flex items-center justify-center lg:justify-end gap-4 mb-4">
                    <div className="order-2 lg:order-1">
                      <h3 className="text-xl font-bold text-frutero-orange mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-frutero-dark/70">
                        {benefit.description}
                      </p>
                    </div>
                    <div className="order-1 lg:order-2 w-12 h-12 bg-frutero-orange/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">{benefit.icon}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Centro - Token y Mascotas */}
            <div className="flex-shrink-0 relative">
              <div className="w-40 h-40 bg-gradient-to-br from-frutero-orange to-yellow-400 rounded-full flex items-center justify-center shadow-2xl relative">
                <div className="w-32 h-32 bg-yellow-300 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-frutero-dark">$</span>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-frutero-green rounded-full flex items-center justify-center">
                  <span className="text-lg">✨</span>
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-frutero-pink rounded-full flex items-center justify-center">
                  <span className="text-lg">⭐</span>
                </div>
                <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-frutero-green rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-frutero-orange rounded-full"></div>
              </div>
              
              {/* Mascotas */}
              <div className="absolute -bottom-16 -left-16">
                <div className="w-16 h-16 bg-frutero-pink rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🍉</span>
                </div>
              </div>
              
              <div className="absolute -bottom-16 -right-16">
                <div className="w-16 h-16 bg-frutero-orange rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🍍</span>
                </div>
              </div>
            </div>

            {/* Right Benefits */}
            <div className="flex-1 space-y-8">
              {benefits.filter(b => b.position === 'right').map((benefit, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-frutero-orange/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">{benefit.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-frutero-orange mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-frutero-dark/70">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-frutero-orange to-frutero-pink rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Listo para empezar a ganar $PULPA?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Únete a la comunidad y comienza a construir tu reputación mientras ayudas a otros
            </p>
            <button className="bg-white text-frutero-dark hover:bg-gray-100 px-8 py-4 rounded-full font-bold shadow-lg transform hover:scale-105 transition-all duration-200">
              Comenzar a ganar $PULPA 🚀
            </button>
          </div>
        </div>

        {/* Info adicional */}
        <div className="mt-16 bg-frutero-light/50 rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-16 h-16 bg-frutero-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h4 className="font-bold text-frutero-dark mb-2">Rangos Exclusivos</h4>
              <p className="text-sm text-frutero-dark/70">
                Desbloquea rangos especiales según tu $PULPA
              </p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-frutero-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-bold text-frutero-dark mb-2">Misiones Semanales</h4>
              <p className="text-sm text-frutero-dark/70">
                Completa misiones y gana $PULPA extra
              </p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-frutero-pink rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h4 className="font-bold text-frutero-dark mb-2">Leaderboard</h4>
              <p className="text-sm text-frutero-dark/70">
                Compite con otros miembros por el top
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 