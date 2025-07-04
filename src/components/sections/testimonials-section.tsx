export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Pasé de ser estudiante a CTO en 8 meses. Frutero Club no solo me enseñó a programar, me enseñó a liderar.",
      name: "Ana Rodríguez",
      role: "CTO @ TechStartup",
      achievement: "Levantó $500K en funding",
      avatar: "🌱",
      color: "green"
    },
    {
      quote: "Mi startup generó $100K en revenue en el primer año. Todo comenzó con un hackathon en Frutero Club.",
      name: "Carlos Mendoza", 
      role: "Founder @ InnovateLab",
      achievement: "40 empleados y creciendo",
      avatar: "🚗",
      color: "blue"
    },
    {
      quote: "Gané mi primer hackathon siguiendo la metodología Frutero. Ahora lidero el equipo de IA en una unicornio.",
      name: "María González",
      role: "AI Lead @ UnicornCorp", 
      achievement: "Ex-Googler, MIT graduate",
      avatar: "🍉",
      color: "pink"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-frutero-dark mb-4">
            Historias <span className="text-frutero-orange">reales</span> de{' '}
            <span className="text-frutero-orange">transformación</span>
          </h2>
          <p className="text-xl text-frutero-dark/70 max-w-2xl mx-auto">
            De hackers con potencial a founders con éxito
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="mb-6">
                <blockquote className="text-lg text-frutero-dark leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  testimonial.color === 'green' ? 'bg-frutero-green' :
                  testimonial.color === 'blue' ? 'bg-blue-500' :
                  'bg-frutero-pink'
                }`}>
                  <span className="text-white font-bold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-frutero-dark">{testimonial.name}</p>
                  <p className="text-frutero-dark/70 text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="bg-frutero-orange/10 rounded-lg p-3">
                <p className="text-frutero-orange font-medium text-sm">
                  {testimonial.achievement}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 