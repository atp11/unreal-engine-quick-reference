import type { ReferenceEntry } from '../../types/reference'

export const physicsCollisionEntries: ReferenceEntry[] = [
  {
    id: 'collision-channels',
    slug: 'collision-channels',
    title: 'Collision Channels',
    originalName: 'Collision Channels',
    summary: 'Categorías Object Type / Trace Channel que definen quién choca, bloquea o se ignora.',
    description:
      'Unreal distingue Object Channels (qué es el objeto) y Trace Channels (qué pregunta un raycast). Los presets (BlockAll, OverlapAllDynamic, Custom) combinan respuestas.',
    category: 'physics-collision',
    subcategory: 'Configuración',
    elementType: 'concepto',
    tags: ['channels', 'object type', 'trace', 'presets'],
    aliases: ['Object Channels', 'Trace Channels', 'Collision Preset'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'intermedio',
    whenToUse: 'Diseñar capas: Visibility, Camera, WorldStatic, Pawn, canales custom de gameplay.',
    howToUse:
      'Project Settings → Collision. Crea canales si hace falta. En cada componente elige Preset o Custom responses.',
    examples: [
      {
        title: 'Canal Interactable',
        scenario: 'Line Trace solo detecta props interactuables.',
        steps: [
          'Crear Trace Channel Interactable.',
          'Props: Object Type custom que bloquea Interactable.',
          'Trace By Channel usando Interactable.',
        ],
      },
    ],
    relatedEntries: ['line-trace-by-channel', 'collision-components'],
    officialReferences: [
      {
        title: 'Collision Overview',
        url: 'https://dev.epicgames.com/documentation/unreal-engine/collision-in-unreal-engine',
      },
    ],
    lastReviewed: '2026-03-01',
  },
  {
    id: 'line-trace-by-channel',
    slug: 'line-trace-by-channel',
    title: 'Line Trace By Channel',
    originalName: 'Line Trace By Channel',
    summary: 'Lanza un rayo y reporta el primer bloqueo en un Trace Channel.',
    description:
      'Muy usado para interacción, disparos hitscan y suelo. Devuelve Hit Result con Location, Normal, Component, Actor, Bone Name, etc.',
    category: 'physics-collision',
    subcategory: 'Queries',
    elementType: 'nodo',
    tags: ['linetrace', 'raycast', 'hit result', 'visibility'],
    aliases: ['LineTrace', 'Raycast', 'Line Trace'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'intermedio',
    whenToUse: 'Detectar a qué apunta el jugador, comprobar suelo, hitscan.',
    howToUse:
      'Define Start/End. Elige Trace Channel (Visibility, Camera, custom). Ignora Self si parte desde el Character. Branch con Return Value (bool hit).',
    examples: [
      {
        title: 'Sistema de interacción',
        scenario: 'Desde la cámara, 300 unidades adelante.',
        steps: [
          'Get Camera Location / Forward Vector.',
          'Line Trace By Channel (Interactable).',
          'Si hit: Message Interact en el Actor.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Usar Visibility cuando el mesh no bloquea Visibility.',
        solution: 'Revisa Collision Responses del mesh y el canal del trace.',
      },
    ],
    relatedEntries: ['collision-channels', 'blueprint-interfaces', 'get-actor-location'],
    cppEquivalent: {
      available: true,
      summary: 'GetWorld()->LineTraceSingleByChannel(Hit, Start, End, ECC_Visibility).',
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'on-component-begin-overlap',
    slug: 'on-component-begin-overlap',
    title: 'OnComponentBeginOverlap',
    originalName: 'On Component Begin Overlap',
    summary: 'Evento cuando otro componente entra en el volumen de overlap.',
    description:
      'Requiere Generate Overlap Events y Collision Enabled que permita Query. Ideal para triggers, recogidas y zonas.',
    category: 'physics-collision',
    subcategory: 'Eventos',
    elementType: 'evento',
    tags: ['overlap', 'trigger', 'begin overlap'],
    aliases: ['Begin Overlap', 'OnActorBeginOverlap'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse: 'Puertas automáticas, checkpoints, daño por zona, pickups.',
    howToUse:
      'Selecciona el componente de colisión → Events → On Component Begin Overlap. Filtra Other Actor con Cast o Interface.',
    examples: [
      {
        title: 'Abrir puerta al entrar el jugador',
        scenario: 'Box trigger delante de la puerta.',
        steps: [
          'Overlap → Cast To BP_Player.',
          'True: Timeline que rota la puerta.',
        ],
      },
    ],
    relatedEntries: ['collision-components', 'cast-to', 'on-component-hit'],
    cppEquivalent: {
      available: true,
      summary: 'OnComponentBeginOverlap.AddDynamic(this, &AMyActor::HandleOverlap);',
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'on-component-hit',
    slug: 'on-component-hit',
    title: 'OnComponentHit',
    originalName: 'On Component Hit',
    summary: 'Evento de impacto físico (blocking) entre primitivas con simulación o movimiento.',
    description:
      'Hit se dispara en colisiones de bloqueo, no en overlaps puros. Útil para proyectiles, ragdolls y impulsos.',
    category: 'physics-collision',
    subcategory: 'Eventos',
    elementType: 'evento',
    tags: ['hit', 'impacto', 'blocking', 'physics'],
    aliases: ['On Hit', 'Hit Event'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'intermedio',
    whenToUse: 'Proyectiles que aplican daño al chocar, objetos que suenan al golpear.',
    howToUse:
      'Simulation Generates Hit Events = true en el componente. Bind On Component Hit. Lee Normal Impulse / Hit Result.',
    examples: [
      {
        title: 'Proyectil que aplica daño',
        scenario: 'Sphere con física o Projectile Movement.',
        steps: [
          'OnComponentHit → Other Actor.',
          'Interface TakeDamage → Destroy Self.',
        ],
      },
    ],
    relatedEntries: ['on-component-begin-overlap', 'physical-materials', 'character'],
    cppEquivalent: {
      available: true,
      summary: 'OnComponentHit.AddDynamic(...);',
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'physical-materials',
    slug: 'physical-materials',
    title: 'Physical Materials',
    originalName: 'Physical Materials',
    summary: 'Assets que definen fricción, restitución y metadatos de superficie (sonido, decals).',
    description:
      'Un Physical Material se asigna a materiales/colisiones. Queries y hits pueden devolverlo para elegir FX según Metal, Wood, Flesh, etc.',
    category: 'physics-collision',
    subcategory: 'Materiales',
    elementType: 'concepto',
    tags: ['physical material', 'fricción', 'superficie', 'fx'],
    aliases: ['PhysMaterial', 'Surface Type'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'intermedio',
    whenToUse: 'Pasos distintos por superficie, chispas en metal, rebote de proyectiles.',
    howToUse:
      'Crea Physical Material, asigna Surface Type. En el Material o Collision, referencia el PhysMat. En Hit Result, lee Phys Material.',
    relatedEntries: ['on-component-hit', 'line-trace-by-channel'],
    cppEquivalent: {
      available: true,
      summary: 'Hit.PhysMaterial para ramificar FX en C++.',
    },
    lastReviewed: '2026-03-01',
  },
]
