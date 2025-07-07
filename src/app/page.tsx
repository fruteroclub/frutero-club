import PageWrapper from '@/components/layout/page-wrapper'
import HeroSection from '@/components/landing/hero-section'
import StatsSection from '@/components/landing/stats-section'
import JourneySection from '@/components/landing/journey-section'
import TestimonialsSection from '@/components/landing/testimonials-section'
import PulpaSection from '@/components/landing/pulpa-section'
import FAQSection from '@/components/landing/faq-section'
import FinalCTASection from '@/components/landing/final-cta-section'
import ValueProposition from '@/components/landing/value-proposition'

export default function Home() {
  return (
    <PageWrapper>
      <HeroSection />
      <ValueProposition />
      <StatsSection />
      <JourneySection />
      <TestimonialsSection />
      <PulpaSection />
      <FAQSection />
      <FinalCTASection />
    </PageWrapper>
  )
}
