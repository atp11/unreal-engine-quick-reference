import type { ReferenceEntry } from '../../types/reference'

export const eventsCommunicationEntries: ReferenceEntry[] = [
  {
    id: 'event-beginplay',
    slug: 'event-beginplay',
    title: 'Event BeginPlay',
    originalName: 'Event BeginPlay',
    summary: 'Se ejecuta una vez cuando el actor empieza a jugar en el mundo.',
    description:
      'BeginPlay es el punto de inicialización de gameplay del actor: referencias, binding de input, timers iniciales. No uses el constructor del Blueprint para lógica que dependa de otros actores ya spawneados.',
    category: 'events-communication',
    subcategory: 'Ciclo de vida',
    elementType: 'evento',
    tags: ['beginplay', 'inicialización', 'evento'],
    aliases: ['Begin Play', 'ReceiveBeginPlay'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse: 'Setup inicial: caché de componentes, binding de Enhanced Input, estado por defecto.',
    howToUse:
      'En Event Graph, Event BeginPlay → Sequence o lógica de init. Si dependes de otro actor, considera delays mínimos, GameMode o interfaces en lugar de asumir orden global.',
    examples: [
      {
        title: 'Inicializar vida y enlazar input',
        scenario: 'Character del jugador al empezar la partida.',
        steps: [
          'BeginPlay → Set Health = MaxHealth.',
          'Obtener PlayerController → Add Mapping Context.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Asumir que todos los actores del nivel ya ejecutaron BeginPlay.',
        solution: 'No dependas del orden; usa referencias asignadas o busca con cuidado tras el inicio.',
      },
    ],
    relatedEntries: ['event-tick', 'enhanced-input-setup', 'actor'],
    cppEquivalent: {
      available: true,
      summary: 'virtual void BeginPlay() override; llamar Super::BeginPlay().',
      snippets: [
        {
          language: 'cpp',
          code: `void AMyActor::BeginPlay()
{
    Super::BeginPlay();
    Health = MaxHealth;
}`,
        },
      ],
    },
    officialReferences: [
      {
        title: 'Actor Lifecycle',
        url: 'https://dev.epicgames.com/documentation/unreal-engine/actor-lifecycle-in-unreal-engine',
      },
    ],
    lastReviewed: '2026-03-01',
  },
  {
    id: 'event-tick',
    slug: 'event-tick',
    title: 'Event Tick',
    originalName: 'Event Tick',
    summary: 'Se llama cada frame mientras el actor tenga el ticking habilitado.',
    description:
      'Tick es útil para interpolaciones o lógica continua, pero es costoso si se abusa. Preferible timers, timelines o eventos para lógica esporádica.',
    category: 'events-communication',
    subcategory: 'Ciclo de vida',
    elementType: 'evento',
    tags: ['tick', 'frame', 'rendimiento'],
    aliases: ['Tick', 'ReceiveTick'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'intermedio',
    whenToUse: 'Seguimiento suave, chequeos frecuentes justificados, prototipos rápidos.',
    howToUse:
      'Event Tick recibe Delta Seconds. Usa ese valor para movimiento frame-independent. Desactiva ticking (Set Actor Tick Enabled) cuando no haga falta.',
    examples: [
      {
        title: 'Rotar un prop constantemente',
        scenario: 'Pickup que gira para llamar la atención.',
        steps: [
          'Tick → Add Actor Local Rotation con Yaw = Speed * DeltaSeconds.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Line traces y búsquedas caras cada frame en muchos actores.',
        solution: 'Reduce frecuencia con timers o limita a actores cercanos.',
      },
    ],
    relatedEntries: ['event-beginplay', 'get-actor-location'],
    cppEquivalent: {
      available: true,
      summary: 'Tick(float DeltaSeconds) con PrimaryActorTick.bCanEverTick = true.',
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'cast-to',
    slug: 'cast-to',
    title: 'Cast To',
    originalName: 'Cast To',
    summary: 'Intenta convertir una referencia a un tipo más específico; falla si no coincide.',
    description:
      'Cast To comprueba en runtime si el objeto es del tipo (o subtipo) indicado. Si tiene éxito, expone la referencia tipada; si no, ejecuta el pin Cast Failed.',
    category: 'events-communication',
    subcategory: 'Tipos',
    elementType: 'nodo',
    tags: ['cast', 'tipos', 'polimorfismo'],
    aliases: ['Cast', 'Cast To Class'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse:
      'Cuando recibes Actor genérico (overlap, trace) y necesitas tu clase concreta. Prefiere interfaces si muchos tipos distintos comparten comportamiento.',
    howToUse:
      'Conecta Object → Cast To BP_PlayerCharacter. Usa As BP_PlayerCharacter en éxito. Maneja Cast Failed.',
    examples: [
      {
        title: 'Detectar si quien entra es el jugador',
        scenario: 'Trigger de zona.',
        steps: [
          'OnComponentBeginOverlap → Other Actor → Cast To BP_Player.',
          'Éxito: abrir puerta; Failed: ignorar.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Cadenas de Cast To a muchas clases distintas.',
        solution: 'Usa Blueprint Interface o un componente compartido.',
      },
    ],
    relatedEntries: ['blueprint-interfaces', 'on-component-begin-overlap', 'actor'],
    cppEquivalent: {
      available: true,
      summary: 'Cast<T>(Object) o CastChecked en debug.',
      snippets: [
        {
          language: 'cpp',
          code: `if (AMyCharacter* Character = Cast<AMyCharacter>(OtherActor))
{
    Character->AddScore(10);
}`,
        },
      ],
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'event-dispatchers',
    slug: 'event-dispatchers',
    title: 'Event Dispatchers',
    originalName: 'Event Dispatchers',
    summary: 'Sistema de eventos multicast: un emisor notifica a varios oyentes enlazados.',
    description:
      'Un Event Dispatcher permite que otros Blueprints se suscriban (Bind) a un evento y reaccionen cuando se hace Call/Broadcast. Desacopla emisor y receptores.',
    category: 'events-communication',
    subcategory: 'Mensajería',
    elementType: 'evento',
    tags: ['dispatcher', 'bind', 'broadcast', 'eventos'],
    aliases: ['Dispatcher', 'Custom Event multicast'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'intermedio',
    whenToUse:
      'UI que reacciona a cambios de vida, puertas que escuchan al interruptor, sistemas one-to-many en el mismo nivel.',
    howToUse:
      'Crea el dispatcher en el emisor. En el oyente, Bind Event to … pasando un Custom Event. En el emisor, Call el dispatcher. Unbind al destruir si es necesario.',
    examples: [
      {
        title: 'Actualizar HUD cuando cambia la vida',
        scenario: 'Character emite OnHealthChanged(float NewHealth).',
        steps: [
          'En el Character: Event Dispatcher OnHealthChanged.',
          'Tras ApplyDamage: Call OnHealthChanged con Health actual.',
          'En el Widget: BeginPlay obtiene el Character y Bind a un Custom Event que actualiza la barra.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'No desvincular y mantener referencias a widgets destruidos.',
        solution: 'Unbind en EndPlay/Destruct o usa weak patterns equivalentes.',
      },
    ],
    relatedEntries: ['blueprint-interfaces', 'event-beginplay'],
    cppEquivalent: {
      available: true,
      summary: 'DECLARE_DYNAMIC_MULTICAST_DELEGATE y UPROPERTY BlueprintAssignable.',
    },
    officialReferences: [
      {
        title: 'Event Dispatchers',
        url: 'https://dev.epicgames.com/documentation/unreal-engine/event-dispatchers-in-unreal-engine',
      },
    ],
    lastReviewed: '2026-03-01',
  },
  {
    id: 'blueprint-interfaces',
    slug: 'blueprint-interfaces',
    title: 'Blueprint Interfaces',
    originalName: 'Blueprint Interfaces',
    summary: 'Contrato de funciones que distintos Blueprints pueden implementar sin herencia común.',
    description:
      'Una interfaz define firmas (Interact, TakeDamage). Los Blueprints que la implementan proporcionan el cuerpo. Permite comunicación tipada sin Cast To a clases concretas.',
    category: 'events-communication',
    subcategory: 'Mensajería',
    elementType: 'interfaz',
    tags: ['interface', 'comunicación', 'interact', 'desacoplamiento'],
    aliases: ['BPI', 'Interface Message'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'intermedio',
    whenToUse:
      'Sistemas de interacción, daño o activables donde muchos actores distintos responden al mismo mensaje.',
    howToUse:
      'Crea Blueprint Interface con funciones. En cada actor: Class Settings → Implemented Interfaces. Implementa el Event/Function. Desde el llamador usa Message (Does Implement Interface opcional).',
    examples: [
      {
        title: 'Sistema de interacción',
        scenario: 'El jugador pulsa Interact frente a puertas, cofres y NPCs.',
        steps: [
          'BPI_Interactable con Interact(Player).',
          'Line Trace → si el hit implementa la interfaz, enviar Interact.',
          'Cada actor implementa su propia reacción.',
        ],
      },
    ],
    relatedEntries: ['cast-to', 'event-dispatchers', 'line-trace-by-channel'],
    cppEquivalent: {
      available: true,
      summary: 'UINTERFACE / IInterface en C++; Blueprints pueden implementarlas.',
    },
    officialReferences: [
      {
        title: 'Blueprint Interface',
        url: 'https://dev.epicgames.com/documentation/unreal-engine/blueprint-interface-in-unreal-engine',
      },
    ],
    lastReviewed: '2026-03-01',
  },
]
