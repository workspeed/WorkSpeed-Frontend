import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import LeadingPageLayout from '@/layouts/LeadingPageLayout'
import TitleSection from './ui/TitleSection'
import HorizontalLine from './ui/HorizontalLine'

const MODULES = [
    {
        id: 1,
        name: 'FINANCEIRO',
        title: 'Cada real sob controle',
        description:
            'Receitas, despesas e conciliação no mesmo lugar — sem planilha paralela.',
        features: [
            'Contas a pagar e receber',
            'Conciliação bancária automática',
            'Alertas de vencimento',
        ],
        footer: 'Relatórios e fluxos moldados ao seu regime contábil.',
    },
    {
        id: 2,
        name: 'OPERAÇÃO',
        title: 'Sua operação funcionando em sintonia',
        description:
            'Organize processos, equipes e atividades em um único ambiente.',
        features: [
            'Gestão de processos',
            'Acompanhamento de tarefas',
            'Controle operacional em tempo real',
        ],
        footer: 'Fluxos personalizados para a realidade da sua empresa.',
    },
    {
        id: 3,
        name: 'COMERCIAL',
        title: 'Mais controle sobre suas vendas',
        description:
            'Acompanhe oportunidades, clientes e resultados comerciais sem perder o fio da meada.',
        features: [
            'Gestão de clientes',
            'Funil de vendas',
            'Acompanhamento de oportunidades',
        ],
        footer: 'Uma visão clara para transformar oportunidades em resultados.',
    },
    {
        id: 4,
        name: 'ADMINISTRAÇÃO',
        title: 'Gestão centralizada e inteligente',
        description:
            'Tenha uma visão completa da sua empresa para tomar decisões melhores.',
        features: [
            'Controle de usuários',
            'Permissões personalizadas',
            'Indicadores estratégicos',
        ],
        footer: 'Mais clareza para administrar cada parte do negócio.',
    },
]

export function Features() {
    const [activeModule, setActiveModule] = useState(MODULES[0])

    return (
        <LeadingPageLayout>
            <div id="features" className="py-15">
                <TitleSection
                    title="funcionalidades"
                    subtitle="Tudo o que sua empresa precisa em uma única plataforma."
                    description="Módulos integrados que podem ser utilizados juntos ou personalizados conforme sua operação."
                    align="center"
                />

                <p className="mx-auto mt-4 max-w-xl text-center text-xs text-gray sm:text-sm">
                    Escolha uma área. Cada módulo se adapta ao seu negócio.
                </p>

                {/* Conteúdo do módulo */}
                <div className="w-fit mx-auto grid grid-cols-1 gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 ">
                    {/* Menu lateral */}
                    <div className="hidden lg:block">
                        <div className="sticky top-8 space-y-4">
                            {MODULES.map((module) => {
                                const isActive = activeModule.id === module.id

                                return (
                                    <button
                                        key={module.id}
                                        onClick={() => setActiveModule(module)}
                                        className={`
                                            block w-full border-l-2 py-2 pl-4
                                            text-left text-sm transition-all
                                            ${
                                                isActive
                                                    ? 'border-secondary font-semibold text-primary'
                                                    : 'border-gray-200 text-gray hover:border-gray-400'
                                            }
                                        `}
                                    >
                                        {module.name}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Conteúdo principal */}
                    <div className="min-h-100">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeModule.id}
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -20,
                                }}
                                transition={{
                                    duration: 0.35,
                                    ease: 'easeOut',
                                }}
                            >
                                {/* Título */}
                                <h3 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
                                    {activeModule.title}
                                </h3>

                                {/* Descrição */}
                                <p className="mt-4 max-w-xl text-base leading-relaxed text-gray">
                                    {activeModule.description}
                                </p>

                                {/* Lista de funcionalidades */}
                                <ul className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
                                    {activeModule.features.map((feature, index) => (
                                        <motion.li
                                            key={feature}
                                            initial={{
                                                opacity: 0,
                                                x: -10,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                            }}
                                            transition={{
                                                delay: index * 0.08,
                                                duration: 0.3,
                                            }}
                                            className="flex items-center gap-3 text-sm text-primary"
                                        >
                                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                                                ✓
                                            </span>

                                            {feature}
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Linha divisória */}
                                <div className="my-8 h-px w-full bg-gray-200" />

                                {/* Rodapé do módulo */}
                                <p className="max-w-2xl text-sm leading-relaxed text-gray">
                                    <span className="font-semibold text-secondary">
                                        Sob medida ·{' '}
                                    </span>

                                    {activeModule.footer}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="mt-8 sm:mt-12">
                    <HorizontalLine />
                </div>
            </div>
        </LeadingPageLayout>
    )
}