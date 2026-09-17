import type { Meta } from "@storybook/vue3-vite";
import { h, ref } from "vue";

import { Mentions } from ".";
import { Field } from "../field";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Forms/Mentions" };
export default meta;

const teammates = [
  { label: "Lin Hua", value: "lin" },
  { label: "Mei Chen", value: "mei" },
  { label: "Hong Wei", value: "hong" },
  { label: "Yan Wu", value: "yan" },
  { label: "Zhou Lan", value: "zhou" },
];

/** Type @ and the first letters: the vessel offers the teammates whose
 * name answers; Enter or a click inserts, Escape dismisses. */
export const Basic = {
  render: () =>
    withState(() => {
      const text = ref("");
      return () => [
        h(Mentions, {
          items: teammates,
          placeholder: "Describe the task and @who should read it…",
          modelValue: text.value,
          "onUpdate:modelValue": (value: string) => (text.value = value),
        }),
        h(
          "p",
          {
            role: "status",
            style:
              "margin-block-start: var(--bs-space-4); font-size: var(--bs-font-size-sm); color: var(--bs-color-text-tertiary);",
          },
          () => (text.value ? `Field holds: ${text.value}` : "The field is empty."),
        ),
      ];
    }),
};

/** A different trigger character, for systems where @ already means
 * something else. */
export const CustomTrigger = {
  render: () =>
    withState(() => {
      const text = ref("Review with #");
      return () => [
        h(Mentions, {
          items: [
            { label: "Design review", value: "design-review" },
            { label: "Editorial review", value: "editorial-review" },
            { label: "Civic review", value: "civic-review" },
          ],
          trigger: "#",
          placeholder: "Tag a review…",
          modelValue: text.value,
          "onUpdate:modelValue": (value: string) => (text.value = value),
        }),
      ];
    }),
};

/** Inside a `Field.Root` the field picks up the label wiring and the
 * invalid state on its own — mark the field invalid and the hairline
 * turns cinnabar. */
export const WithField = {
  render: () =>
    withState(() => {
      const text = ref("");
      return () =>
        h(Field.Root, { invalid: true, style: { maxInlineSize: "28rem" } }, () => [
          h(Field.Label, () => "Describe the task"),
          h(Mentions, {
            items: teammates,
            placeholder: "Describe the task and @who should read it…",
            modelValue: text.value,
            "onUpdate:modelValue": (value: string) => (text.value = value),
          }),
          h(Field.ErrorText, () => "Every task needs a body before it files."),
        ]);
    }),
};
