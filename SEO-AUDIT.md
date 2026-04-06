# SEO Audit Report - GM Abogados Laboralistas

**Fecha de auditoría:** 30 de Marzo 2026  
**Proyecto:** Rediseño completo (diferente a producción actual)  
**URL:** https://gm-abogados.com.mx  
**Tipo:** Single Page Application (SPA-style) - Landing page de servicios legales

---

## Resumen Ejecutivo

El rediseño tiene una base técnica sólida con configuración correcta de sitemap, robots.txt, meta tags básicos y schema markup. Sin embargo, existen **problemas críticos** que requieren atención inmediata, especialmente links a páginas inexistentes y estructura de contenido limitada.

**Salud general:** 🟡 Media-Alta  
**Prioridad de acciones:** Alta

---

## 1. CRÍTICO - Problemas que Bloquean SEO

### 1.1 Links a Páginas Inexistentes

| Ubicación                | Link                     | Problema            |
| ------------------------ | ------------------------ | ------------------- |
| `SituationCard.astro:16` | `/despido-injustificado` | Page no existe      |
| `SituationCard.astro:16` | `/despido-injustificado` | Page no existe (x5) |

**Impacto:** Alto  
**Evidencia:** Los SituationCard tienen `url="/despido-injustificado"` pero no existe el archivo `src/pages/despido-injustificado.astro`

**Solución:** Crear las páginas de servicios o cambiar a anchors (#) internos.

---

### 1.2 Estructura Single-Page Limitada

El sitio es 100% single-page (todo en index.astro), lo cual limita severamente las oportunidades SEO.

**Problemas:**

- No hay páginas individuales para servicios (despido injustificado, acoso laboral, horas extras, etc.)
- Cada servicio debería tener su propia página con contenido específico
- Imposible rankear para keywords de servicios específicos
- El sitemap solo tiene 1 URL

**Impacto:** Crítico  
**Solución:** Crear páginas individuales para cada servicio listedo en Situations.

---

## 2. ALTO - Problemas Técnicos SEO

### 2.1 Favicon PNG Faltantes

```html
<!-- En Layout.astro:74-76 -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```

**Archivos faltantes:**

- `/favicon-32x32.png` ❌ No existe
- `/favicon-16x16.png` ❌ No existe
- `/apple-touch-icon.png` ❌ No existe

**Impacto:** Medio  
**Evidencia:** `ls public/favicon* public/apple*`

**Solución:** Generar estos archivos o remover las referencias si no son necesarias.

---

### 2.2 Schema AggregateRating Sin Respaldo

```json
// En Layout.astro:168-174
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "5.0",
  "reviewCount": "150"
}
```

**Problema:** Google puede penalizar si el aggregateRating no está respaldado por reviews reales en Google Business Profile o fuente verificable.

**Impacto:** Alto  
**Solución:**

1. Vincular con Google Business Profile real
2. O agregar `reviewCount` en schema de Reviews reales
3. O agregar `star-rating` schema para las reseñas del sitio

---

### 2.3 Falta Schema de Reviews (Reviews sobre Testimonios)

Los testimonios reales en `Testimonials.astro` no tienen schema markup.

**Impacto:** Alto  
**Solución:** Agregar `Review` schema para cada testimonio:

```json
{
  "@context": "https://schema.org",
  "@type": "Review",
  "reviewRating": { "@type": "Rating", "ratingValue": "5" },
  "author": { "@type": "Person", "name": "Raúl P. Ramírez" },
  "reviewBody": "...",
  "itemReviewed": {
    "@type": "LegalService",
    "name": "GM Abogados Laboralistas"
  }
}
```

---

### 2.4 Schema LegalService - Dirección Incompleta

```json
// Layout.astro:113-118
"address": {
  "@type": "PostalAddress",
  "addressLocality": "Ciudad de México",
  "addressRegion": "CDMX",
  "addressCountry": "MX"
}
```

**Falta:**

- `streetAddress` (calle y número)
- `postalCode`
- `Cédula profesional` del abogado en schema

**Impacto:** Medio  
**Solución:** Agregar dirección completa.

---

### 2.5 Canonical en home page

```html
<link rel="canonical" href="https://gm-abogados.com.mx/" />
```

**Problema:** El canonical usa trailing slash, pero si hay variantes sin slash pueden generar duplicados.

**Impacto:** Bajo  
**Solución:** Verificar que todas las variantes redirijan a la versión canonical.

---

## 3. MEDIO - On-Page SEO

### 3.1 H1 Muy Largo

```html
<!-- Hero.astro:9 -->
<h1>Recupera tu <em>liquidación</em> sin arriesgar un peso</h1>
```

**Contador:** 61 caracteres (demasiado largo)

**Mejor práctica:** 50-60 caracteres

**Impacto:** Bajo-Medio  
**Solución:** Acortar a 50-60 caracteres.

---

### 3.2 H2 en Testimonios Sin Contenido Alternativo

```html
<!-- Testimonials.astro:33 -->
<h2>Trabajadores que ya recuperaron su liquidación</h2>
```

**Problema:** La sección muestra 3 testimonios específicos. Un usuario de búsqueda puede necesitar ver más reviews para confiar.

**Impacto:** Medio  
**Solución:** Considerar agregar link a "Ver más casos" o sección de reviews completa.

---

### 3.3 Título Duplicado en OG y Meta

| Meta Tag   | Contenido                                                      |
| ---------- | -------------------------------------------------------------- |
| `<title>`  | "GM Abogados Laboralistas CDMX \| Despido Injustificado y Más" |
| `og:title` | "GM Abogados Laboralistas CDMX \| +150 Casos Ganados"          |

**Problema:** Diferentes mensajes pueden causar confusión en compartidos sociales.

**Impacto:** Bajo  
**Solución:** Mantener consistencia o usar OG específico para redes.

---

### 3.4 Falta Privacy Policy y Términos

No hay páginas de:

- `/privacidad` o `/privacy-policy`
- `/terminos` o `/terms-of-service`

**Impacto:** Alto (afecta confianza y puede afectar rankings)  
**Requisito legal en México:** Requerido para cumplimiento de LFPDPPP

**Solución:** Crear estas páginas.

---

### 3.5 Footer Muy Minimalista

```html
<!-- Footer.astro:12-16 -->
const footerLinks = [ { label: "Servicios", href: "#situaciones" }, { label:
"FAQ", href: "#faq" }, { label: "Contacto", href: "#contacto" }, ];
```

**Problema:** No incluye links esenciales:

- Política de privacidad
- Términos y condiciones
- Aviso legal

**Impacto:** Medio  
**Solución:** Agregar links a páginas legales.

---

## 4. BAJO - Optimizaciones Adicionales

### 4.1 Preconnect Duplicado

```html
<!-- Layout.astro:86-88 -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

**Problema:** `https://fonts.gstatic.com` está duplicado.

**Impacto:** Bajo  
**Solución:** Remover uno de los preconnect duplicados.

---

### 4.2 OG Image Tamaño Grande

- Archivo: `og.webp` = 939KB
- Recomendado: < 200KB

**Impacto:** Velocidad de carga, rendimiento social  
**Solución:** Comprimir la imagen OG.

---

### 4.3 Falta hreflang x-default

```html
<link rel="alternate" hreflang="es-mx" href="https://gm-abogados.com.mx/" />
<link rel="alternate" hreflang="es" href="https://gm-abogados.com.mx/" />
```

**Mejor práctica:** Agregar `hreflang="x-default"` para flexibilidad.

---

### 4.4 Meta Keywords Obsoleto

No hay meta keywords tag. Para sitios modernos ya no es necesario, pero podría agregarse para categorización interna.

**Impacto:** Muy bajo  
**Nota:** Google no usa keywords para ranking desde 2009.

---

## 5. FALTANTE - Contenido y Estructura

### 5.1 No Hay Blog/Recursos

**Impacto:** Alto - Oportunidad perdida de contenido

**Recomendación:** Agregar sección de blog con artículos como:

- "¿Cuánto me corresponde por despido?"
- "Diferencia entre despido y renuncia"
- "Cómo demandar sin abogado"

---

### 5.2 No Hay Breadcrumbs

El sitio single-page no tiene breadcrumb navigation.

**Impacto:** Medio  
**Nota:** Breadcrumbs son importantes para SEO local y navegación de servicios.

---

### 5.3 Falta About Page

No hay página "Sobre Nosotros" con:

- Historia del despacho
- Credenciales del abogado
- Fotos reales del equipo
- Ubicación física

**Impacto:** Medio  
**E-E-A-T:** Google valora Authoritativeness y Trustworthiness.

---

## 6. Checklist de Implementación

### Prioridad 1 - CRÍTICO

- [x] **Crear páginas de servicios** ✅ (`/servicios/despido-injustificado`, `/servicios/acoso-laboral`, `/servicios/horas-extras`, `/servicios/falta-contrato`, `/servicios/accidente-laboral`)
- [x] **Fix links rotos** en SituationCard ✅ (ahora apuntan a las nuevas páginas de servicios)

### Prioridad 2 - ALTO

- [ ] **Generar favicon PNGs faltantes** o remover referencias
- [x] **Agregar pages de Privacy Policy y Terms** ✅ (`/legal/privacy-policy`, `/legal/terms`)
- [ ] **Agregar Schema de Reviews** para testimonios
- [ ] **Verificar AggregateRating** con fuente real o remover

### Prioridad 3 - MEDIO

- [x] **Meta tags armonizados** ✅ (title, og:title, twitter:title y descriptions ahora son consistentes)
- [ ] **Completar address en LegalService schema**
- [ ] **Crear About page** con credenciales
- [x] **Agregar blog/sección de recursos**
- [x] **Comprimir OG image** ✅ (939KB → 49KB)
- [ ] **Acortar H1** a 50-60 caracteres

### Prioridad 4 - BAJO

- [x] **Remover preconnect duplicado** de Google Fonts
- [ ] **Agregar hreflang x-default**
- [ ] **Consolidar meta titles** (OG y regular)

---

## 7. Sitemap XML Actual

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://gm-abogados.com.mx/</loc>
    <lastmod>2026-03-29T04:26:13.208Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

**Problema:** Solo 1 URL. El sitemap crecerá automáticamente cuando se agreguen más páginas.

---

## 8. Lo Que Está Bien ✅

- ✅ **Sitemap configurado** correctamente con @astrojs/sitemap
- ✅ **robots.txt** correctamente configurado
- ✅ **Meta tags completos** (title, description, robots)
- ✅ **hreflang tags** para español-méxico
- ✅ **Open Graph tags** completos y correctos
- ✅ **Twitter Cards** configurados
- ✅ **Schema LegalService** con datos básicos
- ✅ **Schema FAQPage** implementado
- ✅ **Geo tags** para SEO local
- ✅ **Favicon SVG** presente
- ✅ **Canonical URL** configurado
- ✅ **Theme color** para móviles
- ✅ **Preconnect** para Google Fonts
- ✅ **DNS prefetch** para Google Analytics
- ✅ **Responsive design** bien implementado
- ✅ **Meta viewport** correcto
- ✅ **Content-Type charset** UTF-8

---

## Próximos Pasos Recomendados

1. **Inmediato:** Crear páginas de servicios para capturar keywords específicas
2. **Corto plazo:** Agregar páginas legales (privacidad, términos)
3. **Mediano plazo:** Implementar blog con contenido evergreen
4. **Largo plazo:** Construir perfil de backlinks y presencia en directorios legales

---

_Reporte generado: 2026-03-30_
