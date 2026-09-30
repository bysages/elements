import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { Terminal } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Data/Terminal" };
export default meta;
type Story = StoryObj<typeof Terminal>;

/** The console at rest: the transcript above, the entry line below —
 * each entered line leaves as an event and returns through the lines
 * prop, so the transcript stays the caller's to shape. */
export const Basic: Story = {
  render: () =>
    withState(() => {
      const state = reactive({
        lines: ["paper 0.1.0", "Type `help` to see what the console knows."],
      });
      const Host = {
        setup() {
          return () =>
            h(Terminal, {
              lines: state.lines,
              prompt: "❯",
              placeholder: "Type a command…",
              label: "Paper console",
              style: { maxInlineSize: "34rem" },
              onCommand: (text: string) => {
                state.lines = [
                  ...state.lines,
                  `❯ ${text}`,
                  text === "help"
                    ? "Commands: help, clear"
                    : text === "clear"
                      ? ((state.lines = []), null)
                      : `unknown command: ${text}`,
                ].filter((line): line is string => line != null);
              },
            });
        },
      };
      return () => h(Host);
    }),
};
