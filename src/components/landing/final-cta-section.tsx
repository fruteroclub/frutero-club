'use client'

export default function FooterSection() {
  return (
    <section className="page container">
      <div className="section">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-center text-white md:p-16">
          {/* Decorative elements */}
          <div className="absolute top-8 left-8 h-6 w-6 rounded-full bg-white/20"></div>
          <div className="absolute top-16 right-12 h-4 w-4 rounded-full bg-white/30"></div>
          <div className="absolute bottom-12 left-16 h-8 w-8 rounded-full bg-white/20"></div>
          <div className="absolute right-8 bottom-8">
            <span className="text-4xl">✨</span>
          </div>

          {/* Mascotas */}
          <div className="mb-8 flex justify-center space-x-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
              <span className="text-4xl">🍇</span>
            </div>
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
              <span className="text-4xl">🍎</span>
            </div>
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
              <span className="text-4xl">🍌</span>
            </div>
          </div>

          <div className="relative z-10 mx-auto max-w-4xl">
            <h2 className="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              Hackea tu destino
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl">
                Únete a la elite
              </span>
            </h2>

            <p className="mb-8 text-xl opacity-90 md:text-2xl">
              Cupos limitados. Aplicaciones
              <br />
              abiertas hasta el 31 de Enero.
            </p>

            <button className="inline-flex transform items-center gap-3 rounded-full bg-white px-12 py-4 text-xl font-bold text-primary shadow-2xl transition-all duration-200 hover:scale-105 hover:bg-gray-100">
              <span>✨</span>
              Aplica Ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
