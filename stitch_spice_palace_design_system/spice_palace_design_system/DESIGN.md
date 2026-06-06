---
name: Spice Palace Design System
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1b1b1b'
  on-surface-variant: '#424844'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#727974'
  outline-variant: '#c1c8c3'
  surface-tint: '#476558'
  primary: '#163328'
  on-primary: '#ffffff'
  primary-container: '#2d4a3e'
  on-primary-container: '#99b9a9'
  inverse-primary: '#adcebe'
  secondary: '#914c00'
  on-secondary: '#ffffff'
  secondary-container: '#fe932d'
  on-secondary-container: '#663400'
  tertiary: '#755b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#d0a61f'
  on-tertiary-container: '#503d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c9ead9'
  primary-fixed-dim: '#adcebe'
  on-primary-fixed: '#022016'
  on-primary-fixed-variant: '#304d40'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77e'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#ffe08f'
  tertiary-fixed-dim: '#eec13c'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#584400'
  background: '#fcf9f8'
  on-background: '#1b1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 80px
---

## Brand & Style

The design system is crafted to mirror the sensory experience of North Indian fine dining: rich, aromatic, and deeply rooted in tradition yet presented with contemporary precision. The brand personality is **Elegant, Warm, and Trustworthy**, aiming to evoke a sense of heritage through a modern lens. 

The aesthetic follows a **Modern Heritage** style—a fusion of **Minimalism** and **Tactile** design. It prioritizes generous whitespace and high-quality typography to ensure a premium feel, while using a warm, culinary-inspired color palette to maintain approachability. Every interface element is designed to be high-converting, guiding guests toward reservations and orders with clear, sophisticated visual cues.

The target audience consists of discerning diners in Pune looking for an authentic, premium experience. The UI response should feel like a well-set table: organized, inviting, and uncluttered.

## Colors

The palette is derived from natural ingredients and traditional Indian architectural elements. 

- **Primary Forest Green (#2D4A3E)** serves as the anchor, used for key brand moments and primary actions to establish trust and grounding.
- **Accent Saffron (#E8821A)** is used sparingly for highlights, CTA focus, and ratings, providing a warm, appetizing contrast.
- **Background Tones (Cream & Ivory)** replace pure white to eliminate digital harshness, creating a paper-like, tactile quality that feels more "fine dining" than "fast food."
- **Charcoal Text (#1C1C1C)** ensures high legibility against the cream backgrounds, maintaining WCAG AA compliance across all interfaces.
- **WhatsApp Green (#25D366)** is reserved exclusively for the direct communication channel, ensuring instant recognition.

## Typography

This design system utilizes a sophisticated typographic pairing to balance heritage with readability.

- **Playfair Display** is used for headlines and display text. Its high-contrast serifs evoke the elegance of printed menus and classic editorial design. It should be used with tighter tracking in larger sizes to emphasize its dramatic character.
- **DM Sans** is the functional workhorse for body copy, descriptions, and UI labels. Its geometric, low-contrast forms remain highly legible even at small sizes on mobile screens.

**Hierarchy Guidance:**
- Use `display-lg` for hero sections and section introductions.
- Use `headline-md` for dish names in menus.
- Labels use a slight letter-spacing increase to ensure clarity in navigation and small badges.

## Layout & Spacing

The layout philosophy is based on a **Fixed Grid** for desktop and a **Fluid Grid** for mobile devices. The rhythm follows an 8px base unit to ensure consistent scaling.

- **Desktop:** A 12-column grid with a 1200px max-width. Large 80px gaps between sections are used to maintain an "airy," premium feel.
- **Mobile:** A 4-column fluid grid. Margins are kept at 16px to maximize content space while maintaining a safe touch area.
- **Rhythm:** Content blocks (like menu items) should use `stack-md` (16px) for internal spacing and `stack-lg` (32px) to separate distinct items.

**Reflow Rules:**
On mobile, multi-column card layouts (like a 3-column menu grid) must collapse into a single-column stack. Photography should transition from side-aligned to top-aligned within cards on smaller screens.

## Elevation & Depth

To maintain a premium, tactile feel, this design system avoids heavy shadows and instead uses **Tonal Layers** combined with **Ambient Shadows**.

- **Base Layer:** The Page Background (`#FAF7F0`) acts as the foundation.
- **Surface Layer:** Cards and containers use the Ivory (`#F5EFE0`) background to create a subtle lift without needing dark shadows.
- **Shadow Character:** When depth is required (e.g., a floating "Book Table" button or an open modal), use a very soft, diffused shadow: `0px 10px 30px rgba(45, 74, 62, 0.08)`. Note the use of the Primary Forest Green in the shadow color to keep it "warm" rather than grey/cold.
- **Interactions:** Buttons should feel "pressed" rather than "popped," using a slight darkening of the background color or a subtle inner shadow on click.

## Shapes

The shape language is **Rounded and Organic**, reflecting the soft curves of traditional copper cookware and organic ingredients.

- **Cards & Containers:** Use a 16px to 24px radius (`rounded-lg` or `rounded-xl`). This softens the UI and makes it feel more inviting.
- **Buttons:** All buttons must be **Pill-shaped** (40px+ radius). This distinguishes interactive elements from static content cards.
- **Selection Indicators:** Small elements like Veg/Non-veg icons should maintain a subtle 4px radius to match the overall softness.
- **Photography:** Food imagery should either have the standard card radius or be clipped into perfect circles for specific "Chef's Recommendation" highlights.

## Components

### Buttons
- **Primary:** Pill-shaped, Forest Green (#2D4A3E) background with Cream text. Height: 48px or 56px for high-conversion areas.
- **Secondary:** Pill-shaped, Outline style using Forest Green or Charcoal. Used for "View Menu" or secondary navigation.
- **Tertiary:** Text-only with a subtle underline, used for "See all reviews."

### Cards
- **Menu Card:** Ivory background, 16px radius. Features a top-down food photo, Dish Name in Playfair Display, and a price tag in DM Sans Bold.
- **Review Card:** Includes the Saffron star rating system and a muted secondary text color for the body.

### Specialized Badges
- **Dietary Indicators:** 
  - **Veg:** Green square border with a green circle inside.
  - **Non-Veg:** Brown square border with a brown circle inside.
- **Spice Levels:** Represented by 1-3 chili icons in Saffron.
- **Status Badges:** Pill-shaped, Saffron Light (#FDF0E0) background with Saffron text. Used for "Chef's Special" or "Best Seller."

### Form Fields
- **Inputs:** Underlined or light-bordered Ivory fields. Use Charcoal for input text and Muted secondary text for placeholders. Focus state should highlight the border in Forest Green.

### Iconography
- Use clean, thin-line icons (2px stroke). Icons should be Forest Green for navigation and Saffron for active/highlighted states.