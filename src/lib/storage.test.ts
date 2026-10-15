import { beforeEach, describe, expect, it } from 'vitest'
import {
  loadFavorites,
  loadHistory,
  loadPreferences,
  saveFavorites,
  saveHistory,
  savePreferences,
} from './storage'

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('persiste y carga favoritos', () => {
    saveFavorites(['branch', 'cast-to'])
    expect(loadFavorites()).toEqual(['branch', 'cast-to'])
  })

  it('tolera JSON corrupto en favoritos', () => {
    localStorage.setItem('ueqr:favorites', '{not-json')
    expect(loadFavorites()).toEqual([])
  })

  it('persiste historial', () => {
    saveHistory(['event-beginplay'])
    expect(loadHistory()).toEqual(['event-beginplay'])
  })

  it('persiste preferencias de tema', () => {
    savePreferences({ theme: 'light', sidebarCollapsed: true })
    expect(loadPreferences()).toEqual({ theme: 'light', sidebarCollapsed: true })
  })

  it('usa valores por defecto con preferencias inválidas', () => {
    localStorage.setItem('ueqr:preferences', '{"theme":"neon"}')
    expect(loadPreferences().theme).toBe('dark')
  })
})
