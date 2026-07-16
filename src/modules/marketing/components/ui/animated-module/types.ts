export type ModuleVariant = 'financeiro' | 'operacao' | 'comercial' | 'administracao'

export type ModuleStat = {
    label: string
    value: string
    trend?: string
}

export type ModuleItem = {
    title: string
    detail: string
    status: string
}

export type AnimatedModuleProps = {
    /** Chave única para remontar animações ao trocar módulo */
    moduleKey: string
    variant: ModuleVariant
    moduleLabel: string
    title: string
    description: string
    stats: ModuleStat[]
    items: ModuleItem[]
}
