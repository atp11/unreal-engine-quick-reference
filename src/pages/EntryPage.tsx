import { ArrowLeft, ExternalLink } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CodeBlock } from '../components/common/CodeBlock'
import { EmptyState } from '../components/common/EmptyState'
import { FavoriteButton } from '../components/entry/FavoriteButton'
import { useApp } from '../context/AppContext'
import { getCategory } from '../data/categories'
import { getEntryBySlug, getRelatedEntries } from '../data/entries'
import type { CrossLanguageEquivalent } from '../types/reference'

function EquivalentSection({
  title,
  equivalent,
}: {
  title: string
  equivalent?: CrossLanguageEquivalent
}) {
  if (!equivalent) return null
  return (
    <section className="detail-section">
      <h2>{title}</h2>
      <p>{equivalent.summary}</p>
      {equivalent.snippets?.map((snippet, index) => (
        <CodeBlock key={`${title}-${index}`} snippet={snippet} />
      ))}
    </section>
  )
}

export function EntryPage() {
  const { slug = '' } = useParams()
  const entry = getEntryBySlug(slug)
  const { pushHistory } = useApp()

  useEffect(() => {
    if (entry) pushHistory(entry.id)
  }, [entry, pushHistory])

  if (!entry) {
    return (
      <EmptyState
        title="Entrada no encontrada"
        description="No existe una ficha con esta URL. Puede haberse renombrado o aún no estar publicada."
        action={
          <Link to="/buscar" className="btn" style={{ marginTop: '1rem' }}>
            Ir a la búsqueda
          </Link>
        }
      />
    )
  }

  const category = getCategory(entry.category)
  const related = getRelatedEntries(entry)

  return (
    <article>
      <div className="detail-header">
        <div>
          <p style={{ margin: '0 0 0.5rem' }}>
            <Link to="/">Inicio</Link>
            {category ? (
              <>
                {' / '}
                <Link to={`/categoria/${category.id}`}>{category.name}</Link>
              </>
            ) : null}
          </p>
          <h1 className="page-title" style={{ marginBottom: '0.35rem' }}>
            {entry.originalName}
          </h1>
          <p className="page-subtitle" style={{ marginBottom: '0.75rem' }}>
            {entry.title !== entry.originalName ? `${entry.title}. ` : null}
            {entry.summary}
          </p>
          <div className="meta-row">
            <span className="badge type">{entry.elementType}</span>
            {category ? <span className="badge">{category.name}</span> : null}
            {entry.subcategory ? <span className="badge">{entry.subcategory}</span> : null}
            <span className="badge">{entry.difficulty}</span>
            {entry.ueVersions.map((version) => (
              <span key={version} className="badge">
                UE {version}
              </span>
            ))}
          </div>
        </div>
        <div className="detail-actions">
          <button type="button" className="btn" onClick={() => window.history.back()}>
            <ArrowLeft size={16} />
            Volver
          </button>
          <FavoriteButton entryId={entry.id} />
        </div>
      </div>

      {entry.tags.length > 0 ? (
        <div className="tags" style={{ marginBottom: '1.25rem' }}>
          {entry.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <section className="detail-section">
        <h2>¿Para qué sirve?</h2>
        <p>{entry.summary}</p>
      </section>

      <section className="detail-section">
        <h2>Descripción</h2>
        <p>{entry.description}</p>
      </section>

      {entry.whenToUse ? (
        <section className="detail-section">
          <h2>¿Cuándo conviene utilizarlo?</h2>
          <p>{entry.whenToUse}</p>
        </section>
      ) : null}

      {entry.howToUse ? (
        <section className="detail-section">
          <h2>¿Cómo se utiliza?</h2>
          <p>{entry.howToUse}</p>
        </section>
      ) : null}

      {entry.examples && entry.examples.length > 0 ? (
        <section className="detail-section">
          <h2>Ejemplos prácticos</h2>
          {entry.examples.map((example) => (
            <div key={example.title} style={{ marginBottom: '1rem' }}>
              <h3 style={{ margin: '0 0 0.35rem', fontSize: '0.95rem' }}>{example.title}</h3>
              <p>
                <strong style={{ color: 'var(--text)' }}>Situación:</strong> {example.scenario}
              </p>
              <ol>
                {example.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              {example.notes?.length ? (
                <ul>
                  {example.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              ) : null}
              {example.snippets?.map((snippet, index) => (
                <CodeBlock key={`${example.title}-${index}`} snippet={snippet} />
              ))}
            </div>
          ))}
        </section>
      ) : null}

      {entry.commonMistakes && entry.commonMistakes.length > 0 ? (
        <section className="detail-section">
          <h2>Errores frecuentes</h2>
          <ul>
            {entry.commonMistakes.map((item) => (
              <li key={item.mistake}>
                <strong style={{ color: 'var(--text)' }}>{item.mistake}</strong>
                <br />
                {item.solution}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <EquivalentSection title="Equivalencia con Blueprint" equivalent={entry.blueprintEquivalent} />
      <EquivalentSection title="Equivalencia con C++" equivalent={entry.cppEquivalent} />

      {related.length > 0 ? (
        <section className="detail-section">
          <h2>Conceptos relacionados</h2>
          <div className="related-list">
            {related.map((item) => (
              <Link key={item.id} to={`/entrada/${item.slug}`}>
                {item.originalName}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {entry.officialReferences && entry.officialReferences.length > 0 ? (
        <section className="detail-section">
          <h2>Referencias oficiales</h2>
          <ul>
            {entry.officialReferences.map((ref) => (
              <li key={ref.url}>
                <a href={ref.url} target="_blank" rel="noreferrer noopener">
                  {ref.title} <ExternalLink size={12} style={{ verticalAlign: 'middle' }} />
                </a>
                {ref.note ? ` — ${ref.note}` : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p style={{ color: 'var(--text-subtle)', fontSize: '0.8rem' }}>
        Última revisión: {entry.lastReviewed}
      </p>
    </article>
  )
}
