import type { Meta } from "@storybook/react-vite";

import { Dock } from ".";

const meta: Meta = { title: "Components/Actions/Dock" };
export default meta;

const CHARS = ["墨", "纸", "研", "印", "卷", "章"];

const itemStyle: React.CSSProperties = {
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
  render: () => (
    <Dock style={{ padding: "0.75rem 1rem" }}>
      {CHARS.map((char) => (
        <Dock.Item key={char} style={itemStyle}>
          {char}
        </Dock.Item>
      ))}
    </Dock>
  ),
};
