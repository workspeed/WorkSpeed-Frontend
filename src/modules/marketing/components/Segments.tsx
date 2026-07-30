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

function pad(id: number) {
    return String(id).padStart(2, '0')
}

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

                {/* Abas — mobile (carrossel horizontal) */}
                <div className="mt-8 lg:hidden">
                    <div className="flex gap-2 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-none] [&::-webkit-scrollbar]:hidden">
                        {MODULES.map((module) => {
                            const isActive = activeModule.id === module.id
                            return (
                                <button
                                    key={module.id}
                                    onClick={() => setActiveModule(module)}
                                    className={`
                                        relative shrink-0 rounded-full px-4 py-2 text-xs
                                        font-semibold tracking-wide whitespace-nowrap
                                        transition-colors
                                        ${
                                            isActive
                                                ? 'text-white'
                                                : 'bg-background-white text-gray'
                                        }
                                    `}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="mobile-active-pill"
                                            className="absolute inset-0 -z-10 rounded-full bg-gradient-primary"
                                            transition={{ duration: 0.3, ease: 'easeOut' }}
                                        />
                                    )}
                                    {module.name}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Conteúdo do módulo */}
                <div className="mt-8 grid  grid-cols-1 gap-8 lg:mt-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
                    {/* Menu lateral — desktop */}
                    <div className="hidden lg:block">
                        <div className="sticky top-8 space-y-1">
                            {MODULES.map((module) => {
                                const isActive = activeModule.id === module.id

                                return (
                                    <button
                                        key={module.id}
                                        onClick={() => setActiveModule(module)}
                                        className="group relative flex w-full items-baseline
                                            gap-3 py-3 pl-4 text-left transition-colors"
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="active-indicator"
                                                className="absolute inset-y-0 left-0 w-0.5
                                                    bg-gradient-primary"
                                                transition={{
                                                    duration: 0.35,
                                                    ease: 'easeOut',
                                                }}
                                            />
                                        )}

                                        <span
                                            className={`
                                                font-mono text-[11px] transition-colors
                                                ${
                                                    isActive
                                                        ? 'text-secondary'
                                                        : 'text-gray-400 group-hover:text-gray'
                                                }
                                            `}
                                        >
                                            {pad(module.id)}
                                        </span>

                                        <span
                                            className={`
                                                text-sm transition-colors
                                                ${
                                                    isActive
                                                        ? 'font-semibold text-primary'
                                                        : 'text-gray group-hover:text-primary'
                                                }
                                            `}
                                        >
                                            {module.name}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Card principal */}
                    <div className="relative min-h-100 overflow-hidden rounded-3xl
                        border-gradient-primary px-6 py-10 sm:px-10 sm:py-12"
                    >
                        {/* Watermark do número do módulo */}
                        <span
                            aria-hidden
                            className="pointer-events-none absolute -top-6 right-4
                                select-none font-serif text-[9rem] leading-none
                                font-bold text-primary/5 sm:text-[11rem]"
                        >
                            {pad(activeModule.id)}
                        </span>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeModule.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.35, ease: 'easeOut' }}
                                className="relative"
                            >
                                {/* Eyebrow */}
                                <span className="font-mono text-xs tracking-widest text-secondary">
                                    MÓDULO {pad(activeModule.id)}
                                </span>

                                {/* Título */}
                                <h3 className="mt-3 max-w-2xl text-3xl font-semibold
                                    tracking-tight text-primary sm:text-4xl"
                                >
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
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: index * 0.08,
                                                duration: 0.3,
                                            }}
                                            className="flex items-center gap-3 text-sm text-primary"
                                        >
                                            <span className="flex h-5 w-5 shrink-0
                                                items-center justify-center rounded-full
                                                bg-gradient-primary text-[10px] text-white"
                                            >
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