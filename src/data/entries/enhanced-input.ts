import type { ReferenceEntry } from '../../types/reference'

export const enhancedInputEntries: ReferenceEntry[] = [
  {
    id: 'input-action',
    slug: 'input-action',
    title: 'Input Action',
    originalName: 'Input Action (UInputAction)',
    summary: 'Define una acción lógica (Jump, Move, Interact) y el tipo de valor que produce.',
    description:
      'Un Input Action desacopla la intención de juego de las teclas físicas. Value Type puede ser Digital (bool), Axis1D, Axis2D o Axis3D.',
    category: 'enhanced-input',
    subcategory: 'Assets',
    elementType: 'sistema',
    tags: ['input', 'action', 'enhanced input', 'IA_'],
    aliases: ['IA', 'UInputAction'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse: 'Cualquier control nuevo en UE5; evita el antiguo BindAxis/BindAction salvo legado.',
    howToUse:
      'Content Browser → Input → Input Action. Elige Value Type. Referéncialo en Mapping Context y en eventos EnhancedInputAction.',
    examples: [
      {
        title: 'Acción Interact digital',
        scenario: 'Pulsar E para interactuar.',
        steps: [
          'Crear IA_Interact (Digital).',
          'Mapear tecla E en IMC_Default.',
          'En Character: Started → trazar e Interact interface.',
        ],
      },
    ],
    relatedEntries: ['input-mapping-context', 'input-triggers', 'enhanced-input-setup'],
    cppEquivalent: {
      available: true,
      summary: 'Bind vía UEnhancedInputComponent::BindAction en SetupPlayerInputComponent.',
    },
    officialReferences: [
      {
        title: 'Enhanced Input',
        url: 'https://dev.epicgames.com/documentation/unreal-engine/enhanced-input-in-unreal-engine',
      },
    ],
    lastReviewed: '2026-03-01',
  },
  {
    id: 'input-mapping-context',
    slug: 'input-mapping-context',
    title: 'Input Mapping Context',
    originalName: 'Input Mapping Context (UInputMappingContext)',
    summary: 'Conjunto de mapeos tecla/pad → Input Action, con prioridad al apilar contextos.',
    description:
      'El Mapping Context agrupa bindings. Puedes tener IMC_OnFoot, IMC_Vehicle, IMC_UI y añadir/quitar contextos según el estado del juego.',
    category: 'enhanced-input',
    subcategory: 'Assets',
    elementType: 'sistema',
    tags: ['mapping context', 'IMC', 'bindings', 'prioridad'],
    aliases: ['IMC', 'UInputMappingContext'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse: 'Organizar controles por modo de juego o menú.',
    howToUse:
      'Crea IMC, añade mappings (tecla + action + modifiers/triggers). En runtime Add Mapping Context con prioridad.',
    relatedEntries: ['input-action', 'input-modifiers', 'enhanced-input-setup'],
    cppEquivalent: {
      available: true,
      summary: 'UEnhancedInputLocalPlayerSubsystem::AddMappingContext.',
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'input-triggers',
    slug: 'input-triggers',
    title: 'Triggers',
    originalName: 'Input Triggers',
    summary: 'Reglas que deciden cuándo una acción se considera Started/Ongoing/Triggered/Completed.',
    description:
      'Triggers como Pressed, Released, Hold, Pulse o Down condicionan la activación. Se configuran por mapping o en el Input Action.',
    category: 'enhanced-input',
    subcategory: 'Comportamiento',
    elementType: 'concepto',
    tags: ['triggers', 'hold', 'pressed', 'input'],
    aliases: ['Input Trigger', 'Hold Trigger'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'intermedio',
    whenToUse: 'Cargas de habilidad (Hold), disparo automático (Pulse), confirmar al soltar (Released).',
    howToUse:
      'En el mapping o en la acción, añade Triggers. Escucha el evento Triggered (o Started) según el diseño.',
    examples: [
      {
        title: 'Abrir inventario al mantener Tab',
        scenario: 'Evitar toggles accidentales.',
        steps: [
          'IA_Inventory con trigger Hold (0.2s).',
          'Triggered → abrir widget.',
        ],
      },
    ],
    relatedEntries: ['input-action', 'input-modifiers'],
    cppEquivalent: {
      available: false,
      summary:
        'Los triggers son assets/configuración de Enhanced Input; en C++ se usan las mismas UInputTrigger al construir mappings, no hay un «if» equivalente único.',
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'input-modifiers',
    slug: 'input-modifiers',
    title: 'Modifiers',
    originalName: 'Input Modifiers',
    summary: 'Transforman el valor crudo del input antes de entregarlo a la acción.',
    description:
      'Modifiers como Negate, Scalar, Dead Zone, Swizzle Axes ajustan sticks y ratón. Se aplican en cadena en el mapping.',
    category: 'enhanced-input',
    subcategory: 'Comportamiento',
    elementType: 'concepto',
    tags: ['modifiers', 'dead zone', 'negate', 'axis'],
    aliases: ['Input Modifier', 'Dead Zone'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'intermedio',
    whenToUse: 'Invertir look Y, aplicar sensibilidad, limpiar ruido de stick.',
    howToUse: 'En el mapping de Move/Look, añade Dead Zone y Scalar según el dispositivo.',
    relatedEntries: ['input-action', 'input-mapping-context'],
    cppEquivalent: {
      available: false,
      summary:
        'Igual que los triggers, los modifiers son parte del pipeline de Enhanced Input; en C++ se configuran como objetos UInputModifier, no como nodos Blueprint sueltos.',
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'enhanced-input-setup',
    slug: 'configurar-enhanced-input',
    title: 'Configuración en Player Controller o Pawn',
    originalName: 'Enhanced Input Setup',
    summary: 'Cómo añadir Mapping Contexts y enlazar Input Actions en Controller o Pawn.',
    description:
      'El flujo típico: obtener Enhanced Input Local Player Subsystem, Add Mapping Context en BeginPlay, y BindAction en SetupPlayerInputComponent (C++) o nodos de evento en Blueprint.',
    category: 'enhanced-input',
    subcategory: 'Integración',
    elementType: 'concepto',
    tags: ['setup', 'player controller', 'pawn', 'bind'],
    aliases: ['Add Mapping Context', 'SetupPlayerInputComponent'],
    ueVersions: ['5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'intermedio',
    whenToUse: 'Al montar el primer Character controlable o cambiar de modo de control.',
    howToUse:
      'En BeginPlay del Pawn/Controller: Get Player Controller → Get Local Player Subsystem (Enhanced Input) → Add Mapping Context. En Blueprint, usa eventos Enhanced Input Action para cada IA.',
    examples: [
      {
        title: 'Añadir contexto al poseer el Pawn',
        scenario: 'Jugador local inicia con IMC_Default prioridad 0.',
        steps: [
          'BeginPlay → Is Locally Controlled.',
          'Add Mapping Context (IMC_Default, Priority 0).',
          'Event IA_Move (Axis2D) → Add Movement Input.',
        ],
        snippets: [
          {
            language: 'cpp',
            title: 'Fragmento en SetupPlayerInputComponent',
            code: `if (UEnhancedInputComponent* EIC = Cast<UEnhancedInputComponent>(PlayerInputComponent))
{
    EIC->BindAction(MoveAction, ETriggerEvent::Triggered, this, &AMyCharacter::Move);
}`,
            explanation: 'Asume MoveAction (UInputAction*) asignado y Mapping Context añadido vía subsystem.',
          },
        ],
      },
    ],
    relatedEntries: ['input-action', 'input-mapping-context', 'player-controller', 'character'],
    lastReviewed: '2026-03-01',
  },
]
