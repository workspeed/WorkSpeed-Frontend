
type TitleSectionProps = {
    title: string
    subtitle: string
    description?: string
    align: 'left' | 'center' | 'right'
    className?: string
}

const ALIGN_CLASSES = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
} as const

export default function TitleSection({ title, subtitle, description, align, className }: TitleSectionProps) {
    return (
        <div className={`flex flex-col justify-center gap-3 ${ALIGN_CLASSES[align]} ${className ?? ''}`}>
            <h2 className='text-sm font-bold uppercase text-orange md:text-base'>{title}</h2>
            <h3 className='text-2xl font-bold md:text-3xl'>{subtitle}</h3>
            {description ? <p className='text-base text-gray'>{description}</p> : null}
        </div>
    )
}