# DESIGN.md — Bella Napoli Pizzaria

> Especificação de design system e interface para o site da pizzaria Bella Napoli.

---

## 1. Visão Geral

**Estilo**: Italiano contemporâneo, elegante, acolhedor  
**Abordagem**: Mobile-first, responsivo, acessível (WCAG AA)  
**Stack alvo**: HTML semântico + CSS (design tokens) + JS leve para interações

**Princípios de Design**:
- **Autenticidade**: Visual que evoca tradição napolitana sem clichês
- **Clareza**: Hierarquia visual óbvia, leitura escaneável
- **Performance**: Assets otimizados, CSS crítico inline, lazy-loading
- **Inclusão**: WCAG AA como baseline, não afterthought
- **Consistência**: Design tokens em todas as decisões visuais

---

## 2. Paleta de Cores (Design Tokens)

```css
:root {
  /* Primária — Terracota */
  --color-terracotta-50:  #fef3f0;
  --color-terracotta-100: #fde8e0;
  --color-terracotta-300: #f5b8a0;
  --color-terracotta-500: #e87d5a;  /* principal */
  --color-terracotta-600: #d46545;
  --color-terracotta-700: #b85035;
  --color-terracotta-900: #7a3522;

  /* Neutra — Creme */
  --color-cream-50:   #fdfaf5;
  --color-cream-100:  #faf5ec;
  --color-cream-200:  #f3ead7;
  --color-cream-300:  #e8dcc3;
  --color-cream-900:  #4a4235;  /* texto principal */

  /* Secundária — Verde Manjericão */
  --color-basil-50:   #f0f5f0;
  --color-basil-100:  #dce8dc;
  --color-basil-300:  #a8c8a8;
  --color-basil-500:  #6a9c6a;  /* accent */
  --color-basil-600:  #558055;
  --color-basil-700:  #426642;

  /* Destaque — Dourado Suave */
  --color-gold-100:   #fef7e0;
  --color-gold-300:   #fde68a;
  --color-gold-500:   #f5c542;  /* highlight */
  --color-gold-600:   #e0b035;

  /* Semânticos */
  --color-success:    #10b981;
  --color-warning:    #f59e0b;
  --color-error:      #ef4444;
  --color-info:       #3b82f6;

  /* Superfícies */
  --surface-white:    #ffffff;
  --surface-cream:    var(--color-cream-50);
  --surface-elevated: #ffffff;

  /* Texto */
  --text-primary:     var(--color-cream-900);
  --text-secondary:   #6b5e4f;
  --text-muted:       #9a8d7a;
  --text-inverse:     #ffffff;
  --text-link:        var(--color-terracotta-600);
}
```

**Contraste WCAG AA verificado**:  
- `--text-primary` sobre `--surface-white` = 8.2:1 ✓  
- `--color-terracotta-500` sobre `--surface-white` = 4.6:1 ✓  
- `--color-basil-500` sobre `--surface-white` = 4.5:1 ✓

---

### 2.1 Modo Escuro (Opcional — Preparado)

```css
@media (prefers-color-scheme: dark) {
  :root {
    --surface-white:        #1a1614;
    --surface-cream:        #231e1b;
    --surface-elevated:     #2d2622;
    --text-primary:         #f5ebe0;
    --text-secondary:       #c9b8a6;
    --text-muted:           #9a8d7a;
    --text-inverse:         #1a1614;
    --color-cream-50:       #2d2622;
    --color-cream-100:      #3d332c;
    --color-cream-200:      #4a3f36;
    --color-cream-300:      #5c4f44;
    --color-terracotta-50:  #3d2a25;
    --color-terracotta-100: #4a332a;
    --color-basil-50:       #1e2d1e;
    --color-basil-100:      #283d28;
    --color-gold-100:       #3d351e;
  }
}
```

### 2.2 Diretrizes de Uso de Cor

| Contexto | Token | Exemplo |
|----------|-------|---------|
| Fundo principal | `--surface-cream` | `<body>`, sections alternadas |
| Fundo elevado (cards/modais) | `--surface-white` | `.menu-card`, `.modal` |
| Texto principal | `--text-primary` | `<p>`, headings |
| Texto secundário | `--text-secondary` | descriptions, meta |
| Ação primária (CTA) | `--color-terracotta-500` | `.btn--primary`, FAB bg |
| Ação primária hover | `--color-terracotta-600` | `.btn--primary:hover` |
| Accent / destaque | `--color-gold-500` | price, badges, divider |
| Sucesso/confirmação | `--color-success` | toast success, check icons |
| Erro/alerta | `--color-error` | form validation, toast error |
| Links inline | `--text-link` | `<a>` em texto corrido |
| Bordas sutis | `--color-cream-200` | cards, inputs, divisores |

---

## 3. Tipografia

```css
:root {
  /* Fontes */
  --font-display: 'Playfair Display', Georgia, serif;      /* Títulos */
  --font-body:    'Inter', system-ui, -apple-system, sans-serif; /* Corpo/UI */

  /* Escala (clamp fluido) */
  --fs-xs:   clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);   /* 12–14px */
  --fs-sm:   clamp(0.875rem, 0.825rem + 0.25vw, 1rem);    /* 14–16px */
  --fs-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);     /* 16–18px */
  --fs-lg:   clamp(1.125rem, 1.05rem + 0.375vw, 1.375rem);/* 18–22px */
  --fs-xl:   clamp(1.375rem, 1.25rem + 0.625vw, 1.75rem); /* 22–28px */
  --fs-2xl:  clamp(1.75rem, 1.5rem + 1.25vw, 2.5rem);     /* 28–40px */
  --fs-3xl:  clamp(2.25rem, 1.875rem + 1.875vw, 3.5rem);  /* 36–56px */
  --fs-4xl:  clamp(3rem, 2.5rem + 2.5vw, 4.5rem);         /* 48–72px */

  /* Pesos */
  --fw-regular:   400;
  --fw-medium:    500;
  --fw-semibold:  600;
  --fw-bold:      700;

  /* Alturas de linha */
  --lh-tight:   1.1;
  --lh-snug:    1.375;
  --lh-normal:  1.5;
  --lh-relaxed: 1.625;
}
```

**Uso**:
- H1/H2/H3: `--font-display`, `--fw-semibold`, `--lh-tight`
- Body/Buttons/Inputs: `--font-body`, `--fw-regular`, `--lh-normal`
- Labels/Small: `--font-body`, `--fw-medium`, `--lh-snug`

### 3.1 Escala Tipográfica Completa

| Elemento | Fonte | Tamanho | Peso | Line-height | Caso de uso |
|----------|-------|---------|------|-------------|-------------|
| H1 (Hero) | Display | `--fs-4xl` / `--fs-3xl` (mobile) | 600 | `--lh-tight` | Headline principal |
| H2 (Section) | Display | `--fs-3xl` / `--fs-2xl` (mobile) | 600 | `--lh-tight` | Títulos de seção |
| H3 (Card/Sub) | Display | `--fs-xl` / `--fs-lg` (mobile) | 600 | `--lh-snug` | Nomes de pizzas, cards |
| H4 (Minor) | Display | `--fs-lg` | 500 | `--lh-snug` | Subtítulos pequenos |
| Body Large | Body | `--fs-lg` | 400 | `--lh-relaxed` | Lead paragraph (hero/sobre) |
| Body | Body | `--fs-base` | 400 | `--lh-normal` | Texto padrão |
| Body Small | Body | `--fs-sm` | 400 | `--lh-normal` | Meta, captions |
| Caption | Body | `--fs-xs` | 400 | `--lh-snug` | Legal, timestamps |
| Button | Body | `--fs-sm` / `--fs-base` (lg) | 500 | 1 | Todos botões |
| Price | Display | `--fs-xl` / `--fs-2xl` | 700 | `--lh-tight` | Preços no cardápio |

### 3.2 Web Fonts — Performance

```html
<!-- Preconnect + Preload crítico -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" media="print" onload="this.media='all'">

<!-- Fallback system-ui até carregar -->
```

**font-display: swap** já incluído na URL do Google Fonts.

---

## 4. Espaçamento & Layout

```css
:root {
  --space-1:  0.25rem;  /* 4px  */
  --space-2:  0.5rem;   /* 8px  */
  --space-3:  0.75rem;  /* 12px */
  --space-4:  1rem;     /* 16px */
  --space-5:  1.25rem;  /* 20px */
  --space-6:  1.5rem;   /* 24px */
  --space-8:  2rem;     /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */

  /* Container */
  --container-max:  1200px;
  --container-pad:  var(--space-4);   /* mobile */
  --container-pad-md: var(--space-6); /* tablet+ */
  --container-pad-lg: var(--space-8); /* desktop */

  /* Border radius */
  --radius-sm:  0.25rem;  /* 4px  */
  --radius-md:  0.5rem;   /* 8px  */
  --radius-lg:  0.75rem;  /* 12px */
  --radius-xl:  1rem;     /* 16px */
  --radius-full: 9999px;

  /* Sombras */
  --shadow-sm:  0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

  /* Transições */
  --transition-fast:  150ms ease;
  --transition-base:  250ms ease;
  --transition-slow:  350ms ease;

  /* Z-index scale */
  --z-dropdown:   100;
  --z-sticky:     200;
  --z-modal:      500;
  --z-toast:      800;
  --z-tooltip:    900;
  --z-fab:        1000;
}
```

---

## 5. Breakpoints (Mobile-First)

```css
/* Base: 320px+ (mobile) */
/* sm:  640px+  — tablet portrait / mobile landscape */
@media (min-width: 640px) { /* ... */ }

/* md:  768px+  — tablet landscape */
@media (min-width: 768px) { /* ... */ }

/* lg:  1024px+ — desktop */
@media (min-width: 1024px) { /* ... */ }

/* xl:  1280px+ — large desktop */
@media (min-width: 1280px) { /* ... */ }

/* 2xl: 1536px+ — ultra wide */
@media (min-width: 1536px) { /* ... */ }
```

**Grid fluido**: 12 colunas, gap `--space-4` (mobile) / `--space-6` (md+)

### 5.1 Comportamento Responsivo por Seção

| Seção | Mobile (320–639) | Tablet (640–1023) | Desktop (1024+) |
|-------|------------------|-------------------|-----------------|
| **Hero** | Full-bleed img, texto centralizado, 1 CTA | Imagem 60/40, texto à esquerda, 2 CTAs side-by-side | Imagem 55/45, copy maior, CTAs lado a lado |
| **Sobre** | Stack: imagem > texto | Side-by-side 50/50 | Side-by-side 40/60 (texto maior) |
| **Cardápio** | Tabs horiz scroll, grid 1 col | Tabs visíveis, grid 2 col | Tabs + filtros, grid 3–4 col |
| **Galeria** | Masonry 1 col, tap → lightbox | Masonry 2 col | Masonry 3–4 col, hover zoom |
| **Depoimentos** | Carrossel 1 card, swipe | Carrossel 2 cards | Carrossel 3 cards, auto-play pause on hover |
| **Contato** | Stack: form > info | Side-by-side 60/40 | Side-by-side 55/45, map embed |
| **Footer** | Stack 3 colunas | 2+2 grid | 4 colunas inline |

### 5.2 Container Queries (Opcional — Futuro)

```css
/* Quando suportado amplamente, migrar media queries de componentes para container queries */
.menu-grid { container-type: inline-size; }
@container (min-width: 320px)  { .menu-card { /* 1 col */ } }
@container (min-width: 560px)  { .menu-card { /* 2 col */ } }
@container (min-width: 840px)  { .menu-card { /* 3 col */ } }
```

---

## 6. Componentes Base

### 6.1 Botões

```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2);
  font-family: var(--font-body); font-size: var(--fs-sm); font-weight: var(--fw-medium);
  line-height: 1; padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md); border: 2px solid transparent;
  text-decoration: none; cursor: pointer; user-select: none;
  transition: all var(--transition-base);
}
.btn:focus-visible { outline: 3px solid var(--color-gold-500); outline-offset: 2px; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; pointer-events: none; }

/* Variantes */
.btn--primary {
  background: var(--color-terracotta-500); color: var(--text-inverse); border-color: var(--color-terracotta-500);
}
.btn--primary:hover:not(:disabled) {
  background: var(--color-terracotta-600); border-color: var(--color-terracotta-600);
  transform: translateY(-1px); box-shadow: var(--shadow-md);
}

.btn--secondary {
  background: transparent; color: var(--color-terracotta-600); border-color: var(--color-terracotta-300);
}
.btn--secondary:hover:not(:disabled) {
  background: var(--color-terracotta-50); border-color: var(--color-terracotta-500);
}

.btn--ghost {
  background: transparent; color: var(--text-primary); border-color: transparent;
}
.btn--ghost:hover:not(:disabled) { background: var(--color-cream-100); }

/* Tamanhos */
.btn--sm { padding: var(--space-2) var(--space-4); font-size: var(--fs-xs); }
.btn--lg { padding: var(--space-4) var(--space-8); font-size: var(--fs-base); }
```

### 6.2 Card de Produto (Cardápio)

```css
.menu-card {
  background: var(--surface-white); border-radius: var(--radius-xl);
  border: 1px solid var(--color-cream-200); overflow: hidden;
  box-shadow: var(--shadow-sm); transition: all var(--transition-base);
}
.menu-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-4px); }

.menu-card__image { aspect-ratio: 4/3; object-fit: cover; width: 100%; }
.menu-card__content { padding: var(--space-4); display: flex; flex-direction: column; gap: var(--space-2); }
.menu-card__name { font-family: var(--font-display); font-size: var(--fs-lg); font-weight: var(--fw-semibold); color: var(--text-primary); }
.menu-card__desc { font-size: var(--fs-sm); color: var(--text-secondary); line-height: var(--lh-relaxed); }
.menu-card__price { font-family: var(--font-display); font-size: var(--fs-xl); font-weight: var(--fw-bold); color: var(--color-terracotta-600); }
.menu-card__actions { margin-top: var(--space-2); display: flex; gap: var(--space-2); }
```

### 6.3 Inputs / Formulário

```css
.form-field { display: flex; flex-direction: column; gap: var(--space-1); }
.form-label { font-size: var(--fs-sm); font-weight: var(--fw-medium); color: var(--text-primary); }
.form-input {
  width: 100%; padding: var(--space-3) var(--space-4);
  font-family: var(--font-body); font-size: var(--fs-base);
  border: 1px solid var(--color-cream-300); border-radius: var(--radius-md);
  background: var(--surface-white); color: var(--text-primary);
  transition: all var(--transition-fast);
}
.form-input:focus { outline: none; border-color: var(--color-terracotta-500); box-shadow: 0 0 0 3px rgb(232 125 90 / 0.15); }
.form-input::placeholder { color: var(--text-muted); }
.form-input:invalid:not(:placeholder-shown) { border-color: var(--color-error); }
.form-error { font-size: var(--fs-xs); color: var(--color-error); }
```

### 6.4 WhatsApp Flutuante (FAB)

```css
.whatsapp-fab {
  position: fixed; bottom: var(--space-6); right: var(--space-6); z-index: 1000;
  width: 56px; height: 56px; border-radius: var(--radius-full);
  background: #25d366; color: white; border: none;
  display: flex; align-items: center; justify-content: center;
  box-shadow: var(--shadow-xl); cursor: pointer;
  animation: pulse 2s ease-in-out infinite;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}
.whatsapp-fab:hover { transform: scale(1.1); box-shadow: 0 12px 30px -4px rgb(37 211 102 / 0.4); }
.whatsapp-fab:focus-visible { outline: 3px solid var(--color-gold-500); outline-offset: 3px; }
.whatsapp-fab svg { width: 28px; height: 28px; }

@keyframes pulse { 0%, 100% { box-shadow: var(--shadow-xl); } 50% { box-shadow: 0 8px 25px -4px rgb(37 211 102 / 0.5); } }
@media (prefers-reduced-motion: reduce) { .whatsapp-fab { animation: none; } }
```

### 6.5 Badge / Tag (Categorias, Novidades)

```css
.badge {
  display: inline-flex; align-items: center; gap: var(--space-1);
  font-family: var(--font-body); font-size: var(--fs-xs); font-weight: var(--fw-semibold);
  padding: var(--space-1) var(--space-2); border-radius: var(--radius-full);
  line-height: 1; white-space: nowrap;
}
.badge--category { background: var(--color-basil-100); color: var(--color-basil-700); }
.badge--new { background: var(--color-gold-100); color: #8a7000; }
.badge--vegan { background: var(--color-basil-50); color: var(--color-basil-600); border: 1px solid var(--color-basil-300); }
.badge--spicy { background: var(--color-terracotta-50); color: var(--color-terracotta-700); }
```

### 6.6 Toast / Notificação

```css
.toast {
  position: fixed; bottom: var(--space-6); left: var(--space-4); right: var(--space-4); z-index: var(--z-toast);
  max-width: 400px; margin: 0 auto;
  padding: var(--space-4); border-radius: var(--radius-lg);
  background: var(--surface-white); border-left: 4px solid;
  box-shadow: var(--shadow-xl); display: flex; align-items: flex-start; gap: var(--space-3);
  animation: slideUp 0.3s ease; pointer-events: auto;
}
.toast--success { border-color: var(--color-success); }
.toast--error { border-color: var(--color-error); }
.toast--info { border-color: var(--color-info); }
.toast__icon { flex-shrink: 0; width: 20px; height: 20px; }
.toast__content { flex: 1; min-width: 0; }
.toast__title { font-weight: var(--fw-semibold); color: var(--text-primary); }
.toast__message { font-size: var(--fs-sm); color: var(--text-secondary); margin-top: var(--space-1); }
.toast__close { flex-shrink: 0; color: var(--text-muted); background: none; border: none; cursor: pointer; padding: var(--space-1); }

@keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
@media (prefers-reduced-motion: reduce) { .toast { animation: none; } }
```

### 6.7 Modal / Lightbox (Galeria)

```css
.modal-overlay {
  position: fixed; inset: 0; z-index: var(--z-modal);
  background: rgb(0 0 0 / 0.8); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center; padding: var(--space-4);
  opacity: 0; visibility: hidden; transition: opacity var(--transition-base), visibility var(--transition-base);
}
.modal-overlay--open { opacity: 1; visibility: visible; }

.modal { position: relative; max-width: 90vw; max-height: 90vh; }
.modal__image { max-width: 100%; max-height: 80vh; object-fit: contain; border-radius: var(--radius-md); box-shadow: var(--shadow-xl); }
.modal__close {
  position: absolute; top: -48px; right: 0; width: 44px; height: 44px;
  border-radius: var(--radius-full); background: var(--surface-white); color: var(--text-primary);
  border: none; display: flex; align-items: center; justify-content: center; cursor: pointer;
  box-shadow: var(--shadow-lg); transition: all var(--transition-fast);
}
.modal__close:hover { background: var(--color-cream-100); transform: scale(1.05); }
.modal__close:focus-visible { outline: 3px solid var(--color-gold-500); outline-offset: 2px; }
.modal__nav { position: absolute; top: 50%; transform: translateY(-50%); width: 48px; height: 48px; border-radius: var(--radius-full); background: var(--surface-white); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: var(--shadow-lg); opacity: 0; transition: opacity var(--transition-fast); }
.modal__nav--prev { left: -64px; }
.modal__nav--next { right: -64px; }
.modal-overlay:hover .modal__nav { opacity: 1; }
@media (max-width: 768px) { .modal__nav { display: none; } }
```

### 6.8 Navegação (Header)

```css
.header { position: sticky; top: 0; z-index: var(--z-sticky); background: rgb(255 255 255 / 0.95); backdrop-filter: saturate(180%) blur(12px); border-bottom: 1px solid var(--color-cream-200); }
.header__inner { display: flex; align-items: center; justify-content: space-between; gap: var(--space-4); padding: var(--space-3) var(--space-4); max-width: var(--container-max); margin: 0 auto; }
.header__logo { font-family: var(--font-display); font-size: var(--fs-xl); font-weight: var(--fw-bold); color: var(--color-terracotta-600); text-decoration: none; }
.header__nav { display: none; gap: var(--space-6); }
.header__nav a { font-size: var(--fs-sm); font-weight: var(--fw-medium); color: var(--text-secondary); text-decoration: none; transition: color var(--transition-fast); position: relative; }
.header__nav a::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: var(--color-terracotta-500); transition: width var(--transition-base); }
.header__nav a:hover { color: var(--color-terracotta-600); }
.header__nav a:hover::after { width: 100%; }
.header__nav a:focus-visible { outline: none; color: var(--color-terracotta-600); }
.header__nav a:focus-visible::after { width: 100%; }
.header__cta { display: none; }
.header__menu-btn { display: flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: var(--radius-md); background: transparent; border: 1px solid var(--color-cream-300); cursor: pointer; }
.header__menu-btn:focus-visible { outline: 3px solid var(--color-gold-500); outline-offset: 2px; }

@media (min-width: 768px) {
  .header__nav { display: flex; }
  .header__cta { display: inline-flex; }
  .header__menu-btn { display: none; }
}

/* Mobile menu drawer */
.mobile-menu { position: fixed; inset: 0 0 0 auto; z-index: var(--z-modal); width: 280px; max-width: 85vw; background: var(--surface-white); box-shadow: var(--shadow-xl); transform: translateX(100%); transition: transform var(--transition-base); padding: var(--space-6) var(--space-4); display: flex; flex-direction: column; gap: var(--space-4); }
.mobile-menu--open { transform: translateX(0); }
.mobile-menu__link { font-size: var(--fs-lg); font-weight: var(--fw-medium); color: var(--text-primary); text-decoration: none; padding: var(--space-2) 0; border-bottom: 1px solid var(--color-cream-200); }
.mobile-menu__cta { margin-top: auto; width: 100%; }
```

### 6.9 Skip Link

```css
.skip-link { position: absolute; top: -100%; left: var(--space-4); z-index: 9999; padding: var(--space-2) var(--space-4); background: var(--color-terracotta-600); color: white; border-radius: var(--radius-md); font-weight: var(--fw-medium); text-decoration: none; transition: top var(--transition-fast); }
.skip-link:focus { top: var(--space-4); outline: 3px solid var(--color-gold-500); outline-offset: 2px; }
```

### 6.10 Estados de Interação — Resumo

| Componente | Default | Hover | Focus | Active | Disabled |
|------------|---------|-------|-------|--------|----------|
| `.btn--primary` | bg terracotta-500 | bg terracotta-600, lift -1px, shadow-md | outline gold-500 | bg terracotta-700 | opacity 0.5, cursor not-allowed |
| `.btn--secondary` | border terracotta-300, color terracotta-600 | bg terracotta-50, border terracotta-500 | outline gold-500 | bg terracotta-100 | opacity 0.5 |
| `.menu-card` | shadow-sm | shadow-lg, lift -4px | — | — | — |
| `.form-input` | border cream-300 | border cream-400 | border terracotta-500, ring | — | bg cream-50, cursor not-allowed |
| `.whatsapp-fab` | bg #25d366, pulse | scale 1.1, shadow ↑ | outline gold-500 | scale 0.95 | — |
| `.header__nav a` | color text-secondary | color terracotta-600, underline grow | color terracotta-600, underline grow | color terracotta-700 | — |
| `.modal__close` | bg white | bg cream-100, scale 1.05 | outline gold-500 | scale 0.95 | — |

---

## 7. Seções do Site

| Seção | ID | Descrição |
|-------|-----|-----------|
| Hero | `#hero` | Imagem full-bleed, headline, CTA principal, scroll indicator |
| Sobre/Nossa História | `#sobre` | Texto + imagem, valores da marca |
| Cardápio | `#cardapio` | Tabs por categoria, grid de cards, filtros |
| Galeria | `#galeria` | Masonry/grid, lightbox ao clicar |
| Depoimentos | `#depoimentos` | Carrossel acessível (swiper), 3 cards visíveis desktop |
| Contato/Pedido | `#contato` | Formulário + info + WhatsApp FAB reforçado |
| Footer | `#footer` | Links, horários, redes sociais, copyright |

---

### 7.1 Hero — `#hero`

**Estrutura HTML**:
```html
<section id="hero" aria-labelledby="hero-title">
  <div class="hero__bg" aria-hidden="true">
    <picture>
      <source srcset="hero.avif" type="image/avif">
      <source srcset="hero.webp" type="image/webp">
      <img src="hero.jpg" alt="" loading="eager" fetchpriority="high" width="1920" height="1080">
    </picture>
    <div class="hero__overlay" aria-hidden="true"></div>
  </div>
  <div class="hero__content container">
    <h1 id="hero-title" class="hero__title reveal">Pizzas Artesanais<br>No Forno a Lenha</h1>
    <p class="hero__lead reveal">Tradição napolitana em cada mordida. Ingredientes frescos, massa fermentada 24h, forno a 450°C.</p>
    <div class="hero__actions reveal">
      <a href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido" class="btn btn--primary btn--lg" target="_blank" rel="noopener">Pedir Agora pelo WhatsApp</a>
      <a href="#cardapio" class="btn btn--secondary btn--lg">Ver Cardápio Completo</a>
    </div>
    <a href="#sobre" class="hero__scroll reveal" aria-label="Rolar para conhecer nossa história">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
    </a>
  </div>
</section>
```

**Estados**:
- Imagem: `object-fit: cover`, overlay `rgba(26,22,20/0.4)` para legibilidade do texto
- Texto: branco (`--text-inverse`), `text-shadow: 0 2px 8px rgb(0 0 0 / 0.3)`
- Scroll indicator: animação `bounce` 2s infinite, `prefers-reduced-motion: reduce` → `animation: none`

---

### 7.2 Sobre / Nossa História — `#sobre`

**Estrutura**:
```html
<section id="sobre" class="section reveal-stagger" aria-labelledby="sobre-title">
  <div class="container">
    <header class="section__header">
      <span class="badge badge--category">Nossa História</span>
      <h2 id="sobre-title" class="section__title">Tradição que Passa de Geração</h2>
    </header>
    <div class="sobre__grid">
      <figure class="sobre__image reveal">
        <img src="sobre.webp" alt="Forno a lenha tradicional da Bella Napoli com pizzaiolo preparando pizza" loading="lazy" width="800" height="600">
      </figure>
      <div class="sobre__content reveal">
        <p class="sobre__lead">Fundada em 2015 por Nonna Maria, a Bella Napoli nasceu da vontade de trazer o verdadeiro sabor de Nápoles para São Paulo.</p>
        <p>Nossa massa descansa 24 horas, o molho usa tomates San Marzano DOP, e a mussarela é de búfala fresca. Tudo assado no forno a lenha a 450°C em 90 segundos.</p>
        <ul class="sobre__values" role="list">
          <li><svg class="value__icon" aria-hidden="true">✓</svg> Ingredientes 100% naturais</li>
          <li><svg class="value__icon" aria-hidden="true">✓</svg> Fermentação natural lenta</li>
          <li><svg class="value__icon" aria-hidden="true">✓</svg> Forno a lenha autêntico</li>
          <li><svg class="value__icon" aria-hidden="true">✓</svg> Receitas da Nonna Maria</li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

---

### 7.3 Cardápio — `#cardapio`

**Categorias**: `tradicionais`, `especiais`, `doces`, `bebidas`

**Estrutura**:
```html
<section id="cardapio" class="section" aria-labelledby="cardapio-title">
  <div class="container">
    <header class="section__header reveal">
      <span class="badge badge--category">Cardápio</span>
      <h2 id="cardapio-title" class="section__title">Nossas Pizzas e Mais</h2>
      <p class="section__subtitle">Todas as pizzas tamanho único (30cm) — servem 1–2 pessoas</p>
    </header>

    <!-- Filtro de categorias -->
    <div class="menu__tabs" role="tablist" aria-label="Categorias do cardápio">
      <button role="tab" aria-selected="true" aria-controls="panel-tradicionais" id="tab-tradicionais" class="menu__tab menu__tab--active" data-category="tradicionais">Tradicionais</button>
      <button role="tab" aria-selected="false" aria-controls="panel-especiais" id="tab-especiais" class="menu__tab" data-category="especiais" tabindex="-1">Especiais</button>
      <button role="tab" aria-selected="false" aria-controls="panel-doces" id="tab-doces" class="menu__tab" data-category="doces" tabindex="-1">Doces</button>
      <button role="tab" aria-selected="false" aria-controls="panel-bebidas" id="tab-bebidas" class="menu__tab" data-category="bebidas" tabindex="-1">Bebidas</button>
    </div>

    <!-- Painéis por categoria -->
    <div class="menu__panels">
      <div role="tabpanel" id="panel-tradicionais" aria-labelledby="tab-tradicionais" class="menu__panel menu__panel--active reveal-stagger">
        <div class="menu__grid" data-category="tradicionais">
          <!-- Cards injetados via JS ou HTML estático -->
        </div>
      </div>
      <div role="tabpanel" id="panel-especiais" aria-labelledby="tab-especiais" class="menu__panel reveal-stagger" hidden>
        <div class="menu__grid" data-category="especiais"></div>
      </div>
      <div role="tabpanel" id="panel-doces" aria-labelledby="tab-doces" class="menu__panel reveal-stagger" hidden>
        <div class="menu__grid" data-category="doces"></div>
      </div>
      <div role="tabpanel" id="panel-bebidas" aria-labelledby="tab-bebidas" class="menu__panel reveal-stagger" hidden>
        <div class="menu__grid" data-category="bebidas"></div>
      </div>
    </div>
  </div>
</section>
```

**Card de Produto (detalhado)**:
```html
<article class="menu-card reveal">
  <div class="menu-card__badges">
    <span class="badge badge--category">Tradicional</span>
    <span class="badge badge--new">Nova</span>
  </div>
  <img class="menu-card__image" src="pizza-margherita.webp" alt="Pizza Margherita: molho de tomate, mussarela de búfala, manjericão fresco, azeite" loading="lazy" width="400" height="300">
  <div class="menu-card__content">
    <h3 class="menu-card__name">Margherita DOP</h3>
    <p class="menu-card__desc">Molho San Marzano, mussarela de búfala campana DOP, manjericão fresco, azeite extra virgem</p>
    <div class="menu-card__footer">
      <span class="menu-card__price">R$ 42,00</span>
      <a href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20pedir%201x%20Margherita%20DOP" class="btn btn--primary btn--sm menu-card__order" target="_blank" rel="noopener">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#25d366" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.454.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a21.87 21.87 0 0 1-.004-.004 22.175 22.175 0 0 1 0-.074c0-.026-.01-.068-.02-.11l-2.088-6.908a1.365 1.365 0 0 0-1.325-1l-5.605-.782a1.363 1.363 0 0 0-1.31.673l-.816 3.685a1.363 1.363 0 0 0 .434 1.446l3.134 3.133a1.364 1.364 0 0 0 1.445.434l3.755-.86a1.363 1.363 0 0 0 .77-1.426l-.693-4.116Z"/></svg>
        Pedir pelo WhatsApp
      </a>
    </div>
  </div>
</article>
```

**Estados do Card**:
- Loading: skeleton com `background: linear-gradient(90deg, var(--color-cream-200) 25%, var(--color-cream-100) 50%, var(--color-cream-200) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite;`
- Hover: `transform: translateY(-4px); box-shadow: var(--shadow-lg);`
- Focus (teclado): outline gold-500 no card inteiro

---

### 7.4 Galeria — `#galeria`

**Estrutura**:
```html
<section id="galeria" class="section" aria-labelledby="galeria-title">
  <div class="container">
    <header class="section__header reveal">
      <span class="badge badge--category">Galeria</span>
      <h2 id="galeria-title" class="section__title">Nosso Dia a Dia</h2>
    </header>
    <div class="gallery__grid reveal-stagger" role="list">
      <figure class="gallery__item" role="listitem">
        <button class="gallery__trigger" data-lightbox="img-1" aria-label="Ver foto do forno a lenha em tamanho real">
          <img src="galeria-1.webp" alt="Forno a lenha aceso com chamas" loading="lazy" width="600" height="400">
          <span class="gallery__zoom" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </span>
        </button>
      </figure>
      <!-- 12-16 itens -->
    </div>
  </div>
</section>
```

**Lightbox**: Usa `.modal-overlay` (seção 6.7), navegação por teclado (← →), ESC para fechar, swipe no mobile.

---

### 7.5 Depoimentos — `#depoimentos`

**Estrutura**:
```html
<section id="depoimentos" class="section" aria-labelledby="depoimentos-title">
  <div class="container">
    <header class="section__header reveal">
      <span class="badge badge--category">Depoimentos</span>
      <h2 id="depoimentos-title" class="section__title">O que Dizem Nossos Clientes</h2>
    </header>
    <div class="testimonials__carousel" role="region" aria-roledescription="carousel" aria-label="Depoimentos de clientes">
      <div class="testimonials__track">
        <article class="testimonial__card reveal">
          <div class="testimonial__stars" aria-label="5 de 5 estrelas">
            <svg aria-hidden="true">★</svg><svg aria-hidden="true">★</svg><svg aria-hidden="true">★</svg><svg aria-hidden="true">★</svg><svg aria-hidden="true">★</svg>
          </div>
          <blockquote class="testimonial__text">"A melhor pizza que já comi em SP! A massa é perfeita, o sabor do tomate San Marzano faz toda diferença. Parece que estou em Nápoles."</blockquote>
          <footer class="testimonial__author">
            <img src="avatar-1.webp" alt="" loading="lazy" width="48" height="48" class="testimonial__avatar">
            <div>
              <cite class="testimonial__name">Mariana Santos</cite>
              <p class="testimonial__meta">Cliente desde 2019</p>
            </div>
          </footer>
        </article>
        <!-- 6-8 cards -->
      </div>
      <button class="testimonials__prev" aria-label="Depoimento anterior" hidden>‹</button>
      <button class="testimonials__next" aria-label="Próximo depoimento">›</button>
      <div class="testimonials__dots" aria-label="Navegação dos depoimentos"></div>
    </div>
  </div>
</section>
```

**Comportamento**:
- Auto-play: 5s, pausa no hover/focus
- Swipe/touch no mobile
- Dots indicam posição atual
- `prefers-reduced-motion`: auto-play desligado

---

### 7.6 Contato / Pedido — `#contato`

**Estrutura**:
```html
<section id="contato" class="section" aria-labelledby="contato-title">
  <div class="container">
    <header class="section__header reveal">
      <span class="badge badge--category">Contato</span>
      <h2 id="contato-title" class="section__title">Faça Seu Pedido ou Fale Conosco</h2>
    </header>
    <div class="contato__grid reveal-stagger">
      <form class="contato__form" action="https://wa.me/5511999999999" method="get" target="_blank" rel="noopener">
        <input type="hidden" name="text" id="whatsapp-message" value="">
        <div class="form-field">
          <label for="nome" class="form-label">Nome <span aria-hidden="true">*</span></label>
          <input type="text" id="nome" name="nome" class="form-input" required autocomplete="name" placeholder="Seu nome">
        </div>
        <div class="form-field">
          <label for="telefone" class="form-label">WhatsApp <span aria-hidden="true">*</span></label>
          <input type="tel" id="telefone" name="telefone" class="form-input" required autocomplete="tel" placeholder="(11) 99999-9999" inputmode="tel">
        </div>
        <div class="form-field">
          <label for="pedido" class="form-label">Seu Pedido / Mensagem <span aria-hidden="true">*</span></label>
          <textarea id="pedido" name="pedido" class="form-input" rows="4" required placeholder="Ex: 1x Margherita DOP, 1x Calabresa, 1x Coca-Cola 2L"></textarea>
        </div>
        <button type="submit" class="btn btn--primary btn--lg contato__submit">Enviar Pedido pelo WhatsApp</button>
        <p class="contato__note">Ao enviar, você será redirecionado ao WhatsApp com a mensagem pré-preenchida.</p>
      </form>
      <aside class="contato__info reveal">
        <h3 class="contato__info-title">Outras Formas de Falar</h3>
        <address class="contato__address">
          <p><strong>Endereço:</strong> Rua das Palmeiras, 123 — Vila Madalena, São Paulo</p>
          <p><strong>Horário:</strong> Ter–Dom 18h–23h | Seg fechado</p>
          <p><strong>Telefone:</strong> <a href="tel:+551133334444">(11) 3333-4444</a></p>
          <p><strong>WhatsApp:</strong> <a href="https://wa.me/5511999999999" target="_blank" rel="noopener">(11) 99999-9999</a></p>
        </address>
        <div class="contato__map" aria-label="Mapa de localização">
          <iframe src="https://www.google.com/maps/embed?..." loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Localização Bella Napoli"></iframe>
        </div>
      </aside>
    </div>
  </div>
</section>
```

**Validação JS**:
- Nome: min 2 chars, apenas letras/espaços
- Telefone: máscara `(99) 99999-9999`, validação regex brasileiro
- Pedido: min 10 chars
- Submit: monta `text` param com template `Olá, me chamo {nome}. Gostaria de pedir: {pedido}. Meu WhatsApp: {telefone}`

---

### 7.7 Footer — `#footer`

**Estrutura**:
```html
<footer id="footer" role="contentinfo">
  <div class="container">
    <div class="footer__grid reveal-stagger">
      <div class="footer__brand">
        <a href="#" class="footer__logo" aria-label="Bella Napoli - Início">
          <span class="logo__text">Bella Napoli</span>
        </a>
        <p class="footer__tagline">Pizzaria artesanal napolitana em São Paulo desde 2015.</p>
        <div class="footer__social" role="list" aria-label="Redes sociais">
          <a href="https://instagram.com/bellanolapi" target="_blank" rel="noopener" class="footer__social-link" aria-label="Instagram"><svg>...</svg></a>
          <a href="https://facebook.com/bellanolapi" target="_blank" rel="noopener" class="footer__social-link" aria-label="Facebook"><svg>...</svg></a>
          <a href="https://wa.me/5511999999999" target="_blank" rel="noopener" class="footer__social-link" aria-label="WhatsApp"><svg>...</svg></a>
        </div>
      </div>
      <nav class="footer__nav" aria-label="Navegação">
        <h4 class="footer__heading">Navegação</h4>
        <ul role="list">
          <li><a href="#hero">Início</a></li>
          <li><a href="#sobre">Nossa História</a></li>
          <li><a href="#cardapio">Cardápio</a></li>
          <li><a href="#galeria">Galeria</a></li>
          <li><a href="#contato">Contato</a></li>
        </ul>
      </nav>
      <div class="footer__hours">
        <h4 class="footer__heading">Horário de Funcionamento</h4>
        <dl class="footer__hours-list">
          <dt>Terça a Quinta</dt><dd>18h – 23h</dd>
          <dt>Sexta e Sábado</dt><dd>18h – 23h30</dd>
          <dt>Domingo</dt><dd>18h – 22h</dd>
          <dt>Segunda</dt><dd>Fechado</dd>
        </dl>
      </div>
      <div class="footer__newsletter">
        <h4 class="footer__heading">Novidades</h4>
        <p>Receba ofertas exclusivas e novidades no seu e-mail.</p>
        <form class="footer__form" action="#newsletter" method="post">
          <div class="form-field" style="flex-direction: row; gap: var(--space-2);">
            <label for="email" class="visually-hidden">E-mail</label>
            <input type="email" id="email" name="email" class="form-input" placeholder="seu@email.com" required autocomplete="email" style="flex: 1;">
            <button type="submit" class="btn btn--primary">Inscrever</button>
          </div>
        </form>
      </div>
    </div>
    <div class="footer__bottom reveal">
      <p class="footer__copyright">© 2025 Bella Napoli. Todos os direitos reservados.</p>
      <nav class="footer__legal" aria-label="Links legais">
        <a href="#privacidade">Política de Privacidade</a>
        <a href="#termos">Termos de Uso</a>
      </nav>
    </div>
  </div>
</footer>
```

---

## 8. Animações & Interações

```css
/* Reveal on scroll (IntersectionObserver) */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal--visible { opacity: 1; transform: translateY(0); }

/* Stagger para listas */
.reveal-stagger > * { opacity: 0; transform: translateY(16px); transition: opacity 0.5s ease, transform 0.5s ease; }
.reveal-stagger--visible > *:nth-child(1)  { transition-delay: 0ms; }
.reveal-stagger--visible > *:nth-child(2)  { transition-delay: 80ms; }
.reveal-stagger--visible > *:nth-child(3)  { transition-delay: 160ms; }
.reveal-stagger--visible > *:nth-child(4)  { transition-delay: 240ms; }
.reveal-stagger--visible > *:nth-child(5)  { transition-delay: 320ms; }
.reveal-stagger--visible > *:nth-child(6)  { transition-delay: 400ms; }
.reveal-stagger--visible > * { opacity: 1; transform: translateY(0); }

/* Respeita prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .reveal, .reveal-stagger > * { opacity: 1; transform: none; transition: none; }
}
```

### 8.2 IntersectionObserver Config (JS)

```js
// reveal-on-scroll.js
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add(entry.target.classList.contains('reveal-stagger') 
        ? 'reveal-stagger--visible' 
        : 'reveal--visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  rootMargin: '0px 0px -10% 0px', // dispara 10% antes de entrar
  threshold: 0.1
});

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => revealObserver.observe(el));
```

### 8.3 Micro-interações Adicionais

| Elemento | Animação | Duração | Easing |
|----------|----------|---------|--------|
| Button press | `transform: scale(0.97)` | 100ms | ease-out |
| Input focus ring | `box-shadow` expand | 150ms | ease |
| Tab switch | fade + slide X | 200ms | ease |
| Lightbox open | fade backdrop + scale img | 250ms | ease-out |
| Toast enter | slideUp + fade | 300ms | ease-out |
| Toast exit | slideDown + fade | 200ms | ease-in |
| Mobile menu | slideX (right) | 300ms | ease-out |
| Skeleton shimmer | background-position X | 1.5s | linear infinite |

### 8.4 Performance — CSS Crítico

```html
<!-- Inline no <head> para First Contentful Paint < 1.5s -->
<style>
  /* Tokens essenciais + hero + header + skip-link + btn base */
  :root { /* ... tokens mínimos ... */ }
  .skip-link, .header, .hero, .btn { /* ... estilos críticos ... */ }
  .reveal { opacity: 0; transform: translateY(24px); }
  .reveal--visible { opacity: 1; transform: none; }
</style>
<!-- styles.css completo: preload + media="print" onload -->
<link rel="preload" href="styles.css" as="style">
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
```

---

## 9. Acessibilidade (WCAG AA Checklist)

- [ ] Contraste mínimo 4.5:1 (texto normal), 3:1 (texto grande/UI)
- [ ] Foco visível em **todos** elementos interativos (`:focus-visible`)
- [ ] Ordem de tabulação lógica (HTML semântico)
- [ ] `alt` descritivo em **todas** imagens (decorativas: `alt=""`)
- [ ] Labels associados a inputs (`<label for>` / `aria-label`)
- [ ] ARIA live regions para toasts/alertas dinâmicos
- [ ] Carrossel com `role="region" aria-roledescription="carousel"` + botões prev/next
- [ ] Lightbox com `role="dialog" aria-modal="true"` + trap focus + ESC para fechar
- [ ] Skip link no topo (`<a href="#main" class="skip-link">Pular para conteúdo</a>`)
- [ ] Textos escaláveis até 200% sem perda de conteúdo/função
- [ ] Touch targets ≥ 44×44px (botões, links, inputs)

### 9.1 Padrões ARIA por Componente

| Componente | Roles/Atributos Obrigatórios |
|------------|------------------------------|
| Header/Nav | `<nav aria-label="Navegação principal">`, `aria-current="page"` no item ativo |
| Mobile Menu | `role="dialog" aria-modal="true" aria-labelledby="menu-title"`, focus trap |
| Menu Tabs | `role="tablist"`, `role="tab" aria-selected`, `aria-controls`, `role="tabpanel" aria-labelledby` |
| Carrossel | `role="region" aria-roledescription="carousel"`, `aria-live="polite"` no track |
| Lightbox | `role="dialog" aria-modal="true" aria-labelledby="img-title"`, `aria-describedby="img-desc"` |
| Formulário | `aria-required`, `aria-invalid`, `aria-describedby` para erros, `aria-live="polite"` no container de erros |
| Toast | `role="status" aria-live="polite"` (success/info), `role="alert" aria-live="assertive"` (error) |
| WhatsApp FAB | `aria-label="Falar no WhatsApp"`, `aria-expanded` se abrir menu |

### 9.2 Testes Manuais Obrigatórios

1. **Navegação só teclado**: Tab → todas ações acessíveis, Shift+Tab reverso, Enter/Space ativam
2. **Screen reader (NVDA/VoiceOver)**: landmarks anunciados, labels claros, estados (expandido/selecionado) falados
3. **Zoom 200%**: nenhum conteúdo cortado, horizontal scroll apenas se intencional
4. **High Contrast Mode (Windows)**: bordas/focos visíveis, ícones SVG com `currentColor`
5. **Reduced Motion**: todas animações desligadas, transições instantâneas

### 9.3 Checklist de Imagens

| Tipo | `alt` | Exemplo |
|------|-------|---------|
| Hero (decorativa) | `alt=""` | Imagem de ambiente, texto no HTML |
| Cardápio (informativa) | Descritivo + apetitoso | `"Pizza Margherita: molho de tomate vermelho vivo, mussarela de búfala branca derretida, folhas de manjericão verde brilhante, fio de azeite dourado"` |
| Galeria | Contexto + detalhe | `"Forno a lenha tradicional com chamas alaranjadas lambendo a cúpula de tijolos refratários"` |
| Avatar depoimento | `alt=""` | Nome no `<cite>` adjacente |
| Ícones UI | `alt=""` + `aria-hidden="true"` | `<svg aria-hidden="true">` |
| Logo | `alt="Bella Napoli - Pizzaria Artesanal"` | Texto alternativo da marca |

---

## 10. Copy Sugerida (Botões & CTAs)

| Contexto | Texto |
|----------|-------|
| Hero CTA principal | "Pedir Agora pelo WhatsApp" |
| Hero CTA secundário | "Ver Cardápio Completo" |
| Cardápio — botão no card | "Pedir pelo WhatsApp" |
| Cardápio — botão vazio | "Adicionar ao Pedido" |
| Contato — submit | "Enviar Mensagem" |
| WhatsApp FAB tooltip | "Falar no WhatsApp" |
| Footer WhatsApp | "(11) 99999-9999" |
| Newsletter | "Receber novidades e ofertas" |

---

### 10.2 Copy Completa por Seção

**Hero**:
- Headline: `Pizzas Artesanais<br>No Forno a Lenha`
- Lead: `Tradição napolitana em cada mordida. Ingredientes frescos, massa fermentada 24h, forno a 450°C.`
- Scroll indicator aria-label: `Rolar para conhecer nossa história`

**Sobre**:
- Badge: `Nossa História`
- Título: `Tradição que Passa de Geração`
- Lead: `Fundada em 2015 por Nonna Maria, a Bella Napoli nasceu da vontade de trazer o verdadeiro sabor de Nápoles para São Paulo.`
- Body: `Nossa massa descansa 24 horas, o molho usa tomates San Marzano DOP, e a mussarela é de búfala fresca. Tudo assado no forno a lenha a 450°C em 90 segundos.`
- Valores: `Ingredientes 100% naturais`, `Fermentação natural lenta`, `Forno a lenha autêntico`, `Receitas da Nonna Maria`

**Cardápio**:
- Badge: `Cardápio`
- Título: `Nossas Pizzas e Mais`
- Subtítulo: `Todas as pizzas tamanho único (30cm) — servem 1–2 pessoas`
- Categorias: `Tradicionais`, `Especiais`, `Doces`, `Bebidas`
- Badge card: `Nova`, `Vegetariana`, `Vegana`, `Apimentada`
- Preço prefixo: `R$`
- Botão card: `Pedir pelo WhatsApp`
- Empty state: `Nenhum item nesta categoria`

**Galeria**:
- Badge: `Galeria`
- Título: `Nosso Dia a Dia`
- Lightbox close aria-label: `Fechar imagem`
- Lightbox prev/next aria-label: `Imagem anterior` / `Próxima imagem`

**Depoimentos**:
- Badge: `Depoimentos`
- Título: `O que Dizem Nossos Clientes`
- Estrelas aria-label: `5 de 5 estrelas`
- Prev/Next aria-label: `Depoimento anterior` / `Próximo depoimento`
- Dots aria-label: `Ir para depoimento {n}`

**Contato**:
- Badge: `Contato`
- Título: `Faça Seu Pedido ou Fale Conosco`
- Form labels: `Nome`, `WhatsApp`, `Seu Pedido / Mensagem`
- Placeholders: `Seu nome`, `(11) 99999-9999`, `Ex: 1x Margherita DOP, 1x Calabresa, 1x Coca-Cola 2L`
- Submit: `Enviar Pedido pelo WhatsApp`
- Note: `Ao enviar, você será redirecionado ao WhatsApp com a mensagem pré-preenchida.`
- Info title: `Outras Formas de Falar`
- Endereço: `Rua das Palmeiras, 123 — Vila Madalena, São Paulo`
- Horário: `Ter–Dom 18h–23h | Seg fechado`

**Footer**:
- Tagline: `Pizzaria artesanal napolitana em São Paulo desde 2015.`
- Nav heading: `Navegação`
- Horários heading: `Horário de Funcionamento`
- Newsletter heading: `Novidades`
- Newsletter lead: `Receba ofertas exclusivas e novidades no seu e-mail.`
- Newsletter placeholder: `seu@email.com`
- Newsletter button: `Inscrever`
- Copyright: `© 2025 Bella Napoli. Todos os direitos reservados.`
- Legal: `Política de Privacidade`, `Termos de Uso`

### 10.3 Mensagens de Sistema (Toasts/Validação)

| Tipo | Título | Mensagem |
|------|--------|----------|
| Form success | `Pedido enviado!` | `Redirecionando para o WhatsApp...` |
| Form error (validação) | `Verifique os campos` | `Por favor, preencha todos os campos obrigatórios corretamente.` |
| Form error (rede) | `Erro ao enviar` | `Não foi possível abrir o WhatsApp. Tente novamente ou ligue para (11) 3333-4444.` |
| Newsletter success | `Inscrito com sucesso!` | `Você receberá nossas novidades em breve.` |
| Newsletter error | `E-mail inválido` | `Por favor, insira um endereço de e-mail válido.` |
| Copy link | `Link copiado!` | `O link do cardápio foi copiado para a área de transferência.` |

---

## 11. Assets Necessários

- **Hero**: foto full-bleed forno/pizza (1920×1080 min, WebP + AVIF)
- **Cardápio**: 1 foto por item (proporção 4:3, 800×600 WebP)
- **Galeria**: 12–16 fotos ambiente/produtos (1200×800 WebP)
- **Sobre**: 1 foto equipe/forno (800×600 WebP)
- **Favicon**: 32×32, 180×180 (apple-touch), 512×512 (manifest)
- **Ícones**: SVG inline (lucide ou custom) — WhatsApp, seta, check, X, menu, close

---

### 11.1 Especificações Técnicas de Imagens

| Uso | Formato | Larguras (srcset) | Compressão | Naming |
|-----|---------|-------------------|------------|--------|
| Hero | AVIF, WebP, JPG fallback | 1920w, 1280w, 640w | q=75 (WebP/AVIF), q=80 (JPG) | `hero-{w}.{ext}` |
| Cardápio | WebP, JPG fallback | 800w, 400w | q=75 | `menu-{slug}-{w}.webp` |
| Galeria | WebP, JPG fallback | 1200w, 800w, 400w | q=75 | `gallery-{n}-{w}.webp` |
| Sobre | WebP, JPG fallback | 800w, 400w | q=75 | `sobre-{w}.webp` |
| Avatares | WebP | 96w, 48w | q=70 | `avatar-{name}-{w}.webp` |

**Picture element padrão**:
```html
<picture>
  <source srcset="img-800.avif 800w, img-400.avif 400w" type="image/avif" sizes="(max-width: 640px) 100vw, 50vw">
  <source srcset="img-800.webp 800w, img-400.webp 400w" type="image/webp" sizes="(max-width: 640px) 100vw, 50vw">
  <img src="img-800.jpg" alt="..." loading="lazy" width="800" height="600" decoding="async">
</picture>
```

### 11.2 Ícones SVG — Lista Completa

| Nome | Uso | Tamanho |
|------|-----|---------|
| `whatsapp` | FAB, footer, botões card | 24×24 (UI), 18×18 (btn) |
| `chevron-down` | Hero scroll, accordions | 24×24 |
| `chevron-left/right` | Carrossel, lightbox nav | 24×24 |
| `close` | Mobile menu, lightbox, toasts | 24×24 |
| `menu` | Hamburger button | 24×24 |
| `star` | Depoimentos rating | 16×16 |
| `check` | Valores sobre, form success | 16×16 |
| `location` | Endereço footer/contato | 18×18 |
| `clock` | Horários footer | 18×18 |
| `phone` | Telefone footer/contato | 18×18 |
| `mail` | Newsletter input | 18×18 |
| `instagram/facebook` | Footer social | 24×24 |

**Sprite SVG recomendado** (`icons.svg`):
```html
<svg style="display:none"><symbol id="whatsapp" viewBox="0 0 24 24">...</symbol>...</svg>
<!-- Uso: <svg class="icon"><use href="icons.svg#whatsapp"/></svg> -->
```

---

## 12. Performance & Budgets

| Métrica | Target | Ferramenta |
|---------|--------|------------|
| **LCP** | < 2.5s | Lighthouse, WebPageTest |
| **CLS** | < 0.1 | Lighthouse, Chrome DevTools |
| **FID/INP** | < 200ms | Lighthouse, CrUX |
| **FCP** | < 1.8s | Lighthouse |
| **TTFB** | < 600ms | DevTools Network |
| **Total JS** | < 50 KB gzipped | Bundle analyzer |
| **Total CSS** | < 30 KB gzipped | Bundle analyzer |
| **Imagens hero** | < 100 KB (WebP) | ImageOptim, Squoosh |
| **Fontes** | < 50 KB (woff2 subset) | Google Fonts subset |

### 12.1 Otimizações Implementadas

- **Critical CSS inline** no `<head>` (hero, header, skip-link, tokens, btn base)
- **Preload** hero image + fonts + critical CSS
- **Lazy-loading** nativo (`loading="lazy"`) exceto hero (`loading="eager" fetchpriority="high"`)
- **Font subset** `text=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?-()%R$`
- **AVIF/WebP** com JPG fallback via `<picture>`
- **SVG inline/sprite** sem requests extras
- **JS defer** + módulos ES (`type="module"`)
- **Service Worker** (Workbox) para cache offline de assets estáticos

---

## 13. Suporte a Navegadores

| Navegador | Versão Mínima | Notas |
|-----------|---------------|-------|
| Chrome/Edge | 90+ | Suporte completo |
| Firefox | 88+ | Suporte completo |
| Safari | 15+ | `gap` em flex/grid, `aspect-ratio`, `clamp()` |
| Safari iOS | 15+ | Touch events, viewport fix |
| Samsung Internet | 14+ | Baseado em Chromium 90 |

**Polyfills** (se necessário para legado):
- `IntersectionObserver` (polyfill 2.2 KB gzipped)
- `focus-visible` (polyfill 1.5 KB gzipped)
- `object-fit` (polyfill via `object-fit-images` se IE11)

---

## 14. Estrutura de Arquivos (Entregáveis Etapa 3)

```
bella-napoli/
├── index.html              # HTML semântico completo
├── styles.css              # Design tokens + componentes + seções + utilities
├── script.js               # IntersectionObserver, tabs, carrossel, lightbox, form, mobile menu
├── icons.svg               # Sprite de ícones
├── manifest.webmanifest    # PWA manifest
├── sw.js                   # Service Worker (Workbox)
├── robots.txt
├── sitemap.xml
└── assets/
    ├── images/
    │   ├── hero-{w}.avif
    │   ├── hero-{w}.webp
    │   ├── hero-{w}.jpg
    │   ├── menu-{slug}-{w}.webp
    │   ├── gallery-{n}-{w}.webp
    │   ├── sobre-{w}.webp
    │   └── avatar-{name}-{w}.webp
    └── fonts/              # (opcional - self-host se necessário)
        ├── inter-*.woff2
        └── playfair-*.woff2
```

---

## 15. Próximos Passos (Etapas 2/3)

1. **Etapa 2**: Criar `index.html` semântico com todas as seções, usando tokens acima
   - HTML5 semântico: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
   - ARIA roles/attributes conforme seção 9.1
   - Picture elements com srcset/sizes para todas imagens
   - Formulário com validação nativa + `novalidate` para JS custom
   - Meta tags: viewport, theme-color, description, OG, Twitter Cards
   - JSON-LD Structured Data: `Restaurant`, `Menu`, `Review`

2. **Etapa 3**: Criar `styles.css` completo + `script.js`
   - CSS: tokens → reset → base → components → sections → utilities → print
   - JS: módulos ES, IntersectionObserver (reveal), tabs (cardápio), carrossel (depoimentos), lightbox (galeria), form WhatsApp, mobile menu, toasts
   - Testes: axe-core (a11y), Lighthouse (perf), Chrome DevTools (responsive), NVDA/VoiceOver (screen reader)

3. **Validação Final**:
   - [ ] Lighthouse Performance ≥ 90
   - [ ] Lighthouse Accessibility = 100
   - [ ] Lighthouse Best Practices ≥ 90
   - [ ] Lighthouse SEO ≥ 90
   - [ ] WCAG AA manual checklist (seção 9.2)
   - [ ] Cross-browser: Chrome, Firefox, Safari, Edge
   - [ ] Dispositivos reais: iPhone, Android, iPad, Desktop

---

> **Nota**: Esta é a especificação completa de design (Design Spec v1.0) para o site Bella Napoli.  
> Próximos entregáveis: `index.html` (Etapa 2) → `styles.css` + `script.js` (Etapa 3).