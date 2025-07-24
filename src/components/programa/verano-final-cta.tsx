"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Clock,
  Shield,
  Star,
  Users,
  Trophy,
  Phone,
  Download,
  CreditCard,
  Calendar,
  ArrowRight,
  Sparkles,
  Globe,
  Zap,
  Heart,
  X,
  AlertCircle,
  DollarSign,
  Gift
} from 'lucide-react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CTAOption {
  id: string
  type: 'primary' | 'secondary' | 'tertiary'
  label: string
  description: string
  icon: React.ReactNode
  action: string
  urgent?: boolean
}

interface Guarantee {
  icon: React.ReactNode
  title: string
  description: string
  color: 'primary' | 'secondary' | 'accent'
}

interface PaymentOption {
  method: string
  description: string
  icon: React.ReactNode
  popular?: boolean
}

interface VeranoFinalCTAProps {
  className?: string
  applicationDeadline: Date
}

const ctaOptions: CTAOption[] = [
  {
    id: 'apply-now',
    type: 'primary',
    label: 'ASEGURAR CUPO AHORA',
    description: 'Aplicación completa en 5 minutos',
    icon: <Zap className="h-6 w-6" />,
    action: 'apply',
    urgent: true
  },
  {
    id: 'consultation',
    type: 'secondary',
    label: 'Hablar con Asesor',
    description: 'Consulta gratuita de 15 minutos',
    icon: <Phone className="h-5 w-5" />,
    action: 'consult'
  },
  {
    id: 'download-info',
    type: 'tertiary',
    label: 'Descargar Programa Completo',
    description: 'Información detallada del curriculum',
    icon: <Download className="h-5 w-5" />,
    action: 'download'
  }
]

const guarantees: Guarantee[] = [
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Éxito Garantizado',
    description: 'Repites gratis si no cumples objetivos',
    color: 'primary'
  },
  {
    icon: <Trophy className="h-8 w-8" />,
    title: 'Certificación Oficial',
    description: 'Impact Player Certification respaldada',
    color: 'secondary'
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Soporte Ilimitado',
    description: '30 días de mentorship post-programa',
    color: 'accent'
  },
  {
    icon: <DollarSign className="h-8 w-8" />,
    title: '100% Satisfacción',
    description: 'Devolución completa en 30 días',
    color: 'primary'
  }
]

const paymentOptions: PaymentOption[] = [
  {
    method: 'Pago en 3 Cuotas',
    description: 'Sin interés, $999 x 3 meses',
    icon: <CreditCard className="h-5 w-5" />,
    popular: true
  },
  {
    method: 'Pago Completo',
    description: '$2,997 (descuento $500)',
    icon: <Gift className="h-5 w-5" />
  },
  {
    method: 'Beca Parcial',
    description: 'Hasta 30% descuento disponible',
    icon: <Star className="h-5 w-5" />
  }
]

function CountdownTimer({ deadline }: { deadline: Date }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isUrgent, setIsUrgent] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = deadline.getTime() - now

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
      setIsUrgent(days < 2) // Urgent when less than 2 days
    }, 1000)

    return () => clearInterval(timer)
  }, [deadline])

  const timeUnits = [
    { label: 'Días', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Minutos', value: timeLeft.minutes },
    { label: 'Segundos', value: timeLeft.seconds }
  ]

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Clock className={cn('h-6 w-6', isUrgent ? 'text-red-500' : 'text-primary')} />
        <span className={cn('text-lg font-semibold', isUrgent && 'text-red-500')}>
          Aplicaciones cierran en:
        </span>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
        {timeUnits.map((unit) => (
          <motion.div
            key={unit.label}
            initial={{ scale: 1 }}
            animate={{
              scale: isUrgent && unit.label === 'Segundos' ? [1, 1.1, 1] : 1
            }}
            transition={{
              duration: 1,
              repeat: isUrgent && unit.label === 'Segundos' ? Infinity : 0
            }}
            className={cn(
              'p-4 rounded-lg text-center',
              isUrgent ? 'bg-red-500/10 border-red-500/20' : 'bg-primary/10 border-primary/20',
              'border-2'
            )}
          >
            <div className={cn(
              'text-3xl font-bold mb-1',
              isUrgent ? 'text-red-500' : 'text-primary'
            )}>
              {unit.value.toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-muted-foreground uppercase">
              {unit.label}
            </div>
          </motion.div>
        ))}
      </div>

      {isUrgent && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
        >
          <div className="flex items-center justify-center gap-2 text-red-500">
            <AlertCircle className="h-5 w-5" />
            <span className="font-semibold">¡Últimas horas! Solo quedan 8 cupos</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}

function CTAButtons({ onAction }: { onAction: (action: string) => void }) {
  return (
    <div className="space-y-4">
      {/* Primary CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          size="xl"
          onClick={() => onAction('apply')}
          className={cn(
            'w-full h-16 text-xl font-bold relative overflow-hidden',
            'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90',
            'transform hover:scale-105 transition-all duration-300',
            'animate-pulse'
          )}
        >
          <div className="flex items-center justify-center gap-3">
            <Zap className="h-6 w-6" />
            <span>ASEGURAR CUPO AHORA</span>
            <ArrowRight className="h-6 w-6" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]" />
        </Button>
        <p className="text-center text-sm text-muted-foreground mt-2">
          Aplicación completa en 5 minutos • Solo 8 cupos restantes
        </p>
      </motion.div>

      {/* Secondary CTAs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ctaOptions.slice(1).map((cta, i) => (
          <motion.div
            key={cta.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => onAction(cta.action)}
              className="w-full h-14 group hover:bg-primary/5 hover:border-primary/40"
            >
              <div className="flex items-center gap-3">
                <div className="text-primary group-hover:scale-110 transition-transform">
                  {cta.icon}
                </div>
                <div className="text-left">
                  <div className="font-semibold">{cta.label}</div>
                  <div className="text-xs text-muted-foreground">{cta.description}</div>
                </div>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function GuaranteesDisplay() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {guarantees.map((guarantee, i) => {
        const colorClasses = {
          primary: 'text-primary',
          secondary: 'text-secondary',
          accent: 'text-accent'
        }

        return (
          <motion.div
            key={guarantee.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className={cn('flex justify-center mb-3', colorClasses[guarantee.color])}>
              {guarantee.icon}
            </div>
            <h4 className="font-semibold mb-2">{guarantee.title}</h4>
            <p className="text-sm text-muted-foreground">{guarantee.description}</p>
          </motion.div>
        )
      })}
    </div>
  )
}

function PaymentOptionsDisplay() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-lg font-semibold mb-2">Opciones de Pago Flexibles</h4>
        <p className="text-muted-foreground">Elige la opción que mejor se adapte a ti</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {paymentOptions.map((option, i) => (
          <motion.div
            key={option.method}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className={cn(
              'relative h-full hover:shadow-lg transition-all duration-300',
              option.popular && 'ring-2 ring-primary'
            )}>
              {option.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    Más Popular
                  </span>
                </div>
              )}
              <CardContent className="p-6 text-center">
                <div className="text-primary mb-3 flex justify-center">
                  {option.icon}
                </div>
                <h5 className="font-semibold mb-2">{option.method}</h5>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ConsultationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    experience: '',
    goals: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Consultation request:', formData)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-card rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Consulta Gratuita</h3>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre completo</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">País</label>
                <select
                  required
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                >
                  <option value="">Selecciona tu país</option>
                  <option value="guatemala">Guatemala</option>
                  <option value="el-salvador">El Salvador</option>
                  <option value="honduras">Honduras</option>
                  <option value="nicaragua">Nicaragua</option>
                  <option value="costa-rica">Costa Rica</option>
                  <option value="panama">Panamá</option>
                  <option value="belize">Belice</option>
                  <option value="mexico">México</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Experiencia en desarrollo</label>
                <select
                  required
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                >
                  <option value="">Selecciona tu nivel</option>
                  <option value="junior">Junior (0-2 años)</option>
                  <option value="mid">Mid (2-5 años)</option>
                  <option value="senior">Senior (5+ años)</option>
                  <option value="lead">Tech Lead/Architect</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">¿Qué buscas lograr?</label>
                <textarea
                  required
                  rows={3}
                  className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  placeholder="Describe tus objetivos y cómo podemos ayudarte..."
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Calendar className="h-5 w-5 mr-2" />
                Programar Consulta Gratuita
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function VeranoFinalCTA({ className, applicationDeadline }: VeranoFinalCTAProps) {
  const [showConsultationModal, setShowConsultationModal] = useState(false)

  const handleAction = (action: string) => {
    switch (action) {
      case 'apply':
        // Redirect to application form
        window.location.href = '/programa/apply'
        break
      case 'consult':
        setShowConsultationModal(true)
        break
      case 'download':
        // Trigger download
        window.location.href = '/programa/brochure.pdf'
        break
      default:
        console.log('Unknown action:', action)
    }
  }

  return (
    <>
      <section className={cn(
        'relative py-20 md:py-32 overflow-hidden',
        'bg-gradient-to-br from-primary via-secondary to-accent',
        'text-primary-foreground',
        className
      )}>
        {/* Background Effects */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="h-8 w-8 text-yellow-300" />
                <h2 className="text-white">Tu Momento Es Ahora</h2>
                <Sparkles className="h-8 w-8 text-yellow-300" />
              </div>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6">
                No esperes más. El founder que serás en 21 días te está esperando.
                Únete a la élite de builders centroamericanos.
              </p>
              <div className="flex items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>Solo 8 cupos restantes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  <span>200+ aplicaciones recibidas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  <span>Próximo cohort: Enero 2026</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Countdown Timer */}
          <div className="mb-12">
            <CountdownTimer deadline={applicationDeadline} />
          </div>

          {/* Main CTAs */}
          <div className="max-w-2xl mx-auto mb-16">
            <CTAButtons onAction={handleAction} />
          </div>

          {/* Guarantees */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center mb-8"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                Garantías Que Respaldan Tu Inversión
              </h3>
              <p className="text-white/80">
                Sin riesgo. Sin excusas. Solo resultados.
              </p>
            </motion.div>
            <GuaranteesDisplay />
          </div>

          {/* Payment Options */}
          <div className="mb-16">
            <PaymentOptionsDisplay />
          </div>

          {/* Final Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center"
          >
            <Card className="max-w-4xl mx-auto bg-white/10 border-white/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">200+</div>
                    <div className="text-white/80 text-sm">Alumni exitosos</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">$2M+</div>
                    <div className="text-white/80 text-sm">Funding levantado</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">15+</div>
                    <div className="text-white/80 text-sm">Países representados</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-1">95%</div>
                    <div className="text-white/80 text-sm">Tasa de éxito</div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center justify-center gap-3 text-white">
                    <Heart className="h-6 w-6 text-red-400" />
                    <span className="text-lg">
                      Representa a Centroamérica en la escena tech global
                    </span>
                    <Heart className="h-6 w-6 text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={showConsultationModal}
        onClose={() => setShowConsultationModal(false)}
      />
    </>
  )
} 