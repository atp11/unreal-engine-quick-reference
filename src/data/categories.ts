import type { CategoryMeta } from '../types/reference'

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'blueprint-fundamentals',
    name: 'Blueprint Fundamentals',
    nameEs: 'Fundamentos de Blueprint',
    description: 'Variables, flujo de ejecución, bucles y nodos esenciales.',
    accent: 'var(--accent-blue)',
  },
  {
    id: 'naming-conventions',
    name: 'Naming Conventions',
    nameEs: 'Convenciones de nombres',
    description: 'Prefijos de assets, patrón recomendado y nomenclatura C++ habitual.',
    accent: 'var(--accent-cyan)',
  },
  {
    id: 'events-communication',
    name: 'Events & Communication',
    nameEs: 'Eventos y comunicación',
    description: 'Eventos, dispatchers, interfaces y mensajería entre Blueprints.',
    accent: 'var(--accent-violet)',
  },
  {
    id: 'actors-components',
    name: 'Actors & Components',
    nameEs: 'Actores y componentes',
    description: 'Jerarquía de actores, pawns, characters y componentes.',
    accent: 'var(--accent-teal)',
  },
  {
    id: 'enhanced-input',
    name: 'Enhanced Input',
    nameEs: 'Enhanced Input',
    description: 'Input Actions, Mapping Contexts, triggers y modifiers.',
    accent: 'var(--accent-orange)',
  },
  {
    id: 'gameplay-framework',
    name: 'Gameplay Framework',
    nameEs: 'Framework de gameplay',
    description: 'GameMode, GameState, PlayerController y piezas del framework.',
    accent: 'var(--accent-green)',
  },
  {
    id: 'physics-collision',
    name: 'Physics & Collision',
    nameEs: 'Física y colisión',
    description: 'Canales, traces, overlaps, hits y materiales físicos.',
    accent: 'var(--accent-red)',
  },
  {
    id: 'ui-umg',
    name: 'UI & UMG',
    nameEs: 'UI y UMG',
    description: 'Widgets, HUD y sistemas de interfaz de usuario.',
    accent: 'var(--accent-pink)',
  },
  {
    id: 'animation',
    name: 'Animation',
    nameEs: 'Animación',
    description: 'Animation Blueprints, montages y notificaciones.',
    accent: 'var(--accent-cyan)',
  },
  {
    id: 'ai-navigation',
    name: 'AI & Navigation',
    nameEs: 'IA y navegación',
    description: 'Behavior Trees, Blackboards y NavMesh.',
    accent: 'var(--accent-lime)',
  },
  {
    id: 'unreal-cpp',
    name: 'Unreal C++',
    nameEs: 'Unreal C++',
    description: 'Macros UObject, exposición al editor y puente con Blueprints.',
    accent: 'var(--accent-yellow)',
  },
  {
    id: 'materials-rendering',
    name: 'Materials & Rendering',
    nameEs: 'Materiales y renderizado',
    description: 'Materiales, shaders y conceptos de render.',
    accent: 'var(--accent-indigo)',
  },
  {
    id: 'audio',
    name: 'Audio',
    nameEs: 'Audio',
    description: 'Sound Cues, atenuación y reproducción de audio.',
    accent: 'var(--accent-amber)',
  },
]

export function getCategory(id: string): CategoryMeta | undefined {
  return CATEGORIES.find((category) => category.id === id)
}
