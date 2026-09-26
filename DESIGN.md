# Bysages Design System

> Familiar interfaces, natural light, clear hierarchy, efficient density.
>
> **Interfaces should feel like they exist in space — not drawn on a screen.**

Bysages Design System is a cross-platform design language for web, desktop, and
mobile. It builds recognition through space, light, hierarchy, density,
responsive layout, and restrained motion — never through special shapes that
manufacture a "designed" look.

## The material: paper and ink

以光为影 — _light as shadow_. The whole system keeps one material metaphor:

- Interfaces are **paper** — warm, layered, catching light. Pure `#ffffff`
  never appears; surfaces are paper whites, the ground rests in ambient shade.
- Content is **ink** — near-black with warmth, never sterile. Primary actions
  default to ink; color enters only where meaning requires it.
- Hierarchy is **light** — surfaces brighten as they rise. Elevation is a
  semantic ladder; shadows are its cast result: computed from a single light,
  tinted by the theme's ink, and always a beat behind the surface that threw
  them.

The language bridges Chinese restraint (留白 — negative space as structure) and
Western minimalism. It must feel at home in a government portal, an enterprise
console, and an editorial product — the first glance familiar, the second
glance comfortable, the third revealing its own order.

## Principles

**Familiar.** Button looks like a button. Innovation comes from clearer
hierarchy, more natural light, better organization — never from unfamiliar
interaction.

**Clear.** Every screen answers: where am I, what can I do, what matters most,
what happens next. Visual hierarchy serves information hierarchy.

**Layered.** Elevation is semantics; shadow is its visual result. Components
reference semantic elevation, never raw shadow values.

**Ambient.** One light source for the whole system. Shadows stay soft,
directional, and consistent; no component is a glowing object.

**Dense.** Density is information organization, not smaller UI. Compress
padding, gaps, and decoration — never readability, contrast, or type size.

**Responsive.** Re-layout, don't scale. Space changes; semantics don't.

**Inclusive.** Accessibility is the default capability, not a mode. Softness
comes from light, never from low contrast.

**Quiet.** No neon, no glow-for-glow's-sake, no decorative gradients, no
oversized radii, no floating-everything. Poetry belongs in the visuals, never
in the interaction.

When two options both work, judge in this order: accessibility → usability →
information hierarchy → familiarity → responsiveness → performance → visual
harmony → brand. Visual identity never overrides usability; brand never
overrides content; decoration never overrides information.

## Hierarchy and alignment

Establish hierarchy through this ladder, in order — structure and space before
color and shadow:

```text
Position → Structure → Spacing → Typography → Color → Elevation → Motion
```

Proximity is semantics: related content sits together; unrelated content
separates through space, sections, surfaces, or dividers. Content aligns left,
numbers right, icons to the visual center or baseline; alignment is stable —
never broken for variety.

## Layout

Define Page → Section → Layout → Surface → Component → Content before drawing
any component. Content areas have explicit maxima; long text has a readable
measure. Grid provides alignment and rhythm without imprisoning layout — pick
the most natural tool per task.

## Spacing

A 4px base unit, expressed in rem. Optical adjustments of 2px/6px are allowed
and must carry a comment saying why. Components consume the density-aware
derived layer (`--bs-padding-*`, `--bs-gap-*`, `--bs-margin-*`), not the raw
ramp.

| Token              | Value   | Band             |
| ------------------ | ------- | ---------------- |
| `--bs-space-1`     | 0.25rem | micro            |
| `--bs-space-2`     | 0.5rem  | micro            |
| `--bs-space-3`     | 0.75rem | component        |
| `--bs-space-4`     | 1rem    | component        |
| `--bs-space-5`     | 1.25rem | section          |
| `--bs-space-6`     | 1.5rem  | section          |
| `--bs-space-7`     | 1.75rem | section          |
| `--bs-space-8`     | 2rem    | major section    |
| `--bs-space-10`    | 2.5rem  | major section    |
| `--bs-space-12`    | 3rem    | page composition |
| `--bs-space-16`    | 4rem    | page composition |
| `--bs-space-20/24` | 5–6rem  | page composition |

The derived tiers share one ramp mapping so a same-named tier is never two
sizes: `xs/sm/md/lg/xl/2xl` ride `space-1/2/3/4/6/8`. Whitespace properties
(`gap`, `padding`, `margin`) always take the tier of their own family;
geometry is exempt — position offsets, an interior part's clearance, a
nesting step, and page-composition spacing (`space-12` and up, which must
not breathe with density) ride the raw ramp.

Rules keep consistency; the eye keeps balance. Mathematical uniformity is not
visual uniformity.

## Typography

Two tracks:

- **The voice** — the song stack (`--bs-font-serif`): Noto Serif SC → Source
  Han Serif SC → Songti SC → SimSun. Upright, structured strokes that survive
  typesetting; headings and editorial narrative ride it, the way Western
  systems let a serif carry voice.
- **The chrome** — the modern hei stack (`--bs-font-sans`): the platform UI
  faces lead (Segoe UI / SF / Roboto), then MiSans → HarmonyOS Sans SC →
  PingFang SC → Microsoft YaHei. Clear and dense; all UI text rides it. Latin
  letters and figures ride the platform face so a mixed line keeps one rhythm —
  digits falling onto a Chinese cut read tall and out of true.

Both stacks fall through into CJK platform faces, so 中西混排 keeps one rhythm.
Sizes are fixed rem steps (`--bs-font-size-xs` 0.75rem … `--bs-font-size-4xl`
2.25rem) outside the density scale — compact UI may choose `sm`, never below
it. Line height comes in four steps. Weights: Regular 400, Medium 500,
Semibold 600, Bold 700 — no thin or light weights at small sizes.

Control labels carry `--bs-tracking-label` (0.02em): upright and unhurried is
a property of CJK typesetting, not of any single typeface.

Text must survive zoom and resize without clipping, overlap, or horizontal
scroll.

## Color

Components never reference raw values or primitive ramps — only the semantic
layer.

**Ink first.** `--bs-color-primary` defaults to ink (paper-white text on ink
fill). The interface stays monochrome and solemn by default, so one glance
knows where color would mean something.

**Accent themes.** A `[data-accent]` attribute lays a different mineral
pigment under the same interface:

| Accent    | Pigment                                       | Temper                                  |
| --------- | --------------------------------------------- | --------------------------------------- |
| _(none)_  | ink — `--bs-color-gray-800`                   | solemn, industry-neutral                |
| `qinghua` | cobalt — the blue of blue-and-white porcelain | clear, resolute, literati               |
| `celadon` | aquatic green-blue — 天水碧                   | warm, lifestyle                         |
| `zhusha`  | cinnabar — seal-paste red                     | civic identity (identity, never errors) |

The accent drives the primary block and the focus halo. It never touches the
semantic pigments.

**Fixed semantic pigments.** Success is bamboo, warning is ochre, danger is
cinnabar-red (`--bs-color-danger` — a separate token from the zhusha accent, so
a civic site can wear vermilion identity without ever confusing it with an
error), info is ultramarine. Each carries `-hover`, `-subtle`, and
`-subtle-text` steps; dark themes lift the same hues to lighter steps.

**Color is never the only signal.** State pairs color with text, icon, and
position: an error is a red hairline _and_ a message _and_ an icon.

**Contrast.** Body text ≥ 4.5:1, large text and UI ≥ 3:1, verified across
light, dark, high-contrast, and forced-colors. `[data-contrast="high"]`
promotes secondary text and borders to primary strength and deepens the focus
halo — the same design, louder.

## Surface and elevation

A surface is color + material + elevation + lighting + border. The ladder:

| Level    | Token                  | Carries                                                 |
| -------- | ---------------------- | ------------------------------------------------------- |
| Ground   | `--bs-color-surface-0` | page canvas, in ambient shade, no shadow                |
| Surface  | `--bs-color-surface-1` | panels, sections — color and hairline, no shadow        |
| Raised   | `--bs-color-surface-2` | controls (`--bs-shadow-xs`), cards (`--bs-elevation-1`) |
| Floating | `--bs-color-surface-3` | popovers, menus — elevation-3, clearly off the page     |
| Dialog   | `--bs-color-surface-4` | modals, sheets — elevation-4/5                          |
| Topmost  | `--bs-color-surface-5` | toasts — brief, highest priority only                   |

Inputs may sit in `--bs-color-surface-inset` (recessed semantics). Page-level
surfaces may opt into a 2–3% grain — paper for the paper, never for controls.

## Lighting and shadow

One light. `--bs-shadow-ink` is the theme's shadow hue (warm in light, deeper
at night), `--bs-light-x`/`--bs-light-y` place the key light, and
`--bs-light-reach` sets how high surfaces float. Every elevation level
composes from these parts with `color-mix` — never copy-pasted values. The
core lighting engine (`setLight`, `attachDynamicLight`) writes these
variables: one call re-lights the interface, and the pointer can carry the
light across any element marked `data-motion~="lit"` — components never own
shadow code of their own.

Shadows are cast: they trail the property that raised them (~1.5× the
duration), so a hover reads as light rearranging, not a sticker appearing.
A solid pigment surface bleeds on hover: it casts a small shadow in its own
color.

One CSS law: custom properties resolve their own `var()` references at the
declaring element. A colored surface that casts in its own color declares
`--bs-shadow-color` locally and composes its shadow inline from the lighting
parts (see the dialog trigger).

Restraint ladder: in-page content casts nothing; cards rise on elevation-1/2;
menus and popovers separate on elevation-3; dialogs own elevation-4/5. A
vessel under the hand rises a level (card: elevation-1 → elevation-2 on
hover) — the ladder does the lifting, never a new shadow.

## Shape

方寸为章，器物为圆 — _controls are square-cut like a seal; vessels are round._
The contrast between the two is the system's signature:

- **Controls** (buttons, inputs, steppers, toggle tracks): `--bs-radius-sm`
  (6px) — the seal's edge. Square-cut communicates trustworthiness.
- **Vessels** (cards 12px, dialogs 16px, sheets 24px): `--bs-radius-lg/xl/2xl`
  — the vessel's belly. Round communicates containment.
- **Pills, avatars, switch tracks**: `--bs-radius-full`.
- Chips and tiny indicators: `--bs-radius-xs`.

Never one uniform radius everywhere; never oversized corners on controls.

## Density

Four tiers via `[data-density]`: one scale factor drives all whitespace and
decorative parts, and control heights ride their own ladder per tier — a
compact workbench and an elder-friendly spacious screen are different
products, not the same one nudged by two pixels:

| Tier        | Scale | Controls sm/md/lg |
| ----------- | ----- | ----------------- |
| compact     | 0.75  | 24 / 28 / 32 px   |
| default     | 1     | 28 / 32 / 40 px   |
| comfortable | 1.25  | 32 / 36 / 44 px   |
| spacious    | 1.5   | 36 / 42 / 48 px   |

Density may change padding, gaps, row heights, control heights, and decorative
spacing. It must not change semantic structure, contrast, focus visibility, or
type size. The spacious ladder's 48px is the target size elderly-vision
research asks for; pair it with `[data-contrast="high"]` and civic's slow
pace for an elder-friendly product. Visual size ≠ hit area: a 28px button
can carry a larger pointer target.

Content has priority: Primary → Secondary → Tertiary → Metadata. Under
pressure, keep the primary, keep as much secondary as possible, fold the rest
(Progressive disclosure: expand, tooltip, popover, details).

## Responsive

Re-organize, never scale down. Components can change position, direction,
density, visibility, layout, interaction model, and surface type — core
semantics never change. Component breakpoints are container queries
(`@container`), not media queries; the viewport belongs to the page, the
container belongs to the component. Typical re-organizations: sidebar →
collapsible → bottom navigation; centered dialog → bottom sheet; full columns
→ priority columns → primary fields with expandable details. Layouts must
survive zoom, text resize, and localization growth — design to 320px.

## Interaction states

Every interactive component defines its applicable states among: Rest / Hover
/ Focus / Pressed / Selected / Disabled / Loading / Invalid / Read-only.

The control recipe:

States announce at once and recede slowly: the focus halo arrives with
no transition — feedback is not an effect to ease in — and fades on exit
through the rest transition.

- **Rest** — paper-white surface (`--bs-color-surface-2`), one hairline
  (`--bs-color-border`), `--bs-shadow-xs`. Nothing else.
- **Hover** — the hairline deepens (`--bs-color-border-strong`); filled
  states deepen their fill and let the ink bleed (the shadow spreads while
  the color deepens). Outline controls never swap background.
- **Focus** — the hairline turns primary plus the focus halo
  (`--bs-focus-ring`): a crisp inner line inside a soft, wide glow. Every
  default scene carries the halo, text inputs included. A scene that
  borrows another system's style follows that system whole — a
  Fluent-drawn field thickens its edge and casts no halo; ours always do.
  Focus is the keyboard's cursor: light arriving, never a background
  change, never `outline: none` without a replacement. Focus and
  selection stay distinct.
- **Pressed** — the shadow lets go; the control settles into the page.
- **Selected/checked** — flat primary fill, on-primary content, no inner
  shadow, no lit edge.
- **Invalid** — the hairline turns `--bs-color-danger`. Disabled — muted
  surface, no shadow, no cursor tricks, and a way to understand why.

One CSS trap: hover specificity overrides `[data-state]` rules — selected and
invalid rules must exclude hover explicitly (`:hover:not([data-state="on"])`).

## Motion

Three rules and a floor:

- **Light needs time.** Shadows transition about 1.5× slower than the property
  that raised them.
- **Ink bleeds.** Surfaces enter by fading _and_ dissolving
  (`bs-ink-in`: opacity, blur 3px → 0, a 1% settle) — never popping. Exits
  stay plain opacity fades, faster than their entrances.
- **Puppets have strings.** Moving parts overshoot on `--bs-ease-spring`
  (switch thumbs, selection marks); list items rise one after another
  (`bs-item-in` + `--bs-stagger-step`, 24ms apart).
- **The floor:** `prefers-reduced-motion: reduce` retunes every token to 1ms —
  states remain, animation does not.

| Token                   | Value | Band                       |
| ----------------------- | ----- | -------------------------- |
| `--bs-duration-instant` | 80ms  | hovers, presses            |
| `--bs-duration-fast`    | 140ms | control states, focus halo |
| `--bs-duration-base`    | 200ms | menus, tooltips            |
| `--bs-duration-slow`    | 320ms | panels, dialogs, sheets    |

Durations structure after the familiar two-tier systems (fast for small
objects, slower for large ones) — button hover must be obviously quicker than
dialog entrance. `filter: blur` belongs only to panel-level one-shot entrances,
never to list rows.

## Icons

Icons identify, they don't decorate. One stroke width, one corner style, one
optical size across the product. Key actions pair icon + label; icon-only
controls carry an accessible name, a tooltip, and a sufficient hit area.
Optical alignment over mathematical centering.

## Controls

**Button** — primary (ink by default), secondary, ghost, destructive, link.
One primary per region; any action _can_ be the primary — hierarchy follows
the business semantics, the component never presumes the industry.

**Input** — surface + hairline + focus halo carry the field; shadows don't.
Placeholder is not a label.

**Checkbox / Radio / Switch** — selection (checkbox, radio) is distinct from
toggling a state (switch) and from performing an action (button).

## Overlays

Popovers, tooltips, dropdowns, menus, dialogs, sheets, and toasts sit on a
semantic z-index ladder (base → raised → sticky → floating → overlay → dialog
→ toast); random `z-index: 99999` is a bug. Anchor positioning and collision
come from the machines' built-in popper — never a second positioning system.

Dialog behavior follows the modal pattern: inert background, focus trapped
inside, Escape closes when closable, focus restores on close. Menu behavior
follows the desktop model: Enter/Space opens, arrows navigate, Escape closes,
Enter activates.

## Data display: table and chart

**Table** is the density flagship: scanability, alignment, sorting, filtering,
selection, keyboard access. Text left, numbers right, actions right, status
contextual. Compact compresses padding and height, never type size, contrast,
or focus. Responsive tables re-organize into priority columns and expandable
details — a table is never squeezed into a phone.

**Chart** is information, not decoration. Data carries the highest visual
weight; gradients, glows, 3D, and ornament never compete. Colors come from
tokens; the same semantic series is always the same color; categorical,
sequential, diverging, and status palettes stay distinct; key information is
never color-only.

## Content and internationalization

Copy is brief, specific, scannable, translatable, consistent. Buttons take
action verbs (Save, Delete, Cancel, Confirm) — not OK, not "click here."
Errors answer three questions: what happened, why, how to recover. The system
assumes Chinese, English, and RTL from the start: text may grow, dates and
currencies may reformat, titles may wrap. Never write directional language
("the panel on the right") — write semantic language ("the details panel").

## Accessibility

Semantic HTML first; ARIA only where native semantics fall short (the
machines provide it). Full keyboard support per platform habit. Focus always
visible, distinct from selection, restored after overlays. Accessible names,
roles, states, and relationships only where they carry meaning. Touch targets
stay honest under density. Components' anatomy (parts + machine state
attributes) is a stable contract — codegen and tests depend on it.

## Themes

Theme is token data, never a component fork:

- `[data-theme]` — light (宣纸, xuan paper) / dark (漆夜, lacquer night)
- `[data-accent]` — ink _(default)_ / qinghua / celadon / zhusha
- `[data-contrast]` — normal / high
- `[data-density]` — compact / default / comfortable / spacious
- `[data-scene]` — paper _(default)_ / civic / enterprise / studio / tech / cupertino / expressive / fluent / material / sketch

Future brand themes change color, surface, lighting, typography, and density —
never interaction. Dark mode is lacquer night: warm blacks (never `#000`),
paper-white text, the same hue relationships lifted to lighter steps, and
separation carried by the surface ladder plus a faint warm hairline of light.

**Scene presets.** A `[data-scene]` attribute retunes the temperament of the
whole interface — shape, density, pace and its curves, where the key light
stands and how far it reaches, and how the press wash spreads — with a
paired pigment and contrast tier as the scene's voice. Three of the style
scenes also retint the paper itself toward their borrowed stock: cupertino
the cool neutral handheld white, material the M3 violet-tinged neutral,
fluent the calm neutral gray, sketch the warm cream of a used sketchbook —
each carrying a light and a dark face. Two families ride
the same levers: audience scenes serve a desk, and style scenes borrow the
temperament of the major design languages — named for the open specs and
places, never the companies. They are lever homages, not clones (no
frosted materials, no imported fonts — a scene's voice goes only to the
platform's own stack):

| Scene        | 官名 | For                                 | Paired accent | Contrast | Moves                                                                                                                                                                                                                                                                                                                   |
| ------------ | ---- | ----------------------------------- | ------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `civic`      | 典章 | elders and civic desks              | zhusha        | high     | true square-cut corners (0–8px), spacious targets (48px controls), pace ×1.25, flat light ×0.7                                                                                                                                                                                                                          |
| `enterprise` | 信笺 | quiet commercial long sessions      | qinghua       | normal   | default geometry, calm light ×0.85                                                                                                                                                                                                                                                                                      |
| `studio`     | 雅集 | design and editorial, literati 留白 | celadon       | normal   | controls keep the 6px seal edge, rounder vessels (20/28px), comfortable ×1.25, upper-left light ×1.25                                                                                                                                                                                                                   |
| `tech`       | 司南 | modern precision and efficiency     | ink _(none)_  | normal   | near-square (2/4/8px), compact (24px controls), pace ×0.85, flat light ×0.5                                                                                                                                                                                                                                             |
| `cupertino`  | 圆融 | the soft airy handheld register     | qinghua       | normal   | the capsule as the action signal (controls round full, vessels 18/36px), the 44px touch ladder (36–50px controls), sheet-spring glides ×1.1, frontal diffuse light ×0.8, no press wash, a crisp 2px accent outline pulled inside the edge at focus, cool neutral paper, system voice (sans headlines, untracked labels) |
| `expressive` | 飞白 | playful, motion-forward products    | zhusha        | normal   | generous rounding (6–24px) with pill presses on the 32/40/48 container ladder, pace ×0.8 on spring curves, the solid 3px pigment outline at focus, warm key light from above                                                                                                                                            |
| `fluent`     | 流水 | measured productivity suites        | qinghua       | normal   | the corner ladder 2/4/8/12 (shapes under 32px round to 2), measured rows on the 24–40px control ladder, decelerate and standard curves ×0.85, soft top light ×0.7, no ripple, calm neutral gray paper                                                                                                                   |
| `material`   | 格物 | the elevation-led layered register  | celadon       | normal   | the M3 shape ladder token for token (4/8/12/16/28px, pill presses), the 32/40/48 container ladder, emphasized curves ×0.9, key light directly overhead ×1.5, the solid 3px pigment outline at focus with fields answering by a 2px pigment edge, a solid wave that holds then leaves, the violet-tinged neutral paper   |
| `sketch`     | 写意 | hand-drawn playfulness              | zhusha        | normal   | no frame straight — uneven four-corner wobble radii (5–48px), hard spring bounce ×0.9, loosened whitespace, off-axis sticker light, sketchbook-cream paper                                                                                                                                                              |

The pairings are applied by the theme engine (`SCENE_DEFAULT_ACCENT`,
`SCENE_DEFAULT_CONTRAST`) as plain data attributes, so accent and contrast
rules — including their dark variants — carry them unchanged. Explicit
attributes always outrank the scene: a `data-accent`, `data-contrast`, or
`data-density` set alongside `data-scene` wins. In the audience scenes,
controls stay square-cut and vessels round — 方寸为章，器物为圆 holds, only
the measures change. The style scenes may bend it where the borrowed
register demands — material's pill press is its fingerprint, and
cupertino speaks in the system voice: headlines stand down from the
serif, labels lose their brush tracking.

## Tokens

Three layers, one direction of dependency:

```text
Primitive   ramps in DTCG (tokens.json): ink grays, qinghua, celadon,
            zhusha, bamboo, ochre, cinnabar, ultramarine; space; radius
    ↓       components never import primitives
Semantic    paper ladder, text/border, semantic pigments, lighting parts,
            elevation, focus halo, density, motion, typography, accents
    ↓       components never hardcode semantic values
Component   anatomy styles composing the semantic layer (packages/core)
```

Tokens are the only allowed source of visual values in components — a
hardcoded color, spacing, radius, shadow, or duration is a bug. Pigment
washes are the sanctioned exception: the `color-mix` percentages that tint
semantic color into a surface are recipes (parts of a formula), not
standalone values — tokenizing each percentage would only bury the formula.

## Do and don't

Do: build hierarchy with space; express space with surfaces; express distance
with elevation; express hierarchy with light; carry information hierarchy with
typography; raise efficiency with density; re-organize with responsiveness;
explain change with motion; manage style with semantic tokens; lower learning
cost with familiar interaction.

Don't: give every component a shadow; use one radius everywhere; let color
carry semantics alone; manufacture compact by shrinking type; treat mobile as
a shrunken desktop; lean on decorative gradients; animate for "premium" feel;
let brand crowd content; scatter z-index; couple the system to one framework.

## Review checklist

**Structure** — clear hierarchy? related content proximate? alignment stable?
any needless structure?

**Visual** — correct surface and elevation? one light direction? shadows
restrained? borders necessary? radius matches the role (seal-cut controls,
round vessels)?

**Information** — primary dominant? fold strategy under pressure? compact
compressing space only?

**Responsive** — genuine re-organization at each width? usable after text
resize? holds at 320px?

**Interaction** — rest, hover, focus, pressed, disabled, selected, loading,
invalid all defined where applicable?

**Accessibility** — keyboard, focus, screen reader, contrast, touch, reduced
motion, localization?

**Performance** — no needless blur or shadow? no expensive animation in long
lists? runs on low-end devices?

## References

Apple Human Interface Guidelines · Microsoft Fluent 2 · Atlassian Design
System · W3C WAI ARIA Authoring Practices (Dialog Pattern, Menu Pattern,
Keyboard Interfaces)
