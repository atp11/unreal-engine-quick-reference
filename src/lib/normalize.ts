/** Normaliza texto para búsqueda: minúsculas y sin acentos. */
export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function includesNormalized(haystack: string, needle: string): boolean {
  if (!needle) return true
  return normalizeText(haystack).includes(normalizeText(needle))
}

export function tokenizeQuery(query: string): string[] {
  return normalizeText(query)
    .split(/[\s,/|+]+/)
    .map((token) => token.trim())
    .filter(Boolean)
}
