import type { Meta } from "@storybook/vue3-vite";
import type { UIMessage } from "ai";
import { h, reactive } from "vue";

import { Ai } from ".";
import { iconNode } from "../../internal/icon";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/AI/AI Conversation" };
export default meta;

const copyIcon = iconNode("copy");
const retryIcon = iconNode("undo");
const upIcon = iconNode("arrow-up");
const downIcon = iconNode("arrow-down");

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
                    ? h(Ai.MessageContent, () => message.text)
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

/** One typed AI SDK message rendered directly: text, file, approval, and
 * custom data parts all land on the shared conversation anatomy. */
export const TypedParts = {
  render: () => {
    type DemoMessage = UIMessage<
      unknown,
      { status: { label: string } },
      { searchWeb: { input: { query: string }; output: { hits: number } } }
    >;
    const message: DemoMessage = {
      id: "sdk-message",
      role: "assistant",
      parts: [
        { type: "text", text: "Here is the sampled ink, with the search waiting on approval." },
        {
          type: "file",
          mediaType: "image/svg+xml",
          filename: "ink-sample.svg",
          url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 72' width='240' height='144'%3E%3Crect width='120' height='72' fill='%23f8f4ec'/%3E%3Cpath d='M18 52C36 22 82 20 102 34' stroke='%23221f1a' stroke-width='3' fill='none'/%3E%3C/svg%3E",
        },
        {
          type: "tool-searchWeb",
          toolCallId: "call-sample",
          state: "approval-requested",
          input: { query: "paper and ink release" },
          approval: { id: "approval-sample" },
        },
        { type: "step-start" },
        { type: "data-status", data: { label: "Writing" } },
      ],
    };
    const decision = reactive({ value: "" });
    const setDecision = (value: string) => {
      decision.value = value;
    };
    return () =>
      h("div", { style: { display: "grid", gap: "1rem", maxInlineSize: "46rem" } }, [
        h(Ai.Message, { message }, () =>
          h(
            Ai.Parts as never,
            {
              message,
              onApprove: () => setDecision("approved"),
              onDeny: () => setDecision("denied"),
            } as never,
          ),
        ),
        h(
          "p",
          { role: "status", style: { margin: 0, color: "var(--bs-color-text-tertiary)" } },
          decision.value ? `Approval ${decision.value}.` : "The tool waits for approval.",
        ),
      ]);
  },
};

/** Two beads of ink breathing while the answer is on its way. */
export const Loader = {
  render: () => h(Ai.Loader),
};
