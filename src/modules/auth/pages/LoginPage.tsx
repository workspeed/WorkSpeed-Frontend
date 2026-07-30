import { LayoutLogin } from '../components/LayoutLogin'
import { LoginForm } from '../components/LoginForm'
import { LoginSidePanel } from '../components/LoginSidePanel'

export function LoginPage() {
  return (
    <LayoutLogin aside={<LoginSidePanel />}>
      <LoginForm />
    </LayoutLogin>
  )
}