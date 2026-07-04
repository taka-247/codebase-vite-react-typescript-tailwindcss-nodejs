import { useCallback, useRef, useState } from 'react'
import ConfirmDialog from '../components/ui/ConfirmDialog'

type ConfirmOptions = {
  title?: string
  message?: string
  warning?: string
  confirmLabel?: string
  cancelLabel?: string
}

// Promise-based confirmation. `confirm(opts)` opens the dialog and resolves to
// true (Yes) or false (No), so callers can `await` it inline:
//
//   const ok = await confirm({ message: 'Sure?' })
//   if (!ok) return
//
// Render the returned `confirmationDialog` somewhere in the component tree.
export function useConfirm() {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<ConfirmOptions>({})
  const resolverRef = useRef<((value: boolean) => void) | null>(null)

  const confirm = useCallback((opts: ConfirmOptions = {}) => {
    setOptions(opts)
    setOpen(true)
    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve
    })
  }, [])

  const settle = (value: boolean) => {
    setOpen(false)
    resolverRef.current?.(value)
    resolverRef.current = null
  }

  const confirmationDialog = (
    <ConfirmDialog
      open={open}
      title={options.title}
      message={options.message}
      warning={options.warning}
      confirmLabel={options.confirmLabel}
      cancelLabel={options.cancelLabel}
      onConfirm={() => settle(true)}
      onCancel={() => settle(false)}
    />
  )

  return { confirm, confirmationDialog }
}
