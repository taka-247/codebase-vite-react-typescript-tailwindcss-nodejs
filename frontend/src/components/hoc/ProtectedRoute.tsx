import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'

// Guards app pages: unauthenticated users are sent to /login.
export default function ProtectedRoute() {
  const session = useAuthStore((state) => state.session)
  const loading = useAuthStore((state) => state.loading)

  if (loading) return null // wait until the initial session check resolves

  return session ? <Outlet /> : <Navigate to="/login" replace />
}
