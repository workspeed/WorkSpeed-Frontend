import { motion } from "framer-motion";
import {
    FaBoxesStacked,
    FaChartLine,
    FaFileLines,
    FaSliders,
} from "react-icons/fa6";
import { useState } from "react";

type Streak = {
    id: number;
    top: number; // % vertical dentro do painel
    width: number; // px
    duration: number; // s
    delay: number; // s
};

function makeStreaks(count: number): Streak[] {
    return Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: 5 + Math.random() * 90,
        width: 120 + Math.random() * 220,
        duration: 5 + Math.random() * 6,
        delay: Math.random() * 6,
    }));
}

const features = [
    {
        text: "Gestão financeira integrada",
        icon: FaChartLine,
    },
    {
        text: "Controle de estoque em tempo real",
        icon: FaBoxesStacked,
    },
    {
        text: "Relatórios personalizáveis",
        icon: FaFileLines,
    },
    {
        text: "Fluxos de trabalho sob medida para sua empresa",
        icon: FaSliders,
    },
];

export function LoginSidePanel() {
    const [streaks] = useState<Streak[]>(() => makeStreaks(12));
    return (
        <div
            className="
            relative
            overflow-hidden
            flex
            flex-col
            justify-center
            h-full
            w-full
            px-18
            py-10
            text-white
            bg-[linear-gradient(180deg,#28194A_0%,#21153F_45%,#1A1231_100%)]
            "
        >
            {/* Vinheta */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,.18)_100%)]" />

            {/* Glow Laranja */}
            <motion.div
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.35, 0.45, 0.35],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
            absolute
            -bottom-80
            -left-60
            h-160
            w-160
            rounded-full
            bg-orange-500/35
            blur-[190px]
            "
            />

            {/* Glow Roxo */}
            <motion.div
                animate={{
                    x: [0, 30, 0],
                    y: [0, -25, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                absolute
                top-10
                -right-45
                h-125
                w-125
                rounded-full
                bg-purple/20
                blur-[170px]
            "
            />

            {/* Glow atrás do título */}
            <div
                className="
                absolute
                left-20
                top-48
                h-87
                w-87
                rounded-full
                bg-secondary/10
                blur-[130px]
            "
            />

            {/* Linhas horizontais correndo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {streaks.map((s) => (
                    <motion.div
                        key={s.id}
                        className="absolute h-0.5 rounded-full bg-gradient-primary"
                        style={{ top: `${s.top}%`, width: s.width }}
                        initial={{ x: "-20%", opacity: 0 }}
                        animate={{ x: "130vw", opacity: [0, 0.5, 0.5, 0] }}
                        transition={{
                            duration: s.duration,
                            delay: s.delay,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            {/* Conteúdo */}
            <div className="relative z-10 max-w-152 ml-3">

                <h1 className="mb-3 mt-5 text-5xl font-bold leading-tight">
                    O ERP que se molda ao
                    <br />
                    <span className="text-gradient-primary"> seu negócio</span>
                </h1>

                <p className="mb-10 max-w-xl text-lg leading-8 text-gray-light">
                    Personalize módulos, fluxos e relatórios do WorkSpeed do jeito exato
                    que a sua empresa precisa.
                </p>

                <ul className="flex flex-col gap-4">
                    {features.map(({ text, icon: Icon }) => (
                        <li
                            key={text}
                            className="
                            flex
                            items-center
                            gap-4
                            rounded-2xl
                            border
                            border-white/8
                            bg-white/5
                            px-4
                            py-3
                            backdrop-blur-md
                            transition-all
                            duration-300
                            hover:border-secondary/40
                            hover:bg-white/8
                            "
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-lg">
                                <Icon className="h-5 w-5 text-white" />
                            </div>

                            <span className="font-medium">{text}</span>
                        </li>
                    ))}
                </ul>

                <footer className="mt-12 flex gap-6 text-sm text-gray-light">
                    <span className="transition hover:text-white cursor-pointer">© {new Date().getFullYear()} Personalys Tech</span>
                    <button className="transition hover:text-white cursor-pointer">
                        Privacidade
                    </button>
                    <button className="transition hover:text-white cursor-pointer">
                        Termos
                    </button>
                </footer>
            </div>
        </div>
    );
}