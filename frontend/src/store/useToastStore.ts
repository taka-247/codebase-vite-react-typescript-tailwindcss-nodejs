// src/store/useToastStore.ts
import { create } from 'zustand'

type Toast = { id: number; message: string; type: 'success' | 'error' }

type ToastState = {
  toasts: Toast[]
  addToast: (message: string, type: Toast['type']) => void
  removeToast: (id: number) => void
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (message, type) =>
    set((state) => ({ toasts: [...state.toasts, { id: Date.now(), message, type }] })),
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}))