import { useEffect, useState } from 'react'
import TitleSection from './ui/TitleSection'
import HorizontalLine from './ui/HorizontalLine'
import LeadingPageLayout from '@/layouts/LeadingPageLayout'

const TAB_INTERVAL_MS = 4000

const TABS = [
    { label: 'Varejos', color: 'bg-orange', dotColors: ['bg-orange', 'bg-yellow', 'bg-red'] },
    { label: 'Logísticos', color: 'bg-purple', dotColors: ['bg-purple', 'bg-primary', 'bg-gray'] },
    { label: 'Clínicas', color: 'bg-green', dotColors: ['bg-green', 'bg-yellow', 'bg-orange'] },
] as const

type TabLabel = (typeof TABS)[number]['label']

type TabStat = {
    label: string
    value: string
    trend: string
}

type TabItem = {
    name: string
    detail: string
    status: string
}

type TabContent = {
    badge: string
    title: string
    description: string
    modules: string[]
    stats: TabStat[]
    items: TabItem[]
}

const ADAPTATION_METRICS = [
    {
        value: '100%',
        label: 'Fluxo personalizado',
        detail: 'Campos, etapas e telas do seu jeito',
        accentBar: 'bg-orange',
        accentBg: 'bg-orange/10',
        accentText: 'text-orange',
    },
    {
        value: '30+',
        label: 'Segmentos atendidos',
        detail: 'Varejo, indústria, serviços e mais',
        accentBar: 'bg-purple',
        accentBg: 'bg-purple/10',
        accentText: 'text-purple',
    },
    {
        value: '0',
        label: 'Processos engessados',
        detail: 'O sistema se adapta a você, não o contrário',
        accentBar: 'bg-green',
        accentBg: 'bg-green/10',
        accentText: 'text-green',
    },
] as const

const TAB_CONTENT: Record<TabLabel, TabContent> = {
    'Varejos': {
        badge: 'Configurado para varejo',
        title: 'Painel da Loja',
        description: 'Módulos, campos e etapas ajustados para operação de varejo.',
        modules: ['Vendas', 'Estoque', 'Clientes'],
        stats: [
            { label: 'Vendas do dia', value: 'R$ 12.840', trend: '+14%' },
            { label: 'Itens em falta', value: '6', trend: '-3%' },
            { label: 'Clientes ativos', value: '1.203', trend: '+7%' },
        ],
        items: [
            { name: 'Pedido #2841', detail: 'Balcão · 5 itens', status: 'Pronto p/ retirada' },
            { name: 'Reposição urgente', detail: 'Arroz 5kg · Estoque: 4 un', status: 'Solicitado' },
        ],
    },
    'Logísticos': {
        badge: 'Configurado para indústria',
        title: 'Produção & Expedição',
        description: 'Fluxo personalizado com etapas de qualidade e logística.',
        modules: ['OPs', 'Qualidade', 'Expedição'],
        stats: [
            { label: 'OPs abertas', value: '18', trend: '+5%' },
            { label: 'Peças produzidas', value: '4.280', trend: '+11%' },
            { label: 'Entregas no prazo', value: '96%', trend: '+2%' },
        ],
        items: [
            { name: 'OP #1187', detail: 'Lote A42 · 320 peças', status: 'Em inspeção' },
            { name: 'NF-e #4410', detail: 'Cliente Alfa · 1.200 un', status: 'Liberado' },
        ],
    },
    'Clínicas': {
        badge: 'Configurado para serviços',
        title: 'Agenda & Atendimentos',
        description: 'Campos e status criados para o fluxo da sua clínica.',
        modules: ['Agenda', 'Pacientes', 'Financeiro'],
        stats: [
            { label: 'Consultas hoje', value: '32', trend: '+9%' },
            { label: 'Pacientes ativos', value: '847', trend: '+4%' },
            { label: 'Taxa de ocupação', value: '88%', trend: '+6%' },
        ],
        items: [
            { name: 'Consulta 14:30', detail: 'Dra. Ana · Retorno', status: 'Confirmado' },
            { name: 'Exame pendente', detail: 'Carlos M. · Resultado', status: 'Aguardando' },
        ],
    },
}

function AdaptationMetrics() {
    return (
        <div className='mt-6 grid w-full grid-cols-3 gap-2 text-left sm:mt-8 sm:items-stretch sm:gap-4 lg:grid-cols-1 xl:grid-cols-3'>
            {ADAPTATION_METRICS.map((metric) => (
                <div
                    key={metric.label}
                    className='group relative flex h-full min-h-22 flex-col overflow-hidden rounded-xl bg-white p-2.5 ring-1 ring-black/5 transition-shadow hover:shadow-md sm:min-h-44 sm:rounded-2xl sm:p-5'
                >
                    <div className={`absolute inset-x-0 top-0 h-0.5 sm:h-1 ${metric.accentBar}`} />

                    <p className={`mt-2 shrink-0 text-base font-bold tracking-tight sm:mt-4 sm:h-9 sm:text-3xl ${metric.accentText}`}>
                        {metric.value}
                    </p>
                    <p className='mt-1 line-clamp-2 shrink-0 text-[10px] font-semibold leading-tight text-primary sm:mt-2 sm:min-h-10 sm:text-sm sm:leading-snug'>
                        {metric.label}
                    </p>
                    <p className='mt-1 hidden min-h-10 flex-1 text-xs leading-relaxed text-gray sm:block'>
                        {metric.detail}
                    </p>
                </div>
            ))}
        </div>
    )
}

function TabPanel({ content, accentColor }: { content: TabContent; accentColor: string }) {
    const accentText = accentColor.replace('bg-', 'text-')

    return (
        <div className='animate-tab-content-in px-3 py-3 sm:px-7 sm:py-6'>
            <div className='mb-3 flex flex-wrap items-center gap-2 sm:mb-5'>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold sm:px-2.5 sm:py-1 sm:text-xs ${accentColor} text-white`}>
                    {content.badge}
                </span>
                <div className='hidden flex-wrap gap-1.5 sm:flex'>
                    {content.modules.map((module) => (
                        <span
                            key={module}
                            className='rounded-full border border-black/8 bg-background px-2 py-0.5 text-xs font-medium text-gray'
                        >
                            {module}
                        </span>
                    ))}
                </div>
            </div>

            <div className='mb-3 sm:mb-5'>
                <h4 className='text-sm font-bold text-primary sm:text-lg'>{content.title}</h4>
                <p className='mt-0.5 hidden text-sm text-gray sm:block'>{content.description}</p>
            </div>

            <div className='mb-0 grid grid-cols-3 gap-1.5 sm:mb-5 sm:gap-3'>
                {content.stats.map((stat) => (
                    <div key={stat.label} className='rounded-lg bg-background p-2 sm:rounded-xl sm:p-3'>
                        <p className='line-clamp-2 text-[9px] leading-tight text-gray sm:line-clamp-none sm:text-xs'>{stat.label}</p>
                        <p className='mt-0.5 text-xs font-bold text-primary sm:mt-1 sm:text-base'>{stat.value}</p>
                        <p className={`text-[9px] font-medium sm:mt-0.5 sm:text-xs ${accentText}`}>{stat.trend}</p>
                    </div>
                ))}
            </div>

            <div className='mt-3 hidden flex-col gap-2 sm:flex'>
                <p className='text-xs font-semibold uppercase tracking-wide text-gray'>Recentes</p>
                {content.items.map((item) => (
                    <div
                        key={item.name}
                        className='flex flex-col gap-2 rounded-lg border border-black/5 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3'
                    >
                        <div className='min-w-0'>
                            <p className='text-sm font-semibold text-primary'>{item.name}</p>
                            <p className='text-xs text-gray'>{item.detail}</p>
                        </div>
                        <span className={`w-fit shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${accentColor} text-white`}>
                            {item.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export function AboutSection() {
    const [activeTab, setActiveTab] = useState<TabLabel>('Varejos')

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveTab((current) => {
                const currentIndex = TABS.findIndex((tab) => tab.label === current)
                const nextIndex = (currentIndex + 1) % TABS.length
                return TABS[nextIndex].label
            })
        }, TAB_INTERVAL_MS)

        return () => clearInterval(timer)
    }, [activeTab])

    const activeTabData = TABS.find((tab) => tab.label === activeTab) ?? TABS[0]
    const activeContent = TAB_CONTENT[activeTab]

    return (
        <LeadingPageLayout>
            <div id="about" className="grid grid-cols-1 gap-3 md:gap-6 lg:grid-cols-2 lg:gap-10">
                <div className="max-lg:text-center lg:text-left [&>div]:max-lg:items-center [&>div]:lg:items-start">
                    <TitleSection
                        title="Sobre nós"
                        subtitle="Um ERP que se molda ao seu negócio."
                        description="Cansado de mudar sua empresa para caber dentro de um sistema?
                        Na WorkSpeed fazemos o contrário. Entendemos seus processos, sua cultura e 
                        suas dores, e construímos um ERP que reflete exatamente como sua operação funciona 
                        - só que muito mais rápido, organizado e conectado."
                        align="left" />

                    <AdaptationMetrics />
                </div>

                <div className='overflow-hidden rounded-2xl bg-white'>
                    <div className='flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:px-7 sm:py-5'>
                        <div className='flex w-full flex-row justify-between gap-2 sm:w-auto sm:justify-start sm:gap-5'>
                            {TABS.map(({ label, color }) => (
                                <button
                                    key={label}
                                    type='button'
                                    onClick={() => setActiveTab(label)}
                                    className='flex flex-1 cursor-pointer flex-col items-center gap-1 sm:flex-none'
                                >
                                    <p className={`text-center text-xs sm:text-sm ${activeTab === label ? 'font-semibold text-primary' : 'text-gray'}`}>
                                        {label}
                                    </p>
                                    <div className='h-1 w-full max-w-20 rounded-full bg-black/5 sm:min-w-16'>
                                        {activeTab === label ? (
                                            <div
                                                key={activeTab}
                                                className={`h-full rounded-full ${color} animate-tab-progress`}
                                            />
                                        ) : (
                                            <div className='h-full w-0 rounded-full' />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div className='hidden items-center gap-2 sm:flex sm:justify-end'>
                            {activeTabData.dotColors.map((dotColor) => (
                                <span key={dotColor} className={`${dotColor} rounded-full p-[5px]`} />
                            ))}
                        </div>
                    </div>
                    <HorizontalLine />

                    <TabPanel key={activeTab} content={activeContent} accentColor={activeTabData.color} />
                </div>
                <div className="col-span-full">
                    <HorizontalLine />
                </div>
            </div>
        </LeadingPageLayout>
    )
}
