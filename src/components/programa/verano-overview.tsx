"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Clock,
  Users,
  Target,
  Code,
  Brain,
  Trophy,
  CheckCircle,
  BookOpen,
  ArrowRight
} from 'lucide-react'

interface OverviewPhase {
  phase: number
  title: string
  duration: string
  description: string
  keyOutcomes: string[]
  icon: React.ReactNode
  color: 'primary' | 'secondary' | 'accent'
}

interface ProgramMetric {
  icon: React.ReactNode
  label: string
  value: string
  description: string
}

interface VeranoOverviewProps {
  className?: string
}

const phases: OverviewPhase[] = [
  {
    phase: 1,
    title: "Foundations",
    duration: "7 días",
    description: "Domina las herramientas de IA y establece las bases sólidas para construir aplicaciones modernas",
    keyOutcomes: [
      "AI Development con Cursor + Claude",
      "Web3 & Blockchain fundamentals",
      "Base ecosystem integration"
    ],
    icon: <Brain className="h-8 w-8" />,
    color: 'primary'
  },
  {
    phase: 2,
    title: "Build & Ship",
    duration: "7 días",
    description: "Construye tu primera aplicación onchain con usuarios reales y feedback inmediato",
    keyOutcomes: [
      "Full-stack app deployment",
      "Real user acquisition",
      "Production-ready MVP"
    ],
    icon: <Code className="h-8 w-8" />,
    color: 'secondary'
  },
  {
    phase: 3,
    title: "Scale & Impact",
    duration: "7 días",
    description: "Optimiza tu producto, compete en Onchain Summer y establece tu presencia en el ecosistema",
    keyOutcomes: [
      "Competition submission",
      "Growth systems setup",
      "Impact Player certification"
    ],
    icon: <Trophy className="h-8 w-8" />,
    color: 'accent'
  }
]

const programMetrics: ProgramMetric[] = [
  {
    icon: <Clock className="h-6 w-6" />,
    label: "Duration",
    value: "21 días",
    description: "Intensivo pero sostenible"
  },
  {
    icon: <Users className="h-6 w-6" />,
    label: "Cohort Size",
    value: "Max 15",
    description: "Atención personalizada"
  },
  {
    icon: <Target className="h-6 w-6" />,
    label: "Time Commitment",
    value: "5-6h/día",
    description: "Flexible horarios"
  },
  {
    icon: <Trophy className="h-6 w-6" />,
    label: "Success Rate",
    value: "95%",
    description: "Metodología probada"
  }
]

function PhaseCard({ phase, index }: { phase: OverviewPhase; index: number }) {
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <Card className={cn('h-full hover:shadow-lg transition-all duration-300', colorClasses[phase.color])}>
        <CardHeader className="text-center">
          <div className={cn('mx-auto mb-4', iconColorClasses[phase.color])}>
            {phase.icon}
          </div>
          <div className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-2',
            phase.color === 'primary' && 'bg-primary text-primary-foreground',
            phase.color === 'secondary' && 'bg-secondary text-secondary-foreground',
            phase.color === 'accent' && 'bg-accent text-accent-foreground'
          )}>
            {phase.phase}
          </div>
          <CardTitle className="text-lg">{phase.title}</CardTitle>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{phase.duration}</span>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{phase.description}</p>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Key Outcomes:</h4>
            {phase.keyOutcomes.map((outcome, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function MetricCard({ metric, index }: { metric: ProgramMetric; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
    >
      <div className="text-primary flex justify-center mb-2">
        {metric.icon}
      </div>
      <div className="text-2xl font-bold mb-1">{metric.value}</div>
      <div className="font-semibold text-sm mb-1">{metric.label}</div>
      <div className="text-xs text-muted-foreground">{metric.description}</div>
    </motion.div>
  )
}

export function VeranoOverview({ className }: VeranoOverviewProps) {
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
            Tu Transformación en 21 Días
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Una metodología estructurada que te lleva de developer a founder.
            Cada semana tiene un objetivo claro y resultados medibles.
          </p>
        </motion.div>
      </div>

      {/* Program Metrics */}
      <div className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {programMetrics.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} />
          ))}
        </div>
      </div>

      {/* 3-Phase Overview */}
      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold mb-2">Metodología de 3 Fases</h3>
          <p className="text-muted-foreground">
            Cada fase construye sobre la anterior con objetivos específicos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {phases.map((phase, i) => (
            <PhaseCard key={phase.phase} phase={phase} index={i} />
          ))}
        </div>
      </div>

      {/* Detailed Curriculum CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center"
      >
        <Card className="max-w-2xl mx-auto border-primary/20 bg-primary/5">
          <CardContent className="p-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold">¿Quieres Ver el Curriculum Completo?</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Revisa cada día del programa, tecnologías específicas, proyectos detallados y mucho más.
            </p>
            <Button size="lg" className="gap-2" asChild>
              <a href="/recursos" className="inline-flex items-center">
                <BookOpen className="h-5 w-5" />
                Ver Recursos Completos
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Curriculum detallado, herramientas, proyectos y más
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}