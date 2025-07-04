export default function EventsSection() {
  const featuredEvent = {
    title: "Coworking Frutal",
    date: "1-3 Febrero 2025",
    description: "Co-host CB Flow",
    image: "/images/events/coworking-frutal.jpg",
    mascots: ["🍓", "🍉", "🍇", "🍌"]
  }

  const upcomingEvents = [
    {
      title: "Web3 Builders Bootcamp",
      subtitle: "BOOTCAMP INTENSIVO DE SOLIDITY",
      description: "Séptima sesión Stablecoins y oráculos",
      date: "15-20 Enero 2025",
      duration: "5 días intensivos",
      availability: "Cupo limitado",
      color: "dark",
      icon: "🌟"
    },
    {
      title: "AI Hackathon México",
      subtitle: "Open Call FRUTERO CLUB",
      description: "Crea una Prueba de Concepto con IA que resuelva un problema real",
      date: "1-3 Febrero 2025",
      prize: "$10K en premios",
      availability: "Registro abierto",
      color: "blue",
      icon: "🧠"
    },
    {
      title: "AgentCamp Demo Day",
      subtitle: "Founder Masterclass",
      description: "Aprende los secretos del fundraising",
      date: "15 Febrero 2025",
      topic: "Fundraising secrets",
      availability: "Solo para miembros",
      color: "purple",
      icon: "💼"
    }
  ]

  return (
    <section className="py-20 bg-frutero-light/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-frutero-dark mb-4">
            Eventos que <span className="text-frutero-orange">transforman</span> carreras
          </h2>
          <p className="text-xl text-frutero-dark/70 max-w-2xl mx-auto">
            Donde nacen las ideas y se forjan las conexiones
          </p>
        </div>

        {/* Featured Event */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-teal-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              {/* Título y co-hosts */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-6xl md:text-7xl font-bold mb-4 font-funnel">
                  FRUTERO
                  <br />
                  <span className="text-4xl md:text-5xl">CLUB</span>
                </h3>
                {/* Co-hosts y mascotas mejorados */}
                <div className="flex items-center gap-4 mt-8">
                  {/* Co-host badge */}
                  <div className="flex items-center gap-2 bg-white/30 rounded-full px-4 py-2 backdrop-blur-sm">
                    <span className="font-bold text-white">Co-host</span>
                    <span className="text-2xl">🍓</span>
                    <span className="text-2xl">🍉</span>
                  </div>
                  {/* CR badge */}
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-black text-white font-bold text-lg relative z-10">
                    CR
                    <span className="ml-2 text-2xl">🍇</span>
                  </div>
                  {/* Banana */}
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/30 backdrop-blur-sm">
                    <span className="text-2xl">🍌</span>
                  </div>
                </div>
              </div>
              {/* Título del evento y fecha */}
              <div className="flex-1 flex flex-col items-end justify-center">
                <h4 className="text-2xl md:text-3xl font-bold mb-4">
                  Coworking Frutal
                </h4>
                <div className="bg-white/30 rounded-2xl px-6 py-3 flex items-center gap-2">
                  <span className="text-2xl">📅</span>
                  <span className="text-frutero-orange font-bold text-lg">1-3 Febrero 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-frutero-dark mb-8 text-center">
            Próximos <span className="text-frutero-orange">eventos</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-gray-100">
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    event.color === 'dark' ? 'bg-frutero-dark' :
                    event.color === 'blue' ? 'bg-blue-500' :
                    'bg-purple-500'
                  }`}>
                    <span className="text-2xl">{event.icon}</span>
                  </div>
                  <h4 className="text-xl font-bold text-frutero-dark mb-2">
                    {event.title}
                  </h4>
                  <p className="text-sm text-frutero-orange font-bold uppercase tracking-wide mb-3">
                    {event.subtitle}
                  </p>
                  <p className="text-frutero-dark/70 text-sm mb-4">
                    {event.description}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-frutero-orange">📅</span>
                    <span className="text-sm font-medium text-frutero-dark">
                      {event.date}
                    </span>
                  </div>
                  
                  {event.duration && (
                    <div className="flex items-center gap-2">
                      <span className="text-frutero-orange">⏱️</span>
                      <span className="text-sm font-medium text-frutero-dark">
                        {event.duration}
                      </span>
                    </div>
                  )}
                  
                  {event.prize && (
                    <div className="flex items-center gap-2">
                      <span className="text-frutero-orange">💰</span>
                      <span className="text-sm font-medium text-frutero-dark">
                        {event.prize}
                      </span>
                    </div>
                  )}
                  
                  {event.topic && (
                    <div className="flex items-center gap-2">
                      <span className="text-frutero-orange">🎯</span>
                      <span className="text-sm font-medium text-frutero-dark">
                        {event.topic}
                      </span>
                    </div>
                  )}
                  
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    event.availability === 'Cupo limitado' ? 'bg-frutero-orange/20 text-frutero-orange' :
                    event.availability === 'Registro abierto' ? 'bg-frutero-green/20 text-frutero-green' :
                    'bg-frutero-pink/20 text-frutero-pink'
                  }`}>
                    {event.availability}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold text-frutero-dark mb-4">
              ¿Listo para tu próximo evento?
            </h3>
            <p className="text-frutero-dark/70 mb-6">
              Regístrate y no te pierdas las mejores oportunidades
            </p>
            <button className="bg-frutero-orange hover:bg-frutero-orange/90 text-white px-8 py-4 rounded-full font-bold shadow-lg transform hover:scale-105 transition-all duration-200">
              Ver todos los eventos 🎪
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 