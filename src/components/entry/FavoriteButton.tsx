import { Star } from 'lucide-react'
import { useApp } from '../../context/AppContext'

interface FavoriteButtonProps {
  entryId: string
  label?: boolean
}

export function FavoriteButton({ entryId, label = true }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useApp()
  const active = isFavorite(entryId)

  return (
    <button
      type="button"
      className={`btn${active ? ' primary' : ''}`}
      onClick={() => toggleFavorite(entryId)}
      aria-pressed={active}
      aria-label={active ? 'Quitar de favoritos' : 'Añadir a favoritos'}
    >
      <Star size={16} fill={active ? 'currentColor' : 'none'} aria-hidden />
      {label ? (active ? 'En favoritos' : 'Favorito') : null}
    </button>
  )
}
