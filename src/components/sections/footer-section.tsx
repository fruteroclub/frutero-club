'use client'

export default function FooterSection() {
  const socialLinks = [
    { name: "Twitter", url: "#", icon: "🐦" },
    { name: "Discord", url: "#", icon: "💬" },
    { name: "LinkedIn", url: "#", icon: "💼" },
    { name: "Github", url: "#", icon: "🚀" }
  ]

  const resourceLinks = [
    { name: "Blog", url: "#" },
    { name: "Eventos", url: "#" },
    { name: "Documentación", url: "#" }
  ]

  const legalLinks = [
    { name: "Términos", url: "#" },
    { name: "Privacidad", url: "#" },
    { name: "Contacto", url: "#" }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-white">
      {/* Main CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-frutero-orange rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-8 left-8 w-6 h-6 bg-white/20 rounded-full"></div>
            <div className="absolute top-16 right-12 w-4 h-4 bg-white/30 rounded-full"></div>
            <div className="absolute bottom-12 left-16 w-8 h-8 bg-white/20 rounded-full"></div>
            <div className="absolute bottom-8 right-8">
              <span className="text-4xl">✨</span>
            </div>
            
            {/* Mascotas */}
            <div className="flex justify-center space-x-8 mb-8">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-4xl">🍇</span>
              </div>
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-4xl">🍎</span>
              </div>
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-4xl">🍌</span>
              </div>
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Hackea tu destino
                <br />
                <span className="text-3xl md:text-4xl lg:text-5xl">Únete a la elite</span>
              </h2>
              
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Cupos limitados. Aplicaciones 
                <br />
                abiertas hasta el 31 de Enero.
              </p>
              
              <button className="bg-white text-frutero-orange hover:bg-gray-100 px-12 py-4 rounded-full text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-3">
                <span>✨</span>
                Aplica Ahora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="py-16 bg-frutero-light/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Logo y descripción */}
            <div className="md:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-frutero-dark font-funnel">
                  FRUTERO
                </h3>
                <p className="text-sm text-frutero-dark/70 mt-2">
                  La comunidad de Builders
                  <br />
                  que crea Founders
                </p>
              </div>
            </div>
            
            {/* Comunidad */}
            <div>
              <h4 className="font-bold text-frutero-dark mb-4">Comunidad</h4>
              <ul className="space-y-3">
                {socialLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.url}
                      className="text-frutero-dark/70 hover:text-frutero-orange transition-colors duration-200 flex items-center gap-2"
                    >
                      <span>{link.icon}</span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Recursos */}
            <div>
              <h4 className="font-bold text-frutero-dark mb-4">Recursos</h4>
              <ul className="space-y-3">
                {resourceLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.url}
                      className="text-frutero-dark/70 hover:text-frutero-orange transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h4 className="font-bold text-frutero-dark mb-4">Legal</h4>
              <ul className="space-y-3">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.url}
                      className="text-frutero-dark/70 hover:text-frutero-orange transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <button 
                  onClick={scrollToTop}
                  className="bg-frutero-orange hover:bg-frutero-orange/90 text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Volver Al Inicio ↑
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright */}
      <section className="py-8 bg-frutero-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm mb-4 md:mb-0">
              © 2025 Frutero Club. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <p className="text-white/70 text-sm">
                Hecho con 🥑 en México
              </p>
              <div className="flex items-center gap-2">
                <span className="text-frutero-orange">🚀</span>
                <span className="text-white/70 text-sm">v2.0</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
} 