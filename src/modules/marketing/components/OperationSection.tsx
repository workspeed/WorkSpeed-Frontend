import LeadingPageLayout from '@/layouts/LeadingPageLayout'
import HorizontalLine from './ui/HorizontalLine'
import TitleSection from './ui/TitleSection'
import { LuSearch, LuWandSparkles, LuRocket, LuTrendingUp } from 'react-icons/lu'
import type { IconType } from 'react-icons'

const STEPS = [
    {
        step: 1,
        icon: LuSearch,
        title: 'Entendemos seu negócio',
        description: 'Conhecemos seus processos e identificamos as necessidades da operação.',
    },
    {
        step: 2,
        icon: LuWandSparkles,
        title: 'Personalizamos a plataforma',
        description: 'Adaptamos módulos, fluxos e identidade visual para refletir sua forma de trabalhar.',
    },
    {
        step: 3,
        icon: LuRocket,
        title: 'Implantamos e treinamos',
        description: 'Configuramos tudo e capacitamos sua equipe para utilizar a plataforma.',
    },
    {
        step: 4,
        icon: LuTrendingUp,
        title: 'Evoluímos junto com você',
        description: 'O sistema acompanha o crescimento da empresa com novas funcionalidades e melhorias contínuas.',
    },
] as const

function StepIcon({ icon: Icon, step }: { icon: IconType; step: number }) {
    return (
        <div className='relative shrink-0'>
            <div className='bg-background flex h-12 w-12 md:w-15 md:h-15 items-center justify-center rounded-full border-2 border-purple/25 lg:mx-auto'>
                <Icon className='text-xl text-purple lg:text-2xl' strokeWidth={1.5} />
            </div>
            <span className='absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-linear-to-br from-orange to-purple text-xs font-bold text-white lg:h-6 lg:w-6 lg:text-sm'>
                {step}
            </span>
        </div>
    )
}

export function OperationSection() {
    return (
        <LeadingPageLayout>
            <div id='operation' className='py-25'>
                <TitleSection
                    title='como funciona'
                    subtitle='Nosso processo de implementação é simples e eficiente.'
                    description='Um processo simples para transformar seu negócio em uma operação mais eficiente.'
                    align='center'
                />

                <div className='relative mt-12 lg:mt-16'>
                    {/* Linha horizontal — desktop */}
                    <div
                        aria-hidden
                        className='absolute left-[12%] right-[12%] top-7 hidden h-px bg-purple/20 lg:block'
                    />

                    <ol className='flex flex-col lg:grid lg:grid-cols-4 lg:gap-6'>
                        {STEPS.map(({ step, icon, title, description }, index) => (
                            <li
                                key={step}
                                className='animate-tab-content-in flex flex-row items-start gap-4 pb-8 last:pb-0 lg:flex-col lg:items-center lg:pb-0 lg:text-center'
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className='flex flex-col items-center'>
                                    <StepIcon icon={icon} step={step} />
                                    {index < STEPS.length - 1 ? (
                                        <div
                                            aria-hidden
                                            className='mt-2 h-14 w-px bg-purple/20 lg:hidden'
                                        />
                                    ) : null}
                                </div>

                                <div className='min-w-0 flex-1 pt-1 text-left lg:flex-none lg:pt-0 lg:text-center'>
                                    <h4 className='text-base font-bold text-primary lg:mt-6 lg:text-lg'>
                                        {title}
                                    </h4>
                                    <p className='mt-2 text-sm leading-relaxed text-gray lg:max-w-xs'>
                                        {description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
            <HorizontalLine />
        </LeadingPageLayout>
    )
}
