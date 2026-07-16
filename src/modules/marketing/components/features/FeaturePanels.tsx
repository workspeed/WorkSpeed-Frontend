import { LazyMotion, domAnimation, m } from 'framer-motion'
import type { CategoryContent, ModuleContent } from './features-data'
import { ACCENT_STYLES } from './features-data'

const easeOut = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }
const springLight = { type: 'spring' as const, stiffness: 320, damping: 28 }

type PanelProps = {
    category: CategoryContent
    module: ModuleContent
}

/** Layout escaneável compartilhado — hierarquia fixa, animação por categoria */
function ModulePanelLayout({
    category,
    module,
    highlightVariant = 'default',
}: PanelProps & { highlightVariant?: 'default' | 'chart' | 'pulse' | 'ring' | 'shield' }) {
    const accent = ACCENT_STYLES[category.accent]

    return (
        <div className='flex flex-col gap-6 sm:gap-8'>
            {/* Headline + benefício */}
            <m.header
                className='space-y-2'
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={easeOut}
            >
                <h3 className='text-lg font-bold leading-tight text-primary sm:text-2xl'>{module.headline}</h3>
                <p className='max-w-prose text-sm leading-snug text-gray'>{module.benefit}</p>
                <p className={`text-[10px] font-semibold uppercase tracking-widest sm:text-xs ${accent.text}`}>
                    {module.subtitle}
                </p>
            </m.header>

            {/* Destaque visual */}
            <HighlightCard
                module={module}
                accent={accent}
                variant={highlightVariant}
            />

            {/* Bullets — máx. 3 */}
            <m.ul className='space-y-3' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, ...easeOut }}>
                {module.bullets.map((bullet, index) => (
                    <m.li
                        key={bullet}
                        className='flex items-center gap-3 text-sm text-primary'
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.06, ...easeOut }}
                    >
                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${accent.badge}`} />
                        {bullet}
                    </m.li>
                ))}
            </m.ul>
        </div>
    )
}

function HighlightCard({
    module,
    accent,
    variant,
}: {
    module: ModuleContent
    accent: (typeof ACCENT_STYLES)[keyof typeof ACCENT_STYLES]
    variant: 'default' | 'chart' | 'pulse' | 'ring' | 'shield'
}) {
    return (
        <m.div
            className={`relative overflow-hidden rounded-2xl border ${accent.border} ${accent.bg} px-5 py-5 sm:px-6 sm:py-6`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.08, ...springLight }}
        >
            <p className={`text-3xl font-bold tracking-tight sm:text-4xl ${accent.text}`}>{module.highlight.value}</p>
            <p className='mt-1 text-xs text-gray sm:text-sm'>{module.highlight.label}</p>

            {variant === 'chart' ? <FinanceiroSparkline accentClass={accent.text} /> : null}
            {variant === 'pulse' ? (
                <m.div
                    aria-hidden
                    className={`absolute -right-6 -top-6 h-20 w-20 rounded-full ${accent.badge} opacity-20 blur-2xl`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
            ) : null}
            {variant === 'ring' ? <ConversionRing value={module.highlight.value} accentClass={accent.text} /> : null}
        </m.div>
    )
}

function FinanceiroSparkline({ accentClass }: { accentClass: string }) {
    return (
        <m.svg viewBox='0 0 120 24' className={`mt-3 h-6 w-full opacity-60 ${accentClass}`} aria-hidden>
            <m.path
                d='M0 20 L30 16 L60 12 L90 8 L120 4'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
            />
        </m.svg>
    )
}

function ConversionRing({ value, accentClass }: { value: string; accentClass: string }) {
    const parsed = parseInt(value.replace(/\D/g, ''), 10) || 34
    const radius = 14
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (parsed / 100) * circumference

    return (
        <m.svg width='36' height='36' viewBox='0 0 36 36' className={`absolute right-4 top-4 ${accentClass}`} aria-hidden>
            <circle cx='18' cy='18' r={radius} fill='none' stroke='currentColor' strokeOpacity='0.15' strokeWidth='3' />
            <m.circle
                cx='18'
                cy='18'
                r={radius}
                fill='none'
                stroke='currentColor'
                strokeWidth='3'
                strokeLinecap='round'
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
            />
        </m.svg>
    )
}

export function FinanceiroPanel(props: PanelProps) {
    return <ModulePanelLayout {...props} highlightVariant='chart' />
}

export function OperacaoPanel(props: PanelProps) {
    return <ModulePanelLayout {...props} highlightVariant='pulse' />
}

export function ComercialPanel(props: PanelProps) {
    const variant = props.module.highlight.value.includes('%') ? 'ring' : 'default'
    return <ModulePanelLayout {...props} highlightVariant={variant} />
}

export function AdministracaoPanel(props: PanelProps) {
    return <ModulePanelLayout {...props} highlightVariant='default' />
}

export function FeatureMotionProvider({ children }: { children: React.ReactNode }) {
    return (
        <LazyMotion features={domAnimation} strict>
            {children}
        </LazyMotion>
    )
}
