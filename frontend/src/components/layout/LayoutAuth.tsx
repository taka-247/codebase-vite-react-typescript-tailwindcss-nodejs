import { Outlet } from 'react-router-dom'

// Minimal centered layout for auth screens (login, signup, reset/update password).
export default function LayoutAuth() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8">
        <Outlet />
      </div>
    </div>
  )
}
