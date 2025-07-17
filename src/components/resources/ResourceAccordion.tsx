'use client'

import { useState } from 'react'
import { ChevronDown, ExternalLink, Download, Code, Book, Video, Users, Trophy, Zap } from 'lucide-react'
import Link from 'next/link'

type ResourceItem = {
  title: string
  url: string
  description?: string
  type: 'pdf' | 'link' | 'video' | 'tool' | 'github'
  isExternal?: boolean
  icon?: React.ReactNode
}

type ResourceCategory = {
  category: string
  description: string
  icon: React.ReactNode
  resources: ResourceItem[]
}

const RESOURCE_DATA: ResourceCategory[] = [
  {
    category: 'Documentación Oficial del Programa',
    description: 'Toda la documentación esencial para participar en Verano En Cadena',
    icon: <Book className="h-5 w-5" />,
    resources: [
      { 
        title: 'Programa Oficial Onchain Summer Base', 
        url: '/docs/verano-en-cadena-programa-oficial.pdf',
        description: 'Información completa del programa de 3 semanas',
        type: 'pdf',
        icon: <Download className="h-4 w-4" />
      },
      { 
        title: 'Guía de Onboarding para Nuevos Participantes', 
        url: '/docs/onboarding-guide.pdf',
        description: 'Pasos esenciales para prepararte antes del programa',
        type: 'pdf',
        icon: <Download className="h-4 w-4" />
      },
      { 
        title: 'Calendario y Cronograma Detallado', 
        url: '/docs/calendario-verano-en-cadena.pdf',
        description: 'Horarios, fechas y entregas por semana',
        type: 'pdf',
        icon: <Download className="h-4 w-4" />
      },
      { 
        title: 'Sistema de Puntos y Tokenomics $PULPA', 
        url: '/docs/tokenomics-pulpa.pdf',
        description: 'Cómo funcionan las recompensas y el sistema de puntos',
        type: 'pdf',
        icon: <Download className="h-4 w-4" />
      }
    ],
  },
  {
    category: 'Herramientas de Desarrollo AI-Powered',
    description: 'Stack tecnológico y herramientas de IA para desarrollo acelerado',
    icon: <Code className="h-5 w-5" />,
    resources: [
      { 
        title: 'Cursor IDE - Setup y Configuración', 
        url: 'https://cursor.sh',
        description: 'Editor de código potenciado por IA',
        type: 'link',
        isExternal: true,
        icon: <ExternalLink className="h-4 w-4" />
      },
      { 
        title: 'ChatGPT Prompts Library para Web3', 
        url: '/docs/chatgpt-prompts-web3.pdf',
        description: 'Biblioteca de prompts optimizados para desarrollo',
        type: 'pdf',
        icon: <Download className="h-4 w-4" />
      },
      { 
        title: 'Suno AI - Creación de Contenido', 
        url: 'https://suno.ai',
        description: 'Generación de música y audio para marketing',
        type: 'link',
        isExternal: true,
        icon: <ExternalLink className="h-4 w-4" />
      },
      { 
        title: 'CapCut - Edición de Video', 
        url: 'https://capcut.com',
        description: 'Para crear demos y contenido viral',
        type: 'link',
        isExternal: true,
        icon: <ExternalLink className="h-4 w-4" />
      },
      { 
        title: 'v0 by Vercel - UI Generation', 
        url: 'https://v0.dev',
        description: 'Generación de interfaces con IA',
        type: 'link',
        isExternal: true,
        icon: <ExternalLink className="h-4 w-4" />
      }
    ],
  },
  {
    category: 'Base & Web3 Development',
    description: 'Recursos específicos para desarrollar en Base y el ecosistema Web3',
    icon: <Code className="h-5 w-5" />,
    resources: [
      { 
        title: 'Base Developer Documentation', 
        url: 'https://docs.base.org',
        description: 'Documentación oficial de Base',
        type: 'link',
        isExternal: true,
        icon: <ExternalLink className="h-4 w-4" />
      },
      { 
        title: 'Coinbase Wallet Integration Guide', 
        url: 'https://docs.cloud.coinbase.com/wallet-sdk/docs',
        description: 'Integración de wallets en tu aplicación',
        type: 'link',
        isExternal: true,
        icon: <ExternalLink className="h-4 w-4" />
      },
      { 
        title: 'Farcaster SDK y Mini Apps', 
        url: 'https://docs.farcaster.xyz',
        description: 'Desarrollo de mini apps para Farcaster',
        type: 'link',
        isExternal: true,
        icon: <ExternalLink className="h-4 w-4" />
      },
      { 
        title: 'Plantillas de Código - Starter Kits', 
        url: 'https://github.com/frutero-club/verano-templates',
        description: 'Templates para NextJS + Base + Farcaster',
        type: 'github',
        isExternal: true,
        icon: <Code className="h-4 w-4" />
      },
      { 
        title: 'Smart Contract Templates', 
        url: '/docs/smart-contract-templates.zip',
        description: 'Contratos inteligentes pre-configurados',
        type: 'pdf',
        icon: <Download className="h-4 w-4" />
      }
    ],
  },
  {
    category: 'Contenido Educativo y Tutoriales',
    description: 'Videos, guías y recursos de aprendizaje en español',
    icon: <Video className="h-5 w-5" />,
    resources: [
      { 
        title: 'Video: Setup Completo del Ambiente de Desarrollo', 
        url: 'https://youtube.com/watch?v=setup-ambiente',
        description: 'Tutorial paso a paso en español',
        type: 'video',
        isExternal: true,
        icon: <Video className="h-4 w-4" />
      },
      { 
        title: 'Cómo Crear tu Primera Mini App en Farcaster', 
        url: '/docs/tutorial-primera-mini-app.pdf',
        description: 'Guía completa con ejemplos de código',
        type: 'pdf',
        icon: <Download className="h-4 w-4" />
      },
      { 
        title: 'De Idea a MVP en 24 Horas', 
        url: '/docs/idea-a-mvp-24h.pdf',
        description: 'Metodología para development acelerado',
        type: 'pdf',
        icon: <Download className="h-4 w-4" />
      },
      { 
        title: 'Build in Public: Estrategias de Marketing', 
        url: '/docs/build-in-public-marketing.pdf',
        description: 'Cómo crear contenido viral mientras construyes',
        type: 'pdf',
        icon: <Download className="h-4 w-4" />
      },
      { 
        title: 'Grabaciones de Sesiones En Vivo', 
        url: 'https://youtube.com/playlist?list=verano-en-cadena',
        description: 'Acceso a todas las sesiones grabadas',
        type: 'video',
        isExternal: true,
        icon: <Video className="h-4 w-4" />
      }
    ],
  },
  {
    category: 'Comunidad y Soporte',
    description: 'Canales de comunicación y recursos de la comunidad',
    icon: <Users className="h-5 w-5" />,
    resources: [
      { 
        title: 'Discord Oficial - Soporte 24/7', 
        url: 'https://discord.gg/frutero-club',
        description: 'Comunidad activa con mentores y TAs',
        type: 'link',
        isExternal: true,
        icon: <ExternalLink className="h-4 w-4" />
      },
      { 
        title: 'Telegram - Anuncios Importantes', 
        url: 'https://t.me/verano_en_cadena',
        description: 'Canal para updates y comunicados',
        type: 'link',
        isExternal: true,
        icon: <ExternalLink className="h-4 w-4" />
      },
      { 
        title: 'Farcaster - Comunidad Crypto', 
        url: 'https://warpcast.com/~/channel/frutero',
        description: 'Comparte tu progreso y conecta con builders',
        type: 'link',
        isExternal: true,
        icon: <ExternalLink className="h-4 w-4" />
      },
      { 
        title: 'Directorio de Mentores', 
        url: '/docs/directorio-mentores.pdf',
        description: 'Lista de mentores por especialidad',
        type: 'pdf',
        icon: <Download className="h-4 w-4" />
      }
    ],
  },
  {
    category: 'Competencia Onchain Summer',
    description: 'Todo lo que necesitas para competir y ganar en Onchain Summer',
    icon: <Trophy className="h-5 w-5" />,
    resources: [
      { 
        title: 'Onchain Summer - Bases de la Competencia', 
        url: 'https://onchainsummer.xyz',
        description: 'Reglas oficiales y premios',
        type: 'link',
        isExternal: true,
        icon: <ExternalLink className="h-4 w-4" />
      },
      { 
        title: 'Template de Pitch Deck', 
        url: '/docs/pitch-deck-template.pptx',
        description: 'Plantilla para presentar tu proyecto',
        type: 'pdf',
        icon: <Download className="h-4 w-4" />
      },
      { 
        title: 'Checklist de Lanzamiento', 
        url: '/docs/checklist-lanzamiento.pdf',
        description: 'Todos los pasos para un lanzamiento exitoso',
        type: 'pdf',
        icon: <Download className="h-4 w-4" />
      },
      { 
        title: 'Ejemplos de Proyectos Ganadores', 
        url: '/docs/proyectos-ganadores-ejemplos.pdf',
        description: 'Casos de estudio de proyectos exitosos',
        type: 'pdf',
        icon: <Download className="h-4 w-4" />
      },
      { 
        title: 'Estrategias para Demo Day', 
        url: '/docs/demo-day-estrategias.pdf',
        description: 'Cómo hacer una demo memorable',
        type: 'pdf',
        icon: <Download className="h-4 w-4" />
      }
    ],
  },
  {
    category: 'Recursos Avanzados',
    description: 'Herramientas y recursos para builders experimentados',
    icon: <Zap className="h-5 w-5" />,
    resources: [
      { 
        title: 'Análisis de Mercado - Oportunidades LATAM', 
        url: '/docs/analisis-mercado-latam.pdf',
        description: 'Investigación de oportunidades regionales',
        type: 'pdf',
        icon: <Download className="h-4 w-4" />
      },
      { 
        title: 'Tokenomics Avanzados', 
        url: '/docs/tokenomics-avanzados.pdf',
        description: 'Diseño de economías de tokens',
        type: 'pdf',
        icon: <Download className="h-4 w-4" />
      },
      { 
        title: 'Automatización de Workflows', 
        url: '/docs/automatizacion-workflows.pdf',
        description: 'Scripts y herramientas para optimizar desarrollo',
        type: 'pdf',
        icon: <Download className="h-4 w-4" />
      },
      { 
        title: 'Database de Founders y VCs en LATAM', 
        url: '/docs/founders-vcs-latam.pdf',
        description: 'Networking y oportunidades de inversión',
        type: 'pdf',
        icon: <Download className="h-4 w-4" />
      }
    ],
  }
]

export default function ResourceAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <Download className="h-4 w-4" />
      case 'video': return <Video className="h-4 w-4" />
      case 'github': return <Code className="h-4 w-4" />
      case 'tool': return <Code className="h-4 w-4" />
      default: return <ExternalLink className="h-4 w-4" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-funnel font-bold text-zinc-900 mb-2">
          Recursos Verano En Cadena
        </h1>
        <p className="text-zinc-600 text-lg">
          Todo lo que necesitas para convertirte en un impact player del ecosistema Web3
        </p>
      </div>

      {/* Resources Grid */}
      {RESOURCE_DATA.map((section, index) => (
        <div
          key={section.category}
          className="rounded-2xl border border-zinc-200 bg-white shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <button
            onClick={() => toggle(index)}
            className="flex w-full justify-between items-center px-6 py-5 text-left bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-orange-500 text-white rounded-lg">
                {section.icon}
              </div>
              <div>
                <h3 className="text-xl font-funnel font-semibold text-zinc-900">
                  {section.category}
                </h3>
                <p className="text-sm text-zinc-600 mt-1">
                  {section.description}
                </p>
              </div>
            </div>
            <ChevronDown
              className={`h-6 w-6 text-zinc-700 transition-transform duration-200 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          {openIndex === index && (
            <div className="px-6 py-6 bg-gradient-to-b from-orange-25 to-white">
              <div className="grid gap-4">
                {section.resources.map((item, i) => (
                  <Link
                    key={`${item.title}-${i}`}
                    href={item.url}
                    target={item.isExternal ? "_blank" : "_self"}
                    className="group flex items-start gap-4 p-4 rounded-xl bg-white border border-zinc-200 hover:border-orange-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-orange-100 group-hover:bg-orange-200 rounded-lg transition-colors">
                      {getResourceIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-zinc-900 group-hover:text-orange-600 transition-colors">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-sm text-zinc-600 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                          {item.type.toUpperCase()}
                        </span>
                        {item.isExternal && (
                          <span className="text-xs px-2 py-1 bg-zinc-100 text-zinc-600 rounded-full">
                            EXTERNO
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Footer CTA */}
      <div className="text-center mt-12 p-6 bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl">
        <h3 className="text-xl font-funnel font-bold text-zinc-900 mb-2">
          ¿Necesitas ayuda adicional?
        </h3>
        <p className="text-zinc-700 mb-4">
          Únete a nuestro Discord donde mentores y TAs están listos para ayudarte 24/7
        </p>
        <Link
          href="https://discord.gg/frutero-club"
          target="_blank"
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors"
        >
          <Users className="h-5 w-5" />
          Únete al Discord
        </Link>
      </div>
    </div>
  )
}