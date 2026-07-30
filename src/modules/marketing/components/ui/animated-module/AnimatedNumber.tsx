import { useEffect, useState } from 'react'
import { animate, m } from 'framer-motion'
import { formatAnimatedValue, parseNumericValue } from './utils'

type AnimatedNumberProps = {
    value: string
    className?: string
    glow?: boolean
}

/** Contador animado — usado no variant financeiro */
export function AnimatedNumber({ value, className, glow = false }: AnimatedNumberProps) {
    const parsed = parseNumericValue(value)
    const [display, setDisplay] = useState(parsed ?? 0)

    useEffect(() => {
        if (parsed === null) return

        const controls = animate(0, parsed, {
            duration: 1.1,
            ease: 'easeOut',
            onUpdate: (latest) => setDisplay(latest),
        })

        return () => controls.stop()
    }, [parsed, value])

    if (parsed === null) {
        return <span className={className}>{value}</span>
    }

    return (
        <m.span
            className={`relative inline-block ${className ?? ''} ${glow ? 'text-purple' : ''}`}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
        >
            {formatAnimatedValue(value, display)}
            {glow ? (
                <m.span
                    aria-hidden
                    className='pointer-events-none absolute inset-0 rounded-md bg-purple/15 blur-md'
                    animate={{ opacity: [0.25, 0.55, 0.25] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                />
            ) : null}
        </m.span>
    )
}
