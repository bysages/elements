import type { Meta } from "@storybook/react-vite";

import { AvatarGroup } from ".";

const meta: Meta = { title: "Components/Elements/Avatar Group" };
export default meta;

/** A demo avatar: sized in `em`, so the group's font-size sets the face. */
function face(label: string, background: string) {
  return (
    <span
      aria-label={label}
      title={label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        blockSize: "2em",
        inlineSize: "2em",
        borderRadius: "9999px",
        background,
        color: "var(--bs-color-ink-on-primary, #fff)",
        fontSize: "0.75em",
        letterSpacing: "0.02em",
        userSelect: "none",
      }}
    >
      {label}
    </span>
  );
}

/** Avatars overlap one row, each rimmed in the ground so the pile stays
 * legible. */
export const Basic = {
  render: () => (
    <AvatarGroup style={{ fontSize: "2rem" }}>
      {face("Qinghua", "var(--bs-color-info)")}
      {face("Celadon", "var(--bs-color-success)")}
      {face("Zhusha", "var(--bs-color-danger)")}
      {face("Tielan", "var(--bs-color-warning)")}
    </AvatarGroup>
  ),
};
