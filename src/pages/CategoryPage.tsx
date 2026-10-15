import { Link, useParams } from 'react-router-dom'
import { EmptyState } from '../components/common/EmptyState'
import { EntryCard } from '../components/entry/EntryCard'
import { getCategory } from '../data/categories'
import { getEntriesByCategory } from '../data/entries'

export function CategoryPage() {
  const { categoryId = '' } = useParams()
  const category = getCategory(categoryId)
  const entries = getEntriesByCategory(categoryId).sort((a, b) =>
    a.originalName.localeCompare(b.originalName, 'en', { sensitivity: 'base' }),
  )

  if (!category) {
    return (
      <EmptyState
        title="Categoría no encontrada"
        description="La categoría solicitada no existe en esta referencia."
        action={
          <Link to="/" className="btn" style={{ marginTop: '1rem' }}>
            Volver al inicio
          </Link>
        }
      />
    )
  }

  const subcategories = [...new Set(entries.map((entry) => entry.subcategory).filter(Boolean))]
  const tags = [...new Set(entries.flatMap((entry) => entry.tags))].slice(0, 16)

  return (
    <div>
      <p style={{ margin: '0 0 0.5rem' }}>
        <Link to="/">Inicio</Link> / {category.name}
      </p>
      <h1 className="page-title">{category.name}</h1>
      <p className="page-subtitle">
        {category.nameEs}. {category.description}
      </p>

      {subcategories.length > 0 ? (
        <div className="meta-row" style={{ marginBottom: '1rem' }}>
          {subcategories.map((sub) => (
            <span key={sub} className="badge">
              {sub}
            </span>
          ))}
        </div>
      ) : null}

      {tags.length > 0 ? (
        <div className="tags" style={{ marginBottom: '1.5rem' }}>
          {tags.map((tag) => (
            <Link key={tag} to={`/buscar?q=${encodeURIComponent(tag)}`} className="tag">
              {tag}
            </Link>
          ))}
        </div>
      ) : null}

      {entries.length === 0 ? (
        <EmptyState
          title="Sin entradas todavía"
          description="Esta categoría está preparada para crecer en próximas versiones."
        />
      ) : (
        <div className="card-grid">
          {entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  )
}
