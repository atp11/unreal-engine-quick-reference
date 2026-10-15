import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  loadFavorites,
  loadHistory,
  loadPreferences,
  saveFavorites,
  saveHistory,
  savePreferences,
  type StoredPreferences,
  type ThemePreference,
} from '../lib/storage'

const MAX_HISTORY = 12

interface AppContextValue {
  theme: ThemePreference
  setTheme: (theme: ThemePreference) => void
  toggleTheme: () => void
  sidebarCollapsed: boolean
  setSidebarCollapsed: (value: boolean) => void
  favorites: string[]
  isFavorite: (id: string) => boolean
  toggleFavorite: (id: string) => void
  removeFavorite: (id: string) => void
  history: string[]
  pushHistory: (id: string) => void
  removeHistoryItem: (id: string) => void
  clearHistory: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const initial = loadPreferences()
  const [theme, setThemeState] = useState<ThemePreference>(initial.theme)
  const [sidebarCollapsed, setSidebarCollapsedState] = useState(initial.sidebarCollapsed)
  const [favorites, setFavorites] = useState<string[]>(() => loadFavorites())
  const [history, setHistory] = useState<string[]>(() => loadHistory())

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    const prefs: StoredPreferences = { theme, sidebarCollapsed }
    savePreferences(prefs)
  }, [theme, sidebarCollapsed])

  useEffect(() => {
    saveFavorites(favorites)
  }, [favorites])

  useEffect(() => {
    saveHistory(history)
  }, [history])

  const setTheme = useCallback((value: ThemePreference) => {
    setThemeState(value)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  const setSidebarCollapsed = useCallback((value: boolean) => {
    setSidebarCollapsedState(value)
  }, [])

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  )

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [id, ...current],
    )
  }, [])

  const removeFavorite = useCallback((id: string) => {
    setFavorites((current) => current.filter((item) => item !== id))
  }, [])

  const pushHistory = useCallback((id: string) => {
    setHistory((current) => {
      const next = [id, ...current.filter((item) => item !== id)]
      return next.slice(0, MAX_HISTORY)
    })
  }, [])

  const removeHistoryItem = useCallback((id: string) => {
    setHistory((current) => current.filter((item) => item !== id))
  }, [])

  const clearHistory = useCallback(() => {
    setHistory([])
  }, [])

  const value = useMemo<AppContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      sidebarCollapsed,
      setSidebarCollapsed,
      favorites,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      history,
      pushHistory,
      removeHistoryItem,
      clearHistory,
    }),
    [
      theme,
      setTheme,
      toggleTheme,
      sidebarCollapsed,
      setSidebarCollapsed,
      favorites,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      history,
      pushHistory,
      removeHistoryItem,
      clearHistory,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp debe usarse dentro de AppProvider')
  }
  return context
}
