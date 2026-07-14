import LeadingPageLayout from '../../../layouts/LeadingPageLayout'
import HorizontalLine from './ui/HorizontalLine'

export function HeroSection() {
  return (
    <LeadingPageLayout className='py-24'>
      <header className="flex flex-col items-center justify-center py-24 mx-auto lg:max-w-4xl md:max-w-2xl max-w-xl gap-7 text-center">
        <h1 className="flex flex-col items-center gap-2 text-center text-5xl font-bold md:text-7xl">
          <span>Mais que um ERP</span>
          <span>
            Uma plataforma feita
            <span className="text-gradient-primary"> para sua empresa.</span>
          </span>
        </h1>

        <p className="text-gray text-base md:text-xl">
          A WorkSpeed personaliza módulos, processos e identidade visual para que seu 
          sistema acompanhe a forma como sua empresa trabalha.
        </p>

        <button className="bg-orange text-white px-7 py-3 rounded-full font-semibold hover:bg-orange/80 transition-colors cursor-not-allowed">
          Faça um teste grátis
        </button>
      </header>

      <HorizontalLine />
    </LeadingPageLayout>
  )
}
