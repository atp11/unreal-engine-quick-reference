import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function Layout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="app-shell">
      <Header onToggleMobileNav={() => setMobileNavOpen((open) => !open)} />
      <Sidebar mobileOpen={mobileNavOpen} onNavigate={() => setMobileNavOpen(false)} />
      <main className="main-area">
        <div className="main-inner">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
