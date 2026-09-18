import type { Meta } from "@storybook/react-vite";

import { Typography } from ".";

const meta: Meta = { title: "Components/Layout/Typography" };
export default meta;

/** The six voices in one column: display and heading on the serif,
 * the rest on the hei — hierarchy by size, weight, and space. */
export const Voices = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--bs-space-4)", maxWidth: "36rem" }}>
      <Typography.Display>以光为影</Typography.Display>
      <Typography.Heading>The paper-and-ink system</Typography.Heading>
      <Typography.Lead>
        Interfaces are warm paper, content is ink, hierarchy is light.
      </Typography.Lead>
      <Typography.Body>
        Surfaces are never pure white; the ground rests in ambient shade. Primary actions default to
        ink — monochrome, solemn — with mineral-pigment accents switchable by theme.
      </Typography.Body>
      <Typography.Muted>Revised autumn 2026 · Typeset in the eastern studio</Typography.Muted>
      <Typography.Label>SECTION IV — MOTION GRAMMAR</Typography.Label>
    </div>
  ),
};
