
type TitleSectionProps = {
    title: string
    subtitle: string
    description?: string
    align: 'left' | 'center' | 'right'
}
export default function TitleSection({ title, subtitle, description, align }: TitleSectionProps) {
    return (
        <div className={`flex flex-col items-${align} justify-center gap-3`}>
            <h2 className="md:text-base text-sm font-bold uppercase text-orange">{title}</h2>
            <h3 className="md:text-3xl text-2xl font-bold">{subtitle}</h3>
            <p className="text-gray text-base">{description}</p>
        </div>
    )
}