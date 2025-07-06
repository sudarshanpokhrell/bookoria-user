'use client'

import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Oops!
          </h1>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            We&apos;re sorry, but something unexpected happened. Please try again.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <details className="text-left bg-gray-100 p-3 rounded text-sm">
              <summary className="cursor-pointer font-medium mb-2">
                Error Details
              </summary>
              <pre className="text-xs overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
        </div>
        
        <div className="space-y-3">
          <Button onClick={reset} className="w-full">
            Try Again
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => window.location.href = '/'}
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  )
} 