import {Nav} from '@/modules/marketing'
type LeadingPageLayoutProps = {
    children: React.ReactNode
    className?: string
}

export default function LeadingPageLayout({ children, className }: LeadingPageLayoutProps) {
    return (
        <div className={`bg-background px-7 md:px-15 lg:px-26 mx-auto ${className}`}>
            <Nav/>
            {children}
        </div>
    )
}