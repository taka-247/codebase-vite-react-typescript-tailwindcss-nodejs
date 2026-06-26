import { create } from 'zustand'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

type AuthState = {
  session: Session | null
  loading: boolean
  init: () => () => void
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (password: string) => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  loading: true,

  // Load the current session and subscribe to auth changes
  init: () => {
    supabase.auth.getSession().then(({ data }) => {
      set({ session: data.session, loading: false })
    })

    // Call whenever auth changes on login, logout, token refresh, etc
    // Note: when navigated to update-password page, onAuthStateChange can detect PASSWORD_RECOVERY session by referring to token in the url
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, loading: false })
    })

    // Returns an unsubscribe function for cleanup
    return () => subscription.unsubscribe()
  },

  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  },

  signUp: async (email, password) => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Send a password-reset email; the link returns the user to /update-password
  // Note: email with link - /update-password#access_token=...&type=recovery&...
  resetPassword: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    })
    if (error) throw error
  },

  // Set a new password (called on /update-password during the recovery session)
  // Note: onAuthStateChange detected PASSWORD_RECOVERY session so updateUser works out
  updatePassword: async (password) => {
    const { error } = await supabase.auth.updateUser({ password })
    if (error) throw error
  },
}))
