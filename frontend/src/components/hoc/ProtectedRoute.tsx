import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

// Guards app pages: unauthenticated users are sent to /login,
// remembering where they were headed so login can return them there.
export default function ProtectedRoute() {
  const session = useAuthStore((state) => state.session)
  const loading = useAuthStore((state) => state.loading)
  const location = useLocation()

  if (loading) return null // wait until the initial session check resolves

  return session
    ? <Outlet />
    : <Navigate to="/login" state={{ from: location }} replace />
}
