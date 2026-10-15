import type { ReferenceEntry } from '../../types/reference'

const OFFICIAL_NAMING_URL =
  'https://dev.epicgames.com/documentation/unreal-engine/recommended-asset-naming-conventions-in-unreal-engine-projects'

export const namingConventionsEntries: ReferenceEntry[] = [
  {
    id: 'asset-naming-overview',
    slug: 'convencion-nombres-assets',
    title: 'Convención de nombres de assets',
    originalName: 'Asset Naming Conventions',
    summary:
      'Patrón recomendado Prefijo_Nombre_Descriptor_Variante para organizar el Content Browser y evitar ambigüedad.',
    description:
      'En proyectos Unreal, muchos assets distintos pueden compartir un nombre base (por ejemplo «Soldier»). Sin un prefijo de tipo y descriptores claros, la búsqueda en el Content Browser se vuelve ambigua. Epic recomienda un esquema común desde el inicio del proyecto; es una guía, no una obligación del motor.',
    category: 'naming-conventions',
    subcategory: 'Fundamentos',
    elementType: 'concepto',
    tags: ['naming', 'prefijos', 'content browser', 'organización', 'assets'],
    aliases: [
      'Naming Convention',
      'Asset Prefix',
      'nomenclatura',
      'convención de nombres',
    ],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse:
      'Al arrancar un proyecto o estandarizar un equipo. Cuanto antes se acuerde, menos renombres masivos habrá después.',
    howToUse:
      'Aplica el patrón Prefix_AssetName_Descriptor_OptionalVariant. El prefijo identifica el tipo de asset; el nombre es el sujeto; el descriptor aclara el uso (por ejemplo Nrm, Diff, Albedo); la variante opcional distingue versiones (A, B, 01). Documenta las excepciones del proyecto en un README interno.',
    examples: [
      {
        title: 'Mismo sujeto, tipos distintos',
        scenario: 'Personaje «Ranger» con mesh, textura y Blueprint.',
        steps: [
          'Static Mesh: SM_Ranger',
          'Texture diffuse: T_Ranger_D',
          'Blueprint: BP_Ranger',
          'Al buscar «Ranger» en el Content Browser, el prefijo indica el tipo de un vistazo.',
        ],
        snippets: [
          {
            language: 'text',
            title: 'Patrón general',
            code: '[AssetTypePrefix]_[AssetName]_[Descriptor]_[OptionalVariant]',
          },
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Usar el mismo nombre sin prefijo para mesh, material y Blueprint.',
        solution:
          'Añade siempre el prefijo de tipo (SM_, M_, BP_, …) aunque el nombre base se repita.',
      },
      {
        mistake: 'Mezclar estilos (bpRanger, BP-Ranger, ranger_bp) en el mismo proyecto.',
        solution:
          'Elige un esquema (idealmente el recomendado por Epic) y aplícalo de forma uniforme.',
      },
    ],
    relatedEntries: [
      'prefix-blueprints-data',
      'prefix-meshes-materials-textures',
      'prefix-animation',
      'cpp-type-prefixes',
    ],
    officialReferences: [
      {
        title: 'Recommended Asset Naming Conventions (Epic Games)',
        url: OFFICIAL_NAMING_URL,
      },
    ],
    lastReviewed: '2026-03-15',
  },
  {
    id: 'prefix-blueprints-data',
    slug: 'prefijos-blueprints-y-datos',
    title: 'Prefijos Blueprint y datos',
    originalName: 'Blueprint & Data Prefixes',
    summary:
      'Prefijos habituales: BP_, WBP_, BI_, ABP_, AC_, DT_, CT_, E_, F_ para Blueprints y assets de datos.',
    description:
      'Los Blueprints y tablas de datos son de los assets más buscados en un proyecto. Un prefijo estable permite filtrar por tipo en el Content Browser y reduce colisiones de nombre entre un Actor Blueprint y su Widget o Interface.',
    category: 'naming-conventions',
    subcategory: 'Prefijos',
    elementType: 'concepto',
    tags: ['BP_', 'WBP_', 'BI_', 'DT_', 'ABP_', 'prefijos', 'blueprint'],
    aliases: ['BP prefix', 'WBP_', 'Data Table naming'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse: 'Al crear Blueprints, interfaces, widgets, enums, structs o tablas.',
    howToUse:
      'Nombra el asset con el prefijo de su tipo y un nombre PascalCase del dominio (BP_Door, WBP_HUD, DT_LootTable). Para Animation Blueprints usa ABP_; para Actor Components AC_.',
    examples: [
      {
        title: 'Tabla rápida Blueprint / datos',
        scenario: 'Referencia de prefijos recomendados por Epic (extracto de uso frecuente).',
        steps: [
          'BP_ — Blueprint',
          'WBP_ — Widget Blueprint',
          'BI_ — Blueprint Interface',
          'ABP_ — Animation Blueprint',
          'AC_ — Actor Component',
          'DT_ — Data Table · CT_ — Curve Table',
          'E_ — Enum · F_ — Structure',
        ],
        snippets: [
          {
            language: 'text',
            title: 'Ejemplos',
            code: `BP_PlayerCharacter
WBP_MainMenu
BI_Interactable
ABP_Ranger
AC_HealthComponent
DT_ItemStats
E_DamageType
F_WeaponData`,
          },
        ],
      },
    ],
    relatedEntries: [
      'asset-naming-overview',
      'blueprint-interfaces',
      'widget-blueprint',
      'animation-blueprint',
    ],
    officialReferences: [
      {
        title: 'Recommended Asset Naming Conventions (Epic Games)',
        url: OFFICIAL_NAMING_URL,
      },
    ],
    lastReviewed: '2026-03-15',
  },
  {
    id: 'prefix-meshes-materials-textures',
    slug: 'prefijos-meshes-materiales-texturas',
    title: 'Prefijos meshes, materiales y texturas',
    originalName: 'Mesh, Material & Texture Prefixes',
    summary:
      'SM_, SK_, M_, MI_, T_, PM_, PHYS_ y descriptores de textura (D, N, ORM, etc.) para assets visuales.',
    description:
      'Meshes, materiales y texturas suelen compartir el mismo sujeto artístico. Los prefijos separan el tipo; los descriptores al final del nombre distinguen el rol de cada textura (difusa, normal, máscaras).',
    category: 'naming-conventions',
    subcategory: 'Prefijos',
    elementType: 'concepto',
    tags: ['SM_', 'SK_', 'M_', 'MI_', 'T_', 'texturas', 'materiales'],
    aliases: ['Static Mesh naming', 'Texture prefix', 'Material Instance naming'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse: 'Al importar o crear meshes, materiales, instancias y texturas.',
    howToUse:
      'Static Mesh → SM_; Skeletal Mesh → SK_; Material → M_; Material Instance → MI_; Texture → T_ más descriptor. Physics Material → PM_; Physics Asset → PHYS_; Post Process Material → PPM_.',
    examples: [
      {
        title: 'Set de texturas de un prop',
        scenario: 'Caja de madera con material instanciado.',
        steps: [
          'SM_WoodenCrate',
          'T_WoodenCrate_D (diffuse/albedo)',
          'T_WoodenCrate_N (normal)',
          'T_WoodenCrate_ORM (occlusion/roughness/metallic empaquetado, si aplica)',
          'M_WoodenCrate y MI_WoodenCrate_Worn',
        ],
        snippets: [
          {
            language: 'text',
            title: 'Prefijos frecuentes',
            code: `SM_  Static Mesh
SK_  Skeletal Mesh
M_   Material
MI_  Material Instance
T_   Texture
PM_  Physics Material
PHYS_ Physics Asset
PPM_ Post Process Material
HDR_ HDRI`,
          },
        ],
        notes: [
          'El descriptor de textura (_D, _N, _M…) es convención de equipo: documentad el significado en el proyecto.',
        ],
      },
    ],
    relatedEntries: ['asset-naming-overview', 'material-basics', 'physical-materials'],
    officialReferences: [
      {
        title: 'Recommended Asset Naming Conventions (Epic Games)',
        url: OFFICIAL_NAMING_URL,
      },
    ],
    lastReviewed: '2026-03-15',
  },
  {
    id: 'prefix-animation',
    slug: 'prefijos-animacion',
    title: 'Prefijos de animación',
    originalName: 'Animation Asset Prefixes',
    summary:
      'AS_, AM_, BS_, SKEL_, Rig_ y ABP_ para secuencias, montages, blend spaces y esqueletos.',
    description:
      'Los assets de animación crecen rápido. Prefijos claros ayudan a distinguir una Animation Sequence de un Montage o un Blend Space cuando comparten el mismo nombre de acción (Walk, Attack).',
    category: 'naming-conventions',
    subcategory: 'Prefijos',
    elementType: 'concepto',
    tags: ['AS_', 'AM_', 'BS_', 'SKEL_', 'animación', 'prefijos'],
    aliases: ['Animation Sequence naming', 'Montage prefix', 'Blend Space naming'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse: 'Al crear o importar animaciones, montages, blend spaces, skeletons y rigs.',
    howToUse:
      'Animation Sequence → AS_; Montage → AM_; Blend Space → BS_; Skeleton → SKEL_; Rig → Rig_; Animation Blueprint → ABP_. Añade el personaje o la acción en el nombre (AS_Ranger_Walk).',
    examples: [
      {
        title: 'Locomoción de un personaje',
        scenario: 'Set básico de caminar/correr.',
        steps: [
          'SKEL_Ranger',
          'AS_Ranger_Walk · AS_Ranger_Run',
          'BS_Ranger_Locomotion',
          'AM_Ranger_HitReact',
          'ABP_Ranger',
        ],
        snippets: [
          {
            language: 'text',
            title: 'Prefijos de animación',
            code: `AS_   Animation Sequence
AM_   Anim Montage
BS_   Blend Space
SKEL_ Skeleton
Rig_  Rig
ABP_  Animation Blueprint
LS_   Level Sequence
EDIT_ Sequencer Edits`,
          },
        ],
      },
    ],
    relatedEntries: ['asset-naming-overview', 'animation-blueprint', 'prefix-blueprints-data'],
    officialReferences: [
      {
        title: 'Recommended Asset Naming Conventions (Epic Games)',
        url: OFFICIAL_NAMING_URL,
      },
    ],
    lastReviewed: '2026-03-15',
  },
  {
    id: 'prefix-fx-media-other',
    slug: 'prefijos-fx-media-otros',
    title: 'Prefijos FX, media y otros',
    originalName: 'FX, Media & Other Prefixes',
    summary:
      'FXE_/FXS_/FXF_ (Niagara), MS_/MP_/MO_ (media), NDC_, SNAP_, RCP_ y más tipos especializados.',
    description:
      'Efectos Niagara, media y herramientas de producción (nDisplay, Level Snapshots, Remote Control) tienen prefijos propios en la guía de Epic. Úsalos cuando el proyecto incorpore esos sistemas; no hace falta adoptar todos si no los usáis.',
    category: 'naming-conventions',
    subcategory: 'Prefijos',
    elementType: 'concepto',
    tags: ['Niagara', 'FXS_', 'media', 'NDC_', 'prefijos'],
    aliases: ['Niagara naming', 'FX prefix', 'Media Source naming'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'intermedio',
    whenToUse: 'Proyectos con VFX Niagara, pipeline de media o herramientas ICVFX/producción.',
    howToUse:
      'Niagara Emitter → FXE_; System → FXS_; Function → FXF_. Media Source → MS_; Player → MP_; Output → MO_; Profile → MPR_. nDisplay → NDC_; Level Snapshots → SNAP_; Remote Control Preset → RCP_.',
    examples: [
      {
        title: 'Explosión Niagara',
        scenario: 'Sistema reutilizable de impacto.',
        steps: [
          'FXE_ExplosionSparks',
          'FXS_ExplosionImpact',
        ],
        snippets: [
          {
            language: 'text',
            title: 'Prefijos adicionales',
            code: `FXE_  Niagara Emitter
FXS_  Niagara System
FXF_  Niagara Function
MS_   Media Source
MO_   Media Output
MP_   Media Player
MPR_  Media Profile
NDC_  nDisplay Configuration
SNAP_ Level Snapshots
RCP_  Remote Control Preset
OCIO_ OCIO Profile`,
          },
        ],
      },
    ],
    relatedEntries: ['asset-naming-overview'],
    officialReferences: [
      {
        title: 'Recommended Asset Naming Conventions (Epic Games)',
        url: OFFICIAL_NAMING_URL,
      },
    ],
    lastReviewed: '2026-03-15',
  },
  {
    id: 'cpp-type-prefixes',
    slug: 'prefijos-tipos-cpp',
    title: 'Prefijos de tipos en C++',
    originalName: 'C++ Type Prefixes',
    summary:
      'Convención Unreal en código: A (Actor), U (UObject), F (struct), E (enum), I (interface), T (template).',
    description:
      'La nomenclatura de assets (BP_, SM_) es distinta de la de tipos C++. En código Unreal, el prefijo del tipo forma parte del nombre de la clase o struct y ayuda al motor, al UHT y a la lectura del código. No sustituye a los prefijos de assets del Content Browser.',
    category: 'naming-conventions',
    subcategory: 'C++',
    elementType: 'concepto',
    tags: ['C++', 'AActor', 'UObject', 'prefijos', 'coding standard'],
    aliases: ['Unreal C++ naming', 'A_ prefix', 'UCLASS naming'],
    ueVersions: ['5.0', '5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'intermedio',
    whenToUse: 'Al declarar clases, structs, enums e interfaces en C++.',
    howToUse:
      'Actors → A + nombre (ADoorActor). UObject/Component → U (UHealthComponent). Structs → F (FWeaponData). Enums → E (EDamageType). Interfaces → I (IInteractable). Templates → T (TArray). Bools suelen usar b (bIsAlive).',
    examples: [
      {
        title: 'De asset a clase C++',
        scenario: 'Blueprint BP_Door basado en C++.',
        steps: [
          'Clase C++: ADoorActor (prefijo A).',
          'Asset Blueprint hijo: BP_Door (prefijo de asset BP_).',
          'Struct de datos: FDoorConfig; Data Table: DT_DoorConfigs.',
        ],
        snippets: [
          {
            language: 'cpp',
            title: 'Prefijos en declaraciones',
            code: `UCLASS()
class ADoorActor : public AActor
{
    GENERATED_BODY()
};

USTRUCT(BlueprintType)
struct FDoorConfig
{
    GENERATED_BODY()

    UPROPERTY(EditAnywhere)
    bool bStartsOpen = false;
};

UENUM(BlueprintType)
enum class EDoorState : uint8
{
    Closed,
    Open,
};`,
          },
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Llamar al asset C++ igual que al Blueprint sin distinguir capas (Door vs Door).',
        solution:
          'Clase nativa con prefijo de tipo (ADoorActor) y Blueprint con BP_Door.',
      },
    ],
    relatedEntries: ['asset-naming-overview', 'uclass', 'upROPERTY', 'prefix-blueprints-data'],
    cppEquivalent: {
      available: true,
      summary: 'Esta entrada describe precisamente la convención de nombres en C++ de Unreal.',
    },
    blueprintEquivalent: {
      available: true,
      summary:
        'En Blueprint el equivalente práctico son los prefijos de asset (BP_, WBP_, …), no las letras A/U/F del código.',
      relatedEntryIds: ['prefix-blueprints-data'],
    },
    officialReferences: [
      {
        title: 'Recommended Asset Naming Conventions (Epic Games)',
        url: OFFICIAL_NAMING_URL,
        note: 'Cubre prefijos de assets; los prefijos A/U/F/E/I/T son la convención de código Unreal asociada.',
      },
      {
        title: 'Epic C++ Coding Standard',
        url: 'https://dev.epicgames.com/documentation/unreal-engine/epic-cplusplus-coding-standard-for-unreal-engine',
      },
    ],
    lastReviewed: '2026-03-15',
  },
  {
    id: 'enhanced-input-naming',
    slug: 'nombres-enhanced-input',
    title: 'Nombres en Enhanced Input',
    originalName: 'Enhanced Input Naming',
    summary:
      'Convención habitual de proyecto: IA_ para Input Actions e IMC_ para Mapping Contexts.',
    description:
      'La guía oficial de prefijos de assets de Epic no lista todos los tipos nuevos con el mismo detalle. En la práctica, la comunidad y muchos proyectos de muestra usan IA_ e IMC_ (a veces IC_) para Enhanced Input. Conviene fijarlo en las normas del equipo.',
    category: 'naming-conventions',
    subcategory: 'Input',
    elementType: 'concepto',
    tags: ['IA_', 'IMC_', 'Enhanced Input', 'naming'],
    aliases: ['IA_Interact', 'IMC_Default', 'Input Action naming'],
    ueVersions: ['5.1', '5.2', '5.3', '5.4', '5.5'],
    difficulty: 'basico',
    whenToUse: 'Al crear Input Actions y Mapping Contexts.',
    howToUse:
      'Input Action → IA_NombreDeAccion (IA_Jump, IA_Move). Mapping Context → IMC_Contexto (IMC_Default, IMC_Vehicle). Mantén el Value Type coherente con el nombre (Move suele ser Axis2D).',
    examples: [
      {
        title: 'Contexto a pie',
        scenario: 'Controles del personaje en tierra.',
        steps: [
          'IA_Move (Axis2D), IA_Look (Axis2D), IA_Jump (Digital), IA_Interact (Digital)',
          'IMC_OnFoot con esos mappings',
        ],
        snippets: [
          {
            language: 'text',
            code: `IA_Move
IA_Look
IA_Jump
IA_Interact
IMC_OnFoot
IMC_UI`,
          },
        ],
      },
    ],
    relatedEntries: [
      'input-action',
      'input-mapping-context',
      'asset-naming-overview',
    ],
    officialReferences: [
      {
        title: 'Enhanced Input',
        url: 'https://dev.epicgames.com/documentation/unreal-engine/enhanced-input-in-unreal-engine',
      },
    ],
    lastReviewed: '2026-03-15',
  },
]
