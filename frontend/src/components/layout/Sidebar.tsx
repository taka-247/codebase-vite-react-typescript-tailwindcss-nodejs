import { Link, useLocation } from 'react-router-dom'
import { globalLinks } from '../../App'
import ThemeModeSwitcher from '../ui/ThemeModeSwitcher'

type Props = React.ComponentProps<'div'>

export default function Sidebar({ ...props }: Props) {
  const { pathname } = useLocation()

  return (
    <div className='w-48 bg-third p-4 flex flex-col gap-8'>
      <nav className="flex flex-col gap-2 h-full" {...props}>
        {globalLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`px-3 py-2 rounded hover:bg-gray-200 hover:text-primary ${pathname === link.to ? 'bg-gray-300 font-bold text-primary' : ''
              }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <ThemeModeSwitcher />
    </div>
  )
}