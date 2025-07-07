'use client'

import { useState } from 'react'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: '¿Es gratis unirse a Frutero Club?',
      answer:
        'Sí, el acceso a Frutero Club es completamente gratuito. Creemos que el talento no debe limitarse por barreras económicas. Sin embargo, el valor está en la exclusividad y calidad de la comunidad.',
    },
    {
      question: '¿Qué nivel técnico necesito?',
      answer:
        'No necesitas ser un experto, pero sí tener interés genuino en tecnología. Aceptamos desde estudiantes motivados hasta developers senior. Lo importante es tu mentalidad de builder y ganas de contribuir.',
    },
    {
      question: '¿Cuánto tiempo requiere?',
      answer:
        'La participación es flexible. Puedes contribuir desde 2-3 horas semanales. Lo importante es la consistencia y calidad de tus aportes, no la cantidad de tiempo.',
    },
    {
      question: '¿Cómo funciona la selección?',
      answer:
        'Nuestro proceso incluye: formulario inicial, review de perfil, entrevista de 30 minutos y onboarding. Evaluamos fit cultural, potencial técnico y compromiso con la comunidad.',
    },
    {
      question: '¿Puedo aplicar si no vivo en México?',
      answer:
        '¡Absolutamente! Somos una comunidad global con miembros en 15+ países. Los eventos presenciales son en México, pero la mayoría de actividades son remotas y accesibles desde cualquier lugar.',
    },
    {
      question: '¿Qué es el token $PULPA?',
      answer:
        'Es nuestro sistema de reputación que convierte tus contribuciones en oportunidades. Ganas $PULPA ayudando a otros, participando en eventos y construyendo proyectos. Con más $PULPA desbloqueas beneficios exclusivos.',
    },
    {
      question: '¿Hay límite de edad para aplicar?',
      answer:
        'No hay límites estrictos de edad. Hemos tenido miembros exitosos desde los 16 hasta los 50+ años. Lo que importa es tu pasión por la tecnología y mentalidad de crecimiento.',
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="page container">
      <div className="section">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Preguntas <span className="text-primary">frecuentes</span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-foreground/70">
            Todo lo que necesitas saber antes de aplicar
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border-2 border-gray-100 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between px-8 py-6 text-left focus:outline-none"
                >
                  <h3 className="pr-4 text-lg font-bold text-foreground">
                    {faq.question}
                  </h3>
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 transition-transform duration-200 ${openIndex === index ? 'rotate-45' : ''
                      }`}
                  >
                    <span className="text-xl font-bold text-primary">
                      +
                    </span>
                  </div>
                </button>

                {openIndex === index && (
                  <div className="px-8 pb-6">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="leading-relaxed text-foreground/70">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
