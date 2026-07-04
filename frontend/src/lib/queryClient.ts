import { QueryClient } from '@tanstack/react-query'

// Single shared query client. Exported so non-React code (e.g. logout) can
// clear cached server data via queryClient.clear().
export const queryClient = new QueryClient()
