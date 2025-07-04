export default function CommunitySection() {
  const benefits = [
    {
      title: 'Networking Exclusivo',
      description: 'Conecta con founders, inversionistas y expertos de la industria',
      icon: '🤝',
      color: 'green'
    },
    {
      title: 'Mentorías Personalizadas',
      description: 'Recibe guidance de fundadores exitosos que ya pasaron por tu proceso',
      icon: '🧭',
      color: 'orange'
    },
    {
      title: 'Recursos Premium',
      description: 'Acceso a herramientas, templates y recursos exclusivos para startups',
      icon: '🛠️',
      color: 'pink'
    },
    {
      title: 'Eventos Privados',
      description: 'Participa en eventos exclusivos, pitch sessions y demo days',
      icon: '🎪',
      color: 'green'
    },
    {
      title: 'Funding Opportunities',
      description: 'Acceso directo a inversionistas y oportunidades de financiamiento',
      icon: '💰',
      color: 'orange'
    },
    {
      title: 'Community Support',
      description: 'Una comunidad activa que te apoya en cada paso de tu journey',
      icon: '💚',
      color: 'pink'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-frutero-light to-frutero-green/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-frutero-dark mb-4">
            ¿Qué hace especial a{' '}
            <span className="text-frutero-orange">Frutero Club</span>?
          </h2>
          <p className="text-xl text-frutero-dark/70 max-w-2xl mx-auto">
            Más que una comunidad, somos un ecosistema completo para tu crecimiento
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                benefit.color === 'green' ? 'bg-frutero-green/20' :
                benefit.color === 'orange' ? 'bg-frutero-orange/20' :
                'bg-frutero-pink/20'
              }`}>
                <span className="text-2xl">{benefit.icon}</span>
              </div>
              
              <h3 className="text-xl font-bold text-frutero-dark mb-3">
                {benefit.title}
              </h3>
              
              <p className="text-frutero-dark/70 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonio */}
        <div className="mt-20 text-center">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-frutero-orange rounded-full flex items-center justify-center">
                <span className="text-2xl">🥑</span>
              </div>
            </div>
            
            <blockquote className="text-xl md:text-2xl text-frutero-dark italic mb-6">
              "Frutero Club no solo me conectó con los recursos que necesitaba, sino que me dio la comunidad y mentoría que transformó mi idea en una startup exitosa"
            </blockquote>
            
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-frutero-green rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">JP</span>
              </div>
              <div className="text-left">
                <p className="font-bold text-frutero-dark">Juan Pérez</p>
                <p className="text-frutero-dark/70">CEO @ TechStartup</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 