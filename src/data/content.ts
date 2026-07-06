/**
 * Copy centralizado de la landing Cootrasec.
 * Todo el texto en español vive aquí — los componentes solo consumen datos.
 * Los bloques marcados `// PENDIENTE CLIENTE` son borradores aprobables que
 * requieren confirmación/datos reales del cliente antes de publicar.
 */

export type FeatureItem = {
  title: string;
  body: string;
  link: string;
};

export type FleetVehicle = {
  slug?: string;
  name: string;
  category: string;
  model: string;
  passengers: string;
  image: string;
  alt: string;
};

export type VehicleDetail = {
  slug: string;
  name: string;
  category: string;
  model: string;
  passengers: string;
  heroImage: string;
  alt: string;
  summary: string;
  gallery: Array<{
    label: string;
    image: string;
    alt: string;
    note: string;
  }>;
  spaces: Array<{ label: string; value: string }>;
  specs: Array<{ label: string; value: string }>;
  driver: {
    name: string;
    role: string;
    image: string;
    alt: string;
    experience: string;
    license: string;
    rating: string;
    bio: string;
  };
  tripTypes: string[];
  included: string[];
  reservation: {
    responseTime: string;
    sampleRoute: string;
    samplePrice: string;
  };
};

export type SceneVariant = "hero" | "seguridad" | "flota" | "rutas" | "pagos";

export type Chapter = {
  kicker: string;
  title: string;
  description: string;
  metrics?: Array<{ label: string; value: string }>;
  features: FeatureItem[];
  visual: Exclude<SceneVariant, "hero">;
};

export const hero = {
  eyebrow: "TRANSPORTE EJECUTIVO EN COLOMBIA",
  titleLines: ["La flota", "se mueve", "con su", "empresa."],
  subhead:
    "Soluciones de transporte seguras, eficientes y confiables para su operación: rutas empresariales, seguimiento GPS y liquidaciones claras.",
};

export const navItems = [
  { label: "Inicio", href: "#top" },
  { label: "Servicios", href: "#platform" },
  { label: "Aliados", href: "#partners" },
  { label: "Caso de éxito", href: "#case-study" },
  { label: "Cotizar", href: "#demo" }
];

export const ctaItems = [
  { label: "Cotice su servicio", href: "#demo" },
  { label: "Conozca nuestra flota", href: "#platform" },
  { label: "Hable con un asesor", href: "#footer" }
];

export const ctaButtonLabel = "Cotice su servicio";

export const chapters: Chapter[] = [
  {
    kicker: "01 04",
    title: "Seguridad en cada trayecto",
    description:
      "Monitoreo satelital en tiempo real, conductores certificados y protocolos definidos de operación y respuesta en cada ruta.",
    visual: "seguridad",
    metrics: [
      { label: "Cobertura GPS", value: "24/7" },
      { label: "Velocidad monitoreada", value: "En vivo" },
      { label: "Conductores", value: "Certificados" },
      { label: "Pólizas", value: "Vigentes" }
    ],
    features: [
      {
        title: "Conductores certificados",
        body:
          "Personal capacitado y certificado, seleccionado bajo estándares estrictos de seguridad vial.",
        link: "#demo"
      },
      {
        title: "Seguimiento GPS en tiempo real",
        body:
          "Monitoreo satelital de cada vehículo durante todo el recorrido contratado, con alertas operativas.",
        link: "#demo"
      },
      {
        title: "Protocolos y pólizas",
        body:
          "Procedimientos definidos de operación y respuesta ante emergencias, con pólizas de responsabilidad civil y seguros para pasajeros vigentes.",
        link: "#demo"
      }
    ]
  },
  {
    kicker: "02 04",
    title: "Nuestra flota",
    description:
      "Vehículos ejecutivos para cada tipo de operación: buses, busetas, minivans y sprinters de lujo con mantenimiento certificado.",
    visual: "flota",
    features: [
      {
        title: "Bus ejecutivo — 40 pasajeros", // PENDIENTE CLIENTE (capacidad)
        body:
          "Transporte de personal para turnos y operaciones de gran escala, con comodidad y puntualidad.",
        link: "#demo"
      },
      {
        title: "Van y minivan ejecutiva — 12 a 20 pasajeros", // PENDIENTE CLIENTE
        body:
          "Traslados corporativos ágiles para equipos medianos, visitas de campo y rutas urbanas.",
        link: "#demo"
      },
      {
        title: "Sprinter de lujo — 16 pasajeros", // PENDIENTE CLIENTE
        body:
          "Experiencia premium para directivos, delegaciones y clientes de su empresa.",
        link: "#demo"
      }
    ]
  },
  {
    kicker: "03 04",
    title: "Rutas y cobertura",
    description:
      "Cobertura permanente en Montería, Sincelejo, Cartagena, Barranquilla y los principales centros empresariales y corredores turísticos.",
    visual: "rutas",
    features: [
      {
        title: "Corredores empresariales activos",
        body:
          "Rutas permanentes entre los principales centros de operación de la región, con horarios adaptados a su empresa.", // PENDIENTE CLIENTE (número de rutas)
        link: "#demo"
      },
      {
        title: "Rutas a la medida",
        body:
          "Diseñamos el corredor, la frecuencia y los puntos de recogida según los turnos y sedes de su operación.",
        link: "#demo"
      }
    ]
  },
  {
    kicker: "04 04",
    title: "Liquidaciones y pagos claros",
    description:
      "Procesos administrativos transparentes: liquidaciones oportunas, reportes de fácil acceso y una sola facturación consolidada.",
    visual: "pagos",
    features: [
      {
        title: "Liquidación mensual consolidada",
        body:
          "Una sola liquidación con el detalle de rutas, vehículos y servicios prestados a su empresa.",
        link: "#demo"
      },
      {
        title: "Reportes de operación",
        body:
          "Acceso simple a reportes de servicio, cumplimiento y novedades para su área administrativa.",
        link: "#demo"
      }
    ]
  }
];

export const fleetCatalog: FleetVehicle[] = [
  {
    name: "Bus ejecutivo",
    category: "Operacion empresarial",
    model: "Linea 2025",
    passengers: "40 pasajeros",
    image: "/assets/fleet-catalog/bus-ejecutivo.webp",
    alt: "Bus ejecutivo blanco de Cootrasec"
  },
  {
    name: "Buseta corporativa",
    category: "Rutas de personal",
    model: "Linea 2024",
    passengers: "28 pasajeros",
    image: "/assets/fleet-catalog/buseta-corporativa.webp",
    alt: "Buseta corporativa blanca de Cootrasec"
  },
  {
    name: "Van Sprinter",
    category: "Traslado ejecutivo",
    model: "Linea 2025",
    passengers: "19 pasajeros",
    image: "/assets/fleet-catalog/van-sprinter.webp",
    alt: "Van Sprinter blanca para traslado ejecutivo"
  },
  {
    name: "Microbus ejecutivo",
    category: "Equipos medianos",
    model: "Linea 2024",
    passengers: "16 pasajeros",
    image: "/assets/fleet-catalog/microbus-ejecutivo.webp",
    alt: "Microbus ejecutivo blanco de Cootrasec"
  },
  {
    name: "Sprinter premium",
    category: "Servicio preferencial",
    model: "Linea 2025",
    passengers: "18 pasajeros",
    image: "/assets/fleet-catalog/sprinter-premium.webp",
    alt: "Sprinter premium blanca de Cootrasec"
  },
  {
    name: "Minivan corporativa",
    category: "Movilidad urbana",
    model: "Linea 2024",
    passengers: "7 pasajeros",
    image: "/assets/fleet-catalog/minivan-corporativa.webp",
    alt: "Minivan corporativa blanca"
  },
  {
    name: "SUV ejecutiva",
    category: "Directivos y visitas",
    model: "Linea 2025",
    passengers: "5 pasajeros",
    image: "/assets/fleet-catalog/suv-ejecutiva.webp",
    alt: "SUV ejecutiva blanca para servicio corporativo"
  },
  {
    name: "Buseta urbana",
    category: "Rutas especiales",
    model: "Linea 2023",
    passengers: "22 pasajeros",
    image: "/assets/fleet-catalog/buseta-urbana.webp",
    alt: "Buseta urbana blanca de Cootrasec"
  },
  {
    name: "Autocar premium",
    slug: "autocar-premium",
    category: "Viajes intermunicipales",
    model: "Linea 2025",
    passengers: "42 pasajeros",
    image: "/assets/fleet-catalog/autocar-premium.webp",
    alt: "Autocar premium blanco de Cootrasec"
  },
  {
    name: "Doble piso ejecutivo",
    category: "Alta capacidad",
    model: "Linea 2024",
    passengers: "60 pasajeros",
    image: "/assets/fleet-catalog/doble-piso.webp",
    alt: "Bus doble piso ejecutivo blanco"
  }
];

export const vehicleDetails: Record<string, VehicleDetail> = {
  "autocar-premium": {
    slug: "autocar-premium",
    name: "Autocar premium",
    category: "Viajes intermunicipales",
    model: "Linea 2025",
    passengers: "42 pasajeros",
    heroImage: "/assets/fleet-catalog/autocar-premium.webp",
    alt: "Autocar premium blanco de Cootrasec",
    summary:
      "Vehiculo ejecutivo de alta comodidad para trayectos intermunicipales, giras empresariales y traslados VIP de equipos completos. Este ejemplo usa informacion ficticia para mostrar el flujo de reserva.",
    gallery: [
      {
        label: "Exterior",
        image: "/assets/fleet-catalog/autocar-premium.webp",
        alt: "Vista exterior del Autocar premium",
        note: "Carroceria blanca, bodega amplia y acceso lateral para grupos grandes."
      },
      {
        label: "Interior",
        image: "/assets/vehicle-detail/autocar-interior.png",
        alt: "Interior del Autocar premium con sillas reclinables",
        note: "Sillas reclinables, luz ambiental y cortinas para trayectos largos."
      },
      {
        label: "Bano",
        image: "/assets/vehicle-detail/autocar-bathroom.png",
        alt: "Bano interno del Autocar premium",
        note: "Modulo sanitario compacto para viajes intermunicipales extendidos."
      },
      {
        label: "Conductor",
        image: "/assets/vehicle-detail/autocar-cockpit.png",
        alt: "Cabina de conduccion del Autocar premium",
        note: "Cabina con tablero digital, controles de seguridad y monitoreo GPS."
      }
    ],
    spaces: [
      { label: "Pasajeros", value: "42" },
      { label: "Maletas", value: "30" },
      { label: "Bano", value: "1" },
      { label: "Puertas", value: "2" }
    ],
    specs: [
      { label: "Modelo", value: "Linea 2025" },
      { label: "Aire acondicionado", value: "Dual, cabina y salon" },
      { label: "Conectividad", value: "Wi-Fi demo + puertos USB" },
      { label: "Seguridad", value: "GPS, camara frontal y sensores" },
      { label: "Equipaje", value: "Bodega lateral de alta capacidad" },
      { label: "Comodidad", value: "Sillas reclinables tipo ejecutivo" }
    ],
    driver: {
      name: "Carlos Arturo Mesa",
      role: "Conductor senior asignado",
      image: "/assets/landing/conductor.webp",
      alt: "Conductor senior de Cootrasec junto a un bus",
      experience: "12 anos en rutas corporativas",
      license: "Licencia C3 vigente",
      rating: "4.9 / 5 en servicios demo",
      bio:
        "Especialista en corredores Medellin, Honda, La Dorada y Bogota. Maneja protocolos de llegada anticipada, pausas seguras y comunicacion permanente con coordinacion."
    },
    tripTypes: [
      "Ruta empresarial intermunicipal",
      "Viaje corporativo de un dia",
      "Traslado VIP de delegaciones",
      "Excursion institucional",
      "Operacion minera o industrial"
    ],
    included: [
      "Conductor certificado",
      "Monitoreo GPS en tiempo real",
      "Plan de paradas seguras",
      "Seguro para pasajeros",
      "Liquidacion consolidada para empresas"
    ],
    reservation: {
      responseTime: "Respuesta estimada: 15 minutos",
      sampleRoute: "Medellin - La Dorada - Bogota",
      samplePrice: "Desde $2.900.000 COP por jornada demo"
    }
  }
};

/**
 * Nombres ficticios usados como badges mientras el cliente no entrega
 * logos reales de empresas aliadas/clientes.
 */
export const partners = [
  "Forward", // PENDIENTE CLIENTE
  "Nexa", // PENDIENTE CLIENTE
  "Andina Corp", // PENDIENTE CLIENTE
  "Grupo Vértice", // PENDIENTE CLIENTE
  "Rutas Colombia" // PENDIENTE CLIENTE
];

export const partnersTitle = "Empresas que confían en Cootrasec";

export const statsTitle = "Resultados que respaldan nuestro servicio";

/** Cifras placeholder — PENDIENTE CLIENTE confirmar valores reales. */
export const stats = [
  { value: "150+", label: "Asociados", featured: true }, // PENDIENTE CLIENTE
  { value: "45+", label: "Rutas activas", featured: false }, // PENDIENTE CLIENTE
  { value: "80+", label: "Vehículos", featured: false } // PENDIENTE CLIENTE
];

export const caseStudy = {
  heading: "Caso de éxito",
  brand: "Industrias del Cauca S.A.S.", // empresa ficticia de ejemplo — PENDIENTE CLIENTE
  title: "De proveedores dispersos a una sola operación de transporte",
  body:
    "Antes coordinaba el transporte de su personal con proveedores distintos cada mes, sin visibilidad de rutas ni control de costos. Con Cootrasec centralizó su operación: una sola flota asignada, seguimiento GPS y liquidaciones mensuales consolidadas.",
  cta: "Cotice su servicio"
};

export const quoteSection = {
  title: "Cotice su servicio",
  contact: "cootrasec@cootrasec.co" // tomado de material oficial del cliente (flyers)
};

export const corridors = [
  "Medellín",
  "La Dorada",
  "Honda",
  "Bogotá",
  "Otro corredor"
];

export const passengerRanges = [
  "Menos de 12",
  "12 a 20",
  "20 a 40",
  "Más de 40"
];

export const footerContent = {
  cards: [
    { label: "Cotice su servicio", href: "#demo" },
    { label: "Nuestra flota", href: "#platform" }
  ],
  cta: { label: "Cotizar ahora", href: "#demo" },
  secondary: { label: "Contáctenos", href: "#footer" },
  legal: {
    copyright: "© 2026 Cootrasec. Todos los derechos reservados.",
    nit: "NIT XXX.XXX.XXX-X", // PENDIENTE CLIENTE
    privacy: "Política de privacidad",
    terms: "Términos del servicio"
  }
};
