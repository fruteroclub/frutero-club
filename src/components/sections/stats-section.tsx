import StatCard from '@/components/stats/stat-card'

export default function StatsSection() {
  const stats = [
    {
      icon: '👥',
      number: '200+',
      description: 'miembros',
      color: 'orange' as const
    },
    {
      icon: '💰',
      number: '$2M+',
      description: 'recaudado',
      color: 'green' as const
    },
    {
      icon: '🚀',
      number: '25+',
      description: 'startups',
      color: 'pink' as const
    },
    {
      icon: '🏆',
      number: '40+',
      description: 'exits exitosos',
      color: 'orange' as const
    },
    {
      icon: '🎯',
      number: '15+',
      description: 'inversores',
      color: 'green' as const
    },
    {
      icon: '🌟',
      number: '150+',
      description: 'mentores',
      color: 'pink' as const
    }
  ]

  return (
    <section className="py-20 bg-frutero-light/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-frutero-dark mb-4">
            Nuestro <span className="text-frutero-orange">impacto</span> en números
          </h2>
          <p className="text-xl text-frutero-dark/70 max-w-2xl mx-auto">
            Una comunidad que transforma hackers en founders exitosos
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              number={stat.number}
              description={stat.description}
              color={stat.color}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 