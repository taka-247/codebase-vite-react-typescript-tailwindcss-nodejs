import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="text-6xl font-bold text-text">404</p>
      <h1 className="text-2xl font-bold text-text">Page not found</h1>
      <p className="text-text">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="text-accent underline">Go to home</Link>
    </div>
  )
}
