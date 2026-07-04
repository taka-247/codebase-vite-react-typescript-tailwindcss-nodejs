import { NavLink } from 'react-router-dom'
import { appPages } from '../../App'
import ThemeModeSwitcher from '../ui/ThemeModeSwitcher'
import { useAuthStore } from '../../store/useAuthStore'
import { useToastStore } from '../../store/useToastStore'

type Props = React.ComponentProps<'div'>

export default function Sidebar({ ...props }: Props) {
  const signOut = useAuthStore((state) => state.signOut)
  const addToast = useToastStore((state) => state.addToast)

  async function handleLogout() {
    try {
      await signOut() // clears session → guards redirect to /login, and clears the query cache
    } catch (err) {
      addToast(err instanceof Error ? err.message : 'Logout failed', 'error')
    }
  }

  return (
    <div className='w-48 bg-third p-4 flex flex-col gap-8'>
      <nav className="flex flex-col gap-2 h-full" {...props}>
        {appPages.filter(p => p.isSidebar).map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'} // exact match for the index route so it isn't always active
            className={({ isActive }) =>
              `px-3 py-2 rounded hover:bg-gray-200 hover:text-primary ${
                isActive ? 'bg-gray-300 font-bold text-primary' : ''
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <ThemeModeSwitcher />

      <button
        onClick={handleLogout}
        className="px-3 py-2 rounded border border-border hover:bg-gray-200 hover:text-primary transition-colors cursor-pointer"
      >
        Log out
      </button>
    </div>
  )
}
