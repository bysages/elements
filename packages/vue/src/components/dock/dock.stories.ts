import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Dock } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Actions/Dock" };
export default meta;

const GLYPHS = ["墨", "纸", "研", "印", "卷", "章"];

const itemStyle = {
  display: "flex",
  inlineSize: "2.75rem",
  blockSize: "2.75rem",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "0.375rem",
  border: "1px solid var(--bs-color-border)",
  background: "var(--bs-color-surface-2)",
  fontSize: "1.125rem",
};

/** The magnifying rail: icons swell toward the hand from the floor,
 * and settle when it leaves. */
export const Basic = {
  render: () =>
    withState(
      () => () =>
        h(Dock as any, { style: { padding: "0.75rem 1rem" } }, () =>
          GLYPHS.map((glyph) => h(Dock.Item as any, { key: glyph, style: itemStyle }, () => glyph)),
        ),
    ),
};
