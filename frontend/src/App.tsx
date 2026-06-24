import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Layout2 from './components/layout/Layout2'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ErrorBoundary from './components/ErrorBoundary'

export const globalLinks = [
  { to: '/', label: 'Dashboard', Component: <Dashboard /> },
  { to: '/contact', label: 'Contact', Component: <Contact /> },
  { to: '/profile', label: 'Profile', Component: <Profile /> },
]
export const staticLinks = [
  { to: '/privacy-policy', label: 'PrivacyPolicy', Component: <PrivacyPolicy /> },
]

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          {globalLinks.map(link => (
            <Route path={link.to} element={link.Component} />
          ))}
        </Route>

        <Route element={<Layout2 />}>
          {staticLinks.map(link => (
            <Route path={link.to} element={link.Component} />
          ))}
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}