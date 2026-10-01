import type { Meta } from "@storybook/react-vite";

import { DownloadTrigger } from ".";

const meta: Meta = { title: "Components/Actions/DownloadTrigger" };
export default meta;

/** A client-side download wired to a plain element — the headless
 * counterpart to a save button. */
export const Basic = {
  render: () => (
    <DownloadTrigger
      data="Ink, paper, light."
      mimeType="text/plain"
      fileName="elements.txt"
      style={{
        display: "inline-flex",
        padding: "0.375rem 0.75rem",
        borderRadius: "0.375rem",
        border: "1px solid var(--bs-color-border)",
        background: "var(--bs-color-surface-2)",
        cursor: "pointer",
      }}
    >
      Download the sample
    </DownloadTrigger>
  ),
};
