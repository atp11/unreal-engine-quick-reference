import { Search } from 'lucide-react'
import { useEffect, useRef, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  large?: boolean
  autoFocus?: boolean
  placeholder?: string
  navigateOnSubmit?: boolean
}

export function SearchBar({
  value,
  onChange,
  large = false,
  autoFocus = false,
  placeholder = 'Buscar nodos, eventos, clases, C++…',
  navigateOnSubmit = true,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return
      }
      event.preventDefault()
      inputRef.current?.focus()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!navigateOnSubmit) return
    const params = new URLSearchParams()
    if (value.trim()) params.set('q', value.trim())
    navigate(`/buscar?${params.toString()}`)
  }

  return (
    <form className={`search-field${large ? ' large' : ''}`} onSubmit={handleSubmit} role="search">
      <Search size={18} aria-hidden />
      <label htmlFor="global-search" className="sr-only">
        Buscar en la referencia
      </label>
      <input
        ref={inputRef}
        id="global-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
      />
      {!large ? <span className="kbd" aria-hidden>/</span> : null}
    </form>
  )
}
