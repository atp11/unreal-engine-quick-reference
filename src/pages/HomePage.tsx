import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { EmptyState } from '../components/common/EmptyState'
import { EntryCard } from '../components/entry/EntryCard'
import { SearchBar } from '../components/search/SearchBar'
import { useApp } from '../context/AppContext'
import { CATEGORIES } from '../data/categories'
import {
  EXAMPLE_SHOWCASE_IDS,
  FEATURED_ENTRY_IDS,
  REFERENCE_UE_VERSION_NOTE,
  getEntryById,
  getEntriesByCategory,
} from '../data/entries'

export function HomePage() {
  const [query, setQuery] = useState('')
  const { favorites, history } = useApp()

  const featured = useMemo(
    () => FEATURED_ENTRY_IDS.map((id) => getEntryById(id)).filter(Boolean),
    [],
  )

  const examples = useMemo(
    () => EXAMPLE_SHOWCASE_IDS.map((id) => getEntryById(id)).filter(Boolean),
    [],
  )

  const favoriteEntries = useMemo(
    () => favorites.map((id) => getEntryById(id)).filter(Boolean),
    [favorites],
  )

  const recentEntries = useMemo(
    () => history.map((id) => getEntryById(id)).filter(Boolean),
    [history],
  )

  const topCategories = CATEGORIES.map((category) => ({
    ...category,
    count: getEntriesByCategory(category.id).length,
  }))
    .filter((category) => category.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)

  return (
    <div>
      <h1 className="page-title">Referencia rápida de Unreal Engine 5</h1>
      <p className="page-subtitle">
        Consulta Blueprints primero; usa C++ para entender la implementación y conectar ambos enfoques.
      </p>

      <div className="version-banner" role="note">
        <div>
          Contenido revisado para <strong>Unreal Engine {REFERENCE_UE_VERSION_NOTE}</strong>. Algunas
          entradas indican versiones concretas; comprueba siempre el comportamiento en tu proyecto.
        </div>
      </div>

      <div className="hero-search">
        <SearchBar value={query} onChange={setQuery} large />
      </div>

      <section className="section">
        <div className="section-header">
          <h2>Categorías con más entradas</h2>
          <Link to="/buscar">Ver búsqueda</Link>
        </div>
        <div className="card-grid">
          {topCategories.map((category) => (
            <Link key={category.id} to={`/categoria/${category.id}`} className="entry-card">
              <div className="entry-card-top">
                <h3>{category.name}</h3>
                <span className="badge">{category.count}</span>
              </div>
              <p className="summary">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Entradas destacadas</h2>
        </div>
        <div className="card-grid">
          {featured.map((entry) => (entry ? <EntryCard key={entry.id} entry={entry} /> : null))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Ejemplos prácticos</h2>
        </div>
        <div className="card-grid">
          {examples.map((entry) =>
            entry ? (
              <Link key={entry.id} to={`/entrada/${entry.slug}`} className="entry-card">
                <div className="entry-card-top">
                  <h3>{entry.examples?.[0]?.title ?? entry.originalName}</h3>
                  <span className="badge type">ejemplo</span>
                </div>
                <p className="summary">
                  {entry.examples?.[0]?.scenario ?? entry.summary}
                </p>
              </Link>
            ) : null,
          )}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Tus favoritos</h2>
          <Link to="/favoritos">Gestionar</Link>
        </div>
        {favoriteEntries.length > 0 ? (
          <div className="card-grid">
            {favoriteEntries.slice(0, 6).map((entry) =>
              entry ? <EntryCard key={entry.id} entry={entry} /> : null,
            )}
          </div>
        ) : (
          <EmptyState
            title="Sin favoritos todavía"
            description="Marca entradas con la estrella para recuperarlas aquí."
          />
        )}
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Últimas consultas</h2>
        </div>
        {recentEntries.length > 0 ? (
          <div className="card-grid">
            {recentEntries.slice(0, 6).map((entry) =>
              entry ? <EntryCard key={entry.id} entry={entry} /> : null,
            )}
          </div>
        ) : (
          <EmptyState
            title="Aún no hay historial"
            description="Las fichas que abras aparecerán aquí en este dispositivo."
          />
        )}
      </section>

      <p className="disclaimer">
        Unreal Engine Quick Reference es un proyecto educativo independiente y no está afiliado a
        Epic Games ni respaldado por esta empresa. Unreal Engine y sus marcas pertenecen a sus
        respectivos titulares.
      </p>
    </div>
  )
}
