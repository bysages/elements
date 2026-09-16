import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { Ai } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/AI/AI" };
export default meta;

const icon = (d: string) =>
  h(
    "svg",
    {
      viewBox: "0 0 16 16",
      width: 14,
      height: 14,
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "square",
      "aria-hidden": "true",
    },
    [h("path", { d })],
  );

const copyIcon = icon("M5.5 5.5h8v8h-8zM10.5 5.5v-3h-8v8h3");
const retryIcon = icon("M13 8a5 5 0 1 1-1.5-3.5M13 2v3h-3");
const upIcon = icon("M8 13V3M8 3 4 7M8 3l4 4");
const downIcon = icon("M8 3v10M8 13 4 9M8 13l4-4");

const reply =
  "**Ink 0.4 is out.** The release folds three additions into the paper:\n\n" +
  "- Hairline breadcrumbs for the way back\n" +
  "- A timeline that hangs its dots on one thread\n" +
  "- Charts painted straight from tokens\n\n" +
  "> Light needs time — shadows now trail their fills.\n\n" +
  "| Package | Change |\n| --- | --- |\n| core | hairline register |\n| charts | new |";

/** A full turn of conversation: the user's words in a recessed bubble,
 * the assistant's ink flat on the paper — thought, tool, sources, and
 * the quiet action row beneath. */
export const Basic = {
  render: () =>
    withState(() => {
      const state = reactive({
        prompt: "",
        pending: false,
        messages: [
          { role: "user", text: "Draft a short note announcing the ink release." },
          { role: "assistant", text: reply },
        ] as Array<{ role: "user" | "assistant"; text: string }>,
      });

      const send = (value: string) => {
        if (!value.trim() || state.pending) return;
        state.messages.push({ role: "user", text: value });
        state.prompt = "";
        state.pending = true;
        setTimeout(() => {
          state.messages.push({
            role: "assistant",
            text: "Noted — the colophon is filed with the release.",
          });
          state.pending = false;
        }, 900);
      };

      return () =>
        h(
          "div",
          { style: { display: "grid", gap: "2rem", inlineSize: "100%", maxInlineSize: "46rem" } },
          [
            h(Ai.Conversation, () => [
              ...state.messages.map((message) =>
                h(Ai.Message, { role: message.role }, () =>
                  message.role === "user"
                    ? h(Ai.MessageContent, message.text)
                    : [
                        h(Ai.Response, { content: message.text }),
                        h(
                          Ai.Tool,
                          { name: "search_web", status: "completed" },
                          {
                            input: () => '{"query": "ink release notes"}',
                            output: () => '{"hits": 3}',
                          },
                        ),
                        h(Ai.Sources, () => [
                          h(
                            Ai.Source,
                            { href: "https://example.com/ink" },
                            () => "Ink release notes",
                          ),
                        ]),
                        h(Ai.Actions, () => [
                          h(Ai.Action, { label: "Copy" }, () => copyIcon),
                          h(Ai.Action, { label: "Retry" }, () => retryIcon),
                          h(Ai.Action, { label: "Helpful" }, () => upIcon),
                          h(Ai.Action, { label: "Not helpful" }, () => downIcon),
                        ]),
                      ],
                ),
              ),
              state.pending ? h(Ai.Loader) : null,
            ]),
            h(Ai.PromptInput, {
              modelValue: state.prompt,
              "onUpdate:modelValue": (value: string) => {
                state.prompt = value;
              },
              onSubmit: send,
              placeholder: "Ask the paper…",
            }),
          ],
        );
    }),
};

/** Two beads of ink breathing while the answer is on its way. */
export const Loader = {
  render: () => h(Ai.Loader),
};
