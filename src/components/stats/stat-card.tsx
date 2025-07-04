interface StatCardProps {
  icon: string
  number: string
  description: string
  color?: 'orange' | 'green' | 'pink' | 'dark'
}

export default function StatCard({ icon, number, description, color = 'orange' }: StatCardProps) {
  const colorClasses = {
    orange: 'border-frutero-orange bg-frutero-orange/10',
    green: 'border-frutero-green bg-frutero-green/10',
    pink: 'border-frutero-pink bg-frutero-pink/10',
    dark: 'border-frutero-dark bg-frutero-dark/10'
  }

  const textColorClasses = {
    orange: 'text-frutero-orange',
    green: 'text-frutero-green',
    pink: 'text-frutero-pink',
    dark: 'text-frutero-dark'
  }

  return (
    <div className={`rounded-2xl border-2 p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${colorClasses[color]}`}>
      <div className="text-3xl mb-3">{icon}</div>
      <div className={`text-2xl md:text-3xl font-bold mb-2 ${textColorClasses[color]}`}>
        {number}
      </div>
      <p className="text-sm md:text-base text-frutero-dark/70 font-medium">
        {description}
      </p>
    </div>
  )
} 