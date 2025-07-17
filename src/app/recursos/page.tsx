import PageWrapper from '@/components/layout/page-wrapper'
import ResourceAccordion from '@/components/resources/ResourceAccordion'

export default function RecursosPage() {
  return (
    <PageWrapper>
      <main className="max-w-3xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-funnel font-bold text-orange-500 mb-12 text-center">
          Recursos del Club 🍍
        </h1>
        <ResourceAccordion />
      </main>
    </PageWrapper>
  )
}
