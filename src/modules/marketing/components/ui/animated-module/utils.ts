import type { ModuleStat } from './types'

/** Spring leve reutilizado nas micro-interações */
export const springLight = { type: 'spring' as const, stiffness: 320, damping: 28 }

export const easeOut = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }

export function isPositiveTrend(trend?: string) {
    return trend?.startsWith('+') ?? false
}

export function isCriticalStatus(status: string) {
    return ['Crítico', 'Urgente', 'Aviso'].includes(status)
}

export function isOpportunityStatus(status: string) {
    return ['Quente', 'Negociação', 'Fechado'].includes(status)
}

export function parseNumericValue(value: string): number | null {
    const normalized = value.replace(/\s/g, '').replace(/R\$/i, '')

    if (normalized.includes('k')) {
        const base = Number(normalized.replace(/k/i, '').replace(/\./g, '').replace(',', '.'))
        return Number.isFinite(base) ? base * 1000 : null
    }

    if (normalized.endsWith('%')) {
        const percent = Number(normalized.replace('%', '').replace(',', '.'))
        return Number.isFinite(percent) ? percent : null
    }

    const digits = normalized.replace(/[^\d,.-]/g, '')
    if (!digits) return null

    const parsed = Number(digits.replace(/\./g, '').replace(',', '.'))
    return Number.isFinite(parsed) ? parsed : null
}

export function formatAnimatedValue(original: string, current: number): string {
    if (original.includes('R$')) {
        if (original.includes('k')) {
            return `R$ ${Math.round(current / 1000)}k`
        }
        return `R$ ${Math.round(current).toLocaleString('pt-BR')}`
    }

    if (original.endsWith('%')) {
        const decimals = original.includes(',') ? 1 : 0
        return `${current.toFixed(decimals).replace('.', ',')}%`
    }

    if (original.includes('.')) {
        return Math.round(current).toLocaleString('pt-BR')
    }

    return String(Math.round(current))
}

export function findConversionStat(stats: ModuleStat[]) {
    return stats.find((stat) => stat.label.toLowerCase().includes('conversão'))
}
