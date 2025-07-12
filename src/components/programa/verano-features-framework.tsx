"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Check,
  X,
  Star,
  Zap,
  Code,
  Users,
  Trophy,
  Shield,
  Rocket,
  Brain,
  Globe,
  Target,
  Award,
  DollarSign,
  Clock,
  BookOpen,
  Lightbulb,
  TrendingUp,
  ChevronRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface Feature {
  id: string
  title: string
  description: string
  benefits: string[]
  differentiator: string
  icon: React.ReactNode
  color: 'primary' | 'secondary' | 'accent'
}

interface Tool {
  name: string
  description: string
  value: number
  category: 'ai' | 'development' | 'blockchain'
  icon: React.ReactNode
  features: string[]
}

interface ComparisonItem {
  feature: string
  verano: boolean | string
  bootcamp: boolean | string
  online: boolean | string
  self: boolean | string
  highlight?: boolean
}

interface MethodologyPhase {
  phase: number
  title: string
  subtitle: string
  duration: string
  description: string
  outcomes: string[]
  certification: string
  color: 'primary' | 'secondary' | 'accent'
}

interface VeranoFeaturesFrameworkProps {
  className?: string
}

const coreFeatures: Feature[] = [
  {
    id: 'ai-accelerated',
    title: 'AI-Accelerated Development',
    description: 'Domina el desarrollo 10x más rápido con herramientas de IA de última generación',
    benefits: [
      'Cursor IDE Mastery para coding acelerado',
      'Prompt Engineering avanzado',
      'Code Generation automatizado',
      'Debugging con AI assistance',
      'Documentación automática'
    ],
    differentiator: 'Única metodología que integra AI desde día 1',
    icon: <Brain className="h-8 w-8" />,
    color: 'primary'
  },
  {
    id: 'real-world-apps',
    title: 'Real-World Application Building',
    description: 'Construye aplicaciones reales con usuarios reales y feedback inmediato',
    benefits: [
      'Farcaster Mini Apps con usuarios activos',
      'Base Blockchain integration',
      'Full-Stack con NextJS + PostgreSQL',
      'Production deployment en Vercel',
      'User acquisition y métricas reales'
    ],
    differentiator: 'Proyectos reales, no demos académicos',
    icon: <Code className="h-8 w-8" />,
    color: 'secondary'
  },
  {
    id: 'competition-ready',
    title: 'Competition-Ready Launch',
    description: 'Prepárate para competir y ganar en hackathons y concursos internacionales',
    benefits: [
      'Onchain Summer submission garantizada',
      'Professional polish para jueces',
      'Demo video production',
      'Marketing strategy multi-canal',
      'Press kit profesional'
    ],
    differentiator: 'Única garantía de participación competitiva',
    icon: <Trophy className="h-8 w-8" />,
    color: 'accent'
  },
  {
    id: 'elite-community',
    title: 'Elite Community Access',
    description: 'Únete a una red exclusiva de 200+ builders exitosos en 15+ países',
    benefits: [
      '24/7 Discord support instant',
      'Weekly office hours (12 PM & 8 PM CST)',
      'Peer learning groups',
      'Alumni network de 200+ builders',
      'Regional representation LATAM'
    ],
    differentiator: 'La red más valiosa de builders en LATAM',
    icon: <Users className="h-8 w-8" />,
    color: 'primary'
  },
  {
    id: 'career-acceleration',
    title: 'Career Acceleration',
    description: 'Acelera tu carrera con portfolio profesional y conexiones estratégicas',
    benefits: [
      'Portfolio con 3 proyectos profesionales',
      'GitHub showcase optimizado',
      'LinkedIn optimization completa',
      'Job placement support',
      'Startup guidance y mentorship'
    ],
    differentiator: 'Resultados de carrera comprobados',
    icon: <Rocket className="h-8 w-8" />,
    color: 'secondary'
  },
  {
    id: 'certification',
    title: 'Certification & Credentials',
    description: 'Obtén certificaciones reconocidas que validan tu expertise técnico',
    benefits: [
      'Impact Player Certification',
      'Blockchain Competency verified',
      'AI Development skills',
      'Full-Stack proficiency',
      'Launch Excellence credential'
    ],
    differentiator: 'Certificaciones exclusivas de Frutero Club',
    icon: <Award className="h-8 w-8" />,
    color: 'accent'
  }
]

const toolStack: Tool[] = [
  // AI Tools
  { name: 'Cursor IDE Pro', description: 'AI-powered code editor', value: 240, category: 'ai', icon: <Brain className="h-6 w-6" />, features: ['AI autocomplete', 'Code generation', 'Smart refactoring'] },
  { name: 'ChatGPT Plus', description: 'Advanced AI assistant', value: 240, category: 'ai', icon: <Brain className="h-6 w-6" />, features: ['GPT-4 access', 'Code debugging', 'Architecture planning'] },
  { name: 'Claude Pro', description: 'Complex reasoning AI', value: 240, category: 'ai', icon: <Brain className="h-6 w-6" />, features: ['Long context', 'Code analysis', 'Documentation'] },
  { name: 'GitHub Copilot', description: 'AI pair programmer', value: 120, category: 'ai', icon: <Code className="h-6 w-6" />, features: ['Code suggestions', 'Test generation', 'Comments'] },

  // Development Tools
  { name: 'Vercel Pro', description: 'Premium deployment', value: 240, category: 'development', icon: <Globe className="h-6 w-6" />, features: ['Edge functions', 'Analytics', 'Team collaboration'] },
  { name: 'Supabase Pro', description: 'Backend as a service', value: 300, category: 'development', icon: <Code className="h-6 w-6" />, features: ['PostgreSQL', 'Auth', 'Real-time'] },
  { name: 'Figma Pro', description: 'Design collaboration', value: 180, category: 'development', icon: <Target className="h-6 w-6" />, features: ['Advanced prototyping', 'Dev handoff', 'Design systems'] },
  { name: 'Mixpanel Pro', description: 'Product analytics', value: 360, category: 'development', icon: <TrendingUp className="h-6 w-6" />, features: ['User tracking', 'Funnel analysis', 'Cohort reports'] },

  // Blockchain Tools
  { name: 'Base Network Credits', description: 'Layer 2 blockchain', value: 400, category: 'blockchain', icon: <Globe className="h-6 w-6" />, features: ['Low fees', 'Fast transactions', 'Ethereum compatible'] },
  { name: 'Farcaster Frame Tools', description: 'Social blockchain apps', value: 300, category: 'blockchain', icon: <Users className="h-6 w-6" />, features: ['Mini apps', 'Social features', 'Decentralized'] },
  { name: 'Web3 Development Kit', description: 'Blockchain integration', value: 500, category: 'blockchain', icon: <Shield className="h-6 w-6" />, features: ['Wallet integration', 'Smart contracts', 'DeFi protocols'] }
]

const comparisonData: ComparisonItem[] = [
  { feature: 'AI-Enhanced Learning', verano: true, bootcamp: false, online: false, self: false, highlight: true },
  { feature: 'Real Competition Participation', verano: true, bootcamp: false, online: false, self: false, highlight: true },
  { feature: 'Blockchain Integration', verano: true, bootcamp: false, online: 'Limited', self: false, highlight: true },
  { feature: 'Regional Focus & Network', verano: true, bootcamp: false, online: false, self: false, highlight: true },
  { feature: 'Founder Mentality Training', verano: true, bootcamp: 'Limited', online: false, self: false, highlight: true },
  { feature: 'Live Mentorship', verano: '24/7', bootcamp: 'Limited', online: false, self: false },
  { feature: 'Peer Collaboration', verano: true, bootcamp: true, online: 'Limited', self: false },
  { feature: 'Real Product Launch', verano: true, bootcamp: false, online: false, self: 'Maybe' },
  { feature: 'Career Placement Support', verano: true, bootcamp: 'Basic', online: false, self: false },
  { feature: 'Success Guarantee', verano: true, bootcamp: false, online: false, self: false, highlight: true },
  { feature: 'Premium Tools Included', verano: '$2,400+', bootcamp: 'Basic', online: 'None', self: 'None', highlight: true },
  { feature: 'Time to Results', verano: '21 days', bootcamp: '3-6 months', online: 'Variable', self: '6+ months' }
]

const methodologyPhases: MethodologyPhase[] = [
  {
    phase: 1,
    title: 'AI-Powered Foundations',
    subtitle: 'Fundamentos Potenciados por IA',
    duration: '7 días',
    description: 'Domina las herramientas que aceleran tu desarrollo 10x',
    outcomes: [
      'AI Development mastery',
      'Web3 & Blockchain basics',
      'Farcaster ecosystem integration',
      'Team formation & public building',
      'Base blockchain implementation'
    ],
    certification: 'AI Development Foundations',
    color: 'primary'
  },
  {
    phase: 2,
    title: 'Intensive Development',
    subtitle: 'Desarrollo Intensivo',
    duration: '7 días',
    description: 'Construye aplicaciones reales con tecnologías cutting-edge',
    outcomes: [
      'Full-stack development with AI',
      'Blockchain integration advanced',
      'Farcaster Mini Apps creation',
      'Database design & architecture',
      'Production deployment'
    ],
    certification: 'Full-Stack Blockchain Developer',
    color: 'secondary'
  },
  {
    phase: 3,
    title: 'Launch Excellence',
    subtitle: 'Preparación para el Lanzamiento',
    duration: '7 días',
    description: 'Convierte tu MVP en un producto competitivo',
    outcomes: [
      'Product optimization & polish',
      'Growth engineering systems',
      'Storytelling & demo production',
      'Launch management & PR',
      'Competition strategy'
    ],
    certification: 'Impact Player Certification',
    color: 'accent'
  }
]

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const colorClasses = {
    primary: 'border-primary/20 hover:border-primary/40 hover:bg-primary/5',
    secondary: 'border-secondary/20 hover:border-secondary/40 hover:bg-secondary/5',
    accent: 'border-accent/20 hover:border-accent/40 hover:bg-accent/5'
  }

  const iconColorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className={cn(
        'h-full transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer',
        colorClasses[feature.color]
      )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardHeader className="text-center">
          <div className={cn('mx-auto mb-4', iconColorClasses[feature.color])}>
            {feature.icon}
          </div>
          <CardTitle className="text-lg">{feature.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            <div className="space-y-2">
              {feature.benefits.slice(0, isExpanded ? undefined : 3).map((benefit, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
              {!isExpanded && feature.benefits.length > 3 && (
                <div className="text-xs text-muted-foreground">
                  +{feature.benefits.length - 3} more benefits...
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-border">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm font-medium text-primary">{feature.differentiator}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function ToolGallery() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ai' | 'development' | 'blockchain'>('all')

  const filteredTools = selectedCategory === 'all'
    ? toolStack
    : toolStack.filter(tool => tool.category === selectedCategory)

  const totalValue = toolStack.reduce((sum, tool) => sum + tool.value, 0)

  const categoryTotals = {
    ai: toolStack.filter(t => t.category === 'ai').reduce((sum, tool) => sum + tool.value, 0),
    development: toolStack.filter(t => t.category === 'development').reduce((sum, tool) => sum + tool.value, 0),
    blockchain: toolStack.filter(t => t.category === 'blockchain').reduce((sum, tool) => sum + tool.value, 0)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl font-bold text-primary mb-2">
          ${totalValue.toLocaleString()}+
        </div>
        <div className="text-lg text-muted-foreground">
          Valor total en herramientas premium incluidas
        </div>
      </div>

      <div className="flex justify-center gap-2 flex-wrap">
        {[
          { key: 'all', label: 'Todas', value: totalValue },
          { key: 'ai', label: 'AI Tools', value: categoryTotals.ai },
          { key: 'development', label: 'Development', value: categoryTotals.development },
          { key: 'blockchain', label: 'Blockchain', value: categoryTotals.blockchain }
        ].map(({ key, label, value }) => (
          <Button
            key={key}
            variant={selectedCategory === key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(key as 'all' | 'ai' | 'development' | 'blockchain')}
            className="gap-2"
          >
            {label}
            <span className="text-xs opacity-70">${value}</span>
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool, i) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="text-primary">{tool.icon}</div>
                  <div>
                    <CardTitle className="text-base">{tool.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">${tool.value}</div>
                    <div className="text-xs text-muted-foreground">/año</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  {tool.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm">
                      <Check className="h-3 w-3 text-accent" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function ComparisonMatrix() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-border">
            <th className="text-left p-4 font-semibold">Características</th>
            <th className="text-center p-4 font-semibold text-primary">Verano En Cadena</th>
            <th className="text-center p-4 font-semibold text-muted-foreground">Bootcamps</th>
            <th className="text-center p-4 font-semibold text-muted-foreground">Cursos Online</th>
            <th className="text-center p-4 font-semibold text-muted-foreground">Auto-aprendizaje</th>
          </tr>
        </thead>
        <tbody>
          {comparisonData.map((item, i) => (
            <motion.tr
              key={item.feature}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={cn(
                'border-b border-border hover:bg-muted/20 transition-colors',
                item.highlight && 'bg-primary/5'
              )}
            >
              <td className="p-4 font-medium">
                {item.feature}
                {item.highlight && <Star className="inline h-4 w-4 text-primary ml-2" />}
              </td>
              <td className="p-4 text-center">
                {typeof item.verano === 'boolean' ? (
                  item.verano ? (
                    <Check className="h-5 w-5 text-primary mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground mx-auto" />
                  )
                ) : (
                  <span className="font-semibold text-primary">{item.verano}</span>
                )}
              </td>
              <td className="p-4 text-center">
                {typeof item.bootcamp === 'boolean' ? (
                  item.bootcamp ? (
                    <Check className="h-5 w-5 text-accent mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground mx-auto" />
                  )
                ) : (
                  <span className="text-muted-foreground">{item.bootcamp}</span>
                )}
              </td>
              <td className="p-4 text-center">
                {typeof item.online === 'boolean' ? (
                  item.online ? (
                    <Check className="h-5 w-5 text-accent mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground mx-auto" />
                  )
                ) : (
                  <span className="text-muted-foreground">{item.online}</span>
                )}
              </td>
              <td className="p-4 text-center">
                {typeof item.self === 'boolean' ? (
                  item.self ? (
                    <Check className="h-5 w-5 text-accent mx-auto" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground mx-auto" />
                  )
                ) : (
                  <span className="text-muted-foreground">{item.self}</span>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function MethodologyVisualization() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Impact Player System™</h3>
        <p className="text-muted-foreground">
          Metodología probada para transformar developers en founders
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {methodologyPhases.map((phase, i) => {
          const colorClasses = {
            primary: 'border-primary/20 bg-primary/5',
            secondary: 'border-secondary/20 bg-secondary/5',
            accent: 'border-accent/20 bg-accent/5'
          }

          const iconColorClasses = {
            primary: 'text-primary',
            secondary: 'text-secondary',
            accent: 'text-accent'
          }

          return (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative"
            >
              <Card className={cn('h-full', colorClasses[phase.color])}>
                <CardHeader className="text-center">
                  <div className={cn(
                    'w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-4',
                    iconColorClasses[phase.color],
                    phase.color === 'primary' && 'bg-primary text-primary-foreground',
                    phase.color === 'secondary' && 'bg-secondary text-secondary-foreground',
                    phase.color === 'accent' && 'bg-accent text-accent-foreground'
                  )}>
                    {phase.phase}
                  </div>
                  <CardTitle className="text-lg">{phase.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{phase.subtitle}</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">{phase.duration}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm mb-4">{phase.description}</p>

                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-sm">Outcomes:</h4>
                    {phase.outcomes.map((outcome, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{phase.certification}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {i < methodologyPhases.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ChevronRight className="h-6 w-6 text-primary" />
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export function VeranoFeaturesFramework({ className }: VeranoFeaturesFrameworkProps) {
  return (
    <section className={cn('py-16 md:py-24', className)}>
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4">
            Por Qué Verano En Cadena Es Diferente
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubre las ventajas únicas que nos posicionan como líderes.
            Metodología probada + Herramientas premium + Garantía de éxito.
          </p>
        </motion.div>
      </div>

      {/* Core Features */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold mb-2">6 Ventajas Competitivas Únicas</h3>
          <p className="text-muted-foreground">
            Características que nos diferencian de cualquier otra opción
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreFeatures.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>

      {/* Tool Stack */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold mb-2">Herramientas Premium Incluidas</h3>
          <p className="text-muted-foreground">
            Acceso completo a las mejores herramientas del mercado
          </p>
        </motion.div>

        <ToolGallery />
      </div>

      {/* Methodology */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <MethodologyVisualization />
        </motion.div>
      </div>

      {/* Comparison Matrix */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold mb-2">Comparación Competitiva</h3>
          <p className="text-muted-foreground">
            Ve por qué somos la opción superior para tu transformación
          </p>
        </motion.div>

        <Card>
          <CardContent className="p-0">
            <ComparisonMatrix />
          </CardContent>
        </Card>
      </div>

      {/* Success Guarantee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="text-center"
      >
        <Card className="max-w-4xl mx-auto border-primary/20 bg-primary/5">
          <CardContent className="p-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shield className="h-12 w-12 text-primary" />
              <div>
                <h3 className="text-2xl font-bold">Garantía &quot;Success or Retry Free&quot;</h3>
                <p className="text-muted-foreground">Tu éxito está garantizado</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-3">
                <h4 className="font-semibold">Garantías Incluidas:</h4>
                <div className="space-y-2">
                  {[
                    'Completa assignments → Certificación garantizada',
                    'Sigue metodología → Desarrollo de skills garantizado',
                    'Participa activamente → Crecimiento de network garantizado',
                    'Submit a Onchain Summer → Portfolio piece garantizado'
                  ].map((guarantee, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{guarantee}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Respaldo Total:</h4>
                <div className="space-y-2">
                  {[
                    'Refund completo dentro de 30 días',
                    'Retry gratuito si no cumples objetivos',
                    'Acceso de por vida a la comunidad',
                    'Mentorship continuo post-programa'
                  ].map((backup, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <Shield className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>{backup}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="gap-2">
                <Rocket className="h-5 w-5" />
                Comenzar Con Garantía Total
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Sin riesgo. Sin excusas. Solo resultados.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
} 