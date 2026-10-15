import type { ReferenceEntry } from '../../types/reference'
import { actorsComponentsEntries } from './actors-components'
import { blueprintFundamentalsEntries } from './blueprint-fundamentals'
import { enhancedInputEntries } from './enhanced-input'
import { eventsCommunicationEntries } from './events-communication'
import { gameplayFrameworkEntries } from './gameplay-framework'
import { namingConventionsEntries } from './naming-conventions'
import { otherCategoryEntries } from './other-categories'
import { physicsCollisionEntries } from './physics-collision'
import { unrealCppEntries } from './unreal-cpp'

export const REFERENCE_ENTRIES: ReferenceEntry[] = [
  ...blueprintFundamentalsEntries,
  ...namingConventionsEntries,
  ...eventsCommunicationEntries,
  ...actorsComponentsEntries,
  ...enhancedInputEntries,
  ...gameplayFrameworkEntries,
  ...physicsCollisionEntries,
  ...unrealCppEntries,
  ...otherCategoryEntries,
]

export const FEATURED_ENTRY_IDS = [
  'branch',
  'asset-naming-overview',
  'event-beginplay',
  'cast-to',
  'enhanced-input-setup',
  'line-trace-by-channel',
  'upROPERTY',
  'blueprint-interfaces',
] as const

export const EXAMPLE_SHOWCASE_IDS = [
  'on-component-begin-overlap',
  'blueprint-interfaces',
  'spawn-actor-from-class',
  'upROPERTY',
  'ufunction',
] as const

const byId = new Map(REFERENCE_ENTRIES.map((entry) => [entry.id, entry]))
const bySlug = new Map(REFERENCE_ENTRIES.map((entry) => [entry.slug, entry]))

export function getEntryById(id: string): ReferenceEntry | undefined {
  return byId.get(id)
}

export function getEntryBySlug(slug: string): ReferenceEntry | undefined {
  return bySlug.get(slug)
}

export function getEntriesByCategory(categoryId: string): ReferenceEntry[] {
  return REFERENCE_ENTRIES.filter((entry) => entry.category === categoryId)
}

export function getRelatedEntries(entry: ReferenceEntry): ReferenceEntry[] {
  return (entry.relatedEntries ?? [])
    .map((id) => byId.get(id))
    .filter((related): related is ReferenceEntry => Boolean(related))
}

export const REFERENCE_UE_VERSION_NOTE = '5.0–5.5'
