import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Spotlight } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Layout/Spotlight" };
export default meta;

/** The ink-light card: the rim catches primary ink where the hand
 * passes, the face takes a quiet wash, and both die when it leaves. */
export const Basic = {
  render: () =>
    withState(
      () => () =>
        h(
          Spotlight as any,
          { style: { inlineSize: "20rem", padding: "1.5rem", borderRadius: "0.75rem" } },
          () => [
            h(
              "h3",
              { style: { margin: "0", fontSize: "1rem", fontWeight: 500 } },
              () => "The pointer is the lamp",
            ),
            h(
              "p",
              {
                style: {
                  margin: "0.5rem 0 0",
                  fontSize: "0.875rem",
                  color: "var(--bs-color-text-tertiary)",
                },
              },
              () =>
                "Move the hand across the card — the rim and the face answer, and both die when it leaves.",
            ),
          ],
        ),
    ),
};
