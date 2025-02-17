import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-gray-900">404 - Page Not Found</h2>
      <p className="mt-2 text-gray-600">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-4 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Go back home
      </Link>
    </div>
  )
}