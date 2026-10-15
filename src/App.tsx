import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { AppProvider } from './context/AppContext'
import { AboutPage } from './pages/AboutPage'
import { CategoryPage } from './pages/CategoryPage'
import { EntryPage } from './pages/EntryPage'
import { FavoritesPage } from './pages/FavoritesPage'
import { HomePage } from './pages/HomePage'
import { SearchPage } from './pages/SearchPage'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="buscar" element={<SearchPage />} />
            <Route path="categoria/:categoryId" element={<CategoryPage />} />
            <Route path="entrada/:slug" element={<EntryPage />} />
            <Route path="favoritos" element={<FavoritesPage />} />
            <Route path="acerca" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
