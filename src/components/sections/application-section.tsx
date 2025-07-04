export default function ApplicationSection() {
  const eligibilityRequirements = [
    {
      title: "Perfil técnico o interés genuino en tech",
      icon: "⚡"
    },
    {
      title: "Mentalidad de builder, no de consumidor", 
      icon: "🛠️"
    },
    {
      title: "Compromiso con crecimiento y comunidad",
      icon: "🌱"
    },
    {
      title: "Disposición para contribuir y colaborar",
      icon: "🤝"
    }
  ]

  const applicationSteps = [
    {
      title: "Completa el formulario",
      description: "(5 minutos)",
      icon: "📝",
      color: "orange"
    },
    {
      title: "Review de perfil y portfolio",
      description: "",
      icon: "👀",
      color: "green"
    },
    {
      title: "Entrevista técnica/cultural",
      description: "(30 min)",
      icon: "💬",
      color: "pink"
    },
    {
      title: "Onboarding y bienvenida",
      description: "",
      icon: "🎉",
      color: "orange"
    },
    {
      title: "Proceso completo: 1-2 semanas",
      description: "",
      icon: "⏰",
      color: "green"
    }
  ]

  return (
    <section className="py-20 bg-frutero-light/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-frutero-dark mb-4">
            ¿Listo para <span className="text-frutero-orange">unirte</span> a la elite?
          </h2>
          <p className="text-xl text-frutero-dark/70 max-w-2xl mx-auto">
            El proceso de selección garantiza la calidad de nuestra comunidad
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Eligibility Requirements */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-frutero-dark mb-6 text-center">
                ¿Quién puede aplicar?
              </h3>
              
              <div className="space-y-6">
                {eligibilityRequirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-frutero-orange/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-lg">{requirement.icon}</span>
                    </div>
                    <div>
                      <p className="text-frutero-dark font-medium leading-relaxed">
                        {requirement.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-frutero-green/10 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">💡</span>
                  <h4 className="font-bold text-frutero-green">Tip importante</h4>
                </div>
                <p className="text-sm text-frutero-dark/70">
                  No necesitas ser un experto, pero sí tener ganas reales de aprender, 
                  contribuir y hacer crecer la comunidad tech.
                </p>
              </div>
            </div>

            {/* Application Process */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-frutero-dark mb-6 text-center">
                Proceso de aplicación
              </h3>
              
              <div className="space-y-6">
                {applicationSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                      step.color === 'orange' ? 'bg-frutero-orange/20' :
                      step.color === 'green' ? 'bg-frutero-green/20' :
                      'bg-frutero-pink/20'
                    }`}>
                      <span className="text-lg">{step.icon}</span>
                    </div>
                    <div>
                      <p className="text-frutero-dark font-medium">
                        {step.title}
                      </p>
                      {step.description && (
                        <p className="text-sm text-frutero-orange font-medium mt-1">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-frutero-orange/10 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">⚡</span>
                  <h4 className="font-bold text-frutero-orange">Proceso rápido</h4>
                </div>
                <p className="text-sm text-frutero-dark/70">
                  Nuestro proceso está optimizado para ser eficiente. 
                  La mayoría de aplicaciones se procesan en menos de una semana.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-frutero-orange to-frutero-pink rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Cumples con el perfil? ¡Aplica ahora!
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Únete a la comunidad más exclusiva de builders y founders en LATAM
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-frutero-dark hover:bg-gray-100 px-8 py-4 rounded-full font-bold shadow-lg transform hover:scale-105 transition-all duration-200">
                Comenzar aplicación 🚀
              </button>
              <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-bold transition-all duration-200">
                Hablar con un miembro 💬
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-frutero-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="text-2xl font-bold text-frutero-green mb-2">85%</h4>
              <p className="text-sm text-frutero-dark/70">Tasa de aceptación</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-frutero-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="text-2xl font-bold text-frutero-orange mb-2">3 días</h4>
              <p className="text-sm text-frutero-dark/70">Tiempo promedio</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-frutero-pink rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h4 className="text-2xl font-bold text-frutero-pink mb-2">4.9/5</h4>
              <p className="text-sm text-frutero-dark/70">Satisfacción del proceso</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 