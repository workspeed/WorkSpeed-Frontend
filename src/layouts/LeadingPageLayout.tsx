import {Nav} from '@/modules/marketing'
type LeadingPageLayoutProps = {
    children: React.ReactNode
    className?: string
}

export default function LeadingPageLayout({ children, className }: LeadingPageLayoutProps) {
    return (
        <div className={`bg-background ${className}`}>
            <Nav/>
            {children}
        </div>
    )
}