import type { Meta } from "@storybook/react-vite";

import { DeferredContent } from ".";

const meta: Meta = { title: "Components/Elements/Deferred Content" };
export default meta;

/** The tall scroll stands in for a page: the panel mounts only when
 * the placeholder is nudged into view. */
export const Basic = {
  render: () => (
    <div
      style={{
        maxBlockSize: "16rem",
        overflowY: "auto",
        border: "1px solid var(--bs-color-border)",
        borderRadius: "var(--bs-radius-md)",
        padding: "var(--bs-padding-md)",
      }}
    >
      <p>Scroll down — the panel mounts on approach.</p>
      <div style={{ blockSize: "12rem" }} />
      <DeferredContent
        placeholder={
          <p style={{ color: "var(--bs-color-text-tertiary)" }}>Waiting below the fold…</p>
        }
      >
        <p
          style={{
            padding: "var(--bs-padding-md)",
            border: "1px dashed var(--bs-color-border)",
          }}
        >
          Mounted on approach.
        </p>
      </DeferredContent>
    </div>
  ),
};
