import { Link, useLocation } from 'react-router-dom'
import { globalLinks } from '../../App'

type Props = React.ComponentProps<'header'>

export default function Header({ ...props }: Props) {
  const { pathname } = useLocation()

  return (
    <header className="bg-secondary px-6 py-4 flex items-center justify-between" {...props}>
      <div className="text-xl font-bold text-text">React Codebase</div>
      <nav className="flex gap-6">
        {globalLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-text-inactive ${pathname === link.to ? 'text-text font-bold' : ''
              }`}
          >
            {link.label}
          </Link>
        ))}

      </nav>
    </header>
  )
}