import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { Footer } from './Footer'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

const MOBILE_BREAKPOINT = 900

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= MOBILE_BREAKPOINT : false,
  )

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return isMobile
}

export function Layout() {
  const { sidebarCollapsed, setSidebarCollapsed } = useApp()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const isMobile = useIsMobile()

  function handleToggleNav() {
    if (isMobile) {
      setMobileNavOpen((open) => !open)
      return
    }
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className={`app-shell${sidebarCollapsed && !isMobile ? ' sidebar-collapsed' : ''}`}>
      <Header
        onToggleNav={handleToggleNav}
        navOpen={isMobile ? mobileNavOpen : !sidebarCollapsed}
      />
      {isMobile && mobileNavOpen ? (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Cerrar navegación"
          onClick={() => setMobileNavOpen(false)}
        />
      ) : null}
      <Sidebar
        mobileOpen={mobileNavOpen}
        onNavigate={() => setMobileNavOpen(false)}
      />
      <main className="main-area">
        <div className="main-inner">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
