import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Download, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import bolsa from "@/assets/pingolino/bolsa-playa.jpg";
import corona from "@/assets/pingolino/corona.jpg";
import materiales from "@/assets/pingolino/materiales.jpg";
import neceser from "@/assets/pingolino/neceser.jpg";
import taller from "@/assets/pingolino/taller.jpg";

export const Route = createFileRoute("/propuesta")({
  head: () => ({
    meta: [
      { title: "Pingolino Handmade — Propuesta de rediseño" },
      { name: "description", content: "Presentación de rediseño integral para Pingolino Handmade: identidad, experiencia y contenidos." },
      { property: "og:title", content: "Pingolino Handmade — Propuesta de rediseño" },
      { property: "og:description", content: "Una experiencia digital más cálida, clara y preparada para vender." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      // Presentación comercial interna: no debe indexarse. Retirar antes del lanzamiento.
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Index,
});

const slideNames = [
  "La propuesta", "Punto de partida", "Esencia", "Dirección visual", "Nueva portada",
  "Tienda", "La historia", "Nueva voz", "Conversión", "Hoja de ruta",
];

const progressWidths = ["w-[10%]", "w-[20%]", "w-[30%]", "w-[40%]", "w-[50%]", "w-[60%]", "w-[70%]", "w-[80%]", "w-[90%]", "w-full"];

function Index() {
  const [slide, setSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const total = slideNames.length;
  const goTo = (next: number) => {
    setSlide(Math.max(0, Math.min(total - 1, next)));
    setMenuOpen(false);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") goTo(slide + 1);
      if (event.key === "ArrowLeft") goTo(slide - 1);
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slide]);

  return (
    <main className="presentation-shell">
      <header className="presentation-header">
        <button className="brand-button" onClick={() => goTo(0)} aria-label="Ir a la portada">
          <span className="brand-mark">P</span>
          <span><strong>Pingolino</strong><small>Propuesta de rediseño</small></span>
        </button>
        <div className="header-meta">
          <a className="next-button pdf-download" href="/pingolino-propuesta-rediseno.pdf" download="Pingolino-propuesta-rediseno.pdf" aria-label="Descargar la propuesta en PDF">
            <Download size={16} /> PDF
          </a>
          <span className="slide-label">{String(slide + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
          <button className="icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir índice">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <div className="progress-track"><div className={`progress-bar ${progressWidths[slide]}`} /></div>

      {menuOpen && (
        <nav className="slide-menu" aria-label="Índice de la presentación">
          <p>Índice</p>
          {slideNames.map((name, index) => (
            <button key={name} className={index === slide ? "active" : ""} onClick={() => goTo(index)}>
              <span>{String(index + 1).padStart(2, "0")}</span>{name}
            </button>
          ))}
        </nav>
      )}

      <section className="slide-stage" aria-live="polite">
        {slide === 0 && <CoverSlide onNext={() => goTo(1)} />}
        {slide === 1 && <AuditSlide />}
        {slide === 2 && <EssenceSlide />}
        {slide === 3 && <DirectionSlide />}
        {slide === 4 && <HomepageSlide />}
        {slide === 5 && <ShopSlide />}
        {slide === 6 && <StorySlide />}
        {slide === 7 && <VoiceSlide />}
        {slide === 8 && <ConversionSlide />}
        {slide === 9 && <RoadmapSlide />}
      </section>

      <footer className="presentation-footer">
        <span className="footer-note">Pingolino Handmade · Septiembre 2026</span>
        <div className="nav-controls">
          <button className="icon-button" onClick={() => goTo(slide - 1)} disabled={slide === 0} aria-label="Diapositiva anterior"><ArrowLeft size={18} /></button>
          <button className="next-button" onClick={() => goTo(slide + 1)} disabled={slide === total - 1}>
            Siguiente <ArrowRight size={17} />
          </button>
        </div>
      </footer>
    </main>
  );
}

function Eyebrow({ number, children }: { number: string; children: ReactNode }) {
  return <div className="eyebrow"><span>{number}</span>{children}</div>;
}

function CoverSlide({ onNext }: { onNext: () => void }) {
  return <article className="slide cover-slide">
    <img src={bolsa} alt="Bolsa de playa de cuadros confeccionada por Pingolino Handmade" className="cover-image" />
    <div className="cover-shade" />
    <div className="cover-copy">
      <span className="proposal-tag">Propuesta integral · 2026</span>
      <h1>Hecho para<br /><em>acompañar.</em></h1>
      <p>Una nueva experiencia digital para convertir el oficio, la historia y el cuidado de Pingolino en una marca inolvidable.</p>
      <button className="cover-cta" onClick={onNext}>Descubrir la propuesta <ArrowRight size={18} /></button>
    </div>
    <div className="cover-caption"><span>Rediseño de marca digital</span><span>E-commerce · Contenido · Experiencia</span></div>
  </article>;
}

function AuditSlide() {
  return <article className="slide content-slide audit-slide">
    <div className="slide-heading"><Eyebrow number="01">Punto de partida</Eyebrow><h2>Una historia valiosa<br />que aún no ocupa su lugar.</h2></div>
    <div className="audit-grid">
      <div className="audit-image-wrap"><img src={neceser} alt="Neceser personalizado de Pingolino Handmade" /><span className="image-note">Producto real · detalle artesanal</span></div>
      <div className="audit-findings">
        <div className="finding positive"><span>01</span><div><strong>El mayor activo</strong><p>Una fundadora, una historia auténtica y productos creados con cuidado real.</p></div></div>
        <div className="finding"><span>02</span><div><strong>La fricción principal</strong><p>La portada no explica de inmediato qué hace única a la marca ni guía la compra.</p></div></div>
        <div className="finding"><span>03</span><div><strong>La señal de urgencia</strong><p>Productos de ejemplo, enlaces sin configurar y contenido incompleto reducen la confianza.</p></div></div>
        <div className="audit-stat"><strong>31</strong><span>apariciones de “Example product” detectadas en el catálogo actual</span></div>
      </div>
    </div>
  </article>;
}

function EssenceSlide() {
  const pillars = [
    ["Cuidado", "Cada pieza nace para hacer más fácil y bonito el día a día de una familia."],
    ["Oficio", "Confección pausada, materiales elegidos con criterio y atención a cada puntada."],
    ["Vínculo", "Productos que se personalizan y acaban formando parte de recuerdos importantes."],
  ];
  return <article className="slide content-slide essence-slide">
    <div className="slide-heading compact"><Eyebrow number="02">Esencia de marca</Eyebrow><h2>No vendemos accesorios.<br /><em>Creamos pequeños recuerdos.</em></h2></div>
    <div className="essence-layout">
      <div className="manifesto"><p>Pingolino es una marca cercana, honesta y profundamente humana.</p><blockquote>“Piezas hechas a mano para cuidar, acompañar y recordar.”</blockquote></div>
      <div className="pillar-list">{pillars.map(([title, text], index) => <div className="pillar" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
    </div>
    <div className="audience-strip"><span>Para madres y familias que eligen</span><strong>Utilidad</strong><i /> <strong>Personalización</strong><i /> <strong>Calidad</strong><i /> <strong>Significado</strong></div>
  </article>;
}

function DirectionSlide() {
  return <article className="slide content-slide direction-slide">
    <div className="slide-heading inline-heading"><div><Eyebrow number="03">Dirección visual</Eyebrow><h2>Artesanía<br /><em>con mirada editorial.</em></h2></div><p>Una identidad serena y táctil. Menos “tienda genérica”, más taller contemporáneo.</p></div>
    <div className="direction-grid">
      <div className="palette-panel"><span className="panel-label">Paleta</span><div className="swatches"><div className="swatch ink"><span>Tinta</span></div><div className="swatch sage"><span>Salvia</span></div><div className="swatch clay"><span>Arcilla</span></div><div className="swatch milk"><span>Algodón</span></div></div></div>
      <div className="type-panel"><span className="panel-label">Tipografía</span><span className="type-serif">Suave, humana</span><span className="type-sans">CLARA · FUNCIONAL · HONESTA</span><p>Instrument Serif + Work Sans</p></div>
      <div className="photo-panel"><img src={materiales} alt="Textiles y materiales suaves de la marca" /><span>Texturas reales · luz natural · manos y proceso</span></div>
    </div>
  </article>;
}

function HomepageSlide() {
  return <article className="slide content-slide homepage-slide">
    <div className="slide-heading compact"><Eyebrow number="04">Nueva experiencia de inicio</Eyebrow><h2>Entender. Sentir.<br /><em>Elegir.</em></h2></div>
    <div className="homepage-composition">
      <div className="browser-mockup">
        <div className="browser-bar"><span /><span /><span /><b>PINGOLINO</b></div>
        <div className="mock-hero"><img src={bolsa} alt="Propuesta de portada de Pingolino" /><div className="mock-overlay"><small>HECHO A MANO EN ESPAÑA</small><h3>Piezas que cuidan<br />de lo que más quieres.</h3><p>Accesorios textiles personalizados, creados uno a uno para acompañar a tu familia.</p><button>DESCUBRIR LA COLECCIÓN</button></div></div>
      </div>
      <ol className="journey-list"><li><span>01</span><div><strong>Una promesa clara</strong><p>Qué hacemos y por qué importa, sin obligar a descubrirlo.</p></div></li><li><span>02</span><div><strong>Compra por necesidad</strong><p>Mochilas, paseo, regalos y personalizados.</p></div></li><li><span>03</span><div><strong>Confianza visible</strong><p>Hecho a mano · Personalizable · Envío gratis +50€.</p></div></li></ol>
    </div>
  </article>;
}

function ShopSlide() {
  const products = [{ image: bolsa, name: "Bolsa de playa Vichy", price: "44,95 €", meta: "Amplia · Resistente" }, { image: corona, name: "Corona de cumpleaños", price: "22,95 €", meta: "Reversible · Personalizable" }, { image: neceser, name: "Neceser bordado", price: "19,95 €", meta: "Nombre incluido" }];
  return <article className="slide content-slide shop-slide">
    <div className="slide-heading inline-heading"><div><Eyebrow number="05">Tienda y producto</Eyebrow><h2>Menos catálogo.<br /><em>Más deseo.</em></h2></div><p>Cada ficha debe explicar el valor de lo artesanal antes de pedir una decisión de compra.</p></div>
    <div className="product-grid">{products.map((product, index) => <div className="product-card" key={product.name}><div className="product-image"><img src={product.image} alt={product.name} /><span>0{index + 1}</span></div><p>{product.meta}</p><h3>{product.name}</h3><div><strong>{product.price}</strong><button aria-label={`Ver ${product.name}`}><ArrowRight size={17} /></button></div></div>)}</div>
    <div className="trust-row"><span><Check size={15} /> Hecho a mano</span><span><Check size={15} /> Personalización clara</span><span><Check size={15} /> Plazos visibles</span><span><Check size={15} /> Cuidados y materiales</span></div>
  </article>;
}

function StorySlide() {
  return <article className="slide story-slide">
    <div className="story-photo"><img src={taller} alt="Ambiente suave relacionado con la historia de Pingolino" /><span>La persona detrás de cada pieza</span></div>
    <div className="story-copy"><Eyebrow number="06">La historia de Sherezhade</Eyebrow><h2>Un sueño cosido<br /><em>puntada a puntada.</em></h2><p className="lead">Soy Sherezhade, mamá de tres pequeños y la persona detrás de Pingolino Handmade.</p><p>La costura siempre fue mi refugio. Con el nacimiento de mi tercer hijo —y todo lo que él vino a enseñarme— entendí que no tenía sentido seguir esperando el momento perfecto.</p><p>Así nació Pingolino: un pequeño taller donde creo piezas bonitas, prácticas y duraderas, con los mismos tejidos y el mismo cuidado que elegiría para mis propios hijos.</p><blockquote>“Gracias por dar valor a lo hecho con las manos y con el corazón.”</blockquote></div>
  </article>;
}

function VoiceSlide() {
  const rewrites = [
    ["PINGOLINO HANDMADE", "Textiles hechos a mano para acompañar a tu familia."],
    ["Detalles que importan", "Pequeñas piezas. Grandes recuerdos."],
    ["Materia prima excepcional", "Tejidos suaves, seguros y elegidos para durar."],
    ["Comprar ahora", "Encuentra vuestra próxima pieza favorita."],
  ];
  return <article className="slide content-slide voice-slide">
    <div className="slide-heading compact"><Eyebrow number="07">Una nueva voz</Eyebrow><h2>Más clara al vender.<br /><em>Más humana al contar.</em></h2></div>
    <div className="rewrite-table"><div className="rewrite-head"><span>Antes</span><span>Propuesta</span></div>{rewrites.map(([before, after]) => <div className="rewrite-row" key={before}><span>{before}</span><strong>{after}</strong></div>)}</div>
    <p className="tone-note">Cálida, directa y sin clichés. La emoción nace del oficio y de la historia real, no de adornar el mensaje.</p>
  </article>;
}

function ConversionSlide() {
  const items = [["01", "Compra móvil sin fricción", "Categorías claras, botones cómodos y personalización paso a paso."], ["02", "Decisiones con confianza", "Plazos, materiales, medidas, cuidados, cambios y envíos siempre visibles."], ["03", "Prueba social real", "Reseñas con fotografía y testimonios de familias que ya confían en Pingolino."], ["04", "Contacto que acompaña", "Respuesta esperada, correo visible y acceso directo a las dudas frecuentes."]];
  return <article className="slide content-slide conversion-slide">
    <div className="slide-heading inline-heading"><div><Eyebrow number="08">Experiencia y conversión</Eyebrow><h2>Cada detalle<br /><em>elimina una duda.</em></h2></div><div className="conversion-kpi"><strong>+50€</strong><span>Envío gratuito integrado en el recorrido de compra</span></div></div>
    <div className="conversion-grid">{items.map(([number, title, text]) => <div className="conversion-item" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
    <div className="mobile-flow"><span>DESCUBRIR</span><i /><span>PERSONALIZAR</span><i /><span>CONFIAR</span><i /><span>COMPRAR</span></div>
  </article>;
}

function RoadmapSlide() {
  return <article className="slide roadmap-slide">
    <div className="roadmap-intro"><Eyebrow number="09">Hoja de ruta</Eyebrow><h2>De tienda online<br />a <em>marca querida.</em></h2><p>Una renovación ordenada para avanzar sin perder la autenticidad que ya hace especial a Pingolino.</p></div>
    <div className="roadmap-steps"><div><span>01 · Fundamentos</span><h3>Ordenar</h3><p>Catálogo, navegación, políticas, enlaces y contenido incompleto.</p></div><div><span>02 · Identidad</span><h3>Elevar</h3><p>Sistema visual, fotografía, tono verbal y relato de marca.</p></div><div><span>03 · Experiencia</span><h3>Diseñar</h3><p>Inicio, colecciones, fichas, personalización y compra móvil.</p></div><div><span>04 · Lanzamiento</span><h3>Activar</h3><p>SEO, analítica, pruebas, contenidos y mejora continua.</p></div></div>
    <div className="closing-statement"><span>La oportunidad</span><p>Hacer que la web transmita el mismo cuidado que ya existe en cada pieza.</p><strong>Pingolino Handmade</strong></div>
  </article>;
}
