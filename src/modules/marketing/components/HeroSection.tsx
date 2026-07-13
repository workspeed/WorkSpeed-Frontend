import LeadingPageLayout from '../../../layouts/LeadingPageLayout'

export function HeroSection() {
  return (
    <LeadingPageLayout className='py-24'>
      <header className="flex flex-col items-center justify-center py-24 mx-auto lg:max-w-4xl md:max-w-2xl max-w-xl gap-5 text-center">
        <h1 className="text-5xl md:text-7xl font-bold">Mais que um ERP <br /> Uma plataforma feita
        <span className="text-gradient-primary"> para sua empresa.</span></h1>

        <p className="text-gray text-base md:text-xl">
          A WorkSpeed personaliza módulos, processos e identidade visual para que seu 
          sistema acompanhe a forma como sua empresa trabalha.
        </p>

        <button className="bg-orange text-white px-7 py-3 rounded-full font-semibold hover:bg-orange/80 transition-colors cursor-not-allowed">
          Faça um teste grátis
        </button>
      </header>
    </LeadingPageLayout>
  )
}
