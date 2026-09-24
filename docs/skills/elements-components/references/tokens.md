# Elements Token Cheatsheet

Every visual value in Elements resolves from a `--bs-*` CSS custom
property. Reference these names; never invent literals.

## Surfaces (the paper ladder)

| Token                                           | Role                                                                           |
| ----------------------------------------------- | ------------------------------------------------------------------------------ |
| `--bs-color-surface-0` … `--bs-color-surface-5` | The paper ladder: page ground up through raised vessels. Never pure `#ffffff`. |
| `--bs-color-surface-inset`                      | Wells and disabled fills.                                                      |
| `--bs-color-surface-inverse`                    | Inverted panels.                                                               |

## Ink and hairlines

| Token                                                                | Role                               |
| -------------------------------------------------------------------- | ---------------------------------- |
| `--bs-color-text-primary` / `-secondary` / `-tertiary` / `-disabled` | Ink weight for text.               |
| `--bs-color-border` / `--bs-color-border-strong`                     | The hairline, resting and hovered. |
| `--bs-hairline` / `--bs-hairline-strong`                             | Raw 1px line values.               |

## Accent and semantic pigments

- `--bs-color-primary`, `--bs-color-primary-hover`, `-active`, `-fill`,
  `-fill-hover`, `-border`, `-text`, `-subtle`, `-subtle-text` — the
  switchable accent theme (`[data-accent]`: qinghua cobalt / celadon /
  zhusha cinnabar).
- Fixed semantic pigments, independent of the accent:
  `--bs-color-success`, `--bs-color-warning`, `--bs-color-danger`,
  `--bs-color-info`, each with `-hover`, `-subtle`, `-subtle-text` and a
  numeric ramp (`-100` … `-800`).
- `--bs-color-focus` and `--bs-focus-ring` / `--bs-focus-ring-inset` —
  the focus halo: a crisp inner line inside a soft, wide glow. Never fake
  it with a `box-shadow` literal; the inset
  variant is its own token (do not prefix `var(--bs-focus-ring)` with
  `inset`).

## Spacing, radius, control size

| Family          | Tokens                                                                       |
| --------------- | ---------------------------------------------------------------------------- |
| Space           | `--bs-space-1` … `--bs-space-8`                                              |
| Padding         | `--bs-padding-xs` / `-sm` / `-md` / `-lg` / `-xl`                            |
| Gap             | `--bs-gap-xs` … `--bs-gap-xl`                                                |
| Radius          | `--bs-radius-sm` (6px, controls/seal-cut) `-md` `-lg` (vessels) `-xl` `-2xl` |
| Control heights | `--bs-control-height-sm` (28) / `-md` (32) / `-lg` (36)                      |
| Part sizes      | `--bs-part-size-sm` / `-md` / `-lg`                                          |

Controls read as square-cut seals (`--bs-radius-sm`); cards and dialogs
stay round (`--bs-radius-lg` and up).

## Elevation (light as shadow)

Cast shadows are reserved for things that leave the page. Compose from
the lighting parts — never copy a finished shadow between components:

- `--bs-shadow-xs` — the resting breath on controls.
- `--bs-shadow-ink`, `--bs-light-x`, `--bs-light-y`, `--bs-light-reach` —
  the parts every elevation is computed from.

Motion: light needs time — shadows transition ~1.5× slower than the
property that raised them. Durations `--bs-duration-instant` / `-fast` /
`-base` / `-slow`; easings `--bs-ease-out` / `-in` / `-in-out` /
`-spring` (moving parts overshoot on spring); lists stagger on
`--bs-stagger-step`. Reduced motion retunes durations to 1ms — states
remain, animation does not.

## Typography

| Token                                                       | Role                                    |
| ----------------------------------------------------------- | --------------------------------------- |
| `--bs-font-serif`                                           | Headings — the song-serif stack.        |
| `--bs-font-sans`                                            | UI chrome — the hei stack.              |
| `--bs-font-mono`                                            | Code.                                   |
| `--bs-font-size-xs` … `-3xl` / `--bs-font-size-base`        | Type scale.                             |
| `--bs-line-height-tight` / `-snug` / `-normal` / `-relaxed` | Reading rhythm.                         |
| `--bs-tracking-label`                                       | 0.02em CJK tracking for control labels. |
