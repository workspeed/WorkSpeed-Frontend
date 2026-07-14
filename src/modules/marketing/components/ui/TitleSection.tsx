
type TitleSectionProps = {
    title: string
    subtitle: string
    description?: string
    align: 'left' | 'center' | 'right'
}
export default function TitleSection({ title, subtitle, description, align }: TitleSectionProps) {
    return (
        <div className={`flex flex-col items-${align} justify-center gap-3`}>
            <h2 className="text-base font-bold uppercase text-orange">{title}</h2>
            <h3 className="text-3xl font-bold">{subtitle}</h3>
            <p className="text-gray text-base md:text-base">{description}</p>
        </div>
    )
}