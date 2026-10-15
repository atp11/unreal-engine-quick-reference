import { Link } from 'react-router-dom'
import { EmptyState } from '../components/common/EmptyState'
import { EntryCard } from '../components/entry/EntryCard'
import { useApp } from '../context/AppContext'
import { getEntryById } from '../data/entries'

export function FavoritesPage() {
  const { favorites, removeFavorite, history, removeHistoryItem, clearHistory } = useApp()
  const favoriteEntries = favorites.map((id) => getEntryById(id)).filter(Boolean)
  const historyEntries = history.map((id) => getEntryById(id)).filter(Boolean)

  return (
    <div>
      <h1 className="page-title">Favoritos e historial</h1>
      <p className="page-subtitle">
        Se guardan solo en este navegador mediante almacenamiento local.
      </p>

      <section className="section">
        <div className="section-header">
          <h2>Favoritos</h2>
        </div>
        {favoriteEntries.length === 0 ? (
          <EmptyState
            title="No hay favoritos"
            description="Abre una ficha y pulsa Favorito para guardarla."
            action={
              <Link to="/buscar" className="btn" style={{ marginTop: '1rem' }}>
                Explorar entradas
              </Link>
            }
          />
        ) : (
          <div className="card-grid">
            {favoriteEntries.map((entry) =>
              entry ? (
                <div key={entry.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <EntryCard entry={entry} />
                  <button type="button" className="btn" onClick={() => removeFavorite(entry.id)}>
                    Quitar favorito
                  </button>
                </div>
              ) : null,
            )}
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Historial reciente</h2>
          {historyEntries.length > 0 ? (
            <button type="button" className="btn" onClick={clearHistory}>
              Vaciar historial
            </button>
          ) : null}
        </div>
        {historyEntries.length === 0 ? (
          <EmptyState
            title="Historial vacío"
            description="Las entradas que consultes se listarán aquí."
          />
        ) : (
          <div className="card-grid">
            {historyEntries.map((entry) =>
              entry ? (
                <div key={entry.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <EntryCard entry={entry} />
                  <button type="button" className="btn" onClick={() => removeHistoryItem(entry.id)}>
                    Quitar del historial
                  </button>
                </div>
              ) : null,
            )}
          </div>
        )}
      </section>
    </div>
  )
}
