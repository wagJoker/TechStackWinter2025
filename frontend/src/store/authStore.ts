import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { supabase } from '../lib/supabase'

interface AuthState {
  user: any | null
  loading: boolean
  error: string | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        loading: false,
        error: null,
        signUp: async (email, password) => {
          set({ loading: true, error: null })
          try {
            const { error } = await supabase.auth.signUp({
              email,
              password,
            })
            if (error) {
              // Преобразуем ошибки в понятные пользователю сообщения
              if (error.message === 'User already registered') {
                throw new Error('This email is already registered. Please sign in instead.')
              }
              if (error.message.includes('weak_password')) {
                throw new Error('Password is too weak. It should be at least 6 characters long.')
              }
              throw error
            }
          } catch (error) {
            set({ error: (error as Error).message })
            throw error
          } finally {
            set({ loading: false })
          }
        },
        signIn: async (email, password) => {
          set({ loading: true, error: null })
          try {
            const { data: { user }, error } = await supabase.auth.signInWithPassword({
              email,
              password,
            })
            if (error) {
              if (error.message === 'Invalid login credentials') {
                throw new Error('Incorrect email or password')
              }
              throw error
            }
            set({ user })
          } catch (error) {
            set({ error: (error as Error).message })
            throw error
          } finally {
            set({ loading: false })
          }
        },
        signOut: async () => {
          set({ loading: true, error: null })
          try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
            set({ user: null })
          } catch (error) {
            set({ error: (error as Error).message })
            throw error
          } finally {
            set({ loading: false })
          }
        },
      }),
      {
        name: 'auth-storage',
      }
    )
  )
)