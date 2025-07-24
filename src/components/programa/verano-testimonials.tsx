"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  Quote,
  Trophy,
  DollarSign,
  Users,
  MapPin,
  Star,
  TrendingUp,
  Award,
  Target,
  Rocket,
  Globe,
  User
} from 'lucide-react'

interface Achievement {
  icon: React.ReactNode
  label: string
  value: string
  color: 'primary' | 'secondary' | 'accent'
}

interface Testimonial {
  id: string
  name: string
  title: string
  company: string
  country: string
  flag: string
  quote: string
  achievements: Achievement[]
  transformation: string
  videoUrl?: string
  profileImage?: string
  featured: boolean
}

interface SuccessMetric {
  value: number
  label: string
  prefix?: string
  suffix?: string
  icon: React.ReactNode
  color: 'primary' | 'secondary' | 'accent'
}

interface VeranoTestimonialsProps {
  className?: string
}

const testimonials: Testimonial[] = [
  {
    id: "ana-rodriguez",
    name: "Ana Rodríguez",
    title: "CTO",
    company: "TechStartup",
    country: "Guatemala",
    flag: "🇬🇹",
    quote: "Pasé de ser estudiante a CTO en 8 meses. Frutero Club no solo me enseñó a programar, me enseñó a liderar. Ahora dirijo un equipo de 15 developers y acabamos de levantar $500K en nuestra Serie A.",
    transformation: "Estudiante → CTO en 8 meses",
    achievements: [
      { icon: <DollarSign className="h-4 w-4" />, label: "Funding", value: "$500K", color: "primary" },
      { icon: <Users className="h-4 w-4" />, label: "Team Size", value: "15", color: "secondary" },
      { icon: <TrendingUp className="h-4 w-4" />, label: "Growth", value: "8 meses", color: "accent" }
    ],
    profileImage: undefined,
    featured: true,
    videoUrl: "https://example.com/ana-testimonial"
  },
  {
    id: "carlos-mendoza",
    name: "Carlos Mendoza",
    title: "Founder",
    company: "InnovateLab",
    country: "El Salvador",
    flag: "🇸🇻",
    quote: "Mi startup generó $100K en revenue en el primer año. Todo comenzó con un hackathon en Frutero Club donde aprendí que las ideas no valen nada sin ejecución. Ahora tenemos 40 empleados y creciendo.",
    transformation: "Idea → 40-person company",
    achievements: [
      { icon: <DollarSign className="h-4 w-4" />, label: "Revenue", value: "$100K", color: "primary" },
      { icon: <Users className="h-4 w-4" />, label: "Employees", value: "40", color: "secondary" },
      { icon: <Trophy className="h-4 w-4" />, label: "Started", value: "Hackathon", color: "accent" }
    ],
    profileImage: undefined,
    featured: true
  },
  {
    id: "maria-gonzalez",
    name: "María González",
    title: "AI Lead",
    company: "UnicornCorp",
    country: "Costa Rica",
    flag: "🇨🇷",
    quote: "Gané mi primer hackathon siguiendo la metodología Frutero. Esa victoria me abrió puertas que nunca imaginé. Ahora lidero el equipo de IA en una unicornio en Silicon Valley.",
    transformation: "Hackathon winner → Silicon Valley",
    achievements: [
      { icon: <Award className="h-4 w-4" />, label: "Position", value: "AI Lead", color: "primary" },
      { icon: <Trophy className="h-4 w-4" />, label: "Hackathons", value: "Winner", color: "secondary" },
      { icon: <Globe className="h-4 w-4" />, label: "Location", value: "Silicon Valley", color: "accent" }
    ],
    profileImage: undefined,
    featured: true,
    videoUrl: "https://example.com/maria-testimonial"
  },
  {
    id: "diego-lopez",
    name: "Diego López",
    title: "DAO Council Member",
    company: "International DAO",
    country: "Honduras",
    flag: "🇭🇳",
    quote: "Frutero Club me dio la confianza para representar a Honduras en escenarios globales. Ahora soy el primer hondureño en el consejo de una DAO internacional y mentor de 50+ builders.",
    transformation: "Local developer → Global leader",
    achievements: [
      { icon: <Globe className="h-4 w-4" />, label: "Recognition", value: "International", color: "primary" },
      { icon: <Users className="h-4 w-4" />, label: "Mentees", value: "50+", color: "secondary" },
      { icon: <Award className="h-4 w-4" />, label: "First", value: "Hondureño", color: "accent" }
    ],
    profileImage: undefined,
    featured: false
  },
  {
    id: "sofia-herrera",
    name: "Sofía Herrera",
    title: "Founder",
    company: "SocialTech",
    country: "Nicaragua",
    flag: "🇳🇮",
    quote: "No solo cambié mi carrera, cambié mi vida. Frutero Club me conectó con mi red más valiosa. Tres de mis mejores amigos son cofundadores de mi startup.",
    transformation: "Solo developer → Community leader",
    achievements: [
      { icon: <Rocket className="h-4 w-4" />, label: "Startup", value: "Funded", color: "primary" },
      { icon: <Users className="h-4 w-4" />, label: "Network", value: "Strong", color: "secondary" },
      { icon: <Target className="h-4 w-4" />, label: "Cofounders", value: "3", color: "accent" }
    ],
    profileImage: undefined,
    featured: false
  },
  {
    id: "luis-martinez",
    name: "Luis Martínez",
    title: "Tech Lead",
    company: "FinTech Unicorn",
    country: "Panamá",
    flag: "🇵🇦",
    quote: "Después de Frutero Club, mi salario se triplicó en 6 meses. Pero lo más valioso fue aprender a pensar como founder. Ahora lidero la expansión de nuestra fintech en LATAM.",
    transformation: "Developer → Tech Lead LATAM",
    achievements: [
      { icon: <TrendingUp className="h-4 w-4" />, label: "Salary", value: "3x", color: "primary" },
      { icon: <MapPin className="h-4 w-4" />, label: "Region", value: "LATAM", color: "secondary" },
      { icon: <Star className="h-4 w-4" />, label: "Time", value: "6 meses", color: "accent" }
    ],
    profileImage: undefined,
    featured: false
  }
]

const successMetrics: SuccessMetric[] = [
  { value: 200, label: 'Developers Transformados', prefix: '+', icon: <Users className="h-6 w-6" />, color: 'primary' },
  { value: 2, label: 'Millones USD Levantados', prefix: '$', suffix: 'M+', icon: <DollarSign className="h-6 w-6" />, color: 'secondary' },
  { value: 25, label: 'Hackathons Ganados', prefix: '+', icon: <Trophy className="h-6 w-6" />, color: 'accent' },
  { value: 40, label: 'Startups Fundadas', prefix: '+', icon: <Rocket className="h-6 w-6" />, color: 'primary' },
  { value: 15, label: 'Países Representados', prefix: '+', icon: <Globe className="h-6 w-6" />, color: 'secondary' },
  { value: 150, label: 'Productos Enviados', prefix: '+', icon: <Target className="h-6 w-6" />, color: 'accent' }
]

function AnimatedCounter({ metric, delay = 0 }: { metric: SuccessMetric; delay?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = metric.value / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      current += increment
      step++

      if (step === steps) {
        setCount(metric.value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [metric.value])

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className={cn('flex justify-center mb-2', colorClasses[metric.color])}>
        {metric.icon}
      </div>
      <div className="text-3xl font-bold mb-1">
        {metric.prefix}
        {count}
        {metric.suffix}
      </div>
      <div className="text-sm text-muted-foreground">{metric.label}</div>
    </motion.div>
  )
}

function TestimonialCard({ testimonial, isActive = false }: { testimonial: Testimonial; isActive?: boolean }) {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <>
      <Card className={cn(
        'h-full transition-all duration-300 hover:shadow-lg',
        isActive ? 'ring-2 ring-primary' : ''
      )}>
        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                {testimonial.profileImage ? (
                  <Image
                    src={testimonial.profileImage}
                    alt={`${testimonial.name} profile`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to icon if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : (
                  <User className="h-8 w-8 text-muted-foreground" />
                )}
                {testimonial.profileImage && (
                  <User className="h-8 w-8 text-muted-foreground hidden" />
                )}
              </div>
              {testimonial.videoUrl && (
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
                  onClick={() => setShowVideo(true)}
                >
                  <Play className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{testimonial.name}</h4>
              <p className="text-sm text-muted-foreground">
                {testimonial.title} @ {testimonial.company}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {testimonial.country} {testimonial.flag}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="relative mb-4">
            <Quote className="absolute -top-2 -left-2 h-6 w-6 text-primary/20" />
            <blockquote className="text-sm italic pl-4 border-l-2 border-primary/20">
              {testimonial.quote}
            </blockquote>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-medium text-accent">
              🎯 {testimonial.transformation}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {testimonial.achievements.map((achievement, i) => (
                <div key={i} className="text-center p-2 rounded-lg bg-muted/30">
                  <div className={cn('flex justify-center mb-1', {
                    'text-primary': achievement.color === 'primary',
                    'text-secondary': achievement.color === 'secondary',
                    'text-accent': achievement.color === 'accent'
                  })}>
                    {achievement.icon}
                  </div>
                  <div className="text-xs font-bold">{achievement.value}</div>
                  <div className="text-xs text-muted-foreground">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && testimonial.videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative bg-card rounded-lg p-6 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => setShowVideo(false)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <Play className="h-12 w-12 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Video testimonial: {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.videoUrl}
                  </p>
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-semibold mb-1">{testimonial.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {testimonial.title} @ {testimonial.company}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Desktop: 3 cards visible */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => {
            const index = (currentIndex + i) % testimonials.length
            return (
              <TestimonialCard
                key={testimonials[index].id}
                testimonial={testimonials[index]}
                isActive={i === 1}
              />
            )
          })}
        </div>
      </div>

      {/* Mobile: 1 card visible */}
      <div className="md:hidden">
        <TestimonialCard
          testimonial={testimonials[currentIndex]}
          isActive={true}
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <Button variant="outline" size="icon" onClick={prevTestimonial}>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={cn(
                'w-2 h-2 rounded-full transition-colors',
                i === currentIndex ? 'bg-primary' : 'bg-muted'
              )}
            />
          ))}
        </div>

        <Button variant="outline" size="icon" onClick={nextTestimonial}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export function VeranoTestimonials({ className }: VeranoTestimonialsProps) {
  return (
    <section className={cn('pt-16 md:pt-8', className)}>
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4">
            Historias Reales de Transformación
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conoce a los builders que ya cambiaron sus vidas. Resultados reales
            de desarrolladores centroamericanos que se convirtieron en líderes tech.
          </p>
        </motion.div>
      </div>

      {/* Success Metrics */}
      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-bold mb-2">Éxitos Que Inspiran</h3>
          <p className="text-muted-foreground">
            La prueba está en nuestros alumni
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {successMetrics.map((metric, i) => (
            <AnimatedCounter key={metric.label} metric={metric} delay={i * 0.1} />
          ))}
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div className="mb-16">
        <TestimonialCarousel />
      </div>

      {/* Regional Representation */}
      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-bold mb-2">Representación Regional</h3>
          <p className="text-muted-foreground">
            Builders exitosos en toda Centroamérica
          </p>
        </motion.div>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            {/* Interactive Map Visualization */}
            <div className="aspect-video bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-lg relative overflow-hidden mb-6 border">
              {/* Map Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
                  <path d="M50 100 L100 80 L150 90 L200 85 L250 95 L300 90 L350 100" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
                  <path d="M80 50 L80 150 M120 40 L120 160 M160 45 L160 155 M200 40 L200 160 M240 45 L240 155 M280 50 L280 150 M320 55 L320 145" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,1" />
                </svg>
              </div>

              {/* Central America Outline */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-80 h-40">
                  {/* Guatemala */}
                  <div className="absolute top-4 left-8 group cursor-pointer">
                    <div className="w-3 h-3 bg-primary rounded-full shadow-lg animate-pulse"></div>
                    <div className="absolute -top-8 -left-6 bg-card border rounded px-2 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Guatemala 🇬🇹
                    </div>
                  </div>

                  {/* El Salvador */}
                  <div className="absolute top-8 left-12 group cursor-pointer">
                    <div className="w-3 h-3 bg-secondary rounded-full shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute -top-8 -left-8 bg-card border rounded px-2 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      El Salvador 🇸🇻
                    </div>
                  </div>

                  {/* Honduras */}
                  <div className="absolute top-6 left-16 group cursor-pointer">
                    <div className="w-3 h-3 bg-accent rounded-full shadow-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute -top-8 -left-6 bg-card border rounded px-2 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Honduras 🇭🇳
                    </div>
                  </div>

                  {/* Nicaragua */}
                  <div className="absolute top-12 left-20 group cursor-pointer">
                    <div className="w-3 h-3 bg-primary rounded-full shadow-lg animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                    <div className="absolute -top-8 -left-6 bg-card border rounded px-2 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Nicaragua 🇳🇮
                    </div>
                  </div>

                  {/* Costa Rica */}
                  <div className="absolute top-16 left-24 group cursor-pointer">
                    <div className="w-3 h-3 bg-secondary rounded-full shadow-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute -top-8 -left-8 bg-card border rounded px-2 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Costa Rica 🇨🇷
                    </div>
                  </div>

                  {/* Panama */}
                  <div className="absolute top-20 left-28 group cursor-pointer">
                    <div className="w-3 h-3 bg-accent rounded-full shadow-lg animate-pulse" style={{ animationDelay: '2.5s' }}></div>
                    <div className="absolute -top-8 -left-6 bg-card border rounded px-2 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Panamá 🇵🇦
                    </div>
                  </div>

                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 160">
                    <path d="M32 16 L48 32 L64 24 L80 48 L96 64 L112 80" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" opacity="0.3" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur border rounded-lg p-3">
                <div className="text-xs font-medium mb-2">Alumni Distribution</div>
                <div className="flex gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>High Impact</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Growing</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Emerging</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Country Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'Guatemala', flag: '🇬🇹', alumni: '25+', status: 'primary' },
                { name: 'El Salvador', flag: '🇸🇻', alumni: '18+', status: 'secondary' },
                { name: 'Honduras', flag: '🇭🇳', alumni: '12+', status: 'accent' },
                { name: 'Nicaragua', flag: '🇳🇮', alumni: '15+', status: 'primary' },
                { name: 'Costa Rica', flag: '🇨🇷', alumni: '22+', status: 'secondary' },
                { name: 'Panamá', flag: '🇵🇦', alumni: '10+', status: 'accent' }
              ].map((country, i) => (
                <motion.div
                  key={country.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    'text-center p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 cursor-pointer',
                    {
                      'border-primary/20 bg-primary/5 hover:border-primary/40': country.status === 'primary',
                      'border-secondary/20 bg-secondary/5 hover:border-secondary/40': country.status === 'secondary',
                      'border-accent/20 bg-accent/5 hover:border-accent/40': country.status === 'accent'
                    }
                  )}
                >
                  <div className="text-3xl mb-2">{country.flag}</div>
                  <div className="text-sm font-bold mb-1">{country.name}</div>
                  <div className={cn('text-lg font-bold mb-1', {
                    'text-primary': country.status === 'primary',
                    'text-secondary': country.status === 'secondary',
                    'text-accent': country.status === 'accent'
                  })}>
                    {country.alumni}
                  </div>
                  <div className="text-xs text-muted-foreground">Alumni Activos</div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center"
      >
        <Card className="max-w-2xl mx-auto border-accent/20 bg-accent/5">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">¿Listo Para Tu Transformación?</h3>
            <p className="text-muted-foreground mb-6">
              Únete a la próxima generación de founders centroamericanos.
              Tu historia de éxito podría ser la siguiente.
            </p>
            <Button size="lg" className="gap-2">
              <Rocket className="h-5 w-5" />
              Comenzar Mi Transformación
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
} 