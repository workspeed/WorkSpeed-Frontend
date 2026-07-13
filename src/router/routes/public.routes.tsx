import type { RouteObject } from 'react-router'
import { LandingPage } from '@/modules/marketing'
import { paths } from '../paths'

export const publicRoutes: RouteObject[] = [
  {
    path: paths.landing,
    element: <LandingPage />,
  },
]
