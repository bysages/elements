import { Toggle as ArkToggle } from "@ark-ui/vue/toggle";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type Component } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Toggle, dressed in the paper-and-ink system: a standalone seal that
 * settles into the flat ink fill while pressed on. The parts —
 * Root, Indicator. */
const ToggleRoot = defineComponent({
  name: "SToggleRoot",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    const id = useElementId("toggle", attrs);

    return () => h(ArkToggle.Root, { ...attrs, id: id.value }, slots);
  },
}) as unknown as typeof ArkToggle.Root;

/** The complete pressed seal behind one label: the default content
 * swaps through the indicator, so one child serves both states. */
const ToggleFacade = defineComponent({
  name: "SToggle",
  props: {
    /** The accessible name when the content is only a glyph. */
    label: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    injectComponentStyle("toggle");

    return () => {
      const label = props.label ?? attrs["aria-label"];
      return h(ToggleRoot as never, { ...attrs, "aria-label": label }, () =>
        h(ArkToggle.Indicator, null, {
          default: slots.default,
          fallback: slots.default,
        }),
      );
    };
  },
});

export const Toggle = defineFamily(ToggleFacade, {
  ...ArkToggle,
  Root: ToggleRoot,
}) as unknown as typeof ToggleFacade & typeof ArkToggle & { Root: Component };

injectComponentStyle("toggle");
