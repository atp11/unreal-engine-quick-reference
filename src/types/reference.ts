export type ElementType =
  | 'nodo'
  | 'evento'
  | 'componente'
  | 'clase'
  | 'funcion'
  | 'macro'
  | 'especificador'
  | 'concepto'
  | 'sistema'
  | 'estructura'
  | 'interfaz'
  | 'variable'

export type Difficulty = 'basico' | 'intermedio' | 'avanzado'

export type CategoryId =
  | 'blueprint-fundamentals'
  | 'events-communication'
  | 'actors-components'
  | 'enhanced-input'
  | 'gameplay-framework'
  | 'physics-collision'
  | 'ui-umg'
  | 'animation'
  | 'ai-navigation'
  | 'unreal-cpp'
  | 'materials-rendering'
  | 'audio'
  | 'naming-conventions'

export interface CodeSnippet {
  language: 'blueprint' | 'cpp' | 'text'
  title?: string
  code: string
  explanation?: string
}

export interface Example {
  title: string
  scenario: string
  steps: string[]
  snippets?: CodeSnippet[]
  notes?: string[]
}

export interface CommonMistake {
  mistake: string
  solution: string
}

export interface OfficialReference {
  title: string
  url: string
  note?: string
}

export interface CrossLanguageEquivalent {
  available: boolean
  summary: string
  relatedEntryIds?: string[]
  snippets?: CodeSnippet[]
}

export interface ReferenceEntry {
  id: string
  slug: string
  title: string
  originalName: string
  summary: string
  description: string
  category: CategoryId
  subcategory?: string
  elementType: ElementType
  tags: string[]
  aliases?: string[]
  ueVersions: string[]
  difficulty: Difficulty
  whenToUse?: string
  howToUse?: string
  examples?: Example[]
  commonMistakes?: CommonMistake[]
  relatedEntries?: string[]
  blueprintEquivalent?: CrossLanguageEquivalent
  cppEquivalent?: CrossLanguageEquivalent
  officialReferences?: OfficialReference[]
  lastReviewed: string
}

export interface CategoryMeta {
  id: CategoryId
  name: string
  nameEs: string
  description: string
  accent: string
}

export type SortOption = 'relevance' | 'name'

export interface SearchFilters {
  query: string
  categories: CategoryId[]
  elementTypes: ElementType[]
  ueVersions: string[]
  sort: SortOption
}

export interface SearchResult {
  entry: ReferenceEntry
  score: number
}
