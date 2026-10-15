import type {
  CategoryId,
  ElementType,
  ReferenceEntry,
  SearchFilters,
  SearchResult,
  SortOption,
} from '../types/reference'
import { includesNormalized, normalizeText, tokenizeQuery } from './normalize'

function scoreEntry(entry: ReferenceEntry, tokens: string[]): number {
  if (tokens.length === 0) return 0

  let score = 0
  const fields = {
    title: 12,
    originalName: 12,
    aliases: 10,
    tags: 8,
    summary: 6,
    description: 4,
    category: 5,
    subcategory: 4,
    examples: 3,
    code: 3,
    related: 2,
  }

  for (const token of tokens) {
    if (includesNormalized(entry.title, token)) score += fields.title
    if (includesNormalized(entry.originalName, token)) score += fields.originalName
    if (entry.aliases?.some((alias) => includesNormalized(alias, token))) score += fields.aliases
    if (entry.tags.some((tag) => includesNormalized(tag, token))) score += fields.tags
    if (includesNormalized(entry.summary, token)) score += fields.summary
    if (includesNormalized(entry.description, token)) score += fields.description
    if (includesNormalized(entry.category, token)) score += fields.category
    if (entry.subcategory && includesNormalized(entry.subcategory, token)) {
      score += fields.subcategory
    }

    const exampleText = (entry.examples ?? [])
      .flatMap((example) => [
        example.title,
        example.scenario,
        ...example.steps,
        ...(example.snippets?.map((snippet) => snippet.code) ?? []),
      ])
      .join(' ')
    if (includesNormalized(exampleText, token)) score += fields.examples

    const codeText = [
      ...(entry.blueprintEquivalent?.snippets?.map((s) => s.code) ?? []),
      ...(entry.cppEquivalent?.snippets?.map((s) => s.code) ?? []),
    ].join(' ')
    if (includesNormalized(codeText, token)) score += fields.code

    if (entry.relatedEntries?.some((id) => includesNormalized(id, token))) {
      score += fields.related
    }
  }

  // Bonus si el nombre coincide exactamente (sin acentos)
  const joined = normalizeText(tokens.join(' '))
  if (
    normalizeText(entry.title) === joined ||
    normalizeText(entry.originalName) === joined
  ) {
    score += 25
  }

  return score
}

export function createEmptyFilters(overrides: Partial<SearchFilters> = {}): SearchFilters {
  return {
    query: '',
    categories: [],
    elementTypes: [],
    ueVersions: [],
    sort: 'relevance',
    ...overrides,
  }
}

export function filterEntries(
  entries: ReferenceEntry[],
  filters: SearchFilters,
): SearchResult[] {
  const tokens = tokenizeQuery(filters.query)

  let results: SearchResult[] = entries.map((entry) => ({
    entry,
    score: tokens.length === 0 ? 0 : scoreEntry(entry, tokens),
  }))

  if (tokens.length > 0) {
    results = results.filter((result) => result.score > 0)
  }

  if (filters.categories.length > 0) {
    const set = new Set(filters.categories)
    results = results.filter((result) => set.has(result.entry.category))
  }

  if (filters.elementTypes.length > 0) {
    const set = new Set(filters.elementTypes)
    results = results.filter((result) => set.has(result.entry.elementType))
  }

  if (filters.ueVersions.length > 0) {
    results = results.filter((result) =>
      filters.ueVersions.some((version) => result.entry.ueVersions.includes(version)),
    )
  }

  return sortResults(results, filters.sort)
}

export function sortResults(results: SearchResult[], sort: SortOption): SearchResult[] {
  const copy = [...results]
  if (sort === 'name') {
    copy.sort((a, b) =>
      a.entry.originalName.localeCompare(b.entry.originalName, 'en', {
        sensitivity: 'base',
      }),
    )
  } else {
    copy.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return a.entry.originalName.localeCompare(b.entry.originalName, 'en', {
        sensitivity: 'base',
      })
    })
  }
  return copy
}

export function getAvailableVersions(entries: ReferenceEntry[]): string[] {
  return [...new Set(entries.flatMap((entry) => entry.ueVersions))].sort()
}

export function getAvailableElementTypes(entries: ReferenceEntry[]): ElementType[] {
  return [...new Set(entries.map((entry) => entry.elementType))].sort()
}

export function getAvailableCategories(entries: ReferenceEntry[]): CategoryId[] {
  return [...new Set(entries.map((entry) => entry.category))]
}
