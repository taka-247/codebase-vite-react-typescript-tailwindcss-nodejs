import { useQuery } from '@tanstack/react-query'
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
