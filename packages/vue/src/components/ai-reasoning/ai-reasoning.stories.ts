import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { AiReasoning } from ".";

const meta: Meta = { title: "Components/AI/AI Reasoning" };
export default meta;

const reasoningText =
  "The note should read like a colophon, not a changelog: one line of " +
  "welcome, the three additions as short strokes, and the shadow motion " +
  "note last, where it lands quietly.";

/** The model's thought on one hairline, folded by the shared collapsible. */
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
        h(AiReasoning, { label: "Thought for 2s" }, () => reasoningText),
        h(
          AiReasoning,
          { label: "Thought for 5s", defaultOpen: true },
          () => "Shorter strokes first, the shadow note last.",
        ),
      ],
    ),
};
