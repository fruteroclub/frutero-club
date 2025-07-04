'use client'

import { useState } from 'react'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "¿Es gratis unirse a Frutero Club?",
      answer: "Sí, el acceso a Frutero Club es completamente gratuito. Creemos que el talento no debe limitarse por barreras económicas. Sin embargo, el valor está en la exclusividad y calidad de la comunidad."
    },
    {
      question: "¿Qué nivel técnico necesito?",
      answer: "No necesitas ser un experto, pero sí tener interés genuino en tecnología. Aceptamos desde estudiantes motivados hasta developers senior. Lo importante es tu mentalidad de builder y ganas de contribuir."
    },
    {
      question: "¿Cuánto tiempo requiere?",
      answer: "La participación es flexible. Puedes contribuir desde 2-3 horas semanales. Lo importante es la consistencia y calidad de tus aportes, no la cantidad de tiempo."
    },
    {
      question: "¿Cómo funciona la selección?",
      answer: "Nuestro proceso incluye: formulario inicial, review de perfil, entrevista de 30 minutos y onboarding. Evaluamos fit cultural, potencial técnico y compromiso con la comunidad."
    },
    {
      question: "¿Puedo aplicar si no vivo en México?",
      answer: "¡Absolutamente! Somos una comunidad global con miembros en 15+ países. Los eventos presenciales son en México, pero la mayoría de actividades son remotas y accesibles desde cualquier lugar."
    },
    {
      question: "¿Qué es el token $PULPA?",
      answer: "Es nuestro sistema de reputación que convierte tus contribuciones en oportunidades. Ganas $PULPA ayudando a otros, participando en eventos y construyendo proyectos. Con más $PULPA desbloqueas beneficios exclusivos."
    },
    {
      question: "¿Hay límite de edad para aplicar?",
      answer: "No hay límites estrictos de edad. Hemos tenido miembros exitosos desde los 16 hasta los 50+ años. Lo que importa es tu pasión por la tecnología y mentalidad de crecimiento."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-frutero-dark mb-4">
            Preguntas <span className="text-frutero-orange">frecuentes</span>
          </h2>
          <p className="text-xl text-frutero-dark/70 max-w-2xl mx-auto">
            Todo lo que necesitas saber antes de aplicar
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border-2 border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none"
                >
                  <h3 className="text-lg font-bold text-frutero-dark pr-4">
                    {faq.question}
                  </h3>
                  <div className={`w-8 h-8 rounded-full bg-frutero-orange/20 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-45' : ''
                  }`}>
                    <span className="text-frutero-orange font-bold text-xl">+</span>
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-8 pb-6">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-frutero-dark/70 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-16 text-center">
          <div className="bg-frutero-light/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-frutero-orange rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-xl font-bold text-frutero-dark mb-4">
              ¿No encuentras tu respuesta?
            </h3>
            <p className="text-frutero-dark/70 mb-6">
              Nuestro equipo está aquí para ayudarte con cualquier duda que tengas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-frutero-orange hover:bg-frutero-orange/90 text-white px-6 py-3 rounded-full font-bold transition-all duration-200">
                Contactar soporte 📧
              </button>
              <button className="border-2 border-frutero-orange text-frutero-orange hover:bg-frutero-orange/10 px-6 py-3 rounded-full font-bold transition-all duration-200">
                Join Discord 💬
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
                 <div className="mt-16">
           <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
             <div>
               <div className="text-3xl font-bold text-frutero-orange mb-2">&lt; 24h</div>
               <p className="text-sm text-frutero-dark/70">Tiempo de respuesta promedio</p>
             </div>
            <div>
              <div className="text-3xl font-bold text-frutero-green mb-2">98%</div>
              <p className="text-sm text-frutero-dark/70">Satisfacción en soporte</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-frutero-pink mb-2">24/7</div>
              <p className="text-sm text-frutero-dark/70">Comunidad activa</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 