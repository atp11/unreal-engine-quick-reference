import type { ReferenceEntry } from '../../types/reference'

export const blueprintFundamentalsEntries: ReferenceEntry[] = [
  {
    id: 'variables-tipos',
    slug: 'variables-y-tipos',
    title: 'Variables y tipos',
    originalName: 'Variables & Types',
    summary: 'Almacenan datos tipados en Blueprints: booleanos, números, vectores, objetos y más.',
    description:
      'Las variables en Blueprint guardan valores con un tipo definido. Pueden ser locales a una función o miembros del Blueprint. El tipado evita mezclar datos incompatibles y permite exponer propiedades al editor con Instance Editable.',
    category: 'blueprint-fundamentals',
    subcategory: 'Datos',
    elementType: 'variable',
    tags: ['variables', 'tipos', 'bool', 'float', 'vector', 'object'],
    aliases: ['Blueprint Variables', 'tipos de datos'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse:
      'Cuando necesitas recordar un estado (vida, puntuación, referencias a actores) entre eventos o compartirlo con el editor.',
    howToUse:
      'En el My Blueprint panel, crea una variable, elige el tipo y, si debe editarse en el nivel, marca Instance Editable. Usa Get/Set en el grafo. Las variables locales se crean dentro de funciones y no persisten entre llamadas.',
    examples: [
      {
        title: 'Cambiar una variable al pulsar un botón',
        scenario:
          'El jugador pulsa Interact y quieres marcar que el interruptor está activado.',
        steps: [
          'Crea una variable booleana bIsActivated, Instance Editable desactivado.',
          'En el evento de Input Action (Started), conecta un Set bIsActivated a true.',
          'Opcional: ramifica con Branch si solo debe activarse una vez.',
        ],
        notes: [
          'Prefiere nombres claros (bIsActivated) frente a genéricos (Flag).',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Usar Object genérico sin tipar y luego castear siempre.',
        solution:
          'Declara el tipo concreto (Actor, Character, tu clase BP) para evitar Cast To innecesarios.',
      },
      {
        mistake: 'Exponer demasiadas variables públicas al diseñador.',
        solution:
          'Marca Instance Editable solo lo configurable por nivel; el resto privado o con Category organizada.',
      },
    ],
    relatedEntries: ['branch', 'functions-blueprint', 'upROPERTY'],
    cppEquivalent: {
      available: true,
      summary:
        'En C++ las variables de miembro se declaran en la clase y se exponen con UPROPERTY cuando deben verse en Blueprints o el editor.',
      relatedEntryIds: ['upROPERTY'],
      snippets: [
        {
          language: 'cpp',
          title: 'Variable tipada expuesta al editor',
          code: `UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Estado")
bool bIsActivated = false;`,
        },
      ],
    },
    officialReferences: [
      {
        title: 'Blueprint Variables (Epic Games)',
        url: 'https://dev.epicgames.com/documentation/unreal-engine/blueprint-variables-in-unreal-engine',
      },
    ],
    lastReviewed: '2026-03-01',
  },
  {
    id: 'functions-blueprint',
    slug: 'funciones-blueprint',
    title: 'Funciones',
    originalName: 'Functions',
    summary: 'Bloques reutilizables con entradas, salidas y (opcionalmente) pines de ejecución.',
    description:
      'Las funciones encapsulan lógica reutilizable. Pueden ser puras (sin side effects visibles en el grafo, sin exec pins) o impure. Admiten parámetros tipados, valores de retorno y variables locales.',
    category: 'blueprint-fundamentals',
    subcategory: 'Organización',
    elementType: 'funcion',
    tags: ['functions', 'pure', 'reutilización', 'parámetros'],
    aliases: ['Blueprint Function', 'Custom Function'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse:
      'Cuando la misma secuencia de nodos se repite, o quieres aislar una operación con nombre claro (ApplyDamage, OpenDoor).',
    howToUse:
      'Crea una Function en My Blueprint, define Inputs/Outputs y construye el grafo interno. Si no debe alterar estado externo de forma opaca, considera marcarla Pure. Llama la función desde Event Graph u otras funciones.',
    examples: [
      {
        title: 'Aplicar daño a un personaje',
        scenario: 'Varios actores necesitan reducir Health de forma consistente.',
        steps: [
          'Crea ApplyDamage(float Amount) que haga Set Health = Clamp(Health - Amount, 0, MaxHealth).',
          'Si Health llega a 0, llama a una función Die() separada.',
          'Invoca ApplyDamage desde OnComponentBeginOverlap o desde un proyectil.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Funciones enormes que mezclan UI, daño y animación.',
        solution: 'Divide por responsabilidad; usa macros solo para patrones de flujo cortos.',
      },
    ],
    relatedEntries: ['macros-blueprint', 'branch', 'ufunction'],
    cppEquivalent: {
      available: true,
      summary: 'Las UFUNCTION con BlueprintCallable o BlueprintPure son el equivalente natural.',
      relatedEntryIds: ['ufunction'],
    },
    officialReferences: [
      {
        title: 'Blueprint Functions',
        url: 'https://dev.epicgames.com/documentation/unreal-engine/functions-in-unreal-engine',
      },
    ],
    lastReviewed: '2026-03-01',
  },
  {
    id: 'macros-blueprint',
    slug: 'macros-blueprint',
    title: 'Macros',
    originalName: 'Macros',
    summary: 'Plantillas de nodos que se expanden en el grafo, útiles para patrones de flujo.',
    description:
      'Un macro de Blueprint inserta su contenido en el lugar de la llamada (a diferencia de una función, que es una llamada real). Son ideales para combinar varios pines de ejecución o patrones que no encajan bien en funciones.',
    category: 'blueprint-fundamentals',
    subcategory: 'Organización',
    elementType: 'macro',
    tags: ['macros', 'flujo', 'exec pins'],
    aliases: ['Blueprint Macro', 'Macro Library'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'intermedio',
    whenToUse:
      'Cuando necesitas múltiples pines de salida de ejecución personalizados o reutilizar un patrón de flujo sin el coste de abstracción de una función.',
    howToUse:
      'Crea un Macro (o Macro Library). Define pines Exec y de datos. Usa Tunnel nodes para entradas/salidas. Coloca el macro en el grafo como cualquier nodo.',
    examples: [
      {
        title: 'Patrón Is Valid then…',
        scenario: 'Comprobar si un actor es válido y ramificar éxito/fallo.',
        steps: [
          'Macro con entrada Object Reference y dos exec outs: Valid / Invalid.',
          'Internamente: Is Valid → Branch → Tunnel outs.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Usar macros para lógica compleja con estado.',
        solution: 'Prefiere funciones para lógica; macros para flujo corto y repetible.',
      },
    ],
    relatedEntries: ['functions-blueprint', 'sequence', 'branch'],
    cppEquivalent: {
      available: false,
      summary:
        'No hay un equivalente directo de macros de Blueprint en C++. En C++ se usan funciones, plantillas o macros del preprocesador con semántica distinta.',
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'branch',
    slug: 'branch',
    title: 'Branch',
    originalName: 'Branch',
    summary: 'Nodo de decisión: ejecuta True o False según una condición booleana.',
    description:
      'Branch (if) bifurca el flujo de ejecución. El pin Condition recibe un bool; solo una de las salidas True/False continúa la cadena Exec.',
    category: 'blueprint-fundamentals',
    subcategory: 'Flujo',
    elementType: 'nodo',
    tags: ['branch', 'if', 'flujo', 'bool'],
    aliases: ['If', 'If Then Else'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse: 'Siempre que una acción dependa de una condición (¿tiene llave?, ¿está vivo?, ¿cooldown listo?).',
    howToUse:
      'Conecta el exec entrante al Branch. En Conditional, conecta un Get de variable, comparación o función pura. Continúa la lógica por True y/o False.',
    examples: [
      {
        title: 'Abrir puerta solo si el jugador tiene la llave',
        scenario: 'Overlap con el trigger de la puerta.',
        steps: [
          'OnComponentBeginOverlap → Cast al Character del jugador.',
          'Branch con Condition = HasKey.',
          'True: reproducir animación Open; False: mostrar mensaje «Necesitas la llave».',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Dejar una salida sin conectar y asumir que «no pasa nada» cuando sí debías manejar el caso.',
        solution: 'Decide explícitamente el comportamiento de True y False; documenta el caso vacío si es intencional.',
      },
    ],
    relatedEntries: ['sequence', 'event-beginplay', 'variables-tipos'],
    cppEquivalent: {
      available: true,
      summary: 'Equivalente a una sentencia if/else en C++.',
      snippets: [
        {
          language: 'cpp',
          code: `if (bHasKey)
{
    OpenDoor();
}
else
{
    ShowLockedMessage();
}`,
        },
      ],
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'sequence',
    slug: 'sequence',
    title: 'Sequence',
    originalName: 'Sequence',
    summary: 'Ejecuta varios pines de salida en orden (Then 0, Then 1, …) en el mismo frame.',
    description:
      'Sequence permite encadenar varias acciones secuenciales desde un único punto de entrada sin anidar nodos. Todas las salidas se ejecutan en orden en la misma cadena de ejecución.',
    category: 'blueprint-fundamentals',
    subcategory: 'Flujo',
    elementType: 'nodo',
    tags: ['sequence', 'flujo', 'orden'],
    aliases: ['Then 0', 'secuencia'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse:
      'Cuando tras un evento debes hacer varias cosas independientes en orden (reproducir sonido, cambiar material, notificar UI).',
    howToUse:
      'Arrastra Sequence, conecta el exec de entrada y añade pines Then según necesites. Cada Then inicia su propia subcadena.',
    examples: [
      {
        title: 'Al activar un interruptor',
        scenario: 'Encender luces, reproducir audio y registrar en el GameState.',
        steps: [
          'Input Action → Sequence.',
          'Then 0: Set luces Intensity.',
          'Then 1: Play Sound at Location.',
          'Then 2: llamar interfaz o dispatcher.',
        ],
      },
    ],
    relatedEntries: ['branch', 'event-beginplay', 'macros-blueprint'],
    cppEquivalent: {
      available: true,
      summary: 'Equivale a llamar varias funciones una tras otra en el mismo ámbito.',
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'for-loop',
    slug: 'for-loop',
    title: 'For Loop',
    originalName: 'For Loop',
    summary: 'Repite un cuerpo de ejecución desde First Index hasta Last Index inclusive.',
    description:
      'For Loop itera un rango de enteros. En cada iteración expone Index y el pin Loop Body. Al terminar, ejecuta Completed.',
    category: 'blueprint-fundamentals',
    subcategory: 'Bucles',
    elementType: 'nodo',
    tags: ['loop', 'for', 'iteración', 'index'],
    aliases: ['For', 'bucle for'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse: 'Cuando conoces el número de repeticiones (spawnear N enemigos, inicializar slots).',
    howToUse:
      'Define First Index y Last Index. Conecta Loop Body a la lógica por iteración. Usa Index como dato. Completed para lógica post-bucle.',
    examples: [
      {
        title: 'Generar varios actores',
        scenario: 'Spawnear 5 pickups en posiciones calculadas.',
        steps: [
          'For Loop 0..4.',
          'En Loop Body: Spawn Actor From Class con Location = Base + Index * Offset.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Bucles muy grandes en Event Tick.',
        solution: 'Evita trabajo pesado por frame; reparte en timers o asíncrono.',
      },
    ],
    relatedEntries: ['for-each-loop', 'spawn-actor-from-class'],
    cppEquivalent: {
      available: true,
      summary: 'Equivalente a for (int32 Index = First; Index <= Last; ++Index).',
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'for-each-loop',
    slug: 'for-each-loop',
    title: 'For Each Loop',
    originalName: 'For Each Loop',
    summary: 'Itera cada elemento de un Array, Set o Map (según nodo).',
    description:
      'For Each Loop recorre una colección. Expone Array Element y Array Index en cada iteración, y Completed al finalizar.',
    category: 'blueprint-fundamentals',
    subcategory: 'Bucles',
    elementType: 'nodo',
    tags: ['loop', 'array', 'foreach', 'colección'],
    aliases: ['ForEach', 'Iterate Array'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse: 'Cuando trabajas con listas (enemigos cercanos, inventarios, puntos de ruta).',
    howToUse:
      'Conecta el Array al pin correspondiente. En Loop Body usa Array Element. Hay variantes con Break para salir anticipadamente.',
    examples: [
      {
        title: 'Aplicar daño a todos los actores en un array',
        scenario: 'Tras un Area of Effect tienes TArray de actores dañados.',
        steps: [
          'For Each Loop sobre HitActors.',
          'Cast a interfaz Damageable o a tu Character.',
          'Llama ApplyDamage en cada uno válido.',
        ],
      },
    ],
    relatedEntries: ['for-loop', 'cast-to', 'blueprint-interfaces'],
    cppEquivalent: {
      available: true,
      summary: 'for (AActor* Actor : HitActors) { ... } o algoritmos sobre TArray.',
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'get-actor-location',
    slug: 'get-actor-location',
    title: 'Get Actor Location',
    originalName: 'Get Actor Location',
    summary: 'Devuelve la ubicación mundial (Vector) del Root Component del actor.',
    description:
      'Nodo puro que lee la posición en espacio de mundo del actor objetivo. Es la forma más habitual de obtener coordenadas para spawns, traces o distancias.',
    category: 'blueprint-fundamentals',
    subcategory: 'Transform',
    elementType: 'nodo',
    tags: ['location', 'vector', 'transform', 'actor'],
    aliases: ['Actor Location', 'GetLocation'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse: 'Para distancias, spawns relativos, UI world-space o traces desde el actor.',
    howToUse:
      'Pasa el Target (Self por defecto). Usa el Vector de salida en nodos como Vector Length, Spawn Actor o Line Trace.',
    examples: [
      {
        title: 'Distancia al jugador',
        scenario: 'Un NPC decide si está cerca del jugador.',
        steps: [
          'Get Actor Location (Self) y Get Actor Location (Player).',
          'Vector - Vector → Vector Length.',
          'Branch si Distance < Threshold.',
        ],
      },
    ],
    relatedEntries: ['spawn-actor-from-class', 'line-trace-by-channel', 'actor'],
    cppEquivalent: {
      available: true,
      summary: 'GetActorLocation() en AActor.',
      snippets: [
        {
          language: 'cpp',
          code: `const FVector Location = GetActorLocation();`,
        },
      ],
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'spawn-actor-from-class',
    slug: 'spawn-actor-from-class',
    title: 'Spawn Actor From Class',
    originalName: 'Spawn Actor from Class',
    summary: 'Instancia un Actor en el mundo a partir de una clase y un transform.',
    description:
      'Crea un nuevo actor en runtime. Requiere Class, Transform (o Location/Rotation) y opciones de colisión al spawnear. Devuelve la referencia al actor creado.',
    category: 'blueprint-fundamentals',
    subcategory: 'Ciclo de vida',
    elementType: 'nodo',
    tags: ['spawn', 'actor', 'instanciar', 'class'],
    aliases: ['SpawnActor', 'Spawn Actor'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'intermedio',
    whenToUse: 'Proyectiles, enemigos, pickups, efectos o cualquier actor creado en juego.',
    howToUse:
      'Elige Class (literal o variable TSubclassOf). Define Spawn Transform. Ajusta Collision Handling. Guarda el Return Value si debes configurar el actor tras spawnearlo.',
    examples: [
      {
        title: 'Generar un actor desde clase elegida en el editor',
        scenario: 'Un spawner con variable ProjectileClass editable.',
        steps: [
          'UPROPERTY/variable TSubclassOf<AActor> ProjectileClass.',
          'En disparo: Spawn Actor From Class con esa clase y transform del muzzle.',
          'Si Return Value es válido, configura velocidad inicial.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Class nulo → spawn falla en silencio si no compruebas el resultado.',
        solution: 'Valida Is Valid tras spawnear y asegura que la clase esté asignada en el editor.',
      },
    ],
    relatedEntries: ['destroy-actor', 'tsubclassof', 'actor'],
    cppEquivalent: {
      available: true,
      summary: 'GetWorld()->SpawnActor<T>(...) o SpawnActorDeferred.',
      relatedEntryIds: ['tsubclassof'],
    },
    officialReferences: [
      {
        title: 'Spawning Actors',
        url: 'https://dev.epicgames.com/documentation/unreal-engine/spawning-actors-in-unreal-engine',
      },
    ],
    lastReviewed: '2026-03-01',
  },
  {
    id: 'destroy-actor',
    slug: 'destroy-actor',
    title: 'Destroy Actor',
    originalName: 'Destroy Actor',
    summary: 'Elimina un actor del mundo de forma diferida al final del frame (por defecto).',
    description:
      'Marca el actor para destrucción. Tras Destroy, no debes usar la referencia. EndPlay se ejecuta como parte del ciclo de vida.',
    category: 'blueprint-fundamentals',
    subcategory: 'Ciclo de vida',
    elementType: 'nodo',
    tags: ['destroy', 'ciclo de vida', 'cleanup'],
    aliases: ['Destroy', 'eliminar actor'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse: 'Pickups recogidos, proyectiles al impactar, enemigos derrotados, props temporales.',
    howToUse:
      'Conecta Target al actor a destruir (Self o referencia). Evita llamadas posteriores a ese objeto.',
    examples: [
      {
        title: 'Destruir pickup al solaparse',
        scenario: 'Moneda recogida por el jugador.',
        steps: [
          'OnComponentBeginOverlap → Cast al jugador.',
          'Añadir puntuación.',
          'Destroy Actor (Self).',
        ],
      },
    ],
    relatedEntries: ['spawn-actor-from-class', 'event-beginplay', 'on-component-begin-overlap'],
    cppEquivalent: {
      available: true,
      summary: 'Actor->Destroy() o Destroy(this).',
    },
    lastReviewed: '2026-03-01',
  },
]
