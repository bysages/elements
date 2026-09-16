import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { AiSuggestion } from ".";
import { AiPromptInput } from "../ai-prompt-input";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/AI/AI Suggestion" };
export default meta;

/** Chips proposing the next stroke; selecting one drafts it into the
 * prompt vessel below. */
export const Basic = {
  render: () =>
    withState(() => {
      const state = reactive({ prompt: "" });
      const prompts = [
        "Summarize the release",
        "What changed in core?",
        "Draft the changelog entry",
      ];
      return () =>
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
            h("div", { style: { display: "flex", flexWrap: "wrap", gap: "0.5rem" } }, () =>
              prompts.map((prompt) =>
                h(AiSuggestion, {
                  prompt,
                  onSelect: (value: string) => {
                    state.prompt = value;
                  },
                }),
              ),
            ),
            h(AiPromptInput, {
              modelValue: state.prompt,
              "onUpdate:modelValue": (value: string) => {
                state.prompt = value;
              },
            }),
          ],
        );
    }),
};
