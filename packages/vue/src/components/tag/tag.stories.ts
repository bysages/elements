import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, ref } from "vue";

import { Tag } from ".";
import { withState } from "../with-state.js";

const meta: Meta<typeof Tag> = {
  title: "Components/Elements/Tag",
  component: Tag,
  argTypes: {
    tone: {
      control: "select",
      options: ["ink", "primary", "success", "warning", "danger", "info"],
    },
    variant: { control: "radio", options: ["solid", "outline", "subtle"] },
  },
};
export default meta;
type Story = StoryObj<typeof Tag>;

/** The resting seal: a label riding the solemn ink. */
export const Basic: Story = {
  args: { tone: "ink", variant: "solid" },
  render: (args) =>
    withState(
      () => () =>
        h("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center" } }, [
          h(Tag, { tone: args.tone, variant: args.variant }, () => "Design"),
          h(Tag, { tone: args.tone, variant: args.variant }, () => "Porcelain"),
          h(Tag, { tone: args.tone, variant: args.variant }, () => "Kiln work"),
        ]),
    ),
};

/** The seal changes pigment with its meaning. */
export const Tones: Story = {
  render: () =>
    withState(
      () => () =>
        h(
          "div",
          { style: { display: "flex", gap: "0.5rem", flexWrap: "wrap" } },
          (["ink", "primary", "success", "warning", "danger", "info"] as const).map((tone) =>
            h(Tag, { key: tone, tone, variant: "subtle" }, () => tone),
          ),
        ),
    ),
};

/** How the seal rests: the flat fill, the drawn hairline, the quiet
 * wash. */
export const Variants: Story = {
  render: () =>
    withState(
      () => () =>
        h(
          "div",
          { style: { display: "flex", gap: "0.5rem", flexWrap: "wrap" } },
          (["solid", "outline", "subtle"] as const).map((variant) =>
            h(Tag, { key: variant, tone: "primary", variant }, () => variant),
          ),
        ),
    ),
};

/** The checkable seal presses into its solid register and holds. */
export const Checkable: Story = {
  render: () =>
    withState(() => {
      const qinghua = ref(true);
      const celadon = ref(false);
      return () =>
        h("div", { style: { display: "flex", gap: "0.5rem", alignItems: "center" } }, [
          h(
            Tag,
            {
              checkable: true,
              variant: "outline",
              modelValue: qinghua.value,
              "onUpdate:modelValue": (value: boolean) => (qinghua.value = value),
            },
            () => "Qinghua",
          ),
          h(
            Tag,
            {
              checkable: true,
              variant: "outline",
              modelValue: celadon.value,
              "onUpdate:modelValue": (value: boolean) => (celadon.value = value),
            },
            () => "Celadon",
          ),
        ]);
    }),
};

/** The quiet close: removal stays the consumer's state. */
export const Closable: Story = {
  render: () =>
    withState(() => {
      const names = ref(["Paper", "Ink", "Seal"]);
      const remove = (name: string) => {
        names.value = names.value.filter((n) => n !== name);
      };
      return () =>
        h(
          "div",
          { style: { display: "flex", gap: "0.5rem", flexWrap: "wrap" } },
          names.value.map((name) =>
            h(
              Tag,
              { key: name, variant: "subtle", closable: true, onClose: () => remove(name) },
              () => name,
            ),
          ),
        );
    }),
};

/** A tag that cannot answer: the pressed and removable seals both rest. */
export const Disabled: Story = {
  render: () =>
    withState(
      () => () =>
        h("div", { style: { display: "flex", gap: "0.5rem", flexWrap: "wrap" } }, [
          h(Tag, { checkable: true, modelValue: true, disabled: true }, () => "Archived"),
          h(Tag, { checkable: true, variant: "outline", disabled: true }, () => "Locked"),
          h(Tag, { variant: "subtle", closable: true, disabled: true }, () => "Filed"),
        ]),
    ),
};
