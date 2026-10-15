import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { EmptyState } from '../components/common/EmptyState'
import { SearchBar } from '../components/search/SearchBar'
import { SearchFiltersPanel } from '../components/search/SearchFilters'
import { getCategory } from '../data/categories'
import { REFERENCE_ENTRIES } from '../data/entries'
import {
  createEmptyFilters,
  filterEntries,
  getAvailableElementTypes,
  getAvailableVersions,
} from '../lib/search'
import type { CategoryId, ElementType, SearchFilters, SortOption } from '../types/reference'

function parseList(value: string | null): string[] {
  if (!value) return []
  return value.split(',').map((item) => item.trim()).filter(Boolean)
}

export function SearchPage() {
  const [params, setParams] = useSearchParams()

  const filters: SearchFilters = useMemo(
    () => ({
      query: params.get('q') ?? '',
      categories: parseList(params.get('categoria')) as CategoryId[],
      elementTypes: parseList(params.get('tipo')) as ElementType[],
      ueVersions: parseList(params.get('version')),
      sort: (params.get('orden') as SortOption) || 'relevance',
    }),
    [params],
  )

  const availableElementTypes = useMemo(
    () => getAvailableElementTypes(REFERENCE_ENTRIES),
    [],
  )
  const availableVersions = useMemo(() => getAvailableVersions(REFERENCE_ENTRIES), [])

  const results = useMemo(() => filterEntries(REFERENCE_ENTRIES, filters), [filters])

  function updateFilters(next: SearchFilters) {
    const nextParams = new URLSearchParams()
    if (next.query.trim()) nextParams.set('q', next.query.trim())
    if (next.categories[0]) nextParams.set('categoria', next.categories[0])
    if (next.elementTypes.length) nextParams.set('tipo', next.elementTypes.join(','))
    if (next.ueVersions.length) nextParams.set('version', next.ueVersions.join(','))
    if (next.sort && next.sort !== 'relevance') nextParams.set('orden', next.sort)
    setParams(nextParams)
  }

  return (
    <div>
      <h1 className="page-title">Búsqueda</h1>
      <p className="page-subtitle">
        Busca por nombre, alias, etiquetas, descripción, ejemplos o fragmentos de código.
      </p>

      <SearchBar
        value={filters.query}
        onChange={(query) => updateFilters({ ...filters, query })}
        large
        autoFocus
        navigateOnSubmit={false}
      />

      <SearchFiltersPanel
        filters={filters}
        availableElementTypes={availableElementTypes}
        availableVersions={availableVersions}
        onChange={updateFilters}
        onClear={() => setParams(new URLSearchParams())}
      />

      <div className="section-header">
        <h2>
          {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
        </h2>
      </div>

      {results.length === 0 ? (
        <EmptyState
          title="No hay resultados"
          description="Prueba otro término, quita filtros o limpia la búsqueda."
          action={
            <button
              type="button"
              className="btn"
              style={{ marginTop: '1rem' }}
              onClick={() => updateFilters(createEmptyFilters())}
            >
              Limpiar filtros
            </button>
          }
        />
      ) : (
        <div className="results-list">
          {results.map(({ entry }) => {
            const category = getCategory(entry.category)
            return (
              <Link key={entry.id} to={`/entrada/${entry.slug}`} className="result-item">
                <div>
                  <h3>{entry.originalName}</h3>
                  <p>{entry.summary}</p>
                  <div className="meta-row" style={{ marginTop: '0.55rem' }}>
                    {category ? <span className="badge">{category.name}</span> : null}
                    <span className="badge type">{entry.elementType}</span>
                    {entry.ueVersions.map((version) => (
                      <span key={version} className="badge">
                        UE {version}
                      </span>
                    ))}
                    {entry.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
