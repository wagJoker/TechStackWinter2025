import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function Auth() {
  const navigate = useNavigate()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationError, setValidationError] = useState('')
  const { signIn, signUp, loading, error } = useAuthStore()

  const validateForm = () => {
    if (!email || !password) {
      setValidationError('Email and password are required')
      return false
    }
    
    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters long')
      return false
    }

    if (!email.includes('@')) {
      setValidationError('Please enter a valid email address')
      return false
    }

    setValidationError('')
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      if (isSignUp) {
        await signUp(email, password)
        // After signup, automatically sign in
        await signIn(email, password)
      } else {
        await signIn(email, password)
      }
      
      // If we get here, it means authentication was successful
      navigate('/')
    } catch (err) {
      // Error handling is done in the store
      console.error('Auth error:', err)
    }
  }

  const displayError = validationError || error

  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignUp ? 'Create Account' : 'Sign In'}
        </h2>
        
        {displayError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {displayError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Min. 6 characters"
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp)
              setValidationError('')
            }}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            {isSignUp
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  )
}