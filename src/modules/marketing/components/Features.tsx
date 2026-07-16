import { useState } from 'react'
import LeadingPageLayout from '@/layouts/LeadingPageLayout'
import TitleSection from './ui/TitleSection'
import HorizontalLine from './ui/HorizontalLine'
import { FeatureContent } from './features/FeatureContent'
import { ACCENT_STYLES, FEATURE_CATEGORIES } from './features/features-data'
import type { CategoryId } from './features/features-data'

export function Features() {
    const [activeCategoryId, setActiveCategoryId] = useState<CategoryId>('financeiro')
    const [activeModuleLabel, setActiveModuleLabel] = useState(FEATURE_CATEGORIES[0].modules[0].label)

    const activeCategory =
        FEATURE_CATEGORIES.find((category) => category.id === activeCategoryId) ?? FEATURE_CATEGORIES[0]
    const activeModule =
        activeCategory.modules.find((module) => module.label === activeModuleLabel) ?? activeCategory.modules[0]
    const accent = ACCENT_STYLES[activeCategory.accent]

    const handleCategoryChange = (categoryId: CategoryId) => {
        const category = FEATURE_CATEGORIES.find((item) => item.id === categoryId) ?? FEATURE_CATEGORIES[0]
        setActiveCategoryId(categoryId)
        setActiveModuleLabel(category.modules[0].label)
    }

    return (
        <LeadingPageLayout>
            <div id='features' className='py-15'>
                <TitleSection
                    title='funcionalidades'
                    subtitle='Tudo o que sua empresa precisa em uma única plataforma.'
                    description='Módulos integrados que podem ser utilizados juntos ou personalizados conforme sua operação.'
                    align='center'
                />

                <p className='mx-auto mt-4 max-w-xl text-center text-xs text-gray sm:text-sm'>
                    Escolha uma área. Cada módulo se adapta ao seu negócio.
                </p>

                {/* Abas de categoria */}
                <div className='mt-6 grid w-full grid-cols-2 gap-2 sm:mt-8 sm:flex sm:flex-wrap sm:justify-center sm:gap-4'>
                    {FEATURE_CATEGORIES.map(({ id, label, icon: Icon, accent: categoryAccent }) => {
                        const isActive = activeCategoryId === id
                        const tabAccent = ACCENT_STYLES[categoryAccent]

                        return (
                            <button
                                key={id}
                                type='button'
                                onClick={() => handleCategoryChange(id)}
                                className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-xs transition-colors sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${
                                    isActive
                                        ? `${tabAccent.badge} border-transparent text-white`
                                        : `${tabAccent.bg} ${tabAccent.border} border text-primary hover:opacity-80`
                                }`}
                            >
                                <Icon className={`shrink-0 text-lg sm:text-2xl ${isActive ? 'text-white' : tabAccent.text}`} />
                                <span className='leading-tight'>{label}</span>
                            </button>
                        )
                    })}
                </div>

                <div className='mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8'>
                    {/* Menu lateral */}
                    <nav className='overflow-hidden rounded-xl border border-black/5 bg-white sm:rounded-2xl'>
                        <p className={`border-b border-black/5 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide sm:px-4 sm:py-3 sm:text-xs ${accent.text}`}>
                            {activeCategory.label}
                        </p>
                        <ul className='flex gap-1.5 overflow-x-auto p-2 scrollbar-none sm:gap-2 sm:p-3 lg:flex-col lg:gap-1 lg:overflow-x-visible lg:p-2'>
                            {activeCategory.modules.map((module) => {
                                const isActive = activeModuleLabel === module.label

                                return (
                                    <li key={module.label} className='shrink-0 lg:shrink'>
                                        <button
                                            type='button'
                                            onClick={() => setActiveModuleLabel(module.label)}
                                            className={`cursor-pointer whitespace-nowrap rounded-lg px-3 py-2 text-left text-xs transition-colors sm:px-4 sm:py-2.5 sm:text-sm lg:w-full lg:px-3 ${
                                                isActive
                                                    ? `${accent.bg} font-semibold text-primary ring-1 ${accent.ring}`
                                                    : 'text-gray hover:bg-background hover:text-primary'
                                            }`}
                                        >
                                            {module.label}
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>

                    {/* Painel de conteúdo — layout único por categoria */}
                    <div className='overflow-hidden rounded-xl bg-white ring-1 ring-black/5 sm:rounded-2xl'>
                        <div className={`border-b border-black/5 bg-linear-to-r ${accent.gradient} px-4 py-4 sm:px-6`}>
                            <div className='flex min-w-0 items-center gap-2'>
                                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-white sm:text-xs ${accent.badge}`}>
                                    {activeCategory.label}
                                </span>
                                <span className='truncate text-xs font-semibold text-primary sm:text-sm'>
                                    {activeModule.label}
                                </span>
                            </div>
                            <p className='mt-2 text-xs text-gray'>{activeCategory.tagline}</p>
                        </div>

                        <div className='px-4 py-6 sm:px-8 sm:py-8'>
                            <FeatureContent
                                moduleKey={`${activeCategoryId}-${activeModuleLabel}`}
                                category={activeCategory}
                                module={activeModule}
                            />

                            <p className='mt-8 border-t border-black/5 pt-5 text-xs text-gray'>
                                <span className={`font-semibold ${accent.text}`}>Sob medida · </span>
                                {activeCategory.adaptationLine}
                            </p>
                        </div>
                    </div>
                </div>

                <div className='mt-8 sm:mt-12'>
                    <HorizontalLine />
                </div>
            </div>
        </LeadingPageLayout>
    )
}
