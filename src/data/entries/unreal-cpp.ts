import type { ReferenceEntry } from '../../types/reference'

export const unrealCppEntries: ReferenceEntry[] = [
  {
    id: 'uclass',
    slug: 'uclass',
    title: 'UCLASS',
    originalName: 'UCLASS()',
    summary: 'Macro que marca una clase para el sistema de reflexión UObject de Unreal.',
    description:
      'Sin UCLASS, la clase no participa en GC, serialización, Blueprints ni el editor de la forma esperada. Se combina con GENERATED_BODY().',
    category: 'unreal-cpp',
    subcategory: 'Reflexión',
    elementType: 'especificador',
    tags: ['uclass', 'reflexión', 'uobject', 'blueprint'],
    aliases: ['UCLASS macro'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse: 'Toda clase AActor/UActorComponent/UObject que deba integrarse con el motor.',
    howToUse:
      'Coloca UCLASS(...) antes de class. Specifiers comunes: Blueprintable, BlueprintType, Abstract, ClassGroup.',
    examples: [
      {
        title: 'Actor usable como parent de Blueprint',
        scenario: 'Diseñadores crearán BP hijos.',
        steps: [
          'UCLASS(Blueprintable)',
          'class ADoorActor : public AActor { GENERATED_BODY() ... };',
        ],
        snippets: [
          {
            language: 'cpp',
            code: `UCLASS(Blueprintable)
class ADoorActor : public AActor
{
    GENERATED_BODY()
public:
    ADoorActor();
};`,
          },
        ],
      },
    ],
    relatedEntries: ['generated-body', 'upROPERTY', 'ufunction'],
    blueprintEquivalent: {
      available: true,
      summary: 'Un Blueprint Class es una instancia de diseño sobre una UCLASS C++ (o solo Blueprint).',
    },
    officialReferences: [
      {
        title: 'UCLASS',
        url: 'https://dev.epicgames.com/documentation/unreal-engine/unreal-engine-uobject-specifiers',
      },
    ],
    lastReviewed: '2026-03-01',
  },
  {
    id: 'generated-body',
    slug: 'generated-body',
    title: 'GENERATED_BODY()',
    originalName: 'GENERATED_BODY()',
    summary: 'Inserta código generado por Unreal Header Tool (UHT) en la clase.',
    description:
      'Obligatorio en clases UCLASS/USTRUCT/UINTERFACE. Debe ser lo primero en el cuerpo de la clase. El .generated.h correspondiente debe incluirse al final de los includes del header.',
    category: 'unreal-cpp',
    subcategory: 'Reflexión',
    elementType: 'especificador',
    tags: ['generated_body', 'uht', 'header'],
    aliases: ['GENERATED_UCLASS_BODY'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse: 'Siempre junto a UCLASS/USTRUCT/UINTERFACE.',
    howToUse:
      '#include "MyActor.generated.h" al final de includes. Dentro de la clase: GENERATED_BODY()',
    commonMistakes: [
      {
        mistake: 'Incluir .generated.h demasiado pronto o olvidarlo.',
        solution: 'Debe ser el último include del header.',
      },
    ],
    relatedEntries: ['uclass', 'upROPERTY'],
    blueprintEquivalent: {
      available: false,
      summary: 'No existe equivalente en Blueprint: es infraestructura del pipeline C++/UHT.',
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'upROPERTY',
    slug: 'upROPERTY',
    title: 'UPROPERTY',
    originalName: 'UPROPERTY()',
    summary: 'Expone propiedades al GC, editor, serialización y/o Blueprints.',
    description:
      'UPROPERTY controla visibilidad (EditAnywhere, VisibleAnywhere), acceso Blueprint (BlueprintReadOnly/Write) y categorías. Sin UPROPERTY, los punteros UObject pueden no rastrearse bien por el GC.',
    category: 'unreal-cpp',
    subcategory: 'Reflexión',
    elementType: 'especificador',
    tags: ['upROPERTY', 'editor', 'gc', 'exposición'],
    aliases: ['Property Specifiers'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse: 'Variables que el editor o Blueprint deben ver, o referencias UObject a rastrear.',
    howToUse:
      'Encima del miembro: UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="Combat")',
    examples: [
      {
        title: 'Exponer variable al editor',
        scenario: 'Diseño ajusta MaxHealth por instancia.',
        steps: [
          'Declarar float MaxHealth con EditAnywhere e InstanceEditable implícito vía EditAnywhere en actor.',
          'Compilar; aparece en Details.',
        ],
        snippets: [
          {
            language: 'cpp',
            code: `UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Combat")
float MaxHealth = 100.f;`,
          },
        ],
      },
    ],
    relatedEntries: ['ufunction', 'uclass', 'variables-tipos'],
    blueprintEquivalent: {
      available: true,
      summary: 'Similar a variables de Blueprint con Instance Editable / Blueprint Read-Write.',
      relatedEntryIds: ['variables-tipos'],
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'ufunction',
    slug: 'ufunction',
    title: 'UFUNCTION',
    originalName: 'UFUNCTION()',
    summary: 'Marca funciones para Blueprints, RPC, timers o el editor.',
    description:
      'Specifiers: BlueprintCallable, BlueprintPure, BlueprintImplementableEvent, BlueprintNativeEvent, Server/Client/NetMulticast, etc.',
    category: 'unreal-cpp',
    subcategory: 'Reflexión',
    elementType: 'especificador',
    tags: ['ufunction', 'blueprintcallable', 'rpc'],
    aliases: ['Function Specifiers'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse: 'API C++ usable desde Blueprint o eventos implementables en BP.',
    howToUse:
      'UPFUNCTION(BlueprintCallable, Category="Combat") void ApplyDamage(float Amount);',
    examples: [
      {
        title: 'Función C++ callable desde Blueprint',
        scenario: 'ApplyDamage centralizado en C++.',
        steps: [
          'Declarar UFUNCTION BlueprintCallable.',
          'Implementar en .cpp.',
          'Llamar desde Event Graph del BP hijo.',
        ],
        snippets: [
          {
            language: 'cpp',
            code: `UFUNCTION(BlueprintCallable, Category = "Combat")
void ApplyDamage(float Amount);`,
          },
        ],
      },
    ],
    relatedEntries: ['upROPERTY', 'functions-blueprint', 'cpp-bp-communication'],
    blueprintEquivalent: {
      available: true,
      summary: 'Funciones de Blueprint / Custom Events según el specifier.',
      relatedEntryIds: ['functions-blueprint'],
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'tsubclassof',
    slug: 'tsubclassof',
    title: 'TSubclassOf',
    originalName: 'TSubclassOf<T>',
    summary: 'Plantilla tipada para referencias a clases UClass (no instancias).',
    description:
      'TSubclassOf<AActor> guarda una UClass* restringida a T o subtipos. Ideal para spawns configurables en el editor.',
    category: 'unreal-cpp',
    subcategory: 'Tipos',
    elementType: 'estructura',
    tags: ['tsubclassof', 'uclass', 'spawn', 'editor'],
    aliases: ['Subclass Of', 'Class Reference'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'intermedio',
    whenToUse: 'Cuando el diseñador elige qué Blueprint/clase spawnear.',
    howToUse:
      'UPROPERTY(EditAnywhere) TSubclassOf<AActor> ProjectileClass; luego SpawnActor con esa clase.',
    examples: [
      {
        title: 'Spawner configurable',
        scenario: 'Enemy spawner con clase editable.',
        steps: [
          'TSubclassOf<ACharacter> EnemyClass;',
          'SpawnActor<ACharacter>(EnemyClass, Transform);',
        ],
        snippets: [
          {
            language: 'cpp',
            code: `UPROPERTY(EditAnywhere, Category = "Spawn")
TSubclassOf<ACharacter> EnemyClass;

void AEnemySpawner::SpawnEnemy()
{
    if (!EnemyClass) return;
    GetWorld()->SpawnActor<ACharacter>(EnemyClass, GetActorTransform());
}`,
          },
        ],
      },
    ],
    relatedEntries: ['spawn-actor-from-class', 'upROPERTY'],
    blueprintEquivalent: {
      available: true,
      summary: 'Variable de tipo Class Reference / Actor Class en Blueprint.',
      relatedEntryIds: ['spawn-actor-from-class'],
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'cpp-actor-refs',
    slug: 'referencias-actores-componentes',
    title: 'Referencias a actores y componentes',
    originalName: 'Actor & Component References',
    summary: 'Cómo guardar y usar punteros a AActor y UActorComponent de forma segura.',
    description:
      'Usa UPROPERTY en punteros UObject para el GC. Prefiere TObjectPtr en UE5. Valida con IsValid antes de usar. TWeakObjectPtr para referencias no poseídas.',
    category: 'unreal-cpp',
    subcategory: 'Memoria',
    elementType: 'concepto',
    tags: ['pointers', 'tobjectptr', 'gc', 'isvalid'],
    aliases: ['TObjectPtr', 'TWeakObjectPtr'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'intermedio',
    whenToUse: 'Cachear componentes, referencias a enemigos target, owners.',
    howToUse:
      'CreateDefaultSubobject en constructor para componentes propios. GetComponentByClass / FindComponent en BeginPlay si es externo. Nunca guardar raw pointer sin UPROPERTY si debe vivir.',
    examples: [
      {
        title: 'Cachear un componente',
        scenario: 'Health component en el Character.',
        steps: [
          'UPROPERTY() TObjectPtr<UHealthComponent> HealthComp;',
          'En constructor: HealthComp = CreateDefaultSubobject<UHealthComponent>(TEXT("Health"));',
        ],
      },
    ],
    relatedEntries: ['upROPERTY', 'actor-component', 'cpp-bp-communication'],
    blueprintEquivalent: {
      available: true,
      summary: 'Variables object reference / component reference en Blueprint.',
    },
    lastReviewed: '2026-03-01',
  },
  {
    id: 'cpp-bp-communication',
    slug: 'comunicacion-cpp-blueprints',
    title: 'Comunicación entre C++ y Blueprints',
    originalName: 'C++ / Blueprint Communication',
    summary: 'Patrones para mezclar lógica C++ con diseño en Blueprint.',
    description:
      'BlueprintCallable/Pure exponen API C++. BlueprintImplementableEvent deja el cuerpo al BP. BlueprintNativeEvent permite C++ por defecto + override BP. Interfaces y delegates cruzan ambos mundos.',
    category: 'unreal-cpp',
    subcategory: 'Integración',
    elementType: 'concepto',
    tags: ['blueprint', 'c++', 'native event', 'híbrido'],
    aliases: ['BlueprintNativeEvent', 'BlueprintImplementableEvent'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'avanzado',
    whenToUse: 'Gameplay crítico en C++; tuning y variantes en Blueprint.',
    howToUse:
      'Define la API estable en C++. Usa events implementables para hooks de diseño. Evita lógica duplicada en ambos lados.',
    examples: [
      {
        title: 'Evento implementable en BP',
        scenario: 'C++ detecta pickup; BP decide VFX.',
        steps: [
          'UFUNCTION(BlueprintImplementableEvent) void OnPickupCollected();',
          'Desde C++ llama OnPickupCollected() al recoger.',
          'En BP hijo implementa partículas/audio.',
        ],
        snippets: [
          {
            language: 'cpp',
            code: `UFUNCTION(BlueprintImplementableEvent, Category = "Pickup")
void OnPickupCollected();`,
          },
        ],
      },
    ],
    relatedEntries: ['ufunction', 'upROPERTY', 'blueprint-interfaces'],
    lastReviewed: '2026-03-01',
  },
  {
    id: 'cpp-editor-exposure',
    slug: 'exponer-propiedades-funciones-editor',
    title: 'Exposición al editor',
    originalName: 'Editor Exposure',
    summary: 'Hacer propiedades y funciones editables/configurables en Details y Blueprints.',
    description:
      'Combinación de UPROPERTY/UFUNCTION con categorías, meta (ClampMin, ToolTip), EditDefaultsOnly vs EditInstanceOnly, y BlueprintReadOnly para proteger estado.',
    category: 'unreal-cpp',
    subcategory: 'Editor',
    elementType: 'concepto',
    tags: ['editor', 'details', 'meta', 'category'],
    aliases: ['EditAnywhere', 'Details Panel'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'intermedio',
    whenToUse: 'Herramientas para diseñadores y artistas técnicos sin recompilar para cada tweak.',
    howToUse:
      'Elige el specifier de edición correcto. Agrupa en Category. Añade meta tooltips. Expón solo lo necesario.',
    examples: [
      {
        title: 'Propiedad con clamp',
        scenario: 'Daño entre 0 y 500.',
        steps: [
          'UPROPERTY con meta ClampMin/ClampMax.',
        ],
        snippets: [
          {
            language: 'cpp',
            code: `UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Combat",
          meta = (ClampMin = "0.0", ClampMax = "500.0"))
float Damage = 10.f;`,
          },
        ],
      },
    ],
    relatedEntries: ['upROPERTY', 'ufunction', 'variables-tipos'],
    lastReviewed: '2026-03-01',
  },
]
