# GM Abogados - Análisis de Mejoras y Refactors

## Resumen del Proyecto

- **Framework**: Astro 5 + Svelte 5 + TypeScript
- **Estilo**: CSS vanilla (custom properties)
- **Deployment**: Netlify

---

## 1. Código Muerto / Archivos No Utilizados

| Archivo                   | Problema                                    | Acción Sugerida |
| ------------------------- | ------------------------------------------- | --------------- |
| `src/lib/email.ts`        | No se importa en ningún lugar del proyecto. | Eliminar        |
| `src/lib/emailService.ts` | No se importa en ningún lugar.              | Eliminar        |

---

## 2. Duplicación de Estilos [x]

Los componentes `.gm-field-group` con label/input/select se repiten en:

- `src/components/common/svelte/Field.svelte`
- `src/components/common/svelte/FieldSelect.svelte`
- `src/components/calculadora/Calculator.svelte` (líneas 162-195)

**Refactor sugerido**: Extraer a un componente compartido o CSS reutilizable.

---

## 3. Schema.org Hardcodeado en Layout [x]

- **Hecho**: `src/data/schema/legalService.ts` (LegalService), `src/data/schema/faqPage.ts` (FAQPage + datos `homeFaqForSchema`), barrel `src/data/schema/index.ts`. `Layout.astro` solo serializa con `JSON.stringify`.

---

## 4. Valores Hardcodeados [x]

- **Hecho**: `src/config/site.ts` con origen, contacto, SEO por defecto, geo y textos compartidos con schema; `absoluteUrl()` y `whatsappUrl()`. JSON-LD en `src/data/schema/` (punto 3). Consumen `Layout.astro`, `utils/index.ts` (`gmBrand` / `gmLinks`, plantilla de email), `Contact.astro`, `Nav.astro` y canonical en `servicios/[servicio].astro`.

---

## 5. Falta Mobile Menu [x]

- **Hecho**: Drawer desde la derecha (≤900px) con enlaces, teléfono y CTA; backdrop, Escape, bloqueo de scroll y estado `aria` / `inert`.

---

## 6. SEO: Meta Tags Duplicados/Obsoletos [x]

En `src/layouts/Layout.astro`:

- `X-UA-Compatible` (línea 28) - obsoleto
- `handheldFriendly`, `MobileOptimized` (líneas 87-88) - obsoletos
- `dns-prefetch` a google-analytics (línea 99) sin que se use GA

**Acción sugerida**: Limpiar meta tags obsoletos.

---

## 7. Content Collections no Utilizadas

- `src/content/services.ts` y FAQ están definidos como arrays en archivos `.astro`
- Astro tiene **Content Collections** para mejor tipado y validación.

**Refactor sugerido**: Migrar a Content Collections

---

## 8. Fonts: Mezcla de Fuentes [x]

- `Layout.astro:96` carga DM Sans y Playfair Display desde Google Fonts
- `package.json` instala `@fontsource-variable/inter` y `merriweather` (nunca usados)

**Refactor sugerido**: Usar solo una fuente (eliminar la no utilizada).

---

## 9. Sin Tests ni Linting Configurado

- No hay scripts de test en `package.json`
- ESLint está instalado pero no se usa en el workflow.

**Acción sugerida**: Configurar scripts de lint/typecheck en package.json.

---

## Priorización Sugerida

| Prioridad    | Tarea                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------- |
| 🔴 Alta      | Eliminar código muerto (useContactForm.ts, email.ts, emailService.ts, componentes no usados) |
| ~~🔴 Alta~~  | ~~Implementar mobile menu en Nav~~ (hecho)                                                   |
| ~~🟡 Media~~ | ~~Extraer JSON-LD a archivos de datos~~ (hecho → `src/data/schema/`)                         |
| ~~🟡 Media~~ | ~~Centralizar constantes en config~~ (hecho → `src/config/site.ts`)                          |
| 🟡 Media     | Consolidar estilos de campos                                                                 |
| 🟢 Baja      | Limpiar meta tags obsoletos                                                                  |
| 🟢 Baja      | Eliminar fonts no usadas                                                                     |

---

## Componentes Pendientes de Análisis

- [ ] `src/components/situations/`
- [ ] `src/components/testimonials/`
- [ ] `src/components/trust-bar/`
- [ ] `src/components/icons/`
- [ ] `src/pages/servicios/[servicio].astro`
- [ ] `src/pages/legal/terminos.astro`
- [ ] `src/pages/legal/privacidad.astro`
- [ ] `src/pages/api/email.ts`
