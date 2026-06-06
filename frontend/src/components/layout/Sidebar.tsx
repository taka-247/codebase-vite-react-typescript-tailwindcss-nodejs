import { Link, useLocation } from 'react-router-dom'
import { globalLinks } from '../../App'

type Props = React.ComponentProps<'nav'>

export default function Sidebar({ ...props }: Props) {
  const { pathname } = useLocation()

  return (
    <nav className="w-48 bg-third p-4 flex flex-col gap-2" {...props}>
      {globalLinks.map(link => (
        <Link
          key={link.to}
          to={link.to}
          className={`px-3 py-2 rounded hover:bg-gray-200 hover:text-primary ${
            pathname === link.to ? 'bg-gray-300 font-bold text-primary' : ''
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}