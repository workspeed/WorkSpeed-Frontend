import { createBrowserRouter } from 'react-router'
import { authRoutes } from './routes/auth.routes'
import { publicRoutes } from './routes/public.routes'

export const router = createBrowserRouter([
  ...publicRoutes,
  ...authRoutes,
])
