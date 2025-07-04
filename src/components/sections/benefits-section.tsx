export default function BenefitsSection() {
  const benefits = [
    {
      title: "Acceso prioritario",
      description: "Eventos, grants y oportunidades antes que nadie",
      icon: "👑",
      color: "orange"
    },
    {
      title: "Monetización directa", 
      description: "Herramientas y conexiones para generar ingresos",
      icon: "💰",
      color: "green"
    },
    {
      title: "Fast track",
      description: "Acelera tu carrera 3x más rápido",
      icon: "📈",
      color: "pink"
    },
    {
      title: "Red global",
      description: "Conexiones internacionales en 15+ países",
      icon: "🌍",
      color: "orange"
    },
    {
      title: "Recursos premium",
      description: "Cursos, templates y herramientas exclusivas",
      icon: "🛠️",
      color: "green"
    },
    {
      title: "Reputación elite",
      description: "Credibilidad instant en el ecosistema tech",
      icon: "💎",
      color: "pink"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-frutero-dark mb-4">
            Beneficios <span className="text-frutero-orange">exclusivos</span> para miembros
          </h2>
          <p className="text-xl text-frutero-dark/70 max-w-2xl mx-auto">
            Acceso a oportunidades que no encontrarás en ningún otro lugar
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-2xl border-2 border-gray-100 p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
                benefit.color === 'orange' ? 'bg-frutero-orange/20' :
                benefit.color === 'green' ? 'bg-frutero-green/20' :
                'bg-frutero-pink/20'
              }`}>
                <span className="text-3xl">{benefit.icon}</span>
              </div>
              
              <h3 className={`text-xl font-bold mb-3 ${
                benefit.color === 'orange' ? 'text-frutero-orange' :
                benefit.color === 'green' ? 'text-frutero-green' :
                'text-frutero-pink'
              }`}>
                {benefit.title}
              </h3>
              
              <p className="text-frutero-dark/70 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA adicional */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-frutero-orange/10 to-frutero-pink/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-frutero-dark mb-4">
              ¿Listo para acceder a todos estos beneficios?
            </h3>
            <p className="text-frutero-dark/70 mb-6 max-w-2xl mx-auto">
              Únete a la comunidad más exclusiva de builders y founders en LATAM
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-frutero-orange hover:bg-frutero-orange/90 text-white px-8 py-4 rounded-full font-bold shadow-lg transform hover:scale-105 transition-all duration-200">
                Aplicar ahora 🚀
              </button>
              <button className="border-2 border-frutero-orange text-frutero-orange hover:bg-frutero-orange/10 px-8 py-4 rounded-full font-bold transition-all duration-200">
                Ver más detalles 📋
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 