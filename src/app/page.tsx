import PageWrapper from '@/components/layout/page-wrapper'
import HeroSection from '@/components/sections/hero-section'
import StatsSection from '@/components/sections/stats-section'
import JourneySection from '@/components/sections/journey-section'
import TestimonialsSection from '@/components/sections/testimonials-section'
import NetworkSection from '@/components/sections/network-section'
import BenefitsSection from '@/components/sections/benefits-section'
import EventsSection from '@/components/sections/events-section'
import PulpaSection from '@/components/sections/pulpa-section'
import ApplicationSection from '@/components/sections/application-section'
import FAQSection from '@/components/sections/faq-section'
import FooterSection from '@/components/sections/footer-section'

export default function Home() {
  return (
    <PageWrapper>
      <HeroSection />
      <StatsSection />
      <JourneySection />
      <TestimonialsSection />
      <NetworkSection />
      <BenefitsSection />
      <EventsSection />
      <PulpaSection />
      <ApplicationSection />
      <FAQSection />
      <FooterSection />
    </PageWrapper>
  )
}
