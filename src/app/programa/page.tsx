import { Metadata } from 'next'
import { VeranoHeroWrapper } from '@/components/programa/verano-hero-wrapper'
import { VeranoValueProposition } from '@/components/programa/verano-value-proposition'
import { VeranoOverview } from '@/components/programa/verano-overview'
import { VeranoSimpleCTA } from '@/components/programa/verano-simple-cta'
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

  // Set application deadline to 5 days from now for urgency
  const applicationDeadline = new Date()
  applicationDeadline.setDate(applicationDeadline.getDate() + 5)

  return (
    <PageWrapper>
      <div className="page pt-0">
        <div className="container">
          <div className="w-full md:max-w-3/4">
            <VeranoHeroWrapper deadline={deadline} />
            <VeranoValueProposition />
            <VeranoOverview />
            <VeranoSimpleCTA applicationDeadline={applicationDeadline} />
          </div>
        </div>
      </div>
    </PageWrapper>
  )
} 