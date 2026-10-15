export type ThemePreference = 'dark' | 'light'

export interface StoredPreferences {
  theme: ThemePreference
  sidebarCollapsed: boolean
}

const KEYS = {
  favorites: 'ueqr:favorites',
  history: 'ueqr:history',
  preferences: 'ueqr:preferences',
} as const

const DEFAULT_PREFERENCES: StoredPreferences = {
  theme: 'dark',
  sidebarCollapsed: false,
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function canUseStorage(): boolean {
  try {
    const testKey = 'ueqr:storage-test'
    window.localStorage.setItem(testKey, '1')
    window.localStorage.removeItem(testKey)
    return true
  } catch {
    return false
  }
}

export function loadFavorites(): string[] {
  if (!canUseStorage()) return []
  const data = safeParse<unknown>(localStorage.getItem(KEYS.favorites), [])
  if (!Array.isArray(data)) return []
  return data.filter((item): item is string => typeof item === 'string')
}

export function saveFavorites(ids: string[]): void {
  if (!canUseStorage()) return
  try {
    localStorage.setItem(KEYS.favorites, JSON.stringify(ids))
  } catch {
    // Silenciar errores de cuota o acceso
  }
}

export function loadHistory(): string[] {
  if (!canUseStorage()) return []
  const data = safeParse<unknown>(localStorage.getItem(KEYS.history), [])
  if (!Array.isArray(data)) return []
  return data.filter((item): item is string => typeof item === 'string')
}

export function saveHistory(ids: string[]): void {
  if (!canUseStorage()) return
  try {
    localStorage.setItem(KEYS.history, JSON.stringify(ids))
  } catch {
    // Silenciar errores de cuota o acceso
  }
}

export function loadPreferences(): StoredPreferences {
  if (!canUseStorage()) return { ...DEFAULT_PREFERENCES }
  const data = safeParse<Partial<StoredPreferences>>(
    localStorage.getItem(KEYS.preferences),
    {},
  )
  return {
    theme: data.theme === 'light' || data.theme === 'dark' ? data.theme : DEFAULT_PREFERENCES.theme,
    sidebarCollapsed:
      typeof data.sidebarCollapsed === 'boolean'
        ? data.sidebarCollapsed
        : DEFAULT_PREFERENCES.sidebarCollapsed,
  }
}

export function savePreferences(preferences: StoredPreferences): void {
  if (!canUseStorage()) return
  try {
    localStorage.setItem(KEYS.preferences, JSON.stringify(preferences))
  } catch {
    // Silenciar errores de cuota o acceso
  }
}
