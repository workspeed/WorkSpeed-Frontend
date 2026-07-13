import type { RouteObject } from 'react-router'
import { LoginPage } from '@/modules/auth'
import { paths } from '../paths'

export const authRoutes: RouteObject[] = [
  {
    path: paths.login,
    element: <LoginPage />,
  },
]
