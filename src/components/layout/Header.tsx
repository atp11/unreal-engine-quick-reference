import { BookOpen, Heart, Menu, Moon, Sun } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { SearchBar } from '../search/SearchBar'

interface HeaderProps {
  onToggleNav: () => void
  navOpen: boolean
}

export function Header({ onToggleNav, navOpen }: HeaderProps) {
  const { theme, toggleTheme, favorites } = useApp()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  return (
    <header className="site-header">
      <button
        type="button"
        className={`icon-btn${navOpen ? ' active' : ''}`}
        onClick={onToggleNav}
        aria-label={navOpen ? 'Ocultar categorías' : 'Mostrar categorías'}
        aria-expanded={navOpen}
        title={navOpen ? 'Ocultar categorías' : 'Mostrar categorías'}
      >
        <Menu size={18} aria-hidden />
      </button>

      <Link to="/" className="brand">
        <span className="brand-name">Unreal Engine Quick Reference</span>
        <span className="brand-tagline">Encuentra, comprende y aplica</span>
      </Link>

      <div className="header-search">
        <SearchBar
          value={query}
          onChange={(value) => {
            setQuery(value)
          }}
          navigateOnSubmit
        />
      </div>

      <div className="header-actions">
        <button
          type="button"
          className="icon-btn"
          onClick={() => navigate('/favoritos')}
          aria-label={`Favoritos${favorites.length ? `, ${favorites.length}` : ''}`}
        >
          <Heart size={18} />
          <span className="label">Favoritos</span>
        </button>

        <button
          type="button"
          className="icon-btn"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          <span className="label">{theme === 'dark' ? 'Claro' : 'Oscuro'}</span>
        </button>

        <Link to="/acerca" className="icon-btn" aria-label="Información del proyecto y licencias">
          <BookOpen size={18} />
          <span className="label">Acerca</span>
        </Link>
      </div>
    </header>
  )
}
