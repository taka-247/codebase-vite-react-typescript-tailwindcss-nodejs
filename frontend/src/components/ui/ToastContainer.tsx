import { useToastStore } from '../../store/useToastStore'
import ToastMessage from './ToastMessage'

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts)

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50 w-80">
      {toasts.map((toast) => (
        <ToastMessage key={toast.id} {...toast} />
      ))}
    </div>
  )
}