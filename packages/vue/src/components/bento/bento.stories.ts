import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Bento } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Layout/Bento" };
export default meta;

const TILES = [
  { span: 2, title: "Wide", note: "A tile that claims two tracks" },
  { span: 1, title: "Compact", note: "One track of measure" },
  { span: 1, title: "Compact", note: "One track" },
  { span: 1, title: "Compact", note: "One track" },
];

const cellStyle = {
  padding: "1rem",
  borderRadius: "0.5rem",
  border: "1px solid var(--bs-color-border)",
  background: "var(--bs-color-surface-2)",
};

/** The bento lattice: unequal tiles that read as one plate. Each cell
 * claims its own span; the rest of the plate stays in measure. */
export const Basic = {
  render: () =>
    withState(
      () => () =>
        h(Bento as any, { style: { inlineSize: "100%" } }, () =>
          TILES.map((tile) =>
            h(
              Bento.Cell as any,
              { key: tile.title + tile.span, span: tile.span, style: cellStyle },
              () => [
                h(
                  "h3",
                  { style: { margin: "0", fontSize: "0.875rem", fontWeight: 500 } },
                  () => tile.title,
                ),
                h(
                  "p",
                  {
                    style: {
                      margin: "0.25rem 0 0",
                      fontSize: "0.75rem",
                      color: "var(--bs-color-text-tertiary)",
                    },
                  },
                  () => tile.note,
                ),
              ],
            ),
          ),
        ),
    ),
};
