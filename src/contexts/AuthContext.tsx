import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

export interface AuthUser {
  login: string
  name: string
}

interface AuthContextValue {
  user: AuthUser | null
  loading: boolean
  loginUrl: string
  logoutUrl: string
  refetch: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

/* eslint-disable react-refresh/only-export-components -- useAuth is a hook, not a component */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' })
      if (res.ok) {
        const data = (await res.json()) as { login: string; name: string }
        setUser({ login: data.login, name: data.name ?? data.login })
      } else {
        setUser(null)
      }
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginUrl: '/api/auth/login',
        logoutUrl: '/api/auth/logout',
        refetch: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
