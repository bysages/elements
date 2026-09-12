import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { withState } from "../with-state.js";
import { TagsInput } from "./index.js";

const meta: Meta = { title: "Components / Tags Input" };
export default meta;

const XIcon = () =>
  h("svg", { viewBox: "0 0 16 16", fill: "none" }, [
    h("path", {
      d: "M4 4l8 8M12 4l-8 8",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
    }),
  ]);

/** The tag strip shared by every story: one chip per value, each with its
 * delete whisker and a double-click-edit input. */
function tagList() {
  return h(TagsInput.Context, null, {
    default: (tagsInput: { value: string[] }) =>
      tagsInput.value.map((value: string, index: number) =>
        h(TagsInput.Item, { key: index, index, value }, () => [
          h(TagsInput.ItemPreview, () => [
            h(TagsInput.ItemText, () => value),
            h(TagsInput.ItemDeleteTrigger, () => h(XIcon)),
          ]),
          h(TagsInput.ItemInput),
        ]),
      ),
  });
}

function field(rootProps: Record<string, unknown>, label = "Pigments") {
  return h(TagsInput.Root, rootProps, {
    default: () => [
      h(TagsInput.Label, () => label),
      h(TagsInput.Control, null, {
        default: () => [
          tagList(),
          h(TagsInput.Input as any, { placeholder: "Add pigment" }),
          h(TagsInput.ClearTrigger, () => h(XIcon)),
        ],
      }),
      h(TagsInput.HiddenInput),
    ],
  });
}

/** Type and press enter; chips carry a delete whisker each. */
export const Basic = {
  render: () => field({ defaultValue: ["Qinghua", "Celadon"] }),
};

/** The same pigment may be stamped twice. */
export const AllowDuplicates = {
  render: () => field({ allowDuplicates: true }),
};

/** Blur commits the typed text instead of clearing it. */
export const BlurBehavior = {
  render: () => field({ blurBehavior: "add" }),
};

/** A comma turns one typing run into two chips. */
export const Delimiter = {
  render: () => field({ delimiter: "," }),
};

/** Pasted text splits on the delimiter into chips in one stroke. */
export const PasteBehavior = {
  render: () => field({ addOnPaste: true, delimiter: "," }),
};

/** Chips stay deletable but double-click no longer opens the edit input. */
export const DisabledEditing = {
  render: () => field({ allowEditTag: false, defaultValue: ["Qinghua", "Celadon"] }),
};

/** The whole field rests: chips, delete triggers, and typing all off. */
export const Disabled = {
  render: () => field({ defaultValue: ["Qinghua", "Celadon", "Zhusha"], disabled: true }),
};

/** Read-only shows the chips but allows no change at all. */
export const ReadOnly = {
  render: () => field({ defaultValue: ["Qinghua", "Celadon", "Zhusha"], readOnly: true }),
};

/** The invalid state turns the hairline cinnabar. */
export const Invalid = {
  render: () => field({ invalid: true }),
};

/** Ten characters is all a single chip may hold. */
export const MaxTagLength = {
  render: () => field({ maxLength: 10 }),
};

/** Three chips is the ceiling; allow-overflow marks the excess instead of
 * blocking it. */
export const MaxWithOverflow = {
  render: () => field({ max: 3, allowOverflow: true }),
};

/** Typed text is folded to lowercase and trimmed before it becomes a chip. */
export const SanitizeValue = {
  render: () =>
    field({
      sanitizeValue: (value: string) => value.trim().toLowerCase(),
    }),
};

/** Duplicate entries are refused; the refused chip reads invalid. */
export const Validation = {
  render: () =>
    field({
      validate: (details: { value: string[]; inputValue: string }) =>
        !details.value.includes(details.inputValue),
    }),
};

/** The typed text itself is controlled, echoing every keystroke. */
export const ControlledInputValue = {
  render: () =>
    withState(() => {
      const state = reactive({ inputValue: "" });
      return () =>
        h(
          TagsInput.Root,
          {
            inputValue: state.inputValue,
            onInputValueChange: (e: any) => {
              state.inputValue = e.inputValue;
            },
          },
          {
            default: () => [
              h(TagsInput.Label, () => "Pigments"),
              h(TagsInput.Control, null, {
                default: () => [
                  tagList(),
                  h(TagsInput.Input as any, { placeholder: "Add pigment" }),
                ],
              }),
              h(TagsInput.HiddenInput),
            ],
          },
        );
    }),
};

/** The chip list answers to state; deleting and adding round-trip. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ value: ["Qinghua", "Celadon"] });
      return () =>
        h(
          TagsInput.Root,
          {
            modelValue: state.value,
            onValueChange: (e: any) => {
              state.value = e.value;
            },
          },
          {
            default: () => [
              h(TagsInput.Label, () => "Pigments"),
              h(TagsInput.Control, null, {
                default: () => [
                  tagList(),
                  h(TagsInput.Input as any, { placeholder: "Add pigment" }),
                ],
              }),
              h(TagsInput.HiddenInput),
            ],
          },
        );
    }),
};
