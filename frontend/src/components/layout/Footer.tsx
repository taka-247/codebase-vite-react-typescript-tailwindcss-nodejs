type Props = React.ComponentProps<'footer'>

export default function Footer({ ...props }: Props) {
  return (
    <footer className="bg-fourth text-white text-center py-4" {...props}>
      <p>© 2026 React Codebase. All rights reserved.</p>
    </footer>
  )
}