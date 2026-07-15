"use client";

import { FormEvent, useEffect, useState } from "react";

type Lang = "en" | "es";

const SERVICES: Record<Lang, [string, string, string, string][]> = {
  en: [
    ["❄", "AC repair & diagnostics", "Straight answers when your system stops cooling, and repairs done right the first time.", "ac-repair"],
    ["⌂", "Installation & replacement", "Right-sized systems for homes and light commercial spaces, installed cleanly.", "ac-installation"],
    ["◌", "Preventive maintenance", "Seasonal tune-ups that keep your system efficient and catch small problems early.", "ac-maintenance"],
    ["↔", "Heat-pump service", "Repair, maintenance, and replacement for residential heat-pump systems.", "heat-pump-services"],
    ["◉", "Thermostat installation", "Reliable thermostat setup and upgrades, configured and tested for your system.", "thermostats"],
    ["✦", "Indoor air quality", "Filtration, airflow, and humidity fixes for cleaner, more comfortable indoor air.", "indoor-air-quality"],
    ["≋", "Ductwork inspection & repair", "Airflow diagnostics and duct repair for uneven cooling and weak vents.", "ductwork"],
    ["▦", "Light commercial HVAC", "Responsive service and maintenance for offices, retail, restaurants, and rooftop units.", "commercial-hvac"],
    ["⌁", "System diagnostics", "Careful troubleshooting to find the real cause — from capacitors to compressors.", "ac-repair"],
  ],
  es: [
    ["❄", "Reparación y diagnóstico de AC", "Respuestas claras cuando su sistema deja de enfriar, y reparaciones bien hechas desde la primera vez.", "ac-repair"],
    ["⌂", "Instalación y reemplazo", "Sistemas del tamaño correcto para hogares y espacios comerciales ligeros, instalados con limpieza.", "ac-installation"],
    ["◌", "Mantenimiento preventivo", "Ajustes de temporada que mantienen su sistema eficiente y detectan problemas pequeños a tiempo.", "ac-maintenance"],
    ["↔", "Servicio de bomba de calor", "Reparación, mantenimiento y reemplazo de sistemas residenciales de bomba de calor.", "heat-pump-services"],
    ["◉", "Instalación de termostatos", "Instalación y actualización confiable de termostatos, configurados y probados para su sistema.", "thermostats"],
    ["✦", "Calidad del aire interior", "Soluciones de filtración, flujo de aire y humedad para un aire interior más limpio y cómodo.", "indoor-air-quality"],
    ["≋", "Inspección y reparación de ductos", "Diagnóstico de flujo de aire y reparación de ductos para enfriamiento desigual y rejillas débiles.", "ductwork"],
    ["▦", "HVAC comercial ligero", "Servicio y mantenimiento ágil para oficinas, comercios, restaurantes y unidades de azotea.", "commercial-hvac"],
    ["⌁", "Diagnóstico del sistema", "Diagnóstico cuidadoso para encontrar la causa real, desde capacitores hasta compresores.", "ac-repair"],
  ],
};

const ISSUES: Record<Lang, string[]> = {
  en: [
    "AC blowing warm air", "System won’t turn on", "Frozen evaporator coil", "Water leaks or clogged drain line",
    "Weak airflow or hot rooms", "Short cycling", "Strange noises or odors", "Thermostat not responding",
    "High indoor humidity", "Bad capacitor or contactor", "Blower or fan motor issues", "Condenser not running",
    "Dirty filters & poor air quality",
  ],
  es: [
    "El AC sopla aire caliente", "El sistema no enciende", "Serpentín evaporador congelado", "Fugas de agua o drenaje tapado",
    "Flujo de aire débil o cuartos calientes", "Ciclos cortos frecuentes", "Ruidos u olores extraños", "El termostato no responde",
    "Humedad alta en el interior", "Capacitor o contactor dañado", "Problemas del motor del ventilador", "El condensador no funciona",
    "Filtros sucios y mala calidad del aire",
  ],
};

const FACTS: Record<Lang, [string, string][]> = {
  en: [
    ["10 years in the trade", "Hands-on HVAC experience behind every diagnosis and repair."],
    ["Residential & light commercial", "Homes, offices, retail, restaurants, and small properties."],
    ["Family-owned & operated", "A personally run team that stands behind its work."],
    ["Bilingual team", "We serve customers in English and Spanish."],
  ],
  es: [
    ["10 años en el oficio", "Experiencia práctica en HVAC detrás de cada diagnóstico y reparación."],
    ["Residencial y comercial ligero", "Hogares, oficinas, comercios, restaurantes y propiedades pequeñas."],
    ["Familiar y operada por sus dueños", "Un equipo dirigido personalmente que respalda su trabajo."],
    ["Equipo bilingüe", "Atendemos a nuestros clientes en inglés y español."],
  ],
};

const REASONS: Record<Lang, [string, string][]> = {
  en: [
    ["Family-owned & accountable", "A personally run team that stands behind the work on every call."],
    ["Honest diagnostics", "We find the real cause and explain it plainly, with pricing up front."],
    ["Reliable scheduling", "We show up when we say we will and keep you updated along the way."],
    ["Careful workmanship", "Clean, correct repairs and installs, with your home or business respected."],
  ],
  es: [
    ["Familiar y responsable", "Un equipo dirigido personalmente que respalda su trabajo en cada visita."],
    ["Diagnósticos honestos", "Encontramos la causa real y la explicamos claramente, con precios por adelantado."],
    ["Citas confiables", "Llegamos cuando decimos y lo mantenemos informado en todo momento."],
    ["Trabajo cuidadoso", "Reparaciones e instalaciones limpias y correctas, respetando su hogar o negocio."],
  ],
};

const STEPS: Record<Lang, [string, string][]> = {
  en: [
    ["Honest diagnosis", "We inspect the system and find the actual cause, not just the symptom."],
    ["Clear options", "You get the findings and pricing in plain terms before any work begins."],
    ["Careful repair", "We complete the approved work cleanly and confirm the system is running right."],
  ],
  es: [
    ["Diagnóstico honesto", "Inspeccionamos el sistema y encontramos la causa real, no solo el síntoma."],
    ["Opciones claras", "Le damos los hallazgos y precios en términos claros antes de comenzar cualquier trabajo."],
    ["Reparación cuidadosa", "Completamos el trabajo aprobado con limpieza y confirmamos que el sistema funcione bien."],
  ],
};

const PLAN_ITEMS: Record<Lang, string[]> = {
  en: ["Seasonal system inspections", "Filter & drain-line checks", "Thermostat and electrical testing", "Priority scheduling & reminders"],
  es: ["Inspecciones del sistema por temporada", "Revisión de filtros y línea de drenaje", "Pruebas de termostato y componentes eléctricos", "Citas prioritarias y recordatorios"],
};

const T = {
  en: {
    topFamily: "Family-owned HVAC service", payInvoice: "Pay an invoice", langLabel: "Language",
    nav: ["Services", "Residential", "Commercial", "Maintenance", "About ACM", "Payments", "Contact"],
    requestService: "Request service",
    heroH1: "Comfort that works.", heroEm: "HVAC built on 10 years in the trade.",
    heroP: "ACM Pure Life Services provides honest diagnostics, careful repairs, and dependable maintenance for Florida homes and light commercial properties — with clear communication from the first call.",
    heroReqBtn: "Request HVAC service", callBtn: "Call (954) 278-4733",
    trust: ["10 years in the trade", "Residential & light commercial", "Family-owned", "English & Spanish"],
    formReqLabel: "REQUEST SERVICE", formTitle: "Tell us what’s going on.", formSubtitle: "Send a few details about the issue or project and ACM will follow up.",
    fName: "Full name", fNamePh: "Your name", fPhone: "Phone number", fEmail: "Email", fEmailPh: "you@email.com",
    fPropType: "Property type", fSelectOne: "Select one", fResidential: "Residential", fCommercial: "Commercial",
    fAddress: "Service address", fAddressPh: "Street address, city, ZIP", fServiceNeeded: "Service needed", fSelectService: "Select a service",
    fPrefDate: "Preferred date", fHelp: "How can we help?", fHelpPh: "Describe the issue, symptom, or project.",
    fConsent: "I agree that ACM may contact me about this request.",
    btnRequest: "Request service", btnSending: "Sending…",
    successTitle: "Request received", successMsg: "Thank you. ACM will follow up using the contact details you provided.", successAnother: "Send another request",
    introLabel: "BUILT ON THE TRADE", introH2: "HVAC service you can plan around.", introEm: "No surprises, no upsell.",
    introP: "From a system that won’t cool to a full replacement, ACM shows up on schedule, explains what’s actually wrong in plain terms, and fixes it. Honest recommendations and clear pricing on every visit.",
    issuesLabel: "COMMON HVAC PROBLEMS WE FIX", issuesH2: "Know the symptom.", issuesEm: "We’ll find the cause.",
    issuesP: "You don’t have to diagnose it yourself. Tell ACM what you’re noticing and we’ll pinpoint the cause and the fix.", issuesBtn: "Tell us what’s happening",
    servicesLabel: "WHAT WE DO", servicesH2: "Full-service HVAC for homes and light commercial.", allServices: "All services", learnMore: "Learn more",
    aboutLabel: "ABOUT ACM", aboutH2: "Family-owned, with 10 years in the trade.",
    aboutP: "ACM Pure Life Services is a family-owned HVAC company serving Florida homes and light commercial properties. We keep it simple: honest diagnostics, clear pricing, and repairs and installs done carefully the first time.",
    reasonsLabel: "WHY HOMEOWNERS & BUSINESSES CHOOSE ACM", reasonsH2: "Reliability, start to finish.", reasonsBtn: "Start a service request",
    maintLabel: "MAINTENANCE PLANS", maintH2: "Keep comfort on", maintEm: "your schedule.",
    maintP: "Seasonal maintenance keeps your system running efficiently and helps catch small issues before they turn into breakdowns. Plans can be tailored to your home or property as ACM grows.",
    maintLink: "See maintenance plans", planTitle: "Seasonal system care", planSmall: "Plan details and member benefits are editable by ACM.",
    commLabel: "LIGHT COMMERCIAL HVAC", commH2: "Reliable comfort for the place you work.",
    commP: "ACM services offices, retail, restaurants, and small commercial properties — including packaged rooftop units (RTUs) — with responsive scheduling and recurring maintenance.",
    commQuote: "Get a commercial quote", commCaption: "Packaged rooftop units (RTUs) — commercial service & maintenance",
    payLabel: "ONLINE PAYMENTS", payH2: "Pay your invoice", payEm: "securely.",
    payP: "Submit a deposit, balance, invoice, or service payment through ACM’s secure payment portal.",
    payInvNum: "Invoice number", payAmount: "Payment amount", payBtn: "Continue to secure payment",
    paySmall: "Payment processing is enabled once ACM connects its chosen provider.",
    processLabel: "WHAT TO EXPECT", processH2: "A straightforward service call.",
    contactH2: "Ready when you are.", contactP: "Start with a service request, or call ACM to talk through what you need.",
    cCallLabel: "CALL ACM", cTextLabel: "TEXT ACM", cTextVal: "Start a conversation", cReqLabel: "REQUEST SERVICE", cReqVal: "Tell us what’s going on",
    footTagline: "Family-owned HVAC service for Florida homes and light commercial properties.",
    footServices: "Services", footCompany: "Company", footPolicies: "Policies",
    fServiceLinks: ["AC repair", "Installation", "Maintenance", "Commercial HVAC"],
    fCompanyLinks: ["About ACM", "Maintenance Plans", "Payments", "Contact"],
    fPolicyLinks: ["Privacy", "Terms of Service", "Payment Policy", "Accessibility"],
    footBottomTag: "Family-Owned HVAC Service.",
    mb: ["Call", "Text", "Request service", "Pay invoice"],
  },
  es: {
    topFamily: "Servicio de HVAC familiar", payInvoice: "Pagar factura", langLabel: "Idioma",
    nav: ["Servicios", "Residencial", "Comercial", "Mantenimiento", "Sobre ACM", "Pagos", "Contacto"],
    requestService: "Solicitar servicio",
    heroH1: "Confort que funciona.", heroEm: "HVAC con 10 años de experiencia en el oficio.",
    heroP: "ACM Pure Life Services ofrece diagnósticos honestos, reparaciones cuidadosas y mantenimiento confiable para hogares y propiedades comerciales ligeras en Florida, con comunicación clara desde la primera llamada.",
    heroReqBtn: "Solicitar servicio de HVAC", callBtn: "Llame al (954) 278-4733",
    trust: ["10 años en el oficio", "Residencial y comercial ligero", "Empresa familiar", "Inglés y español"],
    formReqLabel: "SOLICITAR SERVICIO", formTitle: "Cuéntenos qué sucede.", formSubtitle: "Envíe algunos detalles sobre el problema o proyecto y ACM se comunicará con usted.",
    fName: "Nombre completo", fNamePh: "Su nombre", fPhone: "Número de teléfono", fEmail: "Correo electrónico", fEmailPh: "usted@correo.com",
    fPropType: "Tipo de propiedad", fSelectOne: "Seleccione una", fResidential: "Residencial", fCommercial: "Comercial",
    fAddress: "Dirección de servicio", fAddressPh: "Calle, ciudad, código postal", fServiceNeeded: "Servicio necesario", fSelectService: "Seleccione un servicio",
    fPrefDate: "Fecha preferida", fHelp: "¿Cómo podemos ayudar?", fHelpPh: "Describa el problema, síntoma o proyecto.",
    fConsent: "Acepto que ACM se comunique conmigo sobre esta solicitud.",
    btnRequest: "Solicitar servicio", btnSending: "Enviando…",
    successTitle: "Solicitud recibida", successMsg: "Gracias. ACM se comunicará con usted usando los datos de contacto que proporcionó.", successAnother: "Enviar otra solicitud",
    introLabel: "FORJADO EN EL OFICIO", introH2: "Servicio de HVAC con el que puede contar.", introEm: "Sin sorpresas, sin ventas forzadas.",
    introP: "Desde un sistema que no enfría hasta un reemplazo completo, ACM llega a tiempo, le explica en términos claros qué está mal y lo repara. Recomendaciones honestas y precios claros en cada visita.",
    issuesLabel: "PROBLEMAS COMUNES DE HVAC QUE RESOLVEMOS", issuesH2: "Reconozca el síntoma.", issuesEm: "Nosotros encontramos la causa.",
    issuesP: "No tiene que diagnosticarlo usted mismo. Dígale a ACM lo que está notando y encontraremos la causa y la solución.", issuesBtn: "Cuéntenos qué sucede",
    servicesLabel: "LO QUE HACEMOS", servicesH2: "HVAC completo para hogares y comercios ligeros.", allServices: "Todos los servicios", learnMore: "Más información",
    aboutLabel: "SOBRE ACM", aboutH2: "Empresa familiar, con 10 años en el oficio.",
    aboutP: "ACM Pure Life Services es una empresa familiar de HVAC que atiende hogares y propiedades comerciales ligeras en Florida. Lo mantenemos simple: diagnósticos honestos, precios claros y reparaciones e instalaciones bien hechas desde la primera vez.",
    reasonsLabel: "POR QUÉ NOS ELIGEN HOGARES Y NEGOCIOS", reasonsH2: "Confiabilidad, de principio a fin.", reasonsBtn: "Iniciar una solicitud",
    maintLabel: "PLANES DE MANTENIMIENTO", maintH2: "Mantenga el confort en", maintEm: "su calendario.",
    maintP: "El mantenimiento de temporada mantiene su sistema funcionando de forma eficiente y ayuda a detectar problemas pequeños antes de que se conviertan en averías. Los planes se pueden adaptar a su hogar o propiedad a medida que ACM crece.",
    maintLink: "Ver planes de mantenimiento", planTitle: "Cuidado del sistema por temporada", planSmall: "Los detalles del plan y los beneficios para miembros pueden ser editados por ACM.",
    commLabel: "HVAC COMERCIAL LIGERO", commH2: "Confort confiable para su lugar de trabajo.",
    commP: "ACM atiende oficinas, comercios, restaurantes y pequeñas propiedades comerciales, incluidas unidades empaquetadas de azotea (RTU), con citas ágiles y mantenimiento recurrente.",
    commQuote: "Solicitar cotización comercial", commCaption: "Unidades empaquetadas de azotea (RTU): servicio y mantenimiento comercial",
    payLabel: "PAGOS EN LÍNEA", payH2: "Pague su factura", payEm: "de forma segura.",
    payP: "Realice un depósito, saldo, factura o pago de servicio a través del portal de pago seguro de ACM.",
    payInvNum: "Número de factura", payAmount: "Monto del pago", payBtn: "Continuar al pago seguro",
    paySmall: "El procesamiento de pagos se habilita una vez que ACM conecte su proveedor.",
    processLabel: "QUÉ ESPERAR", processH2: "Una visita de servicio sencilla.",
    contactH2: "Listos cuando usted lo esté.", contactP: "Comience con una solicitud de servicio o llame a ACM para conversar sobre lo que necesita.",
    cCallLabel: "LLAME A ACM", cTextLabel: "ENVÍE UN MENSAJE", cTextVal: "Inicie una conversación", cReqLabel: "SOLICITAR SERVICIO", cReqVal: "Cuéntenos qué sucede",
    footTagline: "Servicio de HVAC familiar para hogares y propiedades comerciales ligeras en Florida.",
    footServices: "Servicios", footCompany: "Empresa", footPolicies: "Políticas",
    fServiceLinks: ["Reparación de AC", "Instalación", "Mantenimiento", "HVAC comercial"],
    fCompanyLinks: ["Sobre ACM", "Planes de mantenimiento", "Pagos", "Contacto"],
    fPolicyLinks: ["Privacidad", "Términos de servicio", "Política de pagos", "Accesibilidad"],
    footBottomTag: "Servicio de HVAC familiar.",
    mb: ["Llamar", "Texto", "Solicitar", "Pagar"],
  },
} as const;

function BrandLogo({ light = false }: { light?: boolean }) {
  return (
    <a className={`logo ${light ? "logo-light" : ""}`} href="#top" aria-label="ACM Pure Life Services LLC — home">
      <svg className="logo-mark" viewBox="0 0 100 100" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="acmHouse" x1="0.85" y1="1" x2="0.15" y2="0">
            <stop offset="0" stopColor="#5b5bd6" />
            <stop offset="0.38" stopColor="#2c7cc4" />
            <stop offset="1" stopColor="#ec7623" />
          </linearGradient>
        </defs>
        <path d="M25,84 L25,46 L50,21 L75,46 L75,84 L58,84 L50,73 L42,84 Z" fill="none" stroke="url(#acmHouse)" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round" />
        <g stroke="#2b7bbf" strokeWidth="2.6" strokeLinecap="round">
          {[0, 60, 120, 180, 240, 300].map(a => (
            <g key={a} transform={`rotate(${a} 37 54)`}>
              <line x1="37" y1="54" x2="37" y2="41.5" />
              <line x1="37" y1="44.5" x2="33.8" y2="41.6" />
              <line x1="37" y1="44.5" x2="40.2" y2="41.6" />
              <line x1="37" y1="49" x2="34.2" y2="46.4" />
              <line x1="37" y1="49" x2="39.8" y2="46.4" />
            </g>
          ))}
        </g>
        <path d="M62,37 C67,44 71,49 71,55 C71,61 66.5,65.5 61.5,65.5 C56.5,65.5 52,61.5 52,55.5 C52,51.5 54,48.5 56.5,46 C56.8,48.6 58,50.6 60,51.6 C58.5,46.5 59.5,41.5 62,37 Z" fill="#ec7623" />
      </svg>
      <span className="logo-word"><b>ACM</b><em>PURE LIFE</em><small>SERVICES LLC</small></span>
    </a>
  );
}

function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="lang-switch" role="group" aria-label={T[lang].langLabel}>
      <button type="button" className={lang === "en" ? "active" : ""} aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
      <button type="button" className={lang === "es" ? "active" : ""} aria-pressed={lang === "es"} onClick={() => setLang("es")}>ES</button>
    </div>
  );
}

function RequestForm({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const t = T[lang];
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("sending");
    const form = new FormData(e.currentTarget);
    try { await fetch("/api/service-requests", { method: "POST", body: form }); setState("sent"); e.currentTarget.reset(); }
    catch { setState("idle"); }
  }
  if (state === "sent") return <div className="form-success"><span>✓</span><h3>{t.successTitle}</h3><p>{t.successMsg}</p><button className="text-button" onClick={() => setState("idle")}>{t.successAnother}</button></div>;
  return <form className={`request-form ${compact ? "compact" : ""}`} onSubmit={submit}>
    {!compact && <div className="form-top"><span>{t.formReqLabel}</span><h2>{t.formTitle}</h2><p>{t.formSubtitle}</p></div>}
    <div className="form-grid"><label>{t.fName}<input name="name" required placeholder={t.fNamePh} /></label><label>{t.fPhone}<input name="phone" required type="tel" placeholder="(000) 000-0000" /></label><label>{t.fEmail}<input name="email" required type="email" placeholder={t.fEmailPh} /></label><label>{t.fPropType}<select name="propertyType" defaultValue=""><option value="" disabled>{t.fSelectOne}</option><option>{t.fResidential}</option><option>{t.fCommercial}</option></select></label></div>
    {!compact && <><label>{t.fAddress}<input name="address" required placeholder={t.fAddressPh} /></label><div className="form-grid"><label>{t.fServiceNeeded}<select name="service" defaultValue=""><option value="" disabled>{t.fSelectService}</option>{SERVICES[lang].map(s => <option key={s[1]}>{s[1]}</option>)}</select></label><label>{t.fPrefDate}<input name="date" type="date" /></label></div><label>{t.fHelp}<textarea name="description" required placeholder={t.fHelpPh} /></label><label className="consent"><input required type="checkbox" /> <span>{t.fConsent}</span></label></>}
    <button className="button button-primary" disabled={state === "sending"}>{state === "sending" ? t.btnSending : t.btnRequest}<span>→</span></button>
  </form>;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("acm-lang");
      if (saved === "es" || saved === "en") { setLang(saved); return; }
      if (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("es")) setLang("es");
    } catch { /* ignore */ }
  }, []);
  useEffect(() => {
    try { localStorage.setItem("acm-lang", lang); } catch { /* ignore */ }
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const t = T[lang];

  return <main id="top">
    <div className="topline"><div className="topline-left"><span>{t.topFamily}</span><a href="tel:+19542784733">(954) 278-4733</a></div><div className="topline-right"><LangSwitch lang={lang} setLang={setLang} /><a href="#pay">{t.payInvoice} <span>→</span></a></div></div>
    <header><BrandLogo light /><nav aria-label="Primary navigation"><a href="#services">{t.nav[0]}</a><a href="#residential">{t.nav[1]}</a><a href="#commercial">{t.nav[2]}</a><a href="#maintenance">{t.nav[3]}</a><a href="#about">{t.nav[4]}</a><a href="#pay">{t.nav[5]}</a><a href="#contact">{t.nav[6]}</a></nav><a className="button button-primary header-cta" href="#request">{t.requestService} <span>→</span></a></header>

    <section className="hero"><div className="hero-photo" style={{ backgroundImage: "linear-gradient(90deg,rgba(20,22,26,.97) 0%,rgba(20,22,26,.84) 46%,rgba(20,22,26,.32) 78%),url('/residential-condenser.png')" }} role="img" aria-label="Correctly installed residential outdoor split-system air conditioning condenser"></div><div className="hero-copy"><div className="eyebrow"><span></span>ACM PURE LIFE SERVICES LLC</div><h1>{t.heroH1}<em>{t.heroEm}</em></h1><p>{t.heroP}</p><div className="hero-actions"><a className="button button-primary" href="#request">{t.heroReqBtn} <span>→</span></a><a className="button button-ghost" href="tel:+19542784733">{t.callBtn}</a></div><div className="trustline">{t.trust.map(x => <span key={x}>{x}</span>)}</div></div><div id="request" className="hero-form"><RequestForm lang={lang} compact /></div></section>

    <section className="intro" id="residential"><div><p className="section-label">{t.introLabel}</p></div><div><h2>{t.introH2}<em>{t.introEm}</em></h2><p>{t.introP}</p></div></section>

    <section className="issues"><div><p className="section-label">{t.issuesLabel}</p><h2>{t.issuesH2}<em>{t.issuesEm}</em></h2><p>{t.issuesP}</p><a className="button button-primary" href="#request">{t.issuesBtn} <span>→</span></a></div><ul>{ISSUES[lang].map((issue, i) => <li key={issue}><b>{String(i + 1).padStart(2, "0")}</b><span>{issue}</span></li>)}</ul></section>

    <section id="services" className="service-section"><div className="section-heading"><div><p className="section-label">{t.servicesLabel}</p><h2>{t.servicesH2}</h2></div><a className="inline-link" href="#request">{t.allServices} <span>→</span></a></div><div className="service-grid">{SERVICES[lang].map(([icon, title, text, slug]) => <article className="service-card" key={title}><div className="service-icon">{icon}</div><h3>{title}</h3><p>{text}</p><div className="card-actions"><a href={`/${slug}`}>{t.learnMore} <span>→</span></a><a href="#request">{t.requestService}</a></div></article>)}</div></section>

    <section id="about" className="about"><div className="about-lead"><p className="section-label">{t.aboutLabel}</p><h2>{t.aboutH2}</h2><p>{t.aboutP}</p><a href="#request" className="inline-link">{t.requestService} <span>→</span></a></div><ul className="about-facts">{FACTS[lang].map(([b, s]) => <li key={b}><b>{b}</b><span>{s}</span></li>)}</ul></section>

    <section className="reasons"><div><p className="section-label">{t.reasonsLabel}</p><h2>{t.reasonsH2}</h2><a href="#request" className="button button-primary">{t.reasonsBtn} <span>→</span></a></div><ol>{REASONS[lang].map(([h, p], i) => <li key={h}><b>{String(i + 1).padStart(2, "0")}</b><div><h3>{h}</h3><p>{p}</p></div></li>)}</ol></section>

    <section id="maintenance" className="maintenance"><div><p className="section-label">{t.maintLabel}</p><h2>{t.maintH2}<em>{t.maintEm}</em></h2><p>{t.maintP}</p><a className="inline-link" href="/maintenance-plans">{t.maintLink} <span>→</span></a></div><div className="plan-card"><div className="plan-icon">✦</div><h3>{t.planTitle}</h3><ul>{PLAN_ITEMS[lang].map(x => <li key={x}>{x}</li>)}</ul><small>{t.planSmall}</small></div></section>

    <section id="commercial" className="commercial"><div className="commercial-copy"><p className="section-label">{t.commLabel}</p><h2>{t.commH2}</h2><p>{t.commP}</p><div className="commercial-actions"><a className="button button-primary" href="#request">{t.commQuote} <span>→</span></a><a className="button button-ghost" href="tel:+19542784733">{t.callBtn}</a></div></div><div className="commercial-photo" role="img" aria-label="Commercial rooftop with multiple packaged rooftop HVAC units"><span>{t.commCaption}</span></div></section>

    <section id="pay" className="payment"><div><p className="section-label">{t.payLabel}</p><h2>{t.payH2}<em>{t.payEm}</em></h2><p>{t.payP}</p></div><form className="pay-card" action="/pay" method="get"><label>{t.payInvNum}<input name="invoice" placeholder="ACM-1042" /></label><label>{t.payAmount}<input name="amount" inputMode="decimal" placeholder="$0.00" /></label><button className="button button-primary">{t.payBtn} <span>→</span></button><small>{t.paySmall}</small></form></section>

    <section className="process-band"><div className="section-heading"><div><p className="section-label">{t.processLabel}</p><h2>{t.processH2}</h2></div><a className="inline-link" href="#request">{t.requestService} <span>→</span></a></div><ol className="steps">{STEPS[lang].map(([h, p], i) => <li key={h}><b>{String(i + 1).padStart(2, "0")}</b><h3>{h}</h3><p>{p}</p></li>)}</ol></section>

    <section id="contact" className="contact"><div><BrandLogo light /><h2>{t.contactH2}</h2><p>{t.contactP}</p></div><div className="contact-actions"><a href="tel:+19542784733"><span>{t.cCallLabel}</span><b>(954) 278-4733</b><i>→</i></a><a href="sms:+19542784733"><span>{t.cTextLabel}</span><b>{t.cTextVal}</b><i>→</i></a><a href="#request"><span>{t.cReqLabel}</span><b>{t.cReqVal}</b><i>→</i></a></div></section>

    <footer><div><BrandLogo light /><p>{t.footTagline}</p></div><div><h4>{t.footServices}</h4><a href="/ac-repair">{t.fServiceLinks[0]}</a><a href="/ac-installation">{t.fServiceLinks[1]}</a><a href="/ac-maintenance">{t.fServiceLinks[2]}</a><a href="/commercial-hvac">{t.fServiceLinks[3]}</a></div><div><h4>{t.footCompany}</h4><a href="/about-acm">{t.fCompanyLinks[0]}</a><a href="/maintenance-plans">{t.fCompanyLinks[1]}</a><a href="/payments">{t.fCompanyLinks[2]}</a><a href="#contact">{t.fCompanyLinks[3]}</a></div><div><h4>{t.footPolicies}</h4><a href="/privacy">{t.fPolicyLinks[0]}</a><a href="/terms">{t.fPolicyLinks[1]}</a><a href="/payment-policy">{t.fPolicyLinks[2]}</a><a href="/accessibility">{t.fPolicyLinks[3]}</a></div><div className="footer-bottom">© {new Date().getFullYear()} ACM Pure Life Services LLC <span>{t.footBottomTag}</span></div></footer>

    <div className="mobile-bar"><a href="tel:+19542784733">{t.mb[0]}</a><a href="sms:+19542784733">{t.mb[1]}</a><a className="mobile-request" href="#request">{t.mb[2]}</a><a href="#pay">{t.mb[3]}</a></div>
  </main>;
}
