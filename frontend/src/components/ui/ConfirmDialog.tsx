import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Button from './Button'

type Props = {
  open: boolean
  title?: string
  message?: string
  warning?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

// Reusable yes/no confirmation dialog built on Headless UI.
export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  message,
  warning,
  confirmLabel = 'Yes',
  cancelLabel = 'No',
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Dialog open={open} onClose={onCancel} className="relative z-50">
      {/* backdrop */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* centered panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-sm rounded bg-primary p-6 border border-border">
          <DialogTitle className="text-lg font-bold text-text">{title}</DialogTitle>
          {message && <p className="mt-2 text-sm text-text whitespace-pre-line">{message}</p>}
          {warning && <p className="mt-2 text-sm text-warn whitespace-pre-line">{`* ${warning}`}</p>}

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded border border-border text-text hover:bg-gray-200 hover:text-primary transition-colors cursor-pointer"
            >
              {cancelLabel}
            </button>
            <Button type="button" onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
