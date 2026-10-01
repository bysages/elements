import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { DownloadTrigger } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Actions/DownloadTrigger" };
export default meta;

/** A client-side download wired to a plain element — the headless
 * counterpart to a save button. */
export const Basic = {
  render: () =>
    withState(
      () => () =>
        h(
          DownloadTrigger as any,
          {
            data: { downloadUrl: "data:text/plain;charset=utf-8,Ink, paper, light." },
            fileName: "elements.txt",
            style: {
              display: "inline-flex",
              padding: "0.375rem 0.75rem",
              borderRadius: "0.375rem",
              border: "1px solid var(--bs-color-border)",
              background: "var(--bs-color-surface-2)",
              cursor: "pointer",
            },
          },
          () => "Download the sample",
        ),
    ),
};
