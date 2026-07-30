import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router"
import { z } from "zod"
import { FiMail, FiLock, FiEye, FiEyeOff, FiLoader } from "react-icons/fi"
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Informe seu email")
    .email("Digite um email válido"),
  senha: z
    .string()
    .min(1, "Informe sua senha")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginFormData) {
    setAuthError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Login:", data)

      navigate("/")
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      setAuthError("Email ou senha inválidos. Tente novamente.")
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center overflow-hidden px-9 py-10 sm:px-8 md:max-w-xl md:px-12">
      <div>
        <motion.div
          className="mb-3 flex items-end-safe"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          <img src="logoW.png" alt="Logo WorkSpeed" className="mb-1 w-14 sm:w-17" />
          <span className="text-base font-semibold italic text-primary sm:text-lg">
            orkSpeed
          </span>
        </motion.div>
        <h2 className="text-xl font-bold text-primary sm:text-2xl">
          Bem-vindo(a) de volta
        </h2>
        <p className="text-sm text-gray sm:text-base">
          Acesse o painel do seu ERP WorkSpeed
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4 py-6 sm:gap-5 sm:py-8"
      >
        {authError && (
          <div className="rounded-lg border border-red/30 bg-red/10 px-4 py-2.5 text-sm text-red">
            {authError}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-primary">
            Email
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray" size={18} />
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="seuemail@empresa.com"
              className={`w-full rounded-lg border py-3 pl-10 pr-3 text-base outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/20 sm:py-2.5 sm:text-sm ${errors.email ? "border-red" : "border-gray/30"}`}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <span className="text-xs text-red">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="senha" className="text-sm font-medium text-primary">
              Senha
            </label>
            <a
              href="/esqueci-senha"
              className="text-right text-xs font-semibold text-secondary hover:underline sm:text-sm"
            >
              Esqueceu a senha?
            </a>
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray" size={18} />
            <input
              id="senha"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Digite sua senha"
              className={`w-full rounded-lg border py-3 pl-10 pr-11 text-base outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/20 sm:py-2.5 sm:pr-10 sm:text-sm ${errors.senha ? "border-red" : "border-gray/30"}`}
              {...register("senha")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-gray transition-colors hover:text-primary cursor-pointer"
              tabIndex={-1}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
          {errors.senha && (
            <span className="text-xs text-red">{errors.senha.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-primary py-2 font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <FiLoader className="animate-spin" size={18} />
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </button>
      </form>

      <div className="flex items-center gap-4" aria-hidden="true">
        <div className="h-px flex-1 bg-gray/30" />
        <span className="text-sm font-medium text-gray">ou</span>
        <div className="h-px flex-1 bg-gray/30" />
      </div>

      <p className="my-2 flex justify-center items-center gap-2 text-center text-sm font-semibold text-gray md:text-base">
        <span>Ainda não tem conta?</span>
        <span className="cursor-pointer text-primary hover:underline">
          Fale com nosso time
        </span>
      </p>
    </div>
  )
}