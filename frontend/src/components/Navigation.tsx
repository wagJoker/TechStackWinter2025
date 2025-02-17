import { Link, useLocation } from 'react-router-dom'
import { PlusCircle, Images, LogOut } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

const navigation = [
  { name: 'Gallery', href: '/', icon: Images },
  { name: 'Add Artwork', href: '/add', icon: PlusCircle },
]

export function Navigation() {
  const location = useLocation()
  const { user, signOut } = useAuthStore()

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium
                    ${
                      location.pathname === item.href
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }
                  `}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </div>
          
          <div className="flex items-center">
            {user ? (
              <button
                onClick={() => signOut()}
                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </button>
            ) : (
              <Link
                to="/auth"
                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}