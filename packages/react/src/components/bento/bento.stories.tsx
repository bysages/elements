import type { Meta } from "@storybook/react-vite";

import { Bento } from ".";

const meta: Meta = { title: "Components/Layout/Bento" };
export default meta;

const TILES = [
  { span: 2, title: "Wide", note: "A tile that claims two tracks" },
  { span: 1, title: "Compact", note: "One track of measure" },
  { span: 1, title: "Compact", note: "One track" },
  { span: 1, title: "Compact", note: "One track" },
];

const cellStyle: React.CSSProperties = {
  padding: "1rem",
  borderRadius: "0.5rem",
  border: "1px solid var(--bs-color-border)",
  background: "var(--bs-color-surface-2)",
};

/** The bento lattice: unequal tiles that read as one plate. Each cell
 * claims its own span; the rest of the plate stays in measure. */
export const Basic = {
  render: () => (
    <Bento style={{ inlineSize: "100%" }}>
      {TILES.map((tile) => (
        <Bento.Cell key={tile.title + tile.span} span={tile.span} style={cellStyle}>
          <h3 style={{ margin: 0, fontSize: "0.875rem", fontWeight: 500 }}>{tile.title}</h3>
          <p
            style={{
              margin: "0.25rem 0 0",
              fontSize: "0.75rem",
              color: "var(--bs-color-text-tertiary)",
            }}
          >
            {tile.note}
          </p>
        </Bento.Cell>
      ))}
    </Bento>
  ),
};
