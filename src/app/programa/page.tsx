import { Metadata } from 'next'
import { VeranoHeroWrapper } from '@/components/programa/verano-hero-wrapper'
import { VeranoValueProposition } from '@/components/programa/verano-value-proposition'
import PageWrapper from '@/components/layout/page-wrapper'

export const metadata: Metadata = {
  title: 'Verano En Cadena - Transforma Tu Carrera en 21 Días | Frutero Club',
  description: 'Programa elite de 21 días para transformar developers en founders globales. Únete a 200+ alumni que ya transformaron sus carreras.',
  keywords: 'startup, developer, founder, Centroamérica, Frutero Club, programación, emprendimiento',
}

export default function ProgramaPage() {
  // Set deadline to 21 days from now for demo purposes
  const deadline = new Date()
  deadline.setDate(deadline.getDate() + 21)

  return (
    <PageWrapper>
      <div className="page">
        <div className="container">
          <VeranoHeroWrapper deadline={deadline} />
          <VeranoValueProposition />
        </div>
      </div>
    </PageWrapper>
  )
} 