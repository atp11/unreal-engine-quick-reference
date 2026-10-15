import type { ReferenceEntry } from '../../types/reference'

/** Entradas iniciales para categorías con menos cobertura en v1. */
export const otherCategoryEntries: ReferenceEntry[] = [
  {
    id: 'widget-blueprint',
    slug: 'widget-blueprint',
    title: 'Widget Blueprint',
    originalName: 'Widget Blueprint (UMG)',
    summary: 'Asset de UI basado en UUserWidget: layout visual y lógica de interfaz.',
    description:
      'UMG permite diseñar pantallas con paneles, botones y bindings. Se crean en el editor, se instancian en runtime (Create Widget) y se añaden al viewport o a un slot.',
    category: 'ui-umg',
    subcategory: 'UMG',
    elementType: 'sistema',
    tags: ['umg', 'widget', 'ui', 'hud'],
    aliases: ['UMG', 'User Widget', 'Create Widget'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse: 'Menús, HUD, inventarios, diálogos y cualquier UI 2D/3D widget.',
    howToUse:
      'Crea Widget Blueprint. Diseña el Hierarchy. En PlayerController: Create Widget → Add to Viewport. Actualiza datos vía Bind o eventos.',
    examples: [
      {
        title: 'Barra de vida',
        scenario: 'HUD muestra Health / MaxHealth.',
        steps: [
          'Progress Bar en el widget.',
          'Bind o función SetPercent desde OnHealthChanged.',
        ],
      },
    ],
    relatedEntries: ['event-dispatchers', 'player-controller', 'hud'],
    cppEquivalent: {
      available: true,
      summary: 'CreateWidget<UUserWidget>(...) y AddToViewport en C++.',
    },
    officialReferences: [
      {
        title: 'UMG UI Designer',
        url: 'https://dev.epicgames.com/documentation/unreal-engine/umg-ui-designer-for-unreal-engine',
      },
    ],
    lastReviewed: '2026-03-01',
  },
  {
    id: 'animation-blueprint',
    slug: 'animation-blueprint',
    title: 'Animation Blueprint',
    originalName: 'Animation Blueprint',
    summary: 'Grafo que decide poses y transiciones del esqueleto en runtime.',
    description:
      'El AnimBP combina Event Graph (actualizar variables) y Anim Graph (state machines, blend spaces). Lee velocidad, estados y notificaciones.',
    category: 'animation',
    subcategory: 'Sistemas',
    elementType: 'sistema',
    tags: ['animation', 'animbp', 'state machine', 'blend'],
    aliases: ['AnimBP', 'Anim Graph'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'intermedio',
    whenToUse: 'Personajes con locomoción, combates y mezclas de animación.',
    howToUse:
      'Asigna Anim Class al Mesh. En Event Graph actualiza Speed/IsInAir desde el Character Movement. En Anim Graph construye la State Machine.',
    relatedEntries: ['character', 'event-tick'],
    cppEquivalent: {
      available: true,
      summary: 'UAnimInstance subclass en C++ con variables nativas expuestas al grafo.',
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'behavior-tree',
    slug: 'behavior-tree',
    title: 'Behavior Tree',
    originalName: 'Behavior Tree',
    summary: 'Árbol de decisión para IA: tareas, decorators y services sobre un Blackboard.',
    description:
      'Los Behavior Trees estructuran comportamientos de NPC. El AI Controller ejecuta el árbol; el Blackboard almacena claves (Target, PatrolPoint).',
    category: 'ai-navigation',
    subcategory: 'IA',
    elementType: 'sistema',
    tags: ['ai', 'behavior tree', 'blackboard', 'tasks'],
    aliases: ['BT', 'AI Behavior'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'avanzado',
    whenToUse: 'Enemigos con patrulla, persecución y ataque estructurados.',
    howToUse:
      'Crea Blackboard + Behavior Tree. En AI Controller: Run Behavior Tree. Implementa Tasks Blueprint/C++.',
    relatedEntries: ['pawn', 'character'],
    cppEquivalent: {
      available: true,
      summary: 'UBTTask_BlueprintBase o tareas C++ nativas.',
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'material-basics',
    slug: 'materiales-basicos',
    title: 'Materiales (concepto)',
    originalName: 'Materials',
    summary: 'Asset de sombreado que define cómo se ve una superficie (PBR en UE5).',
    description:
      'Los materiales combinan expresiones (Texture Sample, Lerp, Multiply) hacia salidas Base Color, Metallic, Roughness, Normal, etc. Material Instances permiten variar parámetros sin recompilar el padre.',
    category: 'materials-rendering',
    subcategory: 'Fundamentos',
    elementType: 'concepto',
    tags: ['material', 'pbr', 'shader', 'instance'],
    aliases: ['Material Instance', 'MI_'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse: 'Aspecto de meshes estáticos/esqueleticos, decals y VFX simples.',
    howToUse:
      'Crea Material, conecta nodos a resultados. Deriva Material Instance Constant para tunear colores/roughness en actores.',
    relatedEntries: ['physical-materials'],
    cppEquivalent: {
      available: false,
      summary:
        'Los materiales se autoran en el editor. En C++ puedes crear UMaterialInstanceDynamic y SetScalarParameterValue, pero el grafo del material no se escribe como nodos C++ equivalentes.',
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'play-sound',
    slug: 'play-sound',
    title: 'Play Sound',
    originalName: 'Play Sound / Play Sound at Location',
    summary: 'Nodos para reproducir USoundBase en 2D o en una ubicación 3D.',
    description:
      'Play Sound 2D es para UI/música no espacializada. Play Sound at Location / Attach spawnea audio en el mundo con atenuación.',
    category: 'audio',
    subcategory: 'Reproducción',
    elementType: 'nodo',
    tags: ['audio', 'sound', '2d', '3d', 'atenuación'],
    aliases: ['Play Sound 2D', 'Spawn Sound at Location'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse: 'Feedback de UI, impactos, pasos, stingers.',
    howToUse:
      'Elige el Sound Wave/Cue. Para 3D, pasa Location y (opcional) Attenuation Settings. Guarda el Audio Component si necesitas Stop.',
    examples: [
      {
        title: 'Sonido al abrir puerta',
        scenario: 'Tras la animación de apertura.',
        steps: [
          'Sequence Then: Play Sound at Location en el gozne.',
        ],
      },
    ],
    relatedEntries: ['sequence', 'on-component-hit'],
    cppEquivalent: {
      available: true,
      summary: 'UGameplayStatics::PlaySound2D / PlaySoundAtLocation.',
    },
    lastReviewed: '2026-03-01',
  },
]
