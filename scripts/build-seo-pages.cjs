const fs = require("fs");
const path = require("path");

const domain = "https://mexicojungletours.com";
const out = (...parts) => path.join(__dirname, "..", ...parts);

function photo(slug, width, height, variants, sizes, alt = {}) {
  const srcset = variants.map((variant) => `/assets/photos/${slug}-${variant}.webp ${variant}w`).join(", ");
  const largest = variants[variants.length - 1];
  return {
    src: `/assets/photos/${slug}-${largest}.webp`,
    width,
    height,
    srcset,
    sizes,
    alt,
  };
}

const images = {
  hero: photo("hero-atv-adventure-riviera-maya", 1800, 1200, [640, 960, 1400, 1800], "(max-width: 979px) calc(100vw - 32px), 48vw", {
    en: "Helmeted guests riding an ATV through the Puerto Morelos jungle near Cancun",
    es: "Visitantes con casco en ATV por la selva de Puerto Morelos cerca de Cancun",
  }),
  cenote: photo("cenote-kinha-ruta-de-los-cenotes", 1800, 1197, [640, 960, 1400, 1800], "(max-width: 720px) 100vw, 50vw", {
    en: "Guests swimming in Kin-Ha Cenote near Puerto Morelos",
    es: "Visitantes nadando en Cenote Kin-Ha cerca de Puerto Morelos",
  }),
  blancaFlor: photo("cenote-blanca-flor-puerto-morelos", 1800, 1200, [640, 960, 1400, 1800], "(max-width: 720px) 100vw, 50vw", {
    en: "Blanca Flor cenote experience near Cancun and Puerto Morelos",
    es: "Experiencia en Cenote Blanca Flor cerca de Cancun y Puerto Morelos",
  }),
  atv: photo("atv-jungle-tour-cancun-riviera-maya", 1400, 933, [640, 960, 1400], "(max-width: 720px) 100vw, 50vw", {
    en: "ATV jungle tour near Cancun and Riviera Maya",
    es: "Tour de ATV por la selva cerca de Cancun y Riviera Maya",
  }),
  horseback: photo("horseback-riding-puerto-morelos-jungle-trail", 1800, 1197, [640, 960, 1400, 1800], "(max-width: 720px) 100vw, 50vw", {
    en: "Horseback riding tour through the Puerto Morelos jungle",
    es: "Paseo a caballo por la selva de Puerto Morelos",
  }),
  zipline: photo("zipline-over-cenote-water-kinha", 1124, 750, [640, 960, 1124], "(max-width: 720px) 100vw, 50vw", {
    en: "Zipline adventure at Kin-Ha jungle park over cenote water",
    es: "Aventura de tirolesa en Kin-Ha sobre agua de cenote",
  }),
  zipLineRoute: photo("zip-line-adventure-kinha-jungle", 1800, 1200, [640, 960, 1400, 1800], "(max-width: 720px) 100vw, 50vw", {
    en: "Zipline route through the Kin-Ha jungle near Puerto Morelos",
    es: "Ruta de tirolesa por la selva Kin-Ha cerca de Puerto Morelos",
  }),
  family: photo("family-kinha-sign-ruta-de-los-cenotes", 720, 480, [480, 720], "(max-width: 720px) 100vw, 360px", {
    en: "Family at the Kin-Ha sign on Ruta de los Cenotes",
    es: "Familia en las letras Kin-Ha en Ruta de los Cenotes",
  }),
  familyZipline: photo("family-zipline-jungle-riviera-maya", 1800, 1200, [640, 960, 1400, 1800], "(max-width: 720px) 100vw, 50vw", {
    en: "Family zipline moment in the Riviera Maya jungle",
    es: "Momento familiar en tirolesa en la selva de Riviera Maya",
  }),
  jump: photo("kinha-cenote-jumping-puerto-morelos", 1400, 1050, [640, 960, 1400], "(max-width: 720px) 100vw, 50vw", {
    en: "Guest jumping into a Kin-Ha cenote in Puerto Morelos",
    es: "Visitante saltando a un cenote Kin-Ha en Puerto Morelos",
  }),
  coupleJump: photo("kinha-couple-jumping-cenote-puerto-morelos", 640, 960, [480, 640], "(max-width: 720px) 100vw, 320px", {
    en: "Guests jumping into a Kin-Ha cenote near Puerto Morelos",
    es: "Visitantes saltando a un cenote Kin-Ha cerca de Puerto Morelos",
  }),
  guidedZip: photo("guided-zipline-helmet-kinha-safety", 720, 480, [480, 720], "(max-width: 720px) 100vw, 360px", {
    en: "Helmeted guest with guide support on the Kin-Ha zipline route",
    es: "Visitante con casco y apoyo de guia en la ruta de tirolesa Kin-Ha",
  }),
};

const urls = {
  root: "/",
  enHome: "/en/",
  esHome: "/es/",
  enAtv: "/en/atv-zipline-cenote-tour-cancun/",
  esAtv: "/es/tour-atv-tirolesa-cenotes-cancun/",
  enCenote: "/en/puerto-morelos-cenote-tour/",
  esCenote: "/es/cenotes-puerto-morelos/",
  enHorse: "/en/horseback-riding-cenote-tour-puerto-morelos/",
  esHorse: "/es/caballos-y-cenotes-puerto-morelos/",
  enRuta: "/en/ruta-de-los-cenotes-puerto-morelos/",
  esRuta: "/es/ruta-de-los-cenotes-puerto-morelos/",
};

const wa = {
  en: {
    general: "Hi, I'm interested in booking a Mexico Jungle Tours cenote and jungle experience. Can you confirm availability, pickup and pricing?",
    pickup: "Hi, I'm interested in a Mexico Jungle Tours experience. Can you confirm the pickup zone before payment?",
    cenotes: "Hi, I'm interested in booking Kin-Ha and Blanca Flor Cenotes. Can you confirm availability, pickup and final price?",
    atv: "Hi, I'm interested in booking ATV + Zipline Jungle Expedition. Can you confirm availability, pickup and final price?",
    horseback: "Hi, I'm interested in booking Horseback Riding & Cenotes. Can you confirm availability, pickup and final price?",
    signature: "Hi, I'm interested in booking Kin-Ha Signature Experience. Can you confirm availability, pickup and final price?",
  },
  es: {
    general: "Hola, me interesa reservar una experiencia de cenotes y selva con Mexico Jungle Tours. ¿Me pueden confirmar disponibilidad, pickup y precios?",
    pickup: "Hola, me interesa una experiencia con Mexico Jungle Tours. ¿Me pueden confirmar la zona de pickup antes del pago?",
    cenotes: "Hola, me interesa reservar Cenotes Kin-Ha y Blanca Flor. ¿Me pueden confirmar disponibilidad, pickup y precio final?",
    atv: "Hola, me interesa reservar ATV + Tirolesa por la Selva. ¿Me pueden confirmar disponibilidad, pickup y precio final?",
    horseback: "Hola, me interesa reservar Caballos y Cenotes. ¿Me pueden confirmar disponibilidad, pickup y precio final?",
    signature: "Hola, me interesa reservar Experiencia Completa Kin-Ha. ¿Me pueden confirmar disponibilidad, pickup y precio final?",
  },
};

const t = {
  en: {
    langCode: "en",
    htmlLang: "en",
    nav: ["Experiences", "Packages", "Location", "FAQ", "WhatsApp", "Book"],
    brandSub: "Independent booking operator",
    heroEyebrow: "Puerto Morelos jungle route",
    heroTitle: "Authentic Jungle Tours Near Cancun",
    heroSub: "ATV routes, ziplines, horseback riding and natural cenotes in Puerto Morelos, with pickup coordination from Cancun, Playa del Carmen and Puerto Morelos.",
    ctaBook: "Book on WhatsApp",
    ctaPackages: "View Packages",
    priceBadge: "From MXN $500 / USD $30",
    intro: "Mexico Jungle Tours is an independent booking and tour operator brand for authentic jungle routes, Kin-Ha and Blanca Flor cenotes, certified bilingual guides, lockers, rest areas, regional Mexican food and pickup coordination.",
    trust: ["Independent tour operator", "Small-group routes", "Certified bilingual guides", "Kin-Ha and Blanca Flor access", "Regional lunch depending on package", "Confirm pickup before payment"],
    packagesEyebrow: "Packages",
    packagesTitle: "Choose the route that fits your day.",
    packagesCopy: "Compare cenote access, ATV, zipline and horseback options, then confirm availability directly on WhatsApp.",
    includes: "Includes",
    optional: "Optional",
    adult: "Adult",
    child: "Child",
    ask: "Ask about this package",
    bookAtv: "Book ATV + Zipline",
    bookHorse: "Book Horseback & Cenotes",
    bookSignature: "Book Kin-Ha Signature",
    filterAll: "All",
    filterCenote: "Cenotes",
    filterAtv: "ATV + Zipline",
    filterHorse: "Horseback",
    filterSignature: "Signature",
    childRule: "Child pricing applies under 1.20 m height.",
    diffTitle: "Why This Route Feels Different",
    diffCards: [
      ["Natural cenote setting", "Kin-Ha and Blanca Flor offer freshwater access surrounded by jungle and limestone formations."],
      ["Deep freshwater systems", "Kin-Ha is known locally for varied depth zones of approximately 30, 40 and up to 70 meters. Diving-related activities require certified divers and prior approval."],
      ["Blanca Flor platforms", "Blanca Flor is known as a place where experienced jumpers and professional athletes practice from different platforms, including high platforms up to approximately 14 meters."],
      ["Special access areas", "Fatima is a special-access area with unique water conditions and may be considered only for approved private or corporate groups."],
      ["Small-group jungle rhythm", "The route is designed to feel personal, guided and connected to the land."],
    ],
    galleryTitle: "Real cenotes, real jungle, clear booking.",
    galleryCopy: "Freshwater cenotes, limestone walls, ATV splash, zipline platforms, horseback trails and family moments on the Puerto Morelos route.",
    locationTitle: "Ruta de los Cenotes, Puerto Morelos",
    locationCopy: "The experience operates in the Ruta de los Cenotes area of Puerto Morelos, with pickup coordination from Cancun, Playa del Carmen and Puerto Morelos.",
    confirmPickup: "Confirm pickup zone by WhatsApp before payment.",
    viewMap: "View embedded map",
    mapIntro: "Embedded map loads only when needed",
    preservationTitle: "Optional Jungle Preservation Contribution",
    preservationCopy: "MXN $100 / USD $5. Supports trail maintenance, cenote care and preservation actions inside Kin-Ha. Guests receive a Kin-Ha Conservation Participation Certificate. This is not a tax-deductible donation or third-party certification.",
    safetyTitle: "Safety and restrictions",
    safety: [
      "Not recommended for pregnant guests.",
      "Not recommended for severe back or neck problems, injuries or recent surgery.",
      "Guests under the influence of alcohol or drugs cannot participate.",
      "Minors under 12 must be accompanied by an adult or parent.",
      "Child pricing applies under 1.20 m height.",
      "Diving activities only for certified divers and with prior approval.",
      "Special access areas require prior approval.",
    ],
    bookingTitle: "Confirm your route, pickup and final price.",
    bookingCopy: "The team confirms availability, pickup zone, adult and child count, package fit and optional add-ons by WhatsApp.",
    footerCopy: "Independent booking and tour operator brand for Puerto Morelos jungle routes, Kin-Ha and Blanca Flor cenotes, ATV, zipline and horseback experiences.",
    faqTitle: "Questions before you book",
    faq: [
      ["Is Mexico Jungle Tours the official Cenote Kin-Ha brand?", "No. Mexico Jungle Tours is an independent booking and tour operator brand offering access to authentic jungle routes and cenote experiences, including Kin-Ha and Blanca Flor access."],
      ["Is transportation included?", "Transportation is included in ATV, horseback and signature packages. Confirm your pickup zone before payment."],
      ["Are lockers available?", "Yes, lockers and rest areas are available."],
      ["Is lunch included?", "Regional Mexican lunch or snacks are included depending on the package."],
      ["Can children join?", "Children can join many activities. Minors under 12 must be accompanied by an adult or parent."],
      ["What happens if it rains?", "Light rain can be part of the jungle route. The team confirms weather, safety and schedule changes before the activity."],
    ],
  },
  es: {
    langCode: "es",
    htmlLang: "es-MX",
    nav: ["Experiencias", "Paquetes", "Ubicación", "FAQ", "WhatsApp", "Reservar"],
    brandSub: "Operador de reserva independiente",
    heroEyebrow: "Ruta de selva en Puerto Morelos",
    heroTitle: "Tours Auténticos de Selva Cerca de Cancún",
    heroSub: "ATV, tirolesas, caballos y cenotes naturales en Puerto Morelos, con coordinación de pickup desde Cancún, Playa del Carmen y Puerto Morelos.",
    ctaBook: "Reservar por WhatsApp",
    ctaPackages: "Ver paquetes",
    priceBadge: "Desde MXN $500 / USD $30",
    intro: "Mexico Jungle Tours es una marca independiente de operación y reservas para rutas auténticas de selva, Cenote Kin-Ha y Cenote Blanca Flor, guías bilingües certificados, lockers, áreas de descanso, comida regional mexicana y coordinación de pickup.",
    trust: ["Operador independiente", "Rutas en grupos pequeños", "Guías bilingües certificados", "Acceso a Kin-Ha y Blanca Flor", "Lunch regional según paquete", "Confirma pickup antes del pago"],
    packagesEyebrow: "Paquetes",
    packagesTitle: "Elige la ruta que va con tu día.",
    packagesCopy: "Compara acceso a cenotes, ATV, tirolesas y caballos, y confirma disponibilidad directamente por WhatsApp.",
    includes: "Incluye",
    optional: "Opcional",
    adult: "Adulto",
    child: "Menor",
    ask: "Preguntar por este paquete",
    bookAtv: "Reservar ATV + Tirolesa",
    bookHorse: "Reservar Caballos y Cenotes",
    bookSignature: "Reservar Experiencia Completa",
    filterAll: "Todos",
    filterCenote: "Cenotes",
    filterAtv: "ATV + Tirolesa",
    filterHorse: "Caballos",
    filterSignature: "Completa",
    childRule: "Menor aplica midiendo menos de 1.20 m.",
    diffTitle: "Por Qué Esta Ruta Se Siente Diferente",
    diffCards: [
      ["Entorno de cenotes naturales", "Kin-Ha y Blanca Flor ofrecen acceso a agua dulce rodeada de selva y formaciones de piedra caliza."],
      ["Sistemas profundos de agua dulce", "Kin-Ha es conocido localmente por zonas de profundidad aproximada de 30, 40 y hasta 70 metros. Actividades de buceo requieren buzos certificados y aprobación previa."],
      ["Plataformas de Blanca Flor", "Blanca Flor es conocida como un espacio donde saltadores experimentados y atletas profesionales practican desde diferentes plataformas, incluyendo alturas aproximadas de hasta 14 metros."],
      ["Áreas de acceso especial", "Fátima es un área de acceso especial con condiciones únicas de agua y puede considerarse solo para grupos privados o corporativos aprobados."],
      ["Ritmo de selva en grupo pequeño", "La ruta está diseñada para sentirse personal, guiada y conectada con la tierra."],
    ],
    galleryTitle: "Cenotes reales. Selva real. Reserva clara.",
    galleryCopy: "Agua dulce, piedra caliza, recorridos en ATV, plataformas de tirolesa, senderos con caballos y momentos familiares en la ruta de Puerto Morelos.",
    locationTitle: "Ruta de los Cenotes, Puerto Morelos",
    locationCopy: "La experiencia opera en el área de la Ruta de los Cenotes de Puerto Morelos, con coordinación de pickup desde Cancún, Playa del Carmen y Puerto Morelos.",
    confirmPickup: "Confirma tu zona de pickup por WhatsApp antes del pago.",
    viewMap: "Ver mapa integrado",
    mapIntro: "El mapa integrado carga solo cuando se necesita",
    preservationTitle: "Contribución Opcional para Preservación de la Selva",
    preservationCopy: "MXN $100 / USD $5. Apoya el mantenimiento de senderos, cuidado de cenotes y acciones de preservación dentro de Kin-Ha. Los visitantes reciben un Certificado de Participación en Conservación Kin-Ha. No es donativo deducible ni certificación emitida por un tercero.",
    safetyTitle: "Seguridad y restricciones",
    safety: [
      "No recomendado para mujeres embarazadas.",
      "No recomendado para problemas severos de espalda o cuello, lesiones o cirugía reciente.",
      "Personas bajo influencia de alcohol o drogas no podrán participar.",
      "Menores de 12 años deben ir acompañados por un adulto o padre/madre.",
      "Precio de menor aplica midiendo menos de 1.20 m.",
      "Actividades de buceo solo para buzos certificados y con aprobación previa.",
      "Áreas especiales requieren aprobación previa.",
    ],
    bookingTitle: "Confirma tu ruta, pickup y precio final.",
    bookingCopy: "El equipo confirma disponibilidad, zona de pickup, cantidad de adultos y menores, paquete ideal y add-ons opcionales por WhatsApp.",
    footerCopy: "Marca independiente de operación y reservas para rutas de selva en Puerto Morelos, cenotes Kin-Ha y Blanca Flor, ATV, tirolesas y caballos.",
    faqTitle: "Preguntas antes de reservar",
    faq: [
      ["¿Mexico Jungle Tours es la marca oficial de Cenote Kin-Ha?", "No. Mexico Jungle Tours es una marca independiente de operación y reservas que ofrece acceso a rutas auténticas de selva y experiencias de cenotes, incluyendo acceso a Kin-Ha y Blanca Flor."],
      ["¿La transportación está incluida?", "La transportación está incluida en paquetes ATV, caballos y experiencia completa. Confirma tu zona de pickup antes del pago."],
      ["¿Hay lockers disponibles?", "Sí, hay lockers y áreas de descanso disponibles."],
      ["¿El lunch está incluido?", "Lunch regional mexicano o snacks están incluidos según el paquete."],
      ["¿Pueden participar menores?", "Los menores pueden participar en muchas actividades. Menores de 12 años deben ir acompañados por un adulto o padre/madre."],
      ["¿Qué pasa si llueve?", "La lluvia ligera puede ser parte de la ruta de selva. El equipo confirma clima, seguridad y cambios de horario antes de la actividad."],
    ],
  },
};

const packages = {
  cenotes: {
    route: "cenotes",
    image: images.blancaFlor,
    waKey: "cenotes",
    en: {
      name: "Kin-Ha and Blanca Flor Cenotes",
      slug: urls.enCenote,
      desc: "Access to Kin-Ha Cenote + Blanca Flor. Snorkeling and certified guide included.",
      adult: "MXN $500 / USD $30",
      child: "MXN $300 / USD $20",
      includes: ["Kin-Ha access", "Blanca Flor access", "Snorkeling", "Certified guide", "Lockers available", "Rest areas"],
      cta: "Ask about this package",
    },
    es: {
      name: "Cenotes Kin-Ha y Blanca Flor",
      slug: urls.esCenote,
      desc: "Acceso a Cenote Kin-Ha + Blanca Flor. Snorkel y guía certificado incluido.",
      adult: "MXN $500 / USD $30",
      child: "MXN $300 / USD $20",
      includes: ["Acceso a Kin-Ha", "Acceso a Blanca Flor", "Snorkel", "Guía certificado", "Lockers disponibles", "Áreas de descanso"],
      cta: "Preguntar por este paquete",
    },
  },
  atv: {
    route: "atv",
    image: images.atv,
    waKey: "atv",
    en: {
      name: "ATV + Zipline Jungle Expedition",
      slug: urls.enAtv,
      desc: "Jungle ATV route + ziplines + Kin-Ha and Blanca Flor cenote access.",
      duration: "Duration: approximately 4 hours.",
      adult: "MXN $1,200 / USD $70",
      child: "MXN $700 / USD $40",
      includes: ["Round-trip transportation", "Certified bilingual guide", "ATV route approx. 30 minutes", "Zipline route approx. 30 minutes", "Cenote swim approx. 60 minutes", "Safety equipment", "Regional Mexican lunch/snacks", "Lockers and rest areas"],
      optional: ["Horseback add-on MXN $200 / USD $12", "Optional preservation contribution MXN $100 / USD $5"],
      cta: "Book ATV + Zipline",
    },
    es: {
      name: "ATV + Tirolesa por la Selva",
      slug: urls.esAtv,
      desc: "ATV por la selva + tirolesas + acceso a Cenote Kin-Ha y Blanca Flor.",
      duration: "Duración: aproximadamente 4 horas.",
      adult: "MXN $1,200 / USD $70",
      child: "MXN $700 / USD $40",
      includes: ["Transportación redonda", "Guía bilingüe certificado", "Ruta ATV aprox. 30 min", "Ruta de tirolesas aprox. 30 min", "Nado en cenote aprox. 60 min", "Equipo de seguridad", "Lunch regional mexicano/snacks", "Lockers y áreas de descanso"],
      optional: ["Caballos MXN $200 / USD $12", "Contribución opcional para preservación MXN $100 / USD $5"],
      cta: "Reservar ATV + Tirolesa",
    },
  },
  horseback: {
    route: "horseback",
    image: images.horseback,
    waKey: "horseback",
    en: {
      name: "Horseback Riding & Cenotes",
      slug: urls.enHorse,
      desc: "Horseback riding through jungle trails + cenote access.",
      adult: "MXN $1,200 / USD $70",
      child: "MXN $700 / USD $40",
      includes: ["Round-trip transportation", "Horseback riding", "Cenote access", "Certified guide", "Regional Mexican lunch", "Lockers", "Rest areas"],
      cta: "Book Horseback & Cenotes",
    },
    es: {
      name: "Caballos y Cenotes",
      slug: urls.esHorse,
      desc: "Paseo a caballo por senderos de selva + acceso a cenotes.",
      adult: "MXN $1,200 / USD $70",
      child: "MXN $700 / USD $40",
      includes: ["Transportación redonda", "Paseo a caballo", "Acceso a cenotes", "Guía certificado", "Lunch regional mexicano", "Lockers", "Áreas de descanso"],
      cta: "Reservar Caballos y Cenotes",
    },
  },
  signature: {
    route: "signature",
    image: images.zipline,
    waKey: "signature",
    en: {
      name: "Kin-Ha Signature Experience",
      slug: urls.enRuta,
      desc: "Kin-Ha Cenote + Blanca Flor Cenote + ATV route + regional lunch + transportation.",
      adult: "MXN $1,400 / USD $85",
      child: "MXN $800 / USD $50",
      includes: ["Round-trip transportation", "Kin-Ha Cenote", "Blanca Flor Cenote", "ATV route", "Certified guide", "Regional Mexican lunch", "Lockers", "Rest areas"],
      optional: ["Preservation contribution MXN $100 / USD $5"],
      cta: "Book Kin-Ha Signature",
    },
    es: {
      name: "Experiencia Completa Kin-Ha",
      slug: urls.esRuta,
      desc: "Cenote Kin-Ha + Cenote Blanca Flor + ATV + lunch regional + transportación.",
      adult: "MXN $1,400 / USD $85",
      child: "MXN $800 / USD $50",
      includes: ["Transportación redonda", "Cenote Kin-Ha", "Cenote Blanca Flor", "Ruta ATV", "Guía certificado", "Lunch regional mexicano", "Lockers", "Áreas de descanso"],
      optional: ["Contribución para preservación MXN $100 / USD $5"],
      cta: "Reservar Experiencia Completa",
    },
  },
};

const pagePairs = {
  home: { en: urls.enHome, es: urls.esHome, x: urls.root },
  atv: { en: urls.enAtv, es: urls.esAtv, x: urls.enAtv },
  cenote: { en: urls.enCenote, es: urls.esCenote, x: urls.enCenote },
  horseback: { en: urls.enHorse, es: urls.esHorse, x: urls.enHorse },
  ruta: { en: urls.enRuta, es: urls.esRuta, x: urls.enRuta },
};

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[char]));
}

function abs(url) {
  return `${domain}${url}`;
}

function imgTag(image, alt, options = {}) {
  const loading = options.eager ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"';
  const sizes = options.sizes || image.sizes;
  const responsive = image.srcset ? ` srcset="${image.srcset}"${sizes ? ` sizes="${esc(sizes)}"` : ""}` : "";
  return `<img src="${image.src}"${responsive} width="${image.width}" height="${image.height}" alt="${esc(alt)}" ${loading} decoding="async">`;
}

function waAttrs(lang, key) {
  return `class="btn btn-primary js-wa" data-message-${lang}="${esc(wa[lang][key])}" href="https://wa.me/529982053527" target="_blank" rel="noopener noreferrer"`;
}

function head({ lang, pathUrl, title, description, pairKey, image = images.hero, rootXDefault = false }) {
  const pair = pagePairs[pairKey] || pagePairs.home;
  const xDefault = rootXDefault ? urls.root : pair.x;
  return `  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index,follow">
  <link rel="canonical" href="${abs(pathUrl)}">
  <link rel="alternate" hreflang="en" href="${abs(pair.en)}">
  <link rel="alternate" hreflang="es-MX" href="${abs(pair.es)}">
  <link rel="alternate" hreflang="x-default" href="${abs(xDefault)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${abs(pathUrl)}">
  <meta property="og:image" content="${abs(image.src)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${abs(image.src)}">
  <link rel="stylesheet" href="/assets/site.css">`;
}

function header(lang, pairKey = "home") {
  const c = t[lang];
  const pair = pagePairs[pairKey] || pagePairs.home;
  const currentHome = lang === "en" ? urls.enHome : urls.esHome;
  const currentUrl = lang === "en" ? pair.en : pair.es;
  const altUrl = lang === "en" ? pair.es : pair.en;
  return `<header class="site-header">
    <div class="header-inner">
      <a class="brand" href="${currentHome}" aria-label="Mexico Jungle Tours">
        <strong>Mexico Jungle Tours</strong>
        <span>${esc(c.brandSub)}</span>
      </a>
      <nav class="desktop-nav" aria-label="${lang === "en" ? "Primary navigation" : "Navegación principal"}">
        <a href="${currentHome}#experiences">${esc(c.nav[0])}</a>
        <a href="${currentHome}#packages">${esc(c.nav[1])}</a>
        <a href="${currentHome}#location">${esc(c.nav[2])}</a>
        <a href="${currentHome}#faq">${esc(c.nav[3])}</a>
        <a class="js-wa" data-message-${lang}="${esc(wa[lang].general)}" href="https://wa.me/529982053527" target="_blank" rel="noopener noreferrer">${esc(c.nav[4])}</a>
        <a class="nav-book js-wa" data-message-${lang}="${esc(wa[lang].general)}" href="https://wa.me/529982053527" target="_blank" rel="noopener noreferrer">${esc(c.nav[5])}</a>
      </nav>
      <div class="language-links" aria-label="Language">
        <a class="lang-link ${lang === "en" ? "is-active" : ""}" href="${lang === "en" ? currentUrl : altUrl}" hreflang="en">EN</a>
        <a class="lang-link ${lang === "es" ? "is-active" : ""}" href="${lang === "es" ? currentUrl : altUrl}" hreflang="es-MX">ES</a>
      </div>
    </div>
    <nav class="mobile-nav" aria-label="${lang === "en" ? "Mobile navigation" : "Navegación móvil"}">
      <a href="${currentHome}#experiences">${esc(c.nav[0])}</a>
      <a href="${currentHome}#packages">${esc(c.nav[1])}</a>
      <a href="${currentHome}#location">${esc(c.nav[2])}</a>
      <a href="${currentHome}#faq">${esc(c.nav[3])}</a>
      <a class="js-wa" data-message-${lang}="${esc(wa[lang].general)}" href="https://wa.me/529982053527" target="_blank" rel="noopener noreferrer">${esc(c.nav[4])}</a>
    </nav>
  </header>`;
}

function breadcrumbNav(breadcrumbs, lang) {
  if (!breadcrumbs || breadcrumbs.length <= 1) return "";
  const label = lang === "en" ? "Breadcrumb" : "Ruta de navegacion";
  const items = breadcrumbs.map((crumb, index) => {
    const isLast = index === breadcrumbs.length - 1;
    if (isLast) return `<span aria-current="page">${esc(crumb.name)}</span>`;
    return `<a href="${crumb.url}">${esc(crumb.name)}</a><span aria-hidden="true">/</span>`;
  }).join("");
  return `<nav class="container breadcrumb" aria-label="${label}">${items}</nav>`;
}

function packageCard(key, lang) {
  const c = t[lang];
  const pkg = packages[key];
  const p = pkg[lang];
  const alt = {
    cenotes: lang === "en" ? "Natural freshwater at Kin-Ha Cenote on Ruta de los Cenotes in Puerto Morelos" : "Agua dulce natural en Cenote Kin-Ha en la Ruta de los Cenotes de Puerto Morelos",
    atv: lang === "en" ? "ATV riders splashing through the Kin-Ha jungle route near Puerto Morelos" : "Personas en ATV cruzando agua en la ruta de selva Kin-Ha cerca de Puerto Morelos",
    horseback: lang === "en" ? "Horseback riding on shaded jungle trails near Puerto Morelos cenotes" : "Paseo a caballo por senderos de selva cerca de cenotes en Puerto Morelos",
    signature: lang === "en" ? "Zipline over cenote water on the Kin-Ha jungle route" : "Tirolesa sobre agua de cenote en la ruta de selva Kin-Ha",
  }[key];
  const optional = p.optional ? `<div><p class="mini-label">${esc(c.optional)}</p><ul class="plain-list">${p.optional.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div>` : "";
  const duration = p.duration ? `<p class="note">${esc(p.duration)}</p>` : "";
  return `<article class="package-card" data-route="${pkg.route}">
    <a class="package-image" href="${p.slug}">${imgTag(pkg.image, alt, { sizes: "(max-width: 720px) 100vw, (max-width: 1180px) 50vw, 380px" })}</a>
    <div class="package-body">
      <span class="package-kicker">${esc(key === "signature" ? c.filterSignature : key === "horseback" ? c.filterHorse : key === "atv" ? c.filterAtv : c.filterCenote)}</span>
      <h3><a href="${p.slug}">${esc(p.name)}</a></h3>
      <p>${esc(p.desc)}</p>
      ${duration}
      <div class="price-grid">
        <div class="price-cell"><span>${esc(c.adult)}</span><strong>${esc(p.adult)}</strong></div>
        <div class="price-cell"><span>${esc(c.child)}</span><strong>${esc(p.child)}</strong></div>
      </div>
      <p class="note">${esc(c.childRule)}</p>
      <div><p class="mini-label">${esc(c.includes)}</p><ul class="check-list">${p.includes.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div>
      ${optional}
      <a ${waAttrs(lang, pkg.waKey)}>${esc(p.cta)}</a>
    </div>
  </article>`;
}

function packagesSection(lang, selected) {
  const c = t[lang];
  const keys = selected ? [selected] : ["cenotes", "atv", "horseback", "signature"];
  const filters = selected ? "" : `<div class="filters" role="group" aria-label="${esc(c.packagesEyebrow)}">
    <button class="filter-btn is-active" type="button" data-filter="all">${esc(c.filterAll)}</button>
    <button class="filter-btn" type="button" data-filter="cenotes">${esc(c.filterCenote)}</button>
    <button class="filter-btn" type="button" data-filter="atv">${esc(c.filterAtv)}</button>
    <button class="filter-btn" type="button" data-filter="horseback">${esc(c.filterHorse)}</button>
    <button class="filter-btn" type="button" data-filter="signature">${esc(c.filterSignature)}</button>
  </div>`;
  return `<section class="section" id="packages">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">${esc(c.packagesEyebrow)}</span>
        <h2>${esc(c.packagesTitle)}</h2>
        <p>${esc(c.packagesCopy)}</p>
      </div>
      ${filters}
      <div class="packages-grid">${keys.map((key) => packageCard(key, lang)).join("")}</div>
    </div>
  </section>`;
}

function compareSection(lang) {
  const c = t[lang];
  const yes = lang === "en" ? "Yes" : "Sí";
  const no = "No";
  const optional = lang === "en" ? "Optional" : "Opcional";
  const rows = [
    ["cenotes", yes, no, no, no, no, lang === "en" ? "Confirm" : "Confirmar"],
    ["atv", yes, yes, yes, optional, yes, yes],
    ["horseback", yes, no, no, yes, yes, yes],
    ["signature", yes, yes, no, no, yes, yes],
  ];
  return `<section class="section-tight">
    <div class="container">
      <div class="section-head"><span class="eyebrow">${lang === "en" ? "Compare" : "Comparar"}</span><h2>${lang === "en" ? "Compare packages" : "Comparar paquetes"}</h2></div>
      <div class="compare-wrap">
        <table class="compare-table">
          <thead><tr><th>${lang === "en" ? "Package" : "Paquete"}</th><th>Cenotes</th><th>ATV</th><th>${lang === "en" ? "Zipline" : "Tirolesa"}</th><th>${lang === "en" ? "Horseback" : "Caballos"}</th><th>${lang === "en" ? "Regional lunch" : "Lunch regional"}</th><th>${lang === "en" ? "Transportation" : "Transportación"}</th><th>${esc(c.adult)}</th><th>${esc(c.child)}</th></tr></thead>
          <tbody>${rows.map(([key, cenote, atv, zipline, horse, lunch, transport]) => {
            const p = packages[key][lang];
            return `<tr><td><a href="${p.slug}">${esc(p.name)}</a></td><td>${cenote}</td><td>${atv}</td><td>${zipline}</td><td>${horse}</td><td>${lunch}</td><td>${transport}</td><td>${esc(p.adult)}</td><td>${esc(p.child)}</td></tr>`;
          }).join("")}</tbody>
        </table>
      </div>
    </div>
  </section>`;
}

function differentiators(lang) {
  const c = t[lang];
  return `<section class="section contrast" id="experiences">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">${lang === "en" ? "Differentiators" : "Diferenciadores"}</span>
        <h2>${esc(c.diffTitle)}</h2>
        <p>${lang === "en" ? "A long-standing family-owned jungle property with more than 15 years of local history and one of the established cenote experiences in the Ruta de los Cenotes area." : "Una propiedad familiar de selva con más de 15 años de historia local y una de las experiencias de cenotes establecidas en el área de la Ruta de los Cenotes."}</p>
      </div>
      <div class="diff-grid">${c.diffCards.map(([title, copy]) => `<article class="diff-card"><h3>${esc(title)}</h3><p>${esc(copy)}</p></article>`).join("")}</div>
    </div>
  </section>`;
}

function gallery(lang) {
  const captions = lang === "en"
    ? ["Cenote water and limestone walls", "ATV splash on the jungle route", "Zipline over cenote water", "Horseback route through shaded trails", "Family moment at the Kin-Ha letters"]
    : ["Agua de cenote y paredes de piedra caliza", "Splash en ATV en la ruta de selva", "Tirolesa sobre agua de cenote", "Ruta a caballo por senderos con sombra", "Momento familiar en las letras Kin-Ha"];
  const alts = lang === "en"
    ? ["Guest jumping into a Kin-Ha cenote in Puerto Morelos", "ATV splash on Kin-Ha jungle terrain near Puerto Morelos", "Zipline over cenote water near Puerto Morelos", "Horseback riding on Puerto Morelos jungle trails", "Family at the Kin-Ha sign on Ruta de los Cenotes"]
    : ["Visitante saltando a un cenote Kin-Ha en Puerto Morelos", "Splash en ATV en terreno de selva Kin-Ha cerca de Puerto Morelos", "Tirolesa sobre agua de cenote cerca de Puerto Morelos", "Paseo a caballo en senderos de selva de Puerto Morelos", "Familia en las letras Kin-Ha en Ruta de los Cenotes"];
  const imgs = [images.jump, images.atv, images.zipline, images.horseback, images.family];
  const c = t[lang];
  return `<section class="section visual-band">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">${lang === "en" ? "Real route images" : "Imágenes reales de la ruta"}</span>
        <h2>${esc(c.galleryTitle)}</h2>
        <p>${esc(c.galleryCopy)}</p>
      </div>
      <div class="gallery">${imgs.map((image, index) => `<figure>${imgTag(image, alts[index])}<figcaption>${esc(captions[index])}</figcaption></figure>`).join("")}</div>
    </div>
  </section>`;
}

function galleryRich(lang) {
  const items = lang === "en"
    ? [
      [images.hero, "ATV jungle tour near Cancun and Riviera Maya", "Helmeted guests riding an ATV through the Puerto Morelos jungle"],
      [images.blancaFlor, "Blanca Flor cenote water and limestone walls", "Blanca Flor cenote experience near Cancun and Puerto Morelos"],
      [images.cenote, "Kin-Ha cenote immersion", "Guests swimming in Kin-Ha Cenote near Puerto Morelos"],
      [images.zipline, "Zipline over cenote water", "Zipline adventure at Kin-Ha jungle park over cenote water"],
      [images.horseback, "Horseback route through shaded jungle trails", "Horseback riding tour through the Puerto Morelos jungle"],
      [images.atv, "ATV route with real jungle terrain", "ATV riders crossing water on the Kin-Ha jungle route near Puerto Morelos"],
      [images.jump, "Cenote jump on the Kin-Ha route", "Guest jumping into a Kin-Ha cenote in Puerto Morelos"],
      [images.guidedZip, "Helmet, guide support and zipline briefing", "Helmeted guest with guide support on the Kin-Ha zipline route"],
      [images.familyZipline, "Family zipline moment in the Riviera Maya jungle", "Family zipline moment in the Riviera Maya jungle near Puerto Morelos"],
      [images.family, "Family arrival at the Kin-Ha letters", "Family at the Kin-Ha sign on Ruta de los Cenotes"],
      [images.zipLineRoute, "Zipline route through jungle canopy", "Zipline route through the Kin-Ha jungle near Puerto Morelos"],
      [images.coupleJump, "Guests jumping into a Kin-Ha cenote", "Guests jumping into a Kin-Ha cenote near Puerto Morelos"],
    ]
    : [
      [images.hero, "ATV por la selva cerca de Cancun y Riviera Maya", "Visitantes con casco en ATV por la selva de Puerto Morelos"],
      [images.blancaFlor, "Agua de Cenote Blanca Flor y piedra caliza", "Experiencia en Cenote Blanca Flor cerca de Cancun y Puerto Morelos"],
      [images.cenote, "Nado en Cenote Kin-Ha", "Visitantes nadando en Cenote Kin-Ha cerca de Puerto Morelos"],
      [images.zipline, "Tirolesa sobre agua de cenote", "Aventura de tirolesa en Kin-Ha sobre agua de cenote"],
      [images.horseback, "Ruta a caballo por senderos de selva", "Paseo a caballo por la selva de Puerto Morelos"],
      [images.atv, "Ruta ATV con terreno real de selva", "Personas en ATV cruzando agua en la ruta de selva Kin-Ha cerca de Puerto Morelos"],
      [images.jump, "Salto a cenote en la Ruta Kin-Ha", "Visitante saltando a un cenote Kin-Ha en Puerto Morelos"],
      [images.guidedZip, "Casco, guia y apoyo en tirolesa", "Visitante con casco y apoyo de guia en la ruta de tirolesa Kin-Ha"],
      [images.familyZipline, "Momento familiar en tirolesa en Riviera Maya", "Momento familiar en tirolesa en la selva de Riviera Maya cerca de Puerto Morelos"],
      [images.family, "Familia en las letras Kin-Ha", "Familia en las letras Kin-Ha en Ruta de los Cenotes"],
      [images.zipLineRoute, "Ruta de tirolesa entre selva", "Ruta de tirolesa por la selva Kin-Ha cerca de Puerto Morelos"],
      [images.coupleJump, "Visitantes saltando a un cenote Kin-Ha", "Visitantes saltando a un cenote Kin-Ha cerca de Puerto Morelos"],
    ];
  const c = t[lang];
  return `<section class="section visual-band">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">${lang === "en" ? "Real route images" : "Imagenes reales de la ruta"}</span>
        <h2>${esc(c.galleryTitle)}</h2>
        <p>${esc(c.galleryCopy)}</p>
      </div>
      <div class="gallery">${items.map(([image, caption, alt]) => `<figure>${imgTag(image, alt, { sizes: "(max-width: 720px) 100vw, (max-width: 1180px) 50vw, 380px" })}<figcaption>${esc(caption)}</figcaption></figure>`).join("")}</div>
    </div>
  </section>`;
}

function locationSection(lang) {
  const c = t[lang];
  return `<section class="section" id="location">
    <div class="container">
      <div class="map-layout">
        <div>
          <div class="section-head">
            <span class="eyebrow">${lang === "en" ? "Location" : "Ubicación"}</span>
            <h2>${esc(c.locationTitle)}</h2>
            <p>${esc(c.locationCopy)} <strong>${esc(c.confirmPickup)}</strong></p>
          </div>
          <div class="location-grid">
            <article class="location-card"><h3>${lang === "en" ? "Cancun" : "Cancún"}</h3><p>${lang === "en" ? "Pickup coordination depending on hotel zone." : "Coordinación de pickup según zona de hotel."}</p></article>
            <article class="location-card"><h3>Playa del Carmen</h3><p>${lang === "en" ? "Pickup coordination depending on hotel zone." : "Coordinación de pickup según zona de hotel."}</p></article>
            <article class="location-card"><h3>Puerto Morelos</h3><p>${lang === "en" ? "Closest access to Ruta de los Cenotes." : "Acceso más cercano a Ruta de los Cenotes."}</p></article>
          </div>
          <div class="button-row">
            <button class="btn btn-primary" type="button" id="load-map">${esc(c.viewMap)}</button>
            <a ${waAttrs(lang, "pickup")}>${lang === "en" ? "Confirm pickup on WhatsApp" : "Confirmar pickup por WhatsApp"}</a>
          </div>
        </div>
        <div class="map-card" id="map-card" data-map-loaded="false">
          <div class="map-intro">
            <strong>${esc(c.mapIntro)}</strong>
            <p>${lang === "en" ? "This keeps the site fast while keeping the route easy to plan." : "Esto mantiene el sitio rápido y la ruta fácil de planear."}</p>
            <button class="btn btn-primary" type="button" data-map-trigger>${esc(c.viewMap)}</button>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function infoSections(lang) {
  const c = t[lang];
  const preservationAlt = lang === "en" ? "Natural jungle and cenote environment at Kin-Ha near Puerto Morelos" : "Entorno natural de selva y cenote en Kin-Ha cerca de Puerto Morelos";
  const safetyAlt = lang === "en" ? "Helmeted zipline guest with guide support on the Kin-Ha route" : "Visitante con casco y apoyo de guia en la ruta Kin-Ha";
  return `<section class="section-tight">
    <div class="container">
      <div class="info-grid">
        <article class="info-card media-card">
          <figure>${imgTag(images.cenote, preservationAlt, { sizes: "(max-width: 720px) 100vw, 560px" })}</figure>
          <h2>${esc(c.preservationTitle)}</h2>
          <p>${esc(c.preservationCopy)}</p>
        </article>
        <article class="info-card media-card">
          <figure>${imgTag(images.guidedZip, safetyAlt, { sizes: "(max-width: 720px) 100vw, 560px" })}</figure>
          <h2>${esc(c.safetyTitle)}</h2>
          <ul class="plain-list">${c.safety.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
        </article>
      </div>
    </div>
  </section>`;
}

function faqSection(lang) {
  const c = t[lang];
  return `<section class="section" id="faq">
    <div class="container">
      <div class="section-head center"><span class="eyebrow">FAQ</span><h2>${esc(c.faqTitle)}</h2></div>
      <div class="faq-list">${c.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
    </div>
  </section>`;
}

function bookingSection(lang) {
  const c = t[lang];
  return `<section class="section-tight">
    <div class="container">
      <div class="booking-card">
        <span class="eyebrow">${lang === "en" ? "Booking support" : "Apoyo para reservar"}</span>
        <h2>${esc(c.bookingTitle)}</h2>
        <p>${esc(c.bookingCopy)}</p>
        <a ${waAttrs(lang, "general")}>${esc(c.ctaBook)}</a>
      </div>
    </div>
  </section>`;
}

function footer(lang) {
  const c = t[lang];
  const home = lang === "en" ? urls.enHome : urls.esHome;
  return `<footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <strong>Mexico Jungle Tours</strong>
        <p>${esc(c.footerCopy)}</p>
        <p>WhatsApp: +52 998 205 3527</p>
      </div>
      <div class="footer-links">
        <a href="${home}#packages">${esc(c.nav[1])}</a>
        <a href="${home}#location">${esc(c.nav[2])}</a>
        <a href="${home}#faq">FAQ</a>
        <a href="${lang === "en" ? urls.enAtv : urls.esAtv}">${esc(packages.atv[lang].name)}</a>
        <a href="${lang === "en" ? urls.enCenote : urls.esCenote}">${esc(packages.cenotes[lang].name)}</a>
      </div>
    </div>
  </footer>
  <a class="floating-wa js-wa" data-message-${lang}="${esc(wa[lang].general)}" href="https://wa.me/529982053527" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WA</a>
  <div class="mobile-booking-bar" role="navigation" aria-label="${lang === "en" ? "Mobile booking shortcuts" : "Accesos rápidos de reserva"}">
    <a class="btn btn-primary js-wa" data-message-${lang}="${esc(wa[lang].general)}" href="https://wa.me/529982053527" target="_blank" rel="noopener noreferrer">WhatsApp</a>
    <a class="btn btn-secondary" href="${home}#packages">${esc(c.nav[1])}</a>
  </div>`;
}

function schema({ lang, url, title, description, pairKey, breadcrumbs, packageKeys }) {
  const c = t[lang];
  const graph = [
    {
      "@type": "Organization",
      "@id": `${domain}/#organization`,
      name: "Mexico Jungle Tours",
      url: domain,
      telephone: "+52 998 205 3527",
      description: c.footerCopy,
    },
    {
      "@type": "LocalBusiness",
      "@id": `${domain}/#localbusiness`,
      name: "Mexico Jungle Tours",
      url: domain,
      telephone: "+52 998 205 3527",
      image: abs(images.hero.src),
      address: { "@type": "PostalAddress", addressLocality: "Puerto Morelos", addressRegion: "Quintana Roo", addressCountry: "MX" },
      areaServed: ["Cancun", "Playa del Carmen", "Puerto Morelos", "Riviera Maya"],
      description: c.intro,
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${abs(url)}#breadcrumb`,
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: abs(crumb.url),
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${abs(url)}#faq`,
      mainEntity: c.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ];
  for (const key of packageKeys) {
    const pkg = packages[key][lang];
    graph.push({
      "@type": "TouristTrip",
      "@id": `${abs(pkg.slug)}#tour`,
      name: pkg.name,
      description: pkg.desc,
      image: abs(packages[key].image.src),
      touristType: ["Adventure travelers", "Families", "Small groups"],
      provider: { "@id": `${domain}/#organization` },
      offers: {
        "@type": "Offer",
        name: pkg.name,
        priceCurrency: "MXN",
        price: pkg.adult.match(/MXN \$([0-9,]+)/)?.[1]?.replace(",", "") || "0",
        url: abs(pkg.slug),
        availability: "https://schema.org/InStock",
      },
    });
  }
  return `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>`;
}

function hero(lang, options = {}) {
  const c = t[lang];
  const title = options.heroTitle || c.heroTitle;
  const sub = options.heroSub || c.heroSub;
  const image = options.image || images.hero;
  const alt = options.heroAlt || image.alt?.[lang] || (lang === "en" ? "Authentic Puerto Morelos jungle and cenote tour experience near Cancun" : "Experiencia autentica de selva y cenotes en Puerto Morelos cerca de Cancun");
  return `<section class="hero">
    <div class="hero-grid">
      <div class="hero-copy">
        <span class="eyebrow">${esc(options.eyebrow || c.heroEyebrow)}</span>
        <h1>${esc(title)}</h1>
        <p class="subhead">${esc(sub)}</p>
        <p>${esc(c.intro)}</p>
        <div class="price-cue">${esc(c.priceBadge)}</div>
        <div class="hero-actions">
          <a ${waAttrs(lang, options.waKey || "general")}>${esc(c.ctaBook)}</a>
          <a class="btn btn-secondary" href="#packages">${esc(c.ctaPackages)}</a>
        </div>
      </div>
      <div class="hero-media">
        ${imgTag(image, alt, { eager: true })}
        <div class="hero-note"><strong>${lang === "en" ? "Natural cenotes and real Puerto Morelos jungle setting" : "Cenotes naturales y entorno real de selva en Puerto Morelos"}</strong><span>${lang === "en" ? "Clean booking flow with pickup coordination before payment." : "Reserva clara con coordinación de pickup antes del pago."}</span></div>
      </div>
    </div>
  </section>`;
}

function homePage(lang, pathUrl, rootXDefault = false) {
  const c = t[lang];
  const title = lang === "en" ? "Mexico Jungle Tours | ATV, Zipline & Cenote Tours Near Cancun" : "Mexico Jungle Tours | ATV, Tirolesas y Cenotes Cerca de Cancún";
  const description = lang === "en"
    ? "Book authentic ATV, zipline, horseback riding and cenote tours in Puerto Morelos with pickup coordination from Cancun, Playa del Carmen and Puerto Morelos."
    : "Reserva tours auténticos de ATV, tirolesas, caballos y cenotes en Puerto Morelos con coordinación de pickup desde Cancún, Playa del Carmen y Puerto Morelos.";
  const home = lang === "en" ? urls.enHome : urls.esHome;
  return page({
    lang,
    pathUrl,
    title,
    description,
    pairKey: "home",
    rootXDefault,
    breadcrumbs: [{ name: "Mexico Jungle Tours", url: pathUrl }],
    packageKeys: ["cenotes", "atv", "horseback", "signature"],
    main: `${hero(lang)}
      <section class="value-strip"><div class="container"><div class="value-grid">${c.trust.map((item) => `<span>${esc(item)}</span>`).join("")}</div></div></section>
      ${packagesSection(lang)}
      ${differentiators(lang)}
      ${compareSection(lang)}
      ${galleryRich(lang)}
      ${locationSection(lang)}
      ${infoSections(lang)}
      ${faqSection(lang)}
      ${bookingSection(lang)}`,
  });
}

function landingPage({ lang, key, pathUrl, pairKey, title, description, heroTitle, heroSub, image }) {
  const c = t[lang];
  const pkgKey = key === "ruta" ? "signature" : key;
  const pkg = packages[pkgKey][lang];
  const home = lang === "en" ? urls.enHome : urls.esHome;
  const otherKeys = ["cenotes", "atv", "horseback", "signature"].filter((item) => item !== pkgKey);
  const landingLinks = otherKeys.map((item) => {
    const p = packages[item][lang];
    return `<article class="landing-card"><h3><a href="${p.slug}">${esc(p.name)}</a></h3><p>${esc(p.desc)}</p></article>`;
  }).join("");
  return page({
    lang,
    pathUrl,
    title,
    description,
    pairKey,
    image,
    breadcrumbs: [{ name: "Mexico Jungle Tours", url: home }, { name: title, url: pathUrl }],
    packageKeys: [pkgKey],
    main: `${hero(lang, { heroTitle, heroSub, image, waKey: packages[pkgKey].waKey, eyebrow: lang === "en" ? "High-intent tour page" : "Página de tour" })}
      <section class="value-strip"><div class="container"><div class="value-grid">${c.trust.map((item) => `<span>${esc(item)}</span>`).join("")}</div></div></section>
      ${packagesSection(lang, pkgKey)}
      ${key === "ruta" ? differentiators(lang) : ""}
      ${galleryRich(lang)}
      ${locationSection(lang)}
      ${infoSections(lang)}
      <section class="section-tight"><div class="container"><div class="section-head"><span class="eyebrow">${lang === "en" ? "More routes" : "Más rutas"}</span><h2>${lang === "en" ? "Explore related Puerto Morelos experiences" : "Explora experiencias relacionadas en Puerto Morelos"}</h2></div><div class="landing-grid">${landingLinks}</div></div></section>
      ${faqSection(lang)}
      ${bookingSection(lang)}`,
  });
}

function page({ lang, pathUrl, title, description, pairKey, rootXDefault = false, breadcrumbs, packageKeys, main, image = images.hero }) {
  return `<!doctype html>
<html lang="${t[lang].htmlLang}">
<head>
${head({ lang, pathUrl, title, description, pairKey, image, rootXDefault })}
${schema({ lang, url: pathUrl, title, description, pairKey, breadcrumbs, packageKeys })}
</head>
<body>
${header(lang, pairKey)}
${breadcrumbNav(breadcrumbs, lang)}
<main>
${main}
</main>
${footer(lang)}
<script src="/assets/site.js" defer></script>
</body>
</html>
`;
}

function writePage(urlPath, html) {
  const filePath = urlPath === "/" ? out("index.html") : out(urlPath.replace(/^\/|\/$/g, ""), "index.html");
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, html.replace(/[ \t]+$/gm, ""), "utf8");
}

const pages = [
  [urls.root, homePage("en", urls.root, true)],
  [urls.enHome, homePage("en", urls.enHome)],
  [urls.esHome, homePage("es", urls.esHome)],
  [urls.enAtv, landingPage({ lang: "en", key: "atv", pathUrl: urls.enAtv, pairKey: "atv", title: "ATV Zipline Cenote Tour Cancun | Mexico Jungle Tours", description: "Book an ATV, zipline and cenote tour near Cancun with Puerto Morelos jungle routes, Kin-Ha and Blanca Flor cenote access, lunch and pickup coordination.", heroTitle: "ATV Zipline Cenote Tour Near Cancun", heroSub: "Jungle ATV route, ziplines and Kin-Ha plus Blanca Flor cenote access in Puerto Morelos, with pickup coordination from Cancun, Playa del Carmen and Puerto Morelos.", image: images.atv })],
  [urls.esAtv, landingPage({ lang: "es", key: "atv", pathUrl: urls.esAtv, pairKey: "atv", title: "Tour ATV Tirolesa y Cenotes Cancún | Mexico Jungle Tours", description: "Reserva tour de ATV, tirolesas y cenotes cerca de Cancún con ruta de selva en Puerto Morelos, acceso a Kin-Ha y Blanca Flor, lunch y pickup.", heroTitle: "Tour ATV, Tirolesas y Cenotes Cerca de Cancún", heroSub: "Ruta ATV por la selva, tirolesas y acceso a Cenote Kin-Ha y Blanca Flor en Puerto Morelos, con coordinación de pickup desde Cancún, Playa del Carmen y Puerto Morelos.", image: images.atv })],
  [urls.enCenote, landingPage({ lang: "en", key: "cenotes", pathUrl: urls.enCenote, pairKey: "cenote", title: "Puerto Morelos Cenote Tour | Kin-Ha and Blanca Flor", description: "Book a Puerto Morelos cenote tour with Kin-Ha and Blanca Flor access, snorkeling, certified guide, lockers and rest areas.", heroTitle: "Puerto Morelos Cenote Tour", heroSub: "Natural cenote swimming with Kin-Ha and Blanca Flor access, snorkeling, certified guide, lockers and rest areas in Ruta de los Cenotes.", image: images.blancaFlor })],
  [urls.esCenote, landingPage({ lang: "es", key: "cenotes", pathUrl: urls.esCenote, pairKey: "cenote", title: "Cenotes Puerto Morelos | Kin-Ha y Blanca Flor", description: "Reserva tour de cenotes en Puerto Morelos con acceso a Kin-Ha y Blanca Flor, snorkel, guía certificado, lockers y áreas de descanso.", heroTitle: "Cenotes en Puerto Morelos", heroSub: "Nado en cenotes naturales con acceso a Kin-Ha y Blanca Flor, snorkel, guía certificado, lockers y áreas de descanso en Ruta de los Cenotes.", image: images.blancaFlor })],
  [urls.enHorse, landingPage({ lang: "en", key: "horseback", pathUrl: urls.enHorse, pairKey: "horseback", title: "Horseback Riding Cenote Tour Puerto Morelos", description: "Book horseback riding through Puerto Morelos jungle trails with cenote access, certified guide, regional Mexican lunch and pickup coordination.", heroTitle: "Horseback Riding & Cenotes in Puerto Morelos", heroSub: "Ride shaded jungle trails and access natural cenotes with certified guide, regional Mexican lunch, lockers and pickup coordination.", image: images.horseback })],
  [urls.esHorse, landingPage({ lang: "es", key: "horseback", pathUrl: urls.esHorse, pairKey: "horseback", title: "Caballos y Cenotes Puerto Morelos | Mexico Jungle Tours", description: "Reserva paseo a caballo por senderos de selva en Puerto Morelos con acceso a cenotes, guía certificado, lunch regional y pickup.", heroTitle: "Caballos y Cenotes en Puerto Morelos", heroSub: "Paseo a caballo por senderos de selva y acceso a cenotes naturales con guía certificado, lunch regional, lockers y coordinación de pickup.", image: images.horseback })],
  [urls.enRuta, landingPage({ lang: "en", key: "ruta", pathUrl: urls.enRuta, pairKey: "ruta", title: "Ruta de los Cenotes Puerto Morelos Tours | Mexico Jungle Tours", description: "Explore Ruta de los Cenotes Puerto Morelos tours with cenotes, ATV routes, ziplines, horseback riding, regional lunch and pickup coordination.", heroTitle: "Ruta de los Cenotes Puerto Morelos Tours", heroSub: "Plan an authentic Puerto Morelos jungle route with natural cenotes, ATV, ziplines, horseback riding, regional Mexican lunch and pickup coordination.", image: images.hero })],
  [urls.esRuta, landingPage({ lang: "es", key: "ruta", pathUrl: urls.esRuta, pairKey: "ruta", title: "Ruta de los Cenotes Puerto Morelos Tours | Mexico Jungle Tours", description: "Explora tours en Ruta de los Cenotes Puerto Morelos con cenotes, ATV, tirolesas, caballos, lunch regional y coordinación de pickup.", heroTitle: "Tours en Ruta de los Cenotes Puerto Morelos", heroSub: "Planea una ruta auténtica de selva en Puerto Morelos con cenotes naturales, ATV, tirolesas, caballos, lunch regional mexicano y coordinación de pickup.", image: images.hero })],
];

for (const [url, html] of pages) writePage(url, html);

const sitemapUrls = pages.map(([url]) => url);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map((url) => `  <url>\n    <loc>${abs(url)}</loc>\n    <lastmod>2026-05-27</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${url === "/" ? "1.0" : url === "/en/" || url === "/es/" ? "0.95" : "0.85"}</priority>\n  </url>`).join("\n")}\n</urlset>\n`;
fs.writeFileSync(out("sitemap.xml"), sitemap, "utf8");

fs.writeFileSync(out("robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${domain}/sitemap.xml\n`, "utf8");

console.log(`Built ${pages.length} pages plus sitemap and robots.`);
