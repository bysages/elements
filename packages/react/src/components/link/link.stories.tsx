import type { Meta, StoryObj } from "@storybook/react-vite";

import { Link } from ".";

const meta: Meta = { title: "Components/Navigation/Link" };
export default meta;
type Story = StoryObj<typeof Link>;

/** The three underline settings, resting in a line of prose. */
export const Underlines: Story = {
  render: () => (
    <div style={{ display: "grid", gap: "var(--bs-space-3)", maxWidth: "28rem" }}>
      <p style={{ margin: 0, color: "var(--bs-color-text-secondary)" }}>
        The catalogue{" "}
        <Link href="#" underline="always">
          always underlines
        </Link>{" "}
        — a quiet rail under the ink.
      </p>
      <p style={{ margin: 0, color: "var(--bs-color-text-secondary)" }}>
        The default <Link href="#">underlines on hover</Link> — rest keeps the page still.
      </p>
      <p style={{ margin: 0, color: "var(--bs-color-text-secondary)" }}>
        And{" "}
        <Link href="#" underline="none">
          some links never underline
        </Link>{" "}
        — the pigment alone carries them.
      </p>
    </div>
  ),
};
