import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import LayoutApp from './components/layout/LayoutApp'
import LayoutStatic from './components/layout/LayoutStatic'
import LayoutAuth from './components/layout/LayoutAuth'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ResetPassword from './pages/ResetPassword'
import UpdatePassword from './pages/UpdatePassword'
import NotFound from './pages/NotFound'
import ErrorBoundary from './components/ErrorBoundary'
import ProtectedRoute from './components/hoc/ProtectedRoute'
import AuthRoute from './components/hoc/AuthRoute'
import { useAuthStore } from './store/useAuthStore'

export const authPages = [
  { to: '/login', label: 'Login', Component: <Login /> },
  { to: '/signup', label: 'Signup', Component: <Signup /> },
]
export const auth2Pages = [
  { to: '/reset-password', label: 'Reset Password', Component: <ResetPassword /> },
  { to: '/update-password', label: 'Update Password', Component: <UpdatePassword /> },
]
export const appPages = [
  { to: '/', label: 'Dashboard', Component: <Dashboard />, isSidebar: true },
  { to: '/contact', label: 'Contact', Component: <Contact />, isSidebar: true },
  { to: '/profile', label: 'Profile', Component: <Profile />, isSidebar: true },
]
export const staticPages = [
  { to: '/privacy-policy', label: 'PrivacyPolicy', Component: <PrivacyPolicy /> },
]

export default function App() {
  const init = useAuthStore((state) => state.init)

  // Load the Supabase session once and keep it in sync with auth changes.
  useEffect(() => init(), [init])

  return (
    <ErrorBoundary>
      <Routes>
        {/* Auth pages — redirect to dashboard if already logged in */}
        <Route element={<AuthRoute />}>
          <Route element={<LayoutAuth />}>
            {authPages.map(page => (
              <Route key={page.to} path={page.to} element={page.Component} />
            ))}
          </Route>
        </Route>

        {/* Unique pages - no auth guard, but share the auth layout */}
        <Route element={<LayoutAuth />}>
          {auth2Pages.map(page => (
            <Route key={page.to} path={page.to} element={page.Component} />
          ))}
        </Route>

        {/* App pages — redirect to login if not authenticated */}
        <Route element={<ProtectedRoute />}>
          <Route element={<LayoutApp />}>
            {appPages.map(page => (
              <Route key={page.to} path={page.to} element={page.Component} />
            ))}
          </Route>
        </Route>

        {/* Static pages —  no auth needed */}
        <Route element={<LayoutStatic />}>
          {staticPages.map(page => (
            <Route key={page.to} path={page.to} element={page.Component} />
          ))}
        </Route>

        {/* No pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  )
}
