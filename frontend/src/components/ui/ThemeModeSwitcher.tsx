import { useState, useEffect } from 'react'

type Props = React.ComponentProps<'button'>;

export default function ThemeModeSwitcher({ ...props }: Props) {
  const [isDark, setIsDark] = useState(false)

  function toggleTheme() {
    const root = document.documentElement
    const isDark = root.getAttribute('data-theme') === 'dark'
    root.setAttribute('data-theme', isDark ? 'light' : 'dark')
    setIsDark(!isDark)
  }

  useEffect(() => {
    const root = document.documentElement
    const mode = root.getAttribute('data-theme')
    if (!mode) {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.setAttribute('data-theme', isDark ? 'dark' : 'light')
      setIsDark(isDark)
    }
  }, [])

  return (
    <button
      onClick={() => toggleTheme()}
      className="px-3 py-2 rounded border border-border hover:bg-gray-200 hover:text-primary transition-colors cursor-pointer"
      {...props}
    >
      {isDark ? '☀️ Light mode' : '🌙 Dark mode'}
    </button>
  );
}