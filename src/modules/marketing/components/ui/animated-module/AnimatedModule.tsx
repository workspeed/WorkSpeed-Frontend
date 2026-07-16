import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion'
import { LuCheck, LuBell, LuCalendar } from 'react-icons/lu'
import { AnimatedNumber } from './AnimatedNumber'
import type { AnimatedModuleProps, ModuleItem, ModuleStat } from './types'
import {
    easeOut,
    isCriticalStatus,
    isOpportunityStatus,
    isPositiveTrend,
    parseNumericValue,
    springLight,
} from './utils'

// ─── Layout compartilhado ────────────────────────────────────────────────────

function ModuleHeader({ title, description }: { title: string; description: string }) {
    return (
        <m.div
            className='mb-3 sm:mb-5'
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={easeOut}
        >
            <h4 className='text-sm font-bold text-primary sm:text-lg'>{title}</h4>
            <p className='mt-1 hidden text-sm text-gray sm:block'>{description}</p>
        </m.div>
    )
}

function StatCard({
    stat,
    children,
    className = '',
}: {
    stat: ModuleStat
    children: React.ReactNode
    className?: string
}) {
    return (
        <m.div
            className={`rounded-lg bg-background p-2 sm:rounded-xl sm:p-3 ${className}`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={springLight}
        >
            <p className='line-clamp-2 text-[9px] leading-tight text-gray sm:text-xs'>{stat.label}</p>
            <div className='mt-0.5 text-xs font-bold text-primary sm:mt-1 sm:text-base'>{children}</div>
            {stat.trend ? (
                <p
                    className={`text-[9px] font-medium sm:text-xs ${
                        isPositiveTrend(stat.trend) ? 'text-purple' : 'text-gray'
                    }`}
                >
                    {stat.trend}
                </p>
            ) : null}
        </m.div>
    )
}

// ─── Financeiro: contadores + gráfico + brilho ─────────────────────────────

function FinanceiroChart() {
    return (
        <m.svg
            viewBox='0 0 120 48'
            className='mt-3 h-12 w-full text-purple'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.5 }}
        >
            <defs>
                <linearGradient id='finance-gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
                    <stop offset='0%' stopColor='#613EBE' />
                    <stop offset='100%' stopColor='#DF6900' />
                </linearGradient>
            </defs>
            <m.path
                d='M0 38 L24 30 L48 28 L72 18 L96 14 L120 8'
                fill='none'
                stroke='url(#finance-gradient)'
                strokeWidth='2.5'
                strokeLinecap='round'
                variants={{
                    hidden: { pathLength: 0, opacity: 0.3 },
                    visible: { pathLength: 1, opacity: 1 },
                }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
            />
            <m.circle
                cx='120'
                cy='8'
                r='3'
                fill='#DF6900'
                variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: { scale: 1, opacity: 1 },
                }}
                transition={{ delay: 1.2, ...springLight }}
            />
        </m.svg>
    )
}

function FinanceiroPanel({ stats, items }: { stats: ModuleStat[]; items: ModuleItem[] }) {
    return (
        <>
            <div className='mb-3 grid grid-cols-3 gap-1.5 sm:mb-5 sm:gap-3'>
                {stats.map((stat) => (
                    <StatCard key={stat.label} stat={stat}>
                        <AnimatedNumber
                            value={stat.value}
                            glow={isPositiveTrend(stat.trend) || stat.label.toLowerCase().includes('saldo')}
                        />
                    </StatCard>
                ))}
            </div>

            <FinanceiroChart />

            <DemoItems items={items} variant='financeiro' />
        </>
    )
}

// ─── Operação: movimento entrada/saída + pulso crítico ─────────────────────

function OperacaoPanel({ stats, items }: { stats: ModuleStat[]; items: ModuleItem[] }) {
    return (
        <>
            <div className='mb-3 grid grid-cols-3 gap-1.5 sm:mb-5 sm:gap-3'>
                {stats.map((stat, index) => (
                    <m.div
                        key={stat.label}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -14 : 14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ delay: index * 0.08, ...easeOut }}
                    >
                        <StatCard stat={stat}>
                            <span>{stat.value}</span>
                        </StatCard>
                    </m.div>
                ))}
            </div>

            <DemoItems items={items} variant='operacao' />
        </>
    )
}

// ─── Comercial: pipeline + conversão circular ──────────────────────────────

function ConversionRing({ value }: { value: string }) {
    const parsed = parseNumericValue(value) ?? 34
    const radius = 18
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (parsed / 100) * circumference

    return (
        <m.svg
            width='44'
            height='44'
            viewBox='0 0 44 44'
            className='mx-auto mb-1'
            initial={{ rotate: -90, opacity: 0 }}
            whileInView={{ rotate: -90, opacity: 1 }}
            viewport={{ once: true }}
            transition={easeOut}
        >
            <circle cx='22' cy='22' r={radius} fill='none' stroke='#EEEFF4' strokeWidth='4' />
            <m.circle
                cx='22'
                cy='22'
                r={radius}
                fill='none'
                stroke='#613EBE'
                strokeWidth='4'
                strokeLinecap='round'
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                whileInView={{ strokeDashoffset: offset }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
            />
        </m.svg>
    )
}

function PipelineBubbles() {
    const stages = ['Lead', 'Proposta', 'Fechado']

    return (
        <div className='mb-3 flex items-end justify-center gap-2 sm:mb-4 sm:gap-3'>
            {stages.map((stage, index) => (
                <m.div
                    key={stage}
                    className='flex flex-col items-center gap-1'
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, ...springLight }}
                >
                    <m.div
                        className='rounded-full bg-purple/15 ring-2 ring-purple/30'
                        style={{ width: 28 + index * 10, height: 28 + index * 10 }}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 2 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <span className='text-[9px] font-medium text-gray sm:text-[10px]'>{stage}</span>
                </m.div>
            ))}
        </div>
    )
}

function ComercialPanel({ stats, items }: { stats: ModuleStat[]; items: ModuleItem[] }) {
    return (
        <>
            <PipelineBubbles />

            <div className='mb-3 grid grid-cols-3 gap-1.5 sm:mb-5 sm:gap-3'>
                {stats.map((stat) => (
                    <StatCard key={stat.label} stat={stat}>
                        {stat.label.toLowerCase().includes('conversão') ? (
                            <div className='flex flex-col items-center'>
                                <ConversionRing value={stat.value} />
                                <span>{stat.value}</span>
                            </div>
                        ) : (
                            <span>{stat.value}</span>
                        )}
                    </StatCard>
                ))}
            </div>

            <DemoItems items={items} variant='comercial' />
        </>
    )
}

// ─── Administração: agenda, notificações, permissões ───────────────────────

function AdministracaoPanel({
    moduleLabel,
    stats,
    items,
}: {
    moduleLabel: string
    stats: ModuleStat[]
    items: ModuleItem[]
}) {
    const isAgenda = moduleLabel.toLowerCase().includes('agenda')
    const isNotifications = moduleLabel.toLowerCase().includes('notifica')
    const isPermissions = moduleLabel.toLowerCase().includes('usuário') || moduleLabel.toLowerCase().includes('permiss')

    return (
        <>
            {isAgenda ? <AgendaTimeline items={items} /> : null}

            <div className='mb-3 grid grid-cols-3 gap-1.5 sm:mb-5 sm:gap-3'>
                {stats.map((stat, index) => (
                    <m.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.07, ...springLight }}
                    >
                        <StatCard stat={stat}>
                            <span>{stat.value}</span>
                        </StatCard>
                    </m.div>
                ))}
            </div>

            <DemoItems
                items={items}
                variant='administracao'
                adminMode={isNotifications ? 'notifications' : isPermissions ? 'permissions' : 'default'}
            />
        </>
    )
}

function AgendaTimeline({ items }: { items: ModuleItem[] }) {
    return (
        <div className='mb-3 hidden sm:mb-4 sm:block'>
            <div className='relative flex items-center justify-between px-2'>
                <div className='absolute inset-x-4 top-1/2 h-px -translate-y-1/2 bg-purple/20' />
                {['09:00', '10:30', '14:00', '16:30'].map((time, index) => (
                    <m.div
                        key={time}
                        className='relative z-10 flex flex-col items-center gap-1'
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.12, ...easeOut }}
                    >
                        <m.div
                            className={`flex h-6 w-6 items-center justify-center rounded-full ${
                                index === 1 ? 'bg-purple text-white' : 'bg-background text-gray ring-1 ring-purple/20'
                            }`}
                            animate={index === 1 ? { scale: [1, 1.08, 1] } : undefined}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <LuCalendar className='text-[10px]' />
                        </m.div>
                        <span className='text-[9px] text-gray'>{time}</span>
                    </m.div>
                ))}
            </div>
            <p className='mt-2 text-center text-[10px] text-gray'>
                {items[0]?.title ?? 'Compromisso'} · {items[0]?.detail ?? ''}
            </p>
        </div>
    )
}

// ─── Lista de demonstração com comportamento por variant ───────────────────

type DemoItemsProps = {
    items: ModuleItem[]
    variant: AnimatedModuleProps['variant']
    adminMode?: 'default' | 'notifications' | 'permissions'
}

function DemoItems({ items, variant, adminMode = 'default' }: DemoItemsProps) {
    return (
        <div className='flex flex-1 flex-col gap-2'>
            <p className='hidden text-xs font-semibold uppercase tracking-wide text-gray sm:block'>Demonstração</p>

            <AnimatePresence mode='popLayout'>
                {items.map((item, index) => {
                    const isMobileHidden = index > 0
                    const critical = isCriticalStatus(item.status)
                    const opportunity = isOpportunityStatus(item.status)

                    return (
                        <m.div
                            key={item.title}
                            layout
                            className={`flex flex-col gap-1.5 rounded-lg border border-black/5 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:py-2.5 ${
                                isMobileHidden ? 'hidden sm:flex' : ''
                            }`}
                            initial={
                                variant === 'operacao'
                                    ? { opacity: 0, x: index % 2 === 0 ? -24 : 24 }
                                    : variant === 'administracao' && adminMode === 'notifications'
                                      ? { opacity: 0, x: 32 }
                                      : { opacity: 0, y: 12 }
                            }
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            whileHover={
                                variant === 'operacao'
                                    ? { scale: 1.02, rotate: index % 2 === 0 ? 0.6 : -0.6 }
                                    : variant === 'comercial' && opportunity
                                      ? { scale: 1.03, boxShadow: '0 8px 24px rgba(97, 62, 190, 0.15)' }
                                      : { y: -2 }
                            }
                            whileTap={{ scale: 0.98 }}
                            transition={{ delay: index * 0.08, ...springLight }}
                        >
                            <div className='flex min-w-0 items-start gap-2'>
                                {variant === 'administracao' && adminMode === 'permissions' ? (
                                    <m.span
                                        className='mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green/15 text-green'
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + index * 0.1, ...springLight }}
                                    >
                                        <LuCheck className='text-xs' />
                                    </m.span>
                                ) : null}

                                {variant === 'administracao' && adminMode === 'notifications' ? (
                                    <m.span
                                        className='mt-0.5 text-purple'
                                        animate={{ x: [8, 0], opacity: [0, 1] }}
                                        transition={{ duration: 0.5, ease: 'easeOut' }}
                                    >
                                        <LuBell className='text-sm' />
                                    </m.span>
                                ) : null}

                                <div className='min-w-0'>
                                    <p className='text-xs font-semibold text-primary sm:text-sm'>{item.title}</p>
                                    <p className='text-[10px] text-gray sm:text-xs'>{item.detail}</p>
                                </div>
                            </div>

                            <m.span
                                layoutId={`status-${item.title}`}
                                className={`w-fit shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium text-white sm:px-2.5 sm:py-1 sm:text-xs ${
                                    critical ? 'bg-red' : opportunity ? 'bg-orange' : 'bg-purple'
                                }`}
                                animate={
                                    critical && variant === 'operacao'
                                        ? { scale: [1, 1.06, 1], opacity: [1, 0.85, 1] }
                                        : undefined
                                }
                                transition={
                                    critical && variant === 'operacao'
                                        ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
                                        : springLight
                                }
                            >
                                {item.status}
                            </m.span>
                        </m.div>
                    )
                })}
            </AnimatePresence>
        </div>
    )
}

// ─── Componente principal ────────────────────────────────────────────────────

function VariantPanel(props: AnimatedModuleProps) {
    switch (props.variant) {
        case 'financeiro':
            return <FinanceiroPanel stats={props.stats} items={props.items} />
        case 'operacao':
            return <OperacaoPanel stats={props.stats} items={props.items} />
        case 'comercial':
            return <ComercialPanel stats={props.stats} items={props.items} />
        case 'administracao':
            return (
                <AdministracaoPanel
                    moduleLabel={props.moduleLabel}
                    stats={props.stats}
                    items={props.items}
                />
            )
    }
}

/**
 * Painel animado reutilizável — aplica micro-interações distintas por variant.
 * Usa LazyMotion + domAnimation para bundle leve.
 */
export function AnimatedModule(props: AnimatedModuleProps) {
    return (
        <LazyMotion features={domAnimation} strict>
            <m.div
                key={props.moduleKey}
                className='flex h-full flex-col'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={easeOut}
            >
                <ModuleHeader title={props.title} description={props.description} />
                <VariantPanel {...props} />
            </m.div>
        </LazyMotion>
    )
}
