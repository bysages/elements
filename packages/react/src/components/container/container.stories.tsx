import type { Meta } from "@storybook/react-vite";

import { Container } from ".";

const meta: Meta = { title: "Components/Layout/Container" };
export default meta;

const sizes = ["narrow", "readable", "wide", "full"] as const;

/** Long-form prose held to the readable measure, centered on whatever
 * page carries it. The paint is the story's — the container itself has
 * no chrome. */
export const Basic = {
  render: () => (
    <Container size="readable" style={{ background: "var(--bs-color-surface-3)" }}>
      <p style={{ margin: 0 }}>
        The page hands the container its width; the container hands back a line long enough to
        settle into and short enough to find its way back to.
      </p>
    </Container>
  ),
};

/** The four measures, each painted so its clamp shows. */
export const Sizes = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--bs-space-4)" }}>
      {sizes.map((size) => (
        <Container key={size} size={size} style={{ background: "var(--bs-color-surface-3)" }}>
          <code style={{ fontSize: "var(--bs-font-size-sm)" }}>{size}</code>
        </Container>
      ))}
    </div>
  ),
};

/** Without its padding the ink runs to the measure's edge — the page's
 * own gutter takes over. */
export const Unpadded = {
  render: () => (
    <Container size="readable" padding={false} style={{ background: "var(--bs-color-surface-3)" }}>
      <p style={{ margin: 0 }}>Ink straight to the edge of the measure.</p>
    </Container>
  ),
};
