import { NavLink } from 'react-router-dom'
import { CATEGORIES } from '../../data/categories'
import { getEntriesByCategory } from '../../data/entries'

interface SidebarProps {
  mobileOpen: boolean
  onNavigate?: () => void
}

export function Sidebar({ mobileOpen, onNavigate }: SidebarProps) {
  return (
    <aside
      className={`sidebar${mobileOpen ? ' mobile-open' : ''}`}
      aria-label="Navegación por categorías"
    >
      <h2>Categorías</h2>
      <ul className="nav-list">
        {CATEGORIES.map((category) => {
          const count = getEntriesByCategory(category.id).length
          return (
            <li key={category.id}>
              <NavLink
                to={`/categoria/${category.id}`}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={onNavigate}
              >
                <span className="nav-accent" style={{ background: category.accent }} aria-hidden />
                <span className="nav-text">
                  <strong>{category.name}</strong>
                  <span>
                    {category.nameEs} · {count} {count === 1 ? 'entrada' : 'entradas'}
                  </span>
                </span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
