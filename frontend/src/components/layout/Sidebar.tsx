import { NavLink } from 'react-router-dom'
import { appPages } from '../../App'
import ThemeModeSwitcher from '../ui/ThemeModeSwitcher'

type Props = React.ComponentProps<'div'>

export default function Sidebar({ ...props }: Props) {
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
    </div>
  )
}
