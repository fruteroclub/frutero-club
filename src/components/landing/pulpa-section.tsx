import Image from 'next/image'

export default function PulpaSection() {
  return (
    <section className="page container w-full gap-y-6">
      <div className="text-center">
        <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
          <span className="text-frutero-orange">$PULPA</span>: Tu{' '}
          <span className="text-frutero-orange">reputación</span> tiene{' '}
          <span className="text-frutero-orange">valor</span>
        </h2>
        <p className="mx-auto max-w-2xl text-xl text-foreground/70">
          El token que convierte tus contribuciones en oportunidades
        </p>
      </div>

      <div className="flex w-full max-w-6xl flex-col gap-2">
        <div className="-mb-4 flex w-full items-center justify-center">
          <div className="w-1/4 text-center">
            <h3 className="mb-2 text-xl font-bold text-frutero-orange">
              Gana $PULPA
            </h3>
            <p className="text-foreground/70">
              Por contribuir, enseñar y <br />
              ayudar a la comunidad
            </p>
          </div>
        </div>
        <div className="flex w-full flex-row gap-2">
          <div className="flex w-[28.75%] items-center justify-end">
            <div className="w-1/2 text-center">
              <h3 className="mb-2 text-xl font-bold text-frutero-orange">
                Niveles de acceso
              </h3>
              <p className="text-foreground/70">
                + $PULPA <br />
                + Beneficios <br />
                + Reconocimiento <br />
              </p>
            </div>
          </div>
          <div className="w-[42.5%]">
            <Image
              src="/images/fruits/pulpa.svg"
              alt="PULPA"
              width={100}
              height={100}
              className="w-full"
            />
          </div>
          <div className="-mt-4 flex w-[28.75%] items-center justify-start">
            <div className="w-1/2 text-center">
              <h3 className="mb-2 text-xl font-bold text-frutero-orange">
                Participa en governance
              </h3>
              <p className="text-foreground/70">
                Vota en decisiones importantes del club
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-3 flex items-center justify-center">
          <div className="w-1/4 text-center">
            <h3 className="mb-2 text-xl font-bold text-frutero-orange">
              Desbloquea recompensas
            </h3>
            <p className="text-foreground/70">
              Acceso a eventos exclusivos y <br />
              oportunidades
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-20 text-center">
        <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-frutero-orange to-frutero-pink p-8 text-white md:p-12">
          <h3 className="mb-4 text-2xl font-bold md:text-3xl">
            ¿Listo para empezar a ganar $PULPA?
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-white/90">
            Únete a la comunidad y comienza a construir tu reputación mientras
            ayudas a otros
          </p>
          <button className="transform rounded-full bg-white px-8 py-4 font-bold text-foreground shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-100">
            Comenzar a ganar $PULPA 🚀
          </button>
        </div>
      </div>

      {/* Info adicional */}
      <div className="mx-auto mt-16 max-w-4xl rounded-2xl bg-background/50 p-8">
        <div className="grid gap-6 text-center md:grid-cols-3">
          <div>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-frutero-orange">
              <span className="text-2xl">🏆</span>
            </div>
            <h4 className="mb-2 font-bold text-foreground">
              Rangos Exclusivos
            </h4>
            <p className="text-sm text-foreground/70">
              Desbloquea rangos especiales según tu $PULPA
            </p>
          </div>

          <div>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-frutero-green">
              <span className="text-2xl">🎯</span>
            </div>
            <h4 className="mb-2 font-bold text-foreground">
              Misiones Semanales
            </h4>
            <p className="text-sm text-foreground/70">
              Completa misiones y gana $PULPA extra
            </p>
          </div>

          <div>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-frutero-pink">
              <span className="text-2xl">🌟</span>
            </div>
            <h4 className="mb-2 font-bold text-foreground">Leaderboard</h4>
            <p className="text-sm text-foreground/70">
              Compite con otros miembros por el top
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
