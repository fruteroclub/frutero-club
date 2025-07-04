export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        'Pasé de ser estudiante a CTO en 8 meses. Frutero Club no solo me enseñó a programar, me enseñó a liderar.',
      name: 'Ana Rodríguez',
      role: 'CTO @ TechStartup',
      achievement: 'Levantó $500K en funding',
      avatar: '🌱',
      color: 'green',
    },
    {
      quote:
        'Mi startup generó $100K en revenue en el primer año. Todo comenzó con un hackathon en Frutero Club.',
      name: 'Carlos Mendoza',
      role: 'Founder @ InnovateLab',
      achievement: '40 empleados y creciendo',
      avatar: '🚗',
      color: 'blue',
    },
    {
      quote:
        'Gané mi primer hackathon siguiendo la metodología Frutero. Ahora lidero el equipo de IA en una unicornio.',
      name: 'María González',
      role: 'AI Lead @ UnicornCorp',
      achievement: 'Ex-Googler, MIT graduate',
      avatar: '🍉',
      color: 'pink',
    },
  ]

  return (
    <section className="page container">
      <div className="section">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-frutero-dark md:text-4xl lg:text-5xl">
            Historias <span className="text-frutero-orange">reales</span> de{' '}
            <span className="text-frutero-orange">transformación</span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-frutero-dark/70">
            De hackers con potencial a founders con éxito
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="mb-6">
                <blockquote className="text-lg leading-relaxed text-frutero-dark italic">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
              </div>

              <div className="mb-4 flex items-center space-x-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    testimonial.color === 'green'
                      ? 'bg-frutero-green'
                      : testimonial.color === 'blue'
                        ? 'bg-blue-500'
                        : 'bg-frutero-pink'
                  }`}
                >
                  <span className="text-sm font-bold text-white">
                    {testimonial.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-frutero-dark">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-frutero-dark/70">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-frutero-orange/10 p-3">
                <p className="text-sm font-medium text-frutero-orange">
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
