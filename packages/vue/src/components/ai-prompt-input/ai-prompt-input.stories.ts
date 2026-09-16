import { createListCollection } from "@ark-ui/vue/collection";
import type { Meta } from "@storybook/vue3-vite";
import { h, reactive, Teleport } from "vue";

import { AiPromptInput } from ".";
import { AiAttachment, AiAttachments } from "../ai-attachments";
import { Button } from "../button";
import { Menu } from "../menu";
import { Select } from "../select";
import { Toggle } from "../toggle";
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

const plusGlyph = () =>
  h(
    "svg",
    {
      viewBox: "0 0 16 16",
      width: 14,
      height: 14,
      "aria-hidden": "true",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "square",
    },
    [h("path", { d: "M8 3.5v9M3.5 8h9" })],
  );

const globeGlyph = () =>
  h(
    "svg",
    {
      viewBox: "0 0 16 16",
      width: 14,
      height: 14,
      "aria-hidden": "true",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "square",
    },
    [
      h("circle", { cx: 8, cy: 8, r: 5.5 }),
      h("path", {
        d: "M2.5 8h11M8 2.5c-3.2 3.4-3.2 7.6 0 11M8 2.5c3.2 3.4 3.2 7.6 0 11",
      }),
    ],
  );

const chevronGlyph = () =>
  h(
    "svg",
    {
      viewBox: "0 0 16 16",
      width: 14,
      height: 14,
      "aria-hidden": "true",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "square",
    },
    [h("path", { d: "m4 6 4 4 4-4" })],
  );

const models = createListCollection({
  items: [
    { label: "Hunyuan", value: "hunyuan" },
    { label: "Qinghua", value: "qinghua" },
    { label: "Celadon", value: "celadon" },
  ],
  itemToString: (item) => item.label,
  itemToValue: (item) => item.value,
});

let attachCount = 0;

/** The composer at full dress: attachments riding the header, and one
 * tool row beneath the text — the plus menu and the web-search toggle
 * at the left, the model picker beside the seal that becomes a stop
 * while the machine works, both closing the row at the right. The
 * other triggers opt out of the form's submit; only the seal sends. */
export const Compose = {
  render: () =>
    withState(() => {
      const state = reactive({
        prompt: "",
        busy: false,
        model: "hunyuan",
        webSearch: false,
        files: [
          { name: "colophon.png", size: 48213, status: "ready" as const },
          { name: "notes.md", size: 1024, status: "uploading" as const },
        ],
        sent: "",
      });
      const attach = (name: string) => {
        state.files.push({ name, size: 2048, status: "uploading" });
        setTimeout(() => {
          const file = state.files.find((f) => f.name === name);
          if (file) file.status = "ready";
        }, 1000);
      };
      const send = () => {
        state.busy = true;
        state.sent = "";
        setTimeout(() => {
          state.busy = false;
        }, 2000);
      };
      return () =>
        h(
          "div",
          {
            style: {
              display: "grid",
              gap: "0.75rem",
              inlineSize: "100%",
              maxInlineSize: "46rem",
            },
          },
          [
            h(
              AiPromptInput,
              {
                busy: state.busy,
                modelValue: state.prompt,
                "onUpdate:modelValue": (value: string) => {
                  state.prompt = value;
                },
                onSubmit: send,
                onStop: () => {
                  state.busy = false;
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
                footer: () => [
                  h(Menu.Root, () => [
                    h(Menu.Trigger, { asChild: true }, () =>
                      h(Button, { variant: "ghost", square: true, "aria-label": "Attach" }, () =>
                        plusGlyph(),
                      ),
                    ),
                    h(Teleport, { to: "body" }, () => [
                      h(Menu.Positioner, () =>
                        h(Menu.Content, () => [
                          h(
                            Menu.Item,
                            {
                              value: "image",
                              onSelect: () => attach(`image-${++attachCount}.png`),
                            },
                            () => h(Menu.ItemText, () => "Upload image"),
                          ),
                          h(
                            Menu.Item,
                            { value: "file", onSelect: () => attach(`notes-${++attachCount}.md`) },
                            () => h(Menu.ItemText, () => "Upload file"),
                          ),
                        ]),
                      ),
                    ]),
                  ]),
                  h(
                    Toggle.Root,
                    {
                      type: "button",
                      pressed: state.webSearch,
                      onPressedChange: (pressed: boolean) => {
                        state.webSearch = pressed;
                      },
                    },
                    () => [globeGlyph(), h("span", "Web search")],
                  ),
                ],
                footerEnd: () => [
                  h(
                    Select.Root,
                    {
                      collection: models,
                      modelValue: [state.model],
                      onValueChange: (e: { value: string[] }) => {
                        state.model = e.value[0] ?? state.model;
                      },
                    } as any,
                    () => [
                      h(Select.Control, () =>
                        h(Select.Trigger, { type: "button", "aria-label": "Model" }, () => [
                          h(Select.ValueText, { placeholder: "Model" }),
                          h(Select.Indicator, () => chevronGlyph()),
                        ]),
                      ),
                      h(Teleport, { to: "body" }, () => [
                        h(Select.Positioner, () =>
                          h(Select.Content, () =>
                            models.items.map((item) =>
                              h(Select.Item, { key: item.value, item }, () => [
                                h(Select.ItemText, () => item.label),
                                h(Select.ItemIndicator, () => "✓"),
                              ]),
                            ),
                          ),
                        ),
                      ]),
                    ],
                  ),
                ],
              },
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
              () =>
                state.busy
                  ? "Working — the seal is a stop now; Enter holds its breath."
                  : state.sent
                    ? `Sent: ${state.sent}`
                    : "Attach, pick a model, type and press Enter.",
            ),
          ],
        );
    }),
};
