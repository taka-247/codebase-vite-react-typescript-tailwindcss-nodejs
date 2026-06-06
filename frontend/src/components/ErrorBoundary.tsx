// Note: ErrorBoundary needs to be Class syntax
import type { ReactNode } from 'react'
import { Component } from 'react'

type Props = {
  children: ReactNode
  fallback?: ReactNode
}

type State = {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="p-8 text-center">
          <h1 className="text-2xl font-bold text-error mb-2">Something went wrong</h1>
          <p className="text-text-muted">{this.state.error?.message}</p>
        </div>
      )
    }
    return this.props.children
  }
}