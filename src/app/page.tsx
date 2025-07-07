import PageWrapper from '@/components/layout/page-wrapper'
import HeroSection from '@/components/landing/hero-section'
import StatsSection from '@/components/landing/stats-section'
import JourneySection from '@/components/landing/journey-section'
import TestimonialsSection from '@/components/landing/testimonials-section'
import NetworkSection from '@/components/landing/network-section'
import BenefitsSection from '@/components/landing/benefits-section'
import EventsSection from '@/components/landing/events-section'
import PulpaSection from '@/components/landing/pulpa-section'
import ApplicationSection from '@/components/landing/application-section'
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
      <NetworkSection />
      <BenefitsSection />
      <EventsSection />
      <PulpaSection />
      <ApplicationSection />
      <FAQSection />
      <FinalCTASection />
    </PageWrapper>
  )
}
