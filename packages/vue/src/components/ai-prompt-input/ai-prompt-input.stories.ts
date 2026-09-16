import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { AiPromptInput } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/AI/AI Prompt Input" };
export default meta;

/** The prompt vessel alone: controlled, self-growing, Enter to send. */
export const Basic = {
  render: () =>
    withState(() => {
      const state = reactive({ prompt: "", sent: "" });
      return () =>
        h(
          "div",
          {
            style: {
              display: "grid",
              gap: "0.75rem",
              inlineSize: "100%",
              inlineSize: "100%",
              maxInlineSize: "46rem",
            },
          },
          [
            h(AiPromptInput, {
              modelValue: state.prompt,
              "onUpdate:modelValue": (value: string) => {
                state.prompt = value;
              },
              onSubmit: (value: string) => {
                state.sent = value;
              },
            }),
            h(
              "p",
              {
                style: {
                  margin: 0,
                  color: "var(--bs-color-text-tertiary)",
                  fontSize: "var(--bs-font-size-sm)",
                },
              },
              state.sent ? `Sent: ${state.sent}` : "Type and press Enter.",
            ),
          ],
        );
    }),
};
