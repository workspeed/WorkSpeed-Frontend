import type React from "react"

type LayoutLoginProps = {
    children: React.ReactNode
    aside?: React.ReactNode
}

export function LayoutLogin({ children, aside }: LayoutLoginProps) {
    return (
        <div className="bg-background flex h-screen">
            <div className="hidden lg:flex flex-1">
                {aside}
            </div>
            <div className="flex flex-1 items-center justify-center">
                {children}
            </div>
        </div>
    )
}