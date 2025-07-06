import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
        
        <div className="space-y-3">
          <Link href="/">
            <Button className="w-full">
              Go Back Home
            </Button>
          </Link>
          
          <Link href="/books">
            <Button variant="outline" className="w-full">
              Browse Books
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 