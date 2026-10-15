import type { ReferenceEntry } from '../../types/reference'

export const actorsComponentsEntries: ReferenceEntry[] = [
  {
    id: 'actor',
    slug: 'actor',
    title: 'Actor',
    originalName: 'Actor (AActor)',
    summary: 'Objeto que puede colocarse en un nivel: posee transform, componentes y ciclo de vida.',
    description:
      'AActor es la unidad básica del mundo. Puede contener componentes (Scene, Audio, Collision). Se spawnea, recibe BeginPlay/Tick/EndPlay y puede replicarse en multiplayer.',
    category: 'actors-components',
    subcategory: 'Jerarquía',
    elementType: 'clase',
    tags: ['actor', 'aactor', 'nivel', 'uobject'],
    aliases: ['AActor', 'Actor class'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse: 'Cualquier entidad del mundo: props, triggers, managers colocables, proyectiles.',
    howToUse:
      'Crea Blueprint basado en Actor o clase C++ AActor. Añade componentes en el viewport. Coloca en el nivel o spawnea en runtime.',
    examples: [
      {
        title: 'Actor trigger de zona',
        scenario: 'Volumen que abre una puerta.',
        steps: [
          'Actor con Box Collision (Overlap).',
          'OnComponentBeginOverlap → lógica de puerta vía interfaz.',
        ],
      },
    ],
    relatedEntries: ['pawn', 'character', 'scene-component', 'spawn-actor-from-class'],
    blueprintEquivalent: {
      available: true,
      summary: 'Blueprint Class con parent Actor.',
    },
    cppEquivalent: {
      available: true,
      summary: 'class AMyActor : public AActor',
      snippets: [
        {
          language: 'cpp',
          code: `UCLASS()
class AMyActor : public AActor
{
    GENERATED_BODY()
};`,
        },
      ],
    },
    officialReferences: [
      {
        title: 'Actors',
        url: 'https://dev.epicgames.com/documentation/unreal-engine/actors-in-unreal-engine',
      },
    ],
    lastReviewed: '2026-03-01',
  },
  {
    id: 'pawn',
    slug: 'pawn',
    title: 'Pawn',
    originalName: 'Pawn (APawn)',
    summary: 'Actor que puede ser poseído por un Controller (jugador o IA).',
    description:
      'APawn añade posesión, input routing básico y conceptos de control. No incluye movimiento de personaje humanoide completo (eso es Character).',
    category: 'actors-components',
    subcategory: 'Jerarquía',
    elementType: 'clase',
    tags: ['pawn', 'apawn', 'posesión', 'controller'],
    aliases: ['APawn'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'intermedio',
    whenToUse: 'Vehículos, cámaras controlables, peones simples sin Character Movement.',
    howToUse:
      'Hereda de Pawn, implementa movimiento propio o componentes. El PlayerController posee el Pawn vía Possess.',
    relatedEntries: ['character', 'player-controller', 'actor'],
    cppEquivalent: {
      available: true,
      summary: 'class AMyPawn : public APawn',
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'character',
    slug: 'character',
    title: 'Character',
    originalName: 'Character (ACharacter)',
    summary: 'Pawn con Character Movement Component: caminar, saltar, crouch, etc.',
    description:
      'ACharacter es el peón estándar para avatares bipedales. Incluye cápsula de colisión, mesh y CharacterMovementComponent.',
    category: 'actors-components',
    subcategory: 'Jerarquía',
    elementType: 'clase',
    tags: ['character', 'acharacter', 'movement', 'cápsula'],
    aliases: ['ACharacter', 'Player Character'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse: 'Protagonista o NPCs humanoides que caminan/saltan con el CMC.',
    howToUse:
      'Blueprint o C++ basado en Character. Configura Mesh, animación y Enhanced Input en el Character o PlayerController.',
    examples: [
      {
        title: 'Aplicar daño al Character',
        scenario: 'Proyectil impacta al jugador.',
        steps: [
          'OnHit → Cast a Character o interfaz.',
          'Restar Health; si llega a 0, Disable Input / play death.',
        ],
      },
    ],
    relatedEntries: ['pawn', 'enhanced-input-setup', 'on-component-hit'],
    cppEquivalent: {
      available: true,
      summary: 'class AMyCharacter : public ACharacter',
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'scene-component',
    slug: 'scene-component',
    title: 'Scene Component',
    originalName: 'Scene Component (USceneComponent)',
    summary: 'Componente con transform; puede adjuntarse a una jerarquía espacial.',
    description:
      'USceneComponent tiene Location/Rotation/Scale relativos al padre. Es la base de meshes, cámaras, springs, sockets, etc.',
    category: 'actors-components',
    subcategory: 'Componentes',
    elementType: 'componente',
    tags: ['scene', 'transform', 'attachment', 'jerarquía'],
    aliases: ['USceneComponent', 'Root Component'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse: 'Cualquier cosa con posición en el actor: puntos de spawn, sockets lógicos, meshes.',
    howToUse:
      'Añade Scene Component como hijo del Root. Usa AttachToComponent / sockets. Get World Location desde el componente.',
    relatedEntries: ['actor-component', 'collision-components', 'actor'],
    cppEquivalent: {
      available: true,
      summary: 'CreateDefaultSubobject<USceneComponent> en el constructor.',
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'actor-component',
    slug: 'actor-component',
    title: 'Actor Component',
    originalName: 'Actor Component (UActorComponent)',
    summary: 'Componente sin transform propio; encapsula lógica reutilizable en actores.',
    description:
      'UActorComponent añade comportamiento (inventario, salud, interacción) sin ocupar espacio en la jerarquía de escena. Ideal para composición.',
    category: 'actors-components',
    subcategory: 'Componentes',
    elementType: 'componente',
    tags: ['actor component', 'composición', 'lógica'],
    aliases: ['UActorComponent', 'Component'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'intermedio',
    whenToUse: 'Sistemas reutilizables: HealthComponent, InteractionComponent, InventoryComponent.',
    howToUse:
      'Crea Actor Component Blueprint/C++. Añádelo a Character/Actor. Expón funciones y eventos. Otros sistemas hablan con el componente.',
    examples: [
      {
        title: 'Health como componente',
        scenario: 'Enemigos y jugador comparten la misma lógica de vida.',
        steps: [
          'BP_HealthComponent con Health, MaxHealth, ApplyDamage.',
          'Dispatcher OnDeath.',
          'Añadir el componente a cada Character.',
        ],
      },
    ],
    relatedEntries: ['scene-component', 'event-dispatchers', 'character'],
    cppEquivalent: {
      available: true,
      summary: 'UCLASS() class UHealthComponent : public UActorComponent',
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'collision-components',
    slug: 'collision-components',
    title: 'Collision Components',
    originalName: 'Collision Components',
    summary: 'Cápsula, caja, esfera y meshes de colisión para overlaps, hits y blocking.',
    description:
      'Los componentes de forma (Capsule, Box, Sphere) y Primitive Components definen volúmenes de colisión. Su Collision Preset y canales determinan la respuesta.',
    category: 'actors-components',
    subcategory: 'Componentes',
    elementType: 'componente',
    tags: ['collision', 'capsule', 'box', 'sphere', 'overlap'],
    aliases: ['Box Collision', 'Capsule Component', 'Sphere Collision'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'intermedio',
    whenToUse: 'Hurtboxes, triggers, cápsula del Character, áreas de interacción.',
    howToUse:
      'Añade el componente, ajusta extents, Collision Enabled (Query/Physics) y Object Type. Bind OnComponentBeginOverlap / Hit.',
    examples: [
      {
        title: 'Trigger para abrir puerta',
        scenario: 'Box Collision en OverlapOnly.',
        steps: [
          'Generate Overlap Events = true.',
          'OnComponentBeginOverlap → Cast / Interface → abrir.',
        ],
      },
    ],
    relatedEntries: ['collision-channels', 'on-component-begin-overlap', 'on-component-hit'],
    cppEquivalent: {
      available: true,
      summary: 'UBoxComponent, UCapsuleComponent, USphereComponent como subobjects.',
    },
    lastReviewed: '2026-03-01',
  },
]
