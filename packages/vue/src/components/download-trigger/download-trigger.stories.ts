import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Button } from "../button";
import { DownloadTrigger } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Actions/DownloadTrigger" };
export default meta;

/** A client-side download wired to a shared button — the headless
 * counterpart to a save button. */
export const Basic = {
  render: () =>
    withState(
      () => () =>
        h(
          DownloadTrigger as any,
          {
            asChild: true,
            data: "Ink, paper, light.",
            mimeType: "text/plain",
            fileName: "elements.txt",
          },
          () => h(Button, () => "Download the sample"),
        ),
    ),
};
