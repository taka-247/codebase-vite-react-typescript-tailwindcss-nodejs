import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../store/useAuthStore'
import { supabase } from '../lib/supabase'

export type Profile = {
  id: string
  display_name: string | null
  role: string
  created_at: string
}

// Fetches the logged-in user's profile row. Only runs when there is a session
// (enabled), and is cached per user id via the query key. RLS ensures the user
// can only read their own row.
export function useProfile() {
  const session = useAuthStore((state) => state.session)

  return useQuery({
    queryKey: ['profile', session?.user.id],
    enabled: !!session,
    // Profile rarely changes and we invalidate it on our own edits, so keep it
    // fresh for 5 minutes to avoid a refetch on every page visit/refocus.
    staleTime: 5 * 60 * 1000,
    queryFn: async (): Promise<Profile> => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session!.user.id)
        .single()
      if (error) throw error
      return data
    },
  })
}

// Updates the logged-in user's profile row and refreshes the cached query.
export function useUpdateProfile() {
  const session = useAuthStore((state) => state.session)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updates: Partial<Pick<Profile, 'display_name'>>) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', session!.user.id)
        .select()
        .single()
      if (error) throw error
      return data as Profile
    },
    // After a successful update, mark the profile query stale so it refetches.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })
}
