import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { AiAttachment, AiAttachments } from ".";
import { AiPromptInput } from "../ai-prompt-input";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/AI/AI Attachments" };
export default meta;

const FILES = [
  { name: "colophon.png", size: 48213, status: "ready" as const },
  { name: "notes.md", size: 1024, status: "ready" as const },
  { name: "wireframe.fig", status: "uploading" as const },
  { name: "denied.exe", size: 65536, status: "error" as const },
  {
    name: "a-very-long-document-name-that-keeps-going-and-going.pdf",
    size: 2_097_152,
    status: "ready" as const,
  },
];

/** Paper chips for the files riding the prompt — every state, and a
 * name long enough to meet the ellipsis. */
export const Basic = {
  render: () =>
    withState(() => {
      const state = reactive({ removed: "" });
      return () =>
        h("div", { style: { display: "grid", gap: "1rem", maxInlineSize: "26rem" } }, [
          h(AiAttachments, () =>
            FILES.map((file) =>
              h(AiAttachment, {
                key: file.name,
                name: file.name,
                size: file.size,
                status: file.status,
                onRemove: () => {
                  state.removed = file.name;
                },
              }),
            ),
          ),
          h(
            "p",
            {
              style: {
                margin: 0,
                color: "var(--bs-color-text-tertiary)",
                fontSize: "var(--bs-font-size-sm)",
              },
            },
            state.removed ? `Removed: ${state.removed}` : "Click a chip's × to remove it.",
          ),
        ]);
    }),
};

/** The chips ride the prompt's header slot, above the writing. */
export const InPrompt = {
  render: () =>
    withState(() => {
      const state = reactive({
        files: FILES.slice(0, 2).map((f) => ({ ...f })),
        prompt: "",
      });
      return () =>
        h("div", { style: { maxInlineSize: "34rem" } }, () =>
          h(
            AiPromptInput,
            {
              modelValue: state.prompt,
              "onUpdate:modelValue": (value: string) => {
                state.prompt = value;
              },
            },
            {
              header: () =>
                h(AiAttachments, () =>
                  state.files.map((file) =>
                    h(AiAttachment, {
                      key: file.name,
                      name: file.name,
                      size: file.size,
                      status: file.status,
                      onRemove: () => {
                        state.files = state.files.filter((f) => f.name !== file.name);
                      },
                    }),
                  ),
                ),
            },
          ),
        );
    }),
};
