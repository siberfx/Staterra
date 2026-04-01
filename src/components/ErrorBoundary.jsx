import { Component } from 'react'

const DEBUG = import.meta.env.VITE_DEBUG === 'true' || import.meta.env.VITE_DEBUG === '1'

function DebugErrorBox({ title, error, onDismiss }) {
  if (!DEBUG) return null

  const message = error?.message ?? String(error)
  const stack = error?.stack ?? ''
  const status = error?.status
  const errors = error?.errors

  return (
    <div
      className="fixed bottom-4 right-4 left-4 md:left-auto md:max-w-md z-[9999] bg-red-50 border-2 border-red-500 rounded-lg shadow-xl p-4 text-left"
      role="alert"
    >
      <div className="flex justify-between items-start gap-2 mb-2">
        <h3 className="font-bold text-red-800 text-sm">{title}</h3>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="text-red-600 hover:text-red-800 p-1"
            aria-label="Sluiten"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        )}
      </div>
      <pre className="text-xs text-red-900 whitespace-pre-wrap break-words font-mono overflow-x-auto max-h-48 overflow-y-auto">
        {message}
      </pre>
      {status != null && (
        <p className="text-xs text-red-700 mt-1">Status: {status}</p>
      )}
      {errors && typeof errors === 'object' && (
        <pre className="text-xs text-red-800 mt-2 whitespace-pre-wrap break-words font-mono">
          {JSON.stringify(errors, null, 2)}
        </pre>
      )}
      {stack && (
        <details className="mt-2">
          <summary className="text-xs text-red-600 cursor-pointer">Stack trace</summary>
          <pre className="text-[10px] text-red-700 mt-1 whitespace-pre-wrap break-words font-mono overflow-x-auto max-h-32 overflow-y-auto">
            {stack}
          </pre>
        </details>
      )}
    </div>
  )
}

export class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    if (DEBUG) {
      console.error('[ErrorBoundary]', error, info)
    }
  }

  render() {
    const { error } = this.state
    const { children, fallback } = this.props

    if (error && DEBUG) {
      if (fallback) return fallback
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-red-50">
          <h1 className="text-xl font-bold text-red-800 mb-4">React Error</h1>
          <DebugErrorBox
            title="Uncaught error"
            error={error}
            onDismiss={() => this.setState({ error: null })}
          />
        </div>
      )
    }

    if (error && !DEBUG) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
          <p className="text-gray-600">Er is iets misgegaan.</p>
        </div>
      )
    }

    return children
  }
}

export function DebugErrorPanel({ error, onDismiss }) {
  if (!error || !DEBUG) return null
  return (
    <DebugErrorBox
      title="API / Bootstrap Error"
      error={error}
      onDismiss={onDismiss}
    />
  )
}
