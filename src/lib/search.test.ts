import { describe, expect, it } from 'vitest'
import { REFERENCE_ENTRIES } from '../data/entries'
import { createEmptyFilters, filterEntries } from './search'
import { normalizeText } from './normalize'

describe('normalizeText', () => {
  it('ignora mayúsculas y acentos', () => {
    expect(normalizeText('Árbol')).toBe('arbol')
    expect(normalizeText('BEGINPLAY')).toBe('beginplay')
  })
})

describe('filterEntries', () => {
  it('encuentra BeginPlay sin importar mayúsculas', () => {
    const results = filterEntries(
      REFERENCE_ENTRIES,
      createEmptyFilters({ query: 'beginplay' }),
    )
    expect(results.some((result) => result.entry.id === 'event-beginplay')).toBe(true)
  })

  it('encuentra UPROPERTY', () => {
    const results = filterEntries(
      REFERENCE_ENTRIES,
      createEmptyFilters({ query: 'UPROPERTY' }),
    )
    expect(results.some((result) => result.entry.id === 'upROPERTY')).toBe(true)
  })

  it('filtra por categoría y tipo', () => {
    const results = filterEntries(
      REFERENCE_ENTRIES,
      createEmptyFilters({
        categories: ['unreal-cpp'],
        elementTypes: ['especificador'],
      }),
    )
    expect(results.length).toBeGreaterThan(0)
    expect(results.every((result) => result.entry.category === 'unreal-cpp')).toBe(true)
    expect(results.every((result) => result.entry.elementType === 'especificador')).toBe(true)
  })

  it('ordena por nombre', () => {
    const results = filterEntries(
      REFERENCE_ENTRIES,
      createEmptyFilters({ sort: 'name', categories: ['blueprint-fundamentals'] }),
    )
    const names = results.map((result) => result.entry.originalName)
    const sorted = [...names].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
    expect(names).toEqual(sorted)
  })

  it('devuelve vacío con query inexistente', () => {
    const results = filterEntries(
      REFERENCE_ENTRIES,
      createEmptyFilters({ query: 'xyznoexiste123' }),
    )
    expect(results).toHaveLength(0)
  })
})
