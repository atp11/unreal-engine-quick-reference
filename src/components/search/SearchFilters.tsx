import { CATEGORIES } from '../../data/categories'
import type {
  CategoryId,
  ElementType,
  SearchFilters as Filters,
  SortOption,
} from '../../types/reference'

const ELEMENT_TYPE_LABELS: Record<ElementType, string> = {
  nodo: 'Nodo',
  evento: 'Evento',
  componente: 'Componente',
  clase: 'Clase',
  funcion: 'Función',
  macro: 'Macro',
  especificador: 'Especificador',
  concepto: 'Concepto',
  sistema: 'Sistema',
  estructura: 'Estructura',
  interfaz: 'Interfaz',
  variable: 'Variable',
}

interface SearchFiltersProps {
  filters: Filters
  availableElementTypes: ElementType[]
  availableVersions: string[]
  onChange: (next: Filters) => void
  onClear: () => void
}

function toggleInList<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

export function SearchFiltersPanel({
  filters,
  availableElementTypes,
  availableVersions,
  onChange,
  onClear,
}: SearchFiltersProps) {
  const hasActive =
    filters.categories.length > 0 ||
    filters.elementTypes.length > 0 ||
    filters.ueVersions.length > 0 ||
    Boolean(filters.query.trim())

  return (
    <div className="filters" aria-label="Filtros de búsqueda">
      <div className="filter-group" style={{ flex: 1, minWidth: 180 }}>
        <label htmlFor="filter-category">Categoría</label>
        <select
          id="filter-category"
          value={filters.categories[0] ?? ''}
          onChange={(event) => {
            const value = event.target.value as CategoryId | ''
            onChange({
              ...filters,
              categories: value ? [value] : [],
            })
          }}
        >
          <option value="">Todas</option>
          {CATEGORIES.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group" style={{ flex: 2, minWidth: 220 }}>
        <span id="filter-types-label">Tipo de elemento</span>
        <div className="filter-chips" role="group" aria-labelledby="filter-types-label">
          {availableElementTypes.map((type) => (
            <button
              key={type}
              type="button"
              className="chip"
              aria-pressed={filters.elementTypes.includes(type)}
              onClick={() =>
                onChange({
                  ...filters,
                  elementTypes: toggleInList(filters.elementTypes, type),
                })
              }
            >
              {ELEMENT_TYPE_LABELS[type]}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group" style={{ flex: 1, minWidth: 180 }}>
        <span id="filter-versions-label">Versión UE</span>
        <div className="filter-chips" role="group" aria-labelledby="filter-versions-label">
          {availableVersions.map((version) => (
            <button
              key={version}
              type="button"
              className="chip"
              aria-pressed={filters.ueVersions.includes(version)}
              onClick={() =>
                onChange({
                  ...filters,
                  ueVersions: toggleInList(filters.ueVersions, version),
                })
              }
            >
              {version}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="filter-sort">Orden</label>
        <select
          id="filter-sort"
          value={filters.sort}
          onChange={(event) =>
            onChange({ ...filters, sort: event.target.value as SortOption })
          }
        >
          <option value="relevance">Relevancia</option>
          <option value="name">Nombre</option>
        </select>
      </div>

      <button type="button" className="btn" onClick={onClear} disabled={!hasActive}>
        Limpiar filtros
      </button>
    </div>
  )
}
