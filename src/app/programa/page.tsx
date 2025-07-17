'use client'

import { useState } from 'react'
import { 
  Calendar, 
  Clock, 
  Users, 
  Code, 
  Trophy, 
  Rocket, 
  Target, 
  BookOpen,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Play,
  User,
  Globe,
  Zap,
  Database,
  Smartphone,
  DollarSign,
  Star
} from 'lucide-react'

interface WeekData {
  week: number
  title: string
  theme: string
  dates: string
  description: string
  commitment: string
  icon: React.ReactNode
  color: string
  days: DayData[]
  objectives: string[]
  keySkills: string[]
}

interface DayData {
  day: number
  title: string
  subtitle: string
  session: string
  mainTopics: string[]
  deliverables: string[]
  timeCommitment: string
}

const PROGRAM_WEEKS: WeekData[] = [
  {
    week: 1,
    title: "AI-Powered Foundations",
    theme: "AI x Crypto x Culture",
    dates: "14-18 Julio",
    description: "Transforma tu forma de construir con IA y establece tu identidad Web3",
    commitment: "5-6 horas diarias",
    icon: <Zap className="h-6 w-6" />,
    color: "from-blue-500 to-purple-600",
    objectives: [
      "Dominar herramientas de IA para development 10x más rápido",
      "Crear tu identidad profesional en Base blockchain",
      "Formar tu equipo élite de builders",
      "Validar un problema real de Centroamérica",
      "Construir en público y crear tu portfolio"
    ],
    keySkills: [
      "Cursor IDE & AI Coding",
      "ChatGPT & Claude Mastery",
      "Base Wallet & Basename",
      "Farcaster & Web3 Social",
      "Team Formation & Collaboration"
    ],
    days: [
      {
        day: 1,
        title: "Revolución AI",
        subtitle: "Bienvenido a la era de la IA",
        session: "5:00-6:30 PM CST",
        mainTopics: [
          "Setup de Cursor IDE con IA",
          "Primeros builds con ChatGPT",
          "Productividad 10x explicada",
          "Cultura hacker introductoria"
        ],
        deliverables: [
          "Setup completo de ambiente AI",
          "Primera app built con IA",
          "Post público con screenshot",
          "Perfil en Discord configurado"
        ],
        timeCommitment: "5-6 horas"
      },
      {
        day: 2,
        title: "Internet of Value",
        subtitle: "Tu identidad onchain",
        session: "5:00-6:30 PM CST",
        mainTopics: [
          "Economía Web3 explicada",
          "Setup de Coinbase Wallet",
          "Compra de Basename (.base.eth)",
          "Primeros pasos en Farcaster"
        ],
        deliverables: [
          "Wallet configurado y fondeado",
          "Basename comprado",
          "Perfil de Farcaster activo",
          "Primer cast publicado"
        ],
        timeCommitment: "5-6 horas"
      },
      {
        day: 3,
        title: "Finding Your Tribe",
        subtitle: "Forma tu equipo élite",
        session: "5:00-6:30 PM CST",
        mainTopics: [
          "Roles: Builder/Creator/Gardener",
          "Formación de equipos dinámicos",
          "Validación de problemas regionales",
          "Herramientas de colaboración"
        ],
        deliverables: [
          "Equipo formado oficialmente",
          "Problema validado con research",
          "Mission statement del equipo",
          "Canales de comunicación setup"
        ],
        timeCommitment: "5-6 horas"
      },
      {
        day: 4,
        title: "Becoming Dangerous",
        subtitle: "Speed building mastery",
        session: "5:00-6:30 PM CST",
        mainTopics: [
          "Prompts avanzados de IA",
          "Speed building techniques",
          "Challenge de 30 minutos",
          "Conexión con mentores"
        ],
        deliverables: [
          "Challenge completado en 30 min",
          "Tutorial thread del proceso",
          "Conexión con mentor asignado",
          "Speed build documented"
        ],
        timeCommitment: "5-6 horas"
      },
      {
        day: 5,
        title: "The Commitment",
        subtitle: "All in para la misión",
        session: "5:00-6:30 PM CST",
        mainTopics: [
          "AI x Crypto x Culture integration",
          "Project planning y roadmap",
          "Sprint preparation Week 2",
          "Public accountability"
        ],
        deliverables: [
          "Pitch de 60 segundos grabado",
          "Plan de sprint Week 2",
          "Commitment post público",
          "Weekend hackathon prep"
        ],
        timeCommitment: "5-6 horas"
      }
    ]
  },
  {
    week: 2,
    title: "Intensive Development",
    theme: "From Zero to Hacker",
    dates: "21-25 Julio",
    description: "Construye tu MVP completo con stack profesional",
    commitment: "6-8 horas diarias",
    icon: <Code className="h-6 w-6" />,
    color: "from-green-500 to-blue-600",
    objectives: [
      "Dominar NextJS 14 + PostgreSQL + TypeScript",
      "Integrar Farcaster SDK y Base blockchain",
      "Conseguir 25+ usuarios reales usando tu app",
      "Generar tus primeros ingresos onchain",
      "Deployar a producción con monitoring"
    ],
    keySkills: [
      "NextJS 14 & React",
      "PostgreSQL & Supabase",
      "Farcaster SDK Integration",
      "Base Blockchain & Wagmi",
      "User Testing & Iteration"
    ],
    days: [
      {
        day: 6,
        title: "WebDev 101",
        subtitle: "Tu primera app NextJS",
        session: "5:00-7:00 PM CST",
        mainTopics: [
          "NextJS 14 App Router",
          "React components basics",
          "PostgreSQL database setup",
          "TailwindCSS styling"
        ],
        deliverables: [
          "App básica funcionando",
          "Database schema diseñado",
          "UI components creados",
          "Deploy en Vercel"
        ],
        timeCommitment: "6-8 horas"
      },
      {
        day: 7,
        title: "WebDev 201",
        subtitle: "Backend completo + API",
        session: "5:00-7:00 PM CST",
        mainTopics: [
          "REST API development",
          "Database queries optimization",
          "Authentication & authorization",
          "Error handling & validation"
        ],
        deliverables: [
          "API endpoints funcionando",
          "User authentication activo",
          "Database CRUD operations",
          "Error handling implementation"
        ],
        timeCommitment: "6-8 horas"
      },
      {
        day: 8,
        title: "WebDev 301",
        subtitle: "Farcaster SDK integration",
        session: "5:00-7:00 PM CST",
        mainTopics: [
          "Farcaster SDK setup",
          "Frames development",
          "Social features integration",
          "Community building tools"
        ],
        deliverables: [
          "Farcaster integration working",
          "Frame funcionando",
          "Social features activas",
          "Community tools implemented"
        ],
        timeCommitment: "6-8 horas"
      },
      {
        day: 9,
        title: "WebDev 302",
        subtitle: "Wallets & transactions",
        session: "5:00-7:00 PM CST",
        mainTopics: [
          "Wallet connection (Wagmi)",
          "Transaction handling",
          "Payment flows",
          "Base blockchain integration"
        ],
        deliverables: [
          "Wallet connection working",
          "Payment flow functional",
          "Base transactions active",
          "Monetization implemented"
        ],
        timeCommitment: "6-8 horas"
      },
      {
        day: 10,
        title: "WebDev 401",
        subtitle: "Smart contracts & tokenomics",
        session: "5:00-7:00 PM CST",
        mainTopics: [
          "Smart contract basics",
          "Solidity deployment",
          "Tokenomics design",
          "Revenue optimization"
        ],
        deliverables: [
          "Smart contract deployed",
          "Tokenomics model active",
          "Revenue tracking setup",
          "Production ready MVP"
        ],
        timeCommitment: "6-8 horas"
      }
    ]
  },
  {
    week: 3,
    title: "Launch Preparation",
    theme: "Excel in Onchain Summer",
    dates: "28 Julio - 1 Agosto",
    description: "Prepárate para competir y ganar en Onchain Summer",
    commitment: "8-10 horas diarias",
    icon: <Trophy className="h-6 w-6" />,
    color: "from-orange-500 to-red-600",
    objectives: [
      "Pulir tu producto a nivel profesional",
      "Implementar 3+ canales de growth",
      "Crear demo video profesional",
      "Ejecutar launch coordinado",
      "Competir en Onchain Summer"
    ],
    keySkills: [
      "Product Polish & UX",
      "Growth Hacking",
      "Demo Production",
      "Launch Management",
      "Competition Strategy"
    ],
    days: [
      {
        day: 11,
        title: "Product Polish",
        subtitle: "Perfección en UI/UX",
        session: "5:00-7:00 PM CST",
        mainTopics: [
          "UI/UX refinement",
          "Performance optimization",
          "Mobile responsiveness",
          "Accessibility compliance"
        ],
        deliverables: [
          "UI polish completado",
          "Performance >95 Lighthouse",
          "Mobile version optimizada",
          "Accessibility implementada"
        ],
        timeCommitment: "8-10 horas"
      },
      {
        day: 12,
        title: "Growth Implementation",
        subtitle: "Activar canales de growth",
        session: "5:00-7:00 PM CST",
        mainTopics: [
          "Multi-channel strategy",
          "Social media automation",
          "Community building",
          "Analytics & tracking"
        ],
        deliverables: [
          "3+ growth channels activos",
          "Automation tools setup",
          "Community engagement plan",
          "Analytics dashboard"
        ],
        timeCommitment: "8-10 horas"
      },
      {
        day: 13,
        title: "Demo Recording",
        subtitle: "Video profesional",
        session: "5:00-7:00 PM CST",
        mainTopics: [
          "Demo video production",
          "Storytelling techniques",
          "Professional presentation",
          "Call-to-action optimization"
        ],
        deliverables: [
          "Demo video de 2 minutos",
          "Pitch deck profesional",
          "Storytelling refinado",
          "Marketing assets completos"
        ],
        timeCommitment: "8-10 horas"
      },
      {
        day: 14,
        title: "Launch Rehearsal",
        subtitle: "Práctica del lanzamiento",
        session: "5:00-7:00 PM CST",
        mainTopics: [
          "Launch coordination",
          "Crisis management",
          "Team synchronization",
          "Final preparations"
        ],
        deliverables: [
          "Launch plan ejecutado",
          "Crisis protocols ready",
          "Team coordination perfect",
          "Final checklist complete"
        ],
        timeCommitment: "8-10 horas"
      },
      {
        day: 15,
        title: "LAUNCH DAY",
        subtitle: "Onchain Summer submission",
        session: "5:00-7:00 PM CST",
        mainTopics: [
          "Competition submission",
          "Coordinated launch",
          "Media outreach",
          "Community activation"
        ],
        deliverables: [
          "Onchain Summer submission",
          "1000+ launch impressions",
          "Media coverage secured",
          "Community activated"
        ],
        timeCommitment: "8-10 horas"
      }
    ]
  }
]

const TECH_STACK = [
  { category: "AI Tools", items: ["Cursor IDE", "ChatGPT", "Claude", "v0"], icon: <Zap className="h-5 w-5" /> },
  { category: "Frontend", items: ["NextJS 14", "React", "TypeScript", "TailwindCSS"], icon: <Globe className="h-5 w-5" /> },
  { category: "Backend", items: ["PostgreSQL", "Supabase", "API Routes", "Vercel"], icon: <Database className="h-5 w-5" /> },
  { category: "Web3", items: ["Base Blockchain", "Wagmi", "Farcaster SDK", "Coinbase Wallet"], icon: <Smartphone className="h-5 w-5" /> },
]

const SUCCESS_METRICS = [
  { metric: "Wallets Creados", target: "50+", icon: <User className="h-5 w-5" /> },
  { metric: "Basenames Comprados", target: "40+", icon: <Globe className="h-5 w-5" /> },
  { metric: "Equipos Formados", target: "15+", icon: <Users className="h-5 w-5" /> },
  { metric: "Apps Deployed", target: "100%", icon: <Rocket className="h-5 w-5" /> },
  { metric: "Usuarios por App", target: "25+", icon: <Target className="h-5 w-5" /> },
  { metric: "Submissions a Onchain Summer", target: "20+", icon: <Trophy className="h-5 w-5" /> }
]

export default function ProgramPage() {
  const [selectedWeek, setSelectedWeek] = useState<number>(1)
  const [expandedDay, setExpandedDay] = useState<number | null>(null)

  const selectedWeekData = PROGRAM_WEEKS.find(w => w.week === selectedWeek)

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-funnel font-bold text-zinc-900 mb-4">
            Programa Verano En Cadena
          </h1>
          <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
            3 semanas intensivas para transformarte en un <span className="text-orange-600 font-semibold">impact player</span> del ecosistema Web3
          </p>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <span className="text-zinc-700">14 Julio - 1 Agosto</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <span className="text-zinc-700">5:00-7:00 PM CST</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-600" />
              <span className="text-zinc-700">50+ Builders</span>
            </div>
          </div>
        </div>

        {/* Week Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-2xl p-2 shadow-lg">
            {PROGRAM_WEEKS.map((week) => (
              <button
                key={week.week}
                onClick={() => setSelectedWeek(week.week)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                  selectedWeek === week.week
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'text-zinc-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                {week.icon}
                <span className="font-semibold">Semana {week.week}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedWeekData && (
          <>
            {/* Week Overview */}
            <div className={`bg-gradient-to-r ${selectedWeekData.color} rounded-2xl p-8 text-white mb-8`}>
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-4">
                  {selectedWeekData.icon}
                  <h2 className="text-3xl font-funnel font-bold">{selectedWeekData.title}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{selectedWeekData.theme}</h3>
                    <p className="text-white/90 mb-4">{selectedWeekData.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {selectedWeekData.dates}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {selectedWeekData.commitment}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Objetivos Clave:</h4>
                    <ul className="text-sm space-y-1">
                      {selectedWeekData.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Star className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills & Technologies */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-funnel font-bold text-zinc-900 mb-4">
                  Skills que Dominarás
                </h3>
                <div className="space-y-3">
                  {selectedWeekData.keySkills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      <span className="text-zinc-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-funnel font-bold text-zinc-900 mb-4">
                  Stack Tecnológico
                </h3>
                <div className="space-y-4">
                  {TECH_STACK.map((category, index) => (
                    <div key={index}>
                      <div className="flex items-center gap-2 mb-2">
                        {category.icon}
                        <h4 className="font-semibold text-zinc-800">{category.category}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((item, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Daily Schedule */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <h3 className="text-2xl font-funnel font-bold text-zinc-900 mb-6">
                Cronograma Diario - Semana {selectedWeekData.week}
              </h3>
              <div className="space-y-4">
                {selectedWeekData.days.map((day, index) => (
                  <div key={index} className="border border-zinc-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleDay(day.day)}
                      className="w-full flex items-center justify-between p-4 bg-orange-50 hover:bg-orange-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-orange-500 text-white rounded-lg font-bold">
                          {day.day}
                        </div>
                        <div className="text-left">
                          <h4 className="font-funnel font-semibold text-zinc-900">{day.title}</h4>
                          <p className="text-sm text-zinc-600">{day.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm text-zinc-600">
                            <Clock className="h-4 w-4" />
                            {day.session}
                          </div>
                          <div className="text-xs text-zinc-500">
                            {day.timeCommitment}
                          </div>
                        </div>
                        <ChevronDown className={`h-5 w-5 text-zinc-500 transition-transform ${expandedDay === day.day ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                    
                    {expandedDay === day.day && (
                      <div className="p-4 bg-white border-t border-zinc-200">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-semibold text-zinc-900 mb-2">Temas Principales:</h5>
                            <ul className="space-y-1">
                              {day.mainTopics.map((topic, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                  <ChevronRight className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-zinc-700">{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-semibold text-zinc-900 mb-2">Deliverables:</h5>
                            <ul className="space-y-1">
                              {day.deliverables.map((deliverable, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                  <Target className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-zinc-700">{deliverable}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Success Metrics */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="text-2xl font-funnel font-bold text-zinc-900 mb-6">
            Métricas de Éxito del Programa
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SUCCESS_METRICS.map((metric, index) => (
              <div key={index} className="text-center p-4 bg-gradient-to-b from-orange-50 to-white rounded-xl border border-orange-200">
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-lg flex items-center justify-center">
                    {metric.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold text-orange-600 mb-1">{metric.target}</div>
                <div className="text-sm text-zinc-600">{metric.metric}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Support & Community */}
        <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-funnel font-bold text-zinc-900 mb-4">
            Soporte y Comunidad
          </h3>
          <p className="text-zinc-700 mb-6 max-w-2xl mx-auto">
            Tendrás acceso a mentores 24/7, TAs especializados, y una comunidad activa de builders que te apoyarán en cada paso del camino.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
              <Users className="h-5 w-5 text-orange-600" />
              <span className="text-zinc-700">Discord 24/7</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
              <BookOpen className="h-5 w-5 text-orange-600" />
              <span className="text-zinc-700">Sesiones Grabadas</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
              <Target className="h-5 w-5 text-orange-600" />
              <span className="text-zinc-700">Mentores 1:1</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
              <Globe className="h-5 w-5 text-orange-600" />
              <span className="text-zinc-700">Docs en Español</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}