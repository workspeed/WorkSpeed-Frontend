import { useState } from 'react'
import { Link } from 'react-router'
import { HiBars3, HiXMark } from 'react-icons/hi2'

const navLinks = [
    'Sobre',
    'Como Funciona',
    'Funcionalidades',
    'Diferenciais',
    'Segmentos',
    'Planos',
] as const

export function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const closeMenu = () => setIsMenuOpen(false)

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 border-b-2 border-gray/20 px-5 py-5 transition-colors ${
                isMenuOpen
                    ? 'bg-background-white shadow-lg'
                    : 'bg-background-white lg:bg-background-white'
            }`}
        >
            <div className='flex items-center justify-between'>
                <img src='/logo.png' alt='WorkSpeed' className='w-30' />

                <ul className='hidden items-center justify-center gap-8 font-medium text-gray lg:flex'>
                    {navLinks.map((link) => (
                        <li
                            key={link}
                            className='cursor-pointer transition-colors hover:text-black'
                        >
                            {link}
                        </li>
                    ))}
                </ul>

                <ul className='hidden items-center justify-center gap-4 font-semibold lg:flex'>
                    <li className='cursor-pointer font-semibold text-secondary transition-colors hover:text-orange/80'>
                        <Link to='/login'>Login</Link>
                    </li>
                    <li className='text-2xl text-gray/60'>|</li>
                    <li className='cursor-not-allowed rounded-full bg-secondary px-4 py-2 text-white transition-colors hover:bg-orange/80'>
                        Teste Grátis
                    </li>
                </ul>

                <button
                    type='button'
                    className='rounded-lg p-2 text-gray transition-colors hover:bg-gray/10 hover:text-black lg:hidden'
                    onClick={() => setIsMenuOpen((open) => !open)}
                    aria-expanded={isMenuOpen}
                    aria-controls='mobile-menu'
                    aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                >
                    {isMenuOpen ? (
                        <HiXMark className='size-6' />
                    ) : (
                        <HiBars3 className='size-6' />
                    )}
                </button>
            </div>

            {isMenuOpen && (
                <div
                    id='mobile-menu'
                    className='-mx-5 mt-4 border-t border-gray/20 bg-background-white px-5 pt-4 pb-6 lg:hidden'
                >
                    <ul className='flex flex-col gap-x-4 gap-y-4 font-medium text-gray'>
                        {navLinks.map((link) => (
                            <li
                                key={link}
                                className='cursor-pointer transition-colors hover:text-black'
                                onClick={closeMenu}
                            >
                                {link}
                            </li>
                        ))}
                    </ul>

                    <ul className='mt-6 flex flex-row items-center justify-end gap-4 border-t border-gray/20 pt-4 font-semibold'>
                        <li
                            className='cursor-pointer text-secondary transition-colors hover:text-orange/80'
                            onClick={closeMenu}
                        >
                            <Link to='/login'>Login</Link>
                        </li>
                        <li className='text-2xl text-gray/60'>|</li>
                        <li className='cursor-not-allowed rounded-full bg-secondary px-4 py-2 text-center text-white transition-colors hover:bg-orange/80'>
                            Teste Grátis
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    )
}
