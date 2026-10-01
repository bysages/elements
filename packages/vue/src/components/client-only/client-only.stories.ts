import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { ClientOnly } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Elements/ClientOnly" };
export default meta;

/** Children mount after hydration — the escape hatch for browser-only
 * widgets inside server-rendered pages. */
export const Basic = {
  render: () =>
    withState(
      () => () =>
        h(ClientOnly as any, () => [
          h(
            "p",
            { style: { margin: "0", fontSize: "0.875rem" } },
            () => "This sentence exists only on the client.",
          ),
        ]),
    ),
};
