import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { AiMessage } from ".";
import { AiContent } from "../ai";

const meta: Meta = { title: "Components/AI/AI Message" };
export default meta;

/** Whose stroke this is: the user's words sit in a recessed bubble,
 * the assistant speaks flat on the paper. */
export const Basic = {
  render: () =>
    h(
      "div",
      {
        style: {
          display: "grid",
          gap: "1rem",
          inlineSize: "100%",
          inlineSize: "100%",
          maxInlineSize: "46rem",
        },
      },
      [
        h(AiMessage, { role: "user" }, () =>
          h(AiContent, "Draft a short note announcing the ink release."),
        ),
        h(AiMessage, { role: "assistant" }, () =>
          h(AiContent, "The draft is ready — three sections, one summary."),
        ),
      ],
    ),
};
