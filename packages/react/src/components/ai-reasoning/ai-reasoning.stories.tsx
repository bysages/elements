import type { Meta } from "@storybook/react-vite";

import { AiReasoning } from ".";

const meta: Meta = { title: "Components/AI/AI Reasoning" };
export default meta;

const reasoningText =
  "The note should read like a colophon, not a changelog: one line of " +
  "welcome, the three additions as short strokes, and the shadow motion " +
  "note last, where it lands quietly.";

/** The model's thought on one hairline, folded by the shared collapsible. */
export const Basic = {
  render: () => (
    <div style={{ display: "grid", gap: "1rem", width: "100%", maxWidth: "46rem" }}>
      <AiReasoning label="Thought for 2s">{reasoningText}</AiReasoning>
      <AiReasoning label="Thought for 5s" defaultOpen>
        Shorter strokes first, the shadow note last.
      </AiReasoning>
    </div>
  ),
};
