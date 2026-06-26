import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

// Guards auth pages (login/signup): authenticated users are sent to the dashboard.
export default function AuthRoute() {
  const session = useAuthStore((state) => state.session)
  const loading = useAuthStore((state) => state.loading)

  if (loading) return null

  return session ? <Navigate to="/" replace /> : <Outlet />
}
