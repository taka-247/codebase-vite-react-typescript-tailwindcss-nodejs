import { create } from 'zustand'
import { capitalizeFirstLetter } from '../utils';
import type { ToastMessageType } from '../components/ui/ToastMessage';

type Toast = { id: number; message: string; type: ToastMessageType }

type ToastState = {
  toasts: Toast[]
  addToast: (message: string, type: Toast['type']) => void
  removeToast: (id: number) => void
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (message, type) =>
    set((state) => ({ toasts: [...state.toasts, { id: Date.now(), message: `${capitalizeFirstLetter(type)}: ${message}`, type }] })),
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}))


// // Note: the following is not recommended as this subscribes to the whole store object. Every time any field changes — even ones you don't use — your component re-renders.
// const { toasts, addToast, removeToast } = useThemeStore((state) => state)
// // Note: we should use with the following way instead
// import { useShallow } from 'zustand/react/shallow'
// const { theme, toggleTheme } = useThemeStore(
//   useShallow((state) => ({ theme: state.theme, toggleTheme: state.toggleTheme }))
// )
// // Note: or
// const { toasts } = useThemeStore((state) => state.toasts)
// const { addToast } = useThemeStore((state) => state.addToast)
// const { removeToast } = useThemeStore((state) => state.removeToast)
