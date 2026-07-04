import { create } from 'zustand'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { queryClient } from '../lib/queryClient'

type AuthState = {
  session: Session | null
  loading: boolean
  init: () => () => void
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, displayName: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updatePassword: (password: string) => Promise<void>
  updateEmail: (email: string) => Promise<void>
  refreshSession: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  loading: true,

  // Load the current session and subscribe to auth changes
  init: () => {
    supabase.auth.getSession().then(({ data }) => {
      set({ session: data.session, loading: false })
      // Refresh once on load so the token reflects any server-side change
      // confirmed elsewhere (e.g. an email change confirmed via its email link).
      if (data.session) get().refreshSession()
    })

    // Call whenever auth changes on login, logout, token refresh, etc
    // Note: when navigated to update-password page, onAuthStateChange can detect PASSWORD_RECOVERY session by referring to token in the url
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, loading: false })
    })

    // When the user returns to the tab (e.g. after clicking a confirmation link
    // in another tab), refresh so a newly-confirmed email is reflected.
    const onFocus = () => get().refreshSession()
    window.addEventListener('focus', onFocus)

    // Returns a cleanup function
    return () => {
      subscription.unsubscribe()
      window.removeEventListener('focus', onFocus)
    }
  },

  signIn: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  },

  signUp: async (email, password, displayName) => {
    // display_name is the key Supabase Auth reads for the dashboard "Display name"
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    })
    if (error) throw error
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    queryClient.clear() // drop all cached server data (profile, etc.) on logout
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

  // Change the auth email. Supabase sends a confirmation link before it takes
  // effect, so session.user.email stays the OLD value until the user confirms.
  // Refresh the session so the store reflects the latest email whenever it does change.
  updateEmail: async (email) => {
    const { error } = await supabase.auth.updateUser({ email })
    if (error) throw error
    const { data } = await supabase.auth.getSession()
    set({ session: data.session })
  },

  // Mint a fresh access token so its claims (e.g. email) reflect the latest
  // server-side user record. Silently ignores the "no session" case.
  refreshSession: async () => {
    const { data } = await supabase.auth.refreshSession()
    if (data.session) set({ session: data.session })
  },
}))
