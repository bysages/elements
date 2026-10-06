import { Accordion as ArkAccordion } from "@ark-ui/vue/accordion";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Accordion, dressed in the paper-and-ink system: a ruled sheet
 * folded by quiet rows, unfolding with a spring-chevoned dissolve. The parts — Root, Item, ItemTrigger, ItemContent, ItemIndicator. */
const AccordionRoot = defineComponent({
  name: "SAccordionRoot",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    const id = useElementId("accordion", attrs);

    return () => h(ArkAccordion.Root, { ...attrs, id: id.value }, slots);
  },
}) as unknown as typeof ArkAccordion.Root;

export type AccordionItem = {
  value: string;
  title: string;
  content: string;
};

/** The complete text accordion; custom triggers and rich bodies stay on
 * the anatomy. */
const AccordionFacade = defineComponent({
  name: "SAccordion",
  props: {
    modelValue: { type: Array as PropType<string[]>, default: undefined },
    defaultValue: { type: Array as PropType<string[]>, default: undefined },
    items: { type: Array as PropType<AccordionItem[]>, required: true },
    multiple: { type: Boolean, default: false },
    collapsible: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    orientation: {
      type: String as PropType<"horizontal" | "vertical">,
      default: "vertical",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }: SetupContext) {
    injectComponentStyle("accordion");

    return () =>
      h(
        AccordionRoot,
        {
          ...attrs,
          disabled: props.disabled,
          multiple: props.multiple,
          collapsible: props.collapsible,
          orientation: props.orientation,
          defaultValue: props.defaultValue,
          ...(props.modelValue === undefined ? {} : { modelValue: props.modelValue }),
          "onUpdate:modelValue": (value: string[]) => emit("update:modelValue", value),
        },
        () =>
          props.items.map((item) =>
            h(ArkAccordion.Item, { key: item.value, value: item.value }, () => [
              h(ArkAccordion.ItemTrigger, () => [
                item.title,
                h(ArkAccordion.ItemIndicator, () =>
                  iconNode("chevron-down", { width: 16, height: 16 }),
                ),
              ]),
              h(ArkAccordion.ItemContent, () => h("p", item.content)),
            ]),
          ),
      );
  },
});

type AccordionParts = typeof ArkAccordion;

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const Accordion = defineFamily(AccordionFacade, {
  ...ArkAccordion,
  Root: AccordionRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof AccordionFacade &
  AccordionParts;
