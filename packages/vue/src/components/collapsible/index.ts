import { Collapsible as ArkCollapsible } from "@ark-ui/vue/collapsible";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type Component, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { withPresenceEnter, withPresenceRoot } from "../../internal/presence";

/** Collapsible, dressed in the paper-and-ink system: one control on
 * the paper, its panel dissolving open to the machine's measured height.
 * The parts — Root, Trigger, Content, Indicator. */
const CollapsibleRoot = defineComponent({
  name: "SCollapsibleRoot",
  setup(_, { attrs, slots }) {
    const id = useElementId("collapsible", attrs);

    return () =>
      h(
        withPresenceRoot(ArkCollapsible.Root),
        withPresenceEnter({ ...attrs, id: id.value }),
        slots,
      );
  },
});

/** The complete one-line collapsible; custom triggers stay on the anatomy. */
const CollapsibleFacade = defineComponent({
  name: "SCollapsible",
  props: {
    open: { type: Boolean, default: undefined },
    defaultOpen: { type: Boolean, default: false },
    label: { type: String, required: true },
    disabled: { type: Boolean, default: false },
  },
  emits: ["update:open"],
  setup(props, { attrs, emit, slots }: SetupContext) {
    injectComponentStyle("collapsible");

    return () =>
      h(
        CollapsibleRoot,
        {
          ...attrs,
          disabled: props.disabled,
          defaultOpen: props.defaultOpen,
          ...(props.open === undefined ? {} : { open: props.open }),
          "onUpdate:open": (open: boolean) => emit("update:open", open),
        },
        () => [
          h(ArkCollapsible.Trigger, () => [
            props.label,
            h(ArkCollapsible.Indicator, () => iconNode("chevron-right", { width: 16, height: 16 })),
          ]),
          h(ArkCollapsible.Content, () => slots.default?.()),
        ],
      );
  },
});

type CollapsibleParts = Omit<typeof ArkCollapsible, "Root"> & {
  Root: typeof CollapsibleRoot;
};

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const Collapsible = defineFamily(CollapsibleFacade, {
  ...ArkCollapsible,
  Root: CollapsibleRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof CollapsibleFacade &
  CollapsibleParts;
