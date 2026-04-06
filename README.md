# GM Abogados

Sitio web corporativo para firma de abogados laborales en CDMX, México. Especializados en derecho laboral mexicano.

## Stack

- **Framework**: Astro 5.x (SSR + Netlify adapter)
- **UI Components**: Svelte 5 para componentes interactivos
- **Styling**: CSS custom properties
- **Email**: Resend API
- **Deploy**: Netlify

## Secciones

- Hero con CTA urgency
- Trust bar (estadísticas)
- Situaciones que cubren
- Por qué elegirnos
- Calculadora de indemnización (Svelte)
- Testimonios
- FAQ dinámico
- Formulario de contacto
- WhatsApp flotante

## Servicios Legales

1. Despido Injustificado (Art. 48 LFT)
2. Acoso Laboral (Art. 3° Bis LFT)
3. Horas Extras (Art. 67-68 LFT)
4. Falta de Contrato (Art. 25 LFT)
5. Accidente Laboral (Art. 473 LFT)

## Development

```bash
pnpm install
pnpm dev      # localhost:4321
pnpm build    # producción
pnpm preview  # preview build
```

## Estructura

```
src/
├── pages/           # Rutas: index, legal/*, servicios/[servicio]
├── components/      # 13 secciones modulares
├── layouts/         # Layout principal
├── content/         # Datos de servicios
├── lib/             # emailService.ts
├── styles/          # global.css
└── utils/           # Observer utilities
```

## SEO

- Sitemap dinámico
- Meta tags por página
- Schema markup
- Open Graph images
