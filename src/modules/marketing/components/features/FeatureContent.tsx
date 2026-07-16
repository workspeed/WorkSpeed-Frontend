import { m, AnimatePresence } from 'framer-motion'
import type { CategoryContent, ModuleContent } from './features-data'
import {
    AdministracaoPanel,
    ComercialPanel,
    FeatureMotionProvider,
    FinanceiroPanel,
    OperacaoPanel,
} from './FeaturePanels'

const easeOut = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }

type FeatureContentProps = {
    moduleKey: string
    category: CategoryContent
    module: ModuleContent
}

function PanelRouter({ category, module }: Omit<FeatureContentProps, 'moduleKey'>) {
    switch (category.id) {
        case 'financeiro':
            return <FinanceiroPanel category={category} module={module} />
        case 'operacao':
            return <OperacaoPanel category={category} module={module} />
        case 'comercial':
            return <ComercialPanel category={category} module={module} />
        case 'administracao':
            return <AdministracaoPanel category={category} module={module} />
    }
}

/**
 * Roteador de conteúdo por categoria — cada área tem layout e animações próprias.
 */
export function FeatureContent({ moduleKey, category, module }: FeatureContentProps) {
    return (
        <FeatureMotionProvider>
            <AnimatePresence mode='wait'>
                <m.div
                    key={moduleKey}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={easeOut}
                >
                    <PanelRouter category={category} module={module} />
                </m.div>
            </AnimatePresence>
        </FeatureMotionProvider>
    )
}
