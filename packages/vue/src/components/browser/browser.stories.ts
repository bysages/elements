import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Browser } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Media/Browser" };
export default meta;

/** A browser window as a vessel: the three lamps, the address well,
 * and a body that carries whatever the site hangs in it. */
export const Basic = {
  render: () =>
    withState(
      () => () =>
        h(Browser as any, { style: { inlineSize: "26rem" } }, () => [
          h(Browser.TitleBar, () => [
            h(Browser.Dots),
            h(Browser.UrlBar, () => "https://elements.bysages.com"),
          ]),
          h(
            Browser.Body,
            {
              style: {
                blockSize: "10rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.875rem",
                color: "var(--bs-color-text-tertiary)",
              },
            },
            () => "Whatever the site hangs in the window",
          ),
        ]),
    ),
};
